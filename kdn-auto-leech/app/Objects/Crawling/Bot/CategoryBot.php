<?php

namespace KDNAutoLeech\Objects\Crawling\Bot;


use GuzzleHttp\Psr7\Uri;
use Symfony\Component\DomCrawler\Crawler;
use KDNAutoLeech\Objects\Crawling\Data\CategoryData;
use KDNAutoLeech\Objects\Informing\Informer;
use KDNAutoLeech\Utils;
use KDNAutoLeech\KDNAutoLeech;

class CategoryBot extends AbstractBot {

    private $keyLastEmptySelectorEmailDate = '_last_category_empty_selector_email_sent';

    /** @var Crawler */
    private $crawler;

    /** @var string */
    private $url;

    /** @var CategoryData */
    private $categoryData;

    /** @var null|Uri */
    private $uri = null;

    /**
     * Collects URLs for a site from the given URL
     *
     * @param string                $url    A full URL to be used to get post URLs
     * @return CategoryData|null
     *
     * @return array An array with keys "post_urls" and "next_page_url"
     */
    public function collectUrls($url) {
        $this->setUrl($url);
        $this->categoryData = new CategoryData();

        /**
         * Whether to activate Custom HEADERs or not.
         *
         * @since 2.1.8
         */
        $customHeaders                          = $this->getSetting('_custom_headers');
        $findAndReplacesForRawHtml              = $this->getSetting('_category_find_replace_raw_html');
        $findAndReplacesForFirstLoad            = $this->getSetting('_category_find_replace_first_load');
        $categoryUnnecessaryElementSelectors    = $this->getSetting('_category_unnecessary_element_selectors');
        $categoryUrlsInReverse                  = $this->getSetting('_category_collect_in_reverse_order');
        $notifyWhenEmptySelectors               = $this->getSetting('_category_notify_empty_value_selectors');
        $categoryHeaders                        = $this->getSetting('_category_custom_headers');
        $categoryMethods                        = $this->getSetting('_category_custom_method');

        /**
         * Fires just before the source code of a category page is retrieved from the target site.
         *
         * @param int         $siteId ID of the site
         * @param string      $url    URL of the target category page
         * @param CategoryBot $this   The bot itself
         * @since 1.6.3
         */
        do_action('kdn/category/source-code/before_retrieve', $this->getSiteId(), $url, $this);

        /**
         * Set the post headers which are transmitted in each URL query request.
         *
         * @since 2.1.8
         */
        $allHeaders = [];
        if($customHeaders && $categoryHeaders){
            foreach ($categoryHeaders as $categoryHeader) {
                $categoryHeader['value'] = preg_replace('/%%target_url%%/i', $url, $categoryHeader['value']);
                if (isset($categoryHeader['key']) && $categoryHeader['key']) $allHeaders[$categoryHeader['key']] = $categoryHeader['value'];
            }
        }

        /**
         * Custom category method.
         *
         * @since 2.3.3
         */
        $parseArray = '';
        $method     = 'GET';
        if (!empty($categoryMethods)) {
            foreach ($categoryMethods as $categoryMethod) {
                // Prepare the $matches
                if (isset($categoryMethod["regex"]) && $categoryMethod["regex"]) {
                    $categoryMethod["matches"] = preg_replace('/%%target_url%%/i', preg_quote($url, '/'), $categoryMethod["matches"]);
                    $matches = !starts_with($categoryMethod["matches"], '/') ? '/' . $categoryMethod["matches"] . '/' : $categoryMethod["matches"];
                } else {
                    $categoryMethod["matches"] = preg_replace('/%%target_url%%/i', $url, $categoryMethod["matches"]);
                    $matches = '/' . preg_quote($categoryMethod["matches"], '/') . '/';
                }

                if (isset($categoryMethod["negate"]) && $categoryMethod["negate"] && !preg_match($matches, $url)) {
                    $parseArray = $categoryMethod["parse"] ?: $parseArray;
                    $method     = $categoryMethod["method"] ?: $method;
                    break;
                } elseif (preg_match($matches, $url)) {
                    $parseArray = $categoryMethod["parse"] ?: $parseArray;
                    $method     = $categoryMethod["method"] ?: $method;
                    break;
                }
            }
        }

        $this->crawler = $this->request($this->url, $method, $findAndReplacesForRawHtml, $allHeaders, $parseArray);
        if(!$this->crawler) return null;

        /**
         * Fires just after the source code of a post page is retrieved from the target site.
         *
         * @param int           $siteId     ID of the site.
         * @param string        $url        URL of the post.
         * @param CategoryBot   $this       The bot itself.
         * @param Crawler       $crawler    Crawler containing raw, unmanipulated source code of the target category.
         * @since 1.6.3
         */
        do_action('kdn/post/source-code/after_retrieve', $this->getSiteId(), $this->url, $this, $this->crawler);

        /**
         * Modify the raw crawler that contains source code of the target category page.
         *
         * @param   Crawler         $crawler    Crawler containing raw, unmanipulated source code of the target category page.
         * @param   int             $siteId     ID of the site.
         * @param   string          $postUrl    URL of the category page.
         * @param   CategoryBot     $this       The bot itself.
         *
         * @return  Crawler                     Modified crawler.
         * @since   1.6.3
         */
        $this->crawler = apply_filters('kdn/category/crawler/raw', $this->crawler, $this->getSiteId(), $this->url, $this);

        // Make initial replacements
        $this->crawler = $this->makeInitialReplacements($this->crawler, $findAndReplacesForFirstLoad, false, $url);

        // Apply HTML manipulations
        $this->applyFindAndReplaceInElementAttributes($this->crawler, '_category_find_replace_element_attributes', $url);
        $this->applyExchangeElementAttributeValues($this->crawler, '_category_exchange_element_attributes');
        $this->applyRemoveElementAttributes($this->crawler, '_category_remove_element_attributes');
        $this->applyFindAndReplaceInElementHTML($this->crawler, '_category_find_replace_element_html', $url);

        // Clear the crawler from unnecessary category elements
        $this->removeElementsFromCrawler($this->crawler, $categoryUnnecessaryElementSelectors);

        // Resolve relative URLs
        $this->resolveRelativeUrls($this->crawler, $this->url);

        /**
         * Modify the prepared crawler that contains source code of the target category page. At this point, the crawler
         * was manipulated. Unnecessary elements were removed, find-and-replace options were applied, etc.
         *
         * @param Crawler $crawler Crawler containing manipulated source code of the target category page
         * @param int     $siteId  ID of the site
         * @param string  $postUrl URL of the category page
         * @param PostBot $this    The bot itself
         *
         * @return Crawler          Modified crawler
         * @since 1.6.3
         */
        $this->crawler = apply_filters('kdn/category/crawler/prepared', $this->crawler, $this->getSiteId(), $url, $this);

        // Prepare post URLs
        $this->preparePostUrls();

        // Prepare thumbnails
        $this->prepareThumbnails();

        // If the order of the URLs should be reversed, do so.
        if($categoryUrlsInReverse) {
            $this->categoryData->setPostUrls(array_reverse($this->categoryData->getPostUrls()));
        }

        // Prepare next page URL
        $this->prepareNextPageUrl();

        /**
         * Modify the prepared CategoryData object, which stores all the required data retrieved from the target site.
         *
         * @param CategoryData $categoryData Prepared CategoryData object
         * @param int          $siteId       ID of the site
         * @param string       $postUrl      URL of the category page
         * @param CategoryBot  $this         The bot itself
         * @param Crawler      $crawler      Crawler containing manipulated source code of the target category page
         *
         * @return CategoryData     Modified CategoryData
         * @since 1.6.3
         */
        $categoryData = apply_filters('kdn/category/category-data', $this->categoryData, $this->getSiteId(), $url, $this, $this->crawler);

        /*
         * NOTIFY
         */

        // Notify if this is not a test.
        if(!KDNAutoLeech::isDoingTest() && $notifyWhenEmptySelectors)
            $this->notifyUser($url, $this->crawler, $notifyWhenEmptySelectors, $this->keyLastEmptySelectorEmailDate);

        /**
         * Fires just after the category data is prepared according to the settings. All of the necessary changes were made
         * to the category data, such as removal of unnecessary elements and replacements.
         *
         * @param int          $siteId       ID of the site
         * @param string       $url          URL of the target category page
         * @param CategoryBot  $this         The bot itself
         * @param CategoryData $categoryData The data retrieved from the target site by using the settings configured by the
         *                                   user.
         * @param Crawler      $crawler      Crawler containing the target category's source code. The crawler was manipulated
         *                                   according to the settings.
         * @since 1.6.3
         */
        do_action('kdn/category/data/after_prepared', $this->getSiteId(), $url, $this, $categoryData, $this->crawler);

        return $categoryData;
    }

    /*
     * PRIVATE METHODS
     */

    /**
     * Prepare post URLs
     */
    private function preparePostUrls() {
        $postUrlData = $this->extractValuesForSelectorSetting($this->crawler,'_category_post_link_selectors', 'href', 'url', false, true);
        if (!$postUrlData) return;

        // Flatten the array with depth of 1 because the return value is array of arrays of items. We need array of items.
        $postUrlData = array_flatten($postUrlData, 1);

        // Make relative URLs direct
        foreach($postUrlData as &$mPostUrl) {

            try {
                $mPostUrl["data"] = $this->resolveUrl($mPostUrl["data"]);
            } catch (\Exception $e) {
                // Nothing to do here. This is a very unlikely situation, since $url exists when this method
                // is called.
                Informer::addError(_kdn('URL could not be resolved') . ' - ' . $mPostUrl["data"])->addAsLog();
            }
        }

        $this->categoryData->setPostUrls($postUrlData);
    }

    /**
     * Prepare thumbnails
     */
    private function prepareThumbnails() {
        $categorySaveThumbnails = $this->getSetting('_category_post_save_thumbnails');
        if(!$categorySaveThumbnails) return;

        // Get thumbnail URLs
        $categoryPostThumbnailSelectors = $this->getSetting('_category_post_thumbnail_selectors');
        $findAndReplacesForThumbnailUrl = $this->getSetting('_category_find_replace_thumbnail_url');

        $thumbnailData = null;
        foreach($categoryPostThumbnailSelectors as $selectorData) {
            $selector = Utils::array_get($selectorData, "selector");
            if (!$selector) continue;

            $attr = Utils::array_get($selectorData, "attr");
            if (!$attr) $attr = 'src';

            if ($thumbnailData = $this->extractData($this->crawler, $selectorData, $attr, "thumbnail", false, true)) {
                // Make replacements
                if(!empty($thumbnailData) && !empty($findAndReplacesForThumbnailUrl)) {
                    foreach($thumbnailData as &$mThumbnailData) {
                        $mThumbnailData["data"] = $this->findAndReplace($findAndReplacesForThumbnailUrl, $mThumbnailData["data"], true, $this->url);
                    }
                }

                // Make relative URLs direct
                foreach($thumbnailData as &$nThumbnailData) {
                    try {
                        $nThumbnailData["data"] = $this->resolveUrl($nThumbnailData["data"]);
                    } catch (\Exception $e) {
                        // Nothing to do here. This is a very unlikely situation, since $url exists when this method
                        // is called.
                        Informer::addError(_kdn('URL could not be resolved') . ' - ' . $nThumbnailData["data"])->addAsLog();
                    }
                }

                $this->categoryData->setThumbnails($thumbnailData);
                break;
            }
        }

        // Match thumbnails with post URLs
        if($thumbnailData && !empty($thumbnailData)) {
            // Combine URL and thumbnail data and sort the combined array ascending by start position
            $postDataCombined = array_merge($thumbnailData, $this->categoryData->getPostUrls());

            // Sort the combined data and reset the array keys
            $postDataCombined = array_values(Utils::array_msort($postDataCombined, ["start" => SORT_ASC]));

            $isLinkBeforeThumb = $this->getSetting('_category_post_is_link_before_thumbnail');

            $thumbnailHolder = null;
            $postUrlData = $this->categoryData->getPostUrls();
            for($i = 0; $i < sizeof($postDataCombined); $i++) {
                $thumbnailHolder = null;
                if($postDataCombined[$i]["type"] == "url") {
                    // Check if the url has a thumbnail
                    // If the link comes BEFORE the thumb
                    if($isLinkBeforeThumb && isset($postDataCombined[$i + 1])) {
                        if($postDataCombined[$i + 1]["type"] == "thumbnail") {
                            $thumbnailHolder = $postDataCombined[$i + 1]["data"];
                        }

                        // If the link comes AFTER the thumb
                    } else {
                        if($i !== 0 && $postDataCombined[$i - 1]["type"] == "thumbnail") {
                            $thumbnailHolder = $postDataCombined[$i - 1]["data"];
                        }
                    }

                    // If the thumbnail is found, add it to the postUrlData
                    if($thumbnailHolder) {
                        foreach($postUrlData as &$mUrlData) {
                            if(
                                $mUrlData["data"] == $postDataCombined[$i]["data"] &&
                                $mUrlData["start"] == $postDataCombined[$i]["start"] &&
                                $mUrlData["end"] == $postDataCombined[$i]["end"]
                            ) {
                                $mUrlData["thumbnail"] = $thumbnailHolder;
                                break;
                            }
                        }
                    }
                }
            }

            $this->categoryData->setPostUrls($postUrlData);

            unset($postDataCombined);
            unset($thumbnailData);
        }

    }

    /**
     * Prepare next page URL
     */
    private function prepareNextPageUrl() {
        $nextPageUrl = $this->extractValuesForSelectorSetting($this->crawler,'_category_next_page_selectors', 'href', false, true, true);
        if (!$nextPageUrl) return;

        try {
            $nextPageUrl = $this->resolveUrl($nextPageUrl);
        } catch (\Exception $e) {
            // Nothing to do here. This is a very unlikely situation, since $url exists when this method
            // is called.
            Informer::addError(_kdn('URL could not be resolved') . ' - ' . $nextPageUrl)->addAsLog();
        }

        $this->categoryData->setNextPageUrl($nextPageUrl);
    }

    /**
     * Set current category URL
     *
     * @param string $url
     * @since 1.8.0
     */
    private function setUrl($url) {
        $this->url = $url;
        $this->uri = null;
    }

    /*
     *
     */

    /**
     * @return string|null Last crawled or being crawled category URL
     * @since 1.8.0
     */
    public function getUrl() {
        return $this->url;
    }

    /**
     * Resolves a URL by considering {@link $url} as base URL.
     *
     * @param string $relativeUrl Relative or full URL that will be resolved against the current category URL.
     * @return string The given URL that is resolved using {@link $url}
     * @see   Utils::resolveUrl()
     * @since 1.8.0
     * @throws \Exception If post URL that will be used to resolve the given URL does not exist.
     */
    public function resolveUrl($relativeUrl) {
        if (!$this->url) {
            throw new \Exception("Post URL does not exist.");
        }

        // If there is no post URI, create it.
        if ($this->uri === null) {
            $this->uri = new Uri($this->url);
        }

        return Utils::resolveUrl($this->uri, $relativeUrl);
    }
}