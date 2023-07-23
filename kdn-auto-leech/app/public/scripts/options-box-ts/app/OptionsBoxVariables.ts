import $ from "jquery";

export class OptionsBoxVariables {

    public optionsBoxButtonSelector = '.kdn-options-box';
    public optionsBoxMainContainerClass = 'options-box-container';
    public optionsBoxMainContainerSelector = '.' + this.optionsBoxMainContainerClass;
    public optionsBoxSelector = this.optionsBoxMainContainerSelector + ' > .options-box';
    public optionsBoxSubContainerSelector = this.optionsBoxSelector + ' > .box-container';
    public noScrollClass = 'no-scroll';
    public titleSelector = this.optionsBoxSelector + ' > .box-title';
    public inputDetailsSelector = this.optionsBoxSelector + ' > .input-details';
    public tabContainerSelector = this.optionsBoxSelector + ' .nav-tab-wrapper';
    public tabHandleSelector = this.tabContainerSelector + ' .nav-tab';
    public tabContentsSelector = this.optionsBoxSelector + ' .tab-content > .tab';
    public selectorTestButton = '.kdn-test';

    public inputName = '_options_box';

    public selectorExportTextarea = "#_options_box_export_settings";
    public selectorImportTextarea = "#_options_box_import_settings";
    public selectorImportSettingsButton = '.options-box-import';

    // Test data presenter
    public selectorTestDataPresenterContainer = '#test-data-presenter';
    public classTestDataPresenterHeader = 'header';
    public selectorTestDataPresenterHeader = this.selectorTestDataPresenterContainer + ' .' + this.classTestDataPresenterHeader;
    public classInvalidateTestData = 'invalidate';
    public selectorInvalidateTestData = this.selectorTestDataPresenterContainer + '.' + this.classInvalidateTestData;
    public selectorTestDataContainer = this.selectorTestDataPresenterContainer + ' .data';

    public $kdnNonce = $("#kdn_nonce");

    private static instance: OptionsBoxVariables = null;

    /**
     * Get the instance
     */
    public static getInstance() {
        if (this.instance === null) this.instance = new OptionsBoxVariables();
        return this.instance;
    }

    /** This is a singleton. */
    private constructor() {}

}