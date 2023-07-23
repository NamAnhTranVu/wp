<?php

namespace KDNAutoLeech\Services;

use WP_Post;
use KDNAutoLeech\Constants;
use KDNAutoLeech\Factory;
use KDNAutoLeech\PostDetail\PostDetailsService;
use KDNAutoLeech\Objects\Enums\ShortCodeName;
use KDNAutoLeech\Objects\OptionsBox\Boxes\File\FileOptionsBoxApplier;
use KDNAutoLeech\Objects\OptionsBox\Enums\OptionsBoxTab;
use KDNAutoLeech\Objects\OptionsBox\Enums\OptionsBoxType;
use KDNAutoLeech\Objects\OptionsBox\Enums\TabOptions\TemplatesTabOptions;
use KDNAutoLeech\Objects\OptionsBox\OptionsBoxConfiguration;
use KDNAutoLeech\Objects\Cache\ResponseCache;
use KDNAutoLeech\Objects\Settings\Settings;
use KDNAutoLeech\Objects\Settings\SettingsImpl;
use KDNAutoLeech\Objects\ShortCodeButton;
use KDNAutoLeech\Test\Test;
use KDNAutoLeech\Utils;

/**
 * Service class for custom post create/edit page. This includes mostly meta box stuff.
 *
 * Class PostService
 * @package KDNAutoLeech
 */
class PostService {

    /**
     * @var array Meta keys used to store settings for each site
     */
    private $metaKeys = [
        // Main tab
        '_active',                                  // bool     Whether the site is active for being crawled or not
        '_active_recrawling',                       // bool     Whether the site is active for being recrawled or not
        '_active_post_deleting',                    // bool     Whether the site is active for post deleting or not
        '_active_translation',                      // bool     Whether the site is active for post translation or not
        '_main_page_url',                           // string   URL of the site to be crawled
        '_duplicate_check_types',                   // array    An array of types that will be used to decide with what to check for duplicate posts
        '_do_not_use_general_settings',             // bool     True if the user wants to specify different settings for the post
        '_cookies',                                 // array    An array of arrays that stores cookie keys and values. Each inner array has 'key' and 'value' keys and corresponding values.
        '_cache_test_url_responses',                // bool     True if the responses retrieved from the test URLs should be cached
        '_fix_tabs',                                // bool     True if the tabs should be fixed when the page is scrolled down
        '_fix_content_navigation',                  // bool     True if the tab content navigation should be fixed when the page is scrolled down

        // Category tab
        '_category_list_page_url',                  // string   URL of the page which includes URLs of the categories
        '_category_list_url_selectors',             // array    Selectors to get category URLs from category list page
        '_category_post_link_selectors',            // array    Link selectors used to get post URLs in categories
        '_category_collect_in_reverse_order',       // bool     True if found URLs should be ordered in reverse for each CSS selector.
        '_category_unnecessary_element_selectors',  // array    Selectors for the elements to be removed from the content of category page
        '_category_post_save_thumbnails',           // bool     True if the thumbnails should be saved as featured images for the posts
        '_category_post_thumbnail_selectors',       // array    Image selectors for post thumbnails
        '_test_find_replace_thumbnail_url_cat',     // string   An image URL which is used to conduct find-replace test
        '_category_find_replace_thumbnail_url',     // array    An array including what to find and with what to replace for thumbnail URL
        '_category_post_is_link_before_thumbnail',  // bool     True if post URLs come before the thumbnails in the category's HTML
        '_category_next_page_selectors',            // array    Link selectors used to get next page URL of the category
        '_category_map',                            // array    Maps the category links to WP categories
        '_test_find_replace_first_load_cat',        // string   A piece of code used to test regexes for find-replace settings for first load of the category HTML
        '_category_find_replace_raw_html',          // array    An array including what to find and with what to replace for raw response content of category pages
        '_category_find_replace_first_load',        // array    An array including what to find and with what to replace for category HTML
        '_category_find_replace_element_attributes',// array    An array including what to find and with what to replace for specified elements' specified attributes
        '_category_exchange_element_attributes',    // array    An array including selectors of elements and the attributes whose values should be exchanged
        '_category_remove_element_attributes',      // array    An array including selectors of elements and comma-separated attributes that should be removed from the element
        '_category_find_replace_element_html',      // array    An array including what to find and with what to replace for specified elements' HTML
        '_test_url_category',                       // string   Holds a test URL for the user to conduct tests on category pages
        '_category_notify_empty_value_selectors',   // array    CSS selectors to be used to notify the user via email when one of the selector's value is empty/not found

        // Post tab
        '_test_url_post',                           // string   Holds a test URL for the user to conduct tests on post pages
        '_post_title_selectors',                    // array    Selector for post title
        '_post_excerpt_selectors',                  // array    Selectors for the post summary
        '_post_content_selectors',                  // array    Selectors for the post content

        '_post_category_name_selectors',              // array    CSS selectors with attributes that find category names
        '_post_category_add_all_found_category_names',// bool     When checked, category names found by all CSS selectors will be added
        '_post_category_name_separators',             // array    Separators that will be used to separate category names in a single string
        '_post_category_add_hierarchical',            // bool     True if categories found by a single selector will be added hierarchically
        '_post_category_do_not_add_category_in_map',  // bool     True if the category defined in the category map should not be added when there is at least one category found by CSS selectors

        '_post_date_selectors',                     // array    Selectors for the post date
        '_test_find_replace_date',                  // string   A date which is used to conduct find-replace test
        '_post_find_replace_date',                  // array    An array including what to find and with what to replace for dates
        '_post_date_add_minutes',                   // int      How many minutes that should be added to the final date
        '_post_custom_content_shortcode_selectors', // array    An array holding selectors with custom attributes and customly-defined shortcodes
        '_post_tag_selectors',                      // array    Selectors for post tag
        '_post_slug_selectors',                     // array    Selectors for post slug
        '_post_paginate',                           // bool     If the original post is paginated, paginate it in WP as well
        '_post_next_page_url_selectors',            // array    Next page selectors for the post if it is paginated
        '_post_next_page_all_pages_url_selectors',  // array    Sometimes the post page does not have next page URL. Instead, it has all page URLs in one place.
        '_post_is_list_type',                       // bool     Whether or not the post is created as a list
        '_post_list_item_starts_after_selectors',   // array    CSS selectors to understand first list items' start position
        '_post_list_title_selectors',               // array    Title selectors for the list-type post
        '_post_list_content_selectors',             // array    Content selectors for the list-type post
        '_post_list_item_number_selectors',         // array    Selectors for list item numbers
        '_post_list_item_auto_number',              // bool     True if item numbers can be set automatically, if item's number does not exist
        '_post_list_insert_reversed',               // bool     True to insert the list items in reverse order
        '_post_meta_keywords',                      // bool     Whether or not to save meta keywords
        '_post_meta_keywords_as_tags',              // bool     True if meta keywords should be inserted as tags
        '_post_meta_description',                   // bool     Whether or not to save meta description
        '_post_unnecessary_element_selectors',      // array    Selectors for the elements to be removed from the content
        '_post_save_all_images_in_content',         // bool     Whether or not to save all images in post content as media
        '_post_save_images_as_media',               // bool     Whether or not to upload post images to WP
        '_post_save_images_as_gallery',             // bool     Whether or not to save to-be-specified images as gallery
        '_post_gallery_image_selectors',            // array    Selectors with attributes for image URLs in the HTML of the page
        '_post_save_images_as_woocommerce_gallery', // bool     True if the gallery images should be saved as the value of post meta key that is used to store the gallery for WooCommerce products
        '_post_image_selectors',                    // array    Selectors for image URLs in the post
        '_test_find_replace_image_urls',            // string   An image URL which is used to conduct find-replace test
        '_post_find_replace_image_urls',            // array    An array including what to find and with what to replace for image URLs
        '_post_save_thumbnails_if_not_exist',       // bool     True if a thumbnail image should be saved from a post page, if no thumbnail is found in category page.
        '_post_thumbnail_selectors',                // array    CSS selectors for thumbnail images in post page
        '_test_find_replace_thumbnail_url',         // string   An image URL which is used to conduct find-replace test
        '_post_find_replace_thumbnail_url',         // array    An array including what to find and with what to replace for thumbnail URL
        '_post_custom_meta_selectors',              // array    An array for selectors with attribute and their meta properties, such as meta key, and whether it is multiple or not
        '_post_custom_meta',                        // array    An array containing custom post meta keys and their values.
        '_post_custom_taxonomy_selectors',          // array    An array for selectors with attribute and their meta properties, such as meta key, and whether it is multiple or not
        '_post_custom_taxonomy',                    // array    An array containing custom post taxonomy names and their values.
        '_post_notify_empty_value_selectors',       // array    CSS selectors to be used to notify the user via email when one of the selector's value is empty/not found

        // Templates tab
        '_post_template_main',                      // string   Main template for the post
        '_post_template_title',                     // string   Title template for the post
        '_post_template_excerpt',                   // string   Excerpt template for the post
        '_post_template_list_item',                 // string   List item template for the post
        '_post_template_gallery_item',              // string   Gallery item template for a single image
        '_post_remove_links_from_short_codes',      // bool     True if the template should be cleared from URLs
        '_post_convert_iframes_to_short_code',      // bool     True if the iframes in the post template should be converted to a short code
        '_post_convert_scripts_to_short_code',      // bool     True if the scripts in the post template should be converted to a short code
        '_test_find_replace',                       // string   A piece of code used to test RegExes
        '_post_find_replace_template',              // array    An array including what to find and with what to replace for template
        '_post_find_replace_title',                 // array    An array including what to find and with what to replace for title
        '_post_find_replace_excerpt',               // array    An array including what to find and with what to replace for excerpt
        '_post_find_replace_tags',                  // array    An array including what to find and with what to replace for tags
        '_post_find_replace_meta_keywords',         // array    An array including what to find and with what to replace for meta keywords
        '_post_find_replace_meta_description',      // array    An array including what to find and with what to replace for meta description
        '_post_find_replace_custom_shortcodes',     // array    An array including what to find and with what to replace for the data of custom short codes
        '_test_find_replace_first_load',            // string   A piece of code used to test regexes for find-replace settings for first load of the post HTML
        '_post_find_replace_raw_html',              // array    An array including what to find and with what to replace for raw response content of post pages
        '_post_find_replace_first_load',            // array    An array including what to find and with what to replace for post HTML
        '_post_find_replace_element_attributes',    // array    An array including what to find and with what to replace for specified elements' specified attributes
        '_post_exchange_element_attributes',        // array    An array including selectors of elements and the attributes whose values should be exchanged
        '_post_remove_element_attributes',          // array    An array including selectors of elements and comma-separated attributes that should be removed from the element
        '_post_find_replace_element_html',          // array    An array including what to find and with what to replace for specified elements' HTML
        '_post_find_replace_custom_meta',           // array    An array including what to find and with what to replace for specified meta keys
        '_post_find_replace_custom_short_code',     // array    An array including what to find and with what to replace for specified custom short codes
        '_template_unnecessary_element_selectors',  // array    Selectors for the elements to be removed from the template

        // Notes tab
        '_notes',                                   // string   A setting for the user to keep notes about the site (this is rich text editor).

        '_notes_simple',                            // string   A setting for the user to keep simple (not formatted) notes about the site. (just textarea)

        // Others
        '_dev_tools_state',                         // string   A serialized array containing the state of DEV tools for this post
    ];

    /**
     * @var array A key-value pair where keys are post meta keys defined in {@link $metaKeys} and the values are their
     *            default values.
     */
    private $metaKeyDefaults = [
        '_fix_tabs'                 => ['on'],
        '_fix_content_navigation'   => ['on'],
    ];

    /**
     * @var array Meta keys used to keep track of the CRON jobs
     */
    private $cronMetaKeys = [
        /* Keys for URL-collecting CRON event */
        '_cron_last_checked_at',                    // date     Date of last URL collection
        '_cron_last_checked_category_url',          // string   URL (or URL part, just how the user saves it as) of the last checked category
        '_cron_last_checked_category_next_page_url',// string   Next page URL for the last checked category (basically, next page to crawl)
        '_cron_no_new_url_inserted_count',          // int      Number of pages crawled with no new URL insertion in a row. E.g. Page 1 - none,
                                                    //          Page 2 - none, Page 3 - none    => this value will be 3
        '_cron_crawled_page_count',                 // int      Holds how many pages crawled before

        /* Keys for post-crawling CRON event */
        '_cron_last_crawled_at',                    // date     Date of last post crawl
        '_cron_last_crawled_url_id',                // int      Stores ID of the last crawled URL from urls table
        '_cron_post_next_page_url',                 // string   Stores next page URL for a paginated post
        '_cron_post_next_page_urls',                // array    Stores next page URLs as a serialized array for a paginated post. This is used if the post has
                                                    //          all of the next pages together.
        '_cron_post_draft_id',                      // int      Stores the ID of the draft post. A draft post is a post created if target post is paginated. New
                                                    //          content is appended to that post's content. After all pages are crawled, the draft is published.

        /* Keys for post-recrawling CRON event */
        '_cron_recrawl_last_crawled_at',            // date     Date of last post recrawl
        '_cron_recrawl_last_crawled_url_id',        // int      Stores ID of the last recrawled URL from urls table
        '_cron_recrawl_post_next_page_url',         // string   Stores next page URL for a paginated post
        '_cron_recrawl_post_next_page_urls',        // array    Stores next page URLs as a serialized array for a paginated post. This is used if the post has
                                                    //          all of the next pages together.
        '_cron_recrawl_post_draft_id',              // int      Stores the ID of the draft post. A draft post is a post created if target post is paginated. New
                                                    //          content is appended to that post's content. After all pages are recrawled, the draft is published.
    ];

    /** @var array Meta keys used to store a string value (not array). These are very important for importing/exporting
     * settings successfully. */
    private $singleMetaKeys = [
        // SITE SETTINGS
        // Main
        '_active',
        '_active_recrawling',
        '_active_post_deleting',
        '_active_translation',
        '_main_page_url',
        '_do_not_use_general_settings',
        '_cache_test_url_responses',
        '_fix_tabs',
        '_fix_content_navigation',

        // Category
        '_category_list_page_url',
        '_category_collect_in_reverse_order',
        '_test_find_replace_thumbnail_url_cat',
        '_test_find_replace_first_load_cat',
        '_category_post_save_thumbnails',
        '_category_post_is_link_before_thumbnail',
        '_test_url_category',

        // Post
        '_test_url_post',
        '_post_category_add_all_found_category_names',
        '_post_category_add_hierarchical',
        '_post_category_do_not_add_category_in_map',
        '_test_find_replace_date',
        '_post_date_add_minutes',
        '_post_paginate',
        '_post_is_list_type',
        '_post_list_item_auto_number',
        '_post_list_insert_reversed',
        '_post_meta_keywords',
        '_post_meta_keywords_as_tags',
        '_post_meta_description',
        '_post_save_all_images_in_content',
        '_post_save_images_as_media',
        '_post_save_images_as_gallery',
        '_post_save_images_as_woocommerce_gallery',
        '_test_find_replace_image_urls',
        '_test_find_replace_thumbnail_url',
        '_post_save_thumbnails_if_not_exist',

        // Templates
        '_post_template_main',
        '_post_template_title',
        '_post_template_excerpt',
        '_post_template_list_item',
        '_post_template_gallery_item',
        '_post_remove_links_from_short_codes',
        '_post_convert_iframes_to_short_code',
        '_post_convert_scripts_to_short_code',
        '_test_find_replace',
        '_test_find_replace_first_load',
        '_notes',
        '_notes_simple',
        '_dev_tools_state',

        // GENERAL SETTINGS
        '_kdn_make_sure_encoding_utf8',
        '_kdn_convert_charset_to_utf8',
        '_kdn_http_user_agent',
        '_kdn_http_accept',
        '_kdn_http_allow_cookies',
        '_kdn_use_proxy',
        '_kdn_connection_timeout',
        '_kdn_test_url_proxy',
        '_kdn_proxies',
        '_kdn_proxy_try_limit',
        '_kdn_proxy_randomize',

        '_kdn_is_notification_active',
        '_kdn_notification_email_interval_for_site',

        '_kdn_no_new_url_page_trial_limit',
        '_kdn_max_page_count_per_category',
        '_kdn_run_count_url_collection',
        '_kdn_run_count_post_crawl',
        '_kdn_run_count_post_recrawl',
        '_kdn_max_recrawl_count',
        '_kdn_min_time_between_two_recrawls_in_min',
        '_kdn_recrawl_posts_newer_than_in_min',

        '_kdn_delete_posts_older_than_in_min',
        '_kdn_max_post_count_per_post_delete_event',
        '_kdn_is_delete_post_attachments',

        '_kdn_allow_comments',
        '_kdn_post_status',
        '_kdn_post_type',
        '_kdn_post_author',
        '_kdn_post_tag_limit',
        '_kdn_post_password',

        '_kdn_is_translation_active',
        '_kdn_selected_translation_service',
        '_kdn_translation_google_translate_from',
        '_kdn_translation_google_translate_to',
        '_kdn_translation_google_translate_project_id',
        '_kdn_translation_google_translate_api_key',
        '_kdn_translation_google_translate_test',
        '_kdn_translation_microsoft_translate_from',
        '_kdn_translation_microsoft_translate_to',
        '_kdn_translation_microsoft_translate_client_secret',
        '_kdn_translation_microsoft_translate_test',

        // CRON
        '_cron_last_checked_at',
        '_cron_last_checked_category_url',
        '_cron_last_checked_category_next_page_url',
        '_cron_no_new_url_inserted_count',
        '_cron_crawled_page_count',
        '_cron_last_crawled_at',
        '_cron_last_crawled_url_id',
        '_cron_post_next_page_url',
        '_cron_post_draft_id',
        '_cron_recrawl_last_crawled_at',
        '_cron_recrawl_last_crawled_url_id',
        '_cron_recrawl_post_next_page_url',
        '_cron_recrawl_post_draft_id',
        '_cron_last_deleted_at',
    ];

    private $editorButtonsMain;
    private $editorButtonsTitle;
    private $editorButtonsExcerpt;
    private $editorButtonsList;
    private $editorButtonsGallery;
    private $editorButtonsDirectFile;
    private $editorButtonsOptionsBoxTemplates;

    private $allPredefinedShortCodes = [];

    /** @var null|array Holds count of saved URLs and URLs in queue for each site */
    private static $urlCounts = null;

    public function __construct() {
        add_action('plugins_loaded', function() {
            // Initialize the meta keys when the plugins are loaded
            $this->initMetaKeys();
        }, 999); // Execute this as late as possible since we want the registered post detail factories add their own meta keys as well

        // Create post type
        $this->createCustomPostType();

        // Create pageActionKey JS variable, which can be used when making AJAX requests as action variable
        add_action('admin_print_scripts', function() {
            // Print the script only if we are on a site page.
            $screen = get_current_screen();
            if($screen && $screen->base == 'post' && $screen->post_type == Constants::$POST_TYPE) {
                echo "
                    <script type='text/javascript'>
                        if(!pageActionKey || pageActionKey == 'undefined')
                            var pageActionKey = 'kdn_test';
                    </script>
                ";
            }
        });

        // Register ajax url for site list
        add_action('wp_ajax_kdn_site_list', function() {
            if(!check_admin_referer('kdn-site-list', Constants::$NONCE_NAME)) wp_die("Nonce is invalid.");

            if(!isset($_POST["data"])) wp_die(_kdn("Data does not exist in your request. The request should include 'data'"));
            if(!isset($_POST["post_id"])) wp_die(_kdn("Post ID does not exist in your request. The request should have 'post_id'."));

            if(!current_user_can(Constants::$ALLOWED_USER_CAPABILITY)) wp_die("You are not allowed for this.");

            // We'll return JSON response.
            header('Content-Type: application/json');

            echo Factory::postService()->postSiteList($_POST["post_id"], $_POST["data"]);
            wp_die();
        });

        // Register ajax url for tests
        add_action('wp_ajax_kdn_test', function () {
            if(!check_admin_referer('kdn-settings-metabox', Constants::$NONCE_NAME)) wp_die();

            if(!isset($_POST["data"])) wp_die(_kdn("Data does not exist in your request. The request should include 'data'"));

            // We'll return JSON response.
            header('Content-Type: application/json');

            $data = $_POST["data"];

            // Show the test results
            if(isset($data["testType"]) && $testType = $data["testType"]) {
                $result = Test::respondToTestRequest($data);
                if($result !== null) {
                    echo $result;
                }

            } else if(isset($data["requestType"]) && $requestType = $data["requestType"]) {
                $result = Settings::respondToAjaxRequest($data);
                if($result !== null) {
                    echo $result;
                }

            // If there is a command
            } else if(isset($data["cmd"]) && $cmd = $data["cmd"]) {
                switch($cmd) {
                    case "saveDevToolsState":
                        if($data["postId"]) {
                            $result = Utils::savePostMeta($data["postId"], '_dev_tools_state', json_encode($data["state"]));
                            echo $result ? 1 : 0;
                        }

                        break;

                    case "loadGeneralSettings":
                    case "clearGeneralSettings":
                        $isPostPage = true;
                        $isOption = true;
                        $settings = $cmd == "clearGeneralSettings" ? [] : Settings::getAllGeneralSettings();

                        $view = Utils::view('general-settings.settings')
                            ->with(Settings::getSettingsPageVariables(false))
                            ->with(compact("isPostPage", "isOption", "settings"))
                            ->render();

                        // HTML attributes with JSON values cause the attributes not to be rendered properly by browser.
                        // So, let's replace single quotes of the JSON-valued attributes with double quotes. Also, double
                        // quotes in JSON string are escaped as &quot;. Let's unescape them as well. After all this, the
                        // HTML will be valid.
                        $view = str_replace('="{', "='{", $view);
                        $view = str_replace('}"', "}'", $view);
                        $view = str_replace("&quot;", '"', $view);

                        $response = json_encode([
                            "view" => $view
                        ]);

                        echo $response;

                        break;

                    case "invalidate_url_response_cache":
                        $url = Utils::array_get($data, "url");

                        $result = $url ? ResponseCache::getInstance()->delete("GET", $url) : false;
                        echo $result ? 1 : 0;
                        break;

                    case "invalidate_all_url_response_caches":
                        $result = ResponseCache::getInstance()->deleteAll();
                        echo $result ? 1 : 0;
                        break;

                    case "saveSiteSettings":
                        echo $this->quickSaveSettings($data);
                        break;
                }
            }

            wp_die();
        });

    }

    /**
     * Initializes meta keys used by the plugin
     * @since 1.8.0
     */
    private function initMetaKeys() {
        // Combine meta keys for the post and keys for general settings. By this way, the user will be able to save options
        // for those keys. This is because the request is checked for $metaKeys.
        // First, remove the setting used for activating scheduling. Each site already has an "active" setting.
        $generalSettings = Factory::generalSettingsController()->settings;
        unset($generalSettings[array_search('_kdn_is_scheduling_active', $generalSettings)]);
        $this->metaKeys = array_merge($this->metaKeys, $generalSettings);

        // Add the meta keys of the registered post details
        $this->metaKeys         = PostDetailsService::getInstance()->addAllSettingsMetaKeys($this->metaKeys);
        $this->metaKeyDefaults  = PostDetailsService::getInstance()->addAllSettingsMetaKeyDefaults($this->metaKeyDefaults);
        $this->singleMetaKeys   = PostDetailsService::getInstance()->addAllSingleSettingsMetaKeys($this->singleMetaKeys);

        /*
         * ALLOW MODIFICATION OF META KEYS WITH FILTERS
         */

        /**
         * Modify meta keys that are used to save site settings.
         *
         * @param array $metaKeys
         *
         * @since 1.6.3
         * @return array Modified meta keys
         */
        $this->metaKeys = apply_filters('kdn/post/settings/meta-keys', $this->metaKeys);

        /**
         * Modify meta key defaults.
         *
         * @param array $metaKeyDefaults
         *
         * @since 1.8.0
         * @return array Modified meta key defaults
         */
        $this->metaKeyDefaults = apply_filters('kdn/post/settings/meta-key-defaults', $this->metaKeyDefaults);

        /**
         * Modify CRON meta keys that are used to save information about CRON events.
         *
         * @param array $cronMetaKeys
         *
         * @since 1.6.3
         * @return array Modified CRON meta keys
         */
        $this->cronMetaKeys = apply_filters('kdn/post/settings/cron-meta-keys', $this->cronMetaKeys);

        /**
         * Modify single meta keys. These keys can only be used to store a single value. So, they cannot store serialized
         * array etc. They can only store a single value. Indicating if a meta key is single or not has a vital importance
         * when showing already-saved settings in the form item fields and importing/exporting settings. Hence, if a meta
         * key you added to 'metaKeys' stores a single value, you have to make sure that you added that meta key among
         * 'singleMetaKeys' as well.
         *
         * @param array $singleMetaKeys
         *
         * @since 1.6.3
         * @return array Modified single meta keys
         */
        $this->singleMetaKeys = apply_filters('kdn/post/settings/single-meta-keys', $this->singleMetaKeys);
    }

    /**
     * Handles AJAX requests made from site list page
     * @param int $postId ID of the site to be updated
     * @param array $data
     * @return string JSON
     */
    public function postSiteList($postId, $data) {
        
        $key = isset($data["_active"]) ? '_active' : '_active_recrawling';

        return json_encode([
            "data" => $data,
            $key   => $data[$key] == "true" ? false : true,
        ]);
        
        // Save the data
        $results = [];

        if(isset($data["_active"])) {
            $results["_active"] = Utils::savePostMeta($postId, "_active", $data["_active"] == "true" ? true : false, true);
        }

        if(isset($data["_active_recrawling"])) {
            $results["_active_recrawling"] = Utils::savePostMeta($postId, "_active_recrawling", $data["_active_recrawling"] == "true" ? true : false, true);
        }

        if(isset($data["_active_post_deleting"])) {
            $results["_active_post_deleting"] = Utils::savePostMeta($postId, "_active_post_deleting", $data["_active_post_deleting"] == "true" ? true : false, true);
        }

        $results["data"] = $data;
        $results["post_id"] = $postId;
        return json_encode($results);
    }

    /**
     * Prepares and returns HTML for site settings meta box
     * @return string HTML
     */
    public function getSettingsMetaBox() {
        if(!current_user_can(Constants::$ALLOWED_USER_CAPABILITY)) return '';
        global $post;

        // Set Tiny MCE settings so that it allows custom HTML codes and keeps them unchanged
        add_filter('tiny_mce_before_init', function($settings) {

            // Disable autop to keep all valid HTML elements
            $settings['wpautop'] = false;

            // Don't remove line breaks
            $settings['remove_linebreaks'] = false;

            // Format the HTML
            $settings['apply_source_formatting'] = true;

            // Convert newline characters to BR
            $settings['convert_newlines_to_brs'] = true;

            // Don't remove redundant BR
            $settings['remove_redundant_brs'] = false;

            // Pass back to WordPress
            return $settings;
        });

        $settings = get_post_meta($post->ID);

        // Set the defaults only if there are no settings.
        if (!$settings) $settings = $this->metaKeyDefaults;

        $settingsImpl = new SettingsImpl($settings, static::getSingleMetaKeys());

        // Create view variables
        $viewVars = array_merge([
            'postId'                        => $post->ID,
            'settings'                      => $settings,
            'settingsForExport'             => base64_encode(serialize($this->getSettingsForExport($settings))),
            'categories'                    => Utils::getCategories($settingsImpl),
            'buttonsMain'                   => $this->getEditorButtonsMain(),
            'buttonsTitle'                  => $this->getEditorButtonsTitle(),
            'buttonsExcerpt'                => $this->getEditorButtonsExcerpt(),
            'buttonsList'                   => $this->getEditorButtonsList(),
            'buttonsGallery'                => $this->getEditorButtonsGallery(),
            'buttonsDirectFile'             => $this->getEditorButtonsDirectFile(),
            'buttonsOptionsBoxTemplates'    => $this->getEditorButtonsOptionsBoxTemplates(),
            'buttonsFileOptionsBoxTemplates'=> FileOptionsBoxApplier::getShortCodeButtons(),
            'optionsBoxConfigs'             => $this->getOptionsBoxConfigs($settingsImpl)
        ], Settings::getSettingsPageVariables(false));

        // Add post detail settings if there are any
        $postDetailSettingsViews = PostDetailsService::getInstance()->getSettingsViews($settingsImpl, $viewVars);

        $viewVars['postDetailSettingsViews'] = $postDetailSettingsViews;

        return Utils::view('site-settings/main')->with($viewVars)->render();
    }

    /**
     * Creates options box configurations for specific settings.
     *
     * @param SettingsImpl $postSettings
     * @return array A key-value pair. The keys are meta keys of the settings. The values are arrays storing the
     *               configuration for the options box for that setting.
     * @since 1.8.0
     */
    private function getOptionsBoxConfigs($postSettings) {

        $configs = [

            /**
            * TAB Category
            */

            // Category post URL selectors
            '_category_post_link_selectors' => OptionsBoxConfiguration::init()
                ->addTabOption(OptionsBoxTab::TEMPLATES, TemplatesTabOptions::ALLOWED_SHORT_CODES, [
                    ShortCodeName::KDN_ITEM
                ])->get(),

            // Category next page selectors
            '_category_next_page_selectors' => OptionsBoxConfiguration::init()
                ->addTabOption(OptionsBoxTab::TEMPLATES, TemplatesTabOptions::ALLOWED_SHORT_CODES, [
                    ShortCodeName::KDN_ITEM
                ])->get(),

            /**
            * TAB Post
            */

            // Ajax URL selectors
            '_post_ajax_url_selectors' => OptionsBoxConfiguration::init()
                ->addTabOption(OptionsBoxTab::TEMPLATES, TemplatesTabOptions::ALLOWED_SHORT_CODES, [
                    ShortCodeName::KDN_ITEM
                ])->get(),

            // Ajax HEADERs selectors
            '_post_ajax_headers_selectors' => OptionsBoxConfiguration::init()
                ->addTabOption(OptionsBoxTab::TEMPLATES, TemplatesTabOptions::ALLOWED_SHORT_CODES, [
                    ShortCodeName::KDN_ITEM
                ])->get(),

            // Featured image selectors
            '_post_thumbnail_selectors' => OptionsBoxConfiguration::init()
                ->setType(OptionsBoxType::FILE)
                ->get(),

            // Gallery image selectors
            '_post_gallery_image_selectors' => OptionsBoxConfiguration::init()
                ->setType(OptionsBoxType::FILE)
                ->get(),

            // Image selectors
            '_post_image_selectors' => OptionsBoxConfiguration::init()
                ->setType(OptionsBoxType::FILE)
                ->get(),

            // Direct file selectors
            '_post_direct_file_selectors' => OptionsBoxConfiguration::init()
                ->setType(OptionsBoxType::FILE)
                ->get(),

            // Stop crawling for first page selectors
            '_post_stop_crawling_first_page' => OptionsBoxConfiguration::init()
                ->addTabOption(OptionsBoxTab::TEMPLATES, TemplatesTabOptions::ALLOWED_SHORT_CODES, [
                    ShortCodeName::KDN_ITEM
                ])->get(),

            // Stop crawling in all run selectors
            '_post_stop_crawling_all_run' => OptionsBoxConfiguration::init()
                ->addTabOption(OptionsBoxTab::TEMPLATES, TemplatesTabOptions::ALLOWED_SHORT_CODES, [
                    ShortCodeName::KDN_ITEM
                ])->get(),

            // Stop crawling in each run selectors
            '_post_stop_crawling_each_run' => OptionsBoxConfiguration::init()
                ->addTabOption(OptionsBoxTab::TEMPLATES, TemplatesTabOptions::ALLOWED_SHORT_CODES, [
                    ShortCodeName::KDN_ITEM
                ])->get(),

            /**
            * TAB Child post
            */

            // Ajax URL selectors
            '_child_post_ajax_url_selectors' => OptionsBoxConfiguration::init()
                ->addTabOption(OptionsBoxTab::TEMPLATES, TemplatesTabOptions::ALLOWED_SHORT_CODES, [
                    ShortCodeName::KDN_ITEM
                ])->get(),

            // Ajax HEADERs selectors
            '_child_post_ajax_headers_selectors' => OptionsBoxConfiguration::init()
                ->addTabOption(OptionsBoxTab::TEMPLATES, TemplatesTabOptions::ALLOWED_SHORT_CODES, [
                    ShortCodeName::KDN_ITEM
                ])->get(),

            // Featured image selectors
            '_child_post_thumbnail_selectors' => OptionsBoxConfiguration::init()
                ->setType(OptionsBoxType::FILE)
                ->get(),

            // Gallery image selectors
            '_child_post_gallery_image_selectors' => OptionsBoxConfiguration::init()
                ->setType(OptionsBoxType::FILE)
                ->get(),

            // Image selectors
            '_child_post_image_selectors' => OptionsBoxConfiguration::init()
                ->setType(OptionsBoxType::FILE)
                ->get(),

            // Direct file selectors
            '_child_post_direct_file_selectors' => OptionsBoxConfiguration::init()
                ->setType(OptionsBoxType::FILE)
                ->get(),

            // Stop crawling for first page selectors
            '_child_post_stop_crawling_first_page' => OptionsBoxConfiguration::init()
                ->addTabOption(OptionsBoxTab::TEMPLATES, TemplatesTabOptions::ALLOWED_SHORT_CODES, [
                    ShortCodeName::KDN_ITEM
                ])->get(),

            // Stop crawling in all run selectors
            '_child_post_stop_crawling_all_run' => OptionsBoxConfiguration::init()
                ->addTabOption(OptionsBoxTab::TEMPLATES, TemplatesTabOptions::ALLOWED_SHORT_CODES, [
                    ShortCodeName::KDN_ITEM
                ])->get(),

            // Stop crawling in each run selectors
            '_child_post_stop_crawling_each_run' => OptionsBoxConfiguration::init()
                ->addTabOption(OptionsBoxTab::TEMPLATES, TemplatesTabOptions::ALLOWED_SHORT_CODES, [
                    ShortCodeName::KDN_ITEM
                ])->get(),
        ];

        // Get the configurations of registered post details
        $configs = array_merge($configs, PostDetailsService::getInstance()->getOptionsBoxConfigs($postSettings));

        return $configs;
    }

    /**
     * Prepares and returns HTML for site notes meta box
     * @return string HTML
     */
    public function getNotesMetaBox() {
        if(!current_user_can(Constants::$ALLOWED_USER_CAPABILITY)) return '';
        global $post;
        $notesSimple = get_post_meta($post->ID, '_notes_simple');

        return Utils::view('site-settings/meta-box-notes')->with([
            'notesSimple'   =>  $notesSimple
        ]);
    }

    /**
     * Handles HTTP POST requests made by create/edit page (where site settings meta box is)
     *
     * @param int $postId
     * @param WP_Post $postAfter
     * @param WP_Post $postBefore
     */
    public function postSettingsMetaBox($postId, $postAfter, $postBefore) {

        if(!current_user_can(Constants::$ALLOWED_USER_CAPABILITY)) return;

        // If the nonce does not exist in the request or the request is not made from admin page, abort.
        if(!isset($_POST["action"]) || !$_POST["action"] == 'kdn_tools') {  // Allow requests made from Tools
            if (!isset($_POST[Constants::$NONCE_NAME]) || !check_admin_referer('kdn-settings-metabox', Constants::$NONCE_NAME))
                return;
        }

        // Do not run if the post is moved to trash.
        if ($postAfter->post_status == 'trash') return;

        // Do not run if the post is restored.
        if ($postBefore->post_status == 'trash') return;

        $this->saveSettings($postId, $_POST);
    }

    /**
     * Saves settings from AJAX data that contains serialized form values.
     *
     * @param array $data AJAX data
     * @return string JSON
     * @since 1.8.0
     */
    private function quickSaveSettings($data) {
        $postId = Utils::array_get($data, "postId");
        $serializedSettings = Utils::array_get($data, "settings");
        if (!$serializedSettings) {
            return json_encode([
                "success" => false,
                "message" => _kdn("Settings do not exist in the data.")
            ]);
        }

        if (!$postId) {
            return json_encode([
                "success" => false,
                "message" => _kdn("Post ID does not exist.")
            ]);
        }

        // Prepare the serialized settings string

        // parse_str function escapes special characters. However, it cannot escape special characters that are
        // URL-encoded. Therefore, we need to escape them manually. urldecode function does not do the job either. It
        // behaves the same for some reason.
        // A backslash is URL-encoded and it needs to be escaped. Here, we replace a backslash, whose URL-encoded
        // equivalent is %5C, with double backslash, which is %5C%5C.
        $serializedSettings = str_replace('%5C', '%5C%5C', $serializedSettings);

        // Parse the serialized value to an array
        $settings = [];
        parse_str($serializedSettings, $settings);

        // Remove URL hash since it is only needed when the page is updated after saving. Here, the settings are saved
        // via AJAX. So, no update.
        if (isset($settings['url_hash'])) unset($settings['url_hash']);

        // Save the settings
        $result = $this->saveSettings($postId, $settings);

        // Add export option's value
        $result["settingsForExport"] = base64_encode(serialize($this->getSettingsForExport(get_post_meta($postId))));

        return json_encode($result);
    }

    /**
     * @param int   $postId
     * @param array $settings Settings retrieved from form. $_POST can be directly supplied. The values must be slashed
     *                        because WP's post meta saving function requires slashed data.
     * @return array
     * @since 1.8.0
     */
    private function saveSettings($postId, $settings) {
        $data = $settings;
        $success = true;
        $message = '';

        $queryParams = [];
        if(isset($data["url_hash"])) $queryParams["url_hash"] = $data["url_hash"];

        // Check if the user wants to import the settings
        if(isset($data["_post_import_settings"]) && !empty($data["_post_import_settings"])) {
            // User wants to import the settings. Parse them and replace data variable with the imported settings.
            $serializedSettings = base64_decode($data["_post_import_settings"]);
            if($serializedSettings && is_serialized($serializedSettings)) {
                $settings = unserialize($serializedSettings);

                // When saving the data with update_post_meta or a similar function, WordPress first unslashes it.
                // So, we need to slash the values of the array using wp_slash. This does not matter when normally saving
                // the settings. Because, WordPress automatically slashes the values taken from $_POST.
                $data = Utils::arrayDeepSlash($settings);
            }
        }

        // Check if the category map is the same as before
        $categoryMapBefore = get_post_meta($postId, '_category_map', true);
        if(is_array($categoryMapBefore)) $categoryMapBefore = array_values($categoryMapBefore);
        if(isset($data['_category_map'])) {
            $categoryMapCurrent = array_values($data['_category_map']);

            // If category map is changed, then delete all of the unsaved URLs belonging to this site. Because, it is
            // not possible to know which URL is for which category, since we do not store category URLs in the table.
            if($categoryMapBefore !== $categoryMapCurrent) {
                Factory::databaseService()->deleteUrlsBySiteIdAndSavedStatus($postId, false);

                // Also reset (deleting does the job) the CRON meta values for this site
                $cronMetaKeys = $this->cronMetaKeys;

                unset($cronMetaKeys[array_search('_cron_last_crawled_at', $cronMetaKeys)]);
                unset($cronMetaKeys[array_search('_cron_last_checked_at', $cronMetaKeys)]);
                unset($cronMetaKeys[array_search('_cron_recrawl_last_crawled_at', $cronMetaKeys)]);
                unset($cronMetaKeys[array_search('_cron_recrawl_last_checked_at', $cronMetaKeys)]);

                foreach($cronMetaKeys as $key) {
                    delete_post_meta($postId, $key);
                }
            }
        }

        $keys = $this->metaKeys;

        // Validate password fields
        $validate = Utils::validatePasswordInput($data, $keys, get_post_meta($postId, '_kdn_post_password', true));
        if(!$validate["success"]) {
            // Not valid.
            $message = $validate["message"] . ' ' . _kdn('Settings are updated, but password could not be changed.');
            $success = false;
        }

        // Save options
        foreach ($data as $key => $value) {
            if (in_array($key, $this->metaKeys)) {
                if(is_array($value)) $value = array_values($value);
                Utils::savePostMeta($postId, $key, $value, true);

                // Remove the key, since it is saved.
                unset($keys[array_search($key, $keys)]);
            }
        }

        // Delete the metas which are not set
        foreach($keys as $key) delete_post_meta($postId, $key);

        // Update notice option. This option is used to show notices on site (custom post) page.
        if(!$success) {
            update_option('_kdn_site_notice', $message, true);
            Utils::savePostMeta($postId, '_kdn_site_query_params', false);
        } else {
            update_option('_kdn_site_notice', false, true);
            Utils::savePostMeta($postId, '_kdn_site_query_params', $queryParams);
        }

        return [
            "message" => $message,
            "success" => $success
        ];
    }

    /**
     * Prepares and returns an array for exporting settings.
     *
     * @param $settings
     * @return array
     */
    private function getSettingsForExport($settings) {
        foreach($settings as $key => &$mSetting) {
            // If current key is not in our meta keys, remove it from the array. We should export only related settings.
            // Otherwise, we have to deal with this when importing.
            if(!in_array($key, $this->metaKeys)) {
                unset($settings[$key]);
                continue;
            }

            $mSetting = $this->getUnserialized($mSetting);

            // Set single meta key values as string
            if(in_array($key, $this->singleMetaKeys) && is_array($mSetting) && !empty($mSetting)) {
                $mSetting = array_values($mSetting)[0];
            }
        }

        return $settings;
    }

    /**
     * Checks a parameter if it should be unserialized, and if so, does so. If the parameter has serialized values inside,
     * those will be unserialized as well. Hence, at the end, there will be no serialized strings inside the value.
     *
     * @param mixed $metaValue The value to be unserialized
     * @return mixed Unserialized value
     */
    private function getUnserialized($metaValue) {
        $val = (!empty($metaValue) && isset($metaValue[0])) ? $metaValue[0] : $metaValue;
        return is_serialized($val) ? $this->getUnserialized(unserialize($val)) : $metaValue;
    }

    /**
     * Creates custom post types, attaches events to be fired when post is saved, makes necessary changes and so on.
     */
    public function createCustomPostType() {
        // Add custom post type and configure it
        add_action('init', function() {
            $labels = array(
                'name'                  => _kdn('Sites'),
                'singular_name'         => _kdn('Site'),
                'menu_name'             => _kdn('KDN Auto Leech'),
                'name_admin_bar'        => _kdn('KDN Auto Leech Site'),
                'add_new'               => _kdn('Add New'),
                'add_new_item'          => _kdn('Add New Site'),
                'new_item'              => _kdn('New Site'),
                'edit_item'             => _kdn('Edit Site'),
                'view_item'             => _kdn('View Site'),
                'all_items'             => _kdn('All Sites'),
                'search_items'          => _kdn('Search Sites'),
                'parent_item_colon'     => _kdn('Parent Sites:'),
                'not_found'             => _kdn('No sites found.'),
                'not_found_in_trash'    => _kdn('No sites found in Trash.')
            );

            $args = array(
                'public'                => true,
                'labels'                => $labels,
                'description'           => _kdn('A custom post type which stores sites to be crawled'),
                'menu_icon'             => KDN_AUTO_LEECH_URL . 'app/icon.png',
                'show_ui'               => true,
                'show_in_admin_bar'     => true,
                'show_in_menu'          => true,
                'supports'              => []
            );

            register_post_type(Constants::$POST_TYPE, $args);
            remove_post_type_support(Constants::$POST_TYPE, 'editor');

        });

        // Set columns
        add_filter(sprintf('manage_%s_posts_columns', Constants::$POST_TYPE), function($columns) {
            unset($columns["date"]);
            $newColumns = [
                "author"               => _kdn("Author"),
                "active"               => _kdn("Active for scheduling"),
                "active_recrawling"    => _kdn("Active for recrawling"),
                "active_post_deleting" => _kdn("Active for deleting"),
                "counts"               => _kdn("Counts"),
                "last_checked"         => _kdn("Last URL Collection"),
                "last_crawled"         => _kdn("Last Post Crawl"),
                "last_recrawled"       => _kdn("Last Post Recrawl"),
                "last_deleted"         => _kdn("Last Post Delete"),
                "date"                 => __("Date")
            ];

            return array_merge($columns, $newColumns);
        });

        // Set sortable columns
        add_filter(sprintf('manage_edit-%s_sortable_columns', Constants::$POST_TYPE), function($columns) {
            $columns['active']                  = 'active';
            $columns['active_recrawling']       = 'active_recrawling';
            $columns['active_post_deleting']    = 'active_post_deleting';
            $columns['last_checked']            = 'last_checked';
            $columns['last_crawled']            = 'last_crawled';
            $columns['last_recrawled']          = 'last_recrawled';
            $columns['last_deleted']            = 'last_deleted';
            return $columns;
        });

        // Sort the columns when the user wants it
        add_action("load-edit.php", function() {
            add_filter('request', function($vars) {
                if (isset($vars['post_type']) && $vars['post_type'] == Constants::$POST_TYPE) {
                    if (isset($vars['orderby'])) {

                        $metaKey = $orderBy = null;
                        switch($vars['orderby']) {
                            case 'active':
                                $metaKey = '_active';
                                $orderBy = 'meta_value';
                                break;
                            case 'active_recrawling':
                                $metaKey = '_active_recrawling';
                                $orderBy = 'meta_value';
                                break;
                            case 'active_post_deleting':
                                $metaKey = '_active_post_deleting';
                                $orderBy = 'meta_value';
                                break;
                            case 'last_checked':
                                $metaKey = '_cron_last_checked_at';
                                $orderBy = 'meta_value';
                                break;
                            case 'last_crawled':
                                $metaKey = '_cron_last_crawled_at';
                                $orderBy = 'meta_value';
                                break;
                            case 'last_recrawled':
                                $metaKey = '_cron_recrawl_last_crawled_at';
                                $orderBy = 'meta_value';
                                break;
                            case 'last_deleted':
                                $metaKey = Factory::schedulingService()->metaKeyCronLastDeleted;
                                $orderBy = 'meta_value';
                                break;
                        }

                        // Merge the query vars with custom variables.
                        if($metaKey !== null && $orderBy !== null) {
                            $vars = array_merge($vars, [
                                'meta_key'  => $metaKey,
                                'orderby'   => $orderBy
                            ]);
                        }
                    }
                }

                return $vars;
            });
        });

        // Set column contents
        add_filter(sprintf('manage_%s_posts_custom_column', Constants::$POST_TYPE), function($columnName, $postId) {
//            dd($columnName);
            if($columnName == 'active') {
                $active = get_post_meta($postId, '_active', true);
                echo '<input type="checkbox" name="_active" data-post-id="' . $postId . '"' . ($active ? 'checked="checked"' : '') . '>';

            } else if($columnName == 'active_recrawling') {
                $active = get_post_meta($postId, '_active_recrawling', true);
                echo '<input type="checkbox" name="_active_recrawling" data-post-id="' . $postId . '"' . ($active ? 'checked="checked"' : '') . '>';

            } else if($columnName == 'active_post_deleting') {
                $active = get_post_meta($postId, '_active_post_deleting', true);
                echo '<input type="checkbox" name="_active_post_deleting" data-post-id="' . $postId . '"' . ($active ? 'checked="checked"' : '') . '>';

            } else if($columnName == 'counts') {
                $allCounts = Factory::postService()->getUrlTableCounts();
                if(!isset($allCounts[$postId])) {
                    echo "-";

                } else {
                    $counts = $allCounts[$postId];

                    $s = '<b>%1$s</b>: %2$d';
                    echo
                        sprintf($s, _kdn("Queue"),     $counts["count_queue"])     . "<br>" .
                        sprintf($s, _kdn("Saved"),     $counts["count_saved"])     . "<br>" .
                        sprintf($s, _kdn("Updated"),   $counts["count_updated"])   . "<br>" .
                        sprintf($s, _kdn("Deleted"),   $counts["count_deleted"])   . "<br>" .
                        sprintf($s, _kdn("Other"),     $counts["count_other"])     . "<br>" .
                        sprintf($s, _kdn("Total"),     $counts["count_total"])
                    ;
                }

            } else if($columnName == 'last_checked') {
                $date = get_post_meta($postId, '_cron_last_checked_at', true);
                echo Utils::getDateFormatted($date);

            } else if($columnName == 'last_crawled') {
                $date = get_post_meta($postId, '_cron_last_crawled_at', true);
                echo Utils::getDateFormatted($date);

            } else if($columnName == 'last_recrawled') {
                $date = get_post_meta($postId, '_cron_recrawl_last_crawled_at', true);
                echo Utils::getDateFormatted($date);

            } else if($columnName == 'last_deleted') {
                $date = get_post_meta($postId, Factory::schedulingService()->metaKeyCronLastDeleted, true);
                echo Utils::getDateFormatted($date);
            }
        }, 10, 2);

        // Remove quick edit button
        add_filter('post_row_actions', function ($actions) {
            $currentScreen = get_current_screen();
            if(!isset($currentScreen->post_type) || $currentScreen->post_type != Constants::$POST_TYPE) return $actions;

            unset($actions['inline hide-if-no-js']);
            return $actions;
        }, 10, 1);

        // Set interaction messages
        add_filter('post_updated_messages', function ($messages) {
            $post = get_post();

            $messages[Constants::$POST_TYPE] = array(
                0 => '',
                1 => _kdn('Site updated.'),
                2 => _kdn('Custom field updated.'),
                3 => _kdn('Custom field deleted.'),
                4 => _kdn('Site updated.'),
                5 => isset($_GET['revision']) ? sprintf(_kdn('Site restored to revision from %s'), wp_post_revision_title((int)$_GET['revision'], false)) : false,
                6 => _kdn('Site published.'),
                7 => _kdn('Site saved.'),
                8 => _kdn('Site submitted.'),
                9 => sprintf(
                    _kdn('Site scheduled for: <strong>%1$s</strong>.'),
                    date_i18n('M j, Y @ G:i', strtotime($post->post_date))
                ),
                10 => _kdn('Site draft updated.'),
            );

            return $messages;
        });

        add_filter('enter_title_here', function($title) {
            if(get_current_screen()->post_type == Constants::$POST_TYPE) {
                $title = _kdn('Enter site name here');
            }

            return $title;
        });

        // Create help tabs
        add_filter('admin_head', function () {
            $screen = get_current_screen();

            // Stop if we are not in the custom post type screen we created.
            if (!isset($screen->post_type) || $screen->post_type != Constants::$POST_TYPE) return;

//            $basics = array(
//                'id'        => 'kdn_site_basics',
//                'title'     => 'Site Basics',
//                'content'   => 'Basic content for help tab here'
//            );
//
//            $formatting = array(
//                'id'        => 'kdn_site_formatting',
//                'title'     => 'Site Formatting',
//                'content'   => 'Content for help tab here'
//            );
//
//            $screen->add_help_tab($basics);
//            $screen->add_help_tab($formatting);

            // ADD NONCE
            // This will add the nonce after "All" link above the table (near "Published" link). This is the best
            // place I can come up with.
            add_filter('views_' . $screen->id, function($views) {
                $views['all'] = $views['all'] . wp_nonce_field('kdn-site-list', Constants::$NONCE_NAME);
                return $views;
            });

        });

        // Add the meta box. It will hold all settings.
        add_action('add_meta_boxes', function () {
            add_meta_box(
                Constants::$SITE_SETTINGS_META_BOX_ID,
                _kdn('Settings'),
                function () { echo Factory::postService()->getSettingsMetaBox(); },
                Constants::$POST_TYPE,
                'normal',
                'high'
            );

            // Also add a meta box for keeping simple notes.
            add_meta_box(
                Constants::$SITE_SETTINGS_NOTES_META_BOX_ID,
                _kdn('Simple Notes'),
                function() { echo Factory::postService()->getNotesMetaBox(); },
                Constants::$POST_TYPE,
                'side'
            );
        });

        // Add a class to the meta box to be able to differentiate it from other meta boxes. In this case, we want
        // the meta box not sortable, because WYSIWYG editor does not like being moved around, and the meta box will
        // have several WYSIWYG editors inside.
        add_filter(sprintf('postbox_classes_%s_%s', Constants::$POST_TYPE, Constants::$SITE_SETTINGS_META_BOX_ID),
            function($classes) {
                $classes[] = 'not-sortable';
                return $classes;
            }
        );

        // Add styles and scripts for post settings
        add_action('admin_enqueue_scripts', function ($hook) {
            // Check if we are on the custom post page.
            global $post;
            $valid = ($hook == 'post-new.php' && isset($_GET["post_type"]) && $_GET["post_type"] == Constants::$POST_TYPE) ||
                ($hook == 'post.php' && $post && $post->post_type == Constants::$POST_TYPE);
            if(!$valid) return;

            Factory::assetManager()->addPostSettings();

            $settings = $post && isset($post->ID) ? get_post_meta($post->ID) : [];

            // Add assets of the registered post details
            PostDetailsService::getInstance()->addSiteSettingsAssets($settings);

            Factory::assetManager()->addTooltip();
            Factory::assetManager()->addClipboard();
            Factory::assetManager()->addDevTools();
            Factory::assetManager()->addOptionsBox();
            Factory::assetManager()->addAnimate();
        });

        // Add styles and scripts for site list
        add_action('admin_enqueue_scripts', function($hook) {
            // Check if we are on the site list page
            $valid = $hook == 'edit.php' && isset($_GET["post_type"]) && $_GET["post_type"] == Constants::$POST_TYPE;
            if(!$valid) return;

            Factory::assetManager()->addPostList();
        });

        // Save options when the post is saved
        add_action('post_updated', function($postId, $postAfter, $postBefore) {
            Factory::postService()->postSettingsMetaBox($postId, $postAfter, $postBefore);
        }, 10, 3);

        // Delete all URLs when the site is permanently deleted
        add_action('admin_init', function() {
            add_action('delete_post', function($postId) {
                global $post_type;
                if ($post_type != Constants::$POST_TYPE) return;

                Factory::databaseService()->deleteUrlsBySiteId($postId);
            });
        });

        // Show notices when there is an error
        add_action('admin_notices', function() {
            $message = get_option('_kdn_site_notice');
            if($message) {
                echo Utils::view('partials/alert')->with([
                    'message'   =>  $message,
                    'type'      =>  'error'
                ])->render();

                update_option('_kdn_site_notice', false);
            }
        });

    }

    /**
     * Get counts of URLs grouped by site ID and whether they are saved or not.
     *
     * @return array An array with keys being site IDs and values being an array containing post counts. Each value
     * array has <b>count_saved</b>, <b>count_updated</b>, <b>count_queue</b>, <b>count_deleted</b>, <b>count_other</b>, <b>count_total</b>.
     * These values are either <b>integer or null</b>.
     */
    public function getUrlTableCounts() {
        // If it is already found before, return it.
        if(static::$urlCounts) return static::$urlCounts;

        // Find URL counts
        global $wpdb;
        $tableUrls = Factory::databaseService()->getDbTableUrlsName();

        $query = "SELECT t_total.post_id, count_saved, count_updated, count_queue, count_deleted,
                (IFNULL(count_total, 0) - IFNULL(count_saved, 0) - IFNULL(count_queue, 0) - IFNULL(count_deleted, 0)) as count_other, count_total
            FROM
                (SELECT post_id, count(*) as count_total FROM {$tableUrls} GROUP BY post_id) t_total
            
            LEFT JOIN (
                SELECT post_id, count(*) as count_queue 
                FROM {$tableUrls} 
                WHERE saved_post_id IS NULL 
                    AND is_saved = FALSE 
                GROUP BY post_id) t_queue ON t_total.post_id = t_queue.post_id
            
            LEFT JOIN (
                SELECT post_id, count(*) as count_saved
                FROM {$tableUrls} 
                WHERE saved_post_id IS NOT NULL 
                    AND is_saved = TRUE
                GROUP BY post_id) t_saved ON t_total.post_id = t_saved.post_id
                
            LEFT JOIN (
                SELECT post_id, count(*) as count_updated
                FROM {$tableUrls} 
                WHERE saved_post_id IS NOT NULL 
                    AND is_saved = TRUE
                    AND update_count > 0
                GROUP BY post_id) t_updated ON t_total.post_id = t_updated.post_id
            
            LEFT JOIN (
                SELECT post_id, count(*) as count_deleted
                FROM {$tableUrls}
                WHERE saved_post_id IS NULL
                    AND deleted_at IS NOT NULL
                GROUP BY post_id) t_deleted ON t_total.post_id = t_deleted.post_id";

        $results = $wpdb->get_results($query, ARRAY_A);
        $data = [];

        foreach($results as $result) {
            // Get post id from current result
            $currentPostId = $result["post_id"];

            // Unset the post id
            unset($result["post_id"]);

            // Add the result to the data under post ID key.
            $data[$currentPostId] = $result;
        }

        static::$urlCounts = $data;

        return static::$urlCounts;
    }

    /*
     * EDITOR BUTTONS
     */

    private function getEditorButtonsMain() {
        if(!$this->editorButtonsMain) $this->editorButtonsMain = [
            $this->createButtonInfo(ShortCodeName::KDN_MAIN_TITLE,          _kdn("Prepared post title"), true),
            $this->createButtonInfo(ShortCodeName::KDN_MAIN_EXCERPT,        _kdn("Prepared post excerpt"), true),
            $this->createButtonInfo(ShortCodeName::KDN_MAIN_CONTENT,        _kdn("Main post content")),
            $this->createButtonInfo(ShortCodeName::KDN_MAIN_LIST,           _kdn("List items")),
            $this->createButtonInfo(ShortCodeName::KDN_MAIN_GALLERY,        _kdn("Gallery items")),
            $this->createButtonInfo(ShortCodeName::KDN_MAIN_DIRECT_FILE,    _kdn("Direct files")),
            $this->createButtonInfo(ShortCodeName::KDN_SOURCE_URL,          sprintf(_kdn('Full URL of the target page. You can use this to reference the source page. E.g. <a href="%1$s">Source</a>'), '[' . ShortCodeName::KDN_SOURCE_URL .']')),
        ];

        return $this->editorButtonsMain;
    }

    private function getEditorButtonsTitle() {
        if(!$this->editorButtonsTitle) $this->editorButtonsTitle = [
            $this->createButtonInfo(ShortCodeName::KDN_MAIN_TITLE, _kdn("Original post title"), true),
        ];

        return $this->editorButtonsTitle;
    }

    private function getEditorButtonsExcerpt() {
        if(!$this->editorButtonsExcerpt) $this->editorButtonsExcerpt = [
            $this->createButtonInfo(ShortCodeName::KDN_MAIN_TITLE,   _kdn("Prepared post title"), true),
            $this->createButtonInfo(ShortCodeName::KDN_MAIN_EXCERPT, _kdn("Original post excerpt"), true),
        ];

        return $this->editorButtonsExcerpt;
    }

    private function getEditorButtonsList() {
        if(!$this->editorButtonsList) $this->editorButtonsList = [
            $this->createButtonInfo(ShortCodeName::KDN_LIST_ITEM_TITLE, _kdn("List item title")),
            $this->createButtonInfo(ShortCodeName::KDN_LIST_ITEM_CONTENT, _kdn("List item content")),
            $this->createButtonInfo(ShortCodeName::KDN_LIST_ITEM_POSITION, _kdn("The position of the item.")),
        ];

        return $this->editorButtonsList;
    }

    private function getEditorButtonsGallery() {
        if(!$this->editorButtonsGallery) $this->editorButtonsGallery = [
            $this->createButtonInfo(ShortCodeName::KDN_GALLERY_ITEM_URL, _kdn("Gallery item URL"))
        ];

        return $this->editorButtonsGallery;
    }

    private function getEditorButtonsDirectFile() {
        if(!$this->editorButtonsDirectFile) $this->editorButtonsDirectFile = [
            $this->createButtonInfo(ShortCodeName::KDN_DIRECT_FILE_ITEM_URL, _kdn("Direct file item URL"))
        ];

        return $this->editorButtonsDirectFile;
    }

    private function getEditorButtonsOptionsBoxTemplates() {
        if (!$this->editorButtonsOptionsBoxTemplates) {
            $this->editorButtonsOptionsBoxTemplates = array_merge([
                $this->createButtonInfo(ShortCodeName::KDN_ITEM, _kdn("Found item"))
            ], $this->getEditorButtonsMain());
        }

        return $this->editorButtonsOptionsBoxTemplates;
    }

    /**
     * @param string $code        Short code without square brackets
     * @param string $description Description for what the short code does
     * @param bool   $fresh       True if a fresh instance should be returned. Otherwise, if the code created before,
     *                            the previously-created instance will be returned.
     * @return ShortCodeButton    Short code button
     */
    private function createButtonInfo($code, $description = '', $fresh = false) {
        return ShortCodeButton::getShortCodeButton($code, $description, $fresh);
    }

    /**
     * Get an array of all predefined short codes
     * @return array An array of short codes with square brackets
     */
    public function getPredefinedShortCodes() {
        if(!$this->allPredefinedShortCodes) {
            $combinedButtons = array_merge(
                $this->getEditorButtonsMain(),
                $this->getEditorButtonsTitle(),
                $this->getEditorButtonsExcerpt(),
                $this->getEditorButtonsList(),
                $this->getEditorButtonsGallery(),
                $this->getEditorButtonsDirectFile()
            );
            $result = [];
            foreach ($combinedButtons as $btn) {
                /** @var ShortCodeButton $btn */
                $result[] = $btn->getCodeWithBrackets();
            }

            $this->allPredefinedShortCodes = $result;
        }

        return $this->allPredefinedShortCodes;
    }

    /*
     *
     */

    /**
     * Get single meta keys
     *
     * @return array An array of keys
     */
    public function getSingleMetaKeys() {
        return $this->singleMetaKeys;
    }
}