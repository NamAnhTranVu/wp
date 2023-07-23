export class SiteTester {

    private $testerForm: any = null;
    private $resultsContainer: any = null;
    private $testHistory: any = null;

    private inputIdSiteId         = "#site_id";
    private inputIdTestType       = "#test_type";
    private inputIdTestUrlPart    = "#test_url_part";

    private selectorToggle = '.toggle';
    private classToggleable = 'toggleable';

    private selectorButtonTestThis = 'button.test-this';

    /** Stores IDs of toggleables and their states as boolean. True means they are shown. Otherwise, false. */
    private toggleCache: {[key: string]: boolean} = {};

    private isTestHistoryHidden = false;

    constructor() {
        this.$testerForm         = $("#tester-form");
        this.$resultsContainer   = $("#test-results");
        this.$testHistory        = $("#test-history");

        this.$testerForm.on('submit', (e: any) => this.onSubmitTesterForm(e));
        this.$testHistory.on('click', '.kdn-remove', (e: any) => this.onRemoveTestHistoryItem(e));
        this.$testHistory.on('click', '.delete-all', (e: any) => this.onRemoveAllTestHistoryItems(e));
        this.$testHistory.on('click', 'h2', () => this.toggleTestHistory());
        this.$testHistory.on('click', '.kdn-test', (e: any) => this.onClickTestButtonInTestHistory(e));

        this.$resultsContainer.on('click', '.go-to-top', (e: any) => this.onClickGoToTop(e));
        this.$resultsContainer.on('click', '#go-to-details', (e: any) => this.onClickGoToDetails(e));
        this.$resultsContainer.on('click', this.selectorButtonTestThis, (e: any) => this.onClickTestThis(e));

        // Toggle toggleables
        $(document).on('click', this.selectorToggle, (e: any) => this.toggleToggleable(e));
    }

    /**
     * Toggles a toggleable and stores its state in cache.
     * @param e
     * @see toggleCache
     */
    toggleToggleable(e: any) {
        e.preventDefault();

        let $self = $(e.target);

        // The next item has to have the toggleable class.
        let $next = $self.next() || null;
        if ($next === null || !$next.length || !$next.hasClass(this.classToggleable)) return;

        // Get the ID of the toggleable. It has to have an ID so that we can store its state in the cache and find it
        // when we need it.
        let id = $next.attr("id") || null;
        if (id === null || !id.length) return;

        // Get if it is hidden currently.
        let isHidden = $next.hasClass('hidden');

        // Toggle its visibility
        // Show
        if (isHidden) {
            $next.removeClass('hidden');
            this.toggleCache[id] = true;
        } else {
            // Hide
            $next.addClass('hidden');
            this.toggleCache[id] = false;
        }
    }

    /**
     * Restores the states of the toggleable elements from the cache
     * @see toggleCache
     */
    restoreToggleableStates() {
        let $toggleable: any;
        let isVisible: boolean;
        for(let id in this.toggleCache) {
            if (!this.toggleCache.hasOwnProperty(id)) continue;

            // Get the toggleable element using its ID
            $toggleable = $("#" + id) || null;
            if ($toggleable === null || !$toggleable.length) continue;

            // Get its state
            isVisible = this.toggleCache[id];

            // Restore the state
            // Show
            if (isVisible) {
                $toggleable.removeClass('hidden');
            } else {
                // Hide
                $toggleable.addClass('hidden');
            }
        }
    }

    /**
     * React to "test this" buttons near the category and page URLs
     */
    onClickTestThis(e: any) {
        e.preventDefault();
        let $self = $(e.target).closest(this.selectorButtonTestThis);

        // Change the form inputs
        this.$testerForm.find(this.inputIdTestUrlPart).val($self.data("url"));
        this.$testerForm.find(this.inputIdTestType).val($self.data("type"));

        // Submit the form
        this.$testerForm.submit();
    }

    /**
     * Go to details
     */
    onClickGoToDetails(e: any) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: $("#details").offset().top - 40 }, "slow");
    }

    /**
     * Go to top
     */
    onClickGoToTop(e: any) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
    }

    /**
     * When the test button in the history container is clicked, conduct the test.
     */
    onClickTestButtonInTestHistory(e: any) {
        e.preventDefault();

        let $self = $(e.target);
        let data = this.getTestHistoryData($self);
        if (data === null || !data.exists) return;

        let siteId = data.siteId || null;
        let testKey = data.testKey || null;
        let testUrl = data.testUrl || null;

        if (siteId === null || testKey === null || testUrl === null) return;

        // Change the form inputs
        this.$testerForm.find(this.inputIdTestUrlPart).val(testUrl);
        this.$testerForm.find(this.inputIdTestType).val(testKey);
        this.$testerForm.find(this.inputIdSiteId).val(siteId);

        // Submit the form
        this.$testerForm.submit();
    }

    /**
     * Handle all history deletion
     */
    onRemoveAllTestHistoryItems(e: any) {
        e.preventDefault();

        // First, ask if the user is sure about deleting all test history.
        if (window.confirm(window.kdn.delete_all_test_history)) {
            // The user wants to delete all test history.
            this.setHistoryLoading(true);

            // Send the delete request
            $.post(window.ajaxurl, {
                kdn_nonce: $("#kdn_nonce").val(),
                action: window.pageActionKey,
                data: {
                    'cmd': 'delete_all_test_history',
                }
            })
                .done((response) => {
                    // Update the test history view
                    let $newInside = $(response.view).find('.inside').first();
                    this.$testHistory.find('.inside').html($newInside.html());
                })
                .fail((response) => {
                    console.log(response);
                    this.$resultsContainer.html(window.kdn.an_error_occurred + ": " + response.responseText);
                })
                .always(() => {
                    this.setHistoryLoading(false);
                });
        }
    }

    /**
     * Handle single test history item deletion
     */
    onRemoveTestHistoryItem(e: any) {
        e.preventDefault();

        let $self = $(e.target);

        // Get the data
        let data = this.getTestHistoryData($self);
        if (data === null) return;

        this.setHistoryLoading(true);

        // Send the delete request
        $.post(window.ajaxurl, {
            kdn_nonce: $("#kdn_nonce").val(),
            action: window.pageActionKey,
            data: {
                'cmd': 'delete_history_item',
                'item': data
            }
        })
            .done((response) => {
                // Update the test history view
                let $newInside = $(response.view).find('.inside').first();
                this.$testHistory.find('.inside').html($newInside.html());
            })
            .fail((response) => {
                console.log(response);
                this.$resultsContainer.html(window.kdn.an_error_occurred + ": " + response.responseText);
            })
            .always(() => {
                this.setHistoryLoading(false);
            });
    }

    /**
     * Handle form submissions.
     */
    onSubmitTesterForm(e: any) {
        e.preventDefault();
        let $self = $(e.target);

        let siteId      = $self.find(this.inputIdSiteId + " option:selected").val();
        let testType    = $self.find(this.inputIdTestType + " option:selected").val();
        let testUrlPart = $self.find(this.inputIdTestUrlPart).val();

        if(testUrlPart == undefined || !testUrlPart) return;

        // Clear the content
        this.$resultsContainer.html("");

        if(this.$resultsContainer.hasClass("hidden")) this.$resultsContainer.removeClass("hidden");
        this.$resultsContainer.addClass("loading");

        $.post(window.ajaxurl, {
            kdn_nonce: $("#kdn_nonce").val(),
            action: window.pageActionKey,
            data: {
                "site_id":          siteId,
                "test_type":        testType,
                "test_url_part":    testUrlPart
            }
        })
            .done((response) => {
                // Update the result view
                this.$resultsContainer.html(response.view
                    .replace(/\[\u0000/g, '[\\')
                    .replace(/\u0000/g, ':')
                );

                // Restore the states of the toggleables
                this.restoreToggleableStates();

                // Update the test history view
                let $newInside = $(response.viewTestHistory).find('.inside').first();
                this.$testHistory.find('.inside').html($newInside.html());

                // Move the scroll to the top, since the new test item is added to the top of the history.
                this.$testHistory.find('.inside').animate({ scrollTop: 0 }, "slow");

                // Flash the background of the first item
                flashBackground(this.$testHistory.find('.test-history-item:first-child'));

                this.initializeTooltip();
            })
            .fail((response) => {
                console.log(response);
                this.$resultsContainer.html(window.kdn.an_error_occurred + ": " + response.responseText);
            })
            .always(() => {
                this.$resultsContainer.removeClass("loading");
            });
    }

    /**
     * Get test history data
     * @param {jQuery|HTMLElement} $elementInHistoryItem An element in the test item
     * @return {null|object} If data exists, the data as object. Otherwise, null.
     */
    getTestHistoryData($elementInHistoryItem: any) {
        let data = $elementInHistoryItem.closest('.test-history-item').data("test");
        return (data === null || data === 'undefined' || data === undefined) ? null : data;
    }

    /**
     * Shows/hides the test history
     */
    toggleTestHistory() {
        if (this.isTestHistoryHidden) {
            this.showTestHistory();
        } else {
            this.hideTestHistory();
        }
    }

    /**
     * Hides the test history
     */
    hideTestHistory() {
        let $inside = this.$testHistory.find('.inside').first();
        let $toggle = this.$testHistory.find('h2 .toggle').first();

        if (!$inside.hasClass('hidden')) {
            $inside.addClass('hidden');
            $toggle.removeClass('dashicons-arrow-up').addClass('dashicons-arrow-down');
        }

        this.isTestHistoryHidden = true;
    }

    /**
     * Shows the test history
     */
    showTestHistory() {
        let $inside = this.$testHistory.find('.inside').first();
        let $toggle = this.$testHistory.find('h2 .toggle').first();

        if ($inside.hasClass('hidden')) {
            $inside.removeClass('hidden');
            $toggle.removeClass('dashicons-arrow-down').addClass('dashicons-arrow-up');
        }

        this.isTestHistoryHidden = false;
    }

    initializeTooltip() {
        $('[data-toggle="tooltip"]').tooltip();
    }

    /**
     * Set history loading or not.
     * @param {boolean} isLoading True if it is to be set as "loading". Otherwise, false.
     */
    setHistoryLoading(isLoading: boolean) {
        let $header = this.$testHistory.find('> h2');
        if(isLoading) {
            $header.addClass('loading');
        } else {
            $header.removeClass('loading');
        }
    }
}