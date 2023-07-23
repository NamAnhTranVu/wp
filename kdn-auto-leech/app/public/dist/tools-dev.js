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
/******/ 	return __webpack_require__(__webpack_require__.s = "./scripts/tools-ts/tools.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./scripts/common-ts/InputGroupAdder.ts":
/*!**********************************************!*\
  !*** ./scripts/common-ts/InputGroupAdder.ts ***!
  \**********************************************/
/*! exports provided: InputGroupAdder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputGroupAdder", function() { return InputGroupAdder; });
class InputGroupAdder {
    constructor() { }
    static getInstance() {
        if (this.INSTANCE === null)
            this.INSTANCE = new InputGroupAdder();
        return this.INSTANCE;
    }
    /**
     * Adds a new input group to an input group container
     * @param $inputGroupContainer
     * @return New input group
     */
    addNewInputGroup($inputGroupContainer) {
        // Create a clone of the input group
        let $inputGroup = $inputGroupContainer.find(".input-group").first().clone();
        /*
         HANDLE THE DATA KEY
         */
        // First, find max data key
        let maxDataKey = 0;
        $inputGroupContainer.find('.input-group').each(function () {
            let $self = $(this);
            if ($self.data("key") != undefined && $self.data("key") > maxDataKey) {
                maxDataKey = $self.data("key");
            }
        });
        // Hold current data key
        let currentDataKey = $inputGroup.data("key");
        let newDataKey = maxDataKey + 1;
        // Set the new data key
        $inputGroup.attr("data-key", newDataKey); // This will update the HTML.
        $inputGroup.data("key", newDataKey); // This makes the actual change.
        let html = $inputGroup.html();
        $inputGroup.html(html.replace(new RegExp("\\[" + currentDataKey + "\\]", "g"), "[" + newDataKey + "]"));
        /* END DATA KEY */
        // Remove the values of the inputs
        $inputGroup.find("input").each(function () {
            $(this).val("");
        });
        $inputGroup.find("textarea").each(function () {
            $(this).html("");
        });
        $inputGroup.find("input[type=checkbox]").each(function () {
            $(this).prop('checked', false);
        });
        // Call the modifiers
        for (let modifier of InputGroupAdder.modifiers) {
            modifier($inputGroup);
        }
        // Append it to the container
        $inputGroupContainer.append($inputGroup);
        // Check for tooltip and initialize it
        if (typeof $.fn.tooltip === 'function')
            $inputGroup.find('[data-toggle="tooltip"]').tooltip();
        // Check if there is an options box button and revert it to its default
        $inputGroup.find('.kdn-options-box').each(function () {
            let $self = $(this);
            $self.removeClass('has-config');
            if (typeof $.fn.tooltip === 'function')
                $self.tooltip('destroy');
        });
        return $inputGroup;
    }
    /**
     * Register an input group modifier that will be called just before a new input group is added.
     * @param callback
     */
    registerModifier(callback) {
        InputGroupAdder.modifiers.push(callback);
    }
}
InputGroupAdder.INSTANCE = null;
InputGroupAdder.modifiers = [];

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

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

/***/ "./scripts/common-ts/ObjectSerializer.ts":
/*!***********************************************!*\
  !*** ./scripts/common-ts/ObjectSerializer.ts ***!
  \***********************************************/
/*! exports provided: ObjectSerializer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObjectSerializer", function() { return ObjectSerializer; });
/**
 * Registers $.fn.serializeObjectNoNull function. See {@link registerFunction}.
 */
class ObjectSerializer {
    constructor() {
        this.registerFunction();
    }
    static getInstance() {
        if (this.INSTANCE === null)
            this.INSTANCE = new ObjectSerializer();
        return this.INSTANCE;
    }
    /**
     * Serializes the inputs by using "form-serializer" node module, and removes null values from the array-valued inputs.
     * E.g. if the array-valued inputs start from index 4, serializeObject function returns [null, null, null, object].
     * This function removes the null values.
     */
    registerFunction() {
        $.fn.serializeObjectNoNull = function () {
            let result = $.fn.serializeObject.apply(this, arguments);
            // console.log(result);
            for (let key in result) {
                if (!result.hasOwnProperty(key))
                    continue;
                // If this is not an array, no need to check it for null values.
                if (!(result[key] instanceof Array))
                    continue;
                result[key] = result[key].filter(function (el) {
                    return el !== null;
                });
            }
            return result;
        };
    }
}
ObjectSerializer.INSTANCE = null;

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

/***/ "./scripts/tools-ts/app/Tools.ts":
/*!***************************************!*\
  !*** ./scripts/tools-ts/app/Tools.ts ***!
  \***************************************/
/*! exports provided: Tools */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tools", function() { return Tools; });
/* harmony import */ var _multiple_crawling_tool_MultiCrawlingTool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./multiple-crawling-tool/MultiCrawlingTool */ "./scripts/tools-ts/app/multiple-crawling-tool/MultiCrawlingTool.ts");
/* harmony import */ var _ToolsVariables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ToolsVariables */ "./scripts/tools-ts/app/ToolsVariables.ts");
/* harmony import */ var _common_ts_InputGroupAdder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common-ts/InputGroupAdder */ "./scripts/common-ts/InputGroupAdder.ts");
/* harmony import */ var _common_ts_ObjectSerializer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common-ts/ObjectSerializer */ "./scripts/common-ts/ObjectSerializer.ts");




class Tools {
    constructor() {
        this.processing = false;
        this.tv = _ToolsVariables__WEBPACK_IMPORTED_MODULE_1__["ToolsVariables"].getInstance();
        this.inputGroupAdder = _common_ts_InputGroupAdder__WEBPACK_IMPORTED_MODULE_2__["InputGroupAdder"].getInstance();
        // Initialize object serializer
        _common_ts_ObjectSerializer__WEBPACK_IMPORTED_MODULE_3__["ObjectSerializer"].getInstance();
        // Initialize the multiple crawling tool
        _multiple_crawling_tool_MultiCrawlingTool__WEBPACK_IMPORTED_MODULE_0__["MultiCrawlingTool"].getInstance();
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
    activateTab(e) {
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
    hideTestResults(e) {
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
    toggleInfoButtons(e) {
        e.preventDefault();
        let $self = $(e.target);
        // Find closest info texts and show/hide them.
        let first = false;
        let show = false;
        $self.closest('.details').find('.info-text').each((i, el) => {
            let $self = $(el);
            // Get the first info text's visibility. If it is visible, then we're gonna hide all of the infos. If it is
            // hidden, we'll do otherwise. By this way, we can keep track of info texts in different detail boxes.
            if (!first) {
                show = $self.hasClass("hidden");
                first = true;
            }
            if (show) {
                $self.removeClass("hidden");
            }
            else {
                $self.addClass("hidden");
            }
        });
    }
    /**
     * Handles form submission
     * @param e
     */
    handleFormSubmission(e) {
        e.preventDefault();
        if (this.processing)
            return;
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
            .done(function (response) {
            if (response) {
                $contentContainer.html(response.view);
            }
            else {
                $contentContainer.html(window.kdn.no_result);
            }
        })
            .fail(function (response) {
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
    getFormData($form) {
        let unindexedArray = $form.serializeArray();
        let indexedArray = {};
        $.map(unindexedArray, (n, i) => {
            indexedArray[n['name']] = n['value'];
        });
        return indexedArray;
    }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./scripts/tools-ts/app/ToolsVariables.ts":
/*!************************************************!*\
  !*** ./scripts/tools-ts/app/ToolsVariables.ts ***!
  \************************************************/
/*! exports provided: ToolsVariables */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolsVariables", function() { return ToolsVariables; });
class ToolsVariables {
    constructor() {
        this.selectorToolsContainer = '#container-tools';
        this.selectorTabNavigation = this.selectorToolsContainer + ' > .nav-tab-wrapper';
        this.selectorTabs = this.selectorToolsContainer + ' > .tab';
    }
    /**
     * This class is a singleton. Get the instance with this method.
     */
    static getInstance() {
        if (this.INSTANCE === null)
            this.INSTANCE = new ToolsVariables();
        return this.INSTANCE;
    }
}
ToolsVariables.INSTANCE = null;


/***/ }),

/***/ "./scripts/tools-ts/app/multiple-crawling-tool/CrawlingType.ts":
/*!*********************************************************************!*\
  !*** ./scripts/tools-ts/app/multiple-crawling-tool/CrawlingType.ts ***!
  \*********************************************************************/
/*! exports provided: CrawlingType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CrawlingType", function() { return CrawlingType; });
var CrawlingType;
(function (CrawlingType) {
    CrawlingType[CrawlingType["CRAWL_NOW"] = 0] = "CRAWL_NOW";
    CrawlingType[CrawlingType["ADD_TO_DATABASE"] = 1] = "ADD_TO_DATABASE";
})(CrawlingType || (CrawlingType = {}));


/***/ }),

/***/ "./scripts/tools-ts/app/multiple-crawling-tool/MultiCrawlingTool.ts":
/*!**************************************************************************!*\
  !*** ./scripts/tools-ts/app/multiple-crawling-tool/MultiCrawlingTool.ts ***!
  \**************************************************************************/
/*! exports provided: MultiCrawlingTool */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiCrawlingTool", function() { return MultiCrawlingTool; });
/* harmony import */ var _CrawlingType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CrawlingType */ "./scripts/tools-ts/app/multiple-crawling-tool/CrawlingType.ts");
/* harmony import */ var _url_data_PostUrlData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../url-data/PostUrlData */ "./scripts/tools-ts/app/url-data/PostUrlData.ts");
/* harmony import */ var _ToolsVariables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ToolsVariables */ "./scripts/tools-ts/app/ToolsVariables.ts");
/* harmony import */ var _common_ts_Utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../common-ts/Utils */ "./scripts/common-ts/Utils.ts");
/* harmony import */ var _url_data_CategoryUrlData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../url-data/CategoryUrlData */ "./scripts/tools-ts/app/url-data/CategoryUrlData.ts");
/* harmony import */ var _common_ts_Notifier__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../common-ts/Notifier */ "./scripts/common-ts/Notifier.ts");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _common_ts_enum_NotificationType__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../common-ts/enum/NotificationType */ "./scripts/common-ts/enum/NotificationType.ts");








class MultiCrawlingTool {
    constructor() {
        this.selectorContainerUrlQueue = '#container-url-queue-manual-crawl';
        this.selectorTableContainerUrlQueue = this.selectorContainerUrlQueue + ' .table-container';
        this.selectorTableUrlQueue = '#table-url-queue-manual-crawl';
        this.selectorToolContainerManualCrawl = '#tool-manual-crawl';
        this.classForm = "tool-manual-crawl";
        this.selectorForm = "." + this.classForm;
        this.classButtonCrawlNow = 'crawl-now';
        this.classButtonAddToDatabase = 'add-to-database';
        this.selectorButtonCrawlNow = '.button.' + this.classButtonCrawlNow;
        this.selectorButtonAddToDatabase = '.button.' + this.classButtonAddToDatabase;
        this.selectorButtonDelete = '.button.delete';
        this.selectorButtonRepeat = '.button.repeat';
        /** Caches URL row prototype */
        this.$urlRowPrototype = null;
        /** Caches response row prototype */
        this.$responseRowPrototype = null;
        /** Class of response rows of URL table */
        this.classResponse = 'response';
        /** has-response class */
        this.classHasResponse = 'has-response';
        /** has-response class */
        this.classOpen = 'open';
        /** Selector for the checkbox that is used to decide if the URLs should be cleared after form submisson */
        this.selectorCheckboxClearUrls = '#_manual_crawling_tool_clear_after_submit';
        /** Stores the category URL from which post URLs are being retrieved */
        this.beingProcessedCategoryUrlData = null;
        /** Stores the category URLs that should be processed to retrieve post URLs */
        this.categoryUrlQueue = [];
        /** True if the crawling is paused. Otherwise, false. */
        this.isPaused = false;
        /** Stores how many requests are currently running. */
        this.runningRequestCount = 0;
        /** How many post crawling requests can be sent at the same time. */
        this.maxParallelCrawling = 1;
        this.inputNameSiteId = '_kdn_tools_site_id';
        this.inputNameCategoryId = '_kdn_tools_category_id';
        this.inputNameCategoryUrls = '_category_urls';
        this.inputNamePostUrls = '_post_urls';
        // Initialize variables
        this.tv = _ToolsVariables__WEBPACK_IMPORTED_MODULE_2__["ToolsVariables"].getInstance();
        // Create the CSS selector that finds the URLs to be crawled
        this.selectorUrls = this.selectorTableUrlQueue + ' tbody > tr.url:not(.prototype)';
        this.selectorUrlResponses = this.selectorTableUrlQueue + ' tbody > tr.url:not(.prototype) + .' + this.classResponse;
        this.selectorUrlsToBeCrawled = this.selectorTableUrlQueue + ' tbody > tr.url:not(.prototype):not(.loading):not(.done)';
        this.selectorUrlsDone = this.selectorTableUrlQueue + ' tbody > tr.url.done:not(.prototype)';
        this.selectorUrlsBeingCrawled = this.selectorTableUrlQueue + ' tbody > tr.url.loading:not(.prototype)';
        this.selectorStatus = this.selectorContainerUrlQueue + ' #status';
        this.selectorButtonContinue = this.selectorContainerUrlQueue + ' .button.continue';
        this.selectorButtonPause = this.selectorContainerUrlQueue + ' .button.pause';
        this.selectorClearAllUrls = this.selectorTableUrlQueue + ' thead th.controls .remove-all';
        this.selectorInputMaxPostsToBeCrawled = this.selectorToolContainerManualCrawl + ' #_max_posts_to_be_crawled';
        this.selectorInputMaxParallelCrawlingCount = this.selectorToolContainerManualCrawl + ' #_max_parallel_crawling_count';
        this.selectorShowAllResponses = this.selectorContainerUrlQueue + ' .show-all-responses';
        this.selectorHideAllResponses = this.selectorContainerUrlQueue + ' .hide-all-responses';
        // Initialize event listeners
        jquery__WEBPACK_IMPORTED_MODULE_6___default()(document).on('click', this.selectorButtonAddToDatabase, e => this.onClickSubmit(e, _CrawlingType__WEBPACK_IMPORTED_MODULE_0__["CrawlingType"].ADD_TO_DATABASE));
        jquery__WEBPACK_IMPORTED_MODULE_6___default()(document).on('click', this.selectorButtonCrawlNow, e => this.onClickSubmit(e, _CrawlingType__WEBPACK_IMPORTED_MODULE_0__["CrawlingType"].CRAWL_NOW));
        jquery__WEBPACK_IMPORTED_MODULE_6___default()(document).on('click', this.selectorContainerUrlQueue + ' ' + this.selectorButtonDelete, e => this.onClickDeleteUrl(e));
        jquery__WEBPACK_IMPORTED_MODULE_6___default()(document).on('click', this.selectorContainerUrlQueue + ' ' + this.selectorButtonRepeat, e => this.onClickRepeatCrawling(e));
        jquery__WEBPACK_IMPORTED_MODULE_6___default()(document).on('click', this.selectorTableUrlQueue + ' tbody > tr', e => this.onClickUrlRow(e));
        // When a link in a row is clicked, do not propagate the event so that the visibility of the response view is not toggled.
        jquery__WEBPACK_IMPORTED_MODULE_6___default()(document).on('click', this.selectorTableUrlQueue + ' tbody > tr a', e => e.stopPropagation());
        // Handle continue/pause button clicks
        jquery__WEBPACK_IMPORTED_MODULE_6___default()(document).on('click', this.selectorButtonContinue, () => this.continueCrawling());
        jquery__WEBPACK_IMPORTED_MODULE_6___default()(document).on('click', this.selectorButtonPause, () => this.pauseCrawling());
        // Clear all URLs
        jquery__WEBPACK_IMPORTED_MODULE_6___default()(document).on('click', this.selectorClearAllUrls, () => this.clearAllUrls());
        // Show/hide all responses
        jquery__WEBPACK_IMPORTED_MODULE_6___default()(document).on('click', this.selectorShowAllResponses, () => this.showAllResponses());
        jquery__WEBPACK_IMPORTED_MODULE_6___default()(document).on('click', this.selectorHideAllResponses, () => this.hideAllResponses());
    }
    /**
     * This class is a singleton. Get the instance with this method.
     */
    static getInstance() {
        if (this.INSTANCE === null)
            this.INSTANCE = new MultiCrawlingTool();
        return this.INSTANCE;
    }
    /**
     * Clears all URLs, except the ones that are currently being crawled
     */
    clearAllUrls() {
        // Find rows that are:
        // - Already crawled
        // - Responses of already-crawled URLs
        // - Waiting to be crawled
        let selector = this.selectorUrlsDone + ', ' + this.selectorUrlsToBeCrawled + ', ' + this.selectorUrlsDone + ' + tr.response';
        jquery__WEBPACK_IMPORTED_MODULE_6___default()(selector).remove();
        // The table has been updated
        this.onUpdateUrlTable();
    }
    /**
     * Handles form submission
     * @param e
     * @param type
     */
    onClickSubmit(e, type) {
        e.preventDefault();
        e.stopPropagation();
        let $self = jquery__WEBPACK_IMPORTED_MODULE_6___default()(e.target);
        // Hide the tooltip. Remove the focus as well, because after hiding, the tooltip does not go away. Its text
        // stay as invisible. But, it prevents interacting with the element underneath.
        if (typeof jquery__WEBPACK_IMPORTED_MODULE_6___default.a.fn.tooltip == 'function')
            $self.tooltip('hide').blur();
        // Get the added URLs
        let urls = this.getEnteredUrls();
        switch (type) {
            // If the user wants to crawl the URLs right now
            case _CrawlingType__WEBPACK_IMPORTED_MODULE_0__["CrawlingType"].CRAWL_NOW:
                this.pauseThreshold = this.getMaxPostsToBeCrawled();
                this.crawledUrlCountAfterSubmit = 0;
                this.maxParallelCrawling = this.getMaxParallelCrawlingCount();
                // Maximum parallel crawling count cannot be greater than the pause threshold. Because the requests
                // will be sent in parallel, by the time we increase the crawled post count, there might be lots of
                // requests sent. In turn, pause threshold will be breached. So, this fixes that case.
                if (this.pauseThreshold > 0)
                    this.maxParallelCrawling = Math.min(this.maxParallelCrawling, this.pauseThreshold);
                this.continueCrawling();
                this.retrievePostUrlsFromCategoryUrls();
                this.addUrlsToQueueTable(urls);
                this.crawlNextUrlInQueue();
                // Indicate some things are happening
                flashBackground(jquery__WEBPACK_IMPORTED_MODULE_6___default()(this.selectorContainerUrlQueue));
                break;
            // If the user wants to add the URLs to the database
            case _CrawlingType__WEBPACK_IMPORTED_MODULE_0__["CrawlingType"].ADD_TO_DATABASE:
                this.handleAddUrlsToDatabase(urls);
                // Indicate some things are happening
                flashBackground(jquery__WEBPACK_IMPORTED_MODULE_6___default()(this.selectorContainerUrlQueue));
                break;
        }
    }
    /**
     * Retrieves post URLs from the category URLs in the queue
     */
    retrievePostUrlsFromCategoryUrls() {
        // If there is a currently-being-processed category URL stop.
        // If there is no category URL in the queue, stop.
        // If the crawling is paused, stop.
        if (this.beingProcessedCategoryUrlData !== null || !this.categoryUrlQueue.length || this.isPaused)
            return;
        // Get the first element in the queue and remove it from the queue.
        this.beingProcessedCategoryUrlData = this.categoryUrlQueue.shift();
        // Update the table so that it shows the currently-being-processed category URL
        this.onUpdateUrlTable();
        let catUrl = this.beingProcessedCategoryUrlData;
        // Send the request
        jquery__WEBPACK_IMPORTED_MODULE_6___default.a.post(window.ajaxurl, {
            kdn_nonce: jquery__WEBPACK_IMPORTED_MODULE_6___default()("#kdn_nonce").val(),
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
            let l = results.length, urlDataList = [], currentItem, postUrl, imageUrl;
            for (let i = 0; i < l; i++) {
                currentItem = results[i] || null;
                if (currentItem === null)
                    continue;
                postUrl = currentItem.url || null;
                imageUrl = currentItem.thumbnail || null;
                if (postUrl === null)
                    continue;
                urlDataList.push(new _url_data_PostUrlData__WEBPACK_IMPORTED_MODULE_1__["PostUrlData"](catUrl.siteName, catUrl.siteId, postUrl, catUrl.categoryName, catUrl.categoryId, imageUrl));
            }
            if (!urlDataList.length) {
                // Notify the user
                _common_ts_Notifier__WEBPACK_IMPORTED_MODULE_5__["Notifier"].getInstance().notifyRegular(jquery__WEBPACK_IMPORTED_MODULE_6___default()('label[for="' + this.inputNameCategoryUrls + '"]'), window.kdn.no_urls_found + ' ' + catUrl.url, _common_ts_enum_NotificationType__WEBPACK_IMPORTED_MODULE_7__["NotificationType"].INFO);
                this.onUpdateUrlTable();
                return;
            }
            // Add the URLs to the queue and crawl the next one in the queue
            this.addUrlsToQueueTable(urlDataList);
            this.crawlNextUrlInQueue();
        })
            .fail((response) => {
            // Notify the user
            _common_ts_Notifier__WEBPACK_IMPORTED_MODULE_5__["Notifier"].getInstance().notifyRegular(jquery__WEBPACK_IMPORTED_MODULE_6___default()('label[for="' + this.inputNameCategoryUrls + '"]'), window.kdn.an_error_occurred + " (" + catUrl.url + "): " + response.responseText, _common_ts_enum_NotificationType__WEBPACK_IMPORTED_MODULE_7__["NotificationType"].ERROR);
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
    handleAddUrlsToDatabase(urls) {
        // Get the test results container
        let $testResultContainer = this.getTestResultContainer();
        // If there is an on-going request, stop.
        if ($testResultContainer.hasClass('loading'))
            return;
        // Set the result container "loading"
        $testResultContainer.removeClass('hidden').addClass('loading');
        let $contentContainer = $testResultContainer.find('.content').first();
        $contentContainer.html('');
        let categoryUrls = this.categoryUrlQueue;
        this.categoryUrlQueue = [];
        // Send the request
        jquery__WEBPACK_IMPORTED_MODULE_6___default.a.post(window.ajaxurl, {
            kdn_nonce: jquery__WEBPACK_IMPORTED_MODULE_6___default()("#kdn_nonce").val(),
            action: window.pageActionKey,
            data: {
                'tool_type': 'add_urls_to_database',
                'post_urls': JSON.stringify(urls),
                'category_urls': JSON.stringify(categoryUrls)
            }
        })
            .done((response) => {
            if (response) {
                $contentContainer.html(response.view);
            }
            else {
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
    onClickUrlRow(e) {
        let $self = jquery__WEBPACK_IMPORTED_MODULE_6___default()(e.target).closest('tr');
        // Get the response row
        let $responseRow = this.getUrlRowResponse($self);
        if ($responseRow === null)
            return;
        // Toggle its hidden status.
        if ($responseRow.hasClass('hidden')) {
            $responseRow.removeClass('hidden');
            $self.addClass(this.classOpen);
        }
        else {
            $responseRow.addClass('hidden');
            $self.removeClass(this.classOpen);
        }
    }
    /**
     * Crawls the next URL in queue
     */
    crawlNextUrlInQueue() {
        // Stop if maximum running request count is reached.
        if (this.runningRequestCount >= this.maxParallelCrawling) {
            // console.log("Max parallel request count has been reached. The crawling will continue when a request finishes.", this.runningRequestCount, this.maxParallelCrawling);
            return;
        }
        // Start the number of requests that is defined by the user
        while (this.runningRequestCount < this.maxParallelCrawling) {
            // Stop if the crawling is paused.
            if (this.isPaused)
                return;
            // Pause if the pause threshold is reached.
            if (this.pauseThreshold > 0 && this.crawledUrlCountAfterSubmit >= this.pauseThreshold) {
                this.crawledUrlCountAfterSubmit = 0;
                this.pauseThreshold = 0;
                this.pauseCrawling();
                return;
            }
            // Get the first URL in the queue that is not currently loading
            let $urlRow = jquery__WEBPACK_IMPORTED_MODULE_6___default()(this.selectorUrlsToBeCrawled).first() || null;
            // If there is no URL waiting to be saved, then stop.
            if ($urlRow === null || !$urlRow.length) {
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
    crawlUrlRow($urlRow, doneCallback = null, failCallback = null, alwaysCallback = null, recrawlIfDuplicate = false) {
        let urlData = $urlRow.data("urlData") || null;
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
        jquery__WEBPACK_IMPORTED_MODULE_6___default.a.post(window.ajaxurl, {
            kdn_nonce: jquery__WEBPACK_IMPORTED_MODULE_6___default()("#kdn_nonce").val(),
            action: window.pageActionKey,
            data: {
                'tool_type': 'save_post',
                '_kdn_tools_site_id': urlData.siteId,
                '_kdn_tools_post_url': urlData.url,
                '_kdn_tools_category_id': urlData.categoryId,
                '_kdn_tools_featured_image_url': urlData.imageUrl,
                '_kdn_recrawl_if_duplicate': recrawlIfDuplicate ? '1' : '0'
            }
        })
            .done((response) => {
            if (response) {
                this.setResponseRowHtml($responseRow, response.view);
            }
            else {
                this.setResponseRowHtml($responseRow, window.kdn.no_result);
            }
            if (doneCallback !== null)
                doneCallback(response);
        })
            .fail((response) => {
            console.log(response);
            this.setResponseRowHtml($responseRow, window.kdn.an_error_occurred + ": " + response.responseText);
            if (failCallback !== null)
                failCallback(response);
        })
            .always(e => {
            // Set the response
            $urlRow.after($responseRow);
            $urlRow.addClass(this.classHasResponse).addClass(this.classOpen);
            // Mark the URL row as done
            this.setUrlRowDone($urlRow);
            // Update the status
            this.updateStatus();
            if (alwaysCallback !== null)
                alwaysCallback(e);
        });
    }
    /**
     * Sets a URL table row 'loading'.
     * @param $urlRow
     */
    setUrlRowLoading($urlRow) {
        $urlRow.addClass('loading').removeClass('done');
        $urlRow.find('td.status').html('<span class="dashicons dashicons-update"></span>');
        $urlRow.find('.button.delete').addClass('hidden');
        $urlRow.find('.button.repeat').addClass('hidden');
    }
    /**
     * Sets a URL table row 'done'.
     * @param $urlRow
     */
    setUrlRowDone($urlRow) {
        $urlRow.removeClass('loading').addClass('done');
        $urlRow.find('td.status').html('<span class="dashicons dashicons-yes"></span>');
        $urlRow.find('.button.delete').removeClass('hidden');
        $urlRow.find('.button.repeat').removeClass('hidden');
    }
    /**
     * Adds given UrlData to the queue
     * @param urls
     */
    addUrlsToQueueTable(urls) {
        let $tableContainer = jquery__WEBPACK_IMPORTED_MODULE_6___default()(this.selectorTableContainerUrlQueue).first();
        let $tbody = $tableContainer.find(' tbody').first();
        urls = urls || [];
        // Create views for the URLs and add them to the table
        for (let urlData of urls) {
            $tbody.append(this.createUrlRow(urlData));
        }
        // Update the URL table visibilities
        this.onUpdateUrlTable();
        // if any URLs are added
        if (urls.length) {
            // Initialize the tooltips
            jquery__WEBPACK_IMPORTED_MODULE_6___default()('[data-toggle="tooltip"]').tooltip();
            // Flash the background
            flashBackground($tableContainer);
        }
        // Update the status
        this.updateStatus();
    }
    /**
     * Shows/hides default message or URL table considering whether there are items in the table or not
     */
    onUpdateUrlTable() {
        let $tableContainer = jquery__WEBPACK_IMPORTED_MODULE_6___default()(this.selectorTableContainerUrlQueue).first();
        let $defaultMessage = jquery__WEBPACK_IMPORTED_MODULE_6___default()(this.selectorContainerUrlQueue).find('.default-message').first();
        // If there are no URLs, hide the table and show the default message.
        let $notHiddenRows = jquery__WEBPACK_IMPORTED_MODULE_6___default()(this.selectorTableUrlQueue).find('tbody tr:not(.hidden)') || null;
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
    createUrlRow(urlData) {
        // Create a new row
        let $row = this.getNewUrlRowElement();
        // Modify the row such that it contains current UrlData values
        $row.find('.site').text(urlData.siteName);
        $row.find('.category').text(urlData.categoryName);
        if (urlData.imageUrl.length) {
            let $img = jquery__WEBPACK_IMPORTED_MODULE_6___default()('<img/>')
                .attr('src', urlData.imageUrl);
            let $a = jquery__WEBPACK_IMPORTED_MODULE_6___default()('<a/>')
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
    setResponseRowHtml($row, html) {
        let $response = $row.find('.' + this.classResponse).first();
        $response.html(html);
        return $response;
    }
    /**
     * Get prototype table row element
     */
    getNewUrlRowElement() {
        if (this.$urlRowPrototype === null) {
            this.$urlRowPrototype = jquery__WEBPACK_IMPORTED_MODULE_6___default()(this.selectorTableUrlQueue).find('tr.prototype.url').first();
        }
        return this.$urlRowPrototype.clone().removeClass('prototype').removeClass('hidden');
    }
    /**
     * Get prototype table row element
     */
    getNewResponseRowElement() {
        if (this.$responseRowPrototype === null) {
            this.$responseRowPrototype = jquery__WEBPACK_IMPORTED_MODULE_6___default()(this.selectorTableUrlQueue).find('tr.prototype.response').first();
        }
        return this.$responseRowPrototype.clone().removeClass('prototype').removeClass('hidden');
    }
    /**
     * Collects entered URLs and returns an array of URLData.
     */
    getEnteredUrls() {
        let urls = [];
        let $form = jquery__WEBPACK_IMPORTED_MODULE_6___default()(this.selectorForm).first();
        let serializedValues = $form.serializeObjectNoNull();
        let siteId = serializedValues['_kdn_tools_site_id'] || null;
        let categoryId = serializedValues['_kdn_tools_category_id'] || null;
        // Get the selected site's name
        let siteNameSelector = this.selectorForm + ' #_kdn_tools_site_id option[value="' + siteId + '"]';
        let siteName = jquery__WEBPACK_IMPORTED_MODULE_6___default()(siteNameSelector).text() || null;
        // Get the selected category's name
        let categoryNameSelector = this.selectorForm + ' #_kdn_tools_category_id option[value="' + categoryId + '"]';
        let categoryName = jquery__WEBPACK_IMPORTED_MODULE_6___default()(categoryNameSelector).text() || null;
        if (siteId === null || categoryId === null) {
            // Notify the user
            let inputName = siteId === null ? this.inputNameSiteId : this.inputNameCategoryId;
            _common_ts_Notifier__WEBPACK_IMPORTED_MODULE_5__["Notifier"].getInstance().notifyRegular(jquery__WEBPACK_IMPORTED_MODULE_6___default()('label[for="' + inputName + '"]'), window.kdn.this_is_not_valid, _common_ts_enum_NotificationType__WEBPACK_IMPORTED_MODULE_7__["NotificationType"].WARN);
            return urls;
        }
        // console.log(serializedValues);
        // Get post URLs with featured image URLs
        let postAndImageUrls = serializedValues['_post_and_featured_image_urls'] || null;
        if (postAndImageUrls !== null) {
            let l = postAndImageUrls.length, current, postUrl, imageUrl;
            for (let i = 0; i < l; i++) {
                current = postAndImageUrls[i] || null;
                if (current === null)
                    continue;
                postUrl = current.postUrl || null;
                imageUrl = current.imageUrl || null;
                // There must a valid post URL.
                if (postUrl === null || !this.isValidUrl(postUrl))
                    continue;
                // If the image URL is not valid, make it null.
                if (imageUrl !== null && !this.isValidUrl(imageUrl))
                    imageUrl = null;
                urls.push(new _url_data_PostUrlData__WEBPACK_IMPORTED_MODULE_1__["PostUrlData"](siteName, siteId, postUrl, categoryName, categoryId, imageUrl));
            }
        }
        // Get new line separated post URLs
        let nlSeparatedPostUrls = serializedValues[this.inputNamePostUrls] || null;
        if (nlSeparatedPostUrls !== null) {
            let val = nlSeparatedPostUrls.split('\n').map((v, ind) => {
                return v.trim();
            });
            let l = val.length, currentPostUrl;
            for (let i = 0; i < l; i++) {
                currentPostUrl = val[i] || null;
                if (currentPostUrl === null)
                    continue;
                // The URL must be a valid URL
                if (!this.isValidUrl(currentPostUrl))
                    continue;
                urls.push(new _url_data_PostUrlData__WEBPACK_IMPORTED_MODULE_1__["PostUrlData"](siteName, siteId, currentPostUrl, categoryName, categoryId, null));
            }
        }
        // Get category URLs
        let categoryUrls = serializedValues[this.inputNameCategoryUrls] || null;
        if (categoryUrls !== null) {
            // Prepare the category urls
            categoryUrls = categoryUrls.map((v, ind) => {
                return v.trim();
            });
            for (let categoryUrl of categoryUrls) {
                categoryUrl = categoryUrl || null;
                if (categoryUrl === null)
                    continue;
                this.categoryUrlQueue.push(new _url_data_CategoryUrlData__WEBPACK_IMPORTED_MODULE_4__["CategoryUrlData"](siteName, siteId, categoryUrl, categoryName, categoryId));
            }
        }
        // Clear the URL inputs if the user wants
        let $checkbox = jquery__WEBPACK_IMPORTED_MODULE_6___default()(this.selectorCheckboxClearUrls) || null;
        if ($checkbox !== null && $checkbox.length && $checkbox[0].checked) {
            $form.find('.kdn-remove').each((i, el) => {
                jquery__WEBPACK_IMPORTED_MODULE_6___default()(el).click();
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
    isValidUrl(url) {
        url = url || null;
        // URL cannot be null
        if (url === null)
            return false;
        // URL must start with "http"
        if (!_common_ts_Utils__WEBPACK_IMPORTED_MODULE_3__["Utils"].startsWith(url.toLowerCase(), 'http'))
            return false;
        return true;
    }
    /**
     * Repeats crawling for the URL row that is closest to the event
     * @param e
     */
    onClickRepeatCrawling(e) {
        e.preventDefault();
        e.stopPropagation();
        let $self = jquery__WEBPACK_IMPORTED_MODULE_6___default()(e.target);
        let $urlRow = $self.closest('tr');
        let $responseRow = $urlRow.next() || null;
        let urlData = $urlRow.data("urlData") || null;
        if (urlData === null) {
            // Notify the user
            _common_ts_Notifier__WEBPACK_IMPORTED_MODULE_5__["Notifier"].getInstance().notifyRegular($urlRow, window.kdn.url_data_not_exist_for_this, _common_ts_enum_NotificationType__WEBPACK_IMPORTED_MODULE_7__["NotificationType"].ERROR);
            console.log("URL data does not exist for this row.");
            return;
        }
        // If the next row is a response row, remove it.
        if ($responseRow !== null && $responseRow.length && $responseRow.hasClass(this.classResponse)) {
            $responseRow.remove();
            $urlRow.removeClass(this.classOpen);
        }
        else {
            // Notify the user
            _common_ts_Notifier__WEBPACK_IMPORTED_MODULE_5__["Notifier"].getInstance().notifyRegular($urlRow, window.kdn.this_url_not_crawled_yet, _common_ts_enum_NotificationType__WEBPACK_IMPORTED_MODULE_7__["NotificationType"].INFO);
            // Stop, because this URL row has not been crawled yet.
            return;
        }
        // Crawl the URL row
        this.crawlUrlRow($urlRow, null, null, null, true);
    }
    /**
     * Handles clicks made to the remove button
     * @param e
     */
    onClickDeleteUrl(e) {
        e.preventDefault();
        let $self = jquery__WEBPACK_IMPORTED_MODULE_6___default()(e.target);
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
    getUrlRowResponse($urlRow) {
        // Get the table row coming after
        let $nextRow = $urlRow.next() || null;
        // If the next row is a response row, remove it.
        if ($nextRow === null || !$nextRow.length || !$nextRow.hasClass(this.classResponse))
            return null;
        return $nextRow;
    }
    /**
     * Updates the status of the URL table
     */
    updateStatus() {
        let $status = jquery__WEBPACK_IMPORTED_MODULE_6___default()(this.selectorStatus);
        let prevStatusHtml = $status.html();
        let doneCount = jquery__WEBPACK_IMPORTED_MODULE_6___default()(this.selectorUrlsDone).length;
        let totalCount = jquery__WEBPACK_IMPORTED_MODULE_6___default()(this.selectorUrls).length;
        let status = '<span class="counts">' + doneCount + '/' + totalCount + '</span>';
        // Get the URLs being crawled
        let $urlsBeingCrawled = jquery__WEBPACK_IMPORTED_MODULE_6___default()(this.selectorUrlsBeingCrawled);
        // Add data of the URLs that are being crawled to the status
        if ($urlsBeingCrawled.length) {
            status += ' ' + window.kdn.currently_crawling + ': ';
            let urlDataBeingCrawled;
            $urlsBeingCrawled.each((i, el) => {
                urlDataBeingCrawled = jquery__WEBPACK_IMPORTED_MODULE_6___default()(el).data("urlData") || null;
                if (urlDataBeingCrawled === null)
                    return;
                // Add the URL that is currently being crawled
                status += jquery__WEBPACK_IMPORTED_MODULE_6___default()('<a/>')
                    .attr('href', urlDataBeingCrawled.url)
                    .attr('target', '_blank')
                    .addClass('post-url')
                    .append(urlDataBeingCrawled.url)
                    .attr("style", "display: block;")[0].outerHTML;
            });
        }
        // Add currently-being-processed category URL
        if (this.beingProcessedCategoryUrlData !== null) {
            let $a = jquery__WEBPACK_IMPORTED_MODULE_6___default()('<a/>')
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
    getContinueButton() {
        return jquery__WEBPACK_IMPORTED_MODULE_6___default()(this.selectorButtonContinue).first();
    }
    /**
     * Get the pause button element
     */
    getPauseButton() {
        return jquery__WEBPACK_IMPORTED_MODULE_6___default()(this.selectorButtonPause).first();
    }
    /**
     * Get the test result container of the manual crawling tool
     */
    getTestResultContainer() {
        return jquery__WEBPACK_IMPORTED_MODULE_6___default()(this.selectorToolContainerManualCrawl).find('.test-results').first();
    }
    /**
     * Shows the given result in the test results container
     * @param html
     */
    showTestResult(html) {
        this.getTestResultContainer()
            .removeClass('loading')
            .removeClass('hidden')
            .find('.content').html(html);
    }
    /**
     * Pauses crawling
     */
    pauseCrawling() {
        this.isPaused = true;
        this.getContinueButton().removeClass('hidden');
        this.getPauseButton().addClass('hidden');
    }
    /**
     * Continues crawling
     */
    continueCrawling() {
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
    getMaxPostsToBeCrawled() {
        let $input = jquery__WEBPACK_IMPORTED_MODULE_6___default()(this.selectorInputMaxPostsToBeCrawled) || null;
        if ($input === null)
            return 0;
        let val = $input.val() || 0;
        if (val === 0)
            return val;
        val = parseInt(val.toString());
        return val < 0 ? 0 : val;
    }
    /**
     * Get maximum parallel crawling count from its input
     * @return number A number greater than or equal to 1
     */
    getMaxParallelCrawlingCount() {
        let $input = jquery__WEBPACK_IMPORTED_MODULE_6___default()(this.selectorInputMaxParallelCrawlingCount) || null;
        if ($input === null)
            return 1;
        let val = $input.val() || 1;
        if (val === 1)
            return val;
        val = parseInt(val.toString());
        return val < 1 ? 1 : val;
    }
    /**
     * Shows all responses of the URL rows
     */
    showAllResponses() {
        // Show the responses
        jquery__WEBPACK_IMPORTED_MODULE_6___default()(this.selectorUrlResponses).removeClass('hidden');
        // Make the URLs that have responses open
        jquery__WEBPACK_IMPORTED_MODULE_6___default()(this.selectorUrls + '.' + this.classHasResponse).addClass(this.classOpen);
    }
    /**
     * Hides all responses of the URL rows
     */
    hideAllResponses() {
        // Hide the responses
        jquery__WEBPACK_IMPORTED_MODULE_6___default()(this.selectorUrlResponses).addClass('hidden');
        // Make the URLs that have responses not open
        jquery__WEBPACK_IMPORTED_MODULE_6___default()(this.selectorUrls + '.' + this.classHasResponse).removeClass(this.classOpen);
    }
}
MultiCrawlingTool.INSTANCE = null;


/***/ }),

/***/ "./scripts/tools-ts/app/url-data/BaseUrlData.ts":
/*!******************************************************!*\
  !*** ./scripts/tools-ts/app/url-data/BaseUrlData.ts ***!
  \******************************************************/
/*! exports provided: BaseUrlData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseUrlData", function() { return BaseUrlData; });
class BaseUrlData {
    /**
     * @param siteName
     * @param siteId
     * @param url
     * @param categoryName
     * @param categoryId
     */
    constructor(siteName, siteId, url, categoryName, categoryId) {
        this._siteName = (siteName || '').trim();
        this._siteId = siteId;
        this._url = (url || '').trim();
        this._categoryId = categoryId;
        this._categoryName = (categoryName || '').trim();
    }
    get siteName() {
        return this._siteName;
    }
    get siteId() {
        return this._siteId;
    }
    get url() {
        return this._url;
    }
    get categoryId() {
        return this._categoryId;
    }
    get categoryName() {
        return this._categoryName;
    }
    get response() {
        return this._response;
    }
    set response(value) {
        this._response = value;
    }
}


/***/ }),

/***/ "./scripts/tools-ts/app/url-data/CategoryUrlData.ts":
/*!**********************************************************!*\
  !*** ./scripts/tools-ts/app/url-data/CategoryUrlData.ts ***!
  \**********************************************************/
/*! exports provided: CategoryUrlData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryUrlData", function() { return CategoryUrlData; });
/* harmony import */ var _BaseUrlData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseUrlData */ "./scripts/tools-ts/app/url-data/BaseUrlData.ts");

class CategoryUrlData extends _BaseUrlData__WEBPACK_IMPORTED_MODULE_0__["BaseUrlData"] {
}


/***/ }),

/***/ "./scripts/tools-ts/app/url-data/PostUrlData.ts":
/*!******************************************************!*\
  !*** ./scripts/tools-ts/app/url-data/PostUrlData.ts ***!
  \******************************************************/
/*! exports provided: PostUrlData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostUrlData", function() { return PostUrlData; });
/* harmony import */ var _BaseUrlData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseUrlData */ "./scripts/tools-ts/app/url-data/BaseUrlData.ts");

class PostUrlData extends _BaseUrlData__WEBPACK_IMPORTED_MODULE_0__["BaseUrlData"] {
    /**
     * @param siteName
     * @param siteId
     * @param url
     * @param categoryName
     * @param categoryId
     * @param imageUrl
     */
    constructor(siteName, siteId, url, categoryName, categoryId, imageUrl) {
        super(siteName, siteId, url, categoryName, categoryId);
        this._imageUrl = imageUrl || '';
    }
    get imageUrl() {
        return this._imageUrl;
    }
    get postId() {
        return this._postId;
    }
    set postId(value) {
        this._postId = value;
    }
    get postUrl() {
        return this._postUrl;
    }
    set postUrl(value) {
        this._postUrl = value;
    }
}


/***/ }),

/***/ "./scripts/tools-ts/tools.ts":
/*!***********************************!*\
  !*** ./scripts/tools-ts/tools.ts ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(jQuery) {/* harmony import */ var _app_Tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/Tools */ "./scripts/tools-ts/app/Tools.ts");

// Initialize when document is ready
jQuery(function ($) {
    // Initialize the tools
    new _app_Tools__WEBPACK_IMPORTED_MODULE_0__["Tools"]();
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9jb21tb24tdHMvSW5wdXRHcm91cEFkZGVyLnRzIiwid2VicGFjazovLy8uL3NjcmlwdHMvY29tbW9uLXRzL05vdGlmaWVyLnRzIiwid2VicGFjazovLy8uL3NjcmlwdHMvY29tbW9uLXRzL09iamVjdFNlcmlhbGl6ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9jb21tb24tdHMvVXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9jb21tb24tdHMvZW51bS9Ob3RpZmljYXRpb25Qb3NpdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2NvbW1vbi10cy9lbnVtL05vdGlmaWNhdGlvblR5cGUudHMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy90b29scy10cy9hcHAvVG9vbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy90b29scy10cy9hcHAvVG9vbHNWYXJpYWJsZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy90b29scy10cy9hcHAvbXVsdGlwbGUtY3Jhd2xpbmctdG9vbC9DcmF3bGluZ1R5cGUudHMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy90b29scy10cy9hcHAvbXVsdGlwbGUtY3Jhd2xpbmctdG9vbC9NdWx0aUNyYXdsaW5nVG9vbC50cyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL3Rvb2xzLXRzL2FwcC91cmwtZGF0YS9CYXNlVXJsRGF0YS50cyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL3Rvb2xzLXRzL2FwcC91cmwtZGF0YS9DYXRlZ29yeVVybERhdGEudHMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy90b29scy10cy9hcHAvdXJsLWRhdGEvUG9zdFVybERhdGEudHMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy90b29scy10cy90b29scy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqUXVlcnlcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdz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O0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSw2Q0FBQztBQUNUO0FBQ0EsUUFBUSw2Q0FBQztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNkNBQUM7QUFDVDtBQUNBLFFBQVEsNkNBQUM7QUFDVDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMxeEJBO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3BDQTtBQUFBO0FBQUE7QUFBNEM7QUFDckMsOEJBQThCLHdEQUFXO0FBQ2hEOzs7Ozs7Ozs7Ozs7O0FDRkE7QUFBQTtBQUFBO0FBQTRDO0FBQ3JDLDBCQUEwQix3REFBVztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzdCQTtBQUFBO0FBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLFFBQVEsZ0RBQUs7QUFDYixDQUFDOzs7Ozs7Ozs7Ozs7O0FDTEQsd0IiLCJmaWxlIjoiLi90b29scy1kZXYuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NjcmlwdHMvdG9vbHMtdHMvdG9vbHMudHNcIik7XG4iLCJleHBvcnQgY2xhc3MgSW5wdXRHcm91cEFkZGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuSU5TVEFOQ0UgPT09IG51bGwpXG4gICAgICAgICAgICB0aGlzLklOU1RBTkNFID0gbmV3IElucHV0R3JvdXBBZGRlcigpO1xuICAgICAgICByZXR1cm4gdGhpcy5JTlNUQU5DRTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIG5ldyBpbnB1dCBncm91cCB0byBhbiBpbnB1dCBncm91cCBjb250YWluZXJcbiAgICAgKiBAcGFyYW0gJGlucHV0R3JvdXBDb250YWluZXJcbiAgICAgKiBAcmV0dXJuIE5ldyBpbnB1dCBncm91cFxuICAgICAqL1xuICAgIGFkZE5ld0lucHV0R3JvdXAoJGlucHV0R3JvdXBDb250YWluZXIpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgY2xvbmUgb2YgdGhlIGlucHV0IGdyb3VwXG4gICAgICAgIGxldCAkaW5wdXRHcm91cCA9ICRpbnB1dEdyb3VwQ29udGFpbmVyLmZpbmQoXCIuaW5wdXQtZ3JvdXBcIikuZmlyc3QoKS5jbG9uZSgpO1xuICAgICAgICAvKlxuICAgICAgICAgSEFORExFIFRIRSBEQVRBIEtFWVxuICAgICAgICAgKi9cbiAgICAgICAgLy8gRmlyc3QsIGZpbmQgbWF4IGRhdGEga2V5XG4gICAgICAgIGxldCBtYXhEYXRhS2V5ID0gMDtcbiAgICAgICAgJGlucHV0R3JvdXBDb250YWluZXIuZmluZCgnLmlucHV0LWdyb3VwJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgJHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICAgICAgaWYgKCRzZWxmLmRhdGEoXCJrZXlcIikgIT0gdW5kZWZpbmVkICYmICRzZWxmLmRhdGEoXCJrZXlcIikgPiBtYXhEYXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgbWF4RGF0YUtleSA9ICRzZWxmLmRhdGEoXCJrZXlcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBIb2xkIGN1cnJlbnQgZGF0YSBrZXlcbiAgICAgICAgbGV0IGN1cnJlbnREYXRhS2V5ID0gJGlucHV0R3JvdXAuZGF0YShcImtleVwiKTtcbiAgICAgICAgbGV0IG5ld0RhdGFLZXkgPSBtYXhEYXRhS2V5ICsgMTtcbiAgICAgICAgLy8gU2V0IHRoZSBuZXcgZGF0YSBrZXlcbiAgICAgICAgJGlucHV0R3JvdXAuYXR0cihcImRhdGEta2V5XCIsIG5ld0RhdGFLZXkpOyAvLyBUaGlzIHdpbGwgdXBkYXRlIHRoZSBIVE1MLlxuICAgICAgICAkaW5wdXRHcm91cC5kYXRhKFwia2V5XCIsIG5ld0RhdGFLZXkpOyAvLyBUaGlzIG1ha2VzIHRoZSBhY3R1YWwgY2hhbmdlLlxuICAgICAgICBsZXQgaHRtbCA9ICRpbnB1dEdyb3VwLmh0bWwoKTtcbiAgICAgICAgJGlucHV0R3JvdXAuaHRtbChodG1sLnJlcGxhY2UobmV3IFJlZ0V4cChcIlxcXFxbXCIgKyBjdXJyZW50RGF0YUtleSArIFwiXFxcXF1cIiwgXCJnXCIpLCBcIltcIiArIG5ld0RhdGFLZXkgKyBcIl1cIikpO1xuICAgICAgICAvKiBFTkQgREFUQSBLRVkgKi9cbiAgICAgICAgLy8gUmVtb3ZlIHRoZSB2YWx1ZXMgb2YgdGhlIGlucHV0c1xuICAgICAgICAkaW5wdXRHcm91cC5maW5kKFwiaW5wdXRcIikuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpLnZhbChcIlwiKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRpbnB1dEdyb3VwLmZpbmQoXCJ0ZXh0YXJlYVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcykuaHRtbChcIlwiKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRpbnB1dEdyb3VwLmZpbmQoXCJpbnB1dFt0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIENhbGwgdGhlIG1vZGlmaWVyc1xuICAgICAgICBmb3IgKGxldCBtb2RpZmllciBvZiBJbnB1dEdyb3VwQWRkZXIubW9kaWZpZXJzKSB7XG4gICAgICAgICAgICBtb2RpZmllcigkaW5wdXRHcm91cCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQXBwZW5kIGl0IHRvIHRoZSBjb250YWluZXJcbiAgICAgICAgJGlucHV0R3JvdXBDb250YWluZXIuYXBwZW5kKCRpbnB1dEdyb3VwKTtcbiAgICAgICAgLy8gQ2hlY2sgZm9yIHRvb2x0aXAgYW5kIGluaXRpYWxpemUgaXRcbiAgICAgICAgaWYgKHR5cGVvZiAkLmZuLnRvb2x0aXAgPT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICAkaW5wdXRHcm91cC5maW5kKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCgpO1xuICAgICAgICAvLyBDaGVjayBpZiB0aGVyZSBpcyBhbiBvcHRpb25zIGJveCBidXR0b24gYW5kIHJldmVydCBpdCB0byBpdHMgZGVmYXVsdFxuICAgICAgICAkaW5wdXRHcm91cC5maW5kKCcud2NjLW9wdGlvbnMtYm94JykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgJHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICAgICAgJHNlbGYucmVtb3ZlQ2xhc3MoJ2hhcy1jb25maWcnKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgJC5mbi50b29sdGlwID09PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgICAgICRzZWxmLnRvb2x0aXAoJ2Rlc3Ryb3knKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiAkaW5wdXRHcm91cDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgYW4gaW5wdXQgZ3JvdXAgbW9kaWZpZXIgdGhhdCB3aWxsIGJlIGNhbGxlZCBqdXN0IGJlZm9yZSBhIG5ldyBpbnB1dCBncm91cCBpcyBhZGRlZC5cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICByZWdpc3Rlck1vZGlmaWVyKGNhbGxiYWNrKSB7XG4gICAgICAgIElucHV0R3JvdXBBZGRlci5tb2RpZmllcnMucHVzaChjYWxsYmFjayk7XG4gICAgfVxufVxuSW5wdXRHcm91cEFkZGVyLklOU1RBTkNFID0gbnVsbDtcbklucHV0R3JvdXBBZGRlci5tb2RpZmllcnMgPSBbXTtcbiIsImltcG9ydCB7IE5vdGlmaWNhdGlvblR5cGUgfSBmcm9tIFwiLi9lbnVtL05vdGlmaWNhdGlvblR5cGVcIjtcbmltcG9ydCB7IE5vdGlmaWNhdGlvblBvc2l0aW9uIH0gZnJvbSBcIi4vZW51bS9Ob3RpZmljYXRpb25Qb3NpdGlvblwiO1xuZXhwb3J0IGNsYXNzIE5vdGlmaWVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuSU5TVEFOQ0UgPT09IG51bGwpXG4gICAgICAgICAgICB0aGlzLklOU1RBTkNFID0gbmV3IE5vdGlmaWVyKCk7XG4gICAgICAgIHJldHVybiB0aGlzLklOU1RBTkNFO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaG93cyBcInJlcXVpcmVkIGZvciB0ZXN0XCIgbm90aWZpY2F0aW9uIGJ5IGRlZmF1bHQuIElmIHlvdSBzdXBwbHkgYW5vdGhlciBtZXNzYWdlLCBzaG93cyBpdCBpbnN0ZWFkLlxuICAgICAqXG4gICAgICogQHBhcmFtICR0YXJnZXRFbFxuICAgICAqIEBwYXJhbSBub3RpZmljYXRpb25NZXNzYWdlIElmIGRlZmluZWQsIHRoaXMgbWVzc2FnZSB3aWxsIGJlIHNob3duLiBPdGhlcndpc2UsIGEgZGVmYXVsdCBtZXNzYWdlIHdpbGwgYmUgc2hvd24uXG4gICAgICovXG4gICAgbm90aWZ5KCR0YXJnZXRFbCwgbm90aWZpY2F0aW9uTWVzc2FnZSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNOb3RpZnlBdmFpbGFibGUoKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKG5vdGlmaWNhdGlvbk1lc3NhZ2UgPT0gdW5kZWZpbmVkIHx8ICFub3RpZmljYXRpb25NZXNzYWdlLmxlbmd0aClcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvbk1lc3NhZ2UgPSB3aW5kb3cud3BjYy5yZXF1aXJlZF9mb3JfdGVzdDtcbiAgICAgICAgLy8gRmluZCB0aGUgY2xvc2VzdCBsYWJlbFxuICAgICAgICBsZXQgJGxhYmVsID0gJHRhcmdldEVsLmNsb3Nlc3QoXCJ0clwiKS5maW5kKFwibGFiZWxcIikuZmlyc3QoKSwgJG5vdGlmaWNhdGlvbkVsID0gJGxhYmVsLmxlbmd0aCA/ICRsYWJlbCA6ICR0YXJnZXRFbDtcbiAgICAgICAgdGhpcy5zY3JvbGxUb0VsZW1lbnQoJG5vdGlmaWNhdGlvbkVsKTtcbiAgICAgICAgJG5vdGlmaWNhdGlvbkVsLm5vdGlmeShub3RpZmljYXRpb25NZXNzYWdlLCB7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ3RvcCdcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNob3cgYSBub3RpZmljYXRpb24gbWVzc2FnZSBmb3IgYW4gZWxlbWVudFxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9ICR0YXJnZXRFbGVtZW50XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBDbGFzcyBuYW1lIGZvciB0aGUgbm90aWZpY2F0aW9uIGVsZW1lbnQuIERlZmF1bHQ6ICdpbmZvJ1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwb3NpdGlvbiAndG9wJywgJ2xlZnQnLCAnYm90dG9tIGxlZnQnLCAncmlnaHQgdG9wJywgLi4uIERlZmF1bHQ6ICd0b3AnXG4gICAgICovXG4gICAgbm90aWZ5UmVndWxhcigkdGFyZ2V0RWxlbWVudCwgbWVzc2FnZSwgdHlwZSA9IE5vdGlmaWNhdGlvblR5cGUuSU5GTywgcG9zaXRpb24gPSBOb3RpZmljYXRpb25Qb3NpdGlvbi5UT1ApIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzTm90aWZ5QXZhaWxhYmxlKCkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICR0YXJnZXRFbGVtZW50Lm5vdGlmeShtZXNzYWdlLCB7XG4gICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24gfHwgJ3RvcCcsXG4gICAgICAgICAgICBjbGFzc05hbWU6IHR5cGUgfHwgJ2luZm8nLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2Nyb2xscyB0byBhbiBlbGVtZW50XG4gICAgICogQHBhcmFtICRlbFxuICAgICAqL1xuICAgIHNjcm9sbFRvRWxlbWVudCgkZWwpIHtcbiAgICAgICAgJChkb2N1bWVudCkuZmluZCgnaHRtbCwgYm9keScpLnN0b3AoKS5hbmltYXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogJGVsLmZpcnN0KCkub2Zmc2V0KCkudG9wIC0gJCh3aW5kb3cpLmhlaWdodCgpIC8gNFxuICAgICAgICB9LCA1MDAsICdzd2luZycpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgbm90aWZpY2F0aW9uIGxpYnJhcnkgaXMgYXZhaWxhYmxlXG4gICAgICogQHBhcmFtIHtib29sZWFufSBzaG93RXJyb3IgVHJ1ZSBpZiBhbiBlcnJvciBtZXNzYWdlIHNob3VsZCBiZSB3cml0dGVuIGluIEpTIGNvbnNvbGUgd2hlbiBpdCBpcyBub3QgYXZhaWxhYmxlLlxuICAgICAqL1xuICAgIGlzTm90aWZ5QXZhaWxhYmxlKHNob3dFcnJvciA9IHRydWUpIHtcbiAgICAgICAgbGV0IGlzQXZhaWxhYmxlID0gISh0eXBlb2YgJC5mbi5ub3RpZnkgIT0gJ2Z1bmN0aW9uJyk7XG4gICAgICAgIGlmICghaXNBdmFpbGFibGUgJiYgc2hvd0Vycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTm90aWZ5SlMgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc0F2YWlsYWJsZTtcbiAgICB9XG59XG5Ob3RpZmllci5JTlNUQU5DRSA9IG51bGw7XG4iLCIvKipcbiAqIFJlZ2lzdGVycyAkLmZuLnNlcmlhbGl6ZU9iamVjdE5vTnVsbCBmdW5jdGlvbi4gU2VlIHtAbGluayByZWdpc3RlckZ1bmN0aW9ufS5cbiAqL1xuZXhwb3J0IGNsYXNzIE9iamVjdFNlcmlhbGl6ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRnVuY3Rpb24oKTtcbiAgICB9XG4gICAgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgICAgICBpZiAodGhpcy5JTlNUQU5DRSA9PT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMuSU5TVEFOQ0UgPSBuZXcgT2JqZWN0U2VyaWFsaXplcigpO1xuICAgICAgICByZXR1cm4gdGhpcy5JTlNUQU5DRTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VyaWFsaXplcyB0aGUgaW5wdXRzIGJ5IHVzaW5nIFwiZm9ybS1zZXJpYWxpemVyXCIgbm9kZSBtb2R1bGUsIGFuZCByZW1vdmVzIG51bGwgdmFsdWVzIGZyb20gdGhlIGFycmF5LXZhbHVlZCBpbnB1dHMuXG4gICAgICogRS5nLiBpZiB0aGUgYXJyYXktdmFsdWVkIGlucHV0cyBzdGFydCBmcm9tIGluZGV4IDQsIHNlcmlhbGl6ZU9iamVjdCBmdW5jdGlvbiByZXR1cm5zIFtudWxsLCBudWxsLCBudWxsLCBvYmplY3RdLlxuICAgICAqIFRoaXMgZnVuY3Rpb24gcmVtb3ZlcyB0aGUgbnVsbCB2YWx1ZXMuXG4gICAgICovXG4gICAgcmVnaXN0ZXJGdW5jdGlvbigpIHtcbiAgICAgICAgJC5mbi5zZXJpYWxpemVPYmplY3ROb051bGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gJC5mbi5zZXJpYWxpemVPYmplY3QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQuaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyBub3QgYW4gYXJyYXksIG5vIG5lZWQgdG8gY2hlY2sgaXQgZm9yIG51bGwgdmFsdWVzLlxuICAgICAgICAgICAgICAgIGlmICghKHJlc3VsdFtrZXldIGluc3RhbmNlb2YgQXJyYXkpKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHJlc3VsdFtrZXldLmZpbHRlcihmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsICE9PSBudWxsO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICB9XG59XG5PYmplY3RTZXJpYWxpemVyLklOU1RBTkNFID0gbnVsbDtcbiIsImV4cG9ydCBjbGFzcyBVdGlscyB7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGEgc3RyaW5nIChoYXlzdGFjaykgc3RhcnRzIHdpdGggc29tZXRoaW5nIChuZWVkbGUpXG4gICAgICogQHBhcmFtIGhheXN0YWNrXG4gICAgICogQHBhcmFtIG5lZWRsZVxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG4gICAgc3RhdGljIHN0YXJ0c1dpdGgoaGF5c3RhY2ssIG5lZWRsZSkge1xuICAgICAgICByZXR1cm4gaGF5c3RhY2subGFzdEluZGV4T2YobmVlZGxlLCAwKSA9PT0gMDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRXNjYXBlcyBIVE1MLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1bnNhZmVcbiAgICAgKiBAc2VlIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS82MjM0ODA0LzI4ODM0ODdcbiAgICAgKi9cbiAgICBzdGF0aWMgZXNjYXBlSHRtbCh1bnNhZmUpIHtcbiAgICAgICAgaWYgKHVuc2FmZSA9PT0gdW5kZWZpbmVkIHx8IHVuc2FmZSA9PT0gJ3VuZGVmaW5lZCcgfHwgdW5zYWZlID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICByZXR1cm4gdW5zYWZlXG4gICAgICAgICAgICAucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpXG4gICAgICAgICAgICAucmVwbGFjZSgvPC9nLCBcIiZsdDtcIilcbiAgICAgICAgICAgIC5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpXG4gICAgICAgICAgICAucmVwbGFjZSgvJy9nLCBcIiYjMDM5O1wiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvd3MgdGhlIHNwZWNpZmllZCB0aXRsZSBhcyB0aGUgZWxlbWVudCdzIHRvb2x0aXAsIGFuZCB0aGVuIGNoYW5nZXMgdGhlIHRvb2x0aXAgdG8gaXRzIG9yaWdpbmFsIHZhbHVlLlxuICAgICAqIEhlbmNlLCB0aGUgdXNlciB3aWxsIHNlZSB0aGUgb3JpZ2luYWwgdGl0bGUgd2hlbiB0aGUgdG9vbHRpcCBpcyBzaG93biBuZXh0IHRpbWUuXG4gICAgICogQHBhcmFtICRlbGVtZW50XG4gICAgICogQHBhcmFtIGZsYXNoVGl0bGVcbiAgICAgKi9cbiAgICBzdGF0aWMgZmxhc2hUb29sdGlwKCRlbGVtZW50LCBmbGFzaFRpdGxlKSB7XG4gICAgICAgIGxldCBvcmlnaW5hbFRpdGxlID0gJGVsZW1lbnQuYXR0cihcImRhdGEtb3JpZ2luYWwtdGl0bGVcIik7XG4gICAgICAgICRlbGVtZW50XG4gICAgICAgICAgICAuYXR0cignZGF0YS1vcmlnaW5hbC10aXRsZScsIGZsYXNoVGl0bGUpXG4gICAgICAgICAgICAudG9vbHRpcCgnZml4VGl0bGUnKVxuICAgICAgICAgICAgLnRvb2x0aXAoJ3Nob3cnKVxuICAgICAgICAgICAgLy8gU2V0IHRoZSBvcmlnaW5hbCB0aXRsZSBidXQgZG8gbm90IHNob3cgaXQuIFRoZSB1c2VyIHdpbGwgc2VlIHRoZSBvcmlnaW5hbCB0aXRsZSBhdCBuZXh0IGhvdmVyXG4gICAgICAgICAgICAuYXR0cignZGF0YS1vcmlnaW5hbC10aXRsZScsIG9yaWdpbmFsVGl0bGUpXG4gICAgICAgICAgICAudG9vbHRpcCgnZml4VGl0bGUnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0b29sdGlwIGVsZW1lbnRzIGZvciBhIHNlbGVjdG9yLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciBTZWxlY3RvciBvZiB0aGUgZWxlbWVudCB0aGF0IGhhcyAnZGF0YS10b2dnbGU9XCJ0b29sdGlwXCInIGF0dHJpYnV0ZVxuICAgICAqL1xuICAgIHN0YXRpYyBpbml0VG9vbHRpcEZvclNlbGVjdG9yKHNlbGVjdG9yKSB7XG4gICAgICAgIGlmICh0eXBlb2YgJC5mbi50b29sdGlwID09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICAkKHNlbGVjdG9yICsgJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdmFsdWUgb2YgYSBjaGVja2JveC5cbiAgICAgKiBAcGFyYW0ge0pRdWVyeXxudWxsfHVuZGVmaW5lZH0gJGNoZWNrYm94RWxlbWVudFxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRDaGVja2JveFZhbHVlKCRjaGVja2JveEVsZW1lbnQpIHtcbiAgICAgICAgJGNoZWNrYm94RWxlbWVudCA9ICRjaGVja2JveEVsZW1lbnQgfHwgbnVsbDtcbiAgICAgICAgaWYgKCRjaGVja2JveEVsZW1lbnQgPT09IG51bGwgfHwgISRjaGVja2JveEVsZW1lbnQubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gISEkY2hlY2tib3hFbGVtZW50WzBdLmNoZWNrZWQ7XG4gICAgfVxufVxuIiwiZXhwb3J0IHZhciBOb3RpZmljYXRpb25Qb3NpdGlvbjtcbihmdW5jdGlvbiAoTm90aWZpY2F0aW9uUG9zaXRpb24pIHtcbiAgICBOb3RpZmljYXRpb25Qb3NpdGlvbltcIlRPUFwiXSA9IFwidG9wXCI7XG4gICAgTm90aWZpY2F0aW9uUG9zaXRpb25bXCJSSUdIVFwiXSA9IFwicmlnaHRcIjtcbiAgICBOb3RpZmljYXRpb25Qb3NpdGlvbltcIkJPVFRPTVwiXSA9IFwiYm90dG9tXCI7XG4gICAgTm90aWZpY2F0aW9uUG9zaXRpb25bXCJMRUZUXCJdID0gXCJsZWZ0XCI7XG59KShOb3RpZmljYXRpb25Qb3NpdGlvbiB8fCAoTm90aWZpY2F0aW9uUG9zaXRpb24gPSB7fSkpO1xuIiwiZXhwb3J0IHZhciBOb3RpZmljYXRpb25UeXBlO1xuKGZ1bmN0aW9uIChOb3RpZmljYXRpb25UeXBlKSB7XG4gICAgTm90aWZpY2F0aW9uVHlwZVtcIldBUk5cIl0gPSBcIndhcm5cIjtcbiAgICBOb3RpZmljYXRpb25UeXBlW1wiSU5GT1wiXSA9IFwiaW5mb1wiO1xuICAgIE5vdGlmaWNhdGlvblR5cGVbXCJFUlJPUlwiXSA9IFwiZXJyb3JcIjtcbiAgICBOb3RpZmljYXRpb25UeXBlW1wiU1VDQ0VTU1wiXSA9IFwic3VjY2Vzc1wiO1xufSkoTm90aWZpY2F0aW9uVHlwZSB8fCAoTm90aWZpY2F0aW9uVHlwZSA9IHt9KSk7XG4iLCJpbXBvcnQgeyBNdWx0aUNyYXdsaW5nVG9vbCB9IGZyb20gXCIuL211bHRpcGxlLWNyYXdsaW5nLXRvb2wvTXVsdGlDcmF3bGluZ1Rvb2xcIjtcbmltcG9ydCB7IFRvb2xzVmFyaWFibGVzIH0gZnJvbSBcIi4vVG9vbHNWYXJpYWJsZXNcIjtcbmltcG9ydCB7IElucHV0R3JvdXBBZGRlciB9IGZyb20gXCIuLi8uLi9jb21tb24tdHMvSW5wdXRHcm91cEFkZGVyXCI7XG5pbXBvcnQgeyBPYmplY3RTZXJpYWxpemVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi10cy9PYmplY3RTZXJpYWxpemVyXCI7XG5leHBvcnQgY2xhc3MgVG9vbHMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnByb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50diA9IFRvb2xzVmFyaWFibGVzLmdldEluc3RhbmNlKCk7XG4gICAgICAgIHRoaXMuaW5wdXRHcm91cEFkZGVyID0gSW5wdXRHcm91cEFkZGVyLmdldEluc3RhbmNlKCk7XG4gICAgICAgIC8vIEluaXRpYWxpemUgb2JqZWN0IHNlcmlhbGl6ZXJcbiAgICAgICAgT2JqZWN0U2VyaWFsaXplci5nZXRJbnN0YW5jZSgpO1xuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBtdWx0aXBsZSBjcmF3bGluZyB0b29sXG4gICAgICAgIE11bHRpQ3Jhd2xpbmdUb29sLmdldEluc3RhbmNlKCk7XG4gICAgICAgIC8vIEhhbmRsZSBmb3JtIHN1Ym1pc3Npb25zXG4gICAgICAgICQoJy50b29sLWZvcm0nKS5vbignc3VibWl0JywgZSA9PiB0aGlzLmhhbmRsZUZvcm1TdWJtaXNzaW9uKGUpKTtcbiAgICAgICAgLy8gSGlkZSB0b29sIHJlc3VsdHNcbiAgICAgICAgJCgnLmRldGFpbHMnKS5vbignY2xpY2snLCAnLmhpZGUtdGVzdC1yZXN1bHRzJywgZSA9PiB0aGlzLmhpZGVUZXN0UmVzdWx0cyhlKSk7XG4gICAgICAgIC8vIEhhbmRsZSB0b2dnbGluZyBpbmZvIHRleHRzXG4gICAgICAgICQoJy50b2dnbGUtaW5mby10ZXh0cycpLm9uKCdjbGljaycsIGUgPT4gdGhpcy50b2dnbGVJbmZvQnV0dG9ucyhlKSk7XG4gICAgICAgIC8vIEhhbmRsZSB0YWJzXG4gICAgICAgICQodGhpcy50di5zZWxlY3RvclRhYk5hdmlnYXRpb24pLm9uKCdjbGljaycsICdhJywgZSA9PiB0aGlzLmFjdGl2YXRlVGFiKGUpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWN0aXZhdGVzIGEgdGFiXG4gICAgICogQHBhcmFtIGVcbiAgICAgKi9cbiAgICBhY3RpdmF0ZVRhYihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0ICRzZWxmID0gJChlLnRhcmdldCk7XG4gICAgICAgIGxldCB0YXJnZXRUYWJTZWxlY3RvciA9ICRzZWxmLmRhdGEoXCJ0YWJcIik7XG4gICAgICAgIC8vIERlYWN0aXZhdGUgYWxsIHRhYnNcbiAgICAgICAgJCh0aGlzLnR2LnNlbGVjdG9yVGFicykuYWRkQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICAgICQodGhpcy50di5zZWxlY3RvclRhYk5hdmlnYXRpb24pLmZpbmQoJz4gYScpLnJlbW92ZUNsYXNzKCduYXYtdGFiLWFjdGl2ZScpO1xuICAgICAgICAvLyBBY3RpdmF0ZSB0aGUgcmVxdWVzdGVkIHRhYlxuICAgICAgICAkc2VsZi5hZGRDbGFzcyhcIm5hdi10YWItYWN0aXZlXCIpO1xuICAgICAgICAkKHRhcmdldFRhYlNlbGVjdG9yKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhpZGVzIHRlc3QgcmVzdWx0c1xuICAgICAqIEBwYXJhbSBlXG4gICAgICovXG4gICAgaGlkZVRlc3RSZXN1bHRzKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAvLyBGaW5kIGNsb3Nlc3QgdG9vbCByZXN1bHRzXG4gICAgICAgIGxldCAkc2VsZiA9ICQoZS50YXJnZXQpO1xuICAgICAgICAvLyBIaWRlIGl0XG4gICAgICAgICRzZWxmLmNsb3Nlc3QoXCIudGVzdC1yZXN1bHRzXCIpLmFkZENsYXNzKFwiaGlkZGVuXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIGluZm8gdGV4dHNcbiAgICAgKiBAcGFyYW0gZVxuICAgICAqL1xuICAgIHRvZ2dsZUluZm9CdXR0b25zKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgJHNlbGYgPSAkKGUudGFyZ2V0KTtcbiAgICAgICAgLy8gRmluZCBjbG9zZXN0IGluZm8gdGV4dHMgYW5kIHNob3cvaGlkZSB0aGVtLlxuICAgICAgICBsZXQgZmlyc3QgPSBmYWxzZTtcbiAgICAgICAgbGV0IHNob3cgPSBmYWxzZTtcbiAgICAgICAgJHNlbGYuY2xvc2VzdCgnLmRldGFpbHMnKS5maW5kKCcuaW5mby10ZXh0JykuZWFjaCgoaSwgZWwpID0+IHtcbiAgICAgICAgICAgIGxldCAkc2VsZiA9ICQoZWwpO1xuICAgICAgICAgICAgLy8gR2V0IHRoZSBmaXJzdCBpbmZvIHRleHQncyB2aXNpYmlsaXR5LiBJZiBpdCBpcyB2aXNpYmxlLCB0aGVuIHdlJ3JlIGdvbm5hIGhpZGUgYWxsIG9mIHRoZSBpbmZvcy4gSWYgaXQgaXNcbiAgICAgICAgICAgIC8vIGhpZGRlbiwgd2UnbGwgZG8gb3RoZXJ3aXNlLiBCeSB0aGlzIHdheSwgd2UgY2FuIGtlZXAgdHJhY2sgb2YgaW5mbyB0ZXh0cyBpbiBkaWZmZXJlbnQgZGV0YWlsIGJveGVzLlxuICAgICAgICAgICAgaWYgKCFmaXJzdCkge1xuICAgICAgICAgICAgICAgIHNob3cgPSAkc2VsZi5oYXNDbGFzcyhcImhpZGRlblwiKTtcbiAgICAgICAgICAgICAgICBmaXJzdCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2hvdykge1xuICAgICAgICAgICAgICAgICRzZWxmLnJlbW92ZUNsYXNzKFwiaGlkZGVuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNlbGYuYWRkQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIGZvcm0gc3VibWlzc2lvblxuICAgICAqIEBwYXJhbSBlXG4gICAgICovXG4gICAgaGFuZGxlRm9ybVN1Ym1pc3Npb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICh0aGlzLnByb2Nlc3NpbmcpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMucHJvY2Vzc2luZyA9IHRydWU7XG4gICAgICAgIGxldCAkc2VsZiA9ICQoZS50YXJnZXQpO1xuICAgICAgICBsZXQgJHJlc3VsdENvbnRhaW5lciA9ICRzZWxmLmZpbmQoJy50ZXN0LXJlc3VsdHMnKS5maXJzdCgpO1xuICAgICAgICBsZXQgJGNvbnRlbnRDb250YWluZXIgPSAkcmVzdWx0Q29udGFpbmVyLmZpbmQoXCIuY29udGVudFwiKTtcbiAgICAgICAgJHJlc3VsdENvbnRhaW5lclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoXCJsb2FkaW5nXCIpO1xuICAgICAgICAkY29udGVudENvbnRhaW5lci5odG1sKFwiXCIpO1xuICAgICAgICAkLnBvc3Qod2luZG93LmFqYXh1cmwsIHtcbiAgICAgICAgICAgIHdjY19ub25jZTogJChcIiN3Y2Nfbm9uY2VcIikudmFsKCksXG4gICAgICAgICAgICBhY3Rpb246IHdpbmRvdy5wYWdlQWN0aW9uS2V5LFxuICAgICAgICAgICAgZGF0YTogdGhpcy5nZXRGb3JtRGF0YSgkc2VsZilcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgJGNvbnRlbnRDb250YWluZXIuaHRtbChyZXNwb25zZS52aWV3KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICRjb250ZW50Q29udGFpbmVyLmh0bWwod2luZG93LndwY2Mubm9fcmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgJGNvbnRlbnRDb250YWluZXIuaHRtbCh3aW5kb3cud3BjYy5hbl9lcnJvcl9vY2N1cnJlZCArIFwiOiBcIiArIHJlc3BvbnNlLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuYWx3YXlzKGUgPT4ge1xuICAgICAgICAgICAgJHJlc3VsdENvbnRhaW5lci5yZW1vdmVDbGFzcyhcImxvYWRpbmdcIik7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBmb3JtIGRhdGFcbiAgICAgKiBAcGFyYW0gJGZvcm0gSFRNTCBmb3JtIGVsZW1lbnRcbiAgICAgKi9cbiAgICBnZXRGb3JtRGF0YSgkZm9ybSkge1xuICAgICAgICBsZXQgdW5pbmRleGVkQXJyYXkgPSAkZm9ybS5zZXJpYWxpemVBcnJheSgpO1xuICAgICAgICBsZXQgaW5kZXhlZEFycmF5ID0ge307XG4gICAgICAgICQubWFwKHVuaW5kZXhlZEFycmF5LCAobiwgaSkgPT4ge1xuICAgICAgICAgICAgaW5kZXhlZEFycmF5W25bJ25hbWUnXV0gPSBuWyd2YWx1ZSddO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGluZGV4ZWRBcnJheTtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgVG9vbHNWYXJpYWJsZXMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnNlbGVjdG9yVG9vbHNDb250YWluZXIgPSAnI2NvbnRhaW5lci10b29scyc7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JUYWJOYXZpZ2F0aW9uID0gdGhpcy5zZWxlY3RvclRvb2xzQ29udGFpbmVyICsgJyA+IC5uYXYtdGFiLXdyYXBwZXInO1xuICAgICAgICB0aGlzLnNlbGVjdG9yVGFicyA9IHRoaXMuc2VsZWN0b3JUb29sc0NvbnRhaW5lciArICcgPiAudGFiJztcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhpcyBjbGFzcyBpcyBhIHNpbmdsZXRvbi4gR2V0IHRoZSBpbnN0YW5jZSB3aXRoIHRoaXMgbWV0aG9kLlxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuSU5TVEFOQ0UgPT09IG51bGwpXG4gICAgICAgICAgICB0aGlzLklOU1RBTkNFID0gbmV3IFRvb2xzVmFyaWFibGVzKCk7XG4gICAgICAgIHJldHVybiB0aGlzLklOU1RBTkNFO1xuICAgIH1cbn1cblRvb2xzVmFyaWFibGVzLklOU1RBTkNFID0gbnVsbDtcbiIsImV4cG9ydCB2YXIgQ3Jhd2xpbmdUeXBlO1xuKGZ1bmN0aW9uIChDcmF3bGluZ1R5cGUpIHtcbiAgICBDcmF3bGluZ1R5cGVbQ3Jhd2xpbmdUeXBlW1wiQ1JBV0xfTk9XXCJdID0gMF0gPSBcIkNSQVdMX05PV1wiO1xuICAgIENyYXdsaW5nVHlwZVtDcmF3bGluZ1R5cGVbXCJBRERfVE9fREFUQUJBU0VcIl0gPSAxXSA9IFwiQUREX1RPX0RBVEFCQVNFXCI7XG59KShDcmF3bGluZ1R5cGUgfHwgKENyYXdsaW5nVHlwZSA9IHt9KSk7XG4iLCJpbXBvcnQgeyBDcmF3bGluZ1R5cGUgfSBmcm9tIFwiLi9DcmF3bGluZ1R5cGVcIjtcbmltcG9ydCB7IFBvc3RVcmxEYXRhIH0gZnJvbSBcIi4uL3VybC1kYXRhL1Bvc3RVcmxEYXRhXCI7XG5pbXBvcnQgeyBUb29sc1ZhcmlhYmxlcyB9IGZyb20gXCIuLi9Ub29sc1ZhcmlhYmxlc1wiO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uLXRzL1V0aWxzXCI7XG5pbXBvcnQgeyBDYXRlZ29yeVVybERhdGEgfSBmcm9tIFwiLi4vdXJsLWRhdGEvQ2F0ZWdvcnlVcmxEYXRhXCI7XG5pbXBvcnQgeyBOb3RpZmllciB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24tdHMvTm90aWZpZXJcIjtcbmltcG9ydCAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCB7IE5vdGlmaWNhdGlvblR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uLXRzL2VudW0vTm90aWZpY2F0aW9uVHlwZVwiO1xuZXhwb3J0IGNsYXNzIE11bHRpQ3Jhd2xpbmdUb29sIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RvckNvbnRhaW5lclVybFF1ZXVlID0gJyNjb250YWluZXItdXJsLXF1ZXVlLW1hbnVhbC1jcmF3bCc7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JUYWJsZUNvbnRhaW5lclVybFF1ZXVlID0gdGhpcy5zZWxlY3RvckNvbnRhaW5lclVybFF1ZXVlICsgJyAudGFibGUtY29udGFpbmVyJztcbiAgICAgICAgdGhpcy5zZWxlY3RvclRhYmxlVXJsUXVldWUgPSAnI3RhYmxlLXVybC1xdWV1ZS1tYW51YWwtY3Jhd2wnO1xuICAgICAgICB0aGlzLnNlbGVjdG9yVG9vbENvbnRhaW5lck1hbnVhbENyYXdsID0gJyN0b29sLW1hbnVhbC1jcmF3bCc7XG4gICAgICAgIHRoaXMuY2xhc3NGb3JtID0gXCJ0b29sLW1hbnVhbC1jcmF3bFwiO1xuICAgICAgICB0aGlzLnNlbGVjdG9yRm9ybSA9IFwiLlwiICsgdGhpcy5jbGFzc0Zvcm07XG4gICAgICAgIHRoaXMuY2xhc3NCdXR0b25DcmF3bE5vdyA9ICdjcmF3bC1ub3cnO1xuICAgICAgICB0aGlzLmNsYXNzQnV0dG9uQWRkVG9EYXRhYmFzZSA9ICdhZGQtdG8tZGF0YWJhc2UnO1xuICAgICAgICB0aGlzLnNlbGVjdG9yQnV0dG9uQ3Jhd2xOb3cgPSAnLmJ1dHRvbi4nICsgdGhpcy5jbGFzc0J1dHRvbkNyYXdsTm93O1xuICAgICAgICB0aGlzLnNlbGVjdG9yQnV0dG9uQWRkVG9EYXRhYmFzZSA9ICcuYnV0dG9uLicgKyB0aGlzLmNsYXNzQnV0dG9uQWRkVG9EYXRhYmFzZTtcbiAgICAgICAgdGhpcy5zZWxlY3RvckJ1dHRvbkRlbGV0ZSA9ICcuYnV0dG9uLmRlbGV0ZSc7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JCdXR0b25SZXBlYXQgPSAnLmJ1dHRvbi5yZXBlYXQnO1xuICAgICAgICAvKiogQ2FjaGVzIFVSTCByb3cgcHJvdG90eXBlICovXG4gICAgICAgIHRoaXMuJHVybFJvd1Byb3RvdHlwZSA9IG51bGw7XG4gICAgICAgIC8qKiBDYWNoZXMgcmVzcG9uc2Ugcm93IHByb3RvdHlwZSAqL1xuICAgICAgICB0aGlzLiRyZXNwb25zZVJvd1Byb3RvdHlwZSA9IG51bGw7XG4gICAgICAgIC8qKiBDbGFzcyBvZiByZXNwb25zZSByb3dzIG9mIFVSTCB0YWJsZSAqL1xuICAgICAgICB0aGlzLmNsYXNzUmVzcG9uc2UgPSAncmVzcG9uc2UnO1xuICAgICAgICAvKiogaGFzLXJlc3BvbnNlIGNsYXNzICovXG4gICAgICAgIHRoaXMuY2xhc3NIYXNSZXNwb25zZSA9ICdoYXMtcmVzcG9uc2UnO1xuICAgICAgICAvKiogaGFzLXJlc3BvbnNlIGNsYXNzICovXG4gICAgICAgIHRoaXMuY2xhc3NPcGVuID0gJ29wZW4nO1xuICAgICAgICAvKiogU2VsZWN0b3IgZm9yIHRoZSBjaGVja2JveCB0aGF0IGlzIHVzZWQgdG8gZGVjaWRlIGlmIHRoZSBVUkxzIHNob3VsZCBiZSBjbGVhcmVkIGFmdGVyIGZvcm0gc3VibWlzc29uICovXG4gICAgICAgIHRoaXMuc2VsZWN0b3JDaGVja2JveENsZWFyVXJscyA9ICcjX21hbnVhbF9jcmF3bGluZ190b29sX2NsZWFyX2FmdGVyX3N1Ym1pdCc7XG4gICAgICAgIC8qKiBTdG9yZXMgdGhlIGNhdGVnb3J5IFVSTCBmcm9tIHdoaWNoIHBvc3QgVVJMcyBhcmUgYmVpbmcgcmV0cmlldmVkICovXG4gICAgICAgIHRoaXMuYmVpbmdQcm9jZXNzZWRDYXRlZ29yeVVybERhdGEgPSBudWxsO1xuICAgICAgICAvKiogU3RvcmVzIHRoZSBjYXRlZ29yeSBVUkxzIHRoYXQgc2hvdWxkIGJlIHByb2Nlc3NlZCB0byByZXRyaWV2ZSBwb3N0IFVSTHMgKi9cbiAgICAgICAgdGhpcy5jYXRlZ29yeVVybFF1ZXVlID0gW107XG4gICAgICAgIC8qKiBUcnVlIGlmIHRoZSBjcmF3bGluZyBpcyBwYXVzZWQuIE90aGVyd2lzZSwgZmFsc2UuICovXG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgLyoqIFN0b3JlcyBob3cgbWFueSByZXF1ZXN0cyBhcmUgY3VycmVudGx5IHJ1bm5pbmcuICovXG4gICAgICAgIHRoaXMucnVubmluZ1JlcXVlc3RDb3VudCA9IDA7XG4gICAgICAgIC8qKiBIb3cgbWFueSBwb3N0IGNyYXdsaW5nIHJlcXVlc3RzIGNhbiBiZSBzZW50IGF0IHRoZSBzYW1lIHRpbWUuICovXG4gICAgICAgIHRoaXMubWF4UGFyYWxsZWxDcmF3bGluZyA9IDE7XG4gICAgICAgIHRoaXMuaW5wdXROYW1lU2l0ZUlkID0gJ193cGNjX3Rvb2xzX3NpdGVfaWQnO1xuICAgICAgICB0aGlzLmlucHV0TmFtZUNhdGVnb3J5SWQgPSAnX3dwY2NfdG9vbHNfY2F0ZWdvcnlfaWQnO1xuICAgICAgICB0aGlzLmlucHV0TmFtZUNhdGVnb3J5VXJscyA9ICdfY2F0ZWdvcnlfdXJscyc7XG4gICAgICAgIHRoaXMuaW5wdXROYW1lUG9zdFVybHMgPSAnX3Bvc3RfdXJscyc7XG4gICAgICAgIC8vIEluaXRpYWxpemUgdmFyaWFibGVzXG4gICAgICAgIHRoaXMudHYgPSBUb29sc1ZhcmlhYmxlcy5nZXRJbnN0YW5jZSgpO1xuICAgICAgICAvLyBDcmVhdGUgdGhlIENTUyBzZWxlY3RvciB0aGF0IGZpbmRzIHRoZSBVUkxzIHRvIGJlIGNyYXdsZWRcbiAgICAgICAgdGhpcy5zZWxlY3RvclVybHMgPSB0aGlzLnNlbGVjdG9yVGFibGVVcmxRdWV1ZSArICcgdGJvZHkgPiB0ci51cmw6bm90KC5wcm90b3R5cGUpJztcbiAgICAgICAgdGhpcy5zZWxlY3RvclVybFJlc3BvbnNlcyA9IHRoaXMuc2VsZWN0b3JUYWJsZVVybFF1ZXVlICsgJyB0Ym9keSA+IHRyLnVybDpub3QoLnByb3RvdHlwZSkgKyAuJyArIHRoaXMuY2xhc3NSZXNwb25zZTtcbiAgICAgICAgdGhpcy5zZWxlY3RvclVybHNUb0JlQ3Jhd2xlZCA9IHRoaXMuc2VsZWN0b3JUYWJsZVVybFF1ZXVlICsgJyB0Ym9keSA+IHRyLnVybDpub3QoLnByb3RvdHlwZSk6bm90KC5sb2FkaW5nKTpub3QoLmRvbmUpJztcbiAgICAgICAgdGhpcy5zZWxlY3RvclVybHNEb25lID0gdGhpcy5zZWxlY3RvclRhYmxlVXJsUXVldWUgKyAnIHRib2R5ID4gdHIudXJsLmRvbmU6bm90KC5wcm90b3R5cGUpJztcbiAgICAgICAgdGhpcy5zZWxlY3RvclVybHNCZWluZ0NyYXdsZWQgPSB0aGlzLnNlbGVjdG9yVGFibGVVcmxRdWV1ZSArICcgdGJvZHkgPiB0ci51cmwubG9hZGluZzpub3QoLnByb3RvdHlwZSknO1xuICAgICAgICB0aGlzLnNlbGVjdG9yU3RhdHVzID0gdGhpcy5zZWxlY3RvckNvbnRhaW5lclVybFF1ZXVlICsgJyAjc3RhdHVzJztcbiAgICAgICAgdGhpcy5zZWxlY3RvckJ1dHRvbkNvbnRpbnVlID0gdGhpcy5zZWxlY3RvckNvbnRhaW5lclVybFF1ZXVlICsgJyAuYnV0dG9uLmNvbnRpbnVlJztcbiAgICAgICAgdGhpcy5zZWxlY3RvckJ1dHRvblBhdXNlID0gdGhpcy5zZWxlY3RvckNvbnRhaW5lclVybFF1ZXVlICsgJyAuYnV0dG9uLnBhdXNlJztcbiAgICAgICAgdGhpcy5zZWxlY3RvckNsZWFyQWxsVXJscyA9IHRoaXMuc2VsZWN0b3JUYWJsZVVybFF1ZXVlICsgJyB0aGVhZCB0aC5jb250cm9scyAucmVtb3ZlLWFsbCc7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JJbnB1dE1heFBvc3RzVG9CZUNyYXdsZWQgPSB0aGlzLnNlbGVjdG9yVG9vbENvbnRhaW5lck1hbnVhbENyYXdsICsgJyAjX21heF9wb3N0c190b19iZV9jcmF3bGVkJztcbiAgICAgICAgdGhpcy5zZWxlY3RvcklucHV0TWF4UGFyYWxsZWxDcmF3bGluZ0NvdW50ID0gdGhpcy5zZWxlY3RvclRvb2xDb250YWluZXJNYW51YWxDcmF3bCArICcgI19tYXhfcGFyYWxsZWxfY3Jhd2xpbmdfY291bnQnO1xuICAgICAgICB0aGlzLnNlbGVjdG9yU2hvd0FsbFJlc3BvbnNlcyA9IHRoaXMuc2VsZWN0b3JDb250YWluZXJVcmxRdWV1ZSArICcgLnNob3ctYWxsLXJlc3BvbnNlcyc7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JIaWRlQWxsUmVzcG9uc2VzID0gdGhpcy5zZWxlY3RvckNvbnRhaW5lclVybFF1ZXVlICsgJyAuaGlkZS1hbGwtcmVzcG9uc2VzJztcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgdGhpcy5zZWxlY3RvckJ1dHRvbkFkZFRvRGF0YWJhc2UsIGUgPT4gdGhpcy5vbkNsaWNrU3VibWl0KGUsIENyYXdsaW5nVHlwZS5BRERfVE9fREFUQUJBU0UpKTtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgdGhpcy5zZWxlY3RvckJ1dHRvbkNyYXdsTm93LCBlID0+IHRoaXMub25DbGlja1N1Ym1pdChlLCBDcmF3bGluZ1R5cGUuQ1JBV0xfTk9XKSk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIHRoaXMuc2VsZWN0b3JDb250YWluZXJVcmxRdWV1ZSArICcgJyArIHRoaXMuc2VsZWN0b3JCdXR0b25EZWxldGUsIGUgPT4gdGhpcy5vbkNsaWNrRGVsZXRlVXJsKGUpKTtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgdGhpcy5zZWxlY3RvckNvbnRhaW5lclVybFF1ZXVlICsgJyAnICsgdGhpcy5zZWxlY3RvckJ1dHRvblJlcGVhdCwgZSA9PiB0aGlzLm9uQ2xpY2tSZXBlYXRDcmF3bGluZyhlKSk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIHRoaXMuc2VsZWN0b3JUYWJsZVVybFF1ZXVlICsgJyB0Ym9keSA+IHRyJywgZSA9PiB0aGlzLm9uQ2xpY2tVcmxSb3coZSkpO1xuICAgICAgICAvLyBXaGVuIGEgbGluayBpbiBhIHJvdyBpcyBjbGlja2VkLCBkbyBub3QgcHJvcGFnYXRlIHRoZSBldmVudCBzbyB0aGF0IHRoZSB2aXNpYmlsaXR5IG9mIHRoZSByZXNwb25zZSB2aWV3IGlzIG5vdCB0b2dnbGVkLlxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCB0aGlzLnNlbGVjdG9yVGFibGVVcmxRdWV1ZSArICcgdGJvZHkgPiB0ciBhJywgZSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpKTtcbiAgICAgICAgLy8gSGFuZGxlIGNvbnRpbnVlL3BhdXNlIGJ1dHRvbiBjbGlja3NcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgdGhpcy5zZWxlY3RvckJ1dHRvbkNvbnRpbnVlLCAoKSA9PiB0aGlzLmNvbnRpbnVlQ3Jhd2xpbmcoKSk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIHRoaXMuc2VsZWN0b3JCdXR0b25QYXVzZSwgKCkgPT4gdGhpcy5wYXVzZUNyYXdsaW5nKCkpO1xuICAgICAgICAvLyBDbGVhciBhbGwgVVJMc1xuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCB0aGlzLnNlbGVjdG9yQ2xlYXJBbGxVcmxzLCAoKSA9PiB0aGlzLmNsZWFyQWxsVXJscygpKTtcbiAgICAgICAgLy8gU2hvdy9oaWRlIGFsbCByZXNwb25zZXNcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgdGhpcy5zZWxlY3RvclNob3dBbGxSZXNwb25zZXMsICgpID0+IHRoaXMuc2hvd0FsbFJlc3BvbnNlcygpKTtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgdGhpcy5zZWxlY3RvckhpZGVBbGxSZXNwb25zZXMsICgpID0+IHRoaXMuaGlkZUFsbFJlc3BvbnNlcygpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhpcyBjbGFzcyBpcyBhIHNpbmdsZXRvbi4gR2V0IHRoZSBpbnN0YW5jZSB3aXRoIHRoaXMgbWV0aG9kLlxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuSU5TVEFOQ0UgPT09IG51bGwpXG4gICAgICAgICAgICB0aGlzLklOU1RBTkNFID0gbmV3IE11bHRpQ3Jhd2xpbmdUb29sKCk7XG4gICAgICAgIHJldHVybiB0aGlzLklOU1RBTkNFO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGVhcnMgYWxsIFVSTHMsIGV4Y2VwdCB0aGUgb25lcyB0aGF0IGFyZSBjdXJyZW50bHkgYmVpbmcgY3Jhd2xlZFxuICAgICAqL1xuICAgIGNsZWFyQWxsVXJscygpIHtcbiAgICAgICAgLy8gRmluZCByb3dzIHRoYXQgYXJlOlxuICAgICAgICAvLyAtIEFscmVhZHkgY3Jhd2xlZFxuICAgICAgICAvLyAtIFJlc3BvbnNlcyBvZiBhbHJlYWR5LWNyYXdsZWQgVVJMc1xuICAgICAgICAvLyAtIFdhaXRpbmcgdG8gYmUgY3Jhd2xlZFxuICAgICAgICBsZXQgc2VsZWN0b3IgPSB0aGlzLnNlbGVjdG9yVXJsc0RvbmUgKyAnLCAnICsgdGhpcy5zZWxlY3RvclVybHNUb0JlQ3Jhd2xlZCArICcsICcgKyB0aGlzLnNlbGVjdG9yVXJsc0RvbmUgKyAnICsgdHIucmVzcG9uc2UnO1xuICAgICAgICAkKHNlbGVjdG9yKS5yZW1vdmUoKTtcbiAgICAgICAgLy8gVGhlIHRhYmxlIGhhcyBiZWVuIHVwZGF0ZWRcbiAgICAgICAgdGhpcy5vblVwZGF0ZVVybFRhYmxlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgZm9ybSBzdWJtaXNzaW9uXG4gICAgICogQHBhcmFtIGVcbiAgICAgKiBAcGFyYW0gdHlwZVxuICAgICAqL1xuICAgIG9uQ2xpY2tTdWJtaXQoZSwgdHlwZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGxldCAkc2VsZiA9ICQoZS50YXJnZXQpO1xuICAgICAgICAvLyBIaWRlIHRoZSB0b29sdGlwLiBSZW1vdmUgdGhlIGZvY3VzIGFzIHdlbGwsIGJlY2F1c2UgYWZ0ZXIgaGlkaW5nLCB0aGUgdG9vbHRpcCBkb2VzIG5vdCBnbyBhd2F5LiBJdHMgdGV4dFxuICAgICAgICAvLyBzdGF5IGFzIGludmlzaWJsZS4gQnV0LCBpdCBwcmV2ZW50cyBpbnRlcmFjdGluZyB3aXRoIHRoZSBlbGVtZW50IHVuZGVybmVhdGguXG4gICAgICAgIGlmICh0eXBlb2YgJC5mbi50b29sdGlwID09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICAkc2VsZi50b29sdGlwKCdoaWRlJykuYmx1cigpO1xuICAgICAgICAvLyBHZXQgdGhlIGFkZGVkIFVSTHNcbiAgICAgICAgbGV0IHVybHMgPSB0aGlzLmdldEVudGVyZWRVcmxzKCk7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIHVzZXIgd2FudHMgdG8gY3Jhd2wgdGhlIFVSTHMgcmlnaHQgbm93XG4gICAgICAgICAgICBjYXNlIENyYXdsaW5nVHlwZS5DUkFXTF9OT1c6XG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZVRocmVzaG9sZCA9IHRoaXMuZ2V0TWF4UG9zdHNUb0JlQ3Jhd2xlZCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3Jhd2xlZFVybENvdW50QWZ0ZXJTdWJtaXQgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMubWF4UGFyYWxsZWxDcmF3bGluZyA9IHRoaXMuZ2V0TWF4UGFyYWxsZWxDcmF3bGluZ0NvdW50KCk7XG4gICAgICAgICAgICAgICAgLy8gTWF4aW11bSBwYXJhbGxlbCBjcmF3bGluZyBjb3VudCBjYW5ub3QgYmUgZ3JlYXRlciB0aGFuIHRoZSBwYXVzZSB0aHJlc2hvbGQuIEJlY2F1c2UgdGhlIHJlcXVlc3RzXG4gICAgICAgICAgICAgICAgLy8gd2lsbCBiZSBzZW50IGluIHBhcmFsbGVsLCBieSB0aGUgdGltZSB3ZSBpbmNyZWFzZSB0aGUgY3Jhd2xlZCBwb3N0IGNvdW50LCB0aGVyZSBtaWdodCBiZSBsb3RzIG9mXG4gICAgICAgICAgICAgICAgLy8gcmVxdWVzdHMgc2VudC4gSW4gdHVybiwgcGF1c2UgdGhyZXNob2xkIHdpbGwgYmUgYnJlYWNoZWQuIFNvLCB0aGlzIGZpeGVzIHRoYXQgY2FzZS5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYXVzZVRocmVzaG9sZCA+IDApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWF4UGFyYWxsZWxDcmF3bGluZyA9IE1hdGgubWluKHRoaXMubWF4UGFyYWxsZWxDcmF3bGluZywgdGhpcy5wYXVzZVRocmVzaG9sZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250aW51ZUNyYXdsaW5nKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXRyaWV2ZVBvc3RVcmxzRnJvbUNhdGVnb3J5VXJscygpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkVXJsc1RvUXVldWVUYWJsZSh1cmxzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNyYXdsTmV4dFVybEluUXVldWUoKTtcbiAgICAgICAgICAgICAgICAvLyBJbmRpY2F0ZSBzb21lIHRoaW5ncyBhcmUgaGFwcGVuaW5nXG4gICAgICAgICAgICAgICAgZmxhc2hCYWNrZ3JvdW5kKCQodGhpcy5zZWxlY3RvckNvbnRhaW5lclVybFF1ZXVlKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyBJZiB0aGUgdXNlciB3YW50cyB0byBhZGQgdGhlIFVSTHMgdG8gdGhlIGRhdGFiYXNlXG4gICAgICAgICAgICBjYXNlIENyYXdsaW5nVHlwZS5BRERfVE9fREFUQUJBU0U6XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVBZGRVcmxzVG9EYXRhYmFzZSh1cmxzKTtcbiAgICAgICAgICAgICAgICAvLyBJbmRpY2F0ZSBzb21lIHRoaW5ncyBhcmUgaGFwcGVuaW5nXG4gICAgICAgICAgICAgICAgZmxhc2hCYWNrZ3JvdW5kKCQodGhpcy5zZWxlY3RvckNvbnRhaW5lclVybFF1ZXVlKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIHBvc3QgVVJMcyBmcm9tIHRoZSBjYXRlZ29yeSBVUkxzIGluIHRoZSBxdWV1ZVxuICAgICAqL1xuICAgIHJldHJpZXZlUG9zdFVybHNGcm9tQ2F0ZWdvcnlVcmxzKCkge1xuICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIGN1cnJlbnRseS1iZWluZy1wcm9jZXNzZWQgY2F0ZWdvcnkgVVJMIHN0b3AuXG4gICAgICAgIC8vIElmIHRoZXJlIGlzIG5vIGNhdGVnb3J5IFVSTCBpbiB0aGUgcXVldWUsIHN0b3AuXG4gICAgICAgIC8vIElmIHRoZSBjcmF3bGluZyBpcyBwYXVzZWQsIHN0b3AuXG4gICAgICAgIGlmICh0aGlzLmJlaW5nUHJvY2Vzc2VkQ2F0ZWdvcnlVcmxEYXRhICE9PSBudWxsIHx8ICF0aGlzLmNhdGVnb3J5VXJsUXVldWUubGVuZ3RoIHx8IHRoaXMuaXNQYXVzZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIC8vIEdldCB0aGUgZmlyc3QgZWxlbWVudCBpbiB0aGUgcXVldWUgYW5kIHJlbW92ZSBpdCBmcm9tIHRoZSBxdWV1ZS5cbiAgICAgICAgdGhpcy5iZWluZ1Byb2Nlc3NlZENhdGVnb3J5VXJsRGF0YSA9IHRoaXMuY2F0ZWdvcnlVcmxRdWV1ZS5zaGlmdCgpO1xuICAgICAgICAvLyBVcGRhdGUgdGhlIHRhYmxlIHNvIHRoYXQgaXQgc2hvd3MgdGhlIGN1cnJlbnRseS1iZWluZy1wcm9jZXNzZWQgY2F0ZWdvcnkgVVJMXG4gICAgICAgIHRoaXMub25VcGRhdGVVcmxUYWJsZSgpO1xuICAgICAgICBsZXQgY2F0VXJsID0gdGhpcy5iZWluZ1Byb2Nlc3NlZENhdGVnb3J5VXJsRGF0YTtcbiAgICAgICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgICAgICAkLnBvc3Qod2luZG93LmFqYXh1cmwsIHtcbiAgICAgICAgICAgIHdjY19ub25jZTogJChcIiN3Y2Nfbm9uY2VcIikudmFsKCksXG4gICAgICAgICAgICBhY3Rpb246IHdpbmRvdy5wYWdlQWN0aW9uS2V5LFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICd0b29sX3R5cGUnOiAnZ2V0X3Bvc3RfdXJsc19mcm9tX2NhdGVnb3J5X3VybCcsXG4gICAgICAgICAgICAgICAgJ2NhdGVnb3J5X3VybCc6IGNhdFVybC51cmwsXG4gICAgICAgICAgICAgICAgJ3NpdGVfaWQnOiBjYXRVcmwuc2l0ZUlkXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuZG9uZSgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgcmVzcG9uc2UgaXMgdmFsaWRcbiAgICAgICAgICAgIGxldCByZXN1bHRzID0gcmVzcG9uc2UucmVzdWx0cyB8fCBbXTtcbiAgICAgICAgICAgIC8vIElmIHRoZXJlIGFyZSBpbmZvcm1hdGlvbiB0aGF0IG5lZWQgdG8gYmUgc2hvd24sIHNob3cgdGhlbS5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5oYXNJbmZvKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93VGVzdFJlc3VsdChyZXNwb25zZS52aWV3KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEFkZCByZXRyaWV2ZWQgVVJMcyB0byB0aGUgcG9zdCBVUkwgdGFibGVcbiAgICAgICAgICAgIGxldCBsID0gcmVzdWx0cy5sZW5ndGgsIHVybERhdGFMaXN0ID0gW10sIGN1cnJlbnRJdGVtLCBwb3N0VXJsLCBpbWFnZVVybDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudEl0ZW0gPSByZXN1bHRzW2ldIHx8IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRJdGVtID09PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBwb3N0VXJsID0gY3VycmVudEl0ZW0udXJsIHx8IG51bGw7XG4gICAgICAgICAgICAgICAgaW1hZ2VVcmwgPSBjdXJyZW50SXRlbS50aHVtYm5haWwgfHwgbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAocG9zdFVybCA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgdXJsRGF0YUxpc3QucHVzaChuZXcgUG9zdFVybERhdGEoY2F0VXJsLnNpdGVOYW1lLCBjYXRVcmwuc2l0ZUlkLCBwb3N0VXJsLCBjYXRVcmwuY2F0ZWdvcnlOYW1lLCBjYXRVcmwuY2F0ZWdvcnlJZCwgaW1hZ2VVcmwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdXJsRGF0YUxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgLy8gTm90aWZ5IHRoZSB1c2VyXG4gICAgICAgICAgICAgICAgTm90aWZpZXIuZ2V0SW5zdGFuY2UoKS5ub3RpZnlSZWd1bGFyKCQoJ2xhYmVsW2Zvcj1cIicgKyB0aGlzLmlucHV0TmFtZUNhdGVnb3J5VXJscyArICdcIl0nKSwgd2luZG93LndwY2Mubm9fdXJsc19mb3VuZCArICcgJyArIGNhdFVybC51cmwsIE5vdGlmaWNhdGlvblR5cGUuSU5GTyk7XG4gICAgICAgICAgICAgICAgdGhpcy5vblVwZGF0ZVVybFRhYmxlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQWRkIHRoZSBVUkxzIHRvIHRoZSBxdWV1ZSBhbmQgY3Jhd2wgdGhlIG5leHQgb25lIGluIHRoZSBxdWV1ZVxuICAgICAgICAgICAgdGhpcy5hZGRVcmxzVG9RdWV1ZVRhYmxlKHVybERhdGFMaXN0KTtcbiAgICAgICAgICAgIHRoaXMuY3Jhd2xOZXh0VXJsSW5RdWV1ZSgpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmZhaWwoKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAvLyBOb3RpZnkgdGhlIHVzZXJcbiAgICAgICAgICAgIE5vdGlmaWVyLmdldEluc3RhbmNlKCkubm90aWZ5UmVndWxhcigkKCdsYWJlbFtmb3I9XCInICsgdGhpcy5pbnB1dE5hbWVDYXRlZ29yeVVybHMgKyAnXCJdJyksIHdpbmRvdy53cGNjLmFuX2Vycm9yX29jY3VycmVkICsgXCIgKFwiICsgY2F0VXJsLnVybCArIFwiKTogXCIgKyByZXNwb25zZS5yZXNwb25zZVRleHQsIE5vdGlmaWNhdGlvblR5cGUuRVJST1IpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmFsd2F5cyhlID0+IHtcbiAgICAgICAgICAgIC8vIFJldHJpZXZlIHRoZSBuZXh0IGl0ZW0gaW4gdGhlIHF1ZXVlXG4gICAgICAgICAgICB0aGlzLmJlaW5nUHJvY2Vzc2VkQ2F0ZWdvcnlVcmxEYXRhID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMucmV0cmlldmVQb3N0VXJsc0Zyb21DYXRlZ29yeVVybHMoKTtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgc3RhdHVzXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXR1cygpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBhZGRpbmcgVVJMcyB0byB0aGUgZGF0YWJhc2VcbiAgICAgKiBAcGFyYW0gdXJsc1xuICAgICAqL1xuICAgIGhhbmRsZUFkZFVybHNUb0RhdGFiYXNlKHVybHMpIHtcbiAgICAgICAgLy8gR2V0IHRoZSB0ZXN0IHJlc3VsdHMgY29udGFpbmVyXG4gICAgICAgIGxldCAkdGVzdFJlc3VsdENvbnRhaW5lciA9IHRoaXMuZ2V0VGVzdFJlc3VsdENvbnRhaW5lcigpO1xuICAgICAgICAvLyBJZiB0aGVyZSBpcyBhbiBvbi1nb2luZyByZXF1ZXN0LCBzdG9wLlxuICAgICAgICBpZiAoJHRlc3RSZXN1bHRDb250YWluZXIuaGFzQ2xhc3MoJ2xvYWRpbmcnKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgLy8gU2V0IHRoZSByZXN1bHQgY29udGFpbmVyIFwibG9hZGluZ1wiXG4gICAgICAgICR0ZXN0UmVzdWx0Q29udGFpbmVyLnJlbW92ZUNsYXNzKCdoaWRkZW4nKS5hZGRDbGFzcygnbG9hZGluZycpO1xuICAgICAgICBsZXQgJGNvbnRlbnRDb250YWluZXIgPSAkdGVzdFJlc3VsdENvbnRhaW5lci5maW5kKCcuY29udGVudCcpLmZpcnN0KCk7XG4gICAgICAgICRjb250ZW50Q29udGFpbmVyLmh0bWwoJycpO1xuICAgICAgICBsZXQgY2F0ZWdvcnlVcmxzID0gdGhpcy5jYXRlZ29yeVVybFF1ZXVlO1xuICAgICAgICB0aGlzLmNhdGVnb3J5VXJsUXVldWUgPSBbXTtcbiAgICAgICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgICAgICAkLnBvc3Qod2luZG93LmFqYXh1cmwsIHtcbiAgICAgICAgICAgIHdjY19ub25jZTogJChcIiN3Y2Nfbm9uY2VcIikudmFsKCksXG4gICAgICAgICAgICBhY3Rpb246IHdpbmRvdy5wYWdlQWN0aW9uS2V5LFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICd0b29sX3R5cGUnOiAnYWRkX3VybHNfdG9fZGF0YWJhc2UnLFxuICAgICAgICAgICAgICAgICdwb3N0X3VybHMnOiBKU09OLnN0cmluZ2lmeSh1cmxzKSxcbiAgICAgICAgICAgICAgICAnY2F0ZWdvcnlfdXJscyc6IEpTT04uc3RyaW5naWZ5KGNhdGVnb3J5VXJscylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5kb25lKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgJGNvbnRlbnRDb250YWluZXIuaHRtbChyZXNwb25zZS52aWV3KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICRjb250ZW50Q29udGFpbmVyLmh0bWwod2luZG93LndwY2Mubm9fcmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5mYWlsKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgJGNvbnRlbnRDb250YWluZXIuaHRtbCh3aW5kb3cud3BjYy5hbl9lcnJvcl9vY2N1cnJlZCArIFwiOiBcIiArIHJlc3BvbnNlLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuYWx3YXlzKGUgPT4ge1xuICAgICAgICAgICAgJHRlc3RSZXN1bHRDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgY2xpY2sgZXZlbnRzIG1hZGUgdG8gdGhlIFVSTCByb3dzXG4gICAgICogQHBhcmFtIGVcbiAgICAgKi9cbiAgICBvbkNsaWNrVXJsUm93KGUpIHtcbiAgICAgICAgbGV0ICRzZWxmID0gJChlLnRhcmdldCkuY2xvc2VzdCgndHInKTtcbiAgICAgICAgLy8gR2V0IHRoZSByZXNwb25zZSByb3dcbiAgICAgICAgbGV0ICRyZXNwb25zZVJvdyA9IHRoaXMuZ2V0VXJsUm93UmVzcG9uc2UoJHNlbGYpO1xuICAgICAgICBpZiAoJHJlc3BvbnNlUm93ID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvLyBUb2dnbGUgaXRzIGhpZGRlbiBzdGF0dXMuXG4gICAgICAgIGlmICgkcmVzcG9uc2VSb3cuaGFzQ2xhc3MoJ2hpZGRlbicpKSB7XG4gICAgICAgICAgICAkcmVzcG9uc2VSb3cucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgJHNlbGYuYWRkQ2xhc3ModGhpcy5jbGFzc09wZW4pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJHJlc3BvbnNlUm93LmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICAgICRzZWxmLnJlbW92ZUNsYXNzKHRoaXMuY2xhc3NPcGVuKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmF3bHMgdGhlIG5leHQgVVJMIGluIHF1ZXVlXG4gICAgICovXG4gICAgY3Jhd2xOZXh0VXJsSW5RdWV1ZSgpIHtcbiAgICAgICAgLy8gU3RvcCBpZiBtYXhpbXVtIHJ1bm5pbmcgcmVxdWVzdCBjb3VudCBpcyByZWFjaGVkLlxuICAgICAgICBpZiAodGhpcy5ydW5uaW5nUmVxdWVzdENvdW50ID49IHRoaXMubWF4UGFyYWxsZWxDcmF3bGluZykge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJNYXggcGFyYWxsZWwgcmVxdWVzdCBjb3VudCBoYXMgYmVlbiByZWFjaGVkLiBUaGUgY3Jhd2xpbmcgd2lsbCBjb250aW51ZSB3aGVuIGEgcmVxdWVzdCBmaW5pc2hlcy5cIiwgdGhpcy5ydW5uaW5nUmVxdWVzdENvdW50LCB0aGlzLm1heFBhcmFsbGVsQ3Jhd2xpbmcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFN0YXJ0IHRoZSBudW1iZXIgb2YgcmVxdWVzdHMgdGhhdCBpcyBkZWZpbmVkIGJ5IHRoZSB1c2VyXG4gICAgICAgIHdoaWxlICh0aGlzLnJ1bm5pbmdSZXF1ZXN0Q291bnQgPCB0aGlzLm1heFBhcmFsbGVsQ3Jhd2xpbmcpIHtcbiAgICAgICAgICAgIC8vIFN0b3AgaWYgdGhlIGNyYXdsaW5nIGlzIHBhdXNlZC5cbiAgICAgICAgICAgIGlmICh0aGlzLmlzUGF1c2VkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIC8vIFBhdXNlIGlmIHRoZSBwYXVzZSB0aHJlc2hvbGQgaXMgcmVhY2hlZC5cbiAgICAgICAgICAgIGlmICh0aGlzLnBhdXNlVGhyZXNob2xkID4gMCAmJiB0aGlzLmNyYXdsZWRVcmxDb3VudEFmdGVyU3VibWl0ID49IHRoaXMucGF1c2VUaHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNyYXdsZWRVcmxDb3VudEFmdGVyU3VibWl0ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdXNlVGhyZXNob2xkID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdXNlQ3Jhd2xpbmcoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBHZXQgdGhlIGZpcnN0IFVSTCBpbiB0aGUgcXVldWUgdGhhdCBpcyBub3QgY3VycmVudGx5IGxvYWRpbmdcbiAgICAgICAgICAgIGxldCAkdXJsUm93ID0gJCh0aGlzLnNlbGVjdG9yVXJsc1RvQmVDcmF3bGVkKS5maXJzdCgpIHx8IG51bGw7XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBubyBVUkwgd2FpdGluZyB0byBiZSBzYXZlZCwgdGhlbiBzdG9wLlxuICAgICAgICAgICAgaWYgKCR1cmxSb3cgPT09IG51bGwgfHwgISR1cmxSb3cubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSW5jcmVhc2UgdGhlIHJ1bm5pbmcgcmVxdWVzdCBjb3VudCBzaW5jZSB3ZSB3aWxsIHNlbmQgYSByZXF1ZXN0IHJpZ2h0IG5vdy5cbiAgICAgICAgICAgIHRoaXMucnVubmluZ1JlcXVlc3RDb3VudCArPSAxO1xuICAgICAgICAgICAgdGhpcy5jcmF3bGVkVXJsQ291bnRBZnRlclN1Ym1pdCsrO1xuICAgICAgICAgICAgLy8gQ3Jhd2wgdGhlIFVSTC5cbiAgICAgICAgICAgIHRoaXMuY3Jhd2xVcmxSb3coJHVybFJvdywgbnVsbCwgbnVsbCwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBEZWNyZWFzZSB0aGUgcnVubmluZyByZXF1ZXN0IGNvdW50IHNpbmNlIHRoZSByZXF1ZXN0IGhhcyBiZWVuIGZpbmlzaGVkLlxuICAgICAgICAgICAgICAgIHRoaXMucnVubmluZ1JlcXVlc3RDb3VudCAtPSAxO1xuICAgICAgICAgICAgICAgIC8vIENyYXdsIG5leHQgVVJMIGluIHRoZSBxdWV1ZVxuICAgICAgICAgICAgICAgIHRoaXMuY3Jhd2xOZXh0VXJsSW5RdWV1ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3Jhd2xzIGEgVVJMIHNwZWNpZmllZCBpbiB0aGUgZ2l2ZW4gVVJMIHJvdyBlbGVtZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0gJHVybFJvdyBVUkwgcm93IGVsZW1lbnQgdG8gYmUgY3Jhd2xlZFxuICAgICAqIEBwYXJhbSBkb25lQ2FsbGJhY2sgQSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgY2FsbGVkIGFmdGVyIHJvdXRpbmUgb3BlcmF0aW9ucyBoYXZlIGJlZW4gZG9uZSBhdCAkLnBvc3QncyAnZG9uZScgY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0gZmFpbENhbGxiYWNrIEEgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGNhbGxlZCBhZnRlciByb3V0aW5lIG9wZXJhdGlvbnMgaGF2ZSBiZWVuIGRvbmUgYXQgJC5wb3N0J3MgJ2ZhaWwnIGNhbGxiYWNrXG4gICAgICogQHBhcmFtIGFsd2F5c0NhbGxiYWNrIEEgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGNhbGxlZCBhZnRlciByb3V0aW5lIG9wZXJhdGlvbnMgaGF2ZSBiZWVuIGRvbmUgYXQgJC5wb3N0J3MgJ2Fsd2F5cycgY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0gcmVjcmF3bElmRHVwbGljYXRlIFRydWUgaWYgdGhlIHBvc3Qgc2hvdWxkIGJlIHJlY3Jhd2xlZCB3aGVuIGR1cGxpY2F0ZVxuICAgICAqL1xuICAgIGNyYXdsVXJsUm93KCR1cmxSb3csIGRvbmVDYWxsYmFjayA9IG51bGwsIGZhaWxDYWxsYmFjayA9IG51bGwsIGFsd2F5c0NhbGxiYWNrID0gbnVsbCwgcmVjcmF3bElmRHVwbGljYXRlID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IHVybERhdGEgPSAkdXJsUm93LmRhdGEoXCJ1cmxEYXRhXCIpIHx8IG51bGw7XG4gICAgICAgIC8vIENyZWF0ZSBhIHJlc3BvbnNlIHJvd1xuICAgICAgICBsZXQgJHJlc3BvbnNlUm93ID0gdGhpcy5nZXROZXdSZXNwb25zZVJvd0VsZW1lbnQoKTtcbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gVVJMIGRhdGEsIG1hcmsgdGhlIHJvdyBhcyBmaW5pc2hlZCBhbmQgaW5mb3JtIHRoZSB1c2VyLlxuICAgICAgICBpZiAodXJsRGF0YSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgJHJlc3BvbnNlUm93Lmh0bWwod2luZG93LndwY2MudXJsX2RhdGFfbm90X2V4aXN0KTtcbiAgICAgICAgICAgIHRoaXMuc2V0VXJsUm93RG9uZSgkdXJsUm93KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBTZXQgdGhlIHJvdyBsb2FkaW5nXG4gICAgICAgIHRoaXMuc2V0VXJsUm93TG9hZGluZygkdXJsUm93KTtcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBzdGF0dXNcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0dXMoKTtcbiAgICAgICAgJC5wb3N0KHdpbmRvdy5hamF4dXJsLCB7XG4gICAgICAgICAgICB3Y2Nfbm9uY2U6ICQoXCIjd2NjX25vbmNlXCIpLnZhbCgpLFxuICAgICAgICAgICAgYWN0aW9uOiB3aW5kb3cucGFnZUFjdGlvbktleSxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAndG9vbF90eXBlJzogJ3NhdmVfcG9zdCcsXG4gICAgICAgICAgICAgICAgJ193cGNjX3Rvb2xzX3NpdGVfaWQnOiB1cmxEYXRhLnNpdGVJZCxcbiAgICAgICAgICAgICAgICAnX3dwY2NfdG9vbHNfcG9zdF91cmwnOiB1cmxEYXRhLnVybCxcbiAgICAgICAgICAgICAgICAnX3dwY2NfdG9vbHNfY2F0ZWdvcnlfaWQnOiB1cmxEYXRhLmNhdGVnb3J5SWQsXG4gICAgICAgICAgICAgICAgJ193cGNjX3Rvb2xzX2ZlYXR1cmVkX2ltYWdlX3VybCc6IHVybERhdGEuaW1hZ2VVcmwsXG4gICAgICAgICAgICAgICAgJ193cGNjX3JlY3Jhd2xfaWZfZHVwbGljYXRlJzogcmVjcmF3bElmRHVwbGljYXRlID8gJzEnIDogJzAnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuZG9uZSgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UmVzcG9uc2VSb3dIdG1sKCRyZXNwb25zZVJvdywgcmVzcG9uc2Uudmlldyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFJlc3BvbnNlUm93SHRtbCgkcmVzcG9uc2VSb3csIHdpbmRvdy53cGNjLm5vX3Jlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZG9uZUNhbGxiYWNrICE9PSBudWxsKVxuICAgICAgICAgICAgICAgIGRvbmVDYWxsYmFjayhyZXNwb25zZSk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuZmFpbCgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHRoaXMuc2V0UmVzcG9uc2VSb3dIdG1sKCRyZXNwb25zZVJvdywgd2luZG93LndwY2MuYW5fZXJyb3Jfb2NjdXJyZWQgKyBcIjogXCIgKyByZXNwb25zZS5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgaWYgKGZhaWxDYWxsYmFjayAhPT0gbnVsbClcbiAgICAgICAgICAgICAgICBmYWlsQ2FsbGJhY2socmVzcG9uc2UpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmFsd2F5cyhlID0+IHtcbiAgICAgICAgICAgIC8vIFNldCB0aGUgcmVzcG9uc2VcbiAgICAgICAgICAgICR1cmxSb3cuYWZ0ZXIoJHJlc3BvbnNlUm93KTtcbiAgICAgICAgICAgICR1cmxSb3cuYWRkQ2xhc3ModGhpcy5jbGFzc0hhc1Jlc3BvbnNlKS5hZGRDbGFzcyh0aGlzLmNsYXNzT3Blbik7XG4gICAgICAgICAgICAvLyBNYXJrIHRoZSBVUkwgcm93IGFzIGRvbmVcbiAgICAgICAgICAgIHRoaXMuc2V0VXJsUm93RG9uZSgkdXJsUm93KTtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgc3RhdHVzXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXR1cygpO1xuICAgICAgICAgICAgaWYgKGFsd2F5c0NhbGxiYWNrICE9PSBudWxsKVxuICAgICAgICAgICAgICAgIGFsd2F5c0NhbGxiYWNrKGUpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyBhIFVSTCB0YWJsZSByb3cgJ2xvYWRpbmcnLlxuICAgICAqIEBwYXJhbSAkdXJsUm93XG4gICAgICovXG4gICAgc2V0VXJsUm93TG9hZGluZygkdXJsUm93KSB7XG4gICAgICAgICR1cmxSb3cuYWRkQ2xhc3MoJ2xvYWRpbmcnKS5yZW1vdmVDbGFzcygnZG9uZScpO1xuICAgICAgICAkdXJsUm93LmZpbmQoJ3RkLnN0YXR1cycpLmh0bWwoJzxzcGFuIGNsYXNzPVwiZGFzaGljb25zIGRhc2hpY29ucy11cGRhdGVcIj48L3NwYW4+Jyk7XG4gICAgICAgICR1cmxSb3cuZmluZCgnLmJ1dHRvbi5kZWxldGUnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICR1cmxSb3cuZmluZCgnLmJ1dHRvbi5yZXBlYXQnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgYSBVUkwgdGFibGUgcm93ICdkb25lJy5cbiAgICAgKiBAcGFyYW0gJHVybFJvd1xuICAgICAqL1xuICAgIHNldFVybFJvd0RvbmUoJHVybFJvdykge1xuICAgICAgICAkdXJsUm93LnJlbW92ZUNsYXNzKCdsb2FkaW5nJykuYWRkQ2xhc3MoJ2RvbmUnKTtcbiAgICAgICAgJHVybFJvdy5maW5kKCd0ZC5zdGF0dXMnKS5odG1sKCc8c3BhbiBjbGFzcz1cImRhc2hpY29ucyBkYXNoaWNvbnMteWVzXCI+PC9zcGFuPicpO1xuICAgICAgICAkdXJsUm93LmZpbmQoJy5idXR0b24uZGVsZXRlJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAkdXJsUm93LmZpbmQoJy5idXR0b24ucmVwZWF0JykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGdpdmVuIFVybERhdGEgdG8gdGhlIHF1ZXVlXG4gICAgICogQHBhcmFtIHVybHNcbiAgICAgKi9cbiAgICBhZGRVcmxzVG9RdWV1ZVRhYmxlKHVybHMpIHtcbiAgICAgICAgbGV0ICR0YWJsZUNvbnRhaW5lciA9ICQodGhpcy5zZWxlY3RvclRhYmxlQ29udGFpbmVyVXJsUXVldWUpLmZpcnN0KCk7XG4gICAgICAgIGxldCAkdGJvZHkgPSAkdGFibGVDb250YWluZXIuZmluZCgnIHRib2R5JykuZmlyc3QoKTtcbiAgICAgICAgdXJscyA9IHVybHMgfHwgW107XG4gICAgICAgIC8vIENyZWF0ZSB2aWV3cyBmb3IgdGhlIFVSTHMgYW5kIGFkZCB0aGVtIHRvIHRoZSB0YWJsZVxuICAgICAgICBmb3IgKGxldCB1cmxEYXRhIG9mIHVybHMpIHtcbiAgICAgICAgICAgICR0Ym9keS5hcHBlbmQodGhpcy5jcmVhdGVVcmxSb3codXJsRGF0YSkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgVVJMIHRhYmxlIHZpc2liaWxpdGllc1xuICAgICAgICB0aGlzLm9uVXBkYXRlVXJsVGFibGUoKTtcbiAgICAgICAgLy8gaWYgYW55IFVSTHMgYXJlIGFkZGVkXG4gICAgICAgIGlmICh1cmxzLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgdG9vbHRpcHNcbiAgICAgICAgICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKCk7XG4gICAgICAgICAgICAvLyBGbGFzaCB0aGUgYmFja2dyb3VuZFxuICAgICAgICAgICAgZmxhc2hCYWNrZ3JvdW5kKCR0YWJsZUNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVXBkYXRlIHRoZSBzdGF0dXNcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0dXMoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvd3MvaGlkZXMgZGVmYXVsdCBtZXNzYWdlIG9yIFVSTCB0YWJsZSBjb25zaWRlcmluZyB3aGV0aGVyIHRoZXJlIGFyZSBpdGVtcyBpbiB0aGUgdGFibGUgb3Igbm90XG4gICAgICovXG4gICAgb25VcGRhdGVVcmxUYWJsZSgpIHtcbiAgICAgICAgbGV0ICR0YWJsZUNvbnRhaW5lciA9ICQodGhpcy5zZWxlY3RvclRhYmxlQ29udGFpbmVyVXJsUXVldWUpLmZpcnN0KCk7XG4gICAgICAgIGxldCAkZGVmYXVsdE1lc3NhZ2UgPSAkKHRoaXMuc2VsZWN0b3JDb250YWluZXJVcmxRdWV1ZSkuZmluZCgnLmRlZmF1bHQtbWVzc2FnZScpLmZpcnN0KCk7XG4gICAgICAgIC8vIElmIHRoZXJlIGFyZSBubyBVUkxzLCBoaWRlIHRoZSB0YWJsZSBhbmQgc2hvdyB0aGUgZGVmYXVsdCBtZXNzYWdlLlxuICAgICAgICBsZXQgJG5vdEhpZGRlblJvd3MgPSAkKHRoaXMuc2VsZWN0b3JUYWJsZVVybFF1ZXVlKS5maW5kKCd0Ym9keSB0cjpub3QoLmhpZGRlbiknKSB8fCBudWxsO1xuICAgICAgICBpZiAoKCRub3RIaWRkZW5Sb3dzID09PSBudWxsIHx8ICEkbm90SGlkZGVuUm93cy5sZW5ndGgpICYmIHRoaXMuYmVpbmdQcm9jZXNzZWRDYXRlZ29yeVVybERhdGEgPT09IG51bGwpIHtcbiAgICAgICAgICAgICR0YWJsZUNvbnRhaW5lci5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICAkZGVmYXVsdE1lc3NhZ2UucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIGNyYXdsaW5nIGlzIG5vdCBwYXVzZWQuIEJlY2F1c2UsIGFmdGVyIGhpZGluZyB0aGUgYnV0dG9ucyB3aXRoIHRoZSBjcmF3bGluZyBzdGF0dXMgYmVpbmcgcGF1c2VkLFxuICAgICAgICAgICAgLy8gbm8gb3RoZXIgY3Jhd2xpbmcgY2FuIGJlIGRvbmUgd2l0aG91dCByZWZyZXNoaW5nIHRoZSBwYWdlLlxuICAgICAgICAgICAgdGhpcy5jb250aW51ZUNyYXdsaW5nKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgJHRhYmxlQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgJGRlZmF1bHRNZXNzYWdlLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBzdGF0dXNcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0dXMoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgcm93IGZvciBhIFVybERhdGEgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gdXJsRGF0YVxuICAgICAqL1xuICAgIGNyZWF0ZVVybFJvdyh1cmxEYXRhKSB7XG4gICAgICAgIC8vIENyZWF0ZSBhIG5ldyByb3dcbiAgICAgICAgbGV0ICRyb3cgPSB0aGlzLmdldE5ld1VybFJvd0VsZW1lbnQoKTtcbiAgICAgICAgLy8gTW9kaWZ5IHRoZSByb3cgc3VjaCB0aGF0IGl0IGNvbnRhaW5zIGN1cnJlbnQgVXJsRGF0YSB2YWx1ZXNcbiAgICAgICAgJHJvdy5maW5kKCcuc2l0ZScpLnRleHQodXJsRGF0YS5zaXRlTmFtZSk7XG4gICAgICAgICRyb3cuZmluZCgnLmNhdGVnb3J5JykudGV4dCh1cmxEYXRhLmNhdGVnb3J5TmFtZSk7XG4gICAgICAgIGlmICh1cmxEYXRhLmltYWdlVXJsLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0ICRpbWcgPSAkKCc8aW1nLz4nKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdzcmMnLCB1cmxEYXRhLmltYWdlVXJsKTtcbiAgICAgICAgICAgIGxldCAkYSA9ICQoJzxhLz4nKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdocmVmJywgdXJsRGF0YS5pbWFnZVVybClcbiAgICAgICAgICAgICAgICAuYXR0cigndGFyZ2V0JywgJ19ibGFuaycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2RhdGEtdG9nZ2xlJywgJ3Rvb2x0aXAnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdkYXRhLXBsYWNlbWVudCcsICdyaWdodCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2RhdGEtaHRtbCcsICd0cnVlJylcbiAgICAgICAgICAgICAgICAuYXR0cigndGl0bGUnLCAkaW1nWzBdLm91dGVySFRNTCk7XG4gICAgICAgICAgICAkYS5hcHBlbmQoJGltZyk7XG4gICAgICAgICAgICAkcm93LmZpbmQoJy5pbWFnZScpLmFwcGVuZCgkYSk7XG4gICAgICAgIH1cbiAgICAgICAgJHJvdy5maW5kKCcucG9zdC11cmwnKS5odG1sKCc8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiJyArIHVybERhdGEudXJsICsgJ1wiPicgKyB1cmxEYXRhLnVybCArICc8L2E+Jyk7XG4gICAgICAgICRyb3cuZGF0YShcInVybERhdGFcIiwgdXJsRGF0YSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCRyb3cuZGF0YShcInVybERhdGFcIikpO1xuICAgICAgICByZXR1cm4gJHJvdztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyByZXNwb25zZSByb3cgd2l0aCB0aGUgZ2l2ZW4gSFRNTFxuICAgICAqIEBwYXJhbSAkcm93XG4gICAgICogQHBhcmFtIGh0bWxcbiAgICAgKi9cbiAgICBzZXRSZXNwb25zZVJvd0h0bWwoJHJvdywgaHRtbCkge1xuICAgICAgICBsZXQgJHJlc3BvbnNlID0gJHJvdy5maW5kKCcuJyArIHRoaXMuY2xhc3NSZXNwb25zZSkuZmlyc3QoKTtcbiAgICAgICAgJHJlc3BvbnNlLmh0bWwoaHRtbCk7XG4gICAgICAgIHJldHVybiAkcmVzcG9uc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBwcm90b3R5cGUgdGFibGUgcm93IGVsZW1lbnRcbiAgICAgKi9cbiAgICBnZXROZXdVcmxSb3dFbGVtZW50KCkge1xuICAgICAgICBpZiAodGhpcy4kdXJsUm93UHJvdG90eXBlID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLiR1cmxSb3dQcm90b3R5cGUgPSAkKHRoaXMuc2VsZWN0b3JUYWJsZVVybFF1ZXVlKS5maW5kKCd0ci5wcm90b3R5cGUudXJsJykuZmlyc3QoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy4kdXJsUm93UHJvdG90eXBlLmNsb25lKCkucmVtb3ZlQ2xhc3MoJ3Byb3RvdHlwZScpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHByb3RvdHlwZSB0YWJsZSByb3cgZWxlbWVudFxuICAgICAqL1xuICAgIGdldE5ld1Jlc3BvbnNlUm93RWxlbWVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuJHJlc3BvbnNlUm93UHJvdG90eXBlID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLiRyZXNwb25zZVJvd1Byb3RvdHlwZSA9ICQodGhpcy5zZWxlY3RvclRhYmxlVXJsUXVldWUpLmZpbmQoJ3RyLnByb3RvdHlwZS5yZXNwb25zZScpLmZpcnN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuJHJlc3BvbnNlUm93UHJvdG90eXBlLmNsb25lKCkucmVtb3ZlQ2xhc3MoJ3Byb3RvdHlwZScpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29sbGVjdHMgZW50ZXJlZCBVUkxzIGFuZCByZXR1cm5zIGFuIGFycmF5IG9mIFVSTERhdGEuXG4gICAgICovXG4gICAgZ2V0RW50ZXJlZFVybHMoKSB7XG4gICAgICAgIGxldCB1cmxzID0gW107XG4gICAgICAgIGxldCAkZm9ybSA9ICQodGhpcy5zZWxlY3RvckZvcm0pLmZpcnN0KCk7XG4gICAgICAgIGxldCBzZXJpYWxpemVkVmFsdWVzID0gJGZvcm0uc2VyaWFsaXplT2JqZWN0Tm9OdWxsKCk7XG4gICAgICAgIGxldCBzaXRlSWQgPSBzZXJpYWxpemVkVmFsdWVzWydfd3BjY190b29sc19zaXRlX2lkJ10gfHwgbnVsbDtcbiAgICAgICAgbGV0IGNhdGVnb3J5SWQgPSBzZXJpYWxpemVkVmFsdWVzWydfd3BjY190b29sc19jYXRlZ29yeV9pZCddIHx8IG51bGw7XG4gICAgICAgIC8vIEdldCB0aGUgc2VsZWN0ZWQgc2l0ZSdzIG5hbWVcbiAgICAgICAgbGV0IHNpdGVOYW1lU2VsZWN0b3IgPSB0aGlzLnNlbGVjdG9yRm9ybSArICcgI193cGNjX3Rvb2xzX3NpdGVfaWQgb3B0aW9uW3ZhbHVlPVwiJyArIHNpdGVJZCArICdcIl0nO1xuICAgICAgICBsZXQgc2l0ZU5hbWUgPSAkKHNpdGVOYW1lU2VsZWN0b3IpLnRleHQoKSB8fCBudWxsO1xuICAgICAgICAvLyBHZXQgdGhlIHNlbGVjdGVkIGNhdGVnb3J5J3MgbmFtZVxuICAgICAgICBsZXQgY2F0ZWdvcnlOYW1lU2VsZWN0b3IgPSB0aGlzLnNlbGVjdG9yRm9ybSArICcgI193cGNjX3Rvb2xzX2NhdGVnb3J5X2lkIG9wdGlvblt2YWx1ZT1cIicgKyBjYXRlZ29yeUlkICsgJ1wiXSc7XG4gICAgICAgIGxldCBjYXRlZ29yeU5hbWUgPSAkKGNhdGVnb3J5TmFtZVNlbGVjdG9yKS50ZXh0KCkgfHwgbnVsbDtcbiAgICAgICAgaWYgKHNpdGVJZCA9PT0gbnVsbCB8fCBjYXRlZ29yeUlkID09PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBOb3RpZnkgdGhlIHVzZXJcbiAgICAgICAgICAgIGxldCBpbnB1dE5hbWUgPSBzaXRlSWQgPT09IG51bGwgPyB0aGlzLmlucHV0TmFtZVNpdGVJZCA6IHRoaXMuaW5wdXROYW1lQ2F0ZWdvcnlJZDtcbiAgICAgICAgICAgIE5vdGlmaWVyLmdldEluc3RhbmNlKCkubm90aWZ5UmVndWxhcigkKCdsYWJlbFtmb3I9XCInICsgaW5wdXROYW1lICsgJ1wiXScpLCB3aW5kb3cud3BjYy50aGlzX2lzX25vdF92YWxpZCwgTm90aWZpY2F0aW9uVHlwZS5XQVJOKTtcbiAgICAgICAgICAgIHJldHVybiB1cmxzO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHNlcmlhbGl6ZWRWYWx1ZXMpO1xuICAgICAgICAvLyBHZXQgcG9zdCBVUkxzIHdpdGggZmVhdHVyZWQgaW1hZ2UgVVJMc1xuICAgICAgICBsZXQgcG9zdEFuZEltYWdlVXJscyA9IHNlcmlhbGl6ZWRWYWx1ZXNbJ19wb3N0X2FuZF9mZWF0dXJlZF9pbWFnZV91cmxzJ10gfHwgbnVsbDtcbiAgICAgICAgaWYgKHBvc3RBbmRJbWFnZVVybHMgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGxldCBsID0gcG9zdEFuZEltYWdlVXJscy5sZW5ndGgsIGN1cnJlbnQsIHBvc3RVcmwsIGltYWdlVXJsO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gcG9zdEFuZEltYWdlVXJsc1tpXSB8fCBudWxsO1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50ID09PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBwb3N0VXJsID0gY3VycmVudC5wb3N0VXJsIHx8IG51bGw7XG4gICAgICAgICAgICAgICAgaW1hZ2VVcmwgPSBjdXJyZW50LmltYWdlVXJsIHx8IG51bGw7XG4gICAgICAgICAgICAgICAgLy8gVGhlcmUgbXVzdCBhIHZhbGlkIHBvc3QgVVJMLlxuICAgICAgICAgICAgICAgIGlmIChwb3N0VXJsID09PSBudWxsIHx8ICF0aGlzLmlzVmFsaWRVcmwocG9zdFVybCkpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBpbWFnZSBVUkwgaXMgbm90IHZhbGlkLCBtYWtlIGl0IG51bGwuXG4gICAgICAgICAgICAgICAgaWYgKGltYWdlVXJsICE9PSBudWxsICYmICF0aGlzLmlzVmFsaWRVcmwoaW1hZ2VVcmwpKVxuICAgICAgICAgICAgICAgICAgICBpbWFnZVVybCA9IG51bGw7XG4gICAgICAgICAgICAgICAgdXJscy5wdXNoKG5ldyBQb3N0VXJsRGF0YShzaXRlTmFtZSwgc2l0ZUlkLCBwb3N0VXJsLCBjYXRlZ29yeU5hbWUsIGNhdGVnb3J5SWQsIGltYWdlVXJsKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gR2V0IG5ldyBsaW5lIHNlcGFyYXRlZCBwb3N0IFVSTHNcbiAgICAgICAgbGV0IG5sU2VwYXJhdGVkUG9zdFVybHMgPSBzZXJpYWxpemVkVmFsdWVzW3RoaXMuaW5wdXROYW1lUG9zdFVybHNdIHx8IG51bGw7XG4gICAgICAgIGlmIChubFNlcGFyYXRlZFBvc3RVcmxzICE9PSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgdmFsID0gbmxTZXBhcmF0ZWRQb3N0VXJscy5zcGxpdCgnXFxuJykubWFwKCh2LCBpbmQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdi50cmltKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBsID0gdmFsLmxlbmd0aCwgY3VycmVudFBvc3RVcmw7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQb3N0VXJsID0gdmFsW2ldIHx8IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRQb3N0VXJsID09PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAvLyBUaGUgVVJMIG11c3QgYmUgYSB2YWxpZCBVUkxcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZFVybChjdXJyZW50UG9zdFVybCkpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIHVybHMucHVzaChuZXcgUG9zdFVybERhdGEoc2l0ZU5hbWUsIHNpdGVJZCwgY3VycmVudFBvc3RVcmwsIGNhdGVnb3J5TmFtZSwgY2F0ZWdvcnlJZCwgbnVsbCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIEdldCBjYXRlZ29yeSBVUkxzXG4gICAgICAgIGxldCBjYXRlZ29yeVVybHMgPSBzZXJpYWxpemVkVmFsdWVzW3RoaXMuaW5wdXROYW1lQ2F0ZWdvcnlVcmxzXSB8fCBudWxsO1xuICAgICAgICBpZiAoY2F0ZWdvcnlVcmxzICE9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBQcmVwYXJlIHRoZSBjYXRlZ29yeSB1cmxzXG4gICAgICAgICAgICBjYXRlZ29yeVVybHMgPSBjYXRlZ29yeVVybHMubWFwKCh2LCBpbmQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdi50cmltKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZvciAobGV0IGNhdGVnb3J5VXJsIG9mIGNhdGVnb3J5VXJscykge1xuICAgICAgICAgICAgICAgIGNhdGVnb3J5VXJsID0gY2F0ZWdvcnlVcmwgfHwgbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAoY2F0ZWdvcnlVcmwgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuY2F0ZWdvcnlVcmxRdWV1ZS5wdXNoKG5ldyBDYXRlZ29yeVVybERhdGEoc2l0ZU5hbWUsIHNpdGVJZCwgY2F0ZWdvcnlVcmwsIGNhdGVnb3J5TmFtZSwgY2F0ZWdvcnlJZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIENsZWFyIHRoZSBVUkwgaW5wdXRzIGlmIHRoZSB1c2VyIHdhbnRzXG4gICAgICAgIGxldCAkY2hlY2tib3ggPSAkKHRoaXMuc2VsZWN0b3JDaGVja2JveENsZWFyVXJscykgfHwgbnVsbDtcbiAgICAgICAgaWYgKCRjaGVja2JveCAhPT0gbnVsbCAmJiAkY2hlY2tib3gubGVuZ3RoICYmICRjaGVja2JveFswXS5jaGVja2VkKSB7XG4gICAgICAgICAgICAkZm9ybS5maW5kKCcud2NjLXJlbW92ZScpLmVhY2goKGksIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgJChlbCkuY2xpY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGZvcm0uZmluZCgndGV4dGFyZWEnKS52YWwoJycpLmh0bWwoJycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cmxzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBhIFVSTCBpcyB2YWxpZFxuICAgICAqIEBwYXJhbSB1cmxcbiAgICAgKiBAcmV0dXJuIFRydWUgaWYgdGhlIFVSTCBpcyB2YWxpZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIGlzVmFsaWRVcmwodXJsKSB7XG4gICAgICAgIHVybCA9IHVybCB8fCBudWxsO1xuICAgICAgICAvLyBVUkwgY2Fubm90IGJlIG51bGxcbiAgICAgICAgaWYgKHVybCA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgLy8gVVJMIG11c3Qgc3RhcnQgd2l0aCBcImh0dHBcIlxuICAgICAgICBpZiAoIVV0aWxzLnN0YXJ0c1dpdGgodXJsLnRvTG93ZXJDYXNlKCksICdodHRwJykpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXBlYXRzIGNyYXdsaW5nIGZvciB0aGUgVVJMIHJvdyB0aGF0IGlzIGNsb3Nlc3QgdG8gdGhlIGV2ZW50XG4gICAgICogQHBhcmFtIGVcbiAgICAgKi9cbiAgICBvbkNsaWNrUmVwZWF0Q3Jhd2xpbmcoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGxldCAkc2VsZiA9ICQoZS50YXJnZXQpO1xuICAgICAgICBsZXQgJHVybFJvdyA9ICRzZWxmLmNsb3Nlc3QoJ3RyJyk7XG4gICAgICAgIGxldCAkcmVzcG9uc2VSb3cgPSAkdXJsUm93Lm5leHQoKSB8fCBudWxsO1xuICAgICAgICBsZXQgdXJsRGF0YSA9ICR1cmxSb3cuZGF0YShcInVybERhdGFcIikgfHwgbnVsbDtcbiAgICAgICAgaWYgKHVybERhdGEgPT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIE5vdGlmeSB0aGUgdXNlclxuICAgICAgICAgICAgTm90aWZpZXIuZ2V0SW5zdGFuY2UoKS5ub3RpZnlSZWd1bGFyKCR1cmxSb3csIHdpbmRvdy53cGNjLnVybF9kYXRhX25vdF9leGlzdF9mb3JfdGhpcywgTm90aWZpY2F0aW9uVHlwZS5FUlJPUik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVSTCBkYXRhIGRvZXMgbm90IGV4aXN0IGZvciB0aGlzIHJvdy5cIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhlIG5leHQgcm93IGlzIGEgcmVzcG9uc2Ugcm93LCByZW1vdmUgaXQuXG4gICAgICAgIGlmICgkcmVzcG9uc2VSb3cgIT09IG51bGwgJiYgJHJlc3BvbnNlUm93Lmxlbmd0aCAmJiAkcmVzcG9uc2VSb3cuaGFzQ2xhc3ModGhpcy5jbGFzc1Jlc3BvbnNlKSkge1xuICAgICAgICAgICAgJHJlc3BvbnNlUm93LnJlbW92ZSgpO1xuICAgICAgICAgICAgJHVybFJvdy5yZW1vdmVDbGFzcyh0aGlzLmNsYXNzT3Blbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBOb3RpZnkgdGhlIHVzZXJcbiAgICAgICAgICAgIE5vdGlmaWVyLmdldEluc3RhbmNlKCkubm90aWZ5UmVndWxhcigkdXJsUm93LCB3aW5kb3cud3BjYy50aGlzX3VybF9ub3RfY3Jhd2xlZF95ZXQsIE5vdGlmaWNhdGlvblR5cGUuSU5GTyk7XG4gICAgICAgICAgICAvLyBTdG9wLCBiZWNhdXNlIHRoaXMgVVJMIHJvdyBoYXMgbm90IGJlZW4gY3Jhd2xlZCB5ZXQuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ3Jhd2wgdGhlIFVSTCByb3dcbiAgICAgICAgdGhpcy5jcmF3bFVybFJvdygkdXJsUm93LCBudWxsLCBudWxsLCBudWxsLCB0cnVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBjbGlja3MgbWFkZSB0byB0aGUgcmVtb3ZlIGJ1dHRvblxuICAgICAqIEBwYXJhbSBlXG4gICAgICovXG4gICAgb25DbGlja0RlbGV0ZVVybChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0ICRzZWxmID0gJChlLnRhcmdldCk7XG4gICAgICAgIC8vIEdldCB0aGUgY2xpY2tlZCB0YWJsZSByb3dcbiAgICAgICAgbGV0ICRjbG9zZXN0VHIgPSAkc2VsZi5jbG9zZXN0KCd0cicpO1xuICAgICAgICAvLyBHZXQgdGhlIHRhYmxlIHJvdyBjb21pbmcgYWZ0ZXJcbiAgICAgICAgbGV0ICRuZXh0VHIgPSAkY2xvc2VzdFRyLm5leHQoKSB8fCBudWxsO1xuICAgICAgICAvLyBJZiB0aGUgbmV4dCByb3cgaXMgYSByZXNwb25zZSByb3csIHJlbW92ZSBpdC5cbiAgICAgICAgaWYgKCRuZXh0VHIgIT09IG51bGwgJiYgJG5leHRUci5sZW5ndGggJiYgJG5leHRUci5oYXNDbGFzcyh0aGlzLmNsYXNzUmVzcG9uc2UpKSB7XG4gICAgICAgICAgICAkbmV4dFRyLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlbW92ZSB0aGUgY2xpY2tlZCByb3cuXG4gICAgICAgICRjbG9zZXN0VHIucmVtb3ZlKCk7XG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgVVJMIHRhYmxlIHZpc2liaWxpdGllc1xuICAgICAgICB0aGlzLm9uVXBkYXRlVXJsVGFibGUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHJlc3BvbnNlIHJvdyBvZiB0aGUgZ2l2ZW4gVVJMIHJvd1xuICAgICAqIEBwYXJhbSAkdXJsUm93XG4gICAgICogQHJldHVybiBSZXNwb25zZSByb3cgb3IgbnVsbFxuICAgICAqL1xuICAgIGdldFVybFJvd1Jlc3BvbnNlKCR1cmxSb3cpIHtcbiAgICAgICAgLy8gR2V0IHRoZSB0YWJsZSByb3cgY29taW5nIGFmdGVyXG4gICAgICAgIGxldCAkbmV4dFJvdyA9ICR1cmxSb3cubmV4dCgpIHx8IG51bGw7XG4gICAgICAgIC8vIElmIHRoZSBuZXh0IHJvdyBpcyBhIHJlc3BvbnNlIHJvdywgcmVtb3ZlIGl0LlxuICAgICAgICBpZiAoJG5leHRSb3cgPT09IG51bGwgfHwgISRuZXh0Um93Lmxlbmd0aCB8fCAhJG5leHRSb3cuaGFzQ2xhc3ModGhpcy5jbGFzc1Jlc3BvbnNlKSlcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4gJG5leHRSb3c7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIHN0YXR1cyBvZiB0aGUgVVJMIHRhYmxlXG4gICAgICovXG4gICAgdXBkYXRlU3RhdHVzKCkge1xuICAgICAgICBsZXQgJHN0YXR1cyA9ICQodGhpcy5zZWxlY3RvclN0YXR1cyk7XG4gICAgICAgIGxldCBwcmV2U3RhdHVzSHRtbCA9ICRzdGF0dXMuaHRtbCgpO1xuICAgICAgICBsZXQgZG9uZUNvdW50ID0gJCh0aGlzLnNlbGVjdG9yVXJsc0RvbmUpLmxlbmd0aDtcbiAgICAgICAgbGV0IHRvdGFsQ291bnQgPSAkKHRoaXMuc2VsZWN0b3JVcmxzKS5sZW5ndGg7XG4gICAgICAgIGxldCBzdGF0dXMgPSAnPHNwYW4gY2xhc3M9XCJjb3VudHNcIj4nICsgZG9uZUNvdW50ICsgJy8nICsgdG90YWxDb3VudCArICc8L3NwYW4+JztcbiAgICAgICAgLy8gR2V0IHRoZSBVUkxzIGJlaW5nIGNyYXdsZWRcbiAgICAgICAgbGV0ICR1cmxzQmVpbmdDcmF3bGVkID0gJCh0aGlzLnNlbGVjdG9yVXJsc0JlaW5nQ3Jhd2xlZCk7XG4gICAgICAgIC8vIEFkZCBkYXRhIG9mIHRoZSBVUkxzIHRoYXQgYXJlIGJlaW5nIGNyYXdsZWQgdG8gdGhlIHN0YXR1c1xuICAgICAgICBpZiAoJHVybHNCZWluZ0NyYXdsZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICBzdGF0dXMgKz0gJyAnICsgd2luZG93LndwY2MuY3VycmVudGx5X2NyYXdsaW5nICsgJzogJztcbiAgICAgICAgICAgIGxldCB1cmxEYXRhQmVpbmdDcmF3bGVkO1xuICAgICAgICAgICAgJHVybHNCZWluZ0NyYXdsZWQuZWFjaCgoaSwgZWwpID0+IHtcbiAgICAgICAgICAgICAgICB1cmxEYXRhQmVpbmdDcmF3bGVkID0gJChlbCkuZGF0YShcInVybERhdGFcIikgfHwgbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAodXJsRGF0YUJlaW5nQ3Jhd2xlZCA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgVVJMIHRoYXQgaXMgY3VycmVudGx5IGJlaW5nIGNyYXdsZWRcbiAgICAgICAgICAgICAgICBzdGF0dXMgKz0gJCgnPGEvPicpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdocmVmJywgdXJsRGF0YUJlaW5nQ3Jhd2xlZC51cmwpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0YXJnZXQnLCAnX2JsYW5rJylcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdwb3N0LXVybCcpXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQodXJsRGF0YUJlaW5nQ3Jhd2xlZC51cmwpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKFwic3R5bGVcIiwgXCJkaXNwbGF5OiBibG9jaztcIilbMF0ub3V0ZXJIVE1MO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWRkIGN1cnJlbnRseS1iZWluZy1wcm9jZXNzZWQgY2F0ZWdvcnkgVVJMXG4gICAgICAgIGlmICh0aGlzLmJlaW5nUHJvY2Vzc2VkQ2F0ZWdvcnlVcmxEYXRhICE9PSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgJGEgPSAkKCc8YS8+JylcbiAgICAgICAgICAgICAgICAuYXR0cignaHJlZicsIHRoaXMuYmVpbmdQcm9jZXNzZWRDYXRlZ29yeVVybERhdGEudXJsKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd0YXJnZXQnLCAnX2JsYW5rJylcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2NhdGVnb3J5LXVybCcpXG4gICAgICAgICAgICAgICAgLmFwcGVuZCh0aGlzLmJlaW5nUHJvY2Vzc2VkQ2F0ZWdvcnlVcmxEYXRhLnVybCk7XG4gICAgICAgICAgICBzdGF0dXMgKz0gJzxicj48c3BhbiBjbGFzcz1cImRhc2hpY29ucyBkYXNoaWNvbnMtdXBkYXRlXCI+PC9zcGFuPiAnICtcbiAgICAgICAgICAgICAgICB3aW5kb3cud3BjYy5yZXRyaWV2aW5nX3VybHNfZnJvbS5mb3JtYXQoJGFbMF0ub3V0ZXJIVE1MKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBVcGRhdGUgdGhlIHN0YXR1cyBvbmx5IGlmIGl0IGlzIGRpZmZlcmVudCBmcm9tIHRoZSBwcmV2aW91cyBzdGF0dXNcbiAgICAgICAgaWYgKHN0YXR1cyAhPT0gcHJldlN0YXR1c0h0bWwpIHtcbiAgICAgICAgICAgIGZsYXNoQmFja2dyb3VuZCgkc3RhdHVzKTtcbiAgICAgICAgICAgICRzdGF0dXMuaHRtbChzdGF0dXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY29udGludWUgYnV0dG9uIGVsZW1lbnRcbiAgICAgKi9cbiAgICBnZXRDb250aW51ZUJ1dHRvbigpIHtcbiAgICAgICAgcmV0dXJuICQodGhpcy5zZWxlY3RvckJ1dHRvbkNvbnRpbnVlKS5maXJzdCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHBhdXNlIGJ1dHRvbiBlbGVtZW50XG4gICAgICovXG4gICAgZ2V0UGF1c2VCdXR0b24oKSB7XG4gICAgICAgIHJldHVybiAkKHRoaXMuc2VsZWN0b3JCdXR0b25QYXVzZSkuZmlyc3QoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0ZXN0IHJlc3VsdCBjb250YWluZXIgb2YgdGhlIG1hbnVhbCBjcmF3bGluZyB0b29sXG4gICAgICovXG4gICAgZ2V0VGVzdFJlc3VsdENvbnRhaW5lcigpIHtcbiAgICAgICAgcmV0dXJuICQodGhpcy5zZWxlY3RvclRvb2xDb250YWluZXJNYW51YWxDcmF3bCkuZmluZCgnLnRlc3QtcmVzdWx0cycpLmZpcnN0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNob3dzIHRoZSBnaXZlbiByZXN1bHQgaW4gdGhlIHRlc3QgcmVzdWx0cyBjb250YWluZXJcbiAgICAgKiBAcGFyYW0gaHRtbFxuICAgICAqL1xuICAgIHNob3dUZXN0UmVzdWx0KGh0bWwpIHtcbiAgICAgICAgdGhpcy5nZXRUZXN0UmVzdWx0Q29udGFpbmVyKClcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnbG9hZGluZycpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpXG4gICAgICAgICAgICAuZmluZCgnLmNvbnRlbnQnKS5odG1sKGh0bWwpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQYXVzZXMgY3Jhd2xpbmdcbiAgICAgKi9cbiAgICBwYXVzZUNyYXdsaW5nKCkge1xuICAgICAgICB0aGlzLmlzUGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5nZXRDb250aW51ZUJ1dHRvbigpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgdGhpcy5nZXRQYXVzZUJ1dHRvbigpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29udGludWVzIGNyYXdsaW5nXG4gICAgICovXG4gICAgY29udGludWVDcmF3bGluZygpIHtcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmdldENvbnRpbnVlQnV0dG9uKCkuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICB0aGlzLmdldFBhdXNlQnV0dG9uKCkucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAvLyBDb250aW51ZSBjcmF3bGluZyBwb3N0IFVSTHNcbiAgICAgICAgdGhpcy5jcmF3bE5leHRVcmxJblF1ZXVlKCk7XG4gICAgICAgIC8vIENvbnRpbnVlIHJldHJpZXZpbmcgcG9zdCBVUkxzIGZyb20gY2F0ZWdvcnkgVVJMc1xuICAgICAgICB0aGlzLnJldHJpZXZlUG9zdFVybHNGcm9tQ2F0ZWdvcnlVcmxzKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBtYXhpbXVtIG51bWJlciBvZiBwb3N0cyB0byBiZSBjcmF3bGVkIGZyb20gaXRzIGlucHV0XG4gICAgICogQHJldHVybiBudW1iZXIgQSBudW1iZXIgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIDBcbiAgICAgKi9cbiAgICBnZXRNYXhQb3N0c1RvQmVDcmF3bGVkKCkge1xuICAgICAgICBsZXQgJGlucHV0ID0gJCh0aGlzLnNlbGVjdG9ySW5wdXRNYXhQb3N0c1RvQmVDcmF3bGVkKSB8fCBudWxsO1xuICAgICAgICBpZiAoJGlucHV0ID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIGxldCB2YWwgPSAkaW5wdXQudmFsKCkgfHwgMDtcbiAgICAgICAgaWYgKHZhbCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIHZhbCA9IHBhcnNlSW50KHZhbC50b1N0cmluZygpKTtcbiAgICAgICAgcmV0dXJuIHZhbCA8IDAgPyAwIDogdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgbWF4aW11bSBwYXJhbGxlbCBjcmF3bGluZyBjb3VudCBmcm9tIGl0cyBpbnB1dFxuICAgICAqIEByZXR1cm4gbnVtYmVyIEEgbnVtYmVyIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAxXG4gICAgICovXG4gICAgZ2V0TWF4UGFyYWxsZWxDcmF3bGluZ0NvdW50KCkge1xuICAgICAgICBsZXQgJGlucHV0ID0gJCh0aGlzLnNlbGVjdG9ySW5wdXRNYXhQYXJhbGxlbENyYXdsaW5nQ291bnQpIHx8IG51bGw7XG4gICAgICAgIGlmICgkaW5wdXQgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgbGV0IHZhbCA9ICRpbnB1dC52YWwoKSB8fCAxO1xuICAgICAgICBpZiAodmFsID09PSAxKVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgdmFsID0gcGFyc2VJbnQodmFsLnRvU3RyaW5nKCkpO1xuICAgICAgICByZXR1cm4gdmFsIDwgMSA/IDEgOiB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNob3dzIGFsbCByZXNwb25zZXMgb2YgdGhlIFVSTCByb3dzXG4gICAgICovXG4gICAgc2hvd0FsbFJlc3BvbnNlcygpIHtcbiAgICAgICAgLy8gU2hvdyB0aGUgcmVzcG9uc2VzXG4gICAgICAgICQodGhpcy5zZWxlY3RvclVybFJlc3BvbnNlcykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAvLyBNYWtlIHRoZSBVUkxzIHRoYXQgaGF2ZSByZXNwb25zZXMgb3BlblxuICAgICAgICAkKHRoaXMuc2VsZWN0b3JVcmxzICsgJy4nICsgdGhpcy5jbGFzc0hhc1Jlc3BvbnNlKS5hZGRDbGFzcyh0aGlzLmNsYXNzT3Blbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhpZGVzIGFsbCByZXNwb25zZXMgb2YgdGhlIFVSTCByb3dzXG4gICAgICovXG4gICAgaGlkZUFsbFJlc3BvbnNlcygpIHtcbiAgICAgICAgLy8gSGlkZSB0aGUgcmVzcG9uc2VzXG4gICAgICAgICQodGhpcy5zZWxlY3RvclVybFJlc3BvbnNlcykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAvLyBNYWtlIHRoZSBVUkxzIHRoYXQgaGF2ZSByZXNwb25zZXMgbm90IG9wZW5cbiAgICAgICAgJCh0aGlzLnNlbGVjdG9yVXJscyArICcuJyArIHRoaXMuY2xhc3NIYXNSZXNwb25zZSkucmVtb3ZlQ2xhc3ModGhpcy5jbGFzc09wZW4pO1xuICAgIH1cbn1cbk11bHRpQ3Jhd2xpbmdUb29sLklOU1RBTkNFID0gbnVsbDtcbiIsImV4cG9ydCBjbGFzcyBCYXNlVXJsRGF0YSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHNpdGVOYW1lXG4gICAgICogQHBhcmFtIHNpdGVJZFxuICAgICAqIEBwYXJhbSB1cmxcbiAgICAgKiBAcGFyYW0gY2F0ZWdvcnlOYW1lXG4gICAgICogQHBhcmFtIGNhdGVnb3J5SWRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihzaXRlTmFtZSwgc2l0ZUlkLCB1cmwsIGNhdGVnb3J5TmFtZSwgY2F0ZWdvcnlJZCkge1xuICAgICAgICB0aGlzLl9zaXRlTmFtZSA9IChzaXRlTmFtZSB8fCAnJykudHJpbSgpO1xuICAgICAgICB0aGlzLl9zaXRlSWQgPSBzaXRlSWQ7XG4gICAgICAgIHRoaXMuX3VybCA9ICh1cmwgfHwgJycpLnRyaW0oKTtcbiAgICAgICAgdGhpcy5fY2F0ZWdvcnlJZCA9IGNhdGVnb3J5SWQ7XG4gICAgICAgIHRoaXMuX2NhdGVnb3J5TmFtZSA9IChjYXRlZ29yeU5hbWUgfHwgJycpLnRyaW0oKTtcbiAgICB9XG4gICAgZ2V0IHNpdGVOYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2l0ZU5hbWU7XG4gICAgfVxuICAgIGdldCBzaXRlSWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXRlSWQ7XG4gICAgfVxuICAgIGdldCB1cmwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl91cmw7XG4gICAgfVxuICAgIGdldCBjYXRlZ29yeUlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2F0ZWdvcnlJZDtcbiAgICB9XG4gICAgZ2V0IGNhdGVnb3J5TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhdGVnb3J5TmFtZTtcbiAgICB9XG4gICAgZ2V0IHJlc3BvbnNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVzcG9uc2U7XG4gICAgfVxuICAgIHNldCByZXNwb25zZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9yZXNwb25zZSA9IHZhbHVlO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEJhc2VVcmxEYXRhIH0gZnJvbSBcIi4vQmFzZVVybERhdGFcIjtcbmV4cG9ydCBjbGFzcyBDYXRlZ29yeVVybERhdGEgZXh0ZW5kcyBCYXNlVXJsRGF0YSB7XG59XG4iLCJpbXBvcnQgeyBCYXNlVXJsRGF0YSB9IGZyb20gXCIuL0Jhc2VVcmxEYXRhXCI7XG5leHBvcnQgY2xhc3MgUG9zdFVybERhdGEgZXh0ZW5kcyBCYXNlVXJsRGF0YSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHNpdGVOYW1lXG4gICAgICogQHBhcmFtIHNpdGVJZFxuICAgICAqIEBwYXJhbSB1cmxcbiAgICAgKiBAcGFyYW0gY2F0ZWdvcnlOYW1lXG4gICAgICogQHBhcmFtIGNhdGVnb3J5SWRcbiAgICAgKiBAcGFyYW0gaW1hZ2VVcmxcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihzaXRlTmFtZSwgc2l0ZUlkLCB1cmwsIGNhdGVnb3J5TmFtZSwgY2F0ZWdvcnlJZCwgaW1hZ2VVcmwpIHtcbiAgICAgICAgc3VwZXIoc2l0ZU5hbWUsIHNpdGVJZCwgdXJsLCBjYXRlZ29yeU5hbWUsIGNhdGVnb3J5SWQpO1xuICAgICAgICB0aGlzLl9pbWFnZVVybCA9IGltYWdlVXJsIHx8ICcnO1xuICAgIH1cbiAgICBnZXQgaW1hZ2VVcmwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbWFnZVVybDtcbiAgICB9XG4gICAgZ2V0IHBvc3RJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Bvc3RJZDtcbiAgICB9XG4gICAgc2V0IHBvc3RJZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9wb3N0SWQgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IHBvc3RVcmwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb3N0VXJsO1xuICAgIH1cbiAgICBzZXQgcG9zdFVybCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9wb3N0VXJsID0gdmFsdWU7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgVG9vbHMgfSBmcm9tIFwiLi9hcHAvVG9vbHNcIjtcbi8vIEluaXRpYWxpemUgd2hlbiBkb2N1bWVudCBpcyByZWFkeVxualF1ZXJ5KGZ1bmN0aW9uICgkKSB7XG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgdG9vbHNcbiAgICBuZXcgVG9vbHMoKTtcbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBqUXVlcnk7Il0sInNvdXJjZVJvb3QiOiIifQ==