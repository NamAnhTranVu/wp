<?php

namespace KDNAutoLeech\Objects\Crawling\Preparers\Post;


use KDNAutoLeech\Objects\Crawling\Preparers\Post\Base\AbstractPostBotPreparer;
use KDNAutoLeech\Objects\Enums\InformationMessage;
use KDNAutoLeech\Objects\Enums\InformationType;
use KDNAutoLeech\Objects\Informing\Information;
use KDNAutoLeech\Objects\Informing\Informer;

class PostCustomTaxonomyPreparer extends AbstractPostBotPreparer {

    private $customTaxonomies;

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

        $this->customTaxonomies = [];

        // Get custom taxonomy with selectors
        $this->prepareCustomTaxonomyWithSelectors();

        // Get manually added custom post taxonomy
        $this->prepareManuallyAddedCustomTaxonomy();

        // If there is no custom taxonomy, stop.
        if(empty($this->customTaxonomies)) return;

        // Store it
        $this->bot->getPostData()->setCustomTaxonomies($this->customTaxonomies);
    }

    /**
     * Finds the custom taxonomy whose selectors are specified and sets them to {@link $customTaxonomies}
     * @since 1.8.0
     */
    private function prepareCustomTaxonomyWithSelectors() {

        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        if ($this->childPost) {
            $postCustomPostTaxonomySelectors = $this->bot->getSetting('_child_post_custom_taxonomy_selectors');
        } else {
            $postCustomPostTaxonomySelectors = $this->bot->getSetting('_post_custom_taxonomy_selectors');
        }

        // Get all ajax data.
        $allAjaxData = $this->bot->getPostData()->getAjaxData();

        // No need to continue if there is no selector.
        if(empty($postCustomPostTaxonomySelectors)) return;

        foreach ($postCustomPostTaxonomySelectors as $selectorData) {
            // If there is no taxonomy, continue with the next one.
            if (!isset($selectorData["taxonomy"]) || empty($selectorData["taxonomy"])) continue;

            $isMultiple = isset($selectorData["multiple"]);

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

            // Validate the taxonomy's existence
            $taxonomyName = $selectorData["taxonomy"];
            if (!$this->validateTaxonomyExistence($taxonomyName)) continue;

            $isAppend = isset($selectorData["append"]);

            // Add the values
            $this->customTaxonomies[] = [
                "data"      =>  $results,
                "taxonomy"  =>  $taxonomyName,
                "append"    =>  $isAppend ? 1 : 0,
            ];

        }
    }

    /**
     * Prepares the manually-entered custom taxonomy and sets them to {@link $customTaxonomies}
     * @since 1.8.0
     */
    private function prepareManuallyAddedCustomTaxonomy() {
        
        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        if ($this->childPost) {
            $customPostTaxonomyData = $this->bot->getSetting('_child_post_custom_taxonomy');
        } else {
            $customPostTaxonomyData = $this->bot->getSetting('_post_custom_taxonomy');
        }

        // No need to continue if there is no custom taxonomy.
        if(empty($customPostTaxonomyData)) return;

        foreach($customPostTaxonomyData as $taxonomyData) {
            if(!isset($taxonomyData["taxonomy"]) || !$taxonomyData["taxonomy"] || !isset($taxonomyData["value"])) continue;
            $isAppend = isset($taxonomyData["append"]);

            // Validate the taxonomy's existence
            $taxonomyName = $taxonomyData["taxonomy"];
            if (!$this->validateTaxonomyExistence($taxonomyName)) continue;

            $this->customTaxonomies[] = [
                "data"      =>  $taxonomyData["value"],
                "taxonomy"  =>  $taxonomyName,
                "append"    =>  $isAppend ? 1 : 0,
            ];
        }
    }

    /**
     * @param string $taxName Name of the taxonomy
     * @return bool True if the taxonomy is valid. Otherwise, false.
     * @since 1.8.0
     */
    private function validateTaxonomyExistence($taxName) {
        // If the taxonomy name is not valid, return false.
        if (!$taxName) return false;

        // If taxonomy does not exist, notify the user and return false.
        if (!taxonomy_exists($taxName)) {
            Informer::add(Information::fromInformationMessage(
                InformationMessage::TAXONOMY_DOES_NOT_EXIST,
                sprintf(_kdn('Taxonomy: %1$s'), $taxName),
                InformationType::INFO
            )->addAsLog());

            return false;
        }

        // This is a valid taxonomy.
        return true;
    }

}