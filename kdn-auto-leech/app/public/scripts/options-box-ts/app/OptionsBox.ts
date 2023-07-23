import $ from 'jquery';
import {TabBase} from "./tabs/base/TabBase";
import {TestDataPreparer} from "../../post-settings-ts/app/TestDataPreparer";
import {Notifier} from "../../common-ts/Notifier";
import {NotificationType} from "../../common-ts/enum/NotificationType";
import {OptionsBoxVariables} from "./OptionsBoxVariables";
import {TabFactory} from "./TabFactory";
import {TabName} from "./enums/TabName";
import {ObjectSerializer} from "../../common-ts/ObjectSerializer";
import {Utils} from "../../common-ts/Utils";
import {OptionsBoxConfig} from "./OptionsBoxConfig";
import {OptionsBoxType} from "./enums/OptionsBoxType";
import {EventType} from "../../common-ts/EventType";

export class OptionsBox {

    private static instance: OptionsBox = null;

    public $currentButton: any = null;
    public $latestTestButtonClickEvent: any = null;
    public contentRetrievalInProgress: any = false;
    public tabHandlers: TabBase[] = [];
    public allTabHandlers: TabBase[] = [];
    public allTabHandlerNames: any = [];
    public currentActiveTabId: any;
    public config: OptionsBoxConfig = null;

    private testDataPreparer: TestDataPreparer;

    /** Stores the position of the scroll when the options box is opened */
    private scrollPos: number = null;
    
    private obv: OptionsBoxVariables;

    /** Stores the previous box type */
    private prevBoxType: OptionsBoxType = null;

    /** Stores which tabs are available for which box type */
    private boxTypeTabNames: Map<OptionsBoxType, TabName[]> = new Map<OptionsBoxType, TabName[]>()
        .set(OptionsBoxType.DEF, [
            TabName.FIND_REPLACE,
            TabName.GENERAL,
            TabName.CALCULATIONS,
            TabName.TEMPLATES,
            TabName.NOTES,
            TabName.IMPORT_EXPORT,
        ])
        .set(OptionsBoxType.FILE, [
            TabName.FILE_FIND_REPLACE,
            TabName.FILE_OPERATIONS,
            TabName.FILE_TEMPLATES,
            TabName.NOTES,
            TabName.IMPORT_EXPORT,
        ]);

    /**
     * Get the instance.
     */
    public static getInstance() {
        if (this.instance === null) this.instance = new OptionsBox();
        return this.instance;
    }

    /** This is a singleton. */
    private constructor() {
        this.testDataPreparer = TestDataPreparer.getInstance();
        this.obv = OptionsBoxVariables.getInstance();

        // Initialize
        this.init();
    }

    /**
     * Initializes the options box
     */
    private init() {
        // Initialize object serializer
        ObjectSerializer.getInstance();

        /*
         * REGISTER EVENT HANDLERS
         */

        // Hide the box when outside is clicked
        $(document).on('mouseup', this.obv.optionsBoxMainContainerSelector, e => this.onClickOutside(e));

        // Handle key presses
        $(document).keyup((e) => {
            let KEY_ESCAPE = 27;

            // Hide the box when ESC key is pressed
            if (e.keyCode === KEY_ESCAPE) this.close();
        });

        // Show the box when the options box button is clicked.
        $(document).on('click', this.obv.optionsBoxButtonSelector, e => this.showBox(e));

        // Activate a tab
        $(document).on('click', this.obv.tabHandleSelector, e => this.onClickTab(e));

        // Handle test button clicks
        $(this.obv.optionsBoxMainContainerSelector)
            .on('click', this.obv.selectorTestButton, (e) => this.onClickTestButton(e));

        // Handle invalidate test data button clicks
        $(this.obv.selectorTestDataPresenterContainer)
            .on('click', '.' + this.obv.classInvalidateTestData, e => this.onClickInvalidateTestData(e));

        // Handle test data header clicks
        $(this.obv.selectorTestDataPresenterContainer)
            .on('click', '.' + this.obv.classTestDataPresenterHeader, e => this.onClickTestDataPresenterHeader(e));

        // Set the config
        this.config = OptionsBoxConfig.getInstance();

        // Initialize all tab handlers
        this.initAllTabHandlers();

        // Initialize summary tooltips for all options box buttons when the document is ready.
        this.initAllOptionsBoxButtonTooltips();
    }

    /**
     * Hides the box
     * @param event Click event
     */
    onClickOutside(event: any) {
        // If the target element is the container
        if($(event.target).hasClass(this.obv.optionsBoxMainContainerClass)) {
            // Close the container
            this.close();
        }
    }

    /**
     * Closes the options box
     */
    close() {
        // Get the options box container
        let $container = $(this.obv.optionsBoxMainContainerSelector);

        // If it is already hidden, stop.
        if ($container.hasClass("hidden")) return;

        // Hide the box
        $container.addClass('hidden');

        // Save the state
        this.saveState();

        flashBackground(this.$currentButton);

        // Invalidate global variable that stores the reference for the current options box button, since the
        // options box is closed now.
        window.$lastClickedOptionsBoxButton = null;

        // Invalidate the global options box variable, since the options box is closed.
        window.optionsBox = undefined;

        // Restore the scroll position
        $(window).scrollTop(this.scrollPos);
    }

    /**
     * Shows the box
     * @param event
     */
    showBox(event: any) {
        // Get the current scroll position
        this.scrollPos = $(window).scrollTop();

        // Store the options in a global variable so that other scripts can reach it when required
        window.optionsBox = this;

        // Set the name of the box
        this.setTitle(this.getTargetOptionLabel(event));

        // Set the details of the input for which the options box is opened
        this.setTargetInputDetails(this.getTargetInputContainer(event));

        // Set the current button and current settings for Options Box
        this.$currentButton = $(event.target).closest(this.obv.optionsBoxButtonSelector);

        // Prepare the configuration
        OptionsBoxConfig.getInstance().prepare(this.$currentButton.data('settings'));
        this.config = OptionsBoxConfig.getInstance();

        // Prepare the box
        this.prepareTheBoxAccordingToType();

        // Restore state
        this.restoreState();

        // Set the value of the global options box button variable, since the options box is being opened.
        window.$lastClickedOptionsBoxButton = this.$currentButton;

        // Trigger the tab activation event
        this.triggerTabActivatedEventForCurrentTab();

        // Show the box
        $(this.obv.optionsBoxMainContainerSelector).removeClass('hidden');
    }

    /**
     * Prepares the box according to current settings
     */
    private prepareTheBoxAccordingToType() {
        // If the current box type is the same as the previous, no need to prepare the box again.
        if (this.config.type === this.prevBoxType) return;
        this.prevBoxType = this.config.type;

        // Define tab handlers
        this.tabHandlers = this.boxTypeTabNames.get(this.config.type).map((name) => TabFactory.getInstance(name));

        // Hide all tabs
        $(this.obv.tabContainerSelector + ' .nav-tab').addClass('hidden');

        // Hide all tab contents
        $(this.obv.tabContentsSelector).addClass('hidden');

        // Show only the first tab handler's content
        if (this.tabHandlers.length) {
            $('#' + this.tabHandlers[0].tabId).removeClass('hidden');
        }

        // Get active tab IDs
        let activeTabIds = [];
        for(let handler of this.tabHandlers) {
            activeTabIds.push(handler.tabId);
        }

        // Create a selector that selects active tab IDs
        if (activeTabIds.length) {
            let selectorValidTabs = activeTabIds.map((id) => {
                return this.obv.tabContainerSelector + ' [data-tab="#' + id + '"]';
            }).join(', ');

            // Show only the valid ones
            $(selectorValidTabs).removeClass('hidden');

            // Activate the first tab no matter what, because this is another type of options box.
            this.activateTab("#" + activeTabIds[0]);
        }
    }

    /**
     * Sets the tab handlers and their names for caching purposes.
     */
    initAllTabHandlers() {
        // Get all tab names
        let tabNames: TabName[] = [];
        this.boxTypeTabNames.forEach((v, k) => {
            v.map((tabName) => {
                if (tabNames.indexOf(tabName) > -1) return;
                tabNames.push(tabName);
            });
        });

        // Collect the tab instances in a single array
        this.allTabHandlers = tabNames.map((name) => TabFactory.getInstance(name));

        let handler, tabId, name;
        let $container = this.getBoxContainer();
        let names = [];

        for(let i = 0; i < this.allTabHandlers.length; i++) {
            // Each handler has a stateKey and a tabId.
            handler = this.allTabHandlers[i];
            tabId   = handler.tabId;

            // Get name of the tab
            name = $container.find('[data-tab="#' + tabId + '"]').text();
            names.push(name);
        }

        this.allTabHandlerNames = names;
    }

    /**
     * Get the label of the option for which the Options Box button is clicked.
     * @param event
     * @return {jQuery}
     */
    getTargetOptionLabel(event: any) {
        return $(event.target).closest('tr').find('td:first-child label').text();
    }

    /**
     * Get the label of the option for which the Options Box button is clicked.
     * @param event
     * @return {jQuery}
     */
    getTargetInputContainer(event: any) {
        return $(event.target).closest('.input-group').find('.input-container').first();
    }

    /**
     * Sets the box title
     * @param name
     */
    setTitle(name: string) {
        $(this.obv.titleSelector).text(name);
    }

    /**
     * Sets the input details information
     * @param $inputContainer
     */
    setTargetInputDetails($inputContainer: JQuery<HTMLElement>) {
        // Find the inputs and get their values
        let $el: JQuery<HTMLElement>;
        let type: string, res: any;
        let detailArr: any[] = [];
        $inputContainer.find(':input:not([type="hidden"])').each((i, el) => {
            $el = $(el);
            type = $el.attr('type');

            // Get what should be shown according to the input type
            switch (type) {
                case 'checkbox':
                    res = '<span class="dashicons dashicons-' + ((<any>$el[0]).checked ? 'yes' : 'no') + '"></span>';
                    break;

                default:
                    res = $el.val() || null;
                    break;
            }

            // Make sure there is a value
            if (res === null || !res.length) return;

            // Add the value to the detail array
            detailArr.push(res);
        });

        // Combine the values
        let result = detailArr.reduce((acc, curr) => {
            return acc + '<div class="val"><span>' + (curr.length > 72 ? curr.substring(0, 69) + '...' : curr) + '</span></div>';
        }, '');

        // Set the result
        $(this.obv.inputDetailsSelector).html(result);
    }

    /**
     * Restores the state of the options box for the clicked button
     */
    restoreState() {
        // Set the defaults
        this.$latestTestButtonClickEvent = null;
        this.contentRetrievalInProgress = false;

        // Restore the test data
        this.fillTestDataPresenter(this.getMainTestButtonResults());

        // Click all hide buttons existing in the tab containers to hide any existing previous test result
        this.getBoxContainer().find('.test-results > .hide-test-results:first-child').click();

        // Get the data to restore the state
        let stateVal = this.getOptionsBoxInput().val() || null;

        // If stateVal is not valid, set a valid value to it.
        if (stateVal === null || !stateVal.length) {
            stateVal = '{}';
        }

        let data = {};
        try {
            // If the value could not be parsed, an exception will be thrown.
            data = JSON.parse(stateVal);

            // l("Restore state from:");
            // l(data);
            // l(this.tabHandlers);

            this.restoreTabStates(data);

        } catch(e) {
            // Notify if JSON could not be parsed.
            console.error('State could not be parsed.', stateVal);
        }
    }

    /**
     * Restore states of the tabs
     * @param state
     */
    private restoreTabStates(state: any) {
        // Restore the state of each tab
        let currentTabHandler: TabBase;
        for(let i = 0; i < this.tabHandlers.length; i++) {
            currentTabHandler = this.tabHandlers[i];

            // Restore the state
            currentTabHandler.restoreState(
                state[currentTabHandler.stateKey] || {},
                this.config.getTabSettings(currentTabHandler.stateKey) || {}
            );
        }
    }

    /**
     * Saves the current state of the options box to the button that opened the options box
     * @return {object} Current state of the options box
     */
    saveState() {
        // console.log("Save state");
        let state: any = {}, currentTabHandler: TabBase;

        // Collect the state from all tabs
        for(let i = 0; i < this.tabHandlers.length; i++) {
            currentTabHandler = this.tabHandlers[i];
            state[currentTabHandler.stateKey] = currentTabHandler.saveState() || {};
        }

        // Set the type of the options box
        state['box'] = {
            'type': this.config.type
        };

        // l("New state:");
        // l(state);
        // l(this.tabHandlers);

        // Set options box button tooltip, showing a summary of the settings.
        this.setCurrentOptionsBoxButtonSummary(state);

        // Store the state in the clicked options box's input
        this.getOptionsBoxInput().val(JSON.stringify(state));

        return state;
    }

    /**
     * Activates a tab.
     * @param {string} tabSelector
     */
    activateTab(tabSelector: string) {
        // First, deactivate all tabs.
        this.deactivateAllTabs();

        // Show the tab container
        let $boxContainer = this.getBoxContainer();
        $boxContainer.find(tabSelector).removeClass('hidden');

        // Set the tab's handle as active
        this.getTabContainer().find('[data-tab="' + tabSelector + '"]').addClass('nav-tab-active');

        this.currentActiveTabId = tabSelector.replace('#', '');

        // Trigger the tab activation event
        this.triggerTabActivatedEventForCurrentTab();
    }

    /**
     * Deactivates all tabs
     */
    deactivateAllTabs() {
        // Hide all tab containers
        this.getBoxContainer().find('.tab').addClass('hidden');

        // Make all of the tab handles not active
        this.getTabContainer().find('a').removeClass('nav-tab-active');
    }

    /**
     * Handles click events triggered on tabs
     * @param event
     */
    onClickTab(event: any) {
        event.preventDefault();

        // Activate the tab. Find the closest '.nav-tab' because if an element in a .nav-tab is clicked, the event
        // will point that element. In that case, we cannot get 'data-tab' value. Instead, we get undefined.
        this.activateTab($(event.target).closest('.nav-tab').data('tab'));
    }

    /**
     * Get tab container as jQuery element
     * @return {*|jQuery|HTMLElement}
     */
    getTabContainer() {
        return $(this.obv.tabContainerSelector);
    }

    /**
     * Get box container as jQuery object.
     * @return {*|jQuery|HTMLElement}
     */
    getBoxContainer() {
        return $(this.obv.optionsBoxMainContainerSelector);
    }

    /**
     * Get the input that stores the values of options box
     * @return {*}
     */
    getOptionsBoxInput() {
        return this.$currentButton.find('input[type=hidden]').first();
    }

    /**
     * Handles clicks of the test buttons in the options box
     * @param e
     */
    onClickTestButton(e: any) {
        e.preventDefault();
        // console.log("Test button clicked");

        // Store the event
        this.$latestTestButtonClickEvent = e;
        let $testButton = $(e.target).closest('button');

        $testButton.addClass("loading");

        // Get to-be-tested data
        let dataToBeTested = this.getDataToBeTested();
        // console.log(dataToBeTested);

        // If the data is null, there is an AJAX request going on.
        if (dataToBeTested === null) {
            // Stop further triggers. We are handling the job currently with an AJAX request.
            e.stopPropagation();
            return;
        }

        // We have the data now.

        // Save the state so that we can send the latest options configured in the options box with the AJAX request.
        this.saveState();

        // Remove the loading class from the test button.
        $testButton.removeClass("loading");

        // Let the event bubbling handle the rest. So, from this point on, the main click handler of the test
        // button is responsible.
    }

    /**
     * Get the data to be used when the user clicks the test buttons in the options box
     *
     * @return {boolean|null|object|array} If returns false, there is an error. If null, there is an AJAX request.
     *                                   Otherwise, it returns the data to be tested.
     */
    getDataToBeTested() {
        // console.log("get data to be tested.");
        // We will find the content by using the test button of the input group whose options box is currently open
        let $testButton = this.getMainTestButton();

        // If the test button contains some results, return them. So, no AJAX requests here.
        let prevResults = this.getMainTestButtonResults();
        if (prevResults !== null && prevResults !== undefined && prevResults !== 'undefined') {
            return prevResults;
        }

        // If there is no results, make an AJAX request and retrieve the results.
        let data = this.testDataPreparer.prepareTestData($testButton);

        if(data === null) {
            // Notify the user
            Notifier.getInstance().notifyRegular($(this.$latestTestButtonClickEvent.target), window.kdn.test_data_not_retrieved);
            console.error("Test data could not be retrieved.");
            return false;
        }

        // If a previous retrieval is in progress, stop.
        if (this.contentRetrievalInProgress) return null;

        // Set content retrieval as in progress.
        this.contentRetrievalInProgress = true;

        let $dataPresenterHeader = this.getDataPresenterHeader();
        $dataPresenterHeader.addClass("loading");

        // console.log(data);

        // Retrieve the test data from the main test button
        $.post(window.ajaxurl, {
            kdn_nonce: this.obv.$kdnNonce.val(),
            action: window.pageActionKey,
            data: data
        })
            .done((response) => {
                if(response === undefined || !response || response.view === undefined) {
                    // Notify the user
                    Notifier.getInstance().notifyRegular(
                        $(this.$latestTestButtonClickEvent.target),
                        window.kdn.content_retrieval_response_not_valid,
                        NotificationType.ERROR
                    );
                    console.error("Response of content retrieval process is not valid.");
                    return;
                }

                // Put the view into a container so that we can query it with CSS selectors.
                let $view = $("<div>" + response.view + "</div>");

                // Get the results
                let results = $view.find('ul').data("results");

                // Put the results into the test button
                $testButton.data("results", results);

                // Add the test data to the presenter
                this.fillTestDataPresenter(results);

                // Click the test button again
                $(this.$latestTestButtonClickEvent.target).click();

            })
            .fail(response => {
                // Notify the user
                Notifier.getInstance().notifyRegular(
                    $(this.$latestTestButtonClickEvent.target),
                    window.kdn.test_data_retrieval_failed,
                    NotificationType.ERROR
                );
                console.error(response);
            })
            .always(() => {
                // Content retrieval progress has finished.
                this.contentRetrievalInProgress = false;
                $dataPresenterHeader.removeClass("loading");
            });

        // Return null to indicate that an AJAX request is in progress
        return null;
    }

    /**
     * Get the test button of the input group for which the options box is current open
     * @return {*|jQuery|HTMLElement} The test button
     */
    getMainTestButton() {
        return this.$currentButton.closest('.input-group').find('.kdn-test');
    }

    /**
     * Get the results of the main test button. The results are actually the results of a test previously conducted
     * for the input group, which the current options box is opened for.
     *
     * @return {null|undefined|string|array} Results retrieved from the main test button.
     */
    getMainTestButtonResults() {
        return this.getMainTestButton().data("results");
    }

    /**
     * Fills the test data presenter with the given data
     * @param data
     */
    fillTestDataPresenter(data: Array<any>) {
        let $presenter = this.getTestDataPresenterContainer();
        $presenter.data("results", data);

        let $dataContainer = $presenter.find('.data').first();
        $dataContainer.empty();

        let $number = $presenter.find('.number').first();
        let $invalidate = $presenter.find('.invalidate').first();

        if (data === undefined || data === null || !data.length) {
            $number.text(0);
            $invalidate.addClass("hidden");
            return;
        }

        let $ul = $("<ul />");

        for (let i = 0; i < data.length; i++) {
            $("<li><code>" + Utils.escapeHtml(data[i]) + "</code></li>").appendTo($ul);
        }

        $ul.appendTo($dataContainer);

        $number.text(data.length);
        $invalidate.removeClass("hidden");
    }

    /**
     * Get the container that stores the test data
     * @return {jQuery}
     */
    getTestDataPresenterContainer() {
        return $(this.obv.selectorTestDataPresenterContainer).first();
    }

    /**
     * Handles clicks to the invalidate test data button/link
     * @param e
     */
    onClickInvalidateTestData(e: any) {
        e.stopPropagation();

        this.fillTestDataPresenter([]);
        this.getMainTestButton().data("results", null);
    }

    /**
     * Get the header of the data presenter
     * @return {jQuery}
     */
    getDataPresenterHeader() {
        return $(this.obv.selectorTestDataPresenterHeader).first();
    }

    /**
     * Handles clicks to the test data presenter header
     * @param e
     */
    onClickTestDataPresenterHeader(e: any) {
        let $dataContainer = $(this.obv.selectorTestDataContainer).first();
        if ($dataContainer.hasClass("hidden")) {
            $dataContainer.removeClass("hidden");
        } else {
            $dataContainer.addClass("hidden");
        }
    }

    /**
     * Sets the main test button's tooltip so that it shows a summary of the configured settings.
     * @param {object} state State of the options box
     */
    setCurrentOptionsBoxButtonSummary(state: any) {
        let result = this.getOptionsBoxButtonSummaryFromState(state);
        this.setOptionsBoxButtonSummary(this.$currentButton, result);
    }

    /**
     * Create a summary of the configured options in the options box tabs.
     *
     * @param {object} state Options box state for the button
     * @return {object|null} Summary. Contains two items. 'title' is the summary as HTML. 'colors' is an array of colors
     * that belong to the tabs that have a configuration
     */
    getOptionsBoxButtonSummaryFromState(state: any) {
        let handler, stateKey, name, value, i, tabState;

        // If there is no state, no need to create a summary.
        if ($.isEmptyObject(state)) return null;

        let result = '';

        // For each tab handler, find the number of items. In other words, find the number of settings added to
        // each tab using the tab handlers.
        let colors = [];
        for(i = 0; i < this.allTabHandlers.length; i++) {
            // Each handler has a stateKey and a tabId.
            handler  = this.allTabHandlers[i];
            name     = this.allTabHandlerNames[i];
            stateKey = handler.stateKey;

            // If the state does not contain a key for the current tab, continue with the next one.
            if (!state.hasOwnProperty(stateKey)) continue;

            tabState = state[stateKey];

            // Get the number of settings configured for that tab
            value = handler.getConfiguredOptionCount(tabState);

            // If there is at least one, add a new summary entry.
            if (value > 0) {
                result += '<li><span class="name">' + name + '</span>: <span class="value">' + value + '</span></li>';
                colors.push(handler.color);
            }

        }

        // If there is no item added to the result, return null.
        if (!result.length) {
            return null;
        }

        result = "<ul class='options-box-summary'>" + result + "</ul>";

        return {
            title: result,
            colors: colors
        };
    }

    /**
     * Sets the tooltip of the given options box button
     * @param $optionsBoxButton The button
     * @param {object} value Contains two items. 'title' is the summary as HTML. 'colors' is an array of colors
     * that belong to the tabs that have a configuration
     */
    private setOptionsBoxButtonSummary($optionsBoxButton: any, value: any) {
        value = value || null;
        if (value === null) {
            // The options box for this button does not have any configurations.
            $optionsBoxButton.removeClass("has-config");

            // Remove the tooltip
            if(typeof $.fn.tooltip === 'function')
                $optionsBoxButton.tooltip('destroy');

        } else {
            // The options box for this button has configurations.
            $optionsBoxButton.addClass("has-config");

            $optionsBoxButton.data("toggle", "tooltip");
            $optionsBoxButton.data("html", "true");
            $optionsBoxButton.attr("title", value.title);

            // Set/update the tooltip
            if(typeof $.fn.tooltip === 'function')
                $optionsBoxButton.tooltip('fixTitle');

            // Set the colors
            // If there is only 1 color, add the same color again so that the CSS gradient can be created. It requires
            // at least two colors.
            let colors = value.colors;
            if (colors.length === 1) colors.push(colors[0]);

            let colorString = colors.join(', ');
            $optionsBoxButton.find('.summary-colors').css('background-image', 'linear-gradient(to right, ' + colorString + ')');
        }

    }

    /**
     * Initializes tooltips of all options box buttons
     */
    initAllOptionsBoxButtonTooltips() {
        $(this.obv.optionsBoxButtonSelector).each((i, el) => {
            let $button = $(el);
            let stateVal: any = $button.find('input[type=hidden]').first().val() || null;

            // Stop if there is no state to restore.
            if (stateVal === null || !stateVal.length) return;

            try {
                // If the value could not be parsed, an exception will be thrown.
                let state = JSON.parse(stateVal);

                let summary = this.getOptionsBoxButtonSummaryFromState(state);
                this.setOptionsBoxButtonSummary($button, summary);

            } catch(e) {
                // Notify if JSON could not be parsed.
                console.error('State could not be parsed.', stateVal, $button);
                Notifier.getInstance().notifyRegular($button, window.kdn.state_not_parsed, NotificationType.ERROR);
            }
        });
    }

    /**
     * Triggers {@link EventType.optionsBoxTabActivated} event.
     */
    triggerTabActivatedEventForCurrentTab() {
        if (this.currentActiveTabId === null) return;

        // Trigger an event with the activated tab selector.
        $(document).trigger(EventType.optionsBoxTabActivated, this.currentActiveTabId);
    }
}