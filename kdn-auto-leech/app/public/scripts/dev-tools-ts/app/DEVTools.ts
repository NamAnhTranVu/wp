import {addressBar, dtv, iframeHandler, optionsToolbar, sidebarHandler} from "../dev-tools";
import {TestDataPreparer} from "../../post-settings-ts/app/TestDataPreparer";
import $ from "jquery";

export class DEVTools {

    /**
     * Stores timeout function used to save the options
     * @type {null}
     */
    public saveTimeout: any = null;

    private testDataPreparer: TestDataPreparer;

    /** Stores the position of the scroll when the dev tools window is opened */
    private scrollPos: number = null;

    constructor() {
        this.testDataPreparer = TestDataPreparer.getInstance();
    }

    /**
     * Shows the dev tools lightbox with a content.
     * @param {string|null} content HTML. If null, the content will be loaded from the URL.
     * @param {string} url URL of the content
     */
    showLightboxWithContent (content: any, url: any) {
        let $devTools = $(dtv.devToolsContentSelector);

        // Show the lightbox with the content
        $.featherlight($devTools, {
            afterOpen: () => {
                this.onLightBoxAfterOpen(content, url);
            },
            beforeClose: () => {
                this.onLightBoxBeforeClose();

                // Prevent default action.
                return false;
            },
            beforeOpen: () => {
                // If there is a lightbox opened before, use it and do not show a new instance.
                if(dtv.$lightboxInstance) {
                    dtv.$lightboxInstance.css("display", "block");

                    // Call after open callback.
                    this.onLightBoxAfterOpen(null, null);

                    // Prevent default action.
                    return false;
                }

                // Otherwise, let the Featherlight open a new instance.
            }
        });
    }

    onLightBoxBeforeClose() {
        // Set the instance if there is none.
        if(!dtv.$lightboxInstance) {
            dtv.$lightboxInstance = $(dtv.lightboxSelector);
            dtv.$lightboxInstance.addClass("instance");
        }

        // Hide the lightbox
        dtv.$lightboxInstance.css("display", "none");

        // Featherlight has a bug that changes 'tabindex' values of form elements with '-1'. This results in going to
        // address bar of the browser after hitting tab button in the keyboard. Here, we change 'tabindex' values of
        // all form elements with '0'. By this way, elements to be focused when hitting the tab key will be computed by
        // the browser considering the positions of the form elements. In other words, this fixes the problem. However,
        // since there are a lot of form elements in the page, this is not an efficient solution. But, it is better than
        // going to the address bar every time the tab key is hit.
        $('textarea, input, button, select').attr('tabindex', 0);

        // Restore the scroll position
        $(window).scrollTop(this.scrollPos);
    }

    onLightBoxAfterOpen(content: any, url: any) {
        // Get the current scroll position
        this.scrollPos = $(window).scrollTop();

        // Restore the state if this is the first time of the light box opening
        if(!dtv.$lightboxInstance) this.restoreState();

        /* LIGHTBOX TITLE */
        // If there is no lightbox title element inside the lightbox, add it.
        let $lightbox = $(dtv.lightboxSelector),
            $lightboxTitle = $lightbox.find(dtv.devToolsContentSelector + " > " + dtv.lightboxTitleSelector);

        if($lightboxTitle.length && !$lightbox.find('> ' + dtv.lightboxTitleSelector).length) {
            $lightbox.append($lightboxTitle);
        }

        // Update the title
        this.updateTitle(dtv.$currentDevToolsButton.closest("tr").find("label").first().html());

        // Assign the current CSS selector
        let $selectorInput = dtv.$currentDevToolsButton.closest(".input-group").find("input.css-selector").first();
        let currentSelector: any = '';
        if($selectorInput.length && $selectorInput.val() != undefined) currentSelector = $selectorInput.val();
        $(dtv.cssInputSelector).first().val(currentSelector).trigger('change');

        /**/

        let urlInputVal: any = $(dtv.urlInputSelector).val();

        // If the content is null and there is no URL in the URL input, go to the target URL.
        if(content == null && (urlInputVal == undefined || !urlInputVal.length)) {
            addressBar.setAddressBarUrl(url);
            addressBar.go(url);

            // Otherwise, if the content is not null, set iframe content as the content.
        } else if(content != null) {
            iframeHandler.setIframeContent(content, url);

            // Otherwise, make sure CSS selectors are initialized
        } else {
            iframeHandler.initCssSelectors();
        }

        // Load the sidebar
        sidebarHandler.loadSidebar();

        // Set the options for current DEV tools button
        let data = dtv.$currentDevToolsButton.data("kdn");
        if(data != undefined) {
            // Target HTML tag
            $(dtv.optTargetHTMLTagSelector).first().val(data["targetTag"] != undefined ? data["targetTag"] : '').trigger('change');
        }

        // Do the things that should be done only once for a lightbox.
        if(!dtv.$lightboxInstance) {
            // Listen to resize events on the toolbar, since its size can change. Resize the iframe as well.
            $(dtv.toolbarSelector).resize(iframeHandler.setIframeHeight);

            // Save options when an option input is changed
            $(dtv.optionsToolbarSelector).find(':input').on('change', (e) => {
                let $self = $(e.target);

                // Do not save after target HTML tag is changed.
                if($self.hasClass(dtv.optTargetHTMLTagClass)) return;

                this.saveState();
            });
        }
    }

    /**
     * Get source code of the URL. This function handles caching of the source codes as well.
     * @param {string} url Target URL whose source code is needed
     * @param {Array} data The data that will be sent with the AJAX request. URL will be added to the data automatically.
     * @param {function} done callback. Takes response as parameter.
     * @param {function} fail callback. Takes response as parameter.
     * @param {function} always callback. Takes no parameters.
     */
    getSourceCode (url: any, data: any, done: any, fail: any, always: any) {
        // If the source code was cached before, use it.
        if(dtv.urlCache.hasOwnProperty(url) && dtv.urlCache[url] !== null) {
            done(dtv.urlCache[url]);
            always();
            return;
        }

        // If there was an unfinished XHR, abort it.
        if(dtv.lastUnfinishedSourceCodeXHR) {
            dtv.isAborted = true;
            dtv.lastUnfinishedSourceCodeXHR.abort();
        }

        // Add URL to the data
        data["url"] = url;
        data["removeScripts"] = optionsToolbar.isRemoveScripts() ? 1 : 0;
        data["removeStyles"] = optionsToolbar.isRemoveStyles() ? 1 : 0;
        data["applyManipulationOptions"] = optionsToolbar.isApplyManipulationOptions() ? 1 : 0;
        data["cookies"] = $('input[name^=_cookies]').serialize();

        // Add settings to the data
        data = this.testDataPreparer.addSettingsToAjaxData(data);

        // Get the source code of the target URL via AJAX and call the callbacks
        dtv.lastUnfinishedSourceCodeXHR = $.post(window.ajaxurl, {
            kdn_nonce: dtv.$kdnNonce.val(),
            action: window.pageActionKey,
            data: data
        })
            .done(function(response) {
                // If this is aborted, do not proceed.
                if(dtv.isAborted) {
                    // Set isAborted as false to allow other requests to call 'done' function.
                    dtv.isAborted = false;
                    return;
                }
                // Add the response to the URL cache
                dtv.urlCache[url] = response;
                done(response);
            })
            .fail(fail)
            .always(function() {
                // Make the last unfinished source code XHR null, since it is finished.
                dtv.lastUnfinishedSourceCodeXHR = null;
                always();
            });

    }

    /**
     * Get alternative CSS selectors for a CSS selector
     * @param {string} selector The CSS selector whose alternatives are needed
     */
    getAlternativeSelectors (selector: any) {
        // Make sure there is a valid selector
        if(selector == undefined || !selector || !selector.length) return;

        // Remove multiple spaces
        selector = selector.replace(dtv.multipleSpaceRegex, " ");

        // Get the parts of the selector
        let parts = selector.split(" "),
            $iframeContents = iframeHandler.getIframeContents(),
            $foundElements = $iframeContents.find(selector);

        let unwanted = ["body", "html"],
            idSelectors: any = [];

        parts = $.map(parts, function(val, i: number) {
            // Push this part to ID selectors if it is an ID selector
            // Make sure this is not the last part
            if(val.indexOf("#") === 0 && i < parts.length - 1) idSelectors.push(val);

            // Remove unwanted parts
            return (
                $.inArray(val, unwanted) !== -1
            ) ? null : val;
        });

        let length = parts.length,
            last = parts[length - 1],
            possibleLastTag = $foundElements.length ? $foundElements.first().prop("tagName").toLowerCase() : null,
            newLast: any = null,
            holder, i,
            alternatives: any = []
        ;

        //l(length);
        //l("Last: " + last);
        //l(idSelectors);

        // If the last part does not start with a tag, prepend the first found element's tag to it.
        if(possibleLastTag != null && !(/^\w/).test(last)) {
            newLast = possibleLastTag + last;
            alternatives.push(newLast);
        }

        // Add the last selector as an alternative as well
        alternatives.push(last);

        $.map(idSelectors, function(idSelector, i) {
            alternatives.push(idSelector + " " + (newLast ? newLast : last));
        });

        let altSelector = '', altWithLast, altWithNewLast,
            nthChildRegex = /:nth-child[^)]+\)/g,
            nthChildRegexNoColon = /nth-child[^)]+\)/g,
            nthChildEndPosRegex = new RegExp("nth-child\\([0-9]+\\)(?:[^\\s]+|)", "g"),
            firstChildRegex = /:first-child/,
            lastChildRegex = /:last-child/,
            idRegex = new RegExp('\\[id="[^"]+"\\]|#[^$\\s.]+', "g"),
            matches
        ;

        // Create alternatives by combining parts starting from the end
        for(i = length - 2; i >= 0; i--) {
            if(!parts.hasOwnProperty(i)) continue;

            holder = parts[i];

            altSelector = holder + " " + altSelector;

            // CSS selectors should not start with ">". So, if this one is ">", let's get the previous part as well.
            if(holder == ">") {
                i--;
                if(i < 0) break;

                holder = parts[i];
                altSelector = holder + " " + altSelector;
            }

            altWithLast = altSelector + " " + last;
            altWithNewLast = newLast ? (altSelector + " " + newLast) : null;

            // Use the created alternative selector with both last and newLast parts.
            alternatives.push(altWithLast);
            if(altWithNewLast) alternatives.push(altWithNewLast);
        }

        // A few more alternatives
        alternatives = $.map(alternatives, (val) => {
            // Try to generate alternatives with last-child for each selector
            matches = this.matchRegExWithIndex(nthChildEndPosRegex, val);
            if(!matches) return val;

            // Iterate over "nth-child" matches in this selector
            $.map(matches, function(mVal) {
                // Create partial selector by cutting the part of the selector coming after the current
                // "nth-child" match
                let end = parseInt(mVal[1]) + parseInt(mVal[0].length),
                    newSelector = val,
                    partialSelector = val.substring(0, end);

                let $foundElement = $iframeContents.find(partialSelector).first();

                // If there is an element found by partial selector and it is the last child of its parent,
                // we can replace the current "nth-child" match with "last-child".
                if ($foundElement.length && $foundElement.is(':last-child')) {
                    // Prepare the new selector
                    newSelector = val.substring(0, mVal[1]) + mVal[0].replace(nthChildRegexNoColon, "last-child") + val.substring(end);

                    // Add this new selector among others
                    alternatives.push(newSelector);
                }
            });

            if (val === undefined || val === 'undefined' || val === null || !val.length) return null;

            // Make sure there are no unwanted spaces
            return val.replace(dtv.multipleSpaceRegex, " ");
        });

        // If the last element has ID in it, add an alternative selector by removing the ID
        $.map(alternatives, function(val) {
            let split = val.split(" ");
            if(split.length > 1) {
                let last = split[split.length - 1];
                if(last.indexOf("#") !== -1 || last.indexOf("id=") !== -1) {
                    // Remove the ID part
                    last = last.replace(idRegex, "");

                    // If the last part became empty and there is a possible last tag, prefer the possible last tag
                    // instead.
                    if(!last.length && possibleLastTag != null) {
                        last = possibleLastTag;
                    }

                    // Remove the last element and add modified last element
                    split.pop();
                    split.push(last);

                    // Join the values with space and add it as an alternative CSS selector
                    alternatives.push(split.join(" "));
                }
            }
        });

        // Add these alternatives without "nth-child" "first-child" and "last-child" as well.
        $.map(alternatives, function(val) {
            alternatives.push(val.replace(nthChildRegex, ""));
            alternatives.push(val.replace(firstChildRegex, ""));
            alternatives.push(val.replace(lastChildRegex, ""));

            // All
            alternatives.push(val.replace(nthChildRegex, "").replace(firstChildRegex, "").replace(lastChildRegex, ""));
        });

        // Make sure alternatives are unique and they are sorted by length in ascending order
        alternatives = this.unique(alternatives)
            .sort(function(a: any, b: any){
                // ASC  -> a.length - b.length
                // DESC -> b.length - a.length
                return a.length - b.length;
            });

        return alternatives;
    }

    /**
     * Get the best alternative selector among already computed alternative selectors.
     * @returns {null|string} Best alternative selector or null if not found.
     */
    getBestAlternativeSelector () {
        let $section = sidebarHandler.getSectionElement(dtv.sidebarSectionAlternativeSelectorsClass),
            alternativeObjects = $section.find("ul").first().data("alternatives"),
            best: any = null
        ;

        if(alternativeObjects == undefined) return best;

        // Find the shortest selector that selects only 1 element.
        $.map(alternativeObjects, function(val) {
            if(val.count == 1) {

                if(best == null) {
                    best = val.selector;

                    // If there is a best which does not contain an ID, but this one has an ID in it, use this one.
                } else if((val.selector.indexOf("#") !== -1 || val.selector.indexOf("id=") !== -1) && best.indexOf("#") === -1 && best.indexOf("id=") === -1) {
                    return val.selector;
                }
            }
        });

        return best;
    }

    /**
     * Matches a regex and returns matches with their positions
     *
     * @param {RegExp} regex    Regular expression
     * @param {string} str      Target string
     * @returns {null|Array}    If no matches are found, null. Otherwise, an array of arrays with each inner array
     * containing the match and its position in the target string respectively.
     */
    matchRegExWithIndex (regex: any, str: any) {
        let result: any = [],
            cursor = 0;

        if (str === undefined || str === 'undefined' || str === null || !str.length) return result;

        let matches = str.match(regex);
        if(!matches) return null;

        $.map(matches, function(val) {
            cursor = str.indexOf(val, cursor);
            result.push([val, cursor]);
        });

        return result;
    }

    /**
     * Deletes cache of the URL
     * @param {string} url
     */
    invalidateUrlCache (url: any) {
        dtv.urlCache[url] = null;

        // Invalidate current URL as well.
        iframeHandler.getIframe().data("currenturl", "");
    }

    /**
     * Invalidates all URL caches.
     */
    invalidateAllUrlCaches () {
        dtv.urlCache = [];
    }

    /**
     * Flash the background color of an object
     * @param {object} $element Target element
     */
    flashBackground ($element: any) {
        $element.stop().css("background-color", "#b8ea84")
            .animate({ backgroundColor: "#FFFFFF"}, 1000);
    }

    /**
     * Close the lightbox
     */
    closeLightbox () {
        $.featherlight.current().close();
    }

    /**
     * Updates the lightbox title
     * @param {string} newTitle
     */
    updateTitle (newTitle: any) {
        $(dtv.lightboxTitleSelector).html(newTitle || "");
    }

    /**
     * Save options to the database
     */
    saveState () {
        // Use a timeout function to save the state to prevent unnecessary AJAX requests.
        // If there is a timeout, clear it.
        if(this.saveTimeout != null) clearTimeout(this.saveTimeout);

        // Start new timeout.
        this.saveTimeout = setTimeout(function() {
            //l("Save state");
            let $optionsToolbarInputs = $(dtv.optionsToolbarSelector).find(':input');

            let state: any = {
                options: {},
                history: addressBar.history,
                isHoverSelectActive: optionsToolbar.isHoverSelectActive() ? 1 : 0
            };

            // Prepare the options property
            let $self: any, val;
            $optionsToolbarInputs.each((i, el) => {
                $self = $(el);

                // Do not keep target HTML tag in the state.
                if($self.hasClass(dtv.optTargetHTMLTagClass)) return;

                val = $self.attr("type") == "checkbox" ? ($self[0].checked ? 1 : 0) : $self.val();
                state.options[$self.attr("name")] = val;
            });

            // Get the previously saved state. If the same state is being saved, stop.
            if(dtv.$inputDevToolsState.val() == JSON.stringify(state)) {
                //l("trying to save the same state. stopped.");
                return;
            }

            //l(data);

            // Save it
            $.post(window.ajaxurl, {
                kdn_nonce: dtv.$kdnNonce.val(),
                action: window.pageActionKey,
                data: {
                    cmd: 'saveDevToolsState',
                    postId: dtv.postId,
                    state: state
                }
            })
                .done(function(response) {
                    //l("saved");
                    //l(response);

                    // Update hidden input's value
                    dtv.$inputDevToolsState.val(JSON.stringify(state));
                })
                .fail(function(response) {
                    //l("failed");
                    //l(response);
                })

        }, 1500);
    }

    /**
     * Restore the state from the hidden input element storing the previously saved state
     */
    restoreState () {
        //l("restore state");
        let stateInputVal: any = dtv.$inputDevToolsState.val();

        if(stateInputVal == undefined || !stateInputVal) return;

        let state = JSON.parse(stateInputVal);

        // Restore hover select state
        if(state.isHoverSelectActive == 1) {
            $(dtv.optHoverSelectSelector).removeClass("active").click();
        } else {
            $(dtv.optHoverSelectSelector).addClass("active").click();
        }

        // Restore history
        addressBar.history = state.history || [];
        addressBar.historyUpdated();

        // Restore options
        let $element, val;
        for(let i in state.options) {
            if(!state.options.hasOwnProperty(i)) continue;

            val = state.options[i];
            $element = $("[name=" + i + "]");
            if($element.attr("type") == "checkbox") {
                $element.prop("checked", val == 1);

            } else {
                $element.val(val);
            }
        }
    }

    /**
     * Removes class names that cannot be processed via PHP.
     * @param selector
     */
    removeImproperClassNames (selector: any) {
        return selector.replace(dtv.regexClassNameStartingWithDash, '');
    }

    /**
     * Changes class names defined with brackets so that they are defined with a dot.
     * @param selector
     * @returns {*}
     */
    unbracketClassNames (selector: any) {
        return selector.replace(new RegExp('\\[class="([^"]+)"\\]', 'g'), (match: any, classes: any) => {
            // Trim the value before replacing spaces with dots to make sure there won't be any unwanted
            // dots at the beginning and end of the value.
            return "." + classes.trim().replace(" ", ".");
        });
    }

    /**
     * Get a unique array.
     * @param {Array} a
     * @returns {Array}
     */
    unique(a: any) {
        let result: any = [];
        $.each(a, function(i,v){
            if ($.inArray(v, result) == -1) result.push(v);
        });
        return result;
    }
}