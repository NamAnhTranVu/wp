import {MultiCrawlingTool} from "./multiple-crawling-tool/MultiCrawlingTool";
import {ToolsVariables} from "./ToolsVariables";
import {InputGroupAdder} from "../../common-ts/InputGroupAdder";
import {ObjectSerializer} from "../../common-ts/ObjectSerializer";

export class Tools {

    private processing: boolean = false;
    private tv: ToolsVariables;
    private inputGroupAdder: InputGroupAdder;

    constructor() {
        this.tv = ToolsVariables.getInstance();
        this.inputGroupAdder = InputGroupAdder.getInstance();

        // Initialize object serializer
        ObjectSerializer.getInstance();

        // Initialize the multiple crawling tool
        MultiCrawlingTool.getInstance();

        // Handle form submissions
        $('.tool-form').on('submit', e => this.handleFormSubmission(e));

        // Hide tool results
        $('.details').on('click', '.hide-test-results', e => this.hideTestResults(e));

        // Handle toggling info texts
        $('.toggle-info-texts').on('click', e => this.toggleInfoButtons(e));

        // Handle tabs
        $(this.tv.selectorTabNavigation).on('click', 'a', e => this.activateTab(e));
    }

    /**
     * Activates a tab
     * @param e
     */
    activateTab(e: any) {
        e.preventDefault();
        let $self = $(e.target);
        let targetTabSelector = $self.data("tab");

        // Deactivate all tabs
        $(this.tv.selectorTabs).addClass("hidden");
        $(this.tv.selectorTabNavigation).find('> a').removeClass('nav-tab-active');

        // Activate the requested tab
        $self.addClass("nav-tab-active");
        $(targetTabSelector).removeClass('hidden');
    }

    /**
     * Hides test results
     * @param e
     */
    hideTestResults(e: any) {
        e.preventDefault();

        // Find closest tool results
        let $self = $(e.target);

        // Hide it
        $self.closest(".test-results").addClass("hidden");
    }

    /**
     * Toggles info texts
     * @param e
     */
    toggleInfoButtons(e: any) {
        e.preventDefault();

        let $self = $(e.target);

        // Find closest info texts and show/hide them.
        let first = false;
        let show = false;
        $self.closest('.details').find('.info-text').each((i, el) => {
            let $self = $(el);

            // Get the first info text's visibility. If it is visible, then we're gonna hide all of the infos. If it is
            // hidden, we'll do otherwise. By this way, we can keep track of info texts in different detail boxes.
            if(!first) {
                show = $self.hasClass("hidden");
                first = true;
            }

            if(show) {
                $self.removeClass("hidden");
            } else {
                $self.addClass("hidden");
            }
        });
    }

    /**
     * Handles form submission
     * @param e
     */
    handleFormSubmission(e: any) {
        e.preventDefault();
        if(this.processing) return;

        this.processing = true;

        let $self = $(e.target);
        let $resultContainer = $self.find('.test-results').first();
        let $contentContainer = $resultContainer.find(".content");
        $resultContainer
            .removeClass("hidden")
            .addClass("loading");
        $contentContainer.html("");

        $.post(window.ajaxurl, {
            kdn_nonce: $("#kdn_nonce").val(),
            action: window.pageActionKey,
            data: this.getFormData($self)
        })
            .done(function(response) {
                if(response) {
                    $contentContainer.html(response.view);
                } else {
                    $contentContainer.html(window.kdn.no_result);
                }
            })
            .fail(function(response) {
                console.log(response);
                $contentContainer.html(window.kdn.an_error_occurred + ": " + response.responseText);
            })
            .always(e => {
                $resultContainer.removeClass("loading");
                this.processing = false;
            });
    }

    /**
     * Get form data
     * @param $form HTML form element
     */
    getFormData($form: any) {
        let unindexedArray: any = $form.serializeArray();
        let indexedArray: any = {};

        $.map(unindexedArray, (n, i) => {
            indexedArray[n['name']] = n['value'];
        });

        return indexedArray;
    }

}



