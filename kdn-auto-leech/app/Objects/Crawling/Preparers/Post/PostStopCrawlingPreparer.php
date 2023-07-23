<?php

namespace KDNAutoLeech\Objects\Crawling\Preparers\Post;


use KDNAutoLeech\Objects\Crawling\Preparers\Post\Base\AbstractPostBotPreparer;
use KDNAutoLeech\Utils;
use KDNAutoLeech\Factory;
use KDNAutoLeech\KDNAutoLeech;

class PostStopCrawlingPreparer extends AbstractPostBotPreparer {

    /** @var bool */
    private $childPost;

    /**
     * Prepare the post bot
     *
     * @return void
     */
    public function prepare($urlId = null, $lastPageNow = false) {

        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        $this->childPost = $this->bot->getPostData()->getChildPost();

        if ($lastPageNow) {
            $this->prepareStopCrawlingFirstPage($urlId);
        }

        $this->prepareStopCrawlingAllRun($urlId);

        $this->prepareStopCrawlingEachRun();
    }

    /**
     * Prepares stop crawling for the first page of post using selectors.
     *
     * @since 2.1.8
     */
    private function prepareStopCrawlingFirstPage($urlId = null) {
        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        if ($this->childPost) {
            $stopCrawlingFirstPage = $this->bot->getSetting('_child_post_stop_crawling_first_page');
        } else {
            $stopCrawlingFirstPage = $this->bot->getSetting('_post_stop_crawling_first_page');
        }

        if (!$stopCrawlingFirstPage) return;

        $crawler = $this->bot->getPostData()->getAjaxData()['first_page'];

        foreach($stopCrawlingFirstPage as $selectorData) {
            if(!isset($selectorData["selector"])) continue;

            // Prepare the $matches
            if (isset($selectorData["regex"]) && $selectorData["regex"]) {
                $selectorData["matches"] = preg_replace('/%%target_url%%/i', preg_quote($this->getBot()->getPostUrl(), '/'), $selectorData["matches"]);
                $matches = !starts_with($selectorData["matches"], '/') ? '/' . $selectorData["matches"] . '/' : $selectorData["matches"];
            } else {
                $selectorData["matches"] = preg_replace('/%%target_url%%/i', $this->getBot()->getPostUrl(), $selectorData["matches"]);
                $matches = '/' . preg_quote($selectorData["matches"], '/') . '/';
            }

            // Extract data and find the matches.
            if($stopCrawlingFirst = $this->getBot()->extractValuesWithSelectorData($crawler, $selectorData, "html", false, false, true)){
                foreach ($stopCrawlingFirst as $stopCrawling) {
                    if(preg_match($matches, $stopCrawling)){

                        // Update $matches to the $postData.
                        $this->bot->getPostData()->setStopCrawlingAllRun($selectorData["matches"]);

                        // If have $urlId that means here is not a test. So, update stop_crawling_all in database.
                        if ($urlId) {
                            $result = '';
                            global $wpdb;
                            $query = "SELECT stop_crawling_all FROM " . $wpdb->prefix . "kdn_urls WHERE id = %d";
                            $results = $wpdb->get_results($wpdb->prepare($query, $urlId));
                            if(isset($results) && $results){
                                $result = $results[0]->stop_crawling_all;
                            }

                            $results = $wpdb->update(
                                $wpdb->prefix . 'kdn_urls',
                                [
                                    'stop_crawling_all'     =>  ($result ? $result . '|' : '') . $selectorData["matches"]
                                ],
                                [
                                    'id'                    =>  $urlId
                                ]
                            );
                        }

                        break 2;
                    }
                }
            }
        }

    }

    /**
     * Prepares stop crawling in all run using selectors.
     *
     * @since 2.1.8
     */
    private function prepareStopCrawlingAllRun($urlId = null) {
        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        if ($this->childPost) {
            $stopCrawlingAllRun = $this->bot->getSetting('_child_post_stop_crawling_all_run');
        } else {
            $stopCrawlingAllRun = $this->bot->getSetting('_post_stop_crawling_all_run');
        }

        if (!$stopCrawlingAllRun) return;

        // Get all ajax data.
        $allAjaxData = $this->bot->getPostData()->getAjaxData();

        // Get old matches.
        $oldMatches = $this->bot->getPostData()->getStopCrawlingAllRun();

        foreach($stopCrawlingAllRun as $selectorData) {

            if(!isset($selectorData["selector"])) continue;

            // Prepare the $matches
            if (isset($selectorData["regex"]) && $selectorData["regex"]) {
                $selectorData["matches"] = preg_replace('/%%target_url%%/i', preg_quote($this->getBot()->getPostUrl(), '/'), $selectorData["matches"]);
                $matches = !starts_with($selectorData["matches"], '/') ? '/' . $selectorData["matches"] . '/' : $selectorData["matches"];
            } else {
                $selectorData["matches"] = preg_replace('/%%target_url%%/i', $this->getBot()->getPostUrl(), $selectorData["matches"]);
                $matches = '/' . preg_quote($selectorData["matches"], '/') . '/';
            }

            /**
             * Extract data with Ajax.
             * @since 2.1.8
             */
            if (isset($selectorData["ajax"]) && $ajaxNumber = $selectorData["ajax"]) {

                // Get the ajax data with key number in all ajax data.
                $ajaxData = isset($allAjaxData[$ajaxNumber - 1]) ? $allAjaxData[$ajaxNumber - 1] : '';

                if ($ajaxData) {
                    $stopCrawlingAll = $this->getBot()->extractValuesWithSelectorData($ajaxData, $selectorData, "html", false, false, true);
                } else {
                    continue;
                }
            } else {
                $stopCrawlingAll = $this->getBot()->extractValuesWithSelectorData($this->bot->getCrawler(), $selectorData, "html", false, false, true);
            }

            if (!$stopCrawlingAll) continue;

            // Extract data and find the matches.
            foreach ($stopCrawlingAll as $stopCrawling) {
                if(preg_match($matches, $stopCrawling)) {
                    // Update $matches to the $postData.
                    $this->bot->getPostData()->setStopCrawlingAllRun(($oldMatches ? $oldMatches . '|' : '') . $selectorData["matches"]);

                    // If have $urlId that means here is not a test. So, update stop_crawling_all in database.
                    if ($urlId) {
                        $result = '';
                        global $wpdb;
                        $query = "SELECT stop_crawling_all FROM " . $wpdb->prefix . "kdn_urls WHERE id = %d";
                        $results = $wpdb->get_results($wpdb->prepare($query, $urlId));
                        if(isset($results) && $results){
                            $result = $results[0]->stop_crawling_all;
                        }

                        $results = $wpdb->update(
                            $wpdb->prefix . 'kdn_urls',
                            [
                                'stop_crawling_all'     =>  ($result ? $result . '|' : '') . $selectorData["matches"]
                            ],
                            [
                                'id'                    =>  $urlId
                            ]
                        );
                    }

                    break 2;
                }
            }
        }

    }

    /**
     * Prepares stop crawling in each run using selectors.
     *
     * @since 2.1.8
     */
    private function prepareStopCrawlingEachRun() {
        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        if ($this->childPost) {
            $stopCrawlingEachRun = $this->bot->getSetting('_child_post_stop_crawling_each_run');
        } else {
            $stopCrawlingEachRun = $this->bot->getSetting('_post_stop_crawling_each_run');
        }

        if (!$stopCrawlingEachRun) return;

        // Get all ajax data.
        $allAjaxData = $this->bot->getPostData()->getAjaxData();

        foreach($stopCrawlingEachRun as $selectorData) {

            if(!isset($selectorData["selector"])) continue;

            // Prepare the $matches
            if (isset($selectorData["regex"]) && $selectorData["regex"]) {
                $selectorData["matches"] = preg_replace('/%%target_url%%/i', preg_quote($this->getBot()->getPostUrl(), '/'), $selectorData["matches"]);
                $matches = !starts_with($selectorData["matches"], '/') ? '/' . $selectorData["matches"] . '/' : $selectorData["matches"];
            } else {
                $selectorData["matches"] = preg_replace('/%%target_url%%/i', $this->getBot()->getPostUrl(), $selectorData["matches"]);
                $matches = '/' . preg_quote($selectorData["matches"], '/') . '/';
            }

            /**
             * Extract data with Ajax.
             * @since 2.1.8
             */
            if (isset($selectorData["ajax"]) && $ajaxNumber = $selectorData["ajax"]) {

                // Get the ajax data with key number in all ajax data.
                $ajaxData = isset($allAjaxData[$ajaxNumber - 1]) ? $allAjaxData[$ajaxNumber - 1] : '';

                if ($ajaxData) {
                    $stopCrawlingEach = $this->getBot()->extractValuesWithSelectorData($ajaxData, $selectorData, "html", false, false, true);
                } else {
                    continue;
                }
            } else {
                $stopCrawlingEach = $this->getBot()->extractValuesWithSelectorData($this->bot->getCrawler(), $selectorData, "html", false, false, true);
            }

            if (!$stopCrawlingEach) continue;

            foreach ($stopCrawlingEach as $stopCrawling) {
                // Extract data and find the matches.
                if(preg_match($matches, $stopCrawling)){

                    // Update $matches to the $postData.
                    $this->bot->getPostData()->setStopCrawlingEachRun($selectorData["matches"]);
                    
                    break 2;
                }
            }
        }

    }

}