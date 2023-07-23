import {DevToolsVariables} from "./app/DevToolsVariables";
import {AddressBar} from "./app/AddressBar";
import {CSSSelectorToolbar} from "./app/CSSSelectorToolbar";
import {DEVTools} from "./app/DEVTools";
import {IFrameHandler} from "./app/IFrameHandler";
import {OptionsToolbar} from "./app/OptionsToolbar";
import {SidebarHandler} from "./app/SidebarHandler";

/*
 * GLOBAL VARIABLES
 */

let
    /** Stores variables for developer tools. The name is the short for "dev tools vars". */
    dtv: DevToolsVariables,

    // Define objects
    devTools: DEVTools,
    iframeHandler: IFrameHandler,
    addressBar: AddressBar,
    cssSelectorToolbar: CSSSelectorToolbar,
    optionsToolbar: OptionsToolbar,
    sidebarHandler: SidebarHandler;

jQuery(function($) {

    /*
     * DEFINE REQUIRED VARIABLES
     */
    
    dtv = new DevToolsVariables();
    
    /*
     * INITIALIZE OBJECTS
     */

    devTools            = new DEVTools();
    iframeHandler       = new IFrameHandler();
    addressBar          = new AddressBar();
    cssSelectorToolbar  = new CSSSelectorToolbar();
    optionsToolbar      = new OptionsToolbar();
    sidebarHandler      = new SidebarHandler();

    /*
     * HANDLE USER EVENTS
     */

    /**
     * Show the developer tools lightbox when its button is clicked
     */
    $(document).on('click', dtv.devToolsButtonSelector, function(e) {
        e.preventDefault();

        let $self = $(e.target),
            data = $self.data("kdn"),
            urlSelector = null,
            $contentContainer = $(dtv.devToolsContentContainerSelector);

        // Assign the post ID.
        dtv.postId = $contentContainer.data("kdn")["postId"];

        // Assign the current DEV tools button.
        dtv.$currentDevToolsButton = $self;

        // Get the URL selector
        if(data["urlSelector"] != undefined) urlSelector = data["urlSelector"];

        // Get the test URL
        let url = $(urlSelector).val();

        // Show lightbox and then load the content into the iframe.
        devTools.showLightboxWithContent(null, url);
    });

    // Close the lightbox when the lightbox title is clicked
    $(document).on('click', dtv.lightboxTitleSelector, e => devTools.closeLightbox());

    // Listen to the button click events
    $(document).on('click', dtv.backButtonSelector, e => addressBar.onClickBack(e));
    $(document).on('click', dtv.forwardButtonSelector, e => addressBar.onClickForward(e));
    $(document).on('click', dtv.refreshButtonSelector, e => addressBar.onClickRefresh(e));
    $(document).on('click', dtv.goButtonSelector, e => addressBar.onClickGo(e));

    $(document).on('click', dtv.cssTestSelector, e => cssSelectorToolbar.onClickTest(e));
    $(document).on('click', dtv.cssUseButtonSelector, e => cssSelectorToolbar.onClickUseCssSelector());
    $(document).on('click', dtv.cssClearHighlightsSelector, e => cssSelectorToolbar.onClearHighlights(e));
    $(document).on('click', dtv.cssRemoveElementsSelector, e => cssSelectorToolbar.onRemoveElements(e));
    $(document).on('click', dtv.cssShowAlternativesSelector, e => cssSelectorToolbar.onShowAlternatives(e, undefined));

    $(document).on('click', dtv.sidebarCloseSelector, e => sidebarHandler.onCloseSidebar(e));
    $(document).on('click', dtv.lightboxContainerSelector + " " + dtv.sidebarOpenSelector, e => sidebarHandler.onOpenSidebar(e));
    $(document).on('click', dtv.sidebarSectionToggleExpandSelector, e => sidebarHandler.onToggleExpand(e));
    $(document).on('click', dtv.btnClearHistorySelector, e => addressBar.onClickClearHistory(e));

    // Toggle expand status when sidebar section title is clicked
    $(document).on('click', dtv.sidebarSectionTitleSelector, function() {
        $(this).closest("." + dtv.sidebarSectionClass).find("." + dtv.toggleExpandClass).first().click();
    });

    $(document).on('click', dtv.sidebarSelector + ' .' + dtv.classUrl, e => sidebarHandler.onClickHistoryUrl(e));
    $(document).on('click', dtv.sidebarSelector + ' .' + dtv.classCssSelector, e => sidebarHandler.onClickCssSelector(e));
    $(document).on('hover', dtv.sidebarSelector + ' .' + dtv.classCssSelector, e => sidebarHandler.onHoverCssSelector(e));

    $(document).on('click', dtv.optHoverSelectSelector, e => optionsToolbar.onClickToggleHoverSelect(e));
    $(document).on('change', dtv.optApplyManipulationOptionsSelector, e => addressBar.onClickRefresh(e));
    $(document).on('change', dtv.optRemoveScriptsSelector, e => addressBar.onClickRefresh(e));
    $(document).on('change', dtv.optRemoveStylesSelector, e => addressBar.onClickRefresh(e));

    // Try to show the found elements when the user is typing the selector
    $(document).on('keyup change', dtv.cssInputSelector, (e) => {
        let $self = $(e.target),
            val: any = $self.val()
        ;

        // Do not proceed if the value is not valid.
        if(val == undefined || !val.length) {
            // Clear the highlights
            iframeHandler.clearHighlights();
            return;
        }

        iframeHandler.clearHighlights();
        iframeHandler.highlight(val, undefined);
    });

    // Listen to the changes on target HTML tag input
    $(document).on('keyup change', dtv.optTargetHTMLTagSelector, e => optionsToolbar.onChangeTargetHTMLTagInput(e));

    // Keyboard
    $(document).on('keydown', dtv.devToolsContentSelector, (e) => {
        //l(e.type + ": " + e.which);

        // The user is typing
        if($(e.target).is(':input')) {
            let $target = $(e.target);

            if(e.which == 13) {
                // If the enter is pressed in CSS input, press the test button.
                if($target.attr("id") == dtv.cssInputId) $(dtv.cssTestSelector).click();

                // If the enter is pressed in URL input, press the go button.
                if($target.attr("id") == dtv.urlInputId) $(dtv.goButtonSelector).click();
            }

            return;
        }

        // Let the SidebarHandler handle the key press.
        sidebarHandler.handleKeyPress(e);
    });

    /*
     * Respond to screen size changes
     */
    $(window).resize(() => {
        iframeHandler.setIframeHeight();
    });

});

export {dtv, devTools, iframeHandler, addressBar, cssSelectorToolbar, optionsToolbar, sidebarHandler}