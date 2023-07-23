export class DevToolsVariables {
    public postId: number = null;
    public $inputDevToolsState = $('input[name=_dev_tools_state]').first();
    public $currentDevToolsButton: JQuery<Document> = null; // Stores the last clicked DEV tools button
    public lightboxTitleSelector = '.lightbox-title';
    public devToolsButtonSelector = '.kdn-dev-tools';
    public devToolsContentContainerSelector = '.dev-tools-content-container';
    public devToolsContentSelector = '.dev-tools-content';
    public lightboxSelector = '.featherlight';
    public lightboxContainerSelector = '.featherlight-content';
    public toolbarSelector = this.lightboxContainerSelector + " " + this.devToolsContentSelector + " .toolbar";
    public iframeSelector = this.lightboxContainerSelector + " " + this.devToolsContentSelector + " iframe.source";
    public $kdnNonce = $("#kdn_nonce");

    // Hover class is added to the elements in the target page's source code when they are hovered
    public hoverClass = "kdn-element-hovered";

    // Hover style will be added to the target page's source code. This can be used to assign styles to the hover class.
    //hoverStyle: ".kdn-element-hovered {-webkit-box-shadow: inset 0px 0px 2px 2px rgba(255,0,0,1); -moz-box-shadow: inset 0px 0px 2px 2px rgba(255,0,0,1);box-shadow: inset 0px 0px 2px 2px rgba(255,0,0,1);}"
    //hoverStyle: "img.kdn-element-hovered{border: 2px solid #ff4400 !important;} .kdn-element-hovered {top:0 !important;left:0 !important;right:0 !important;bottom:0 !important;background-color:rgba(255, 0, 0, 0.6) !important;z-index:9999 !important;-webkit-box-shadow: inset 0px 0px 2px 2px rgba(255,0,0,1) !important; -moz-box-shadow: inset 0px 0px 2px 2px rgba(255,0,0,1) !important;box-shadow: inset 0px 0px 2px 2px rgba(255,0,0,1) !important;}";
    public hoverStyleSelector = "#iframe-style";

    // An array used to cache the source codes of the URLs
    public urlCache: Array<any> = [];

    // Stores the instance of the lightbox to keep it as a singleton.
    public $lightboxInstance: any = null;

    public addressBarSelector = this.toolbarSelector + " .address-bar";
    public backButtonSelector = this.addressBarSelector + " .back";
    public forwardButtonSelector = this.addressBarSelector + " .forward";
    public refreshButtonSelector = this.addressBarSelector + " .refresh";
    public goButtonSelector = this.addressBarSelector + " .go";
    public urlInputSelector = this.addressBarSelector + " input";
    public urlInputId = '_dt_toolbar_url';

    // Selectors for CSS selector tools
    public cssSelectorToolsContainerSelector = this.lightboxContainerSelector + ' .css-selector-tools';
    public cssInputSelector = this.lightboxContainerSelector + ' .css-selector-input input';
    public cssInputId = '_dt_toolbar_css_selector';
    public cssTestSelector = this.lightboxContainerSelector + ' .css-selector-test';
    public cssClearHighlightsSelector = this.lightboxContainerSelector + ' .css-selector-clear-highlights';
    public cssRemoveElementsSelector = this.lightboxContainerSelector + ' .css-selector-remove-elements';
    public cssShowAlternativesSelector = this.lightboxContainerSelector + ' .css-selector-show-alternatives';
    public cssUseButtonSelector = this.lightboxContainerSelector + ' .css-selector-use';

    public toolbarTestResultsContainerSelector = this.lightboxContainerSelector + ' .test-results';
    public toolbarTestResultsContentContainerSelector = this.toolbarTestResultsContainerSelector + ' .content';

    public iframeStatusSelector = this.lightboxContainerSelector + " .iframe-status";

    public sidebarSelector = this.lightboxContainerSelector + " .sidebar";
    public sidebarCloseSelector = this.sidebarSelector + " .sidebar-close";
    public sidebarOpenSelector = '.sidebar-open';
    public sidebarOpenedClass = 'opened';
    public sidebarSectionClass = 'sidebar-section';
    public sidebarSectionContentClass = 'section-content';
    public sidebarSectionHistoryClass = 'history';
    public sidebarSectionUsedSelectorsClass = 'used-selectors';
    public sidebarSectionAlternativeSelectorsClass = 'alternative-selectors';
    public sidebarSectionSelector = this.sidebarSelector + " ." + this.sidebarSectionClass;
    public sidebarSectionTitleContainerSelector = this.sidebarSectionSelector + " .section-title";
    public sidebarSectionTitleSelector = this.sidebarSectionTitleContainerSelector + " > span";
    public sidebarSectionContentSelector = this.sidebarSectionSelector + " ." + this.sidebarSectionContentClass;

    public btnClearHistorySelector = this.lightboxSelector + ' .clear-history';

    public toggleExpandClass = 'toggleExpand';
    public sidebarSectionToggleExpandSelector = this.sidebarSelector + ' .' + this.toggleExpandClass;
    public sidebarSectionExpandedClass = 'expanded';

    public settingsMetaBoxSelector = '.kdn-settings-meta-box';
    public classCssSelector = 'selector';
    public classUrl = 'url';

    public classOptionsToolbar = 'options';
    public optionsToolbarSelector = this.lightboxSelector + " ." + this.classOptionsToolbar;
    public optHoverSelectSelector = this.optionsToolbarSelector + " .toggle-hover-select";
    public optTargetHTMLTagClass = 'target-html-tag';
    public optTargetHTMLTagSelector = this.optionsToolbarSelector + " ." + this.optTargetHTMLTagClass;
    public optUseTestButtonBehaviorSelector = this.optionsToolbarSelector + " .test-button-behavior";
    public optApplyManipulationOptionsSelector = this.optionsToolbarSelector + " .apply-manipulation-options";
    public optUseImmediatelySelector = this.optionsToolbarSelector + " .use-immediately";
    public optRemoveScriptsSelector = this.optionsToolbarSelector + " .remove-scripts";
    public optRemoveStylesSelector = this.optionsToolbarSelector + " .remove-styles";

    /** Stores the last highlighted element */
    public $lastHighlighted: any = null;

    public multipleSpaceRegex = new RegExp("\\s{2,}", "g");
    public regexClassNameStartingWithDash = new RegExp("\\.(-[^\\s.#\\[]+)", "g");
    public bracketClassNameRegex = new RegExp('\\[class="([^"]+)"\\]', 'g');

    /** Stores the last XHR made for source code retrieval */
    public lastUnfinishedSourceCodeXHR: any = null;
    public isAborted = false;
}