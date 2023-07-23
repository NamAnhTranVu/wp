<?php

namespace KDNAutoLeech\Objects\Crawling\Preparers\Post;


use KDNAutoLeech\Objects\Crawling\Preparers\Post\Base\AbstractPostBotPreparer;
use KDNAutoLeech\Objects\Informing\Informer;
use KDNAutoLeech\Objects\OptionsBox\OptionsBoxService;
use KDNAutoLeech\Utils;

class PostPaginationInfoPreparer extends AbstractPostBotPreparer {

    /** @var array */
    private $ajaxData;

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

        if ($this->childPost) {
            $postIsPaginate = $this->bot->getSettingForCheckbox('_child_post_paginate');
        } else {
            $postIsPaginate = $this->bot->getSettingForCheckbox('_post_paginate');
        }

        $this->ajaxData = $this->bot->getPostData()->getAjaxData();

        // Add whether or not to paginate the post when saving to the db
        $this->bot->getPostData()->setPaginate($postIsPaginate);

        // Before clearing the content, check if the post should be paginated and take related actions.
        // Do this before clearing the content, because pagination might be inside the content and the user might mark
        // it as unnecessary element.
        if(!$postIsPaginate) return;

        // Prepare next page URL
        $this->prepareNextPageUrl();

        // Prepare all page URLs
        $this->prepareAllPageUrls();
    }

    /**
     * Prepares next page URL
     * @since 1.8.0
     */
    private function prepareNextPageUrl() {

        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        if ($this->childPost) {
            $postNextPageUrlSelectors = $this->bot->getSetting('_child_post_next_page_url_selectors');
        } else {
            $postNextPageUrlSelectors = $this->bot->getSetting('_post_next_page_url_selectors');
        }

        $allAjaxData = $this->ajaxData;

        // Get next page URL of the post
        foreach($postNextPageUrlSelectors as $nextPageSelector) {
            $attr = isset($nextPageSelector["attr"]) && $nextPageSelector["attr"] ? $nextPageSelector["attr"] : "href";

            /**
             * Extract data with Ajax.
             * @since 2.1.8
             */
            if (isset($nextPageSelector["ajax"]) && $ajaxNumber = $nextPageSelector["ajax"]) {

                // Get the ajax data with key number in all ajax data.
                $ajaxData = isset($allAjaxData[$ajaxNumber - 1]) ? $allAjaxData[$ajaxNumber - 1] : '';

                if ($ajaxData) {
                    // Get the next page URL
                    $nextPageUrl = $this->bot->extractData($ajaxData, $nextPageSelector["selector"], $attr, false, true, true);
                } else {
                    continue;
                }
            } else {
                // Get the next page URL
                $nextPageUrl = $this->bot->extractData($this->bot->getCrawler(), $nextPageSelector["selector"], $attr, false, true, true);
            }

            if (!$nextPageUrl) continue;

            // Resolve the next page URL
            try {
                $nextPageUrl = $this->bot->resolveUrl($nextPageUrl);
            } catch (\Exception $e) {
                // Nothing to do here. This is a quite unlikely exception, since this method is run after
                // the post URL is set to the post bot.
                Informer::addError(_kdn('URL could not be resolved') . ' - ' . $nextPageUrl)->addAsLog();
            }

            // Apply options box settings
            $optionsBoxApplier = OptionsBoxService::getInstance()->createApplierFromSelectorData($nextPageSelector);
            if ($optionsBoxApplier) $nextPageUrl = $optionsBoxApplier->apply($nextPageUrl, $this->bot->getPostUrl());

            $this->bot->getPostData()->setNextPageUrl($nextPageUrl);
            break;
        }

    }

    /**
     * Prepares all page URLs
     * @since 1.8.0
     */
    private function prepareAllPageUrls() {

        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        if ($this->childPost) {
            $postAllPageUrlsSelectors = $this->bot->getSetting('_child_post_next_page_all_pages_url_selectors');
        } else {
            $postAllPageUrlsSelectors = $this->bot->getSetting('_post_next_page_all_pages_url_selectors');
        }

        $allAjaxData = $this->ajaxData;

        // Get all page URLs of the post
        foreach($postAllPageUrlsSelectors as $selector) {
            $attr = isset($selector["attr"]) && $selector["attr"] ? $selector["attr"] : "href";

            /**
             * Extract data with Ajax.
             * @since 2.1.8
             */
            if (isset($selector["ajax"]) && $ajaxNumber = $selector["ajax"]) {

                // Get the ajax data with key number in all ajax data.
                $ajaxData = isset($allAjaxData[$ajaxNumber - 1]) ? $allAjaxData[$ajaxNumber - 1] : '';

                if ($ajaxData) {
                    // Get all page URLs
                    $allPageUrls = $this->bot->extractData($ajaxData, $selector["selector"], $attr, "part_url", false, true);
                } else {
                    continue;
                }
            } else {
                // Get all page URLs
                $allPageUrls = $this->bot->extractData($this->bot->getCrawler(), $selector["selector"], $attr, "part_url", false, true);
            }

            if (!$allPageUrls) continue;

            // Sort the URLs according to their position in the source code
            $allPageUrls = Utils::array_msort($allPageUrls, ["start" => SORT_ASC]);

            // Prepare the URLs.
            foreach($allPageUrls as &$item) {
                if (!$item['data']) continue;

                try {
                    $item['data'] = $this->bot->resolveUrl($item['data']);
                } catch (\Exception $e) {
                    // Nothing to do here. This is a quite unlikely exception, since this method is run after
                    // the post URL is set to the post bot.
                    Informer::addError(_kdn('URL could not be resolved') . ' - ' . $item['data'])->addAsLog();
                }
            }

            // Apply options box settings
            $optionsBoxApplier = OptionsBoxService::getInstance()->createApplierFromSelectorData($selector);
            if ($optionsBoxApplier) $allPageUrls = $optionsBoxApplier->applyToArray($allPageUrls, 'data', $this->bot->getPostUrl());

            $this->bot->getPostData()->setAllPageUrls($allPageUrls);
            break;
        }
    }
}