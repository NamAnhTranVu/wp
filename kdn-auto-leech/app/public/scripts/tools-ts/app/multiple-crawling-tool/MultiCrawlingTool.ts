import {CrawlingType} from "./CrawlingType";
import {PostUrlData} from "../url-data/PostUrlData";
import {ToolsVariables} from "../ToolsVariables";
import {Utils} from "../../../common-ts/Utils";
import {CategoryUrlData} from "../url-data/CategoryUrlData";
import {Notifier} from "../../../common-ts/Notifier";
import $ from "jquery";
import {NotificationType} from "../../../common-ts/enum/NotificationType";

export class MultiCrawlingTool {

    private static INSTANCE: MultiCrawlingTool = null;

    /**
     * This class is a singleton. Get the instance with this method.
     */
    public static getInstance() {
        if (this.INSTANCE === null) this.INSTANCE = new MultiCrawlingTool();
        return this.INSTANCE;
    }

    private tv: ToolsVariables;

    public selectorContainerUrlQueue = '#container-url-queue-manual-crawl';
    public selectorTableContainerUrlQueue = this.selectorContainerUrlQueue + ' .table-container';
    public selectorTableUrlQueue = '#table-url-queue-manual-crawl';

    public selectorToolContainerManualCrawl = '#tool-manual-crawl';

    private classForm = "tool-manual-crawl";
    private selectorForm = "." + this.classForm;
    private classButtonCrawlNow = 'crawl-now';
    private classButtonAddToDatabase = 'add-to-database';

    private selectorButtonCrawlNow = '.button.' + this.classButtonCrawlNow;
    private selectorButtonAddToDatabase = '.button.' + this.classButtonAddToDatabase;

    private selectorButtonDelete = '.button.delete';
    private selectorButtonRepeat = '.button.repeat';

    /** A selector that selects all URL rows in the table, except the prototype URL row. */
    private selectorUrls: string;

    /** A selector that selects all URL response rows in the table, except the prototype URL row. */
    private selectorUrlResponses: string;

    /** A selector that selects URL rows that are currently waiting to be saved. */
    private selectorUrlsToBeCrawled: string;

    /** A selector that selects URL rows that has been done processing. */
    private selectorUrlsDone: string;

    /** A selector that selects the URL row that is currently being processed. */
    private selectorUrlsBeingCrawled: string;

    private selectorButtonContinue: string;
    private selectorButtonPause: string;

    /** Caches URL row prototype */
    private $urlRowPrototype: any = null;

    /** Caches response row prototype */
    private $responseRowPrototype: any = null;

    /** Class of response rows of URL table */
    private classResponse = 'response';

    /** has-response class */
    private classHasResponse = 'has-response';

    /** has-response class */
    private classOpen = 'open';

    /** Selector for the element that stores the status information about URL table */
    private selectorStatus: string;

    /** Selector for the checkbox that is used to decide if the URLs should be cleared after form submisson */
    private selectorCheckboxClearUrls = '#_manual_crawling_tool_clear_after_submit';

    private selectorClearAllUrls: string;
    private selectorInputMaxPostsToBeCrawled: string;
    private selectorInputMaxParallelCrawlingCount: string;
    private selectorShowAllResponses: string;
    private selectorHideAllResponses: string;

    /** Stores the category URL from which post URLs are being retrieved */
    private beingProcessedCategoryUrlData: CategoryUrlData = null;

    /** Stores the category URLs that should be processed to retrieve post URLs */
    private categoryUrlQueue: Array<CategoryUrlData> = [];

    /** True if the crawling is paused. Otherwise, false. */
    private isPaused = false;

    /** Stores after how many URLs the crawling should be paused */
    private pauseThreshold: number;

    /** Stores how many requests are currently running. */
    private runningRequestCount = 0;

    /** How many post crawling requests can be sent at the same time. */
    private maxParallelCrawling = 1;

    /**
     * Stores how many URLs are crawled after hitting 'crawl now' button. This intended to be used to pause when
     * pauseThreshold is reached.
     */
    private crawledUrlCountAfterSubmit: number;

    private inputNameSiteId = '_kdn_tools_site_id';
    private inputNameCategoryId = '_kdn_tools_category_id';
    private inputNameCategoryUrls = '_category_urls';
    private inputNamePostUrls = '_post_urls';

    private constructor() {
        // Initialize variables
        this.tv = ToolsVariables.getInstance();

        // Create the CSS selector that finds the URLs to be crawled
        this.selectorUrls                           = this.selectorTableUrlQueue + ' tbody > tr.url:not(.prototype)';
        this.selectorUrlResponses                   = this.selectorTableUrlQueue + ' tbody > tr.url:not(.prototype) + .' + this.classResponse;
        this.selectorUrlsToBeCrawled                = this.selectorTableUrlQueue + ' tbody > tr.url:not(.prototype):not(.loading):not(.done)';
        this.selectorUrlsDone                       = this.selectorTableUrlQueue + ' tbody > tr.url.done:not(.prototype)';
        this.selectorUrlsBeingCrawled               = this.selectorTableUrlQueue + ' tbody > tr.url.loading:not(.prototype)';
        this.selectorStatus                         = this.selectorContainerUrlQueue + ' #status';
        this.selectorButtonContinue                 = this.selectorContainerUrlQueue + ' .button.continue';
        this.selectorButtonPause                    = this.selectorContainerUrlQueue + ' .button.pause';
        this.selectorClearAllUrls                   = this.selectorTableUrlQueue + ' thead th.controls .remove-all';
        this.selectorInputMaxPostsToBeCrawled       = this.selectorToolContainerManualCrawl + ' #_max_posts_to_be_crawled';
        this.selectorInputMaxParallelCrawlingCount  = this.selectorToolContainerManualCrawl + ' #_max_parallel_crawling_count';
        this.selectorShowAllResponses               = this.selectorContainerUrlQueue + ' .show-all-responses';
        this.selectorHideAllResponses               = this.selectorContainerUrlQueue + ' .hide-all-responses';

        // Initialize event listeners
        $(document).on('click', this.selectorButtonAddToDatabase,e => this.onClickSubmit(e, CrawlingType.ADD_TO_DATABASE));
        $(document).on('click', this.selectorButtonCrawlNow,e => this.onClickSubmit(e, CrawlingType.CRAWL_NOW));
        $(document).on('click', this.selectorContainerUrlQueue + ' ' + this.selectorButtonDelete, e => this.onClickDeleteUrl(e));
        $(document).on('click', this.selectorContainerUrlQueue + ' ' + this.selectorButtonRepeat, e => this.onClickRepeatCrawling(e));
        $(document).on('click', this.selectorTableUrlQueue + ' tbody > tr', e => this.onClickUrlRow(e));

        // When a link in a row is clicked, do not propagate the event so that the visibility of the response view is not toggled.
        $(document).on('click', this.selectorTableUrlQueue + ' tbody > tr a', e => e.stopPropagation());

        // Handle continue/pause button clicks
        $(document).on('click', this.selectorButtonContinue, () => this.continueCrawling());
        $(document).on('click', this.selectorButtonPause, () => this.pauseCrawling());

        // Clear all URLs
        $(document).on('click', this.selectorClearAllUrls, () => this.clearAllUrls());

        // Show/hide all responses
        $(document).on('click', this.selectorShowAllResponses, () => this.showAllResponses());
        $(document).on('click', this.selectorHideAllResponses, () => this.hideAllResponses());
    }

    /**
     * Clears all URLs, except the ones that are currently being crawled
     */
    private clearAllUrls() {
        // Find rows that are:
        // - Already crawled
        // - Responses of already-crawled URLs
        // - Waiting to be crawled

        let selector = this.selectorUrlsDone + ', ' + this.selectorUrlsToBeCrawled + ', ' + this.selectorUrlsDone + ' + tr.response';
        $(selector).remove();

        // The table has been updated
        this.onUpdateUrlTable();
    }

    /**
     * Handles form submission
     * @param e
     * @param type
     */
    private onClickSubmit(e: JQuery.Event, type: CrawlingType) {
        e.preventDefault();
        e.stopPropagation();

        let $self = $(e.target);

        // Hide the tooltip. Remove the focus as well, because after hiding, the tooltip does not go away. Its text
        // stay as invisible. But, it prevents interacting with the element underneath.
        if(typeof $.fn.tooltip == 'function')
            $self.tooltip('hide').blur();

        // Get the added URLs
        let urls = this.getEnteredUrls();

        switch(type) {
            // If the user wants to crawl the URLs right now
            case CrawlingType.CRAWL_NOW:
                this.pauseThreshold = this.getMaxPostsToBeCrawled();
                this.crawledUrlCountAfterSubmit = 0;
                this.maxParallelCrawling = this.getMaxParallelCrawlingCount();

                // Maximum parallel crawling count cannot be greater than the pause threshold. Because the requests
                // will be sent in parallel, by the time we increase the crawled post count, there might be lots of
                // requests sent. In turn, pause threshold will be breached. So, this fixes that case.
                if (this.pauseThreshold > 0) this.maxParallelCrawling = Math.min(this.maxParallelCrawling, this.pauseThreshold);

                this.continueCrawling();

                this.retrievePostUrlsFromCategoryUrls();
                this.addUrlsToQueueTable(urls);
                this.crawlNextUrlInQueue();

                // Indicate some things are happening
                flashBackground($(this.selectorContainerUrlQueue));

                break;

            // If the user wants to add the URLs to the database
            case CrawlingType.ADD_TO_DATABASE:
                this.handleAddUrlsToDatabase(urls);

                // Indicate some things are happening
                flashBackground($(this.selectorContainerUrlQueue));

                break;
        }
    }

    /**
     * Retrieves post URLs from the category URLs in the queue
     */
    private retrievePostUrlsFromCategoryUrls() {
        // If there is a currently-being-processed category URL stop.
        // If there is no category URL in the queue, stop.
        // If the crawling is paused, stop.
        if (this.beingProcessedCategoryUrlData !== null || !this.categoryUrlQueue.length || this.isPaused) return;

        // Get the first element in the queue and remove it from the queue.
        this.beingProcessedCategoryUrlData = this.categoryUrlQueue.shift();

        // Update the table so that it shows the currently-being-processed category URL
        this.onUpdateUrlTable();

        let catUrl = this.beingProcessedCategoryUrlData;

        // Send the request
        $.post(window.ajaxurl, {
            kdn_nonce: $("#kdn_nonce").val(),
            action: window.pageActionKey,
            data: {
                'tool_type': 'get_post_urls_from_category_url',
                'category_url': catUrl.url,
                'site_id': catUrl.siteId
            }
        })
            .done((response) => {
                // Make sure the response is valid
                let results = response.results || [];

                // If there are information that need to be shown, show them.
                if (response.hasInfo) {
                    this.showTestResult(response.view);
                }

                // Add retrieved URLs to the post URL table
                let l = results.length,
                    urlDataList: Array<PostUrlData> = [],
                    currentItem, postUrl, imageUrl;

                for(let i = 0; i < l; i++) {
                    currentItem = results[i] || null;
                    if (currentItem === null) continue;

                    postUrl = currentItem.url || null;
                    imageUrl = currentItem.thumbnail || null;
                    if (postUrl === null) continue;

                    urlDataList.push(new PostUrlData(catUrl.siteName, catUrl.siteId, postUrl, catUrl.categoryName, catUrl.categoryId, imageUrl));
                }

                if (!urlDataList.length) {
                    // Notify the user
                    Notifier.getInstance().notifyRegular(
                        $('label[for="' + this.inputNameCategoryUrls + '"]'),
                        window.kdn.no_urls_found + ' ' + catUrl.url,
                        NotificationType.INFO
                    );

                    this.onUpdateUrlTable();
                    return;
                }

                // Add the URLs to the queue and crawl the next one in the queue
                this.addUrlsToQueueTable(urlDataList);
                this.crawlNextUrlInQueue();
            })
            .fail((response) => {
                // Notify the user
                Notifier.getInstance().notifyRegular(
                    $('label[for="' + this.inputNameCategoryUrls + '"]'),
                    window.kdn.an_error_occurred + " (" + catUrl.url + "): " + response.responseText,
                    NotificationType.ERROR
                );
                console.log(response);
            })
            .always(e => {
                // Retrieve the next item in the queue
                this.beingProcessedCategoryUrlData = null;
                this.retrievePostUrlsFromCategoryUrls();

                // Update the status
                this.updateStatus();
            });
    }

    /**
     * Handles adding URLs to the database
     * @param urls
     */
    private handleAddUrlsToDatabase(urls: Array<PostUrlData>) {
        // Get the test results container
        let $testResultContainer = this.getTestResultContainer();

        // If there is an on-going request, stop.
        if ($testResultContainer.hasClass('loading')) return;

        // Set the result container "loading"
        $testResultContainer.removeClass('hidden').addClass('loading');
        let $contentContainer = $testResultContainer.find('.content').first();
        $contentContainer.html('');

        let categoryUrls = this.categoryUrlQueue;
        this.categoryUrlQueue = [];

        // Send the request
        $.post(window.ajaxurl, {
            kdn_nonce: $("#kdn_nonce").val(),
            action: window.pageActionKey,
            data: {
                'tool_type': 'add_urls_to_database',
                'post_urls': JSON.stringify(urls),
                'category_urls': JSON.stringify(categoryUrls)
            }
        })
            .done((response) => {
                if(response) {
                    $contentContainer.html(response.view);
                } else {
                    $contentContainer.html(window.kdn.no_result);
                }
            })
            .fail((response) => {
                console.log(response);
                $contentContainer.html(window.kdn.an_error_occurred + ": " + response.responseText);
            })
            .always(e => {
                $testResultContainer.removeClass('loading');
            });
    }

    /**
     * Handles click events made to the URL rows
     * @param e
     */
    private onClickUrlRow(e: JQuery.Event<Document, null>) {
        let $self = $(e.target).closest('tr');

        // Get the response row
        let $responseRow = this.getUrlRowResponse($self);
        if ($responseRow === null) return;

        // Toggle its hidden status.
        if ($responseRow.hasClass('hidden')) {
            $responseRow.removeClass('hidden');
            $self.addClass(this.classOpen);
        } else {
            $responseRow.addClass('hidden');
            $self.removeClass(this.classOpen);
        }

    }

    /**
     * Crawls the next URL in queue
     */
    private crawlNextUrlInQueue() {
        // Stop if maximum running request count is reached.
        if (this.runningRequestCount >= this.maxParallelCrawling) {
            // console.log("Max parallel request count has been reached. The crawling will continue when a request finishes.", this.runningRequestCount, this.maxParallelCrawling);
            return;
        }

        // Start the number of requests that is defined by the user
        while(this.runningRequestCount < this.maxParallelCrawling) {

            // Stop if the crawling is paused.
            if (this.isPaused) return;

            // Pause if the pause threshold is reached.
            if (this.pauseThreshold > 0 && this.crawledUrlCountAfterSubmit >= this.pauseThreshold) {
                this.crawledUrlCountAfterSubmit = 0;
                this.pauseThreshold = 0;
                this.pauseCrawling();
                return;
            }

            // Get the first URL in the queue that is not currently loading
            let $urlRow = $(this.selectorUrlsToBeCrawled).first() || null;

            // If there is no URL waiting to be saved, then stop.
            if($urlRow === null || !$urlRow.length) {
                return;
            }

            // Increase the running request count since we will send a request right now.
            this.runningRequestCount += 1;
            this.crawledUrlCountAfterSubmit++;

            // Crawl the URL.
            this.crawlUrlRow($urlRow, null, null, (e) => {
                // Decrease the running request count since the request has been finished.
                this.runningRequestCount -= 1;

                // Crawl next URL in the queue
                this.crawlNextUrlInQueue();
            });
        }

    }

    /**
     * Crawls a URL specified in the given URL row element
     *
     * @param $urlRow URL row element to be crawled
     * @param doneCallback A callback that will be called after routine operations have been done at $.post's 'done' callback
     * @param failCallback A callback that will be called after routine operations have been done at $.post's 'fail' callback
     * @param alwaysCallback A callback that will be called after routine operations have been done at $.post's 'always' callback
     * @param recrawlIfDuplicate True if the post should be recrawled when duplicate
     */
    private crawlUrlRow($urlRow: JQuery<HTMLElement>, doneCallback: (response: any) => void = null,
                        failCallback: (response: any) => void = null, alwaysCallback: (e: JQuery.Event) => void = null,
                        recrawlIfDuplicate: boolean = false) {
        let urlData: PostUrlData = $urlRow.data("urlData") || null;

        // Create a response row
        let $responseRow = this.getNewResponseRowElement();

        // If there is no URL data, mark the row as finished and inform the user.
        if (urlData === null) {
            $responseRow.html(window.kdn.url_data_not_exist);
            this.setUrlRowDone($urlRow);
            return;
        }

        // Set the row loading
        this.setUrlRowLoading($urlRow);

        // Update the status
        this.updateStatus();

        $.post(window.ajaxurl, {
            kdn_nonce: $("#kdn_nonce").val(),
            action: window.pageActionKey,
            data: {
                'tool_type':                        'save_post',
                '_kdn_tools_site_id':              urlData.siteId,
                '_kdn_tools_post_url':             urlData.url,
                '_kdn_tools_category_id':          urlData.categoryId,
                '_kdn_tools_featured_image_url':   urlData.imageUrl,
                '_kdn_recrawl_if_duplicate':       recrawlIfDuplicate ? '1' : '0'
            }
        })
            .done((response) => {
                if(response) {
                    this.setResponseRowHtml($responseRow, response.view);
                } else {
                    this.setResponseRowHtml($responseRow, window.kdn.no_result);
                }

                if (doneCallback !== null) doneCallback(response);
            })
            .fail((response) => {
                console.log(response);
                this.setResponseRowHtml($responseRow, window.kdn.an_error_occurred + ": " + response.responseText);

                if (failCallback !== null) failCallback(response);
            })
            .always(e => {
                // Set the response
                $urlRow.after($responseRow);
                $urlRow.addClass(this.classHasResponse).addClass(this.classOpen);

                // Mark the URL row as done
                this.setUrlRowDone($urlRow);

                // Update the status
                this.updateStatus();

                if (alwaysCallback !== null) alwaysCallback(e);
            });
    }

    /**
     * Sets a URL table row 'loading'.
     * @param $urlRow
     */
    private setUrlRowLoading($urlRow: JQuery<HTMLElement>) {
        $urlRow.addClass('loading').removeClass('done');
        $urlRow.find('td.status').html('<span class="dashicons dashicons-update"></span>');
        $urlRow.find('.button.delete').addClass('hidden');
        $urlRow.find('.button.repeat').addClass('hidden');
    }

    /**
     * Sets a URL table row 'done'.
     * @param $urlRow
     */
    private setUrlRowDone($urlRow: JQuery<HTMLElement>) {
        $urlRow.removeClass('loading').addClass('done');
        $urlRow.find('td.status').html('<span class="dashicons dashicons-yes"></span>');
        $urlRow.find('.button.delete').removeClass('hidden');
        $urlRow.find('.button.repeat').removeClass('hidden');
    }

    /**
     * Adds given UrlData to the queue
     * @param urls
     */
    private addUrlsToQueueTable(urls: Array<PostUrlData>) {
        let $tableContainer = $(this.selectorTableContainerUrlQueue).first();
        let $tbody = $tableContainer.find(' tbody').first();
        urls = urls || [];

        // Create views for the URLs and add them to the table
        for(let urlData of urls) {
            $tbody.append(this.createUrlRow(urlData));
        }

        // Update the URL table visibilities
        this.onUpdateUrlTable();

        // if any URLs are added
        if(urls.length) {
            // Initialize the tooltips
            $('[data-toggle="tooltip"]').tooltip();

            // Flash the background
            flashBackground($tableContainer);
        }

        // Update the status
        this.updateStatus();
    }

    /**
     * Shows/hides default message or URL table considering whether there are items in the table or not
     */
    private onUpdateUrlTable() {
        let $tableContainer = $(this.selectorTableContainerUrlQueue).first();
        let $defaultMessage = $(this.selectorContainerUrlQueue).find('.default-message').first();

        // If there are no URLs, hide the table and show the default message.
        let $notHiddenRows = $(this.selectorTableUrlQueue).find('tbody tr:not(.hidden)') || null;
        if (($notHiddenRows === null || !$notHiddenRows.length) && this.beingProcessedCategoryUrlData === null) {
            $tableContainer.addClass('hidden');
            $defaultMessage.removeClass('hidden');

            // Make sure crawling is not paused. Because, after hiding the buttons with the crawling status being paused,
            // no other crawling can be done without refreshing the page.
            this.continueCrawling();
            return;
        }

        $tableContainer.removeClass('hidden');
        $defaultMessage.addClass('hidden');

        // Update the status
        this.updateStatus();
    }

    /**
     * Create a row for a UrlData instance
     * @param urlData
     */
    private createUrlRow(urlData: PostUrlData): JQuery<HTMLElement> {
        // Create a new row
        let $row = this.getNewUrlRowElement();

        // Modify the row such that it contains current UrlData values
        $row.find('.site').text(urlData.siteName);
        $row.find('.category').text(urlData.categoryName);

        if (urlData.imageUrl.length) {
            let $img = $('<img/>')
                .attr('src', urlData.imageUrl);

            let $a = $('<a/>')
                .attr('href', urlData.imageUrl)
                .attr('target', '_blank')
                .attr('data-toggle', 'tooltip')
                .attr('data-placement', 'right')
                .attr('data-html', 'true')
                .attr('title', $img[0].outerHTML);

            $a.append($img);

            $row.find('.image').append($a);
        }

        $row.find('.post-url').html('<a target="_blank" href="' + urlData.url + '">' + urlData.url + '</a>');

        $row.data("urlData", urlData);

        // console.log($row.data("urlData"));

        return $row;
    }

    /**
     * Creates a new response row with the given HTML
     * @param $row
     * @param html
     */
    private setResponseRowHtml($row: JQuery<HTMLElement>, html: string): JQuery<HTMLElement> {
        let $response = $row.find('.' + this.classResponse).first();
        $response.html(html);

        return $response;
    }

    /**
     * Get prototype table row element
     */
    private getNewUrlRowElement() {
        if (this.$urlRowPrototype === null) {
            this.$urlRowPrototype = $(this.selectorTableUrlQueue).find('tr.prototype.url').first();
        }

        return this.$urlRowPrototype.clone().removeClass('prototype').removeClass('hidden');
    }

    /**
     * Get prototype table row element
     */
    private getNewResponseRowElement() {
        if (this.$responseRowPrototype === null) {
            this.$responseRowPrototype = $(this.selectorTableUrlQueue).find('tr.prototype.response').first();
        }

        return this.$responseRowPrototype.clone().removeClass('prototype').removeClass('hidden');
    }

    /**
     * Collects entered URLs and returns an array of URLData.
     */
    private getEnteredUrls(): Array<PostUrlData> {
        let urls: PostUrlData[] = [];

        let $form = $(this.selectorForm).first();
        let serializedValues = $form.serializeObjectNoNull();
        let siteId = serializedValues['_kdn_tools_site_id'] || null;
        let categoryId = serializedValues['_kdn_tools_category_id'] || null;

        // Get the selected site's name
        let siteNameSelector = this.selectorForm + ' #_kdn_tools_site_id option[value="' + siteId + '"]';
        let siteName = $(siteNameSelector).text() || null;

        // Get the selected category's name
        let categoryNameSelector = this.selectorForm + ' #_kdn_tools_category_id option[value="' + categoryId + '"]';
        let categoryName = $(categoryNameSelector).text() || null;

        if (siteId === null || categoryId === null) {
            // Notify the user
            let inputName = siteId === null ? this.inputNameSiteId : this.inputNameCategoryId;
            Notifier.getInstance().notifyRegular(
                $('label[for="' + inputName + '"]'),
                window.kdn.this_is_not_valid,
                NotificationType.WARN
            );
            return urls;
        }

        // console.log(serializedValues);

        // Get post URLs with featured image URLs
        let postAndImageUrls = serializedValues['_post_and_featured_image_urls'] || null;
        if (postAndImageUrls !== null) {
            let l = postAndImageUrls.length, current: any, postUrl: any, imageUrl: any;
            for(let i = 0; i < l; i++) {
                current = postAndImageUrls[i] || null;
                if (current === null) continue;

                postUrl = current.postUrl || null;
                imageUrl = current.imageUrl || null;

                // There must a valid post URL.
                if (postUrl === null || !this.isValidUrl(postUrl)) continue;

                // If the image URL is not valid, make it null.
                if (imageUrl !== null && !this.isValidUrl(imageUrl)) imageUrl = null;

                urls.push(new PostUrlData(siteName, siteId, postUrl, categoryName, categoryId, imageUrl));
            }

        }

        // Get new line separated post URLs
        let nlSeparatedPostUrls = serializedValues[this.inputNamePostUrls] || null;
        if (nlSeparatedPostUrls !== null) {
            let val: Array<string> = nlSeparatedPostUrls.split('\n').map((v: string, ind: number) => {
                return v.trim();
            });

            let l = val.length, currentPostUrl: string;
            for (let i = 0; i < l; i++) {
                currentPostUrl = val[i] || null;
                if (currentPostUrl === null) continue;

                // The URL must be a valid URL
                if (!this.isValidUrl(currentPostUrl)) continue;

                urls.push(new PostUrlData(siteName, siteId, currentPostUrl, categoryName, categoryId, null));
            }
        }

        // Get category URLs
        let categoryUrls: Array<string> = serializedValues[this.inputNameCategoryUrls] || null;
        if (categoryUrls !== null) {
            // Prepare the category urls
            categoryUrls = categoryUrls.map((v: string, ind: number) => {
                return v.trim();
            });

            for(let categoryUrl of categoryUrls) {
                categoryUrl = categoryUrl || null;
                if (categoryUrl === null) continue;

                this.categoryUrlQueue.push(new CategoryUrlData(siteName, siteId, categoryUrl, categoryName, categoryId));
            }
        }

        // Clear the URL inputs if the user wants
        let $checkbox = $(this.selectorCheckboxClearUrls) || null;
        if ($checkbox !== null && $checkbox.length && (<any>$checkbox[0]).checked) {
            $form.find('.kdn-remove').each((i, el) => {
                $(el).click();
            });

            $form.find('textarea').val('').html('');
        }

        return urls;
    }

    /**
     * Check if a URL is valid
     * @param url
     * @return True if the URL is valid, false otherwise.
     */
    private isValidUrl(url: string): boolean {
        url = url || null;

        // URL cannot be null
        if (url === null) return false;

        // URL must start with "http"
        if(!Utils.startsWith(url.toLowerCase(), 'http')) return false;

        return true;
    }

    /**
     * Repeats crawling for the URL row that is closest to the event
     * @param e
     */
    private onClickRepeatCrawling(e: JQuery.Event) {
        e.preventDefault();
        e.stopPropagation();

        let $self = $(e.target);
        let $urlRow = $self.closest('tr');
        let $responseRow = $urlRow.next() || null;

        let urlData: PostUrlData = $urlRow.data("urlData") || null;
        if (urlData === null) {
            // Notify the user
            Notifier.getInstance().notifyRegular(
                $urlRow,
                window.kdn.url_data_not_exist_for_this,
                NotificationType.ERROR
            );
            console.log("URL data does not exist for this row.");
            return;
        }

        // If the next row is a response row, remove it.
        if ($responseRow !== null && $responseRow.length && $responseRow.hasClass(this.classResponse)) {
            $responseRow.remove();
            $urlRow.removeClass(this.classOpen);

        } else {
            // Notify the user
            Notifier.getInstance().notifyRegular(
                $urlRow,
                window.kdn.this_url_not_crawled_yet,
                NotificationType.INFO
            );

            // Stop, because this URL row has not been crawled yet.
            return;
        }

        // Crawl the URL row
        this.crawlUrlRow(<JQuery<HTMLElement>> $urlRow, null, null, null, true);
    }

    /**
     * Handles clicks made to the remove button
     * @param e
     */
    private onClickDeleteUrl(e: any) {
        e.preventDefault();

        let $self = $(e.target);

        // Get the clicked table row
        let $closestTr = $self.closest('tr');

        // Get the table row coming after
        let $nextTr = $closestTr.next() || null;

        // If the next row is a response row, remove it.
        if ($nextTr !== null && $nextTr.length && $nextTr.hasClass(this.classResponse)) {
            $nextTr.remove();
        }

        // Remove the clicked row.
        $closestTr.remove();

        // Update the URL table visibilities
        this.onUpdateUrlTable();
    }

    /**
     * Get response row of the given URL row
     * @param $urlRow
     * @return Response row or null
     */
    private getUrlRowResponse($urlRow: JQuery<Document>): JQuery<Document> {
        // Get the table row coming after
        let $nextRow = $urlRow.next() || null;

        // If the next row is a response row, remove it.
        if ($nextRow === null || !$nextRow.length || !$nextRow.hasClass(this.classResponse)) return null;

        return $nextRow;
    }

    /**
     * Updates the status of the URL table
     */
    private updateStatus() {
        let $status = $(this.selectorStatus);
        let prevStatusHtml = $status.html();

        let doneCount = $(this.selectorUrlsDone).length;
        let totalCount = $(this.selectorUrls).length;

        let status = '<span class="counts">' + doneCount + '/' + totalCount + '</span>';

        // Get the URLs being crawled
        let $urlsBeingCrawled = $(this.selectorUrlsBeingCrawled);

        // Add data of the URLs that are being crawled to the status
        if ($urlsBeingCrawled.length) {
            status += ' ' + window.kdn.currently_crawling + ': ';

            let urlDataBeingCrawled: PostUrlData;
            $urlsBeingCrawled.each((i, el) => {
                urlDataBeingCrawled = $(el).data("urlData") || null;
                if (urlDataBeingCrawled === null) return;

                // Add the URL that is currently being crawled
                status += $('<a/>')
                    .attr('href', urlDataBeingCrawled.url)
                    .attr('target', '_blank')
                    .addClass('post-url')
                    .append(urlDataBeingCrawled.url)
                    .attr("style", "display: block;")[0].outerHTML;
            });
        }

        // Add currently-being-processed category URL
        if (this.beingProcessedCategoryUrlData !== null) {
            let $a = $('<a/>')
                .attr('href', this.beingProcessedCategoryUrlData.url)
                .attr('target', '_blank')
                .addClass('category-url')
                .append(this.beingProcessedCategoryUrlData.url);

            status += '<br><span class="dashicons dashicons-update"></span> ' +
                window.kdn.retrieving_urls_from.format($a[0].outerHTML);
        }

        // Update the status only if it is different from the previous status
        if (status !== prevStatusHtml) {
            flashBackground($status);
            $status.html(status);
        }

    }

    /**
     * Get the continue button element
     */
    private getContinueButton() {
        return $(this.selectorButtonContinue).first();
    }

    /**
     * Get the pause button element
     */
    private getPauseButton() {
        return $(this.selectorButtonPause).first();
    }

    /**
     * Get the test result container of the manual crawling tool
     */
    private getTestResultContainer(): JQuery<HTMLElement> {
        return $(this.selectorToolContainerManualCrawl).find('.test-results').first();
    }

    /**
     * Shows the given result in the test results container
     * @param html
     */
    private showTestResult(html: string) {
        this.getTestResultContainer()
            .removeClass('loading')
            .removeClass('hidden')
            .find('.content').html(html);
    }

    /**
     * Pauses crawling
     */
    private pauseCrawling() {
        this.isPaused = true;
        this.getContinueButton().removeClass('hidden');
        this.getPauseButton().addClass('hidden');
    }

    /**
     * Continues crawling
     */
    private continueCrawling() {
        this.isPaused = false;
        this.getContinueButton().addClass('hidden');
        this.getPauseButton().removeClass('hidden');

        // Continue crawling post URLs
        this.crawlNextUrlInQueue();

        // Continue retrieving post URLs from category URLs
        this.retrievePostUrlsFromCategoryUrls();
    }

    /**
     * Get maximum number of posts to be crawled from its input
     * @return number A number greater than or equal to 0
     */
    private getMaxPostsToBeCrawled(): number {
        let $input = $(this.selectorInputMaxPostsToBeCrawled) || null;
        if ($input === null) return 0;

        let val = $input.val() || 0;
        if (val === 0) return val;

        val = parseInt(val.toString());
        return val < 0 ? 0 : val;
    }

    /**
     * Get maximum parallel crawling count from its input
     * @return number A number greater than or equal to 1
     */
    private getMaxParallelCrawlingCount(): number {
        let $input = $(this.selectorInputMaxParallelCrawlingCount) || null;
        if ($input === null) return 1;

        let val = $input.val() || 1;
        if (val === 1) return val;

        val = parseInt(val.toString());
        return val < 1 ? 1 : val;
    }

    /**
     * Shows all responses of the URL rows
     */
    private showAllResponses() {
        // Show the responses
        $(this.selectorUrlResponses).removeClass('hidden');

        // Make the URLs that have responses open
        $(this.selectorUrls + '.' + this.classHasResponse).addClass(this.classOpen);
    }

    /**
     * Hides all responses of the URL rows
     */
    private hideAllResponses() {
        // Hide the responses
        $(this.selectorUrlResponses).addClass('hidden');

        // Make the URLs that have responses not open
        $(this.selectorUrls + '.' + this.classHasResponse).removeClass(this.classOpen);
    }
}