/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./scripts/dev-tools-ts/dev-tools.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./scripts/common-ts/Notifier.ts":
/*!***************************************!*\
  !*** ./scripts/common-ts/Notifier.ts ***!
  \***************************************/
/*! exports provided: Notifier */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Notifier", function() { return Notifier; });
/* harmony import */ var _enum_NotificationType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enum/NotificationType */ "./scripts/common-ts/enum/NotificationType.ts");
/* harmony import */ var _enum_NotificationPosition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enum/NotificationPosition */ "./scripts/common-ts/enum/NotificationPosition.ts");


class Notifier {
    constructor() { }
    static getInstance() {
        if (this.INSTANCE === null)
            this.INSTANCE = new Notifier();
        return this.INSTANCE;
    }
    /**
     * Shows "required for test" notification by default. If you supply another message, shows it instead.
     *
     * @param $targetEl
     * @param notificationMessage If defined, this message will be shown. Otherwise, a default message will be shown.
     */
    notify($targetEl, notificationMessage) {
        if (!this.isNotifyAvailable())
            return;
        if (notificationMessage == undefined || !notificationMessage.length)
            notificationMessage = window.kdn.required_for_test;
        // Find the closest label
        let $label = $targetEl.closest("tr").find("label").first(), $notificationEl = $label.length ? $label : $targetEl;
        this.scrollToElement($notificationEl);
        $notificationEl.notify(notificationMessage, {
            position: 'top'
        });
    }
    /**
     * Show a notification message for an element
     *
     * @param {Object} $targetElement
     * @param {string} message
     * @param {string} type Class name for the notification element. Default: 'info'
     * @param {string} position 'top', 'left', 'bottom left', 'right top', ... Default: 'top'
     */
    notifyRegular($targetElement, message, type = _enum_NotificationType__WEBPACK_IMPORTED_MODULE_0__["NotificationType"].INFO, position = _enum_NotificationPosition__WEBPACK_IMPORTED_MODULE_1__["NotificationPosition"].TOP) {
        if (!this.isNotifyAvailable())
            return;
        $targetElement.notify(message, {
            position: position || 'top',
            className: type || 'info',
        });
    }
    /**
     * Scrolls to an element
     * @param $el
     */
    scrollToElement($el) {
        $(document).find('html, body').stop().animate({
            scrollTop: $el.first().offset().top - $(window).height() / 4
        }, 500, 'swing');
    }
    /**
     * Checks if notification library is available
     * @param {boolean} showError True if an error message should be written in JS console when it is not available.
     */
    isNotifyAvailable(showError = true) {
        let isAvailable = !(typeof $.fn.notify != 'function');
        if (!isAvailable && showError) {
            console.error("NotifyJS is not defined.");
        }
        return isAvailable;
    }
}
Notifier.INSTANCE = null;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./scripts/common-ts/Utils.ts":
/*!************************************!*\
  !*** ./scripts/common-ts/Utils.ts ***!
  \************************************/
/*! exports provided: Utils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Utils", function() { return Utils; });
class Utils {
    /**
     * Checks if a string (haystack) starts with something (needle)
     * @param haystack
     * @param needle
     * @return {boolean}
     */
    static startsWith(haystack, needle) {
        return haystack.lastIndexOf(needle, 0) === 0;
    }
    /**
     * Escapes HTML.
     * @param {string} unsafe
     * @see https://stackoverflow.com/a/6234804/2883487
     */
    static escapeHtml(unsafe) {
        if (unsafe === undefined || unsafe === 'undefined' || unsafe === null)
            return '';
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
    /**
     * Shows the specified title as the element's tooltip, and then changes the tooltip to its original value.
     * Hence, the user will see the original title when the tooltip is shown next time.
     * @param $element
     * @param flashTitle
     */
    static flashTooltip($element, flashTitle) {
        let originalTitle = $element.attr("data-original-title");
        $element
            .attr('data-original-title', flashTitle)
            .tooltip('fixTitle')
            .tooltip('show')
            // Set the original title but do not show it. The user will see the original title at next hover
            .attr('data-original-title', originalTitle)
            .tooltip('fixTitle');
    }
    /**
     * Initialize tooltip elements for a selector.
     * @param {string} selector Selector of the element that has 'data-toggle="tooltip"' attribute
     */
    static initTooltipForSelector(selector) {
        if (typeof $.fn.tooltip == 'function')
            $(selector + '[data-toggle="tooltip"]').tooltip();
    }
    /**
     * Get the value of a checkbox.
     * @param {JQuery|null|undefined} $checkboxElement
     */
    static getCheckboxValue($checkboxElement) {
        $checkboxElement = $checkboxElement || null;
        if ($checkboxElement === null || !$checkboxElement.length)
            return false;
        return !!$checkboxElement[0].checked;
    }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./scripts/common-ts/enum/NotificationPosition.ts":
/*!********************************************************!*\
  !*** ./scripts/common-ts/enum/NotificationPosition.ts ***!
  \********************************************************/
/*! exports provided: NotificationPosition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationPosition", function() { return NotificationPosition; });
var NotificationPosition;
(function (NotificationPosition) {
    NotificationPosition["TOP"] = "top";
    NotificationPosition["RIGHT"] = "right";
    NotificationPosition["BOTTOM"] = "bottom";
    NotificationPosition["LEFT"] = "left";
})(NotificationPosition || (NotificationPosition = {}));


/***/ }),

/***/ "./scripts/common-ts/enum/NotificationType.ts":
/*!****************************************************!*\
  !*** ./scripts/common-ts/enum/NotificationType.ts ***!
  \****************************************************/
/*! exports provided: NotificationType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationType", function() { return NotificationType; });
var NotificationType;
(function (NotificationType) {
    NotificationType["WARN"] = "warn";
    NotificationType["INFO"] = "info";
    NotificationType["ERROR"] = "error";
    NotificationType["SUCCESS"] = "success";
})(NotificationType || (NotificationType = {}));


/***/ }),

/***/ "./scripts/dev-tools-ts/app/AddressBar.ts":
/*!************************************************!*\
  !*** ./scripts/dev-tools-ts/app/AddressBar.ts ***!
  \************************************************/
/*! exports provided: AddressBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddressBar", function() { return AddressBar; });
/* harmony import */ var _dev_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dev-tools */ "./scripts/dev-tools-ts/dev-tools.ts");

class AddressBar {
    constructor() {
        /**
         * Stores URL history
         * @type {Array}
         */
        this.history = [];
        /**
         * Stores the index of the URL in the history that is loaded via forward or back buttons.
         * @type {null|integer}
         */
        this.currentHistoryIndex = null;
    }
    /**
     * Load the previous URL in the history. Click handler for back button.
     * @param {object} e Event
     */
    onClickBack(e) {
        this.handleBackAndForward(true);
    }
    /**
     * Load the next URL in the history. Click handler for forward button.
     * @param {object} e Event
     */
    onClickForward(e) {
        this.handleBackAndForward(false);
    }
    /**
     *
     * @param {boolean} isBack True if this is for back button. Otherwise, this is for forward button.
     */
    handleBackAndForward(isBack) {
        let i = isBack ? -1 : 1;
        // No need to proceed if the history is empty.
        if (!this.history.length)
            return;
        let url = null;
        // If there is a state, use it to find the previous URL in the history.
        if (this.currentHistoryIndex !== null) {
            if (this.history[this.currentHistoryIndex + i] !== undefined) {
                url = this.history[this.currentHistoryIndex + i];
                this.currentHistoryIndex += i;
                // If prev index is not available, it means there is no prev URL.
            }
            else {
                // Disable the back button.
                this.disableButton($(isBack ? _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].backButtonSelector : _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].forwardButtonSelector));
                return;
            }
            // Otherwise, if the history is not empty, get the prev URL.
        }
        else if (this.history.length > 1 && isBack) {
            url = this.history[this.history.length + 2 * i];
            this.currentHistoryIndex = this.history.length + 2 * i;
        }
        if (url) {
            // Enable forward button
            this.enableButton($(isBack ? _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].forwardButtonSelector : _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].backButtonSelector));
            // Load the URL
            _dev_tools__WEBPACK_IMPORTED_MODULE_0__["iframeHandler"].loadUrl(url);
            // If there is no previous URLs after this one, disable the back button.
            if (this.history[this.currentHistoryIndex + i] == undefined) {
                this.disableButton($(isBack ? _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].backButtonSelector : _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].forwardButtonSelector));
            }
        }
    }
    /**
     * Refresh the current URL. Click handler for refresh button.
     * @param {object} e Event
     */
    onClickRefresh(e) {
        this.refresh();
    }
    /**
     * Reloads the current URL.
     */
    refresh() {
        if (!this.history.length)
            return;
        let url = _dev_tools__WEBPACK_IMPORTED_MODULE_0__["iframeHandler"].getCurrentUrl();
        $(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].urlInputSelector).val(url);
        // If there is a URL cache, invalidate it to get fresh data.
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["devTools"].invalidateUrlCache(url);
        // Load the URL
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["iframeHandler"].loadUrl(url);
    }
    /**
     * Loads the URL into the iframe. Click handler for go button.
     * @param {object} e Event
     */
    onClickGo(e) {
        // Get the URL from the address bar input
        let $input = $(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].urlInputSelector), url = $input.val();
        // If there is no URL, do not proceed.
        if (url == undefined || !url.length)
            return;
        // Delete the history's later part
        if (this.currentHistoryIndex !== null && this.currentHistoryIndex > 0) {
            this.history = this.history.splice(0, this.currentHistoryIndex - 1);
        }
        this.go(url);
    }
    go(url) {
        if (url == undefined || !url.length)
            return;
        console.log("Go: " + url);
        // If this is a relative URL, prepend the base URL to it.
        if (url.indexOf('/') == 0) {
            let $base = _dev_tools__WEBPACK_IMPORTED_MODULE_0__["iframeHandler"].getIframeContents().find("base");
            // Do not proceed if base URL does not exist
            if (!$base.length || $base.attr("href") == undefined || !$base.attr("href").length)
                return;
            // Prepend the base URL
            url = $base.attr("href") + url;
        }
        // Do not proceed if the URL does not start with http
        if (url.indexOf("http") !== 0)
            return;
        // If this URL is not the last URL in the history, add the URL to the history.
        if (!this.history.length || this.history[this.history.length - 1] != url) {
            this.history.push(url);
        }
        // Load the URL
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["iframeHandler"].loadUrl(url);
        this.historyUpdated();
    }
    /**
     * Go to a specific URL in the history via its index
     * @param {Integer} targetHistoryIndex
     */
    travelInTime(targetHistoryIndex) {
        // Do not proceed if the history does not have the target index.
        if (targetHistoryIndex == undefined || targetHistoryIndex < 0 || this.history[targetHistoryIndex] == undefined)
            return;
        // Make sure the history index is an integer
        targetHistoryIndex = parseInt(targetHistoryIndex);
        // Load the URL
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["iframeHandler"].loadUrl(this.history[targetHistoryIndex]);
        // Enable/disable back button
        if (this.history[targetHistoryIndex - 1] !== undefined) {
            this.enableButton($(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].backButtonSelector));
        }
        else {
            this.disableButton($(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].backButtonSelector));
        }
        // Enable/disable forward button
        if (this.history[targetHistoryIndex + 1] !== undefined) {
            this.enableButton($(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].forwardButtonSelector));
        }
        else {
            this.disableButton($(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].forwardButtonSelector));
        }
        // Update the current history index
        this.currentHistoryIndex = targetHistoryIndex;
        // Make necessary changes since the history is updated
        this.historyUpdated();
    }
    /**
     * Click handler for clear history button
     * @param {object} e Event
     */
    onClickClearHistory(e) {
        this.clearHistory();
    }
    /**
     * Clear the URL history
     */
    clearHistory() {
        this.history = [];
        this.currentHistoryIndex = null;
        this.disableButton($(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].backButtonSelector));
        this.disableButton($(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].forwardButtonSelector));
        this.disableButton($(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].refreshButtonSelector));
        this.historyUpdated();
    }
    /**
     * Called whenever the history is updated.
     */
    historyUpdated() {
        // Update sidebar's history section
        let html = '', activeIndex = this.currentHistoryIndex == null ? this.history.length - 1 : this.currentHistoryIndex;
        for (let i in this.history) {
            if (!this.history.hasOwnProperty(i))
                continue;
            html += '<li' + (i == activeIndex ? ' class="active" ' : '') + '><span class="url">' + this.history[i] + '</span></li>';
        }
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["sidebarHandler"].updateSectionContent('<ul>' + html + '</ul>', _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].sidebarSectionHistoryClass);
        // Save options
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["devTools"].saveState();
    }
    /**
     * Set URL input's value
     * @param {string} url
     */
    setAddressBarUrl(url) {
        $(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].urlInputSelector).val(url);
    }
    /**
     * Disable a button
     * @param {object} $button
     */
    disableButton($button) {
        $button.addClass("disabled");
    }
    /**
     * Enable a button
     * @param {object} $button
     */
    enableButton($button) {
        $button.removeClass("disabled");
    }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./scripts/dev-tools-ts/app/CSSSelectorToolbar.ts":
/*!********************************************************!*\
  !*** ./scripts/dev-tools-ts/app/CSSSelectorToolbar.ts ***!
  \********************************************************/
/*! exports provided: CSSSelectorToolbar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CSSSelectorToolbar", function() { return CSSSelectorToolbar; });
/* harmony import */ var _dev_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dev-tools */ "./scripts/dev-tools-ts/dev-tools.ts");
/* harmony import */ var _post_settings_ts_app_TestDataPreparer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../post-settings-ts/app/TestDataPreparer */ "./scripts/post-settings-ts/app/TestDataPreparer.ts");


class CSSSelectorToolbar {
    constructor() {
        this.testDataPreparer = _post_settings_ts_app_TestDataPreparer__WEBPACK_IMPORTED_MODULE_1__["TestDataPreparer"].getInstance();
    }
    /**
     * Update CSS selector input's value
     * @param {string} newValue
     */
    updateInput(newValue) {
        let $cssSelectorInput = this.getCssSelectorInput();
        $cssSelectorInput.val(newValue);
        // Flash the background color of the input
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["devTools"].flashBackground($cssSelectorInput);
    }
    /**
     * Click callback for test button in CSS selector toolbar
     * @param {object} e Event
     */
    onClickTest(e) {
        let $button = $(e.target), $input = this.getCssSelectorInput(), val = $input.val();
        if (val == undefined || !val.length)
            return;
        let $inputTestButtonBehavior = $(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].optUseTestButtonBehaviorSelector).first(), testButtonBehavior = $inputTestButtonBehavior.val(), testViaJS = testButtonBehavior != 'php', testViaPHP = testButtonBehavior != 'js';
        // Conduct PHP test
        if (testViaPHP) {
            // Conduct server-side test
            let data = $button.data("kdn"), $contents = _dev_tools__WEBPACK_IMPORTED_MODULE_0__["iframeHandler"].getIframeContents();
            // Remove hover class from the iframe content to show the unchanged results
            _dev_tools__WEBPACK_IMPORTED_MODULE_0__["iframeHandler"].clearHighlights();
            data["content"] = $contents.find("html").html();
            data["selector"] = val;
            data["url"] = _dev_tools__WEBPACK_IMPORTED_MODULE_0__["iframeHandler"].getCurrentUrl();
            data["formItemName"] = _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].cssInputId;
            data["serializedValues"] = $("<input/>").attr("name", _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].cssInputId + "[0][selector]").val(val).serialize();
            // Add settings to the data
            data = this.testDataPreparer.addSettingsToAjaxData(data);
            let $resultContainer = $(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].toolbarTestResultsContainerSelector).first(), $contentContainer = $(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].toolbarTestResultsContentContainerSelector).first();
            $resultContainer
                .removeClass("hidden")
                .addClass("loading");
            $contentContainer.html("");
            // Test the selector via PHP as well
            $.post(window.ajaxurl, {
                kdn_nonce: _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$kdnNonce.val(),
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
                _dev_tools__WEBPACK_IMPORTED_MODULE_0__["iframeHandler"].setIframeHeight();
            });
        }
        // Conduct JS test
        if (testViaJS) {
            // Clear the highlights
            _dev_tools__WEBPACK_IMPORTED_MODULE_0__["iframeHandler"].clearHighlights();
            // Highlight the elements inside iframe
            _dev_tools__WEBPACK_IMPORTED_MODULE_0__["iframeHandler"].highlight(val, true);
        }
    }
    /**
     * Click callback for clear highlights button in CSS selector toolbar
     * @param {object} e Event
     */
    onClearHighlights(e) {
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["iframeHandler"].clearHighlights();
    }
    /**
     * Click callback for remove elements button in CSS selector toolbar
     * @param {object} e Event
     */
    onRemoveElements(e) {
        let selector = this.getCssSelectorInput().val();
        if (selector == undefined || !selector.length)
            return;
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["iframeHandler"].getIframeContents().find(selector).remove();
    }
    /**
     * Click callback for show alternatives button in CSS selector toolbar
     * @param {object} e Event
     * @param {boolean} showSidebar True if the sidebar should be shown after the alternatives are computed. Default: true
     */
    onShowAlternatives(e, showSidebar) {
        let selector = this.getCssSelectorInput().val();
        // Do not proceed if there is not a valid selector
        if (selector == undefined || !selector.length)
            return;
        let $sectionAlternativeSelector = $(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].sidebarSelector + " ." + _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].sidebarSectionAlternativeSelectorsClass), currentSelector = $sectionAlternativeSelector.data("currentselector");
        // If current alternatives are not for this selector, compute the alternatives.
        if (currentSelector != selector) {
            // Get alternatives
            let alternatives = _dev_tools__WEBPACK_IMPORTED_MODULE_0__["devTools"].getAlternativeSelectors(selector);
            // Update sidebar's alternatives section
            _dev_tools__WEBPACK_IMPORTED_MODULE_0__["sidebarHandler"].updateAlternativeSelectors(alternatives);
            $sectionAlternativeSelector.data("currentselector", selector);
        }
        if (showSidebar == undefined || showSidebar) {
            // Show the sidebar
            _dev_tools__WEBPACK_IMPORTED_MODULE_0__["sidebarHandler"].onOpenSidebar(e);
        }
    }
    /**
     * Get input element storing the CSS selector
     * @returns {*|jQuery|HTMLElement}
     */
    getCssSelectorInput() {
        return $(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].cssInputSelector);
    }
    /**
     * Click handler for "use CSS selector" button
     */
    onClickUseCssSelector() {
        this.useSelector();
    }
    /**
     * Use the selector written in the CSS selector input element
     */
    useSelector() {
        if (_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$currentDevToolsButton == undefined || _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$currentDevToolsButton == null)
            return;
        let val = this.getCssSelectorInput().val();
        if (val == undefined || !val.length)
            return;
        // Assign the value to the target input
        let $targetInput = _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$currentDevToolsButton.closest('.input-group').find('input.css-selector');
        $targetInput.val(val);
        // Close the lightbox
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["devTools"].closeLightbox();
        // Flash the target input
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["devTools"].flashBackground($targetInput);
    }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./scripts/dev-tools-ts/app/DEVTools.ts":
/*!**********************************************!*\
  !*** ./scripts/dev-tools-ts/app/DEVTools.ts ***!
  \**********************************************/
/*! exports provided: DEVTools */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEVTools", function() { return DEVTools; });
/* harmony import */ var _dev_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dev-tools */ "./scripts/dev-tools-ts/dev-tools.ts");
/* harmony import */ var _post_settings_ts_app_TestDataPreparer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../post-settings-ts/app/TestDataPreparer */ "./scripts/post-settings-ts/app/TestDataPreparer.ts");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);



class DEVTools {
    constructor() {
        /**
         * Stores timeout function used to save the options
         * @type {null}
         */
        this.saveTimeout = null;
        /** Stores the position of the scroll when the dev tools window is opened */
        this.scrollPos = null;
        this.testDataPreparer = _post_settings_ts_app_TestDataPreparer__WEBPACK_IMPORTED_MODULE_1__["TestDataPreparer"].getInstance();
    }
    /**
     * Shows the dev tools lightbox with a content.
     * @param {string|null} content HTML. If null, the content will be loaded from the URL.
     * @param {string} url URL of the content
     */
    showLightboxWithContent(content, url) {
        let $devTools = jquery__WEBPACK_IMPORTED_MODULE_2___default()(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].devToolsContentSelector);
        // Show the lightbox with the content
        jquery__WEBPACK_IMPORTED_MODULE_2___default.a.featherlight($devTools, {
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
                if (_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$lightboxInstance) {
                    _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$lightboxInstance.css("display", "block");
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
        if (!_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$lightboxInstance) {
            _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$lightboxInstance = jquery__WEBPACK_IMPORTED_MODULE_2___default()(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].lightboxSelector);
            _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$lightboxInstance.addClass("instance");
        }
        // Hide the lightbox
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$lightboxInstance.css("display", "none");
        // Featherlight has a bug that changes 'tabindex' values of form elements with '-1'. This results in going to
        // address bar of the browser after hitting tab button in the keyboard. Here, we change 'tabindex' values of
        // all form elements with '0'. By this way, elements to be focused when hitting the tab key will be computed by
        // the browser considering the positions of the form elements. In other words, this fixes the problem. However,
        // since there are a lot of form elements in the page, this is not an efficient solution. But, it is better than
        // going to the address bar every time the tab key is hit.
        jquery__WEBPACK_IMPORTED_MODULE_2___default()('textarea, input, button, select').attr('tabindex', 0);
        // Restore the scroll position
        jquery__WEBPACK_IMPORTED_MODULE_2___default()(window).scrollTop(this.scrollPos);
    }
    onLightBoxAfterOpen(content, url) {
        // Get the current scroll position
        this.scrollPos = jquery__WEBPACK_IMPORTED_MODULE_2___default()(window).scrollTop();
        // Restore the state if this is the first time of the light box opening
        if (!_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$lightboxInstance)
            this.restoreState();
        /* LIGHTBOX TITLE */
        // If there is no lightbox title element inside the lightbox, add it.
        let $lightbox = jquery__WEBPACK_IMPORTED_MODULE_2___default()(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].lightboxSelector), $lightboxTitle = $lightbox.find(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].devToolsContentSelector + " > " + _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].lightboxTitleSelector);
        if ($lightboxTitle.length && !$lightbox.find('> ' + _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].lightboxTitleSelector).length) {
            $lightbox.append($lightboxTitle);
        }
        // Update the title
        this.updateTitle(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$currentDevToolsButton.closest("tr").find("label").first().html());
        // Assign the current CSS selector
        let $selectorInput = _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$currentDevToolsButton.closest(".input-group").find("input.css-selector").first();
        let currentSelector = '';
        if ($selectorInput.length && $selectorInput.val() != undefined)
            currentSelector = $selectorInput.val();
        jquery__WEBPACK_IMPORTED_MODULE_2___default()(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].cssInputSelector).first().val(currentSelector).trigger('change');
        /**/
        let urlInputVal = jquery__WEBPACK_IMPORTED_MODULE_2___default()(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].urlInputSelector).val();
        // If the content is null and there is no URL in the URL input, go to the target URL.
        if (content == null && (urlInputVal == undefined || !urlInputVal.length)) {
            _dev_tools__WEBPACK_IMPORTED_MODULE_0__["addressBar"].setAddressBarUrl(url);
            _dev_tools__WEBPACK_IMPORTED_MODULE_0__["addressBar"].go(url);
            // Otherwise, if the content is not null, set iframe content as the content.
        }
        else if (content != null) {
            _dev_tools__WEBPACK_IMPORTED_MODULE_0__["iframeHandler"].setIframeContent(content, url);
            // Otherwise, make sure CSS selectors are initialized
        }
        else {
            _dev_tools__WEBPACK_IMPORTED_MODULE_0__["iframeHandler"].initCssSelectors();
        }
        // Load the sidebar
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["sidebarHandler"].loadSidebar();
        // Set the options for current DEV tools button
        let data = _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$currentDevToolsButton.data("kdn");
        if (data != undefined) {
            // Target HTML tag
            jquery__WEBPACK_IMPORTED_MODULE_2___default()(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].optTargetHTMLTagSelector).first().val(data["targetTag"] != undefined ? data["targetTag"] : '').trigger('change');
        }
        // Do the things that should be done only once for a lightbox.
        if (!_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$lightboxInstance) {
            // Listen to resize events on the toolbar, since its size can change. Resize the iframe as well.
            jquery__WEBPACK_IMPORTED_MODULE_2___default()(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].toolbarSelector).resize(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["iframeHandler"].setIframeHeight);
            // Save options when an option input is changed
            jquery__WEBPACK_IMPORTED_MODULE_2___default()(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].optionsToolbarSelector).find(':input').on('change', (e) => {
                let $self = jquery__WEBPACK_IMPORTED_MODULE_2___default()(e.target);
                // Do not save after target HTML tag is changed.
                if ($self.hasClass(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].optTargetHTMLTagClass))
                    return;
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
    getSourceCode(url, data, done, fail, always) {
        // If the source code was cached before, use it.
        if (_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].urlCache.hasOwnProperty(url) && _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].urlCache[url] !== null) {
            done(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].urlCache[url]);
            always();
            return;
        }
        // If there was an unfinished XHR, abort it.
        if (_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].lastUnfinishedSourceCodeXHR) {
            _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].isAborted = true;
            _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].lastUnfinishedSourceCodeXHR.abort();
        }
        // Add URL to the data
        data["url"] = url;
        data["removeScripts"] = _dev_tools__WEBPACK_IMPORTED_MODULE_0__["optionsToolbar"].isRemoveScripts() ? 1 : 0;
        data["removeStyles"] = _dev_tools__WEBPACK_IMPORTED_MODULE_0__["optionsToolbar"].isRemoveStyles() ? 1 : 0;
        data["applyManipulationOptions"] = _dev_tools__WEBPACK_IMPORTED_MODULE_0__["optionsToolbar"].isApplyManipulationOptions() ? 1 : 0;
        data["cookies"] = jquery__WEBPACK_IMPORTED_MODULE_2___default()('input[name^=_cookies]').serialize();
        // Add settings to the data
        data = this.testDataPreparer.addSettingsToAjaxData(data);
        // Get the source code of the target URL via AJAX and call the callbacks
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].lastUnfinishedSourceCodeXHR = jquery__WEBPACK_IMPORTED_MODULE_2___default.a.post(window.ajaxurl, {
            kdn_nonce: _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$kdnNonce.val(),
            action: window.pageActionKey,
            data: data
        })
            .done(function (response) {
            // If this is aborted, do not proceed.
            if (_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].isAborted) {
                // Set isAborted as false to allow other requests to call 'done' function.
                _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].isAborted = false;
                return;
            }
            // Add the response to the URL cache
            _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].urlCache[url] = response;
            done(response);
        })
            .fail(fail)
            .always(function () {
            // Make the last unfinished source code XHR null, since it is finished.
            _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].lastUnfinishedSourceCodeXHR = null;
            always();
        });
    }
    /**
     * Get alternative CSS selectors for a CSS selector
     * @param {string} selector The CSS selector whose alternatives are needed
     */
    getAlternativeSelectors(selector) {
        // Make sure there is a valid selector
        if (selector == undefined || !selector || !selector.length)
            return;
        // Remove multiple spaces
        selector = selector.replace(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].multipleSpaceRegex, " ");
        // Get the parts of the selector
        let parts = selector.split(" "), $iframeContents = _dev_tools__WEBPACK_IMPORTED_MODULE_0__["iframeHandler"].getIframeContents(), $foundElements = $iframeContents.find(selector);
        let unwanted = ["body", "html"], idSelectors = [];
        parts = jquery__WEBPACK_IMPORTED_MODULE_2___default.a.map(parts, function (val, i) {
            // Push this part to ID selectors if it is an ID selector
            // Make sure this is not the last part
            if (val.indexOf("#") === 0 && i < parts.length - 1)
                idSelectors.push(val);
            // Remove unwanted parts
            return (jquery__WEBPACK_IMPORTED_MODULE_2___default.a.inArray(val, unwanted) !== -1) ? null : val;
        });
        let length = parts.length, last = parts[length - 1], possibleLastTag = $foundElements.length ? $foundElements.first().prop("tagName").toLowerCase() : null, newLast = null, holder, i, alternatives = [];
        //l(length);
        //l("Last: " + last);
        //l(idSelectors);
        // If the last part does not start with a tag, prepend the first found element's tag to it.
        if (possibleLastTag != null && !(/^\w/).test(last)) {
            newLast = possibleLastTag + last;
            alternatives.push(newLast);
        }
        // Add the last selector as an alternative as well
        alternatives.push(last);
        jquery__WEBPACK_IMPORTED_MODULE_2___default.a.map(idSelectors, function (idSelector, i) {
            alternatives.push(idSelector + " " + (newLast ? newLast : last));
        });
        let altSelector = '', altWithLast, altWithNewLast, nthChildRegex = /:nth-child[^)]+\)/g, nthChildRegexNoColon = /nth-child[^)]+\)/g, nthChildEndPosRegex = new RegExp("nth-child\\([0-9]+\\)(?:[^\\s]+|)", "g"), firstChildRegex = /:first-child/, lastChildRegex = /:last-child/, idRegex = new RegExp('\\[id="[^"]+"\\]|#[^$\\s.]+', "g"), matches;
        // Create alternatives by combining parts starting from the end
        for (i = length - 2; i >= 0; i--) {
            if (!parts.hasOwnProperty(i))
                continue;
            holder = parts[i];
            altSelector = holder + " " + altSelector;
            // CSS selectors should not start with ">". So, if this one is ">", let's get the previous part as well.
            if (holder == ">") {
                i--;
                if (i < 0)
                    break;
                holder = parts[i];
                altSelector = holder + " " + altSelector;
            }
            altWithLast = altSelector + " " + last;
            altWithNewLast = newLast ? (altSelector + " " + newLast) : null;
            // Use the created alternative selector with both last and newLast parts.
            alternatives.push(altWithLast);
            if (altWithNewLast)
                alternatives.push(altWithNewLast);
        }
        // A few more alternatives
        alternatives = jquery__WEBPACK_IMPORTED_MODULE_2___default.a.map(alternatives, (val) => {
            // Try to generate alternatives with last-child for each selector
            matches = this.matchRegExWithIndex(nthChildEndPosRegex, val);
            if (!matches)
                return val;
            // Iterate over "nth-child" matches in this selector
            jquery__WEBPACK_IMPORTED_MODULE_2___default.a.map(matches, function (mVal) {
                // Create partial selector by cutting the part of the selector coming after the current
                // "nth-child" match
                let end = parseInt(mVal[1]) + parseInt(mVal[0].length), newSelector = val, partialSelector = val.substring(0, end);
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
            if (val === undefined || val === 'undefined' || val === null || !val.length)
                return null;
            // Make sure there are no unwanted spaces
            return val.replace(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].multipleSpaceRegex, " ");
        });
        // If the last element has ID in it, add an alternative selector by removing the ID
        jquery__WEBPACK_IMPORTED_MODULE_2___default.a.map(alternatives, function (val) {
            let split = val.split(" ");
            if (split.length > 1) {
                let last = split[split.length - 1];
                if (last.indexOf("#") !== -1 || last.indexOf("id=") !== -1) {
                    // Remove the ID part
                    last = last.replace(idRegex, "");
                    // If the last part became empty and there is a possible last tag, prefer the possible last tag
                    // instead.
                    if (!last.length && possibleLastTag != null) {
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
        jquery__WEBPACK_IMPORTED_MODULE_2___default.a.map(alternatives, function (val) {
            alternatives.push(val.replace(nthChildRegex, ""));
            alternatives.push(val.replace(firstChildRegex, ""));
            alternatives.push(val.replace(lastChildRegex, ""));
            // All
            alternatives.push(val.replace(nthChildRegex, "").replace(firstChildRegex, "").replace(lastChildRegex, ""));
        });
        // Make sure alternatives are unique and they are sorted by length in ascending order
        alternatives = this.unique(alternatives)
            .sort(function (a, b) {
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
    getBestAlternativeSelector() {
        let $section = _dev_tools__WEBPACK_IMPORTED_MODULE_0__["sidebarHandler"].getSectionElement(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].sidebarSectionAlternativeSelectorsClass), alternativeObjects = $section.find("ul").first().data("alternatives"), best = null;
        if (alternativeObjects == undefined)
            return best;
        // Find the shortest selector that selects only 1 element.
        jquery__WEBPACK_IMPORTED_MODULE_2___default.a.map(alternativeObjects, function (val) {
            if (val.count == 1) {
                if (best == null) {
                    best = val.selector;
                    // If there is a best which does not contain an ID, but this one has an ID in it, use this one.
                }
                else if ((val.selector.indexOf("#") !== -1 || val.selector.indexOf("id=") !== -1) && best.indexOf("#") === -1 && best.indexOf("id=") === -1) {
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
    matchRegExWithIndex(regex, str) {
        let result = [], cursor = 0;
        if (str === undefined || str === 'undefined' || str === null || !str.length)
            return result;
        let matches = str.match(regex);
        if (!matches)
            return null;
        jquery__WEBPACK_IMPORTED_MODULE_2___default.a.map(matches, function (val) {
            cursor = str.indexOf(val, cursor);
            result.push([val, cursor]);
        });
        return result;
    }
    /**
     * Deletes cache of the URL
     * @param {string} url
     */
    invalidateUrlCache(url) {
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].urlCache[url] = null;
        // Invalidate current URL as well.
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["iframeHandler"].getIframe().data("currenturl", "");
    }
    /**
     * Invalidates all URL caches.
     */
    invalidateAllUrlCaches() {
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].urlCache = [];
    }
    /**
     * Flash the background color of an object
     * @param {object} $element Target element
     */
    flashBackground($element) {
        $element.stop().css("background-color", "#b8ea84")
            .animate({ backgroundColor: "#FFFFFF" }, 1000);
    }
    /**
     * Close the lightbox
     */
    closeLightbox() {
        jquery__WEBPACK_IMPORTED_MODULE_2___default.a.featherlight.current().close();
    }
    /**
     * Updates the lightbox title
     * @param {string} newTitle
     */
    updateTitle(newTitle) {
        jquery__WEBPACK_IMPORTED_MODULE_2___default()(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].lightboxTitleSelector).html(newTitle || "");
    }
    /**
     * Save options to the database
     */
    saveState() {
        // Use a timeout function to save the state to prevent unnecessary AJAX requests.
        // If there is a timeout, clear it.
        if (this.saveTimeout != null)
            clearTimeout(this.saveTimeout);
        // Start new timeout.
        this.saveTimeout = setTimeout(function () {
            //l("Save state");
            let $optionsToolbarInputs = jquery__WEBPACK_IMPORTED_MODULE_2___default()(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].optionsToolbarSelector).find(':input');
            let state = {
                options: {},
                history: _dev_tools__WEBPACK_IMPORTED_MODULE_0__["addressBar"].history,
                isHoverSelectActive: _dev_tools__WEBPACK_IMPORTED_MODULE_0__["optionsToolbar"].isHoverSelectActive() ? 1 : 0
            };
            // Prepare the options property
            let $self, val;
            $optionsToolbarInputs.each((i, el) => {
                $self = jquery__WEBPACK_IMPORTED_MODULE_2___default()(el);
                // Do not keep target HTML tag in the state.
                if ($self.hasClass(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].optTargetHTMLTagClass))
                    return;
                val = $self.attr("type") == "checkbox" ? ($self[0].checked ? 1 : 0) : $self.val();
                state.options[$self.attr("name")] = val;
            });
            // Get the previously saved state. If the same state is being saved, stop.
            if (_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$inputDevToolsState.val() == JSON.stringify(state)) {
                //l("trying to save the same state. stopped.");
                return;
            }
            //l(data);
            // Save it
            jquery__WEBPACK_IMPORTED_MODULE_2___default.a.post(window.ajaxurl, {
                kdn_nonce: _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$kdnNonce.val(),
                action: window.pageActionKey,
                data: {
                    cmd: 'saveDevToolsState',
                    postId: _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].postId,
                    state: state
                }
            })
                .done(function (response) {
                //l("saved");
                //l(response);
                // Update hidden input's value
                _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$inputDevToolsState.val(JSON.stringify(state));
            })
                .fail(function (response) {
                //l("failed");
                //l(response);
            });
        }, 1500);
    }
    /**
     * Restore the state from the hidden input element storing the previously saved state
     */
    restoreState() {
        //l("restore state");
        let stateInputVal = _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$inputDevToolsState.val();
        if (stateInputVal == undefined || !stateInputVal)
            return;
        let state = JSON.parse(stateInputVal);
        // Restore hover select state
        if (state.isHoverSelectActive == 1) {
            jquery__WEBPACK_IMPORTED_MODULE_2___default()(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].optHoverSelectSelector).removeClass("active").click();
        }
        else {
            jquery__WEBPACK_IMPORTED_MODULE_2___default()(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].optHoverSelectSelector).addClass("active").click();
        }
        // Restore history
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["addressBar"].history = state.history || [];
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["addressBar"].historyUpdated();
        // Restore options
        let $element, val;
        for (let i in state.options) {
            if (!state.options.hasOwnProperty(i))
                continue;
            val = state.options[i];
            $element = jquery__WEBPACK_IMPORTED_MODULE_2___default()("[name=" + i + "]");
            if ($element.attr("type") == "checkbox") {
                $element.prop("checked", val == 1);
            }
            else {
                $element.val(val);
            }
        }
    }
    /**
     * Removes class names that cannot be processed via PHP.
     * @param selector
     */
    removeImproperClassNames(selector) {
        return selector.replace(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].regexClassNameStartingWithDash, '');
    }
    /**
     * Changes class names defined with brackets so that they are defined with a dot.
     * @param selector
     * @returns {*}
     */
    unbracketClassNames(selector) {
        return selector.replace(new RegExp('\\[class="([^"]+)"\\]', 'g'), (match, classes) => {
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
    unique(a) {
        let result = [];
        jquery__WEBPACK_IMPORTED_MODULE_2___default.a.each(a, function (i, v) {
            if (jquery__WEBPACK_IMPORTED_MODULE_2___default.a.inArray(v, result) == -1)
                result.push(v);
        });
        return result;
    }
}


/***/ }),

/***/ "./scripts/dev-tools-ts/app/DevToolsVariables.ts":
/*!*******************************************************!*\
  !*** ./scripts/dev-tools-ts/app/DevToolsVariables.ts ***!
  \*******************************************************/
/*! exports provided: DevToolsVariables */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DevToolsVariables", function() { return DevToolsVariables; });
class DevToolsVariables {
    constructor() {
        this.postId = null;
        this.$inputDevToolsState = $('input[name=_dev_tools_state]').first();
        this.$currentDevToolsButton = null; // Stores the last clicked DEV tools button
        this.lightboxTitleSelector = '.lightbox-title';
        this.devToolsButtonSelector = '.kdn-dev-tools';
        this.devToolsContentContainerSelector = '.dev-tools-content-container';
        this.devToolsContentSelector = '.dev-tools-content';
        this.lightboxSelector = '.featherlight';
        this.lightboxContainerSelector = '.featherlight-content';
        this.toolbarSelector = this.lightboxContainerSelector + " " + this.devToolsContentSelector + " .toolbar";
        this.iframeSelector = this.lightboxContainerSelector + " " + this.devToolsContentSelector + " iframe.source";
        this.$kdnNonce = $("#kdn_nonce");
        // Hover class is added to the elements in the target page's source code when they are hovered
        this.hoverClass = "kdn-element-hovered";
        // Hover style will be added to the target page's source code. This can be used to assign styles to the hover class.
        //hoverStyle: ".kdn-element-hovered {-webkit-box-shadow: inset 0px 0px 2px 2px rgba(255,0,0,1); -moz-box-shadow: inset 0px 0px 2px 2px rgba(255,0,0,1);box-shadow: inset 0px 0px 2px 2px rgba(255,0,0,1);}"
        //hoverStyle: "img.kdn-element-hovered{border: 2px solid #ff4400 !important;} .kdn-element-hovered {top:0 !important;left:0 !important;right:0 !important;bottom:0 !important;background-color:rgba(255, 0, 0, 0.6) !important;z-index:9999 !important;-webkit-box-shadow: inset 0px 0px 2px 2px rgba(255,0,0,1) !important; -moz-box-shadow: inset 0px 0px 2px 2px rgba(255,0,0,1) !important;box-shadow: inset 0px 0px 2px 2px rgba(255,0,0,1) !important;}";
        this.hoverStyleSelector = "#iframe-style";
        // An array used to cache the source codes of the URLs
        this.urlCache = [];
        // Stores the instance of the lightbox to keep it as a singleton.
        this.$lightboxInstance = null;
        this.addressBarSelector = this.toolbarSelector + " .address-bar";
        this.backButtonSelector = this.addressBarSelector + " .back";
        this.forwardButtonSelector = this.addressBarSelector + " .forward";
        this.refreshButtonSelector = this.addressBarSelector + " .refresh";
        this.goButtonSelector = this.addressBarSelector + " .go";
        this.urlInputSelector = this.addressBarSelector + " input";
        this.urlInputId = '_dt_toolbar_url';
        // Selectors for CSS selector tools
        this.cssSelectorToolsContainerSelector = this.lightboxContainerSelector + ' .css-selector-tools';
        this.cssInputSelector = this.lightboxContainerSelector + ' .css-selector-input input';
        this.cssInputId = '_dt_toolbar_css_selector';
        this.cssTestSelector = this.lightboxContainerSelector + ' .css-selector-test';
        this.cssClearHighlightsSelector = this.lightboxContainerSelector + ' .css-selector-clear-highlights';
        this.cssRemoveElementsSelector = this.lightboxContainerSelector + ' .css-selector-remove-elements';
        this.cssShowAlternativesSelector = this.lightboxContainerSelector + ' .css-selector-show-alternatives';
        this.cssUseButtonSelector = this.lightboxContainerSelector + ' .css-selector-use';
        this.toolbarTestResultsContainerSelector = this.lightboxContainerSelector + ' .test-results';
        this.toolbarTestResultsContentContainerSelector = this.toolbarTestResultsContainerSelector + ' .content';
        this.iframeStatusSelector = this.lightboxContainerSelector + " .iframe-status";
        this.sidebarSelector = this.lightboxContainerSelector + " .sidebar";
        this.sidebarCloseSelector = this.sidebarSelector + " .sidebar-close";
        this.sidebarOpenSelector = '.sidebar-open';
        this.sidebarOpenedClass = 'opened';
        this.sidebarSectionClass = 'sidebar-section';
        this.sidebarSectionContentClass = 'section-content';
        this.sidebarSectionHistoryClass = 'history';
        this.sidebarSectionUsedSelectorsClass = 'used-selectors';
        this.sidebarSectionAlternativeSelectorsClass = 'alternative-selectors';
        this.sidebarSectionSelector = this.sidebarSelector + " ." + this.sidebarSectionClass;
        this.sidebarSectionTitleContainerSelector = this.sidebarSectionSelector + " .section-title";
        this.sidebarSectionTitleSelector = this.sidebarSectionTitleContainerSelector + " > span";
        this.sidebarSectionContentSelector = this.sidebarSectionSelector + " ." + this.sidebarSectionContentClass;
        this.btnClearHistorySelector = this.lightboxSelector + ' .clear-history';
        this.toggleExpandClass = 'toggleExpand';
        this.sidebarSectionToggleExpandSelector = this.sidebarSelector + ' .' + this.toggleExpandClass;
        this.sidebarSectionExpandedClass = 'expanded';
        this.settingsMetaBoxSelector = '.kdn-settings-meta-box';
        this.classCssSelector = 'selector';
        this.classUrl = 'url';
        this.classOptionsToolbar = 'options';
        this.optionsToolbarSelector = this.lightboxSelector + " ." + this.classOptionsToolbar;
        this.optHoverSelectSelector = this.optionsToolbarSelector + " .toggle-hover-select";
        this.optTargetHTMLTagClass = 'target-html-tag';
        this.optTargetHTMLTagSelector = this.optionsToolbarSelector + " ." + this.optTargetHTMLTagClass;
        this.optUseTestButtonBehaviorSelector = this.optionsToolbarSelector + " .test-button-behavior";
        this.optApplyManipulationOptionsSelector = this.optionsToolbarSelector + " .apply-manipulation-options";
        this.optUseImmediatelySelector = this.optionsToolbarSelector + " .use-immediately";
        this.optRemoveScriptsSelector = this.optionsToolbarSelector + " .remove-scripts";
        this.optRemoveStylesSelector = this.optionsToolbarSelector + " .remove-styles";
        /** Stores the last highlighted element */
        this.$lastHighlighted = null;
        this.multipleSpaceRegex = new RegExp("\\s{2,}", "g");
        this.regexClassNameStartingWithDash = new RegExp("\\.(-[^\\s.#\\[]+)", "g");
        this.bracketClassNameRegex = new RegExp('\\[class="([^"]+)"\\]', 'g');
        /** Stores the last XHR made for source code retrieval */
        this.lastUnfinishedSourceCodeXHR = null;
        this.isAborted = false;
    }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./scripts/dev-tools-ts/app/IFrameHandler.ts":
/*!***************************************************!*\
  !*** ./scripts/dev-tools-ts/app/IFrameHandler.ts ***!
  \***************************************************/
/*! exports provided: IFrameHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IFrameHandler", function() { return IFrameHandler; });
/* harmony import */ var _dev_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dev-tools */ "./scripts/dev-tools-ts/dev-tools.ts");
/* harmony import */ var _common_ts_enum_NotificationType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common-ts/enum/NotificationType */ "./scripts/common-ts/enum/NotificationType.ts");
/* harmony import */ var _common_ts_Notifier__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common-ts/Notifier */ "./scripts/common-ts/Notifier.ts");
/* harmony import */ var _common_ts_enum_NotificationPosition__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common-ts/enum/NotificationPosition */ "./scripts/common-ts/enum/NotificationPosition.ts");




class IFrameHandler {
    constructor() {
        this.hoverSelectActive = true;
        /**
         * Stores the current URL loaded into the iframe.
         * @type {null|string}
         */
        this.currentUrl = null;
    }
    /**
     * Update iframe status
     * @param status
     */
    updateStatus(status) {
        let $status = $(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].iframeStatusSelector).first();
        $status.html(status ? status : "");
        if (!status || !status.length) {
            $status.addClass("hidden");
        }
        else {
            $status.removeClass("hidden");
        }
        // Flash the background of the status element to indicate the change
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["devTools"].flashBackground($status);
    }
    /**
     * Highlight elements with a selector.
     * @param {string} selector CSS selector
     * @param {boolean} scroll Scroll to the top of the first highlighed element
     * @return {integer} Found element count
     */
    highlight(selector, scroll) {
        let $contents = this.getIframeContents();
        // First, remove current highlights.
        $contents.find("." + _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].hoverClass).removeClass(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].hoverClass);
        let foundCount = 0;
        // Now, highlight the target elements.
        try {
            let $foundElements = $contents.find(selector);
            $foundElements.addClass(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].hoverClass);
            // Scroll to the first found element
            if (scroll != undefined && scroll) {
                if ($foundElements.length > 0) {
                    let originalHoverSelectStatus = _dev_tools__WEBPACK_IMPORTED_MODULE_0__["optionsToolbar"].isHoverSelectActive();
                    this.activateHoverSelect(false);
                    $contents.find('body').stop().animate({
                        scrollTop: $foundElements.first().offset().top - $(window).height() / 4
                    }, 500, 'swing', () => {
                        if (originalHoverSelectStatus) {
                            setTimeout(() => {
                                this.activateHoverSelect(true);
                            }, 100);
                        }
                    });
                }
            }
            foundCount = $foundElements.length;
            // Assign the last highlighted element.
            _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$lastHighlighted = $foundElements.last();
        }
        catch (err) {
            foundCount = 0;
        }
        // Show found element count
        this.updateStatus(window.kdn.found + ": " + foundCount);
        return foundCount;
    }
    /**
     * Clear all highlights
     */
    clearHighlights() {
        let $contents = this.getIframeContents();
        // First, remove current highlights.
        $contents.find("." + _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].hoverClass).removeClass(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].hoverClass);
        // Clear the status
        this.updateStatus(null);
        // Invalidate the last highlighted element
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$lastHighlighted = null;
    }
    /**
     * Listen to the cursor movements in the iframe in the dev tools lightbox
     */
    listenToCursor() {
        let self = this;
        /**
         * Attaches events to the iframe elements and makes it possible interact with the iframe content
         */
        let iframeReadyCallback = () => {
            this.onIframeReady();
        };
        // Start listening to the events when the iframe is ready/loaded
        // The proper way is to listen to 'load' event. However, it is also important that the user can start
        // interacting with the iframe content as soon as iframe is ready. Hence, we listen both 'ready' and 'load'
        // events.
        self.getIframe()
            .ready(iframeReadyCallback)
            .load(iframeReadyCallback);
    }
    /**
     * Handles the things to be done when iframe is ready
     */
    onIframeReady() {
        // Get the contents inside the iframe so that we can assign listeners to them
        let $contents = this.getIframeContents();
        // This will be called when a hovered element is clicked
        let clickCallback = (e) => {
            e.preventDefault();
            e.stopPropagation();
            // Get the CSS selector for the element
            let element = e.target, $element = $(element), ignoredTags = ["html", "body"], ignoredAttrs = ["src", "alt", "target", "href", "title", "width", "height", "method", "dir"];
            $element.removeClass(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].hoverClass);
            let optimalSelectOptions = {
                // default reference
                //root: document,
                //skip: function(traverseNode) {
                //    // ignore select information of the element
                //    return traverseNode === element
                //},
                // define order of attribute processing
                priority: ['id', 'class', 'tag'],
                // define patterns which should't be included
                ignore: {
                    class: function (className) {
                        return className.indexOf("!") !== -1;
                    },
                    attribute: function (name, value, defaultPredicate) {
                        // exclude HTML5 data attributes
                        return $.inArray(name, ignoredAttrs) !== -1 ||
                            name.indexOf('/') !== -1 || // Ignore URLs
                            value.indexOf('/') !== -1 ||
                            name.indexOf('\\') !== -1 || // Ignore URLs
                            value.indexOf('\\') !== -1 ||
                            (/data-*/).test(name) ||
                            (/aria-*/).test(name) ||
                            defaultPredicate(name, value);
                    },
                    // define simplified ignore patterns as a boolean/string/number/regex
                    tag: function (name) {
                        return $.inArray(name, ignoredTags) !== -1;
                    }
                }
            };
            if ($element === undefined || $element === 'undefined' || $element === null || !$element.length)
                return;
            let selector = window.OptimalSelect.select($element[0], optimalSelectOptions);
            // OptimalSelect behaves in a weird way by starting the selector from "strong" element when there is
            // a "strong" element in the found selector. Below is a workaround for this problem.
            // If this element is in a "strong" element, get CSS selector for that "strong" element's parent and
            // prepend it to the first found selector.
            if (selector.startsWith("strong")) {
                let $targetElement = $element.closest("strong").parent(), strongParentSelector = window.OptimalSelect.select($targetElement[0], optimalSelectOptions);
                selector = strongParentSelector + " " + selector;
            }
            //l("Raw Selector: " + selector);
            selector = selector
                .replace(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].multipleSpaceRegex, " ") // Replace multiple spaces with single space
                .replace(/\\:/g, ':') // Replace \: with :
                .replace("nth-child(1)", "first-child") // Prefer first-child
                .replace(".kdn-element-hovered", "") // Remove hover class
            ;
            // Replace classes like [class="cls1 cls2"] with .cls1.cls2
            selector = _dev_tools__WEBPACK_IMPORTED_MODULE_0__["devTools"].unbracketClassNames(selector);
            // Remove improper class names
            selector = _dev_tools__WEBPACK_IMPORTED_MODULE_0__["devTools"].removeImproperClassNames(selector);
            let split = selector.split(" ");
            split = $.map(split, function (val, i) {
                // Remove values having ".\" or "!"
                return ((/^\.\\/g).test(val) || val.indexOf("!") !== -1) ? null : val;
            });
            selector = split.join(" ");
            //l("Selector: " + selector);
            // Update the CSS selector input
            _dev_tools__WEBPACK_IMPORTED_MODULE_0__["cssSelectorToolbar"].updateInput(selector);
            // Compute alternatives
            _dev_tools__WEBPACK_IMPORTED_MODULE_0__["cssSelectorToolbar"].onShowAlternatives(e, false);
            // Get the shortest alternative
            let shortestAlternative = _dev_tools__WEBPACK_IMPORTED_MODULE_0__["devTools"].getBestAlternativeSelector();
            // Update the CSS selector input
            if (shortestAlternative !== null) {
                _dev_tools__WEBPACK_IMPORTED_MODULE_0__["cssSelectorToolbar"].updateInput(shortestAlternative);
            }
            // Trigger keyup on CSS selector input to update highlights
            $(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].cssInputSelector).keyup();
            // If the user wants to use the first found selector, do so.
            if (_dev_tools__WEBPACK_IMPORTED_MODULE_0__["optionsToolbar"].isUseImmediately()) {
                $(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].cssUseButtonSelector).click();
            }
            return selector;
        };
        // Add the hover style to the iframe if it is not already added.
        if (!$contents.find(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].hoverStyleSelector).length) {
            $contents.find("head").append($(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].hoverStyleSelector)[0].outerHTML);
        }
        // Keep the last hovered element so that we can remove the styling we applied to it.
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$lastHighlighted = null;
        let $allElements = $contents.find("*");
        $allElements
            .off('click')
            .off('hover')
            // Handle click events
            .on('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            // If there is a highlighted element, retarget the click to that element.
            if (_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$lastHighlighted != null && e.target != _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$lastHighlighted[0]) {
                e.target = _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$lastHighlighted[0];
                clickCallback(e);
                return;
            }
            // Otherwise, go to the closest anchor's URL if the hover select is deactivated.
            if (!_dev_tools__WEBPACK_IMPORTED_MODULE_0__["optionsToolbar"].isHoverSelectActive()) {
                let $target = $(e.target);
                _dev_tools__WEBPACK_IMPORTED_MODULE_0__["addressBar"].go($target.closest('a').attr("href"));
            }
        })
            // Listen to the hover events for all elements
            .hover((e) => {
            let $element = $(e.target);
            // It should be possible to target an HTML tag. For example, if the target tag is 'a',
            // when an element is hovered, the closest 'a' tag should be hovered instead. So, $element
            // should be the best possible element having the target HTML tag.
            if (_dev_tools__WEBPACK_IMPORTED_MODULE_0__["optionsToolbar"].targetHTMLTagSelector != null && $element.prop("tagName").toLowerCase() != _dev_tools__WEBPACK_IMPORTED_MODULE_0__["optionsToolbar"].targetHTMLTagSelector) {
                let $closestInner = $element.find(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["optionsToolbar"].targetHTMLTagSelector).first(), $closestOuter = $element.closest(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["optionsToolbar"].targetHTMLTagSelector), elParentCount = $element.parents().length;
                // If there are two target elements found, keep the closest one.
                if ($closestInner.length && $closestOuter.length) {
                    if ($closestInner.parents().length - elParentCount < elParentCount - $closestOuter.parents().length) {
                        $element = $closestInner;
                    }
                    else {
                        $element = $closestOuter;
                    }
                    // If there is only the closest inner element, use it.
                }
                else if ($closestInner.length) {
                    $element = $closestInner;
                    // If there is only the closest outer element, use it.
                }
                else if ($closestOuter.length) {
                    $element = $closestOuter;
                    // Otherwise, do not proceed, since there are no target elements found.
                }
                else {
                    //// Prevent clicking the links.
                    //$element.click(function($e) {
                    //    $e.preventDefault();
                    //});
                    return;
                }
            }
            // Do not proceed if hover select is not active
            if (!this.hoverSelectActive) {
                //// Prevent clicking the links.
                //$element.click(function($e) {
                //    $e.preventDefault();
                //});
                if (_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$lastHighlighted != null) {
                    _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$lastHighlighted.off('click');
                    _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$lastHighlighted = null;
                }
                return;
            }
            // If there was a hovered element, clear its click callback and remove hover class from it.
            if (_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$lastHighlighted) {
                _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$lastHighlighted
                    .removeClass(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].hoverClass)
                    .off('click');
            }
            // Add the hover class to the currently hovered element and assign the click callback.
            $element
                .addClass(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].hoverClass)
                .click(e => clickCallback(e));
            // We are done with the currently hovered element. Set it as last hovered element.
            _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$lastHighlighted = $element;
        });
    }
    /**
     * Listen to the keyboard events from inside the iframe
     */
    listenToKeyboard() {
        let self = this;
        let readyCallback = function () {
            // Get the iframe's document
            let iframe = self.getIframe()[0], doc = iframe.contentWindow.document;
            // Listen to the keydown events inside the iframe document
            $(doc).on('keydown', function (e) {
                _dev_tools__WEBPACK_IMPORTED_MODULE_0__["sidebarHandler"].handleKeyPress(e);
            });
        };
        // Call the callback when the iframe is ready and loaded.
        self.getIframe()
            .ready(readyCallback)
            .load(readyCallback);
    }
    /**
     * If there is a CSS selector already defined by the user, tries to find and highlight the element in the iframe.
     * If there is no CSS selector defined by the user and there are target CSS selectors for the current DEV tools
     * button, tries to find elements by using those selectors and highlight them.
     */
    initCssSelectors() {
        // Do everything in a callback so that we can attach the callback to multiple events.
        let callback = () => {
            let currentCssSelectorVal = _dev_tools__WEBPACK_IMPORTED_MODULE_0__["cssSelectorToolbar"].getCssSelectorInput().val(), foundCount = 0;
            // If current CSS selector exists, try to highlight it.
            if (currentCssSelectorVal != undefined && currentCssSelectorVal.length) {
                foundCount = this.highlight(currentCssSelectorVal, true);
                // Otherwise, use target CSS selectors if they exist
            }
            else {
                // Get the button data
                let buttonData = _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].$currentDevToolsButton.data("kdn");
                if (buttonData == undefined)
                    return;
                // Get target selectors
                let targetSelectors = buttonData["targetCssSelectors"];
                // Do not proceed if target CSS selectors do not exist.
                if (targetSelectors == undefined || !targetSelectors.length)
                    return;
                // Now, try to find the elements with the selectors one by one.
                for (let i in targetSelectors) {
                    if (!targetSelectors.hasOwnProperty(i))
                        continue;
                    let selector = targetSelectors[i];
                    // We've found at least one match.
                    foundCount = this.highlight(selector, true);
                    if (foundCount > 0) {
                        // Set the CSS input and highlight the found elements
                        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["cssSelectorToolbar"].updateInput(selector);
                        // Notify the user
                        _common_ts_Notifier__WEBPACK_IMPORTED_MODULE_2__["Notifier"].getInstance().notifyRegular(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["cssSelectorToolbar"].getCssSelectorInput(), window.kdn.css_selector_found, _common_ts_enum_NotificationType__WEBPACK_IMPORTED_MODULE_1__["NotificationType"].SUCCESS, _common_ts_enum_NotificationPosition__WEBPACK_IMPORTED_MODULE_3__["NotificationPosition"].BOTTOM);
                        // One match is enough. Do not proceed.
                        return;
                    }
                }
            }
        };
        // Call the callback when the iframe is ready and loaded.
        this.getIframe()
            .ready(callback)
            .load(callback);
    }
    /**
     * Get the iframe jQuery element
     * @returns {*|jQuery|HTMLElement}
     */
    getIframe() {
        return $(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].iframeSelector);
    }
    /**
     * Get contents of the iframe.
     * @returns {*|{xml, html, json}|{script}}
     */
    getIframeContents() {
        return this.getIframe().contents();
    }
    /**
     * Get current URL loaded into the iframe.
     * @returns {null|string|string|*}
     */
    getCurrentUrl() {
        return this.currentUrl;
    }
    /**
     * Load a URL into the iframe
     * @param {string} url
     */
    loadUrl(url) {
        // Make sure the URL is valid
        if (url == undefined || !url || !url.length || url.indexOf("http") !== 0)
            return;
        console.log("Load URL: " + url);
        this.currentUrl = url;
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["addressBar"].setAddressBarUrl(url);
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["addressBar"].enableButton($(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].refreshButtonSelector));
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["addressBar"].historyUpdated();
        if (_dev_tools__WEBPACK_IMPORTED_MODULE_0__["addressBar"].currentHistoryIndex == 0) {
            _dev_tools__WEBPACK_IMPORTED_MODULE_0__["addressBar"].disableButton($(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].backButtonSelector));
        }
        else if (_dev_tools__WEBPACK_IMPORTED_MODULE_0__["addressBar"].history.length > 1) {
            _dev_tools__WEBPACK_IMPORTED_MODULE_0__["addressBar"].enableButton($(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].backButtonSelector));
        }
        // Indicate the URL is being loaded
        let $urlInput = $(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].urlInputSelector);
        $urlInput.addClass("loading");
        // Load the URL
        let data = $(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].devToolsButtonSelector).data("kdn");
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["devTools"].getSourceCode(url, data, 
        // Done
        (response) => {
            // Do not proceed if the response is not valid.
            if (response == undefined || response == null || response.html == undefined || !response.html.length) {
                console.log("Request succeeded. Getting source code was not successful. Response:");
                console.log(response);
                // Show information messages, if there are any.
                if (response.infoView !== undefined && response.infoView !== null && response.infoView !== 'undefined') {
                    // If there is a style URL, inject it to the iframe.
                    let styleUrl = response.infoStyleUrl || null;
                    let view = '';
                    if (styleUrl !== null) {
                        view = '<html><head><link rel="stylesheet" href="' + styleUrl + '" type="text/css"></head><body>' + response.infoView + '</body></html>';
                    }
                    else {
                        view = response.infoView;
                    }
                    this.setIframeContent(view, url);
                }
                return;
            }
            // Refresh the content
            this.setIframeContent(response.html, url);
        }, 
        // Fail
        function (response) {
            if (response.statusText == 'abort')
                return;
            console.log("Request failed. Getting source code was not successful. Response:");
            console.log(response);
        }, 
        // Always
        function () {
            // Indicate the process has finished.
            $urlInput.removeClass("loading");
        });
    }
    /**
     * Set content of the iframe in the lightbox. The content will be interacted with.
     * @param {string} content HTML
     * @param {string} url URL of the content
     */
    setIframeContent(content, url) {
        let $iframe = $(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].iframeSelector).first(), iframe = $iframe[0], iframedoc = iframe.contentDocument || iframe.contentWindow.document, currentUrl = $iframe.data("currenturl");
        // Do not proceed if the same URL is tried to be loaded, since its source code are already inside the iframe.
        if (currentUrl != undefined && currentUrl == url)
            return;
        //iframedoc.body.innerHTML = content;
        iframedoc.open();
        iframedoc.write(content);
        iframedoc.close();
        this.setIframeHeight();
        $iframe.data("currenturl", url);
        // Listen to the cursor movements
        this.listenToCursor();
        // Listen to the keyboard
        this.listenToKeyboard();
        // Initialize selectors. You can read method description to better understand what it does.
        this.initCssSelectors();
    }
    /**
     * Sets the height of the iframe so that it fills the remaining space inside of the lightbox
     */
    setIframeHeight() {
        let $toolbar = $(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].toolbarSelector).first(), toolbarHeight = $toolbar.innerHeight(), $iframe = $(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].iframeSelector).first();
        $iframe.css("height", "calc(100% - " + toolbarHeight + "px)");
    }
    /**
     * Activate/deactivate hover select
     * @param {boolean} active
     */
    activateHoverSelect(active) {
        this.hoverSelectActive = active;
    }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./scripts/dev-tools-ts/app/OptionsToolbar.ts":
/*!****************************************************!*\
  !*** ./scripts/dev-tools-ts/app/OptionsToolbar.ts ***!
  \****************************************************/
/*! exports provided: OptionsToolbar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OptionsToolbar", function() { return OptionsToolbar; });
/* harmony import */ var _dev_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dev-tools */ "./scripts/dev-tools-ts/dev-tools.ts");

class OptionsToolbar {
    constructor() {
        this.targetHTMLTagSelector = null;
    }
    /**
     * Change handler for target HTML tag input
     * @param {object} e Event
     */
    onChangeTargetHTMLTagInput(e) {
        let val = $(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].optTargetHTMLTagSelector).val();
        // If there is no value, set the target HTML selector as null.
        if (val == undefined || !val.length) {
            this.targetHTMLTagSelector = null;
            return;
        }
        // Otherwise, get the part until space and trim it to clear any whitespace.
        this.targetHTMLTagSelector = $.trim(val.split(" ")[0]);
    }
    /**
     * Callback handling the click events on toggle hover select button
     * @param {object} e Event
     */
    onClickToggleHoverSelect(e) {
        let $optionButton = $(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].optHoverSelectSelector).first();
        $optionButton.toggleClass("active");
        // Activate/deactivate hover select in the iframe
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["iframeHandler"].activateHoverSelect($optionButton.hasClass("active"));
        // Save options
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["devTools"].saveState();
    }
    /**
     * Check if hover select is active
     * @returns {boolean|*}
     */
    isHoverSelectActive() {
        let $optionButton = $(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].optHoverSelectSelector).first();
        return $optionButton.hasClass("active");
    }
    /**
     * Check if "apply manipulation options" is active
     * @returns {*}
     */
    isApplyManipulationOptions() {
        return $(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].optApplyManipulationOptionsSelector)[0].checked;
    }
    /**
     * Check if "use immediately" is active
     * @returns {*}
     */
    isUseImmediately() {
        return $(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].optUseImmediatelySelector)[0].checked;
    }
    /**
     * Check if scripts should be removed
     * @returns {*}
     */
    isRemoveScripts() {
        return $(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].optRemoveScriptsSelector)[0].checked;
    }
    /**
     * Check if styles should be removed
     * @returns {*}
     */
    isRemoveStyles() {
        return $(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].optRemoveStylesSelector)[0].checked;
    }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./scripts/dev-tools-ts/app/SidebarHandler.ts":
/*!****************************************************!*\
  !*** ./scripts/dev-tools-ts/app/SidebarHandler.ts ***!
  \****************************************************/
/*! exports provided: SidebarHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarHandler", function() { return SidebarHandler; });
/* harmony import */ var _dev_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dev-tools */ "./scripts/dev-tools-ts/dev-tools.ts");

class SidebarHandler {
    constructor() {
        this.preventHoverEvent = false;
    }
    /**
     * Loads the sidebar
     */
    loadSidebar() {
        this.onUpdateAllUsedSelectors(null);
    }
    /**
     * Update alternative CSS selectors section of the sidebar
     * @param {Array} alternatives An array of CSS selectors
     * @return {Array} An array of objects with each storing an alternative selector and number of elements found
     * via that selector.
     */
    updateAlternativeSelectors(alternatives) {
        let preparedHtml = '', $contents = _dev_tools__WEBPACK_IMPORTED_MODULE_0__["iframeHandler"].getIframeContents(), alternativeObjects = [], o, count;
        for (let i in alternatives) {
            if (!alternatives.hasOwnProperty(i))
                continue;
            count = $contents.find(alternatives[i]).length;
            if (count < 1)
                continue;
            o = {
                selector: alternatives[i],
                count: count
            };
            alternativeObjects.push(o);
            preparedHtml += this.getCssSelectorListItemHtml(o);
        }
        // Update the sidebar section
        this.updateSectionContent("<ul data-alternatives='" + JSON.stringify(alternativeObjects) + "'>" + preparedHtml + "</ul>", _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].sidebarSectionAlternativeSelectorsClass);
        return alternativeObjects;
    }
    /**
     * Update all used selectors section of the sidebar
     * @param {object} e Event
     */
    onUpdateAllUsedSelectors(e) {
        let allSelectors = [], $self, name, val, valCounter = [];
        // Find all used CSS selectors
        $(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].settingsMetaBoxSelector).find("input.css-selector").each((i, el) => {
            $self = $(el);
            name = $self.attr("name");
            if (name.indexOf("selector") !== -1) {
                val = $self.val();
                if (val != undefined && val.length) {
                    if (valCounter.hasOwnProperty(val)) {
                        valCounter[val] += 1;
                    }
                    else {
                        allSelectors.push(val);
                        valCounter[val] = 1;
                    }
                }
            }
        });
        let preparedSelectors = [], current, preparedHtml = '';
        for (let i in allSelectors) {
            if (allSelectors.hasOwnProperty(i)) {
                val = allSelectors[i];
                current = {
                    count: valCounter[val],
                    selector: val
                };
                preparedSelectors.push(current);
                preparedHtml += this.getCssSelectorListItemHtml(current);
            }
        }
        // Update the sidebar section
        this.updateSectionContent("<ul>" + preparedHtml + "</ul>", _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].sidebarSectionUsedSelectorsClass);
    }
    /**
     * Update the content of a section.
     * @param {string} html New HTML for the section content
     * @param {string} sectionClass Target class name
     */
    updateSectionContent(html, sectionClass) {
        let $section = this.getSectionElement(sectionClass), $content = $section.find("." + _dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].sidebarSectionContentClass).first();
        // Flash the content element with color
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["devTools"].flashBackground($section);
        $content.html(html);
    }
    /**
     * Get section element via a section class.
     * @param {string} sectionClass
     * @returns {*|jQuery|HTMLElement}
     */
    getSectionElement(sectionClass) {
        return $(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].sidebarSelector + " ." + sectionClass);
    }
    /**
     * Get list item HTML code for a CSS selector
     * @param {object} object The object that can be set as "data-selector" attribute's value. This has to have
     *                        "selector" property. It can also contain "count" property that will be shown next to
     *                        the selector.
     * @return {string}
     */
    getCssSelectorListItemHtml(object) {
        let count = object.count ? "<i class='count'>(" + object.count + ")</i>" : '';
        return "<li><span class='selector' data-selector='" + JSON.stringify(object) + "'>" + object.selector + count + "</span></li>";
    }
    /**
     * Callback that can handle click events of CSS selectors. The element should have 'data-selector' attr.
     * @param {object} e Event
     */
    onClickCssSelector(e) {
        let $self = $(e.target), selectorData = this.getCssSelectorData($self);
        if (!selectorData)
            return;
        // Copy the selector to the CSS selector input
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["cssSelectorToolbar"].updateInput(selectorData.selector);
        // Test the selector
        $(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].cssTestSelector).click();
        // Close the sidebar
        $(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].sidebarCloseSelector).click();
        // When mouse is moved after the sidebar is closed, hover event still fires on the clicked element.
        // This causes unwanted scroll animations. Below boolean logic fixes this.
        this.preventHoverEvent = true;
    }
    /**
     * Callback that can handle click events of URLs.
     * @param {object} e Event
     */
    onClickHistoryUrl(e) {
        let $element = $(e.target), url = $element.text();
        // Do not proceed if the URL is not valid.
        if (url == undefined || !url.length)
            return;
        // Find the index of the URL in the list
        let index = $element.closest("ul").find("li").index($element.closest("li"));
        // If the index is found
        if (index != null && index > -1) {
            // Load the URL and arrange forward and back button statuses.
            _dev_tools__WEBPACK_IMPORTED_MODULE_0__["addressBar"].travelInTime(index);
        }
    }
    /**
     * Callback that can handle hover events of CSS selectors. The element should have 'data-selector' attr.
     * @param {object} e Event
     */
    onHoverCssSelector(e) {
        if (this.preventHoverEvent) {
            this.preventHoverEvent = false;
            return;
        }
        let $self = $(e.target), selectorData = this.getCssSelectorData($self);
        if (!selectorData)
            return;
        // Highlight the hovered CSS selector in iframe
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["iframeHandler"].clearHighlights();
        _dev_tools__WEBPACK_IMPORTED_MODULE_0__["iframeHandler"].highlight(selectorData.selector, true);
    }
    /**
     * Get CSS selector data of a CSS selector element. The element should have "data-selector" attr and this attr
     * should have 'selector' property.
     * @param $element
     * @returns {null|object} If found, an object definitely having 'selector' property.
     */
    getCssSelectorData($element) {
        let selectorData = $element.data("selector");
        return selectorData == undefined || !selectorData.hasOwnProperty('selector') ? null : selectorData;
    }
    /**
     * Callback that can handle close button clicks
     * @param e
     */
    onCloseSidebar(e) {
        let $sidebar = this.getSidebar();
        $sidebar.removeClass(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].sidebarOpenedClass);
        // Show the open button
        $(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].sidebarOpenSelector).removeClass("hidden");
    }
    /**
     * Callback that can handle open button clicks
     * @param e
     */
    onOpenSidebar(e) {
        let $sidebar = this.getSidebar();
        $sidebar.addClass(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].sidebarOpenedClass);
        // Hide the open button
        $(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].sidebarOpenSelector).addClass("hidden");
    }
    /**
     * Callback that can handle expand/collapse sidebar section clicks
     * @param e
     */
    onToggleExpand(e) {
        let $button = $(e.target), expanded = $button.hasClass(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].sidebarSectionExpandedClass), $section = $button.closest(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].sidebarSectionSelector), $sectionContent = $button.closest(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].sidebarSectionContentSelector);
        $section.toggleClass(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].sidebarSectionExpandedClass);
        $button
            .toggleClass(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].sidebarSectionExpandedClass)
            .toggleClass("dashicons-arrow-down")
            .toggleClass("dashicons-arrow-up");
    }
    /**
     * Get the sidebar element
     * @returns {*|jQuery|HTMLElement}
     */
    getSidebar() {
        return $(_dev_tools__WEBPACK_IMPORTED_MODULE_0__["dtv"].sidebarSelector);
    }
    /**
     * Handles key presses related to the sidebar
     * @param {object} e Event
     */
    handleKeyPress(e) {
        // Left key opens the sidebar
        if (e.which == 37)
            this.onOpenSidebar(e);
        // Right key closes the sidebar
        if (e.which == 39)
            this.onCloseSidebar(e);
    }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./scripts/dev-tools-ts/dev-tools.ts":
/*!*******************************************!*\
  !*** ./scripts/dev-tools-ts/dev-tools.ts ***!
  \*******************************************/
/*! exports provided: dtv, devTools, iframeHandler, addressBar, cssSelectorToolbar, optionsToolbar, sidebarHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(jQuery) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dtv", function() { return dtv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "devTools", function() { return devTools; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "iframeHandler", function() { return iframeHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addressBar", function() { return addressBar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssSelectorToolbar", function() { return cssSelectorToolbar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "optionsToolbar", function() { return optionsToolbar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sidebarHandler", function() { return sidebarHandler; });
/* harmony import */ var _app_DevToolsVariables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/DevToolsVariables */ "./scripts/dev-tools-ts/app/DevToolsVariables.ts");
/* harmony import */ var _app_AddressBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/AddressBar */ "./scripts/dev-tools-ts/app/AddressBar.ts");
/* harmony import */ var _app_CSSSelectorToolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/CSSSelectorToolbar */ "./scripts/dev-tools-ts/app/CSSSelectorToolbar.ts");
/* harmony import */ var _app_DEVTools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/DEVTools */ "./scripts/dev-tools-ts/app/DEVTools.ts");
/* harmony import */ var _app_IFrameHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app/IFrameHandler */ "./scripts/dev-tools-ts/app/IFrameHandler.ts");
/* harmony import */ var _app_OptionsToolbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app/OptionsToolbar */ "./scripts/dev-tools-ts/app/OptionsToolbar.ts");
/* harmony import */ var _app_SidebarHandler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app/SidebarHandler */ "./scripts/dev-tools-ts/app/SidebarHandler.ts");







/*
 * GLOBAL VARIABLES
 */
let 
/** Stores variables for developer tools. The name is the short for "dev tools vars". */
dtv, 
// Define objects
devTools, iframeHandler, addressBar, cssSelectorToolbar, optionsToolbar, sidebarHandler;
jQuery(function ($) {
    /*
     * DEFINE REQUIRED VARIABLES
     */
    dtv = new _app_DevToolsVariables__WEBPACK_IMPORTED_MODULE_0__["DevToolsVariables"]();
    /*
     * INITIALIZE OBJECTS
     */
    devTools = new _app_DEVTools__WEBPACK_IMPORTED_MODULE_3__["DEVTools"]();
    iframeHandler = new _app_IFrameHandler__WEBPACK_IMPORTED_MODULE_4__["IFrameHandler"]();
    addressBar = new _app_AddressBar__WEBPACK_IMPORTED_MODULE_1__["AddressBar"]();
    cssSelectorToolbar = new _app_CSSSelectorToolbar__WEBPACK_IMPORTED_MODULE_2__["CSSSelectorToolbar"]();
    optionsToolbar = new _app_OptionsToolbar__WEBPACK_IMPORTED_MODULE_5__["OptionsToolbar"]();
    sidebarHandler = new _app_SidebarHandler__WEBPACK_IMPORTED_MODULE_6__["SidebarHandler"]();
    /*
     * HANDLE USER EVENTS
     */
    /**
     * Show the developer tools lightbox when its button is clicked
     */
    $(document).on('click', dtv.devToolsButtonSelector, function (e) {
        e.preventDefault();
        let $self = $(e.target), data = $self.data("kdn"), urlSelector = null, $contentContainer = $(dtv.devToolsContentContainerSelector);
        // Assign the post ID.
        dtv.postId = $contentContainer.data("kdn")["postId"];
        // Assign the current DEV tools button.
        dtv.$currentDevToolsButton = $self;
        // Get the URL selector
        if (data["urlSelector"] != undefined)
            urlSelector = data["urlSelector"];
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
    $(document).on('click', dtv.sidebarSectionTitleSelector, function () {
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
        let $self = $(e.target), val = $self.val();
        // Do not proceed if the value is not valid.
        if (val == undefined || !val.length) {
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
        if ($(e.target).is(':input')) {
            let $target = $(e.target);
            if (e.which == 13) {
                // If the enter is pressed in CSS input, press the test button.
                if ($target.attr("id") == dtv.cssInputId)
                    $(dtv.cssTestSelector).click();
                // If the enter is pressed in URL input, press the go button.
                if ($target.attr("id") == dtv.urlInputId)
                    $(dtv.goButtonSelector).click();
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


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./scripts/post-settings-ts/app/PostSettingsVariables.ts":
/*!***************************************************************!*\
  !*** ./scripts/post-settings-ts/app/PostSettingsVariables.ts ***!
  \***************************************************************/
/*! exports provided: PostSettingsVariables */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostSettingsVariables", function() { return PostSettingsVariables; });
class PostSettingsVariables {
    constructor() {
        this.$containerMetaBox = $('.kdn-settings-meta-box');
        this.$containerTabs = $('.kdn-settings-meta-box > .nav-tab-wrapper');
        this.$form = $("#post");
        this.$errorAlert = $("#kdn-alert");
        this.$kdnNonce = $("#kdn_nonce");
        this.$adminBar = $("#wpadminbar");
        this.selectorCategoryMap = "#category-map";
        this.selectorTabMain = "#tab-main";
        this.selectorTabPost = "#tab-post";
        this.selectorTabCategory = "#tab-category";
        this.selectorTabGsPost = "#tab-gs-post";
        this.selectorTabGeneralSettings = "#tab-general-settings";
        this.selectorTestButton = '.kdn-test';
        this.selectorInputContainerPasswords = '.input-container-passwords';
        this.selectorLoadGeneralSettingsButton = '#btn-load-general-settings';
        this.selectorClearGeneralSettingsButton = '#btn-clear-general-settings';
        this.selectorInputImport = '#_post_import_settings';
        this.selectorLoadTranslationLanguages = '.load-languages';
        this.selectorInputURLHash = "input[name='url_hash']";
        this.inputNameCookies = '_cookies';
        this.baseHtmlManipulationInputNames = [
            'find_replace_raw_html',
            'find_replace_first_load',
            'find_replace_element_attributes',
            'exchange_element_attributes',
            'remove_element_attributes',
            'find_replace_element_html',
            'unnecessary_element_selectors'
        ];
        this.selectorOriginalTestResults = '.original-results';
        this.selectorButtonSeeUnmodifiedTestResults = this.selectorOriginalTestResults + ' .see-unmodified-results';
        this.selectorInvalidateCacheButton = '.invalidate-cache-for-this-url';
        this.selectorInvalidateAllCachesButton = '.invalidate-all-test-url-caches';
        this.selectorQuickSaveButton = '.quick-save-container .quick-save';
        this.selectorExportSettingsTextArea = '#_post_export_settings';
        this.clsHasError = 'has-error';
        this.$inputAction = $("#hiddenaction");
        this.infoTextsHidden = true;
        this.classFixed = 'kdn-fixed';
        this.selectorFixable = '.fixable';
        this.selectorCheckboxFixTabs = '#_fix_tabs';
        this.selectorCheckboxFixContentNavigation = '#_fix_content_navigation';
    }
    /**
     * This class is a singleton. Get the instance with this method.
     */
    static getInstance() {
        if (this.INSTANCE === null) {
            this.INSTANCE = new PostSettingsVariables();
        }
        return this.INSTANCE;
    }
}
PostSettingsVariables.INSTANCE = null;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./scripts/post-settings-ts/app/TestDataPreparer.ts":
/*!**********************************************************!*\
  !*** ./scripts/post-settings-ts/app/TestDataPreparer.ts ***!
  \**********************************************************/
/*! exports provided: TestDataPreparer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestDataPreparer", function() { return TestDataPreparer; });
/* harmony import */ var _common_ts_Notifier__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common-ts/Notifier */ "./scripts/common-ts/Notifier.ts");
/* harmony import */ var _PostSettingsVariables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PostSettingsVariables */ "./scripts/post-settings-ts/app/PostSettingsVariables.ts");
/* harmony import */ var _common_ts_Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common-ts/Utils */ "./scripts/common-ts/Utils.ts");



class TestDataPreparer {
    constructor() {
        this.notifier = _common_ts_Notifier__WEBPACK_IMPORTED_MODULE_0__["Notifier"].getInstance();
        this.psv = _PostSettingsVariables__WEBPACK_IMPORTED_MODULE_1__["PostSettingsVariables"].getInstance();
        /**
         * Stores the latest clicked options box button. If this is not null, then the options box for this button is currently
         * open.
         * @type {null|Object|jQuery}
         */
        window.$lastClickedOptionsBoxButton = null;
    }
    /**
     * This class is a singleton. Get the instance with this method.
     */
    static getInstance() {
        if (this.INSTANCE === null)
            this.INSTANCE = new TestDataPreparer();
        return this.INSTANCE;
    }
    /**
     * Prepares the data that will be sent with the AJAX request when conducting tests
     *
     * @param {Object} $testButton The test button that is clicked
     * @returns {null|object}
     */
    prepareTestData($testButton) {
        // Get the required data from the test button.
        let mData = $testButton.data("kdn");
        // Do not proceed if the data does not exist.
        if (mData == undefined || !mData)
            return null;
        // Clone the object.
        let data = JSON.parse(JSON.stringify(mData));
        data = this.addSettingsToAjaxData(data);
        // Get the inputs (textarea, button, select, and input elements) with name
        let $inputs = $testButton.closest(".input-group").find(':input[name]');
        if (!$inputs.length)
            return null;
        /*
         * REQUIRED ELEMENTS
         */
        // Get the required element selectors, if there are any
        let allSelectorsRequired = true, requiredElExpr = mData["requiredSelectors"];
        if (requiredElExpr != undefined) {
            // If required element selectors are supplied, that means not all of the "Selector"s in the data are required.
            allSelectorsRequired = false;
            // If there are required selectors, get their values and notify the user
            if (requiredElExpr.length) {
                // First, we need to prepare the expression string. Here is an example expression string
                // (.sel1 | ( .sel2 & .sel7 ) ) & ( .sel2 | .sel3) & .sel5 &#sel4
                // Append and prepend a space as well.
                requiredElExpr = " " + requiredElExpr
                    .replace(/([()&|])/g, " $1 ") // First surround every special char, such as ( ) &, with space
                    .replace(/\s{2,}/g, " ") // And get rid of multiple spaces.
                    .replace(/\&/g, '&&') // Replace single & with &&
                    .replace(/\|/g, '||') // Replace single | with ||
                    .trim() + " ";
                // Now, get the selectors
                let selectorMatches = requiredElExpr.match(/([#\[\]=\^~.a-z0-9_\-"']+)\s?/g);
                let evalStr = requiredElExpr, currentSelector, $el, valueExists, requiredEls = [];
                for (let i in selectorMatches) {
                    if (!selectorMatches.hasOwnProperty(i))
                        continue;
                    currentSelector = selectorMatches[i].trim();
                    if (!currentSelector.length)
                        continue;
                    //l("Current selector");
                    //l(currentSelector);
                    $el = $(currentSelector).first();
                    //l("Escaped selector:");
                    //l(escapeRegExp(currentSelector));
                    valueExists = $el.length && $el.val() != undefined && $el.val().length;
                    if (!valueExists && $el.length)
                        requiredEls.push($el);
                    evalStr = evalStr.replace(new RegExp(this.escapeRegExp(currentSelector) + "\\s", "g"), valueExists ? 'true ' : 'false ');
                }
                // If the evaluation is false and there are required elements, notify the user for a required element.
                if (!eval(evalStr) && requiredEls.length) {
                    let max = requiredEls.length - 1, min = 0;
                    this.notifier.notify(requiredEls[Math.floor(Math.random() * (max - min + 1)) + min], undefined);
                    return null;
                }
            }
        }
        /*
         *
         */
        // If there are selectors in the data, get the values from those elements whose selectors are defined in the data
        for (let key in data) {
            // Make sure the key ends with "Selector".
            if (!data.hasOwnProperty(key) || !/Selector$/.test(key))
                continue;
            // Find the target element
            let $targetEl = $(data[key]);
            // If all selectors are required and this element's value is empty, notify the user and return null.
            if (allSelectorsRequired && ($targetEl.val() == undefined || !$targetEl.val().length)) {
                this.notifier.notify($targetEl, undefined);
                return null;
            }
            // Remove the selector value from the data, since we do not need it.
            delete data[key];
            if (!$targetEl.length)
                continue;
            // Add the key with its value to the data to be sent by removing "Selector" from the key.
            if ($targetEl.length === 1) {
                data[key.replace("Selector", "")] = $targetEl.val() || null;
            }
        }
        // If there are extra selectors in the data, get the values for those and add them to the data
        if (data.hasOwnProperty('extra')) {
            let extra = data.extra;
            let extraPrepared = {};
            let item, val;
            for (let key in extra) {
                if (!extra.hasOwnProperty(key))
                    continue;
                item = extra[key];
                // The item must have 'selector' and 'data' keys, where the selector is the target element's selector and
                // the data is the data key under which the data is stored in the element whose selector is given.
                if (!item.hasOwnProperty('selector') || !item.hasOwnProperty('data'))
                    continue;
                val = $(item.selector).data(item.data);
                if (val !== null && val !== undefined && val !== 'undefined') {
                    extraPrepared[key] = val;
                }
            }
            // If there are extra data, add them under 'extra' key to the data
            if (!$.isEmptyObject(extraPrepared)) {
                data.extra = extraPrepared;
                // Otherwise, remove the 'extra'
            }
            else {
                delete data['extra'];
            }
        }
        // If the options box is currently open, add the options to the request.
        if (window.$lastClickedOptionsBoxButton !== null) {
            data["optionsBox"] = window.$lastClickedOptionsBoxButton.find(':input').first().val();
            // Put an indicator that the test is conducted in the options box
            data["fromOptionsBox"] = 1;
        }
        // Get the values that should be tested from the inputs next to current test button
        data["serializedValues"] = $inputs.serialize();
        // Add name of the form item that is being tested. Get the chars until the first opening bracket.
        let rawName = $inputs.first().attr("name");
        data["formItemName"] = /^([^\[]+)/.exec(rawName)[1] || null;
        // Some form items, such as the form items in Options Box, have a name such as '_options_box[find_replace]'
        // and the names of the inputs under this name are like '_options_box[find_replace][0][find]' and
        // '_options_box[find_replace][0][replace]'. In this case, the sent data is structured as:
        //      {_options_box: {find_replace: {find: 'find value', replace: 'replace value'}}}
        // However, in the backend, it is considered that there are no inner arrays. So, the backend expects to find:
        //      [_options_box => ['find' => 'find value', 'replace' => 'replace value']]
        // But, it gets:
        //      [_options_box => ['find_replace' => ['find' => 'find value', 'replace' => 'replace value']]]
        // which results in an error, since it uses the sent 'formItemName' value to find the values. Here, the
        // 'formItemName' is '_options_box'. So, the backend gets:
        //      ['find_replace' => ['find' => 'find value', 'replace' => 'replace value']]
        // as the test data. However, it should get:
        //      ['find' => 'find value', 'replace' => 'replace value']
        // So, here, we send the path of the inner array under 'formItemDotKey'. It basically sends, for this case,
        // 'find_replace' as the path. So, the backend can get what it needs. If the name of the form item is, e.g.:
        //      _options_box[find_replace][test][mest][cool][0][replace]
        // the 'formItemDotKey' will be 'find_replace.test.mest.cool'. Here, we basically find '[find_replace][test][mest][cool]'
        // part, and turn it into dot notation. The used regular expression and test values and results are below:
        //
        // Regex: ^[^\[]+([^0-9]+)
        //
        // Test string: _options_box[find_replace][test][mest][cool][0][replace]
        // $1 is: [find_replace][test][mest][cool][
        //
        // Test string: _options_box[0][find]
        // $1 is: [
        let part = /^[^\[]+([^0-9]+)/.exec(rawName)[1] || '';
        if (part.length > 1) {
            // Turn it into dot notation and get rid of unnecessary brackets
            part = part.substr(1, part.length - 2).replace('][', '.').replace('[', '').replace(']', '');
            // Add it to the data
            data["formItemDotKey"] = part;
        }
        // Add the required data if this is a "find-replace in custom meta" test
        data = this.addDataForFindReplaceInCustomMetaOrShortCodeTest($testButton, data);
        //l("Prepared:");
        //l(data);
        return data;
    }
    /**
     * Adds required settings to the data that will be sent via AJAX.
     * @param data
     * @returns {*}
     */
    addSettingsToAjaxData(data) {
        // First, add raw HTML find-and-replaces.
        data = this.addManipulationOptionsToAjaxData(data);
        // Add cookie settings
        let $cookies = $(this.psv.selectorTabMain).find('label[for=' + this.psv.inputNameCookies + ']').closest('tr').find('.inputs') || null;
        if ($cookies !== null && $cookies.length) {
            data['cookies'] = $cookies.find(':input').serialize();
        }
        // Add caching setting
        let $checkboxCache = $(this.psv.selectorTabMain).find('input[name="_cache_test_url_responses"]') || null;
        if ($checkboxCache !== null && $checkboxCache.length) {
            data['cacheTestUrlResponses'] = $checkboxCache[0].checked ? 1 : 0;
        }
        // If there is "use custom settings" checkbox
        let $useCustomSettingsCheckbox = $("#_do_not_use_general_settings") || null;
        let useCustomGeneralSettings = false;
        if ($useCustomSettingsCheckbox !== null) {
            // If the user wants to use custom general settings
            if ($useCustomSettingsCheckbox.length && $useCustomSettingsCheckbox[0].checked) {
                // Add all general settings
                data["customGeneralSettings"] = $(this.psv.selectorTabGeneralSettings).find(':input').serialize();
                useCustomGeneralSettings = true;
            }
            else {
                data["customGeneralSettings"] = undefined;
            }
        }
        // Add whether the user wants to use UTF-8 or not to the data
        let $useUtf8Checkbox = $("#_kdn_make_sure_encoding_utf8") || null;
        if ($useUtf8Checkbox !== null && $useUtf8Checkbox.length && useCustomGeneralSettings) {
            data["useUtf8"] = $useUtf8Checkbox.first()[0].checked ? 1 : 0;
            let $convertEncodingCheckbox = $("#_kdn_convert_charset_to_utf8") || null;
            data["convertEncodingToUtf8"] = _common_ts_Utils__WEBPACK_IMPORTED_MODULE_2__["Utils"].getCheckboxValue($convertEncodingCheckbox) ? 1 : 0;
        }
        else {
            data["useUtf8"] = -1;
            data["convertEncodingToUtf8"] = -1;
        }
        return data;
    }
    /**
     * Adds find-and-replace options for the raw HTML response to the AJAX data.
     * @param data The data in which find-and-replaces to be added
     */
    addManipulationOptionsToAjaxData(data) {
        // First, we need to find out whether the user tests the category or the post settings.
        // We can do this by checking the current tab. In the current tab, we need to find find-and-replace options for
        // raw HTML.
        let $activeTab = $('div.tab:not(.hidden)'), activeTabId = $activeTab.attr('id').replace('tab-', '');
        // If this is the templates tab, use manipulation options from the post tab.
        if (activeTabId.toLowerCase() === 'templates') {
            $activeTab = $(this.psv.selectorTabPost);
        }
        let nameMatchRegex = /[^\\[]+/;
        let results = {};
        let currentInputName, $input, $inputs, actualName;
        for (let i = 0; i < this.psv.baseHtmlManipulationInputNames.length; i++) {
            currentInputName = this.psv.baseHtmlManipulationInputNames[i];
            // Get a single input
            $input = $activeTab.find('input[name*="' + currentInputName + '"]').first();
            // Get all inputs for the input name
            $inputs = $input.closest(".inputs").find(':input');
            // If there is no input, continue.
            if ($inputs.length < 1)
                continue;
            // Get actual name of the input
            actualName = $input.attr("name").match(nameMatchRegex)[0];
            // Serialize inputs and add them to the data under their actual name
            results[actualName] = $inputs.serialize();
        }
        data["manipulation_options"] = results;
        return data;
    }
    /**
     * Add data to the original test data for find-replace in custom meta and custom short code test
     *
     * @param {object} $testButton The test button that is clicked to perform the test
     * @param {array} data Original data to which the new data will be added
     * @return {array} Data with the data for find replace in custom meta test
     */
    addDataForFindReplaceInCustomMetaOrShortCodeTest($testButton, data) {
        let clsCustomMeta = "kdn-test-find-replace-in-custom-meta", clsCustomShortCode = "kdn-test-find-replace-in-custom-short-code";
        // If the test button is not the test button we are looking for, do not proceed and just return the original data.
        if (!$testButton.hasClass(clsCustomMeta) && !$testButton.hasClass(clsCustomShortCode))
            return data;
        let isCustomMeta = $testButton.hasClass(clsCustomMeta), targetInputSelector = '.' + (isCustomMeta ? 'meta-key' : 'short-code'), targetInputGroupSelector = '.' + (isCustomMeta ? 'selector-custom-post-meta' : 'selector-custom-shortcode');
        // Get the meta key for which the user wants to perform find and replace operation
        let $keyInput = $testButton.closest(".input-group").find('.input-container').find(targetInputSelector);
        // If meta key input does not exist, no need to go on. Return the original data.
        if (!$keyInput.length)
            return data;
        // Get the meta key
        let key = $keyInput.val();
        if (key == undefined || !key.length)
            return data;
        let found = false;
        // There are two possible places the user can define custom meta keys. One of them can be defined by CSS selectors
        // and the other one by manually. We'll handle both of the cases below. We just need one value. So, if a value
        // is found, that's it. We're done.
        // Find meta key inputs defined in selector custom post meta options
        $('.input-group' + targetInputGroupSelector + ' ' + targetInputSelector).each(function () {
            if (found)
                return;
            let $self = $(this);
            if ($self.val() == key) {
                // Get the selector and its attribute
                let $cssSelectorInput = $self.closest('.input-group').find('.css-selector'), $cssSelectorAttrInput = $self.closest('.input-group').find('.css-selector-attr'), $optionsBoxInput = $self.closest('.input-group').find('[name*="[options_box]"]'), cssSelector = $cssSelectorInput.val(), attr = $cssSelectorAttrInput.val(), optionsBoxData = $optionsBoxInput.length ? $optionsBoxInput.val() : undefined;
                // If there is a CSS selector, we've reached our goal.
                if (cssSelector != undefined && cssSelector.length) {
                    // Add the selector to the data
                    data["valueSelector"] = cssSelector;
                    if (attr != undefined && attr.length) {
                        data["valueSelectorAttr"] = attr;
                    }
                    // If there are options for the target input group, add them as well
                    if (optionsBoxData !== undefined) {
                        data["valueOptionsBoxData"] = optionsBoxData;
                    }
                    // Mark it as found
                    found = true;
                }
            }
        });
        // If the selector could not be found, try custom post meta options.
        if (!found) {
            if (isCustomMeta) {
                $('.input-group.custom-post-meta .meta-key').each(function () {
                    if (found)
                        return;
                    let $self = $(this);
                    if ($self.val() == key) {
                        let $valueInput = $self.closest('.input-group').find('input[type=text]:not(.meta-key)'), value = $valueInput.val();
                        if (value != undefined && value.length) {
                            data["subject"] = value;
                            // Mark it as found
                            found = true;
                        }
                    }
                });
            }
        }
        return data;
    }
    /**
     * Escapes special regex chars
     *
     * @param str
     * @returns {*}
     * @see http://stackoverflow.com/a/1144788/2883487
     */
    escapeRegExp(str) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }
}
TestDataPreparer.INSTANCE = null;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9jb21tb24tdHMvTm90aWZpZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9jb21tb24tdHMvVXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9jb21tb24tdHMvZW51bS9Ob3RpZmljYXRpb25Qb3NpdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2NvbW1vbi10cy9lbnVtL05vdGlmaWNhdGlvblR5cGUudHMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9kZXYtdG9vbHMtdHMvYXBwL0FkZHJlc3NCYXIudHMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9kZXYtdG9vbHMtdHMvYXBwL0NTU1NlbGVjdG9yVG9vbGJhci50cyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2Rldi10b29scy10cy9hcHAvREVWVG9vbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9kZXYtdG9vbHMtdHMvYXBwL0RldlRvb2xzVmFyaWFibGVzLnRzIiwid2VicGFjazovLy8uL3NjcmlwdHMvZGV2LXRvb2xzLXRzL2FwcC9JRnJhbWVIYW5kbGVyLnRzIiwid2VicGFjazovLy8uL3NjcmlwdHMvZGV2LXRvb2xzLXRzL2FwcC9PcHRpb25zVG9vbGJhci50cyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2Rldi10b29scy10cy9hcHAvU2lkZWJhckhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9kZXYtdG9vbHMtdHMvZGV2LXRvb2xzLnRzIiwid2VicGFjazovLy8uL3NjcmlwdHMvcG9zdC1zZXR0aW5ncy10cy9hcHAvUG9zdFNldHRpbmdzVmFyaWFibGVzLnRzIiwid2VicGFjazovLy8uL3NjcmlwdHMvcG9zdC1zZXR0aW5ncy10cy9hcHAvVGVzdERhdGFQcmVwYXJlci50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqUXVlcnlcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdz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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixlQUFlLGVBQWU7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsc0RBQUs7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixvREFBb0Q7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxNQUFNO0FBQ3JCLGdCQUFnQixNQUFNO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMzVkEsd0IiLCJmaWxlIjoiLi9kZXYtdG9vbHMtZGV2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zY3JpcHRzL2Rldi10b29scy10cy9kZXYtdG9vbHMudHNcIik7XG4iLCJpbXBvcnQgeyBOb3RpZmljYXRpb25UeXBlIH0gZnJvbSBcIi4vZW51bS9Ob3RpZmljYXRpb25UeXBlXCI7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25Qb3NpdGlvbiB9IGZyb20gXCIuL2VudW0vTm90aWZpY2F0aW9uUG9zaXRpb25cIjtcbmV4cG9ydCBjbGFzcyBOb3RpZmllciB7XG4gICAgY29uc3RydWN0b3IoKSB7IH1cbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgICAgIGlmICh0aGlzLklOU1RBTkNFID09PSBudWxsKVxuICAgICAgICAgICAgdGhpcy5JTlNUQU5DRSA9IG5ldyBOb3RpZmllcigpO1xuICAgICAgICByZXR1cm4gdGhpcy5JTlNUQU5DRTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvd3MgXCJyZXF1aXJlZCBmb3IgdGVzdFwiIG5vdGlmaWNhdGlvbiBieSBkZWZhdWx0LiBJZiB5b3Ugc3VwcGx5IGFub3RoZXIgbWVzc2FnZSwgc2hvd3MgaXQgaW5zdGVhZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAkdGFyZ2V0RWxcbiAgICAgKiBAcGFyYW0gbm90aWZpY2F0aW9uTWVzc2FnZSBJZiBkZWZpbmVkLCB0aGlzIG1lc3NhZ2Ugd2lsbCBiZSBzaG93bi4gT3RoZXJ3aXNlLCBhIGRlZmF1bHQgbWVzc2FnZSB3aWxsIGJlIHNob3duLlxuICAgICAqL1xuICAgIG5vdGlmeSgkdGFyZ2V0RWwsIG5vdGlmaWNhdGlvbk1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzTm90aWZ5QXZhaWxhYmxlKCkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmIChub3RpZmljYXRpb25NZXNzYWdlID09IHVuZGVmaW5lZCB8fCAhbm90aWZpY2F0aW9uTWVzc2FnZS5sZW5ndGgpXG4gICAgICAgICAgICBub3RpZmljYXRpb25NZXNzYWdlID0gd2luZG93LndwY2MucmVxdWlyZWRfZm9yX3Rlc3Q7XG4gICAgICAgIC8vIEZpbmQgdGhlIGNsb3Nlc3QgbGFiZWxcbiAgICAgICAgbGV0ICRsYWJlbCA9ICR0YXJnZXRFbC5jbG9zZXN0KFwidHJcIikuZmluZChcImxhYmVsXCIpLmZpcnN0KCksICRub3RpZmljYXRpb25FbCA9ICRsYWJlbC5sZW5ndGggPyAkbGFiZWwgOiAkdGFyZ2V0RWw7XG4gICAgICAgIHRoaXMuc2Nyb2xsVG9FbGVtZW50KCRub3RpZmljYXRpb25FbCk7XG4gICAgICAgICRub3RpZmljYXRpb25FbC5ub3RpZnkobm90aWZpY2F0aW9uTWVzc2FnZSwge1xuICAgICAgICAgICAgcG9zaXRpb246ICd0b3AnXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaG93IGEgbm90aWZpY2F0aW9uIG1lc3NhZ2UgZm9yIGFuIGVsZW1lbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAkdGFyZ2V0RWxlbWVudFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgQ2xhc3MgbmFtZSBmb3IgdGhlIG5vdGlmaWNhdGlvbiBlbGVtZW50LiBEZWZhdWx0OiAnaW5mbydcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcG9zaXRpb24gJ3RvcCcsICdsZWZ0JywgJ2JvdHRvbSBsZWZ0JywgJ3JpZ2h0IHRvcCcsIC4uLiBEZWZhdWx0OiAndG9wJ1xuICAgICAqL1xuICAgIG5vdGlmeVJlZ3VsYXIoJHRhcmdldEVsZW1lbnQsIG1lc3NhZ2UsIHR5cGUgPSBOb3RpZmljYXRpb25UeXBlLklORk8sIHBvc2l0aW9uID0gTm90aWZpY2F0aW9uUG9zaXRpb24uVE9QKSB7XG4gICAgICAgIGlmICghdGhpcy5pc05vdGlmeUF2YWlsYWJsZSgpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAkdGFyZ2V0RWxlbWVudC5ub3RpZnkobWVzc2FnZSwge1xuICAgICAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uIHx8ICd0b3AnLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiB0eXBlIHx8ICdpbmZvJyxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNjcm9sbHMgdG8gYW4gZWxlbWVudFxuICAgICAqIEBwYXJhbSAkZWxcbiAgICAgKi9cbiAgICBzY3JvbGxUb0VsZW1lbnQoJGVsKSB7XG4gICAgICAgICQoZG9jdW1lbnQpLmZpbmQoJ2h0bWwsIGJvZHknKS5zdG9wKCkuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3A6ICRlbC5maXJzdCgpLm9mZnNldCgpLnRvcCAtICQod2luZG93KS5oZWlnaHQoKSAvIDRcbiAgICAgICAgfSwgNTAwLCAnc3dpbmcnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIG5vdGlmaWNhdGlvbiBsaWJyYXJ5IGlzIGF2YWlsYWJsZVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvd0Vycm9yIFRydWUgaWYgYW4gZXJyb3IgbWVzc2FnZSBzaG91bGQgYmUgd3JpdHRlbiBpbiBKUyBjb25zb2xlIHdoZW4gaXQgaXMgbm90IGF2YWlsYWJsZS5cbiAgICAgKi9cbiAgICBpc05vdGlmeUF2YWlsYWJsZShzaG93RXJyb3IgPSB0cnVlKSB7XG4gICAgICAgIGxldCBpc0F2YWlsYWJsZSA9ICEodHlwZW9mICQuZm4ubm90aWZ5ICE9ICdmdW5jdGlvbicpO1xuICAgICAgICBpZiAoIWlzQXZhaWxhYmxlICYmIHNob3dFcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk5vdGlmeUpTIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNBdmFpbGFibGU7XG4gICAgfVxufVxuTm90aWZpZXIuSU5TVEFOQ0UgPSBudWxsO1xuIiwiZXhwb3J0IGNsYXNzIFV0aWxzIHtcbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYSBzdHJpbmcgKGhheXN0YWNrKSBzdGFydHMgd2l0aCBzb21ldGhpbmcgKG5lZWRsZSlcbiAgICAgKiBAcGFyYW0gaGF5c3RhY2tcbiAgICAgKiBAcGFyYW0gbmVlZGxlXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgc3RhcnRzV2l0aChoYXlzdGFjaywgbmVlZGxlKSB7XG4gICAgICAgIHJldHVybiBoYXlzdGFjay5sYXN0SW5kZXhPZihuZWVkbGUsIDApID09PSAwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFc2NhcGVzIEhUTUwuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVuc2FmZVxuICAgICAqIEBzZWUgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzYyMzQ4MDQvMjg4MzQ4N1xuICAgICAqL1xuICAgIHN0YXRpYyBlc2NhcGVIdG1sKHVuc2FmZSkge1xuICAgICAgICBpZiAodW5zYWZlID09PSB1bmRlZmluZWQgfHwgdW5zYWZlID09PSAndW5kZWZpbmVkJyB8fCB1bnNhZmUgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIHJldHVybiB1bnNhZmVcbiAgICAgICAgICAgIC5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIilcbiAgICAgICAgICAgIC5yZXBsYWNlKC88L2csIFwiJmx0O1wiKVxuICAgICAgICAgICAgLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpXG4gICAgICAgICAgICAucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIilcbiAgICAgICAgICAgIC5yZXBsYWNlKC8nL2csIFwiJiMwMzk7XCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaG93cyB0aGUgc3BlY2lmaWVkIHRpdGxlIGFzIHRoZSBlbGVtZW50J3MgdG9vbHRpcCwgYW5kIHRoZW4gY2hhbmdlcyB0aGUgdG9vbHRpcCB0byBpdHMgb3JpZ2luYWwgdmFsdWUuXG4gICAgICogSGVuY2UsIHRoZSB1c2VyIHdpbGwgc2VlIHRoZSBvcmlnaW5hbCB0aXRsZSB3aGVuIHRoZSB0b29sdGlwIGlzIHNob3duIG5leHQgdGltZS5cbiAgICAgKiBAcGFyYW0gJGVsZW1lbnRcbiAgICAgKiBAcGFyYW0gZmxhc2hUaXRsZVxuICAgICAqL1xuICAgIHN0YXRpYyBmbGFzaFRvb2x0aXAoJGVsZW1lbnQsIGZsYXNoVGl0bGUpIHtcbiAgICAgICAgbGV0IG9yaWdpbmFsVGl0bGUgPSAkZWxlbWVudC5hdHRyKFwiZGF0YS1vcmlnaW5hbC10aXRsZVwiKTtcbiAgICAgICAgJGVsZW1lbnRcbiAgICAgICAgICAgIC5hdHRyKCdkYXRhLW9yaWdpbmFsLXRpdGxlJywgZmxhc2hUaXRsZSlcbiAgICAgICAgICAgIC50b29sdGlwKCdmaXhUaXRsZScpXG4gICAgICAgICAgICAudG9vbHRpcCgnc2hvdycpXG4gICAgICAgICAgICAvLyBTZXQgdGhlIG9yaWdpbmFsIHRpdGxlIGJ1dCBkbyBub3Qgc2hvdyBpdC4gVGhlIHVzZXIgd2lsbCBzZWUgdGhlIG9yaWdpbmFsIHRpdGxlIGF0IG5leHQgaG92ZXJcbiAgICAgICAgICAgIC5hdHRyKCdkYXRhLW9yaWdpbmFsLXRpdGxlJywgb3JpZ2luYWxUaXRsZSlcbiAgICAgICAgICAgIC50b29sdGlwKCdmaXhUaXRsZScpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRvb2x0aXAgZWxlbWVudHMgZm9yIGEgc2VsZWN0b3IuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIFNlbGVjdG9yIG9mIHRoZSBlbGVtZW50IHRoYXQgaGFzICdkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIicgYXR0cmlidXRlXG4gICAgICovXG4gICAgc3RhdGljIGluaXRUb29sdGlwRm9yU2VsZWN0b3Ioc2VsZWN0b3IpIHtcbiAgICAgICAgaWYgKHR5cGVvZiAkLmZuLnRvb2x0aXAgPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgICQoc2VsZWN0b3IgKyAnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB2YWx1ZSBvZiBhIGNoZWNrYm94LlxuICAgICAqIEBwYXJhbSB7SlF1ZXJ5fG51bGx8dW5kZWZpbmVkfSAkY2hlY2tib3hFbGVtZW50XG4gICAgICovXG4gICAgc3RhdGljIGdldENoZWNrYm94VmFsdWUoJGNoZWNrYm94RWxlbWVudCkge1xuICAgICAgICAkY2hlY2tib3hFbGVtZW50ID0gJGNoZWNrYm94RWxlbWVudCB8fCBudWxsO1xuICAgICAgICBpZiAoJGNoZWNrYm94RWxlbWVudCA9PT0gbnVsbCB8fCAhJGNoZWNrYm94RWxlbWVudC5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiAhISRjaGVja2JveEVsZW1lbnRbMF0uY2hlY2tlZDtcbiAgICB9XG59XG4iLCJleHBvcnQgdmFyIE5vdGlmaWNhdGlvblBvc2l0aW9uO1xuKGZ1bmN0aW9uIChOb3RpZmljYXRpb25Qb3NpdGlvbikge1xuICAgIE5vdGlmaWNhdGlvblBvc2l0aW9uW1wiVE9QXCJdID0gXCJ0b3BcIjtcbiAgICBOb3RpZmljYXRpb25Qb3NpdGlvbltcIlJJR0hUXCJdID0gXCJyaWdodFwiO1xuICAgIE5vdGlmaWNhdGlvblBvc2l0aW9uW1wiQk9UVE9NXCJdID0gXCJib3R0b21cIjtcbiAgICBOb3RpZmljYXRpb25Qb3NpdGlvbltcIkxFRlRcIl0gPSBcImxlZnRcIjtcbn0pKE5vdGlmaWNhdGlvblBvc2l0aW9uIHx8IChOb3RpZmljYXRpb25Qb3NpdGlvbiA9IHt9KSk7XG4iLCJleHBvcnQgdmFyIE5vdGlmaWNhdGlvblR5cGU7XG4oZnVuY3Rpb24gKE5vdGlmaWNhdGlvblR5cGUpIHtcbiAgICBOb3RpZmljYXRpb25UeXBlW1wiV0FSTlwiXSA9IFwid2FyblwiO1xuICAgIE5vdGlmaWNhdGlvblR5cGVbXCJJTkZPXCJdID0gXCJpbmZvXCI7XG4gICAgTm90aWZpY2F0aW9uVHlwZVtcIkVSUk9SXCJdID0gXCJlcnJvclwiO1xuICAgIE5vdGlmaWNhdGlvblR5cGVbXCJTVUNDRVNTXCJdID0gXCJzdWNjZXNzXCI7XG59KShOb3RpZmljYXRpb25UeXBlIHx8IChOb3RpZmljYXRpb25UeXBlID0ge30pKTtcbiIsImltcG9ydCB7IGR0diwgZGV2VG9vbHMsIGlmcmFtZUhhbmRsZXIsIHNpZGViYXJIYW5kbGVyIH0gZnJvbSBcIi4uL2Rldi10b29sc1wiO1xuZXhwb3J0IGNsYXNzIEFkZHJlc3NCYXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogU3RvcmVzIFVSTCBoaXN0b3J5XG4gICAgICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaGlzdG9yeSA9IFtdO1xuICAgICAgICAvKipcbiAgICAgICAgICogU3RvcmVzIHRoZSBpbmRleCBvZiB0aGUgVVJMIGluIHRoZSBoaXN0b3J5IHRoYXQgaXMgbG9hZGVkIHZpYSBmb3J3YXJkIG9yIGJhY2sgYnV0dG9ucy5cbiAgICAgICAgICogQHR5cGUge251bGx8aW50ZWdlcn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY3VycmVudEhpc3RvcnlJbmRleCA9IG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExvYWQgdGhlIHByZXZpb3VzIFVSTCBpbiB0aGUgaGlzdG9yeS4gQ2xpY2sgaGFuZGxlciBmb3IgYmFjayBidXR0b24uXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGUgRXZlbnRcbiAgICAgKi9cbiAgICBvbkNsaWNrQmFjayhlKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlQmFja0FuZEZvcndhcmQodHJ1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExvYWQgdGhlIG5leHQgVVJMIGluIHRoZSBoaXN0b3J5LiBDbGljayBoYW5kbGVyIGZvciBmb3J3YXJkIGJ1dHRvbi5cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZSBFdmVudFxuICAgICAqL1xuICAgIG9uQ2xpY2tGb3J3YXJkKGUpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVCYWNrQW5kRm9yd2FyZChmYWxzZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc0JhY2sgVHJ1ZSBpZiB0aGlzIGlzIGZvciBiYWNrIGJ1dHRvbi4gT3RoZXJ3aXNlLCB0aGlzIGlzIGZvciBmb3J3YXJkIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBoYW5kbGVCYWNrQW5kRm9yd2FyZChpc0JhY2spIHtcbiAgICAgICAgbGV0IGkgPSBpc0JhY2sgPyAtMSA6IDE7XG4gICAgICAgIC8vIE5vIG5lZWQgdG8gcHJvY2VlZCBpZiB0aGUgaGlzdG9yeSBpcyBlbXB0eS5cbiAgICAgICAgaWYgKCF0aGlzLmhpc3RvcnkubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBsZXQgdXJsID0gbnVsbDtcbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSBzdGF0ZSwgdXNlIGl0IHRvIGZpbmQgdGhlIHByZXZpb3VzIFVSTCBpbiB0aGUgaGlzdG9yeS5cbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEhpc3RvcnlJbmRleCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGlzdG9yeVt0aGlzLmN1cnJlbnRIaXN0b3J5SW5kZXggKyBpXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdXJsID0gdGhpcy5oaXN0b3J5W3RoaXMuY3VycmVudEhpc3RvcnlJbmRleCArIGldO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEhpc3RvcnlJbmRleCArPSBpO1xuICAgICAgICAgICAgICAgIC8vIElmIHByZXYgaW5kZXggaXMgbm90IGF2YWlsYWJsZSwgaXQgbWVhbnMgdGhlcmUgaXMgbm8gcHJldiBVUkwuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBEaXNhYmxlIHRoZSBiYWNrIGJ1dHRvbi5cbiAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGVCdXR0b24oJChpc0JhY2sgPyBkdHYuYmFja0J1dHRvblNlbGVjdG9yIDogZHR2LmZvcndhcmRCdXR0b25TZWxlY3RvcikpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgaWYgdGhlIGhpc3RvcnkgaXMgbm90IGVtcHR5LCBnZXQgdGhlIHByZXYgVVJMLlxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaGlzdG9yeS5sZW5ndGggPiAxICYmIGlzQmFjaykge1xuICAgICAgICAgICAgdXJsID0gdGhpcy5oaXN0b3J5W3RoaXMuaGlzdG9yeS5sZW5ndGggKyAyICogaV07XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRIaXN0b3J5SW5kZXggPSB0aGlzLmhpc3RvcnkubGVuZ3RoICsgMiAqIGk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVybCkge1xuICAgICAgICAgICAgLy8gRW5hYmxlIGZvcndhcmQgYnV0dG9uXG4gICAgICAgICAgICB0aGlzLmVuYWJsZUJ1dHRvbigkKGlzQmFjayA/IGR0di5mb3J3YXJkQnV0dG9uU2VsZWN0b3IgOiBkdHYuYmFja0J1dHRvblNlbGVjdG9yKSk7XG4gICAgICAgICAgICAvLyBMb2FkIHRoZSBVUkxcbiAgICAgICAgICAgIGlmcmFtZUhhbmRsZXIubG9hZFVybCh1cmwpO1xuICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gcHJldmlvdXMgVVJMcyBhZnRlciB0aGlzIG9uZSwgZGlzYWJsZSB0aGUgYmFjayBidXR0b24uXG4gICAgICAgICAgICBpZiAodGhpcy5oaXN0b3J5W3RoaXMuY3VycmVudEhpc3RvcnlJbmRleCArIGldID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbigkKGlzQmFjayA/IGR0di5iYWNrQnV0dG9uU2VsZWN0b3IgOiBkdHYuZm9yd2FyZEJ1dHRvblNlbGVjdG9yKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVmcmVzaCB0aGUgY3VycmVudCBVUkwuIENsaWNrIGhhbmRsZXIgZm9yIHJlZnJlc2ggYnV0dG9uLlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBlIEV2ZW50XG4gICAgICovXG4gICAgb25DbGlja1JlZnJlc2goZSkge1xuICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVsb2FkcyB0aGUgY3VycmVudCBVUkwuXG4gICAgICovXG4gICAgcmVmcmVzaCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhpc3RvcnkubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBsZXQgdXJsID0gaWZyYW1lSGFuZGxlci5nZXRDdXJyZW50VXJsKCk7XG4gICAgICAgICQoZHR2LnVybElucHV0U2VsZWN0b3IpLnZhbCh1cmwpO1xuICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIFVSTCBjYWNoZSwgaW52YWxpZGF0ZSBpdCB0byBnZXQgZnJlc2ggZGF0YS5cbiAgICAgICAgZGV2VG9vbHMuaW52YWxpZGF0ZVVybENhY2hlKHVybCk7XG4gICAgICAgIC8vIExvYWQgdGhlIFVSTFxuICAgICAgICBpZnJhbWVIYW5kbGVyLmxvYWRVcmwodXJsKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTG9hZHMgdGhlIFVSTCBpbnRvIHRoZSBpZnJhbWUuIENsaWNrIGhhbmRsZXIgZm9yIGdvIGJ1dHRvbi5cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZSBFdmVudFxuICAgICAqL1xuICAgIG9uQ2xpY2tHbyhlKSB7XG4gICAgICAgIC8vIEdldCB0aGUgVVJMIGZyb20gdGhlIGFkZHJlc3MgYmFyIGlucHV0XG4gICAgICAgIGxldCAkaW5wdXQgPSAkKGR0di51cmxJbnB1dFNlbGVjdG9yKSwgdXJsID0gJGlucHV0LnZhbCgpO1xuICAgICAgICAvLyBJZiB0aGVyZSBpcyBubyBVUkwsIGRvIG5vdCBwcm9jZWVkLlxuICAgICAgICBpZiAodXJsID09IHVuZGVmaW5lZCB8fCAhdXJsLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgLy8gRGVsZXRlIHRoZSBoaXN0b3J5J3MgbGF0ZXIgcGFydFxuICAgICAgICBpZiAodGhpcy5jdXJyZW50SGlzdG9yeUluZGV4ICE9PSBudWxsICYmIHRoaXMuY3VycmVudEhpc3RvcnlJbmRleCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuaGlzdG9yeSA9IHRoaXMuaGlzdG9yeS5zcGxpY2UoMCwgdGhpcy5jdXJyZW50SGlzdG9yeUluZGV4IC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nbyh1cmwpO1xuICAgIH1cbiAgICBnbyh1cmwpIHtcbiAgICAgICAgaWYgKHVybCA9PSB1bmRlZmluZWQgfHwgIXVybC5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnNvbGUubG9nKFwiR286IFwiICsgdXJsKTtcbiAgICAgICAgLy8gSWYgdGhpcyBpcyBhIHJlbGF0aXZlIFVSTCwgcHJlcGVuZCB0aGUgYmFzZSBVUkwgdG8gaXQuXG4gICAgICAgIGlmICh1cmwuaW5kZXhPZignLycpID09IDApIHtcbiAgICAgICAgICAgIGxldCAkYmFzZSA9IGlmcmFtZUhhbmRsZXIuZ2V0SWZyYW1lQ29udGVudHMoKS5maW5kKFwiYmFzZVwiKTtcbiAgICAgICAgICAgIC8vIERvIG5vdCBwcm9jZWVkIGlmIGJhc2UgVVJMIGRvZXMgbm90IGV4aXN0XG4gICAgICAgICAgICBpZiAoISRiYXNlLmxlbmd0aCB8fCAkYmFzZS5hdHRyKFwiaHJlZlwiKSA9PSB1bmRlZmluZWQgfHwgISRiYXNlLmF0dHIoXCJocmVmXCIpLmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAvLyBQcmVwZW5kIHRoZSBiYXNlIFVSTFxuICAgICAgICAgICAgdXJsID0gJGJhc2UuYXR0cihcImhyZWZcIikgKyB1cmw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRG8gbm90IHByb2NlZWQgaWYgdGhlIFVSTCBkb2VzIG5vdCBzdGFydCB3aXRoIGh0dHBcbiAgICAgICAgaWYgKHVybC5pbmRleE9mKFwiaHR0cFwiKSAhPT0gMClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgLy8gSWYgdGhpcyBVUkwgaXMgbm90IHRoZSBsYXN0IFVSTCBpbiB0aGUgaGlzdG9yeSwgYWRkIHRoZSBVUkwgdG8gdGhlIGhpc3RvcnkuXG4gICAgICAgIGlmICghdGhpcy5oaXN0b3J5Lmxlbmd0aCB8fCB0aGlzLmhpc3RvcnlbdGhpcy5oaXN0b3J5Lmxlbmd0aCAtIDFdICE9IHVybCkge1xuICAgICAgICAgICAgdGhpcy5oaXN0b3J5LnB1c2godXJsKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBMb2FkIHRoZSBVUkxcbiAgICAgICAgaWZyYW1lSGFuZGxlci5sb2FkVXJsKHVybCk7XG4gICAgICAgIHRoaXMuaGlzdG9yeVVwZGF0ZWQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR28gdG8gYSBzcGVjaWZpYyBVUkwgaW4gdGhlIGhpc3RvcnkgdmlhIGl0cyBpbmRleFxuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gdGFyZ2V0SGlzdG9yeUluZGV4XG4gICAgICovXG4gICAgdHJhdmVsSW5UaW1lKHRhcmdldEhpc3RvcnlJbmRleCkge1xuICAgICAgICAvLyBEbyBub3QgcHJvY2VlZCBpZiB0aGUgaGlzdG9yeSBkb2VzIG5vdCBoYXZlIHRoZSB0YXJnZXQgaW5kZXguXG4gICAgICAgIGlmICh0YXJnZXRIaXN0b3J5SW5kZXggPT0gdW5kZWZpbmVkIHx8IHRhcmdldEhpc3RvcnlJbmRleCA8IDAgfHwgdGhpcy5oaXN0b3J5W3RhcmdldEhpc3RvcnlJbmRleF0gPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvLyBNYWtlIHN1cmUgdGhlIGhpc3RvcnkgaW5kZXggaXMgYW4gaW50ZWdlclxuICAgICAgICB0YXJnZXRIaXN0b3J5SW5kZXggPSBwYXJzZUludCh0YXJnZXRIaXN0b3J5SW5kZXgpO1xuICAgICAgICAvLyBMb2FkIHRoZSBVUkxcbiAgICAgICAgaWZyYW1lSGFuZGxlci5sb2FkVXJsKHRoaXMuaGlzdG9yeVt0YXJnZXRIaXN0b3J5SW5kZXhdKTtcbiAgICAgICAgLy8gRW5hYmxlL2Rpc2FibGUgYmFjayBidXR0b25cbiAgICAgICAgaWYgKHRoaXMuaGlzdG9yeVt0YXJnZXRIaXN0b3J5SW5kZXggLSAxXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZUJ1dHRvbigkKGR0di5iYWNrQnV0dG9uU2VsZWN0b3IpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbigkKGR0di5iYWNrQnV0dG9uU2VsZWN0b3IpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBFbmFibGUvZGlzYWJsZSBmb3J3YXJkIGJ1dHRvblxuICAgICAgICBpZiAodGhpcy5oaXN0b3J5W3RhcmdldEhpc3RvcnlJbmRleCArIDFdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlQnV0dG9uKCQoZHR2LmZvcndhcmRCdXR0b25TZWxlY3RvcikpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uKCQoZHR2LmZvcndhcmRCdXR0b25TZWxlY3RvcikpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgY3VycmVudCBoaXN0b3J5IGluZGV4XG4gICAgICAgIHRoaXMuY3VycmVudEhpc3RvcnlJbmRleCA9IHRhcmdldEhpc3RvcnlJbmRleDtcbiAgICAgICAgLy8gTWFrZSBuZWNlc3NhcnkgY2hhbmdlcyBzaW5jZSB0aGUgaGlzdG9yeSBpcyB1cGRhdGVkXG4gICAgICAgIHRoaXMuaGlzdG9yeVVwZGF0ZWQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xpY2sgaGFuZGxlciBmb3IgY2xlYXIgaGlzdG9yeSBidXR0b25cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZSBFdmVudFxuICAgICAqL1xuICAgIG9uQ2xpY2tDbGVhckhpc3RvcnkoZSkge1xuICAgICAgICB0aGlzLmNsZWFySGlzdG9yeSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGVhciB0aGUgVVJMIGhpc3RvcnlcbiAgICAgKi9cbiAgICBjbGVhckhpc3RvcnkoKSB7XG4gICAgICAgIHRoaXMuaGlzdG9yeSA9IFtdO1xuICAgICAgICB0aGlzLmN1cnJlbnRIaXN0b3J5SW5kZXggPSBudWxsO1xuICAgICAgICB0aGlzLmRpc2FibGVCdXR0b24oJChkdHYuYmFja0J1dHRvblNlbGVjdG9yKSk7XG4gICAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbigkKGR0di5mb3J3YXJkQnV0dG9uU2VsZWN0b3IpKTtcbiAgICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uKCQoZHR2LnJlZnJlc2hCdXR0b25TZWxlY3RvcikpO1xuICAgICAgICB0aGlzLmhpc3RvcnlVcGRhdGVkKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGVuZXZlciB0aGUgaGlzdG9yeSBpcyB1cGRhdGVkLlxuICAgICAqL1xuICAgIGhpc3RvcnlVcGRhdGVkKCkge1xuICAgICAgICAvLyBVcGRhdGUgc2lkZWJhcidzIGhpc3Rvcnkgc2VjdGlvblxuICAgICAgICBsZXQgaHRtbCA9ICcnLCBhY3RpdmVJbmRleCA9IHRoaXMuY3VycmVudEhpc3RvcnlJbmRleCA9PSBudWxsID8gdGhpcy5oaXN0b3J5Lmxlbmd0aCAtIDEgOiB0aGlzLmN1cnJlbnRIaXN0b3J5SW5kZXg7XG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5oaXN0b3J5KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaGlzdG9yeS5oYXNPd25Qcm9wZXJ0eShpKSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGh0bWwgKz0gJzxsaScgKyAoaSA9PSBhY3RpdmVJbmRleCA/ICcgY2xhc3M9XCJhY3RpdmVcIiAnIDogJycpICsgJz48c3BhbiBjbGFzcz1cInVybFwiPicgKyB0aGlzLmhpc3RvcnlbaV0gKyAnPC9zcGFuPjwvbGk+JztcbiAgICAgICAgfVxuICAgICAgICBzaWRlYmFySGFuZGxlci51cGRhdGVTZWN0aW9uQ29udGVudCgnPHVsPicgKyBodG1sICsgJzwvdWw+JywgZHR2LnNpZGViYXJTZWN0aW9uSGlzdG9yeUNsYXNzKTtcbiAgICAgICAgLy8gU2F2ZSBvcHRpb25zXG4gICAgICAgIGRldlRvb2xzLnNhdmVTdGF0ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgVVJMIGlucHV0J3MgdmFsdWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAgICovXG4gICAgc2V0QWRkcmVzc0JhclVybCh1cmwpIHtcbiAgICAgICAgJChkdHYudXJsSW5wdXRTZWxlY3RvcikudmFsKHVybCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc2FibGUgYSBidXR0b25cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gJGJ1dHRvblxuICAgICAqL1xuICAgIGRpc2FibGVCdXR0b24oJGJ1dHRvbikge1xuICAgICAgICAkYnV0dG9uLmFkZENsYXNzKFwiZGlzYWJsZWRcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVuYWJsZSBhIGJ1dHRvblxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSAkYnV0dG9uXG4gICAgICovXG4gICAgZW5hYmxlQnV0dG9uKCRidXR0b24pIHtcbiAgICAgICAgJGJ1dHRvbi5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGR0diwgZGV2VG9vbHMsIGlmcmFtZUhhbmRsZXIsIHNpZGViYXJIYW5kbGVyIH0gZnJvbSBcIi4uL2Rldi10b29sc1wiO1xuaW1wb3J0IHsgVGVzdERhdGFQcmVwYXJlciB9IGZyb20gXCIuLi8uLi9wb3N0LXNldHRpbmdzLXRzL2FwcC9UZXN0RGF0YVByZXBhcmVyXCI7XG5leHBvcnQgY2xhc3MgQ1NTU2VsZWN0b3JUb29sYmFyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy50ZXN0RGF0YVByZXBhcmVyID0gVGVzdERhdGFQcmVwYXJlci5nZXRJbnN0YW5jZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgQ1NTIHNlbGVjdG9yIGlucHV0J3MgdmFsdWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3VmFsdWVcbiAgICAgKi9cbiAgICB1cGRhdGVJbnB1dChuZXdWYWx1ZSkge1xuICAgICAgICBsZXQgJGNzc1NlbGVjdG9ySW5wdXQgPSB0aGlzLmdldENzc1NlbGVjdG9ySW5wdXQoKTtcbiAgICAgICAgJGNzc1NlbGVjdG9ySW5wdXQudmFsKG5ld1ZhbHVlKTtcbiAgICAgICAgLy8gRmxhc2ggdGhlIGJhY2tncm91bmQgY29sb3Igb2YgdGhlIGlucHV0XG4gICAgICAgIGRldlRvb2xzLmZsYXNoQmFja2dyb3VuZCgkY3NzU2VsZWN0b3JJbnB1dCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsaWNrIGNhbGxiYWNrIGZvciB0ZXN0IGJ1dHRvbiBpbiBDU1Mgc2VsZWN0b3IgdG9vbGJhclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBlIEV2ZW50XG4gICAgICovXG4gICAgb25DbGlja1Rlc3QoZSkge1xuICAgICAgICBsZXQgJGJ1dHRvbiA9ICQoZS50YXJnZXQpLCAkaW5wdXQgPSB0aGlzLmdldENzc1NlbGVjdG9ySW5wdXQoKSwgdmFsID0gJGlucHV0LnZhbCgpO1xuICAgICAgICBpZiAodmFsID09IHVuZGVmaW5lZCB8fCAhdmFsLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgbGV0ICRpbnB1dFRlc3RCdXR0b25CZWhhdmlvciA9ICQoZHR2Lm9wdFVzZVRlc3RCdXR0b25CZWhhdmlvclNlbGVjdG9yKS5maXJzdCgpLCB0ZXN0QnV0dG9uQmVoYXZpb3IgPSAkaW5wdXRUZXN0QnV0dG9uQmVoYXZpb3IudmFsKCksIHRlc3RWaWFKUyA9IHRlc3RCdXR0b25CZWhhdmlvciAhPSAncGhwJywgdGVzdFZpYVBIUCA9IHRlc3RCdXR0b25CZWhhdmlvciAhPSAnanMnO1xuICAgICAgICAvLyBDb25kdWN0IFBIUCB0ZXN0XG4gICAgICAgIGlmICh0ZXN0VmlhUEhQKSB7XG4gICAgICAgICAgICAvLyBDb25kdWN0IHNlcnZlci1zaWRlIHRlc3RcbiAgICAgICAgICAgIGxldCBkYXRhID0gJGJ1dHRvbi5kYXRhKFwid2NjXCIpLCAkY29udGVudHMgPSBpZnJhbWVIYW5kbGVyLmdldElmcmFtZUNvbnRlbnRzKCk7XG4gICAgICAgICAgICAvLyBSZW1vdmUgaG92ZXIgY2xhc3MgZnJvbSB0aGUgaWZyYW1lIGNvbnRlbnQgdG8gc2hvdyB0aGUgdW5jaGFuZ2VkIHJlc3VsdHNcbiAgICAgICAgICAgIGlmcmFtZUhhbmRsZXIuY2xlYXJIaWdobGlnaHRzKCk7XG4gICAgICAgICAgICBkYXRhW1wiY29udGVudFwiXSA9ICRjb250ZW50cy5maW5kKFwiaHRtbFwiKS5odG1sKCk7XG4gICAgICAgICAgICBkYXRhW1wic2VsZWN0b3JcIl0gPSB2YWw7XG4gICAgICAgICAgICBkYXRhW1widXJsXCJdID0gaWZyYW1lSGFuZGxlci5nZXRDdXJyZW50VXJsKCk7XG4gICAgICAgICAgICBkYXRhW1wiZm9ybUl0ZW1OYW1lXCJdID0gZHR2LmNzc0lucHV0SWQ7XG4gICAgICAgICAgICBkYXRhW1wic2VyaWFsaXplZFZhbHVlc1wiXSA9ICQoXCI8aW5wdXQvPlwiKS5hdHRyKFwibmFtZVwiLCBkdHYuY3NzSW5wdXRJZCArIFwiWzBdW3NlbGVjdG9yXVwiKS52YWwodmFsKS5zZXJpYWxpemUoKTtcbiAgICAgICAgICAgIC8vIEFkZCBzZXR0aW5ncyB0byB0aGUgZGF0YVxuICAgICAgICAgICAgZGF0YSA9IHRoaXMudGVzdERhdGFQcmVwYXJlci5hZGRTZXR0aW5nc1RvQWpheERhdGEoZGF0YSk7XG4gICAgICAgICAgICBsZXQgJHJlc3VsdENvbnRhaW5lciA9ICQoZHR2LnRvb2xiYXJUZXN0UmVzdWx0c0NvbnRhaW5lclNlbGVjdG9yKS5maXJzdCgpLCAkY29udGVudENvbnRhaW5lciA9ICQoZHR2LnRvb2xiYXJUZXN0UmVzdWx0c0NvbnRlbnRDb250YWluZXJTZWxlY3RvcikuZmlyc3QoKTtcbiAgICAgICAgICAgICRyZXN1bHRDb250YWluZXJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoXCJoaWRkZW5cIilcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoXCJsb2FkaW5nXCIpO1xuICAgICAgICAgICAgJGNvbnRlbnRDb250YWluZXIuaHRtbChcIlwiKTtcbiAgICAgICAgICAgIC8vIFRlc3QgdGhlIHNlbGVjdG9yIHZpYSBQSFAgYXMgd2VsbFxuICAgICAgICAgICAgJC5wb3N0KHdpbmRvdy5hamF4dXJsLCB7XG4gICAgICAgICAgICAgICAgd2NjX25vbmNlOiBkdHYuJHdjY05vbmNlLnZhbCgpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogd2luZG93LnBhZ2VBY3Rpb25LZXksXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZG9uZSgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBTaG93IHRoZSByZXN1bHRzXG4gICAgICAgICAgICAgICAgJGNvbnRlbnRDb250YWluZXIuaHRtbChyZXNwb25zZS52aWV3KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmZhaWwoKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgJGNvbnRlbnRDb250YWluZXIuaHRtbCh3aW5kb3cud3BjYy5hbl9lcnJvcl9vY2N1cnJlZCArIFwiIDxiciAvPlwiICsgcmVzcG9uc2UucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBsb2FkaW5nIGNsYXNzXG4gICAgICAgICAgICAgICAgJHJlc3VsdENvbnRhaW5lci5yZW1vdmVDbGFzcyhcImxvYWRpbmdcIik7XG4gICAgICAgICAgICAgICAgaWZyYW1lSGFuZGxlci5zZXRJZnJhbWVIZWlnaHQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIENvbmR1Y3QgSlMgdGVzdFxuICAgICAgICBpZiAodGVzdFZpYUpTKSB7XG4gICAgICAgICAgICAvLyBDbGVhciB0aGUgaGlnaGxpZ2h0c1xuICAgICAgICAgICAgaWZyYW1lSGFuZGxlci5jbGVhckhpZ2hsaWdodHMoKTtcbiAgICAgICAgICAgIC8vIEhpZ2hsaWdodCB0aGUgZWxlbWVudHMgaW5zaWRlIGlmcmFtZVxuICAgICAgICAgICAgaWZyYW1lSGFuZGxlci5oaWdobGlnaHQodmFsLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGljayBjYWxsYmFjayBmb3IgY2xlYXIgaGlnaGxpZ2h0cyBidXR0b24gaW4gQ1NTIHNlbGVjdG9yIHRvb2xiYXJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZSBFdmVudFxuICAgICAqL1xuICAgIG9uQ2xlYXJIaWdobGlnaHRzKGUpIHtcbiAgICAgICAgaWZyYW1lSGFuZGxlci5jbGVhckhpZ2hsaWdodHMoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xpY2sgY2FsbGJhY2sgZm9yIHJlbW92ZSBlbGVtZW50cyBidXR0b24gaW4gQ1NTIHNlbGVjdG9yIHRvb2xiYXJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZSBFdmVudFxuICAgICAqL1xuICAgIG9uUmVtb3ZlRWxlbWVudHMoZSkge1xuICAgICAgICBsZXQgc2VsZWN0b3IgPSB0aGlzLmdldENzc1NlbGVjdG9ySW5wdXQoKS52YWwoKTtcbiAgICAgICAgaWYgKHNlbGVjdG9yID09IHVuZGVmaW5lZCB8fCAhc2VsZWN0b3IubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZnJhbWVIYW5kbGVyLmdldElmcmFtZUNvbnRlbnRzKCkuZmluZChzZWxlY3RvcikucmVtb3ZlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsaWNrIGNhbGxiYWNrIGZvciBzaG93IGFsdGVybmF0aXZlcyBidXR0b24gaW4gQ1NTIHNlbGVjdG9yIHRvb2xiYXJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZSBFdmVudFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvd1NpZGViYXIgVHJ1ZSBpZiB0aGUgc2lkZWJhciBzaG91bGQgYmUgc2hvd24gYWZ0ZXIgdGhlIGFsdGVybmF0aXZlcyBhcmUgY29tcHV0ZWQuIERlZmF1bHQ6IHRydWVcbiAgICAgKi9cbiAgICBvblNob3dBbHRlcm5hdGl2ZXMoZSwgc2hvd1NpZGViYXIpIHtcbiAgICAgICAgbGV0IHNlbGVjdG9yID0gdGhpcy5nZXRDc3NTZWxlY3RvcklucHV0KCkudmFsKCk7XG4gICAgICAgIC8vIERvIG5vdCBwcm9jZWVkIGlmIHRoZXJlIGlzIG5vdCBhIHZhbGlkIHNlbGVjdG9yXG4gICAgICAgIGlmIChzZWxlY3RvciA9PSB1bmRlZmluZWQgfHwgIXNlbGVjdG9yLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgbGV0ICRzZWN0aW9uQWx0ZXJuYXRpdmVTZWxlY3RvciA9ICQoZHR2LnNpZGViYXJTZWxlY3RvciArIFwiIC5cIiArIGR0di5zaWRlYmFyU2VjdGlvbkFsdGVybmF0aXZlU2VsZWN0b3JzQ2xhc3MpLCBjdXJyZW50U2VsZWN0b3IgPSAkc2VjdGlvbkFsdGVybmF0aXZlU2VsZWN0b3IuZGF0YShcImN1cnJlbnRzZWxlY3RvclwiKTtcbiAgICAgICAgLy8gSWYgY3VycmVudCBhbHRlcm5hdGl2ZXMgYXJlIG5vdCBmb3IgdGhpcyBzZWxlY3RvciwgY29tcHV0ZSB0aGUgYWx0ZXJuYXRpdmVzLlxuICAgICAgICBpZiAoY3VycmVudFNlbGVjdG9yICE9IHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAvLyBHZXQgYWx0ZXJuYXRpdmVzXG4gICAgICAgICAgICBsZXQgYWx0ZXJuYXRpdmVzID0gZGV2VG9vbHMuZ2V0QWx0ZXJuYXRpdmVTZWxlY3RvcnMoc2VsZWN0b3IpO1xuICAgICAgICAgICAgLy8gVXBkYXRlIHNpZGViYXIncyBhbHRlcm5hdGl2ZXMgc2VjdGlvblxuICAgICAgICAgICAgc2lkZWJhckhhbmRsZXIudXBkYXRlQWx0ZXJuYXRpdmVTZWxlY3RvcnMoYWx0ZXJuYXRpdmVzKTtcbiAgICAgICAgICAgICRzZWN0aW9uQWx0ZXJuYXRpdmVTZWxlY3Rvci5kYXRhKFwiY3VycmVudHNlbGVjdG9yXCIsIHNlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2hvd1NpZGViYXIgPT0gdW5kZWZpbmVkIHx8IHNob3dTaWRlYmFyKSB7XG4gICAgICAgICAgICAvLyBTaG93IHRoZSBzaWRlYmFyXG4gICAgICAgICAgICBzaWRlYmFySGFuZGxlci5vbk9wZW5TaWRlYmFyKGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBpbnB1dCBlbGVtZW50IHN0b3JpbmcgdGhlIENTUyBzZWxlY3RvclxuICAgICAqIEByZXR1cm5zIHsqfGpRdWVyeXxIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICBnZXRDc3NTZWxlY3RvcklucHV0KCkge1xuICAgICAgICByZXR1cm4gJChkdHYuY3NzSW5wdXRTZWxlY3Rvcik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsaWNrIGhhbmRsZXIgZm9yIFwidXNlIENTUyBzZWxlY3RvclwiIGJ1dHRvblxuICAgICAqL1xuICAgIG9uQ2xpY2tVc2VDc3NTZWxlY3RvcigpIHtcbiAgICAgICAgdGhpcy51c2VTZWxlY3RvcigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2UgdGhlIHNlbGVjdG9yIHdyaXR0ZW4gaW4gdGhlIENTUyBzZWxlY3RvciBpbnB1dCBlbGVtZW50XG4gICAgICovXG4gICAgdXNlU2VsZWN0b3IoKSB7XG4gICAgICAgIGlmIChkdHYuJGN1cnJlbnREZXZUb29sc0J1dHRvbiA9PSB1bmRlZmluZWQgfHwgZHR2LiRjdXJyZW50RGV2VG9vbHNCdXR0b24gPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgbGV0IHZhbCA9IHRoaXMuZ2V0Q3NzU2VsZWN0b3JJbnB1dCgpLnZhbCgpO1xuICAgICAgICBpZiAodmFsID09IHVuZGVmaW5lZCB8fCAhdmFsLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgLy8gQXNzaWduIHRoZSB2YWx1ZSB0byB0aGUgdGFyZ2V0IGlucHV0XG4gICAgICAgIGxldCAkdGFyZ2V0SW5wdXQgPSBkdHYuJGN1cnJlbnREZXZUb29sc0J1dHRvbi5jbG9zZXN0KCcuaW5wdXQtZ3JvdXAnKS5maW5kKCdpbnB1dC5jc3Mtc2VsZWN0b3InKTtcbiAgICAgICAgJHRhcmdldElucHV0LnZhbCh2YWwpO1xuICAgICAgICAvLyBDbG9zZSB0aGUgbGlnaHRib3hcbiAgICAgICAgZGV2VG9vbHMuY2xvc2VMaWdodGJveCgpO1xuICAgICAgICAvLyBGbGFzaCB0aGUgdGFyZ2V0IGlucHV0XG4gICAgICAgIGRldlRvb2xzLmZsYXNoQmFja2dyb3VuZCgkdGFyZ2V0SW5wdXQpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGFkZHJlc3NCYXIsIGR0diwgaWZyYW1lSGFuZGxlciwgb3B0aW9uc1Rvb2xiYXIsIHNpZGViYXJIYW5kbGVyIH0gZnJvbSBcIi4uL2Rldi10b29sc1wiO1xuaW1wb3J0IHsgVGVzdERhdGFQcmVwYXJlciB9IGZyb20gXCIuLi8uLi9wb3N0LXNldHRpbmdzLXRzL2FwcC9UZXN0RGF0YVByZXBhcmVyXCI7XG5pbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XG5leHBvcnQgY2xhc3MgREVWVG9vbHMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogU3RvcmVzIHRpbWVvdXQgZnVuY3Rpb24gdXNlZCB0byBzYXZlIHRoZSBvcHRpb25zXG4gICAgICAgICAqIEB0eXBlIHtudWxsfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zYXZlVGltZW91dCA9IG51bGw7XG4gICAgICAgIC8qKiBTdG9yZXMgdGhlIHBvc2l0aW9uIG9mIHRoZSBzY3JvbGwgd2hlbiB0aGUgZGV2IHRvb2xzIHdpbmRvdyBpcyBvcGVuZWQgKi9cbiAgICAgICAgdGhpcy5zY3JvbGxQb3MgPSBudWxsO1xuICAgICAgICB0aGlzLnRlc3REYXRhUHJlcGFyZXIgPSBUZXN0RGF0YVByZXBhcmVyLmdldEluc3RhbmNlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNob3dzIHRoZSBkZXYgdG9vbHMgbGlnaHRib3ggd2l0aCBhIGNvbnRlbnQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd8bnVsbH0gY29udGVudCBIVE1MLiBJZiBudWxsLCB0aGUgY29udGVudCB3aWxsIGJlIGxvYWRlZCBmcm9tIHRoZSBVUkwuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBVUkwgb2YgdGhlIGNvbnRlbnRcbiAgICAgKi9cbiAgICBzaG93TGlnaHRib3hXaXRoQ29udGVudChjb250ZW50LCB1cmwpIHtcbiAgICAgICAgbGV0ICRkZXZUb29scyA9ICQoZHR2LmRldlRvb2xzQ29udGVudFNlbGVjdG9yKTtcbiAgICAgICAgLy8gU2hvdyB0aGUgbGlnaHRib3ggd2l0aCB0aGUgY29udGVudFxuICAgICAgICAkLmZlYXRoZXJsaWdodCgkZGV2VG9vbHMsIHtcbiAgICAgICAgICAgIGFmdGVyT3BlbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25MaWdodEJveEFmdGVyT3Blbihjb250ZW50LCB1cmwpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJlZm9yZUNsb3NlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkxpZ2h0Qm94QmVmb3JlQ2xvc2UoKTtcbiAgICAgICAgICAgICAgICAvLyBQcmV2ZW50IGRlZmF1bHQgYWN0aW9uLlxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiZWZvcmVPcGVuOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSBsaWdodGJveCBvcGVuZWQgYmVmb3JlLCB1c2UgaXQgYW5kIGRvIG5vdCBzaG93IGEgbmV3IGluc3RhbmNlLlxuICAgICAgICAgICAgICAgIGlmIChkdHYuJGxpZ2h0Ym94SW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZHR2LiRsaWdodGJveEluc3RhbmNlLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2FsbCBhZnRlciBvcGVuIGNhbGxiYWNrLlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTGlnaHRCb3hBZnRlck9wZW4obnVsbCwgbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFByZXZlbnQgZGVmYXVsdCBhY3Rpb24uXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCBsZXQgdGhlIEZlYXRoZXJsaWdodCBvcGVuIGEgbmV3IGluc3RhbmNlLlxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25MaWdodEJveEJlZm9yZUNsb3NlKCkge1xuICAgICAgICAvLyBTZXQgdGhlIGluc3RhbmNlIGlmIHRoZXJlIGlzIG5vbmUuXG4gICAgICAgIGlmICghZHR2LiRsaWdodGJveEluc3RhbmNlKSB7XG4gICAgICAgICAgICBkdHYuJGxpZ2h0Ym94SW5zdGFuY2UgPSAkKGR0di5saWdodGJveFNlbGVjdG9yKTtcbiAgICAgICAgICAgIGR0di4kbGlnaHRib3hJbnN0YW5jZS5hZGRDbGFzcyhcImluc3RhbmNlXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEhpZGUgdGhlIGxpZ2h0Ym94XG4gICAgICAgIGR0di4kbGlnaHRib3hJbnN0YW5jZS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcbiAgICAgICAgLy8gRmVhdGhlcmxpZ2h0IGhhcyBhIGJ1ZyB0aGF0IGNoYW5nZXMgJ3RhYmluZGV4JyB2YWx1ZXMgb2YgZm9ybSBlbGVtZW50cyB3aXRoICctMScuIFRoaXMgcmVzdWx0cyBpbiBnb2luZyB0b1xuICAgICAgICAvLyBhZGRyZXNzIGJhciBvZiB0aGUgYnJvd3NlciBhZnRlciBoaXR0aW5nIHRhYiBidXR0b24gaW4gdGhlIGtleWJvYXJkLiBIZXJlLCB3ZSBjaGFuZ2UgJ3RhYmluZGV4JyB2YWx1ZXMgb2ZcbiAgICAgICAgLy8gYWxsIGZvcm0gZWxlbWVudHMgd2l0aCAnMCcuIEJ5IHRoaXMgd2F5LCBlbGVtZW50cyB0byBiZSBmb2N1c2VkIHdoZW4gaGl0dGluZyB0aGUgdGFiIGtleSB3aWxsIGJlIGNvbXB1dGVkIGJ5XG4gICAgICAgIC8vIHRoZSBicm93c2VyIGNvbnNpZGVyaW5nIHRoZSBwb3NpdGlvbnMgb2YgdGhlIGZvcm0gZWxlbWVudHMuIEluIG90aGVyIHdvcmRzLCB0aGlzIGZpeGVzIHRoZSBwcm9ibGVtLiBIb3dldmVyLFxuICAgICAgICAvLyBzaW5jZSB0aGVyZSBhcmUgYSBsb3Qgb2YgZm9ybSBlbGVtZW50cyBpbiB0aGUgcGFnZSwgdGhpcyBpcyBub3QgYW4gZWZmaWNpZW50IHNvbHV0aW9uLiBCdXQsIGl0IGlzIGJldHRlciB0aGFuXG4gICAgICAgIC8vIGdvaW5nIHRvIHRoZSBhZGRyZXNzIGJhciBldmVyeSB0aW1lIHRoZSB0YWIga2V5IGlzIGhpdC5cbiAgICAgICAgJCgndGV4dGFyZWEsIGlucHV0LCBidXR0b24sIHNlbGVjdCcpLmF0dHIoJ3RhYmluZGV4JywgMCk7XG4gICAgICAgIC8vIFJlc3RvcmUgdGhlIHNjcm9sbCBwb3NpdGlvblxuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsVG9wKHRoaXMuc2Nyb2xsUG9zKTtcbiAgICB9XG4gICAgb25MaWdodEJveEFmdGVyT3Blbihjb250ZW50LCB1cmwpIHtcbiAgICAgICAgLy8gR2V0IHRoZSBjdXJyZW50IHNjcm9sbCBwb3NpdGlvblxuICAgICAgICB0aGlzLnNjcm9sbFBvcyA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgICAgLy8gUmVzdG9yZSB0aGUgc3RhdGUgaWYgdGhpcyBpcyB0aGUgZmlyc3QgdGltZSBvZiB0aGUgbGlnaHQgYm94IG9wZW5pbmdcbiAgICAgICAgaWYgKCFkdHYuJGxpZ2h0Ym94SW5zdGFuY2UpXG4gICAgICAgICAgICB0aGlzLnJlc3RvcmVTdGF0ZSgpO1xuICAgICAgICAvKiBMSUdIVEJPWCBUSVRMRSAqL1xuICAgICAgICAvLyBJZiB0aGVyZSBpcyBubyBsaWdodGJveCB0aXRsZSBlbGVtZW50IGluc2lkZSB0aGUgbGlnaHRib3gsIGFkZCBpdC5cbiAgICAgICAgbGV0ICRsaWdodGJveCA9ICQoZHR2LmxpZ2h0Ym94U2VsZWN0b3IpLCAkbGlnaHRib3hUaXRsZSA9ICRsaWdodGJveC5maW5kKGR0di5kZXZUb29sc0NvbnRlbnRTZWxlY3RvciArIFwiID4gXCIgKyBkdHYubGlnaHRib3hUaXRsZVNlbGVjdG9yKTtcbiAgICAgICAgaWYgKCRsaWdodGJveFRpdGxlLmxlbmd0aCAmJiAhJGxpZ2h0Ym94LmZpbmQoJz4gJyArIGR0di5saWdodGJveFRpdGxlU2VsZWN0b3IpLmxlbmd0aCkge1xuICAgICAgICAgICAgJGxpZ2h0Ym94LmFwcGVuZCgkbGlnaHRib3hUaXRsZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVXBkYXRlIHRoZSB0aXRsZVxuICAgICAgICB0aGlzLnVwZGF0ZVRpdGxlKGR0di4kY3VycmVudERldlRvb2xzQnV0dG9uLmNsb3Nlc3QoXCJ0clwiKS5maW5kKFwibGFiZWxcIikuZmlyc3QoKS5odG1sKCkpO1xuICAgICAgICAvLyBBc3NpZ24gdGhlIGN1cnJlbnQgQ1NTIHNlbGVjdG9yXG4gICAgICAgIGxldCAkc2VsZWN0b3JJbnB1dCA9IGR0di4kY3VycmVudERldlRvb2xzQnV0dG9uLmNsb3Nlc3QoXCIuaW5wdXQtZ3JvdXBcIikuZmluZChcImlucHV0LmNzcy1zZWxlY3RvclwiKS5maXJzdCgpO1xuICAgICAgICBsZXQgY3VycmVudFNlbGVjdG9yID0gJyc7XG4gICAgICAgIGlmICgkc2VsZWN0b3JJbnB1dC5sZW5ndGggJiYgJHNlbGVjdG9ySW5wdXQudmFsKCkgIT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgY3VycmVudFNlbGVjdG9yID0gJHNlbGVjdG9ySW5wdXQudmFsKCk7XG4gICAgICAgICQoZHR2LmNzc0lucHV0U2VsZWN0b3IpLmZpcnN0KCkudmFsKGN1cnJlbnRTZWxlY3RvcikudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgICAgIC8qKi9cbiAgICAgICAgbGV0IHVybElucHV0VmFsID0gJChkdHYudXJsSW5wdXRTZWxlY3RvcikudmFsKCk7XG4gICAgICAgIC8vIElmIHRoZSBjb250ZW50IGlzIG51bGwgYW5kIHRoZXJlIGlzIG5vIFVSTCBpbiB0aGUgVVJMIGlucHV0LCBnbyB0byB0aGUgdGFyZ2V0IFVSTC5cbiAgICAgICAgaWYgKGNvbnRlbnQgPT0gbnVsbCAmJiAodXJsSW5wdXRWYWwgPT0gdW5kZWZpbmVkIHx8ICF1cmxJbnB1dFZhbC5sZW5ndGgpKSB7XG4gICAgICAgICAgICBhZGRyZXNzQmFyLnNldEFkZHJlc3NCYXJVcmwodXJsKTtcbiAgICAgICAgICAgIGFkZHJlc3NCYXIuZ28odXJsKTtcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgaWYgdGhlIGNvbnRlbnQgaXMgbm90IG51bGwsIHNldCBpZnJhbWUgY29udGVudCBhcyB0aGUgY29udGVudC5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb250ZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmcmFtZUhhbmRsZXIuc2V0SWZyYW1lQ29udGVudChjb250ZW50LCB1cmwpO1xuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCBtYWtlIHN1cmUgQ1NTIHNlbGVjdG9ycyBhcmUgaW5pdGlhbGl6ZWRcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmcmFtZUhhbmRsZXIuaW5pdENzc1NlbGVjdG9ycygpO1xuICAgICAgICB9XG4gICAgICAgIC8vIExvYWQgdGhlIHNpZGViYXJcbiAgICAgICAgc2lkZWJhckhhbmRsZXIubG9hZFNpZGViYXIoKTtcbiAgICAgICAgLy8gU2V0IHRoZSBvcHRpb25zIGZvciBjdXJyZW50IERFViB0b29scyBidXR0b25cbiAgICAgICAgbGV0IGRhdGEgPSBkdHYuJGN1cnJlbnREZXZUb29sc0J1dHRvbi5kYXRhKFwid2NjXCIpO1xuICAgICAgICBpZiAoZGF0YSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIFRhcmdldCBIVE1MIHRhZ1xuICAgICAgICAgICAgJChkdHYub3B0VGFyZ2V0SFRNTFRhZ1NlbGVjdG9yKS5maXJzdCgpLnZhbChkYXRhW1widGFyZ2V0VGFnXCJdICE9IHVuZGVmaW5lZCA/IGRhdGFbXCJ0YXJnZXRUYWdcIl0gOiAnJykudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRG8gdGhlIHRoaW5ncyB0aGF0IHNob3VsZCBiZSBkb25lIG9ubHkgb25jZSBmb3IgYSBsaWdodGJveC5cbiAgICAgICAgaWYgKCFkdHYuJGxpZ2h0Ym94SW5zdGFuY2UpIHtcbiAgICAgICAgICAgIC8vIExpc3RlbiB0byByZXNpemUgZXZlbnRzIG9uIHRoZSB0b29sYmFyLCBzaW5jZSBpdHMgc2l6ZSBjYW4gY2hhbmdlLiBSZXNpemUgdGhlIGlmcmFtZSBhcyB3ZWxsLlxuICAgICAgICAgICAgJChkdHYudG9vbGJhclNlbGVjdG9yKS5yZXNpemUoaWZyYW1lSGFuZGxlci5zZXRJZnJhbWVIZWlnaHQpO1xuICAgICAgICAgICAgLy8gU2F2ZSBvcHRpb25zIHdoZW4gYW4gb3B0aW9uIGlucHV0IGlzIGNoYW5nZWRcbiAgICAgICAgICAgICQoZHR2Lm9wdGlvbnNUb29sYmFyU2VsZWN0b3IpLmZpbmQoJzppbnB1dCcpLm9uKCdjaGFuZ2UnLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCAkc2VsZiA9ICQoZS50YXJnZXQpO1xuICAgICAgICAgICAgICAgIC8vIERvIG5vdCBzYXZlIGFmdGVyIHRhcmdldCBIVE1MIHRhZyBpcyBjaGFuZ2VkLlxuICAgICAgICAgICAgICAgIGlmICgkc2VsZi5oYXNDbGFzcyhkdHYub3B0VGFyZ2V0SFRNTFRhZ0NsYXNzKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgc291cmNlIGNvZGUgb2YgdGhlIFVSTC4gVGhpcyBmdW5jdGlvbiBoYW5kbGVzIGNhY2hpbmcgb2YgdGhlIHNvdXJjZSBjb2RlcyBhcyB3ZWxsLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGFyZ2V0IFVSTCB3aG9zZSBzb3VyY2UgY29kZSBpcyBuZWVkZWRcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhIFRoZSBkYXRhIHRoYXQgd2lsbCBiZSBzZW50IHdpdGggdGhlIEFKQVggcmVxdWVzdC4gVVJMIHdpbGwgYmUgYWRkZWQgdG8gdGhlIGRhdGEgYXV0b21hdGljYWxseS5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBkb25lIGNhbGxiYWNrLiBUYWtlcyByZXNwb25zZSBhcyBwYXJhbWV0ZXIuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZmFpbCBjYWxsYmFjay4gVGFrZXMgcmVzcG9uc2UgYXMgcGFyYW1ldGVyLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGFsd2F5cyBjYWxsYmFjay4gVGFrZXMgbm8gcGFyYW1ldGVycy5cbiAgICAgKi9cbiAgICBnZXRTb3VyY2VDb2RlKHVybCwgZGF0YSwgZG9uZSwgZmFpbCwgYWx3YXlzKSB7XG4gICAgICAgIC8vIElmIHRoZSBzb3VyY2UgY29kZSB3YXMgY2FjaGVkIGJlZm9yZSwgdXNlIGl0LlxuICAgICAgICBpZiAoZHR2LnVybENhY2hlLmhhc093blByb3BlcnR5KHVybCkgJiYgZHR2LnVybENhY2hlW3VybF0gIT09IG51bGwpIHtcbiAgICAgICAgICAgIGRvbmUoZHR2LnVybENhY2hlW3VybF0pO1xuICAgICAgICAgICAgYWx3YXlzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhlcmUgd2FzIGFuIHVuZmluaXNoZWQgWEhSLCBhYm9ydCBpdC5cbiAgICAgICAgaWYgKGR0di5sYXN0VW5maW5pc2hlZFNvdXJjZUNvZGVYSFIpIHtcbiAgICAgICAgICAgIGR0di5pc0Fib3J0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgZHR2Lmxhc3RVbmZpbmlzaGVkU291cmNlQ29kZVhIUi5hYm9ydCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFkZCBVUkwgdG8gdGhlIGRhdGFcbiAgICAgICAgZGF0YVtcInVybFwiXSA9IHVybDtcbiAgICAgICAgZGF0YVtcInJlbW92ZVNjcmlwdHNcIl0gPSBvcHRpb25zVG9vbGJhci5pc1JlbW92ZVNjcmlwdHMoKSA/IDEgOiAwO1xuICAgICAgICBkYXRhW1wicmVtb3ZlU3R5bGVzXCJdID0gb3B0aW9uc1Rvb2xiYXIuaXNSZW1vdmVTdHlsZXMoKSA/IDEgOiAwO1xuICAgICAgICBkYXRhW1wiYXBwbHlNYW5pcHVsYXRpb25PcHRpb25zXCJdID0gb3B0aW9uc1Rvb2xiYXIuaXNBcHBseU1hbmlwdWxhdGlvbk9wdGlvbnMoKSA/IDEgOiAwO1xuICAgICAgICBkYXRhW1wiY29va2llc1wiXSA9ICQoJ2lucHV0W25hbWVePV9jb29raWVzXScpLnNlcmlhbGl6ZSgpO1xuICAgICAgICAvLyBBZGQgc2V0dGluZ3MgdG8gdGhlIGRhdGFcbiAgICAgICAgZGF0YSA9IHRoaXMudGVzdERhdGFQcmVwYXJlci5hZGRTZXR0aW5nc1RvQWpheERhdGEoZGF0YSk7XG4gICAgICAgIC8vIEdldCB0aGUgc291cmNlIGNvZGUgb2YgdGhlIHRhcmdldCBVUkwgdmlhIEFKQVggYW5kIGNhbGwgdGhlIGNhbGxiYWNrc1xuICAgICAgICBkdHYubGFzdFVuZmluaXNoZWRTb3VyY2VDb2RlWEhSID0gJC5wb3N0KHdpbmRvdy5hamF4dXJsLCB7XG4gICAgICAgICAgICB3Y2Nfbm9uY2U6IGR0di4kd2NjTm9uY2UudmFsKCksXG4gICAgICAgICAgICBhY3Rpb246IHdpbmRvdy5wYWdlQWN0aW9uS2V5LFxuICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9KVxuICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGlzIGlzIGFib3J0ZWQsIGRvIG5vdCBwcm9jZWVkLlxuICAgICAgICAgICAgaWYgKGR0di5pc0Fib3J0ZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBTZXQgaXNBYm9ydGVkIGFzIGZhbHNlIHRvIGFsbG93IG90aGVyIHJlcXVlc3RzIHRvIGNhbGwgJ2RvbmUnIGZ1bmN0aW9uLlxuICAgICAgICAgICAgICAgIGR0di5pc0Fib3J0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBZGQgdGhlIHJlc3BvbnNlIHRvIHRoZSBVUkwgY2FjaGVcbiAgICAgICAgICAgIGR0di51cmxDYWNoZVt1cmxdID0gcmVzcG9uc2U7XG4gICAgICAgICAgICBkb25lKHJlc3BvbnNlKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5mYWlsKGZhaWwpXG4gICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIE1ha2UgdGhlIGxhc3QgdW5maW5pc2hlZCBzb3VyY2UgY29kZSBYSFIgbnVsbCwgc2luY2UgaXQgaXMgZmluaXNoZWQuXG4gICAgICAgICAgICBkdHYubGFzdFVuZmluaXNoZWRTb3VyY2VDb2RlWEhSID0gbnVsbDtcbiAgICAgICAgICAgIGFsd2F5cygpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IGFsdGVybmF0aXZlIENTUyBzZWxlY3RvcnMgZm9yIGEgQ1NTIHNlbGVjdG9yXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIFRoZSBDU1Mgc2VsZWN0b3Igd2hvc2UgYWx0ZXJuYXRpdmVzIGFyZSBuZWVkZWRcbiAgICAgKi9cbiAgICBnZXRBbHRlcm5hdGl2ZVNlbGVjdG9ycyhzZWxlY3Rvcikge1xuICAgICAgICAvLyBNYWtlIHN1cmUgdGhlcmUgaXMgYSB2YWxpZCBzZWxlY3RvclxuICAgICAgICBpZiAoc2VsZWN0b3IgPT0gdW5kZWZpbmVkIHx8ICFzZWxlY3RvciB8fCAhc2VsZWN0b3IubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvLyBSZW1vdmUgbXVsdGlwbGUgc3BhY2VzXG4gICAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3IucmVwbGFjZShkdHYubXVsdGlwbGVTcGFjZVJlZ2V4LCBcIiBcIik7XG4gICAgICAgIC8vIEdldCB0aGUgcGFydHMgb2YgdGhlIHNlbGVjdG9yXG4gICAgICAgIGxldCBwYXJ0cyA9IHNlbGVjdG9yLnNwbGl0KFwiIFwiKSwgJGlmcmFtZUNvbnRlbnRzID0gaWZyYW1lSGFuZGxlci5nZXRJZnJhbWVDb250ZW50cygpLCAkZm91bmRFbGVtZW50cyA9ICRpZnJhbWVDb250ZW50cy5maW5kKHNlbGVjdG9yKTtcbiAgICAgICAgbGV0IHVud2FudGVkID0gW1wiYm9keVwiLCBcImh0bWxcIl0sIGlkU2VsZWN0b3JzID0gW107XG4gICAgICAgIHBhcnRzID0gJC5tYXAocGFydHMsIGZ1bmN0aW9uICh2YWwsIGkpIHtcbiAgICAgICAgICAgIC8vIFB1c2ggdGhpcyBwYXJ0IHRvIElEIHNlbGVjdG9ycyBpZiBpdCBpcyBhbiBJRCBzZWxlY3RvclxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoaXMgaXMgbm90IHRoZSBsYXN0IHBhcnRcbiAgICAgICAgICAgIGlmICh2YWwuaW5kZXhPZihcIiNcIikgPT09IDAgJiYgaSA8IHBhcnRzLmxlbmd0aCAtIDEpXG4gICAgICAgICAgICAgICAgaWRTZWxlY3RvcnMucHVzaCh2YWwpO1xuICAgICAgICAgICAgLy8gUmVtb3ZlIHVud2FudGVkIHBhcnRzXG4gICAgICAgICAgICByZXR1cm4gKCQuaW5BcnJheSh2YWwsIHVud2FudGVkKSAhPT0gLTEpID8gbnVsbCA6IHZhbDtcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBsZW5ndGggPSBwYXJ0cy5sZW5ndGgsIGxhc3QgPSBwYXJ0c1tsZW5ndGggLSAxXSwgcG9zc2libGVMYXN0VGFnID0gJGZvdW5kRWxlbWVudHMubGVuZ3RoID8gJGZvdW5kRWxlbWVudHMuZmlyc3QoKS5wcm9wKFwidGFnTmFtZVwiKS50b0xvd2VyQ2FzZSgpIDogbnVsbCwgbmV3TGFzdCA9IG51bGwsIGhvbGRlciwgaSwgYWx0ZXJuYXRpdmVzID0gW107XG4gICAgICAgIC8vbChsZW5ndGgpO1xuICAgICAgICAvL2woXCJMYXN0OiBcIiArIGxhc3QpO1xuICAgICAgICAvL2woaWRTZWxlY3RvcnMpO1xuICAgICAgICAvLyBJZiB0aGUgbGFzdCBwYXJ0IGRvZXMgbm90IHN0YXJ0IHdpdGggYSB0YWcsIHByZXBlbmQgdGhlIGZpcnN0IGZvdW5kIGVsZW1lbnQncyB0YWcgdG8gaXQuXG4gICAgICAgIGlmIChwb3NzaWJsZUxhc3RUYWcgIT0gbnVsbCAmJiAhKC9eXFx3LykudGVzdChsYXN0KSkge1xuICAgICAgICAgICAgbmV3TGFzdCA9IHBvc3NpYmxlTGFzdFRhZyArIGxhc3Q7XG4gICAgICAgICAgICBhbHRlcm5hdGl2ZXMucHVzaChuZXdMYXN0KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBZGQgdGhlIGxhc3Qgc2VsZWN0b3IgYXMgYW4gYWx0ZXJuYXRpdmUgYXMgd2VsbFxuICAgICAgICBhbHRlcm5hdGl2ZXMucHVzaChsYXN0KTtcbiAgICAgICAgJC5tYXAoaWRTZWxlY3RvcnMsIGZ1bmN0aW9uIChpZFNlbGVjdG9yLCBpKSB7XG4gICAgICAgICAgICBhbHRlcm5hdGl2ZXMucHVzaChpZFNlbGVjdG9yICsgXCIgXCIgKyAobmV3TGFzdCA/IG5ld0xhc3QgOiBsYXN0KSk7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgYWx0U2VsZWN0b3IgPSAnJywgYWx0V2l0aExhc3QsIGFsdFdpdGhOZXdMYXN0LCBudGhDaGlsZFJlZ2V4ID0gLzpudGgtY2hpbGRbXildK1xcKS9nLCBudGhDaGlsZFJlZ2V4Tm9Db2xvbiA9IC9udGgtY2hpbGRbXildK1xcKS9nLCBudGhDaGlsZEVuZFBvc1JlZ2V4ID0gbmV3IFJlZ0V4cChcIm50aC1jaGlsZFxcXFwoWzAtOV0rXFxcXCkoPzpbXlxcXFxzXSt8KVwiLCBcImdcIiksIGZpcnN0Q2hpbGRSZWdleCA9IC86Zmlyc3QtY2hpbGQvLCBsYXN0Q2hpbGRSZWdleCA9IC86bGFzdC1jaGlsZC8sIGlkUmVnZXggPSBuZXcgUmVnRXhwKCdcXFxcW2lkPVwiW15cIl0rXCJcXFxcXXwjW14kXFxcXHMuXSsnLCBcImdcIiksIG1hdGNoZXM7XG4gICAgICAgIC8vIENyZWF0ZSBhbHRlcm5hdGl2ZXMgYnkgY29tYmluaW5nIHBhcnRzIHN0YXJ0aW5nIGZyb20gdGhlIGVuZFxuICAgICAgICBmb3IgKGkgPSBsZW5ndGggLSAyOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgaWYgKCFwYXJ0cy5oYXNPd25Qcm9wZXJ0eShpKSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGhvbGRlciA9IHBhcnRzW2ldO1xuICAgICAgICAgICAgYWx0U2VsZWN0b3IgPSBob2xkZXIgKyBcIiBcIiArIGFsdFNlbGVjdG9yO1xuICAgICAgICAgICAgLy8gQ1NTIHNlbGVjdG9ycyBzaG91bGQgbm90IHN0YXJ0IHdpdGggXCI+XCIuIFNvLCBpZiB0aGlzIG9uZSBpcyBcIj5cIiwgbGV0J3MgZ2V0IHRoZSBwcmV2aW91cyBwYXJ0IGFzIHdlbGwuXG4gICAgICAgICAgICBpZiAoaG9sZGVyID09IFwiPlwiKSB7XG4gICAgICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgICAgIGlmIChpIDwgMClcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgaG9sZGVyID0gcGFydHNbaV07XG4gICAgICAgICAgICAgICAgYWx0U2VsZWN0b3IgPSBob2xkZXIgKyBcIiBcIiArIGFsdFNlbGVjdG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWx0V2l0aExhc3QgPSBhbHRTZWxlY3RvciArIFwiIFwiICsgbGFzdDtcbiAgICAgICAgICAgIGFsdFdpdGhOZXdMYXN0ID0gbmV3TGFzdCA/IChhbHRTZWxlY3RvciArIFwiIFwiICsgbmV3TGFzdCkgOiBudWxsO1xuICAgICAgICAgICAgLy8gVXNlIHRoZSBjcmVhdGVkIGFsdGVybmF0aXZlIHNlbGVjdG9yIHdpdGggYm90aCBsYXN0IGFuZCBuZXdMYXN0IHBhcnRzLlxuICAgICAgICAgICAgYWx0ZXJuYXRpdmVzLnB1c2goYWx0V2l0aExhc3QpO1xuICAgICAgICAgICAgaWYgKGFsdFdpdGhOZXdMYXN0KVxuICAgICAgICAgICAgICAgIGFsdGVybmF0aXZlcy5wdXNoKGFsdFdpdGhOZXdMYXN0KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBIGZldyBtb3JlIGFsdGVybmF0aXZlc1xuICAgICAgICBhbHRlcm5hdGl2ZXMgPSAkLm1hcChhbHRlcm5hdGl2ZXMsICh2YWwpID0+IHtcbiAgICAgICAgICAgIC8vIFRyeSB0byBnZW5lcmF0ZSBhbHRlcm5hdGl2ZXMgd2l0aCBsYXN0LWNoaWxkIGZvciBlYWNoIHNlbGVjdG9yXG4gICAgICAgICAgICBtYXRjaGVzID0gdGhpcy5tYXRjaFJlZ0V4V2l0aEluZGV4KG50aENoaWxkRW5kUG9zUmVnZXgsIHZhbCk7XG4gICAgICAgICAgICBpZiAoIW1hdGNoZXMpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgICAgIC8vIEl0ZXJhdGUgb3ZlciBcIm50aC1jaGlsZFwiIG1hdGNoZXMgaW4gdGhpcyBzZWxlY3RvclxuICAgICAgICAgICAgJC5tYXAobWF0Y2hlcywgZnVuY3Rpb24gKG1WYWwpIHtcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgcGFydGlhbCBzZWxlY3RvciBieSBjdXR0aW5nIHRoZSBwYXJ0IG9mIHRoZSBzZWxlY3RvciBjb21pbmcgYWZ0ZXIgdGhlIGN1cnJlbnRcbiAgICAgICAgICAgICAgICAvLyBcIm50aC1jaGlsZFwiIG1hdGNoXG4gICAgICAgICAgICAgICAgbGV0IGVuZCA9IHBhcnNlSW50KG1WYWxbMV0pICsgcGFyc2VJbnQobVZhbFswXS5sZW5ndGgpLCBuZXdTZWxlY3RvciA9IHZhbCwgcGFydGlhbFNlbGVjdG9yID0gdmFsLnN1YnN0cmluZygwLCBlbmQpO1xuICAgICAgICAgICAgICAgIGxldCAkZm91bmRFbGVtZW50ID0gJGlmcmFtZUNvbnRlbnRzLmZpbmQocGFydGlhbFNlbGVjdG9yKS5maXJzdCgpO1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlIGlzIGFuIGVsZW1lbnQgZm91bmQgYnkgcGFydGlhbCBzZWxlY3RvciBhbmQgaXQgaXMgdGhlIGxhc3QgY2hpbGQgb2YgaXRzIHBhcmVudCxcbiAgICAgICAgICAgICAgICAvLyB3ZSBjYW4gcmVwbGFjZSB0aGUgY3VycmVudCBcIm50aC1jaGlsZFwiIG1hdGNoIHdpdGggXCJsYXN0LWNoaWxkXCIuXG4gICAgICAgICAgICAgICAgaWYgKCRmb3VuZEVsZW1lbnQubGVuZ3RoICYmICRmb3VuZEVsZW1lbnQuaXMoJzpsYXN0LWNoaWxkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUHJlcGFyZSB0aGUgbmV3IHNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgIG5ld1NlbGVjdG9yID0gdmFsLnN1YnN0cmluZygwLCBtVmFsWzFdKSArIG1WYWxbMF0ucmVwbGFjZShudGhDaGlsZFJlZ2V4Tm9Db2xvbiwgXCJsYXN0LWNoaWxkXCIpICsgdmFsLnN1YnN0cmluZyhlbmQpO1xuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdGhpcyBuZXcgc2VsZWN0b3IgYW1vbmcgb3RoZXJzXG4gICAgICAgICAgICAgICAgICAgIGFsdGVybmF0aXZlcy5wdXNoKG5ld1NlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZCB8fCB2YWwgPT09ICd1bmRlZmluZWQnIHx8IHZhbCA9PT0gbnVsbCB8fCAhdmFsLmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGVyZSBhcmUgbm8gdW53YW50ZWQgc3BhY2VzXG4gICAgICAgICAgICByZXR1cm4gdmFsLnJlcGxhY2UoZHR2Lm11bHRpcGxlU3BhY2VSZWdleCwgXCIgXCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gSWYgdGhlIGxhc3QgZWxlbWVudCBoYXMgSUQgaW4gaXQsIGFkZCBhbiBhbHRlcm5hdGl2ZSBzZWxlY3RvciBieSByZW1vdmluZyB0aGUgSURcbiAgICAgICAgJC5tYXAoYWx0ZXJuYXRpdmVzLCBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICBsZXQgc3BsaXQgPSB2YWwuc3BsaXQoXCIgXCIpO1xuICAgICAgICAgICAgaWYgKHNwbGl0Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBsZXQgbGFzdCA9IHNwbGl0W3NwbGl0Lmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIGlmIChsYXN0LmluZGV4T2YoXCIjXCIpICE9PSAtMSB8fCBsYXN0LmluZGV4T2YoXCJpZD1cIikgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgSUQgcGFydFxuICAgICAgICAgICAgICAgICAgICBsYXN0ID0gbGFzdC5yZXBsYWNlKGlkUmVnZXgsIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgbGFzdCBwYXJ0IGJlY2FtZSBlbXB0eSBhbmQgdGhlcmUgaXMgYSBwb3NzaWJsZSBsYXN0IHRhZywgcHJlZmVyIHRoZSBwb3NzaWJsZSBsYXN0IHRhZ1xuICAgICAgICAgICAgICAgICAgICAvLyBpbnN0ZWFkLlxuICAgICAgICAgICAgICAgICAgICBpZiAoIWxhc3QubGVuZ3RoICYmIHBvc3NpYmxlTGFzdFRhZyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0ID0gcG9zc2libGVMYXN0VGFnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgbGFzdCBlbGVtZW50IGFuZCBhZGQgbW9kaWZpZWQgbGFzdCBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIHNwbGl0LnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBzcGxpdC5wdXNoKGxhc3QpO1xuICAgICAgICAgICAgICAgICAgICAvLyBKb2luIHRoZSB2YWx1ZXMgd2l0aCBzcGFjZSBhbmQgYWRkIGl0IGFzIGFuIGFsdGVybmF0aXZlIENTUyBzZWxlY3RvclxuICAgICAgICAgICAgICAgICAgICBhbHRlcm5hdGl2ZXMucHVzaChzcGxpdC5qb2luKFwiIFwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gQWRkIHRoZXNlIGFsdGVybmF0aXZlcyB3aXRob3V0IFwibnRoLWNoaWxkXCIgXCJmaXJzdC1jaGlsZFwiIGFuZCBcImxhc3QtY2hpbGRcIiBhcyB3ZWxsLlxuICAgICAgICAkLm1hcChhbHRlcm5hdGl2ZXMsIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIGFsdGVybmF0aXZlcy5wdXNoKHZhbC5yZXBsYWNlKG50aENoaWxkUmVnZXgsIFwiXCIpKTtcbiAgICAgICAgICAgIGFsdGVybmF0aXZlcy5wdXNoKHZhbC5yZXBsYWNlKGZpcnN0Q2hpbGRSZWdleCwgXCJcIikpO1xuICAgICAgICAgICAgYWx0ZXJuYXRpdmVzLnB1c2godmFsLnJlcGxhY2UobGFzdENoaWxkUmVnZXgsIFwiXCIpKTtcbiAgICAgICAgICAgIC8vIEFsbFxuICAgICAgICAgICAgYWx0ZXJuYXRpdmVzLnB1c2godmFsLnJlcGxhY2UobnRoQ2hpbGRSZWdleCwgXCJcIikucmVwbGFjZShmaXJzdENoaWxkUmVnZXgsIFwiXCIpLnJlcGxhY2UobGFzdENoaWxkUmVnZXgsIFwiXCIpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIE1ha2Ugc3VyZSBhbHRlcm5hdGl2ZXMgYXJlIHVuaXF1ZSBhbmQgdGhleSBhcmUgc29ydGVkIGJ5IGxlbmd0aCBpbiBhc2NlbmRpbmcgb3JkZXJcbiAgICAgICAgYWx0ZXJuYXRpdmVzID0gdGhpcy51bmlxdWUoYWx0ZXJuYXRpdmVzKVxuICAgICAgICAgICAgLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgIC8vIEFTQyAgLT4gYS5sZW5ndGggLSBiLmxlbmd0aFxuICAgICAgICAgICAgLy8gREVTQyAtPiBiLmxlbmd0aCAtIGEubGVuZ3RoXG4gICAgICAgICAgICByZXR1cm4gYS5sZW5ndGggLSBiLmxlbmd0aDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBhbHRlcm5hdGl2ZXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgYmVzdCBhbHRlcm5hdGl2ZSBzZWxlY3RvciBhbW9uZyBhbHJlYWR5IGNvbXB1dGVkIGFsdGVybmF0aXZlIHNlbGVjdG9ycy5cbiAgICAgKiBAcmV0dXJucyB7bnVsbHxzdHJpbmd9IEJlc3QgYWx0ZXJuYXRpdmUgc2VsZWN0b3Igb3IgbnVsbCBpZiBub3QgZm91bmQuXG4gICAgICovXG4gICAgZ2V0QmVzdEFsdGVybmF0aXZlU2VsZWN0b3IoKSB7XG4gICAgICAgIGxldCAkc2VjdGlvbiA9IHNpZGViYXJIYW5kbGVyLmdldFNlY3Rpb25FbGVtZW50KGR0di5zaWRlYmFyU2VjdGlvbkFsdGVybmF0aXZlU2VsZWN0b3JzQ2xhc3MpLCBhbHRlcm5hdGl2ZU9iamVjdHMgPSAkc2VjdGlvbi5maW5kKFwidWxcIikuZmlyc3QoKS5kYXRhKFwiYWx0ZXJuYXRpdmVzXCIpLCBiZXN0ID0gbnVsbDtcbiAgICAgICAgaWYgKGFsdGVybmF0aXZlT2JqZWN0cyA9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gYmVzdDtcbiAgICAgICAgLy8gRmluZCB0aGUgc2hvcnRlc3Qgc2VsZWN0b3IgdGhhdCBzZWxlY3RzIG9ubHkgMSBlbGVtZW50LlxuICAgICAgICAkLm1hcChhbHRlcm5hdGl2ZU9iamVjdHMsIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwuY291bnQgPT0gMSkge1xuICAgICAgICAgICAgICAgIGlmIChiZXN0ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgYmVzdCA9IHZhbC5zZWxlY3RvcjtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSBiZXN0IHdoaWNoIGRvZXMgbm90IGNvbnRhaW4gYW4gSUQsIGJ1dCB0aGlzIG9uZSBoYXMgYW4gSUQgaW4gaXQsIHVzZSB0aGlzIG9uZS5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoKHZhbC5zZWxlY3Rvci5pbmRleE9mKFwiI1wiKSAhPT0gLTEgfHwgdmFsLnNlbGVjdG9yLmluZGV4T2YoXCJpZD1cIikgIT09IC0xKSAmJiBiZXN0LmluZGV4T2YoXCIjXCIpID09PSAtMSAmJiBiZXN0LmluZGV4T2YoXCJpZD1cIikgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWwuc2VsZWN0b3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGJlc3Q7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1hdGNoZXMgYSByZWdleCBhbmQgcmV0dXJucyBtYXRjaGVzIHdpdGggdGhlaXIgcG9zaXRpb25zXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlZ0V4cH0gcmVnZXggICAgUmVndWxhciBleHByZXNzaW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0ciAgICAgIFRhcmdldCBzdHJpbmdcbiAgICAgKiBAcmV0dXJucyB7bnVsbHxBcnJheX0gICAgSWYgbm8gbWF0Y2hlcyBhcmUgZm91bmQsIG51bGwuIE90aGVyd2lzZSwgYW4gYXJyYXkgb2YgYXJyYXlzIHdpdGggZWFjaCBpbm5lciBhcnJheVxuICAgICAqIGNvbnRhaW5pbmcgdGhlIG1hdGNoIGFuZCBpdHMgcG9zaXRpb24gaW4gdGhlIHRhcmdldCBzdHJpbmcgcmVzcGVjdGl2ZWx5LlxuICAgICAqL1xuICAgIG1hdGNoUmVnRXhXaXRoSW5kZXgocmVnZXgsIHN0cikge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW10sIGN1cnNvciA9IDA7XG4gICAgICAgIGlmIChzdHIgPT09IHVuZGVmaW5lZCB8fCBzdHIgPT09ICd1bmRlZmluZWQnIHx8IHN0ciA9PT0gbnVsbCB8fCAhc3RyLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIGxldCBtYXRjaGVzID0gc3RyLm1hdGNoKHJlZ2V4KTtcbiAgICAgICAgaWYgKCFtYXRjaGVzKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICQubWFwKG1hdGNoZXMsIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIGN1cnNvciA9IHN0ci5pbmRleE9mKHZhbCwgY3Vyc29yKTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFt2YWwsIGN1cnNvcl0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVsZXRlcyBjYWNoZSBvZiB0aGUgVVJMXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgICAqL1xuICAgIGludmFsaWRhdGVVcmxDYWNoZSh1cmwpIHtcbiAgICAgICAgZHR2LnVybENhY2hlW3VybF0gPSBudWxsO1xuICAgICAgICAvLyBJbnZhbGlkYXRlIGN1cnJlbnQgVVJMIGFzIHdlbGwuXG4gICAgICAgIGlmcmFtZUhhbmRsZXIuZ2V0SWZyYW1lKCkuZGF0YShcImN1cnJlbnR1cmxcIiwgXCJcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEludmFsaWRhdGVzIGFsbCBVUkwgY2FjaGVzLlxuICAgICAqL1xuICAgIGludmFsaWRhdGVBbGxVcmxDYWNoZXMoKSB7XG4gICAgICAgIGR0di51cmxDYWNoZSA9IFtdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGbGFzaCB0aGUgYmFja2dyb3VuZCBjb2xvciBvZiBhbiBvYmplY3RcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gJGVsZW1lbnQgVGFyZ2V0IGVsZW1lbnRcbiAgICAgKi9cbiAgICBmbGFzaEJhY2tncm91bmQoJGVsZW1lbnQpIHtcbiAgICAgICAgJGVsZW1lbnQuc3RvcCgpLmNzcyhcImJhY2tncm91bmQtY29sb3JcIiwgXCIjYjhlYTg0XCIpXG4gICAgICAgICAgICAuYW5pbWF0ZSh7IGJhY2tncm91bmRDb2xvcjogXCIjRkZGRkZGXCIgfSwgMTAwMCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlIHRoZSBsaWdodGJveFxuICAgICAqL1xuICAgIGNsb3NlTGlnaHRib3goKSB7XG4gICAgICAgICQuZmVhdGhlcmxpZ2h0LmN1cnJlbnQoKS5jbG9zZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBsaWdodGJveCB0aXRsZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdUaXRsZVxuICAgICAqL1xuICAgIHVwZGF0ZVRpdGxlKG5ld1RpdGxlKSB7XG4gICAgICAgICQoZHR2LmxpZ2h0Ym94VGl0bGVTZWxlY3RvcikuaHRtbChuZXdUaXRsZSB8fCBcIlwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2F2ZSBvcHRpb25zIHRvIHRoZSBkYXRhYmFzZVxuICAgICAqL1xuICAgIHNhdmVTdGF0ZSgpIHtcbiAgICAgICAgLy8gVXNlIGEgdGltZW91dCBmdW5jdGlvbiB0byBzYXZlIHRoZSBzdGF0ZSB0byBwcmV2ZW50IHVubmVjZXNzYXJ5IEFKQVggcmVxdWVzdHMuXG4gICAgICAgIC8vIElmIHRoZXJlIGlzIGEgdGltZW91dCwgY2xlYXIgaXQuXG4gICAgICAgIGlmICh0aGlzLnNhdmVUaW1lb3V0ICE9IG51bGwpXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5zYXZlVGltZW91dCk7XG4gICAgICAgIC8vIFN0YXJ0IG5ldyB0aW1lb3V0LlxuICAgICAgICB0aGlzLnNhdmVUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvL2woXCJTYXZlIHN0YXRlXCIpO1xuICAgICAgICAgICAgbGV0ICRvcHRpb25zVG9vbGJhcklucHV0cyA9ICQoZHR2Lm9wdGlvbnNUb29sYmFyU2VsZWN0b3IpLmZpbmQoJzppbnB1dCcpO1xuICAgICAgICAgICAgbGV0IHN0YXRlID0ge1xuICAgICAgICAgICAgICAgIG9wdGlvbnM6IHt9LFxuICAgICAgICAgICAgICAgIGhpc3Rvcnk6IGFkZHJlc3NCYXIuaGlzdG9yeSxcbiAgICAgICAgICAgICAgICBpc0hvdmVyU2VsZWN0QWN0aXZlOiBvcHRpb25zVG9vbGJhci5pc0hvdmVyU2VsZWN0QWN0aXZlKCkgPyAxIDogMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIFByZXBhcmUgdGhlIG9wdGlvbnMgcHJvcGVydHlcbiAgICAgICAgICAgIGxldCAkc2VsZiwgdmFsO1xuICAgICAgICAgICAgJG9wdGlvbnNUb29sYmFySW5wdXRzLmVhY2goKGksIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgJHNlbGYgPSAkKGVsKTtcbiAgICAgICAgICAgICAgICAvLyBEbyBub3Qga2VlcCB0YXJnZXQgSFRNTCB0YWcgaW4gdGhlIHN0YXRlLlxuICAgICAgICAgICAgICAgIGlmICgkc2VsZi5oYXNDbGFzcyhkdHYub3B0VGFyZ2V0SFRNTFRhZ0NsYXNzKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHZhbCA9ICRzZWxmLmF0dHIoXCJ0eXBlXCIpID09IFwiY2hlY2tib3hcIiA/ICgkc2VsZlswXS5jaGVja2VkID8gMSA6IDApIDogJHNlbGYudmFsKCk7XG4gICAgICAgICAgICAgICAgc3RhdGUub3B0aW9uc1skc2VsZi5hdHRyKFwibmFtZVwiKV0gPSB2YWw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIEdldCB0aGUgcHJldmlvdXNseSBzYXZlZCBzdGF0ZS4gSWYgdGhlIHNhbWUgc3RhdGUgaXMgYmVpbmcgc2F2ZWQsIHN0b3AuXG4gICAgICAgICAgICBpZiAoZHR2LiRpbnB1dERldlRvb2xzU3RhdGUudmFsKCkgPT0gSlNPTi5zdHJpbmdpZnkoc3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgLy9sKFwidHJ5aW5nIHRvIHNhdmUgdGhlIHNhbWUgc3RhdGUuIHN0b3BwZWQuXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vbChkYXRhKTtcbiAgICAgICAgICAgIC8vIFNhdmUgaXRcbiAgICAgICAgICAgICQucG9zdCh3aW5kb3cuYWpheHVybCwge1xuICAgICAgICAgICAgICAgIHdjY19ub25jZTogZHR2LiR3Y2NOb25jZS52YWwoKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IHdpbmRvdy5wYWdlQWN0aW9uS2V5LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgY21kOiAnc2F2ZURldlRvb2xzU3RhdGUnLFxuICAgICAgICAgICAgICAgICAgICBwb3N0SWQ6IGR0di5wb3N0SWQsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlOiBzdGF0ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgLy9sKFwic2F2ZWRcIik7XG4gICAgICAgICAgICAgICAgLy9sKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgaGlkZGVuIGlucHV0J3MgdmFsdWVcbiAgICAgICAgICAgICAgICBkdHYuJGlucHV0RGV2VG9vbHNTdGF0ZS52YWwoSlNPTi5zdHJpbmdpZnkoc3RhdGUpKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgLy9sKFwiZmFpbGVkXCIpO1xuICAgICAgICAgICAgICAgIC8vbChyZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgMTUwMCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlc3RvcmUgdGhlIHN0YXRlIGZyb20gdGhlIGhpZGRlbiBpbnB1dCBlbGVtZW50IHN0b3JpbmcgdGhlIHByZXZpb3VzbHkgc2F2ZWQgc3RhdGVcbiAgICAgKi9cbiAgICByZXN0b3JlU3RhdGUoKSB7XG4gICAgICAgIC8vbChcInJlc3RvcmUgc3RhdGVcIik7XG4gICAgICAgIGxldCBzdGF0ZUlucHV0VmFsID0gZHR2LiRpbnB1dERldlRvb2xzU3RhdGUudmFsKCk7XG4gICAgICAgIGlmIChzdGF0ZUlucHV0VmFsID09IHVuZGVmaW5lZCB8fCAhc3RhdGVJbnB1dFZhbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgbGV0IHN0YXRlID0gSlNPTi5wYXJzZShzdGF0ZUlucHV0VmFsKTtcbiAgICAgICAgLy8gUmVzdG9yZSBob3ZlciBzZWxlY3Qgc3RhdGVcbiAgICAgICAgaWYgKHN0YXRlLmlzSG92ZXJTZWxlY3RBY3RpdmUgPT0gMSkge1xuICAgICAgICAgICAgJChkdHYub3B0SG92ZXJTZWxlY3RTZWxlY3RvcikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIikuY2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICQoZHR2Lm9wdEhvdmVyU2VsZWN0U2VsZWN0b3IpLmFkZENsYXNzKFwiYWN0aXZlXCIpLmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmVzdG9yZSBoaXN0b3J5XG4gICAgICAgIGFkZHJlc3NCYXIuaGlzdG9yeSA9IHN0YXRlLmhpc3RvcnkgfHwgW107XG4gICAgICAgIGFkZHJlc3NCYXIuaGlzdG9yeVVwZGF0ZWQoKTtcbiAgICAgICAgLy8gUmVzdG9yZSBvcHRpb25zXG4gICAgICAgIGxldCAkZWxlbWVudCwgdmFsO1xuICAgICAgICBmb3IgKGxldCBpIGluIHN0YXRlLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmICghc3RhdGUub3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShpKSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIHZhbCA9IHN0YXRlLm9wdGlvbnNbaV07XG4gICAgICAgICAgICAkZWxlbWVudCA9ICQoXCJbbmFtZT1cIiArIGkgKyBcIl1cIik7XG4gICAgICAgICAgICBpZiAoJGVsZW1lbnQuYXR0cihcInR5cGVcIikgPT0gXCJjaGVja2JveFwiKSB7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQucHJvcChcImNoZWNrZWRcIiwgdmFsID09IDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQudmFsKHZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBjbGFzcyBuYW1lcyB0aGF0IGNhbm5vdCBiZSBwcm9jZXNzZWQgdmlhIFBIUC5cbiAgICAgKiBAcGFyYW0gc2VsZWN0b3JcbiAgICAgKi9cbiAgICByZW1vdmVJbXByb3BlckNsYXNzTmFtZXMoc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yLnJlcGxhY2UoZHR2LnJlZ2V4Q2xhc3NOYW1lU3RhcnRpbmdXaXRoRGFzaCwgJycpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGFuZ2VzIGNsYXNzIG5hbWVzIGRlZmluZWQgd2l0aCBicmFja2V0cyBzbyB0aGF0IHRoZXkgYXJlIGRlZmluZWQgd2l0aCBhIGRvdC5cbiAgICAgKiBAcGFyYW0gc2VsZWN0b3JcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICB1bmJyYWNrZXRDbGFzc05hbWVzKHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBzZWxlY3Rvci5yZXBsYWNlKG5ldyBSZWdFeHAoJ1xcXFxbY2xhc3M9XCIoW15cIl0rKVwiXFxcXF0nLCAnZycpLCAobWF0Y2gsIGNsYXNzZXMpID0+IHtcbiAgICAgICAgICAgIC8vIFRyaW0gdGhlIHZhbHVlIGJlZm9yZSByZXBsYWNpbmcgc3BhY2VzIHdpdGggZG90cyB0byBtYWtlIHN1cmUgdGhlcmUgd29uJ3QgYmUgYW55IHVud2FudGVkXG4gICAgICAgICAgICAvLyBkb3RzIGF0IHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiB0aGUgdmFsdWUuXG4gICAgICAgICAgICByZXR1cm4gXCIuXCIgKyBjbGFzc2VzLnRyaW0oKS5yZXBsYWNlKFwiIFwiLCBcIi5cIik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgYSB1bmlxdWUgYXJyYXkuXG4gICAgICogQHBhcmFtIHtBcnJheX0gYVxuICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgKi9cbiAgICB1bmlxdWUoYSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgICQuZWFjaChhLCBmdW5jdGlvbiAoaSwgdikge1xuICAgICAgICAgICAgaWYgKCQuaW5BcnJheSh2LCByZXN1bHQpID09IC0xKVxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHYpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgRGV2VG9vbHNWYXJpYWJsZXMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnBvc3RJZCA9IG51bGw7XG4gICAgICAgIHRoaXMuJGlucHV0RGV2VG9vbHNTdGF0ZSA9ICQoJ2lucHV0W25hbWU9X2Rldl90b29sc19zdGF0ZV0nKS5maXJzdCgpO1xuICAgICAgICB0aGlzLiRjdXJyZW50RGV2VG9vbHNCdXR0b24gPSBudWxsOyAvLyBTdG9yZXMgdGhlIGxhc3QgY2xpY2tlZCBERVYgdG9vbHMgYnV0dG9uXG4gICAgICAgIHRoaXMubGlnaHRib3hUaXRsZVNlbGVjdG9yID0gJy5saWdodGJveC10aXRsZSc7XG4gICAgICAgIHRoaXMuZGV2VG9vbHNCdXR0b25TZWxlY3RvciA9ICcud2NjLWRldi10b29scyc7XG4gICAgICAgIHRoaXMuZGV2VG9vbHNDb250ZW50Q29udGFpbmVyU2VsZWN0b3IgPSAnLmRldi10b29scy1jb250ZW50LWNvbnRhaW5lcic7XG4gICAgICAgIHRoaXMuZGV2VG9vbHNDb250ZW50U2VsZWN0b3IgPSAnLmRldi10b29scy1jb250ZW50JztcbiAgICAgICAgdGhpcy5saWdodGJveFNlbGVjdG9yID0gJy5mZWF0aGVybGlnaHQnO1xuICAgICAgICB0aGlzLmxpZ2h0Ym94Q29udGFpbmVyU2VsZWN0b3IgPSAnLmZlYXRoZXJsaWdodC1jb250ZW50JztcbiAgICAgICAgdGhpcy50b29sYmFyU2VsZWN0b3IgPSB0aGlzLmxpZ2h0Ym94Q29udGFpbmVyU2VsZWN0b3IgKyBcIiBcIiArIHRoaXMuZGV2VG9vbHNDb250ZW50U2VsZWN0b3IgKyBcIiAudG9vbGJhclwiO1xuICAgICAgICB0aGlzLmlmcmFtZVNlbGVjdG9yID0gdGhpcy5saWdodGJveENvbnRhaW5lclNlbGVjdG9yICsgXCIgXCIgKyB0aGlzLmRldlRvb2xzQ29udGVudFNlbGVjdG9yICsgXCIgaWZyYW1lLnNvdXJjZVwiO1xuICAgICAgICB0aGlzLiR3Y2NOb25jZSA9ICQoXCIjd2NjX25vbmNlXCIpO1xuICAgICAgICAvLyBIb3ZlciBjbGFzcyBpcyBhZGRlZCB0byB0aGUgZWxlbWVudHMgaW4gdGhlIHRhcmdldCBwYWdlJ3Mgc291cmNlIGNvZGUgd2hlbiB0aGV5IGFyZSBob3ZlcmVkXG4gICAgICAgIHRoaXMuaG92ZXJDbGFzcyA9IFwid3BjYy1lbGVtZW50LWhvdmVyZWRcIjtcbiAgICAgICAgLy8gSG92ZXIgc3R5bGUgd2lsbCBiZSBhZGRlZCB0byB0aGUgdGFyZ2V0IHBhZ2UncyBzb3VyY2UgY29kZS4gVGhpcyBjYW4gYmUgdXNlZCB0byBhc3NpZ24gc3R5bGVzIHRvIHRoZSBob3ZlciBjbGFzcy5cbiAgICAgICAgLy9ob3ZlclN0eWxlOiBcIi53cGNjLWVsZW1lbnQtaG92ZXJlZCB7LXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwcHggMHB4IDJweCAycHggcmdiYSgyNTUsMCwwLDEpOyAtbW96LWJveC1zaGFkb3c6IGluc2V0IDBweCAwcHggMnB4IDJweCByZ2JhKDI1NSwwLDAsMSk7Ym94LXNoYWRvdzogaW5zZXQgMHB4IDBweCAycHggMnB4IHJnYmEoMjU1LDAsMCwxKTt9XCJcbiAgICAgICAgLy9ob3ZlclN0eWxlOiBcImltZy53cGNjLWVsZW1lbnQtaG92ZXJlZHtib3JkZXI6IDJweCBzb2xpZCAjZmY0NDAwICFpbXBvcnRhbnQ7fSAud3BjYy1lbGVtZW50LWhvdmVyZWQge3RvcDowICFpbXBvcnRhbnQ7bGVmdDowICFpbXBvcnRhbnQ7cmlnaHQ6MCAhaW1wb3J0YW50O2JvdHRvbTowICFpbXBvcnRhbnQ7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI1NSwgMCwgMCwgMC42KSAhaW1wb3J0YW50O3otaW5kZXg6OTk5OSAhaW1wb3J0YW50Oy13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMHB4IDBweCAycHggMnB4IHJnYmEoMjU1LDAsMCwxKSAhaW1wb3J0YW50OyAtbW96LWJveC1zaGFkb3c6IGluc2V0IDBweCAwcHggMnB4IDJweCByZ2JhKDI1NSwwLDAsMSkgIWltcG9ydGFudDtib3gtc2hhZG93OiBpbnNldCAwcHggMHB4IDJweCAycHggcmdiYSgyNTUsMCwwLDEpICFpbXBvcnRhbnQ7fVwiO1xuICAgICAgICB0aGlzLmhvdmVyU3R5bGVTZWxlY3RvciA9IFwiI2lmcmFtZS1zdHlsZVwiO1xuICAgICAgICAvLyBBbiBhcnJheSB1c2VkIHRvIGNhY2hlIHRoZSBzb3VyY2UgY29kZXMgb2YgdGhlIFVSTHNcbiAgICAgICAgdGhpcy51cmxDYWNoZSA9IFtdO1xuICAgICAgICAvLyBTdG9yZXMgdGhlIGluc3RhbmNlIG9mIHRoZSBsaWdodGJveCB0byBrZWVwIGl0IGFzIGEgc2luZ2xldG9uLlxuICAgICAgICB0aGlzLiRsaWdodGJveEluc3RhbmNlID0gbnVsbDtcbiAgICAgICAgdGhpcy5hZGRyZXNzQmFyU2VsZWN0b3IgPSB0aGlzLnRvb2xiYXJTZWxlY3RvciArIFwiIC5hZGRyZXNzLWJhclwiO1xuICAgICAgICB0aGlzLmJhY2tCdXR0b25TZWxlY3RvciA9IHRoaXMuYWRkcmVzc0JhclNlbGVjdG9yICsgXCIgLmJhY2tcIjtcbiAgICAgICAgdGhpcy5mb3J3YXJkQnV0dG9uU2VsZWN0b3IgPSB0aGlzLmFkZHJlc3NCYXJTZWxlY3RvciArIFwiIC5mb3J3YXJkXCI7XG4gICAgICAgIHRoaXMucmVmcmVzaEJ1dHRvblNlbGVjdG9yID0gdGhpcy5hZGRyZXNzQmFyU2VsZWN0b3IgKyBcIiAucmVmcmVzaFwiO1xuICAgICAgICB0aGlzLmdvQnV0dG9uU2VsZWN0b3IgPSB0aGlzLmFkZHJlc3NCYXJTZWxlY3RvciArIFwiIC5nb1wiO1xuICAgICAgICB0aGlzLnVybElucHV0U2VsZWN0b3IgPSB0aGlzLmFkZHJlc3NCYXJTZWxlY3RvciArIFwiIGlucHV0XCI7XG4gICAgICAgIHRoaXMudXJsSW5wdXRJZCA9ICdfZHRfdG9vbGJhcl91cmwnO1xuICAgICAgICAvLyBTZWxlY3RvcnMgZm9yIENTUyBzZWxlY3RvciB0b29sc1xuICAgICAgICB0aGlzLmNzc1NlbGVjdG9yVG9vbHNDb250YWluZXJTZWxlY3RvciA9IHRoaXMubGlnaHRib3hDb250YWluZXJTZWxlY3RvciArICcgLmNzcy1zZWxlY3Rvci10b29scyc7XG4gICAgICAgIHRoaXMuY3NzSW5wdXRTZWxlY3RvciA9IHRoaXMubGlnaHRib3hDb250YWluZXJTZWxlY3RvciArICcgLmNzcy1zZWxlY3Rvci1pbnB1dCBpbnB1dCc7XG4gICAgICAgIHRoaXMuY3NzSW5wdXRJZCA9ICdfZHRfdG9vbGJhcl9jc3Nfc2VsZWN0b3InO1xuICAgICAgICB0aGlzLmNzc1Rlc3RTZWxlY3RvciA9IHRoaXMubGlnaHRib3hDb250YWluZXJTZWxlY3RvciArICcgLmNzcy1zZWxlY3Rvci10ZXN0JztcbiAgICAgICAgdGhpcy5jc3NDbGVhckhpZ2hsaWdodHNTZWxlY3RvciA9IHRoaXMubGlnaHRib3hDb250YWluZXJTZWxlY3RvciArICcgLmNzcy1zZWxlY3Rvci1jbGVhci1oaWdobGlnaHRzJztcbiAgICAgICAgdGhpcy5jc3NSZW1vdmVFbGVtZW50c1NlbGVjdG9yID0gdGhpcy5saWdodGJveENvbnRhaW5lclNlbGVjdG9yICsgJyAuY3NzLXNlbGVjdG9yLXJlbW92ZS1lbGVtZW50cyc7XG4gICAgICAgIHRoaXMuY3NzU2hvd0FsdGVybmF0aXZlc1NlbGVjdG9yID0gdGhpcy5saWdodGJveENvbnRhaW5lclNlbGVjdG9yICsgJyAuY3NzLXNlbGVjdG9yLXNob3ctYWx0ZXJuYXRpdmVzJztcbiAgICAgICAgdGhpcy5jc3NVc2VCdXR0b25TZWxlY3RvciA9IHRoaXMubGlnaHRib3hDb250YWluZXJTZWxlY3RvciArICcgLmNzcy1zZWxlY3Rvci11c2UnO1xuICAgICAgICB0aGlzLnRvb2xiYXJUZXN0UmVzdWx0c0NvbnRhaW5lclNlbGVjdG9yID0gdGhpcy5saWdodGJveENvbnRhaW5lclNlbGVjdG9yICsgJyAudGVzdC1yZXN1bHRzJztcbiAgICAgICAgdGhpcy50b29sYmFyVGVzdFJlc3VsdHNDb250ZW50Q29udGFpbmVyU2VsZWN0b3IgPSB0aGlzLnRvb2xiYXJUZXN0UmVzdWx0c0NvbnRhaW5lclNlbGVjdG9yICsgJyAuY29udGVudCc7XG4gICAgICAgIHRoaXMuaWZyYW1lU3RhdHVzU2VsZWN0b3IgPSB0aGlzLmxpZ2h0Ym94Q29udGFpbmVyU2VsZWN0b3IgKyBcIiAuaWZyYW1lLXN0YXR1c1wiO1xuICAgICAgICB0aGlzLnNpZGViYXJTZWxlY3RvciA9IHRoaXMubGlnaHRib3hDb250YWluZXJTZWxlY3RvciArIFwiIC5zaWRlYmFyXCI7XG4gICAgICAgIHRoaXMuc2lkZWJhckNsb3NlU2VsZWN0b3IgPSB0aGlzLnNpZGViYXJTZWxlY3RvciArIFwiIC5zaWRlYmFyLWNsb3NlXCI7XG4gICAgICAgIHRoaXMuc2lkZWJhck9wZW5TZWxlY3RvciA9ICcuc2lkZWJhci1vcGVuJztcbiAgICAgICAgdGhpcy5zaWRlYmFyT3BlbmVkQ2xhc3MgPSAnb3BlbmVkJztcbiAgICAgICAgdGhpcy5zaWRlYmFyU2VjdGlvbkNsYXNzID0gJ3NpZGViYXItc2VjdGlvbic7XG4gICAgICAgIHRoaXMuc2lkZWJhclNlY3Rpb25Db250ZW50Q2xhc3MgPSAnc2VjdGlvbi1jb250ZW50JztcbiAgICAgICAgdGhpcy5zaWRlYmFyU2VjdGlvbkhpc3RvcnlDbGFzcyA9ICdoaXN0b3J5JztcbiAgICAgICAgdGhpcy5zaWRlYmFyU2VjdGlvblVzZWRTZWxlY3RvcnNDbGFzcyA9ICd1c2VkLXNlbGVjdG9ycyc7XG4gICAgICAgIHRoaXMuc2lkZWJhclNlY3Rpb25BbHRlcm5hdGl2ZVNlbGVjdG9yc0NsYXNzID0gJ2FsdGVybmF0aXZlLXNlbGVjdG9ycyc7XG4gICAgICAgIHRoaXMuc2lkZWJhclNlY3Rpb25TZWxlY3RvciA9IHRoaXMuc2lkZWJhclNlbGVjdG9yICsgXCIgLlwiICsgdGhpcy5zaWRlYmFyU2VjdGlvbkNsYXNzO1xuICAgICAgICB0aGlzLnNpZGViYXJTZWN0aW9uVGl0bGVDb250YWluZXJTZWxlY3RvciA9IHRoaXMuc2lkZWJhclNlY3Rpb25TZWxlY3RvciArIFwiIC5zZWN0aW9uLXRpdGxlXCI7XG4gICAgICAgIHRoaXMuc2lkZWJhclNlY3Rpb25UaXRsZVNlbGVjdG9yID0gdGhpcy5zaWRlYmFyU2VjdGlvblRpdGxlQ29udGFpbmVyU2VsZWN0b3IgKyBcIiA+IHNwYW5cIjtcbiAgICAgICAgdGhpcy5zaWRlYmFyU2VjdGlvbkNvbnRlbnRTZWxlY3RvciA9IHRoaXMuc2lkZWJhclNlY3Rpb25TZWxlY3RvciArIFwiIC5cIiArIHRoaXMuc2lkZWJhclNlY3Rpb25Db250ZW50Q2xhc3M7XG4gICAgICAgIHRoaXMuYnRuQ2xlYXJIaXN0b3J5U2VsZWN0b3IgPSB0aGlzLmxpZ2h0Ym94U2VsZWN0b3IgKyAnIC5jbGVhci1oaXN0b3J5JztcbiAgICAgICAgdGhpcy50b2dnbGVFeHBhbmRDbGFzcyA9ICd0b2dnbGVFeHBhbmQnO1xuICAgICAgICB0aGlzLnNpZGViYXJTZWN0aW9uVG9nZ2xlRXhwYW5kU2VsZWN0b3IgPSB0aGlzLnNpZGViYXJTZWxlY3RvciArICcgLicgKyB0aGlzLnRvZ2dsZUV4cGFuZENsYXNzO1xuICAgICAgICB0aGlzLnNpZGViYXJTZWN0aW9uRXhwYW5kZWRDbGFzcyA9ICdleHBhbmRlZCc7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NNZXRhQm94U2VsZWN0b3IgPSAnLndjYy1zZXR0aW5ncy1tZXRhLWJveCc7XG4gICAgICAgIHRoaXMuY2xhc3NDc3NTZWxlY3RvciA9ICdzZWxlY3Rvcic7XG4gICAgICAgIHRoaXMuY2xhc3NVcmwgPSAndXJsJztcbiAgICAgICAgdGhpcy5jbGFzc09wdGlvbnNUb29sYmFyID0gJ29wdGlvbnMnO1xuICAgICAgICB0aGlzLm9wdGlvbnNUb29sYmFyU2VsZWN0b3IgPSB0aGlzLmxpZ2h0Ym94U2VsZWN0b3IgKyBcIiAuXCIgKyB0aGlzLmNsYXNzT3B0aW9uc1Rvb2xiYXI7XG4gICAgICAgIHRoaXMub3B0SG92ZXJTZWxlY3RTZWxlY3RvciA9IHRoaXMub3B0aW9uc1Rvb2xiYXJTZWxlY3RvciArIFwiIC50b2dnbGUtaG92ZXItc2VsZWN0XCI7XG4gICAgICAgIHRoaXMub3B0VGFyZ2V0SFRNTFRhZ0NsYXNzID0gJ3RhcmdldC1odG1sLXRhZyc7XG4gICAgICAgIHRoaXMub3B0VGFyZ2V0SFRNTFRhZ1NlbGVjdG9yID0gdGhpcy5vcHRpb25zVG9vbGJhclNlbGVjdG9yICsgXCIgLlwiICsgdGhpcy5vcHRUYXJnZXRIVE1MVGFnQ2xhc3M7XG4gICAgICAgIHRoaXMub3B0VXNlVGVzdEJ1dHRvbkJlaGF2aW9yU2VsZWN0b3IgPSB0aGlzLm9wdGlvbnNUb29sYmFyU2VsZWN0b3IgKyBcIiAudGVzdC1idXR0b24tYmVoYXZpb3JcIjtcbiAgICAgICAgdGhpcy5vcHRBcHBseU1hbmlwdWxhdGlvbk9wdGlvbnNTZWxlY3RvciA9IHRoaXMub3B0aW9uc1Rvb2xiYXJTZWxlY3RvciArIFwiIC5hcHBseS1tYW5pcHVsYXRpb24tb3B0aW9uc1wiO1xuICAgICAgICB0aGlzLm9wdFVzZUltbWVkaWF0ZWx5U2VsZWN0b3IgPSB0aGlzLm9wdGlvbnNUb29sYmFyU2VsZWN0b3IgKyBcIiAudXNlLWltbWVkaWF0ZWx5XCI7XG4gICAgICAgIHRoaXMub3B0UmVtb3ZlU2NyaXB0c1NlbGVjdG9yID0gdGhpcy5vcHRpb25zVG9vbGJhclNlbGVjdG9yICsgXCIgLnJlbW92ZS1zY3JpcHRzXCI7XG4gICAgICAgIHRoaXMub3B0UmVtb3ZlU3R5bGVzU2VsZWN0b3IgPSB0aGlzLm9wdGlvbnNUb29sYmFyU2VsZWN0b3IgKyBcIiAucmVtb3ZlLXN0eWxlc1wiO1xuICAgICAgICAvKiogU3RvcmVzIHRoZSBsYXN0IGhpZ2hsaWdodGVkIGVsZW1lbnQgKi9cbiAgICAgICAgdGhpcy4kbGFzdEhpZ2hsaWdodGVkID0gbnVsbDtcbiAgICAgICAgdGhpcy5tdWx0aXBsZVNwYWNlUmVnZXggPSBuZXcgUmVnRXhwKFwiXFxcXHN7Mix9XCIsIFwiZ1wiKTtcbiAgICAgICAgdGhpcy5yZWdleENsYXNzTmFtZVN0YXJ0aW5nV2l0aERhc2ggPSBuZXcgUmVnRXhwKFwiXFxcXC4oLVteXFxcXHMuI1xcXFxbXSspXCIsIFwiZ1wiKTtcbiAgICAgICAgdGhpcy5icmFja2V0Q2xhc3NOYW1lUmVnZXggPSBuZXcgUmVnRXhwKCdcXFxcW2NsYXNzPVwiKFteXCJdKylcIlxcXFxdJywgJ2cnKTtcbiAgICAgICAgLyoqIFN0b3JlcyB0aGUgbGFzdCBYSFIgbWFkZSBmb3Igc291cmNlIGNvZGUgcmV0cmlldmFsICovXG4gICAgICAgIHRoaXMubGFzdFVuZmluaXNoZWRTb3VyY2VDb2RlWEhSID0gbnVsbDtcbiAgICAgICAgdGhpcy5pc0Fib3J0ZWQgPSBmYWxzZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBhZGRyZXNzQmFyLCBjc3NTZWxlY3RvclRvb2xiYXIsIGRldlRvb2xzLCBkdHYsIG9wdGlvbnNUb29sYmFyLCBzaWRlYmFySGFuZGxlciB9IGZyb20gXCIuLi9kZXYtdG9vbHNcIjtcbmltcG9ydCB7IE5vdGlmaWNhdGlvblR5cGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uLXRzL2VudW0vTm90aWZpY2F0aW9uVHlwZVwiO1xuaW1wb3J0IHsgTm90aWZpZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uLXRzL05vdGlmaWVyXCI7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25Qb3NpdGlvbiB9IGZyb20gXCIuLi8uLi9jb21tb24tdHMvZW51bS9Ob3RpZmljYXRpb25Qb3NpdGlvblwiO1xuZXhwb3J0IGNsYXNzIElGcmFtZUhhbmRsZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmhvdmVyU2VsZWN0QWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3JlcyB0aGUgY3VycmVudCBVUkwgbG9hZGVkIGludG8gdGhlIGlmcmFtZS5cbiAgICAgICAgICogQHR5cGUge251bGx8c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jdXJyZW50VXJsID0gbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlIGlmcmFtZSBzdGF0dXNcbiAgICAgKiBAcGFyYW0gc3RhdHVzXG4gICAgICovXG4gICAgdXBkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgICAgICBsZXQgJHN0YXR1cyA9ICQoZHR2LmlmcmFtZVN0YXR1c1NlbGVjdG9yKS5maXJzdCgpO1xuICAgICAgICAkc3RhdHVzLmh0bWwoc3RhdHVzID8gc3RhdHVzIDogXCJcIik7XG4gICAgICAgIGlmICghc3RhdHVzIHx8ICFzdGF0dXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAkc3RhdHVzLmFkZENsYXNzKFwiaGlkZGVuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJHN0YXR1cy5yZW1vdmVDbGFzcyhcImhpZGRlblwiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBGbGFzaCB0aGUgYmFja2dyb3VuZCBvZiB0aGUgc3RhdHVzIGVsZW1lbnQgdG8gaW5kaWNhdGUgdGhlIGNoYW5nZVxuICAgICAgICBkZXZUb29scy5mbGFzaEJhY2tncm91bmQoJHN0YXR1cyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhpZ2hsaWdodCBlbGVtZW50cyB3aXRoIGEgc2VsZWN0b3IuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIENTUyBzZWxlY3RvclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2Nyb2xsIFNjcm9sbCB0byB0aGUgdG9wIG9mIHRoZSBmaXJzdCBoaWdobGlnaGVkIGVsZW1lbnRcbiAgICAgKiBAcmV0dXJuIHtpbnRlZ2VyfSBGb3VuZCBlbGVtZW50IGNvdW50XG4gICAgICovXG4gICAgaGlnaGxpZ2h0KHNlbGVjdG9yLCBzY3JvbGwpIHtcbiAgICAgICAgbGV0ICRjb250ZW50cyA9IHRoaXMuZ2V0SWZyYW1lQ29udGVudHMoKTtcbiAgICAgICAgLy8gRmlyc3QsIHJlbW92ZSBjdXJyZW50IGhpZ2hsaWdodHMuXG4gICAgICAgICRjb250ZW50cy5maW5kKFwiLlwiICsgZHR2LmhvdmVyQ2xhc3MpLnJlbW92ZUNsYXNzKGR0di5ob3ZlckNsYXNzKTtcbiAgICAgICAgbGV0IGZvdW5kQ291bnQgPSAwO1xuICAgICAgICAvLyBOb3csIGhpZ2hsaWdodCB0aGUgdGFyZ2V0IGVsZW1lbnRzLlxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0ICRmb3VuZEVsZW1lbnRzID0gJGNvbnRlbnRzLmZpbmQoc2VsZWN0b3IpO1xuICAgICAgICAgICAgJGZvdW5kRWxlbWVudHMuYWRkQ2xhc3MoZHR2LmhvdmVyQ2xhc3MpO1xuICAgICAgICAgICAgLy8gU2Nyb2xsIHRvIHRoZSBmaXJzdCBmb3VuZCBlbGVtZW50XG4gICAgICAgICAgICBpZiAoc2Nyb2xsICE9IHVuZGVmaW5lZCAmJiBzY3JvbGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoJGZvdW5kRWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgb3JpZ2luYWxIb3ZlclNlbGVjdFN0YXR1cyA9IG9wdGlvbnNUb29sYmFyLmlzSG92ZXJTZWxlY3RBY3RpdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZUhvdmVyU2VsZWN0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgJGNvbnRlbnRzLmZpbmQoJ2JvZHknKS5zdG9wKCkuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6ICRmb3VuZEVsZW1lbnRzLmZpcnN0KCkub2Zmc2V0KCkudG9wIC0gJCh3aW5kb3cpLmhlaWdodCgpIC8gNFxuICAgICAgICAgICAgICAgICAgICB9LCA1MDAsICdzd2luZycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcmlnaW5hbEhvdmVyU2VsZWN0U3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZhdGVIb3ZlclNlbGVjdCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3VuZENvdW50ID0gJGZvdW5kRWxlbWVudHMubGVuZ3RoO1xuICAgICAgICAgICAgLy8gQXNzaWduIHRoZSBsYXN0IGhpZ2hsaWdodGVkIGVsZW1lbnQuXG4gICAgICAgICAgICBkdHYuJGxhc3RIaWdobGlnaHRlZCA9ICRmb3VuZEVsZW1lbnRzLmxhc3QoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBmb3VuZENvdW50ID0gMDtcbiAgICAgICAgfVxuICAgICAgICAvLyBTaG93IGZvdW5kIGVsZW1lbnQgY291bnRcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0dXMod2luZG93LndwY2MuZm91bmQgKyBcIjogXCIgKyBmb3VuZENvdW50KTtcbiAgICAgICAgcmV0dXJuIGZvdW5kQ291bnQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFyIGFsbCBoaWdobGlnaHRzXG4gICAgICovXG4gICAgY2xlYXJIaWdobGlnaHRzKCkge1xuICAgICAgICBsZXQgJGNvbnRlbnRzID0gdGhpcy5nZXRJZnJhbWVDb250ZW50cygpO1xuICAgICAgICAvLyBGaXJzdCwgcmVtb3ZlIGN1cnJlbnQgaGlnaGxpZ2h0cy5cbiAgICAgICAgJGNvbnRlbnRzLmZpbmQoXCIuXCIgKyBkdHYuaG92ZXJDbGFzcykucmVtb3ZlQ2xhc3MoZHR2LmhvdmVyQ2xhc3MpO1xuICAgICAgICAvLyBDbGVhciB0aGUgc3RhdHVzXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdHVzKG51bGwpO1xuICAgICAgICAvLyBJbnZhbGlkYXRlIHRoZSBsYXN0IGhpZ2hsaWdodGVkIGVsZW1lbnRcbiAgICAgICAgZHR2LiRsYXN0SGlnaGxpZ2h0ZWQgPSBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gdG8gdGhlIGN1cnNvciBtb3ZlbWVudHMgaW4gdGhlIGlmcmFtZSBpbiB0aGUgZGV2IHRvb2xzIGxpZ2h0Ym94XG4gICAgICovXG4gICAgbGlzdGVuVG9DdXJzb3IoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEF0dGFjaGVzIGV2ZW50cyB0byB0aGUgaWZyYW1lIGVsZW1lbnRzIGFuZCBtYWtlcyBpdCBwb3NzaWJsZSBpbnRlcmFjdCB3aXRoIHRoZSBpZnJhbWUgY29udGVudFxuICAgICAgICAgKi9cbiAgICAgICAgbGV0IGlmcmFtZVJlYWR5Q2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uSWZyYW1lUmVhZHkoKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gU3RhcnQgbGlzdGVuaW5nIHRvIHRoZSBldmVudHMgd2hlbiB0aGUgaWZyYW1lIGlzIHJlYWR5L2xvYWRlZFxuICAgICAgICAvLyBUaGUgcHJvcGVyIHdheSBpcyB0byBsaXN0ZW4gdG8gJ2xvYWQnIGV2ZW50LiBIb3dldmVyLCBpdCBpcyBhbHNvIGltcG9ydGFudCB0aGF0IHRoZSB1c2VyIGNhbiBzdGFydFxuICAgICAgICAvLyBpbnRlcmFjdGluZyB3aXRoIHRoZSBpZnJhbWUgY29udGVudCBhcyBzb29uIGFzIGlmcmFtZSBpcyByZWFkeS4gSGVuY2UsIHdlIGxpc3RlbiBib3RoICdyZWFkeScgYW5kICdsb2FkJ1xuICAgICAgICAvLyBldmVudHMuXG4gICAgICAgIHNlbGYuZ2V0SWZyYW1lKClcbiAgICAgICAgICAgIC5yZWFkeShpZnJhbWVSZWFkeUNhbGxiYWNrKVxuICAgICAgICAgICAgLmxvYWQoaWZyYW1lUmVhZHlDYWxsYmFjayk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgdGhlIHRoaW5ncyB0byBiZSBkb25lIHdoZW4gaWZyYW1lIGlzIHJlYWR5XG4gICAgICovXG4gICAgb25JZnJhbWVSZWFkeSgpIHtcbiAgICAgICAgLy8gR2V0IHRoZSBjb250ZW50cyBpbnNpZGUgdGhlIGlmcmFtZSBzbyB0aGF0IHdlIGNhbiBhc3NpZ24gbGlzdGVuZXJzIHRvIHRoZW1cbiAgICAgICAgbGV0ICRjb250ZW50cyA9IHRoaXMuZ2V0SWZyYW1lQ29udGVudHMoKTtcbiAgICAgICAgLy8gVGhpcyB3aWxsIGJlIGNhbGxlZCB3aGVuIGEgaG92ZXJlZCBlbGVtZW50IGlzIGNsaWNrZWRcbiAgICAgICAgbGV0IGNsaWNrQ2FsbGJhY2sgPSAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIC8vIEdldCB0aGUgQ1NTIHNlbGVjdG9yIGZvciB0aGUgZWxlbWVudFxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBlLnRhcmdldCwgJGVsZW1lbnQgPSAkKGVsZW1lbnQpLCBpZ25vcmVkVGFncyA9IFtcImh0bWxcIiwgXCJib2R5XCJdLCBpZ25vcmVkQXR0cnMgPSBbXCJzcmNcIiwgXCJhbHRcIiwgXCJ0YXJnZXRcIiwgXCJocmVmXCIsIFwidGl0bGVcIiwgXCJ3aWR0aFwiLCBcImhlaWdodFwiLCBcIm1ldGhvZFwiLCBcImRpclwiXTtcbiAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNsYXNzKGR0di5ob3ZlckNsYXNzKTtcbiAgICAgICAgICAgIGxldCBvcHRpbWFsU2VsZWN0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAvLyBkZWZhdWx0IHJlZmVyZW5jZVxuICAgICAgICAgICAgICAgIC8vcm9vdDogZG9jdW1lbnQsXG4gICAgICAgICAgICAgICAgLy9za2lwOiBmdW5jdGlvbih0cmF2ZXJzZU5vZGUpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAvLyBpZ25vcmUgc2VsZWN0IGluZm9ybWF0aW9uIG9mIHRoZSBlbGVtZW50XG4gICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuIHRyYXZlcnNlTm9kZSA9PT0gZWxlbWVudFxuICAgICAgICAgICAgICAgIC8vfSxcbiAgICAgICAgICAgICAgICAvLyBkZWZpbmUgb3JkZXIgb2YgYXR0cmlidXRlIHByb2Nlc3NpbmdcbiAgICAgICAgICAgICAgICBwcmlvcml0eTogWydpZCcsICdjbGFzcycsICd0YWcnXSxcbiAgICAgICAgICAgICAgICAvLyBkZWZpbmUgcGF0dGVybnMgd2hpY2ggc2hvdWxkJ3QgYmUgaW5jbHVkZWRcbiAgICAgICAgICAgICAgICBpZ25vcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc05hbWUuaW5kZXhPZihcIiFcIikgIT09IC0xO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGU6IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSwgZGVmYXVsdFByZWRpY2F0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXhjbHVkZSBIVE1MNSBkYXRhIGF0dHJpYnV0ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLmluQXJyYXkobmFtZSwgaWdub3JlZEF0dHJzKSAhPT0gLTEgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lLmluZGV4T2YoJy8nKSAhPT0gLTEgfHwgLy8gSWdub3JlIFVSTHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5pbmRleE9mKCcvJykgIT09IC0xIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZS5pbmRleE9mKCdcXFxcJykgIT09IC0xIHx8IC8vIElnbm9yZSBVUkxzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUuaW5kZXhPZignXFxcXCcpICE9PSAtMSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgvZGF0YS0qLykudGVzdChuYW1lKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgvYXJpYS0qLykudGVzdChuYW1lKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcmVkaWNhdGUobmFtZSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAvLyBkZWZpbmUgc2ltcGxpZmllZCBpZ25vcmUgcGF0dGVybnMgYXMgYSBib29sZWFuL3N0cmluZy9udW1iZXIvcmVnZXhcbiAgICAgICAgICAgICAgICAgICAgdGFnOiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuaW5BcnJheShuYW1lLCBpZ25vcmVkVGFncykgIT09IC0xO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICgkZWxlbWVudCA9PT0gdW5kZWZpbmVkIHx8ICRlbGVtZW50ID09PSAndW5kZWZpbmVkJyB8fCAkZWxlbWVudCA9PT0gbnVsbCB8fCAhJGVsZW1lbnQubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGxldCBzZWxlY3RvciA9IHdpbmRvdy5PcHRpbWFsU2VsZWN0LnNlbGVjdCgkZWxlbWVudFswXSwgb3B0aW1hbFNlbGVjdE9wdGlvbnMpO1xuICAgICAgICAgICAgLy8gT3B0aW1hbFNlbGVjdCBiZWhhdmVzIGluIGEgd2VpcmQgd2F5IGJ5IHN0YXJ0aW5nIHRoZSBzZWxlY3RvciBmcm9tIFwic3Ryb25nXCIgZWxlbWVudCB3aGVuIHRoZXJlIGlzXG4gICAgICAgICAgICAvLyBhIFwic3Ryb25nXCIgZWxlbWVudCBpbiB0aGUgZm91bmQgc2VsZWN0b3IuIEJlbG93IGlzIGEgd29ya2Fyb3VuZCBmb3IgdGhpcyBwcm9ibGVtLlxuICAgICAgICAgICAgLy8gSWYgdGhpcyBlbGVtZW50IGlzIGluIGEgXCJzdHJvbmdcIiBlbGVtZW50LCBnZXQgQ1NTIHNlbGVjdG9yIGZvciB0aGF0IFwic3Ryb25nXCIgZWxlbWVudCdzIHBhcmVudCBhbmRcbiAgICAgICAgICAgIC8vIHByZXBlbmQgaXQgdG8gdGhlIGZpcnN0IGZvdW5kIHNlbGVjdG9yLlxuICAgICAgICAgICAgaWYgKHNlbGVjdG9yLnN0YXJ0c1dpdGgoXCJzdHJvbmdcIikpIHtcbiAgICAgICAgICAgICAgICBsZXQgJHRhcmdldEVsZW1lbnQgPSAkZWxlbWVudC5jbG9zZXN0KFwic3Ryb25nXCIpLnBhcmVudCgpLCBzdHJvbmdQYXJlbnRTZWxlY3RvciA9IHdpbmRvdy5PcHRpbWFsU2VsZWN0LnNlbGVjdCgkdGFyZ2V0RWxlbWVudFswXSwgb3B0aW1hbFNlbGVjdE9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gc3Ryb25nUGFyZW50U2VsZWN0b3IgKyBcIiBcIiArIHNlbGVjdG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9sKFwiUmF3IFNlbGVjdG9yOiBcIiArIHNlbGVjdG9yKTtcbiAgICAgICAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3JcbiAgICAgICAgICAgICAgICAucmVwbGFjZShkdHYubXVsdGlwbGVTcGFjZVJlZ2V4LCBcIiBcIikgLy8gUmVwbGFjZSBtdWx0aXBsZSBzcGFjZXMgd2l0aCBzaW5nbGUgc3BhY2VcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXDovZywgJzonKSAvLyBSZXBsYWNlIFxcOiB3aXRoIDpcbiAgICAgICAgICAgICAgICAucmVwbGFjZShcIm50aC1jaGlsZCgxKVwiLCBcImZpcnN0LWNoaWxkXCIpIC8vIFByZWZlciBmaXJzdC1jaGlsZFxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKFwiLndwY2MtZWxlbWVudC1ob3ZlcmVkXCIsIFwiXCIpIC8vIFJlbW92ZSBob3ZlciBjbGFzc1xuICAgICAgICAgICAgO1xuICAgICAgICAgICAgLy8gUmVwbGFjZSBjbGFzc2VzIGxpa2UgW2NsYXNzPVwiY2xzMSBjbHMyXCJdIHdpdGggLmNsczEuY2xzMlxuICAgICAgICAgICAgc2VsZWN0b3IgPSBkZXZUb29scy51bmJyYWNrZXRDbGFzc05hbWVzKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBpbXByb3BlciBjbGFzcyBuYW1lc1xuICAgICAgICAgICAgc2VsZWN0b3IgPSBkZXZUb29scy5yZW1vdmVJbXByb3BlckNsYXNzTmFtZXMoc2VsZWN0b3IpO1xuICAgICAgICAgICAgbGV0IHNwbGl0ID0gc2VsZWN0b3Iuc3BsaXQoXCIgXCIpO1xuICAgICAgICAgICAgc3BsaXQgPSAkLm1hcChzcGxpdCwgZnVuY3Rpb24gKHZhbCwgaSkge1xuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB2YWx1ZXMgaGF2aW5nIFwiLlxcXCIgb3IgXCIhXCJcbiAgICAgICAgICAgICAgICByZXR1cm4gKCgvXlxcLlxcXFwvZykudGVzdCh2YWwpIHx8IHZhbC5pbmRleE9mKFwiIVwiKSAhPT0gLTEpID8gbnVsbCA6IHZhbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2VsZWN0b3IgPSBzcGxpdC5qb2luKFwiIFwiKTtcbiAgICAgICAgICAgIC8vbChcIlNlbGVjdG9yOiBcIiArIHNlbGVjdG9yKTtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgQ1NTIHNlbGVjdG9yIGlucHV0XG4gICAgICAgICAgICBjc3NTZWxlY3RvclRvb2xiYXIudXBkYXRlSW5wdXQoc2VsZWN0b3IpO1xuICAgICAgICAgICAgLy8gQ29tcHV0ZSBhbHRlcm5hdGl2ZXNcbiAgICAgICAgICAgIGNzc1NlbGVjdG9yVG9vbGJhci5vblNob3dBbHRlcm5hdGl2ZXMoZSwgZmFsc2UpO1xuICAgICAgICAgICAgLy8gR2V0IHRoZSBzaG9ydGVzdCBhbHRlcm5hdGl2ZVxuICAgICAgICAgICAgbGV0IHNob3J0ZXN0QWx0ZXJuYXRpdmUgPSBkZXZUb29scy5nZXRCZXN0QWx0ZXJuYXRpdmVTZWxlY3RvcigpO1xuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBDU1Mgc2VsZWN0b3IgaW5wdXRcbiAgICAgICAgICAgIGlmIChzaG9ydGVzdEFsdGVybmF0aXZlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY3NzU2VsZWN0b3JUb29sYmFyLnVwZGF0ZUlucHV0KHNob3J0ZXN0QWx0ZXJuYXRpdmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVHJpZ2dlciBrZXl1cCBvbiBDU1Mgc2VsZWN0b3IgaW5wdXQgdG8gdXBkYXRlIGhpZ2hsaWdodHNcbiAgICAgICAgICAgICQoZHR2LmNzc0lucHV0U2VsZWN0b3IpLmtleXVwKCk7XG4gICAgICAgICAgICAvLyBJZiB0aGUgdXNlciB3YW50cyB0byB1c2UgdGhlIGZpcnN0IGZvdW5kIHNlbGVjdG9yLCBkbyBzby5cbiAgICAgICAgICAgIGlmIChvcHRpb25zVG9vbGJhci5pc1VzZUltbWVkaWF0ZWx5KCkpIHtcbiAgICAgICAgICAgICAgICAkKGR0di5jc3NVc2VCdXR0b25TZWxlY3RvcikuY2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RvcjtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gQWRkIHRoZSBob3ZlciBzdHlsZSB0byB0aGUgaWZyYW1lIGlmIGl0IGlzIG5vdCBhbHJlYWR5IGFkZGVkLlxuICAgICAgICBpZiAoISRjb250ZW50cy5maW5kKGR0di5ob3ZlclN0eWxlU2VsZWN0b3IpLmxlbmd0aCkge1xuICAgICAgICAgICAgJGNvbnRlbnRzLmZpbmQoXCJoZWFkXCIpLmFwcGVuZCgkKGR0di5ob3ZlclN0eWxlU2VsZWN0b3IpWzBdLm91dGVySFRNTCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gS2VlcCB0aGUgbGFzdCBob3ZlcmVkIGVsZW1lbnQgc28gdGhhdCB3ZSBjYW4gcmVtb3ZlIHRoZSBzdHlsaW5nIHdlIGFwcGxpZWQgdG8gaXQuXG4gICAgICAgIGR0di4kbGFzdEhpZ2hsaWdodGVkID0gbnVsbDtcbiAgICAgICAgbGV0ICRhbGxFbGVtZW50cyA9ICRjb250ZW50cy5maW5kKFwiKlwiKTtcbiAgICAgICAgJGFsbEVsZW1lbnRzXG4gICAgICAgICAgICAub2ZmKCdjbGljaycpXG4gICAgICAgICAgICAub2ZmKCdob3ZlcicpXG4gICAgICAgICAgICAvLyBIYW5kbGUgY2xpY2sgZXZlbnRzXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIGhpZ2hsaWdodGVkIGVsZW1lbnQsIHJldGFyZ2V0IHRoZSBjbGljayB0byB0aGF0IGVsZW1lbnQuXG4gICAgICAgICAgICBpZiAoZHR2LiRsYXN0SGlnaGxpZ2h0ZWQgIT0gbnVsbCAmJiBlLnRhcmdldCAhPSBkdHYuJGxhc3RIaWdobGlnaHRlZFswXSkge1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0ID0gZHR2LiRsYXN0SGlnaGxpZ2h0ZWRbMF07XG4gICAgICAgICAgICAgICAgY2xpY2tDYWxsYmFjayhlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBPdGhlcndpc2UsIGdvIHRvIHRoZSBjbG9zZXN0IGFuY2hvcidzIFVSTCBpZiB0aGUgaG92ZXIgc2VsZWN0IGlzIGRlYWN0aXZhdGVkLlxuICAgICAgICAgICAgaWYgKCFvcHRpb25zVG9vbGJhci5pc0hvdmVyU2VsZWN0QWN0aXZlKCkpIHtcbiAgICAgICAgICAgICAgICBsZXQgJHRhcmdldCA9ICQoZS50YXJnZXQpO1xuICAgICAgICAgICAgICAgIGFkZHJlc3NCYXIuZ28oJHRhcmdldC5jbG9zZXN0KCdhJykuYXR0cihcImhyZWZcIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAgICAgLy8gTGlzdGVuIHRvIHRoZSBob3ZlciBldmVudHMgZm9yIGFsbCBlbGVtZW50c1xuICAgICAgICAgICAgLmhvdmVyKChlKSA9PiB7XG4gICAgICAgICAgICBsZXQgJGVsZW1lbnQgPSAkKGUudGFyZ2V0KTtcbiAgICAgICAgICAgIC8vIEl0IHNob3VsZCBiZSBwb3NzaWJsZSB0byB0YXJnZXQgYW4gSFRNTCB0YWcuIEZvciBleGFtcGxlLCBpZiB0aGUgdGFyZ2V0IHRhZyBpcyAnYScsXG4gICAgICAgICAgICAvLyB3aGVuIGFuIGVsZW1lbnQgaXMgaG92ZXJlZCwgdGhlIGNsb3Nlc3QgJ2EnIHRhZyBzaG91bGQgYmUgaG92ZXJlZCBpbnN0ZWFkLiBTbywgJGVsZW1lbnRcbiAgICAgICAgICAgIC8vIHNob3VsZCBiZSB0aGUgYmVzdCBwb3NzaWJsZSBlbGVtZW50IGhhdmluZyB0aGUgdGFyZ2V0IEhUTUwgdGFnLlxuICAgICAgICAgICAgaWYgKG9wdGlvbnNUb29sYmFyLnRhcmdldEhUTUxUYWdTZWxlY3RvciAhPSBudWxsICYmICRlbGVtZW50LnByb3AoXCJ0YWdOYW1lXCIpLnRvTG93ZXJDYXNlKCkgIT0gb3B0aW9uc1Rvb2xiYXIudGFyZ2V0SFRNTFRhZ1NlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgbGV0ICRjbG9zZXN0SW5uZXIgPSAkZWxlbWVudC5maW5kKG9wdGlvbnNUb29sYmFyLnRhcmdldEhUTUxUYWdTZWxlY3RvcikuZmlyc3QoKSwgJGNsb3Nlc3RPdXRlciA9ICRlbGVtZW50LmNsb3Nlc3Qob3B0aW9uc1Rvb2xiYXIudGFyZ2V0SFRNTFRhZ1NlbGVjdG9yKSwgZWxQYXJlbnRDb3VudCA9ICRlbGVtZW50LnBhcmVudHMoKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlcmUgYXJlIHR3byB0YXJnZXQgZWxlbWVudHMgZm91bmQsIGtlZXAgdGhlIGNsb3Nlc3Qgb25lLlxuICAgICAgICAgICAgICAgIGlmICgkY2xvc2VzdElubmVyLmxlbmd0aCAmJiAkY2xvc2VzdE91dGVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJGNsb3Nlc3RJbm5lci5wYXJlbnRzKCkubGVuZ3RoIC0gZWxQYXJlbnRDb3VudCA8IGVsUGFyZW50Q291bnQgLSAkY2xvc2VzdE91dGVyLnBhcmVudHMoKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbGVtZW50ID0gJGNsb3Nlc3RJbm5lcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbGVtZW50ID0gJGNsb3Nlc3RPdXRlcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBvbmx5IHRoZSBjbG9zZXN0IGlubmVyIGVsZW1lbnQsIHVzZSBpdC5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoJGNsb3Nlc3RJbm5lci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQgPSAkY2xvc2VzdElubmVyO1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBvbmx5IHRoZSBjbG9zZXN0IG91dGVyIGVsZW1lbnQsIHVzZSBpdC5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoJGNsb3Nlc3RPdXRlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQgPSAkY2xvc2VzdE91dGVyO1xuICAgICAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UsIGRvIG5vdCBwcm9jZWVkLCBzaW5jZSB0aGVyZSBhcmUgbm8gdGFyZ2V0IGVsZW1lbnRzIGZvdW5kLlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBQcmV2ZW50IGNsaWNraW5nIHRoZSBsaW5rcy5cbiAgICAgICAgICAgICAgICAgICAgLy8kZWxlbWVudC5jbGljayhmdW5jdGlvbigkZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAkZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAvL30pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRG8gbm90IHByb2NlZWQgaWYgaG92ZXIgc2VsZWN0IGlzIG5vdCBhY3RpdmVcbiAgICAgICAgICAgIGlmICghdGhpcy5ob3ZlclNlbGVjdEFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIC8vLy8gUHJldmVudCBjbGlja2luZyB0aGUgbGlua3MuXG4gICAgICAgICAgICAgICAgLy8kZWxlbWVudC5jbGljayhmdW5jdGlvbigkZSkge1xuICAgICAgICAgICAgICAgIC8vICAgICRlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgLy99KTtcbiAgICAgICAgICAgICAgICBpZiAoZHR2LiRsYXN0SGlnaGxpZ2h0ZWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBkdHYuJGxhc3RIaWdobGlnaHRlZC5vZmYoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgIGR0di4kbGFzdEhpZ2hsaWdodGVkID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgdGhlcmUgd2FzIGEgaG92ZXJlZCBlbGVtZW50LCBjbGVhciBpdHMgY2xpY2sgY2FsbGJhY2sgYW5kIHJlbW92ZSBob3ZlciBjbGFzcyBmcm9tIGl0LlxuICAgICAgICAgICAgaWYgKGR0di4kbGFzdEhpZ2hsaWdodGVkKSB7XG4gICAgICAgICAgICAgICAgZHR2LiRsYXN0SGlnaGxpZ2h0ZWRcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKGR0di5ob3ZlckNsYXNzKVxuICAgICAgICAgICAgICAgICAgICAub2ZmKCdjbGljaycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQWRkIHRoZSBob3ZlciBjbGFzcyB0byB0aGUgY3VycmVudGx5IGhvdmVyZWQgZWxlbWVudCBhbmQgYXNzaWduIHRoZSBjbGljayBjYWxsYmFjay5cbiAgICAgICAgICAgICRlbGVtZW50XG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKGR0di5ob3ZlckNsYXNzKVxuICAgICAgICAgICAgICAgIC5jbGljayhlID0+IGNsaWNrQ2FsbGJhY2soZSkpO1xuICAgICAgICAgICAgLy8gV2UgYXJlIGRvbmUgd2l0aCB0aGUgY3VycmVudGx5IGhvdmVyZWQgZWxlbWVudC4gU2V0IGl0IGFzIGxhc3QgaG92ZXJlZCBlbGVtZW50LlxuICAgICAgICAgICAgZHR2LiRsYXN0SGlnaGxpZ2h0ZWQgPSAkZWxlbWVudDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExpc3RlbiB0byB0aGUga2V5Ym9hcmQgZXZlbnRzIGZyb20gaW5zaWRlIHRoZSBpZnJhbWVcbiAgICAgKi9cbiAgICBsaXN0ZW5Ub0tleWJvYXJkKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCByZWFkeUNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gR2V0IHRoZSBpZnJhbWUncyBkb2N1bWVudFxuICAgICAgICAgICAgbGV0IGlmcmFtZSA9IHNlbGYuZ2V0SWZyYW1lKClbMF0sIGRvYyA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICAgICAgICAgICAgLy8gTGlzdGVuIHRvIHRoZSBrZXlkb3duIGV2ZW50cyBpbnNpZGUgdGhlIGlmcmFtZSBkb2N1bWVudFxuICAgICAgICAgICAgJChkb2MpLm9uKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBzaWRlYmFySGFuZGxlci5oYW5kbGVLZXlQcmVzcyhlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICAvLyBDYWxsIHRoZSBjYWxsYmFjayB3aGVuIHRoZSBpZnJhbWUgaXMgcmVhZHkgYW5kIGxvYWRlZC5cbiAgICAgICAgc2VsZi5nZXRJZnJhbWUoKVxuICAgICAgICAgICAgLnJlYWR5KHJlYWR5Q2FsbGJhY2spXG4gICAgICAgICAgICAubG9hZChyZWFkeUNhbGxiYWNrKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSWYgdGhlcmUgaXMgYSBDU1Mgc2VsZWN0b3IgYWxyZWFkeSBkZWZpbmVkIGJ5IHRoZSB1c2VyLCB0cmllcyB0byBmaW5kIGFuZCBoaWdobGlnaHQgdGhlIGVsZW1lbnQgaW4gdGhlIGlmcmFtZS5cbiAgICAgKiBJZiB0aGVyZSBpcyBubyBDU1Mgc2VsZWN0b3IgZGVmaW5lZCBieSB0aGUgdXNlciBhbmQgdGhlcmUgYXJlIHRhcmdldCBDU1Mgc2VsZWN0b3JzIGZvciB0aGUgY3VycmVudCBERVYgdG9vbHNcbiAgICAgKiBidXR0b24sIHRyaWVzIHRvIGZpbmQgZWxlbWVudHMgYnkgdXNpbmcgdGhvc2Ugc2VsZWN0b3JzIGFuZCBoaWdobGlnaHQgdGhlbS5cbiAgICAgKi9cbiAgICBpbml0Q3NzU2VsZWN0b3JzKCkge1xuICAgICAgICAvLyBEbyBldmVyeXRoaW5nIGluIGEgY2FsbGJhY2sgc28gdGhhdCB3ZSBjYW4gYXR0YWNoIHRoZSBjYWxsYmFjayB0byBtdWx0aXBsZSBldmVudHMuXG4gICAgICAgIGxldCBjYWxsYmFjayA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50Q3NzU2VsZWN0b3JWYWwgPSBjc3NTZWxlY3RvclRvb2xiYXIuZ2V0Q3NzU2VsZWN0b3JJbnB1dCgpLnZhbCgpLCBmb3VuZENvdW50ID0gMDtcbiAgICAgICAgICAgIC8vIElmIGN1cnJlbnQgQ1NTIHNlbGVjdG9yIGV4aXN0cywgdHJ5IHRvIGhpZ2hsaWdodCBpdC5cbiAgICAgICAgICAgIGlmIChjdXJyZW50Q3NzU2VsZWN0b3JWYWwgIT0gdW5kZWZpbmVkICYmIGN1cnJlbnRDc3NTZWxlY3RvclZhbC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBmb3VuZENvdW50ID0gdGhpcy5oaWdobGlnaHQoY3VycmVudENzc1NlbGVjdG9yVmFsLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UsIHVzZSB0YXJnZXQgQ1NTIHNlbGVjdG9ycyBpZiB0aGV5IGV4aXN0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIGJ1dHRvbiBkYXRhXG4gICAgICAgICAgICAgICAgbGV0IGJ1dHRvbkRhdGEgPSBkdHYuJGN1cnJlbnREZXZUb29sc0J1dHRvbi5kYXRhKFwid2NjXCIpO1xuICAgICAgICAgICAgICAgIGlmIChidXR0b25EYXRhID09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIC8vIEdldCB0YXJnZXQgc2VsZWN0b3JzXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldFNlbGVjdG9ycyA9IGJ1dHRvbkRhdGFbXCJ0YXJnZXRDc3NTZWxlY3RvcnNcIl07XG4gICAgICAgICAgICAgICAgLy8gRG8gbm90IHByb2NlZWQgaWYgdGFyZ2V0IENTUyBzZWxlY3RvcnMgZG8gbm90IGV4aXN0LlxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRTZWxlY3RvcnMgPT0gdW5kZWZpbmVkIHx8ICF0YXJnZXRTZWxlY3RvcnMubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgLy8gTm93LCB0cnkgdG8gZmluZCB0aGUgZWxlbWVudHMgd2l0aCB0aGUgc2VsZWN0b3JzIG9uZSBieSBvbmUuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiB0YXJnZXRTZWxlY3RvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0YXJnZXRTZWxlY3RvcnMuaGFzT3duUHJvcGVydHkoaSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdG9yID0gdGFyZ2V0U2VsZWN0b3JzW2ldO1xuICAgICAgICAgICAgICAgICAgICAvLyBXZSd2ZSBmb3VuZCBhdCBsZWFzdCBvbmUgbWF0Y2guXG4gICAgICAgICAgICAgICAgICAgIGZvdW5kQ291bnQgPSB0aGlzLmhpZ2hsaWdodChzZWxlY3RvciwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3VuZENvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2V0IHRoZSBDU1MgaW5wdXQgYW5kIGhpZ2hsaWdodCB0aGUgZm91bmQgZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzc1NlbGVjdG9yVG9vbGJhci51cGRhdGVJbnB1dChzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBOb3RpZnkgdGhlIHVzZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIE5vdGlmaWVyLmdldEluc3RhbmNlKCkubm90aWZ5UmVndWxhcihjc3NTZWxlY3RvclRvb2xiYXIuZ2V0Q3NzU2VsZWN0b3JJbnB1dCgpLCB3aW5kb3cud3BjYy5jc3Nfc2VsZWN0b3JfZm91bmQsIE5vdGlmaWNhdGlvblR5cGUuU1VDQ0VTUywgTm90aWZpY2F0aW9uUG9zaXRpb24uQk9UVE9NKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9uZSBtYXRjaCBpcyBlbm91Z2guIERvIG5vdCBwcm9jZWVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvLyBDYWxsIHRoZSBjYWxsYmFjayB3aGVuIHRoZSBpZnJhbWUgaXMgcmVhZHkgYW5kIGxvYWRlZC5cbiAgICAgICAgdGhpcy5nZXRJZnJhbWUoKVxuICAgICAgICAgICAgLnJlYWR5KGNhbGxiYWNrKVxuICAgICAgICAgICAgLmxvYWQoY2FsbGJhY2spO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGlmcmFtZSBqUXVlcnkgZWxlbWVudFxuICAgICAqIEByZXR1cm5zIHsqfGpRdWVyeXxIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICBnZXRJZnJhbWUoKSB7XG4gICAgICAgIHJldHVybiAkKGR0di5pZnJhbWVTZWxlY3Rvcik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBjb250ZW50cyBvZiB0aGUgaWZyYW1lLlxuICAgICAqIEByZXR1cm5zIHsqfHt4bWwsIGh0bWwsIGpzb259fHtzY3JpcHR9fVxuICAgICAqL1xuICAgIGdldElmcmFtZUNvbnRlbnRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJZnJhbWUoKS5jb250ZW50cygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgY3VycmVudCBVUkwgbG9hZGVkIGludG8gdGhlIGlmcmFtZS5cbiAgICAgKiBAcmV0dXJucyB7bnVsbHxzdHJpbmd8c3RyaW5nfCp9XG4gICAgICovXG4gICAgZ2V0Q3VycmVudFVybCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFVybDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTG9hZCBhIFVSTCBpbnRvIHRoZSBpZnJhbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAgICovXG4gICAgbG9hZFVybCh1cmwpIHtcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSBVUkwgaXMgdmFsaWRcbiAgICAgICAgaWYgKHVybCA9PSB1bmRlZmluZWQgfHwgIXVybCB8fCAhdXJsLmxlbmd0aCB8fCB1cmwuaW5kZXhPZihcImh0dHBcIikgIT09IDApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTG9hZCBVUkw6IFwiICsgdXJsKTtcbiAgICAgICAgdGhpcy5jdXJyZW50VXJsID0gdXJsO1xuICAgICAgICBhZGRyZXNzQmFyLnNldEFkZHJlc3NCYXJVcmwodXJsKTtcbiAgICAgICAgYWRkcmVzc0Jhci5lbmFibGVCdXR0b24oJChkdHYucmVmcmVzaEJ1dHRvblNlbGVjdG9yKSk7XG4gICAgICAgIGFkZHJlc3NCYXIuaGlzdG9yeVVwZGF0ZWQoKTtcbiAgICAgICAgaWYgKGFkZHJlc3NCYXIuY3VycmVudEhpc3RvcnlJbmRleCA9PSAwKSB7XG4gICAgICAgICAgICBhZGRyZXNzQmFyLmRpc2FibGVCdXR0b24oJChkdHYuYmFja0J1dHRvblNlbGVjdG9yKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYWRkcmVzc0Jhci5oaXN0b3J5Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGFkZHJlc3NCYXIuZW5hYmxlQnV0dG9uKCQoZHR2LmJhY2tCdXR0b25TZWxlY3RvcikpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEluZGljYXRlIHRoZSBVUkwgaXMgYmVpbmcgbG9hZGVkXG4gICAgICAgIGxldCAkdXJsSW5wdXQgPSAkKGR0di51cmxJbnB1dFNlbGVjdG9yKTtcbiAgICAgICAgJHVybElucHV0LmFkZENsYXNzKFwibG9hZGluZ1wiKTtcbiAgICAgICAgLy8gTG9hZCB0aGUgVVJMXG4gICAgICAgIGxldCBkYXRhID0gJChkdHYuZGV2VG9vbHNCdXR0b25TZWxlY3RvcikuZGF0YShcIndjY1wiKTtcbiAgICAgICAgZGV2VG9vbHMuZ2V0U291cmNlQ29kZSh1cmwsIGRhdGEsIFxuICAgICAgICAvLyBEb25lXG4gICAgICAgIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgLy8gRG8gbm90IHByb2NlZWQgaWYgdGhlIHJlc3BvbnNlIGlzIG5vdCB2YWxpZC5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZSA9PSB1bmRlZmluZWQgfHwgcmVzcG9uc2UgPT0gbnVsbCB8fCByZXNwb25zZS5odG1sID09IHVuZGVmaW5lZCB8fCAhcmVzcG9uc2UuaHRtbC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlcXVlc3Qgc3VjY2VlZGVkLiBHZXR0aW5nIHNvdXJjZSBjb2RlIHdhcyBub3Qgc3VjY2Vzc2Z1bC4gUmVzcG9uc2U6XCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAvLyBTaG93IGluZm9ybWF0aW9uIG1lc3NhZ2VzLCBpZiB0aGVyZSBhcmUgYW55LlxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5pbmZvVmlldyAhPT0gdW5kZWZpbmVkICYmIHJlc3BvbnNlLmluZm9WaWV3ICE9PSBudWxsICYmIHJlc3BvbnNlLmluZm9WaWV3ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIHN0eWxlIFVSTCwgaW5qZWN0IGl0IHRvIHRoZSBpZnJhbWUuXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZVVybCA9IHJlc3BvbnNlLmluZm9TdHlsZVVybCB8fCBudWxsO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmlldyA9ICcnO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3R5bGVVcmwgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcgPSAnPGh0bWw+PGhlYWQ+PGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCInICsgc3R5bGVVcmwgKyAnXCIgdHlwZT1cInRleHQvY3NzXCI+PC9oZWFkPjxib2R5PicgKyByZXNwb25zZS5pbmZvVmlldyArICc8L2JvZHk+PC9odG1sPic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3ID0gcmVzcG9uc2UuaW5mb1ZpZXc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRJZnJhbWVDb250ZW50KHZpZXcsIHVybCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFJlZnJlc2ggdGhlIGNvbnRlbnRcbiAgICAgICAgICAgIHRoaXMuc2V0SWZyYW1lQ29udGVudChyZXNwb25zZS5odG1sLCB1cmwpO1xuICAgICAgICB9LCBcbiAgICAgICAgLy8gRmFpbFxuICAgICAgICBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNUZXh0ID09ICdhYm9ydCcpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZXF1ZXN0IGZhaWxlZC4gR2V0dGluZyBzb3VyY2UgY29kZSB3YXMgbm90IHN1Y2Nlc3NmdWwuIFJlc3BvbnNlOlwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgfSwgXG4gICAgICAgIC8vIEFsd2F5c1xuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBJbmRpY2F0ZSB0aGUgcHJvY2VzcyBoYXMgZmluaXNoZWQuXG4gICAgICAgICAgICAkdXJsSW5wdXQucmVtb3ZlQ2xhc3MoXCJsb2FkaW5nXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IGNvbnRlbnQgb2YgdGhlIGlmcmFtZSBpbiB0aGUgbGlnaHRib3guIFRoZSBjb250ZW50IHdpbGwgYmUgaW50ZXJhY3RlZCB3aXRoLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IEhUTUxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFVSTCBvZiB0aGUgY29udGVudFxuICAgICAqL1xuICAgIHNldElmcmFtZUNvbnRlbnQoY29udGVudCwgdXJsKSB7XG4gICAgICAgIGxldCAkaWZyYW1lID0gJChkdHYuaWZyYW1lU2VsZWN0b3IpLmZpcnN0KCksIGlmcmFtZSA9ICRpZnJhbWVbMF0sIGlmcmFtZWRvYyA9IGlmcmFtZS5jb250ZW50RG9jdW1lbnQgfHwgaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQsIGN1cnJlbnRVcmwgPSAkaWZyYW1lLmRhdGEoXCJjdXJyZW50dXJsXCIpO1xuICAgICAgICAvLyBEbyBub3QgcHJvY2VlZCBpZiB0aGUgc2FtZSBVUkwgaXMgdHJpZWQgdG8gYmUgbG9hZGVkLCBzaW5jZSBpdHMgc291cmNlIGNvZGUgYXJlIGFscmVhZHkgaW5zaWRlIHRoZSBpZnJhbWUuXG4gICAgICAgIGlmIChjdXJyZW50VXJsICE9IHVuZGVmaW5lZCAmJiBjdXJyZW50VXJsID09IHVybClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgLy9pZnJhbWVkb2MuYm9keS5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgICAgICBpZnJhbWVkb2Mub3BlbigpO1xuICAgICAgICBpZnJhbWVkb2Mud3JpdGUoY29udGVudCk7XG4gICAgICAgIGlmcmFtZWRvYy5jbG9zZSgpO1xuICAgICAgICB0aGlzLnNldElmcmFtZUhlaWdodCgpO1xuICAgICAgICAkaWZyYW1lLmRhdGEoXCJjdXJyZW50dXJsXCIsIHVybCk7XG4gICAgICAgIC8vIExpc3RlbiB0byB0aGUgY3Vyc29yIG1vdmVtZW50c1xuICAgICAgICB0aGlzLmxpc3RlblRvQ3Vyc29yKCk7XG4gICAgICAgIC8vIExpc3RlbiB0byB0aGUga2V5Ym9hcmRcbiAgICAgICAgdGhpcy5saXN0ZW5Ub0tleWJvYXJkKCk7XG4gICAgICAgIC8vIEluaXRpYWxpemUgc2VsZWN0b3JzLiBZb3UgY2FuIHJlYWQgbWV0aG9kIGRlc2NyaXB0aW9uIHRvIGJldHRlciB1bmRlcnN0YW5kIHdoYXQgaXQgZG9lcy5cbiAgICAgICAgdGhpcy5pbml0Q3NzU2VsZWN0b3JzKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGhlaWdodCBvZiB0aGUgaWZyYW1lIHNvIHRoYXQgaXQgZmlsbHMgdGhlIHJlbWFpbmluZyBzcGFjZSBpbnNpZGUgb2YgdGhlIGxpZ2h0Ym94XG4gICAgICovXG4gICAgc2V0SWZyYW1lSGVpZ2h0KCkge1xuICAgICAgICBsZXQgJHRvb2xiYXIgPSAkKGR0di50b29sYmFyU2VsZWN0b3IpLmZpcnN0KCksIHRvb2xiYXJIZWlnaHQgPSAkdG9vbGJhci5pbm5lckhlaWdodCgpLCAkaWZyYW1lID0gJChkdHYuaWZyYW1lU2VsZWN0b3IpLmZpcnN0KCk7XG4gICAgICAgICRpZnJhbWUuY3NzKFwiaGVpZ2h0XCIsIFwiY2FsYygxMDAlIC0gXCIgKyB0b29sYmFySGVpZ2h0ICsgXCJweClcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFjdGl2YXRlL2RlYWN0aXZhdGUgaG92ZXIgc2VsZWN0XG4gICAgICogQHBhcmFtIHtib29sZWFufSBhY3RpdmVcbiAgICAgKi9cbiAgICBhY3RpdmF0ZUhvdmVyU2VsZWN0KGFjdGl2ZSkge1xuICAgICAgICB0aGlzLmhvdmVyU2VsZWN0QWN0aXZlID0gYWN0aXZlO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGR0diwgaWZyYW1lSGFuZGxlciwgZGV2VG9vbHMgfSBmcm9tIFwiLi4vZGV2LXRvb2xzXCI7XG5leHBvcnQgY2xhc3MgT3B0aW9uc1Rvb2xiYXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnRhcmdldEhUTUxUYWdTZWxlY3RvciA9IG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoYW5nZSBoYW5kbGVyIGZvciB0YXJnZXQgSFRNTCB0YWcgaW5wdXRcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZSBFdmVudFxuICAgICAqL1xuICAgIG9uQ2hhbmdlVGFyZ2V0SFRNTFRhZ0lucHV0KGUpIHtcbiAgICAgICAgbGV0IHZhbCA9ICQoZHR2Lm9wdFRhcmdldEhUTUxUYWdTZWxlY3RvcikudmFsKCk7XG4gICAgICAgIC8vIElmIHRoZXJlIGlzIG5vIHZhbHVlLCBzZXQgdGhlIHRhcmdldCBIVE1MIHNlbGVjdG9yIGFzIG51bGwuXG4gICAgICAgIGlmICh2YWwgPT0gdW5kZWZpbmVkIHx8ICF2YWwubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnRhcmdldEhUTUxUYWdTZWxlY3RvciA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBnZXQgdGhlIHBhcnQgdW50aWwgc3BhY2UgYW5kIHRyaW0gaXQgdG8gY2xlYXIgYW55IHdoaXRlc3BhY2UuXG4gICAgICAgIHRoaXMudGFyZ2V0SFRNTFRhZ1NlbGVjdG9yID0gJC50cmltKHZhbC5zcGxpdChcIiBcIilbMF0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayBoYW5kbGluZyB0aGUgY2xpY2sgZXZlbnRzIG9uIHRvZ2dsZSBob3ZlciBzZWxlY3QgYnV0dG9uXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGUgRXZlbnRcbiAgICAgKi9cbiAgICBvbkNsaWNrVG9nZ2xlSG92ZXJTZWxlY3QoZSkge1xuICAgICAgICBsZXQgJG9wdGlvbkJ1dHRvbiA9ICQoZHR2Lm9wdEhvdmVyU2VsZWN0U2VsZWN0b3IpLmZpcnN0KCk7XG4gICAgICAgICRvcHRpb25CdXR0b24udG9nZ2xlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgIC8vIEFjdGl2YXRlL2RlYWN0aXZhdGUgaG92ZXIgc2VsZWN0IGluIHRoZSBpZnJhbWVcbiAgICAgICAgaWZyYW1lSGFuZGxlci5hY3RpdmF0ZUhvdmVyU2VsZWN0KCRvcHRpb25CdXR0b24uaGFzQ2xhc3MoXCJhY3RpdmVcIikpO1xuICAgICAgICAvLyBTYXZlIG9wdGlvbnNcbiAgICAgICAgZGV2VG9vbHMuc2F2ZVN0YXRlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGhvdmVyIHNlbGVjdCBpcyBhY3RpdmVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbnwqfVxuICAgICAqL1xuICAgIGlzSG92ZXJTZWxlY3RBY3RpdmUoKSB7XG4gICAgICAgIGxldCAkb3B0aW9uQnV0dG9uID0gJChkdHYub3B0SG92ZXJTZWxlY3RTZWxlY3RvcikuZmlyc3QoKTtcbiAgICAgICAgcmV0dXJuICRvcHRpb25CdXR0b24uaGFzQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIFwiYXBwbHkgbWFuaXB1bGF0aW9uIG9wdGlvbnNcIiBpcyBhY3RpdmVcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBpc0FwcGx5TWFuaXB1bGF0aW9uT3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuICQoZHR2Lm9wdEFwcGx5TWFuaXB1bGF0aW9uT3B0aW9uc1NlbGVjdG9yKVswXS5jaGVja2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBcInVzZSBpbW1lZGlhdGVseVwiIGlzIGFjdGl2ZVxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIGlzVXNlSW1tZWRpYXRlbHkoKSB7XG4gICAgICAgIHJldHVybiAkKGR0di5vcHRVc2VJbW1lZGlhdGVseVNlbGVjdG9yKVswXS5jaGVja2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBzY3JpcHRzIHNob3VsZCBiZSByZW1vdmVkXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgaXNSZW1vdmVTY3JpcHRzKCkge1xuICAgICAgICByZXR1cm4gJChkdHYub3B0UmVtb3ZlU2NyaXB0c1NlbGVjdG9yKVswXS5jaGVja2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBzdHlsZXMgc2hvdWxkIGJlIHJlbW92ZWRcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBpc1JlbW92ZVN0eWxlcygpIHtcbiAgICAgICAgcmV0dXJuICQoZHR2Lm9wdFJlbW92ZVN0eWxlc1NlbGVjdG9yKVswXS5jaGVja2VkO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGR0diwgaWZyYW1lSGFuZGxlciwgYWRkcmVzc0JhciwgY3NzU2VsZWN0b3JUb29sYmFyLCBkZXZUb29scyB9IGZyb20gXCIuLi9kZXYtdG9vbHNcIjtcbmV4cG9ydCBjbGFzcyBTaWRlYmFySGFuZGxlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucHJldmVudEhvdmVyRXZlbnQgPSBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTG9hZHMgdGhlIHNpZGViYXJcbiAgICAgKi9cbiAgICBsb2FkU2lkZWJhcigpIHtcbiAgICAgICAgdGhpcy5vblVwZGF0ZUFsbFVzZWRTZWxlY3RvcnMobnVsbCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBhbHRlcm5hdGl2ZSBDU1Mgc2VsZWN0b3JzIHNlY3Rpb24gb2YgdGhlIHNpZGViYXJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhbHRlcm5hdGl2ZXMgQW4gYXJyYXkgb2YgQ1NTIHNlbGVjdG9yc1xuICAgICAqIEByZXR1cm4ge0FycmF5fSBBbiBhcnJheSBvZiBvYmplY3RzIHdpdGggZWFjaCBzdG9yaW5nIGFuIGFsdGVybmF0aXZlIHNlbGVjdG9yIGFuZCBudW1iZXIgb2YgZWxlbWVudHMgZm91bmRcbiAgICAgKiB2aWEgdGhhdCBzZWxlY3Rvci5cbiAgICAgKi9cbiAgICB1cGRhdGVBbHRlcm5hdGl2ZVNlbGVjdG9ycyhhbHRlcm5hdGl2ZXMpIHtcbiAgICAgICAgbGV0IHByZXBhcmVkSHRtbCA9ICcnLCAkY29udGVudHMgPSBpZnJhbWVIYW5kbGVyLmdldElmcmFtZUNvbnRlbnRzKCksIGFsdGVybmF0aXZlT2JqZWN0cyA9IFtdLCBvLCBjb3VudDtcbiAgICAgICAgZm9yIChsZXQgaSBpbiBhbHRlcm5hdGl2ZXMpIHtcbiAgICAgICAgICAgIGlmICghYWx0ZXJuYXRpdmVzLmhhc093blByb3BlcnR5KGkpKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgY291bnQgPSAkY29udGVudHMuZmluZChhbHRlcm5hdGl2ZXNbaV0pLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChjb3VudCA8IDEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBvID0ge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBhbHRlcm5hdGl2ZXNbaV0sXG4gICAgICAgICAgICAgICAgY291bnQ6IGNvdW50XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYWx0ZXJuYXRpdmVPYmplY3RzLnB1c2gobyk7XG4gICAgICAgICAgICBwcmVwYXJlZEh0bWwgKz0gdGhpcy5nZXRDc3NTZWxlY3Rvckxpc3RJdGVtSHRtbChvKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBVcGRhdGUgdGhlIHNpZGViYXIgc2VjdGlvblxuICAgICAgICB0aGlzLnVwZGF0ZVNlY3Rpb25Db250ZW50KFwiPHVsIGRhdGEtYWx0ZXJuYXRpdmVzPSdcIiArIEpTT04uc3RyaW5naWZ5KGFsdGVybmF0aXZlT2JqZWN0cykgKyBcIic+XCIgKyBwcmVwYXJlZEh0bWwgKyBcIjwvdWw+XCIsIGR0di5zaWRlYmFyU2VjdGlvbkFsdGVybmF0aXZlU2VsZWN0b3JzQ2xhc3MpO1xuICAgICAgICByZXR1cm4gYWx0ZXJuYXRpdmVPYmplY3RzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgYWxsIHVzZWQgc2VsZWN0b3JzIHNlY3Rpb24gb2YgdGhlIHNpZGViYXJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZSBFdmVudFxuICAgICAqL1xuICAgIG9uVXBkYXRlQWxsVXNlZFNlbGVjdG9ycyhlKSB7XG4gICAgICAgIGxldCBhbGxTZWxlY3RvcnMgPSBbXSwgJHNlbGYsIG5hbWUsIHZhbCwgdmFsQ291bnRlciA9IFtdO1xuICAgICAgICAvLyBGaW5kIGFsbCB1c2VkIENTUyBzZWxlY3RvcnNcbiAgICAgICAgJChkdHYuc2V0dGluZ3NNZXRhQm94U2VsZWN0b3IpLmZpbmQoXCJpbnB1dC5jc3Mtc2VsZWN0b3JcIikuZWFjaCgoaSwgZWwpID0+IHtcbiAgICAgICAgICAgICRzZWxmID0gJChlbCk7XG4gICAgICAgICAgICBuYW1lID0gJHNlbGYuYXR0cihcIm5hbWVcIik7XG4gICAgICAgICAgICBpZiAobmFtZS5pbmRleE9mKFwic2VsZWN0b3JcIikgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gJHNlbGYudmFsKCk7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCAhPSB1bmRlZmluZWQgJiYgdmFsLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsQ291bnRlci5oYXNPd25Qcm9wZXJ0eSh2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxDb3VudGVyW3ZhbF0gKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsbFNlbGVjdG9ycy5wdXNoKHZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxDb3VudGVyW3ZhbF0gPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IHByZXBhcmVkU2VsZWN0b3JzID0gW10sIGN1cnJlbnQsIHByZXBhcmVkSHRtbCA9ICcnO1xuICAgICAgICBmb3IgKGxldCBpIGluIGFsbFNlbGVjdG9ycykge1xuICAgICAgICAgICAgaWYgKGFsbFNlbGVjdG9ycy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgICAgIHZhbCA9IGFsbFNlbGVjdG9yc1tpXTtcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0ge1xuICAgICAgICAgICAgICAgICAgICBjb3VudDogdmFsQ291bnRlclt2YWxdLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjogdmFsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBwcmVwYXJlZFNlbGVjdG9ycy5wdXNoKGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgIHByZXBhcmVkSHRtbCArPSB0aGlzLmdldENzc1NlbGVjdG9yTGlzdEl0ZW1IdG1sKGN1cnJlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgc2lkZWJhciBzZWN0aW9uXG4gICAgICAgIHRoaXMudXBkYXRlU2VjdGlvbkNvbnRlbnQoXCI8dWw+XCIgKyBwcmVwYXJlZEh0bWwgKyBcIjwvdWw+XCIsIGR0di5zaWRlYmFyU2VjdGlvblVzZWRTZWxlY3RvcnNDbGFzcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgY29udGVudCBvZiBhIHNlY3Rpb24uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGh0bWwgTmV3IEhUTUwgZm9yIHRoZSBzZWN0aW9uIGNvbnRlbnRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VjdGlvbkNsYXNzIFRhcmdldCBjbGFzcyBuYW1lXG4gICAgICovXG4gICAgdXBkYXRlU2VjdGlvbkNvbnRlbnQoaHRtbCwgc2VjdGlvbkNsYXNzKSB7XG4gICAgICAgIGxldCAkc2VjdGlvbiA9IHRoaXMuZ2V0U2VjdGlvbkVsZW1lbnQoc2VjdGlvbkNsYXNzKSwgJGNvbnRlbnQgPSAkc2VjdGlvbi5maW5kKFwiLlwiICsgZHR2LnNpZGViYXJTZWN0aW9uQ29udGVudENsYXNzKS5maXJzdCgpO1xuICAgICAgICAvLyBGbGFzaCB0aGUgY29udGVudCBlbGVtZW50IHdpdGggY29sb3JcbiAgICAgICAgZGV2VG9vbHMuZmxhc2hCYWNrZ3JvdW5kKCRzZWN0aW9uKTtcbiAgICAgICAgJGNvbnRlbnQuaHRtbChodG1sKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHNlY3Rpb24gZWxlbWVudCB2aWEgYSBzZWN0aW9uIGNsYXNzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWN0aW9uQ2xhc3NcbiAgICAgKiBAcmV0dXJucyB7KnxqUXVlcnl8SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgZ2V0U2VjdGlvbkVsZW1lbnQoc2VjdGlvbkNsYXNzKSB7XG4gICAgICAgIHJldHVybiAkKGR0di5zaWRlYmFyU2VsZWN0b3IgKyBcIiAuXCIgKyBzZWN0aW9uQ2xhc3MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgbGlzdCBpdGVtIEhUTUwgY29kZSBmb3IgYSBDU1Mgc2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdGhhdCBjYW4gYmUgc2V0IGFzIFwiZGF0YS1zZWxlY3RvclwiIGF0dHJpYnV0ZSdzIHZhbHVlLiBUaGlzIGhhcyB0byBoYXZlXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICBcInNlbGVjdG9yXCIgcHJvcGVydHkuIEl0IGNhbiBhbHNvIGNvbnRhaW4gXCJjb3VudFwiIHByb3BlcnR5IHRoYXQgd2lsbCBiZSBzaG93biBuZXh0IHRvXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICB0aGUgc2VsZWN0b3IuXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldENzc1NlbGVjdG9yTGlzdEl0ZW1IdG1sKG9iamVjdCkge1xuICAgICAgICBsZXQgY291bnQgPSBvYmplY3QuY291bnQgPyBcIjxpIGNsYXNzPSdjb3VudCc+KFwiICsgb2JqZWN0LmNvdW50ICsgXCIpPC9pPlwiIDogJyc7XG4gICAgICAgIHJldHVybiBcIjxsaT48c3BhbiBjbGFzcz0nc2VsZWN0b3InIGRhdGEtc2VsZWN0b3I9J1wiICsgSlNPTi5zdHJpbmdpZnkob2JqZWN0KSArIFwiJz5cIiArIG9iamVjdC5zZWxlY3RvciArIGNvdW50ICsgXCI8L3NwYW4+PC9saT5cIjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdGhhdCBjYW4gaGFuZGxlIGNsaWNrIGV2ZW50cyBvZiBDU1Mgc2VsZWN0b3JzLiBUaGUgZWxlbWVudCBzaG91bGQgaGF2ZSAnZGF0YS1zZWxlY3RvcicgYXR0ci5cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZSBFdmVudFxuICAgICAqL1xuICAgIG9uQ2xpY2tDc3NTZWxlY3RvcihlKSB7XG4gICAgICAgIGxldCAkc2VsZiA9ICQoZS50YXJnZXQpLCBzZWxlY3RvckRhdGEgPSB0aGlzLmdldENzc1NlbGVjdG9yRGF0YSgkc2VsZik7XG4gICAgICAgIGlmICghc2VsZWN0b3JEYXRhKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvLyBDb3B5IHRoZSBzZWxlY3RvciB0byB0aGUgQ1NTIHNlbGVjdG9yIGlucHV0XG4gICAgICAgIGNzc1NlbGVjdG9yVG9vbGJhci51cGRhdGVJbnB1dChzZWxlY3RvckRhdGEuc2VsZWN0b3IpO1xuICAgICAgICAvLyBUZXN0IHRoZSBzZWxlY3RvclxuICAgICAgICAkKGR0di5jc3NUZXN0U2VsZWN0b3IpLmNsaWNrKCk7XG4gICAgICAgIC8vIENsb3NlIHRoZSBzaWRlYmFyXG4gICAgICAgICQoZHR2LnNpZGViYXJDbG9zZVNlbGVjdG9yKS5jbGljaygpO1xuICAgICAgICAvLyBXaGVuIG1vdXNlIGlzIG1vdmVkIGFmdGVyIHRoZSBzaWRlYmFyIGlzIGNsb3NlZCwgaG92ZXIgZXZlbnQgc3RpbGwgZmlyZXMgb24gdGhlIGNsaWNrZWQgZWxlbWVudC5cbiAgICAgICAgLy8gVGhpcyBjYXVzZXMgdW53YW50ZWQgc2Nyb2xsIGFuaW1hdGlvbnMuIEJlbG93IGJvb2xlYW4gbG9naWMgZml4ZXMgdGhpcy5cbiAgICAgICAgdGhpcy5wcmV2ZW50SG92ZXJFdmVudCA9IHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRoYXQgY2FuIGhhbmRsZSBjbGljayBldmVudHMgb2YgVVJMcy5cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZSBFdmVudFxuICAgICAqL1xuICAgIG9uQ2xpY2tIaXN0b3J5VXJsKGUpIHtcbiAgICAgICAgbGV0ICRlbGVtZW50ID0gJChlLnRhcmdldCksIHVybCA9ICRlbGVtZW50LnRleHQoKTtcbiAgICAgICAgLy8gRG8gbm90IHByb2NlZWQgaWYgdGhlIFVSTCBpcyBub3QgdmFsaWQuXG4gICAgICAgIGlmICh1cmwgPT0gdW5kZWZpbmVkIHx8ICF1cmwubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvLyBGaW5kIHRoZSBpbmRleCBvZiB0aGUgVVJMIGluIHRoZSBsaXN0XG4gICAgICAgIGxldCBpbmRleCA9ICRlbGVtZW50LmNsb3Nlc3QoXCJ1bFwiKS5maW5kKFwibGlcIikuaW5kZXgoJGVsZW1lbnQuY2xvc2VzdChcImxpXCIpKTtcbiAgICAgICAgLy8gSWYgdGhlIGluZGV4IGlzIGZvdW5kXG4gICAgICAgIGlmIChpbmRleCAhPSBudWxsICYmIGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIC8vIExvYWQgdGhlIFVSTCBhbmQgYXJyYW5nZSBmb3J3YXJkIGFuZCBiYWNrIGJ1dHRvbiBzdGF0dXNlcy5cbiAgICAgICAgICAgIGFkZHJlc3NCYXIudHJhdmVsSW5UaW1lKGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0aGF0IGNhbiBoYW5kbGUgaG92ZXIgZXZlbnRzIG9mIENTUyBzZWxlY3RvcnMuIFRoZSBlbGVtZW50IHNob3VsZCBoYXZlICdkYXRhLXNlbGVjdG9yJyBhdHRyLlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBlIEV2ZW50XG4gICAgICovXG4gICAgb25Ib3ZlckNzc1NlbGVjdG9yKGUpIHtcbiAgICAgICAgaWYgKHRoaXMucHJldmVudEhvdmVyRXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMucHJldmVudEhvdmVyRXZlbnQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgJHNlbGYgPSAkKGUudGFyZ2V0KSwgc2VsZWN0b3JEYXRhID0gdGhpcy5nZXRDc3NTZWxlY3RvckRhdGEoJHNlbGYpO1xuICAgICAgICBpZiAoIXNlbGVjdG9yRGF0YSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgLy8gSGlnaGxpZ2h0IHRoZSBob3ZlcmVkIENTUyBzZWxlY3RvciBpbiBpZnJhbWVcbiAgICAgICAgaWZyYW1lSGFuZGxlci5jbGVhckhpZ2hsaWdodHMoKTtcbiAgICAgICAgaWZyYW1lSGFuZGxlci5oaWdobGlnaHQoc2VsZWN0b3JEYXRhLnNlbGVjdG9yLCB0cnVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IENTUyBzZWxlY3RvciBkYXRhIG9mIGEgQ1NTIHNlbGVjdG9yIGVsZW1lbnQuIFRoZSBlbGVtZW50IHNob3VsZCBoYXZlIFwiZGF0YS1zZWxlY3RvclwiIGF0dHIgYW5kIHRoaXMgYXR0clxuICAgICAqIHNob3VsZCBoYXZlICdzZWxlY3RvcicgcHJvcGVydHkuXG4gICAgICogQHBhcmFtICRlbGVtZW50XG4gICAgICogQHJldHVybnMge251bGx8b2JqZWN0fSBJZiBmb3VuZCwgYW4gb2JqZWN0IGRlZmluaXRlbHkgaGF2aW5nICdzZWxlY3RvcicgcHJvcGVydHkuXG4gICAgICovXG4gICAgZ2V0Q3NzU2VsZWN0b3JEYXRhKCRlbGVtZW50KSB7XG4gICAgICAgIGxldCBzZWxlY3RvckRhdGEgPSAkZWxlbWVudC5kYXRhKFwic2VsZWN0b3JcIik7XG4gICAgICAgIHJldHVybiBzZWxlY3RvckRhdGEgPT0gdW5kZWZpbmVkIHx8ICFzZWxlY3RvckRhdGEuaGFzT3duUHJvcGVydHkoJ3NlbGVjdG9yJykgPyBudWxsIDogc2VsZWN0b3JEYXRhO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0aGF0IGNhbiBoYW5kbGUgY2xvc2UgYnV0dG9uIGNsaWNrc1xuICAgICAqIEBwYXJhbSBlXG4gICAgICovXG4gICAgb25DbG9zZVNpZGViYXIoZSkge1xuICAgICAgICBsZXQgJHNpZGViYXIgPSB0aGlzLmdldFNpZGViYXIoKTtcbiAgICAgICAgJHNpZGViYXIucmVtb3ZlQ2xhc3MoZHR2LnNpZGViYXJPcGVuZWRDbGFzcyk7XG4gICAgICAgIC8vIFNob3cgdGhlIG9wZW4gYnV0dG9uXG4gICAgICAgICQoZHR2LnNpZGViYXJPcGVuU2VsZWN0b3IpLnJlbW92ZUNsYXNzKFwiaGlkZGVuXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0aGF0IGNhbiBoYW5kbGUgb3BlbiBidXR0b24gY2xpY2tzXG4gICAgICogQHBhcmFtIGVcbiAgICAgKi9cbiAgICBvbk9wZW5TaWRlYmFyKGUpIHtcbiAgICAgICAgbGV0ICRzaWRlYmFyID0gdGhpcy5nZXRTaWRlYmFyKCk7XG4gICAgICAgICRzaWRlYmFyLmFkZENsYXNzKGR0di5zaWRlYmFyT3BlbmVkQ2xhc3MpO1xuICAgICAgICAvLyBIaWRlIHRoZSBvcGVuIGJ1dHRvblxuICAgICAgICAkKGR0di5zaWRlYmFyT3BlblNlbGVjdG9yKS5hZGRDbGFzcyhcImhpZGRlblwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdGhhdCBjYW4gaGFuZGxlIGV4cGFuZC9jb2xsYXBzZSBzaWRlYmFyIHNlY3Rpb24gY2xpY2tzXG4gICAgICogQHBhcmFtIGVcbiAgICAgKi9cbiAgICBvblRvZ2dsZUV4cGFuZChlKSB7XG4gICAgICAgIGxldCAkYnV0dG9uID0gJChlLnRhcmdldCksIGV4cGFuZGVkID0gJGJ1dHRvbi5oYXNDbGFzcyhkdHYuc2lkZWJhclNlY3Rpb25FeHBhbmRlZENsYXNzKSwgJHNlY3Rpb24gPSAkYnV0dG9uLmNsb3Nlc3QoZHR2LnNpZGViYXJTZWN0aW9uU2VsZWN0b3IpLCAkc2VjdGlvbkNvbnRlbnQgPSAkYnV0dG9uLmNsb3Nlc3QoZHR2LnNpZGViYXJTZWN0aW9uQ29udGVudFNlbGVjdG9yKTtcbiAgICAgICAgJHNlY3Rpb24udG9nZ2xlQ2xhc3MoZHR2LnNpZGViYXJTZWN0aW9uRXhwYW5kZWRDbGFzcyk7XG4gICAgICAgICRidXR0b25cbiAgICAgICAgICAgIC50b2dnbGVDbGFzcyhkdHYuc2lkZWJhclNlY3Rpb25FeHBhbmRlZENsYXNzKVxuICAgICAgICAgICAgLnRvZ2dsZUNsYXNzKFwiZGFzaGljb25zLWFycm93LWRvd25cIilcbiAgICAgICAgICAgIC50b2dnbGVDbGFzcyhcImRhc2hpY29ucy1hcnJvdy11cFwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBzaWRlYmFyIGVsZW1lbnRcbiAgICAgKiBAcmV0dXJucyB7KnxqUXVlcnl8SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgZ2V0U2lkZWJhcigpIHtcbiAgICAgICAgcmV0dXJuICQoZHR2LnNpZGViYXJTZWxlY3Rvcik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMga2V5IHByZXNzZXMgcmVsYXRlZCB0byB0aGUgc2lkZWJhclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBlIEV2ZW50XG4gICAgICovXG4gICAgaGFuZGxlS2V5UHJlc3MoZSkge1xuICAgICAgICAvLyBMZWZ0IGtleSBvcGVucyB0aGUgc2lkZWJhclxuICAgICAgICBpZiAoZS53aGljaCA9PSAzNylcbiAgICAgICAgICAgIHRoaXMub25PcGVuU2lkZWJhcihlKTtcbiAgICAgICAgLy8gUmlnaHQga2V5IGNsb3NlcyB0aGUgc2lkZWJhclxuICAgICAgICBpZiAoZS53aGljaCA9PSAzOSlcbiAgICAgICAgICAgIHRoaXMub25DbG9zZVNpZGViYXIoZSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRGV2VG9vbHNWYXJpYWJsZXMgfSBmcm9tIFwiLi9hcHAvRGV2VG9vbHNWYXJpYWJsZXNcIjtcbmltcG9ydCB7IEFkZHJlc3NCYXIgfSBmcm9tIFwiLi9hcHAvQWRkcmVzc0JhclwiO1xuaW1wb3J0IHsgQ1NTU2VsZWN0b3JUb29sYmFyIH0gZnJvbSBcIi4vYXBwL0NTU1NlbGVjdG9yVG9vbGJhclwiO1xuaW1wb3J0IHsgREVWVG9vbHMgfSBmcm9tIFwiLi9hcHAvREVWVG9vbHNcIjtcbmltcG9ydCB7IElGcmFtZUhhbmRsZXIgfSBmcm9tIFwiLi9hcHAvSUZyYW1lSGFuZGxlclwiO1xuaW1wb3J0IHsgT3B0aW9uc1Rvb2xiYXIgfSBmcm9tIFwiLi9hcHAvT3B0aW9uc1Rvb2xiYXJcIjtcbmltcG9ydCB7IFNpZGViYXJIYW5kbGVyIH0gZnJvbSBcIi4vYXBwL1NpZGViYXJIYW5kbGVyXCI7XG4vKlxuICogR0xPQkFMIFZBUklBQkxFU1xuICovXG5sZXQgXG4vKiogU3RvcmVzIHZhcmlhYmxlcyBmb3IgZGV2ZWxvcGVyIHRvb2xzLiBUaGUgbmFtZSBpcyB0aGUgc2hvcnQgZm9yIFwiZGV2IHRvb2xzIHZhcnNcIi4gKi9cbmR0diwgXG4vLyBEZWZpbmUgb2JqZWN0c1xuZGV2VG9vbHMsIGlmcmFtZUhhbmRsZXIsIGFkZHJlc3NCYXIsIGNzc1NlbGVjdG9yVG9vbGJhciwgb3B0aW9uc1Rvb2xiYXIsIHNpZGViYXJIYW5kbGVyO1xualF1ZXJ5KGZ1bmN0aW9uICgkKSB7XG4gICAgLypcbiAgICAgKiBERUZJTkUgUkVRVUlSRUQgVkFSSUFCTEVTXG4gICAgICovXG4gICAgZHR2ID0gbmV3IERldlRvb2xzVmFyaWFibGVzKCk7XG4gICAgLypcbiAgICAgKiBJTklUSUFMSVpFIE9CSkVDVFNcbiAgICAgKi9cbiAgICBkZXZUb29scyA9IG5ldyBERVZUb29scygpO1xuICAgIGlmcmFtZUhhbmRsZXIgPSBuZXcgSUZyYW1lSGFuZGxlcigpO1xuICAgIGFkZHJlc3NCYXIgPSBuZXcgQWRkcmVzc0JhcigpO1xuICAgIGNzc1NlbGVjdG9yVG9vbGJhciA9IG5ldyBDU1NTZWxlY3RvclRvb2xiYXIoKTtcbiAgICBvcHRpb25zVG9vbGJhciA9IG5ldyBPcHRpb25zVG9vbGJhcigpO1xuICAgIHNpZGViYXJIYW5kbGVyID0gbmV3IFNpZGViYXJIYW5kbGVyKCk7XG4gICAgLypcbiAgICAgKiBIQU5ETEUgVVNFUiBFVkVOVFNcbiAgICAgKi9cbiAgICAvKipcbiAgICAgKiBTaG93IHRoZSBkZXZlbG9wZXIgdG9vbHMgbGlnaHRib3ggd2hlbiBpdHMgYnV0dG9uIGlzIGNsaWNrZWRcbiAgICAgKi9cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBkdHYuZGV2VG9vbHNCdXR0b25TZWxlY3RvciwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgJHNlbGYgPSAkKGUudGFyZ2V0KSwgZGF0YSA9ICRzZWxmLmRhdGEoXCJ3Y2NcIiksIHVybFNlbGVjdG9yID0gbnVsbCwgJGNvbnRlbnRDb250YWluZXIgPSAkKGR0di5kZXZUb29sc0NvbnRlbnRDb250YWluZXJTZWxlY3Rvcik7XG4gICAgICAgIC8vIEFzc2lnbiB0aGUgcG9zdCBJRC5cbiAgICAgICAgZHR2LnBvc3RJZCA9ICRjb250ZW50Q29udGFpbmVyLmRhdGEoXCJ3Y2NcIilbXCJwb3N0SWRcIl07XG4gICAgICAgIC8vIEFzc2lnbiB0aGUgY3VycmVudCBERVYgdG9vbHMgYnV0dG9uLlxuICAgICAgICBkdHYuJGN1cnJlbnREZXZUb29sc0J1dHRvbiA9ICRzZWxmO1xuICAgICAgICAvLyBHZXQgdGhlIFVSTCBzZWxlY3RvclxuICAgICAgICBpZiAoZGF0YVtcInVybFNlbGVjdG9yXCJdICE9IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHVybFNlbGVjdG9yID0gZGF0YVtcInVybFNlbGVjdG9yXCJdO1xuICAgICAgICAvLyBHZXQgdGhlIHRlc3QgVVJMXG4gICAgICAgIGxldCB1cmwgPSAkKHVybFNlbGVjdG9yKS52YWwoKTtcbiAgICAgICAgLy8gU2hvdyBsaWdodGJveCBhbmQgdGhlbiBsb2FkIHRoZSBjb250ZW50IGludG8gdGhlIGlmcmFtZS5cbiAgICAgICAgZGV2VG9vbHMuc2hvd0xpZ2h0Ym94V2l0aENvbnRlbnQobnVsbCwgdXJsKTtcbiAgICB9KTtcbiAgICAvLyBDbG9zZSB0aGUgbGlnaHRib3ggd2hlbiB0aGUgbGlnaHRib3ggdGl0bGUgaXMgY2xpY2tlZFxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGR0di5saWdodGJveFRpdGxlU2VsZWN0b3IsIGUgPT4gZGV2VG9vbHMuY2xvc2VMaWdodGJveCgpKTtcbiAgICAvLyBMaXN0ZW4gdG8gdGhlIGJ1dHRvbiBjbGljayBldmVudHNcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBkdHYuYmFja0J1dHRvblNlbGVjdG9yLCBlID0+IGFkZHJlc3NCYXIub25DbGlja0JhY2soZSkpO1xuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGR0di5mb3J3YXJkQnV0dG9uU2VsZWN0b3IsIGUgPT4gYWRkcmVzc0Jhci5vbkNsaWNrRm9yd2FyZChlKSk7XG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZHR2LnJlZnJlc2hCdXR0b25TZWxlY3RvciwgZSA9PiBhZGRyZXNzQmFyLm9uQ2xpY2tSZWZyZXNoKGUpKTtcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBkdHYuZ29CdXR0b25TZWxlY3RvciwgZSA9PiBhZGRyZXNzQmFyLm9uQ2xpY2tHbyhlKSk7XG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZHR2LmNzc1Rlc3RTZWxlY3RvciwgZSA9PiBjc3NTZWxlY3RvclRvb2xiYXIub25DbGlja1Rlc3QoZSkpO1xuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGR0di5jc3NVc2VCdXR0b25TZWxlY3RvciwgZSA9PiBjc3NTZWxlY3RvclRvb2xiYXIub25DbGlja1VzZUNzc1NlbGVjdG9yKCkpO1xuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGR0di5jc3NDbGVhckhpZ2hsaWdodHNTZWxlY3RvciwgZSA9PiBjc3NTZWxlY3RvclRvb2xiYXIub25DbGVhckhpZ2hsaWdodHMoZSkpO1xuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGR0di5jc3NSZW1vdmVFbGVtZW50c1NlbGVjdG9yLCBlID0+IGNzc1NlbGVjdG9yVG9vbGJhci5vblJlbW92ZUVsZW1lbnRzKGUpKTtcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBkdHYuY3NzU2hvd0FsdGVybmF0aXZlc1NlbGVjdG9yLCBlID0+IGNzc1NlbGVjdG9yVG9vbGJhci5vblNob3dBbHRlcm5hdGl2ZXMoZSwgdW5kZWZpbmVkKSk7XG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZHR2LnNpZGViYXJDbG9zZVNlbGVjdG9yLCBlID0+IHNpZGViYXJIYW5kbGVyLm9uQ2xvc2VTaWRlYmFyKGUpKTtcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBkdHYubGlnaHRib3hDb250YWluZXJTZWxlY3RvciArIFwiIFwiICsgZHR2LnNpZGViYXJPcGVuU2VsZWN0b3IsIGUgPT4gc2lkZWJhckhhbmRsZXIub25PcGVuU2lkZWJhcihlKSk7XG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZHR2LnNpZGViYXJTZWN0aW9uVG9nZ2xlRXhwYW5kU2VsZWN0b3IsIGUgPT4gc2lkZWJhckhhbmRsZXIub25Ub2dnbGVFeHBhbmQoZSkpO1xuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGR0di5idG5DbGVhckhpc3RvcnlTZWxlY3RvciwgZSA9PiBhZGRyZXNzQmFyLm9uQ2xpY2tDbGVhckhpc3RvcnkoZSkpO1xuICAgIC8vIFRvZ2dsZSBleHBhbmQgc3RhdHVzIHdoZW4gc2lkZWJhciBzZWN0aW9uIHRpdGxlIGlzIGNsaWNrZWRcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBkdHYuc2lkZWJhclNlY3Rpb25UaXRsZVNlbGVjdG9yLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykuY2xvc2VzdChcIi5cIiArIGR0di5zaWRlYmFyU2VjdGlvbkNsYXNzKS5maW5kKFwiLlwiICsgZHR2LnRvZ2dsZUV4cGFuZENsYXNzKS5maXJzdCgpLmNsaWNrKCk7XG4gICAgfSk7XG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZHR2LnNpZGViYXJTZWxlY3RvciArICcgLicgKyBkdHYuY2xhc3NVcmwsIGUgPT4gc2lkZWJhckhhbmRsZXIub25DbGlja0hpc3RvcnlVcmwoZSkpO1xuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGR0di5zaWRlYmFyU2VsZWN0b3IgKyAnIC4nICsgZHR2LmNsYXNzQ3NzU2VsZWN0b3IsIGUgPT4gc2lkZWJhckhhbmRsZXIub25DbGlja0Nzc1NlbGVjdG9yKGUpKTtcbiAgICAkKGRvY3VtZW50KS5vbignaG92ZXInLCBkdHYuc2lkZWJhclNlbGVjdG9yICsgJyAuJyArIGR0di5jbGFzc0Nzc1NlbGVjdG9yLCBlID0+IHNpZGViYXJIYW5kbGVyLm9uSG92ZXJDc3NTZWxlY3RvcihlKSk7XG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZHR2Lm9wdEhvdmVyU2VsZWN0U2VsZWN0b3IsIGUgPT4gb3B0aW9uc1Rvb2xiYXIub25DbGlja1RvZ2dsZUhvdmVyU2VsZWN0KGUpKTtcbiAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgZHR2Lm9wdEFwcGx5TWFuaXB1bGF0aW9uT3B0aW9uc1NlbGVjdG9yLCBlID0+IGFkZHJlc3NCYXIub25DbGlja1JlZnJlc2goZSkpO1xuICAgICQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCBkdHYub3B0UmVtb3ZlU2NyaXB0c1NlbGVjdG9yLCBlID0+IGFkZHJlc3NCYXIub25DbGlja1JlZnJlc2goZSkpO1xuICAgICQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCBkdHYub3B0UmVtb3ZlU3R5bGVzU2VsZWN0b3IsIGUgPT4gYWRkcmVzc0Jhci5vbkNsaWNrUmVmcmVzaChlKSk7XG4gICAgLy8gVHJ5IHRvIHNob3cgdGhlIGZvdW5kIGVsZW1lbnRzIHdoZW4gdGhlIHVzZXIgaXMgdHlwaW5nIHRoZSBzZWxlY3RvclxuICAgICQoZG9jdW1lbnQpLm9uKCdrZXl1cCBjaGFuZ2UnLCBkdHYuY3NzSW5wdXRTZWxlY3RvciwgKGUpID0+IHtcbiAgICAgICAgbGV0ICRzZWxmID0gJChlLnRhcmdldCksIHZhbCA9ICRzZWxmLnZhbCgpO1xuICAgICAgICAvLyBEbyBub3QgcHJvY2VlZCBpZiB0aGUgdmFsdWUgaXMgbm90IHZhbGlkLlxuICAgICAgICBpZiAodmFsID09IHVuZGVmaW5lZCB8fCAhdmFsLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gQ2xlYXIgdGhlIGhpZ2hsaWdodHNcbiAgICAgICAgICAgIGlmcmFtZUhhbmRsZXIuY2xlYXJIaWdobGlnaHRzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWZyYW1lSGFuZGxlci5jbGVhckhpZ2hsaWdodHMoKTtcbiAgICAgICAgaWZyYW1lSGFuZGxlci5oaWdobGlnaHQodmFsLCB1bmRlZmluZWQpO1xuICAgIH0pO1xuICAgIC8vIExpc3RlbiB0byB0aGUgY2hhbmdlcyBvbiB0YXJnZXQgSFRNTCB0YWcgaW5wdXRcbiAgICAkKGRvY3VtZW50KS5vbigna2V5dXAgY2hhbmdlJywgZHR2Lm9wdFRhcmdldEhUTUxUYWdTZWxlY3RvciwgZSA9PiBvcHRpb25zVG9vbGJhci5vbkNoYW5nZVRhcmdldEhUTUxUYWdJbnB1dChlKSk7XG4gICAgLy8gS2V5Ym9hcmRcbiAgICAkKGRvY3VtZW50KS5vbigna2V5ZG93bicsIGR0di5kZXZUb29sc0NvbnRlbnRTZWxlY3RvciwgKGUpID0+IHtcbiAgICAgICAgLy9sKGUudHlwZSArIFwiOiBcIiArIGUud2hpY2gpO1xuICAgICAgICAvLyBUaGUgdXNlciBpcyB0eXBpbmdcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmlzKCc6aW5wdXQnKSkge1xuICAgICAgICAgICAgbGV0ICR0YXJnZXQgPSAkKGUudGFyZ2V0KTtcbiAgICAgICAgICAgIGlmIChlLndoaWNoID09IDEzKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIGVudGVyIGlzIHByZXNzZWQgaW4gQ1NTIGlucHV0LCBwcmVzcyB0aGUgdGVzdCBidXR0b24uXG4gICAgICAgICAgICAgICAgaWYgKCR0YXJnZXQuYXR0cihcImlkXCIpID09IGR0di5jc3NJbnB1dElkKVxuICAgICAgICAgICAgICAgICAgICAkKGR0di5jc3NUZXN0U2VsZWN0b3IpLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIGVudGVyIGlzIHByZXNzZWQgaW4gVVJMIGlucHV0LCBwcmVzcyB0aGUgZ28gYnV0dG9uLlxuICAgICAgICAgICAgICAgIGlmICgkdGFyZ2V0LmF0dHIoXCJpZFwiKSA9PSBkdHYudXJsSW5wdXRJZClcbiAgICAgICAgICAgICAgICAgICAgJChkdHYuZ29CdXR0b25TZWxlY3RvcikuY2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBMZXQgdGhlIFNpZGViYXJIYW5kbGVyIGhhbmRsZSB0aGUga2V5IHByZXNzLlxuICAgICAgICBzaWRlYmFySGFuZGxlci5oYW5kbGVLZXlQcmVzcyhlKTtcbiAgICB9KTtcbiAgICAvKlxuICAgICAqIFJlc3BvbmQgdG8gc2NyZWVuIHNpemUgY2hhbmdlc1xuICAgICAqL1xuICAgICQod2luZG93KS5yZXNpemUoKCkgPT4ge1xuICAgICAgICBpZnJhbWVIYW5kbGVyLnNldElmcmFtZUhlaWdodCgpO1xuICAgIH0pO1xufSk7XG5leHBvcnQgeyBkdHYsIGRldlRvb2xzLCBpZnJhbWVIYW5kbGVyLCBhZGRyZXNzQmFyLCBjc3NTZWxlY3RvclRvb2xiYXIsIG9wdGlvbnNUb29sYmFyLCBzaWRlYmFySGFuZGxlciB9O1xuIiwiZXhwb3J0IGNsYXNzIFBvc3RTZXR0aW5nc1ZhcmlhYmxlcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lck1ldGFCb3ggPSAkKCcud2NjLXNldHRpbmdzLW1ldGEtYm94Jyk7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lclRhYnMgPSAkKCcud2NjLXNldHRpbmdzLW1ldGEtYm94ID4gLm5hdi10YWItd3JhcHBlcicpO1xuICAgICAgICB0aGlzLiRmb3JtID0gJChcIiNwb3N0XCIpO1xuICAgICAgICB0aGlzLiRlcnJvckFsZXJ0ID0gJChcIiN3Y2MtYWxlcnRcIik7XG4gICAgICAgIHRoaXMuJHdjY05vbmNlID0gJChcIiN3Y2Nfbm9uY2VcIik7XG4gICAgICAgIHRoaXMuJGFkbWluQmFyID0gJChcIiN3cGFkbWluYmFyXCIpO1xuICAgICAgICB0aGlzLnNlbGVjdG9yQ2F0ZWdvcnlNYXAgPSBcIiNjYXRlZ29yeS1tYXBcIjtcbiAgICAgICAgdGhpcy5zZWxlY3RvclRhYk1haW4gPSBcIiN0YWItbWFpblwiO1xuICAgICAgICB0aGlzLnNlbGVjdG9yVGFiUG9zdCA9IFwiI3RhYi1wb3N0XCI7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JUYWJDYXRlZ29yeSA9IFwiI3RhYi1jYXRlZ29yeVwiO1xuICAgICAgICB0aGlzLnNlbGVjdG9yVGFiR3NQb3N0ID0gXCIjdGFiLWdzLXBvc3RcIjtcbiAgICAgICAgdGhpcy5zZWxlY3RvclRhYkdlbmVyYWxTZXR0aW5ncyA9IFwiI3RhYi1nZW5lcmFsLXNldHRpbmdzXCI7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JUZXN0QnV0dG9uID0gJy53Y2MtdGVzdCc7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JJbnB1dENvbnRhaW5lclBhc3N3b3JkcyA9ICcuaW5wdXQtY29udGFpbmVyLXBhc3N3b3Jkcyc7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JMb2FkR2VuZXJhbFNldHRpbmdzQnV0dG9uID0gJyNidG4tbG9hZC1nZW5lcmFsLXNldHRpbmdzJztcbiAgICAgICAgdGhpcy5zZWxlY3RvckNsZWFyR2VuZXJhbFNldHRpbmdzQnV0dG9uID0gJyNidG4tY2xlYXItZ2VuZXJhbC1zZXR0aW5ncyc7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JJbnB1dEltcG9ydCA9ICcjX3Bvc3RfaW1wb3J0X3NldHRpbmdzJztcbiAgICAgICAgdGhpcy5zZWxlY3RvckxvYWRUcmFuc2xhdGlvbkxhbmd1YWdlcyA9ICcubG9hZC1sYW5ndWFnZXMnO1xuICAgICAgICB0aGlzLnNlbGVjdG9ySW5wdXRVUkxIYXNoID0gXCJpbnB1dFtuYW1lPSd1cmxfaGFzaCddXCI7XG4gICAgICAgIHRoaXMuaW5wdXROYW1lQ29va2llcyA9ICdfY29va2llcyc7XG4gICAgICAgIHRoaXMuYmFzZUh0bWxNYW5pcHVsYXRpb25JbnB1dE5hbWVzID0gW1xuICAgICAgICAgICAgJ2ZpbmRfcmVwbGFjZV9yYXdfaHRtbCcsXG4gICAgICAgICAgICAnZmluZF9yZXBsYWNlX2ZpcnN0X2xvYWQnLFxuICAgICAgICAgICAgJ2ZpbmRfcmVwbGFjZV9lbGVtZW50X2F0dHJpYnV0ZXMnLFxuICAgICAgICAgICAgJ2V4Y2hhbmdlX2VsZW1lbnRfYXR0cmlidXRlcycsXG4gICAgICAgICAgICAncmVtb3ZlX2VsZW1lbnRfYXR0cmlidXRlcycsXG4gICAgICAgICAgICAnZmluZF9yZXBsYWNlX2VsZW1lbnRfaHRtbCcsXG4gICAgICAgICAgICAndW5uZWNlc3NhcnlfZWxlbWVudF9zZWxlY3RvcnMnXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuc2VsZWN0b3JPcmlnaW5hbFRlc3RSZXN1bHRzID0gJy5vcmlnaW5hbC1yZXN1bHRzJztcbiAgICAgICAgdGhpcy5zZWxlY3RvckJ1dHRvblNlZVVubW9kaWZpZWRUZXN0UmVzdWx0cyA9IHRoaXMuc2VsZWN0b3JPcmlnaW5hbFRlc3RSZXN1bHRzICsgJyAuc2VlLXVubW9kaWZpZWQtcmVzdWx0cyc7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JJbnZhbGlkYXRlQ2FjaGVCdXR0b24gPSAnLmludmFsaWRhdGUtY2FjaGUtZm9yLXRoaXMtdXJsJztcbiAgICAgICAgdGhpcy5zZWxlY3RvckludmFsaWRhdGVBbGxDYWNoZXNCdXR0b24gPSAnLmludmFsaWRhdGUtYWxsLXRlc3QtdXJsLWNhY2hlcyc7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JRdWlja1NhdmVCdXR0b24gPSAnLnF1aWNrLXNhdmUtY29udGFpbmVyIC5xdWljay1zYXZlJztcbiAgICAgICAgdGhpcy5zZWxlY3RvckV4cG9ydFNldHRpbmdzVGV4dEFyZWEgPSAnI19wb3N0X2V4cG9ydF9zZXR0aW5ncyc7XG4gICAgICAgIHRoaXMuY2xzSGFzRXJyb3IgPSAnaGFzLWVycm9yJztcbiAgICAgICAgdGhpcy4kaW5wdXRBY3Rpb24gPSAkKFwiI2hpZGRlbmFjdGlvblwiKTtcbiAgICAgICAgdGhpcy5pbmZvVGV4dHNIaWRkZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLmNsYXNzRml4ZWQgPSAnd3BjYy1maXhlZCc7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JGaXhhYmxlID0gJy5maXhhYmxlJztcbiAgICAgICAgdGhpcy5zZWxlY3RvckNoZWNrYm94Rml4VGFicyA9ICcjX2ZpeF90YWJzJztcbiAgICAgICAgdGhpcy5zZWxlY3RvckNoZWNrYm94Rml4Q29udGVudE5hdmlnYXRpb24gPSAnI19maXhfY29udGVudF9uYXZpZ2F0aW9uJztcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhpcyBjbGFzcyBpcyBhIHNpbmdsZXRvbi4gR2V0IHRoZSBpbnN0YW5jZSB3aXRoIHRoaXMgbWV0aG9kLlxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuSU5TVEFOQ0UgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuSU5TVEFOQ0UgPSBuZXcgUG9zdFNldHRpbmdzVmFyaWFibGVzKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuSU5TVEFOQ0U7XG4gICAgfVxufVxuUG9zdFNldHRpbmdzVmFyaWFibGVzLklOU1RBTkNFID0gbnVsbDtcbiIsImltcG9ydCB7IE5vdGlmaWVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi10cy9Ob3RpZmllclwiO1xuaW1wb3J0IHsgUG9zdFNldHRpbmdzVmFyaWFibGVzIH0gZnJvbSBcIi4vUG9zdFNldHRpbmdzVmFyaWFibGVzXCI7XG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuLi8uLi9jb21tb24tdHMvVXRpbHNcIjtcbmV4cG9ydCBjbGFzcyBUZXN0RGF0YVByZXBhcmVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ub3RpZmllciA9IE5vdGlmaWVyLmdldEluc3RhbmNlKCk7XG4gICAgICAgIHRoaXMucHN2ID0gUG9zdFNldHRpbmdzVmFyaWFibGVzLmdldEluc3RhbmNlKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdG9yZXMgdGhlIGxhdGVzdCBjbGlja2VkIG9wdGlvbnMgYm94IGJ1dHRvbi4gSWYgdGhpcyBpcyBub3QgbnVsbCwgdGhlbiB0aGUgb3B0aW9ucyBib3ggZm9yIHRoaXMgYnV0dG9uIGlzIGN1cnJlbnRseVxuICAgICAgICAgKiBvcGVuLlxuICAgICAgICAgKiBAdHlwZSB7bnVsbHxPYmplY3R8alF1ZXJ5fVxuICAgICAgICAgKi9cbiAgICAgICAgd2luZG93LiRsYXN0Q2xpY2tlZE9wdGlvbnNCb3hCdXR0b24gPSBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGlzIGNsYXNzIGlzIGEgc2luZ2xldG9uLiBHZXQgdGhlIGluc3RhbmNlIHdpdGggdGhpcyBtZXRob2QuXG4gICAgICovXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgICAgICBpZiAodGhpcy5JTlNUQU5DRSA9PT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMuSU5TVEFOQ0UgPSBuZXcgVGVzdERhdGFQcmVwYXJlcigpO1xuICAgICAgICByZXR1cm4gdGhpcy5JTlNUQU5DRTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJlcGFyZXMgdGhlIGRhdGEgdGhhdCB3aWxsIGJlIHNlbnQgd2l0aCB0aGUgQUpBWCByZXF1ZXN0IHdoZW4gY29uZHVjdGluZyB0ZXN0c1xuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9ICR0ZXN0QnV0dG9uIFRoZSB0ZXN0IGJ1dHRvbiB0aGF0IGlzIGNsaWNrZWRcbiAgICAgKiBAcmV0dXJucyB7bnVsbHxvYmplY3R9XG4gICAgICovXG4gICAgcHJlcGFyZVRlc3REYXRhKCR0ZXN0QnV0dG9uKSB7XG4gICAgICAgIC8vIEdldCB0aGUgcmVxdWlyZWQgZGF0YSBmcm9tIHRoZSB0ZXN0IGJ1dHRvbi5cbiAgICAgICAgbGV0IG1EYXRhID0gJHRlc3RCdXR0b24uZGF0YShcIndjY1wiKTtcbiAgICAgICAgLy8gRG8gbm90IHByb2NlZWQgaWYgdGhlIGRhdGEgZG9lcyBub3QgZXhpc3QuXG4gICAgICAgIGlmIChtRGF0YSA9PSB1bmRlZmluZWQgfHwgIW1EYXRhKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIC8vIENsb25lIHRoZSBvYmplY3QuXG4gICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShtRGF0YSkpO1xuICAgICAgICBkYXRhID0gdGhpcy5hZGRTZXR0aW5nc1RvQWpheERhdGEoZGF0YSk7XG4gICAgICAgIC8vIEdldCB0aGUgaW5wdXRzICh0ZXh0YXJlYSwgYnV0dG9uLCBzZWxlY3QsIGFuZCBpbnB1dCBlbGVtZW50cykgd2l0aCBuYW1lXG4gICAgICAgIGxldCAkaW5wdXRzID0gJHRlc3RCdXR0b24uY2xvc2VzdChcIi5pbnB1dC1ncm91cFwiKS5maW5kKCc6aW5wdXRbbmFtZV0nKTtcbiAgICAgICAgaWYgKCEkaW5wdXRzLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAvKlxuICAgICAgICAgKiBSRVFVSVJFRCBFTEVNRU5UU1xuICAgICAgICAgKi9cbiAgICAgICAgLy8gR2V0IHRoZSByZXF1aXJlZCBlbGVtZW50IHNlbGVjdG9ycywgaWYgdGhlcmUgYXJlIGFueVxuICAgICAgICBsZXQgYWxsU2VsZWN0b3JzUmVxdWlyZWQgPSB0cnVlLCByZXF1aXJlZEVsRXhwciA9IG1EYXRhW1wicmVxdWlyZWRTZWxlY3RvcnNcIl07XG4gICAgICAgIGlmIChyZXF1aXJlZEVsRXhwciAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIElmIHJlcXVpcmVkIGVsZW1lbnQgc2VsZWN0b3JzIGFyZSBzdXBwbGllZCwgdGhhdCBtZWFucyBub3QgYWxsIG9mIHRoZSBcIlNlbGVjdG9yXCJzIGluIHRoZSBkYXRhIGFyZSByZXF1aXJlZC5cbiAgICAgICAgICAgIGFsbFNlbGVjdG9yc1JlcXVpcmVkID0gZmFsc2U7XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBhcmUgcmVxdWlyZWQgc2VsZWN0b3JzLCBnZXQgdGhlaXIgdmFsdWVzIGFuZCBub3RpZnkgdGhlIHVzZXJcbiAgICAgICAgICAgIGlmIChyZXF1aXJlZEVsRXhwci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAvLyBGaXJzdCwgd2UgbmVlZCB0byBwcmVwYXJlIHRoZSBleHByZXNzaW9uIHN0cmluZy4gSGVyZSBpcyBhbiBleGFtcGxlIGV4cHJlc3Npb24gc3RyaW5nXG4gICAgICAgICAgICAgICAgLy8gKC5zZWwxIHwgKCAuc2VsMiAmIC5zZWw3ICkgKSAmICggLnNlbDIgfCAuc2VsMykgJiAuc2VsNSAmI3NlbDRcbiAgICAgICAgICAgICAgICAvLyBBcHBlbmQgYW5kIHByZXBlbmQgYSBzcGFjZSBhcyB3ZWxsLlxuICAgICAgICAgICAgICAgIHJlcXVpcmVkRWxFeHByID0gXCIgXCIgKyByZXF1aXJlZEVsRXhwclxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvKFsoKSZ8XSkvZywgXCIgJDEgXCIpIC8vIEZpcnN0IHN1cnJvdW5kIGV2ZXJ5IHNwZWNpYWwgY2hhciwgc3VjaCBhcyAoICkgJiwgd2l0aCBzcGFjZVxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxzezIsfS9nLCBcIiBcIikgLy8gQW5kIGdldCByaWQgb2YgbXVsdGlwbGUgc3BhY2VzLlxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFwmL2csICcmJicpIC8vIFJlcGxhY2Ugc2luZ2xlICYgd2l0aCAmJlxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFx8L2csICd8fCcpIC8vIFJlcGxhY2Ugc2luZ2xlIHwgd2l0aCB8fFxuICAgICAgICAgICAgICAgICAgICAudHJpbSgpICsgXCIgXCI7XG4gICAgICAgICAgICAgICAgLy8gTm93LCBnZXQgdGhlIHNlbGVjdG9yc1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3Rvck1hdGNoZXMgPSByZXF1aXJlZEVsRXhwci5tYXRjaCgvKFsjXFxbXFxdPVxcXn4uYS16MC05X1xcLVwiJ10rKVxccz8vZyk7XG4gICAgICAgICAgICAgICAgbGV0IGV2YWxTdHIgPSByZXF1aXJlZEVsRXhwciwgY3VycmVudFNlbGVjdG9yLCAkZWwsIHZhbHVlRXhpc3RzLCByZXF1aXJlZEVscyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgaW4gc2VsZWN0b3JNYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc2VsZWN0b3JNYXRjaGVzLmhhc093blByb3BlcnR5KGkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTZWxlY3RvciA9IHNlbGVjdG9yTWF0Y2hlc1tpXS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY3VycmVudFNlbGVjdG9yLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAvL2woXCJDdXJyZW50IHNlbGVjdG9yXCIpO1xuICAgICAgICAgICAgICAgICAgICAvL2woY3VycmVudFNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgJGVsID0gJChjdXJyZW50U2VsZWN0b3IpLmZpcnN0KCk7XG4gICAgICAgICAgICAgICAgICAgIC8vbChcIkVzY2FwZWQgc2VsZWN0b3I6XCIpO1xuICAgICAgICAgICAgICAgICAgICAvL2woZXNjYXBlUmVnRXhwKGN1cnJlbnRTZWxlY3RvcikpO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZUV4aXN0cyA9ICRlbC5sZW5ndGggJiYgJGVsLnZhbCgpICE9IHVuZGVmaW5lZCAmJiAkZWwudmFsKCkubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXZhbHVlRXhpc3RzICYmICRlbC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZEVscy5wdXNoKCRlbCk7XG4gICAgICAgICAgICAgICAgICAgIGV2YWxTdHIgPSBldmFsU3RyLnJlcGxhY2UobmV3IFJlZ0V4cCh0aGlzLmVzY2FwZVJlZ0V4cChjdXJyZW50U2VsZWN0b3IpICsgXCJcXFxcc1wiLCBcImdcIiksIHZhbHVlRXhpc3RzID8gJ3RydWUgJyA6ICdmYWxzZSAnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIGV2YWx1YXRpb24gaXMgZmFsc2UgYW5kIHRoZXJlIGFyZSByZXF1aXJlZCBlbGVtZW50cywgbm90aWZ5IHRoZSB1c2VyIGZvciBhIHJlcXVpcmVkIGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgaWYgKCFldmFsKGV2YWxTdHIpICYmIHJlcXVpcmVkRWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWF4ID0gcmVxdWlyZWRFbHMubGVuZ3RoIC0gMSwgbWluID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmllci5ub3RpZnkocmVxdWlyZWRFbHNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbl0sIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKlxuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgLy8gSWYgdGhlcmUgYXJlIHNlbGVjdG9ycyBpbiB0aGUgZGF0YSwgZ2V0IHRoZSB2YWx1ZXMgZnJvbSB0aG9zZSBlbGVtZW50cyB3aG9zZSBzZWxlY3RvcnMgYXJlIGRlZmluZWQgaW4gdGhlIGRhdGFcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGRhdGEpIHtcbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGUga2V5IGVuZHMgd2l0aCBcIlNlbGVjdG9yXCIuXG4gICAgICAgICAgICBpZiAoIWRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSB8fCAhL1NlbGVjdG9yJC8udGVzdChrZXkpKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgLy8gRmluZCB0aGUgdGFyZ2V0IGVsZW1lbnRcbiAgICAgICAgICAgIGxldCAkdGFyZ2V0RWwgPSAkKGRhdGFba2V5XSk7XG4gICAgICAgICAgICAvLyBJZiBhbGwgc2VsZWN0b3JzIGFyZSByZXF1aXJlZCBhbmQgdGhpcyBlbGVtZW50J3MgdmFsdWUgaXMgZW1wdHksIG5vdGlmeSB0aGUgdXNlciBhbmQgcmV0dXJuIG51bGwuXG4gICAgICAgICAgICBpZiAoYWxsU2VsZWN0b3JzUmVxdWlyZWQgJiYgKCR0YXJnZXRFbC52YWwoKSA9PSB1bmRlZmluZWQgfHwgISR0YXJnZXRFbC52YWwoKS5sZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZmllci5ub3RpZnkoJHRhcmdldEVsLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBzZWxlY3RvciB2YWx1ZSBmcm9tIHRoZSBkYXRhLCBzaW5jZSB3ZSBkbyBub3QgbmVlZCBpdC5cbiAgICAgICAgICAgIGRlbGV0ZSBkYXRhW2tleV07XG4gICAgICAgICAgICBpZiAoISR0YXJnZXRFbC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAvLyBBZGQgdGhlIGtleSB3aXRoIGl0cyB2YWx1ZSB0byB0aGUgZGF0YSB0byBiZSBzZW50IGJ5IHJlbW92aW5nIFwiU2VsZWN0b3JcIiBmcm9tIHRoZSBrZXkuXG4gICAgICAgICAgICBpZiAoJHRhcmdldEVsLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGRhdGFba2V5LnJlcGxhY2UoXCJTZWxlY3RvclwiLCBcIlwiKV0gPSAkdGFyZ2V0RWwudmFsKCkgfHwgbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGVyZSBhcmUgZXh0cmEgc2VsZWN0b3JzIGluIHRoZSBkYXRhLCBnZXQgdGhlIHZhbHVlcyBmb3IgdGhvc2UgYW5kIGFkZCB0aGVtIHRvIHRoZSBkYXRhXG4gICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KCdleHRyYScpKSB7XG4gICAgICAgICAgICBsZXQgZXh0cmEgPSBkYXRhLmV4dHJhO1xuICAgICAgICAgICAgbGV0IGV4dHJhUHJlcGFyZWQgPSB7fTtcbiAgICAgICAgICAgIGxldCBpdGVtLCB2YWw7XG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gZXh0cmEpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWV4dHJhLmhhc093blByb3BlcnR5KGtleSkpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGl0ZW0gPSBleHRyYVtrZXldO1xuICAgICAgICAgICAgICAgIC8vIFRoZSBpdGVtIG11c3QgaGF2ZSAnc2VsZWN0b3InIGFuZCAnZGF0YScga2V5cywgd2hlcmUgdGhlIHNlbGVjdG9yIGlzIHRoZSB0YXJnZXQgZWxlbWVudCdzIHNlbGVjdG9yIGFuZFxuICAgICAgICAgICAgICAgIC8vIHRoZSBkYXRhIGlzIHRoZSBkYXRhIGtleSB1bmRlciB3aGljaCB0aGUgZGF0YSBpcyBzdG9yZWQgaW4gdGhlIGVsZW1lbnQgd2hvc2Ugc2VsZWN0b3IgaXMgZ2l2ZW4uXG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtLmhhc093blByb3BlcnR5KCdzZWxlY3RvcicpIHx8ICFpdGVtLmhhc093blByb3BlcnR5KCdkYXRhJykpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIHZhbCA9ICQoaXRlbS5zZWxlY3RvcikuZGF0YShpdGVtLmRhdGEpO1xuICAgICAgICAgICAgICAgIGlmICh2YWwgIT09IG51bGwgJiYgdmFsICE9PSB1bmRlZmluZWQgJiYgdmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBleHRyYVByZXBhcmVkW2tleV0gPSB2YWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgdGhlcmUgYXJlIGV4dHJhIGRhdGEsIGFkZCB0aGVtIHVuZGVyICdleHRyYScga2V5IHRvIHRoZSBkYXRhXG4gICAgICAgICAgICBpZiAoISQuaXNFbXB0eU9iamVjdChleHRyYVByZXBhcmVkKSkge1xuICAgICAgICAgICAgICAgIGRhdGEuZXh0cmEgPSBleHRyYVByZXBhcmVkO1xuICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgcmVtb3ZlIHRoZSAnZXh0cmEnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgZGF0YVsnZXh0cmEnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGUgb3B0aW9ucyBib3ggaXMgY3VycmVudGx5IG9wZW4sIGFkZCB0aGUgb3B0aW9ucyB0byB0aGUgcmVxdWVzdC5cbiAgICAgICAgaWYgKHdpbmRvdy4kbGFzdENsaWNrZWRPcHRpb25zQm94QnV0dG9uICE9PSBudWxsKSB7XG4gICAgICAgICAgICBkYXRhW1wib3B0aW9uc0JveFwiXSA9IHdpbmRvdy4kbGFzdENsaWNrZWRPcHRpb25zQm94QnV0dG9uLmZpbmQoJzppbnB1dCcpLmZpcnN0KCkudmFsKCk7XG4gICAgICAgICAgICAvLyBQdXQgYW4gaW5kaWNhdG9yIHRoYXQgdGhlIHRlc3QgaXMgY29uZHVjdGVkIGluIHRoZSBvcHRpb25zIGJveFxuICAgICAgICAgICAgZGF0YVtcImZyb21PcHRpb25zQm94XCJdID0gMTtcbiAgICAgICAgfVxuICAgICAgICAvLyBHZXQgdGhlIHZhbHVlcyB0aGF0IHNob3VsZCBiZSB0ZXN0ZWQgZnJvbSB0aGUgaW5wdXRzIG5leHQgdG8gY3VycmVudCB0ZXN0IGJ1dHRvblxuICAgICAgICBkYXRhW1wic2VyaWFsaXplZFZhbHVlc1wiXSA9ICRpbnB1dHMuc2VyaWFsaXplKCk7XG4gICAgICAgIC8vIEFkZCBuYW1lIG9mIHRoZSBmb3JtIGl0ZW0gdGhhdCBpcyBiZWluZyB0ZXN0ZWQuIEdldCB0aGUgY2hhcnMgdW50aWwgdGhlIGZpcnN0IG9wZW5pbmcgYnJhY2tldC5cbiAgICAgICAgbGV0IHJhd05hbWUgPSAkaW5wdXRzLmZpcnN0KCkuYXR0cihcIm5hbWVcIik7XG4gICAgICAgIGRhdGFbXCJmb3JtSXRlbU5hbWVcIl0gPSAvXihbXlxcW10rKS8uZXhlYyhyYXdOYW1lKVsxXSB8fCBudWxsO1xuICAgICAgICAvLyBTb21lIGZvcm0gaXRlbXMsIHN1Y2ggYXMgdGhlIGZvcm0gaXRlbXMgaW4gT3B0aW9ucyBCb3gsIGhhdmUgYSBuYW1lIHN1Y2ggYXMgJ19vcHRpb25zX2JveFtmaW5kX3JlcGxhY2VdJ1xuICAgICAgICAvLyBhbmQgdGhlIG5hbWVzIG9mIHRoZSBpbnB1dHMgdW5kZXIgdGhpcyBuYW1lIGFyZSBsaWtlICdfb3B0aW9uc19ib3hbZmluZF9yZXBsYWNlXVswXVtmaW5kXScgYW5kXG4gICAgICAgIC8vICdfb3B0aW9uc19ib3hbZmluZF9yZXBsYWNlXVswXVtyZXBsYWNlXScuIEluIHRoaXMgY2FzZSwgdGhlIHNlbnQgZGF0YSBpcyBzdHJ1Y3R1cmVkIGFzOlxuICAgICAgICAvLyAgICAgIHtfb3B0aW9uc19ib3g6IHtmaW5kX3JlcGxhY2U6IHtmaW5kOiAnZmluZCB2YWx1ZScsIHJlcGxhY2U6ICdyZXBsYWNlIHZhbHVlJ319fVxuICAgICAgICAvLyBIb3dldmVyLCBpbiB0aGUgYmFja2VuZCwgaXQgaXMgY29uc2lkZXJlZCB0aGF0IHRoZXJlIGFyZSBubyBpbm5lciBhcnJheXMuIFNvLCB0aGUgYmFja2VuZCBleHBlY3RzIHRvIGZpbmQ6XG4gICAgICAgIC8vICAgICAgW19vcHRpb25zX2JveCA9PiBbJ2ZpbmQnID0+ICdmaW5kIHZhbHVlJywgJ3JlcGxhY2UnID0+ICdyZXBsYWNlIHZhbHVlJ11dXG4gICAgICAgIC8vIEJ1dCwgaXQgZ2V0czpcbiAgICAgICAgLy8gICAgICBbX29wdGlvbnNfYm94ID0+IFsnZmluZF9yZXBsYWNlJyA9PiBbJ2ZpbmQnID0+ICdmaW5kIHZhbHVlJywgJ3JlcGxhY2UnID0+ICdyZXBsYWNlIHZhbHVlJ11dXVxuICAgICAgICAvLyB3aGljaCByZXN1bHRzIGluIGFuIGVycm9yLCBzaW5jZSBpdCB1c2VzIHRoZSBzZW50ICdmb3JtSXRlbU5hbWUnIHZhbHVlIHRvIGZpbmQgdGhlIHZhbHVlcy4gSGVyZSwgdGhlXG4gICAgICAgIC8vICdmb3JtSXRlbU5hbWUnIGlzICdfb3B0aW9uc19ib3gnLiBTbywgdGhlIGJhY2tlbmQgZ2V0czpcbiAgICAgICAgLy8gICAgICBbJ2ZpbmRfcmVwbGFjZScgPT4gWydmaW5kJyA9PiAnZmluZCB2YWx1ZScsICdyZXBsYWNlJyA9PiAncmVwbGFjZSB2YWx1ZSddXVxuICAgICAgICAvLyBhcyB0aGUgdGVzdCBkYXRhLiBIb3dldmVyLCBpdCBzaG91bGQgZ2V0OlxuICAgICAgICAvLyAgICAgIFsnZmluZCcgPT4gJ2ZpbmQgdmFsdWUnLCAncmVwbGFjZScgPT4gJ3JlcGxhY2UgdmFsdWUnXVxuICAgICAgICAvLyBTbywgaGVyZSwgd2Ugc2VuZCB0aGUgcGF0aCBvZiB0aGUgaW5uZXIgYXJyYXkgdW5kZXIgJ2Zvcm1JdGVtRG90S2V5Jy4gSXQgYmFzaWNhbGx5IHNlbmRzLCBmb3IgdGhpcyBjYXNlLFxuICAgICAgICAvLyAnZmluZF9yZXBsYWNlJyBhcyB0aGUgcGF0aC4gU28sIHRoZSBiYWNrZW5kIGNhbiBnZXQgd2hhdCBpdCBuZWVkcy4gSWYgdGhlIG5hbWUgb2YgdGhlIGZvcm0gaXRlbSBpcywgZS5nLjpcbiAgICAgICAgLy8gICAgICBfb3B0aW9uc19ib3hbZmluZF9yZXBsYWNlXVt0ZXN0XVttZXN0XVtjb29sXVswXVtyZXBsYWNlXVxuICAgICAgICAvLyB0aGUgJ2Zvcm1JdGVtRG90S2V5JyB3aWxsIGJlICdmaW5kX3JlcGxhY2UudGVzdC5tZXN0LmNvb2wnLiBIZXJlLCB3ZSBiYXNpY2FsbHkgZmluZCAnW2ZpbmRfcmVwbGFjZV1bdGVzdF1bbWVzdF1bY29vbF0nXG4gICAgICAgIC8vIHBhcnQsIGFuZCB0dXJuIGl0IGludG8gZG90IG5vdGF0aW9uLiBUaGUgdXNlZCByZWd1bGFyIGV4cHJlc3Npb24gYW5kIHRlc3QgdmFsdWVzIGFuZCByZXN1bHRzIGFyZSBiZWxvdzpcbiAgICAgICAgLy9cbiAgICAgICAgLy8gUmVnZXg6IF5bXlxcW10rKFteMC05XSspXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFRlc3Qgc3RyaW5nOiBfb3B0aW9uc19ib3hbZmluZF9yZXBsYWNlXVt0ZXN0XVttZXN0XVtjb29sXVswXVtyZXBsYWNlXVxuICAgICAgICAvLyAkMSBpczogW2ZpbmRfcmVwbGFjZV1bdGVzdF1bbWVzdF1bY29vbF1bXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFRlc3Qgc3RyaW5nOiBfb3B0aW9uc19ib3hbMF1bZmluZF1cbiAgICAgICAgLy8gJDEgaXM6IFtcbiAgICAgICAgbGV0IHBhcnQgPSAvXlteXFxbXSsoW14wLTldKykvLmV4ZWMocmF3TmFtZSlbMV0gfHwgJyc7XG4gICAgICAgIGlmIChwYXJ0Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIC8vIFR1cm4gaXQgaW50byBkb3Qgbm90YXRpb24gYW5kIGdldCByaWQgb2YgdW5uZWNlc3NhcnkgYnJhY2tldHNcbiAgICAgICAgICAgIHBhcnQgPSBwYXJ0LnN1YnN0cigxLCBwYXJ0Lmxlbmd0aCAtIDIpLnJlcGxhY2UoJ11bJywgJy4nKS5yZXBsYWNlKCdbJywgJycpLnJlcGxhY2UoJ10nLCAnJyk7XG4gICAgICAgICAgICAvLyBBZGQgaXQgdG8gdGhlIGRhdGFcbiAgICAgICAgICAgIGRhdGFbXCJmb3JtSXRlbURvdEtleVwiXSA9IHBhcnQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWRkIHRoZSByZXF1aXJlZCBkYXRhIGlmIHRoaXMgaXMgYSBcImZpbmQtcmVwbGFjZSBpbiBjdXN0b20gbWV0YVwiIHRlc3RcbiAgICAgICAgZGF0YSA9IHRoaXMuYWRkRGF0YUZvckZpbmRSZXBsYWNlSW5DdXN0b21NZXRhT3JTaG9ydENvZGVUZXN0KCR0ZXN0QnV0dG9uLCBkYXRhKTtcbiAgICAgICAgLy9sKFwiUHJlcGFyZWQ6XCIpO1xuICAgICAgICAvL2woZGF0YSk7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIHJlcXVpcmVkIHNldHRpbmdzIHRvIHRoZSBkYXRhIHRoYXQgd2lsbCBiZSBzZW50IHZpYSBBSkFYLlxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgYWRkU2V0dGluZ3NUb0FqYXhEYXRhKGRhdGEpIHtcbiAgICAgICAgLy8gRmlyc3QsIGFkZCByYXcgSFRNTCBmaW5kLWFuZC1yZXBsYWNlcy5cbiAgICAgICAgZGF0YSA9IHRoaXMuYWRkTWFuaXB1bGF0aW9uT3B0aW9uc1RvQWpheERhdGEoZGF0YSk7XG4gICAgICAgIC8vIEFkZCBjb29raWUgc2V0dGluZ3NcbiAgICAgICAgbGV0ICRjb29raWVzID0gJCh0aGlzLnBzdi5zZWxlY3RvclRhYk1haW4pLmZpbmQoJ2xhYmVsW2Zvcj0nICsgdGhpcy5wc3YuaW5wdXROYW1lQ29va2llcyArICddJykuY2xvc2VzdCgndHInKS5maW5kKCcuaW5wdXRzJykgfHwgbnVsbDtcbiAgICAgICAgaWYgKCRjb29raWVzICE9PSBudWxsICYmICRjb29raWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgZGF0YVsnY29va2llcyddID0gJGNvb2tpZXMuZmluZCgnOmlucHV0Jykuc2VyaWFsaXplKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWRkIGNhY2hpbmcgc2V0dGluZ1xuICAgICAgICBsZXQgJGNoZWNrYm94Q2FjaGUgPSAkKHRoaXMucHN2LnNlbGVjdG9yVGFiTWFpbikuZmluZCgnaW5wdXRbbmFtZT1cIl9jYWNoZV90ZXN0X3VybF9yZXNwb25zZXNcIl0nKSB8fCBudWxsO1xuICAgICAgICBpZiAoJGNoZWNrYm94Q2FjaGUgIT09IG51bGwgJiYgJGNoZWNrYm94Q2FjaGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBkYXRhWydjYWNoZVRlc3RVcmxSZXNwb25zZXMnXSA9ICRjaGVja2JveENhY2hlWzBdLmNoZWNrZWQgPyAxIDogMDtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGVyZSBpcyBcInVzZSBjdXN0b20gc2V0dGluZ3NcIiBjaGVja2JveFxuICAgICAgICBsZXQgJHVzZUN1c3RvbVNldHRpbmdzQ2hlY2tib3ggPSAkKFwiI19kb19ub3RfdXNlX2dlbmVyYWxfc2V0dGluZ3NcIikgfHwgbnVsbDtcbiAgICAgICAgbGV0IHVzZUN1c3RvbUdlbmVyYWxTZXR0aW5ncyA9IGZhbHNlO1xuICAgICAgICBpZiAoJHVzZUN1c3RvbVNldHRpbmdzQ2hlY2tib3ggIT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSB1c2VyIHdhbnRzIHRvIHVzZSBjdXN0b20gZ2VuZXJhbCBzZXR0aW5nc1xuICAgICAgICAgICAgaWYgKCR1c2VDdXN0b21TZXR0aW5nc0NoZWNrYm94Lmxlbmd0aCAmJiAkdXNlQ3VzdG9tU2V0dGluZ3NDaGVja2JveFswXS5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIGFsbCBnZW5lcmFsIHNldHRpbmdzXG4gICAgICAgICAgICAgICAgZGF0YVtcImN1c3RvbUdlbmVyYWxTZXR0aW5nc1wiXSA9ICQodGhpcy5wc3Yuc2VsZWN0b3JUYWJHZW5lcmFsU2V0dGluZ3MpLmZpbmQoJzppbnB1dCcpLnNlcmlhbGl6ZSgpO1xuICAgICAgICAgICAgICAgIHVzZUN1c3RvbUdlbmVyYWxTZXR0aW5ncyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRhW1wiY3VzdG9tR2VuZXJhbFNldHRpbmdzXCJdID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIEFkZCB3aGV0aGVyIHRoZSB1c2VyIHdhbnRzIHRvIHVzZSBVVEYtOCBvciBub3QgdG8gdGhlIGRhdGFcbiAgICAgICAgbGV0ICR1c2VVdGY4Q2hlY2tib3ggPSAkKFwiI193cGNjX21ha2Vfc3VyZV9lbmNvZGluZ191dGY4XCIpIHx8IG51bGw7XG4gICAgICAgIGlmICgkdXNlVXRmOENoZWNrYm94ICE9PSBudWxsICYmICR1c2VVdGY4Q2hlY2tib3gubGVuZ3RoICYmIHVzZUN1c3RvbUdlbmVyYWxTZXR0aW5ncykge1xuICAgICAgICAgICAgZGF0YVtcInVzZVV0ZjhcIl0gPSAkdXNlVXRmOENoZWNrYm94LmZpcnN0KClbMF0uY2hlY2tlZCA/IDEgOiAwO1xuICAgICAgICAgICAgbGV0ICRjb252ZXJ0RW5jb2RpbmdDaGVja2JveCA9ICQoXCIjX3dwY2NfY29udmVydF9jaGFyc2V0X3RvX3V0ZjhcIikgfHwgbnVsbDtcbiAgICAgICAgICAgIGRhdGFbXCJjb252ZXJ0RW5jb2RpbmdUb1V0ZjhcIl0gPSBVdGlscy5nZXRDaGVja2JveFZhbHVlKCRjb252ZXJ0RW5jb2RpbmdDaGVja2JveCkgPyAxIDogMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRhdGFbXCJ1c2VVdGY4XCJdID0gLTE7XG4gICAgICAgICAgICBkYXRhW1wiY29udmVydEVuY29kaW5nVG9VdGY4XCJdID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgZmluZC1hbmQtcmVwbGFjZSBvcHRpb25zIGZvciB0aGUgcmF3IEhUTUwgcmVzcG9uc2UgdG8gdGhlIEFKQVggZGF0YS5cbiAgICAgKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSBpbiB3aGljaCBmaW5kLWFuZC1yZXBsYWNlcyB0byBiZSBhZGRlZFxuICAgICAqL1xuICAgIGFkZE1hbmlwdWxhdGlvbk9wdGlvbnNUb0FqYXhEYXRhKGRhdGEpIHtcbiAgICAgICAgLy8gRmlyc3QsIHdlIG5lZWQgdG8gZmluZCBvdXQgd2hldGhlciB0aGUgdXNlciB0ZXN0cyB0aGUgY2F0ZWdvcnkgb3IgdGhlIHBvc3Qgc2V0dGluZ3MuXG4gICAgICAgIC8vIFdlIGNhbiBkbyB0aGlzIGJ5IGNoZWNraW5nIHRoZSBjdXJyZW50IHRhYi4gSW4gdGhlIGN1cnJlbnQgdGFiLCB3ZSBuZWVkIHRvIGZpbmQgZmluZC1hbmQtcmVwbGFjZSBvcHRpb25zIGZvclxuICAgICAgICAvLyByYXcgSFRNTC5cbiAgICAgICAgbGV0ICRhY3RpdmVUYWIgPSAkKCdkaXYudGFiOm5vdCguaGlkZGVuKScpLCBhY3RpdmVUYWJJZCA9ICRhY3RpdmVUYWIuYXR0cignaWQnKS5yZXBsYWNlKCd0YWItJywgJycpO1xuICAgICAgICAvLyBJZiB0aGlzIGlzIHRoZSB0ZW1wbGF0ZXMgdGFiLCB1c2UgbWFuaXB1bGF0aW9uIG9wdGlvbnMgZnJvbSB0aGUgcG9zdCB0YWIuXG4gICAgICAgIGlmIChhY3RpdmVUYWJJZC50b0xvd2VyQ2FzZSgpID09PSAndGVtcGxhdGVzJykge1xuICAgICAgICAgICAgJGFjdGl2ZVRhYiA9ICQodGhpcy5wc3Yuc2VsZWN0b3JUYWJQb3N0KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbmFtZU1hdGNoUmVnZXggPSAvW15cXFxcW10rLztcbiAgICAgICAgbGV0IHJlc3VsdHMgPSB7fTtcbiAgICAgICAgbGV0IGN1cnJlbnRJbnB1dE5hbWUsICRpbnB1dCwgJGlucHV0cywgYWN0dWFsTmFtZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBzdi5iYXNlSHRtbE1hbmlwdWxhdGlvbklucHV0TmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGN1cnJlbnRJbnB1dE5hbWUgPSB0aGlzLnBzdi5iYXNlSHRtbE1hbmlwdWxhdGlvbklucHV0TmFtZXNbaV07XG4gICAgICAgICAgICAvLyBHZXQgYSBzaW5nbGUgaW5wdXRcbiAgICAgICAgICAgICRpbnB1dCA9ICRhY3RpdmVUYWIuZmluZCgnaW5wdXRbbmFtZSo9XCInICsgY3VycmVudElucHV0TmFtZSArICdcIl0nKS5maXJzdCgpO1xuICAgICAgICAgICAgLy8gR2V0IGFsbCBpbnB1dHMgZm9yIHRoZSBpbnB1dCBuYW1lXG4gICAgICAgICAgICAkaW5wdXRzID0gJGlucHV0LmNsb3Nlc3QoXCIuaW5wdXRzXCIpLmZpbmQoJzppbnB1dCcpO1xuICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gaW5wdXQsIGNvbnRpbnVlLlxuICAgICAgICAgICAgaWYgKCRpbnB1dHMubGVuZ3RoIDwgMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIC8vIEdldCBhY3R1YWwgbmFtZSBvZiB0aGUgaW5wdXRcbiAgICAgICAgICAgIGFjdHVhbE5hbWUgPSAkaW5wdXQuYXR0cihcIm5hbWVcIikubWF0Y2gobmFtZU1hdGNoUmVnZXgpWzBdO1xuICAgICAgICAgICAgLy8gU2VyaWFsaXplIGlucHV0cyBhbmQgYWRkIHRoZW0gdG8gdGhlIGRhdGEgdW5kZXIgdGhlaXIgYWN0dWFsIG5hbWVcbiAgICAgICAgICAgIHJlc3VsdHNbYWN0dWFsTmFtZV0gPSAkaW5wdXRzLnNlcmlhbGl6ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGRhdGFbXCJtYW5pcHVsYXRpb25fb3B0aW9uc1wiXSA9IHJlc3VsdHM7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGQgZGF0YSB0byB0aGUgb3JpZ2luYWwgdGVzdCBkYXRhIGZvciBmaW5kLXJlcGxhY2UgaW4gY3VzdG9tIG1ldGEgYW5kIGN1c3RvbSBzaG9ydCBjb2RlIHRlc3RcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSAkdGVzdEJ1dHRvbiBUaGUgdGVzdCBidXR0b24gdGhhdCBpcyBjbGlja2VkIHRvIHBlcmZvcm0gdGhlIHRlc3RcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBkYXRhIE9yaWdpbmFsIGRhdGEgdG8gd2hpY2ggdGhlIG5ldyBkYXRhIHdpbGwgYmUgYWRkZWRcbiAgICAgKiBAcmV0dXJuIHthcnJheX0gRGF0YSB3aXRoIHRoZSBkYXRhIGZvciBmaW5kIHJlcGxhY2UgaW4gY3VzdG9tIG1ldGEgdGVzdFxuICAgICAqL1xuICAgIGFkZERhdGFGb3JGaW5kUmVwbGFjZUluQ3VzdG9tTWV0YU9yU2hvcnRDb2RlVGVzdCgkdGVzdEJ1dHRvbiwgZGF0YSkge1xuICAgICAgICBsZXQgY2xzQ3VzdG9tTWV0YSA9IFwid2NjLXRlc3QtZmluZC1yZXBsYWNlLWluLWN1c3RvbS1tZXRhXCIsIGNsc0N1c3RvbVNob3J0Q29kZSA9IFwid2NjLXRlc3QtZmluZC1yZXBsYWNlLWluLWN1c3RvbS1zaG9ydC1jb2RlXCI7XG4gICAgICAgIC8vIElmIHRoZSB0ZXN0IGJ1dHRvbiBpcyBub3QgdGhlIHRlc3QgYnV0dG9uIHdlIGFyZSBsb29raW5nIGZvciwgZG8gbm90IHByb2NlZWQgYW5kIGp1c3QgcmV0dXJuIHRoZSBvcmlnaW5hbCBkYXRhLlxuICAgICAgICBpZiAoISR0ZXN0QnV0dG9uLmhhc0NsYXNzKGNsc0N1c3RvbU1ldGEpICYmICEkdGVzdEJ1dHRvbi5oYXNDbGFzcyhjbHNDdXN0b21TaG9ydENvZGUpKVxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIGxldCBpc0N1c3RvbU1ldGEgPSAkdGVzdEJ1dHRvbi5oYXNDbGFzcyhjbHNDdXN0b21NZXRhKSwgdGFyZ2V0SW5wdXRTZWxlY3RvciA9ICcuJyArIChpc0N1c3RvbU1ldGEgPyAnbWV0YS1rZXknIDogJ3Nob3J0LWNvZGUnKSwgdGFyZ2V0SW5wdXRHcm91cFNlbGVjdG9yID0gJy4nICsgKGlzQ3VzdG9tTWV0YSA/ICdzZWxlY3Rvci1jdXN0b20tcG9zdC1tZXRhJyA6ICdzZWxlY3Rvci1jdXN0b20tc2hvcnRjb2RlJyk7XG4gICAgICAgIC8vIEdldCB0aGUgbWV0YSBrZXkgZm9yIHdoaWNoIHRoZSB1c2VyIHdhbnRzIHRvIHBlcmZvcm0gZmluZCBhbmQgcmVwbGFjZSBvcGVyYXRpb25cbiAgICAgICAgbGV0ICRrZXlJbnB1dCA9ICR0ZXN0QnV0dG9uLmNsb3Nlc3QoXCIuaW5wdXQtZ3JvdXBcIikuZmluZCgnLmlucHV0LWNvbnRhaW5lcicpLmZpbmQodGFyZ2V0SW5wdXRTZWxlY3Rvcik7XG4gICAgICAgIC8vIElmIG1ldGEga2V5IGlucHV0IGRvZXMgbm90IGV4aXN0LCBubyBuZWVkIHRvIGdvIG9uLiBSZXR1cm4gdGhlIG9yaWdpbmFsIGRhdGEuXG4gICAgICAgIGlmICghJGtleUlucHV0Lmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAvLyBHZXQgdGhlIG1ldGEga2V5XG4gICAgICAgIGxldCBrZXkgPSAka2V5SW5wdXQudmFsKCk7XG4gICAgICAgIGlmIChrZXkgPT0gdW5kZWZpbmVkIHx8ICFrZXkubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgICAgICAvLyBUaGVyZSBhcmUgdHdvIHBvc3NpYmxlIHBsYWNlcyB0aGUgdXNlciBjYW4gZGVmaW5lIGN1c3RvbSBtZXRhIGtleXMuIE9uZSBvZiB0aGVtIGNhbiBiZSBkZWZpbmVkIGJ5IENTUyBzZWxlY3RvcnNcbiAgICAgICAgLy8gYW5kIHRoZSBvdGhlciBvbmUgYnkgbWFudWFsbHkuIFdlJ2xsIGhhbmRsZSBib3RoIG9mIHRoZSBjYXNlcyBiZWxvdy4gV2UganVzdCBuZWVkIG9uZSB2YWx1ZS4gU28sIGlmIGEgdmFsdWVcbiAgICAgICAgLy8gaXMgZm91bmQsIHRoYXQncyBpdC4gV2UncmUgZG9uZS5cbiAgICAgICAgLy8gRmluZCBtZXRhIGtleSBpbnB1dHMgZGVmaW5lZCBpbiBzZWxlY3RvciBjdXN0b20gcG9zdCBtZXRhIG9wdGlvbnNcbiAgICAgICAgJCgnLmlucHV0LWdyb3VwJyArIHRhcmdldElucHV0R3JvdXBTZWxlY3RvciArICcgJyArIHRhcmdldElucHV0U2VsZWN0b3IpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGZvdW5kKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGxldCAkc2VsZiA9ICQodGhpcyk7XG4gICAgICAgICAgICBpZiAoJHNlbGYudmFsKCkgPT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBzZWxlY3RvciBhbmQgaXRzIGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgIGxldCAkY3NzU2VsZWN0b3JJbnB1dCA9ICRzZWxmLmNsb3Nlc3QoJy5pbnB1dC1ncm91cCcpLmZpbmQoJy5jc3Mtc2VsZWN0b3InKSwgJGNzc1NlbGVjdG9yQXR0cklucHV0ID0gJHNlbGYuY2xvc2VzdCgnLmlucHV0LWdyb3VwJykuZmluZCgnLmNzcy1zZWxlY3Rvci1hdHRyJyksICRvcHRpb25zQm94SW5wdXQgPSAkc2VsZi5jbG9zZXN0KCcuaW5wdXQtZ3JvdXAnKS5maW5kKCdbbmFtZSo9XCJbb3B0aW9uc19ib3hdXCJdJyksIGNzc1NlbGVjdG9yID0gJGNzc1NlbGVjdG9ySW5wdXQudmFsKCksIGF0dHIgPSAkY3NzU2VsZWN0b3JBdHRySW5wdXQudmFsKCksIG9wdGlvbnNCb3hEYXRhID0gJG9wdGlvbnNCb3hJbnB1dC5sZW5ndGggPyAkb3B0aW9uc0JveElucHV0LnZhbCgpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlIGlzIGEgQ1NTIHNlbGVjdG9yLCB3ZSd2ZSByZWFjaGVkIG91ciBnb2FsLlxuICAgICAgICAgICAgICAgIGlmIChjc3NTZWxlY3RvciAhPSB1bmRlZmluZWQgJiYgY3NzU2VsZWN0b3IubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgc2VsZWN0b3IgdG8gdGhlIGRhdGFcbiAgICAgICAgICAgICAgICAgICAgZGF0YVtcInZhbHVlU2VsZWN0b3JcIl0gPSBjc3NTZWxlY3RvcjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHIgIT0gdW5kZWZpbmVkICYmIGF0dHIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhW1widmFsdWVTZWxlY3RvckF0dHJcIl0gPSBhdHRyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlIGFyZSBvcHRpb25zIGZvciB0aGUgdGFyZ2V0IGlucHV0IGdyb3VwLCBhZGQgdGhlbSBhcyB3ZWxsXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zQm94RGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhW1widmFsdWVPcHRpb25zQm94RGF0YVwiXSA9IG9wdGlvbnNCb3hEYXRhO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIE1hcmsgaXQgYXMgZm91bmRcbiAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIElmIHRoZSBzZWxlY3RvciBjb3VsZCBub3QgYmUgZm91bmQsIHRyeSBjdXN0b20gcG9zdCBtZXRhIG9wdGlvbnMuXG4gICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgIGlmIChpc0N1c3RvbU1ldGEpIHtcbiAgICAgICAgICAgICAgICAkKCcuaW5wdXQtZ3JvdXAuY3VzdG9tLXBvc3QtbWV0YSAubWV0YS1rZXknKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBsZXQgJHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoJHNlbGYudmFsKCkgPT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJHZhbHVlSW5wdXQgPSAkc2VsZi5jbG9zZXN0KCcuaW5wdXQtZ3JvdXAnKS5maW5kKCdpbnB1dFt0eXBlPXRleHRdOm5vdCgubWV0YS1rZXkpJyksIHZhbHVlID0gJHZhbHVlSW5wdXQudmFsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT0gdW5kZWZpbmVkICYmIHZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbXCJzdWJqZWN0XCJdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWFyayBpdCBhcyBmb3VuZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFc2NhcGVzIHNwZWNpYWwgcmVnZXggY2hhcnNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBzdHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKiBAc2VlIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzExNDQ3ODgvMjg4MzQ4N1xuICAgICAqL1xuICAgIGVzY2FwZVJlZ0V4cChzdHIpIHtcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oWy4qKz9ePSE6JHt9KCl8XFxbXFxdXFwvXFxcXF0pL2csIFwiXFxcXCQxXCIpO1xuICAgIH1cbn1cblRlc3REYXRhUHJlcGFyZXIuSU5TVEFOQ0UgPSBudWxsO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBqUXVlcnk7Il0sInNvdXJjZVJvb3QiOiIifQ==