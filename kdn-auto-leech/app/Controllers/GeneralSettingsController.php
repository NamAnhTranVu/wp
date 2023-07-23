<?php

namespace KDNAutoLeech\Controllers;


use KDNAutoLeech\Factory;
use KDNAutoLeech\Objects\Page\AbstractMenuPage;
use KDNAutoLeech\Objects\Settings\Settings;
use KDNAutoLeech\Utils;

class GeneralSettingsController extends AbstractMenuPage {

    /**
     * @var array Keys for general settings. These keys are used both as options (general settings) and
     *            as post meta (custom settings for site).
     */
    public $settings = [
        // Scheduling
        '_kdn_is_scheduling_active',                   // bool     If true, CRON scheduling is active
        '_kdn_no_new_url_page_trial_limit',            // int      Stores the limit for how many pages should be crawled if there is no new URL. Read the doc of
                                                        //          SchedulingService#handleNoNewUrlInsertedCount method to understand why this is necessary.
        '_kdn_max_page_count_per_category',            // int      Max number of pages to be checked for each category
        '_kdn_interval_url_collection',                // string   Key of a KDN CRON interval, indicating url collection interval
        '_kdn_interval_post_crawl',                    // string   Key of a KDN CRON interval, indicating post-crawling interval

        '_kdn_is_recrawling_active',                   // bool     If true, post recrawling is active
        '_kdn_interval_post_recrawl',                  // string   Key of a KDN CRON interval, indicating post-recrawling interval
        '_kdn_run_count_url_collection',               // int      How many times URL collection event should be run for each interval
        '_kdn_run_count_post_crawl',                   // int      How many times post crawling event should be run for each interval
        '_kdn_run_count_post_recrawl',                 // int      How many times post recrawling event should be run for each interval
        '_kdn_max_recrawl_count',                      // int      Maximum number of times a post can be recrawled
        '_kdn_min_time_between_two_recrawls_in_min',   // int      Minimum time in minutes that should pass after the last recrawl so that a post is sutaible for recrawling again
        '_kdn_recrawl_posts_newer_than_in_min',        // int      Time in minutes that will be used to find new posts for recrawling event. E.g. if this is 1 month in minutes, posts older than 1 month won't be recrawled.

        '_kdn_is_deleting_posts_active',               // bool     If true, post deleting is active
        '_kdn_interval_post_delete',                   // string   Key of a KDN CRON interval, indicating post-deleting interval
        '_kdn_max_post_count_per_post_delete_event',   // int      Maximum number of posts that can be deleted in a post delete event.
        '_kdn_delete_posts_older_than_in_min',         // int      Time in minutes that will be used to find old posts for post-deleting event. E.g. if this is 1 month in minutes, posts older than 1 month will be deleted.
        '_kdn_is_delete_post_attachments',             // bool     If true, post attachments will be deleted with the post, too.

        // Post
        '_kdn_allow_comments',                         // bool     True to allow comments, false otherwise
        '_kdn_post_status',                            // string   One of the WordPress post statuses
        '_kdn_post_type',                              // string   One of the WordPress post types
        '_kdn_post_category_taxonomies',               // array    An array of post category taxonomies and their descriptions.
        '_kdn_post_author',                            // int      ID of a user
        '_kdn_post_tag_limit',                         // int      The number of tags that can be added to a post at max
        '_kdn_post_password',                          // string   Password for the posts

        '_kdn_allowed_iframe_short_code_domains',      // array    An array of domain names that are allowed for iframe short code
        '_kdn_allowed_script_short_code_domains',      // array    An array of domain names that are allowed for script short code

        // Translation
        '_kdn_is_translation_active',                          // bool     If true, content translation is active
        '_kdn_selected_translation_service',                   // string   Selected translation service. E.g. Google or Microsoft.
        '_kdn_translation_google_translate_from',              // string   Language of the original content for Google Translate
        '_kdn_translation_google_translate_to',                // string   Target language for Google Translate
        '_kdn_translation_google_translate_project_id',        // string   Project ID retrieved from Google Cloud Console for Google Cloud Translate API
        '_kdn_translation_google_translate_api_key',           // string   API key retrieved from Google Cloud Console for the project ID
        '_kdn_translation_google_translate_test',              // string   Text for testing Google Translate API
        '_kdn_translation_microsoft_translate_from',           // string   Language of the original content for Microsoft Translator Text
        '_kdn_translation_microsoft_translate_to',             // string   Target language for Microsoft Translator Text
        '_kdn_translation_microsoft_translate_client_secret',  // string   Client secret for Microsoft Translator Text API
        '_kdn_translation_microsoft_translate_test',           // string   Text for testing Microsoft Translator Text API

        // SEO
        '_kdn_meta_keywords_meta_key',                 // string   Post meta key to store meta keywords
        '_kdn_meta_description_meta_key',              // string   Post meta key to store meta description
        '_kdn_test_find_replace',                      // string   Test code for find-and-replaces
        '_kdn_find_replace',                           // array    An array including what to find and with what to replace for page

        // Notifications
        '_kdn_is_notification_active',                 // bool     True if the notifications should be activated.
        '_kdn_notification_email_interval_for_site',   // int      Number of minutes that should pass before sending another similar notification about the same site
        '_kdn_notification_emails',                    // array    An array of emails to which notifications can be sent

        // Advanced
        '_kdn_make_sure_encoding_utf8',                // bool     True if the target pages should be crawled in UTF8, false otherwise.
        '_kdn_convert_charset_to_utf8',                // bool     True if the charset of the HTML should be converted to UTF8
        '_kdn_http_user_agent',                        // string   The user agent for the crawler
        '_kdn_http_accept',                            // string   The user agent for the crawler
        '_kdn_http_allow_cookies',                     // bool     True if cookies are allowed, false otherwise
        '_kdn_use_proxy',                              // bool     True if a proxy should be used when the target page cannot be opened
        '_kdn_connection_timeout',                     // int      Maximum allowed number of seconds in which the response should be retrieved
        '_kdn_test_url_proxy',                         // string   A URL that will be used when testing proxies
        '_kdn_proxies',                                // string   New line-separated proxy addresses
        '_kdn_proxy_try_limit',                        // int      Maximum number of proxies that can be tried for one request
        '_kdn_proxy_randomize',                        // bool     True if the proxies should be randomized before usage.
    ];

    private $defaultGeneralSettings = [
        // Scheduling
        '_kdn_is_scheduling_active'                    =>  '',
        '_kdn_no_new_url_page_trial_limit'             =>  4,
        '_kdn_max_page_count_per_category'             =>  0,
        '_kdn_interval_url_collection'                 =>  '_kdn_10_minutes',
        '_kdn_interval_post_crawl'                     =>  '_kdn_2_minutes',

        '_kdn_is_recrawling_active'                    =>  '',
        '_kdn_interval_post_recrawl'                   =>  '_kdn_2_minutes',
        '_kdn_run_count_url_collection'                =>  1,
        '_kdn_run_count_post_crawl'                    =>  1,
        '_kdn_run_count_post_recrawl'                  =>  1,
        '_kdn_max_recrawl_count'                       =>  0,
        '_kdn_min_time_between_two_recrawls_in_min'    =>  1440, // 1 day
        '_kdn_recrawl_posts_newer_than_in_min'         =>  43200, // 1 month

        '_kdn_is_deleting_posts_active'                =>  '',
        '_kdn_interval_post_delete'                    =>  '_kdn_2_hours',
        '_kdn_delete_posts_older_than_in_min'          =>  43200, // 1 month
        '_kdn_max_post_count_per_post_delete_event'    =>  30,

        // Post
        '_kdn_allow_comments'                          =>  true,
        '_kdn_post_status'                             =>  'publish',
        '_kdn_post_type'                               =>  'post',
        '_kdn_post_author'                             =>  '',
        '_kdn_post_tag_limit'                          =>  0,
        '_kdn_post_password'                           =>  '',

        '_kdn_allowed_iframe_short_code_domains'       =>  '',
        '_kdn_allowed_script_short_code_domains'       =>  '',

        // Translation
        '_kdn_is_translation_active'                   => false,

        // Notifications
        '_kdn_is_notification_active'                  => false,
        '_kdn_notification_email_interval_for_site'    => 30,

        // Advanced
        '_kdn_make_sure_encoding_utf8'                 =>  true,
        '_kdn_convert_charset_to_utf8'                 =>  false,
        '_kdn_http_user_agent'                         =>  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.108 Safari/537.36',
        '_kdn_http_accept'                             =>  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        '_kdn_http_allow_cookies'                      =>  true,
        '_kdn_use_proxy'                               =>  false,
        '_kdn_connection_timeout'                      =>  10,
        '_kdn_test_url_proxy'                          =>  '',
        '_kdn_proxies'                                 =>  '',
        '_kdn_proxy_try_limit'                         =>  0,
        '_kdn_proxy_randomize'                         =>  '',
    ];

    public function __construct() {
        parent::__construct();

        /*
         * ALLOW MODIFICATION OF META KEYS WITH FILTERS
         */

        /**
         * Modify setting keys that are used to save general settings.
         *
         * @param array $settingKeys
         *
         * @since 1.6.3
         * @return array Modified setting keys
         */
        $this->settings = apply_filters('kdn/general-settings/setting-keys', $this->settings);

        /**
         * Modify default values of general settings. These values will be used when there is no value set before for a
         * key. Also, these will be used when a value is required but it was not created by the user before.
         *
         * @param array $defaultGeneralSettings Default values of general setting keys
         *
         * @since 1.6.3
         * @return array Modified default general setting values
         */
        $this->defaultGeneralSettings = apply_filters('kdn/general-settings/default-setting-values', $this->defaultGeneralSettings);

        /*
         *
         */

        // Set default settings when the plugin is activated
        register_activation_hook(Utils::getPluginFilePath(), function () {
            $this->setDefaultGeneralSettings();
        });
    }

    /**
     * @return string Menu title for the page
     */
    public function getMenuTitle() {
        return _kdn('General Settings');
    }

    /**
     * @return string Page title
     */
    public function getPageTitle() {
        return _kdn('General Settings');
    }

    /**
     * @return string Slug for the page
     */
    public function getPageSlug() {
        return 'general-settings';
    }

    /**
     * Get view for the page.
     *
     * @return mixed Not-rendered blade view for the page
     */
    public function getView() {
        // Register assets
        Factory::assetManager()->addPostSettings();
        Factory::assetManager()->addGeneralSettings();
        Factory::assetManager()->addTooltip();

        return Utils::view('general-settings/main')->with(Settings::getSettingsPageVariables());
    }

    public function handlePOST() {
        parent::handlePOST();

        $data = $_POST;

        $keys = $this->settings;
        $message = '';
        $success = true;

        $queryParams = [];
        if(isset($data["url_hash"])) $queryParams["url_hash"] = $data["url_hash"];

        // Validate the password fields
        $validate = Utils::validatePasswordInput($data, $keys);
        if(!$validate["success"]) {
            $message = $validate["message"] . ' ' . _kdn('Settings are updated, but password could not be changed.');
            $success = false;
        }

        // Save options
        foreach ($data as $key => $value) {
            if (in_array($key, $this->settings)) {
                update_option($key, $value, false);

                // Remove the key, since it is saved.
                unset($keys[array_search($key, $keys)]);
            }
        }

        // Delete options which are not set
        foreach($keys as $key) delete_option($key);

        // Set or remove CRON events
        Factory::schedulingService()->handleCronEvents();

        // Redirect back
        $this->redirectBack($success, $message, $queryParams);
    }

    public function handleAJAX() {
        $data = parent::handleAJAX();

        $handled = $this->respondToAJAX($data);
        if($handled) return;
    }

    /*
     * HELPERS
     */

    /**
     * Sets default general settings by updating options in the database with default values for the general settings.
     */
    public function setDefaultGeneralSettings() {
        $defaultSettings = $this->defaultGeneralSettings;

        foreach($defaultSettings as $key => $defaultSetting) {
            // Set only if the option does not exist.
            $currentVal = get_option($key, null);
            if($currentVal == null && $defaultSetting !== false) {
                update_option($key, $defaultSetting, false);
            }
        }
    }

    /**
     * @return array Default general settings
     */
    public function getDefaultGeneralSettings() {
        return $this->defaultGeneralSettings;
    }

    /**
     * Get options keys for general settings
     *
     * @return array An array of keys
     */
    public function getGeneralSettingsKeys() {
        return $this->settings;
    }
}