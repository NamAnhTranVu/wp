export class PostSettingsVariables {

    public $containerMetaBox    = $('.kdn-settings-meta-box');
    public $containerTabs       = $('.kdn-settings-meta-box > .nav-tab-wrapper');
    public $form                = $("#post");
    public $errorAlert          = $("#kdn-alert");
    public $kdnNonce            = $("#kdn_nonce");
    public $adminBar            = $("#wpadminbar");

    public selectorCategoryMap                 = "#category-map";
    public selectorTabMain                     = "#tab-main";
    public selectorTabPost                     = "#tab-post";
    public selectorTabCategory                 = "#tab-category";
    public selectorTabGsPost                   = "#tab-gs-post";
    public selectorTabGeneralSettings          = "#tab-general-settings";
    public selectorTestButton                  = '.kdn-test';
    public selectorInputContainerPasswords     = '.input-container-passwords';
    public selectorLoadGeneralSettingsButton   = '#btn-load-general-settings';
    public selectorClearGeneralSettingsButton  = '#btn-clear-general-settings';
    public selectorInputImport                 = '#_post_import_settings';
    public selectorLoadTranslationLanguages    = '.load-languages';
    public selectorInputURLHash                = "input[name='url_hash']";
    public inputNameCookies                    = '_cookies';
    public baseHtmlManipulationInputNames = [
        'find_replace_raw_html',
        'find_replace_first_load',
        'find_replace_element_attributes',
        'exchange_element_attributes',
        'remove_element_attributes',
        'find_replace_element_html',
        'unnecessary_element_selectors'
    ];

    public selectorOriginalTestResults = '.original-results';
    public selectorButtonSeeUnmodifiedTestResults = this.selectorOriginalTestResults + ' .see-unmodified-results';

    public selectorInvalidateCacheButton = '.invalidate-cache-for-this-url';
    public selectorInvalidateAllCachesButton = '.invalidate-all-test-url-caches';

    public selectorQuickSaveButton = '.quick-save-container .quick-save';
    public selectorExportSettingsTextArea = '#_post_export_settings';

    public clsHasError = 'has-error';

    public $inputAction = $("#hiddenaction");

    public infoTextsHidden = true;

    public classFixed = 'kdn-fixed';
    public selectorFixable = '.fixable';

    public selectorCheckboxFixTabs = '#_fix_tabs';
    public selectorCheckboxFixContentNavigation = '#_fix_content_navigation';

    private static INSTANCE: PostSettingsVariables = null;

    /**
     * This class is a singleton. Get the instance with this method.
     */
    public static getInstance() {
        if (this.INSTANCE === null) {
            this.INSTANCE = new PostSettingsVariables();
        }

        return this.INSTANCE;
    }

    private constructor() {

    }

}