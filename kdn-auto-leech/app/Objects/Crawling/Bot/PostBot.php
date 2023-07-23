<?php

namespace KDNAutoLeech\Objects\Crawling\Bot;


use GuzzleHttp\Psr7\Uri;
use Symfony\Component\DomCrawler\Crawler;
use KDNAutoLeech\Objects\Crawling\Data\PostData;
use KDNAutoLeech\PostDetail\PostDetailsService;
use KDNAutoLeech\Objects\Crawling\Preparers\BotConvenienceFindReplacePreparer;
use KDNAutoLeech\Objects\Crawling\Preparers\Post\PostAjaxPreparer;
use KDNAutoLeech\Objects\Crawling\Preparers\Post\PostStopCrawlingPreparer;
use KDNAutoLeech\Objects\Crawling\Preparers\Post\PostCategoryPreparer;
use KDNAutoLeech\Objects\Crawling\Preparers\Post\PostContentsPreparer;
use KDNAutoLeech\Objects\Crawling\Preparers\Post\PostCreatedDatePreparer;
use KDNAutoLeech\Objects\Crawling\Preparers\Post\PostCustomPostMetaPreparer;
use KDNAutoLeech\Objects\Crawling\Preparers\Post\PostCustomTaxonomyPreparer;
use KDNAutoLeech\Objects\Crawling\Preparers\Post\PostExcerptPreparer;
use KDNAutoLeech\Objects\Crawling\Preparers\Post\PostListInfoPreparer;
use KDNAutoLeech\Objects\Crawling\Preparers\Post\PostMediaPreparer;
use KDNAutoLeech\Objects\Crawling\Preparers\Post\PostMetaAndTagInfoPreparer;
use KDNAutoLeech\Objects\Crawling\Preparers\Post\PostPaginationInfoPreparer;
use KDNAutoLeech\Objects\Crawling\Preparers\Post\PostShortCodeInfoPreparer;
use KDNAutoLeech\Objects\Crawling\Preparers\Post\PostSlugPreparer;
use KDNAutoLeech\Objects\Crawling\Preparers\Post\PostTemplatePreparer;
use KDNAutoLeech\Objects\Crawling\Preparers\Post\PostTitlePreparer;
use KDNAutoLeech\Objects\Crawling\Preparers\Post\PostTranslationPreparer;
use KDNAutoLeech\Objects\Traits\ErrorTrait;
use KDNAutoLeech\Utils;
use KDNAutoLeech\KDNAutoLeech;

class PostBot extends AbstractBot {

    use ErrorTrait;

    /** @var Crawler */
    private $crawler;
    
    /** @var PostData */
    private $postData;
    
    /*
     * 
     */

    /** @var array */
    public $combinedListData = [];

    /** @var string */
    private $postUrl = '';

    /** @var null|Uri */
    private $postUri = null;

    /** @var bool */
    private $isFirstPage;

    /** @var bool */
    private $isRecrawl;

    /*
     *
     */

    /** @var BotConvenienceFindReplacePreparer|null */
    private $findReplacePreparer = null;

    private $keyLastEmptySelectorEmailDate = '_last_post_empty_selector_email_sent';

    /**
     * Crawls a post and prepares the data as array, does not save the post to the db.
     *
     * @param string $postUrl A full URL
     * @return PostData|null
     */
    public function crawlPost($postUrl, $childPost = false, $urlId = null, $lastPageNow = false, $isFirstPage = true, $isRecrawl = false) {
        $this->clearErrors();

        $this->setPostUrl($postUrl);
        $this->postData = new PostData();

        /**
         * Set the child post active to post data for the test.
         *
         * @since   2.1.8
         */
        $childPostActive = $this->getSettingForCheckbox('_child_post');
        $this->postData->setChildPostActive($childPostActive);

        /**
         * Set isFirstPage and isRecrawl.
         *
         * @since   2.3.3
         */
        $this->isFirstPage  = $isFirstPage;
        $this->isRecrawl    = $isRecrawl;

        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        if ($childPost) $this->postData->setChildPost($childPost);

        /**
         * Whether to activate Custom HEADERs or not.
         *
         * @since   2.1.8
         */
        $customHeaders = $this->getSetting('_custom_headers');

        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        if ($childPost) {
            $findAndReplacesForRawHtml          = $this->getSetting('_child_post_find_replace_raw_html');
            $findAndReplacesForFirstLoad        = $this->getSetting('_child_post_find_replace_first_load');
            $postUnnecessaryElementSelectors    = $this->getSetting('_child_post_unnecessary_element_selectors');
            $notifyWhenEmptySelectors           = $this->getSetting('_child_post_notify_empty_value_selectors');

            $stopCrawlingMerge                  = $this->getSettingForCheckbox('_child_post_stop_crawling_merge');
            $stopCrawlingDoNotSavePost          = $this->getSettingForCheckbox('_child_post_stop_crawling_do_not_save_post');

            $postHeaders                        = $this->getSetting('_child_post_custom_headers');
            $postMethods                        = $this->getSetting('_child_post_custom_method');

        } else {
            $findAndReplacesForRawHtml          = $this->getSetting('_post_find_replace_raw_html');
            $findAndReplacesForFirstLoad        = $this->getSetting('_post_find_replace_first_load');
            $postUnnecessaryElementSelectors    = $this->getSetting('_post_unnecessary_element_selectors');
            $notifyWhenEmptySelectors           = $this->getSetting('_post_notify_empty_value_selectors');

            $stopCrawlingMerge                  = $this->getSettingForCheckbox('_post_stop_crawling_merge');
            $stopCrawlingDoNotSavePost          = $this->getSettingForCheckbox('_post_stop_crawling_do_not_save_post');
            
            $postHeaders                        = $this->getSetting('_post_custom_headers');
            $postMethods                        = $this->getSetting('_post_custom_method');
        }

        /**
         * Fires just before the source code of a post page is retrieved from the target site.
         *
         * @param int       siteId      ID of the site
         * @param string    $postUrl    URL of the post
         * @param PostBot   $this       The bot itself
         * @since 1.6.3
         */
        do_action('kdn/post/source-code/before_retrieve', $this->getSiteId(), $postUrl, $this);

        /**
         * Set the post headers which are transmitted in each URL query request.
         *
         * @since 2.1.8
         */
        $allHeaders = [];
        if($customHeaders && $postHeaders){
            foreach ($postHeaders as $postHeader) {
                $postHeader['value'] = preg_replace('/%%target_url%%/i', $postUrl, $postHeader['value']);
                if (isset($postHeader['key']) && $postHeader['key']) $allHeaders[$postHeader['key']] = $postHeader['value'];
            }
        }

        /**
         * Custom post method.
         *
         * @since 2.2.8
         */
        $parseArray = '';
        $method     = 'GET';
        if (!empty($postMethods)) {
            foreach ($postMethods as $postMethod) {
                // Prepare the $matches
                if (isset($postMethod["regex"]) && $postMethod["regex"]) {
                    $postMethod["matches"] = preg_replace('/%%target_url%%/i', preg_quote($postUrl, '/'), $postMethod["matches"]);
                    $matches = !starts_with($postMethod["matches"], '/') ? '/' . $postMethod["matches"] . '/' : $postMethod["matches"];
                } else {
                    $postMethod["matches"] = preg_replace('/%%target_url%%/i', $postUrl, $postMethod["matches"]);
                    $matches = '/' . preg_quote($postMethod["matches"], '/') . '/';
                }

                if (isset($postMethod["negate"]) && $postMethod["negate"] && !preg_match($matches, $postUrl)) {
                    $parseArray = $postMethod["parse"] ?: $parseArray;
                    $method     = $postMethod["method"] ?: $method;
                    break;
                } elseif (preg_match($matches, $postUrl)) {
                    $parseArray = $postMethod["parse"] ?: $parseArray;
                    $method     = $postMethod["method"] ?: $method;
                    break;
                }
            }
        }

        // Crawler the target URL.
        $this->crawler = $this->request($postUrl, $method, $findAndReplacesForRawHtml, $allHeaders, $parseArray);
        if(!$this->crawler) return null;

        /**
         * Fires just after the source code of a post page is retrieved from the target site.
         *
         * @param int       siteId      ID of the site
         * @param string    $postUrl    URL of the post
         * @param PostBot   $this       The bot itself
         * @param Crawler   $crawler    Crawler containing raw, unmanipulated source code of the target post
         * @since 1.6.3
         */
        do_action('kdn/post/source-code/after_retrieve', $this->getSiteId(), $postUrl, $this, $this->crawler);

        /**
         * Modify the raw crawler that contains source code of the target post page
         *
         * @param Crawler $crawler  Crawler containing raw, unmanipulated source code of the target post
         * @param int siteId        ID of the site
         * @param string $postUrl   URL of the post
         * @param PostBot $this     The bot itself
         *
         * @return Crawler          Modified crawler
         * @since 1.6.3
         */
        $this->crawler = apply_filters('kdn/post/crawler/raw', $this->crawler, $this->getSiteId(), $postUrl, $this);

        // Make initial replacements
        $this->crawler = $this->makeInitialReplacements($this->crawler, $findAndReplacesForFirstLoad, true, $postUrl);


        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        if ($childPost) {
            // Apply HTML manipulations
            $this->applyFindAndReplaceInElementAttributes($this->crawler,   '_child_post_find_replace_element_attributes', $postUrl);
            $this->applyExchangeElementAttributeValues($this->crawler,      '_child_post_exchange_element_attributes');
            $this->applyRemoveElementAttributes($this->crawler,             '_child_post_remove_element_attributes');
            $this->applyFindAndReplaceInElementHTML($this->crawler,         '_child_post_find_replace_element_html', $postUrl);
        } else {
            // Apply HTML manipulations
            $this->applyFindAndReplaceInElementAttributes($this->crawler,   '_post_find_replace_element_attributes', $postUrl);
            $this->applyExchangeElementAttributeValues($this->crawler,      '_post_exchange_element_attributes');
            $this->applyRemoveElementAttributes($this->crawler,             '_post_remove_element_attributes');
            $this->applyFindAndReplaceInElementHTML($this->crawler,         '_post_find_replace_element_html', $postUrl);
        }

        // Resolve relative URLs
        $this->resolveRelativeUrls($this->crawler, $this->getPostUrl());

        // Clear the crawler from unnecessary post elements
        $this->removeElementsFromCrawler($this->crawler, $postUnnecessaryElementSelectors);

        /**
         * Modify the prepared crawler that contains source code of the target post page. At this point, the crawler was
         * manipulated. Unnecessary elements were removed, find-and-replace options were applied, etc.
         *
         * @param crawler Crawler   Crawler containing manipulated source code of the target post
         * @param int siteId        ID of the site
         * @param string $postUrl   URL of the post
         * @param PostBot $this     The bot itself
         *
         * @return Crawler          Modified crawler
         * @since 1.6.3
         */
        $this->crawler = apply_filters('kdn/post/crawler/prepared', $this->crawler, $this->getSiteId(), $postUrl, $this);

        // Get ajax data
        (new PostAjaxPreparer($this))->prepare($urlId, $lastPageNow);

        // Get stop crawling data
        (new PostStopCrawlingPreparer($this))->prepare($urlId, $lastPageNow);

        

        /**
         * This is how to stop crawling without saved post work.
         *
         * - Case 1: True if has        $stopCrawlingMerge AND has "Stop crawling in each run" AND has "Stop crawling in all run".
         * - Case 2: True if not has    $stopCrawlingMerge AND has "Stop crawling in each run" OR  has "Stop crawling in all run".
         *
         * @since 2.1.8
         */
        $run = 1;
        if($stopCrawlingMerge){
            if($stopCrawlingDoNotSavePost && $this->postData->getStopCrawlingEachRun() && $this->postData->getStopCrawlingAllRun()){
                $run = 0;
            }
        }
        else {
            if($stopCrawlingDoNotSavePost && ($this->postData->getStopCrawlingEachRun() || $this->postData->getStopCrawlingAllRun())){
                $run = 0;
            }
        }
        
        if($run){

            // Get title
            (new PostTitlePreparer($this))->prepare();

            // Get slug
            (new PostSlugPreparer($this))->prepare();

            // Get excerpt
            (new PostExcerptPreparer($this))->prepare();

            // Get contents
            (new PostContentsPreparer($this))->prepare();

            // Get categories
            (new PostCategoryPreparer($this))->prepare();

            // Get the date
            (new PostCreatedDatePreparer($this))->prepare();

            // Get custom short code contents
            (new PostShortCodeInfoPreparer($this))->prepare();

            // Get list items
            (new PostListInfoPreparer($this))->prepare();

            // Prepare pagination info
            (new PostPaginationInfoPreparer($this))->prepare();

            // Get tags and meta info
            (new PostMetaAndTagInfoPreparer($this))->prepare();

            // Get custom post taxonomies
            (new PostCustomTaxonomyPreparer($this))->prepare();

            // Get source URLs of to-be-saved files and thumbnail image URL
            // This removes gallery images from the source code.
            (new PostMediaPreparer($this))->prepare();

            // Get custom post meta
            (new PostCustomPostMetaPreparer($this))->prepare();

            // Prepare the registered post details
            PostDetailsService::getInstance()->preparePostDetails($this);

            /*
             * TEMPLATING
             */

            // Insert main data into template
            (new PostTemplatePreparer($this))->prepare();

            /*
             * TRANSLATE
             */

            // Translate if it is required
            (new PostTranslationPreparer($this))->prepare();

        }

        /*
         *
         */

        /**
         * Modify the prepared PostData object, which stores all the required data retrieved from the target site.
         *
         * @param PostData $postData Prepared PostData object
         * @param int      siteId    ID of the site
         * @param string   $postUrl  URL of the post
         * @param PostBot  $this     The bot itself
         * @param Crawler  $crawler  Crawler containing manipulated source code of the target post
         * @return PostData     Modified PostData
         * @since 1.6.3
         */
        $this->postData = apply_filters('kdn/post/post-data', $this->postData, $this->getSiteId(), $postUrl, $this, $this->crawler);

        /*
         * NOTIFY
         */

        // Notify if this is not a test.
        if(!KDNAutoLeech::isDoingTest() && $notifyWhenEmptySelectors)
            $this->notifyUser($postUrl, $this->crawler, $notifyWhenEmptySelectors, $this->keyLastEmptySelectorEmailDate);

        /**
         * Fires just after the post data is prepared according to the settings. All of the necessary changes were made
         * to the post data, such as removal of unnecessary elements and replacements.
         *
         * @param int      siteId    ID of the site
         * @param string   $postUrl  URL of the post
         * @param PostBot  $this     The bot itself
         * @param PostData $postData The data retrieved from the target site by using the settings configured by the user.
         * @param Crawler  $crawler  Crawler containing the target post page's source code. The crawler was manipulated
         *                           according to the settings.
         * @since 1.6.3
         */
        do_action('kdn/post/data/after_prepared', $this->getSiteId(), $postUrl, $this, $this->postData, $this->crawler);

        return $this->postData;
    }

    /**
     * Sets {@link $postUrl}
     *
     * @param string $postUrl
     * @since 1.8.0
     */
    private function setPostUrl($postUrl) {
        $this->postUrl = $postUrl;
        $this->postUri = null;
    }

    /*
     * PUBLIC HELPERS
     */

    /**
     * Prepare find-and-replaces by adding config to the supplied find-and-replace array, such as link removal config.
     *
     * @param array $findAndReplaces An array of find and replace options. See
     *                               {@link FindAndReplaceTrait::findAndReplace} to learn more about this array.
     * @return array
     * @uses BotConvenienceFindReplacePreparer::prepare()
     */
    public function prepareFindAndReplaces($findAndReplaces) {
        // If the supplied parameter is not an array, stop and return it.
        if (!is_array($findAndReplaces)) return $findAndReplaces;

        // If the preparer does not exist, create it.
        if (!$this->findReplacePreparer) {
            $this->findReplacePreparer = new BotConvenienceFindReplacePreparer($this);
        }

        // Add the config to the given array.
        return array_merge($findAndReplaces, $this->findReplacePreparer->prepare());
    }

    /*
     * PUBLIC GETTERS AND SETTERS
     */

    /**
     * @return Crawler
     */
    public function getCrawler() {
        return $this->crawler;
    }

    /**
     * @return PostData
     */
    public function getPostData() {
        return $this->postData;
    }

    /**
     * @param PostData $postData
     */
    public function setPostData($postData) {
        $this->postData = $postData;
    }

    /**
     * Get the URL of latest crawled or being crawled post.
     *
     * @return string
     */
    public function getPostUrl() {
        return $this->postUrl;
    }

    /**
     * Get the URL of latest crawled or being crawled post.
     *
     * @return string
     */
    public function getUrl() {
        return $this->postUrl;
    }

    /**
     * Get isFirstPage.
     *
     * @return bool
     */
    public function isFirstPage() {
        return $this->isFirstPage;
    }

    /**
     * Get isRecrawl.
     *
     * @return bool
     */
    public function isRecrawl() {
        return $this->isRecrawl;
    }

    /**
     * Resolves a URL by considering {@link $postUrl} as base URL.
     *
     * @param string $relativeUrl Relative or full URL that will be resolved against the current post URL.
     * @return string The given URL that is resolved using {@link $postUrl}
     * @see   PostBot::getPostUrl()
     * @see   Utils::resolveUrl()
     * @since 1.8.0
     * @throws \Exception If post URL that will be used to resolve the given URL does not exist.
     */
    public function resolveUrl($relativeUrl) {
        if (!$this->postUrl) {
            throw new \Exception("Post URL does not exist.");
        }

        // If there is no post URI, create it.
        if ($this->postUri === null) {
            $this->postUri = new Uri($this->postUrl);
        }

        return Utils::resolveUrl($this->postUri, $relativeUrl);
    }
}