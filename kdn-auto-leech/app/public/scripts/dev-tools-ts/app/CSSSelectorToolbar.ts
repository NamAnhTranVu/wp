import {dtv, devTools, iframeHandler, sidebarHandler} from "../dev-tools";
import {TestDataPreparer} from "../../post-settings-ts/app/TestDataPreparer";

export class CSSSelectorToolbar {

    private testDataPreparer: TestDataPreparer;

    constructor() {
        this.testDataPreparer = TestDataPreparer.getInstance();
    }

    /**
     * Update CSS selector input's value
     * @param {string} newValue
     */
    updateInput (newValue: any) {
        let $cssSelectorInput = this.getCssSelectorInput();
        $cssSelectorInput.val(newValue);

        // Flash the background color of the input
        devTools.flashBackground($cssSelectorInput);
    }

    /**
     * Click callback for test button in CSS selector toolbar
     * @param {object} e Event
     */
    onClickTest (e: any) {
        let $button = $(e.target),
            $input = this.getCssSelectorInput(),
            val: any = $input.val()
        ;

        if(val == undefined || !val.length) return;

        let $inputTestButtonBehavior = $(dtv.optUseTestButtonBehaviorSelector).first(),
            testButtonBehavior = $inputTestButtonBehavior.val(),
            testViaJS = testButtonBehavior != 'php',
            testViaPHP = testButtonBehavior != 'js'
        ;

        // Conduct PHP test
        if(testViaPHP) {
            // Conduct server-side test
            let data = $button.data("kdn"),
                $contents = iframeHandler.getIframeContents();

            // Remove hover class from the iframe content to show the unchanged results
            iframeHandler.clearHighlights();
            data["content"] = $contents.find("html").html();
            data["selector"] = val;

            data["url"] = iframeHandler.getCurrentUrl();
            data["formItemName"] = dtv.cssInputId;
            data["serializedValues"] = $("<input/>").attr("name", dtv.cssInputId + "[0][selector]").val(val).serialize();

            // Add settings to the data
            data = this.testDataPreparer.addSettingsToAjaxData(data);

            let $resultContainer = $(dtv.toolbarTestResultsContainerSelector).first(),
                $contentContainer = $(dtv.toolbarTestResultsContentContainerSelector).first();

            $resultContainer
                .removeClass("hidden")
                .addClass("loading");
            $contentContainer.html("");

            // Test the selector via PHP as well
            $.post(window.ajaxurl, {
                kdn_nonce: dtv.$kdnNonce.val(),
                action: window.pageActionKey,
                data: data
            })
                .done((response) => {
                    // Show the results
                    $contentContainer.html(response.view);

                })
                .fail((response) => {
                    $contentContainer.html(window.kdn.an_error_occurred + " <br />" + response.responseText);
                    console.log(response);
                })
                .always(() => {
                    // Remove loading class
                    $resultContainer.removeClass("loading");

                    iframeHandler.setIframeHeight();
                });
        }

        // Conduct JS test
        if(testViaJS) {
            // Clear the highlights
            iframeHandler.clearHighlights();

            // Highlight the elements inside iframe
            iframeHandler.highlight(val, true);
        }
    }

    /**
     * Click callback for clear highlights button in CSS selector toolbar
     * @param {object} e Event
     */
    onClearHighlights (e: any) {
        iframeHandler.clearHighlights();
    }

    /**
     * Click callback for remove elements button in CSS selector toolbar
     * @param {object} e Event
     */
    onRemoveElements (e: any) {
        let selector: any = this.getCssSelectorInput().val();
        if(selector == undefined || !selector.length) return;

        iframeHandler.getIframeContents().find(selector).remove();
    }

    /**
     * Click callback for show alternatives button in CSS selector toolbar
     * @param {object} e Event
     * @param {boolean} showSidebar True if the sidebar should be shown after the alternatives are computed. Default: true
     */
    onShowAlternatives (e: any, showSidebar: any) {
        let selector: any = this.getCssSelectorInput().val();

        // Do not proceed if there is not a valid selector
        if(selector == undefined || !selector.length) return;

        let $sectionAlternativeSelector = $(dtv.sidebarSelector + " ." + dtv.sidebarSectionAlternativeSelectorsClass),
            currentSelector = $sectionAlternativeSelector.data("currentselector");

        // If current alternatives are not for this selector, compute the alternatives.
        if(currentSelector != selector) {
            // Get alternatives
            let alternatives = devTools.getAlternativeSelectors(selector);

            // Update sidebar's alternatives section
            sidebarHandler.updateAlternativeSelectors(alternatives);

            $sectionAlternativeSelector.data("currentselector", selector);
        }

        if(showSidebar == undefined || showSidebar) {
            // Show the sidebar
            sidebarHandler.onOpenSidebar(e);
        }
    }

    /**
     * Get input element storing the CSS selector
     * @returns {*|jQuery|HTMLElement}
     */
    getCssSelectorInput () {
        return $(dtv.cssInputSelector);
    }

    /**
     * Click handler for "use CSS selector" button
     */
    onClickUseCssSelector () {
        this.useSelector();
    }

    /**
     * Use the selector written in the CSS selector input element
     */
    useSelector () {
        if(dtv.$currentDevToolsButton == undefined || dtv.$currentDevToolsButton == null) return;

        let val: any = this.getCssSelectorInput().val();
        if(val == undefined || !val.length) return;

        // Assign the value to the target input
        let $targetInput = dtv.$currentDevToolsButton.closest('.input-group').find('input.css-selector');
        $targetInput.val(val);

        // Close the lightbox
        devTools.closeLightbox();

        // Flash the target input
        devTools.flashBackground($targetInput);
    }
    
}