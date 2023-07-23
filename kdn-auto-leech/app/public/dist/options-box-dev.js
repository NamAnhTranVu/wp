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
/******/ 	return __webpack_require__(__webpack_require__.s = "./scripts/options-box-ts/options-box.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./scripts/common-ts/EventType.ts":
/*!****************************************!*\
  !*** ./scripts/common-ts/EventType.ts ***!
  \****************************************/
/*! exports provided: EventType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventType", function() { return EventType; });
/**
 * Stores the event names used in the plugin's UI.
 */
class EventType {
}
EventType.navigationsInitialized = 'kdnNavigationsInitialized';
EventType.optionsBoxTabActivated = 'kdnOptionsBoxTabActivated';


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

/***/ "./scripts/options-box-ts/app/OptionsBox.ts":
/*!**************************************************!*\
  !*** ./scripts/options-box-ts/app/OptionsBox.ts ***!
  \**************************************************/
/*! exports provided: OptionsBox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OptionsBox", function() { return OptionsBox; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _post_settings_ts_app_TestDataPreparer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../post-settings-ts/app/TestDataPreparer */ "./scripts/post-settings-ts/app/TestDataPreparer.ts");
/* harmony import */ var _common_ts_Notifier__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common-ts/Notifier */ "./scripts/common-ts/Notifier.ts");
/* harmony import */ var _common_ts_enum_NotificationType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common-ts/enum/NotificationType */ "./scripts/common-ts/enum/NotificationType.ts");
/* harmony import */ var _OptionsBoxVariables__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./OptionsBoxVariables */ "./scripts/options-box-ts/app/OptionsBoxVariables.ts");
/* harmony import */ var _TabFactory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TabFactory */ "./scripts/options-box-ts/app/TabFactory.ts");
/* harmony import */ var _enums_TabName__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./enums/TabName */ "./scripts/options-box-ts/app/enums/TabName.ts");
/* harmony import */ var _common_ts_ObjectSerializer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../common-ts/ObjectSerializer */ "./scripts/common-ts/ObjectSerializer.ts");
/* harmony import */ var _common_ts_Utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../common-ts/Utils */ "./scripts/common-ts/Utils.ts");
/* harmony import */ var _OptionsBoxConfig__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./OptionsBoxConfig */ "./scripts/options-box-ts/app/OptionsBoxConfig.ts");
/* harmony import */ var _enums_OptionsBoxType__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./enums/OptionsBoxType */ "./scripts/options-box-ts/app/enums/OptionsBoxType.ts");
/* harmony import */ var _common_ts_EventType__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../common-ts/EventType */ "./scripts/common-ts/EventType.ts");












class OptionsBox {
    /** This is a singleton. */
    constructor() {
        this.$currentButton = null;
        this.$latestTestButtonClickEvent = null;
        this.contentRetrievalInProgress = false;
        this.tabHandlers = [];
        this.allTabHandlers = [];
        this.allTabHandlerNames = [];
        this.config = null;
        /** Stores the position of the scroll when the options box is opened */
        this.scrollPos = null;
        /** Stores the previous box type */
        this.prevBoxType = null;
        /** Stores which tabs are available for which box type */
        this.boxTypeTabNames = new Map()
            .set(_enums_OptionsBoxType__WEBPACK_IMPORTED_MODULE_10__["OptionsBoxType"].DEF, [
            _enums_TabName__WEBPACK_IMPORTED_MODULE_6__["TabName"].FIND_REPLACE,
            _enums_TabName__WEBPACK_IMPORTED_MODULE_6__["TabName"].GENERAL,
            _enums_TabName__WEBPACK_IMPORTED_MODULE_6__["TabName"].CALCULATIONS,
            _enums_TabName__WEBPACK_IMPORTED_MODULE_6__["TabName"].TEMPLATES,
            _enums_TabName__WEBPACK_IMPORTED_MODULE_6__["TabName"].NOTES,
            _enums_TabName__WEBPACK_IMPORTED_MODULE_6__["TabName"].IMPORT_EXPORT,
        ])
            .set(_enums_OptionsBoxType__WEBPACK_IMPORTED_MODULE_10__["OptionsBoxType"].FILE, [
            _enums_TabName__WEBPACK_IMPORTED_MODULE_6__["TabName"].FILE_FIND_REPLACE,
            _enums_TabName__WEBPACK_IMPORTED_MODULE_6__["TabName"].FILE_OPERATIONS,
            _enums_TabName__WEBPACK_IMPORTED_MODULE_6__["TabName"].FILE_TEMPLATES,
            _enums_TabName__WEBPACK_IMPORTED_MODULE_6__["TabName"].NOTES,
            _enums_TabName__WEBPACK_IMPORTED_MODULE_6__["TabName"].IMPORT_EXPORT,
        ]);
        this.testDataPreparer = _post_settings_ts_app_TestDataPreparer__WEBPACK_IMPORTED_MODULE_1__["TestDataPreparer"].getInstance();
        this.obv = _OptionsBoxVariables__WEBPACK_IMPORTED_MODULE_4__["OptionsBoxVariables"].getInstance();
        // Initialize
        this.init();
    }
    /**
     * Get the instance.
     */
    static getInstance() {
        if (this.instance === null)
            this.instance = new OptionsBox();
        return this.instance;
    }
    /**
     * Initializes the options box
     */
    init() {
        // Initialize object serializer
        _common_ts_ObjectSerializer__WEBPACK_IMPORTED_MODULE_7__["ObjectSerializer"].getInstance();
        /*
         * REGISTER EVENT HANDLERS
         */
        // Hide the box when outside is clicked
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('mouseup', this.obv.optionsBoxMainContainerSelector, e => this.onClickOutside(e));
        // Handle key presses
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).keyup((e) => {
            let KEY_ESCAPE = 27;
            // Hide the box when ESC key is pressed
            if (e.keyCode === KEY_ESCAPE)
                this.close();
        });
        // Show the box when the options box button is clicked.
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', this.obv.optionsBoxButtonSelector, e => this.showBox(e));
        // Activate a tab
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', this.obv.tabHandleSelector, e => this.onClickTab(e));
        // Handle test button clicks
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.obv.optionsBoxMainContainerSelector)
            .on('click', this.obv.selectorTestButton, (e) => this.onClickTestButton(e));
        // Handle invalidate test data button clicks
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.obv.selectorTestDataPresenterContainer)
            .on('click', '.' + this.obv.classInvalidateTestData, e => this.onClickInvalidateTestData(e));
        // Handle test data header clicks
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.obv.selectorTestDataPresenterContainer)
            .on('click', '.' + this.obv.classTestDataPresenterHeader, e => this.onClickTestDataPresenterHeader(e));
        // Set the config
        this.config = _OptionsBoxConfig__WEBPACK_IMPORTED_MODULE_9__["OptionsBoxConfig"].getInstance();
        // Initialize all tab handlers
        this.initAllTabHandlers();
        // Initialize summary tooltips for all options box buttons when the document is ready.
        this.initAllOptionsBoxButtonTooltips();
    }
    /**
     * Hides the box
     * @param event Click event
     */
    onClickOutside(event) {
        // If the target element is the container
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target).hasClass(this.obv.optionsBoxMainContainerClass)) {
            // Close the container
            this.close();
        }
    }
    /**
     * Closes the options box
     */
    close() {
        // Get the options box container
        let $container = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.obv.optionsBoxMainContainerSelector);
        // If it is already hidden, stop.
        if ($container.hasClass("hidden"))
            return;
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
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).scrollTop(this.scrollPos);
    }
    /**
     * Shows the box
     * @param event
     */
    showBox(event) {
        // Get the current scroll position
        this.scrollPos = jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).scrollTop();
        // Store the options in a global variable so that other scripts can reach it when required
        window.optionsBox = this;
        // Set the name of the box
        this.setTitle(this.getTargetOptionLabel(event));
        // Set the details of the input for which the options box is opened
        this.setTargetInputDetails(this.getTargetInputContainer(event));
        // Set the current button and current settings for Options Box
        this.$currentButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target).closest(this.obv.optionsBoxButtonSelector);
        // Prepare the configuration
        _OptionsBoxConfig__WEBPACK_IMPORTED_MODULE_9__["OptionsBoxConfig"].getInstance().prepare(this.$currentButton.data('settings'));
        this.config = _OptionsBoxConfig__WEBPACK_IMPORTED_MODULE_9__["OptionsBoxConfig"].getInstance();
        // Prepare the box
        this.prepareTheBoxAccordingToType();
        // Restore state
        this.restoreState();
        // Set the value of the global options box button variable, since the options box is being opened.
        window.$lastClickedOptionsBoxButton = this.$currentButton;
        // Trigger the tab activation event
        this.triggerTabActivatedEventForCurrentTab();
        // Show the box
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.obv.optionsBoxMainContainerSelector).removeClass('hidden');
    }
    /**
     * Prepares the box according to current settings
     */
    prepareTheBoxAccordingToType() {
        // If the current box type is the same as the previous, no need to prepare the box again.
        if (this.config.type === this.prevBoxType)
            return;
        this.prevBoxType = this.config.type;
        // Define tab handlers
        this.tabHandlers = this.boxTypeTabNames.get(this.config.type).map((name) => _TabFactory__WEBPACK_IMPORTED_MODULE_5__["TabFactory"].getInstance(name));
        // Hide all tabs
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.obv.tabContainerSelector + ' .nav-tab').addClass('hidden');
        // Hide all tab contents
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.obv.tabContentsSelector).addClass('hidden');
        // Show only the first tab handler's content
        if (this.tabHandlers.length) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + this.tabHandlers[0].tabId).removeClass('hidden');
        }
        // Get active tab IDs
        let activeTabIds = [];
        for (let handler of this.tabHandlers) {
            activeTabIds.push(handler.tabId);
        }
        // Create a selector that selects active tab IDs
        if (activeTabIds.length) {
            let selectorValidTabs = activeTabIds.map((id) => {
                return this.obv.tabContainerSelector + ' [data-tab="#' + id + '"]';
            }).join(', ');
            // Show only the valid ones
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(selectorValidTabs).removeClass('hidden');
            // Activate the first tab no matter what, because this is another type of options box.
            this.activateTab("#" + activeTabIds[0]);
        }
    }
    /**
     * Sets the tab handlers and their names for caching purposes.
     */
    initAllTabHandlers() {
        // Get all tab names
        let tabNames = [];
        this.boxTypeTabNames.forEach((v, k) => {
            v.map((tabName) => {
                if (tabNames.indexOf(tabName) > -1)
                    return;
                tabNames.push(tabName);
            });
        });
        // Collect the tab instances in a single array
        this.allTabHandlers = tabNames.map((name) => _TabFactory__WEBPACK_IMPORTED_MODULE_5__["TabFactory"].getInstance(name));
        let handler, tabId, name;
        let $container = this.getBoxContainer();
        let names = [];
        for (let i = 0; i < this.allTabHandlers.length; i++) {
            // Each handler has a stateKey and a tabId.
            handler = this.allTabHandlers[i];
            tabId = handler.tabId;
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
    getTargetOptionLabel(event) {
        return jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target).closest('tr').find('td:first-child label').text();
    }
    /**
     * Get the label of the option for which the Options Box button is clicked.
     * @param event
     * @return {jQuery}
     */
    getTargetInputContainer(event) {
        return jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target).closest('.input-group').find('.input-container').first();
    }
    /**
     * Sets the box title
     * @param name
     */
    setTitle(name) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.obv.titleSelector).text(name);
    }
    /**
     * Sets the input details information
     * @param $inputContainer
     */
    setTargetInputDetails($inputContainer) {
        // Find the inputs and get their values
        let $el;
        let type, res;
        let detailArr = [];
        $inputContainer.find(':input:not([type="hidden"])').each((i, el) => {
            $el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el);
            type = $el.attr('type');
            // Get what should be shown according to the input type
            switch (type) {
                case 'checkbox':
                    res = '<span class="dashicons dashicons-' + ($el[0].checked ? 'yes' : 'no') + '"></span>';
                    break;
                default:
                    res = $el.val() || null;
                    break;
            }
            // Make sure there is a value
            if (res === null || !res.length)
                return;
            // Add the value to the detail array
            detailArr.push(res);
        });
        // Combine the values
        let result = detailArr.reduce((acc, curr) => {
            return acc + '<div class="val"><span>' + (curr.length > 72 ? curr.substring(0, 69) + '...' : curr) + '</span></div>';
        }, '');
        // Set the result
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.obv.inputDetailsSelector).html(result);
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
        }
        catch (e) {
            // Notify if JSON could not be parsed.
            console.error('State could not be parsed.', stateVal);
        }
    }
    /**
     * Restore states of the tabs
     * @param state
     */
    restoreTabStates(state) {
        // Restore the state of each tab
        let currentTabHandler;
        for (let i = 0; i < this.tabHandlers.length; i++) {
            currentTabHandler = this.tabHandlers[i];
            // Restore the state
            currentTabHandler.restoreState(state[currentTabHandler.stateKey] || {}, this.config.getTabSettings(currentTabHandler.stateKey) || {});
        }
    }
    /**
     * Saves the current state of the options box to the button that opened the options box
     * @return {object} Current state of the options box
     */
    saveState() {
        // console.log("Save state");
        let state = {}, currentTabHandler;
        // Collect the state from all tabs
        for (let i = 0; i < this.tabHandlers.length; i++) {
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
    activateTab(tabSelector) {
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
    onClickTab(event) {
        event.preventDefault();
        // Activate the tab. Find the closest '.nav-tab' because if an element in a .nav-tab is clicked, the event
        // will point that element. In that case, we cannot get 'data-tab' value. Instead, we get undefined.
        this.activateTab(jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target).closest('.nav-tab').data('tab'));
    }
    /**
     * Get tab container as jQuery element
     * @return {*|jQuery|HTMLElement}
     */
    getTabContainer() {
        return jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.obv.tabContainerSelector);
    }
    /**
     * Get box container as jQuery object.
     * @return {*|jQuery|HTMLElement}
     */
    getBoxContainer() {
        return jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.obv.optionsBoxMainContainerSelector);
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
    onClickTestButton(e) {
        e.preventDefault();
        // console.log("Test button clicked");
        // Store the event
        this.$latestTestButtonClickEvent = e;
        let $testButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).closest('button');
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
        if (data === null) {
            // Notify the user
            _common_ts_Notifier__WEBPACK_IMPORTED_MODULE_2__["Notifier"].getInstance().notifyRegular(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$latestTestButtonClickEvent.target), window.kdn.test_data_not_retrieved);
            console.error("Test data could not be retrieved.");
            return false;
        }
        // If a previous retrieval is in progress, stop.
        if (this.contentRetrievalInProgress)
            return null;
        // Set content retrieval as in progress.
        this.contentRetrievalInProgress = true;
        let $dataPresenterHeader = this.getDataPresenterHeader();
        $dataPresenterHeader.addClass("loading");
        // console.log(data);
        // Retrieve the test data from the main test button
        jquery__WEBPACK_IMPORTED_MODULE_0___default.a.post(window.ajaxurl, {
            kdn_nonce: this.obv.$kdnNonce.val(),
            action: window.pageActionKey,
            data: data
        })
            .done((response) => {
            if (response === undefined || !response || response.view === undefined) {
                // Notify the user
                _common_ts_Notifier__WEBPACK_IMPORTED_MODULE_2__["Notifier"].getInstance().notifyRegular(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$latestTestButtonClickEvent.target), window.kdn.content_retrieval_response_not_valid, _common_ts_enum_NotificationType__WEBPACK_IMPORTED_MODULE_3__["NotificationType"].ERROR);
                console.error("Response of content retrieval process is not valid.");
                return;
            }
            // Put the view into a container so that we can query it with CSS selectors.
            let $view = jquery__WEBPACK_IMPORTED_MODULE_0___default()("<div>" + response.view + "</div>");
            // Get the results
            let results = $view.find('ul').data("results");
            // Put the results into the test button
            $testButton.data("results", results);
            // Add the test data to the presenter
            this.fillTestDataPresenter(results);
            // Click the test button again
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$latestTestButtonClickEvent.target).click();
        })
            .fail(response => {
            // Notify the user
            _common_ts_Notifier__WEBPACK_IMPORTED_MODULE_2__["Notifier"].getInstance().notifyRegular(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$latestTestButtonClickEvent.target), window.kdn.test_data_retrieval_failed, _common_ts_enum_NotificationType__WEBPACK_IMPORTED_MODULE_3__["NotificationType"].ERROR);
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
    fillTestDataPresenter(data) {
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
        let $ul = jquery__WEBPACK_IMPORTED_MODULE_0___default()("<ul />");
        for (let i = 0; i < data.length; i++) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()("<li><code>" + _common_ts_Utils__WEBPACK_IMPORTED_MODULE_8__["Utils"].escapeHtml(data[i]) + "</code></li>").appendTo($ul);
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
        return jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.obv.selectorTestDataPresenterContainer).first();
    }
    /**
     * Handles clicks to the invalidate test data button/link
     * @param e
     */
    onClickInvalidateTestData(e) {
        e.stopPropagation();
        this.fillTestDataPresenter([]);
        this.getMainTestButton().data("results", null);
    }
    /**
     * Get the header of the data presenter
     * @return {jQuery}
     */
    getDataPresenterHeader() {
        return jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.obv.selectorTestDataPresenterHeader).first();
    }
    /**
     * Handles clicks to the test data presenter header
     * @param e
     */
    onClickTestDataPresenterHeader(e) {
        let $dataContainer = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.obv.selectorTestDataContainer).first();
        if ($dataContainer.hasClass("hidden")) {
            $dataContainer.removeClass("hidden");
        }
        else {
            $dataContainer.addClass("hidden");
        }
    }
    /**
     * Sets the main test button's tooltip so that it shows a summary of the configured settings.
     * @param {object} state State of the options box
     */
    setCurrentOptionsBoxButtonSummary(state) {
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
    getOptionsBoxButtonSummaryFromState(state) {
        let handler, stateKey, name, value, i, tabState;
        // If there is no state, no need to create a summary.
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default.a.isEmptyObject(state))
            return null;
        let result = '';
        // For each tab handler, find the number of items. In other words, find the number of settings added to
        // each tab using the tab handlers.
        let colors = [];
        for (i = 0; i < this.allTabHandlers.length; i++) {
            // Each handler has a stateKey and a tabId.
            handler = this.allTabHandlers[i];
            name = this.allTabHandlerNames[i];
            stateKey = handler.stateKey;
            // If the state does not contain a key for the current tab, continue with the next one.
            if (!state.hasOwnProperty(stateKey))
                continue;
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
    setOptionsBoxButtonSummary($optionsBoxButton, value) {
        value = value || null;
        if (value === null) {
            // The options box for this button does not have any configurations.
            $optionsBoxButton.removeClass("has-config");
            // Remove the tooltip
            if (typeof jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn.tooltip === 'function')
                $optionsBoxButton.tooltip('destroy');
        }
        else {
            // The options box for this button has configurations.
            $optionsBoxButton.addClass("has-config");
            $optionsBoxButton.data("toggle", "tooltip");
            $optionsBoxButton.data("html", "true");
            $optionsBoxButton.attr("title", value.title);
            // Set/update the tooltip
            if (typeof jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn.tooltip === 'function')
                $optionsBoxButton.tooltip('fixTitle');
            // Set the colors
            // If there is only 1 color, add the same color again so that the CSS gradient can be created. It requires
            // at least two colors.
            let colors = value.colors;
            if (colors.length === 1)
                colors.push(colors[0]);
            let colorString = colors.join(', ');
            $optionsBoxButton.find('.summary-colors').css('background-image', 'linear-gradient(to right, ' + colorString + ')');
        }
    }
    /**
     * Initializes tooltips of all options box buttons
     */
    initAllOptionsBoxButtonTooltips() {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.obv.optionsBoxButtonSelector).each((i, el) => {
            let $button = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el);
            let stateVal = $button.find('input[type=hidden]').first().val() || null;
            // Stop if there is no state to restore.
            if (stateVal === null || !stateVal.length)
                return;
            try {
                // If the value could not be parsed, an exception will be thrown.
                let state = JSON.parse(stateVal);
                let summary = this.getOptionsBoxButtonSummaryFromState(state);
                this.setOptionsBoxButtonSummary($button, summary);
            }
            catch (e) {
                // Notify if JSON could not be parsed.
                console.error('State could not be parsed.', stateVal, $button);
                _common_ts_Notifier__WEBPACK_IMPORTED_MODULE_2__["Notifier"].getInstance().notifyRegular($button, window.kdn.state_not_parsed, _common_ts_enum_NotificationType__WEBPACK_IMPORTED_MODULE_3__["NotificationType"].ERROR);
            }
        });
    }
    /**
     * Triggers {@link EventType.optionsBoxTabActivated} event.
     */
    triggerTabActivatedEventForCurrentTab() {
        if (this.currentActiveTabId === null)
            return;
        // Trigger an event with the activated tab selector.
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).trigger(_common_ts_EventType__WEBPACK_IMPORTED_MODULE_11__["EventType"].optionsBoxTabActivated, this.currentActiveTabId);
    }
}
OptionsBox.instance = null;


/***/ }),

/***/ "./scripts/options-box-ts/app/OptionsBoxConfig.ts":
/*!********************************************************!*\
  !*** ./scripts/options-box-ts/app/OptionsBoxConfig.ts ***!
  \********************************************************/
/*! exports provided: OptionsBoxConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OptionsBoxConfig", function() { return OptionsBoxConfig; });
/* harmony import */ var _enums_OptionsBoxType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums/OptionsBoxType */ "./scripts/options-box-ts/app/enums/OptionsBoxType.ts");

class OptionsBoxConfig {
    /** This is a singleton */
    constructor() {
        this.keyBox = 'box';
        this.keyTabs = 'tabs';
        this.keyType = 'type';
    }
    /**
     * Get the instance
     */
    static getInstance() {
        if (this.instance === null)
            this.instance = new OptionsBoxConfig();
        return this.instance;
    }
    /**
     * Prepares the instance according to the given configuration
     * @param {object} config Options box configuration
     */
    prepare(config) {
        this.config = config;
        this.prepareType();
    }
    /*
     * GETTERS
     */
    /**
     * Get the type of the options box
     */
    get type() {
        return this._type;
    }
    /**
     * Get tab settings using the key of an options box tab
     * @param {string} tabKey
     */
    getTabSettings(tabKey) {
        return this.objectGet(this.config, this.keyTabs + '.' + tabKey);
    }
    /*
     *
     */
    /**
     * Prepares the type of the options box
     */
    prepareType() {
        // Get the type from the config
        let type = this.objectGet(this.config, this.keyBox + '.' + this.keyType);
        this._type = Object.values(_enums_OptionsBoxType__WEBPACK_IMPORTED_MODULE_0__["OptionsBoxType"]).includes(type) ? type : _enums_OptionsBoxType__WEBPACK_IMPORTED_MODULE_0__["OptionsBoxType"].DEF;
    }
    /**
     * Get value from an object using dot notation
     * @param {object} obj The object
     * @param {string} key Dot notation. E.g. 'box.type' to get 'file' from {'box': {'type' => 'file' } }
     * @return {null|any}
     * @see https://stackoverflow.com/a/6394168/2883487
     */
    objectGet(obj, key) {
        // Split the key into its parts to get an array of keys.
        return key.split('.').reduce((acc, current) => {
            // If the accumulator is null, stop.
            if (acc === null)
                return;
            // Try to get the item from the accumulator using the current key. If the key does not exist, set the
            // accumulator to null.
            return acc.hasOwnProperty(current) ? acc[current] : null;
        }, obj) || null; // If a valid value is not found, return null.
    }
}
OptionsBoxConfig.instance = null;


/***/ }),

/***/ "./scripts/options-box-ts/app/OptionsBoxVariables.ts":
/*!***********************************************************!*\
  !*** ./scripts/options-box-ts/app/OptionsBoxVariables.ts ***!
  \***********************************************************/
/*! exports provided: OptionsBoxVariables */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OptionsBoxVariables", function() { return OptionsBoxVariables; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

class OptionsBoxVariables {
    /** This is a singleton. */
    constructor() {
        this.optionsBoxButtonSelector = '.kdn-options-box';
        this.optionsBoxMainContainerClass = 'options-box-container';
        this.optionsBoxMainContainerSelector = '.' + this.optionsBoxMainContainerClass;
        this.optionsBoxSelector = this.optionsBoxMainContainerSelector + ' > .options-box';
        this.optionsBoxSubContainerSelector = this.optionsBoxSelector + ' > .box-container';
        this.noScrollClass = 'no-scroll';
        this.titleSelector = this.optionsBoxSelector + ' > .box-title';
        this.inputDetailsSelector = this.optionsBoxSelector + ' > .input-details';
        this.tabContainerSelector = this.optionsBoxSelector + ' .nav-tab-wrapper';
        this.tabHandleSelector = this.tabContainerSelector + ' .nav-tab';
        this.tabContentsSelector = this.optionsBoxSelector + ' .tab-content > .tab';
        this.selectorTestButton = '.kdn-test';
        this.inputName = '_options_box';
        this.selectorExportTextarea = "#_options_box_export_settings";
        this.selectorImportTextarea = "#_options_box_import_settings";
        this.selectorImportSettingsButton = '.options-box-import';
        // Test data presenter
        this.selectorTestDataPresenterContainer = '#test-data-presenter';
        this.classTestDataPresenterHeader = 'header';
        this.selectorTestDataPresenterHeader = this.selectorTestDataPresenterContainer + ' .' + this.classTestDataPresenterHeader;
        this.classInvalidateTestData = 'invalidate';
        this.selectorInvalidateTestData = this.selectorTestDataPresenterContainer + '.' + this.classInvalidateTestData;
        this.selectorTestDataContainer = this.selectorTestDataPresenterContainer + ' .data';
        this.$kdnNonce = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#kdn_nonce");
    }
    /**
     * Get the instance
     */
    static getInstance() {
        if (this.instance === null)
            this.instance = new OptionsBoxVariables();
        return this.instance;
    }
}
OptionsBoxVariables.instance = null;


/***/ }),

/***/ "./scripts/options-box-ts/app/TabFactory.ts":
/*!**************************************************!*\
  !*** ./scripts/options-box-ts/app/TabFactory.ts ***!
  \**************************************************/
/*! exports provided: TabFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabFactory", function() { return TabFactory; });
/* harmony import */ var _enums_TabName__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums/TabName */ "./scripts/options-box-ts/app/enums/TabName.ts");
/* harmony import */ var _tabs_default_CalculationsTab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tabs/default/CalculationsTab */ "./scripts/options-box-ts/app/tabs/default/CalculationsTab.ts");
/* harmony import */ var _tabs_default_FindReplaceTab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tabs/default/FindReplaceTab */ "./scripts/options-box-ts/app/tabs/default/FindReplaceTab.ts");
/* harmony import */ var _tabs_default_GeneralTab__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tabs/default/GeneralTab */ "./scripts/options-box-ts/app/tabs/default/GeneralTab.ts");
/* harmony import */ var _tabs_default_ImportExportTab__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tabs/default/ImportExportTab */ "./scripts/options-box-ts/app/tabs/default/ImportExportTab.ts");
/* harmony import */ var _tabs_default_NotesTab__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tabs/default/NotesTab */ "./scripts/options-box-ts/app/tabs/default/NotesTab.ts");
/* harmony import */ var _tabs_default_TemplatesTab__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tabs/default/TemplatesTab */ "./scripts/options-box-ts/app/tabs/default/TemplatesTab.ts");
/* harmony import */ var _tabs_file_FileFindReplaceTab__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tabs/file/FileFindReplaceTab */ "./scripts/options-box-ts/app/tabs/file/FileFindReplaceTab.ts");
/* harmony import */ var _tabs_file_FileOperationsTab__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./tabs/file/FileOperationsTab */ "./scripts/options-box-ts/app/tabs/file/FileOperationsTab.ts");
/* harmony import */ var _tabs_file_FileTemplatesTab__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./tabs/file/FileTemplatesTab */ "./scripts/options-box-ts/app/tabs/file/FileTemplatesTab.ts");










class TabFactory {
    /**
     * Get an instance for a tab type.
     * @param {TabName} tabName
     */
    static getInstance(tabName) {
        if (!this.instances.hasOwnProperty(tabName)) {
            let instance;
            // It would be much better if this switch statement is gotten rid of. I could not find a nice way to create
            // new instances from class names. Actually, each tab must have had a getInstance method to implement a
            // singleton pattern. But, I could not find a nice way to get the name of the child class from the parent
            // TabBase. So, here we are with an ugly switch.
            switch (tabName) {
                case _enums_TabName__WEBPACK_IMPORTED_MODULE_0__["TabName"].CALCULATIONS:
                    instance = new _tabs_default_CalculationsTab__WEBPACK_IMPORTED_MODULE_1__["CalculationsTab"]();
                    break;
                case _enums_TabName__WEBPACK_IMPORTED_MODULE_0__["TabName"].FIND_REPLACE:
                    instance = new _tabs_default_FindReplaceTab__WEBPACK_IMPORTED_MODULE_2__["FindReplaceTab"]();
                    break;
                case _enums_TabName__WEBPACK_IMPORTED_MODULE_0__["TabName"].GENERAL:
                    instance = new _tabs_default_GeneralTab__WEBPACK_IMPORTED_MODULE_3__["GeneralTab"]();
                    break;
                case _enums_TabName__WEBPACK_IMPORTED_MODULE_0__["TabName"].IMPORT_EXPORT:
                    instance = new _tabs_default_ImportExportTab__WEBPACK_IMPORTED_MODULE_4__["ImportExportTab"]();
                    break;
                case _enums_TabName__WEBPACK_IMPORTED_MODULE_0__["TabName"].NOTES:
                    instance = new _tabs_default_NotesTab__WEBPACK_IMPORTED_MODULE_5__["NotesTab"]();
                    break;
                case _enums_TabName__WEBPACK_IMPORTED_MODULE_0__["TabName"].TEMPLATES:
                    instance = new _tabs_default_TemplatesTab__WEBPACK_IMPORTED_MODULE_6__["TemplatesTab"]();
                    break;
                case _enums_TabName__WEBPACK_IMPORTED_MODULE_0__["TabName"].FILE_FIND_REPLACE:
                    instance = new _tabs_file_FileFindReplaceTab__WEBPACK_IMPORTED_MODULE_7__["FileFindReplaceTab"]();
                    break;
                case _enums_TabName__WEBPACK_IMPORTED_MODULE_0__["TabName"].FILE_OPERATIONS:
                    instance = new _tabs_file_FileOperationsTab__WEBPACK_IMPORTED_MODULE_8__["FileOperationsTab"]();
                    break;
                case _enums_TabName__WEBPACK_IMPORTED_MODULE_0__["TabName"].FILE_TEMPLATES:
                    instance = new _tabs_file_FileTemplatesTab__WEBPACK_IMPORTED_MODULE_9__["FileTemplatesTab"]();
                    break;
            }
            // Store the instance
            this.instances[tabName] = instance;
        }
        // Return the instance
        return this.instances[tabName];
    }
}
TabFactory.instances = {};


/***/ }),

/***/ "./scripts/options-box-ts/app/enums/OptionsBoxType.ts":
/*!************************************************************!*\
  !*** ./scripts/options-box-ts/app/enums/OptionsBoxType.ts ***!
  \************************************************************/
/*! exports provided: OptionsBoxType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OptionsBoxType", function() { return OptionsBoxType; });
var OptionsBoxType;
(function (OptionsBoxType) {
    // These must be the same as the enums in OptionsBoxType.php
    OptionsBoxType["DEF"] = "default";
    OptionsBoxType["FILE"] = "file";
})(OptionsBoxType || (OptionsBoxType = {}));


/***/ }),

/***/ "./scripts/options-box-ts/app/enums/TabName.ts":
/*!*****************************************************!*\
  !*** ./scripts/options-box-ts/app/enums/TabName.ts ***!
  \*****************************************************/
/*! exports provided: TabName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabName", function() { return TabName; });
var TabName;
(function (TabName) {
    TabName[TabName["CALCULATIONS"] = 0] = "CALCULATIONS";
    TabName[TabName["FIND_REPLACE"] = 1] = "FIND_REPLACE";
    TabName[TabName["GENERAL"] = 2] = "GENERAL";
    TabName[TabName["IMPORT_EXPORT"] = 3] = "IMPORT_EXPORT";
    TabName[TabName["NOTES"] = 4] = "NOTES";
    TabName[TabName["TEMPLATES"] = 5] = "TEMPLATES";
    TabName[TabName["FILE_FIND_REPLACE"] = 6] = "FILE_FIND_REPLACE";
    TabName[TabName["FILE_OPERATIONS"] = 7] = "FILE_OPERATIONS";
    TabName[TabName["FILE_TEMPLATES"] = 8] = "FILE_TEMPLATES";
})(TabName || (TabName = {}));


/***/ }),

/***/ "./scripts/options-box-ts/app/tabs/base/FindReplaceTabBase.ts":
/*!********************************************************************!*\
  !*** ./scripts/options-box-ts/app/tabs/base/FindReplaceTabBase.ts ***!
  \********************************************************************/
/*! exports provided: FindReplaceTabBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FindReplaceTabBase", function() { return FindReplaceTabBase; });
/* harmony import */ var _TabBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TabBase */ "./scripts/options-box-ts/app/tabs/base/TabBase.ts");

class FindReplaceTabBase extends _TabBase__WEBPACK_IMPORTED_MODULE_0__["TabBase"] {
    /**
     * Using the state, prepare the tab.
     * @param state The state returned from {@link saveState}
     * @param {object|null} settings Current settings for Options Box
     * @return void
     */
    restoreState(state, settings) {
        let $settingsContainer = this.getSettingsContainer();
        this.restoreMultipleInputValues($settingsContainer, state, this.getKeyFindReplaces(), ($currentInputGroup1, value) => this.setInputGroupValues($currentInputGroup1, value.find, value.replace, value.hasOwnProperty("regex")));
    }
    /**
     * Save the current state of this tab
     * @return state State of this tab
     */
    saveState() {
        let state = this.getInputValuesAsObject();
        // The values are under the name of the input. So, first, get the values.
        // Then, remove empty find-replace items from the values array.
        state = this.filterMultipleInputState(state, this.getKeyFindReplaces(), (val) => {
            return val.find.length || val.replace.length;
        });
        return state;
    }
    /**
     * Return the number of options configured in this tab
     * @param state The state returned from {@link saveState}
     */
    getConfiguredOptionCount(state) {
        return (state[this.getKeyFindReplaces()] || []).length;
    }
    /*
     *
     */
    /**
     * Sets the values to the find-replace input group
     * @param {*|jQuery|HTMLElement} $inputGroup
     * @param {string} find
     * @param {string} replace
     * @param {boolean} regex
     */
    setInputGroupValues($inputGroup, find, replace, regex) {
        $inputGroup.find('input[name$="[regex]"]').prop('checked', regex);
        $inputGroup.find('input[name$="[find]"]').val(find);
        $inputGroup.find('input[name$="[replace]"]').val(replace);
    }
}


/***/ }),

/***/ "./scripts/options-box-ts/app/tabs/base/TabBase.ts":
/*!*********************************************************!*\
  !*** ./scripts/options-box-ts/app/tabs/base/TabBase.ts ***!
  \*********************************************************/
/*! exports provided: TabBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabBase", function() { return TabBase; });
/* harmony import */ var _OptionsBoxVariables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../OptionsBoxVariables */ "./scripts/options-box-ts/app/OptionsBoxVariables.ts");

class TabBase {
    constructor(stateKey, tabId, color) {
        this._stateKey = stateKey;
        this._tabId = tabId;
        this._color = color;
    }
    get stateKey() {
        return this._stateKey;
    }
    get tabId() {
        return this._tabId;
    }
    get color() {
        return this._color;
    }
    /*
     *
     */
    /**
     * @param {jQuery|HTMLElement} $settingsContainer
     * @param key
     * @param settings
     */
    setSelectValue($settingsContainer, key, settings) {
        this._setInputValue($settingsContainer, key, settings, 
        // Reset the value
        ($input) => {
            $input.val($input.find('option').first().val());
        }, 
        // Set the value
        ($input, value) => {
            $input.val(value);
        });
    }
    /**
     * Sets the value of an input given its key under which the value is stored in the settings
     *
     * @param {jQuery|HTMLElement} $settingsContainer
     * @param {string} key
     * @param {array} settings  Calculation tab's state. In this array, the value of the input is stored under given
     *                          key
     */
    setInputValue($settingsContainer, key, settings) {
        this._setInputValue($settingsContainer, key, settings, 
        // Reset the value
        ($input) => {
            $input.val("");
        }, 
        // Set the value
        ($input, value) => {
            $input.val(value);
        });
    }
    /**
     * Sets the value of a checkbox given its key under which the value is stored in the settings
     *
     * @param {jQuery|HTMLElement} $settingsContainer
     * @param {string} key
     * @param {array} settings  Calculation tab's state. In this array, the value of the input is stored under given
     *                          key
     */
    setCheckboxValue($settingsContainer, key, settings) {
        this._setInputValue($settingsContainer, key, settings, 
        // Reset the value
        ($input) => {
            $input.prop("checked", false);
        }, 
        // Set the value
        ($input, value) => {
            $input.prop("checked", true);
        });
    }
    /**
     * Sets the value of an input given its key under which the value is stored in the settings
     *
     * @param {jQuery|HTMLElement} $settingsContainer
     * @param {string} key
     * @param {array} settings  Calculation tab's state. In this array, the value of the input is stored under given
     *                          key
     * @param {function} resetValueCallback Used to reset the input value. E.g. function($foundInput) {}
     * @param {function} setValueCallback Used to set the input value. E.g. function($foundInput, value) {}
     */
    _setInputValue($settingsContainer, key, settings, resetValueCallback, setValueCallback) {
        // l("Set input value for " + key);
        let $input = this.getSettingInputWithPartialName($settingsContainer, key);
        if ($input === null)
            return;
        let value = settings[key] || null;
        if (value === null) {
            // l("Clear the value");
            resetValueCallback($input);
        }
        else {
            // l("Set input value as " + value);
            setValueCallback($input, value);
        }
    }
    /**
     * Finds an input given its partial name.
     *
     * @param {jQuery|HTMLElement} $settingsContainer The container that stores the target input
     * @param {string} partialName Partial name of the target input
     * @return {null|jQuery|HTMLElement}
     */
    getSettingInputWithPartialName($settingsContainer, partialName) {
        let $input = $settingsContainer.find('[name$="[' + partialName + ']"]');
        return !$input.length ? null : $input;
    }
    /**
     * Clears all input groups in an input container, leaves just one whose values will be cleared as well.
     */
    clearInputsInContainer($container) {
        $container.find('.kdn-remove').each((i, el) => {
            $(el).click();
        });
    }
    /**
     * Adds a new input group to the container by clicking "add new" button. So, the given container must contain
     * an "add new" button.
     * @param $container
     * @return {*|jQuery|HTMLElement} Last added input group
     */
    addInputGroupToContainer($container) {
        $container.find('.kdn-add-new').click();
        return $container.find('.inputs > .input-group:last-child');
    }
    /**
     * Get the first input group in an input group container
     * @param $container
     * @return {*|jQuery|HTMLElement} First input group in the container
     */
    getFirstInputGroupInContainer($container) {
        return $container.find('.inputs > .input-group:first-child');
    }
    /**
     * Get options box variables.
     */
    getVariables() {
        return _OptionsBoxVariables__WEBPACK_IMPORTED_MODULE_0__["OptionsBoxVariables"].getInstance();
    }
    /**
     * Get the container that stores this tab's content
     */
    getTabContainer() {
        return $('#' + this.tabId);
    }
    /**
     * Get settings container for this tab.
     */
    getSettingsContainer() {
        return this.getTabContainer().find('.kdn-settings').first();
    }
    /**
     * Get the values of the inputs defined for this tab as an object.
     */
    getInputValuesAsObject() {
        // Get the input values in the tab container
        let obj = this.getTabContainer().find(':input').serializeObjectNoNull() || {};
        // Extract the items under the main input name. The inputs in the tab content must be defined under
        // '_options_box' ( the defined input name). E.g. if an option's name should be 'templates', its name must be
        // '_options_box[templates]' for this to work.
        return obj[this.getVariables().inputName] || {};
    }
    /**
     * Restore the state for a multiple form item.
     *
     * @param {jQuery} $settingsContainer   The container in which the input group for the given key will be searched for.
     * @param {object} state                The state from which the values for the key will be extracted.
     * @param {string} key                  The key to be used when extracting values from the state.
     * @param {function} callback           A function that will be called to assign values in the newly input group, i.e.
     *                                      restore the state.
     */
    restoreMultipleInputValues($settingsContainer, state, key, callback) {
        // Find the input container
        let $inputGroupContainer = $settingsContainer
            .find('[name^="' + this.getVariables().inputName + '[' + key + ']"]')
            .closest('td') || null;
        if ($inputGroupContainer === null || !$inputGroupContainer.length)
            return;
        // Clear the inputs in the container
        this.clearInputsInContainer($inputGroupContainer);
        // Get the values
        let values = state[key] || null;
        if (values === null || !values.length)
            return;
        // Restore the state for each item.
        let current, $currentInputGroup, isFirst = true;
        let len = values.length;
        for (let i = 0; i < len; i++) {
            current = values[i] || null;
            if (current === null)
                continue;
            // If this is the first item, no need to create an input group, since it already exists.
            if (isFirst) {
                $currentInputGroup = this.getFirstInputGroupInContainer($inputGroupContainer);
                isFirst = false;
                // Otherwise, add a new input group.
            }
            else {
                $currentInputGroup = this.addInputGroupToContainer($inputGroupContainer);
            }
            // Set the values
            callback($currentInputGroup, current);
        }
    }
    /**
     * Filter a multiple input value
     *
     * @param {object} state        The state from which the values to be filtered will be retrieved
     * @param {string} key          The key using which the values will be retrieved from the state
     * @param {function} callback   A callback that returns true if the value is valid.
     * @return {object} state The state filtered for the value
     */
    filterMultipleInputState(state, key, callback) {
        state[key] = (state[key] || []).filter((val) => {
            return callback(val);
        });
        return state;
    }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./scripts/options-box-ts/app/tabs/default/CalculationsTab.ts":
/*!********************************************************************!*\
  !*** ./scripts/options-box-ts/app/tabs/default/CalculationsTab.ts ***!
  \********************************************************************/
/*! exports provided: CalculationsTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalculationsTab", function() { return CalculationsTab; });
/* harmony import */ var _base_TabBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/TabBase */ "./scripts/options-box-ts/app/tabs/base/TabBase.ts");

class CalculationsTab extends _base_TabBase__WEBPACK_IMPORTED_MODULE_0__["TabBase"] {
    constructor() {
        super('calculations', 'tab-options-box-calculations', '#FFFF00');
        this.keyDecimalSeparatorAfter = 'decimal_separator_after';
        this.keyUseThousandsSeparator = 'use_thousands_separator';
        this.keyRemoveIfNotNumeric = 'remove_if_not_numeric';
        this.keyPrecision = 'precision';
        this.keyFormulas = 'formulas';
    }
    /**
     * Using the state, prepare the tab.
     * @param state The state returned from {@link saveState}
     * @param {object|null} settings Current settings for Options Box
     * @return void
     */
    restoreState(state, settings) {
        let $settingsContainer = this.getSettingsContainer();
        // Set the values for inputs
        this.setSelectValue($settingsContainer, this.keyDecimalSeparatorAfter, state);
        this.setInputValue($settingsContainer, this.keyPrecision, state);
        this.setCheckboxValue($settingsContainer, this.keyUseThousandsSeparator, state);
        this.setCheckboxValue($settingsContainer, this.keyRemoveIfNotNumeric, state);
        this.restoreMultipleInputValues($settingsContainer, state, this.keyFormulas, ($currentInputGroup, value) => {
            $currentInputGroup.find('input[name$="[formula]"]').first().val(value['formula'] || '');
        });
    }
    /**
     * Save the current state of this tab
     * @return state State of this tab
     */
    saveState() {
        let state = this.getInputValuesAsObject();
        // Clear empty values from the calculations array
        state[this.keyFormulas] = state[this.keyFormulas].filter((v) => {
            return (v['formula'] || []).length;
        });
        return state;
    }
    /**
     * Return the number of options configured in this tab
     * @param state The state returned from {@link saveState}
     */
    getConfiguredOptionCount(state) {
        let total = 0;
        total += (state[this.keyFormulas] || []).length;
        if (state.hasOwnProperty(this.keyRemoveIfNotNumeric))
            total += 1;
        return total;
    }
}


/***/ }),

/***/ "./scripts/options-box-ts/app/tabs/default/FindReplaceTab.ts":
/*!*******************************************************************!*\
  !*** ./scripts/options-box-ts/app/tabs/default/FindReplaceTab.ts ***!
  \*******************************************************************/
/*! exports provided: FindReplaceTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FindReplaceTab", function() { return FindReplaceTab; });
/* harmony import */ var _base_FindReplaceTabBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/FindReplaceTabBase */ "./scripts/options-box-ts/app/tabs/base/FindReplaceTabBase.ts");

class FindReplaceTab extends _base_FindReplaceTabBase__WEBPACK_IMPORTED_MODULE_0__["FindReplaceTabBase"] {
    constructor() {
        super('findReplace', 'tab-options-box-find-replace', '#FF0000');
    }
    getKeyFindReplaces() {
        return 'find_replace';
    }
}


/***/ }),

/***/ "./scripts/options-box-ts/app/tabs/default/GeneralTab.ts":
/*!***************************************************************!*\
  !*** ./scripts/options-box-ts/app/tabs/default/GeneralTab.ts ***!
  \***************************************************************/
/*! exports provided: GeneralTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeneralTab", function() { return GeneralTab; });
/* harmony import */ var _base_TabBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/TabBase */ "./scripts/options-box-ts/app/tabs/base/TabBase.ts");

class GeneralTab extends _base_TabBase__WEBPACK_IMPORTED_MODULE_0__["TabBase"] {
    constructor() {
        super('general', 'tab-options-box-general', '#FF7F00');
        this.keyTreatAsJson = 'treat_as_json';
    }
    /**
     * Using the state, prepare the tab.
     * @param state The state returned from {@link saveState}
     * @param {object|null} settings Current settings for Options Box
     * @return void
     */
    restoreState(state, settings) {
        let $settingsContainer = this.getSettingsContainer();
        this.setCheckboxValue($settingsContainer, this.keyTreatAsJson, state);
    }
    /**
     * Save the current state of this tab
     * @return state State of this tab
     */
    saveState() {
        return this.getInputValuesAsObject();
    }
    /**
     * Return the number of options configured in this tab
     * @param state The state returned from {@link saveState}
     */
    getConfiguredOptionCount(state) {
        let total = 0;
        if (state.hasOwnProperty(this.keyTreatAsJson))
            total += 1;
        return total;
    }
}


/***/ }),

/***/ "./scripts/options-box-ts/app/tabs/default/ImportExportTab.ts":
/*!********************************************************************!*\
  !*** ./scripts/options-box-ts/app/tabs/default/ImportExportTab.ts ***!
  \********************************************************************/
/*! exports provided: ImportExportTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportExportTab", function() { return ImportExportTab; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base_TabBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base/TabBase */ "./scripts/options-box-ts/app/tabs/base/TabBase.ts");
/* harmony import */ var _OptionsBox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../OptionsBox */ "./scripts/options-box-ts/app/OptionsBox.ts");
/* harmony import */ var _common_ts_EventType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../common-ts/EventType */ "./scripts/common-ts/EventType.ts");




class ImportExportTab extends _base_TabBase__WEBPACK_IMPORTED_MODULE_1__["TabBase"] {
    constructor() {
        super('importExport', 'tab-options-box-import-export', '#2196f3');
        // Update the export textarea when the import/export tab is activated.
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on(_common_ts_EventType__WEBPACK_IMPORTED_MODULE_3__["EventType"].optionsBoxTabActivated, (e, tabId) => {
            if (tabId === this.tabId) {
                this.updateExportTextArea();
            }
        });
        // Import the settings when the import button is clicked
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.getVariables().optionsBoxSelector).on('click', this.getVariables().selectorImportSettingsButton, (e) => {
            // Import the given settings and update the export text area
            this.importSettings();
            this.updateExportTextArea();
            // Flash the background of the import text area
            flashBackground(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.getVariables().selectorImportTextarea));
        });
    }
    /**
     * Using the state, prepare the tab.
     * @param state The state returned from {@link saveState}
     * @param {object|null} settings Current settings for Options Box
     * @return void
     */
    restoreState(state, settings) {
    }
    /**
     * Save the current state of this tab
     * @return state State of this tab
     */
    saveState() {
        return {};
    }
    /**
     * Return the number of options configured in this tab
     * @param state The state returned from {@link saveState}
     */
    getConfiguredOptionCount(state) {
        return 0;
    }
    /*
     *
     */
    /**
     * Imports the settings input to the import textarea
     */
    importSettings() {
        let $importTextarea = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.getVariables().selectorImportTextarea);
        let val = $importTextarea.val().toString();
        // Stop if the value is not valid.
        if (val === undefined || val === null || val === 'undefined' || !val.length)
            return;
        // Update the state value in the input
        _OptionsBox__WEBPACK_IMPORTED_MODULE_2__["OptionsBox"].getInstance().getOptionsBoxInput().val(val);
        // Restore the state with the new version.
        _OptionsBox__WEBPACK_IMPORTED_MODULE_2__["OptionsBox"].getInstance().restoreState();
        // Clear the text area's value
        $importTextarea.val("");
    }
    /**
     * Updates export text area with the current options box settings
     */
    updateExportTextArea() {
        // Update the state
        _OptionsBox__WEBPACK_IMPORTED_MODULE_2__["OptionsBox"].getInstance().saveState();
        // Get the state's string representation
        let stateStr = _OptionsBox__WEBPACK_IMPORTED_MODULE_2__["OptionsBox"].getInstance().getOptionsBoxInput().val();
        // Put the string representation into the export text area
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.getVariables().selectorExportTextarea).val(stateStr);
    }
}


/***/ }),

/***/ "./scripts/options-box-ts/app/tabs/default/NotesTab.ts":
/*!*************************************************************!*\
  !*** ./scripts/options-box-ts/app/tabs/default/NotesTab.ts ***!
  \*************************************************************/
/*! exports provided: NotesTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotesTab", function() { return NotesTab; });
/* harmony import */ var _base_TabBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/TabBase */ "./scripts/options-box-ts/app/tabs/base/TabBase.ts");

class NotesTab extends _base_TabBase__WEBPACK_IMPORTED_MODULE_0__["TabBase"] {
    constructor() {
        super('notes', 'tab-options-box-notes', '#0000FF');
        this.keyNote = 'note';
    }
    /**
     * Using the state, prepare the tab.
     * @param state The state returned from {@link saveState}
     * @param {object|null} settings Current settings for Options Box
     * @return void
     */
    restoreState(state, settings) {
        this.setNoteValue(state[this.keyNote] || '');
    }
    /**
     * Save the current state of this tab
     * @return state State of this tab
     */
    saveState() {
        let state = this.getInputValuesAsObject();
        state[this.keyNote] = state[this.keyNote] || '';
        return state;
    }
    /**
     * Return the number of options configured in this tab
     * @param state The state returned from {@link saveState}
     */
    getConfiguredOptionCount(state) {
        let value = 0;
        if ((state[this.keyNote] || []).length)
            value += 1;
        return value;
    }
    /*
     *
     */
    /**
     * Sets the note
     * @param {string} txt
     */
    setNoteValue(txt) {
        let $note = this.getTabContainer().find('textarea[name$="[note]"]').first() || null;
        if ($note === null || !$note.length)
            return;
        $note.val(txt);
    }
}


/***/ }),

/***/ "./scripts/options-box-ts/app/tabs/default/TemplatesTab.ts":
/*!*****************************************************************!*\
  !*** ./scripts/options-box-ts/app/tabs/default/TemplatesTab.ts ***!
  \*****************************************************************/
/*! exports provided: TemplatesTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplatesTab", function() { return TemplatesTab; });
/* harmony import */ var _base_TabBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/TabBase */ "./scripts/options-box-ts/app/tabs/base/TabBase.ts");

class TemplatesTab extends _base_TabBase__WEBPACK_IMPORTED_MODULE_0__["TabBase"] {
    constructor() {
        super('templates', 'tab-options-box-templates', '#00FF00');
        this.keyRemoveIfEmpty = 'remove_if_empty';
        this.keyTemplates = 'templates';
    }
    /**
     * Using the state, prepare the tab.
     * @param state The state returned from {@link saveState}
     * @param {object|null} settings Current settings for Options Box
     * @return void
     */
    restoreState(state, settings) {
        let $settingsContainer = this.getSettingsContainer();
        this.setCheckboxValue($settingsContainer, this.keyRemoveIfEmpty, state);
        this.restoreMultipleInputValues($settingsContainer, state, this.keyTemplates, ($currentInputGroup1, value) => this.setInputGroupValues($currentInputGroup1, value));
        // Apply the settings
        this.applySettings(settings);
    }
    /**
     * Save the current state of this tab
     * @return state State of this tab
     */
    saveState() {
        let state = this.getInputValuesAsObject();
        // The values are under the name of the input. So, first, get the values.
        // Then, remove empty items from the values array.
        state = this.filterMultipleInputState(state, this.keyTemplates, (val) => {
            return (val['template'] || []).length;
        });
        return state;
    }
    /**
     * Return the number of options configured in this tab
     * @param state The state returned from {@link saveState}
     */
    getConfiguredOptionCount(state) {
        let total = 0;
        total += (state[this.keyTemplates] || []).length;
        if (state.hasOwnProperty(this.keyRemoveIfEmpty))
            total += 1;
        return total;
    }
    /*
     *
     */
    /**
     * Sets the values to the templates input group
     * @param {*|jQuery|HTMLElement} $inputGroup
     * @param {string} template
     */
    setInputGroupValues($inputGroup, template) {
        $inputGroup.find('textarea[name$="[template]"]').val(template['template']);
    }
    /**
     * Applies the settings
     * @param settings
     */
    applySettings(settings) {
        const $buttons = this.getShortCodeButtons();
        const config = settings || [];
        const allowedShortCodes = config['allowedShortCodes'] || null;
        // If allowed short codes are not defined, show all short codes.
        if (allowedShortCodes === null) {
            $buttons.removeClass('hidden');
            // Otherwise, show only the necessary ones.
        }
        else {
            $buttons.addClass('hidden');
            // Create a CSS selector that selects all to-be-shown short code buttons
            // [data-name="short-code-name-1"], [data-name="short-code-name-2"], [data-name="short-code-name-3"]
            const selector = allowedShortCodes.map(key => ('[data-shortcode-name="' + key + '"]')).join(', ');
            // Show them
            this.getTabContainer().find(selector).removeClass('hidden');
        }
    }
    /**
     * Get short code buttons
     */
    getShortCodeButtons() {
        return this.getTabContainer().find('.short-code-container button');
    }
}


/***/ }),

/***/ "./scripts/options-box-ts/app/tabs/file/FileFindReplaceTab.ts":
/*!********************************************************************!*\
  !*** ./scripts/options-box-ts/app/tabs/file/FileFindReplaceTab.ts ***!
  \********************************************************************/
/*! exports provided: FileFindReplaceTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileFindReplaceTab", function() { return FileFindReplaceTab; });
/* harmony import */ var _base_FindReplaceTabBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/FindReplaceTabBase */ "./scripts/options-box-ts/app/tabs/base/FindReplaceTabBase.ts");

class FileFindReplaceTab extends _base_FindReplaceTabBase__WEBPACK_IMPORTED_MODULE_0__["FindReplaceTabBase"] {
    constructor() {
        super('fileFindReplace', 'tab-options-box-file-find-replace', '#FF0000');
    }
    getKeyFindReplaces() {
        return 'file_find_replace';
    }
}


/***/ }),

/***/ "./scripts/options-box-ts/app/tabs/file/FileOperationsTab.ts":
/*!*******************************************************************!*\
  !*** ./scripts/options-box-ts/app/tabs/file/FileOperationsTab.ts ***!
  \*******************************************************************/
/*! exports provided: FileOperationsTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileOperationsTab", function() { return FileOperationsTab; });
/* harmony import */ var _base_TabBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/TabBase */ "./scripts/options-box-ts/app/tabs/base/TabBase.ts");

class FileOperationsTab extends _base_TabBase__WEBPACK_IMPORTED_MODULE_0__["TabBase"] {
    constructor() {
        super('fileOperations', 'tab-options-box-file-operations', '#fffd00');
        this.keyMove = 'move';
        this.keyCopy = 'copy';
    }
    /**
     * Using the state, prepare the tab.
     * @param state The state returned from {@link saveState}
     * @param {object|null} settings Current settings for Options Box
     * @return void
     */
    restoreState(state, settings) {
        let $settingsContainer = this.getSettingsContainer();
        let callback = ($currentInputGroup, value) => {
            $currentInputGroup.find('input').first().val(value['path'] || '');
        };
        this.restoreMultipleInputValues($settingsContainer, state, this.keyCopy, callback);
        this.restoreMultipleInputValues($settingsContainer, state, this.keyMove, callback);
    }
    /**
     * Save the current state of this tab
     * @return state State of this tab
     */
    saveState() {
        let state = this.getInputValuesAsObject();
        let callback = (val) => {
            return (val['path'] || []).length;
        };
        state = this.filterMultipleInputState(state, this.keyCopy, callback);
        state = this.filterMultipleInputState(state, this.keyMove, callback);
        return state;
    }
    /**
     * Return the number of options configured in this tab
     * @param state The state returned from {@link saveState}
     */
    getConfiguredOptionCount(state) {
        let total = 0;
        total += (state[this.keyCopy] || []).length;
        total += (state[this.keyMove] || []).length;
        return total;
    }
}


/***/ }),

/***/ "./scripts/options-box-ts/app/tabs/file/FileTemplatesTab.ts":
/*!******************************************************************!*\
  !*** ./scripts/options-box-ts/app/tabs/file/FileTemplatesTab.ts ***!
  \******************************************************************/
/*! exports provided: FileTemplatesTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileTemplatesTab", function() { return FileTemplatesTab; });
/* harmony import */ var _base_TabBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/TabBase */ "./scripts/options-box-ts/app/tabs/base/TabBase.ts");

class FileTemplatesTab extends _base_TabBase__WEBPACK_IMPORTED_MODULE_0__["TabBase"] {
    constructor() {
        super('fileTemplates', 'tab-options-box-file-templates', '#00ff1c');
        this.keyName = 'templates_file_name';
        this.keyTitle = 'templates_media_title';
        this.keyDescription = 'templates_media_description';
        this.keyCaption = 'templates_media_caption';
        this.keyAlt = 'templates_media_alt_text';
        this.selectorAllTemplates = 'tr.file-template';
    }
    /**
     * Using the state, prepare the tab.
     * @param state The state returned from {@link saveState}
     * @param {object|null} settings Current settings for Options Box
     * @return void
     */
    restoreState(state, settings) {
        let $settingsContainer = this.getSettingsContainer();
        for (let key of this.getAllKeys()) {
            this.restoreMultipleInputValues($settingsContainer, state, key, ($currentInputGroup, value) => {
                $currentInputGroup.find('textarea[name$="[template]"]').val(value['template']);
            });
        }
        // Apply the settings
        this.applySettings(settings);
    }
    /**
     * Save the current state of this tab
     * @return state State of this tab
     */
    saveState() {
        let state = this.getInputValuesAsObject();
        for (let key of this.getAllKeys()) {
            // The values are under the name of the input. So, first, get the values.
            // Then, remove empty items from the values array.
            state = this.filterMultipleInputState(state, key, (val) => {
                return (val['template'] || []).length;
            });
        }
        return state;
    }
    /**
     * Return the number of options configured in this tab
     * @param state The state returned from {@link saveState}
     */
    getConfiguredOptionCount(state) {
        let allKeys = this.getAllKeys();
        // Return the total number of input count
        return allKeys.reduce((accumulator, currentValue) => {
            return accumulator + (state[currentValue] || []).length;
        }, 0);
    }
    /*
     *
     */
    /**
     * Applies the settings
     * @param settings
     */
    applySettings(settings) {
        const config = settings || [];
        const allowedTemplateTypes = config['allowedTemplateTypes'] || null;
        let $tabContainer = this.getTabContainer();
        // If the media templates should be hidden, hide them.
        if (allowedTemplateTypes !== null && allowedTemplateTypes.length) {
            // Hide all templates first
            $tabContainer.find(this.selectorAllTemplates).addClass('hidden');
            // Show the ones that are allowed
            for (let id of allowedTemplateTypes) {
                $tabContainer.find('tr#' + id).removeClass('hidden');
            }
        }
        else {
            // Otherwise, make sure all of them are shown.
            $tabContainer.find(this.selectorAllTemplates).removeClass('hidden');
        }
    }
    /**
     * Get all keys for the template options of this tab
     */
    getAllKeys() {
        if (FileTemplatesTab.allKeys === null) {
            FileTemplatesTab.allKeys = [this.keyName, this.keyTitle, this.keyDescription, this.keyCaption, this.keyAlt];
        }
        return FileTemplatesTab.allKeys;
    }
}
FileTemplatesTab.allKeys = null;


/***/ }),

/***/ "./scripts/options-box-ts/options-box.ts":
/*!***********************************************!*\
  !*** ./scripts/options-box-ts/options-box.ts ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(jQuery) {/* harmony import */ var _app_OptionsBox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/OptionsBox */ "./scripts/options-box-ts/app/OptionsBox.ts");

jQuery(function ($) {
    // Init the options box.
    _app_OptionsBox__WEBPACK_IMPORTED_MODULE_0__["OptionsBox"].getInstance();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9jb21tb24tdHMvRXZlbnRUeXBlLnRzIiwid2VicGFjazovLy8uL3NjcmlwdHMvY29tbW9uLXRzL05vdGlmaWVyLnRzIiwid2VicGFjazovLy8uL3NjcmlwdHMvY29tbW9uLXRzL09iamVjdFNlcmlhbGl6ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9jb21tb24tdHMvVXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9jb21tb24tdHMvZW51bS9Ob3RpZmljYXRpb25Qb3NpdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2NvbW1vbi10cy9lbnVtL05vdGlmaWNhdGlvblR5cGUudHMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9vcHRpb25zLWJveC10cy9hcHAvT3B0aW9uc0JveC50cyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL29wdGlvbnMtYm94LXRzL2FwcC9PcHRpb25zQm94Q29uZmlnLnRzIiwid2VicGFjazovLy8uL3NjcmlwdHMvb3B0aW9ucy1ib3gtdHMvYXBwL09wdGlvbnNCb3hWYXJpYWJsZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9vcHRpb25zLWJveC10cy9hcHAvVGFiRmFjdG9yeS50cyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL29wdGlvbnMtYm94LXRzL2FwcC9lbnVtcy9PcHRpb25zQm94VHlwZS50cyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL29wdGlvbnMtYm94LXRzL2FwcC9lbnVtcy9UYWJOYW1lLnRzIiwid2VicGFjazovLy8uL3NjcmlwdHMvb3B0aW9ucy1ib3gtdHMvYXBwL3RhYnMvYmFzZS9GaW5kUmVwbGFjZVRhYkJhc2UudHMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9vcHRpb25zLWJveC10cy9hcHAvdGFicy9iYXNlL1RhYkJhc2UudHMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9vcHRpb25zLWJveC10cy9hcHAvdGFicy9kZWZhdWx0L0NhbGN1bGF0aW9uc1RhYi50cyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL29wdGlvbnMtYm94LXRzL2FwcC90YWJzL2RlZmF1bHQvRmluZFJlcGxhY2VUYWIudHMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9vcHRpb25zLWJveC10cy9hcHAvdGFicy9kZWZhdWx0L0dlbmVyYWxUYWIudHMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9vcHRpb25zLWJveC10cy9hcHAvdGFicy9kZWZhdWx0L0ltcG9ydEV4cG9ydFRhYi50cyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL29wdGlvbnMtYm94LXRzL2FwcC90YWJzL2RlZmF1bHQvTm90ZXNUYWIudHMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9vcHRpb25zLWJveC10cy9hcHAvdGFicy9kZWZhdWx0L1RlbXBsYXRlc1RhYi50cyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL29wdGlvbnMtYm94LXRzL2FwcC90YWJzL2ZpbGUvRmlsZUZpbmRSZXBsYWNlVGFiLnRzIiwid2VicGFjazovLy8uL3NjcmlwdHMvb3B0aW9ucy1ib3gtdHMvYXBwL3RhYnMvZmlsZS9GaWxlT3BlcmF0aW9uc1RhYi50cyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL29wdGlvbnMtYm94LXRzL2FwcC90YWJzL2ZpbGUvRmlsZVRlbXBsYXRlc1RhYi50cyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL29wdGlvbnMtYm94LXRzL29wdGlvbnMtYm94LnRzIiwid2VicGFjazovLy8uL3NjcmlwdHMvcG9zdC1zZXR0aW5ncy10cy9hcHAvUG9zdFNldHRpbmdzVmFyaWFibGVzLnRzIiwid2VicGFjazovLy8uL3NjcmlwdHMvcG9zdC1zZXR0aW5ncy10cy9hcHAvVGVzdERhdGFQcmVwYXJlci50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqUXVlcnlcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsR0FBRztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGVBQWUsZUFBZTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxzREFBSztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG9EQUFvRDtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE1BQU07QUFDckIsZ0JBQWdCLE1BQU07QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzNWQSx3QiIsImZpbGUiOiIuL29wdGlvbnMtYm94LWRldi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc2NyaXB0cy9vcHRpb25zLWJveC10cy9vcHRpb25zLWJveC50c1wiKTtcbiIsIi8qKlxuICogU3RvcmVzIHRoZSBldmVudCBuYW1lcyB1c2VkIGluIHRoZSBwbHVnaW4ncyBVSS5cbiAqL1xuZXhwb3J0IGNsYXNzIEV2ZW50VHlwZSB7XG59XG5FdmVudFR5cGUubmF2aWdhdGlvbnNJbml0aWFsaXplZCA9ICd3cGNjTmF2aWdhdGlvbnNJbml0aWFsaXplZCc7XG5FdmVudFR5cGUub3B0aW9uc0JveFRhYkFjdGl2YXRlZCA9ICd3cGNjT3B0aW9uc0JveFRhYkFjdGl2YXRlZCc7XG4iLCJpbXBvcnQgeyBOb3RpZmljYXRpb25UeXBlIH0gZnJvbSBcIi4vZW51bS9Ob3RpZmljYXRpb25UeXBlXCI7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25Qb3NpdGlvbiB9IGZyb20gXCIuL2VudW0vTm90aWZpY2F0aW9uUG9zaXRpb25cIjtcbmV4cG9ydCBjbGFzcyBOb3RpZmllciB7XG4gICAgY29uc3RydWN0b3IoKSB7IH1cbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgICAgIGlmICh0aGlzLklOU1RBTkNFID09PSBudWxsKVxuICAgICAgICAgICAgdGhpcy5JTlNUQU5DRSA9IG5ldyBOb3RpZmllcigpO1xuICAgICAgICByZXR1cm4gdGhpcy5JTlNUQU5DRTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvd3MgXCJyZXF1aXJlZCBmb3IgdGVzdFwiIG5vdGlmaWNhdGlvbiBieSBkZWZhdWx0LiBJZiB5b3Ugc3VwcGx5IGFub3RoZXIgbWVzc2FnZSwgc2hvd3MgaXQgaW5zdGVhZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAkdGFyZ2V0RWxcbiAgICAgKiBAcGFyYW0gbm90aWZpY2F0aW9uTWVzc2FnZSBJZiBkZWZpbmVkLCB0aGlzIG1lc3NhZ2Ugd2lsbCBiZSBzaG93bi4gT3RoZXJ3aXNlLCBhIGRlZmF1bHQgbWVzc2FnZSB3aWxsIGJlIHNob3duLlxuICAgICAqL1xuICAgIG5vdGlmeSgkdGFyZ2V0RWwsIG5vdGlmaWNhdGlvbk1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzTm90aWZ5QXZhaWxhYmxlKCkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmIChub3RpZmljYXRpb25NZXNzYWdlID09IHVuZGVmaW5lZCB8fCAhbm90aWZpY2F0aW9uTWVzc2FnZS5sZW5ndGgpXG4gICAgICAgICAgICBub3RpZmljYXRpb25NZXNzYWdlID0gd2luZG93LndwY2MucmVxdWlyZWRfZm9yX3Rlc3Q7XG4gICAgICAgIC8vIEZpbmQgdGhlIGNsb3Nlc3QgbGFiZWxcbiAgICAgICAgbGV0ICRsYWJlbCA9ICR0YXJnZXRFbC5jbG9zZXN0KFwidHJcIikuZmluZChcImxhYmVsXCIpLmZpcnN0KCksICRub3RpZmljYXRpb25FbCA9ICRsYWJlbC5sZW5ndGggPyAkbGFiZWwgOiAkdGFyZ2V0RWw7XG4gICAgICAgIHRoaXMuc2Nyb2xsVG9FbGVtZW50KCRub3RpZmljYXRpb25FbCk7XG4gICAgICAgICRub3RpZmljYXRpb25FbC5ub3RpZnkobm90aWZpY2F0aW9uTWVzc2FnZSwge1xuICAgICAgICAgICAgcG9zaXRpb246ICd0b3AnXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaG93IGEgbm90aWZpY2F0aW9uIG1lc3NhZ2UgZm9yIGFuIGVsZW1lbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAkdGFyZ2V0RWxlbWVudFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgQ2xhc3MgbmFtZSBmb3IgdGhlIG5vdGlmaWNhdGlvbiBlbGVtZW50LiBEZWZhdWx0OiAnaW5mbydcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcG9zaXRpb24gJ3RvcCcsICdsZWZ0JywgJ2JvdHRvbSBsZWZ0JywgJ3JpZ2h0IHRvcCcsIC4uLiBEZWZhdWx0OiAndG9wJ1xuICAgICAqL1xuICAgIG5vdGlmeVJlZ3VsYXIoJHRhcmdldEVsZW1lbnQsIG1lc3NhZ2UsIHR5cGUgPSBOb3RpZmljYXRpb25UeXBlLklORk8sIHBvc2l0aW9uID0gTm90aWZpY2F0aW9uUG9zaXRpb24uVE9QKSB7XG4gICAgICAgIGlmICghdGhpcy5pc05vdGlmeUF2YWlsYWJsZSgpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAkdGFyZ2V0RWxlbWVudC5ub3RpZnkobWVzc2FnZSwge1xuICAgICAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uIHx8ICd0b3AnLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiB0eXBlIHx8ICdpbmZvJyxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNjcm9sbHMgdG8gYW4gZWxlbWVudFxuICAgICAqIEBwYXJhbSAkZWxcbiAgICAgKi9cbiAgICBzY3JvbGxUb0VsZW1lbnQoJGVsKSB7XG4gICAgICAgICQoZG9jdW1lbnQpLmZpbmQoJ2h0bWwsIGJvZHknKS5zdG9wKCkuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3A6ICRlbC5maXJzdCgpLm9mZnNldCgpLnRvcCAtICQod2luZG93KS5oZWlnaHQoKSAvIDRcbiAgICAgICAgfSwgNTAwLCAnc3dpbmcnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIG5vdGlmaWNhdGlvbiBsaWJyYXJ5IGlzIGF2YWlsYWJsZVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvd0Vycm9yIFRydWUgaWYgYW4gZXJyb3IgbWVzc2FnZSBzaG91bGQgYmUgd3JpdHRlbiBpbiBKUyBjb25zb2xlIHdoZW4gaXQgaXMgbm90IGF2YWlsYWJsZS5cbiAgICAgKi9cbiAgICBpc05vdGlmeUF2YWlsYWJsZShzaG93RXJyb3IgPSB0cnVlKSB7XG4gICAgICAgIGxldCBpc0F2YWlsYWJsZSA9ICEodHlwZW9mICQuZm4ubm90aWZ5ICE9ICdmdW5jdGlvbicpO1xuICAgICAgICBpZiAoIWlzQXZhaWxhYmxlICYmIHNob3dFcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk5vdGlmeUpTIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNBdmFpbGFibGU7XG4gICAgfVxufVxuTm90aWZpZXIuSU5TVEFOQ0UgPSBudWxsO1xuIiwiLyoqXG4gKiBSZWdpc3RlcnMgJC5mbi5zZXJpYWxpemVPYmplY3ROb051bGwgZnVuY3Rpb24uIFNlZSB7QGxpbmsgcmVnaXN0ZXJGdW5jdGlvbn0uXG4gKi9cbmV4cG9ydCBjbGFzcyBPYmplY3RTZXJpYWxpemVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yZWdpc3RlckZ1bmN0aW9uKCk7XG4gICAgfVxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuSU5TVEFOQ0UgPT09IG51bGwpXG4gICAgICAgICAgICB0aGlzLklOU1RBTkNFID0gbmV3IE9iamVjdFNlcmlhbGl6ZXIoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuSU5TVEFOQ0U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlcmlhbGl6ZXMgdGhlIGlucHV0cyBieSB1c2luZyBcImZvcm0tc2VyaWFsaXplclwiIG5vZGUgbW9kdWxlLCBhbmQgcmVtb3ZlcyBudWxsIHZhbHVlcyBmcm9tIHRoZSBhcnJheS12YWx1ZWQgaW5wdXRzLlxuICAgICAqIEUuZy4gaWYgdGhlIGFycmF5LXZhbHVlZCBpbnB1dHMgc3RhcnQgZnJvbSBpbmRleCA0LCBzZXJpYWxpemVPYmplY3QgZnVuY3Rpb24gcmV0dXJucyBbbnVsbCwgbnVsbCwgbnVsbCwgb2JqZWN0XS5cbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHJlbW92ZXMgdGhlIG51bGwgdmFsdWVzLlxuICAgICAqL1xuICAgIHJlZ2lzdGVyRnVuY3Rpb24oKSB7XG4gICAgICAgICQuZm4uc2VyaWFsaXplT2JqZWN0Tm9OdWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9ICQuZm4uc2VyaWFsaXplT2JqZWN0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0Lmhhc093blByb3BlcnR5KGtleSkpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIC8vIElmIHRoaXMgaXMgbm90IGFuIGFycmF5LCBubyBuZWVkIHRvIGNoZWNrIGl0IGZvciBudWxsIHZhbHVlcy5cbiAgICAgICAgICAgICAgICBpZiAoIShyZXN1bHRba2V5XSBpbnN0YW5jZW9mIEFycmF5KSlcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSByZXN1bHRba2V5XS5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbCAhPT0gbnVsbDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgfVxufVxuT2JqZWN0U2VyaWFsaXplci5JTlNUQU5DRSA9IG51bGw7XG4iLCJleHBvcnQgY2xhc3MgVXRpbHMge1xuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBhIHN0cmluZyAoaGF5c3RhY2spIHN0YXJ0cyB3aXRoIHNvbWV0aGluZyAobmVlZGxlKVxuICAgICAqIEBwYXJhbSBoYXlzdGFja1xuICAgICAqIEBwYXJhbSBuZWVkbGVcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBzdGFydHNXaXRoKGhheXN0YWNrLCBuZWVkbGUpIHtcbiAgICAgICAgcmV0dXJuIGhheXN0YWNrLmxhc3RJbmRleE9mKG5lZWRsZSwgMCkgPT09IDA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVzY2FwZXMgSFRNTC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdW5zYWZlXG4gICAgICogQHNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNjIzNDgwNC8yODgzNDg3XG4gICAgICovXG4gICAgc3RhdGljIGVzY2FwZUh0bWwodW5zYWZlKSB7XG4gICAgICAgIGlmICh1bnNhZmUgPT09IHVuZGVmaW5lZCB8fCB1bnNhZmUgPT09ICd1bmRlZmluZWQnIHx8IHVuc2FmZSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgcmV0dXJuIHVuc2FmZVxuICAgICAgICAgICAgLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKVxuICAgICAgICAgICAgLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpXG4gICAgICAgICAgICAucmVwbGFjZSgvPi9nLCBcIiZndDtcIilcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKVxuICAgICAgICAgICAgLnJlcGxhY2UoLycvZywgXCImIzAzOTtcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNob3dzIHRoZSBzcGVjaWZpZWQgdGl0bGUgYXMgdGhlIGVsZW1lbnQncyB0b29sdGlwLCBhbmQgdGhlbiBjaGFuZ2VzIHRoZSB0b29sdGlwIHRvIGl0cyBvcmlnaW5hbCB2YWx1ZS5cbiAgICAgKiBIZW5jZSwgdGhlIHVzZXIgd2lsbCBzZWUgdGhlIG9yaWdpbmFsIHRpdGxlIHdoZW4gdGhlIHRvb2x0aXAgaXMgc2hvd24gbmV4dCB0aW1lLlxuICAgICAqIEBwYXJhbSAkZWxlbWVudFxuICAgICAqIEBwYXJhbSBmbGFzaFRpdGxlXG4gICAgICovXG4gICAgc3RhdGljIGZsYXNoVG9vbHRpcCgkZWxlbWVudCwgZmxhc2hUaXRsZSkge1xuICAgICAgICBsZXQgb3JpZ2luYWxUaXRsZSA9ICRlbGVtZW50LmF0dHIoXCJkYXRhLW9yaWdpbmFsLXRpdGxlXCIpO1xuICAgICAgICAkZWxlbWVudFxuICAgICAgICAgICAgLmF0dHIoJ2RhdGEtb3JpZ2luYWwtdGl0bGUnLCBmbGFzaFRpdGxlKVxuICAgICAgICAgICAgLnRvb2x0aXAoJ2ZpeFRpdGxlJylcbiAgICAgICAgICAgIC50b29sdGlwKCdzaG93JylcbiAgICAgICAgICAgIC8vIFNldCB0aGUgb3JpZ2luYWwgdGl0bGUgYnV0IGRvIG5vdCBzaG93IGl0LiBUaGUgdXNlciB3aWxsIHNlZSB0aGUgb3JpZ2luYWwgdGl0bGUgYXQgbmV4dCBob3ZlclxuICAgICAgICAgICAgLmF0dHIoJ2RhdGEtb3JpZ2luYWwtdGl0bGUnLCBvcmlnaW5hbFRpdGxlKVxuICAgICAgICAgICAgLnRvb2x0aXAoJ2ZpeFRpdGxlJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdG9vbHRpcCBlbGVtZW50cyBmb3IgYSBzZWxlY3Rvci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgU2VsZWN0b3Igb2YgdGhlIGVsZW1lbnQgdGhhdCBoYXMgJ2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiJyBhdHRyaWJ1dGVcbiAgICAgKi9cbiAgICBzdGF0aWMgaW5pdFRvb2x0aXBGb3JTZWxlY3RvcihzZWxlY3Rvcikge1xuICAgICAgICBpZiAodHlwZW9mICQuZm4udG9vbHRpcCA9PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgJChzZWxlY3RvciArICdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHZhbHVlIG9mIGEgY2hlY2tib3guXG4gICAgICogQHBhcmFtIHtKUXVlcnl8bnVsbHx1bmRlZmluZWR9ICRjaGVja2JveEVsZW1lbnRcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0Q2hlY2tib3hWYWx1ZSgkY2hlY2tib3hFbGVtZW50KSB7XG4gICAgICAgICRjaGVja2JveEVsZW1lbnQgPSAkY2hlY2tib3hFbGVtZW50IHx8IG51bGw7XG4gICAgICAgIGlmICgkY2hlY2tib3hFbGVtZW50ID09PSBudWxsIHx8ICEkY2hlY2tib3hFbGVtZW50Lmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuICEhJGNoZWNrYm94RWxlbWVudFswXS5jaGVja2VkO1xuICAgIH1cbn1cbiIsImV4cG9ydCB2YXIgTm90aWZpY2F0aW9uUG9zaXRpb247XG4oZnVuY3Rpb24gKE5vdGlmaWNhdGlvblBvc2l0aW9uKSB7XG4gICAgTm90aWZpY2F0aW9uUG9zaXRpb25bXCJUT1BcIl0gPSBcInRvcFwiO1xuICAgIE5vdGlmaWNhdGlvblBvc2l0aW9uW1wiUklHSFRcIl0gPSBcInJpZ2h0XCI7XG4gICAgTm90aWZpY2F0aW9uUG9zaXRpb25bXCJCT1RUT01cIl0gPSBcImJvdHRvbVwiO1xuICAgIE5vdGlmaWNhdGlvblBvc2l0aW9uW1wiTEVGVFwiXSA9IFwibGVmdFwiO1xufSkoTm90aWZpY2F0aW9uUG9zaXRpb24gfHwgKE5vdGlmaWNhdGlvblBvc2l0aW9uID0ge30pKTtcbiIsImV4cG9ydCB2YXIgTm90aWZpY2F0aW9uVHlwZTtcbihmdW5jdGlvbiAoTm90aWZpY2F0aW9uVHlwZSkge1xuICAgIE5vdGlmaWNhdGlvblR5cGVbXCJXQVJOXCJdID0gXCJ3YXJuXCI7XG4gICAgTm90aWZpY2F0aW9uVHlwZVtcIklORk9cIl0gPSBcImluZm9cIjtcbiAgICBOb3RpZmljYXRpb25UeXBlW1wiRVJST1JcIl0gPSBcImVycm9yXCI7XG4gICAgTm90aWZpY2F0aW9uVHlwZVtcIlNVQ0NFU1NcIl0gPSBcInN1Y2Nlc3NcIjtcbn0pKE5vdGlmaWNhdGlvblR5cGUgfHwgKE5vdGlmaWNhdGlvblR5cGUgPSB7fSkpO1xuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IFRlc3REYXRhUHJlcGFyZXIgfSBmcm9tIFwiLi4vLi4vcG9zdC1zZXR0aW5ncy10cy9hcHAvVGVzdERhdGFQcmVwYXJlclwiO1xuaW1wb3J0IHsgTm90aWZpZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uLXRzL05vdGlmaWVyXCI7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25UeXBlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi10cy9lbnVtL05vdGlmaWNhdGlvblR5cGVcIjtcbmltcG9ydCB7IE9wdGlvbnNCb3hWYXJpYWJsZXMgfSBmcm9tIFwiLi9PcHRpb25zQm94VmFyaWFibGVzXCI7XG5pbXBvcnQgeyBUYWJGYWN0b3J5IH0gZnJvbSBcIi4vVGFiRmFjdG9yeVwiO1xuaW1wb3J0IHsgVGFiTmFtZSB9IGZyb20gXCIuL2VudW1zL1RhYk5hbWVcIjtcbmltcG9ydCB7IE9iamVjdFNlcmlhbGl6ZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uLXRzL09iamVjdFNlcmlhbGl6ZXJcIjtcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi10cy9VdGlsc1wiO1xuaW1wb3J0IHsgT3B0aW9uc0JveENvbmZpZyB9IGZyb20gXCIuL09wdGlvbnNCb3hDb25maWdcIjtcbmltcG9ydCB7IE9wdGlvbnNCb3hUeXBlIH0gZnJvbSBcIi4vZW51bXMvT3B0aW9uc0JveFR5cGVcIjtcbmltcG9ydCB7IEV2ZW50VHlwZSB9IGZyb20gXCIuLi8uLi9jb21tb24tdHMvRXZlbnRUeXBlXCI7XG5leHBvcnQgY2xhc3MgT3B0aW9uc0JveCB7XG4gICAgLyoqIFRoaXMgaXMgYSBzaW5nbGV0b24uICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuJGN1cnJlbnRCdXR0b24gPSBudWxsO1xuICAgICAgICB0aGlzLiRsYXRlc3RUZXN0QnV0dG9uQ2xpY2tFdmVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuY29udGVudFJldHJpZXZhbEluUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50YWJIYW5kbGVycyA9IFtdO1xuICAgICAgICB0aGlzLmFsbFRhYkhhbmRsZXJzID0gW107XG4gICAgICAgIHRoaXMuYWxsVGFiSGFuZGxlck5hbWVzID0gW107XG4gICAgICAgIHRoaXMuY29uZmlnID0gbnVsbDtcbiAgICAgICAgLyoqIFN0b3JlcyB0aGUgcG9zaXRpb24gb2YgdGhlIHNjcm9sbCB3aGVuIHRoZSBvcHRpb25zIGJveCBpcyBvcGVuZWQgKi9cbiAgICAgICAgdGhpcy5zY3JvbGxQb3MgPSBudWxsO1xuICAgICAgICAvKiogU3RvcmVzIHRoZSBwcmV2aW91cyBib3ggdHlwZSAqL1xuICAgICAgICB0aGlzLnByZXZCb3hUeXBlID0gbnVsbDtcbiAgICAgICAgLyoqIFN0b3JlcyB3aGljaCB0YWJzIGFyZSBhdmFpbGFibGUgZm9yIHdoaWNoIGJveCB0eXBlICovXG4gICAgICAgIHRoaXMuYm94VHlwZVRhYk5hbWVzID0gbmV3IE1hcCgpXG4gICAgICAgICAgICAuc2V0KE9wdGlvbnNCb3hUeXBlLkRFRiwgW1xuICAgICAgICAgICAgVGFiTmFtZS5GSU5EX1JFUExBQ0UsXG4gICAgICAgICAgICBUYWJOYW1lLkdFTkVSQUwsXG4gICAgICAgICAgICBUYWJOYW1lLkNBTENVTEFUSU9OUyxcbiAgICAgICAgICAgIFRhYk5hbWUuVEVNUExBVEVTLFxuICAgICAgICAgICAgVGFiTmFtZS5OT1RFUyxcbiAgICAgICAgICAgIFRhYk5hbWUuSU1QT1JUX0VYUE9SVCxcbiAgICAgICAgXSlcbiAgICAgICAgICAgIC5zZXQoT3B0aW9uc0JveFR5cGUuRklMRSwgW1xuICAgICAgICAgICAgVGFiTmFtZS5GSUxFX0ZJTkRfUkVQTEFDRSxcbiAgICAgICAgICAgIFRhYk5hbWUuRklMRV9PUEVSQVRJT05TLFxuICAgICAgICAgICAgVGFiTmFtZS5GSUxFX1RFTVBMQVRFUyxcbiAgICAgICAgICAgIFRhYk5hbWUuTk9URVMsXG4gICAgICAgICAgICBUYWJOYW1lLklNUE9SVF9FWFBPUlQsXG4gICAgICAgIF0pO1xuICAgICAgICB0aGlzLnRlc3REYXRhUHJlcGFyZXIgPSBUZXN0RGF0YVByZXBhcmVyLmdldEluc3RhbmNlKCk7XG4gICAgICAgIHRoaXMub2J2ID0gT3B0aW9uc0JveFZhcmlhYmxlcy5nZXRJbnN0YW5jZSgpO1xuICAgICAgICAvLyBJbml0aWFsaXplXG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGluc3RhbmNlLlxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UgPT09IG51bGwpXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gbmV3IE9wdGlvbnNCb3goKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIHRoZSBvcHRpb25zIGJveFxuICAgICAqL1xuICAgIGluaXQoKSB7XG4gICAgICAgIC8vIEluaXRpYWxpemUgb2JqZWN0IHNlcmlhbGl6ZXJcbiAgICAgICAgT2JqZWN0U2VyaWFsaXplci5nZXRJbnN0YW5jZSgpO1xuICAgICAgICAvKlxuICAgICAgICAgKiBSRUdJU1RFUiBFVkVOVCBIQU5ETEVSU1xuICAgICAgICAgKi9cbiAgICAgICAgLy8gSGlkZSB0aGUgYm94IHdoZW4gb3V0c2lkZSBpcyBjbGlja2VkXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdtb3VzZXVwJywgdGhpcy5vYnYub3B0aW9uc0JveE1haW5Db250YWluZXJTZWxlY3RvciwgZSA9PiB0aGlzLm9uQ2xpY2tPdXRzaWRlKGUpKTtcbiAgICAgICAgLy8gSGFuZGxlIGtleSBwcmVzc2VzXG4gICAgICAgICQoZG9jdW1lbnQpLmtleXVwKChlKSA9PiB7XG4gICAgICAgICAgICBsZXQgS0VZX0VTQ0FQRSA9IDI3O1xuICAgICAgICAgICAgLy8gSGlkZSB0aGUgYm94IHdoZW4gRVNDIGtleSBpcyBwcmVzc2VkXG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfRVNDQVBFKVxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFNob3cgdGhlIGJveCB3aGVuIHRoZSBvcHRpb25zIGJveCBidXR0b24gaXMgY2xpY2tlZC5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgdGhpcy5vYnYub3B0aW9uc0JveEJ1dHRvblNlbGVjdG9yLCBlID0+IHRoaXMuc2hvd0JveChlKSk7XG4gICAgICAgIC8vIEFjdGl2YXRlIGEgdGFiXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIHRoaXMub2J2LnRhYkhhbmRsZVNlbGVjdG9yLCBlID0+IHRoaXMub25DbGlja1RhYihlKSk7XG4gICAgICAgIC8vIEhhbmRsZSB0ZXN0IGJ1dHRvbiBjbGlja3NcbiAgICAgICAgJCh0aGlzLm9idi5vcHRpb25zQm94TWFpbkNvbnRhaW5lclNlbGVjdG9yKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIHRoaXMub2J2LnNlbGVjdG9yVGVzdEJ1dHRvbiwgKGUpID0+IHRoaXMub25DbGlja1Rlc3RCdXR0b24oZSkpO1xuICAgICAgICAvLyBIYW5kbGUgaW52YWxpZGF0ZSB0ZXN0IGRhdGEgYnV0dG9uIGNsaWNrc1xuICAgICAgICAkKHRoaXMub2J2LnNlbGVjdG9yVGVzdERhdGFQcmVzZW50ZXJDb250YWluZXIpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgJy4nICsgdGhpcy5vYnYuY2xhc3NJbnZhbGlkYXRlVGVzdERhdGEsIGUgPT4gdGhpcy5vbkNsaWNrSW52YWxpZGF0ZVRlc3REYXRhKGUpKTtcbiAgICAgICAgLy8gSGFuZGxlIHRlc3QgZGF0YSBoZWFkZXIgY2xpY2tzXG4gICAgICAgICQodGhpcy5vYnYuc2VsZWN0b3JUZXN0RGF0YVByZXNlbnRlckNvbnRhaW5lcilcbiAgICAgICAgICAgIC5vbignY2xpY2snLCAnLicgKyB0aGlzLm9idi5jbGFzc1Rlc3REYXRhUHJlc2VudGVySGVhZGVyLCBlID0+IHRoaXMub25DbGlja1Rlc3REYXRhUHJlc2VudGVySGVhZGVyKGUpKTtcbiAgICAgICAgLy8gU2V0IHRoZSBjb25maWdcbiAgICAgICAgdGhpcy5jb25maWcgPSBPcHRpb25zQm94Q29uZmlnLmdldEluc3RhbmNlKCk7XG4gICAgICAgIC8vIEluaXRpYWxpemUgYWxsIHRhYiBoYW5kbGVyc1xuICAgICAgICB0aGlzLmluaXRBbGxUYWJIYW5kbGVycygpO1xuICAgICAgICAvLyBJbml0aWFsaXplIHN1bW1hcnkgdG9vbHRpcHMgZm9yIGFsbCBvcHRpb25zIGJveCBidXR0b25zIHdoZW4gdGhlIGRvY3VtZW50IGlzIHJlYWR5LlxuICAgICAgICB0aGlzLmluaXRBbGxPcHRpb25zQm94QnV0dG9uVG9vbHRpcHMoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGlkZXMgdGhlIGJveFxuICAgICAqIEBwYXJhbSBldmVudCBDbGljayBldmVudFxuICAgICAqL1xuICAgIG9uQ2xpY2tPdXRzaWRlKGV2ZW50KSB7XG4gICAgICAgIC8vIElmIHRoZSB0YXJnZXQgZWxlbWVudCBpcyB0aGUgY29udGFpbmVyXG4gICAgICAgIGlmICgkKGV2ZW50LnRhcmdldCkuaGFzQ2xhc3ModGhpcy5vYnYub3B0aW9uc0JveE1haW5Db250YWluZXJDbGFzcykpIHtcbiAgICAgICAgICAgIC8vIENsb3NlIHRoZSBjb250YWluZXJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbG9zZXMgdGhlIG9wdGlvbnMgYm94XG4gICAgICovXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIC8vIEdldCB0aGUgb3B0aW9ucyBib3ggY29udGFpbmVyXG4gICAgICAgIGxldCAkY29udGFpbmVyID0gJCh0aGlzLm9idi5vcHRpb25zQm94TWFpbkNvbnRhaW5lclNlbGVjdG9yKTtcbiAgICAgICAgLy8gSWYgaXQgaXMgYWxyZWFkeSBoaWRkZW4sIHN0b3AuXG4gICAgICAgIGlmICgkY29udGFpbmVyLmhhc0NsYXNzKFwiaGlkZGVuXCIpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvLyBIaWRlIHRoZSBib3hcbiAgICAgICAgJGNvbnRhaW5lci5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIC8vIFNhdmUgdGhlIHN0YXRlXG4gICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgICAgIGZsYXNoQmFja2dyb3VuZCh0aGlzLiRjdXJyZW50QnV0dG9uKTtcbiAgICAgICAgLy8gSW52YWxpZGF0ZSBnbG9iYWwgdmFyaWFibGUgdGhhdCBzdG9yZXMgdGhlIHJlZmVyZW5jZSBmb3IgdGhlIGN1cnJlbnQgb3B0aW9ucyBib3ggYnV0dG9uLCBzaW5jZSB0aGVcbiAgICAgICAgLy8gb3B0aW9ucyBib3ggaXMgY2xvc2VkIG5vdy5cbiAgICAgICAgd2luZG93LiRsYXN0Q2xpY2tlZE9wdGlvbnNCb3hCdXR0b24gPSBudWxsO1xuICAgICAgICAvLyBJbnZhbGlkYXRlIHRoZSBnbG9iYWwgb3B0aW9ucyBib3ggdmFyaWFibGUsIHNpbmNlIHRoZSBvcHRpb25zIGJveCBpcyBjbG9zZWQuXG4gICAgICAgIHdpbmRvdy5vcHRpb25zQm94ID0gdW5kZWZpbmVkO1xuICAgICAgICAvLyBSZXN0b3JlIHRoZSBzY3JvbGwgcG9zaXRpb25cbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbFRvcCh0aGlzLnNjcm9sbFBvcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNob3dzIHRoZSBib3hcbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKi9cbiAgICBzaG93Qm94KGV2ZW50KSB7XG4gICAgICAgIC8vIEdldCB0aGUgY3VycmVudCBzY3JvbGwgcG9zaXRpb25cbiAgICAgICAgdGhpcy5zY3JvbGxQb3MgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgIC8vIFN0b3JlIHRoZSBvcHRpb25zIGluIGEgZ2xvYmFsIHZhcmlhYmxlIHNvIHRoYXQgb3RoZXIgc2NyaXB0cyBjYW4gcmVhY2ggaXQgd2hlbiByZXF1aXJlZFxuICAgICAgICB3aW5kb3cub3B0aW9uc0JveCA9IHRoaXM7XG4gICAgICAgIC8vIFNldCB0aGUgbmFtZSBvZiB0aGUgYm94XG4gICAgICAgIHRoaXMuc2V0VGl0bGUodGhpcy5nZXRUYXJnZXRPcHRpb25MYWJlbChldmVudCkpO1xuICAgICAgICAvLyBTZXQgdGhlIGRldGFpbHMgb2YgdGhlIGlucHV0IGZvciB3aGljaCB0aGUgb3B0aW9ucyBib3ggaXMgb3BlbmVkXG4gICAgICAgIHRoaXMuc2V0VGFyZ2V0SW5wdXREZXRhaWxzKHRoaXMuZ2V0VGFyZ2V0SW5wdXRDb250YWluZXIoZXZlbnQpKTtcbiAgICAgICAgLy8gU2V0IHRoZSBjdXJyZW50IGJ1dHRvbiBhbmQgY3VycmVudCBzZXR0aW5ncyBmb3IgT3B0aW9ucyBCb3hcbiAgICAgICAgdGhpcy4kY3VycmVudEJ1dHRvbiA9ICQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KHRoaXMub2J2Lm9wdGlvbnNCb3hCdXR0b25TZWxlY3Rvcik7XG4gICAgICAgIC8vIFByZXBhcmUgdGhlIGNvbmZpZ3VyYXRpb25cbiAgICAgICAgT3B0aW9uc0JveENvbmZpZy5nZXRJbnN0YW5jZSgpLnByZXBhcmUodGhpcy4kY3VycmVudEJ1dHRvbi5kYXRhKCdzZXR0aW5ncycpKTtcbiAgICAgICAgdGhpcy5jb25maWcgPSBPcHRpb25zQm94Q29uZmlnLmdldEluc3RhbmNlKCk7XG4gICAgICAgIC8vIFByZXBhcmUgdGhlIGJveFxuICAgICAgICB0aGlzLnByZXBhcmVUaGVCb3hBY2NvcmRpbmdUb1R5cGUoKTtcbiAgICAgICAgLy8gUmVzdG9yZSBzdGF0ZVxuICAgICAgICB0aGlzLnJlc3RvcmVTdGF0ZSgpO1xuICAgICAgICAvLyBTZXQgdGhlIHZhbHVlIG9mIHRoZSBnbG9iYWwgb3B0aW9ucyBib3ggYnV0dG9uIHZhcmlhYmxlLCBzaW5jZSB0aGUgb3B0aW9ucyBib3ggaXMgYmVpbmcgb3BlbmVkLlxuICAgICAgICB3aW5kb3cuJGxhc3RDbGlja2VkT3B0aW9uc0JveEJ1dHRvbiA9IHRoaXMuJGN1cnJlbnRCdXR0b247XG4gICAgICAgIC8vIFRyaWdnZXIgdGhlIHRhYiBhY3RpdmF0aW9uIGV2ZW50XG4gICAgICAgIHRoaXMudHJpZ2dlclRhYkFjdGl2YXRlZEV2ZW50Rm9yQ3VycmVudFRhYigpO1xuICAgICAgICAvLyBTaG93IHRoZSBib3hcbiAgICAgICAgJCh0aGlzLm9idi5vcHRpb25zQm94TWFpbkNvbnRhaW5lclNlbGVjdG9yKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFByZXBhcmVzIHRoZSBib3ggYWNjb3JkaW5nIHRvIGN1cnJlbnQgc2V0dGluZ3NcbiAgICAgKi9cbiAgICBwcmVwYXJlVGhlQm94QWNjb3JkaW5nVG9UeXBlKCkge1xuICAgICAgICAvLyBJZiB0aGUgY3VycmVudCBib3ggdHlwZSBpcyB0aGUgc2FtZSBhcyB0aGUgcHJldmlvdXMsIG5vIG5lZWQgdG8gcHJlcGFyZSB0aGUgYm94IGFnYWluLlxuICAgICAgICBpZiAodGhpcy5jb25maWcudHlwZSA9PT0gdGhpcy5wcmV2Qm94VHlwZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5wcmV2Qm94VHlwZSA9IHRoaXMuY29uZmlnLnR5cGU7XG4gICAgICAgIC8vIERlZmluZSB0YWIgaGFuZGxlcnNcbiAgICAgICAgdGhpcy50YWJIYW5kbGVycyA9IHRoaXMuYm94VHlwZVRhYk5hbWVzLmdldCh0aGlzLmNvbmZpZy50eXBlKS5tYXAoKG5hbWUpID0+IFRhYkZhY3RvcnkuZ2V0SW5zdGFuY2UobmFtZSkpO1xuICAgICAgICAvLyBIaWRlIGFsbCB0YWJzXG4gICAgICAgICQodGhpcy5vYnYudGFiQ29udGFpbmVyU2VsZWN0b3IgKyAnIC5uYXYtdGFiJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAvLyBIaWRlIGFsbCB0YWIgY29udGVudHNcbiAgICAgICAgJCh0aGlzLm9idi50YWJDb250ZW50c1NlbGVjdG9yKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIC8vIFNob3cgb25seSB0aGUgZmlyc3QgdGFiIGhhbmRsZXIncyBjb250ZW50XG4gICAgICAgIGlmICh0aGlzLnRhYkhhbmRsZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgJCgnIycgKyB0aGlzLnRhYkhhbmRsZXJzWzBdLnRhYklkKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gR2V0IGFjdGl2ZSB0YWIgSURzXG4gICAgICAgIGxldCBhY3RpdmVUYWJJZHMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaGFuZGxlciBvZiB0aGlzLnRhYkhhbmRsZXJzKSB7XG4gICAgICAgICAgICBhY3RpdmVUYWJJZHMucHVzaChoYW5kbGVyLnRhYklkKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDcmVhdGUgYSBzZWxlY3RvciB0aGF0IHNlbGVjdHMgYWN0aXZlIHRhYiBJRHNcbiAgICAgICAgaWYgKGFjdGl2ZVRhYklkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RvclZhbGlkVGFicyA9IGFjdGl2ZVRhYklkcy5tYXAoKGlkKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub2J2LnRhYkNvbnRhaW5lclNlbGVjdG9yICsgJyBbZGF0YS10YWI9XCIjJyArIGlkICsgJ1wiXSc7XG4gICAgICAgICAgICB9KS5qb2luKCcsICcpO1xuICAgICAgICAgICAgLy8gU2hvdyBvbmx5IHRoZSB2YWxpZCBvbmVzXG4gICAgICAgICAgICAkKHNlbGVjdG9yVmFsaWRUYWJzKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICAvLyBBY3RpdmF0ZSB0aGUgZmlyc3QgdGFiIG5vIG1hdHRlciB3aGF0LCBiZWNhdXNlIHRoaXMgaXMgYW5vdGhlciB0eXBlIG9mIG9wdGlvbnMgYm94LlxuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZVRhYihcIiNcIiArIGFjdGl2ZVRhYklkc1swXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgdGFiIGhhbmRsZXJzIGFuZCB0aGVpciBuYW1lcyBmb3IgY2FjaGluZyBwdXJwb3Nlcy5cbiAgICAgKi9cbiAgICBpbml0QWxsVGFiSGFuZGxlcnMoKSB7XG4gICAgICAgIC8vIEdldCBhbGwgdGFiIG5hbWVzXG4gICAgICAgIGxldCB0YWJOYW1lcyA9IFtdO1xuICAgICAgICB0aGlzLmJveFR5cGVUYWJOYW1lcy5mb3JFYWNoKCh2LCBrKSA9PiB7XG4gICAgICAgICAgICB2Lm1hcCgodGFiTmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0YWJOYW1lcy5pbmRleE9mKHRhYk5hbWUpID4gLTEpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB0YWJOYW1lcy5wdXNoKHRhYk5hbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBDb2xsZWN0IHRoZSB0YWIgaW5zdGFuY2VzIGluIGEgc2luZ2xlIGFycmF5XG4gICAgICAgIHRoaXMuYWxsVGFiSGFuZGxlcnMgPSB0YWJOYW1lcy5tYXAoKG5hbWUpID0+IFRhYkZhY3RvcnkuZ2V0SW5zdGFuY2UobmFtZSkpO1xuICAgICAgICBsZXQgaGFuZGxlciwgdGFiSWQsIG5hbWU7XG4gICAgICAgIGxldCAkY29udGFpbmVyID0gdGhpcy5nZXRCb3hDb250YWluZXIoKTtcbiAgICAgICAgbGV0IG5hbWVzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hbGxUYWJIYW5kbGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy8gRWFjaCBoYW5kbGVyIGhhcyBhIHN0YXRlS2V5IGFuZCBhIHRhYklkLlxuICAgICAgICAgICAgaGFuZGxlciA9IHRoaXMuYWxsVGFiSGFuZGxlcnNbaV07XG4gICAgICAgICAgICB0YWJJZCA9IGhhbmRsZXIudGFiSWQ7XG4gICAgICAgICAgICAvLyBHZXQgbmFtZSBvZiB0aGUgdGFiXG4gICAgICAgICAgICBuYW1lID0gJGNvbnRhaW5lci5maW5kKCdbZGF0YS10YWI9XCIjJyArIHRhYklkICsgJ1wiXScpLnRleHQoKTtcbiAgICAgICAgICAgIG5hbWVzLnB1c2gobmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hbGxUYWJIYW5kbGVyTmFtZXMgPSBuYW1lcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBsYWJlbCBvZiB0aGUgb3B0aW9uIGZvciB3aGljaCB0aGUgT3B0aW9ucyBCb3ggYnV0dG9uIGlzIGNsaWNrZWQuXG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICogQHJldHVybiB7alF1ZXJ5fVxuICAgICAqL1xuICAgIGdldFRhcmdldE9wdGlvbkxhYmVsKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgndHInKS5maW5kKCd0ZDpmaXJzdC1jaGlsZCBsYWJlbCcpLnRleHQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBsYWJlbCBvZiB0aGUgb3B0aW9uIGZvciB3aGljaCB0aGUgT3B0aW9ucyBCb3ggYnV0dG9uIGlzIGNsaWNrZWQuXG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICogQHJldHVybiB7alF1ZXJ5fVxuICAgICAqL1xuICAgIGdldFRhcmdldElucHV0Q29udGFpbmVyKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLmlucHV0LWdyb3VwJykuZmluZCgnLmlucHV0LWNvbnRhaW5lcicpLmZpcnN0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGJveCB0aXRsZVxuICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICovXG4gICAgc2V0VGl0bGUobmFtZSkge1xuICAgICAgICAkKHRoaXMub2J2LnRpdGxlU2VsZWN0b3IpLnRleHQobmFtZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGlucHV0IGRldGFpbHMgaW5mb3JtYXRpb25cbiAgICAgKiBAcGFyYW0gJGlucHV0Q29udGFpbmVyXG4gICAgICovXG4gICAgc2V0VGFyZ2V0SW5wdXREZXRhaWxzKCRpbnB1dENvbnRhaW5lcikge1xuICAgICAgICAvLyBGaW5kIHRoZSBpbnB1dHMgYW5kIGdldCB0aGVpciB2YWx1ZXNcbiAgICAgICAgbGV0ICRlbDtcbiAgICAgICAgbGV0IHR5cGUsIHJlcztcbiAgICAgICAgbGV0IGRldGFpbEFyciA9IFtdO1xuICAgICAgICAkaW5wdXRDb250YWluZXIuZmluZCgnOmlucHV0Om5vdChbdHlwZT1cImhpZGRlblwiXSknKS5lYWNoKChpLCBlbCkgPT4ge1xuICAgICAgICAgICAgJGVsID0gJChlbCk7XG4gICAgICAgICAgICB0eXBlID0gJGVsLmF0dHIoJ3R5cGUnKTtcbiAgICAgICAgICAgIC8vIEdldCB3aGF0IHNob3VsZCBiZSBzaG93biBhY2NvcmRpbmcgdG8gdGhlIGlucHV0IHR5cGVcbiAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NoZWNrYm94JzpcbiAgICAgICAgICAgICAgICAgICAgcmVzID0gJzxzcGFuIGNsYXNzPVwiZGFzaGljb25zIGRhc2hpY29ucy0nICsgKCRlbFswXS5jaGVja2VkID8gJ3llcycgOiAnbm8nKSArICdcIj48L3NwYW4+JztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmVzID0gJGVsLnZhbCgpIHx8IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoZXJlIGlzIGEgdmFsdWVcbiAgICAgICAgICAgIGlmIChyZXMgPT09IG51bGwgfHwgIXJlcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgLy8gQWRkIHRoZSB2YWx1ZSB0byB0aGUgZGV0YWlsIGFycmF5XG4gICAgICAgICAgICBkZXRhaWxBcnIucHVzaChyZXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gQ29tYmluZSB0aGUgdmFsdWVzXG4gICAgICAgIGxldCByZXN1bHQgPSBkZXRhaWxBcnIucmVkdWNlKChhY2MsIGN1cnIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhY2MgKyAnPGRpdiBjbGFzcz1cInZhbFwiPjxzcGFuPicgKyAoY3Vyci5sZW5ndGggPiA3MiA/IGN1cnIuc3Vic3RyaW5nKDAsIDY5KSArICcuLi4nIDogY3VycikgKyAnPC9zcGFuPjwvZGl2Pic7XG4gICAgICAgIH0sICcnKTtcbiAgICAgICAgLy8gU2V0IHRoZSByZXN1bHRcbiAgICAgICAgJCh0aGlzLm9idi5pbnB1dERldGFpbHNTZWxlY3RvcikuaHRtbChyZXN1bHQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXN0b3JlcyB0aGUgc3RhdGUgb2YgdGhlIG9wdGlvbnMgYm94IGZvciB0aGUgY2xpY2tlZCBidXR0b25cbiAgICAgKi9cbiAgICByZXN0b3JlU3RhdGUoKSB7XG4gICAgICAgIC8vIFNldCB0aGUgZGVmYXVsdHNcbiAgICAgICAgdGhpcy4kbGF0ZXN0VGVzdEJ1dHRvbkNsaWNrRXZlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRlbnRSZXRyaWV2YWxJblByb2dyZXNzID0gZmFsc2U7XG4gICAgICAgIC8vIFJlc3RvcmUgdGhlIHRlc3QgZGF0YVxuICAgICAgICB0aGlzLmZpbGxUZXN0RGF0YVByZXNlbnRlcih0aGlzLmdldE1haW5UZXN0QnV0dG9uUmVzdWx0cygpKTtcbiAgICAgICAgLy8gQ2xpY2sgYWxsIGhpZGUgYnV0dG9ucyBleGlzdGluZyBpbiB0aGUgdGFiIGNvbnRhaW5lcnMgdG8gaGlkZSBhbnkgZXhpc3RpbmcgcHJldmlvdXMgdGVzdCByZXN1bHRcbiAgICAgICAgdGhpcy5nZXRCb3hDb250YWluZXIoKS5maW5kKCcudGVzdC1yZXN1bHRzID4gLmhpZGUtdGVzdC1yZXN1bHRzOmZpcnN0LWNoaWxkJykuY2xpY2soKTtcbiAgICAgICAgLy8gR2V0IHRoZSBkYXRhIHRvIHJlc3RvcmUgdGhlIHN0YXRlXG4gICAgICAgIGxldCBzdGF0ZVZhbCA9IHRoaXMuZ2V0T3B0aW9uc0JveElucHV0KCkudmFsKCkgfHwgbnVsbDtcbiAgICAgICAgLy8gSWYgc3RhdGVWYWwgaXMgbm90IHZhbGlkLCBzZXQgYSB2YWxpZCB2YWx1ZSB0byBpdC5cbiAgICAgICAgaWYgKHN0YXRlVmFsID09PSBudWxsIHx8ICFzdGF0ZVZhbC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHN0YXRlVmFsID0gJ3t9JztcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGF0YSA9IHt9O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIHZhbHVlIGNvdWxkIG5vdCBiZSBwYXJzZWQsIGFuIGV4Y2VwdGlvbiB3aWxsIGJlIHRocm93bi5cbiAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKHN0YXRlVmFsKTtcbiAgICAgICAgICAgIC8vIGwoXCJSZXN0b3JlIHN0YXRlIGZyb206XCIpO1xuICAgICAgICAgICAgLy8gbChkYXRhKTtcbiAgICAgICAgICAgIC8vIGwodGhpcy50YWJIYW5kbGVycyk7XG4gICAgICAgICAgICB0aGlzLnJlc3RvcmVUYWJTdGF0ZXMoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIE5vdGlmeSBpZiBKU09OIGNvdWxkIG5vdCBiZSBwYXJzZWQuXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdTdGF0ZSBjb3VsZCBub3QgYmUgcGFyc2VkLicsIHN0YXRlVmFsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXN0b3JlIHN0YXRlcyBvZiB0aGUgdGFic1xuICAgICAqIEBwYXJhbSBzdGF0ZVxuICAgICAqL1xuICAgIHJlc3RvcmVUYWJTdGF0ZXMoc3RhdGUpIHtcbiAgICAgICAgLy8gUmVzdG9yZSB0aGUgc3RhdGUgb2YgZWFjaCB0YWJcbiAgICAgICAgbGV0IGN1cnJlbnRUYWJIYW5kbGVyO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudGFiSGFuZGxlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGN1cnJlbnRUYWJIYW5kbGVyID0gdGhpcy50YWJIYW5kbGVyc1tpXTtcbiAgICAgICAgICAgIC8vIFJlc3RvcmUgdGhlIHN0YXRlXG4gICAgICAgICAgICBjdXJyZW50VGFiSGFuZGxlci5yZXN0b3JlU3RhdGUoc3RhdGVbY3VycmVudFRhYkhhbmRsZXIuc3RhdGVLZXldIHx8IHt9LCB0aGlzLmNvbmZpZy5nZXRUYWJTZXR0aW5ncyhjdXJyZW50VGFiSGFuZGxlci5zdGF0ZUtleSkgfHwge30pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNhdmVzIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBvcHRpb25zIGJveCB0byB0aGUgYnV0dG9uIHRoYXQgb3BlbmVkIHRoZSBvcHRpb25zIGJveFxuICAgICAqIEByZXR1cm4ge29iamVjdH0gQ3VycmVudCBzdGF0ZSBvZiB0aGUgb3B0aW9ucyBib3hcbiAgICAgKi9cbiAgICBzYXZlU3RhdGUoKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiU2F2ZSBzdGF0ZVwiKTtcbiAgICAgICAgbGV0IHN0YXRlID0ge30sIGN1cnJlbnRUYWJIYW5kbGVyO1xuICAgICAgICAvLyBDb2xsZWN0IHRoZSBzdGF0ZSBmcm9tIGFsbCB0YWJzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50YWJIYW5kbGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY3VycmVudFRhYkhhbmRsZXIgPSB0aGlzLnRhYkhhbmRsZXJzW2ldO1xuICAgICAgICAgICAgc3RhdGVbY3VycmVudFRhYkhhbmRsZXIuc3RhdGVLZXldID0gY3VycmVudFRhYkhhbmRsZXIuc2F2ZVN0YXRlKCkgfHwge307XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2V0IHRoZSB0eXBlIG9mIHRoZSBvcHRpb25zIGJveFxuICAgICAgICBzdGF0ZVsnYm94J10gPSB7XG4gICAgICAgICAgICAndHlwZSc6IHRoaXMuY29uZmlnLnR5cGVcbiAgICAgICAgfTtcbiAgICAgICAgLy8gbChcIk5ldyBzdGF0ZTpcIik7XG4gICAgICAgIC8vIGwoc3RhdGUpO1xuICAgICAgICAvLyBsKHRoaXMudGFiSGFuZGxlcnMpO1xuICAgICAgICAvLyBTZXQgb3B0aW9ucyBib3ggYnV0dG9uIHRvb2x0aXAsIHNob3dpbmcgYSBzdW1tYXJ5IG9mIHRoZSBzZXR0aW5ncy5cbiAgICAgICAgdGhpcy5zZXRDdXJyZW50T3B0aW9uc0JveEJ1dHRvblN1bW1hcnkoc3RhdGUpO1xuICAgICAgICAvLyBTdG9yZSB0aGUgc3RhdGUgaW4gdGhlIGNsaWNrZWQgb3B0aW9ucyBib3gncyBpbnB1dFxuICAgICAgICB0aGlzLmdldE9wdGlvbnNCb3hJbnB1dCgpLnZhbChKU09OLnN0cmluZ2lmeShzdGF0ZSkpO1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFjdGl2YXRlcyBhIHRhYi5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGFiU2VsZWN0b3JcbiAgICAgKi9cbiAgICBhY3RpdmF0ZVRhYih0YWJTZWxlY3Rvcikge1xuICAgICAgICAvLyBGaXJzdCwgZGVhY3RpdmF0ZSBhbGwgdGFicy5cbiAgICAgICAgdGhpcy5kZWFjdGl2YXRlQWxsVGFicygpO1xuICAgICAgICAvLyBTaG93IHRoZSB0YWIgY29udGFpbmVyXG4gICAgICAgIGxldCAkYm94Q29udGFpbmVyID0gdGhpcy5nZXRCb3hDb250YWluZXIoKTtcbiAgICAgICAgJGJveENvbnRhaW5lci5maW5kKHRhYlNlbGVjdG9yKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIC8vIFNldCB0aGUgdGFiJ3MgaGFuZGxlIGFzIGFjdGl2ZVxuICAgICAgICB0aGlzLmdldFRhYkNvbnRhaW5lcigpLmZpbmQoJ1tkYXRhLXRhYj1cIicgKyB0YWJTZWxlY3RvciArICdcIl0nKS5hZGRDbGFzcygnbmF2LXRhYi1hY3RpdmUnKTtcbiAgICAgICAgdGhpcy5jdXJyZW50QWN0aXZlVGFiSWQgPSB0YWJTZWxlY3Rvci5yZXBsYWNlKCcjJywgJycpO1xuICAgICAgICAvLyBUcmlnZ2VyIHRoZSB0YWIgYWN0aXZhdGlvbiBldmVudFxuICAgICAgICB0aGlzLnRyaWdnZXJUYWJBY3RpdmF0ZWRFdmVudEZvckN1cnJlbnRUYWIoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVhY3RpdmF0ZXMgYWxsIHRhYnNcbiAgICAgKi9cbiAgICBkZWFjdGl2YXRlQWxsVGFicygpIHtcbiAgICAgICAgLy8gSGlkZSBhbGwgdGFiIGNvbnRhaW5lcnNcbiAgICAgICAgdGhpcy5nZXRCb3hDb250YWluZXIoKS5maW5kKCcudGFiJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAvLyBNYWtlIGFsbCBvZiB0aGUgdGFiIGhhbmRsZXMgbm90IGFjdGl2ZVxuICAgICAgICB0aGlzLmdldFRhYkNvbnRhaW5lcigpLmZpbmQoJ2EnKS5yZW1vdmVDbGFzcygnbmF2LXRhYi1hY3RpdmUnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBjbGljayBldmVudHMgdHJpZ2dlcmVkIG9uIHRhYnNcbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKi9cbiAgICBvbkNsaWNrVGFiKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIC8vIEFjdGl2YXRlIHRoZSB0YWIuIEZpbmQgdGhlIGNsb3Nlc3QgJy5uYXYtdGFiJyBiZWNhdXNlIGlmIGFuIGVsZW1lbnQgaW4gYSAubmF2LXRhYiBpcyBjbGlja2VkLCB0aGUgZXZlbnRcbiAgICAgICAgLy8gd2lsbCBwb2ludCB0aGF0IGVsZW1lbnQuIEluIHRoYXQgY2FzZSwgd2UgY2Fubm90IGdldCAnZGF0YS10YWInIHZhbHVlLiBJbnN0ZWFkLCB3ZSBnZXQgdW5kZWZpbmVkLlxuICAgICAgICB0aGlzLmFjdGl2YXRlVGFiKCQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcubmF2LXRhYicpLmRhdGEoJ3RhYicpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRhYiBjb250YWluZXIgYXMgalF1ZXJ5IGVsZW1lbnRcbiAgICAgKiBAcmV0dXJuIHsqfGpRdWVyeXxIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICBnZXRUYWJDb250YWluZXIoKSB7XG4gICAgICAgIHJldHVybiAkKHRoaXMub2J2LnRhYkNvbnRhaW5lclNlbGVjdG9yKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IGJveCBjb250YWluZXIgYXMgalF1ZXJ5IG9iamVjdC5cbiAgICAgKiBAcmV0dXJuIHsqfGpRdWVyeXxIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICBnZXRCb3hDb250YWluZXIoKSB7XG4gICAgICAgIHJldHVybiAkKHRoaXMub2J2Lm9wdGlvbnNCb3hNYWluQ29udGFpbmVyU2VsZWN0b3IpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGlucHV0IHRoYXQgc3RvcmVzIHRoZSB2YWx1ZXMgb2Ygb3B0aW9ucyBib3hcbiAgICAgKiBAcmV0dXJuIHsqfVxuICAgICAqL1xuICAgIGdldE9wdGlvbnNCb3hJbnB1dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGN1cnJlbnRCdXR0b24uZmluZCgnaW5wdXRbdHlwZT1oaWRkZW5dJykuZmlyc3QoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBjbGlja3Mgb2YgdGhlIHRlc3QgYnV0dG9ucyBpbiB0aGUgb3B0aW9ucyBib3hcbiAgICAgKiBAcGFyYW0gZVxuICAgICAqL1xuICAgIG9uQ2xpY2tUZXN0QnV0dG9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlRlc3QgYnV0dG9uIGNsaWNrZWRcIik7XG4gICAgICAgIC8vIFN0b3JlIHRoZSBldmVudFxuICAgICAgICB0aGlzLiRsYXRlc3RUZXN0QnV0dG9uQ2xpY2tFdmVudCA9IGU7XG4gICAgICAgIGxldCAkdGVzdEJ1dHRvbiA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJ2J1dHRvbicpO1xuICAgICAgICAkdGVzdEJ1dHRvbi5hZGRDbGFzcyhcImxvYWRpbmdcIik7XG4gICAgICAgIC8vIEdldCB0by1iZS10ZXN0ZWQgZGF0YVxuICAgICAgICBsZXQgZGF0YVRvQmVUZXN0ZWQgPSB0aGlzLmdldERhdGFUb0JlVGVzdGVkKCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGFUb0JlVGVzdGVkKTtcbiAgICAgICAgLy8gSWYgdGhlIGRhdGEgaXMgbnVsbCwgdGhlcmUgaXMgYW4gQUpBWCByZXF1ZXN0IGdvaW5nIG9uLlxuICAgICAgICBpZiAoZGF0YVRvQmVUZXN0ZWQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIFN0b3AgZnVydGhlciB0cmlnZ2Vycy4gV2UgYXJlIGhhbmRsaW5nIHRoZSBqb2IgY3VycmVudGx5IHdpdGggYW4gQUpBWCByZXF1ZXN0LlxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBXZSBoYXZlIHRoZSBkYXRhIG5vdy5cbiAgICAgICAgLy8gU2F2ZSB0aGUgc3RhdGUgc28gdGhhdCB3ZSBjYW4gc2VuZCB0aGUgbGF0ZXN0IG9wdGlvbnMgY29uZmlndXJlZCBpbiB0aGUgb3B0aW9ucyBib3ggd2l0aCB0aGUgQUpBWCByZXF1ZXN0LlxuICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgICAgICAvLyBSZW1vdmUgdGhlIGxvYWRpbmcgY2xhc3MgZnJvbSB0aGUgdGVzdCBidXR0b24uXG4gICAgICAgICR0ZXN0QnV0dG9uLnJlbW92ZUNsYXNzKFwibG9hZGluZ1wiKTtcbiAgICAgICAgLy8gTGV0IHRoZSBldmVudCBidWJibGluZyBoYW5kbGUgdGhlIHJlc3QuIFNvLCBmcm9tIHRoaXMgcG9pbnQgb24sIHRoZSBtYWluIGNsaWNrIGhhbmRsZXIgb2YgdGhlIHRlc3RcbiAgICAgICAgLy8gYnV0dG9uIGlzIHJlc3BvbnNpYmxlLlxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGRhdGEgdG8gYmUgdXNlZCB3aGVuIHRoZSB1c2VyIGNsaWNrcyB0aGUgdGVzdCBidXR0b25zIGluIHRoZSBvcHRpb25zIGJveFxuICAgICAqXG4gICAgICogQHJldHVybiB7Ym9vbGVhbnxudWxsfG9iamVjdHxhcnJheX0gSWYgcmV0dXJucyBmYWxzZSwgdGhlcmUgaXMgYW4gZXJyb3IuIElmIG51bGwsIHRoZXJlIGlzIGFuIEFKQVggcmVxdWVzdC5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3RoZXJ3aXNlLCBpdCByZXR1cm5zIHRoZSBkYXRhIHRvIGJlIHRlc3RlZC5cbiAgICAgKi9cbiAgICBnZXREYXRhVG9CZVRlc3RlZCgpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJnZXQgZGF0YSB0byBiZSB0ZXN0ZWQuXCIpO1xuICAgICAgICAvLyBXZSB3aWxsIGZpbmQgdGhlIGNvbnRlbnQgYnkgdXNpbmcgdGhlIHRlc3QgYnV0dG9uIG9mIHRoZSBpbnB1dCBncm91cCB3aG9zZSBvcHRpb25zIGJveCBpcyBjdXJyZW50bHkgb3BlblxuICAgICAgICBsZXQgJHRlc3RCdXR0b24gPSB0aGlzLmdldE1haW5UZXN0QnV0dG9uKCk7XG4gICAgICAgIC8vIElmIHRoZSB0ZXN0IGJ1dHRvbiBjb250YWlucyBzb21lIHJlc3VsdHMsIHJldHVybiB0aGVtLiBTbywgbm8gQUpBWCByZXF1ZXN0cyBoZXJlLlxuICAgICAgICBsZXQgcHJldlJlc3VsdHMgPSB0aGlzLmdldE1haW5UZXN0QnV0dG9uUmVzdWx0cygpO1xuICAgICAgICBpZiAocHJldlJlc3VsdHMgIT09IG51bGwgJiYgcHJldlJlc3VsdHMgIT09IHVuZGVmaW5lZCAmJiBwcmV2UmVzdWx0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiBwcmV2UmVzdWx0cztcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGVyZSBpcyBubyByZXN1bHRzLCBtYWtlIGFuIEFKQVggcmVxdWVzdCBhbmQgcmV0cmlldmUgdGhlIHJlc3VsdHMuXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy50ZXN0RGF0YVByZXBhcmVyLnByZXBhcmVUZXN0RGF0YSgkdGVzdEJ1dHRvbik7XG4gICAgICAgIGlmIChkYXRhID09PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBOb3RpZnkgdGhlIHVzZXJcbiAgICAgICAgICAgIE5vdGlmaWVyLmdldEluc3RhbmNlKCkubm90aWZ5UmVndWxhcigkKHRoaXMuJGxhdGVzdFRlc3RCdXR0b25DbGlja0V2ZW50LnRhcmdldCksIHdpbmRvdy53cGNjLnRlc3RfZGF0YV9ub3RfcmV0cmlldmVkKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUZXN0IGRhdGEgY291bGQgbm90IGJlIHJldHJpZXZlZC5cIik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgYSBwcmV2aW91cyByZXRyaWV2YWwgaXMgaW4gcHJvZ3Jlc3MsIHN0b3AuXG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnRSZXRyaWV2YWxJblByb2dyZXNzKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIC8vIFNldCBjb250ZW50IHJldHJpZXZhbCBhcyBpbiBwcm9ncmVzcy5cbiAgICAgICAgdGhpcy5jb250ZW50UmV0cmlldmFsSW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgICAgIGxldCAkZGF0YVByZXNlbnRlckhlYWRlciA9IHRoaXMuZ2V0RGF0YVByZXNlbnRlckhlYWRlcigpO1xuICAgICAgICAkZGF0YVByZXNlbnRlckhlYWRlci5hZGRDbGFzcyhcImxvYWRpbmdcIik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAvLyBSZXRyaWV2ZSB0aGUgdGVzdCBkYXRhIGZyb20gdGhlIG1haW4gdGVzdCBidXR0b25cbiAgICAgICAgJC5wb3N0KHdpbmRvdy5hamF4dXJsLCB7XG4gICAgICAgICAgICB3Y2Nfbm9uY2U6IHRoaXMub2J2LiR3Y2NOb25jZS52YWwoKSxcbiAgICAgICAgICAgIGFjdGlvbjogd2luZG93LnBhZ2VBY3Rpb25LZXksXG4gICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgIH0pXG4gICAgICAgICAgICAuZG9uZSgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZSA9PT0gdW5kZWZpbmVkIHx8ICFyZXNwb25zZSB8fCByZXNwb25zZS52aWV3ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBOb3RpZnkgdGhlIHVzZXJcbiAgICAgICAgICAgICAgICBOb3RpZmllci5nZXRJbnN0YW5jZSgpLm5vdGlmeVJlZ3VsYXIoJCh0aGlzLiRsYXRlc3RUZXN0QnV0dG9uQ2xpY2tFdmVudC50YXJnZXQpLCB3aW5kb3cud3BjYy5jb250ZW50X3JldHJpZXZhbF9yZXNwb25zZV9ub3RfdmFsaWQsIE5vdGlmaWNhdGlvblR5cGUuRVJST1IpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJSZXNwb25zZSBvZiBjb250ZW50IHJldHJpZXZhbCBwcm9jZXNzIGlzIG5vdCB2YWxpZC5cIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gUHV0IHRoZSB2aWV3IGludG8gYSBjb250YWluZXIgc28gdGhhdCB3ZSBjYW4gcXVlcnkgaXQgd2l0aCBDU1Mgc2VsZWN0b3JzLlxuICAgICAgICAgICAgbGV0ICR2aWV3ID0gJChcIjxkaXY+XCIgKyByZXNwb25zZS52aWV3ICsgXCI8L2Rpdj5cIik7XG4gICAgICAgICAgICAvLyBHZXQgdGhlIHJlc3VsdHNcbiAgICAgICAgICAgIGxldCByZXN1bHRzID0gJHZpZXcuZmluZCgndWwnKS5kYXRhKFwicmVzdWx0c1wiKTtcbiAgICAgICAgICAgIC8vIFB1dCB0aGUgcmVzdWx0cyBpbnRvIHRoZSB0ZXN0IGJ1dHRvblxuICAgICAgICAgICAgJHRlc3RCdXR0b24uZGF0YShcInJlc3VsdHNcIiwgcmVzdWx0cyk7XG4gICAgICAgICAgICAvLyBBZGQgdGhlIHRlc3QgZGF0YSB0byB0aGUgcHJlc2VudGVyXG4gICAgICAgICAgICB0aGlzLmZpbGxUZXN0RGF0YVByZXNlbnRlcihyZXN1bHRzKTtcbiAgICAgICAgICAgIC8vIENsaWNrIHRoZSB0ZXN0IGJ1dHRvbiBhZ2FpblxuICAgICAgICAgICAgJCh0aGlzLiRsYXRlc3RUZXN0QnV0dG9uQ2xpY2tFdmVudC50YXJnZXQpLmNsaWNrKCk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuZmFpbChyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAvLyBOb3RpZnkgdGhlIHVzZXJcbiAgICAgICAgICAgIE5vdGlmaWVyLmdldEluc3RhbmNlKCkubm90aWZ5UmVndWxhcigkKHRoaXMuJGxhdGVzdFRlc3RCdXR0b25DbGlja0V2ZW50LnRhcmdldCksIHdpbmRvdy53cGNjLnRlc3RfZGF0YV9yZXRyaWV2YWxfZmFpbGVkLCBOb3RpZmljYXRpb25UeXBlLkVSUk9SKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IocmVzcG9uc2UpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7XG4gICAgICAgICAgICAvLyBDb250ZW50IHJldHJpZXZhbCBwcm9ncmVzcyBoYXMgZmluaXNoZWQuXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRSZXRyaWV2YWxJblByb2dyZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAkZGF0YVByZXNlbnRlckhlYWRlci5yZW1vdmVDbGFzcyhcImxvYWRpbmdcIik7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBSZXR1cm4gbnVsbCB0byBpbmRpY2F0ZSB0aGF0IGFuIEFKQVggcmVxdWVzdCBpcyBpbiBwcm9ncmVzc1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0ZXN0IGJ1dHRvbiBvZiB0aGUgaW5wdXQgZ3JvdXAgZm9yIHdoaWNoIHRoZSBvcHRpb25zIGJveCBpcyBjdXJyZW50IG9wZW5cbiAgICAgKiBAcmV0dXJuIHsqfGpRdWVyeXxIVE1MRWxlbWVudH0gVGhlIHRlc3QgYnV0dG9uXG4gICAgICovXG4gICAgZ2V0TWFpblRlc3RCdXR0b24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRjdXJyZW50QnV0dG9uLmNsb3Nlc3QoJy5pbnB1dC1ncm91cCcpLmZpbmQoJy53Y2MtdGVzdCcpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHJlc3VsdHMgb2YgdGhlIG1haW4gdGVzdCBidXR0b24uIFRoZSByZXN1bHRzIGFyZSBhY3R1YWxseSB0aGUgcmVzdWx0cyBvZiBhIHRlc3QgcHJldmlvdXNseSBjb25kdWN0ZWRcbiAgICAgKiBmb3IgdGhlIGlucHV0IGdyb3VwLCB3aGljaCB0aGUgY3VycmVudCBvcHRpb25zIGJveCBpcyBvcGVuZWQgZm9yLlxuICAgICAqXG4gICAgICogQHJldHVybiB7bnVsbHx1bmRlZmluZWR8c3RyaW5nfGFycmF5fSBSZXN1bHRzIHJldHJpZXZlZCBmcm9tIHRoZSBtYWluIHRlc3QgYnV0dG9uLlxuICAgICAqL1xuICAgIGdldE1haW5UZXN0QnV0dG9uUmVzdWx0cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWFpblRlc3RCdXR0b24oKS5kYXRhKFwicmVzdWx0c1wiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmlsbHMgdGhlIHRlc3QgZGF0YSBwcmVzZW50ZXIgd2l0aCB0aGUgZ2l2ZW4gZGF0YVxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICovXG4gICAgZmlsbFRlc3REYXRhUHJlc2VudGVyKGRhdGEpIHtcbiAgICAgICAgbGV0ICRwcmVzZW50ZXIgPSB0aGlzLmdldFRlc3REYXRhUHJlc2VudGVyQ29udGFpbmVyKCk7XG4gICAgICAgICRwcmVzZW50ZXIuZGF0YShcInJlc3VsdHNcIiwgZGF0YSk7XG4gICAgICAgIGxldCAkZGF0YUNvbnRhaW5lciA9ICRwcmVzZW50ZXIuZmluZCgnLmRhdGEnKS5maXJzdCgpO1xuICAgICAgICAkZGF0YUNvbnRhaW5lci5lbXB0eSgpO1xuICAgICAgICBsZXQgJG51bWJlciA9ICRwcmVzZW50ZXIuZmluZCgnLm51bWJlcicpLmZpcnN0KCk7XG4gICAgICAgIGxldCAkaW52YWxpZGF0ZSA9ICRwcmVzZW50ZXIuZmluZCgnLmludmFsaWRhdGUnKS5maXJzdCgpO1xuICAgICAgICBpZiAoZGF0YSA9PT0gdW5kZWZpbmVkIHx8IGRhdGEgPT09IG51bGwgfHwgIWRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICAkbnVtYmVyLnRleHQoMCk7XG4gICAgICAgICAgICAkaW52YWxpZGF0ZS5hZGRDbGFzcyhcImhpZGRlblwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgJHVsID0gJChcIjx1bCAvPlwiKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAkKFwiPGxpPjxjb2RlPlwiICsgVXRpbHMuZXNjYXBlSHRtbChkYXRhW2ldKSArIFwiPC9jb2RlPjwvbGk+XCIpLmFwcGVuZFRvKCR1bCk7XG4gICAgICAgIH1cbiAgICAgICAgJHVsLmFwcGVuZFRvKCRkYXRhQ29udGFpbmVyKTtcbiAgICAgICAgJG51bWJlci50ZXh0KGRhdGEubGVuZ3RoKTtcbiAgICAgICAgJGludmFsaWRhdGUucmVtb3ZlQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY29udGFpbmVyIHRoYXQgc3RvcmVzIHRoZSB0ZXN0IGRhdGFcbiAgICAgKiBAcmV0dXJuIHtqUXVlcnl9XG4gICAgICovXG4gICAgZ2V0VGVzdERhdGFQcmVzZW50ZXJDb250YWluZXIoKSB7XG4gICAgICAgIHJldHVybiAkKHRoaXMub2J2LnNlbGVjdG9yVGVzdERhdGFQcmVzZW50ZXJDb250YWluZXIpLmZpcnN0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgY2xpY2tzIHRvIHRoZSBpbnZhbGlkYXRlIHRlc3QgZGF0YSBidXR0b24vbGlua1xuICAgICAqIEBwYXJhbSBlXG4gICAgICovXG4gICAgb25DbGlja0ludmFsaWRhdGVUZXN0RGF0YShlKSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMuZmlsbFRlc3REYXRhUHJlc2VudGVyKFtdKTtcbiAgICAgICAgdGhpcy5nZXRNYWluVGVzdEJ1dHRvbigpLmRhdGEoXCJyZXN1bHRzXCIsIG51bGwpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGhlYWRlciBvZiB0aGUgZGF0YSBwcmVzZW50ZXJcbiAgICAgKiBAcmV0dXJuIHtqUXVlcnl9XG4gICAgICovXG4gICAgZ2V0RGF0YVByZXNlbnRlckhlYWRlcigpIHtcbiAgICAgICAgcmV0dXJuICQodGhpcy5vYnYuc2VsZWN0b3JUZXN0RGF0YVByZXNlbnRlckhlYWRlcikuZmlyc3QoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBjbGlja3MgdG8gdGhlIHRlc3QgZGF0YSBwcmVzZW50ZXIgaGVhZGVyXG4gICAgICogQHBhcmFtIGVcbiAgICAgKi9cbiAgICBvbkNsaWNrVGVzdERhdGFQcmVzZW50ZXJIZWFkZXIoZSkge1xuICAgICAgICBsZXQgJGRhdGFDb250YWluZXIgPSAkKHRoaXMub2J2LnNlbGVjdG9yVGVzdERhdGFDb250YWluZXIpLmZpcnN0KCk7XG4gICAgICAgIGlmICgkZGF0YUNvbnRhaW5lci5oYXNDbGFzcyhcImhpZGRlblwiKSkge1xuICAgICAgICAgICAgJGRhdGFDb250YWluZXIucmVtb3ZlQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkZGF0YUNvbnRhaW5lci5hZGRDbGFzcyhcImhpZGRlblwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBtYWluIHRlc3QgYnV0dG9uJ3MgdG9vbHRpcCBzbyB0aGF0IGl0IHNob3dzIGEgc3VtbWFyeSBvZiB0aGUgY29uZmlndXJlZCBzZXR0aW5ncy5cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gc3RhdGUgU3RhdGUgb2YgdGhlIG9wdGlvbnMgYm94XG4gICAgICovXG4gICAgc2V0Q3VycmVudE9wdGlvbnNCb3hCdXR0b25TdW1tYXJ5KHN0YXRlKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmdldE9wdGlvbnNCb3hCdXR0b25TdW1tYXJ5RnJvbVN0YXRlKHN0YXRlKTtcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zQm94QnV0dG9uU3VtbWFyeSh0aGlzLiRjdXJyZW50QnV0dG9uLCByZXN1bHQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBzdW1tYXJ5IG9mIHRoZSBjb25maWd1cmVkIG9wdGlvbnMgaW4gdGhlIG9wdGlvbnMgYm94IHRhYnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gc3RhdGUgT3B0aW9ucyBib3ggc3RhdGUgZm9yIHRoZSBidXR0b25cbiAgICAgKiBAcmV0dXJuIHtvYmplY3R8bnVsbH0gU3VtbWFyeS4gQ29udGFpbnMgdHdvIGl0ZW1zLiAndGl0bGUnIGlzIHRoZSBzdW1tYXJ5IGFzIEhUTUwuICdjb2xvcnMnIGlzIGFuIGFycmF5IG9mIGNvbG9yc1xuICAgICAqIHRoYXQgYmVsb25nIHRvIHRoZSB0YWJzIHRoYXQgaGF2ZSBhIGNvbmZpZ3VyYXRpb25cbiAgICAgKi9cbiAgICBnZXRPcHRpb25zQm94QnV0dG9uU3VtbWFyeUZyb21TdGF0ZShzdGF0ZSkge1xuICAgICAgICBsZXQgaGFuZGxlciwgc3RhdGVLZXksIG5hbWUsIHZhbHVlLCBpLCB0YWJTdGF0ZTtcbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gc3RhdGUsIG5vIG5lZWQgdG8gY3JlYXRlIGEgc3VtbWFyeS5cbiAgICAgICAgaWYgKCQuaXNFbXB0eU9iamVjdChzdGF0ZSkpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgICAgICAvLyBGb3IgZWFjaCB0YWIgaGFuZGxlciwgZmluZCB0aGUgbnVtYmVyIG9mIGl0ZW1zLiBJbiBvdGhlciB3b3JkcywgZmluZCB0aGUgbnVtYmVyIG9mIHNldHRpbmdzIGFkZGVkIHRvXG4gICAgICAgIC8vIGVhY2ggdGFiIHVzaW5nIHRoZSB0YWIgaGFuZGxlcnMuXG4gICAgICAgIGxldCBjb2xvcnMgPSBbXTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMuYWxsVGFiSGFuZGxlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIC8vIEVhY2ggaGFuZGxlciBoYXMgYSBzdGF0ZUtleSBhbmQgYSB0YWJJZC5cbiAgICAgICAgICAgIGhhbmRsZXIgPSB0aGlzLmFsbFRhYkhhbmRsZXJzW2ldO1xuICAgICAgICAgICAgbmFtZSA9IHRoaXMuYWxsVGFiSGFuZGxlck5hbWVzW2ldO1xuICAgICAgICAgICAgc3RhdGVLZXkgPSBoYW5kbGVyLnN0YXRlS2V5O1xuICAgICAgICAgICAgLy8gSWYgdGhlIHN0YXRlIGRvZXMgbm90IGNvbnRhaW4gYSBrZXkgZm9yIHRoZSBjdXJyZW50IHRhYiwgY29udGludWUgd2l0aCB0aGUgbmV4dCBvbmUuXG4gICAgICAgICAgICBpZiAoIXN0YXRlLmhhc093blByb3BlcnR5KHN0YXRlS2V5KSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIHRhYlN0YXRlID0gc3RhdGVbc3RhdGVLZXldO1xuICAgICAgICAgICAgLy8gR2V0IHRoZSBudW1iZXIgb2Ygc2V0dGluZ3MgY29uZmlndXJlZCBmb3IgdGhhdCB0YWJcbiAgICAgICAgICAgIHZhbHVlID0gaGFuZGxlci5nZXRDb25maWd1cmVkT3B0aW9uQ291bnQodGFiU3RhdGUpO1xuICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgYXQgbGVhc3Qgb25lLCBhZGQgYSBuZXcgc3VtbWFyeSBlbnRyeS5cbiAgICAgICAgICAgIGlmICh2YWx1ZSA+IDApIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gJzxsaT48c3BhbiBjbGFzcz1cIm5hbWVcIj4nICsgbmFtZSArICc8L3NwYW4+OiA8c3BhbiBjbGFzcz1cInZhbHVlXCI+JyArIHZhbHVlICsgJzwvc3Bhbj48L2xpPic7XG4gICAgICAgICAgICAgICAgY29sb3JzLnB1c2goaGFuZGxlci5jb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gaXRlbSBhZGRlZCB0byB0aGUgcmVzdWx0LCByZXR1cm4gbnVsbC5cbiAgICAgICAgaWYgKCFyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQgPSBcIjx1bCBjbGFzcz0nb3B0aW9ucy1ib3gtc3VtbWFyeSc+XCIgKyByZXN1bHQgKyBcIjwvdWw+XCI7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0aXRsZTogcmVzdWx0LFxuICAgICAgICAgICAgY29sb3JzOiBjb2xvcnNcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgdG9vbHRpcCBvZiB0aGUgZ2l2ZW4gb3B0aW9ucyBib3ggYnV0dG9uXG4gICAgICogQHBhcmFtICRvcHRpb25zQm94QnV0dG9uIFRoZSBidXR0b25cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gdmFsdWUgQ29udGFpbnMgdHdvIGl0ZW1zLiAndGl0bGUnIGlzIHRoZSBzdW1tYXJ5IGFzIEhUTUwuICdjb2xvcnMnIGlzIGFuIGFycmF5IG9mIGNvbG9yc1xuICAgICAqIHRoYXQgYmVsb25nIHRvIHRoZSB0YWJzIHRoYXQgaGF2ZSBhIGNvbmZpZ3VyYXRpb25cbiAgICAgKi9cbiAgICBzZXRPcHRpb25zQm94QnV0dG9uU3VtbWFyeSgkb3B0aW9uc0JveEJ1dHRvbiwgdmFsdWUpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZSB8fCBudWxsO1xuICAgICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIFRoZSBvcHRpb25zIGJveCBmb3IgdGhpcyBidXR0b24gZG9lcyBub3QgaGF2ZSBhbnkgY29uZmlndXJhdGlvbnMuXG4gICAgICAgICAgICAkb3B0aW9uc0JveEJ1dHRvbi5yZW1vdmVDbGFzcyhcImhhcy1jb25maWdcIik7XG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIHRvb2x0aXBcbiAgICAgICAgICAgIGlmICh0eXBlb2YgJC5mbi50b29sdGlwID09PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgICAgICRvcHRpb25zQm94QnV0dG9uLnRvb2x0aXAoJ2Rlc3Ryb3knKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRoZSBvcHRpb25zIGJveCBmb3IgdGhpcyBidXR0b24gaGFzIGNvbmZpZ3VyYXRpb25zLlxuICAgICAgICAgICAgJG9wdGlvbnNCb3hCdXR0b24uYWRkQ2xhc3MoXCJoYXMtY29uZmlnXCIpO1xuICAgICAgICAgICAgJG9wdGlvbnNCb3hCdXR0b24uZGF0YShcInRvZ2dsZVwiLCBcInRvb2x0aXBcIik7XG4gICAgICAgICAgICAkb3B0aW9uc0JveEJ1dHRvbi5kYXRhKFwiaHRtbFwiLCBcInRydWVcIik7XG4gICAgICAgICAgICAkb3B0aW9uc0JveEJ1dHRvbi5hdHRyKFwidGl0bGVcIiwgdmFsdWUudGl0bGUpO1xuICAgICAgICAgICAgLy8gU2V0L3VwZGF0ZSB0aGUgdG9vbHRpcFxuICAgICAgICAgICAgaWYgKHR5cGVvZiAkLmZuLnRvb2x0aXAgPT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICAgICAgJG9wdGlvbnNCb3hCdXR0b24udG9vbHRpcCgnZml4VGl0bGUnKTtcbiAgICAgICAgICAgIC8vIFNldCB0aGUgY29sb3JzXG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBvbmx5IDEgY29sb3IsIGFkZCB0aGUgc2FtZSBjb2xvciBhZ2FpbiBzbyB0aGF0IHRoZSBDU1MgZ3JhZGllbnQgY2FuIGJlIGNyZWF0ZWQuIEl0IHJlcXVpcmVzXG4gICAgICAgICAgICAvLyBhdCBsZWFzdCB0d28gY29sb3JzLlxuICAgICAgICAgICAgbGV0IGNvbG9ycyA9IHZhbHVlLmNvbG9ycztcbiAgICAgICAgICAgIGlmIChjb2xvcnMubGVuZ3RoID09PSAxKVxuICAgICAgICAgICAgICAgIGNvbG9ycy5wdXNoKGNvbG9yc1swXSk7XG4gICAgICAgICAgICBsZXQgY29sb3JTdHJpbmcgPSBjb2xvcnMuam9pbignLCAnKTtcbiAgICAgICAgICAgICRvcHRpb25zQm94QnV0dG9uLmZpbmQoJy5zdW1tYXJ5LWNvbG9ycycpLmNzcygnYmFja2dyb3VuZC1pbWFnZScsICdsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICcgKyBjb2xvclN0cmluZyArICcpJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgdG9vbHRpcHMgb2YgYWxsIG9wdGlvbnMgYm94IGJ1dHRvbnNcbiAgICAgKi9cbiAgICBpbml0QWxsT3B0aW9uc0JveEJ1dHRvblRvb2x0aXBzKCkge1xuICAgICAgICAkKHRoaXMub2J2Lm9wdGlvbnNCb3hCdXR0b25TZWxlY3RvcikuZWFjaCgoaSwgZWwpID0+IHtcbiAgICAgICAgICAgIGxldCAkYnV0dG9uID0gJChlbCk7XG4gICAgICAgICAgICBsZXQgc3RhdGVWYWwgPSAkYnV0dG9uLmZpbmQoJ2lucHV0W3R5cGU9aGlkZGVuXScpLmZpcnN0KCkudmFsKCkgfHwgbnVsbDtcbiAgICAgICAgICAgIC8vIFN0b3AgaWYgdGhlcmUgaXMgbm8gc3RhdGUgdG8gcmVzdG9yZS5cbiAgICAgICAgICAgIGlmIChzdGF0ZVZhbCA9PT0gbnVsbCB8fCAhc3RhdGVWYWwubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHZhbHVlIGNvdWxkIG5vdCBiZSBwYXJzZWQsIGFuIGV4Y2VwdGlvbiB3aWxsIGJlIHRocm93bi5cbiAgICAgICAgICAgICAgICBsZXQgc3RhdGUgPSBKU09OLnBhcnNlKHN0YXRlVmFsKTtcbiAgICAgICAgICAgICAgICBsZXQgc3VtbWFyeSA9IHRoaXMuZ2V0T3B0aW9uc0JveEJ1dHRvblN1bW1hcnlGcm9tU3RhdGUoc3RhdGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9uc0JveEJ1dHRvblN1bW1hcnkoJGJ1dHRvbiwgc3VtbWFyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIC8vIE5vdGlmeSBpZiBKU09OIGNvdWxkIG5vdCBiZSBwYXJzZWQuXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignU3RhdGUgY291bGQgbm90IGJlIHBhcnNlZC4nLCBzdGF0ZVZhbCwgJGJ1dHRvbik7XG4gICAgICAgICAgICAgICAgTm90aWZpZXIuZ2V0SW5zdGFuY2UoKS5ub3RpZnlSZWd1bGFyKCRidXR0b24sIHdpbmRvdy53cGNjLnN0YXRlX25vdF9wYXJzZWQsIE5vdGlmaWNhdGlvblR5cGUuRVJST1IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVHJpZ2dlcnMge0BsaW5rIEV2ZW50VHlwZS5vcHRpb25zQm94VGFiQWN0aXZhdGVkfSBldmVudC5cbiAgICAgKi9cbiAgICB0cmlnZ2VyVGFiQWN0aXZhdGVkRXZlbnRGb3JDdXJyZW50VGFiKCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50QWN0aXZlVGFiSWQgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIC8vIFRyaWdnZXIgYW4gZXZlbnQgd2l0aCB0aGUgYWN0aXZhdGVkIHRhYiBzZWxlY3Rvci5cbiAgICAgICAgJChkb2N1bWVudCkudHJpZ2dlcihFdmVudFR5cGUub3B0aW9uc0JveFRhYkFjdGl2YXRlZCwgdGhpcy5jdXJyZW50QWN0aXZlVGFiSWQpO1xuICAgIH1cbn1cbk9wdGlvbnNCb3guaW5zdGFuY2UgPSBudWxsO1xuIiwiaW1wb3J0IHsgT3B0aW9uc0JveFR5cGUgfSBmcm9tIFwiLi9lbnVtcy9PcHRpb25zQm94VHlwZVwiO1xuZXhwb3J0IGNsYXNzIE9wdGlvbnNCb3hDb25maWcge1xuICAgIC8qKiBUaGlzIGlzIGEgc2luZ2xldG9uICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMua2V5Qm94ID0gJ2JveCc7XG4gICAgICAgIHRoaXMua2V5VGFicyA9ICd0YWJzJztcbiAgICAgICAgdGhpcy5rZXlUeXBlID0gJ3R5cGUnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGluc3RhbmNlXG4gICAgICovXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZSA9PT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgT3B0aW9uc0JveENvbmZpZygpO1xuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJlcGFyZXMgdGhlIGluc3RhbmNlIGFjY29yZGluZyB0byB0aGUgZ2l2ZW4gY29uZmlndXJhdGlvblxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgT3B0aW9ucyBib3ggY29uZmlndXJhdGlvblxuICAgICAqL1xuICAgIHByZXBhcmUoY29uZmlnKSB7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgICAgICB0aGlzLnByZXBhcmVUeXBlKCk7XG4gICAgfVxuICAgIC8qXG4gICAgICogR0VUVEVSU1xuICAgICAqL1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdHlwZSBvZiB0aGUgb3B0aW9ucyBib3hcbiAgICAgKi9cbiAgICBnZXQgdHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0YWIgc2V0dGluZ3MgdXNpbmcgdGhlIGtleSBvZiBhbiBvcHRpb25zIGJveCB0YWJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGFiS2V5XG4gICAgICovXG4gICAgZ2V0VGFiU2V0dGluZ3ModGFiS2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9iamVjdEdldCh0aGlzLmNvbmZpZywgdGhpcy5rZXlUYWJzICsgJy4nICsgdGFiS2V5KTtcbiAgICB9XG4gICAgLypcbiAgICAgKlxuICAgICAqL1xuICAgIC8qKlxuICAgICAqIFByZXBhcmVzIHRoZSB0eXBlIG9mIHRoZSBvcHRpb25zIGJveFxuICAgICAqL1xuICAgIHByZXBhcmVUeXBlKCkge1xuICAgICAgICAvLyBHZXQgdGhlIHR5cGUgZnJvbSB0aGUgY29uZmlnXG4gICAgICAgIGxldCB0eXBlID0gdGhpcy5vYmplY3RHZXQodGhpcy5jb25maWcsIHRoaXMua2V5Qm94ICsgJy4nICsgdGhpcy5rZXlUeXBlKTtcbiAgICAgICAgdGhpcy5fdHlwZSA9IE9iamVjdC52YWx1ZXMoT3B0aW9uc0JveFR5cGUpLmluY2x1ZGVzKHR5cGUpID8gdHlwZSA6IE9wdGlvbnNCb3hUeXBlLkRFRjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHZhbHVlIGZyb20gYW4gb2JqZWN0IHVzaW5nIGRvdCBub3RhdGlvblxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmogVGhlIG9iamVjdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgRG90IG5vdGF0aW9uLiBFLmcuICdib3gudHlwZScgdG8gZ2V0ICdmaWxlJyBmcm9tIHsnYm94Jzogeyd0eXBlJyA9PiAnZmlsZScgfSB9XG4gICAgICogQHJldHVybiB7bnVsbHxhbnl9XG4gICAgICogQHNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNjM5NDE2OC8yODgzNDg3XG4gICAgICovXG4gICAgb2JqZWN0R2V0KG9iaiwga2V5KSB7XG4gICAgICAgIC8vIFNwbGl0IHRoZSBrZXkgaW50byBpdHMgcGFydHMgdG8gZ2V0IGFuIGFycmF5IG9mIGtleXMuXG4gICAgICAgIHJldHVybiBrZXkuc3BsaXQoJy4nKS5yZWR1Y2UoKGFjYywgY3VycmVudCkgPT4ge1xuICAgICAgICAgICAgLy8gSWYgdGhlIGFjY3VtdWxhdG9yIGlzIG51bGwsIHN0b3AuXG4gICAgICAgICAgICBpZiAoYWNjID09PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIC8vIFRyeSB0byBnZXQgdGhlIGl0ZW0gZnJvbSB0aGUgYWNjdW11bGF0b3IgdXNpbmcgdGhlIGN1cnJlbnQga2V5LiBJZiB0aGUga2V5IGRvZXMgbm90IGV4aXN0LCBzZXQgdGhlXG4gICAgICAgICAgICAvLyBhY2N1bXVsYXRvciB0byBudWxsLlxuICAgICAgICAgICAgcmV0dXJuIGFjYy5oYXNPd25Qcm9wZXJ0eShjdXJyZW50KSA/IGFjY1tjdXJyZW50XSA6IG51bGw7XG4gICAgICAgIH0sIG9iaikgfHwgbnVsbDsgLy8gSWYgYSB2YWxpZCB2YWx1ZSBpcyBub3QgZm91bmQsIHJldHVybiBudWxsLlxuICAgIH1cbn1cbk9wdGlvbnNCb3hDb25maWcuaW5zdGFuY2UgPSBudWxsO1xuIiwiaW1wb3J0ICQgZnJvbSBcImpxdWVyeVwiO1xuZXhwb3J0IGNsYXNzIE9wdGlvbnNCb3hWYXJpYWJsZXMge1xuICAgIC8qKiBUaGlzIGlzIGEgc2luZ2xldG9uLiAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9wdGlvbnNCb3hCdXR0b25TZWxlY3RvciA9ICcud2NjLW9wdGlvbnMtYm94JztcbiAgICAgICAgdGhpcy5vcHRpb25zQm94TWFpbkNvbnRhaW5lckNsYXNzID0gJ29wdGlvbnMtYm94LWNvbnRhaW5lcic7XG4gICAgICAgIHRoaXMub3B0aW9uc0JveE1haW5Db250YWluZXJTZWxlY3RvciA9ICcuJyArIHRoaXMub3B0aW9uc0JveE1haW5Db250YWluZXJDbGFzcztcbiAgICAgICAgdGhpcy5vcHRpb25zQm94U2VsZWN0b3IgPSB0aGlzLm9wdGlvbnNCb3hNYWluQ29udGFpbmVyU2VsZWN0b3IgKyAnID4gLm9wdGlvbnMtYm94JztcbiAgICAgICAgdGhpcy5vcHRpb25zQm94U3ViQ29udGFpbmVyU2VsZWN0b3IgPSB0aGlzLm9wdGlvbnNCb3hTZWxlY3RvciArICcgPiAuYm94LWNvbnRhaW5lcic7XG4gICAgICAgIHRoaXMubm9TY3JvbGxDbGFzcyA9ICduby1zY3JvbGwnO1xuICAgICAgICB0aGlzLnRpdGxlU2VsZWN0b3IgPSB0aGlzLm9wdGlvbnNCb3hTZWxlY3RvciArICcgPiAuYm94LXRpdGxlJztcbiAgICAgICAgdGhpcy5pbnB1dERldGFpbHNTZWxlY3RvciA9IHRoaXMub3B0aW9uc0JveFNlbGVjdG9yICsgJyA+IC5pbnB1dC1kZXRhaWxzJztcbiAgICAgICAgdGhpcy50YWJDb250YWluZXJTZWxlY3RvciA9IHRoaXMub3B0aW9uc0JveFNlbGVjdG9yICsgJyAubmF2LXRhYi13cmFwcGVyJztcbiAgICAgICAgdGhpcy50YWJIYW5kbGVTZWxlY3RvciA9IHRoaXMudGFiQ29udGFpbmVyU2VsZWN0b3IgKyAnIC5uYXYtdGFiJztcbiAgICAgICAgdGhpcy50YWJDb250ZW50c1NlbGVjdG9yID0gdGhpcy5vcHRpb25zQm94U2VsZWN0b3IgKyAnIC50YWItY29udGVudCA+IC50YWInO1xuICAgICAgICB0aGlzLnNlbGVjdG9yVGVzdEJ1dHRvbiA9ICcud2NjLXRlc3QnO1xuICAgICAgICB0aGlzLmlucHV0TmFtZSA9ICdfb3B0aW9uc19ib3gnO1xuICAgICAgICB0aGlzLnNlbGVjdG9yRXhwb3J0VGV4dGFyZWEgPSBcIiNfb3B0aW9uc19ib3hfZXhwb3J0X3NldHRpbmdzXCI7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JJbXBvcnRUZXh0YXJlYSA9IFwiI19vcHRpb25zX2JveF9pbXBvcnRfc2V0dGluZ3NcIjtcbiAgICAgICAgdGhpcy5zZWxlY3RvckltcG9ydFNldHRpbmdzQnV0dG9uID0gJy5vcHRpb25zLWJveC1pbXBvcnQnO1xuICAgICAgICAvLyBUZXN0IGRhdGEgcHJlc2VudGVyXG4gICAgICAgIHRoaXMuc2VsZWN0b3JUZXN0RGF0YVByZXNlbnRlckNvbnRhaW5lciA9ICcjdGVzdC1kYXRhLXByZXNlbnRlcic7XG4gICAgICAgIHRoaXMuY2xhc3NUZXN0RGF0YVByZXNlbnRlckhlYWRlciA9ICdoZWFkZXInO1xuICAgICAgICB0aGlzLnNlbGVjdG9yVGVzdERhdGFQcmVzZW50ZXJIZWFkZXIgPSB0aGlzLnNlbGVjdG9yVGVzdERhdGFQcmVzZW50ZXJDb250YWluZXIgKyAnIC4nICsgdGhpcy5jbGFzc1Rlc3REYXRhUHJlc2VudGVySGVhZGVyO1xuICAgICAgICB0aGlzLmNsYXNzSW52YWxpZGF0ZVRlc3REYXRhID0gJ2ludmFsaWRhdGUnO1xuICAgICAgICB0aGlzLnNlbGVjdG9ySW52YWxpZGF0ZVRlc3REYXRhID0gdGhpcy5zZWxlY3RvclRlc3REYXRhUHJlc2VudGVyQ29udGFpbmVyICsgJy4nICsgdGhpcy5jbGFzc0ludmFsaWRhdGVUZXN0RGF0YTtcbiAgICAgICAgdGhpcy5zZWxlY3RvclRlc3REYXRhQ29udGFpbmVyID0gdGhpcy5zZWxlY3RvclRlc3REYXRhUHJlc2VudGVyQ29udGFpbmVyICsgJyAuZGF0YSc7XG4gICAgICAgIHRoaXMuJHdjY05vbmNlID0gJChcIiN3Y2Nfbm9uY2VcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlID09PSBudWxsKVxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBPcHRpb25zQm94VmFyaWFibGVzKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICAgIH1cbn1cbk9wdGlvbnNCb3hWYXJpYWJsZXMuaW5zdGFuY2UgPSBudWxsO1xuIiwiaW1wb3J0IHsgVGFiTmFtZSB9IGZyb20gXCIuL2VudW1zL1RhYk5hbWVcIjtcbmltcG9ydCB7IENhbGN1bGF0aW9uc1RhYiB9IGZyb20gXCIuL3RhYnMvZGVmYXVsdC9DYWxjdWxhdGlvbnNUYWJcIjtcbmltcG9ydCB7IEZpbmRSZXBsYWNlVGFiIH0gZnJvbSBcIi4vdGFicy9kZWZhdWx0L0ZpbmRSZXBsYWNlVGFiXCI7XG5pbXBvcnQgeyBHZW5lcmFsVGFiIH0gZnJvbSBcIi4vdGFicy9kZWZhdWx0L0dlbmVyYWxUYWJcIjtcbmltcG9ydCB7IEltcG9ydEV4cG9ydFRhYiB9IGZyb20gXCIuL3RhYnMvZGVmYXVsdC9JbXBvcnRFeHBvcnRUYWJcIjtcbmltcG9ydCB7IE5vdGVzVGFiIH0gZnJvbSBcIi4vdGFicy9kZWZhdWx0L05vdGVzVGFiXCI7XG5pbXBvcnQgeyBUZW1wbGF0ZXNUYWIgfSBmcm9tIFwiLi90YWJzL2RlZmF1bHQvVGVtcGxhdGVzVGFiXCI7XG5pbXBvcnQgeyBGaWxlRmluZFJlcGxhY2VUYWIgfSBmcm9tIFwiLi90YWJzL2ZpbGUvRmlsZUZpbmRSZXBsYWNlVGFiXCI7XG5pbXBvcnQgeyBGaWxlT3BlcmF0aW9uc1RhYiB9IGZyb20gXCIuL3RhYnMvZmlsZS9GaWxlT3BlcmF0aW9uc1RhYlwiO1xuaW1wb3J0IHsgRmlsZVRlbXBsYXRlc1RhYiB9IGZyb20gXCIuL3RhYnMvZmlsZS9GaWxlVGVtcGxhdGVzVGFiXCI7XG5leHBvcnQgY2xhc3MgVGFiRmFjdG9yeSB7XG4gICAgLyoqXG4gICAgICogR2V0IGFuIGluc3RhbmNlIGZvciBhIHRhYiB0eXBlLlxuICAgICAqIEBwYXJhbSB7VGFiTmFtZX0gdGFiTmFtZVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSh0YWJOYW1lKSB7XG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZXMuaGFzT3duUHJvcGVydHkodGFiTmFtZSkpIHtcbiAgICAgICAgICAgIGxldCBpbnN0YW5jZTtcbiAgICAgICAgICAgIC8vIEl0IHdvdWxkIGJlIG11Y2ggYmV0dGVyIGlmIHRoaXMgc3dpdGNoIHN0YXRlbWVudCBpcyBnb3R0ZW4gcmlkIG9mLiBJIGNvdWxkIG5vdCBmaW5kIGEgbmljZSB3YXkgdG8gY3JlYXRlXG4gICAgICAgICAgICAvLyBuZXcgaW5zdGFuY2VzIGZyb20gY2xhc3MgbmFtZXMuIEFjdHVhbGx5LCBlYWNoIHRhYiBtdXN0IGhhdmUgaGFkIGEgZ2V0SW5zdGFuY2UgbWV0aG9kIHRvIGltcGxlbWVudCBhXG4gICAgICAgICAgICAvLyBzaW5nbGV0b24gcGF0dGVybi4gQnV0LCBJIGNvdWxkIG5vdCBmaW5kIGEgbmljZSB3YXkgdG8gZ2V0IHRoZSBuYW1lIG9mIHRoZSBjaGlsZCBjbGFzcyBmcm9tIHRoZSBwYXJlbnRcbiAgICAgICAgICAgIC8vIFRhYkJhc2UuIFNvLCBoZXJlIHdlIGFyZSB3aXRoIGFuIHVnbHkgc3dpdGNoLlxuICAgICAgICAgICAgc3dpdGNoICh0YWJOYW1lKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBUYWJOYW1lLkNBTENVTEFUSU9OUzpcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBuZXcgQ2FsY3VsYXRpb25zVGFiKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgVGFiTmFtZS5GSU5EX1JFUExBQ0U6XG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlID0gbmV3IEZpbmRSZXBsYWNlVGFiKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgVGFiTmFtZS5HRU5FUkFMOlxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IG5ldyBHZW5lcmFsVGFiKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgVGFiTmFtZS5JTVBPUlRfRVhQT1JUOlxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IG5ldyBJbXBvcnRFeHBvcnRUYWIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBUYWJOYW1lLk5PVEVTOlxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IG5ldyBOb3Rlc1RhYigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFRhYk5hbWUuVEVNUExBVEVTOlxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IG5ldyBUZW1wbGF0ZXNUYWIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBUYWJOYW1lLkZJTEVfRklORF9SRVBMQUNFOlxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IG5ldyBGaWxlRmluZFJlcGxhY2VUYWIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBUYWJOYW1lLkZJTEVfT1BFUkFUSU9OUzpcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBuZXcgRmlsZU9wZXJhdGlvbnNUYWIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBUYWJOYW1lLkZJTEVfVEVNUExBVEVTOlxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IG5ldyBGaWxlVGVtcGxhdGVzVGFiKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU3RvcmUgdGhlIGluc3RhbmNlXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1t0YWJOYW1lXSA9IGluc3RhbmNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VzW3RhYk5hbWVdO1xuICAgIH1cbn1cblRhYkZhY3RvcnkuaW5zdGFuY2VzID0ge307XG4iLCJleHBvcnQgdmFyIE9wdGlvbnNCb3hUeXBlO1xuKGZ1bmN0aW9uIChPcHRpb25zQm94VHlwZSkge1xuICAgIC8vIFRoZXNlIG11c3QgYmUgdGhlIHNhbWUgYXMgdGhlIGVudW1zIGluIE9wdGlvbnNCb3hUeXBlLnBocFxuICAgIE9wdGlvbnNCb3hUeXBlW1wiREVGXCJdID0gXCJkZWZhdWx0XCI7XG4gICAgT3B0aW9uc0JveFR5cGVbXCJGSUxFXCJdID0gXCJmaWxlXCI7XG59KShPcHRpb25zQm94VHlwZSB8fCAoT3B0aW9uc0JveFR5cGUgPSB7fSkpO1xuIiwiZXhwb3J0IHZhciBUYWJOYW1lO1xuKGZ1bmN0aW9uIChUYWJOYW1lKSB7XG4gICAgVGFiTmFtZVtUYWJOYW1lW1wiQ0FMQ1VMQVRJT05TXCJdID0gMF0gPSBcIkNBTENVTEFUSU9OU1wiO1xuICAgIFRhYk5hbWVbVGFiTmFtZVtcIkZJTkRfUkVQTEFDRVwiXSA9IDFdID0gXCJGSU5EX1JFUExBQ0VcIjtcbiAgICBUYWJOYW1lW1RhYk5hbWVbXCJHRU5FUkFMXCJdID0gMl0gPSBcIkdFTkVSQUxcIjtcbiAgICBUYWJOYW1lW1RhYk5hbWVbXCJJTVBPUlRfRVhQT1JUXCJdID0gM10gPSBcIklNUE9SVF9FWFBPUlRcIjtcbiAgICBUYWJOYW1lW1RhYk5hbWVbXCJOT1RFU1wiXSA9IDRdID0gXCJOT1RFU1wiO1xuICAgIFRhYk5hbWVbVGFiTmFtZVtcIlRFTVBMQVRFU1wiXSA9IDVdID0gXCJURU1QTEFURVNcIjtcbiAgICBUYWJOYW1lW1RhYk5hbWVbXCJGSUxFX0ZJTkRfUkVQTEFDRVwiXSA9IDZdID0gXCJGSUxFX0ZJTkRfUkVQTEFDRVwiO1xuICAgIFRhYk5hbWVbVGFiTmFtZVtcIkZJTEVfT1BFUkFUSU9OU1wiXSA9IDddID0gXCJGSUxFX09QRVJBVElPTlNcIjtcbiAgICBUYWJOYW1lW1RhYk5hbWVbXCJGSUxFX1RFTVBMQVRFU1wiXSA9IDhdID0gXCJGSUxFX1RFTVBMQVRFU1wiO1xufSkoVGFiTmFtZSB8fCAoVGFiTmFtZSA9IHt9KSk7XG4iLCJpbXBvcnQgeyBUYWJCYXNlIH0gZnJvbSBcIi4vVGFiQmFzZVwiO1xuZXhwb3J0IGNsYXNzIEZpbmRSZXBsYWNlVGFiQmFzZSBleHRlbmRzIFRhYkJhc2Uge1xuICAgIC8qKlxuICAgICAqIFVzaW5nIHRoZSBzdGF0ZSwgcHJlcGFyZSB0aGUgdGFiLlxuICAgICAqIEBwYXJhbSBzdGF0ZSBUaGUgc3RhdGUgcmV0dXJuZWQgZnJvbSB7QGxpbmsgc2F2ZVN0YXRlfVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fG51bGx9IHNldHRpbmdzIEN1cnJlbnQgc2V0dGluZ3MgZm9yIE9wdGlvbnMgQm94XG4gICAgICogQHJldHVybiB2b2lkXG4gICAgICovXG4gICAgcmVzdG9yZVN0YXRlKHN0YXRlLCBzZXR0aW5ncykge1xuICAgICAgICBsZXQgJHNldHRpbmdzQ29udGFpbmVyID0gdGhpcy5nZXRTZXR0aW5nc0NvbnRhaW5lcigpO1xuICAgICAgICB0aGlzLnJlc3RvcmVNdWx0aXBsZUlucHV0VmFsdWVzKCRzZXR0aW5nc0NvbnRhaW5lciwgc3RhdGUsIHRoaXMuZ2V0S2V5RmluZFJlcGxhY2VzKCksICgkY3VycmVudElucHV0R3JvdXAxLCB2YWx1ZSkgPT4gdGhpcy5zZXRJbnB1dEdyb3VwVmFsdWVzKCRjdXJyZW50SW5wdXRHcm91cDEsIHZhbHVlLmZpbmQsIHZhbHVlLnJlcGxhY2UsIHZhbHVlLmhhc093blByb3BlcnR5KFwicmVnZXhcIikpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2F2ZSB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGlzIHRhYlxuICAgICAqIEByZXR1cm4gc3RhdGUgU3RhdGUgb2YgdGhpcyB0YWJcbiAgICAgKi9cbiAgICBzYXZlU3RhdGUoKSB7XG4gICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuZ2V0SW5wdXRWYWx1ZXNBc09iamVjdCgpO1xuICAgICAgICAvLyBUaGUgdmFsdWVzIGFyZSB1bmRlciB0aGUgbmFtZSBvZiB0aGUgaW5wdXQuIFNvLCBmaXJzdCwgZ2V0IHRoZSB2YWx1ZXMuXG4gICAgICAgIC8vIFRoZW4sIHJlbW92ZSBlbXB0eSBmaW5kLXJlcGxhY2UgaXRlbXMgZnJvbSB0aGUgdmFsdWVzIGFycmF5LlxuICAgICAgICBzdGF0ZSA9IHRoaXMuZmlsdGVyTXVsdGlwbGVJbnB1dFN0YXRlKHN0YXRlLCB0aGlzLmdldEtleUZpbmRSZXBsYWNlcygpLCAodmFsKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdmFsLmZpbmQubGVuZ3RoIHx8IHZhbC5yZXBsYWNlLmxlbmd0aDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBudW1iZXIgb2Ygb3B0aW9ucyBjb25maWd1cmVkIGluIHRoaXMgdGFiXG4gICAgICogQHBhcmFtIHN0YXRlIFRoZSBzdGF0ZSByZXR1cm5lZCBmcm9tIHtAbGluayBzYXZlU3RhdGV9XG4gICAgICovXG4gICAgZ2V0Q29uZmlndXJlZE9wdGlvbkNvdW50KHN0YXRlKSB7XG4gICAgICAgIHJldHVybiAoc3RhdGVbdGhpcy5nZXRLZXlGaW5kUmVwbGFjZXMoKV0gfHwgW10pLmxlbmd0aDtcbiAgICB9XG4gICAgLypcbiAgICAgKlxuICAgICAqL1xuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHZhbHVlcyB0byB0aGUgZmluZC1yZXBsYWNlIGlucHV0IGdyb3VwXG4gICAgICogQHBhcmFtIHsqfGpRdWVyeXxIVE1MRWxlbWVudH0gJGlucHV0R3JvdXBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmluZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXBsYWNlXG4gICAgICogQHBhcmFtIHtib29sZWFufSByZWdleFxuICAgICAqL1xuICAgIHNldElucHV0R3JvdXBWYWx1ZXMoJGlucHV0R3JvdXAsIGZpbmQsIHJlcGxhY2UsIHJlZ2V4KSB7XG4gICAgICAgICRpbnB1dEdyb3VwLmZpbmQoJ2lucHV0W25hbWUkPVwiW3JlZ2V4XVwiXScpLnByb3AoJ2NoZWNrZWQnLCByZWdleCk7XG4gICAgICAgICRpbnB1dEdyb3VwLmZpbmQoJ2lucHV0W25hbWUkPVwiW2ZpbmRdXCJdJykudmFsKGZpbmQpO1xuICAgICAgICAkaW5wdXRHcm91cC5maW5kKCdpbnB1dFtuYW1lJD1cIltyZXBsYWNlXVwiXScpLnZhbChyZXBsYWNlKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBPcHRpb25zQm94VmFyaWFibGVzIH0gZnJvbSBcIi4uLy4uL09wdGlvbnNCb3hWYXJpYWJsZXNcIjtcbmV4cG9ydCBjbGFzcyBUYWJCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihzdGF0ZUtleSwgdGFiSWQsIGNvbG9yKSB7XG4gICAgICAgIHRoaXMuX3N0YXRlS2V5ID0gc3RhdGVLZXk7XG4gICAgICAgIHRoaXMuX3RhYklkID0gdGFiSWQ7XG4gICAgICAgIHRoaXMuX2NvbG9yID0gY29sb3I7XG4gICAgfVxuICAgIGdldCBzdGF0ZUtleSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlS2V5O1xuICAgIH1cbiAgICBnZXQgdGFiSWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90YWJJZDtcbiAgICB9XG4gICAgZ2V0IGNvbG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sb3I7XG4gICAgfVxuICAgIC8qXG4gICAgICpcbiAgICAgKi9cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2pRdWVyeXxIVE1MRWxlbWVudH0gJHNldHRpbmdzQ29udGFpbmVyXG4gICAgICogQHBhcmFtIGtleVxuICAgICAqIEBwYXJhbSBzZXR0aW5nc1xuICAgICAqL1xuICAgIHNldFNlbGVjdFZhbHVlKCRzZXR0aW5nc0NvbnRhaW5lciwga2V5LCBzZXR0aW5ncykge1xuICAgICAgICB0aGlzLl9zZXRJbnB1dFZhbHVlKCRzZXR0aW5nc0NvbnRhaW5lciwga2V5LCBzZXR0aW5ncywgXG4gICAgICAgIC8vIFJlc2V0IHRoZSB2YWx1ZVxuICAgICAgICAoJGlucHV0KSA9PiB7XG4gICAgICAgICAgICAkaW5wdXQudmFsKCRpbnB1dC5maW5kKCdvcHRpb24nKS5maXJzdCgpLnZhbCgpKTtcbiAgICAgICAgfSwgXG4gICAgICAgIC8vIFNldCB0aGUgdmFsdWVcbiAgICAgICAgKCRpbnB1dCwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgICRpbnB1dC52YWwodmFsdWUpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgdmFsdWUgb2YgYW4gaW5wdXQgZ2l2ZW4gaXRzIGtleSB1bmRlciB3aGljaCB0aGUgdmFsdWUgaXMgc3RvcmVkIGluIHRoZSBzZXR0aW5nc1xuICAgICAqXG4gICAgICogQHBhcmFtIHtqUXVlcnl8SFRNTEVsZW1lbnR9ICRzZXR0aW5nc0NvbnRhaW5lclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBzZXR0aW5ncyAgQ2FsY3VsYXRpb24gdGFiJ3Mgc3RhdGUuIEluIHRoaXMgYXJyYXksIHRoZSB2YWx1ZSBvZiB0aGUgaW5wdXQgaXMgc3RvcmVkIHVuZGVyIGdpdmVuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgIGtleVxuICAgICAqL1xuICAgIHNldElucHV0VmFsdWUoJHNldHRpbmdzQ29udGFpbmVyLCBrZXksIHNldHRpbmdzKSB7XG4gICAgICAgIHRoaXMuX3NldElucHV0VmFsdWUoJHNldHRpbmdzQ29udGFpbmVyLCBrZXksIHNldHRpbmdzLCBcbiAgICAgICAgLy8gUmVzZXQgdGhlIHZhbHVlXG4gICAgICAgICgkaW5wdXQpID0+IHtcbiAgICAgICAgICAgICRpbnB1dC52YWwoXCJcIik7XG4gICAgICAgIH0sIFxuICAgICAgICAvLyBTZXQgdGhlIHZhbHVlXG4gICAgICAgICgkaW5wdXQsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAkaW5wdXQudmFsKHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHZhbHVlIG9mIGEgY2hlY2tib3ggZ2l2ZW4gaXRzIGtleSB1bmRlciB3aGljaCB0aGUgdmFsdWUgaXMgc3RvcmVkIGluIHRoZSBzZXR0aW5nc1xuICAgICAqXG4gICAgICogQHBhcmFtIHtqUXVlcnl8SFRNTEVsZW1lbnR9ICRzZXR0aW5nc0NvbnRhaW5lclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBzZXR0aW5ncyAgQ2FsY3VsYXRpb24gdGFiJ3Mgc3RhdGUuIEluIHRoaXMgYXJyYXksIHRoZSB2YWx1ZSBvZiB0aGUgaW5wdXQgaXMgc3RvcmVkIHVuZGVyIGdpdmVuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgIGtleVxuICAgICAqL1xuICAgIHNldENoZWNrYm94VmFsdWUoJHNldHRpbmdzQ29udGFpbmVyLCBrZXksIHNldHRpbmdzKSB7XG4gICAgICAgIHRoaXMuX3NldElucHV0VmFsdWUoJHNldHRpbmdzQ29udGFpbmVyLCBrZXksIHNldHRpbmdzLCBcbiAgICAgICAgLy8gUmVzZXQgdGhlIHZhbHVlXG4gICAgICAgICgkaW5wdXQpID0+IHtcbiAgICAgICAgICAgICRpbnB1dC5wcm9wKFwiY2hlY2tlZFwiLCBmYWxzZSk7XG4gICAgICAgIH0sIFxuICAgICAgICAvLyBTZXQgdGhlIHZhbHVlXG4gICAgICAgICgkaW5wdXQsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAkaW5wdXQucHJvcChcImNoZWNrZWRcIiwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSB2YWx1ZSBvZiBhbiBpbnB1dCBnaXZlbiBpdHMga2V5IHVuZGVyIHdoaWNoIHRoZSB2YWx1ZSBpcyBzdG9yZWQgaW4gdGhlIHNldHRpbmdzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2pRdWVyeXxIVE1MRWxlbWVudH0gJHNldHRpbmdzQ29udGFpbmVyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7YXJyYXl9IHNldHRpbmdzICBDYWxjdWxhdGlvbiB0YWIncyBzdGF0ZS4gSW4gdGhpcyBhcnJheSwgdGhlIHZhbHVlIG9mIHRoZSBpbnB1dCBpcyBzdG9yZWQgdW5kZXIgZ2l2ZW5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5XG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gcmVzZXRWYWx1ZUNhbGxiYWNrIFVzZWQgdG8gcmVzZXQgdGhlIGlucHV0IHZhbHVlLiBFLmcuIGZ1bmN0aW9uKCRmb3VuZElucHV0KSB7fVxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHNldFZhbHVlQ2FsbGJhY2sgVXNlZCB0byBzZXQgdGhlIGlucHV0IHZhbHVlLiBFLmcuIGZ1bmN0aW9uKCRmb3VuZElucHV0LCB2YWx1ZSkge31cbiAgICAgKi9cbiAgICBfc2V0SW5wdXRWYWx1ZSgkc2V0dGluZ3NDb250YWluZXIsIGtleSwgc2V0dGluZ3MsIHJlc2V0VmFsdWVDYWxsYmFjaywgc2V0VmFsdWVDYWxsYmFjaykge1xuICAgICAgICAvLyBsKFwiU2V0IGlucHV0IHZhbHVlIGZvciBcIiArIGtleSk7XG4gICAgICAgIGxldCAkaW5wdXQgPSB0aGlzLmdldFNldHRpbmdJbnB1dFdpdGhQYXJ0aWFsTmFtZSgkc2V0dGluZ3NDb250YWluZXIsIGtleSk7XG4gICAgICAgIGlmICgkaW5wdXQgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGxldCB2YWx1ZSA9IHNldHRpbmdzW2tleV0gfHwgbnVsbDtcbiAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBsKFwiQ2xlYXIgdGhlIHZhbHVlXCIpO1xuICAgICAgICAgICAgcmVzZXRWYWx1ZUNhbGxiYWNrKCRpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBsKFwiU2V0IGlucHV0IHZhbHVlIGFzIFwiICsgdmFsdWUpO1xuICAgICAgICAgICAgc2V0VmFsdWVDYWxsYmFjaygkaW5wdXQsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBGaW5kcyBhbiBpbnB1dCBnaXZlbiBpdHMgcGFydGlhbCBuYW1lLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtqUXVlcnl8SFRNTEVsZW1lbnR9ICRzZXR0aW5nc0NvbnRhaW5lciBUaGUgY29udGFpbmVyIHRoYXQgc3RvcmVzIHRoZSB0YXJnZXQgaW5wdXRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFydGlhbE5hbWUgUGFydGlhbCBuYW1lIG9mIHRoZSB0YXJnZXQgaW5wdXRcbiAgICAgKiBAcmV0dXJuIHtudWxsfGpRdWVyeXxIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICBnZXRTZXR0aW5nSW5wdXRXaXRoUGFydGlhbE5hbWUoJHNldHRpbmdzQ29udGFpbmVyLCBwYXJ0aWFsTmFtZSkge1xuICAgICAgICBsZXQgJGlucHV0ID0gJHNldHRpbmdzQ29udGFpbmVyLmZpbmQoJ1tuYW1lJD1cIlsnICsgcGFydGlhbE5hbWUgKyAnXVwiXScpO1xuICAgICAgICByZXR1cm4gISRpbnB1dC5sZW5ndGggPyBudWxsIDogJGlucHV0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGVhcnMgYWxsIGlucHV0IGdyb3VwcyBpbiBhbiBpbnB1dCBjb250YWluZXIsIGxlYXZlcyBqdXN0IG9uZSB3aG9zZSB2YWx1ZXMgd2lsbCBiZSBjbGVhcmVkIGFzIHdlbGwuXG4gICAgICovXG4gICAgY2xlYXJJbnB1dHNJbkNvbnRhaW5lcigkY29udGFpbmVyKSB7XG4gICAgICAgICRjb250YWluZXIuZmluZCgnLndjYy1yZW1vdmUnKS5lYWNoKChpLCBlbCkgPT4ge1xuICAgICAgICAgICAgJChlbCkuY2xpY2soKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBuZXcgaW5wdXQgZ3JvdXAgdG8gdGhlIGNvbnRhaW5lciBieSBjbGlja2luZyBcImFkZCBuZXdcIiBidXR0b24uIFNvLCB0aGUgZ2l2ZW4gY29udGFpbmVyIG11c3QgY29udGFpblxuICAgICAqIGFuIFwiYWRkIG5ld1wiIGJ1dHRvbi5cbiAgICAgKiBAcGFyYW0gJGNvbnRhaW5lclxuICAgICAqIEByZXR1cm4geyp8alF1ZXJ5fEhUTUxFbGVtZW50fSBMYXN0IGFkZGVkIGlucHV0IGdyb3VwXG4gICAgICovXG4gICAgYWRkSW5wdXRHcm91cFRvQ29udGFpbmVyKCRjb250YWluZXIpIHtcbiAgICAgICAgJGNvbnRhaW5lci5maW5kKCcud2NjLWFkZC1uZXcnKS5jbGljaygpO1xuICAgICAgICByZXR1cm4gJGNvbnRhaW5lci5maW5kKCcuaW5wdXRzID4gLmlucHV0LWdyb3VwOmxhc3QtY2hpbGQnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBmaXJzdCBpbnB1dCBncm91cCBpbiBhbiBpbnB1dCBncm91cCBjb250YWluZXJcbiAgICAgKiBAcGFyYW0gJGNvbnRhaW5lclxuICAgICAqIEByZXR1cm4geyp8alF1ZXJ5fEhUTUxFbGVtZW50fSBGaXJzdCBpbnB1dCBncm91cCBpbiB0aGUgY29udGFpbmVyXG4gICAgICovXG4gICAgZ2V0Rmlyc3RJbnB1dEdyb3VwSW5Db250YWluZXIoJGNvbnRhaW5lcikge1xuICAgICAgICByZXR1cm4gJGNvbnRhaW5lci5maW5kKCcuaW5wdXRzID4gLmlucHV0LWdyb3VwOmZpcnN0LWNoaWxkJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBvcHRpb25zIGJveCB2YXJpYWJsZXMuXG4gICAgICovXG4gICAgZ2V0VmFyaWFibGVzKCkge1xuICAgICAgICByZXR1cm4gT3B0aW9uc0JveFZhcmlhYmxlcy5nZXRJbnN0YW5jZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGNvbnRhaW5lciB0aGF0IHN0b3JlcyB0aGlzIHRhYidzIGNvbnRlbnRcbiAgICAgKi9cbiAgICBnZXRUYWJDb250YWluZXIoKSB7XG4gICAgICAgIHJldHVybiAkKCcjJyArIHRoaXMudGFiSWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgc2V0dGluZ3MgY29udGFpbmVyIGZvciB0aGlzIHRhYi5cbiAgICAgKi9cbiAgICBnZXRTZXR0aW5nc0NvbnRhaW5lcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGFiQ29udGFpbmVyKCkuZmluZCgnLndjYy1zZXR0aW5ncycpLmZpcnN0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdmFsdWVzIG9mIHRoZSBpbnB1dHMgZGVmaW5lZCBmb3IgdGhpcyB0YWIgYXMgYW4gb2JqZWN0LlxuICAgICAqL1xuICAgIGdldElucHV0VmFsdWVzQXNPYmplY3QoKSB7XG4gICAgICAgIC8vIEdldCB0aGUgaW5wdXQgdmFsdWVzIGluIHRoZSB0YWIgY29udGFpbmVyXG4gICAgICAgIGxldCBvYmogPSB0aGlzLmdldFRhYkNvbnRhaW5lcigpLmZpbmQoJzppbnB1dCcpLnNlcmlhbGl6ZU9iamVjdE5vTnVsbCgpIHx8IHt9O1xuICAgICAgICAvLyBFeHRyYWN0IHRoZSBpdGVtcyB1bmRlciB0aGUgbWFpbiBpbnB1dCBuYW1lLiBUaGUgaW5wdXRzIGluIHRoZSB0YWIgY29udGVudCBtdXN0IGJlIGRlZmluZWQgdW5kZXJcbiAgICAgICAgLy8gJ19vcHRpb25zX2JveCcgKCB0aGUgZGVmaW5lZCBpbnB1dCBuYW1lKS4gRS5nLiBpZiBhbiBvcHRpb24ncyBuYW1lIHNob3VsZCBiZSAndGVtcGxhdGVzJywgaXRzIG5hbWUgbXVzdCBiZVxuICAgICAgICAvLyAnX29wdGlvbnNfYm94W3RlbXBsYXRlc10nIGZvciB0aGlzIHRvIHdvcmsuXG4gICAgICAgIHJldHVybiBvYmpbdGhpcy5nZXRWYXJpYWJsZXMoKS5pbnB1dE5hbWVdIHx8IHt9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXN0b3JlIHRoZSBzdGF0ZSBmb3IgYSBtdWx0aXBsZSBmb3JtIGl0ZW0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2pRdWVyeX0gJHNldHRpbmdzQ29udGFpbmVyICAgVGhlIGNvbnRhaW5lciBpbiB3aGljaCB0aGUgaW5wdXQgZ3JvdXAgZm9yIHRoZSBnaXZlbiBrZXkgd2lsbCBiZSBzZWFyY2hlZCBmb3IuXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHN0YXRlICAgICAgICAgICAgICAgIFRoZSBzdGF0ZSBmcm9tIHdoaWNoIHRoZSB2YWx1ZXMgZm9yIHRoZSBrZXkgd2lsbCBiZSBleHRyYWN0ZWQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSAgICAgICAgICAgICAgICAgIFRoZSBrZXkgdG8gYmUgdXNlZCB3aGVuIGV4dHJhY3RpbmcgdmFsdWVzIGZyb20gdGhlIHN0YXRlLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrICAgICAgICAgICBBIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgdG8gYXNzaWduIHZhbHVlcyBpbiB0aGUgbmV3bHkgaW5wdXQgZ3JvdXAsIGkuZS5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdG9yZSB0aGUgc3RhdGUuXG4gICAgICovXG4gICAgcmVzdG9yZU11bHRpcGxlSW5wdXRWYWx1ZXMoJHNldHRpbmdzQ29udGFpbmVyLCBzdGF0ZSwga2V5LCBjYWxsYmFjaykge1xuICAgICAgICAvLyBGaW5kIHRoZSBpbnB1dCBjb250YWluZXJcbiAgICAgICAgbGV0ICRpbnB1dEdyb3VwQ29udGFpbmVyID0gJHNldHRpbmdzQ29udGFpbmVyXG4gICAgICAgICAgICAuZmluZCgnW25hbWVePVwiJyArIHRoaXMuZ2V0VmFyaWFibGVzKCkuaW5wdXROYW1lICsgJ1snICsga2V5ICsgJ11cIl0nKVxuICAgICAgICAgICAgLmNsb3Nlc3QoJ3RkJykgfHwgbnVsbDtcbiAgICAgICAgaWYgKCRpbnB1dEdyb3VwQ29udGFpbmVyID09PSBudWxsIHx8ICEkaW5wdXRHcm91cENvbnRhaW5lci5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIC8vIENsZWFyIHRoZSBpbnB1dHMgaW4gdGhlIGNvbnRhaW5lclxuICAgICAgICB0aGlzLmNsZWFySW5wdXRzSW5Db250YWluZXIoJGlucHV0R3JvdXBDb250YWluZXIpO1xuICAgICAgICAvLyBHZXQgdGhlIHZhbHVlc1xuICAgICAgICBsZXQgdmFsdWVzID0gc3RhdGVba2V5XSB8fCBudWxsO1xuICAgICAgICBpZiAodmFsdWVzID09PSBudWxsIHx8ICF2YWx1ZXMubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvLyBSZXN0b3JlIHRoZSBzdGF0ZSBmb3IgZWFjaCBpdGVtLlxuICAgICAgICBsZXQgY3VycmVudCwgJGN1cnJlbnRJbnB1dEdyb3VwLCBpc0ZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgbGV0IGxlbiA9IHZhbHVlcy5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGN1cnJlbnQgPSB2YWx1ZXNbaV0gfHwgbnVsbDtcbiAgICAgICAgICAgIGlmIChjdXJyZW50ID09PSBudWxsKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyB0aGUgZmlyc3QgaXRlbSwgbm8gbmVlZCB0byBjcmVhdGUgYW4gaW5wdXQgZ3JvdXAsIHNpbmNlIGl0IGFscmVhZHkgZXhpc3RzLlxuICAgICAgICAgICAgaWYgKGlzRmlyc3QpIHtcbiAgICAgICAgICAgICAgICAkY3VycmVudElucHV0R3JvdXAgPSB0aGlzLmdldEZpcnN0SW5wdXRHcm91cEluQ29udGFpbmVyKCRpbnB1dEdyb3VwQ29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICBpc0ZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCBhZGQgYSBuZXcgaW5wdXQgZ3JvdXAuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAkY3VycmVudElucHV0R3JvdXAgPSB0aGlzLmFkZElucHV0R3JvdXBUb0NvbnRhaW5lcigkaW5wdXRHcm91cENvbnRhaW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBTZXQgdGhlIHZhbHVlc1xuICAgICAgICAgICAgY2FsbGJhY2soJGN1cnJlbnRJbnB1dEdyb3VwLCBjdXJyZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBGaWx0ZXIgYSBtdWx0aXBsZSBpbnB1dCB2YWx1ZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHN0YXRlICAgICAgICBUaGUgc3RhdGUgZnJvbSB3aGljaCB0aGUgdmFsdWVzIHRvIGJlIGZpbHRlcmVkIHdpbGwgYmUgcmV0cmlldmVkXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSAgICAgICAgICBUaGUga2V5IHVzaW5nIHdoaWNoIHRoZSB2YWx1ZXMgd2lsbCBiZSByZXRyaWV2ZWQgZnJvbSB0aGUgc3RhdGVcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAgIEEgY2FsbGJhY2sgdGhhdCByZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlIGlzIHZhbGlkLlxuICAgICAqIEByZXR1cm4ge29iamVjdH0gc3RhdGUgVGhlIHN0YXRlIGZpbHRlcmVkIGZvciB0aGUgdmFsdWVcbiAgICAgKi9cbiAgICBmaWx0ZXJNdWx0aXBsZUlucHV0U3RhdGUoc3RhdGUsIGtleSwgY2FsbGJhY2spIHtcbiAgICAgICAgc3RhdGVba2V5XSA9IChzdGF0ZVtrZXldIHx8IFtdKS5maWx0ZXIoKHZhbCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKHZhbCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgVGFiQmFzZSB9IGZyb20gXCIuLi9iYXNlL1RhYkJhc2VcIjtcbmV4cG9ydCBjbGFzcyBDYWxjdWxhdGlvbnNUYWIgZXh0ZW5kcyBUYWJCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ2NhbGN1bGF0aW9ucycsICd0YWItb3B0aW9ucy1ib3gtY2FsY3VsYXRpb25zJywgJyNGRkZGMDAnKTtcbiAgICAgICAgdGhpcy5rZXlEZWNpbWFsU2VwYXJhdG9yQWZ0ZXIgPSAnZGVjaW1hbF9zZXBhcmF0b3JfYWZ0ZXInO1xuICAgICAgICB0aGlzLmtleVVzZVRob3VzYW5kc1NlcGFyYXRvciA9ICd1c2VfdGhvdXNhbmRzX3NlcGFyYXRvcic7XG4gICAgICAgIHRoaXMua2V5UmVtb3ZlSWZOb3ROdW1lcmljID0gJ3JlbW92ZV9pZl9ub3RfbnVtZXJpYyc7XG4gICAgICAgIHRoaXMua2V5UHJlY2lzaW9uID0gJ3ByZWNpc2lvbic7XG4gICAgICAgIHRoaXMua2V5Rm9ybXVsYXMgPSAnZm9ybXVsYXMnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2luZyB0aGUgc3RhdGUsIHByZXBhcmUgdGhlIHRhYi5cbiAgICAgKiBAcGFyYW0gc3RhdGUgVGhlIHN0YXRlIHJldHVybmVkIGZyb20ge0BsaW5rIHNhdmVTdGF0ZX1cbiAgICAgKiBAcGFyYW0ge29iamVjdHxudWxsfSBzZXR0aW5ncyBDdXJyZW50IHNldHRpbmdzIGZvciBPcHRpb25zIEJveFxuICAgICAqIEByZXR1cm4gdm9pZFxuICAgICAqL1xuICAgIHJlc3RvcmVTdGF0ZShzdGF0ZSwgc2V0dGluZ3MpIHtcbiAgICAgICAgbGV0ICRzZXR0aW5nc0NvbnRhaW5lciA9IHRoaXMuZ2V0U2V0dGluZ3NDb250YWluZXIoKTtcbiAgICAgICAgLy8gU2V0IHRoZSB2YWx1ZXMgZm9yIGlucHV0c1xuICAgICAgICB0aGlzLnNldFNlbGVjdFZhbHVlKCRzZXR0aW5nc0NvbnRhaW5lciwgdGhpcy5rZXlEZWNpbWFsU2VwYXJhdG9yQWZ0ZXIsIHN0YXRlKTtcbiAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKCRzZXR0aW5nc0NvbnRhaW5lciwgdGhpcy5rZXlQcmVjaXNpb24sIHN0YXRlKTtcbiAgICAgICAgdGhpcy5zZXRDaGVja2JveFZhbHVlKCRzZXR0aW5nc0NvbnRhaW5lciwgdGhpcy5rZXlVc2VUaG91c2FuZHNTZXBhcmF0b3IsIHN0YXRlKTtcbiAgICAgICAgdGhpcy5zZXRDaGVja2JveFZhbHVlKCRzZXR0aW5nc0NvbnRhaW5lciwgdGhpcy5rZXlSZW1vdmVJZk5vdE51bWVyaWMsIHN0YXRlKTtcbiAgICAgICAgdGhpcy5yZXN0b3JlTXVsdGlwbGVJbnB1dFZhbHVlcygkc2V0dGluZ3NDb250YWluZXIsIHN0YXRlLCB0aGlzLmtleUZvcm11bGFzLCAoJGN1cnJlbnRJbnB1dEdyb3VwLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgJGN1cnJlbnRJbnB1dEdyb3VwLmZpbmQoJ2lucHV0W25hbWUkPVwiW2Zvcm11bGFdXCJdJykuZmlyc3QoKS52YWwodmFsdWVbJ2Zvcm11bGEnXSB8fCAnJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTYXZlIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoaXMgdGFiXG4gICAgICogQHJldHVybiBzdGF0ZSBTdGF0ZSBvZiB0aGlzIHRhYlxuICAgICAqL1xuICAgIHNhdmVTdGF0ZSgpIHtcbiAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5nZXRJbnB1dFZhbHVlc0FzT2JqZWN0KCk7XG4gICAgICAgIC8vIENsZWFyIGVtcHR5IHZhbHVlcyBmcm9tIHRoZSBjYWxjdWxhdGlvbnMgYXJyYXlcbiAgICAgICAgc3RhdGVbdGhpcy5rZXlGb3JtdWxhc10gPSBzdGF0ZVt0aGlzLmtleUZvcm11bGFzXS5maWx0ZXIoKHYpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAodlsnZm9ybXVsYSddIHx8IFtdKS5sZW5ndGg7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgbnVtYmVyIG9mIG9wdGlvbnMgY29uZmlndXJlZCBpbiB0aGlzIHRhYlxuICAgICAqIEBwYXJhbSBzdGF0ZSBUaGUgc3RhdGUgcmV0dXJuZWQgZnJvbSB7QGxpbmsgc2F2ZVN0YXRlfVxuICAgICAqL1xuICAgIGdldENvbmZpZ3VyZWRPcHRpb25Db3VudChzdGF0ZSkge1xuICAgICAgICBsZXQgdG90YWwgPSAwO1xuICAgICAgICB0b3RhbCArPSAoc3RhdGVbdGhpcy5rZXlGb3JtdWxhc10gfHwgW10pLmxlbmd0aDtcbiAgICAgICAgaWYgKHN0YXRlLmhhc093blByb3BlcnR5KHRoaXMua2V5UmVtb3ZlSWZOb3ROdW1lcmljKSlcbiAgICAgICAgICAgIHRvdGFsICs9IDE7XG4gICAgICAgIHJldHVybiB0b3RhbDtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBGaW5kUmVwbGFjZVRhYkJhc2UgfSBmcm9tIFwiLi4vYmFzZS9GaW5kUmVwbGFjZVRhYkJhc2VcIjtcbmV4cG9ydCBjbGFzcyBGaW5kUmVwbGFjZVRhYiBleHRlbmRzIEZpbmRSZXBsYWNlVGFiQmFzZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdmaW5kUmVwbGFjZScsICd0YWItb3B0aW9ucy1ib3gtZmluZC1yZXBsYWNlJywgJyNGRjAwMDAnKTtcbiAgICB9XG4gICAgZ2V0S2V5RmluZFJlcGxhY2VzKCkge1xuICAgICAgICByZXR1cm4gJ2ZpbmRfcmVwbGFjZSc7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgVGFiQmFzZSB9IGZyb20gXCIuLi9iYXNlL1RhYkJhc2VcIjtcbmV4cG9ydCBjbGFzcyBHZW5lcmFsVGFiIGV4dGVuZHMgVGFiQmFzZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdnZW5lcmFsJywgJ3RhYi1vcHRpb25zLWJveC1nZW5lcmFsJywgJyNGRjdGMDAnKTtcbiAgICAgICAgdGhpcy5rZXlUcmVhdEFzSnNvbiA9ICd0cmVhdF9hc19qc29uJztcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXNpbmcgdGhlIHN0YXRlLCBwcmVwYXJlIHRoZSB0YWIuXG4gICAgICogQHBhcmFtIHN0YXRlIFRoZSBzdGF0ZSByZXR1cm5lZCBmcm9tIHtAbGluayBzYXZlU3RhdGV9XG4gICAgICogQHBhcmFtIHtvYmplY3R8bnVsbH0gc2V0dGluZ3MgQ3VycmVudCBzZXR0aW5ncyBmb3IgT3B0aW9ucyBCb3hcbiAgICAgKiBAcmV0dXJuIHZvaWRcbiAgICAgKi9cbiAgICByZXN0b3JlU3RhdGUoc3RhdGUsIHNldHRpbmdzKSB7XG4gICAgICAgIGxldCAkc2V0dGluZ3NDb250YWluZXIgPSB0aGlzLmdldFNldHRpbmdzQ29udGFpbmVyKCk7XG4gICAgICAgIHRoaXMuc2V0Q2hlY2tib3hWYWx1ZSgkc2V0dGluZ3NDb250YWluZXIsIHRoaXMua2V5VHJlYXRBc0pzb24sIHN0YXRlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2F2ZSB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGlzIHRhYlxuICAgICAqIEByZXR1cm4gc3RhdGUgU3RhdGUgb2YgdGhpcyB0YWJcbiAgICAgKi9cbiAgICBzYXZlU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldElucHV0VmFsdWVzQXNPYmplY3QoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBudW1iZXIgb2Ygb3B0aW9ucyBjb25maWd1cmVkIGluIHRoaXMgdGFiXG4gICAgICogQHBhcmFtIHN0YXRlIFRoZSBzdGF0ZSByZXR1cm5lZCBmcm9tIHtAbGluayBzYXZlU3RhdGV9XG4gICAgICovXG4gICAgZ2V0Q29uZmlndXJlZE9wdGlvbkNvdW50KHN0YXRlKSB7XG4gICAgICAgIGxldCB0b3RhbCA9IDA7XG4gICAgICAgIGlmIChzdGF0ZS5oYXNPd25Qcm9wZXJ0eSh0aGlzLmtleVRyZWF0QXNKc29uKSlcbiAgICAgICAgICAgIHRvdGFsICs9IDE7XG4gICAgICAgIHJldHVybiB0b3RhbDtcbiAgICB9XG59XG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgVGFiQmFzZSB9IGZyb20gXCIuLi9iYXNlL1RhYkJhc2VcIjtcbmltcG9ydCB7IE9wdGlvbnNCb3ggfSBmcm9tIFwiLi4vLi4vT3B0aW9uc0JveFwiO1xuaW1wb3J0IHsgRXZlbnRUeXBlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbW1vbi10cy9FdmVudFR5cGVcIjtcbmV4cG9ydCBjbGFzcyBJbXBvcnRFeHBvcnRUYWIgZXh0ZW5kcyBUYWJCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ2ltcG9ydEV4cG9ydCcsICd0YWItb3B0aW9ucy1ib3gtaW1wb3J0LWV4cG9ydCcsICcjMjE5NmYzJyk7XG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgZXhwb3J0IHRleHRhcmVhIHdoZW4gdGhlIGltcG9ydC9leHBvcnQgdGFiIGlzIGFjdGl2YXRlZC5cbiAgICAgICAgJChkb2N1bWVudCkub24oRXZlbnRUeXBlLm9wdGlvbnNCb3hUYWJBY3RpdmF0ZWQsIChlLCB0YWJJZCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRhYklkID09PSB0aGlzLnRhYklkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVFeHBvcnRUZXh0QXJlYSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gSW1wb3J0IHRoZSBzZXR0aW5ncyB3aGVuIHRoZSBpbXBvcnQgYnV0dG9uIGlzIGNsaWNrZWRcbiAgICAgICAgJCh0aGlzLmdldFZhcmlhYmxlcygpLm9wdGlvbnNCb3hTZWxlY3Rvcikub24oJ2NsaWNrJywgdGhpcy5nZXRWYXJpYWJsZXMoKS5zZWxlY3RvckltcG9ydFNldHRpbmdzQnV0dG9uLCAoZSkgPT4ge1xuICAgICAgICAgICAgLy8gSW1wb3J0IHRoZSBnaXZlbiBzZXR0aW5ncyBhbmQgdXBkYXRlIHRoZSBleHBvcnQgdGV4dCBhcmVhXG4gICAgICAgICAgICB0aGlzLmltcG9ydFNldHRpbmdzKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUV4cG9ydFRleHRBcmVhKCk7XG4gICAgICAgICAgICAvLyBGbGFzaCB0aGUgYmFja2dyb3VuZCBvZiB0aGUgaW1wb3J0IHRleHQgYXJlYVxuICAgICAgICAgICAgZmxhc2hCYWNrZ3JvdW5kKCQodGhpcy5nZXRWYXJpYWJsZXMoKS5zZWxlY3RvckltcG9ydFRleHRhcmVhKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2luZyB0aGUgc3RhdGUsIHByZXBhcmUgdGhlIHRhYi5cbiAgICAgKiBAcGFyYW0gc3RhdGUgVGhlIHN0YXRlIHJldHVybmVkIGZyb20ge0BsaW5rIHNhdmVTdGF0ZX1cbiAgICAgKiBAcGFyYW0ge29iamVjdHxudWxsfSBzZXR0aW5ncyBDdXJyZW50IHNldHRpbmdzIGZvciBPcHRpb25zIEJveFxuICAgICAqIEByZXR1cm4gdm9pZFxuICAgICAqL1xuICAgIHJlc3RvcmVTdGF0ZShzdGF0ZSwgc2V0dGluZ3MpIHtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2F2ZSB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGlzIHRhYlxuICAgICAqIEByZXR1cm4gc3RhdGUgU3RhdGUgb2YgdGhpcyB0YWJcbiAgICAgKi9cbiAgICBzYXZlU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBudW1iZXIgb2Ygb3B0aW9ucyBjb25maWd1cmVkIGluIHRoaXMgdGFiXG4gICAgICogQHBhcmFtIHN0YXRlIFRoZSBzdGF0ZSByZXR1cm5lZCBmcm9tIHtAbGluayBzYXZlU3RhdGV9XG4gICAgICovXG4gICAgZ2V0Q29uZmlndXJlZE9wdGlvbkNvdW50KHN0YXRlKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICAvKlxuICAgICAqXG4gICAgICovXG4gICAgLyoqXG4gICAgICogSW1wb3J0cyB0aGUgc2V0dGluZ3MgaW5wdXQgdG8gdGhlIGltcG9ydCB0ZXh0YXJlYVxuICAgICAqL1xuICAgIGltcG9ydFNldHRpbmdzKCkge1xuICAgICAgICBsZXQgJGltcG9ydFRleHRhcmVhID0gJCh0aGlzLmdldFZhcmlhYmxlcygpLnNlbGVjdG9ySW1wb3J0VGV4dGFyZWEpO1xuICAgICAgICBsZXQgdmFsID0gJGltcG9ydFRleHRhcmVhLnZhbCgpLnRvU3RyaW5nKCk7XG4gICAgICAgIC8vIFN0b3AgaWYgdGhlIHZhbHVlIGlzIG5vdCB2YWxpZC5cbiAgICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkIHx8IHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09ICd1bmRlZmluZWQnIHx8ICF2YWwubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvLyBVcGRhdGUgdGhlIHN0YXRlIHZhbHVlIGluIHRoZSBpbnB1dFxuICAgICAgICBPcHRpb25zQm94LmdldEluc3RhbmNlKCkuZ2V0T3B0aW9uc0JveElucHV0KCkudmFsKHZhbCk7XG4gICAgICAgIC8vIFJlc3RvcmUgdGhlIHN0YXRlIHdpdGggdGhlIG5ldyB2ZXJzaW9uLlxuICAgICAgICBPcHRpb25zQm94LmdldEluc3RhbmNlKCkucmVzdG9yZVN0YXRlKCk7XG4gICAgICAgIC8vIENsZWFyIHRoZSB0ZXh0IGFyZWEncyB2YWx1ZVxuICAgICAgICAkaW1wb3J0VGV4dGFyZWEudmFsKFwiXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIGV4cG9ydCB0ZXh0IGFyZWEgd2l0aCB0aGUgY3VycmVudCBvcHRpb25zIGJveCBzZXR0aW5nc1xuICAgICAqL1xuICAgIHVwZGF0ZUV4cG9ydFRleHRBcmVhKCkge1xuICAgICAgICAvLyBVcGRhdGUgdGhlIHN0YXRlXG4gICAgICAgIE9wdGlvbnNCb3guZ2V0SW5zdGFuY2UoKS5zYXZlU3RhdGUoKTtcbiAgICAgICAgLy8gR2V0IHRoZSBzdGF0ZSdzIHN0cmluZyByZXByZXNlbnRhdGlvblxuICAgICAgICBsZXQgc3RhdGVTdHIgPSBPcHRpb25zQm94LmdldEluc3RhbmNlKCkuZ2V0T3B0aW9uc0JveElucHV0KCkudmFsKCk7XG4gICAgICAgIC8vIFB1dCB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIGludG8gdGhlIGV4cG9ydCB0ZXh0IGFyZWFcbiAgICAgICAgJCh0aGlzLmdldFZhcmlhYmxlcygpLnNlbGVjdG9yRXhwb3J0VGV4dGFyZWEpLnZhbChzdGF0ZVN0cik7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgVGFiQmFzZSB9IGZyb20gXCIuLi9iYXNlL1RhYkJhc2VcIjtcbmV4cG9ydCBjbGFzcyBOb3Rlc1RhYiBleHRlbmRzIFRhYkJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignbm90ZXMnLCAndGFiLW9wdGlvbnMtYm94LW5vdGVzJywgJyMwMDAwRkYnKTtcbiAgICAgICAgdGhpcy5rZXlOb3RlID0gJ25vdGUnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2luZyB0aGUgc3RhdGUsIHByZXBhcmUgdGhlIHRhYi5cbiAgICAgKiBAcGFyYW0gc3RhdGUgVGhlIHN0YXRlIHJldHVybmVkIGZyb20ge0BsaW5rIHNhdmVTdGF0ZX1cbiAgICAgKiBAcGFyYW0ge29iamVjdHxudWxsfSBzZXR0aW5ncyBDdXJyZW50IHNldHRpbmdzIGZvciBPcHRpb25zIEJveFxuICAgICAqIEByZXR1cm4gdm9pZFxuICAgICAqL1xuICAgIHJlc3RvcmVTdGF0ZShzdGF0ZSwgc2V0dGluZ3MpIHtcbiAgICAgICAgdGhpcy5zZXROb3RlVmFsdWUoc3RhdGVbdGhpcy5rZXlOb3RlXSB8fCAnJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNhdmUgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhpcyB0YWJcbiAgICAgKiBAcmV0dXJuIHN0YXRlIFN0YXRlIG9mIHRoaXMgdGFiXG4gICAgICovXG4gICAgc2F2ZVN0YXRlKCkge1xuICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLmdldElucHV0VmFsdWVzQXNPYmplY3QoKTtcbiAgICAgICAgc3RhdGVbdGhpcy5rZXlOb3RlXSA9IHN0YXRlW3RoaXMua2V5Tm90ZV0gfHwgJyc7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBudW1iZXIgb2Ygb3B0aW9ucyBjb25maWd1cmVkIGluIHRoaXMgdGFiXG4gICAgICogQHBhcmFtIHN0YXRlIFRoZSBzdGF0ZSByZXR1cm5lZCBmcm9tIHtAbGluayBzYXZlU3RhdGV9XG4gICAgICovXG4gICAgZ2V0Q29uZmlndXJlZE9wdGlvbkNvdW50KHN0YXRlKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IDA7XG4gICAgICAgIGlmICgoc3RhdGVbdGhpcy5rZXlOb3RlXSB8fCBbXSkubGVuZ3RoKVxuICAgICAgICAgICAgdmFsdWUgKz0gMTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICAvKlxuICAgICAqXG4gICAgICovXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgbm90ZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eHRcbiAgICAgKi9cbiAgICBzZXROb3RlVmFsdWUodHh0KSB7XG4gICAgICAgIGxldCAkbm90ZSA9IHRoaXMuZ2V0VGFiQ29udGFpbmVyKCkuZmluZCgndGV4dGFyZWFbbmFtZSQ9XCJbbm90ZV1cIl0nKS5maXJzdCgpIHx8IG51bGw7XG4gICAgICAgIGlmICgkbm90ZSA9PT0gbnVsbCB8fCAhJG5vdGUubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAkbm90ZS52YWwodHh0KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBUYWJCYXNlIH0gZnJvbSBcIi4uL2Jhc2UvVGFiQmFzZVwiO1xuZXhwb3J0IGNsYXNzIFRlbXBsYXRlc1RhYiBleHRlbmRzIFRhYkJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigndGVtcGxhdGVzJywgJ3RhYi1vcHRpb25zLWJveC10ZW1wbGF0ZXMnLCAnIzAwRkYwMCcpO1xuICAgICAgICB0aGlzLmtleVJlbW92ZUlmRW1wdHkgPSAncmVtb3ZlX2lmX2VtcHR5JztcbiAgICAgICAgdGhpcy5rZXlUZW1wbGF0ZXMgPSAndGVtcGxhdGVzJztcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXNpbmcgdGhlIHN0YXRlLCBwcmVwYXJlIHRoZSB0YWIuXG4gICAgICogQHBhcmFtIHN0YXRlIFRoZSBzdGF0ZSByZXR1cm5lZCBmcm9tIHtAbGluayBzYXZlU3RhdGV9XG4gICAgICogQHBhcmFtIHtvYmplY3R8bnVsbH0gc2V0dGluZ3MgQ3VycmVudCBzZXR0aW5ncyBmb3IgT3B0aW9ucyBCb3hcbiAgICAgKiBAcmV0dXJuIHZvaWRcbiAgICAgKi9cbiAgICByZXN0b3JlU3RhdGUoc3RhdGUsIHNldHRpbmdzKSB7XG4gICAgICAgIGxldCAkc2V0dGluZ3NDb250YWluZXIgPSB0aGlzLmdldFNldHRpbmdzQ29udGFpbmVyKCk7XG4gICAgICAgIHRoaXMuc2V0Q2hlY2tib3hWYWx1ZSgkc2V0dGluZ3NDb250YWluZXIsIHRoaXMua2V5UmVtb3ZlSWZFbXB0eSwgc3RhdGUpO1xuICAgICAgICB0aGlzLnJlc3RvcmVNdWx0aXBsZUlucHV0VmFsdWVzKCRzZXR0aW5nc0NvbnRhaW5lciwgc3RhdGUsIHRoaXMua2V5VGVtcGxhdGVzLCAoJGN1cnJlbnRJbnB1dEdyb3VwMSwgdmFsdWUpID0+IHRoaXMuc2V0SW5wdXRHcm91cFZhbHVlcygkY3VycmVudElucHV0R3JvdXAxLCB2YWx1ZSkpO1xuICAgICAgICAvLyBBcHBseSB0aGUgc2V0dGluZ3NcbiAgICAgICAgdGhpcy5hcHBseVNldHRpbmdzKHNldHRpbmdzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2F2ZSB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGlzIHRhYlxuICAgICAqIEByZXR1cm4gc3RhdGUgU3RhdGUgb2YgdGhpcyB0YWJcbiAgICAgKi9cbiAgICBzYXZlU3RhdGUoKSB7XG4gICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuZ2V0SW5wdXRWYWx1ZXNBc09iamVjdCgpO1xuICAgICAgICAvLyBUaGUgdmFsdWVzIGFyZSB1bmRlciB0aGUgbmFtZSBvZiB0aGUgaW5wdXQuIFNvLCBmaXJzdCwgZ2V0IHRoZSB2YWx1ZXMuXG4gICAgICAgIC8vIFRoZW4sIHJlbW92ZSBlbXB0eSBpdGVtcyBmcm9tIHRoZSB2YWx1ZXMgYXJyYXkuXG4gICAgICAgIHN0YXRlID0gdGhpcy5maWx0ZXJNdWx0aXBsZUlucHV0U3RhdGUoc3RhdGUsIHRoaXMua2V5VGVtcGxhdGVzLCAodmFsKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKHZhbFsndGVtcGxhdGUnXSB8fCBbXSkubGVuZ3RoO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIG51bWJlciBvZiBvcHRpb25zIGNvbmZpZ3VyZWQgaW4gdGhpcyB0YWJcbiAgICAgKiBAcGFyYW0gc3RhdGUgVGhlIHN0YXRlIHJldHVybmVkIGZyb20ge0BsaW5rIHNhdmVTdGF0ZX1cbiAgICAgKi9cbiAgICBnZXRDb25maWd1cmVkT3B0aW9uQ291bnQoc3RhdGUpIHtcbiAgICAgICAgbGV0IHRvdGFsID0gMDtcbiAgICAgICAgdG90YWwgKz0gKHN0YXRlW3RoaXMua2V5VGVtcGxhdGVzXSB8fCBbXSkubGVuZ3RoO1xuICAgICAgICBpZiAoc3RhdGUuaGFzT3duUHJvcGVydHkodGhpcy5rZXlSZW1vdmVJZkVtcHR5KSlcbiAgICAgICAgICAgIHRvdGFsICs9IDE7XG4gICAgICAgIHJldHVybiB0b3RhbDtcbiAgICB9XG4gICAgLypcbiAgICAgKlxuICAgICAqL1xuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHZhbHVlcyB0byB0aGUgdGVtcGxhdGVzIGlucHV0IGdyb3VwXG4gICAgICogQHBhcmFtIHsqfGpRdWVyeXxIVE1MRWxlbWVudH0gJGlucHV0R3JvdXBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGVtcGxhdGVcbiAgICAgKi9cbiAgICBzZXRJbnB1dEdyb3VwVmFsdWVzKCRpbnB1dEdyb3VwLCB0ZW1wbGF0ZSkge1xuICAgICAgICAkaW5wdXRHcm91cC5maW5kKCd0ZXh0YXJlYVtuYW1lJD1cIlt0ZW1wbGF0ZV1cIl0nKS52YWwodGVtcGxhdGVbJ3RlbXBsYXRlJ10pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBcHBsaWVzIHRoZSBzZXR0aW5nc1xuICAgICAqIEBwYXJhbSBzZXR0aW5nc1xuICAgICAqL1xuICAgIGFwcGx5U2V0dGluZ3Moc2V0dGluZ3MpIHtcbiAgICAgICAgY29uc3QgJGJ1dHRvbnMgPSB0aGlzLmdldFNob3J0Q29kZUJ1dHRvbnMoKTtcbiAgICAgICAgY29uc3QgY29uZmlnID0gc2V0dGluZ3MgfHwgW107XG4gICAgICAgIGNvbnN0IGFsbG93ZWRTaG9ydENvZGVzID0gY29uZmlnWydhbGxvd2VkU2hvcnRDb2RlcyddIHx8IG51bGw7XG4gICAgICAgIC8vIElmIGFsbG93ZWQgc2hvcnQgY29kZXMgYXJlIG5vdCBkZWZpbmVkLCBzaG93IGFsbCBzaG9ydCBjb2Rlcy5cbiAgICAgICAgaWYgKGFsbG93ZWRTaG9ydENvZGVzID09PSBudWxsKSB7XG4gICAgICAgICAgICAkYnV0dG9ucy5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICAvLyBPdGhlcndpc2UsIHNob3cgb25seSB0aGUgbmVjZXNzYXJ5IG9uZXMuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkYnV0dG9ucy5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBDU1Mgc2VsZWN0b3IgdGhhdCBzZWxlY3RzIGFsbCB0by1iZS1zaG93biBzaG9ydCBjb2RlIGJ1dHRvbnNcbiAgICAgICAgICAgIC8vIFtkYXRhLW5hbWU9XCJzaG9ydC1jb2RlLW5hbWUtMVwiXSwgW2RhdGEtbmFtZT1cInNob3J0LWNvZGUtbmFtZS0yXCJdLCBbZGF0YS1uYW1lPVwic2hvcnQtY29kZS1uYW1lLTNcIl1cbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdG9yID0gYWxsb3dlZFNob3J0Q29kZXMubWFwKGtleSA9PiAoJ1tkYXRhLXNob3J0Y29kZS1uYW1lPVwiJyArIGtleSArICdcIl0nKSkuam9pbignLCAnKTtcbiAgICAgICAgICAgIC8vIFNob3cgdGhlbVxuICAgICAgICAgICAgdGhpcy5nZXRUYWJDb250YWluZXIoKS5maW5kKHNlbGVjdG9yKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHNob3J0IGNvZGUgYnV0dG9uc1xuICAgICAqL1xuICAgIGdldFNob3J0Q29kZUJ1dHRvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFRhYkNvbnRhaW5lcigpLmZpbmQoJy5zaG9ydC1jb2RlLWNvbnRhaW5lciBidXR0b24nKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBGaW5kUmVwbGFjZVRhYkJhc2UgfSBmcm9tIFwiLi4vYmFzZS9GaW5kUmVwbGFjZVRhYkJhc2VcIjtcbmV4cG9ydCBjbGFzcyBGaWxlRmluZFJlcGxhY2VUYWIgZXh0ZW5kcyBGaW5kUmVwbGFjZVRhYkJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignZmlsZUZpbmRSZXBsYWNlJywgJ3RhYi1vcHRpb25zLWJveC1maWxlLWZpbmQtcmVwbGFjZScsICcjRkYwMDAwJyk7XG4gICAgfVxuICAgIGdldEtleUZpbmRSZXBsYWNlcygpIHtcbiAgICAgICAgcmV0dXJuICdmaWxlX2ZpbmRfcmVwbGFjZSc7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgVGFiQmFzZSB9IGZyb20gXCIuLi9iYXNlL1RhYkJhc2VcIjtcbmV4cG9ydCBjbGFzcyBGaWxlT3BlcmF0aW9uc1RhYiBleHRlbmRzIFRhYkJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignZmlsZU9wZXJhdGlvbnMnLCAndGFiLW9wdGlvbnMtYm94LWZpbGUtb3BlcmF0aW9ucycsICcjZmZmZDAwJyk7XG4gICAgICAgIHRoaXMua2V5TW92ZSA9ICdtb3ZlJztcbiAgICAgICAgdGhpcy5rZXlDb3B5ID0gJ2NvcHknO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2luZyB0aGUgc3RhdGUsIHByZXBhcmUgdGhlIHRhYi5cbiAgICAgKiBAcGFyYW0gc3RhdGUgVGhlIHN0YXRlIHJldHVybmVkIGZyb20ge0BsaW5rIHNhdmVTdGF0ZX1cbiAgICAgKiBAcGFyYW0ge29iamVjdHxudWxsfSBzZXR0aW5ncyBDdXJyZW50IHNldHRpbmdzIGZvciBPcHRpb25zIEJveFxuICAgICAqIEByZXR1cm4gdm9pZFxuICAgICAqL1xuICAgIHJlc3RvcmVTdGF0ZShzdGF0ZSwgc2V0dGluZ3MpIHtcbiAgICAgICAgbGV0ICRzZXR0aW5nc0NvbnRhaW5lciA9IHRoaXMuZ2V0U2V0dGluZ3NDb250YWluZXIoKTtcbiAgICAgICAgbGV0IGNhbGxiYWNrID0gKCRjdXJyZW50SW5wdXRHcm91cCwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgICRjdXJyZW50SW5wdXRHcm91cC5maW5kKCdpbnB1dCcpLmZpcnN0KCkudmFsKHZhbHVlWydwYXRoJ10gfHwgJycpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJlc3RvcmVNdWx0aXBsZUlucHV0VmFsdWVzKCRzZXR0aW5nc0NvbnRhaW5lciwgc3RhdGUsIHRoaXMua2V5Q29weSwgY2FsbGJhY2spO1xuICAgICAgICB0aGlzLnJlc3RvcmVNdWx0aXBsZUlucHV0VmFsdWVzKCRzZXR0aW5nc0NvbnRhaW5lciwgc3RhdGUsIHRoaXMua2V5TW92ZSwgY2FsbGJhY2spO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTYXZlIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoaXMgdGFiXG4gICAgICogQHJldHVybiBzdGF0ZSBTdGF0ZSBvZiB0aGlzIHRhYlxuICAgICAqL1xuICAgIHNhdmVTdGF0ZSgpIHtcbiAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5nZXRJbnB1dFZhbHVlc0FzT2JqZWN0KCk7XG4gICAgICAgIGxldCBjYWxsYmFjayA9ICh2YWwpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAodmFsWydwYXRoJ10gfHwgW10pLmxlbmd0aDtcbiAgICAgICAgfTtcbiAgICAgICAgc3RhdGUgPSB0aGlzLmZpbHRlck11bHRpcGxlSW5wdXRTdGF0ZShzdGF0ZSwgdGhpcy5rZXlDb3B5LCBjYWxsYmFjayk7XG4gICAgICAgIHN0YXRlID0gdGhpcy5maWx0ZXJNdWx0aXBsZUlucHV0U3RhdGUoc3RhdGUsIHRoaXMua2V5TW92ZSwgY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgbnVtYmVyIG9mIG9wdGlvbnMgY29uZmlndXJlZCBpbiB0aGlzIHRhYlxuICAgICAqIEBwYXJhbSBzdGF0ZSBUaGUgc3RhdGUgcmV0dXJuZWQgZnJvbSB7QGxpbmsgc2F2ZVN0YXRlfVxuICAgICAqL1xuICAgIGdldENvbmZpZ3VyZWRPcHRpb25Db3VudChzdGF0ZSkge1xuICAgICAgICBsZXQgdG90YWwgPSAwO1xuICAgICAgICB0b3RhbCArPSAoc3RhdGVbdGhpcy5rZXlDb3B5XSB8fCBbXSkubGVuZ3RoO1xuICAgICAgICB0b3RhbCArPSAoc3RhdGVbdGhpcy5rZXlNb3ZlXSB8fCBbXSkubGVuZ3RoO1xuICAgICAgICByZXR1cm4gdG90YWw7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgVGFiQmFzZSB9IGZyb20gXCIuLi9iYXNlL1RhYkJhc2VcIjtcbmV4cG9ydCBjbGFzcyBGaWxlVGVtcGxhdGVzVGFiIGV4dGVuZHMgVGFiQmFzZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdmaWxlVGVtcGxhdGVzJywgJ3RhYi1vcHRpb25zLWJveC1maWxlLXRlbXBsYXRlcycsICcjMDBmZjFjJyk7XG4gICAgICAgIHRoaXMua2V5TmFtZSA9ICd0ZW1wbGF0ZXNfZmlsZV9uYW1lJztcbiAgICAgICAgdGhpcy5rZXlUaXRsZSA9ICd0ZW1wbGF0ZXNfbWVkaWFfdGl0bGUnO1xuICAgICAgICB0aGlzLmtleURlc2NyaXB0aW9uID0gJ3RlbXBsYXRlc19tZWRpYV9kZXNjcmlwdGlvbic7XG4gICAgICAgIHRoaXMua2V5Q2FwdGlvbiA9ICd0ZW1wbGF0ZXNfbWVkaWFfY2FwdGlvbic7XG4gICAgICAgIHRoaXMua2V5QWx0ID0gJ3RlbXBsYXRlc19tZWRpYV9hbHRfdGV4dCc7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JBbGxUZW1wbGF0ZXMgPSAndHIuZmlsZS10ZW1wbGF0ZSc7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVzaW5nIHRoZSBzdGF0ZSwgcHJlcGFyZSB0aGUgdGFiLlxuICAgICAqIEBwYXJhbSBzdGF0ZSBUaGUgc3RhdGUgcmV0dXJuZWQgZnJvbSB7QGxpbmsgc2F2ZVN0YXRlfVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fG51bGx9IHNldHRpbmdzIEN1cnJlbnQgc2V0dGluZ3MgZm9yIE9wdGlvbnMgQm94XG4gICAgICogQHJldHVybiB2b2lkXG4gICAgICovXG4gICAgcmVzdG9yZVN0YXRlKHN0YXRlLCBzZXR0aW5ncykge1xuICAgICAgICBsZXQgJHNldHRpbmdzQ29udGFpbmVyID0gdGhpcy5nZXRTZXR0aW5nc0NvbnRhaW5lcigpO1xuICAgICAgICBmb3IgKGxldCBrZXkgb2YgdGhpcy5nZXRBbGxLZXlzKCkpIHtcbiAgICAgICAgICAgIHRoaXMucmVzdG9yZU11bHRpcGxlSW5wdXRWYWx1ZXMoJHNldHRpbmdzQ29udGFpbmVyLCBzdGF0ZSwga2V5LCAoJGN1cnJlbnRJbnB1dEdyb3VwLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICRjdXJyZW50SW5wdXRHcm91cC5maW5kKCd0ZXh0YXJlYVtuYW1lJD1cIlt0ZW1wbGF0ZV1cIl0nKS52YWwodmFsdWVbJ3RlbXBsYXRlJ10pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQXBwbHkgdGhlIHNldHRpbmdzXG4gICAgICAgIHRoaXMuYXBwbHlTZXR0aW5ncyhzZXR0aW5ncyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNhdmUgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhpcyB0YWJcbiAgICAgKiBAcmV0dXJuIHN0YXRlIFN0YXRlIG9mIHRoaXMgdGFiXG4gICAgICovXG4gICAgc2F2ZVN0YXRlKCkge1xuICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLmdldElucHV0VmFsdWVzQXNPYmplY3QoKTtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIHRoaXMuZ2V0QWxsS2V5cygpKSB7XG4gICAgICAgICAgICAvLyBUaGUgdmFsdWVzIGFyZSB1bmRlciB0aGUgbmFtZSBvZiB0aGUgaW5wdXQuIFNvLCBmaXJzdCwgZ2V0IHRoZSB2YWx1ZXMuXG4gICAgICAgICAgICAvLyBUaGVuLCByZW1vdmUgZW1wdHkgaXRlbXMgZnJvbSB0aGUgdmFsdWVzIGFycmF5LlxuICAgICAgICAgICAgc3RhdGUgPSB0aGlzLmZpbHRlck11bHRpcGxlSW5wdXRTdGF0ZShzdGF0ZSwga2V5LCAodmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh2YWxbJ3RlbXBsYXRlJ10gfHwgW10pLmxlbmd0aDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBudW1iZXIgb2Ygb3B0aW9ucyBjb25maWd1cmVkIGluIHRoaXMgdGFiXG4gICAgICogQHBhcmFtIHN0YXRlIFRoZSBzdGF0ZSByZXR1cm5lZCBmcm9tIHtAbGluayBzYXZlU3RhdGV9XG4gICAgICovXG4gICAgZ2V0Q29uZmlndXJlZE9wdGlvbkNvdW50KHN0YXRlKSB7XG4gICAgICAgIGxldCBhbGxLZXlzID0gdGhpcy5nZXRBbGxLZXlzKCk7XG4gICAgICAgIC8vIFJldHVybiB0aGUgdG90YWwgbnVtYmVyIG9mIGlucHV0IGNvdW50XG4gICAgICAgIHJldHVybiBhbGxLZXlzLnJlZHVjZSgoYWNjdW11bGF0b3IsIGN1cnJlbnRWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGFjY3VtdWxhdG9yICsgKHN0YXRlW2N1cnJlbnRWYWx1ZV0gfHwgW10pLmxlbmd0aDtcbiAgICAgICAgfSwgMCk7XG4gICAgfVxuICAgIC8qXG4gICAgICpcbiAgICAgKi9cbiAgICAvKipcbiAgICAgKiBBcHBsaWVzIHRoZSBzZXR0aW5nc1xuICAgICAqIEBwYXJhbSBzZXR0aW5nc1xuICAgICAqL1xuICAgIGFwcGx5U2V0dGluZ3Moc2V0dGluZ3MpIHtcbiAgICAgICAgY29uc3QgY29uZmlnID0gc2V0dGluZ3MgfHwgW107XG4gICAgICAgIGNvbnN0IGFsbG93ZWRUZW1wbGF0ZVR5cGVzID0gY29uZmlnWydhbGxvd2VkVGVtcGxhdGVUeXBlcyddIHx8IG51bGw7XG4gICAgICAgIGxldCAkdGFiQ29udGFpbmVyID0gdGhpcy5nZXRUYWJDb250YWluZXIoKTtcbiAgICAgICAgLy8gSWYgdGhlIG1lZGlhIHRlbXBsYXRlcyBzaG91bGQgYmUgaGlkZGVuLCBoaWRlIHRoZW0uXG4gICAgICAgIGlmIChhbGxvd2VkVGVtcGxhdGVUeXBlcyAhPT0gbnVsbCAmJiBhbGxvd2VkVGVtcGxhdGVUeXBlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIEhpZGUgYWxsIHRlbXBsYXRlcyBmaXJzdFxuICAgICAgICAgICAgJHRhYkNvbnRhaW5lci5maW5kKHRoaXMuc2VsZWN0b3JBbGxUZW1wbGF0ZXMpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIC8vIFNob3cgdGhlIG9uZXMgdGhhdCBhcmUgYWxsb3dlZFxuICAgICAgICAgICAgZm9yIChsZXQgaWQgb2YgYWxsb3dlZFRlbXBsYXRlVHlwZXMpIHtcbiAgICAgICAgICAgICAgICAkdGFiQ29udGFpbmVyLmZpbmQoJ3RyIycgKyBpZCkucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCBtYWtlIHN1cmUgYWxsIG9mIHRoZW0gYXJlIHNob3duLlxuICAgICAgICAgICAgJHRhYkNvbnRhaW5lci5maW5kKHRoaXMuc2VsZWN0b3JBbGxUZW1wbGF0ZXMpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGtleXMgZm9yIHRoZSB0ZW1wbGF0ZSBvcHRpb25zIG9mIHRoaXMgdGFiXG4gICAgICovXG4gICAgZ2V0QWxsS2V5cygpIHtcbiAgICAgICAgaWYgKEZpbGVUZW1wbGF0ZXNUYWIuYWxsS2V5cyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgRmlsZVRlbXBsYXRlc1RhYi5hbGxLZXlzID0gW3RoaXMua2V5TmFtZSwgdGhpcy5rZXlUaXRsZSwgdGhpcy5rZXlEZXNjcmlwdGlvbiwgdGhpcy5rZXlDYXB0aW9uLCB0aGlzLmtleUFsdF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEZpbGVUZW1wbGF0ZXNUYWIuYWxsS2V5cztcbiAgICB9XG59XG5GaWxlVGVtcGxhdGVzVGFiLmFsbEtleXMgPSBudWxsO1xuIiwiaW1wb3J0IHsgT3B0aW9uc0JveCB9IGZyb20gXCIuL2FwcC9PcHRpb25zQm94XCI7XG5qUXVlcnkoZnVuY3Rpb24gKCQpIHtcbiAgICAvLyBJbml0IHRoZSBvcHRpb25zIGJveC5cbiAgICBPcHRpb25zQm94LmdldEluc3RhbmNlKCk7XG59KTtcbiIsImV4cG9ydCBjbGFzcyBQb3N0U2V0dGluZ3NWYXJpYWJsZXMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLiRjb250YWluZXJNZXRhQm94ID0gJCgnLndjYy1zZXR0aW5ncy1tZXRhLWJveCcpO1xuICAgICAgICB0aGlzLiRjb250YWluZXJUYWJzID0gJCgnLndjYy1zZXR0aW5ncy1tZXRhLWJveCA+IC5uYXYtdGFiLXdyYXBwZXInKTtcbiAgICAgICAgdGhpcy4kZm9ybSA9ICQoXCIjcG9zdFwiKTtcbiAgICAgICAgdGhpcy4kZXJyb3JBbGVydCA9ICQoXCIjd2NjLWFsZXJ0XCIpO1xuICAgICAgICB0aGlzLiR3Y2NOb25jZSA9ICQoXCIjd2NjX25vbmNlXCIpO1xuICAgICAgICB0aGlzLiRhZG1pbkJhciA9ICQoXCIjd3BhZG1pbmJhclwiKTtcbiAgICAgICAgdGhpcy5zZWxlY3RvckNhdGVnb3J5TWFwID0gXCIjY2F0ZWdvcnktbWFwXCI7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JUYWJNYWluID0gXCIjdGFiLW1haW5cIjtcbiAgICAgICAgdGhpcy5zZWxlY3RvclRhYlBvc3QgPSBcIiN0YWItcG9zdFwiO1xuICAgICAgICB0aGlzLnNlbGVjdG9yVGFiQ2F0ZWdvcnkgPSBcIiN0YWItY2F0ZWdvcnlcIjtcbiAgICAgICAgdGhpcy5zZWxlY3RvclRhYkdzUG9zdCA9IFwiI3RhYi1ncy1wb3N0XCI7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JUYWJHZW5lcmFsU2V0dGluZ3MgPSBcIiN0YWItZ2VuZXJhbC1zZXR0aW5nc1wiO1xuICAgICAgICB0aGlzLnNlbGVjdG9yVGVzdEJ1dHRvbiA9ICcud2NjLXRlc3QnO1xuICAgICAgICB0aGlzLnNlbGVjdG9ySW5wdXRDb250YWluZXJQYXNzd29yZHMgPSAnLmlucHV0LWNvbnRhaW5lci1wYXNzd29yZHMnO1xuICAgICAgICB0aGlzLnNlbGVjdG9yTG9hZEdlbmVyYWxTZXR0aW5nc0J1dHRvbiA9ICcjYnRuLWxvYWQtZ2VuZXJhbC1zZXR0aW5ncyc7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JDbGVhckdlbmVyYWxTZXR0aW5nc0J1dHRvbiA9ICcjYnRuLWNsZWFyLWdlbmVyYWwtc2V0dGluZ3MnO1xuICAgICAgICB0aGlzLnNlbGVjdG9ySW5wdXRJbXBvcnQgPSAnI19wb3N0X2ltcG9ydF9zZXR0aW5ncyc7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JMb2FkVHJhbnNsYXRpb25MYW5ndWFnZXMgPSAnLmxvYWQtbGFuZ3VhZ2VzJztcbiAgICAgICAgdGhpcy5zZWxlY3RvcklucHV0VVJMSGFzaCA9IFwiaW5wdXRbbmFtZT0ndXJsX2hhc2gnXVwiO1xuICAgICAgICB0aGlzLmlucHV0TmFtZUNvb2tpZXMgPSAnX2Nvb2tpZXMnO1xuICAgICAgICB0aGlzLmJhc2VIdG1sTWFuaXB1bGF0aW9uSW5wdXROYW1lcyA9IFtcbiAgICAgICAgICAgICdmaW5kX3JlcGxhY2VfcmF3X2h0bWwnLFxuICAgICAgICAgICAgJ2ZpbmRfcmVwbGFjZV9maXJzdF9sb2FkJyxcbiAgICAgICAgICAgICdmaW5kX3JlcGxhY2VfZWxlbWVudF9hdHRyaWJ1dGVzJyxcbiAgICAgICAgICAgICdleGNoYW5nZV9lbGVtZW50X2F0dHJpYnV0ZXMnLFxuICAgICAgICAgICAgJ3JlbW92ZV9lbGVtZW50X2F0dHJpYnV0ZXMnLFxuICAgICAgICAgICAgJ2ZpbmRfcmVwbGFjZV9lbGVtZW50X2h0bWwnLFxuICAgICAgICAgICAgJ3VubmVjZXNzYXJ5X2VsZW1lbnRfc2VsZWN0b3JzJ1xuICAgICAgICBdO1xuICAgICAgICB0aGlzLnNlbGVjdG9yT3JpZ2luYWxUZXN0UmVzdWx0cyA9ICcub3JpZ2luYWwtcmVzdWx0cyc7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JCdXR0b25TZWVVbm1vZGlmaWVkVGVzdFJlc3VsdHMgPSB0aGlzLnNlbGVjdG9yT3JpZ2luYWxUZXN0UmVzdWx0cyArICcgLnNlZS11bm1vZGlmaWVkLXJlc3VsdHMnO1xuICAgICAgICB0aGlzLnNlbGVjdG9ySW52YWxpZGF0ZUNhY2hlQnV0dG9uID0gJy5pbnZhbGlkYXRlLWNhY2hlLWZvci10aGlzLXVybCc7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JJbnZhbGlkYXRlQWxsQ2FjaGVzQnV0dG9uID0gJy5pbnZhbGlkYXRlLWFsbC10ZXN0LXVybC1jYWNoZXMnO1xuICAgICAgICB0aGlzLnNlbGVjdG9yUXVpY2tTYXZlQnV0dG9uID0gJy5xdWljay1zYXZlLWNvbnRhaW5lciAucXVpY2stc2F2ZSc7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JFeHBvcnRTZXR0aW5nc1RleHRBcmVhID0gJyNfcG9zdF9leHBvcnRfc2V0dGluZ3MnO1xuICAgICAgICB0aGlzLmNsc0hhc0Vycm9yID0gJ2hhcy1lcnJvcic7XG4gICAgICAgIHRoaXMuJGlucHV0QWN0aW9uID0gJChcIiNoaWRkZW5hY3Rpb25cIik7XG4gICAgICAgIHRoaXMuaW5mb1RleHRzSGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jbGFzc0ZpeGVkID0gJ3dwY2MtZml4ZWQnO1xuICAgICAgICB0aGlzLnNlbGVjdG9yRml4YWJsZSA9ICcuZml4YWJsZSc7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JDaGVja2JveEZpeFRhYnMgPSAnI19maXhfdGFicyc7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JDaGVja2JveEZpeENvbnRlbnROYXZpZ2F0aW9uID0gJyNfZml4X2NvbnRlbnRfbmF2aWdhdGlvbic7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoaXMgY2xhc3MgaXMgYSBzaW5nbGV0b24uIEdldCB0aGUgaW5zdGFuY2Ugd2l0aCB0aGlzIG1ldGhvZC5cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgICAgIGlmICh0aGlzLklOU1RBTkNFID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLklOU1RBTkNFID0gbmV3IFBvc3RTZXR0aW5nc1ZhcmlhYmxlcygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLklOU1RBTkNFO1xuICAgIH1cbn1cblBvc3RTZXR0aW5nc1ZhcmlhYmxlcy5JTlNUQU5DRSA9IG51bGw7XG4iLCJpbXBvcnQgeyBOb3RpZmllciB9IGZyb20gXCIuLi8uLi9jb21tb24tdHMvTm90aWZpZXJcIjtcbmltcG9ydCB7IFBvc3RTZXR0aW5nc1ZhcmlhYmxlcyB9IGZyb20gXCIuL1Bvc3RTZXR0aW5nc1ZhcmlhYmxlc1wiO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uLXRzL1V0aWxzXCI7XG5leHBvcnQgY2xhc3MgVGVzdERhdGFQcmVwYXJlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubm90aWZpZXIgPSBOb3RpZmllci5nZXRJbnN0YW5jZSgpO1xuICAgICAgICB0aGlzLnBzdiA9IFBvc3RTZXR0aW5nc1ZhcmlhYmxlcy5nZXRJbnN0YW5jZSgpO1xuICAgICAgICAvKipcbiAgICAgICAgICogU3RvcmVzIHRoZSBsYXRlc3QgY2xpY2tlZCBvcHRpb25zIGJveCBidXR0b24uIElmIHRoaXMgaXMgbm90IG51bGwsIHRoZW4gdGhlIG9wdGlvbnMgYm94IGZvciB0aGlzIGJ1dHRvbiBpcyBjdXJyZW50bHlcbiAgICAgICAgICogb3Blbi5cbiAgICAgICAgICogQHR5cGUge251bGx8T2JqZWN0fGpRdWVyeX1cbiAgICAgICAgICovXG4gICAgICAgIHdpbmRvdy4kbGFzdENsaWNrZWRPcHRpb25zQm94QnV0dG9uID0gbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhpcyBjbGFzcyBpcyBhIHNpbmdsZXRvbi4gR2V0IHRoZSBpbnN0YW5jZSB3aXRoIHRoaXMgbWV0aG9kLlxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuSU5TVEFOQ0UgPT09IG51bGwpXG4gICAgICAgICAgICB0aGlzLklOU1RBTkNFID0gbmV3IFRlc3REYXRhUHJlcGFyZXIoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuSU5TVEFOQ0U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFByZXBhcmVzIHRoZSBkYXRhIHRoYXQgd2lsbCBiZSBzZW50IHdpdGggdGhlIEFKQVggcmVxdWVzdCB3aGVuIGNvbmR1Y3RpbmcgdGVzdHNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAkdGVzdEJ1dHRvbiBUaGUgdGVzdCBidXR0b24gdGhhdCBpcyBjbGlja2VkXG4gICAgICogQHJldHVybnMge251bGx8b2JqZWN0fVxuICAgICAqL1xuICAgIHByZXBhcmVUZXN0RGF0YSgkdGVzdEJ1dHRvbikge1xuICAgICAgICAvLyBHZXQgdGhlIHJlcXVpcmVkIGRhdGEgZnJvbSB0aGUgdGVzdCBidXR0b24uXG4gICAgICAgIGxldCBtRGF0YSA9ICR0ZXN0QnV0dG9uLmRhdGEoXCJ3Y2NcIik7XG4gICAgICAgIC8vIERvIG5vdCBwcm9jZWVkIGlmIHRoZSBkYXRhIGRvZXMgbm90IGV4aXN0LlxuICAgICAgICBpZiAobURhdGEgPT0gdW5kZWZpbmVkIHx8ICFtRGF0YSlcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAvLyBDbG9uZSB0aGUgb2JqZWN0LlxuICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobURhdGEpKTtcbiAgICAgICAgZGF0YSA9IHRoaXMuYWRkU2V0dGluZ3NUb0FqYXhEYXRhKGRhdGEpO1xuICAgICAgICAvLyBHZXQgdGhlIGlucHV0cyAodGV4dGFyZWEsIGJ1dHRvbiwgc2VsZWN0LCBhbmQgaW5wdXQgZWxlbWVudHMpIHdpdGggbmFtZVxuICAgICAgICBsZXQgJGlucHV0cyA9ICR0ZXN0QnV0dG9uLmNsb3Nlc3QoXCIuaW5wdXQtZ3JvdXBcIikuZmluZCgnOmlucHV0W25hbWVdJyk7XG4gICAgICAgIGlmICghJGlucHV0cy5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgLypcbiAgICAgICAgICogUkVRVUlSRUQgRUxFTUVOVFNcbiAgICAgICAgICovXG4gICAgICAgIC8vIEdldCB0aGUgcmVxdWlyZWQgZWxlbWVudCBzZWxlY3RvcnMsIGlmIHRoZXJlIGFyZSBhbnlcbiAgICAgICAgbGV0IGFsbFNlbGVjdG9yc1JlcXVpcmVkID0gdHJ1ZSwgcmVxdWlyZWRFbEV4cHIgPSBtRGF0YVtcInJlcXVpcmVkU2VsZWN0b3JzXCJdO1xuICAgICAgICBpZiAocmVxdWlyZWRFbEV4cHIgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBJZiByZXF1aXJlZCBlbGVtZW50IHNlbGVjdG9ycyBhcmUgc3VwcGxpZWQsIHRoYXQgbWVhbnMgbm90IGFsbCBvZiB0aGUgXCJTZWxlY3RvclwicyBpbiB0aGUgZGF0YSBhcmUgcmVxdWlyZWQuXG4gICAgICAgICAgICBhbGxTZWxlY3RvcnNSZXF1aXJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gSWYgdGhlcmUgYXJlIHJlcXVpcmVkIHNlbGVjdG9ycywgZ2V0IHRoZWlyIHZhbHVlcyBhbmQgbm90aWZ5IHRoZSB1c2VyXG4gICAgICAgICAgICBpZiAocmVxdWlyZWRFbEV4cHIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgLy8gRmlyc3QsIHdlIG5lZWQgdG8gcHJlcGFyZSB0aGUgZXhwcmVzc2lvbiBzdHJpbmcuIEhlcmUgaXMgYW4gZXhhbXBsZSBleHByZXNzaW9uIHN0cmluZ1xuICAgICAgICAgICAgICAgIC8vICguc2VsMSB8ICggLnNlbDIgJiAuc2VsNyApICkgJiAoIC5zZWwyIHwgLnNlbDMpICYgLnNlbDUgJiNzZWw0XG4gICAgICAgICAgICAgICAgLy8gQXBwZW5kIGFuZCBwcmVwZW5kIGEgc3BhY2UgYXMgd2VsbC5cbiAgICAgICAgICAgICAgICByZXF1aXJlZEVsRXhwciA9IFwiIFwiICsgcmVxdWlyZWRFbEV4cHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyhbKCkmfF0pL2csIFwiICQxIFwiKSAvLyBGaXJzdCBzdXJyb3VuZCBldmVyeSBzcGVjaWFsIGNoYXIsIHN1Y2ggYXMgKCApICYsIHdpdGggc3BhY2VcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcc3syLH0vZywgXCIgXCIpIC8vIEFuZCBnZXQgcmlkIG9mIG11bHRpcGxlIHNwYWNlcy5cbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcJi9nLCAnJiYnKSAvLyBSZXBsYWNlIHNpbmdsZSAmIHdpdGggJiZcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcfC9nLCAnfHwnKSAvLyBSZXBsYWNlIHNpbmdsZSB8IHdpdGggfHxcbiAgICAgICAgICAgICAgICAgICAgLnRyaW0oKSArIFwiIFwiO1xuICAgICAgICAgICAgICAgIC8vIE5vdywgZ2V0IHRoZSBzZWxlY3RvcnNcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0b3JNYXRjaGVzID0gcmVxdWlyZWRFbEV4cHIubWF0Y2goLyhbI1xcW1xcXT1cXF5+LmEtejAtOV9cXC1cIiddKylcXHM/L2cpO1xuICAgICAgICAgICAgICAgIGxldCBldmFsU3RyID0gcmVxdWlyZWRFbEV4cHIsIGN1cnJlbnRTZWxlY3RvciwgJGVsLCB2YWx1ZUV4aXN0cywgcmVxdWlyZWRFbHMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIHNlbGVjdG9yTWF0Y2hlcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXNlbGVjdG9yTWF0Y2hlcy5oYXNPd25Qcm9wZXJ0eShpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2VsZWN0b3IgPSBzZWxlY3Rvck1hdGNoZXNbaV0udHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWN1cnJlbnRTZWxlY3Rvci5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgLy9sKFwiQ3VycmVudCBzZWxlY3RvclwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy9sKGN1cnJlbnRTZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgICRlbCA9ICQoY3VycmVudFNlbGVjdG9yKS5maXJzdCgpO1xuICAgICAgICAgICAgICAgICAgICAvL2woXCJFc2NhcGVkIHNlbGVjdG9yOlwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy9sKGVzY2FwZVJlZ0V4cChjdXJyZW50U2VsZWN0b3IpKTtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVFeGlzdHMgPSAkZWwubGVuZ3RoICYmICRlbC52YWwoKSAhPSB1bmRlZmluZWQgJiYgJGVsLnZhbCgpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF2YWx1ZUV4aXN0cyAmJiAkZWwubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRFbHMucHVzaCgkZWwpO1xuICAgICAgICAgICAgICAgICAgICBldmFsU3RyID0gZXZhbFN0ci5yZXBsYWNlKG5ldyBSZWdFeHAodGhpcy5lc2NhcGVSZWdFeHAoY3VycmVudFNlbGVjdG9yKSArIFwiXFxcXHNcIiwgXCJnXCIpLCB2YWx1ZUV4aXN0cyA/ICd0cnVlICcgOiAnZmFsc2UgJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBldmFsdWF0aW9uIGlzIGZhbHNlIGFuZCB0aGVyZSBhcmUgcmVxdWlyZWQgZWxlbWVudHMsIG5vdGlmeSB0aGUgdXNlciBmb3IgYSByZXF1aXJlZCBlbGVtZW50LlxuICAgICAgICAgICAgICAgIGlmICghZXZhbChldmFsU3RyKSAmJiByZXF1aXJlZEVscy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1heCA9IHJlcXVpcmVkRWxzLmxlbmd0aCAtIDEsIG1pbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpZXIubm90aWZ5KHJlcXVpcmVkRWxzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW5dLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLypcbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIC8vIElmIHRoZXJlIGFyZSBzZWxlY3RvcnMgaW4gdGhlIGRhdGEsIGdldCB0aGUgdmFsdWVzIGZyb20gdGhvc2UgZWxlbWVudHMgd2hvc2Ugc2VsZWN0b3JzIGFyZSBkZWZpbmVkIGluIHRoZSBkYXRhXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgdGhlIGtleSBlbmRzIHdpdGggXCJTZWxlY3RvclwiLlxuICAgICAgICAgICAgaWYgKCFkYXRhLmhhc093blByb3BlcnR5KGtleSkgfHwgIS9TZWxlY3RvciQvLnRlc3Qoa2V5KSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIC8vIEZpbmQgdGhlIHRhcmdldCBlbGVtZW50XG4gICAgICAgICAgICBsZXQgJHRhcmdldEVsID0gJChkYXRhW2tleV0pO1xuICAgICAgICAgICAgLy8gSWYgYWxsIHNlbGVjdG9ycyBhcmUgcmVxdWlyZWQgYW5kIHRoaXMgZWxlbWVudCdzIHZhbHVlIGlzIGVtcHR5LCBub3RpZnkgdGhlIHVzZXIgYW5kIHJldHVybiBudWxsLlxuICAgICAgICAgICAgaWYgKGFsbFNlbGVjdG9yc1JlcXVpcmVkICYmICgkdGFyZ2V0RWwudmFsKCkgPT0gdW5kZWZpbmVkIHx8ICEkdGFyZ2V0RWwudmFsKCkubGVuZ3RoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpZXIubm90aWZ5KCR0YXJnZXRFbCwgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgc2VsZWN0b3IgdmFsdWUgZnJvbSB0aGUgZGF0YSwgc2luY2Ugd2UgZG8gbm90IG5lZWQgaXQuXG4gICAgICAgICAgICBkZWxldGUgZGF0YVtrZXldO1xuICAgICAgICAgICAgaWYgKCEkdGFyZ2V0RWwubGVuZ3RoKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgLy8gQWRkIHRoZSBrZXkgd2l0aCBpdHMgdmFsdWUgdG8gdGhlIGRhdGEgdG8gYmUgc2VudCBieSByZW1vdmluZyBcIlNlbGVjdG9yXCIgZnJvbSB0aGUga2V5LlxuICAgICAgICAgICAgaWYgKCR0YXJnZXRFbC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICBkYXRhW2tleS5yZXBsYWNlKFwiU2VsZWN0b3JcIiwgXCJcIildID0gJHRhcmdldEVsLnZhbCgpIHx8IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhlcmUgYXJlIGV4dHJhIHNlbGVjdG9ycyBpbiB0aGUgZGF0YSwgZ2V0IHRoZSB2YWx1ZXMgZm9yIHRob3NlIGFuZCBhZGQgdGhlbSB0byB0aGUgZGF0YVxuICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgnZXh0cmEnKSkge1xuICAgICAgICAgICAgbGV0IGV4dHJhID0gZGF0YS5leHRyYTtcbiAgICAgICAgICAgIGxldCBleHRyYVByZXBhcmVkID0ge307XG4gICAgICAgICAgICBsZXQgaXRlbSwgdmFsO1xuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIGV4dHJhKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFleHRyYS5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBpdGVtID0gZXh0cmFba2V5XTtcbiAgICAgICAgICAgICAgICAvLyBUaGUgaXRlbSBtdXN0IGhhdmUgJ3NlbGVjdG9yJyBhbmQgJ2RhdGEnIGtleXMsIHdoZXJlIHRoZSBzZWxlY3RvciBpcyB0aGUgdGFyZ2V0IGVsZW1lbnQncyBzZWxlY3RvciBhbmRcbiAgICAgICAgICAgICAgICAvLyB0aGUgZGF0YSBpcyB0aGUgZGF0YSBrZXkgdW5kZXIgd2hpY2ggdGhlIGRhdGEgaXMgc3RvcmVkIGluIHRoZSBlbGVtZW50IHdob3NlIHNlbGVjdG9yIGlzIGdpdmVuLlxuICAgICAgICAgICAgICAgIGlmICghaXRlbS5oYXNPd25Qcm9wZXJ0eSgnc2VsZWN0b3InKSB8fCAhaXRlbS5oYXNPd25Qcm9wZXJ0eSgnZGF0YScpKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB2YWwgPSAkKGl0ZW0uc2VsZWN0b3IpLmRhdGEoaXRlbS5kYXRhKTtcbiAgICAgICAgICAgICAgICBpZiAodmFsICE9PSBudWxsICYmIHZhbCAhPT0gdW5kZWZpbmVkICYmIHZhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgZXh0cmFQcmVwYXJlZFtrZXldID0gdmFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIHRoZXJlIGFyZSBleHRyYSBkYXRhLCBhZGQgdGhlbSB1bmRlciAnZXh0cmEnIGtleSB0byB0aGUgZGF0YVxuICAgICAgICAgICAgaWYgKCEkLmlzRW1wdHlPYmplY3QoZXh0cmFQcmVwYXJlZCkpIHtcbiAgICAgICAgICAgICAgICBkYXRhLmV4dHJhID0gZXh0cmFQcmVwYXJlZDtcbiAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UsIHJlbW92ZSB0aGUgJ2V4dHJhJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGRhdGFbJ2V4dHJhJ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhlIG9wdGlvbnMgYm94IGlzIGN1cnJlbnRseSBvcGVuLCBhZGQgdGhlIG9wdGlvbnMgdG8gdGhlIHJlcXVlc3QuXG4gICAgICAgIGlmICh3aW5kb3cuJGxhc3RDbGlja2VkT3B0aW9uc0JveEJ1dHRvbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgZGF0YVtcIm9wdGlvbnNCb3hcIl0gPSB3aW5kb3cuJGxhc3RDbGlja2VkT3B0aW9uc0JveEJ1dHRvbi5maW5kKCc6aW5wdXQnKS5maXJzdCgpLnZhbCgpO1xuICAgICAgICAgICAgLy8gUHV0IGFuIGluZGljYXRvciB0aGF0IHRoZSB0ZXN0IGlzIGNvbmR1Y3RlZCBpbiB0aGUgb3B0aW9ucyBib3hcbiAgICAgICAgICAgIGRhdGFbXCJmcm9tT3B0aW9uc0JveFwiXSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgLy8gR2V0IHRoZSB2YWx1ZXMgdGhhdCBzaG91bGQgYmUgdGVzdGVkIGZyb20gdGhlIGlucHV0cyBuZXh0IHRvIGN1cnJlbnQgdGVzdCBidXR0b25cbiAgICAgICAgZGF0YVtcInNlcmlhbGl6ZWRWYWx1ZXNcIl0gPSAkaW5wdXRzLnNlcmlhbGl6ZSgpO1xuICAgICAgICAvLyBBZGQgbmFtZSBvZiB0aGUgZm9ybSBpdGVtIHRoYXQgaXMgYmVpbmcgdGVzdGVkLiBHZXQgdGhlIGNoYXJzIHVudGlsIHRoZSBmaXJzdCBvcGVuaW5nIGJyYWNrZXQuXG4gICAgICAgIGxldCByYXdOYW1lID0gJGlucHV0cy5maXJzdCgpLmF0dHIoXCJuYW1lXCIpO1xuICAgICAgICBkYXRhW1wiZm9ybUl0ZW1OYW1lXCJdID0gL14oW15cXFtdKykvLmV4ZWMocmF3TmFtZSlbMV0gfHwgbnVsbDtcbiAgICAgICAgLy8gU29tZSBmb3JtIGl0ZW1zLCBzdWNoIGFzIHRoZSBmb3JtIGl0ZW1zIGluIE9wdGlvbnMgQm94LCBoYXZlIGEgbmFtZSBzdWNoIGFzICdfb3B0aW9uc19ib3hbZmluZF9yZXBsYWNlXSdcbiAgICAgICAgLy8gYW5kIHRoZSBuYW1lcyBvZiB0aGUgaW5wdXRzIHVuZGVyIHRoaXMgbmFtZSBhcmUgbGlrZSAnX29wdGlvbnNfYm94W2ZpbmRfcmVwbGFjZV1bMF1bZmluZF0nIGFuZFxuICAgICAgICAvLyAnX29wdGlvbnNfYm94W2ZpbmRfcmVwbGFjZV1bMF1bcmVwbGFjZV0nLiBJbiB0aGlzIGNhc2UsIHRoZSBzZW50IGRhdGEgaXMgc3RydWN0dXJlZCBhczpcbiAgICAgICAgLy8gICAgICB7X29wdGlvbnNfYm94OiB7ZmluZF9yZXBsYWNlOiB7ZmluZDogJ2ZpbmQgdmFsdWUnLCByZXBsYWNlOiAncmVwbGFjZSB2YWx1ZSd9fX1cbiAgICAgICAgLy8gSG93ZXZlciwgaW4gdGhlIGJhY2tlbmQsIGl0IGlzIGNvbnNpZGVyZWQgdGhhdCB0aGVyZSBhcmUgbm8gaW5uZXIgYXJyYXlzLiBTbywgdGhlIGJhY2tlbmQgZXhwZWN0cyB0byBmaW5kOlxuICAgICAgICAvLyAgICAgIFtfb3B0aW9uc19ib3ggPT4gWydmaW5kJyA9PiAnZmluZCB2YWx1ZScsICdyZXBsYWNlJyA9PiAncmVwbGFjZSB2YWx1ZSddXVxuICAgICAgICAvLyBCdXQsIGl0IGdldHM6XG4gICAgICAgIC8vICAgICAgW19vcHRpb25zX2JveCA9PiBbJ2ZpbmRfcmVwbGFjZScgPT4gWydmaW5kJyA9PiAnZmluZCB2YWx1ZScsICdyZXBsYWNlJyA9PiAncmVwbGFjZSB2YWx1ZSddXV1cbiAgICAgICAgLy8gd2hpY2ggcmVzdWx0cyBpbiBhbiBlcnJvciwgc2luY2UgaXQgdXNlcyB0aGUgc2VudCAnZm9ybUl0ZW1OYW1lJyB2YWx1ZSB0byBmaW5kIHRoZSB2YWx1ZXMuIEhlcmUsIHRoZVxuICAgICAgICAvLyAnZm9ybUl0ZW1OYW1lJyBpcyAnX29wdGlvbnNfYm94Jy4gU28sIHRoZSBiYWNrZW5kIGdldHM6XG4gICAgICAgIC8vICAgICAgWydmaW5kX3JlcGxhY2UnID0+IFsnZmluZCcgPT4gJ2ZpbmQgdmFsdWUnLCAncmVwbGFjZScgPT4gJ3JlcGxhY2UgdmFsdWUnXV1cbiAgICAgICAgLy8gYXMgdGhlIHRlc3QgZGF0YS4gSG93ZXZlciwgaXQgc2hvdWxkIGdldDpcbiAgICAgICAgLy8gICAgICBbJ2ZpbmQnID0+ICdmaW5kIHZhbHVlJywgJ3JlcGxhY2UnID0+ICdyZXBsYWNlIHZhbHVlJ11cbiAgICAgICAgLy8gU28sIGhlcmUsIHdlIHNlbmQgdGhlIHBhdGggb2YgdGhlIGlubmVyIGFycmF5IHVuZGVyICdmb3JtSXRlbURvdEtleScuIEl0IGJhc2ljYWxseSBzZW5kcywgZm9yIHRoaXMgY2FzZSxcbiAgICAgICAgLy8gJ2ZpbmRfcmVwbGFjZScgYXMgdGhlIHBhdGguIFNvLCB0aGUgYmFja2VuZCBjYW4gZ2V0IHdoYXQgaXQgbmVlZHMuIElmIHRoZSBuYW1lIG9mIHRoZSBmb3JtIGl0ZW0gaXMsIGUuZy46XG4gICAgICAgIC8vICAgICAgX29wdGlvbnNfYm94W2ZpbmRfcmVwbGFjZV1bdGVzdF1bbWVzdF1bY29vbF1bMF1bcmVwbGFjZV1cbiAgICAgICAgLy8gdGhlICdmb3JtSXRlbURvdEtleScgd2lsbCBiZSAnZmluZF9yZXBsYWNlLnRlc3QubWVzdC5jb29sJy4gSGVyZSwgd2UgYmFzaWNhbGx5IGZpbmQgJ1tmaW5kX3JlcGxhY2VdW3Rlc3RdW21lc3RdW2Nvb2xdJ1xuICAgICAgICAvLyBwYXJ0LCBhbmQgdHVybiBpdCBpbnRvIGRvdCBub3RhdGlvbi4gVGhlIHVzZWQgcmVndWxhciBleHByZXNzaW9uIGFuZCB0ZXN0IHZhbHVlcyBhbmQgcmVzdWx0cyBhcmUgYmVsb3c6XG4gICAgICAgIC8vXG4gICAgICAgIC8vIFJlZ2V4OiBeW15cXFtdKyhbXjAtOV0rKVxuICAgICAgICAvL1xuICAgICAgICAvLyBUZXN0IHN0cmluZzogX29wdGlvbnNfYm94W2ZpbmRfcmVwbGFjZV1bdGVzdF1bbWVzdF1bY29vbF1bMF1bcmVwbGFjZV1cbiAgICAgICAgLy8gJDEgaXM6IFtmaW5kX3JlcGxhY2VdW3Rlc3RdW21lc3RdW2Nvb2xdW1xuICAgICAgICAvL1xuICAgICAgICAvLyBUZXN0IHN0cmluZzogX29wdGlvbnNfYm94WzBdW2ZpbmRdXG4gICAgICAgIC8vICQxIGlzOiBbXG4gICAgICAgIGxldCBwYXJ0ID0gL15bXlxcW10rKFteMC05XSspLy5leGVjKHJhd05hbWUpWzFdIHx8ICcnO1xuICAgICAgICBpZiAocGFydC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAvLyBUdXJuIGl0IGludG8gZG90IG5vdGF0aW9uIGFuZCBnZXQgcmlkIG9mIHVubmVjZXNzYXJ5IGJyYWNrZXRzXG4gICAgICAgICAgICBwYXJ0ID0gcGFydC5zdWJzdHIoMSwgcGFydC5sZW5ndGggLSAyKS5yZXBsYWNlKCddWycsICcuJykucmVwbGFjZSgnWycsICcnKS5yZXBsYWNlKCddJywgJycpO1xuICAgICAgICAgICAgLy8gQWRkIGl0IHRvIHRoZSBkYXRhXG4gICAgICAgICAgICBkYXRhW1wiZm9ybUl0ZW1Eb3RLZXlcIl0gPSBwYXJ0O1xuICAgICAgICB9XG4gICAgICAgIC8vIEFkZCB0aGUgcmVxdWlyZWQgZGF0YSBpZiB0aGlzIGlzIGEgXCJmaW5kLXJlcGxhY2UgaW4gY3VzdG9tIG1ldGFcIiB0ZXN0XG4gICAgICAgIGRhdGEgPSB0aGlzLmFkZERhdGFGb3JGaW5kUmVwbGFjZUluQ3VzdG9tTWV0YU9yU2hvcnRDb2RlVGVzdCgkdGVzdEJ1dHRvbiwgZGF0YSk7XG4gICAgICAgIC8vbChcIlByZXBhcmVkOlwiKTtcbiAgICAgICAgLy9sKGRhdGEpO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyByZXF1aXJlZCBzZXR0aW5ncyB0byB0aGUgZGF0YSB0aGF0IHdpbGwgYmUgc2VudCB2aWEgQUpBWC5cbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIGFkZFNldHRpbmdzVG9BamF4RGF0YShkYXRhKSB7XG4gICAgICAgIC8vIEZpcnN0LCBhZGQgcmF3IEhUTUwgZmluZC1hbmQtcmVwbGFjZXMuXG4gICAgICAgIGRhdGEgPSB0aGlzLmFkZE1hbmlwdWxhdGlvbk9wdGlvbnNUb0FqYXhEYXRhKGRhdGEpO1xuICAgICAgICAvLyBBZGQgY29va2llIHNldHRpbmdzXG4gICAgICAgIGxldCAkY29va2llcyA9ICQodGhpcy5wc3Yuc2VsZWN0b3JUYWJNYWluKS5maW5kKCdsYWJlbFtmb3I9JyArIHRoaXMucHN2LmlucHV0TmFtZUNvb2tpZXMgKyAnXScpLmNsb3Nlc3QoJ3RyJykuZmluZCgnLmlucHV0cycpIHx8IG51bGw7XG4gICAgICAgIGlmICgkY29va2llcyAhPT0gbnVsbCAmJiAkY29va2llcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRhdGFbJ2Nvb2tpZXMnXSA9ICRjb29raWVzLmZpbmQoJzppbnB1dCcpLnNlcmlhbGl6ZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFkZCBjYWNoaW5nIHNldHRpbmdcbiAgICAgICAgbGV0ICRjaGVja2JveENhY2hlID0gJCh0aGlzLnBzdi5zZWxlY3RvclRhYk1haW4pLmZpbmQoJ2lucHV0W25hbWU9XCJfY2FjaGVfdGVzdF91cmxfcmVzcG9uc2VzXCJdJykgfHwgbnVsbDtcbiAgICAgICAgaWYgKCRjaGVja2JveENhY2hlICE9PSBudWxsICYmICRjaGVja2JveENhY2hlLmxlbmd0aCkge1xuICAgICAgICAgICAgZGF0YVsnY2FjaGVUZXN0VXJsUmVzcG9uc2VzJ10gPSAkY2hlY2tib3hDYWNoZVswXS5jaGVja2VkID8gMSA6IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgXCJ1c2UgY3VzdG9tIHNldHRpbmdzXCIgY2hlY2tib3hcbiAgICAgICAgbGV0ICR1c2VDdXN0b21TZXR0aW5nc0NoZWNrYm94ID0gJChcIiNfZG9fbm90X3VzZV9nZW5lcmFsX3NldHRpbmdzXCIpIHx8IG51bGw7XG4gICAgICAgIGxldCB1c2VDdXN0b21HZW5lcmFsU2V0dGluZ3MgPSBmYWxzZTtcbiAgICAgICAgaWYgKCR1c2VDdXN0b21TZXR0aW5nc0NoZWNrYm94ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgdXNlciB3YW50cyB0byB1c2UgY3VzdG9tIGdlbmVyYWwgc2V0dGluZ3NcbiAgICAgICAgICAgIGlmICgkdXNlQ3VzdG9tU2V0dGluZ3NDaGVja2JveC5sZW5ndGggJiYgJHVzZUN1c3RvbVNldHRpbmdzQ2hlY2tib3hbMF0uY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIC8vIEFkZCBhbGwgZ2VuZXJhbCBzZXR0aW5nc1xuICAgICAgICAgICAgICAgIGRhdGFbXCJjdXN0b21HZW5lcmFsU2V0dGluZ3NcIl0gPSAkKHRoaXMucHN2LnNlbGVjdG9yVGFiR2VuZXJhbFNldHRpbmdzKS5maW5kKCc6aW5wdXQnKS5zZXJpYWxpemUoKTtcbiAgICAgICAgICAgICAgICB1c2VDdXN0b21HZW5lcmFsU2V0dGluZ3MgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0YVtcImN1c3RvbUdlbmVyYWxTZXR0aW5nc1wiXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBBZGQgd2hldGhlciB0aGUgdXNlciB3YW50cyB0byB1c2UgVVRGLTggb3Igbm90IHRvIHRoZSBkYXRhXG4gICAgICAgIGxldCAkdXNlVXRmOENoZWNrYm94ID0gJChcIiNfd3BjY19tYWtlX3N1cmVfZW5jb2RpbmdfdXRmOFwiKSB8fCBudWxsO1xuICAgICAgICBpZiAoJHVzZVV0ZjhDaGVja2JveCAhPT0gbnVsbCAmJiAkdXNlVXRmOENoZWNrYm94Lmxlbmd0aCAmJiB1c2VDdXN0b21HZW5lcmFsU2V0dGluZ3MpIHtcbiAgICAgICAgICAgIGRhdGFbXCJ1c2VVdGY4XCJdID0gJHVzZVV0ZjhDaGVja2JveC5maXJzdCgpWzBdLmNoZWNrZWQgPyAxIDogMDtcbiAgICAgICAgICAgIGxldCAkY29udmVydEVuY29kaW5nQ2hlY2tib3ggPSAkKFwiI193cGNjX2NvbnZlcnRfY2hhcnNldF90b191dGY4XCIpIHx8IG51bGw7XG4gICAgICAgICAgICBkYXRhW1wiY29udmVydEVuY29kaW5nVG9VdGY4XCJdID0gVXRpbHMuZ2V0Q2hlY2tib3hWYWx1ZSgkY29udmVydEVuY29kaW5nQ2hlY2tib3gpID8gMSA6IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkYXRhW1widXNlVXRmOFwiXSA9IC0xO1xuICAgICAgICAgICAgZGF0YVtcImNvbnZlcnRFbmNvZGluZ1RvVXRmOFwiXSA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGZpbmQtYW5kLXJlcGxhY2Ugb3B0aW9ucyBmb3IgdGhlIHJhdyBIVE1MIHJlc3BvbnNlIHRvIHRoZSBBSkFYIGRhdGEuXG4gICAgICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgaW4gd2hpY2ggZmluZC1hbmQtcmVwbGFjZXMgdG8gYmUgYWRkZWRcbiAgICAgKi9cbiAgICBhZGRNYW5pcHVsYXRpb25PcHRpb25zVG9BamF4RGF0YShkYXRhKSB7XG4gICAgICAgIC8vIEZpcnN0LCB3ZSBuZWVkIHRvIGZpbmQgb3V0IHdoZXRoZXIgdGhlIHVzZXIgdGVzdHMgdGhlIGNhdGVnb3J5IG9yIHRoZSBwb3N0IHNldHRpbmdzLlxuICAgICAgICAvLyBXZSBjYW4gZG8gdGhpcyBieSBjaGVja2luZyB0aGUgY3VycmVudCB0YWIuIEluIHRoZSBjdXJyZW50IHRhYiwgd2UgbmVlZCB0byBmaW5kIGZpbmQtYW5kLXJlcGxhY2Ugb3B0aW9ucyBmb3JcbiAgICAgICAgLy8gcmF3IEhUTUwuXG4gICAgICAgIGxldCAkYWN0aXZlVGFiID0gJCgnZGl2LnRhYjpub3QoLmhpZGRlbiknKSwgYWN0aXZlVGFiSWQgPSAkYWN0aXZlVGFiLmF0dHIoJ2lkJykucmVwbGFjZSgndGFiLScsICcnKTtcbiAgICAgICAgLy8gSWYgdGhpcyBpcyB0aGUgdGVtcGxhdGVzIHRhYiwgdXNlIG1hbmlwdWxhdGlvbiBvcHRpb25zIGZyb20gdGhlIHBvc3QgdGFiLlxuICAgICAgICBpZiAoYWN0aXZlVGFiSWQudG9Mb3dlckNhc2UoKSA9PT0gJ3RlbXBsYXRlcycpIHtcbiAgICAgICAgICAgICRhY3RpdmVUYWIgPSAkKHRoaXMucHN2LnNlbGVjdG9yVGFiUG9zdCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5hbWVNYXRjaFJlZ2V4ID0gL1teXFxcXFtdKy87XG4gICAgICAgIGxldCByZXN1bHRzID0ge307XG4gICAgICAgIGxldCBjdXJyZW50SW5wdXROYW1lLCAkaW5wdXQsICRpbnB1dHMsIGFjdHVhbE5hbWU7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wc3YuYmFzZUh0bWxNYW5pcHVsYXRpb25JbnB1dE5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjdXJyZW50SW5wdXROYW1lID0gdGhpcy5wc3YuYmFzZUh0bWxNYW5pcHVsYXRpb25JbnB1dE5hbWVzW2ldO1xuICAgICAgICAgICAgLy8gR2V0IGEgc2luZ2xlIGlucHV0XG4gICAgICAgICAgICAkaW5wdXQgPSAkYWN0aXZlVGFiLmZpbmQoJ2lucHV0W25hbWUqPVwiJyArIGN1cnJlbnRJbnB1dE5hbWUgKyAnXCJdJykuZmlyc3QoKTtcbiAgICAgICAgICAgIC8vIEdldCBhbGwgaW5wdXRzIGZvciB0aGUgaW5wdXQgbmFtZVxuICAgICAgICAgICAgJGlucHV0cyA9ICRpbnB1dC5jbG9zZXN0KFwiLmlucHV0c1wiKS5maW5kKCc6aW5wdXQnKTtcbiAgICAgICAgICAgIC8vIElmIHRoZXJlIGlzIG5vIGlucHV0LCBjb250aW51ZS5cbiAgICAgICAgICAgIGlmICgkaW5wdXRzLmxlbmd0aCA8IDEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAvLyBHZXQgYWN0dWFsIG5hbWUgb2YgdGhlIGlucHV0XG4gICAgICAgICAgICBhY3R1YWxOYW1lID0gJGlucHV0LmF0dHIoXCJuYW1lXCIpLm1hdGNoKG5hbWVNYXRjaFJlZ2V4KVswXTtcbiAgICAgICAgICAgIC8vIFNlcmlhbGl6ZSBpbnB1dHMgYW5kIGFkZCB0aGVtIHRvIHRoZSBkYXRhIHVuZGVyIHRoZWlyIGFjdHVhbCBuYW1lXG4gICAgICAgICAgICByZXN1bHRzW2FjdHVhbE5hbWVdID0gJGlucHV0cy5zZXJpYWxpemUoKTtcbiAgICAgICAgfVxuICAgICAgICBkYXRhW1wibWFuaXB1bGF0aW9uX29wdGlvbnNcIl0gPSByZXN1bHRzO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIGRhdGEgdG8gdGhlIG9yaWdpbmFsIHRlc3QgZGF0YSBmb3IgZmluZC1yZXBsYWNlIGluIGN1c3RvbSBtZXRhIGFuZCBjdXN0b20gc2hvcnQgY29kZSB0ZXN0XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gJHRlc3RCdXR0b24gVGhlIHRlc3QgYnV0dG9uIHRoYXQgaXMgY2xpY2tlZCB0byBwZXJmb3JtIHRoZSB0ZXN0XG4gICAgICogQHBhcmFtIHthcnJheX0gZGF0YSBPcmlnaW5hbCBkYXRhIHRvIHdoaWNoIHRoZSBuZXcgZGF0YSB3aWxsIGJlIGFkZGVkXG4gICAgICogQHJldHVybiB7YXJyYXl9IERhdGEgd2l0aCB0aGUgZGF0YSBmb3IgZmluZCByZXBsYWNlIGluIGN1c3RvbSBtZXRhIHRlc3RcbiAgICAgKi9cbiAgICBhZGREYXRhRm9yRmluZFJlcGxhY2VJbkN1c3RvbU1ldGFPclNob3J0Q29kZVRlc3QoJHRlc3RCdXR0b24sIGRhdGEpIHtcbiAgICAgICAgbGV0IGNsc0N1c3RvbU1ldGEgPSBcIndjYy10ZXN0LWZpbmQtcmVwbGFjZS1pbi1jdXN0b20tbWV0YVwiLCBjbHNDdXN0b21TaG9ydENvZGUgPSBcIndjYy10ZXN0LWZpbmQtcmVwbGFjZS1pbi1jdXN0b20tc2hvcnQtY29kZVwiO1xuICAgICAgICAvLyBJZiB0aGUgdGVzdCBidXR0b24gaXMgbm90IHRoZSB0ZXN0IGJ1dHRvbiB3ZSBhcmUgbG9va2luZyBmb3IsIGRvIG5vdCBwcm9jZWVkIGFuZCBqdXN0IHJldHVybiB0aGUgb3JpZ2luYWwgZGF0YS5cbiAgICAgICAgaWYgKCEkdGVzdEJ1dHRvbi5oYXNDbGFzcyhjbHNDdXN0b21NZXRhKSAmJiAhJHRlc3RCdXR0b24uaGFzQ2xhc3MoY2xzQ3VzdG9tU2hvcnRDb2RlKSlcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICBsZXQgaXNDdXN0b21NZXRhID0gJHRlc3RCdXR0b24uaGFzQ2xhc3MoY2xzQ3VzdG9tTWV0YSksIHRhcmdldElucHV0U2VsZWN0b3IgPSAnLicgKyAoaXNDdXN0b21NZXRhID8gJ21ldGEta2V5JyA6ICdzaG9ydC1jb2RlJyksIHRhcmdldElucHV0R3JvdXBTZWxlY3RvciA9ICcuJyArIChpc0N1c3RvbU1ldGEgPyAnc2VsZWN0b3ItY3VzdG9tLXBvc3QtbWV0YScgOiAnc2VsZWN0b3ItY3VzdG9tLXNob3J0Y29kZScpO1xuICAgICAgICAvLyBHZXQgdGhlIG1ldGEga2V5IGZvciB3aGljaCB0aGUgdXNlciB3YW50cyB0byBwZXJmb3JtIGZpbmQgYW5kIHJlcGxhY2Ugb3BlcmF0aW9uXG4gICAgICAgIGxldCAka2V5SW5wdXQgPSAkdGVzdEJ1dHRvbi5jbG9zZXN0KFwiLmlucHV0LWdyb3VwXCIpLmZpbmQoJy5pbnB1dC1jb250YWluZXInKS5maW5kKHRhcmdldElucHV0U2VsZWN0b3IpO1xuICAgICAgICAvLyBJZiBtZXRhIGtleSBpbnB1dCBkb2VzIG5vdCBleGlzdCwgbm8gbmVlZCB0byBnbyBvbi4gUmV0dXJuIHRoZSBvcmlnaW5hbCBkYXRhLlxuICAgICAgICBpZiAoISRrZXlJbnB1dC5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgLy8gR2V0IHRoZSBtZXRhIGtleVxuICAgICAgICBsZXQga2V5ID0gJGtleUlucHV0LnZhbCgpO1xuICAgICAgICBpZiAoa2V5ID09IHVuZGVmaW5lZCB8fCAha2V5Lmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgLy8gVGhlcmUgYXJlIHR3byBwb3NzaWJsZSBwbGFjZXMgdGhlIHVzZXIgY2FuIGRlZmluZSBjdXN0b20gbWV0YSBrZXlzLiBPbmUgb2YgdGhlbSBjYW4gYmUgZGVmaW5lZCBieSBDU1Mgc2VsZWN0b3JzXG4gICAgICAgIC8vIGFuZCB0aGUgb3RoZXIgb25lIGJ5IG1hbnVhbGx5LiBXZSdsbCBoYW5kbGUgYm90aCBvZiB0aGUgY2FzZXMgYmVsb3cuIFdlIGp1c3QgbmVlZCBvbmUgdmFsdWUuIFNvLCBpZiBhIHZhbHVlXG4gICAgICAgIC8vIGlzIGZvdW5kLCB0aGF0J3MgaXQuIFdlJ3JlIGRvbmUuXG4gICAgICAgIC8vIEZpbmQgbWV0YSBrZXkgaW5wdXRzIGRlZmluZWQgaW4gc2VsZWN0b3IgY3VzdG9tIHBvc3QgbWV0YSBvcHRpb25zXG4gICAgICAgICQoJy5pbnB1dC1ncm91cCcgKyB0YXJnZXRJbnB1dEdyb3VwU2VsZWN0b3IgKyAnICcgKyB0YXJnZXRJbnB1dFNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChmb3VuZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBsZXQgJHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICAgICAgaWYgKCRzZWxmLnZhbCgpID09IGtleSkge1xuICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgc2VsZWN0b3IgYW5kIGl0cyBhdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICBsZXQgJGNzc1NlbGVjdG9ySW5wdXQgPSAkc2VsZi5jbG9zZXN0KCcuaW5wdXQtZ3JvdXAnKS5maW5kKCcuY3NzLXNlbGVjdG9yJyksICRjc3NTZWxlY3RvckF0dHJJbnB1dCA9ICRzZWxmLmNsb3Nlc3QoJy5pbnB1dC1ncm91cCcpLmZpbmQoJy5jc3Mtc2VsZWN0b3ItYXR0cicpLCAkb3B0aW9uc0JveElucHV0ID0gJHNlbGYuY2xvc2VzdCgnLmlucHV0LWdyb3VwJykuZmluZCgnW25hbWUqPVwiW29wdGlvbnNfYm94XVwiXScpLCBjc3NTZWxlY3RvciA9ICRjc3NTZWxlY3RvcklucHV0LnZhbCgpLCBhdHRyID0gJGNzc1NlbGVjdG9yQXR0cklucHV0LnZhbCgpLCBvcHRpb25zQm94RGF0YSA9ICRvcHRpb25zQm94SW5wdXQubGVuZ3RoID8gJG9wdGlvbnNCb3hJbnB1dC52YWwoKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIENTUyBzZWxlY3Rvciwgd2UndmUgcmVhY2hlZCBvdXIgZ29hbC5cbiAgICAgICAgICAgICAgICBpZiAoY3NzU2VsZWN0b3IgIT0gdW5kZWZpbmVkICYmIGNzc1NlbGVjdG9yLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIHNlbGVjdG9yIHRvIHRoZSBkYXRhXG4gICAgICAgICAgICAgICAgICAgIGRhdGFbXCJ2YWx1ZVNlbGVjdG9yXCJdID0gY3NzU2VsZWN0b3I7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRyICE9IHVuZGVmaW5lZCAmJiBhdHRyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtcInZhbHVlU2VsZWN0b3JBdHRyXCJdID0gYXR0cjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGVyZSBhcmUgb3B0aW9ucyBmb3IgdGhlIHRhcmdldCBpbnB1dCBncm91cCwgYWRkIHRoZW0gYXMgd2VsbFxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uc0JveERhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtcInZhbHVlT3B0aW9uc0JveERhdGFcIl0gPSBvcHRpb25zQm94RGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBNYXJrIGl0IGFzIGZvdW5kXG4gICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBJZiB0aGUgc2VsZWN0b3IgY291bGQgbm90IGJlIGZvdW5kLCB0cnkgY3VzdG9tIHBvc3QgbWV0YSBvcHRpb25zLlxuICAgICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgICAgICBpZiAoaXNDdXN0b21NZXRhKSB7XG4gICAgICAgICAgICAgICAgJCgnLmlucHV0LWdyb3VwLmN1c3RvbS1wb3N0LW1ldGEgLm1ldGEta2V5JykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3VuZClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRzZWxmLnZhbCgpID09IGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICR2YWx1ZUlucHV0ID0gJHNlbGYuY2xvc2VzdCgnLmlucHV0LWdyb3VwJykuZmluZCgnaW5wdXRbdHlwZT10ZXh0XTpub3QoLm1ldGEta2V5KScpLCB2YWx1ZSA9ICR2YWx1ZUlucHV0LnZhbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9IHVuZGVmaW5lZCAmJiB2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhW1wic3ViamVjdFwiXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1hcmsgaXQgYXMgZm91bmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRXNjYXBlcyBzcGVjaWFsIHJlZ2V4IGNoYXJzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc3RyXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICogQHNlZSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xMTQ0Nzg4LzI4ODM0ODdcbiAgICAgKi9cbiAgICBlc2NhcGVSZWdFeHAoc3RyKSB7XG4gICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvKFsuKis/Xj0hOiR7fSgpfFxcW1xcXVxcL1xcXFxdKS9nLCBcIlxcXFwkMVwiKTtcbiAgICB9XG59XG5UZXN0RGF0YVByZXBhcmVyLklOU1RBTkNFID0gbnVsbDtcbiIsIm1vZHVsZS5leHBvcnRzID0galF1ZXJ5OyJdLCJzb3VyY2VSb290IjoiIn0=