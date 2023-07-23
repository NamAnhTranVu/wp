<?php

namespace KDNAutoLeech\Objects\AssetManager;


use KDNAutoLeech\Constants;
use KDNAutoLeech\PostDetail\PostDetailsService;

class AssetManager extends BaseAssetManager {

    private $scriptUtils            = 'kdn_utils_js';

    private $stylePostSettings      = 'kdn_post_settings_css';
    private $scriptPostSettings     = 'kdn_post_settings_js';

    private $scriptTooltip          = 'tooltipjs';

    private $scriptClipboard        = 'clipboardjs';

    private $scriptPostList         = 'kdn_post_list_js';

    private $styleGeneralSettings   = 'kdn_general_settings_css';

    private $styleSiteTester        = 'kdn_site_tester_css';
    private $scriptSiteTester       = 'kdn_site_tester_js';

    private $styleTools             = 'kdn_tools_css';
    private $scriptTools            = 'kdn_tools_js';

    private $styleDashboard         = 'kdn_dashboard_css';
    private $scriptDashboard        = 'kdn_dashboard_js';

    private $styleDevTools          = 'kdn_dev_tools_css';
    private $scriptDevTools         = 'kdn_dev_tools_js';

    private $styleOptionsBox        = 'kdn_options_box_css';
    private $scriptOptionsBox       = 'kdn_options_box_js';

    private $styleFeatherlight      = 'featherlight_css';
    private $scriptFeatherlight     = 'featherlight_js';
    private $scriptOptimalSelect    = 'optimal_select_js';
    private $scriptJSDetectElementResize = 'js_detect_element_size_js';

    private $scriptNotifyJs         = 'notifyjs_js';
    private $scriptFormSerializer   = 'form_serializer_js';

    private $styleBootstrapGrid     = 'bootstrap_grid_css';

    private $styleAnimate           = 'animate_css';

    /**
     * @return string A string that will be the variable name of the JavaScript localization values. E.g. if this is
     *                'kdn', localization values defined in {@link getLocalizationValues()} will be available under
     *                'kdn' variable in the JS window.
     * @since 1.8.0
     */
    protected function getLocalizationName() {
        return 'kdn';
    }

    /**
     * Get script localization values.
     *
     * @return array
     */
    protected function getLocalizationValues() {
        return [
            'an_error_occurred'                     =>  _kdn("An error occurred."),
            'press_to_copy'                         =>  _kdn("Press {0} to copy"),
            'copied'                                =>  _kdn("Copied!"),
            'no_result'                             =>  _kdn("No result."),
            'found'                                 =>  _kdn("Found"),
            'required_for_test'                     =>  _kdn("This is required to perform the test."),
            'required'                              =>  _kdn("This is required."),
            'css_selector_found'                    =>  _kdn("CSS selector found"),
            'delete_all_test_history'               =>  _kdn("Do you want to delete all test history?"),
            'url_data_not_exist'                    =>  _kdn("URL data cannot be found."),
            'currently_crawling'                    =>  _kdn("Currently crawling"),
            'retrieving_urls_from'                  =>  _kdn("Retrieving URLs from {0}"),
            'pause'                                 =>  _kdn('Pause'),
            'continue'                              =>  _kdn('Continue'),
            'test_data_not_retrieved'               =>  _kdn('Test data could not be retrieved.'),
            'content_retrieval_response_not_valid'  =>  _kdn("Response of content retrieval process is not valid."),
            'test_data_retrieval_failed'            =>  _kdn("Test data retrieval failed."),
            'no_urls_found'                         =>  _kdn("No URLs found."),
            'this_is_not_valid'                     =>  _kdn("This is not valid."),
            'url_data_not_exist_for_this'           =>  _kdn("URL data does not exist for this."),
            'this_url_not_crawled_yet'              =>  _kdn("This URL has not been crawled yet."),
            'url_cannot_be_retrieved'               =>  _kdn("The URL cannot be retrieved."),
            'cache_invalidated'                     =>  _kdn("The cache has been invalidated."),
            'cache_could_not_be_invalidated'        =>  _kdn("The cache could not be invalidated."),
            'all_cache_invalidated'                 =>  _kdn("All caches have been invalidated."),
            'all_cache_could_not_be_invalidated'    =>  _kdn("All caches could not be invalidated."),
            'custom_short_code'                     =>  _kdn("Custom short code"),
            'post_id_not_found'                     =>  _kdn("Post ID could not be found."),
            'settings_not_retrieved'                =>  _kdn("Settings could not be retrieved."),
            'settings_saved'                        =>  _kdn("The settings have been saved."),
            'state_not_parsed'                      =>  _kdn("The state could not be parsed."),
            'top'                                   =>  _kdn("Top"),
        ];
    }

    /*
     *
     */

    /**
     * Add post-settings.css, post-settings.js and utils.js, along with the site settings assets of the registered
     * detail factories.
     */
    public function addPostSettings() {
        $this->addSortable();

        $this->addStyle($this->stylePostSettings, Constants::appDir() . '/public/styles/post-settings.css', false);

        $this->addUtils();
        $this->addNotificationJs();

        $this->addjQueryAnimationAssets();

        $this->addScript($this->scriptPostSettings, Constants::appDir() . '/public/dist/post-settings.js', ['jquery', $this->scriptUtils]);
    }

    /**
     * Add tooltip.js
     */
    public function addTooltip() {
        $this->addScript($this->scriptTooltip, Constants::appDir() . '/public/scripts/tooltip.min.js', ['jquery'], '3.3.6');
    }

    /**
     * Add clipboard.js
     */
    public function addClipboard() {
        $this->addScript($this->scriptClipboard, Constants::appDir() . '/public/scripts/clipboard.min.js', false, '1.5.9');
    }

    /**
     * Add post-list.js and utils.js
     */
    public function addPostList() {
        $this->addUtils();
        $this->addScript($this->scriptPostList, Constants::appDir() . '/public/scripts/post-list.js',
            ['jquery', $this->scriptUtils], false);
    }

    /**
     * Add general-settings.css
     */
    public function addGeneralSettings() {
        $this->addStyle($this->styleGeneralSettings, Constants::appDir() . '/public/styles/general-settings.css', false);
    }

    /**
     * Add site-tester.css, site-tester.js and utils.js, along with the site tester assets of the registered
     * detail factories.
     */
    public function addSiteTester() {
        $this->addStyle($this->styleSiteTester, Constants::appDir() . '/public/styles/site-tester.css', false);
        $this->addUtils();
        $this->addjQueryAnimationAssets();

        $this->addScript($this->scriptSiteTester, Constants::appDir() . '/public/dist/site-tester.js', ['jquery', $this->scriptUtils]);

        // Add tester assets of the registered factories
        PostDetailsService::getInstance()->addSiteTesterAssets();
    }

    /**
     * Add tools.css, tools.js and utils.js
     */
    public function addTools() {
        $this->addStyle($this->styleTools, Constants::appDir() . '/public/styles/tools.css', false);
        $this->addUtils();
        $this->addTooltip();
        $this->addFormSerializer();

        $this->addScript($this->scriptTools, Constants::appDir() . '/public/dist/tools.js', ['jquery', $this->scriptUtils]);
    }

    /**
     * Add dashboard.css
     */
    public function addDashboard() {
        $this->addStyle($this->styleDashboard, Constants::appDir() . '/public/styles/dashboard.css', false);

        $this->addjQueryAnimationAssets();

        $this->addScript($this->scriptDashboard, Constants::appDir() . '/public/scripts/dashboard.js', 'jquery');
    }

    /**
     * Add dev-tools.js and dev-tools.css
     */
    public function addDevTools() {
        $this->addStyle($this->styleDevTools, Constants::appDir() . '/public/styles/dev-tools.css', false);

        // Add the lightbox library after the dev-tools style so that we can override the styles of the library.
        // Also, the lib should be added before the dev-tools script so that we can refer to the lib's script.
        $this->addFeatherlight();

        $this->addScript($this->scriptOptimalSelect, Constants::appDir() . '/public/node_modules/optimal-select/dist/optimal-select.js');
        $this->addScript($this->scriptJSDetectElementResize, Constants::appDir() . '/public/bower_components/javascript-detect-element-resize/jquery.resize.js', ['jquery']);

        $this->addScript($this->scriptDevTools . "-dev-tools", Constants::appDir() . '/public/dist/dev-tools.js', ['jquery']);

    }

    /**
     * Add options-box.js and options-box.css
     */
    public function addOptionsBox() {
        $this->addStyle($this->styleOptionsBox, Constants::appDir() . '/public/styles/options-box.css', false);

        $this->addFormSerializer();

        $this->addScript($this->scriptOptionsBox . "-options-box", Constants::appDir() . '/public/dist/options-box.js', ['jquery']);
    }

    /**
     * Add featherlight.css and featherlight.js
     */
    public function addFeatherlight() {
        $this->addStyle($this->styleFeatherlight, Constants::appDir() . '/public/bower_components/featherlight/src/featherlight.css', false);
        $this->addScript($this->scriptFeatherlight, Constants::appDir() . '/public/bower_components/featherlight/src/featherlight.js', ['jquery']);
    }

    /**
     * Add utils.js
     */
    public function addUtils() {
        $this->addScript($this->scriptUtils, Constants::appDir() . '/public/scripts/utils.js', ['jquery']);
    }

    /**
     * Adds bootstrap-grid.css
     */
    public function addBootstrapGrid() {
        $this->addStyle($this->styleBootstrapGrid, Constants::appDir() . '/public/styles/bootstrap-grid.css', false);
    }

    /**
     * Adds WordPress' default jquery UI sortable library
     */
    public function addSortable() {
        $this->addScript('jquery-ui-sortable');
    }

    /**
     * Adds notification library
     */
    public function addNotificationJs() {
        $this->addScript($this->scriptNotifyJs, Constants::appDir() . '/public/bower_components/notifyjs/dist/notify.js');
    }

    /**
     * Adds jquery.serialize-object.min.js
     */
    public function addFormSerializer() {
        $this->addScript($this->scriptFormSerializer, Constants::appDir() . '/public/node_modules/form-serializer/dist/jquery.serialize-object.min.js', ['jquery']);
    }

    /**
     * Adds animate.min.css
     * @since 1.8.0
     */
    public function addAnimate() {
        $this->addStyle($this->styleAnimate, Constants::appDir() . '/public/node_modules/animate.css/animate.min.css');
    }

    /*
     *
     */

    /**
     * @return string URL of info.css
     */
    public function getInformationStyleUrl() {
        $src = Constants::appDir() . '/public/styles/info.css';
        $ver = $this->getLastModifiedTime($src);
        return rtrim(get_site_url(), '/') . $src . "?ver={$ver}";
    }

    /*
     * PRIVATE HELPERS
     */

    private function addjQueryAnimationAssets() {
        // These are required for using animate feature of jQuery.
        $this->addScript('jquery-ui-core');
        $this->addScript('jquery-color');
    }
}