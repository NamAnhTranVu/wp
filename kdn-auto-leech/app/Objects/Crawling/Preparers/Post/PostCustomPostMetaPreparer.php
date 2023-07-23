<?php

namespace KDNAutoLeech\Objects\Crawling\Preparers\Post;


use KDNAutoLeech\Objects\Crawling\Preparers\Post\Base\AbstractPostBotPreparer;
use KDNAutoLeech\Utils;

class PostCustomPostMetaPreparer extends AbstractPostBotPreparer {

    /** @var array */
    private $customMeta = [];

    /** @var bool */
    private $childPost;

    private $translator;

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

        $this->customMeta = [];

        // Get custom meta with selectors
        $this->prepareCustomMetaWithSelectors();

        // Get manually added custom post meta
        $this->prepareManuallyAddedCustomMeta();

        // Apply find and replace options
        $this->applyFindReplaces();

        // If there is no custom meta, stop.
        if(empty($this->customMeta)) return;

        // Store it
        $this->bot->getPostData()->setCustomMeta($this->customMeta);

    }

    /**
     * Finds the custom meta whose selectors are specified and sets them to {@link $customMeta}
     * @since 1.8.0
     */
    private function prepareCustomMetaWithSelectors() {

        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        if ($this->childPost) {
            $postCustomPostMetaSelectors = $this->bot->getSetting('_child_post_custom_meta_selectors');
        } else {
            $postCustomPostMetaSelectors = $this->bot->getSetting('_post_custom_meta_selectors');
        }

        // Get all ajax data.
        $allAjaxData = $this->bot->getPostData()->getAjaxData();

        // No need to continue if there is no selector.
        if(empty($postCustomPostMetaSelectors)) return;

        foreach ($postCustomPostMetaSelectors as $selectorData) {
            // If there is no meta key, continue with the next one.
            if (!isset($selectorData["meta_key"]) || empty($selectorData["meta_key"])) continue;

            $isMultiple = isset($selectorData["multiple"]);

            // Whether to this is json post meta or not
            $isJSON     = isset($selectorData["json"]);

            /**
             * Extract data with Ajax.
             * @since 2.1.8
             */
            if (isset($selectorData["ajax"]) && $ajaxNumber = $selectorData["ajax"]) {

                // Get the ajax data with key number in all ajax data.
                $ajaxData = isset($allAjaxData[$ajaxNumber - 1]) ? $allAjaxData[$ajaxNumber - 1] : '';

                if ($ajaxData) {
                    // Extract the values
                    $results = $this->bot->extractValuesWithSelectorData($ajaxData, $selectorData, 'text', false, !$isMultiple, true, $this->bot->getPostData());
                } else {
                    continue;
                }
            } else {
                // Extract the values
                $results = $this->bot->extractValuesWithSelectorData($this->getBot()->getCrawler(), $selectorData, 'text', false, !$isMultiple, true, $this->bot->getPostData());
            }
            
            if (!$results) continue;

            // Add the values
            $this->customMeta[] = [
                "data"      =>  $results,
                "meta_key"  =>  $selectorData["meta_key"],
                "multiple"  =>  $isMultiple ? 1 : 0,
                "json"      =>  $isJSON ? 1 : 0
            ];

        }
    }

    /**
     * Prepares the manually-entered custom meta and sets them to {@link $customMeta}
     * @since 1.8.0
     */
    private function prepareManuallyAddedCustomMeta() {

        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        if ($this->childPost) {
            $customPostMetaData = $this->bot->getSetting('_child_post_custom_meta');
        } else {
            $customPostMetaData = $this->bot->getSetting('_post_custom_meta');
        }

        // No need to continue if there is no custom meta.
        if(empty($customPostMetaData)) return;

        foreach($customPostMetaData as $metaData) {
            if(!isset($metaData["key"]) || !$metaData["key"] || !isset($metaData["value"])) continue;

            $isMultiple = isset($metaData["multiple"]);

            // Whether to this is json post meta or not
            $isJSON     = isset($metaData["json"]);

            /**
            * Create post meta by attachment datas. We will save all values by 2 cases:
            *
            * - Case 1: If      have $isMultiple, explode by new lines.
            * - Case 2: If NOT  have $isMultiple, save this as a string.
            *
            * @since 2.1.8
            */
            $AllValues = $isMultiple ? explode("\n", $metaData["value"]) : $metaData["value"];

            // Holds all attachments.
            $AllAttachments = $this->bot->getPostData()->getAttachmentData();

            // Holds all direct files.
            $AllDirectFiles = [];
            if ($AllAttachments) {
                foreach ($AllAttachments as $Attachment) {
                    if ($Attachment->isGalleryImage() === 'direct-file') {
                        $AllDirectFiles[] = $Attachment->getLocalUrl();
                    }
                }
            }

            /**
            * If the value matched a %%attachment_item_X%% shortcode.
            *
            * @since 2.1.8
            */
            if(strpos($metaData["value"],'%%attachment_item') !== false && $AllAttachments){
                if(is_array($AllValues)){
                    foreach($AllValues as $key => &$Value){
                        preg_match_all('/%%attachment_item_(.+?)%%/i', $Value, $matches);
                        foreach($matches[1] as $num){
                            if (isset($AllAttachments[$num])) {
                                $AllValues[$key] = preg_replace(
                                    '/%%attachment_item_'.$num.'%%/i',
                                    $AllAttachments[$num]->getLocalUrl(),
                                    $AllValues[$key]
                                );
                            } else {
                                $AllValues[$key] = preg_replace(
                                    '/%%attachment_item_'.$num.'%%/i',
                                    '',
                                    $AllValues[$key]
                                );
                            }
                        }
                    }
                } else {
                    preg_match_all('/%%attachment_item_(.+?)%%/i', $AllValues, $matches);
                    foreach($matches[1] as $num){
                        if (isset($AllAttachments[$num])) {
                            $AllValues = preg_replace(
                                '/%%attachment_item_'.$num.'%%/i',
                                $AllAttachments[$num]->getLocalUrl(),
                                $AllValues
                            );
                        } else {
                            $AllValues = preg_replace('/%%attachment_item_'.$num.'%%/i', '', $AllValues);
                        }
                    }
                }
            }

            /**
            * If the value matched a %%direct_file_X%% shortcode.
            *
            * @since 2.1.8
            */
            if(strpos($metaData["value"],'%%direct_file') !== false && $AllDirectFiles){
                if(is_array($AllValues)){
                    foreach($AllValues as $key => &$Value){
                        preg_match_all('/%%direct_file_(.+?)%%/i', $Value, $matches);
                        foreach($matches[1] as $num){
                            if (isset($AllDirectFiles[$num])) {
                                $AllValues[$key] = preg_replace(
                                    '/%%direct_file_'.$num.'%%/i',
                                    $AllDirectFiles[$num],
                                    $AllValues[$key]
                                );
                            } else {
                                $AllValues[$key] = preg_replace(
                                    '/%%direct_file_'.$num.'%%/i',
                                    '',
                                    $AllValues[$key]
                                );
                            }
                        }
                    }
                } else {
                    preg_match_all('/%%direct_file_(.+?)%%/i', $AllValues, $matches);
                    foreach($matches[1] as $num){
                        if (isset($AllDirectFiles[$num])) {
                            $AllValues = preg_replace(
                                '/%%direct_file_'.$num.'%%/i',
                                $AllDirectFiles[$num],
                                $AllValues
                            );
                        } else {
                            $AllValues = preg_replace('/%%direct_file_'.$num.'%%/i', '', $AllValues);
                        }
                    }
                }
            }

            // Replace %%target_url%% with current target URL.
            if(is_array($AllValues)){
                foreach($AllValues as $key => &$Value){
                    $AllValues[$key] = str_replace('%%target_url%%', $this->bot->getPostUrl(), $AllValues[$key]);
                }
            } else {
                $AllValues = str_replace('%%target_url%%', $this->bot->getPostUrl(), $AllValues);
            }

            // Save all post metas.
            $this->customMeta[] = [
                "data"      =>  $AllValues,
                "meta_key"  =>  $metaData["key"],
                "multiple"  =>  $isMultiple ? 1 : 0,
                "json"      =>  $isJSON ? 1 : 0
            ];
        }
    }

    /**
     * Applies find and replace options for the custom meta
     * @since 1.8.0
     */
    private function applyFindReplaces() {

        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        if ($this->childPost) {
            $postMetaSpecificFindAndReplaces = $this->bot->getSetting('_child_post_find_replace_custom_meta');
        } else {
            $postMetaSpecificFindAndReplaces = $this->bot->getSetting('_post_find_replace_custom_meta');
        }

        // If there is no custom meta or find-replace options, stop.
        if(!$this->customMeta || !$postMetaSpecificFindAndReplaces) return;

        // Find replace in specific custom meta
        // Loop over each custom meta created previously
        foreach($this->customMeta as $i => &$customMetaItem) {
            // Get current meta item's meta key and data
            $currentMetaKey = Utils::array_get($customMetaItem, "meta_key", null);
            $results        = Utils::array_get($customMetaItem, "data");
            $isMultiple     = Utils::array_get($customMetaItem, "multiple");
            $isJSON         = Utils::array_get($customMetaItem, "json");

            // Continue with the next one if meta key or data does not exist in the current custom meta item.
            if(!$currentMetaKey || !$results) continue;

            // Get find-replaces for this meta key
            $currentFindReplaces = [];
            foreach($postMetaSpecificFindAndReplaces as $key => $item) {
                // If the meta key of find-replace is not the same as the current meta key, continue with the next one.
                if($item["meta_key"] != $currentMetaKey) continue;

                // Store the find-replace
                $currentFindReplaces[] = $item;

                // Remove this find-replace since this cannot be applied to another meta key. By this way, we will not
                // check this find-replace config unnecessarily for other meta keys.
                // unset($postMetaSpecificFindAndReplaces[$key]);
            }

            // Apply find-replaces
            $results = $this->bot->applyFindAndReplaces($currentFindReplaces, $results, null, true, $this->bot->getPostUrl());

            // If $isJSON and when finish the find and replace
            if ($isJSON && $results) {
                if (!$isMultiple) {
                    $results = json_decode($results, true);
                } else {
                    foreach ($results as $key => $result) {
                        $results[$key] = json_decode($result, true);
                    }
                }
            }

            // If there are results, reassign it to the current custom meta item.
            $customMetaItem["data"] = $results;
        }
    }
}