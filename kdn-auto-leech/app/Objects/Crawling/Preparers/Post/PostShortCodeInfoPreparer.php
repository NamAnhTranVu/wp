<?php

namespace KDNAutoLeech\Objects\Crawling\Preparers\Post;


use KDNAutoLeech\Objects\Crawling\Preparers\Post\Base\AbstractPostBotPreparer;
use KDNAutoLeech\Utils;

class PostShortCodeInfoPreparer extends AbstractPostBotPreparer {

    /** @var bool */
    private $childPost;

    /**
     * Prepare the post bot
     *
     * @return void
     */
    public function prepare() {

        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        $this->childPost = $this->bot->getPostData()->getChildPost();

        // Get all ajax data.
        $allAjaxData = $this->bot->getPostData()->getAjaxData();

        if ($this->childPost) {
            $postCustomShortCodeSelectors       = $this->bot->getSetting('_child_post_custom_content_shortcode_selectors');
            $shortCodeSpecificFindAndReplaces   = $this->bot->getSetting('_child_post_find_replace_custom_short_code', []);
            $findAndReplacesForCustomShortCodes = $this->bot->prepareFindAndReplaces($this->bot->getSetting('_child_post_find_replace_custom_shortcodes'));
        } else {
            $postCustomShortCodeSelectors       = $this->bot->getSetting('_post_custom_content_shortcode_selectors');
            $shortCodeSpecificFindAndReplaces   = $this->bot->getSetting('_post_find_replace_custom_short_code', []);
            $findAndReplacesForCustomShortCodes = $this->bot->prepareFindAndReplaces($this->bot->getSetting('_post_find_replace_custom_shortcodes'));
        }

        // If there is no selector, stop.
        if(!$postCustomShortCodeSelectors || empty($postCustomShortCodeSelectors)) return;

        foreach($postCustomShortCodeSelectors as $selectorData) {
            if(
                !isset($selectorData["selector"]) || empty($selectorData["selector"]) ||
                !isset($selectorData["short_code"]) || empty($selectorData["short_code"])
            )
                continue;

            $isSingle = isset($selectorData["single"]);

            /**
             * Extract data with Ajax.
             * @since 2.1.8
             */
            if (isset($selectorData["ajax"]) && $ajaxNumber = $selectorData["ajax"]) {

                // Get the ajax data with key number in all ajax data.
                $ajaxData = isset($allAjaxData[$ajaxNumber - 1]) ? $allAjaxData[$ajaxNumber - 1] : '';

                if ($ajaxData) {
                    $results = $this->getBot()->extractValuesWithSelectorData($ajaxData, $selectorData, "html", false, $isSingle, true, $this->bot->getPostData());
                } else {
                    continue;
                }
            } else {
                $results = $this->getBot()->extractValuesWithSelectorData($this->bot->getCrawler(), $selectorData, "html", false, $isSingle, true, $this->bot->getPostData());
            }

            if (!$results) continue;

            $result = '';

            // If the results is an array, combine all the data into a single string.
            if(is_array($results)) {
                foreach($results as $key => $r) $result .= $r;
            } else {
                $result = $results;
            }

            // Find and replace in custom short codes
            $currentFindReplaces = [];
            foreach($shortCodeSpecificFindAndReplaces as $key => $item) {
                // If this replacement does not belong to the current short code, continue.
                if(Utils::array_get($item, "short_code") != $selectorData["short_code"]) continue;

                // Store the find-replace
                $currentFindReplaces[] = $item;

                // Remove this replacement configuration since it cannot be used for another short code.
                unset($shortCodeSpecificFindAndReplaces[$key]);
            }

            // Apply the replacements that are specific for current short code
            $result = $this->bot->applyFindAndReplaces($currentFindReplaces, $result, null, true, $this->bot->getPostUrl());

            // Apply find-and-replaces
            $result = $this->bot->findAndReplace($findAndReplacesForCustomShortCodes, $result, true, $this->bot->getPostUrl());

            $shortCodeContent[] = [
                "data"          =>  $result,
                "short_code"    =>  $selectorData["short_code"]
            ];
        }

        if(!empty($shortCodeContent)) {
            $this->bot->getPostData()->setShortCodeData($shortCodeContent);
        }
    }
}