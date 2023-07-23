<?php

namespace KDNAutoLeech\Objects\Crawling\Preparers\Post;


use KDNAutoLeech\Objects\Crawling\Preparers\Post\Base\AbstractPostBotPreparer;
use KDNAutoLeech\Utils;
use KDNAutoLeech\KDNAutoLeech;

class PostAjaxPreparer extends AbstractPostBotPreparer {

    /** @var bool */
    private $childPost;

    /** @var array*/
    private $allPostHeaders = [];

    /** @var array*/
    private $allAjaxHeaders = [];

    /** @var array */
    private $allAjaxData = [];

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

        $this->prepareHeaders();

        if ($lastPageNow) {
            // Prepare ajax data for first page of the post.
            $this->prepareAjaxFirstPage($urlId);
        }

        // Prepare ajax data.
        $this->prepareAjax();
    }

    /**
     * Prepares headers for ajax.
     *
     * @since 2.1.8
     */
    private function prepareHeaders() {

        /**
         * Whether to activate Custom HEADERs or not.
         *
         * @since 2.1.8
         */
        $customHeaders = $this->bot->getSetting('_custom_headers');
        if (!$customHeaders) return;

        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        if ($this->childPost) {
            $postHeaders            = $this->bot->getSetting('_child_post_custom_headers');

            $ajaxHeadersSelectors   = $this->bot->getSetting('_child_post_ajax_headers_selectors');
            $ajaxCustomHeaders      = $this->bot->getSetting('_child_post_ajax_custom_headers');
        } else {
            $postHeaders            = $this->bot->getSetting('_post_custom_headers');

            $ajaxHeadersSelectors   = $this->bot->getSetting('_post_ajax_headers_selectors');
            $ajaxCustomHeaders      = $this->bot->getSetting('_post_ajax_custom_headers');
        }

        $allHeaders = [];

        /**
         * Get the post headers.
         * We are preparing the post headers will be used by prepareAjaxFirstPage()
         *
         * @since 2.1.8
         */
        if (!empty($postHeaders) && is_array($postHeaders)) {
            foreach ($postHeaders as $postHeader) {
                if (empty($postHeader['key'])) continue;
                $postHeader['value'] = preg_replace('/%%target_url%%/i', $this->getBot()->getPostUrl(), $postHeader['value']);
                $allHeaders[$postHeader['key']] = $postHeader['value'];
            }

            $this->allPostHeaders = !empty($allHeaders) ? $allHeaders : [];
        }

        // Reset all headers
        $allHeaders = [];

        /**
         * Get the post ajax headers.
         *
         * @since 2.1.8
         */
        // Prepare the ajax headers by selectors
        if (!empty($ajaxHeadersSelectors) && is_array($ajaxHeadersSelectors)) {
            foreach ($ajaxHeadersSelectors as $selectorData) {
                if (empty($selectorData['header'])) continue;
                $headerValue = $this->getBot()->extractValuesWithSelectorData($this->bot->getCrawler(), $selectorData, "text", false, true, true);
                $allHeaders[$selectorData['header']] = $headerValue;
            }
        }

        // Prepare the custom ajax headers
        if (!empty($ajaxCustomHeaders) && is_array($ajaxCustomHeaders)) {
            foreach ($ajaxCustomHeaders as $ajaxCustomHeader) {
                if (empty($ajaxCustomHeader['key'])) continue;
                $allHeaders[$ajaxCustomHeader['key']] = $ajaxCustomHeader['value'];
            }
        }

        if (!empty($allHeaders)) $this->allAjaxHeaders = $allHeaders;

    }

    /**
     * Prepares ajax data for first page of the post using ajax selectors.
     *
     * @since 2.1.8
     */
    private function prepareAjaxFirstPage($urlId = null) {
        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        if ($this->childPost) {
            $stopCrawlingFirstPage              = $this->bot->getSetting('_child_post_stop_crawling_first_page');

            $findAndReplacesForRawHtml          = $this->bot->getSetting('_child_post_find_replace_raw_html');
            $findAndReplacesForFirstLoad        = $this->bot->getSetting('_child_post_find_replace_first_load');
            $postUnnecessaryElementSelectors    = $this->bot->getSetting('_child_post_unnecessary_element_selectors');
        } else {
            $stopCrawlingFirstPage              = $this->bot->getSetting('_post_stop_crawling_first_page');

            $findAndReplacesForRawHtml          = $this->bot->getSetting('_post_find_replace_raw_html');
            $findAndReplacesForFirstLoad        = $this->bot->getSetting('_post_find_replace_first_load');
            $postUnnecessaryElementSelectors    = $this->bot->getSetting('_post_unnecessary_element_selectors');
        }

        if (!$stopCrawlingFirstPage) return;

        $allAjaxData = [];

        // Get the first page url from database
        $firstPageUrl = '';
        global $wpdb;
        $query = "SELECT url FROM " . $wpdb->prefix . "kdn_urls WHERE id = %d";
        $results = $wpdb->get_results($wpdb->prepare($query, $urlId));
        if(isset($results) && $results){
            $firstPageUrl = $results[0]->url;
        }

        if (!$firstPageUrl) return;

        $postMethods = $this->bot->getSetting('_post_custom_method');

        /**
         * Custom post method
         *
         * @since 2.2.8
         */
        $parseArray = '';
        $method     = 'GET';
        if (!empty($postMethods)) {
            foreach ($postMethods as $postMethod) {
                // Prepare the $matches
                if (isset($postMethod["regex"]) && $postMethod["regex"]) {
                    $postMethod["matches"] = preg_replace('/%%target_url%%/i', preg_quote($this->getBot()->getPostUrl(), '/'), $postMethod["matches"]);
                    $matches = !starts_with($postMethod["matches"], '/') ? '/' . $postMethod["matches"] . '/' : $postMethod["matches"];
                } else {
                    $postMethod["matches"] = preg_replace('/%%target_url%%/i', $this->getBot()->getPostUrl(), $postMethod["matches"]);
                    $matches = '/' . preg_quote($postMethod["matches"], '/') . '/';
                }

                if(preg_match($matches, $firstPageUrl)){
                    $parseArray = $postMethod["parse"] ?: $parseArray;
                    $method     = $postMethod["method"] ?: $method;
                    break;
                }
            }
        }

        // Get the data from first page url
        $ajaxData = $this->getBot()->request($firstPageUrl, $method, $findAndReplacesForRawHtml, $this->allPostHeaders, $parseArray);

        if ($ajaxData) {

            $allAjaxData['url']['first_page'] = $firstPageUrl;

            // Make initial replacements
            $ajaxData = $this->bot->makeInitialReplacements($ajaxData, $findAndReplacesForFirstLoad, true, $this->getBot()->getPostUrl());

            if ($this->childPost) {
                // Apply HTML manipulations
                $this->bot->applyFindAndReplaceInElementAttributes($ajaxData,   '_child_post_find_replace_element_attributes', $this->bot->getPostUrl());
                $this->bot->applyExchangeElementAttributeValues($ajaxData,      '_child_post_exchange_element_attributes');
                $this->bot->applyRemoveElementAttributes($ajaxData,             '_child_post_remove_element_attributes');
                $this->bot->applyFindAndReplaceInElementHTML($ajaxData,         '_child_post_find_replace_element_html', $this->bot->getPostUrl());
            } else {
                // Apply HTML manipulations
                $this->bot->applyFindAndReplaceInElementAttributes($ajaxData,   '_post_find_replace_element_attributes', $this->bot->getPostUrl());
                $this->bot->applyExchangeElementAttributeValues($ajaxData,      '_post_exchange_element_attributes');
                $this->bot->applyRemoveElementAttributes($ajaxData,             '_post_remove_element_attributes');
                $this->bot->applyFindAndReplaceInElementHTML($ajaxData,         '_post_find_replace_element_html', $this->bot->getPostUrl());
            }

            // Resolve relative URLs
            $this->bot->resolveRelativeUrls($ajaxData, $this->getBot()->getPostUrl());

            // Clear the crawler from unnecessary post elements
            $this->bot->removeElementsFromCrawler($ajaxData, $postUnnecessaryElementSelectors);

            $allAjaxData['first_page'] = $ajaxData;

            // setAjaxData in PostData. 
            $this->bot->getPostData()->setAjaxData($allAjaxData);

            // Set the $allAjaxData.
            $this->allAjaxData = $allAjaxData;
        }
    }

    /**
     * Prepares ajax data using ajax selectors.
     *
     * @since 2.1.8
     */
    private function prepareAjax() {

        if ($this->childPost) {
            $postAjaxActive = $this->bot->getSetting('_child_post_ajax');
        } else {
            $postAjaxActive = $this->bot->getSetting('_post_ajax');
        }

        if (!$postAjaxActive) return;

        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        if ($this->childPost) {
            // Get Ajax URLs
            $allAjaxUrls                        = $this->getValuesForSelectorSetting('_child_post_ajax_url_selectors', 'href', false, false, true);
            $allAjaxUrlsMethod                  = $this->bot->getSetting('_child_post_ajax_url_selectors');
            $customAjaxUrls                     = $this->bot->getSetting('_child_post_custom_ajax_url');

            $findAndReplacesForRawHtml          = $this->bot->getSetting('_child_post_ajax_find_replace_raw__html');
            $findAndReplacesForFirstLoad        = $this->bot->getSetting('_child_post_ajax_find_replace_first__load');
            $postUnnecessaryElementSelectors    = $this->bot->getSetting('_child_post_ajax_unnecessary_element__selectors');
            $notifyWhenEmptySelectors           = $this->bot->getSetting('_child_post_ajax_notify_empty_value_selectors');
        } else {
            // Get Ajax URLs
            $allAjaxUrls                        = $this->getValuesForSelectorSetting('_post_ajax_url_selectors', 'href', false, false, true);
            $allAjaxUrlsMethod                  = $this->bot->getSetting('_post_ajax_url_selectors');
            $customAjaxUrls                     = $this->bot->getSetting('_post_custom_ajax_url');

            $findAndReplacesForRawHtml          = $this->bot->getSetting('_post_ajax_find_replace_raw__html');
            $findAndReplacesForFirstLoad        = $this->bot->getSetting('_post_ajax_find_replace_first__load');
            $postUnnecessaryElementSelectors    = $this->bot->getSetting('_post_ajax_unnecessary_element__selectors');
            $notifyWhenEmptySelectors           = $this->bot->getSetting('_post_ajax_notify_empty_value_selectors');
        }

        if (!empty($allAjaxUrls)) {
            foreach ($allAjaxUrls as $key => &$ajaxUrlData) {
                $ajaxUrlData = [$ajaxUrlData[0]];
                if (isset($allAjaxUrlsMethod[$key]['parse'])) $ajaxUrlData['parse'] = $allAjaxUrlsMethod[$key]['parse'];
                $ajaxUrlData['method'] = $allAjaxUrlsMethod[$key]['method'];
                $ajaxUrlData['url'] = $ajaxUrlData[0];
                unset($ajaxUrlData[0]);
            }
        } else {
            $allAjaxUrls = [];
        }

        // Get $allAjaxData from $this->$allAjaxData.
        $allAjaxData = $this->allAjaxData;

        // Add custom ajax Urls to all ajax Urls.
        $allAjaxUrls = array_merge($allAjaxUrls, $customAjaxUrls);

        if (!$allAjaxUrls[0]) return;

        $allAjaxData['url'][0] = [];

        foreach ($allAjaxUrls as $key => $allAjaxUrl) {

            // If this is a valid URL, do that.
            if (filter_var($allAjaxUrl['url'], FILTER_VALIDATE_URL) !== false) {

                // Initialize some variable.
                $method         = 'GET';
                $parseArray     = '';
                $method         = $allAjaxUrl['method'] ?: $method;
                $parseArray     = $allAjaxUrl['parse'] ?: $parseArray;
                $allAjaxHeaders = $this->allAjaxHeaders;

                // Replace %%target_url%% to ajax URL.
                foreach ($allAjaxHeaders as $headerName => &$headerValue) {
                    $headerValue = preg_replace('/%%target_url%%/i', $allAjaxUrl['url'], $headerValue);
                }

                // Get data from ajax URL.
                $ajaxData = $this->getBot()->request($allAjaxUrl['url'], $method, $findAndReplacesForRawHtml, $allAjaxHeaders, $parseArray);

                // If we have ajax data.
                if ($ajaxData) {

                    $allAjaxData['url'][] = [
                        'parse'     => $parseArray,
                        'method'    => $method,
                        'url'       => $allAjaxUrl['url']
                    ];
                    
                    // Make initial replacements
                    $ajaxData = $this->bot->makeInitialReplacements($ajaxData, $findAndReplacesForFirstLoad, true, $allAjaxUrl['url']);

                    if ($this->childPost) {
                        // Apply HTML manipulations
                        $this->bot->applyFindAndReplaceInElementAttributes($ajaxData,   '_child_post_ajax_find_replace_element__attributes', $allAjaxUrl['url']);
                        $this->bot->applyExchangeElementAttributeValues($ajaxData,      '_child_post_ajax_exchange_element__attributes');
                        $this->bot->applyRemoveElementAttributes($ajaxData,             '_child_post_ajax_remove_element__attributes');
                        $this->bot->applyFindAndReplaceInElementHTML($ajaxData,         '_child_post_ajax_find_replace_element__html', $allAjaxUrl['url']);
                    } else {
                        // Apply HTML manipulations
                        $this->bot->applyFindAndReplaceInElementAttributes($ajaxData,   '_post_ajax_find_replace_element__attributes', $allAjaxUrl['url']);
                        $this->bot->applyExchangeElementAttributeValues($ajaxData,      '_post_ajax_exchange_element__attributes');
                        $this->bot->applyRemoveElementAttributes($ajaxData,             '_post_ajax_remove_element__attributes');
                        $this->bot->applyFindAndReplaceInElementHTML($ajaxData,         '_post_ajax_find_replace_element__html', $allAjaxUrl['url']);
                    }

                    // Resolve relative URLs
                    $this->bot->resolveRelativeUrls($ajaxData, $allAjaxUrl['url']);

                    // Clear the crawler from unnecessary post elements
                    $this->bot->removeElementsFromCrawler($ajaxData, $postUnnecessaryElementSelectors);

                    if (!KDNAutoLeech::isDoingTest() && $notifyWhenEmptySelectors) {
                        $this->bot->notifyEmail($allAjaxUrl['url'], $ajaxData, $notifyWhenEmptySelectors, '_last_post_empty_selector_email_sent');
                    }

                    $allAjaxData[] = $ajaxData;

                }

            }

        }

        unset($allAjaxData['url'][0]);

        // Storage all ajax data.
        if (isset($allAjaxData[0]) && $allAjaxData[0]) $this->bot->getPostData()->setAjaxData($allAjaxData);
        
    }

}