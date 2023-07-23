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
/******/ 	return __webpack_require__(__webpack_require__.s = "./scripts/post-settings-ts/post-settings.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./scripts/common-ts/CopyToClipboardHandler.ts":
/*!*****************************************************!*\
  !*** ./scripts/common-ts/CopyToClipboardHandler.ts ***!
  \*****************************************************/
/*! exports provided: CopyToClipboardHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CopyToClipboardHandler", function() { return CopyToClipboardHandler; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./scripts/common-ts/Utils.ts");

class CopyToClipboardHandler {
    /** This is a singleton. */
    constructor() { }
    /**
     * Get the instance
     * @return {CopyToClipboardHandler}
     */
    static getInstance() {
        if (this.instance === null)
            this.instance = new CopyToClipboardHandler();
        return this.instance;
    }
    /**
     * Initialize "copy to clipboard" for the elements with selector
     *
     * @param {string} selector Selector for which the clipboard will be initialized
     */
    initForSelector(selector) {
        // No need to initialize the clipboard if the elements we need do not exist in the page.
        if (!$(selector).length)
            return;
        let clipboard = new window.Clipboard(selector);
        /**
         * Inform the user that the button's code is copied or not copied
         * @param $checkbox
         */
        clipboard.on('success', (e) => {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].flashTooltip($(e.trigger), window.kdn.copied);
            e.clearSelection();
        });
        /**
         * When there is an error, the text becomes selected. Hence, the user can just use a shortcut to copy the text
         */
        clipboard.on('error', (e) => {
            let os = navigator.platform;
            let shortcut = os.indexOf("Mac") != -1 ? "⌘-C" : "Ctrl + C";
            _Utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].flashTooltip($(e.trigger), window.kdn.press_to_copy.format(shortcut));
        });
    }
}
CopyToClipboardHandler.instance = null;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./scripts/common-ts/DependantHandler.ts":
/*!***********************************************!*\
  !*** ./scripts/common-ts/DependantHandler.ts ***!
  \***********************************************/
/*! exports provided: DependantHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DependantHandler", function() { return DependantHandler; });
/**
 * Dependants are HTML elements whose visibility is dependent on a certain element. For example, if an element needs to
 * be shown when a checkbox is checked, that element is dependant on the checkbox's value. The dependencies are given
 * in "data-dependants" attribute of the element whose value changes trigger the visibility of other elements. The
 * dependencies should be given as a string array that is JSON-encoded, in which each item is a selector. E.g.
 * [".target-element", "!#another-target"] is a JSON-encoded array. This means the elements having 'target-element'
 * class should be shown and the element whose ID is "another-target" must be hidden. This value is added as the value
 * of "data-dependants" attribute of the checkbox so that when the checkbox's value is changed, the dependants are
 * retrieved from the checkbox.
 *
 * @since 1.8.0
 */
class DependantHandler {
    /** This is a singleton. */
    constructor() { }
    /**
     * Get the instance
     * @return {DependantHandler}
     */
    static getInstance() {
        if (this.instance === null)
            this.instance = new DependantHandler();
        return this.instance;
    }
    /**
     * Handles showing/hiding checkbox dependents
     * @param $checkbox Checkbox element
     */
    handleCheckboxDependants($checkbox) {
        let isChecked = $checkbox.is(":checked");
        this.handleDependants($checkbox, isChecked);
    }
    /**
     * Handles showing/hiding a select element's selected option's dependants
     * @param $select Select element
     */
    handleSelectDependants($select) {
        // Get previously selected value
        let prevVal = $select.data('prev') || null;
        let currentVal = $select.val();
        // Find the option whose value is the current val
        let $currentOption = $select.find('option[value="' + currentVal + '"]').first();
        let $prevOption = prevVal !== null && prevVal.length ? $select.find('option[value="' + prevVal + '"]').first() : null;
        // If there is a previous value, reverse its dependants.
        if ($prevOption !== null)
            this.handleDependants($prevOption, false);
        // Handle the dependants of the current value.
        this.handleDependants($currentOption, true);
        // Store the current value as previous so that when there is a change in the selected value, we can reverse the
        // dependants.
        $select.data('prev', currentVal);
    }
    /**
     * Handles showing/hiding dependants of an element. The dependants should be given in "data-dependants", as an
     * array of selectors.
     *
     * @param $el
     * @param {boolean} reverse If false, reverse of the dependants will be applied.
     */
    handleDependants($el, reverse) {
        // Get the dependants
        let dependants = $el.data("dependants") || null;
        // If there is no dependant, stop.
        if (dependants === null || !dependants)
            return;
        let $dependant, isNegative, selector, i;
        for (i = 0; i < dependants.length; i++) {
            // Get whether the selector is negated or not.
            isNegative = this.startsWith(dependants[i], "!");
            selector = dependants[i];
            // If the selector is negative, remove negation "!" from the beginning of the string to get the selector.
            if (isNegative)
                selector = selector.substring(1);
            // Get the dependant element
            $dependant = $(selector);
            // If the reverse of the dependants should be applied
            if (reverse) {
                // If the selector is negative, hide the dependant.
                if (isNegative) {
                    $dependant.addClass("hidden");
                    // Otherwise, show it.
                }
                else {
                    $dependant.removeClass("hidden");
                }
                // Otherwise
            }
            else {
                // If the selector is negative, show the dependant.
                if (isNegative) {
                    $dependant.removeClass("hidden");
                    // Otherwise, hide it.
                }
                else {
                    $dependant.addClass("hidden");
                }
            }
        }
    }
    /**
     * Checks if a string (haystack) starts with something (needle)
     * @param {string} haystack
     * @param {string} needle
     * @return {boolean}
     */
    startsWith(haystack, needle) {
        return haystack.lastIndexOf(needle, 0) === 0;
    }
}
DependantHandler.instance = null;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

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

/***/ "./scripts/common-ts/SectionNavigation.ts":
/*!************************************************!*\
  !*** ./scripts/common-ts/SectionNavigation.ts ***!
  \************************************************/
/*! exports provided: SectionNavigation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SectionNavigation", function() { return SectionNavigation; });
/* harmony import */ var _post_settings_ts_app_PostSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../post-settings-ts/app/PostSettings */ "./scripts/post-settings-ts/app/PostSettings.ts");
/* harmony import */ var _EventType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventType */ "./scripts/common-ts/EventType.ts");


class SectionNavigation {
    /** This is a singleton. */
    constructor() {
        this._selectorNavContainer = '.tab-section-nav';
        this.selectorTabContainer = '.tab';
        this.selectorNavigationRow = 'tr[data-id^=section-]';
        // Listen to the clicks made on a navigation item
        $(document).on('click', this._selectorNavContainer + ' [data-id]', (e) => this.onClickNavItem(e));
    }
    /**
     * Get the instance
     */
    static getInstance() {
        if (this.instance === null)
            this.instance = new SectionNavigation();
        return this.instance;
    }
    /**
     * Handles what happens when a navigation item is clicked
     * @param e
     */
    onClickNavItem(e) {
        let $self = $(e.target);
        // Get the target item's selector
        let id = $self.data('id');
        let $targetEl = null;
        // In each navigation, there is a 'top' item that stores the ID of the tab container, which starts with 'tab'.
        // Let's find out if this is a tab selector.
        let isTabContainer = id.indexOf('tab') === 0;
        // If the clicked element should go to a section
        if (!isTabContainer) {
            let selector = 'tr[data-id="' + id + '"]';
            $targetEl = $self.closest(this.selectorTabContainer).find(selector) || null;
            // Otherwise, target element is the tab container itself.
        }
        else {
            $targetEl = $('#' + id);
        }
        // If the element does not exist, stop.
        if ($targetEl === null || !$targetEl.length)
            return;
        // Scroll to it
        let $scrollable = $(document).find('html, body');
        let fixedElTotalHeight = _post_settings_ts_app_PostSettings__WEBPACK_IMPORTED_MODULE_0__["PostSettings"].getInstance().getFixedElementsTotalHeight();
        $scrollable.stop().animate({
            scrollTop: $targetEl.offset().top - fixedElTotalHeight - $(window).height() * 0.02
        }, 500, 'swing', () => {
            if (isTabContainer)
                return;
            // If there are no fixed elements when the scroll starts, but there are fixed elements when the scroll
            // finishes (i.e. when the elements get fixed at the top in the middle of scrolling), the position of the
            // scroll is not correct such that the target element stays under the fixed elements. If there is such a
            // case, scroll to the element again considering the elements that were fixed in the middle of the scrolling.
            // We can decide if there are such elements by comparing the total height of the currently fixed elements
            // with the total height of fixed elements there were when the scrolling started.
            let newFixedElTotalHeight = _post_settings_ts_app_PostSettings__WEBPACK_IMPORTED_MODULE_0__["PostSettings"].getInstance().getFixedElementsTotalHeight();
            if (newFixedElTotalHeight !== fixedElTotalHeight) {
                // If there are elements got fixed at the top in the middle of the scrolling, rescroll to the element
                // considering the heights of these elements.
                $scrollable.stop().animate({
                    scrollTop: $targetEl.offset().top - newFixedElTotalHeight - $(window).height() * 0.02
                }, 250, 'swing');
            }
        });
    }
    /**
     * Initializes the navigations
     */
    initNavigations() {
        let $self;
        // For each navigation container in the page
        $(this._selectorNavContainer).each((i, el) => {
            $self = $(el);
            // First, make its content empty.
            $self.html('');
            // Create a navigation element for the navigation items in the tab that this navigation container is in and
            // add it to the container.
            $self.append(this.createNavigationElement(this.getNavigationItems($self.closest(this.selectorTabContainer))));
            // Set it as initialized
            $self.parent().addClass(SectionNavigation.classInitialized);
        });
        // Trigger an event so that others can do things when the navigations are initialized
        $(document).trigger(_EventType__WEBPACK_IMPORTED_MODULE_1__["EventType"].navigationsInitialized);
    }
    /**
     * Finds navigation items
     */
    getNavigationItems($container) {
        let $self, result = [];
        // Add the default 'top' item. It should be the tab container's ID so that when it is clicked, the top of the
        // tab container is scrolled to.
        result[$container.attr('id')] = window.kdn.top;
        // Find all rows that are actually a section title
        $container.find(this.selectorNavigationRow).each((i, el) => {
            $self = $(el);
            // Add the row with its data-id value and text
            result[$self.attr('data-id')] = $self.text();
        });
        return result;
    }
    /**
     * Creates navigation element with the given navigation items
     * @param {array} navItems
     */
    createNavigationElement(navItems) {
        // Create an unordered list element
        let $ul = $('<ul/>');
        // Then, for each given navigation item
        for (let id in navItems) {
            if (!navItems.hasOwnProperty(id))
                continue;
            // Create a li element containing an anchor. Add the target section's ID as data-id to the anchor so that
            // we know what section to scroll to when the anchor is clicked.
            $ul.append($('<li/>')
                .append($('<a/>')
                .attr('data-id', id)
                .attr('role', 'button')
                .html(navItems[id])));
        }
        return $ul;
    }
}
SectionNavigation.instance = null;
SectionNavigation.classInitialized = 'initialized';

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

/***/ "./scripts/post-settings-ts/app/CustomShortCodeHandler.ts":
/*!****************************************************************!*\
  !*** ./scripts/post-settings-ts/app/CustomShortCodeHandler.ts ***!
  \****************************************************************/
/*! exports provided: CustomShortCodeHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomShortCodeHandler", function() { return CustomShortCodeHandler; });
/* harmony import */ var _common_ts_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common-ts/Utils */ "./scripts/common-ts/Utils.ts");
/* harmony import */ var _common_ts_CopyToClipboardHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common-ts/CopyToClipboardHandler */ "./scripts/common-ts/CopyToClipboardHandler.ts");


class CustomShortCodeHandler {
    /** This is a singleton. */
    constructor() {
        this.inputNameCustomShortCodes = '_post_custom_content_shortcode_selectors';
        this.customShortCodeButtonContainerSelector = '.custom-short-code-container';
        // Update the containers once.
        this.updateCustomShortCodeButtonContainers();
        // Listen to changes made to the custom short codes inputs if they exist
        let $customShortCodeInputContainer = this.getCustomShortCodeInputContainer();
        if ($customShortCodeInputContainer === null)
            return;
        $customShortCodeInputContainer.on('change', 'input[name$="[short_code]"]', () => this.updateCustomShortCodeButtonContainers());
    }
    /**
     * Get the instance
     * @return {CustomShortCodeHandler}
     */
    static getInstance() {
        if (this.instance === null)
            this.instance = new CustomShortCodeHandler();
        return this.instance;
    }
    /**
     * Updates the custom short code button containers with the custom short code buttons
     */
    updateCustomShortCodeButtonContainers() {
        let $buttonContainers = $(this.customShortCodeButtonContainerSelector) || null;
        if ($buttonContainers === null || !$buttonContainers.length)
            return;
        const $buttonContainer = this.getCustomShortCodeButtons() || null;
        const buttonsExist = $buttonContainer !== null && $buttonContainer.length;
        let $el;
        $buttonContainers.each((i, el) => {
            $el = $(el);
            $el.html('');
            if (buttonsExist)
                $el.append($buttonContainer.clone());
        });
        let selector = this.customShortCodeButtonContainerSelector + ' button';
        // Init the tooltip for the clipboard elements
        _common_ts_Utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].initTooltipForSelector(selector);
        // Init "copy to clipboard" for the buttons
        _common_ts_CopyToClipboardHandler__WEBPACK_IMPORTED_MODULE_1__["CopyToClipboardHandler"].getInstance().initForSelector(selector);
    }
    /**
     * Get custom short code buttons as a list of jQuery elements
     */
    getCustomShortCodeButtons() {
        let $container = this.getCustomShortCodeInputContainer();
        if ($container === null)
            return null;
        // Find short code names
        let names = [], name;
        $container.find('input[name*="[short_code]"]').each((i, el) => {
            name = $(el).val() || null;
            if (name === null || !name.length)
                return;
            names.push(name);
        });
        // Create the buttons
        /*
            <button class="button"
                    data-shortcode-name="{{ $button->getCode() }}"
                    data-clipboard-text="{{ $button->getCodeWithBrackets() }}"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="{{ $button->getDescription() }}">
                {{ $button->getCodeWithBrackets() }}
            </button>
         */
        let $buttonContainer = $('<div/>'), withBrackets, $button;
        for (let name of names) {
            withBrackets = '[' + name + ']';
            $button = $('<button/>')
                .addClass('button')
                .attr('type', 'button')
                .attr('data-shortcode-name', name)
                .attr('data-clipboard-text', withBrackets)
                .attr('data-toggle', 'tooltip')
                .attr('data-placement', 'top')
                .attr('title', window.kdn.custom_short_code + ': ' + name)
                .html(withBrackets);
            $buttonContainer.append($button);
        }
        return $buttonContainer;
    }
    /**
     * Get the input container that contains all custom short code inputs
     */
    getCustomShortCodeInputContainer() {
        let $anInput = $('input[name^="' + this.inputNameCustomShortCodes + '"]').first() || null;
        if ($anInput === null || !$anInput.length)
            return null;
        // Find the container
        let $container = $anInput.closest('.inputs') || null;
        return $container !== null && $container.length ? $container : null;
    }
}
CustomShortCodeHandler.instance = null;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./scripts/post-settings-ts/app/PostSettings.ts":
/*!******************************************************!*\
  !*** ./scripts/post-settings-ts/app/PostSettings.ts ***!
  \******************************************************/
/*! exports provided: PostSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostSettings", function() { return PostSettings; });
/* harmony import */ var _common_ts_Notifier__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common-ts/Notifier */ "./scripts/common-ts/Notifier.ts");
/* harmony import */ var _TestDataPreparer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TestDataPreparer */ "./scripts/post-settings-ts/app/TestDataPreparer.ts");
/* harmony import */ var _common_ts_InputGroupAdder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common-ts/InputGroupAdder */ "./scripts/common-ts/InputGroupAdder.ts");
/* harmony import */ var _PostSettingsVariables__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PostSettingsVariables */ "./scripts/post-settings-ts/app/PostSettingsVariables.ts");
/* harmony import */ var _WooCommerceSettings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./WooCommerceSettings */ "./scripts/post-settings-ts/app/WooCommerceSettings.ts");
/* harmony import */ var _common_ts_enum_NotificationType__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common-ts/enum/NotificationType */ "./scripts/common-ts/enum/NotificationType.ts");
/* harmony import */ var _common_ts_SectionNavigation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../common-ts/SectionNavigation */ "./scripts/common-ts/SectionNavigation.ts");
/* harmony import */ var _common_ts_Utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../common-ts/Utils */ "./scripts/common-ts/Utils.ts");
/* harmony import */ var _common_ts_CopyToClipboardHandler__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../common-ts/CopyToClipboardHandler */ "./scripts/common-ts/CopyToClipboardHandler.ts");
/* harmony import */ var _CustomShortCodeHandler__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./CustomShortCodeHandler */ "./scripts/post-settings-ts/app/CustomShortCodeHandler.ts");
/* harmony import */ var _common_ts_DependantHandler__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../common-ts/DependantHandler */ "./scripts/common-ts/DependantHandler.ts");
/* harmony import */ var _common_ts_enum_NotificationPosition__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../common-ts/enum/NotificationPosition */ "./scripts/common-ts/enum/NotificationPosition.ts");
/* harmony import */ var _common_ts_EventType__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../common-ts/EventType */ "./scripts/common-ts/EventType.ts");













class PostSettings {
    constructor() {
        this.fixedElements = [];
        this.$activeTabContainer = undefined;
        this.$activeTabFixables = undefined;
        this.docWidth = null;
        this.adminBarHeight = null;
        this.notifier = _common_ts_Notifier__WEBPACK_IMPORTED_MODULE_0__["Notifier"].getInstance();
        this.testDataPreparer = _TestDataPreparer__WEBPACK_IMPORTED_MODULE_1__["TestDataPreparer"].getInstance();
        this.inputGroupAdder = _common_ts_InputGroupAdder__WEBPACK_IMPORTED_MODULE_2__["InputGroupAdder"].getInstance();
        this.psv = _PostSettingsVariables__WEBPACK_IMPORTED_MODULE_3__["PostSettingsVariables"].getInstance();
        /*
            INITIALIZE EVERYTHING
         */
        this.getAdminBarHeightIfFixed();
        this.initSettingsPageOptions();
        this.maybeInitTinyMceEditors();
        this.initTooltip();
        _common_ts_SectionNavigation__WEBPACK_IMPORTED_MODULE_6__["SectionNavigation"].getInstance().initNavigations();
        _CustomShortCodeHandler__WEBPACK_IMPORTED_MODULE_9__["CustomShortCodeHandler"].getInstance();
        // If there is a hash for a tab, activate that tab.
        this.restoreURLHash();
        this.handleURLHash();
        // Listen to hash changes and react to them.
        $(window).on('hashchange', e => this.handleURLHash());
        // Add an input group to its container.
        this.psv.$containerMetaBox.on('click', '.kdn-add-new', (e) => this.onClickAddNew(e));
        // Remove an input group.
        this.psv.$containerMetaBox.on('click', '.kdn-remove', (e) => this.onClickRemove(e));
        // React to tests
        this.psv.$containerMetaBox.on('click', this.psv.selectorTestButton, (e) => this.onClickTest(e));
        // Hide test result content container
        $(document).on('click', '.hide-test-results', e => this.onClickHideTestResults(e));
        // Load/refresh translation languages
        this.psv.$containerMetaBox.on('click', this.psv.selectorLoadTranslationLanguages, (e) => this.onLoadRefreshTranslationLanguages(e));
        // Handle tabs
        this.psv.$containerTabs.on('click', 'a', (e) => this.onClickTab(e));
        // Show/hide labels
        this.psv.$containerMetaBox.on('click', '.info-button', (e) => this.onClickInfoButton(e));
        // Show/hide dependants of "list type" checkbox
        this.psv.$containerMetaBox.on("change", "input[type=checkbox]", (e) => {
            _common_ts_DependantHandler__WEBPACK_IMPORTED_MODULE_10__["DependantHandler"].getInstance().handleCheckboxDependants($(e.target));
        });
        // Trigger change on checkboxes when the page is ready
        this.psv.$containerMetaBox.find("input[type=checkbox], select").each((i, el) => {
            _common_ts_DependantHandler__WEBPACK_IMPORTED_MODULE_10__["DependantHandler"].getInstance().handleCheckboxDependants($(el));
        });
        // Trigger change on selects when the page is ready
        this.psv.$containerMetaBox.find("select").each((i, el) => {
            _common_ts_DependantHandler__WEBPACK_IMPORTED_MODULE_10__["DependantHandler"].getInstance().handleSelectDependants($(el));
        });
        // Toggle info texts
        this.psv.$containerMetaBox.on("click", ".toggle-info-texts", (e) => this.onClickToggleInfoTexts(e));
        /*
            COPY TO CLIPBOARD
        */
        // Initialize the clipboard
        if (typeof window.Clipboard == 'function') {
            $(document).ready(() => this.initCopyToClipboard());
        }
        // Prevent default action for the buttons used for copying texts.
        this.psv.$containerMetaBox.on('click', '.input-button-container > button', (e) => e.preventDefault());
        /*
            END COPY TO CLIPBOARD
         */
        // Load/clear general settings when its button is clicked
        $(document).on('click', this.psv.selectorLoadGeneralSettingsButton, (e) => this.handleLoadClearGeneralSettings(e));
        $(document).on('click', this.psv.selectorClearGeneralSettingsButton, (e) => this.handleLoadClearGeneralSettings(e));
        // Prepare sortable elements
        if (typeof window.jQuery.ui != 'undefined' && typeof $.fn.sortable == 'function') {
            $(document).ready(() => this.prepareSortables());
        }
        // Select the code for exporting settings
        $('textarea[readonly="readonly"]').focus((e) => this.onFocusReadonlyTextArea(e));
        // Validate the form before submitting
        this.psv.$form.on('submit', (e) => this.onSubmitForm(e));
        // Activate the tab that was active before saving the settings
        $(document).ready(() => this.activatePreviouslyActiveTab());
        // Show unmodified results
        $(document).on('click', this.psv.selectorButtonSeeUnmodifiedTestResults, (e) => this.onClickSeeUnmodifiedResults(e));
        // Invalidate caches for test URL
        $(document).on('click', this.psv.selectorInvalidateCacheButton, (e) => this.onClickInvalidateTestUrlCache(e));
        // Invalidate all test URL caches
        $(document).on('click', this.psv.selectorInvalidateAllCachesButton, (e) => this.onClickInvalidateAllTestUrlCaches(e));
        // Handle category selection changes in category map
        $(document).on('change', this.psv.selectorCategoryMap + ' select', (e) => this.onChangeCategory(e));
        // Quick save when a quick save button is clicked or enter key is pressed for a text input of the settings.
        $(document).on('click', this.psv.selectorQuickSaveButton, (e) => this.quickSave(e));
        this.psv.$containerMetaBox.on('keydown', 'input, select', (e) => {
            let key = e.which || e.keyCode;
            if (key !== 13) {
                return;
            }
            this.quickSave(e);
        });
        // Fix the things to be fixed when the page is scrolled down
        $(document).on('scroll', (e) => this.handleElementFixing());
        // React to resize events
        $(window).on('resize', (e) => this.onResize(e));
        // When a postbox's column is changed or it is collapsed/expanded, trigger the resize function since positions
        // of some elements might have been changed.
        $(document).on('postbox-toggled postboxes-columnchange', (e) => this.onResize(e));
        // Register input group modifiers.
        this.inputGroupAdder.registerModifier($inputGroup => {
            // If this is a new category map input
            if ($inputGroup.hasClass('category-map')) {
                // Initialize the select element
                this.setCategoryTaxonomyNameForSelect($inputGroup.find('select'));
            }
        });
        // Invalidate active tab fixables when the navigations are initialized. Active tab fixables contain the
        // navigations.
        $(document).on(_common_ts_EventType__WEBPACK_IMPORTED_MODULE_12__["EventType"].navigationsInitialized, () => this.invalidateActiveTabFixablesCache());
        // Init WooCommerce options
        _WooCommerceSettings__WEBPACK_IMPORTED_MODULE_4__["WooCommerceSettings"].getInstance();
    }
    /**
     * This class is a singleton. Get the instance with this method.
     */
    static getInstance() {
        if (!this.INSTANCE)
            this.INSTANCE = new PostSettings();
        return this.INSTANCE;
    }
    /**
     * Initializes settings page options
     */
    initSettingsPageOptions() {
        this.isFixTabs = _common_ts_Utils__WEBPACK_IMPORTED_MODULE_7__["Utils"].getCheckboxValue($(this.psv.selectorCheckboxFixTabs));
        this.isFixContentNavigation = _common_ts_Utils__WEBPACK_IMPORTED_MODULE_7__["Utils"].getCheckboxValue($(this.psv.selectorCheckboxFixContentNavigation));
        $(document).on('change', this.psv.selectorCheckboxFixTabs, (e) => {
            this.isFixTabs = _common_ts_Utils__WEBPACK_IMPORTED_MODULE_7__["Utils"].getCheckboxValue($(e.target));
            this.resetFixableElements();
        });
        $(document).on('change', this.psv.selectorCheckboxFixContentNavigation, (e) => {
            this.isFixContentNavigation = _common_ts_Utils__WEBPACK_IMPORTED_MODULE_7__["Utils"].getCheckboxValue($(e.target));
            this.resetFixableElements();
        });
    }
    /**
     * Reacts to resize events
     * @param e
     */
    onResize(e) {
        // Reset the fixable elements.
        this.resetFixableElements();
        // Reset the previous scroll top positions of the tabs
        this.resetPrevScrollPositionCacheOfTabs();
        // Invalidate the width since it might have been changed
        this.invalidateDocWidthCache();
        // Invalidate the admin bar height cache since the height of it might have been changed.
        this.invalidateAdminBarHeightCache();
    }
    /**
     * Resets fixable elements and tries to fix the elements that need to be fixed.
     */
    resetFixableElements() {
        let $el;
        $(this.psv.selectorFixable).each((i, el) => {
            $el = $(el);
            this.resetOffsetOfFixable($el);
            this.setElementUnfixed($el);
        });
        this.psv.$containerMetaBox.css('padding-top', '0');
        this.handleElementFixing();
    }
    /**
     * Fixes the elements that need to be fixed
     */
    handleElementFixing() {
        // If there is nothing to fix, stop.
        if (!this.isFixTabs && !this.isFixContentNavigation)
            return;
        // If the width of the page is less than a certain threshold, do not fix anything to keep the usable window area
        // big enough to see everything easily.
        if (this.getDocWidth() <= 600)
            return;
        let top = this.getScrollTop();
        let baseFixCondition = top + this.getAdminBarHeightIfFixed();
        let tabContainerFixCondition = 0;
        // Fix tabs
        if (this.isFixTabs) {
            let tabContainerTop = this.getTopOffsetOfTargetFixable(this.psv.$containerTabs);
            let marginTop = 8;
            tabContainerFixCondition = baseFixCondition + marginTop;
            if (tabContainerFixCondition >= tabContainerTop) {
                this.setElementFixed(this.psv.$containerTabs);
                // Unfix tabs if they are fixed
            }
            else {
                this.setElementUnfixed(this.psv.$containerTabs);
            }
        }
        // Fix the fixables inside the current tab container
        if (this.isFixContentNavigation) {
            let $currentTabFixables = this.getActiveTabFixables();
            if ($currentTabFixables === null || !$currentTabFixables.length)
                return;
            let $fixableEl, elTop;
            let tabContainerHeight = this.isFixTabs ? this.psv.$containerTabs.height() : 0;
            let contentNavFixCondition = (this.isFixTabs ? tabContainerFixCondition + tabContainerHeight : baseFixCondition) - 11;
            $currentTabFixables.each((i, el) => {
                $fixableEl = $(el);
                elTop = this.getTopOffsetOfTargetFixable($fixableEl);
                if (contentNavFixCondition >= elTop) {
                    this.setElementFixed($fixableEl, true);
                    // Unfix the element if it is fixed
                }
                else {
                    this.setElementUnfixed($fixableEl, true);
                }
            });
        }
    }
    /**
     * Get the top offset of the original fixable element. This returns the top offset of the element's original location,
     * which is the location that is not fixed. This caches the original element's top offset.
     * @param $element The fixable element
     */
    getTopOffsetOfTargetFixable($element) {
        let elOffsetTop = $element.data('offsetTop') || null;
        if (elOffsetTop === null) {
            $element.data('offsetTop', $element.offset().top);
            elOffsetTop = $element.data('offsetTop');
        }
        return elOffsetTop;
    }
    /**
     * Resets the top offset of the fixable element. The offset of the original element is cached in
     * {@link getTopOffsetOfTargetFixable}. This method invalidates that cache.
     * @param $element
     */
    resetOffsetOfFixable($element) {
        $element.removeData('offsetTop');
    }
    /**
     * Fixes an element at the top of the page.
     * @param $element The element to be fixed.
     * @param isInTabContent True if the element is in a tab's content container.
     */
    setElementFixed($element, isInTabContent = false) {
        if ($element.hasClass(this.psv.classFixed))
            return;
        let index = this.fixedElements.indexOf($element);
        if (index !== -1)
            return;
        let fixedElTop = null;
        // If there is at least one another fixed element
        if (this.fixedElements.length > 0) {
            // To fix the nav at the bottom of that element, we need that element's top position and height.
            let $lastFixedEl = this.fixedElements[this.fixedElements.length - 1];
            let lastFixedElTop = parseFloat($lastFixedEl.css('top')) || 0;
            fixedElTop = lastFixedElTop + $lastFixedEl.outerHeight();
        }
        else {
            // Otherwise, since there is always the admin bar fixed at the top, fixed navigation should be added after
            // the admin bar.
            fixedElTop = this.getAdminBarHeightIfFixed();
        }
        this.fixedElements.push($element);
        let $containerMetaBox = this.psv.$containerMetaBox;
        // Get the width of the settings container
        let metaBoxWidth = $containerMetaBox.width();
        let paddingTopValue = (parseFloat($containerMetaBox.css('padding-top')) || 0) + $element.outerHeight();
        if (isInTabContent)
            paddingTopValue += 12;
        $containerMetaBox.css('padding-top', paddingTopValue + 'px');
        $element
            .data('height', $element.outerHeight())
            .css('width', metaBoxWidth + 'px')
            .addClass(this.psv.classFixed)
            .css('top', fixedElTop);
    }
    /**
     * @return Admin bar height if the admin bar is fixed. Otherwise, returns 0.
     */
    getAdminBarHeightIfFixed() {
        if (this.adminBarHeight === null) {
            this.adminBarHeight = this.psv.$adminBar.css('position').toLocaleLowerCase() === 'fixed' ? this.psv.$adminBar.outerHeight() : 0;
        }
        return this.adminBarHeight;
    }
    /**
     * Invalidates admin bar height cache
     */
    invalidateAdminBarHeightCache() {
        this.adminBarHeight = null;
    }
    /**
     * Get the width of the document
     */
    getDocWidth() {
        if (this.docWidth === null) {
            this.docWidth = $(document).width();
        }
        return this.docWidth;
    }
    /**
     * Invalidates the cached document width
     */
    invalidateDocWidthCache() {
        this.docWidth = null;
    }
    /**
     * Unfixes an element that is fixed at the top of the page using {@link setElementFixed}.
     * @param $element The element to be fixed.
     * @param isInTabContent True if the element is in a tab's content container.
     */
    setElementUnfixed($element, isInTabContent = false) {
        if (!$element.hasClass(this.psv.classFixed))
            return;
        // Find the index of the element in the fixed elements array
        let index = -1;
        for (let i = 0; i < this.fixedElements.length; i++) {
            if (this.fixedElements[i].get(0) == $element.get(0)) {
                index = i;
                break;
            }
        }
        // No need to continue if the element does not exist in fixed elements array
        if (index === -1)
            return;
        // Remove the element from fixed elements array
        this.fixedElements.splice(index, 1);
        let $containerMetaBox = this.psv.$containerMetaBox;
        let paddingTopValue = Math.max(0, (parseFloat($containerMetaBox.css('padding-top')) || 0) - $element.data('height'));
        if (isInTabContent)
            paddingTopValue -= 12;
        $containerMetaBox.css('padding-top', paddingTopValue + 'px');
        $element
            .removeClass(this.psv.classFixed)
            .css('width', '')
            .css('top', '')
            .removeData('height');
    }
    /**
     * Get total height of the elements that are fixed at the top of the page
     * @return number
     */
    getFixedElementsTotalHeight() {
        return this.fixedElements.reduce((acc, $curr) => {
            return acc + $curr.outerHeight();
        }, 0);
    }
    /**
     * Handles category selection changes in the category map option
     * @param e
     */
    onChangeCategory(e) {
        let $self = $(e.target);
        this.setCategoryTaxonomyNameForSelect($self);
    }
    /**
     * Sets hidden 'taxonomy' input's value for a category select element.
     * @param $selectEl
     */
    setCategoryTaxonomyNameForSelect($selectEl) {
        // Get the selected option
        let $selectedOption = $selectEl.find(':selected') || null;
        if ($selectedOption === null || !$selectedOption.length)
            return;
        // Get the taxonomy
        let taxonomy = $selectedOption.data('taxonomy') || null;
        // Find the hidden taxonomy input and set its value as the selected category's taxonomy
        $selectEl.closest('.input-container').find('input.category-taxonomy').val(taxonomy);
    }
    /**
     * Toggles visibility of unmodified results
     * @param e
     */
    onClickSeeUnmodifiedResults(e) {
        let $self = $(e.target);
        let $unmodifiedResults = $self.parent().find('ul').first();
        if ($unmodifiedResults.hasClass('hidden')) {
            $unmodifiedResults.removeClass('hidden');
        }
        else {
            $unmodifiedResults.addClass('hidden');
        }
    }
    /**
     * Activates the tab that was active before saving the settings
     */
    activatePreviouslyActiveTab() {
        let $input = $(this.psv.selectorInputURLHash);
        if (!$input.length || !$input.first().val())
            return;
        let values = $input.first().val().split("|");
        if (values.length < 2)
            return;
        // Last index stores the scroll position
        let scrollPos = values[values.length - 1];
        // Remove the scroll position from URL hash
        values.splice(values.length - 1, 1);
        history.replaceState(undefined, undefined, values.join("|"));
        // Activate the tab and move the page to the previous scroll position
        this.handleURLHash();
        document.documentElement.scrollTop = scrollPos;
    }
    /**
     * Saves the settings via AJAX
     * @param e
     */
    quickSave(e) {
        e.preventDefault();
        // Check if import option has values. If so, saving via AJAX is not logical since the page needs to be refreshed
        // to see updated inputs. In that case, click submit button.
        let $importTextArea = $('#_post_import_settings') || null;
        if ($importTextArea !== null && $importTextArea.length) {
            let val = $importTextArea.val() || null;
            if (val !== null && val.length) {
                this.psv.$form.find('input[type="submit"]').trigger("click");
                return;
            }
        }
        let $button = $(this.psv.selectorQuickSaveButton);
        if ($button.length > 0)
            $button = $button.first();
        // Stop if there is a saving process going on.
        if ($button.hasClass('loading'))
            return;
        // Get the post ID
        let postId = $button.data('post-id') || null;
        // If the post ID does not exist, notify the user and stop.
        if (postId === null || !postId) {
            this.notifier.notifyRegular($button, window.kdn.post_id_not_found, _common_ts_enum_NotificationType__WEBPACK_IMPORTED_MODULE_5__["NotificationType"].ERROR, _common_ts_enum_NotificationPosition__WEBPACK_IMPORTED_MODULE_11__["NotificationPosition"].LEFT);
            return;
        }
        // First, do the things that should be done before the form is submitted.
        if (!this.beforeFormSubmit(e)) {
            // Scroll to top so that the user can see the errors
            $(document).find('html, body').stop().animate({
                scrollTop: 20
            }, 500, 'swing');
            return;
        }
        let serializedFormValues = this.getFormValuesSerialized();
        // If serialized values do not exist, notify the user and stop.
        if (serializedFormValues === null || !serializedFormValues.length) {
            this.notifier.notifyRegular($button, window.kdn.settings_not_retrieved, _common_ts_enum_NotificationType__WEBPACK_IMPORTED_MODULE_5__["NotificationType"].ERROR, _common_ts_enum_NotificationPosition__WEBPACK_IMPORTED_MODULE_11__["NotificationPosition"].LEFT);
            return;
        }
        // Set the button loading
        let successClasses = 'flip';
        let errorClasses = 'shake';
        let loadingClasses = 'bounce infinite loading';
        $button
            .removeClass(successClasses)
            .removeClass(errorClasses)
            .addClass(loadingClasses);
        // Save the form
        $.post(window.ajaxurl, {
            kdn_nonce: this.psv.$kdnNonce.val(),
            action: window.pageActionKey,
            data: {
                cmd: "saveSiteSettings",
                postId: postId,
                settings: serializedFormValues,
            }
        })
            .done((response) => {
            let success = response.success;
            let message = response.message;
            if (success) {
                $button
                    .removeClass(loadingClasses)
                    .addClass(successClasses);
                this.notifier.notifyRegular($button, window.kdn.settings_saved, _common_ts_enum_NotificationType__WEBPACK_IMPORTED_MODULE_5__["NotificationType"].SUCCESS, _common_ts_enum_NotificationPosition__WEBPACK_IMPORTED_MODULE_11__["NotificationPosition"].LEFT);
                // Set the export option's value
                let settingsForExport = response.settingsForExport || null;
                if (settingsForExport !== null && settingsForExport.length) {
                    let $exportTextArea = $(this.psv.selectorExportSettingsTextArea) || null;
                    if ($exportTextArea !== null)
                        $exportTextArea.val(settingsForExport);
                }
            }
            else {
                // Notify the user
                this.notifier.notifyRegular($button, message, _common_ts_enum_NotificationType__WEBPACK_IMPORTED_MODULE_5__["NotificationType"].ERROR, _common_ts_enum_NotificationPosition__WEBPACK_IMPORTED_MODULE_11__["NotificationPosition"].LEFT);
            }
        })
            .fail((response) => {
            $button.removeClass(loadingClasses).addClass(errorClasses);
            // Notify the user
            this.notifier.notifyRegular($button, window.kdn.an_error_occurred, _common_ts_enum_NotificationType__WEBPACK_IMPORTED_MODULE_5__["NotificationType"].ERROR, _common_ts_enum_NotificationPosition__WEBPACK_IMPORTED_MODULE_11__["NotificationPosition"].LEFT);
        })
            .always(() => {
            $button.removeClass(loadingClasses);
        });
    }
    /**
     * Handles form submission
     * @param e
     * @return {boolean} True if the form is valid, otherwise false.
     */
    onSubmitForm(e) {
        this.beforeFormSubmit(e);
    }
    /**
     * Handles some things before the form is submitted
     * @param e
     */
    beforeFormSubmit(e) {
        let isValid = this.validateForm(e);
        // If there is an optionBox, make sure it is closed to save its state.
        if (typeof window.optionsBox !== 'undefined') {
            window.optionsBox.close();
        }
        // Add current scroll position to hidden active tab input's value
        let $hiddenActiveTabInput = $(this.psv.selectorInputURLHash);
        if ($hiddenActiveTabInput.length) {
            // Store current window hash in a hidden input. We will use the hidden input value to restore page's state
            // when the user comes back to the page after saving the settings.
            $hiddenActiveTabInput.val(window.location.hash + "|" + document.documentElement.scrollTop);
        }
        return isValid;
    }
    /**
     * Validate the form
     * @param e The event
     * @return {boolean} True if the form is valid. Otherwise, false.
     */
    validateForm(e) {
        // If the import textarea has a value, do not validate.
        let $importInput = $(this.psv.selectorInputImport);
        if ($importInput.length && $importInput.val().length > 0) {
            this.removeErrorsFromAllTabs();
            return;
        }
        let $categoryMapContainer = $(this.psv.selectorCategoryMap), $inputMainUrl = $("#_main_page_url"), $passwordsContainer = $(this.psv.selectorInputContainerPasswords), errorElements = [];
        this.psv.$errorAlert.addClass("hidden");
        let hasError = false;
        this.removeErrorsFromAllTabs();
        // Validate category map
        if ($categoryMapContainer.length) {
            // Check if any URL is added more than once
            let urls = [];
            let errorCategoryMap = false;
            $categoryMapContainer.find('.input-group').each((i, el) => {
                $(el).removeClass(this.psv.clsHasError);
            });
            $categoryMapContainer.find("input[type=text]").each((i, el) => {
                let $self = $(el);
                if (urls.indexOf($self.val()) == -1) {
                    urls.push($self.val());
                }
                else {
                    $self.closest(".input-group").addClass(this.psv.clsHasError);
                    if (!errorCategoryMap)
                        errorCategoryMap = true;
                }
                // Check if any category map URL is empty
                if (!$self.val().length) {
                    $self.closest(".input-group").addClass(this.psv.clsHasError);
                    if (!errorCategoryMap)
                        errorCategoryMap = true;
                }
            });
            if (errorCategoryMap) {
                hasError = true;
                // Add this among error elements.
                errorElements.push($categoryMapContainer);
            }
        }
        // Validate main url
        if ($inputMainUrl.length) {
            $inputMainUrl.closest(".input-group").removeClass(this.psv.clsHasError);
            if (!$inputMainUrl.val().length) {
                hasError = true;
                $inputMainUrl.closest(".input-group").addClass(this.psv.clsHasError);
                // Add this among error elements.
                errorElements.push($inputMainUrl);
            }
        }
        // Validate passwords
        if ($passwordsContainer.length) {
            let cbChangePassword = $("#_kdn_change_password");
            // If the checkbox required for changing the password is checked, validate the pw fields.
            if (cbChangePassword != undefined && cbChangePassword[0].checked) {
                $passwordsContainer.each((i, el) => {
                    $(el).closest(".input-group").removeClass(this.psv.clsHasError);
                });
                let passwordOld = null, password1 = null, password2 = null;
                $passwordsContainer.find("input[type=password]").each((i, el) => {
                    let $self = $(el);
                    if (passwordOld == null) {
                        passwordOld = true;
                    }
                    else if (password1 == null) {
                        password1 = $self.val();
                    }
                    else if (password2 == null) {
                        password2 = $self.val();
                        if (password1 != password2) {
                            $self.closest(".input-group").addClass(this.psv.clsHasError);
                            password1 = password2 = null;
                            hasError = true;
                            // Add this among error elements.
                            errorElements.push($self);
                        }
                    }
                });
            }
        }
        if (hasError) {
            // Tab errors are not shown for some reason. However, setting them with 1 ms delay works OK.
            setTimeout(() => {
                // Show tab errors
                for (let i in errorElements) {
                    if (!errorElements.hasOwnProperty(i))
                        continue;
                    this.setTabError(errorElements[i], true);
                }
            }, 1);
            this.psv.$errorAlert.removeClass("hidden");
            e.preventDefault();
            return false;
        }
        return true;
    }
    /**
     * Get form values as a serialized string.
     *
     * @return {string}
     */
    getFormValuesSerialized() {
        // TinyMCE editors' values are not serialized. Get their values and put them into their respective textarea form
        // items.
        let tinymceImpl = ((typeof window.tinymce === "function") ? window.tinymce : window.tinyMCE) || null;
        if (tinymceImpl !== null) {
            let $el, $editorWrapper, name, content, editor;
            $('textarea.wp-editor-area').each((i, el) => {
                $el = $(el);
                // Find the closest TinyMCE wrapper to get if the TinyMCE editor is active. When the HTML editor is active,
                // which is activated by clicking "Text" button, the user directly enters the code to the textarea. In
                // that case, we do not need to get the content from the editor. In fact, when we do that, the editor's
                // previous content is retrieved. In other words, the last changes made by the user to the textarea element
                // are not there. So, when the HTML editor is active, we must do nothing.
                $editorWrapper = $el.closest('.wp-editor-wrap');
                // The editor wrapper is added "html-active" class when the HTML editor is active.
                if ($editorWrapper.hasClass('html-active')) {
                    // We do not need to get the content from the editor. The content is already in the textarea.
                    return;
                }
                name = $el.attr('name');
                editor = tinymceImpl.get(name) || null;
                if (editor === null)
                    return;
                content = editor.getContent();
                $el.val(content);
            });
        }
        // Serialize the form
        return this.psv.$form.serialize() || null;
    }
    /**
     * Set error indicator for a tab
     * @param $element The element which caused an error
     * @param hasError true if the tab should have an error mark, false otherwise
     */
    setTabError($element, hasError) {
        let tabId = $element.closest('.tab').attr("id");
        let $tab = this.psv.$containerTabs.find("[data-tab='#" + tabId + "']");
        if (!hasError) {
            $tab.removeClass(this.psv.clsHasError);
        }
        else {
            $tab.addClass(this.psv.clsHasError);
        }
    }
    /**
     * Removes error classes from all tabs
     */
    removeErrorsFromAllTabs() {
        this.psv.$containerTabs.find('.nav-tab').each((i, el) => {
            $(el).removeClass(this.psv.clsHasError);
        });
    }
    /**
     * Handles focus events of read-only textareas
     * @param e
     */
    onFocusReadonlyTextArea(e) {
        let $self = $(e.target);
        $self.select();
        // Work around Chrome's little problem
        $self.mouseup(function () {
            // Prevent further mouseup intervention
            $self.unbind("mouseup");
            return false;
        });
    }
    /**
     * Prepares sortable elements. Disables sorting (being moved around) of the meta boxes having not-sortable class.
     * Makes "multiple" inputs sortable
     * @see http://wordpress.stackexchange.com/a/73806/87173
     */
    prepareSortables() {
        $(".meta-box-sortables")
            // define the cancel option of sortable to ignore sortable element
            // for boxes with '.not-sortable' css class
            .sortable('option', 'cancel', '.not-sortable .hndle, :input, button')
            // and then refresh the instance
            .sortable('refresh');
        // Make "multiple" inputs sortable
        $(".inputs").sortable({
            placeholder: "sortable-placeholder",
            handle: '.kdn-sort',
            items: ' > .input-group',
            axis: "y",
            cursor: "move",
            start: function (e, ui) {
                // Make placeholder's height the same as the current item's height
                ui.placeholder.height(ui.helper.outerHeight());
            },
            update: function (e, ui) {
                // Update data keys of the inputs when an input group's position is changed. This is required to keep
                // the order of the input groups after saving the settings.
                let $self, $selfInput, id, name;
                let regex = new RegExp("\\[[0-9]+\\]", "g");
                // For each input group that is in the same container as the item that has just been moved
                ui.item.closest('.inputs').find('> .input-group').each(function (index) {
                    $self = $(this);
                    // Update the input group's data key
                    $self.data("key", index);
                    $self.attr("data-key", index);
                    // Update the name and ID of each input in this input group
                    $self.find(':input[name]').each(function () {
                        $selfInput = $(this);
                        id = $selfInput.attr('id');
                        name = $selfInput.attr('name');
                        if (name !== null && name !== undefined && name !== 'undefined' && name.length) {
                            $selfInput.attr('name', name.replace(regex, "[" + index + "]"));
                        }
                        if (id !== null && id !== undefined && id !== 'undefined' && id.length) {
                            $selfInput.attr('id', id.replace(regex, "[" + index + "]"));
                        }
                    });
                });
            }
        });
    }
    /**
     * Handles "load/clear general settings" button clicks
     * @param e
     */
    handleLoadClearGeneralSettings(e) {
        e.preventDefault();
        let $self = $(e.target), id = $self.attr("id");
        // Do not proceed if this is currently loading.
        if ($self.hasClass("loading"))
            return;
        $self.addClass("loading");
        $.post(window.ajaxurl, {
            kdn_nonce: this.psv.$kdnNonce.val(),
            action: window.pageActionKey,
            data: {
                cmd: ("#" + id) == this.psv.selectorClearGeneralSettingsButton ? "clearGeneralSettings" : "loadGeneralSettings"
            }
        })
            .done((response) => {
            let view = response.view;
            // Replace the current settings with the ones in the response.
            // Trigger 'change' on checkboxes so that the dependants can be shown or hidden accordingly.
            $(this.psv.selectorTabGeneralSettings).html(view).find("[type=checkbox]").trigger('change');
        })
            .fail((response) => {
            console.log(response);
        })
            .always(() => {
            // Remove loading class
            $self.removeClass("loading");
        });
    }
    /**
     * Initializes "copy to clipboard" handlers
     */
    initCopyToClipboard() {
        let selector = '.input-button-container > button';
        _common_ts_CopyToClipboardHandler__WEBPACK_IMPORTED_MODULE_8__["CopyToClipboardHandler"].getInstance().initForSelector(selector);
    }
    /**
     * Handles "toggle info texts" button clicks
     * @param e
     */
    onClickToggleInfoTexts(e) {
        e.preventDefault();
        // Find all info texts and show/hide
        this.psv.$containerMetaBox.find(".info-text").each((i, el) => {
            if (this.psv.infoTextsHidden) {
                $(el).removeClass("hidden");
            }
            else {
                $(el).addClass("hidden");
            }
        });
        this.psv.infoTextsHidden = !this.psv.infoTextsHidden;
    }
    /**
     * Handles info button clicks
     * @param e
     */
    onClickInfoButton(e) {
        e.preventDefault();
        // Get the closest info button, since an element inside the info button might trigger this event
        let $self = $(e.target).closest('.info-button');
        // Show closest info text
        let $infoText = $self.parent().find('.info-text').first();
        if ($infoText.hasClass('hidden')) {
            $infoText.removeClass('hidden');
        }
        else {
            $infoText.addClass('hidden');
        }
    }
    /**
     * Handles tab click events
     * @param e
     */
    onClickTab(e) {
        e.preventDefault();
        this.activateTab($(e.target).data("tab"));
    }
    /**
     * Handles click events of "load" or "refresh" button for translation languages
     * @param e
     */
    onLoadRefreshTranslationLanguages(e) {
        e.preventDefault();
        let $self = $(e.target), data = $self.data("kdn"), serviceType = data["serviceType"], selectors = data["selectors"], requestType = data["requestType"], ajaxData = {};
        // If it is still loading, do not try to load it twice.
        if ($self.hasClass("loading"))
            return;
        for (let key in selectors) {
            if (!selectors.hasOwnProperty(key))
                continue;
            let selector = selectors[key], $targetEl = $(selector), val = $targetEl.val();
            // If value of the element does not exist, notify the user and stop.
            if (!val.length) {
                this.notifier.notify($targetEl, window.kdn.required);
                return;
            }
            ajaxData[key] = val;
        }
        // Prepare the data that will be sent via an AJAX request
        let preparedAjaxData = {};
        preparedAjaxData[serviceType] = ajaxData;
        preparedAjaxData["requestType"] = requestType;
        preparedAjaxData["isOption"] = $(".kdn-general-settings").length ? 1 : 0;
        // Add loading class to the button.
        $self.addClass("loading");
        // Make the request
        $.post(window.ajaxurl, {
            kdn_nonce: this.psv.$kdnNonce.val(),
            action: window.pageActionKey,
            data: preparedAjaxData
        })
            .done((response) => {
            if (response == undefined || !response || response.view == undefined || (response.errors != undefined && response.errors.length)) {
                this.notifier.notify($self, window.kdn.an_error_occurred);
                console.log(response);
                if (response.view != undefined) {
                    // Show the errors
                    let $resultContainer = $self.closest("td").find(".test-results");
                    let $contentContainer = $resultContainer.find(".content");
                    $contentContainer.html(response.view);
                    $resultContainer.removeClass("hidden");
                }
                return;
            }
            //l(response);
            // Show the select elements with the languages
            let $viewFrom = $(response.view.from), $viewTo = $(response.view.to), keyFrom = $viewFrom.find("select").first().attr("name"), keyTo = $viewTo.find("select").first().attr("name");
            $("label[for='" + keyFrom + "']").closest("tr").find("td:nth-child(2)").html(response.view.from);
            $("label[for='" + keyTo + "']").closest("tr").find("td:nth-child(2)").html(response.view.to);
            // Flash the backgrounds of the select elements to inform the user that the request has been successful.
            this.flashBackground($("#" + keyFrom));
            this.flashBackground($("#" + keyTo));
        })
            .fail((response) => {
            // Notify that the request has failed.
            this.notifier.notify($self, window.kdn.an_error_occurred + ": " + response.responseText);
            console.log(response);
        })
            .always(() => {
            // Remove loading class
            $self.removeClass("loading");
        });
    }
    /**
     * Handles the event of clicking "hide" button of the test results
     * @param e
     */
    onClickHideTestResults(e) {
        e.preventDefault();
        // Find closest test results
        let $self = $(e.target);
        // Hide it
        let $resultContainer = $self.closest(".test-results");
        $resultContainer.addClass("hidden");
        // Remove the HTML
        $resultContainer.find('.content').html("");
    }
    /**
     * Handles the event of clicking a "test" button
     * @param e
     */
    onClickTest(e) {
        e.preventDefault();
        let $self = $(e.target);
        let data = this.testDataPreparer.prepareTestData($self);
        if (data == null)
            return;
        // Set the closest test results container loading and clear its content
        let $resultContainer = $self.closest("td").find(".test-results");
        let $contentContainer = $resultContainer.find(".content");
        $resultContainer
            .removeClass("hidden")
            .addClass("loading");
        $contentContainer.html("");
        // Set the button loading
        $self.addClass("loading");
        $.post(window.ajaxurl, {
            kdn_nonce: this.psv.$kdnNonce.val(),
            action: window.pageActionKey,
            data: data
        })
            .done((response) => {
            if (response == undefined || !response || response.view == undefined) {
                $contentContainer.html(window.kdn.an_error_occurred);
                return;
            }
            // Get the test results from the response view and store them in the test button itself. We might
            // use the results again, for example, in the options box.
            // Surround the view with a "div" (does not matter the element tag here) so that we can query it with
            // CSS selectors.
            let results = $("<div>" + response.view + "</div>").find('ul').data("results");
            if (results !== null && results !== undefined && results !== 'undefined') {
                $self.data("results", results);
            }
            // Show the results
            $contentContainer.html(response.view);
            // Check if this is category-mapping stuff
            if ($self.hasClass('kdn-category-map')) {
                // Get the container
                let $inputGroupContainer = $(this.psv.selectorCategoryMap).find('.inputs');
                // Add resultant URLs as new input
                for (let i = 0; i < response.data.length; i++) {
                    let url = response.data[i];
                    if (url.match("^javascript"))
                        continue;
                    let $newInputGroup = this.inputGroupAdder.addNewInputGroup($inputGroupContainer);
                    $newInputGroup.find('input').val(url);
                }
            }
        })
            .fail((response) => {
            $contentContainer.html(window.kdn.an_error_occurred + " <br />" + response.responseText);
            console.log(response);
        })
            .always(() => {
            // Remove loading class
            $resultContainer.removeClass("loading");
            $self.removeClass("loading");
        });
    }
    /**
     * Handles the event of clicking a "remove" button
     * @param e
     */
    onClickRemove(e) {
        e.preventDefault();
        let $self = $(e.target);
        // Get count of input groups
        let count = $self.closest(".inputs").find(".input-group").length;
        let $closestInputGroup = $self.closest(".input-group");
        // If there is only 1 input group, then do not remove it. Just clear the values.
        if (count == 1) {
            $closestInputGroup.find("input").each(function () {
                $(this).val("").trigger('change');
            });
            $closestInputGroup.find("textarea").each(function () {
                $(this).html("").val("").trigger('change');
            });
            $closestInputGroup.find("input[type=checkbox]").each(function () {
                $(this).prop('checked', false).trigger('change');
            });
            // Check if there is an options box button and revert it to its default
            $closestInputGroup.find('.kdn-options-box').each(function () {
                let $self = $(this);
                $self.removeClass('has-config');
                if (typeof $.fn.tooltip === 'function')
                    $self.tooltip('destroy');
            });
            // Otherwise, remove the input group.
        }
        else {
            // Clear the values of the inputs and trigger a change event so that any change event listener can get
            // notified.
            $closestInputGroup
                .find('.input-container')
                .find('input, select, textarea')
                .val('')
                .trigger('change');
            $closestInputGroup.remove();
        }
    }
    /**
     * Handles the event of clicking an "add new" button
     * @param e
     */
    onClickAddNew(e) {
        e.preventDefault();
        let $self = $(e.target);
        // Find the input container
        let $inputGroupContainer = $self.closest("td").find(".inputs");
        // Get max limit
        let max = $self.data("max");
        if (max != 0 && $inputGroupContainer.length >= max)
            return;
        this.inputGroupAdder.addNewInputGroup($inputGroupContainer);
    }
    /**
     * Handle what happens when "invalidate test URL cache" is clicked.
     * @param e
     */
    onClickInvalidateTestUrlCache(e) {
        e.preventDefault();
        let $self = $(e.target);
        let testUrl = $self.data("url") || null;
        // If the test URL is not valid, notify the user and return.
        if (testUrl === null || !testUrl.length) {
            this.notifier.notify($self, window.kdn.url_cannot_be_retrieved);
            return;
        }
        // Get the test result container.
        let $testResultsContainer = $self.closest('.test-results');
        // If it is already loading, stop.
        if ($testResultsContainer.hasClass('loading'))
            return;
        // Make the test result container loading to indicate an AJAX request is sent.
        $testResultsContainer.addClass('loading');
        $.post(window.ajaxurl, {
            kdn_nonce: this.psv.$kdnNonce.val(),
            action: window.pageActionKey,
            data: {
                cmd: "invalidate_url_response_cache",
                url: testUrl
            }
        })
            .done((response) => {
            let success = response == "1";
            // Create the message
            let msg = success ? window.kdn.cache_invalidated : window.kdn.cache_could_not_be_invalidated;
            this.notifier.notifyRegular($self, msg, success ? _common_ts_enum_NotificationType__WEBPACK_IMPORTED_MODULE_5__["NotificationType"].SUCCESS : _common_ts_enum_NotificationType__WEBPACK_IMPORTED_MODULE_5__["NotificationType"].ERROR);
        })
            .fail((response) => {
            console.log(response);
            // Notify the user that the cache could not be invalidated
            this.notifier.notify($self, window.kdn.cache_could_not_be_invalidated);
        })
            .always(() => {
            // Remove loading class
            $testResultsContainer.removeClass('loading');
        });
    }
    /**
     * Handle what happens when "invalidate test URL cache" is clicked.
     * @param e
     */
    onClickInvalidateAllTestUrlCaches(e) {
        e.preventDefault();
        let $self = $(e.target);
        // Get the test result container.
        let $testResultsContainer = $self.closest('.test-results');
        // If it is already loading, stop.
        if ($testResultsContainer.hasClass('loading'))
            return;
        // Make the test result container loading to indicate an AJAX request is sent.
        $testResultsContainer.addClass('loading');
        $.post(window.ajaxurl, {
            kdn_nonce: this.psv.$kdnNonce.val(),
            action: window.pageActionKey,
            data: {
                cmd: "invalidate_all_url_response_caches",
            }
        })
            .done((response) => {
            let success = response == "1";
            // Create the message
            let msg = success ? window.kdn.all_cache_invalidated : window.kdn.all_cache_could_not_be_invalidated;
            this.notifier.notifyRegular($self, msg, success ? _common_ts_enum_NotificationType__WEBPACK_IMPORTED_MODULE_5__["NotificationType"].SUCCESS : _common_ts_enum_NotificationType__WEBPACK_IMPORTED_MODULE_5__["NotificationType"].ERROR);
        })
            .fail((response) => {
            console.log(response);
            // Notify the user that all cache could not be invalidated
            this.notifier.notify($self, window.kdn.all_cache_could_not_be_invalidated);
        })
            .always(() => {
            // Remove loading class
            $testResultsContainer.removeClass('loading');
        });
    }
    /**
     * Initializes tooltip instances
     */
    initTooltip() {
        _common_ts_Utils__WEBPACK_IMPORTED_MODULE_7__["Utils"].initTooltipForSelector('');
    }
    /**
     * Handles URL hash changes. E.g. activates tabs.
     */
    handleURLHash() {
        let hash = window.location.hash;
        if (hash && hash.indexOf("#_") === 0) {
            let tabHash = hash.split("|")[0];
            this.activateTab(tabHash.replace("#_", "#"));
        }
    }
    /**
     * Restores the URL hash to the state before saving the settings
     */
    restoreURLHash() {
        let $input = $(this.psv.selectorInputURLHash);
        if (!$input.length || !$input.first().val())
            return;
        let values = $input.first().val().split("|");
        // There are values of main tab and scroll position. So, there should be at least two values.
        // When there is no location hash but the scroll position, the value of the input becomes like "|20". In this
        // case, there is no location hash and the values[0] is empty. Hence, in that case, no location hash to restore.
        // So, stop.
        if (values.length < 2 || (values[0] === ''))
            return;
        history.replaceState(undefined, undefined, values.join("|"));
    }
    /**
     * Activate a tab
     * @param tabSelector Should be a tab ID and start with "#"
     */
    activateTab(tabSelector) {
        // Make fixables in the previous tab not-fixed
        this.resetFixableElements();
        let $tab = this.psv.$containerTabs.find('[data-tab="' + tabSelector + '"]');
        if (!$tab.length || $tab.hasClass("hidden") || $tab.hasClass('nav-tab-active'))
            return;
        // Store the top position of the page so that we can restore it when this tab is activated again.
        // Math.floor is crucial here. Because, top offset of the element is a float while scroll top of the page is
        // retrieved as integer. Hence, the scroll top of the page is actually a rounded number. In this case, to be
        // able to compare scroll top and the original tab container top correctly, we get rid of the decimal part of
        // the offset of the tab container. E.g. let's say original top offset of the tab container is 156.725. When we
        // make the page scroll to 156.725 and retrieve scroll top value of the page, we get 157. Here, we simply
        // eliminate this interesting case. Moreover, we act a little bit precautious by rounding the number down so that
        // when we compare the values, current scroll top of the element is always greater.
        let originalTabContainerTop = Math.floor(this.getTopOffsetOfTargetFixable(this.psv.$containerTabs) || 0);
        this.getActiveTab().data('scrolltop', this.getScrollTop() > originalTabContainerTop ? this.getScrollTop() : null);
        // First deactivate all tabs
        this.psv.$containerMetaBox.find("> .tab").addClass("hidden");
        this.psv.$containerTabs.find("a").removeClass("nav-tab-active");
        // Now activate the selected tab
        let elementId = $tab.data("tab");
        $(elementId).removeClass("hidden");
        $tab.addClass("nav-tab-active");
        // Do the things that should be done when the active tab changes
        this.onActiveTabChanged();
        // Change window hash without affecting browser history. By this way, going back won't result in a tab change.
        let hash = window.location.hash.split("|");
        hash[0] = elementId.replace("#", "#_");
        history.replaceState(undefined, undefined, hash.join("|"));
        // Make sure the editors in this tab are initialized. The height of the editors are not correct when they are
        // made visible by moving to a tab that contains editors, although the heights are correct when the editors
        // are visible right after the page loads. However, the editors are not visible right after the page loads.
        this.maybeInitTinyMceEditors();
        // Handle fixed navigation elements in the currently activated tab
        this.resetFixableElements();
        this.handleElementFixing();
        // If there is a scroll top for the activated tab, restore it.
        let tabScrollTopState = $tab.data('scrolltop') || null;
        let currentScrollTop = this.getScrollTop() + this.getAdminBarHeightIfFixed();
        let adminBarHeight = this.getAdminBarHeightIfFixed();
        if (tabScrollTopState === null) {
            // Otherwise
            tabScrollTopState = originalTabContainerTop < currentScrollTop ? originalTabContainerTop - adminBarHeight : null;
        }
        // Scroll to the previous location only if the page is scrolled beyond the top location of the original tab
        // container.
        if (tabScrollTopState !== null && currentScrollTop >= originalTabContainerTop) {
            $(document).scrollTop(tabScrollTopState);
        }
    }
    /**
     * Does the things to be done when the active tab changes
     */
    onActiveTabChanged() {
        // Invalidate the active tab container since the active tab has changed.
        this.invalidateActiveTabContainer();
        // Invalidate the cache storing fixable elements of the active tab since the active tab has changed.
        this.invalidateActiveTabFixablesCache();
    }
    /**
     * Resets the data that stores the previous scroll top position of the tab. The cache is there in order to restore
     * the scroll top position when the tab is activated later. The cache is set in {@link activateTab}.
     */
    resetPrevScrollPositionCacheOfTabs() {
        this.getAllTabs().removeData('scrolltop');
    }
    /**
     * Initializes editors if they were not initialized. This method fixes the problem that the editors do not have
     * the right height.
     */
    maybeInitTinyMceEditors() {
        // Find the editors in the current tab
        let $currentContainer = this.getActiveTabContainer();
        // If there are no editors in this tab or the editors for this tab have already been initialized, stop.
        if ($currentContainer === null || ($currentContainer !== null && $currentContainer.hasClass('editors-initialized'))) {
            return;
        }
        $currentContainer.find('.wp-editor-container').each((i, el) => {
            let $self = $(el);
            // Find the height of the textarea of the editor
            let $textarea = $self.find('textarea').first() || null;
            if ($textarea === null || !$textarea.length || $textarea.hasClass('initialized'))
                return;
            let height = $textarea.height();
            // Change the height of the editor iframe so that it matches with the height of the textarea. By this way,
            // the editor will have the correct height.
            $self.find('.mce-container > iframe').css('height', height + 'px');
            // Mark it as initialized
            $textarea.addClass('initialized');
        });
        // Mark the container as that their editors are initialized so that we will not try to do it again.
        $currentContainer.addClass('editors-initialized');
    }
    /**
     * Get the fixable elements of the active tab
     */
    getActiveTabFixables() {
        if (this.$activeTabFixables !== undefined)
            return this.$activeTabFixables;
        this.$activeTabFixables = this.getActiveTabContainer()
            .find(this.psv.selectorFixable + '.' + _common_ts_SectionNavigation__WEBPACK_IMPORTED_MODULE_6__["SectionNavigation"].classInitialized) || null;
        return this.$activeTabFixables;
    }
    /**
     * Invalidate the variable that caches the fixable elements of the active tab
     */
    invalidateActiveTabFixablesCache() {
        this.$activeTabFixables = undefined;
    }
    /**
     * Get the container of the active tab
     */
    getActiveTabContainer() {
        // If the active tab container already exists, return it.
        if (this.$activeTabContainer !== undefined)
            return this.$activeTabContainer;
        let $tab = this.getActiveTab();
        if ($tab === null) {
            this.$activeTabContainer = null;
            return this.$activeTabContainer;
        }
        let containerSelector = $tab.data("tab");
        let $container = $(containerSelector).first() || null;
        this.$activeTabContainer = $container !== null && $container.length ? $container : null;
        return this.$activeTabContainer;
    }
    invalidateActiveTabContainer() {
        this.$activeTabContainer = undefined;
    }
    getActiveTab() {
        let $tab = this.psv.$containerTabs.find('.nav-tab-active').first() || null;
        if ($tab === null || !$tab.length)
            return null;
        return $tab;
    }
    getAllTabs() {
        return this.psv.$containerTabs.find('.nav-tab');
    }
    /**
     * @return Top position of the scroll
     */
    getScrollTop() {
        return (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
    }
    /**
     * Flash the background color of an object
     * @param {object} $element Target element
     */
    flashBackground($element) {
        // console.log('flash background');
        $element.stop().css("background-color", "#b8ea84")
            .animate({ backgroundColor: "#FFFFFF" }, 1000);
    }
}
PostSettings.INSTANCE = null;

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

/***/ "./scripts/post-settings-ts/app/WooCommerceSettings.ts":
/*!*************************************************************!*\
  !*** ./scripts/post-settings-ts/app/WooCommerceSettings.ts ***!
  \*************************************************************/
/*! exports provided: WooCommerceSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WooCommerceSettings", function() { return WooCommerceSettings; });
/* harmony import */ var _WooCommerceSettingsVariables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WooCommerceSettingsVariables */ "./scripts/post-settings-ts/app/WooCommerceSettingsVariables.ts");
/* harmony import */ var _common_ts_DependantHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common-ts/DependantHandler */ "./scripts/common-ts/DependantHandler.ts");


class WooCommerceSettings {
    constructor() {
        // Do nothing if the WooCommerce settings are not available.
        if (!WooCommerceSettings.isWooCommerceSettingsAvailable())
            return;
        this.wcsv = _WooCommerceSettingsVariables__WEBPACK_IMPORTED_MODULE_0__["WooCommerceSettingsVariables"].getInstance();
        // Handle URL hash after the document is ready, because the hash should have been set and ready.
        $(document).ready((e) => this.handleURLHash());
        // Handle tabs
        this.wcsv.$settingsContainer.on('click', '.tab-wrapper li > a', (e) => this.onClickTab(e));
        // Handle product type selection
        $(document).on('change', this.wcsv.selectorSelectProductType, (e) => this.onChangeProductTypeSelect(e));
    }
    /**
     * This class is a singleton. Get the instance with this method.
     */
    static getInstance() {
        if (this.INSTANCE === null)
            this.INSTANCE = new WooCommerceSettings();
        return this.INSTANCE;
    }
    /**
     * Manages product type selection changes
     * @param e
     */
    onChangeProductTypeSelect(e) {
        let $target = $(e.target);
        // If the selected type is 'external'
        if ($target.val() == 'external') {
            // Uncheck 'virtual' and 'downloadable' checkboxes
            let $cbVirtual = $(this.wcsv.selectorCheckboxVirtual) || null;
            let $cbDownloadable = $(this.wcsv.selectorCheckboxDownloadable) || null;
            let checkboxes = [$cbVirtual, $cbDownloadable];
            for (let $cb of checkboxes) {
                // If the checkbox does not exist, continue with another one.
                if ($cb === null || !$cb.length)
                    continue;
                // Uncheck the checkbox.
                $cb[0].checked = false;
                // Trigger change event for the checkboxes so that their dependants can be handled.
                $cb.trigger('change');
            }
        }
        // Handle the dependants
        _common_ts_DependantHandler__WEBPACK_IMPORTED_MODULE_1__["DependantHandler"].getInstance().handleSelectDependants($target);
    }
    /**
     * @return True if WooCommerce options are available in the page.
     */
    static isWooCommerceSettingsAvailable() {
        return $("#woocommerce-options-container").length > 0;
    }
    /**
     * Handles clicks to the tabs of WooCommerce settings
     * @param e
     */
    onClickTab(e) {
        e.preventDefault();
        // Get the closest anchor tag, because the click event may be triggered for an element inside the anchor tag
        let $self = $(e.target).closest('a');
        this.activateTab($self.data("tab"));
    }
    /**
     * Activate a tab of WooCommerce settings.
     * @param tabSelector Selector of the tab.
     */
    activateTab(tabSelector) {
        let $tab = this.wcsv.$tabContainer.find('[data-tab="' + tabSelector + '"]');
        if (!$tab.length)
            return;
        // First deactivate all tabs
        this.wcsv.$contentContainer.find(".tab-content").addClass("hidden");
        this.wcsv.$tabContainer.find("li").removeClass("active");
        // Now activate the selected tab
        let elementId = $tab.data("tab");
        $(elementId).removeClass("hidden");
        $tab.closest('li').addClass("active");
        // Change window hash. We separate the hashes with pipe "|".
        let hash = window.location.hash.split("|");
        // Active WooCommerce tab is stored in 1st index.
        hash[1] = elementId;
        history.replaceState(undefined, undefined, hash.join("|"));
    }
    /**
     * Handles URL hash changes. E.g. activates tabs.
     */
    handleURLHash() {
        let hash = window.location.hash;
        if (hash && hash.indexOf("#_") === 0) {
            let hashArr = hash.split("|");
            if (hashArr.length > 1) {
                let tabHash = hashArr[1];
                this.activateTab(tabHash);
            }
        }
    }
}
WooCommerceSettings.INSTANCE = null;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./scripts/post-settings-ts/app/WooCommerceSettingsVariables.ts":
/*!**********************************************************************!*\
  !*** ./scripts/post-settings-ts/app/WooCommerceSettingsVariables.ts ***!
  \**********************************************************************/
/*! exports provided: WooCommerceSettingsVariables */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WooCommerceSettingsVariables", function() { return WooCommerceSettingsVariables; });
class WooCommerceSettingsVariables {
    constructor() {
        this.selectorSettingsWrapper = '.woocommerce-settings-wrapper';
        this.selectorTabContentWrapper = this.selectorSettingsWrapper + ' > .tab-content-wrapper';
        this.$settingsContainer = $(this.selectorSettingsWrapper);
        this.$tabContainer = $(this.selectorSettingsWrapper + ' > .tab-wrapper');
        this.$contentContainer = $(this.selectorTabContentWrapper);
        this.selectorSelectProductType = '#_wc_product_type';
        this.selectorCheckboxVirtual = '#_wc_virtual';
        this.selectorCheckboxDownloadable = '#_wc_downloadable';
    }
    /**
     * This class is a singleton. Get the instance with this method.
     */
    static getInstance() {
        if (this.INSTANCE === null)
            this.INSTANCE = new WooCommerceSettingsVariables();
        return this.INSTANCE;
    }
}
WooCommerceSettingsVariables.INSTANCE = null;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./scripts/post-settings-ts/post-settings.ts":
/*!***************************************************!*\
  !*** ./scripts/post-settings-ts/post-settings.ts ***!
  \***************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(jQuery) {/* harmony import */ var _app_PostSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/PostSettings */ "./scripts/post-settings-ts/app/PostSettings.ts");

function l(v) { console.log(v); }
jQuery(function ($) {
    _app_PostSettings__WEBPACK_IMPORTED_MODULE_0__["PostSettings"].getInstance();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9jb21tb24tdHMvQ29weVRvQ2xpcGJvYXJkSGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2NvbW1vbi10cy9EZXBlbmRhbnRIYW5kbGVyLnRzIiwid2VicGFjazovLy8uL3NjcmlwdHMvY29tbW9uLXRzL0V2ZW50VHlwZS50cyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2NvbW1vbi10cy9JbnB1dEdyb3VwQWRkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9jb21tb24tdHMvTm90aWZpZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9jb21tb24tdHMvU2VjdGlvbk5hdmlnYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9jb21tb24tdHMvVXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9jb21tb24tdHMvZW51bS9Ob3RpZmljYXRpb25Qb3NpdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2NvbW1vbi10cy9lbnVtL05vdGlmaWNhdGlvblR5cGUudHMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9wb3N0LXNldHRpbmdzLXRzL2FwcC9DdXN0b21TaG9ydENvZGVIYW5kbGVyLnRzIiwid2VicGFjazovLy8uL3NjcmlwdHMvcG9zdC1zZXR0aW5ncy10cy9hcHAvUG9zdFNldHRpbmdzLnRzIiwid2VicGFjazovLy8uL3NjcmlwdHMvcG9zdC1zZXR0aW5ncy10cy9hcHAvUG9zdFNldHRpbmdzVmFyaWFibGVzLnRzIiwid2VicGFjazovLy8uL3NjcmlwdHMvcG9zdC1zZXR0aW5ncy10cy9hcHAvVGVzdERhdGFQcmVwYXJlci50cyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL3Bvc3Qtc2V0dGluZ3MtdHMvYXBwL1dvb0NvbW1lcmNlU2V0dGluZ3MudHMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9wb3N0LXNldHRpbmdzLXRzL2FwcC9Xb29Db21tZXJjZVNldHRpbmdzVmFyaWFibGVzLnRzIiwid2VicGFjazovLy8uL3NjcmlwdHMvcG9zdC1zZXR0aW5ncy10cy9wb3N0LXNldHRpbmdzLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImpRdWVyeVwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQWdDO0FBQ3pCO0FBQ1A7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksNENBQUs7QUFDakI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSw0Q0FBSztBQUNqQixTQUFTO0FBQ1Q7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3pDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVCQUF1QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM3R0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDTkE7QUFBQTtBQUFPO0FBQ1AsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN4RUE7QUFBQTtBQUFBO0FBQUE7QUFBMkQ7QUFDUTtBQUM1RDtBQUNQLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQSxrREFBa0QsdUVBQWdCLGtCQUFrQiwrRUFBb0I7QUFDeEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNoRUE7QUFBQTtBQUFBO0FBQUE7QUFBb0U7QUFDNUI7QUFDakM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsK0VBQVk7QUFDN0M7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLCtFQUFZO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSw0QkFBNEIsb0RBQVM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsTUFBTTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDN0hBO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMsZ0NBQWdDO0FBQ2hDLGdDQUFnQztBQUNoQyxrQ0FBa0M7QUFDbEMsa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxzQkFBc0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUMzREE7QUFBQTtBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsb0RBQW9EOzs7Ozs7Ozs7Ozs7O0FDTnJEO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDRDQUE0Qzs7Ozs7Ozs7Ozs7OztBQ043QztBQUFBO0FBQUE7QUFBQTtBQUE4QztBQUNrQztBQUN6RTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxRQUFRLHNEQUFLO0FBQ2I7QUFDQSxRQUFRLHdGQUFzQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLHNCQUFzQjtBQUNqRSwyQ0FBMkMsa0NBQWtDO0FBQzdFO0FBQ0E7QUFDQSw2QkFBNkIsNkJBQTZCO0FBQzFELGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNwR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQW9EO0FBQ0U7QUFDWTtBQUNGO0FBQ0o7QUFDYTtBQUNIO0FBQ3hCO0FBQ2tDO0FBQ2Q7QUFDRTtBQUNhO0FBQzNCO0FBQy9DO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDREQUFRO0FBQ2hDLGdDQUFnQyxrRUFBZ0I7QUFDaEQsK0JBQStCLDBFQUFlO0FBQzlDLG1CQUFtQiw0RUFBcUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDhFQUFpQjtBQUN6QixRQUFRLDhFQUFzQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDZFQUFnQjtBQUM1QixTQUFTO0FBQ1Q7QUFDQTtBQUNBLFlBQVksNkVBQWdCO0FBQzVCLFNBQVM7QUFDVDtBQUNBO0FBQ0EsWUFBWSw2RUFBZ0I7QUFDNUIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHVCQUF1QiwrREFBUztBQUNoQztBQUNBLFFBQVEsd0VBQW1CO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLHNEQUFLO0FBQzlCLHNDQUFzQyxzREFBSztBQUMzQztBQUNBLDZCQUE2QixzREFBSztBQUNsQztBQUNBLFNBQVM7QUFDVDtBQUNBLDBDQUEwQyxzREFBSztBQUMvQztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGtDQUFrQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0VBQXNFLHNCQUFzQjtBQUM1RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLCtCQUErQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdGQUFnRixpRkFBZ0IsUUFBUSwwRkFBb0I7QUFDNUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFGQUFxRixpRkFBZ0IsUUFBUSwwRkFBb0I7QUFDakk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRkFBaUYsaUZBQWdCLFVBQVUsMEZBQW9CO0FBQy9IO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQThELGlGQUFnQixRQUFRLDBGQUFvQjtBQUMxRztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxnRkFBZ0YsaUZBQWdCLFFBQVEsMEZBQW9CO0FBQzVILFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHdGQUFzQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLDBCQUEwQjtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQsaUZBQWdCLFdBQVcsaUZBQWdCO0FBQ3pHLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQThELGlGQUFnQixXQUFXLGlGQUFnQjtBQUN6RyxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFLO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFGQUFxRixrQkFBa0I7QUFDdkc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELDhFQUFpQjtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsNkJBQTZCO0FBQ25EO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUMxeENBO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3ZEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQW9EO0FBQ1k7QUFDbEI7QUFDdkM7QUFDUDtBQUNBLHdCQUF3Qiw0REFBUTtBQUNoQyxtQkFBbUIsNEVBQXFCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLEdBQUc7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixlQUFlLGVBQWU7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsc0RBQUs7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixvREFBb0Q7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxNQUFNO0FBQ3JCLGdCQUFnQixNQUFNO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDM1ZBO0FBQUE7QUFBQTtBQUFBO0FBQThFO0FBQ1Y7QUFDN0Q7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwwRkFBNEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNEVBQWdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbkdBO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDcEJBO0FBQUE7QUFBa0Q7QUFDbEQsZUFBZSxnQkFBZ0I7QUFDL0I7QUFDQSxJQUFJLDhEQUFZO0FBQ2hCLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNKRCx3QiIsImZpbGUiOiIuL3Bvc3Qtc2V0dGluZ3MtZGV2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zY3JpcHRzL3Bvc3Qtc2V0dGluZ3MtdHMvcG9zdC1zZXR0aW5ncy50c1wiKTtcbiIsImltcG9ydCB7IFV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcbmV4cG9ydCBjbGFzcyBDb3B5VG9DbGlwYm9hcmRIYW5kbGVyIHtcbiAgICAvKiogVGhpcyBpcyBhIHNpbmdsZXRvbi4gKi9cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJuIHtDb3B5VG9DbGlwYm9hcmRIYW5kbGVyfVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UgPT09IG51bGwpXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gbmV3IENvcHlUb0NsaXBib2FyZEhhbmRsZXIoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgXCJjb3B5IHRvIGNsaXBib2FyZFwiIGZvciB0aGUgZWxlbWVudHMgd2l0aCBzZWxlY3RvclxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIFNlbGVjdG9yIGZvciB3aGljaCB0aGUgY2xpcGJvYXJkIHdpbGwgYmUgaW5pdGlhbGl6ZWRcbiAgICAgKi9cbiAgICBpbml0Rm9yU2VsZWN0b3Ioc2VsZWN0b3IpIHtcbiAgICAgICAgLy8gTm8gbmVlZCB0byBpbml0aWFsaXplIHRoZSBjbGlwYm9hcmQgaWYgdGhlIGVsZW1lbnRzIHdlIG5lZWQgZG8gbm90IGV4aXN0IGluIHRoZSBwYWdlLlxuICAgICAgICBpZiAoISQoc2VsZWN0b3IpLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgbGV0IGNsaXBib2FyZCA9IG5ldyB3aW5kb3cuQ2xpcGJvYXJkKHNlbGVjdG9yKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluZm9ybSB0aGUgdXNlciB0aGF0IHRoZSBidXR0b24ncyBjb2RlIGlzIGNvcGllZCBvciBub3QgY29waWVkXG4gICAgICAgICAqIEBwYXJhbSAkY2hlY2tib3hcbiAgICAgICAgICovXG4gICAgICAgIGNsaXBib2FyZC5vbignc3VjY2VzcycsIChlKSA9PiB7XG4gICAgICAgICAgICBVdGlscy5mbGFzaFRvb2x0aXAoJChlLnRyaWdnZXIpLCB3aW5kb3cud3BjYy5jb3BpZWQpO1xuICAgICAgICAgICAgZS5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB9KTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdoZW4gdGhlcmUgaXMgYW4gZXJyb3IsIHRoZSB0ZXh0IGJlY29tZXMgc2VsZWN0ZWQuIEhlbmNlLCB0aGUgdXNlciBjYW4ganVzdCB1c2UgYSBzaG9ydGN1dCB0byBjb3B5IHRoZSB0ZXh0XG4gICAgICAgICAqL1xuICAgICAgICBjbGlwYm9hcmQub24oJ2Vycm9yJywgKGUpID0+IHtcbiAgICAgICAgICAgIGxldCBvcyA9IG5hdmlnYXRvci5wbGF0Zm9ybTtcbiAgICAgICAgICAgIGxldCBzaG9ydGN1dCA9IG9zLmluZGV4T2YoXCJNYWNcIikgIT0gLTEgPyBcIuKMmC1DXCIgOiBcIkN0cmwgKyBDXCI7XG4gICAgICAgICAgICBVdGlscy5mbGFzaFRvb2x0aXAoJChlLnRyaWdnZXIpLCB3aW5kb3cud3BjYy5wcmVzc190b19jb3B5LmZvcm1hdChzaG9ydGN1dCkpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5Db3B5VG9DbGlwYm9hcmRIYW5kbGVyLmluc3RhbmNlID0gbnVsbDtcbiIsIi8qKlxuICogRGVwZW5kYW50cyBhcmUgSFRNTCBlbGVtZW50cyB3aG9zZSB2aXNpYmlsaXR5IGlzIGRlcGVuZGVudCBvbiBhIGNlcnRhaW4gZWxlbWVudC4gRm9yIGV4YW1wbGUsIGlmIGFuIGVsZW1lbnQgbmVlZHMgdG9cbiAqIGJlIHNob3duIHdoZW4gYSBjaGVja2JveCBpcyBjaGVja2VkLCB0aGF0IGVsZW1lbnQgaXMgZGVwZW5kYW50IG9uIHRoZSBjaGVja2JveCdzIHZhbHVlLiBUaGUgZGVwZW5kZW5jaWVzIGFyZSBnaXZlblxuICogaW4gXCJkYXRhLWRlcGVuZGFudHNcIiBhdHRyaWJ1dGUgb2YgdGhlIGVsZW1lbnQgd2hvc2UgdmFsdWUgY2hhbmdlcyB0cmlnZ2VyIHRoZSB2aXNpYmlsaXR5IG9mIG90aGVyIGVsZW1lbnRzLiBUaGVcbiAqIGRlcGVuZGVuY2llcyBzaG91bGQgYmUgZ2l2ZW4gYXMgYSBzdHJpbmcgYXJyYXkgdGhhdCBpcyBKU09OLWVuY29kZWQsIGluIHdoaWNoIGVhY2ggaXRlbSBpcyBhIHNlbGVjdG9yLiBFLmcuXG4gKiBbXCIudGFyZ2V0LWVsZW1lbnRcIiwgXCIhI2Fub3RoZXItdGFyZ2V0XCJdIGlzIGEgSlNPTi1lbmNvZGVkIGFycmF5LiBUaGlzIG1lYW5zIHRoZSBlbGVtZW50cyBoYXZpbmcgJ3RhcmdldC1lbGVtZW50J1xuICogY2xhc3Mgc2hvdWxkIGJlIHNob3duIGFuZCB0aGUgZWxlbWVudCB3aG9zZSBJRCBpcyBcImFub3RoZXItdGFyZ2V0XCIgbXVzdCBiZSBoaWRkZW4uIFRoaXMgdmFsdWUgaXMgYWRkZWQgYXMgdGhlIHZhbHVlXG4gKiBvZiBcImRhdGEtZGVwZW5kYW50c1wiIGF0dHJpYnV0ZSBvZiB0aGUgY2hlY2tib3ggc28gdGhhdCB3aGVuIHRoZSBjaGVja2JveCdzIHZhbHVlIGlzIGNoYW5nZWQsIHRoZSBkZXBlbmRhbnRzIGFyZVxuICogcmV0cmlldmVkIGZyb20gdGhlIGNoZWNrYm94LlxuICpcbiAqIEBzaW5jZSAxLjguMFxuICovXG5leHBvcnQgY2xhc3MgRGVwZW5kYW50SGFuZGxlciB7XG4gICAgLyoqIFRoaXMgaXMgYSBzaW5nbGV0b24uICovXG4gICAgY29uc3RydWN0b3IoKSB7IH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGluc3RhbmNlXG4gICAgICogQHJldHVybiB7RGVwZW5kYW50SGFuZGxlcn1cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlID09PSBudWxsKVxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBEZXBlbmRhbnRIYW5kbGVyKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIHNob3dpbmcvaGlkaW5nIGNoZWNrYm94IGRlcGVuZGVudHNcbiAgICAgKiBAcGFyYW0gJGNoZWNrYm94IENoZWNrYm94IGVsZW1lbnRcbiAgICAgKi9cbiAgICBoYW5kbGVDaGVja2JveERlcGVuZGFudHMoJGNoZWNrYm94KSB7XG4gICAgICAgIGxldCBpc0NoZWNrZWQgPSAkY2hlY2tib3guaXMoXCI6Y2hlY2tlZFwiKTtcbiAgICAgICAgdGhpcy5oYW5kbGVEZXBlbmRhbnRzKCRjaGVja2JveCwgaXNDaGVja2VkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBzaG93aW5nL2hpZGluZyBhIHNlbGVjdCBlbGVtZW50J3Mgc2VsZWN0ZWQgb3B0aW9uJ3MgZGVwZW5kYW50c1xuICAgICAqIEBwYXJhbSAkc2VsZWN0IFNlbGVjdCBlbGVtZW50XG4gICAgICovXG4gICAgaGFuZGxlU2VsZWN0RGVwZW5kYW50cygkc2VsZWN0KSB7XG4gICAgICAgIC8vIEdldCBwcmV2aW91c2x5IHNlbGVjdGVkIHZhbHVlXG4gICAgICAgIGxldCBwcmV2VmFsID0gJHNlbGVjdC5kYXRhKCdwcmV2JykgfHwgbnVsbDtcbiAgICAgICAgbGV0IGN1cnJlbnRWYWwgPSAkc2VsZWN0LnZhbCgpO1xuICAgICAgICAvLyBGaW5kIHRoZSBvcHRpb24gd2hvc2UgdmFsdWUgaXMgdGhlIGN1cnJlbnQgdmFsXG4gICAgICAgIGxldCAkY3VycmVudE9wdGlvbiA9ICRzZWxlY3QuZmluZCgnb3B0aW9uW3ZhbHVlPVwiJyArIGN1cnJlbnRWYWwgKyAnXCJdJykuZmlyc3QoKTtcbiAgICAgICAgbGV0ICRwcmV2T3B0aW9uID0gcHJldlZhbCAhPT0gbnVsbCAmJiBwcmV2VmFsLmxlbmd0aCA/ICRzZWxlY3QuZmluZCgnb3B0aW9uW3ZhbHVlPVwiJyArIHByZXZWYWwgKyAnXCJdJykuZmlyc3QoKSA6IG51bGw7XG4gICAgICAgIC8vIElmIHRoZXJlIGlzIGEgcHJldmlvdXMgdmFsdWUsIHJldmVyc2UgaXRzIGRlcGVuZGFudHMuXG4gICAgICAgIGlmICgkcHJldk9wdGlvbiAhPT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlRGVwZW5kYW50cygkcHJldk9wdGlvbiwgZmFsc2UpO1xuICAgICAgICAvLyBIYW5kbGUgdGhlIGRlcGVuZGFudHMgb2YgdGhlIGN1cnJlbnQgdmFsdWUuXG4gICAgICAgIHRoaXMuaGFuZGxlRGVwZW5kYW50cygkY3VycmVudE9wdGlvbiwgdHJ1ZSk7XG4gICAgICAgIC8vIFN0b3JlIHRoZSBjdXJyZW50IHZhbHVlIGFzIHByZXZpb3VzIHNvIHRoYXQgd2hlbiB0aGVyZSBpcyBhIGNoYW5nZSBpbiB0aGUgc2VsZWN0ZWQgdmFsdWUsIHdlIGNhbiByZXZlcnNlIHRoZVxuICAgICAgICAvLyBkZXBlbmRhbnRzLlxuICAgICAgICAkc2VsZWN0LmRhdGEoJ3ByZXYnLCBjdXJyZW50VmFsKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBzaG93aW5nL2hpZGluZyBkZXBlbmRhbnRzIG9mIGFuIGVsZW1lbnQuIFRoZSBkZXBlbmRhbnRzIHNob3VsZCBiZSBnaXZlbiBpbiBcImRhdGEtZGVwZW5kYW50c1wiLCBhcyBhblxuICAgICAqIGFycmF5IG9mIHNlbGVjdG9ycy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAkZWxcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHJldmVyc2UgSWYgZmFsc2UsIHJldmVyc2Ugb2YgdGhlIGRlcGVuZGFudHMgd2lsbCBiZSBhcHBsaWVkLlxuICAgICAqL1xuICAgIGhhbmRsZURlcGVuZGFudHMoJGVsLCByZXZlcnNlKSB7XG4gICAgICAgIC8vIEdldCB0aGUgZGVwZW5kYW50c1xuICAgICAgICBsZXQgZGVwZW5kYW50cyA9ICRlbC5kYXRhKFwiZGVwZW5kYW50c1wiKSB8fCBudWxsO1xuICAgICAgICAvLyBJZiB0aGVyZSBpcyBubyBkZXBlbmRhbnQsIHN0b3AuXG4gICAgICAgIGlmIChkZXBlbmRhbnRzID09PSBudWxsIHx8ICFkZXBlbmRhbnRzKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBsZXQgJGRlcGVuZGFudCwgaXNOZWdhdGl2ZSwgc2VsZWN0b3IsIGk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBkZXBlbmRhbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvLyBHZXQgd2hldGhlciB0aGUgc2VsZWN0b3IgaXMgbmVnYXRlZCBvciBub3QuXG4gICAgICAgICAgICBpc05lZ2F0aXZlID0gdGhpcy5zdGFydHNXaXRoKGRlcGVuZGFudHNbaV0sIFwiIVwiKTtcbiAgICAgICAgICAgIHNlbGVjdG9yID0gZGVwZW5kYW50c1tpXTtcbiAgICAgICAgICAgIC8vIElmIHRoZSBzZWxlY3RvciBpcyBuZWdhdGl2ZSwgcmVtb3ZlIG5lZ2F0aW9uIFwiIVwiIGZyb20gdGhlIGJlZ2lubmluZyBvZiB0aGUgc3RyaW5nIHRvIGdldCB0aGUgc2VsZWN0b3IuXG4gICAgICAgICAgICBpZiAoaXNOZWdhdGl2ZSlcbiAgICAgICAgICAgICAgICBzZWxlY3RvciA9IHNlbGVjdG9yLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgIC8vIEdldCB0aGUgZGVwZW5kYW50IGVsZW1lbnRcbiAgICAgICAgICAgICRkZXBlbmRhbnQgPSAkKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIC8vIElmIHRoZSByZXZlcnNlIG9mIHRoZSBkZXBlbmRhbnRzIHNob3VsZCBiZSBhcHBsaWVkXG4gICAgICAgICAgICBpZiAocmV2ZXJzZSkge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzZWxlY3RvciBpcyBuZWdhdGl2ZSwgaGlkZSB0aGUgZGVwZW5kYW50LlxuICAgICAgICAgICAgICAgIGlmIChpc05lZ2F0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgICRkZXBlbmRhbnQuYWRkQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgc2hvdyBpdC5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRkZXBlbmRhbnQucmVtb3ZlQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHNlbGVjdG9yIGlzIG5lZ2F0aXZlLCBzaG93IHRoZSBkZXBlbmRhbnQuXG4gICAgICAgICAgICAgICAgaWYgKGlzTmVnYXRpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgJGRlcGVuZGFudC5yZW1vdmVDbGFzcyhcImhpZGRlblwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCBoaWRlIGl0LlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJGRlcGVuZGFudC5hZGRDbGFzcyhcImhpZGRlblwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGEgc3RyaW5nIChoYXlzdGFjaykgc3RhcnRzIHdpdGggc29tZXRoaW5nIChuZWVkbGUpXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGhheXN0YWNrXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5lZWRsZVxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG4gICAgc3RhcnRzV2l0aChoYXlzdGFjaywgbmVlZGxlKSB7XG4gICAgICAgIHJldHVybiBoYXlzdGFjay5sYXN0SW5kZXhPZihuZWVkbGUsIDApID09PSAwO1xuICAgIH1cbn1cbkRlcGVuZGFudEhhbmRsZXIuaW5zdGFuY2UgPSBudWxsO1xuIiwiLyoqXG4gKiBTdG9yZXMgdGhlIGV2ZW50IG5hbWVzIHVzZWQgaW4gdGhlIHBsdWdpbidzIFVJLlxuICovXG5leHBvcnQgY2xhc3MgRXZlbnRUeXBlIHtcbn1cbkV2ZW50VHlwZS5uYXZpZ2F0aW9uc0luaXRpYWxpemVkID0gJ3dwY2NOYXZpZ2F0aW9uc0luaXRpYWxpemVkJztcbkV2ZW50VHlwZS5vcHRpb25zQm94VGFiQWN0aXZhdGVkID0gJ3dwY2NPcHRpb25zQm94VGFiQWN0aXZhdGVkJztcbiIsImV4cG9ydCBjbGFzcyBJbnB1dEdyb3VwQWRkZXIge1xuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG4gICAgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgICAgICBpZiAodGhpcy5JTlNUQU5DRSA9PT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMuSU5TVEFOQ0UgPSBuZXcgSW5wdXRHcm91cEFkZGVyKCk7XG4gICAgICAgIHJldHVybiB0aGlzLklOU1RBTkNFO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbmV3IGlucHV0IGdyb3VwIHRvIGFuIGlucHV0IGdyb3VwIGNvbnRhaW5lclxuICAgICAqIEBwYXJhbSAkaW5wdXRHcm91cENvbnRhaW5lclxuICAgICAqIEByZXR1cm4gTmV3IGlucHV0IGdyb3VwXG4gICAgICovXG4gICAgYWRkTmV3SW5wdXRHcm91cCgkaW5wdXRHcm91cENvbnRhaW5lcikge1xuICAgICAgICAvLyBDcmVhdGUgYSBjbG9uZSBvZiB0aGUgaW5wdXQgZ3JvdXBcbiAgICAgICAgbGV0ICRpbnB1dEdyb3VwID0gJGlucHV0R3JvdXBDb250YWluZXIuZmluZChcIi5pbnB1dC1ncm91cFwiKS5maXJzdCgpLmNsb25lKCk7XG4gICAgICAgIC8qXG4gICAgICAgICBIQU5ETEUgVEhFIERBVEEgS0VZXG4gICAgICAgICAqL1xuICAgICAgICAvLyBGaXJzdCwgZmluZCBtYXggZGF0YSBrZXlcbiAgICAgICAgbGV0IG1heERhdGFLZXkgPSAwO1xuICAgICAgICAkaW5wdXRHcm91cENvbnRhaW5lci5maW5kKCcuaW5wdXQtZ3JvdXAnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCAkc2VsZiA9ICQodGhpcyk7XG4gICAgICAgICAgICBpZiAoJHNlbGYuZGF0YShcImtleVwiKSAhPSB1bmRlZmluZWQgJiYgJHNlbGYuZGF0YShcImtleVwiKSA+IG1heERhdGFLZXkpIHtcbiAgICAgICAgICAgICAgICBtYXhEYXRhS2V5ID0gJHNlbGYuZGF0YShcImtleVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEhvbGQgY3VycmVudCBkYXRhIGtleVxuICAgICAgICBsZXQgY3VycmVudERhdGFLZXkgPSAkaW5wdXRHcm91cC5kYXRhKFwia2V5XCIpO1xuICAgICAgICBsZXQgbmV3RGF0YUtleSA9IG1heERhdGFLZXkgKyAxO1xuICAgICAgICAvLyBTZXQgdGhlIG5ldyBkYXRhIGtleVxuICAgICAgICAkaW5wdXRHcm91cC5hdHRyKFwiZGF0YS1rZXlcIiwgbmV3RGF0YUtleSk7IC8vIFRoaXMgd2lsbCB1cGRhdGUgdGhlIEhUTUwuXG4gICAgICAgICRpbnB1dEdyb3VwLmRhdGEoXCJrZXlcIiwgbmV3RGF0YUtleSk7IC8vIFRoaXMgbWFrZXMgdGhlIGFjdHVhbCBjaGFuZ2UuXG4gICAgICAgIGxldCBodG1sID0gJGlucHV0R3JvdXAuaHRtbCgpO1xuICAgICAgICAkaW5wdXRHcm91cC5odG1sKGh0bWwucmVwbGFjZShuZXcgUmVnRXhwKFwiXFxcXFtcIiArIGN1cnJlbnREYXRhS2V5ICsgXCJcXFxcXVwiLCBcImdcIiksIFwiW1wiICsgbmV3RGF0YUtleSArIFwiXVwiKSk7XG4gICAgICAgIC8qIEVORCBEQVRBIEtFWSAqL1xuICAgICAgICAvLyBSZW1vdmUgdGhlIHZhbHVlcyBvZiB0aGUgaW5wdXRzXG4gICAgICAgICRpbnB1dEdyb3VwLmZpbmQoXCJpbnB1dFwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcykudmFsKFwiXCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgJGlucHV0R3JvdXAuZmluZChcInRleHRhcmVhXCIpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKS5odG1sKFwiXCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgJGlucHV0R3JvdXAuZmluZChcImlucHV0W3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gQ2FsbCB0aGUgbW9kaWZpZXJzXG4gICAgICAgIGZvciAobGV0IG1vZGlmaWVyIG9mIElucHV0R3JvdXBBZGRlci5tb2RpZmllcnMpIHtcbiAgICAgICAgICAgIG1vZGlmaWVyKCRpbnB1dEdyb3VwKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBcHBlbmQgaXQgdG8gdGhlIGNvbnRhaW5lclxuICAgICAgICAkaW5wdXRHcm91cENvbnRhaW5lci5hcHBlbmQoJGlucHV0R3JvdXApO1xuICAgICAgICAvLyBDaGVjayBmb3IgdG9vbHRpcCBhbmQgaW5pdGlhbGl6ZSBpdFxuICAgICAgICBpZiAodHlwZW9mICQuZm4udG9vbHRpcCA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgICRpbnB1dEdyb3VwLmZpbmQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKCk7XG4gICAgICAgIC8vIENoZWNrIGlmIHRoZXJlIGlzIGFuIG9wdGlvbnMgYm94IGJ1dHRvbiBhbmQgcmV2ZXJ0IGl0IHRvIGl0cyBkZWZhdWx0XG4gICAgICAgICRpbnB1dEdyb3VwLmZpbmQoJy53Y2Mtb3B0aW9ucy1ib3gnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCAkc2VsZiA9ICQodGhpcyk7XG4gICAgICAgICAgICAkc2VsZi5yZW1vdmVDbGFzcygnaGFzLWNvbmZpZycpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAkLmZuLnRvb2x0aXAgPT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICAgICAgJHNlbGYudG9vbHRpcCgnZGVzdHJveScpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuICRpbnB1dEdyb3VwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBhbiBpbnB1dCBncm91cCBtb2RpZmllciB0aGF0IHdpbGwgYmUgY2FsbGVkIGp1c3QgYmVmb3JlIGEgbmV3IGlucHV0IGdyb3VwIGlzIGFkZGVkLlxuICAgICAqIEBwYXJhbSBjYWxsYmFja1xuICAgICAqL1xuICAgIHJlZ2lzdGVyTW9kaWZpZXIoY2FsbGJhY2spIHtcbiAgICAgICAgSW5wdXRHcm91cEFkZGVyLm1vZGlmaWVycy5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG59XG5JbnB1dEdyb3VwQWRkZXIuSU5TVEFOQ0UgPSBudWxsO1xuSW5wdXRHcm91cEFkZGVyLm1vZGlmaWVycyA9IFtdO1xuIiwiaW1wb3J0IHsgTm90aWZpY2F0aW9uVHlwZSB9IGZyb20gXCIuL2VudW0vTm90aWZpY2F0aW9uVHlwZVwiO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uUG9zaXRpb24gfSBmcm9tIFwiLi9lbnVtL05vdGlmaWNhdGlvblBvc2l0aW9uXCI7XG5leHBvcnQgY2xhc3MgTm90aWZpZXIge1xuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG4gICAgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgICAgICBpZiAodGhpcy5JTlNUQU5DRSA9PT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMuSU5TVEFOQ0UgPSBuZXcgTm90aWZpZXIoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuSU5TVEFOQ0U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNob3dzIFwicmVxdWlyZWQgZm9yIHRlc3RcIiBub3RpZmljYXRpb24gYnkgZGVmYXVsdC4gSWYgeW91IHN1cHBseSBhbm90aGVyIG1lc3NhZ2UsIHNob3dzIGl0IGluc3RlYWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gJHRhcmdldEVsXG4gICAgICogQHBhcmFtIG5vdGlmaWNhdGlvbk1lc3NhZ2UgSWYgZGVmaW5lZCwgdGhpcyBtZXNzYWdlIHdpbGwgYmUgc2hvd24uIE90aGVyd2lzZSwgYSBkZWZhdWx0IG1lc3NhZ2Ugd2lsbCBiZSBzaG93bi5cbiAgICAgKi9cbiAgICBub3RpZnkoJHRhcmdldEVsLCBub3RpZmljYXRpb25NZXNzYWdlKSB7XG4gICAgICAgIGlmICghdGhpcy5pc05vdGlmeUF2YWlsYWJsZSgpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAobm90aWZpY2F0aW9uTWVzc2FnZSA9PSB1bmRlZmluZWQgfHwgIW5vdGlmaWNhdGlvbk1lc3NhZ2UubGVuZ3RoKVxuICAgICAgICAgICAgbm90aWZpY2F0aW9uTWVzc2FnZSA9IHdpbmRvdy53cGNjLnJlcXVpcmVkX2Zvcl90ZXN0O1xuICAgICAgICAvLyBGaW5kIHRoZSBjbG9zZXN0IGxhYmVsXG4gICAgICAgIGxldCAkbGFiZWwgPSAkdGFyZ2V0RWwuY2xvc2VzdChcInRyXCIpLmZpbmQoXCJsYWJlbFwiKS5maXJzdCgpLCAkbm90aWZpY2F0aW9uRWwgPSAkbGFiZWwubGVuZ3RoID8gJGxhYmVsIDogJHRhcmdldEVsO1xuICAgICAgICB0aGlzLnNjcm9sbFRvRWxlbWVudCgkbm90aWZpY2F0aW9uRWwpO1xuICAgICAgICAkbm90aWZpY2F0aW9uRWwubm90aWZ5KG5vdGlmaWNhdGlvbk1lc3NhZ2UsIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAndG9wJ1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvdyBhIG5vdGlmaWNhdGlvbiBtZXNzYWdlIGZvciBhbiBlbGVtZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gJHRhcmdldEVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIENsYXNzIG5hbWUgZm9yIHRoZSBub3RpZmljYXRpb24gZWxlbWVudC4gRGVmYXVsdDogJ2luZm8nXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBvc2l0aW9uICd0b3AnLCAnbGVmdCcsICdib3R0b20gbGVmdCcsICdyaWdodCB0b3AnLCAuLi4gRGVmYXVsdDogJ3RvcCdcbiAgICAgKi9cbiAgICBub3RpZnlSZWd1bGFyKCR0YXJnZXRFbGVtZW50LCBtZXNzYWdlLCB0eXBlID0gTm90aWZpY2F0aW9uVHlwZS5JTkZPLCBwb3NpdGlvbiA9IE5vdGlmaWNhdGlvblBvc2l0aW9uLlRPUCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNOb3RpZnlBdmFpbGFibGUoKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgJHRhcmdldEVsZW1lbnQubm90aWZ5KG1lc3NhZ2UsIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBwb3NpdGlvbiB8fCAndG9wJyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogdHlwZSB8fCAnaW5mbycsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTY3JvbGxzIHRvIGFuIGVsZW1lbnRcbiAgICAgKiBAcGFyYW0gJGVsXG4gICAgICovXG4gICAgc2Nyb2xsVG9FbGVtZW50KCRlbCkge1xuICAgICAgICAkKGRvY3VtZW50KS5maW5kKCdodG1sLCBib2R5Jykuc3RvcCgpLmFuaW1hdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiAkZWwuZmlyc3QoKS5vZmZzZXQoKS50b3AgLSAkKHdpbmRvdykuaGVpZ2h0KCkgLyA0XG4gICAgICAgIH0sIDUwMCwgJ3N3aW5nJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBub3RpZmljYXRpb24gbGlicmFyeSBpcyBhdmFpbGFibGVcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNob3dFcnJvciBUcnVlIGlmIGFuIGVycm9yIG1lc3NhZ2Ugc2hvdWxkIGJlIHdyaXR0ZW4gaW4gSlMgY29uc29sZSB3aGVuIGl0IGlzIG5vdCBhdmFpbGFibGUuXG4gICAgICovXG4gICAgaXNOb3RpZnlBdmFpbGFibGUoc2hvd0Vycm9yID0gdHJ1ZSkge1xuICAgICAgICBsZXQgaXNBdmFpbGFibGUgPSAhKHR5cGVvZiAkLmZuLm5vdGlmeSAhPSAnZnVuY3Rpb24nKTtcbiAgICAgICAgaWYgKCFpc0F2YWlsYWJsZSAmJiBzaG93RXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJOb3RpZnlKUyBpcyBub3QgZGVmaW5lZC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzQXZhaWxhYmxlO1xuICAgIH1cbn1cbk5vdGlmaWVyLklOU1RBTkNFID0gbnVsbDtcbiIsImltcG9ydCB7IFBvc3RTZXR0aW5ncyB9IGZyb20gXCIuLi9wb3N0LXNldHRpbmdzLXRzL2FwcC9Qb3N0U2V0dGluZ3NcIjtcbmltcG9ydCB7IEV2ZW50VHlwZSB9IGZyb20gXCIuL0V2ZW50VHlwZVwiO1xuZXhwb3J0IGNsYXNzIFNlY3Rpb25OYXZpZ2F0aW9uIHtcbiAgICAvKiogVGhpcyBpcyBhIHNpbmdsZXRvbi4gKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0b3JOYXZDb250YWluZXIgPSAnLnRhYi1zZWN0aW9uLW5hdic7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JUYWJDb250YWluZXIgPSAnLnRhYic7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JOYXZpZ2F0aW9uUm93ID0gJ3RyW2RhdGEtaWRePXNlY3Rpb24tXSc7XG4gICAgICAgIC8vIExpc3RlbiB0byB0aGUgY2xpY2tzIG1hZGUgb24gYSBuYXZpZ2F0aW9uIGl0ZW1cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgdGhpcy5fc2VsZWN0b3JOYXZDb250YWluZXIgKyAnIFtkYXRhLWlkXScsIChlKSA9PiB0aGlzLm9uQ2xpY2tOYXZJdGVtKGUpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBpbnN0YW5jZVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UgPT09IG51bGwpXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gbmV3IFNlY3Rpb25OYXZpZ2F0aW9uKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIHdoYXQgaGFwcGVucyB3aGVuIGEgbmF2aWdhdGlvbiBpdGVtIGlzIGNsaWNrZWRcbiAgICAgKiBAcGFyYW0gZVxuICAgICAqL1xuICAgIG9uQ2xpY2tOYXZJdGVtKGUpIHtcbiAgICAgICAgbGV0ICRzZWxmID0gJChlLnRhcmdldCk7XG4gICAgICAgIC8vIEdldCB0aGUgdGFyZ2V0IGl0ZW0ncyBzZWxlY3RvclxuICAgICAgICBsZXQgaWQgPSAkc2VsZi5kYXRhKCdpZCcpO1xuICAgICAgICBsZXQgJHRhcmdldEVsID0gbnVsbDtcbiAgICAgICAgLy8gSW4gZWFjaCBuYXZpZ2F0aW9uLCB0aGVyZSBpcyBhICd0b3AnIGl0ZW0gdGhhdCBzdG9yZXMgdGhlIElEIG9mIHRoZSB0YWIgY29udGFpbmVyLCB3aGljaCBzdGFydHMgd2l0aCAndGFiJy5cbiAgICAgICAgLy8gTGV0J3MgZmluZCBvdXQgaWYgdGhpcyBpcyBhIHRhYiBzZWxlY3Rvci5cbiAgICAgICAgbGV0IGlzVGFiQ29udGFpbmVyID0gaWQuaW5kZXhPZigndGFiJykgPT09IDA7XG4gICAgICAgIC8vIElmIHRoZSBjbGlja2VkIGVsZW1lbnQgc2hvdWxkIGdvIHRvIGEgc2VjdGlvblxuICAgICAgICBpZiAoIWlzVGFiQ29udGFpbmVyKSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0b3IgPSAndHJbZGF0YS1pZD1cIicgKyBpZCArICdcIl0nO1xuICAgICAgICAgICAgJHRhcmdldEVsID0gJHNlbGYuY2xvc2VzdCh0aGlzLnNlbGVjdG9yVGFiQ29udGFpbmVyKS5maW5kKHNlbGVjdG9yKSB8fCBudWxsO1xuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCB0YXJnZXQgZWxlbWVudCBpcyB0aGUgdGFiIGNvbnRhaW5lciBpdHNlbGYuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkdGFyZ2V0RWwgPSAkKCcjJyArIGlkKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGUgZWxlbWVudCBkb2VzIG5vdCBleGlzdCwgc3RvcC5cbiAgICAgICAgaWYgKCR0YXJnZXRFbCA9PT0gbnVsbCB8fCAhJHRhcmdldEVsLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgLy8gU2Nyb2xsIHRvIGl0XG4gICAgICAgIGxldCAkc2Nyb2xsYWJsZSA9ICQoZG9jdW1lbnQpLmZpbmQoJ2h0bWwsIGJvZHknKTtcbiAgICAgICAgbGV0IGZpeGVkRWxUb3RhbEhlaWdodCA9IFBvc3RTZXR0aW5ncy5nZXRJbnN0YW5jZSgpLmdldEZpeGVkRWxlbWVudHNUb3RhbEhlaWdodCgpO1xuICAgICAgICAkc2Nyb2xsYWJsZS5zdG9wKCkuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3A6ICR0YXJnZXRFbC5vZmZzZXQoKS50b3AgLSBmaXhlZEVsVG90YWxIZWlnaHQgLSAkKHdpbmRvdykuaGVpZ2h0KCkgKiAwLjAyXG4gICAgICAgIH0sIDUwMCwgJ3N3aW5nJywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGlzVGFiQ29udGFpbmVyKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIC8vIElmIHRoZXJlIGFyZSBubyBmaXhlZCBlbGVtZW50cyB3aGVuIHRoZSBzY3JvbGwgc3RhcnRzLCBidXQgdGhlcmUgYXJlIGZpeGVkIGVsZW1lbnRzIHdoZW4gdGhlIHNjcm9sbFxuICAgICAgICAgICAgLy8gZmluaXNoZXMgKGkuZS4gd2hlbiB0aGUgZWxlbWVudHMgZ2V0IGZpeGVkIGF0IHRoZSB0b3AgaW4gdGhlIG1pZGRsZSBvZiBzY3JvbGxpbmcpLCB0aGUgcG9zaXRpb24gb2YgdGhlXG4gICAgICAgICAgICAvLyBzY3JvbGwgaXMgbm90IGNvcnJlY3Qgc3VjaCB0aGF0IHRoZSB0YXJnZXQgZWxlbWVudCBzdGF5cyB1bmRlciB0aGUgZml4ZWQgZWxlbWVudHMuIElmIHRoZXJlIGlzIHN1Y2ggYVxuICAgICAgICAgICAgLy8gY2FzZSwgc2Nyb2xsIHRvIHRoZSBlbGVtZW50IGFnYWluIGNvbnNpZGVyaW5nIHRoZSBlbGVtZW50cyB0aGF0IHdlcmUgZml4ZWQgaW4gdGhlIG1pZGRsZSBvZiB0aGUgc2Nyb2xsaW5nLlxuICAgICAgICAgICAgLy8gV2UgY2FuIGRlY2lkZSBpZiB0aGVyZSBhcmUgc3VjaCBlbGVtZW50cyBieSBjb21wYXJpbmcgdGhlIHRvdGFsIGhlaWdodCBvZiB0aGUgY3VycmVudGx5IGZpeGVkIGVsZW1lbnRzXG4gICAgICAgICAgICAvLyB3aXRoIHRoZSB0b3RhbCBoZWlnaHQgb2YgZml4ZWQgZWxlbWVudHMgdGhlcmUgd2VyZSB3aGVuIHRoZSBzY3JvbGxpbmcgc3RhcnRlZC5cbiAgICAgICAgICAgIGxldCBuZXdGaXhlZEVsVG90YWxIZWlnaHQgPSBQb3N0U2V0dGluZ3MuZ2V0SW5zdGFuY2UoKS5nZXRGaXhlZEVsZW1lbnRzVG90YWxIZWlnaHQoKTtcbiAgICAgICAgICAgIGlmIChuZXdGaXhlZEVsVG90YWxIZWlnaHQgIT09IGZpeGVkRWxUb3RhbEhlaWdodCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlIGFyZSBlbGVtZW50cyBnb3QgZml4ZWQgYXQgdGhlIHRvcCBpbiB0aGUgbWlkZGxlIG9mIHRoZSBzY3JvbGxpbmcsIHJlc2Nyb2xsIHRvIHRoZSBlbGVtZW50XG4gICAgICAgICAgICAgICAgLy8gY29uc2lkZXJpbmcgdGhlIGhlaWdodHMgb2YgdGhlc2UgZWxlbWVudHMuXG4gICAgICAgICAgICAgICAgJHNjcm9sbGFibGUuc3RvcCgpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6ICR0YXJnZXRFbC5vZmZzZXQoKS50b3AgLSBuZXdGaXhlZEVsVG90YWxIZWlnaHQgLSAkKHdpbmRvdykuaGVpZ2h0KCkgKiAwLjAyXG4gICAgICAgICAgICAgICAgfSwgMjUwLCAnc3dpbmcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIHRoZSBuYXZpZ2F0aW9uc1xuICAgICAqL1xuICAgIGluaXROYXZpZ2F0aW9ucygpIHtcbiAgICAgICAgbGV0ICRzZWxmO1xuICAgICAgICAvLyBGb3IgZWFjaCBuYXZpZ2F0aW9uIGNvbnRhaW5lciBpbiB0aGUgcGFnZVxuICAgICAgICAkKHRoaXMuX3NlbGVjdG9yTmF2Q29udGFpbmVyKS5lYWNoKChpLCBlbCkgPT4ge1xuICAgICAgICAgICAgJHNlbGYgPSAkKGVsKTtcbiAgICAgICAgICAgIC8vIEZpcnN0LCBtYWtlIGl0cyBjb250ZW50IGVtcHR5LlxuICAgICAgICAgICAgJHNlbGYuaHRtbCgnJyk7XG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBuYXZpZ2F0aW9uIGVsZW1lbnQgZm9yIHRoZSBuYXZpZ2F0aW9uIGl0ZW1zIGluIHRoZSB0YWIgdGhhdCB0aGlzIG5hdmlnYXRpb24gY29udGFpbmVyIGlzIGluIGFuZFxuICAgICAgICAgICAgLy8gYWRkIGl0IHRvIHRoZSBjb250YWluZXIuXG4gICAgICAgICAgICAkc2VsZi5hcHBlbmQodGhpcy5jcmVhdGVOYXZpZ2F0aW9uRWxlbWVudCh0aGlzLmdldE5hdmlnYXRpb25JdGVtcygkc2VsZi5jbG9zZXN0KHRoaXMuc2VsZWN0b3JUYWJDb250YWluZXIpKSkpO1xuICAgICAgICAgICAgLy8gU2V0IGl0IGFzIGluaXRpYWxpemVkXG4gICAgICAgICAgICAkc2VsZi5wYXJlbnQoKS5hZGRDbGFzcyhTZWN0aW9uTmF2aWdhdGlvbi5jbGFzc0luaXRpYWxpemVkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFRyaWdnZXIgYW4gZXZlbnQgc28gdGhhdCBvdGhlcnMgY2FuIGRvIHRoaW5ncyB3aGVuIHRoZSBuYXZpZ2F0aW9ucyBhcmUgaW5pdGlhbGl6ZWRcbiAgICAgICAgJChkb2N1bWVudCkudHJpZ2dlcihFdmVudFR5cGUubmF2aWdhdGlvbnNJbml0aWFsaXplZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpbmRzIG5hdmlnYXRpb24gaXRlbXNcbiAgICAgKi9cbiAgICBnZXROYXZpZ2F0aW9uSXRlbXMoJGNvbnRhaW5lcikge1xuICAgICAgICBsZXQgJHNlbGYsIHJlc3VsdCA9IFtdO1xuICAgICAgICAvLyBBZGQgdGhlIGRlZmF1bHQgJ3RvcCcgaXRlbS4gSXQgc2hvdWxkIGJlIHRoZSB0YWIgY29udGFpbmVyJ3MgSUQgc28gdGhhdCB3aGVuIGl0IGlzIGNsaWNrZWQsIHRoZSB0b3Agb2YgdGhlXG4gICAgICAgIC8vIHRhYiBjb250YWluZXIgaXMgc2Nyb2xsZWQgdG8uXG4gICAgICAgIHJlc3VsdFskY29udGFpbmVyLmF0dHIoJ2lkJyldID0gd2luZG93LndwY2MudG9wO1xuICAgICAgICAvLyBGaW5kIGFsbCByb3dzIHRoYXQgYXJlIGFjdHVhbGx5IGEgc2VjdGlvbiB0aXRsZVxuICAgICAgICAkY29udGFpbmVyLmZpbmQodGhpcy5zZWxlY3Rvck5hdmlnYXRpb25Sb3cpLmVhY2goKGksIGVsKSA9PiB7XG4gICAgICAgICAgICAkc2VsZiA9ICQoZWwpO1xuICAgICAgICAgICAgLy8gQWRkIHRoZSByb3cgd2l0aCBpdHMgZGF0YS1pZCB2YWx1ZSBhbmQgdGV4dFxuICAgICAgICAgICAgcmVzdWx0WyRzZWxmLmF0dHIoJ2RhdGEtaWQnKV0gPSAkc2VsZi50ZXh0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIG5hdmlnYXRpb24gZWxlbWVudCB3aXRoIHRoZSBnaXZlbiBuYXZpZ2F0aW9uIGl0ZW1zXG4gICAgICogQHBhcmFtIHthcnJheX0gbmF2SXRlbXNcbiAgICAgKi9cbiAgICBjcmVhdGVOYXZpZ2F0aW9uRWxlbWVudChuYXZJdGVtcykge1xuICAgICAgICAvLyBDcmVhdGUgYW4gdW5vcmRlcmVkIGxpc3QgZWxlbWVudFxuICAgICAgICBsZXQgJHVsID0gJCgnPHVsLz4nKTtcbiAgICAgICAgLy8gVGhlbiwgZm9yIGVhY2ggZ2l2ZW4gbmF2aWdhdGlvbiBpdGVtXG4gICAgICAgIGZvciAobGV0IGlkIGluIG5hdkl0ZW1zKSB7XG4gICAgICAgICAgICBpZiAoIW5hdkl0ZW1zLmhhc093blByb3BlcnR5KGlkKSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIGxpIGVsZW1lbnQgY29udGFpbmluZyBhbiBhbmNob3IuIEFkZCB0aGUgdGFyZ2V0IHNlY3Rpb24ncyBJRCBhcyBkYXRhLWlkIHRvIHRoZSBhbmNob3Igc28gdGhhdFxuICAgICAgICAgICAgLy8gd2Uga25vdyB3aGF0IHNlY3Rpb24gdG8gc2Nyb2xsIHRvIHdoZW4gdGhlIGFuY2hvciBpcyBjbGlja2VkLlxuICAgICAgICAgICAgJHVsLmFwcGVuZCgkKCc8bGkvPicpXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgkKCc8YS8+JylcbiAgICAgICAgICAgICAgICAuYXR0cignZGF0YS1pZCcsIGlkKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdyb2xlJywgJ2J1dHRvbicpXG4gICAgICAgICAgICAgICAgLmh0bWwobmF2SXRlbXNbaWRdKSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAkdWw7XG4gICAgfVxufVxuU2VjdGlvbk5hdmlnYXRpb24uaW5zdGFuY2UgPSBudWxsO1xuU2VjdGlvbk5hdmlnYXRpb24uY2xhc3NJbml0aWFsaXplZCA9ICdpbml0aWFsaXplZCc7XG4iLCJleHBvcnQgY2xhc3MgVXRpbHMge1xuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBhIHN0cmluZyAoaGF5c3RhY2spIHN0YXJ0cyB3aXRoIHNvbWV0aGluZyAobmVlZGxlKVxuICAgICAqIEBwYXJhbSBoYXlzdGFja1xuICAgICAqIEBwYXJhbSBuZWVkbGVcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBzdGFydHNXaXRoKGhheXN0YWNrLCBuZWVkbGUpIHtcbiAgICAgICAgcmV0dXJuIGhheXN0YWNrLmxhc3RJbmRleE9mKG5lZWRsZSwgMCkgPT09IDA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVzY2FwZXMgSFRNTC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdW5zYWZlXG4gICAgICogQHNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNjIzNDgwNC8yODgzNDg3XG4gICAgICovXG4gICAgc3RhdGljIGVzY2FwZUh0bWwodW5zYWZlKSB7XG4gICAgICAgIGlmICh1bnNhZmUgPT09IHVuZGVmaW5lZCB8fCB1bnNhZmUgPT09ICd1bmRlZmluZWQnIHx8IHVuc2FmZSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgcmV0dXJuIHVuc2FmZVxuICAgICAgICAgICAgLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKVxuICAgICAgICAgICAgLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpXG4gICAgICAgICAgICAucmVwbGFjZSgvPi9nLCBcIiZndDtcIilcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKVxuICAgICAgICAgICAgLnJlcGxhY2UoLycvZywgXCImIzAzOTtcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNob3dzIHRoZSBzcGVjaWZpZWQgdGl0bGUgYXMgdGhlIGVsZW1lbnQncyB0b29sdGlwLCBhbmQgdGhlbiBjaGFuZ2VzIHRoZSB0b29sdGlwIHRvIGl0cyBvcmlnaW5hbCB2YWx1ZS5cbiAgICAgKiBIZW5jZSwgdGhlIHVzZXIgd2lsbCBzZWUgdGhlIG9yaWdpbmFsIHRpdGxlIHdoZW4gdGhlIHRvb2x0aXAgaXMgc2hvd24gbmV4dCB0aW1lLlxuICAgICAqIEBwYXJhbSAkZWxlbWVudFxuICAgICAqIEBwYXJhbSBmbGFzaFRpdGxlXG4gICAgICovXG4gICAgc3RhdGljIGZsYXNoVG9vbHRpcCgkZWxlbWVudCwgZmxhc2hUaXRsZSkge1xuICAgICAgICBsZXQgb3JpZ2luYWxUaXRsZSA9ICRlbGVtZW50LmF0dHIoXCJkYXRhLW9yaWdpbmFsLXRpdGxlXCIpO1xuICAgICAgICAkZWxlbWVudFxuICAgICAgICAgICAgLmF0dHIoJ2RhdGEtb3JpZ2luYWwtdGl0bGUnLCBmbGFzaFRpdGxlKVxuICAgICAgICAgICAgLnRvb2x0aXAoJ2ZpeFRpdGxlJylcbiAgICAgICAgICAgIC50b29sdGlwKCdzaG93JylcbiAgICAgICAgICAgIC8vIFNldCB0aGUgb3JpZ2luYWwgdGl0bGUgYnV0IGRvIG5vdCBzaG93IGl0LiBUaGUgdXNlciB3aWxsIHNlZSB0aGUgb3JpZ2luYWwgdGl0bGUgYXQgbmV4dCBob3ZlclxuICAgICAgICAgICAgLmF0dHIoJ2RhdGEtb3JpZ2luYWwtdGl0bGUnLCBvcmlnaW5hbFRpdGxlKVxuICAgICAgICAgICAgLnRvb2x0aXAoJ2ZpeFRpdGxlJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdG9vbHRpcCBlbGVtZW50cyBmb3IgYSBzZWxlY3Rvci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgU2VsZWN0b3Igb2YgdGhlIGVsZW1lbnQgdGhhdCBoYXMgJ2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiJyBhdHRyaWJ1dGVcbiAgICAgKi9cbiAgICBzdGF0aWMgaW5pdFRvb2x0aXBGb3JTZWxlY3RvcihzZWxlY3Rvcikge1xuICAgICAgICBpZiAodHlwZW9mICQuZm4udG9vbHRpcCA9PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgJChzZWxlY3RvciArICdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHZhbHVlIG9mIGEgY2hlY2tib3guXG4gICAgICogQHBhcmFtIHtKUXVlcnl8bnVsbHx1bmRlZmluZWR9ICRjaGVja2JveEVsZW1lbnRcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0Q2hlY2tib3hWYWx1ZSgkY2hlY2tib3hFbGVtZW50KSB7XG4gICAgICAgICRjaGVja2JveEVsZW1lbnQgPSAkY2hlY2tib3hFbGVtZW50IHx8IG51bGw7XG4gICAgICAgIGlmICgkY2hlY2tib3hFbGVtZW50ID09PSBudWxsIHx8ICEkY2hlY2tib3hFbGVtZW50Lmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuICEhJGNoZWNrYm94RWxlbWVudFswXS5jaGVja2VkO1xuICAgIH1cbn1cbiIsImV4cG9ydCB2YXIgTm90aWZpY2F0aW9uUG9zaXRpb247XG4oZnVuY3Rpb24gKE5vdGlmaWNhdGlvblBvc2l0aW9uKSB7XG4gICAgTm90aWZpY2F0aW9uUG9zaXRpb25bXCJUT1BcIl0gPSBcInRvcFwiO1xuICAgIE5vdGlmaWNhdGlvblBvc2l0aW9uW1wiUklHSFRcIl0gPSBcInJpZ2h0XCI7XG4gICAgTm90aWZpY2F0aW9uUG9zaXRpb25bXCJCT1RUT01cIl0gPSBcImJvdHRvbVwiO1xuICAgIE5vdGlmaWNhdGlvblBvc2l0aW9uW1wiTEVGVFwiXSA9IFwibGVmdFwiO1xufSkoTm90aWZpY2F0aW9uUG9zaXRpb24gfHwgKE5vdGlmaWNhdGlvblBvc2l0aW9uID0ge30pKTtcbiIsImV4cG9ydCB2YXIgTm90aWZpY2F0aW9uVHlwZTtcbihmdW5jdGlvbiAoTm90aWZpY2F0aW9uVHlwZSkge1xuICAgIE5vdGlmaWNhdGlvblR5cGVbXCJXQVJOXCJdID0gXCJ3YXJuXCI7XG4gICAgTm90aWZpY2F0aW9uVHlwZVtcIklORk9cIl0gPSBcImluZm9cIjtcbiAgICBOb3RpZmljYXRpb25UeXBlW1wiRVJST1JcIl0gPSBcImVycm9yXCI7XG4gICAgTm90aWZpY2F0aW9uVHlwZVtcIlNVQ0NFU1NcIl0gPSBcInN1Y2Nlc3NcIjtcbn0pKE5vdGlmaWNhdGlvblR5cGUgfHwgKE5vdGlmaWNhdGlvblR5cGUgPSB7fSkpO1xuIiwiaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uLXRzL1V0aWxzXCI7XG5pbXBvcnQgeyBDb3B5VG9DbGlwYm9hcmRIYW5kbGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi10cy9Db3B5VG9DbGlwYm9hcmRIYW5kbGVyXCI7XG5leHBvcnQgY2xhc3MgQ3VzdG9tU2hvcnRDb2RlSGFuZGxlciB7XG4gICAgLyoqIFRoaXMgaXMgYSBzaW5nbGV0b24uICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaW5wdXROYW1lQ3VzdG9tU2hvcnRDb2RlcyA9ICdfcG9zdF9jdXN0b21fY29udGVudF9zaG9ydGNvZGVfc2VsZWN0b3JzJztcbiAgICAgICAgdGhpcy5jdXN0b21TaG9ydENvZGVCdXR0b25Db250YWluZXJTZWxlY3RvciA9ICcuY3VzdG9tLXNob3J0LWNvZGUtY29udGFpbmVyJztcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBjb250YWluZXJzIG9uY2UuXG4gICAgICAgIHRoaXMudXBkYXRlQ3VzdG9tU2hvcnRDb2RlQnV0dG9uQ29udGFpbmVycygpO1xuICAgICAgICAvLyBMaXN0ZW4gdG8gY2hhbmdlcyBtYWRlIHRvIHRoZSBjdXN0b20gc2hvcnQgY29kZXMgaW5wdXRzIGlmIHRoZXkgZXhpc3RcbiAgICAgICAgbGV0ICRjdXN0b21TaG9ydENvZGVJbnB1dENvbnRhaW5lciA9IHRoaXMuZ2V0Q3VzdG9tU2hvcnRDb2RlSW5wdXRDb250YWluZXIoKTtcbiAgICAgICAgaWYgKCRjdXN0b21TaG9ydENvZGVJbnB1dENvbnRhaW5lciA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgJGN1c3RvbVNob3J0Q29kZUlucHV0Q29udGFpbmVyLm9uKCdjaGFuZ2UnLCAnaW5wdXRbbmFtZSQ9XCJbc2hvcnRfY29kZV1cIl0nLCAoKSA9PiB0aGlzLnVwZGF0ZUN1c3RvbVNob3J0Q29kZUJ1dHRvbkNvbnRhaW5lcnMoKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJuIHtDdXN0b21TaG9ydENvZGVIYW5kbGVyfVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UgPT09IG51bGwpXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gbmV3IEN1c3RvbVNob3J0Q29kZUhhbmRsZXIoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIGN1c3RvbSBzaG9ydCBjb2RlIGJ1dHRvbiBjb250YWluZXJzIHdpdGggdGhlIGN1c3RvbSBzaG9ydCBjb2RlIGJ1dHRvbnNcbiAgICAgKi9cbiAgICB1cGRhdGVDdXN0b21TaG9ydENvZGVCdXR0b25Db250YWluZXJzKCkge1xuICAgICAgICBsZXQgJGJ1dHRvbkNvbnRhaW5lcnMgPSAkKHRoaXMuY3VzdG9tU2hvcnRDb2RlQnV0dG9uQ29udGFpbmVyU2VsZWN0b3IpIHx8IG51bGw7XG4gICAgICAgIGlmICgkYnV0dG9uQ29udGFpbmVycyA9PT0gbnVsbCB8fCAhJGJ1dHRvbkNvbnRhaW5lcnMubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCAkYnV0dG9uQ29udGFpbmVyID0gdGhpcy5nZXRDdXN0b21TaG9ydENvZGVCdXR0b25zKCkgfHwgbnVsbDtcbiAgICAgICAgY29uc3QgYnV0dG9uc0V4aXN0ID0gJGJ1dHRvbkNvbnRhaW5lciAhPT0gbnVsbCAmJiAkYnV0dG9uQ29udGFpbmVyLmxlbmd0aDtcbiAgICAgICAgbGV0ICRlbDtcbiAgICAgICAgJGJ1dHRvbkNvbnRhaW5lcnMuZWFjaCgoaSwgZWwpID0+IHtcbiAgICAgICAgICAgICRlbCA9ICQoZWwpO1xuICAgICAgICAgICAgJGVsLmh0bWwoJycpO1xuICAgICAgICAgICAgaWYgKGJ1dHRvbnNFeGlzdClcbiAgICAgICAgICAgICAgICAkZWwuYXBwZW5kKCRidXR0b25Db250YWluZXIuY2xvbmUoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgc2VsZWN0b3IgPSB0aGlzLmN1c3RvbVNob3J0Q29kZUJ1dHRvbkNvbnRhaW5lclNlbGVjdG9yICsgJyBidXR0b24nO1xuICAgICAgICAvLyBJbml0IHRoZSB0b29sdGlwIGZvciB0aGUgY2xpcGJvYXJkIGVsZW1lbnRzXG4gICAgICAgIFV0aWxzLmluaXRUb29sdGlwRm9yU2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAvLyBJbml0IFwiY29weSB0byBjbGlwYm9hcmRcIiBmb3IgdGhlIGJ1dHRvbnNcbiAgICAgICAgQ29weVRvQ2xpcGJvYXJkSGFuZGxlci5nZXRJbnN0YW5jZSgpLmluaXRGb3JTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBjdXN0b20gc2hvcnQgY29kZSBidXR0b25zIGFzIGEgbGlzdCBvZiBqUXVlcnkgZWxlbWVudHNcbiAgICAgKi9cbiAgICBnZXRDdXN0b21TaG9ydENvZGVCdXR0b25zKCkge1xuICAgICAgICBsZXQgJGNvbnRhaW5lciA9IHRoaXMuZ2V0Q3VzdG9tU2hvcnRDb2RlSW5wdXRDb250YWluZXIoKTtcbiAgICAgICAgaWYgKCRjb250YWluZXIgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgLy8gRmluZCBzaG9ydCBjb2RlIG5hbWVzXG4gICAgICAgIGxldCBuYW1lcyA9IFtdLCBuYW1lO1xuICAgICAgICAkY29udGFpbmVyLmZpbmQoJ2lucHV0W25hbWUqPVwiW3Nob3J0X2NvZGVdXCJdJykuZWFjaCgoaSwgZWwpID0+IHtcbiAgICAgICAgICAgIG5hbWUgPSAkKGVsKS52YWwoKSB8fCBudWxsO1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IG51bGwgfHwgIW5hbWUubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIG5hbWVzLnB1c2gobmFtZSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBDcmVhdGUgdGhlIGJ1dHRvbnNcbiAgICAgICAgLypcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBkYXRhLXNob3J0Y29kZS1uYW1lPVwie3sgJGJ1dHRvbi0+Z2V0Q29kZSgpIH19XCJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS1jbGlwYm9hcmQtdGV4dD1cInt7ICRidXR0b24tPmdldENvZGVXaXRoQnJhY2tldHMoKSB9fVwiXG4gICAgICAgICAgICAgICAgICAgIGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXG4gICAgICAgICAgICAgICAgICAgIGRhdGEtcGxhY2VtZW50PVwidG9wXCJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJ7eyAkYnV0dG9uLT5nZXREZXNjcmlwdGlvbigpIH19XCI+XG4gICAgICAgICAgICAgICAge3sgJGJ1dHRvbi0+Z2V0Q29kZVdpdGhCcmFja2V0cygpIH19XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICovXG4gICAgICAgIGxldCAkYnV0dG9uQ29udGFpbmVyID0gJCgnPGRpdi8+JyksIHdpdGhCcmFja2V0cywgJGJ1dHRvbjtcbiAgICAgICAgZm9yIChsZXQgbmFtZSBvZiBuYW1lcykge1xuICAgICAgICAgICAgd2l0aEJyYWNrZXRzID0gJ1snICsgbmFtZSArICddJztcbiAgICAgICAgICAgICRidXR0b24gPSAkKCc8YnV0dG9uLz4nKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYnV0dG9uJylcbiAgICAgICAgICAgICAgICAuYXR0cigndHlwZScsICdidXR0b24nKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdkYXRhLXNob3J0Y29kZS1uYW1lJywgbmFtZSlcbiAgICAgICAgICAgICAgICAuYXR0cignZGF0YS1jbGlwYm9hcmQtdGV4dCcsIHdpdGhCcmFja2V0cylcbiAgICAgICAgICAgICAgICAuYXR0cignZGF0YS10b2dnbGUnLCAndG9vbHRpcCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2RhdGEtcGxhY2VtZW50JywgJ3RvcCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3RpdGxlJywgd2luZG93LndwY2MuY3VzdG9tX3Nob3J0X2NvZGUgKyAnOiAnICsgbmFtZSlcbiAgICAgICAgICAgICAgICAuaHRtbCh3aXRoQnJhY2tldHMpO1xuICAgICAgICAgICAgJGJ1dHRvbkNvbnRhaW5lci5hcHBlbmQoJGJ1dHRvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICRidXR0b25Db250YWluZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgaW5wdXQgY29udGFpbmVyIHRoYXQgY29udGFpbnMgYWxsIGN1c3RvbSBzaG9ydCBjb2RlIGlucHV0c1xuICAgICAqL1xuICAgIGdldEN1c3RvbVNob3J0Q29kZUlucHV0Q29udGFpbmVyKCkge1xuICAgICAgICBsZXQgJGFuSW5wdXQgPSAkKCdpbnB1dFtuYW1lXj1cIicgKyB0aGlzLmlucHV0TmFtZUN1c3RvbVNob3J0Q29kZXMgKyAnXCJdJykuZmlyc3QoKSB8fCBudWxsO1xuICAgICAgICBpZiAoJGFuSW5wdXQgPT09IG51bGwgfHwgISRhbklucHV0Lmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAvLyBGaW5kIHRoZSBjb250YWluZXJcbiAgICAgICAgbGV0ICRjb250YWluZXIgPSAkYW5JbnB1dC5jbG9zZXN0KCcuaW5wdXRzJykgfHwgbnVsbDtcbiAgICAgICAgcmV0dXJuICRjb250YWluZXIgIT09IG51bGwgJiYgJGNvbnRhaW5lci5sZW5ndGggPyAkY29udGFpbmVyIDogbnVsbDtcbiAgICB9XG59XG5DdXN0b21TaG9ydENvZGVIYW5kbGVyLmluc3RhbmNlID0gbnVsbDtcbiIsImltcG9ydCB7IE5vdGlmaWVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi10cy9Ob3RpZmllclwiO1xuaW1wb3J0IHsgVGVzdERhdGFQcmVwYXJlciB9IGZyb20gXCIuL1Rlc3REYXRhUHJlcGFyZXJcIjtcbmltcG9ydCB7IElucHV0R3JvdXBBZGRlciB9IGZyb20gXCIuLi8uLi9jb21tb24tdHMvSW5wdXRHcm91cEFkZGVyXCI7XG5pbXBvcnQgeyBQb3N0U2V0dGluZ3NWYXJpYWJsZXMgfSBmcm9tIFwiLi9Qb3N0U2V0dGluZ3NWYXJpYWJsZXNcIjtcbmltcG9ydCB7IFdvb0NvbW1lcmNlU2V0dGluZ3MgfSBmcm9tIFwiLi9Xb29Db21tZXJjZVNldHRpbmdzXCI7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25UeXBlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi10cy9lbnVtL05vdGlmaWNhdGlvblR5cGVcIjtcbmltcG9ydCB7IFNlY3Rpb25OYXZpZ2F0aW9uIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi10cy9TZWN0aW9uTmF2aWdhdGlvblwiO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uLXRzL1V0aWxzXCI7XG5pbXBvcnQgeyBDb3B5VG9DbGlwYm9hcmRIYW5kbGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi10cy9Db3B5VG9DbGlwYm9hcmRIYW5kbGVyXCI7XG5pbXBvcnQgeyBDdXN0b21TaG9ydENvZGVIYW5kbGVyIH0gZnJvbSBcIi4vQ3VzdG9tU2hvcnRDb2RlSGFuZGxlclwiO1xuaW1wb3J0IHsgRGVwZW5kYW50SGFuZGxlciB9IGZyb20gXCIuLi8uLi9jb21tb24tdHMvRGVwZW5kYW50SGFuZGxlclwiO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uUG9zaXRpb24gfSBmcm9tIFwiLi4vLi4vY29tbW9uLXRzL2VudW0vTm90aWZpY2F0aW9uUG9zaXRpb25cIjtcbmltcG9ydCB7IEV2ZW50VHlwZSB9IGZyb20gXCIuLi8uLi9jb21tb24tdHMvRXZlbnRUeXBlXCI7XG5leHBvcnQgY2xhc3MgUG9zdFNldHRpbmdzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5maXhlZEVsZW1lbnRzID0gW107XG4gICAgICAgIHRoaXMuJGFjdGl2ZVRhYkNvbnRhaW5lciA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy4kYWN0aXZlVGFiRml4YWJsZXMgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZG9jV2lkdGggPSBudWxsO1xuICAgICAgICB0aGlzLmFkbWluQmFySGVpZ2h0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5ub3RpZmllciA9IE5vdGlmaWVyLmdldEluc3RhbmNlKCk7XG4gICAgICAgIHRoaXMudGVzdERhdGFQcmVwYXJlciA9IFRlc3REYXRhUHJlcGFyZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgdGhpcy5pbnB1dEdyb3VwQWRkZXIgPSBJbnB1dEdyb3VwQWRkZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgdGhpcy5wc3YgPSBQb3N0U2V0dGluZ3NWYXJpYWJsZXMuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgLypcbiAgICAgICAgICAgIElOSVRJQUxJWkUgRVZFUllUSElOR1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5nZXRBZG1pbkJhckhlaWdodElmRml4ZWQoKTtcbiAgICAgICAgdGhpcy5pbml0U2V0dGluZ3NQYWdlT3B0aW9ucygpO1xuICAgICAgICB0aGlzLm1heWJlSW5pdFRpbnlNY2VFZGl0b3JzKCk7XG4gICAgICAgIHRoaXMuaW5pdFRvb2x0aXAoKTtcbiAgICAgICAgU2VjdGlvbk5hdmlnYXRpb24uZ2V0SW5zdGFuY2UoKS5pbml0TmF2aWdhdGlvbnMoKTtcbiAgICAgICAgQ3VzdG9tU2hvcnRDb2RlSGFuZGxlci5nZXRJbnN0YW5jZSgpO1xuICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIGhhc2ggZm9yIGEgdGFiLCBhY3RpdmF0ZSB0aGF0IHRhYi5cbiAgICAgICAgdGhpcy5yZXN0b3JlVVJMSGFzaCgpO1xuICAgICAgICB0aGlzLmhhbmRsZVVSTEhhc2goKTtcbiAgICAgICAgLy8gTGlzdGVuIHRvIGhhc2ggY2hhbmdlcyBhbmQgcmVhY3QgdG8gdGhlbS5cbiAgICAgICAgJCh3aW5kb3cpLm9uKCdoYXNoY2hhbmdlJywgZSA9PiB0aGlzLmhhbmRsZVVSTEhhc2goKSk7XG4gICAgICAgIC8vIEFkZCBhbiBpbnB1dCBncm91cCB0byBpdHMgY29udGFpbmVyLlxuICAgICAgICB0aGlzLnBzdi4kY29udGFpbmVyTWV0YUJveC5vbignY2xpY2snLCAnLndjYy1hZGQtbmV3JywgKGUpID0+IHRoaXMub25DbGlja0FkZE5ldyhlKSk7XG4gICAgICAgIC8vIFJlbW92ZSBhbiBpbnB1dCBncm91cC5cbiAgICAgICAgdGhpcy5wc3YuJGNvbnRhaW5lck1ldGFCb3gub24oJ2NsaWNrJywgJy53Y2MtcmVtb3ZlJywgKGUpID0+IHRoaXMub25DbGlja1JlbW92ZShlKSk7XG4gICAgICAgIC8vIFJlYWN0IHRvIHRlc3RzXG4gICAgICAgIHRoaXMucHN2LiRjb250YWluZXJNZXRhQm94Lm9uKCdjbGljaycsIHRoaXMucHN2LnNlbGVjdG9yVGVzdEJ1dHRvbiwgKGUpID0+IHRoaXMub25DbGlja1Rlc3QoZSkpO1xuICAgICAgICAvLyBIaWRlIHRlc3QgcmVzdWx0IGNvbnRlbnQgY29udGFpbmVyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuaGlkZS10ZXN0LXJlc3VsdHMnLCBlID0+IHRoaXMub25DbGlja0hpZGVUZXN0UmVzdWx0cyhlKSk7XG4gICAgICAgIC8vIExvYWQvcmVmcmVzaCB0cmFuc2xhdGlvbiBsYW5ndWFnZXNcbiAgICAgICAgdGhpcy5wc3YuJGNvbnRhaW5lck1ldGFCb3gub24oJ2NsaWNrJywgdGhpcy5wc3Yuc2VsZWN0b3JMb2FkVHJhbnNsYXRpb25MYW5ndWFnZXMsIChlKSA9PiB0aGlzLm9uTG9hZFJlZnJlc2hUcmFuc2xhdGlvbkxhbmd1YWdlcyhlKSk7XG4gICAgICAgIC8vIEhhbmRsZSB0YWJzXG4gICAgICAgIHRoaXMucHN2LiRjb250YWluZXJUYWJzLm9uKCdjbGljaycsICdhJywgKGUpID0+IHRoaXMub25DbGlja1RhYihlKSk7XG4gICAgICAgIC8vIFNob3cvaGlkZSBsYWJlbHNcbiAgICAgICAgdGhpcy5wc3YuJGNvbnRhaW5lck1ldGFCb3gub24oJ2NsaWNrJywgJy5pbmZvLWJ1dHRvbicsIChlKSA9PiB0aGlzLm9uQ2xpY2tJbmZvQnV0dG9uKGUpKTtcbiAgICAgICAgLy8gU2hvdy9oaWRlIGRlcGVuZGFudHMgb2YgXCJsaXN0IHR5cGVcIiBjaGVja2JveFxuICAgICAgICB0aGlzLnBzdi4kY29udGFpbmVyTWV0YUJveC5vbihcImNoYW5nZVwiLCBcImlucHV0W3R5cGU9Y2hlY2tib3hdXCIsIChlKSA9PiB7XG4gICAgICAgICAgICBEZXBlbmRhbnRIYW5kbGVyLmdldEluc3RhbmNlKCkuaGFuZGxlQ2hlY2tib3hEZXBlbmRhbnRzKCQoZS50YXJnZXQpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFRyaWdnZXIgY2hhbmdlIG9uIGNoZWNrYm94ZXMgd2hlbiB0aGUgcGFnZSBpcyByZWFkeVxuICAgICAgICB0aGlzLnBzdi4kY29udGFpbmVyTWV0YUJveC5maW5kKFwiaW5wdXRbdHlwZT1jaGVja2JveF0sIHNlbGVjdFwiKS5lYWNoKChpLCBlbCkgPT4ge1xuICAgICAgICAgICAgRGVwZW5kYW50SGFuZGxlci5nZXRJbnN0YW5jZSgpLmhhbmRsZUNoZWNrYm94RGVwZW5kYW50cygkKGVsKSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBUcmlnZ2VyIGNoYW5nZSBvbiBzZWxlY3RzIHdoZW4gdGhlIHBhZ2UgaXMgcmVhZHlcbiAgICAgICAgdGhpcy5wc3YuJGNvbnRhaW5lck1ldGFCb3guZmluZChcInNlbGVjdFwiKS5lYWNoKChpLCBlbCkgPT4ge1xuICAgICAgICAgICAgRGVwZW5kYW50SGFuZGxlci5nZXRJbnN0YW5jZSgpLmhhbmRsZVNlbGVjdERlcGVuZGFudHMoJChlbCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gVG9nZ2xlIGluZm8gdGV4dHNcbiAgICAgICAgdGhpcy5wc3YuJGNvbnRhaW5lck1ldGFCb3gub24oXCJjbGlja1wiLCBcIi50b2dnbGUtaW5mby10ZXh0c1wiLCAoZSkgPT4gdGhpcy5vbkNsaWNrVG9nZ2xlSW5mb1RleHRzKGUpKTtcbiAgICAgICAgLypcbiAgICAgICAgICAgIENPUFkgVE8gQ0xJUEJPQVJEXG4gICAgICAgICovXG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIGNsaXBib2FyZFxuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdy5DbGlwYm9hcmQgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgJChkb2N1bWVudCkucmVhZHkoKCkgPT4gdGhpcy5pbml0Q29weVRvQ2xpcGJvYXJkKCkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFByZXZlbnQgZGVmYXVsdCBhY3Rpb24gZm9yIHRoZSBidXR0b25zIHVzZWQgZm9yIGNvcHlpbmcgdGV4dHMuXG4gICAgICAgIHRoaXMucHN2LiRjb250YWluZXJNZXRhQm94Lm9uKCdjbGljaycsICcuaW5wdXQtYnV0dG9uLWNvbnRhaW5lciA+IGJ1dHRvbicsIChlKSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xuICAgICAgICAvKlxuICAgICAgICAgICAgRU5EIENPUFkgVE8gQ0xJUEJPQVJEXG4gICAgICAgICAqL1xuICAgICAgICAvLyBMb2FkL2NsZWFyIGdlbmVyYWwgc2V0dGluZ3Mgd2hlbiBpdHMgYnV0dG9uIGlzIGNsaWNrZWRcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgdGhpcy5wc3Yuc2VsZWN0b3JMb2FkR2VuZXJhbFNldHRpbmdzQnV0dG9uLCAoZSkgPT4gdGhpcy5oYW5kbGVMb2FkQ2xlYXJHZW5lcmFsU2V0dGluZ3MoZSkpO1xuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCB0aGlzLnBzdi5zZWxlY3RvckNsZWFyR2VuZXJhbFNldHRpbmdzQnV0dG9uLCAoZSkgPT4gdGhpcy5oYW5kbGVMb2FkQ2xlYXJHZW5lcmFsU2V0dGluZ3MoZSkpO1xuICAgICAgICAvLyBQcmVwYXJlIHNvcnRhYmxlIGVsZW1lbnRzXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93LmpRdWVyeS51aSAhPSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgJC5mbi5zb3J0YWJsZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAkKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB0aGlzLnByZXBhcmVTb3J0YWJsZXMoKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2VsZWN0IHRoZSBjb2RlIGZvciBleHBvcnRpbmcgc2V0dGluZ3NcbiAgICAgICAgJCgndGV4dGFyZWFbcmVhZG9ubHk9XCJyZWFkb25seVwiXScpLmZvY3VzKChlKSA9PiB0aGlzLm9uRm9jdXNSZWFkb25seVRleHRBcmVhKGUpKTtcbiAgICAgICAgLy8gVmFsaWRhdGUgdGhlIGZvcm0gYmVmb3JlIHN1Ym1pdHRpbmdcbiAgICAgICAgdGhpcy5wc3YuJGZvcm0ub24oJ3N1Ym1pdCcsIChlKSA9PiB0aGlzLm9uU3VibWl0Rm9ybShlKSk7XG4gICAgICAgIC8vIEFjdGl2YXRlIHRoZSB0YWIgdGhhdCB3YXMgYWN0aXZlIGJlZm9yZSBzYXZpbmcgdGhlIHNldHRpbmdzXG4gICAgICAgICQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IHRoaXMuYWN0aXZhdGVQcmV2aW91c2x5QWN0aXZlVGFiKCkpO1xuICAgICAgICAvLyBTaG93IHVubW9kaWZpZWQgcmVzdWx0c1xuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCB0aGlzLnBzdi5zZWxlY3RvckJ1dHRvblNlZVVubW9kaWZpZWRUZXN0UmVzdWx0cywgKGUpID0+IHRoaXMub25DbGlja1NlZVVubW9kaWZpZWRSZXN1bHRzKGUpKTtcbiAgICAgICAgLy8gSW52YWxpZGF0ZSBjYWNoZXMgZm9yIHRlc3QgVVJMXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIHRoaXMucHN2LnNlbGVjdG9ySW52YWxpZGF0ZUNhY2hlQnV0dG9uLCAoZSkgPT4gdGhpcy5vbkNsaWNrSW52YWxpZGF0ZVRlc3RVcmxDYWNoZShlKSk7XG4gICAgICAgIC8vIEludmFsaWRhdGUgYWxsIHRlc3QgVVJMIGNhY2hlc1xuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCB0aGlzLnBzdi5zZWxlY3RvckludmFsaWRhdGVBbGxDYWNoZXNCdXR0b24sIChlKSA9PiB0aGlzLm9uQ2xpY2tJbnZhbGlkYXRlQWxsVGVzdFVybENhY2hlcyhlKSk7XG4gICAgICAgIC8vIEhhbmRsZSBjYXRlZ29yeSBzZWxlY3Rpb24gY2hhbmdlcyBpbiBjYXRlZ29yeSBtYXBcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsIHRoaXMucHN2LnNlbGVjdG9yQ2F0ZWdvcnlNYXAgKyAnIHNlbGVjdCcsIChlKSA9PiB0aGlzLm9uQ2hhbmdlQ2F0ZWdvcnkoZSkpO1xuICAgICAgICAvLyBRdWljayBzYXZlIHdoZW4gYSBxdWljayBzYXZlIGJ1dHRvbiBpcyBjbGlja2VkIG9yIGVudGVyIGtleSBpcyBwcmVzc2VkIGZvciBhIHRleHQgaW5wdXQgb2YgdGhlIHNldHRpbmdzLlxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCB0aGlzLnBzdi5zZWxlY3RvclF1aWNrU2F2ZUJ1dHRvbiwgKGUpID0+IHRoaXMucXVpY2tTYXZlKGUpKTtcbiAgICAgICAgdGhpcy5wc3YuJGNvbnRhaW5lck1ldGFCb3gub24oJ2tleWRvd24nLCAnaW5wdXQsIHNlbGVjdCcsIChlKSA9PiB7XG4gICAgICAgICAgICBsZXQga2V5ID0gZS53aGljaCB8fCBlLmtleUNvZGU7XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSAxMykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucXVpY2tTYXZlKGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gRml4IHRoZSB0aGluZ3MgdG8gYmUgZml4ZWQgd2hlbiB0aGUgcGFnZSBpcyBzY3JvbGxlZCBkb3duXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdzY3JvbGwnLCAoZSkgPT4gdGhpcy5oYW5kbGVFbGVtZW50Rml4aW5nKCkpO1xuICAgICAgICAvLyBSZWFjdCB0byByZXNpemUgZXZlbnRzXG4gICAgICAgICQod2luZG93KS5vbigncmVzaXplJywgKGUpID0+IHRoaXMub25SZXNpemUoZSkpO1xuICAgICAgICAvLyBXaGVuIGEgcG9zdGJveCdzIGNvbHVtbiBpcyBjaGFuZ2VkIG9yIGl0IGlzIGNvbGxhcHNlZC9leHBhbmRlZCwgdHJpZ2dlciB0aGUgcmVzaXplIGZ1bmN0aW9uIHNpbmNlIHBvc2l0aW9uc1xuICAgICAgICAvLyBvZiBzb21lIGVsZW1lbnRzIG1pZ2h0IGhhdmUgYmVlbiBjaGFuZ2VkLlxuICAgICAgICAkKGRvY3VtZW50KS5vbigncG9zdGJveC10b2dnbGVkIHBvc3Rib3hlcy1jb2x1bW5jaGFuZ2UnLCAoZSkgPT4gdGhpcy5vblJlc2l6ZShlKSk7XG4gICAgICAgIC8vIFJlZ2lzdGVyIGlucHV0IGdyb3VwIG1vZGlmaWVycy5cbiAgICAgICAgdGhpcy5pbnB1dEdyb3VwQWRkZXIucmVnaXN0ZXJNb2RpZmllcigkaW5wdXRHcm91cCA9PiB7XG4gICAgICAgICAgICAvLyBJZiB0aGlzIGlzIGEgbmV3IGNhdGVnb3J5IG1hcCBpbnB1dFxuICAgICAgICAgICAgaWYgKCRpbnB1dEdyb3VwLmhhc0NsYXNzKCdjYXRlZ29yeS1tYXAnKSkge1xuICAgICAgICAgICAgICAgIC8vIEluaXRpYWxpemUgdGhlIHNlbGVjdCBlbGVtZW50XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRDYXRlZ29yeVRheG9ub215TmFtZUZvclNlbGVjdCgkaW5wdXRHcm91cC5maW5kKCdzZWxlY3QnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBJbnZhbGlkYXRlIGFjdGl2ZSB0YWIgZml4YWJsZXMgd2hlbiB0aGUgbmF2aWdhdGlvbnMgYXJlIGluaXRpYWxpemVkLiBBY3RpdmUgdGFiIGZpeGFibGVzIGNvbnRhaW4gdGhlXG4gICAgICAgIC8vIG5hdmlnYXRpb25zLlxuICAgICAgICAkKGRvY3VtZW50KS5vbihFdmVudFR5cGUubmF2aWdhdGlvbnNJbml0aWFsaXplZCwgKCkgPT4gdGhpcy5pbnZhbGlkYXRlQWN0aXZlVGFiRml4YWJsZXNDYWNoZSgpKTtcbiAgICAgICAgLy8gSW5pdCBXb29Db21tZXJjZSBvcHRpb25zXG4gICAgICAgIFdvb0NvbW1lcmNlU2V0dGluZ3MuZ2V0SW5zdGFuY2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhpcyBjbGFzcyBpcyBhIHNpbmdsZXRvbi4gR2V0IHRoZSBpbnN0YW5jZSB3aXRoIHRoaXMgbWV0aG9kLlxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLklOU1RBTkNFKVxuICAgICAgICAgICAgdGhpcy5JTlNUQU5DRSA9IG5ldyBQb3N0U2V0dGluZ3MoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuSU5TVEFOQ0U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIHNldHRpbmdzIHBhZ2Ugb3B0aW9uc1xuICAgICAqL1xuICAgIGluaXRTZXR0aW5nc1BhZ2VPcHRpb25zKCkge1xuICAgICAgICB0aGlzLmlzRml4VGFicyA9IFV0aWxzLmdldENoZWNrYm94VmFsdWUoJCh0aGlzLnBzdi5zZWxlY3RvckNoZWNrYm94Rml4VGFicykpO1xuICAgICAgICB0aGlzLmlzRml4Q29udGVudE5hdmlnYXRpb24gPSBVdGlscy5nZXRDaGVja2JveFZhbHVlKCQodGhpcy5wc3Yuc2VsZWN0b3JDaGVja2JveEZpeENvbnRlbnROYXZpZ2F0aW9uKSk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCB0aGlzLnBzdi5zZWxlY3RvckNoZWNrYm94Rml4VGFicywgKGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNGaXhUYWJzID0gVXRpbHMuZ2V0Q2hlY2tib3hWYWx1ZSgkKGUudGFyZ2V0KSk7XG4gICAgICAgICAgICB0aGlzLnJlc2V0Rml4YWJsZUVsZW1lbnRzKCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgdGhpcy5wc3Yuc2VsZWN0b3JDaGVja2JveEZpeENvbnRlbnROYXZpZ2F0aW9uLCAoZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pc0ZpeENvbnRlbnROYXZpZ2F0aW9uID0gVXRpbHMuZ2V0Q2hlY2tib3hWYWx1ZSgkKGUudGFyZ2V0KSk7XG4gICAgICAgICAgICB0aGlzLnJlc2V0Rml4YWJsZUVsZW1lbnRzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWFjdHMgdG8gcmVzaXplIGV2ZW50c1xuICAgICAqIEBwYXJhbSBlXG4gICAgICovXG4gICAgb25SZXNpemUoZSkge1xuICAgICAgICAvLyBSZXNldCB0aGUgZml4YWJsZSBlbGVtZW50cy5cbiAgICAgICAgdGhpcy5yZXNldEZpeGFibGVFbGVtZW50cygpO1xuICAgICAgICAvLyBSZXNldCB0aGUgcHJldmlvdXMgc2Nyb2xsIHRvcCBwb3NpdGlvbnMgb2YgdGhlIHRhYnNcbiAgICAgICAgdGhpcy5yZXNldFByZXZTY3JvbGxQb3NpdGlvbkNhY2hlT2ZUYWJzKCk7XG4gICAgICAgIC8vIEludmFsaWRhdGUgdGhlIHdpZHRoIHNpbmNlIGl0IG1pZ2h0IGhhdmUgYmVlbiBjaGFuZ2VkXG4gICAgICAgIHRoaXMuaW52YWxpZGF0ZURvY1dpZHRoQ2FjaGUoKTtcbiAgICAgICAgLy8gSW52YWxpZGF0ZSB0aGUgYWRtaW4gYmFyIGhlaWdodCBjYWNoZSBzaW5jZSB0aGUgaGVpZ2h0IG9mIGl0IG1pZ2h0IGhhdmUgYmVlbiBjaGFuZ2VkLlxuICAgICAgICB0aGlzLmludmFsaWRhdGVBZG1pbkJhckhlaWdodENhY2hlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlc2V0cyBmaXhhYmxlIGVsZW1lbnRzIGFuZCB0cmllcyB0byBmaXggdGhlIGVsZW1lbnRzIHRoYXQgbmVlZCB0byBiZSBmaXhlZC5cbiAgICAgKi9cbiAgICByZXNldEZpeGFibGVFbGVtZW50cygpIHtcbiAgICAgICAgbGV0ICRlbDtcbiAgICAgICAgJCh0aGlzLnBzdi5zZWxlY3RvckZpeGFibGUpLmVhY2goKGksIGVsKSA9PiB7XG4gICAgICAgICAgICAkZWwgPSAkKGVsKTtcbiAgICAgICAgICAgIHRoaXMucmVzZXRPZmZzZXRPZkZpeGFibGUoJGVsKTtcbiAgICAgICAgICAgIHRoaXMuc2V0RWxlbWVudFVuZml4ZWQoJGVsKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucHN2LiRjb250YWluZXJNZXRhQm94LmNzcygncGFkZGluZy10b3AnLCAnMCcpO1xuICAgICAgICB0aGlzLmhhbmRsZUVsZW1lbnRGaXhpbmcoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRml4ZXMgdGhlIGVsZW1lbnRzIHRoYXQgbmVlZCB0byBiZSBmaXhlZFxuICAgICAqL1xuICAgIGhhbmRsZUVsZW1lbnRGaXhpbmcoKSB7XG4gICAgICAgIC8vIElmIHRoZXJlIGlzIG5vdGhpbmcgdG8gZml4LCBzdG9wLlxuICAgICAgICBpZiAoIXRoaXMuaXNGaXhUYWJzICYmICF0aGlzLmlzRml4Q29udGVudE5hdmlnYXRpb24pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIC8vIElmIHRoZSB3aWR0aCBvZiB0aGUgcGFnZSBpcyBsZXNzIHRoYW4gYSBjZXJ0YWluIHRocmVzaG9sZCwgZG8gbm90IGZpeCBhbnl0aGluZyB0byBrZWVwIHRoZSB1c2FibGUgd2luZG93IGFyZWFcbiAgICAgICAgLy8gYmlnIGVub3VnaCB0byBzZWUgZXZlcnl0aGluZyBlYXNpbHkuXG4gICAgICAgIGlmICh0aGlzLmdldERvY1dpZHRoKCkgPD0gNjAwKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBsZXQgdG9wID0gdGhpcy5nZXRTY3JvbGxUb3AoKTtcbiAgICAgICAgbGV0IGJhc2VGaXhDb25kaXRpb24gPSB0b3AgKyB0aGlzLmdldEFkbWluQmFySGVpZ2h0SWZGaXhlZCgpO1xuICAgICAgICBsZXQgdGFiQ29udGFpbmVyRml4Q29uZGl0aW9uID0gMDtcbiAgICAgICAgLy8gRml4IHRhYnNcbiAgICAgICAgaWYgKHRoaXMuaXNGaXhUYWJzKSB7XG4gICAgICAgICAgICBsZXQgdGFiQ29udGFpbmVyVG9wID0gdGhpcy5nZXRUb3BPZmZzZXRPZlRhcmdldEZpeGFibGUodGhpcy5wc3YuJGNvbnRhaW5lclRhYnMpO1xuICAgICAgICAgICAgbGV0IG1hcmdpblRvcCA9IDg7XG4gICAgICAgICAgICB0YWJDb250YWluZXJGaXhDb25kaXRpb24gPSBiYXNlRml4Q29uZGl0aW9uICsgbWFyZ2luVG9wO1xuICAgICAgICAgICAgaWYgKHRhYkNvbnRhaW5lckZpeENvbmRpdGlvbiA+PSB0YWJDb250YWluZXJUb3ApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEVsZW1lbnRGaXhlZCh0aGlzLnBzdi4kY29udGFpbmVyVGFicyk7XG4gICAgICAgICAgICAgICAgLy8gVW5maXggdGFicyBpZiB0aGV5IGFyZSBmaXhlZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRFbGVtZW50VW5maXhlZCh0aGlzLnBzdi4kY29udGFpbmVyVGFicyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gRml4IHRoZSBmaXhhYmxlcyBpbnNpZGUgdGhlIGN1cnJlbnQgdGFiIGNvbnRhaW5lclxuICAgICAgICBpZiAodGhpcy5pc0ZpeENvbnRlbnROYXZpZ2F0aW9uKSB7XG4gICAgICAgICAgICBsZXQgJGN1cnJlbnRUYWJGaXhhYmxlcyA9IHRoaXMuZ2V0QWN0aXZlVGFiRml4YWJsZXMoKTtcbiAgICAgICAgICAgIGlmICgkY3VycmVudFRhYkZpeGFibGVzID09PSBudWxsIHx8ICEkY3VycmVudFRhYkZpeGFibGVzLmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBsZXQgJGZpeGFibGVFbCwgZWxUb3A7XG4gICAgICAgICAgICBsZXQgdGFiQ29udGFpbmVySGVpZ2h0ID0gdGhpcy5pc0ZpeFRhYnMgPyB0aGlzLnBzdi4kY29udGFpbmVyVGFicy5oZWlnaHQoKSA6IDA7XG4gICAgICAgICAgICBsZXQgY29udGVudE5hdkZpeENvbmRpdGlvbiA9ICh0aGlzLmlzRml4VGFicyA/IHRhYkNvbnRhaW5lckZpeENvbmRpdGlvbiArIHRhYkNvbnRhaW5lckhlaWdodCA6IGJhc2VGaXhDb25kaXRpb24pIC0gMTE7XG4gICAgICAgICAgICAkY3VycmVudFRhYkZpeGFibGVzLmVhY2goKGksIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgJGZpeGFibGVFbCA9ICQoZWwpO1xuICAgICAgICAgICAgICAgIGVsVG9wID0gdGhpcy5nZXRUb3BPZmZzZXRPZlRhcmdldEZpeGFibGUoJGZpeGFibGVFbCk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnROYXZGaXhDb25kaXRpb24gPj0gZWxUb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRFbGVtZW50Rml4ZWQoJGZpeGFibGVFbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFVuZml4IHRoZSBlbGVtZW50IGlmIGl0IGlzIGZpeGVkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEVsZW1lbnRVbmZpeGVkKCRmaXhhYmxlRWwsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdG9wIG9mZnNldCBvZiB0aGUgb3JpZ2luYWwgZml4YWJsZSBlbGVtZW50LiBUaGlzIHJldHVybnMgdGhlIHRvcCBvZmZzZXQgb2YgdGhlIGVsZW1lbnQncyBvcmlnaW5hbCBsb2NhdGlvbixcbiAgICAgKiB3aGljaCBpcyB0aGUgbG9jYXRpb24gdGhhdCBpcyBub3QgZml4ZWQuIFRoaXMgY2FjaGVzIHRoZSBvcmlnaW5hbCBlbGVtZW50J3MgdG9wIG9mZnNldC5cbiAgICAgKiBAcGFyYW0gJGVsZW1lbnQgVGhlIGZpeGFibGUgZWxlbWVudFxuICAgICAqL1xuICAgIGdldFRvcE9mZnNldE9mVGFyZ2V0Rml4YWJsZSgkZWxlbWVudCkge1xuICAgICAgICBsZXQgZWxPZmZzZXRUb3AgPSAkZWxlbWVudC5kYXRhKCdvZmZzZXRUb3AnKSB8fCBudWxsO1xuICAgICAgICBpZiAoZWxPZmZzZXRUb3AgPT09IG51bGwpIHtcbiAgICAgICAgICAgICRlbGVtZW50LmRhdGEoJ29mZnNldFRvcCcsICRlbGVtZW50Lm9mZnNldCgpLnRvcCk7XG4gICAgICAgICAgICBlbE9mZnNldFRvcCA9ICRlbGVtZW50LmRhdGEoJ29mZnNldFRvcCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbE9mZnNldFRvcDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVzZXRzIHRoZSB0b3Agb2Zmc2V0IG9mIHRoZSBmaXhhYmxlIGVsZW1lbnQuIFRoZSBvZmZzZXQgb2YgdGhlIG9yaWdpbmFsIGVsZW1lbnQgaXMgY2FjaGVkIGluXG4gICAgICoge0BsaW5rIGdldFRvcE9mZnNldE9mVGFyZ2V0Rml4YWJsZX0uIFRoaXMgbWV0aG9kIGludmFsaWRhdGVzIHRoYXQgY2FjaGUuXG4gICAgICogQHBhcmFtICRlbGVtZW50XG4gICAgICovXG4gICAgcmVzZXRPZmZzZXRPZkZpeGFibGUoJGVsZW1lbnQpIHtcbiAgICAgICAgJGVsZW1lbnQucmVtb3ZlRGF0YSgnb2Zmc2V0VG9wJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpeGVzIGFuIGVsZW1lbnQgYXQgdGhlIHRvcCBvZiB0aGUgcGFnZS5cbiAgICAgKiBAcGFyYW0gJGVsZW1lbnQgVGhlIGVsZW1lbnQgdG8gYmUgZml4ZWQuXG4gICAgICogQHBhcmFtIGlzSW5UYWJDb250ZW50IFRydWUgaWYgdGhlIGVsZW1lbnQgaXMgaW4gYSB0YWIncyBjb250ZW50IGNvbnRhaW5lci5cbiAgICAgKi9cbiAgICBzZXRFbGVtZW50Rml4ZWQoJGVsZW1lbnQsIGlzSW5UYWJDb250ZW50ID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCRlbGVtZW50Lmhhc0NsYXNzKHRoaXMucHN2LmNsYXNzRml4ZWQpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmZpeGVkRWxlbWVudHMuaW5kZXhPZigkZWxlbWVudCk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGxldCBmaXhlZEVsVG9wID0gbnVsbDtcbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgYXQgbGVhc3Qgb25lIGFub3RoZXIgZml4ZWQgZWxlbWVudFxuICAgICAgICBpZiAodGhpcy5maXhlZEVsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIFRvIGZpeCB0aGUgbmF2IGF0IHRoZSBib3R0b20gb2YgdGhhdCBlbGVtZW50LCB3ZSBuZWVkIHRoYXQgZWxlbWVudCdzIHRvcCBwb3NpdGlvbiBhbmQgaGVpZ2h0LlxuICAgICAgICAgICAgbGV0ICRsYXN0Rml4ZWRFbCA9IHRoaXMuZml4ZWRFbGVtZW50c1t0aGlzLmZpeGVkRWxlbWVudHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBsZXQgbGFzdEZpeGVkRWxUb3AgPSBwYXJzZUZsb2F0KCRsYXN0Rml4ZWRFbC5jc3MoJ3RvcCcpKSB8fCAwO1xuICAgICAgICAgICAgZml4ZWRFbFRvcCA9IGxhc3RGaXhlZEVsVG9wICsgJGxhc3RGaXhlZEVsLm91dGVySGVpZ2h0KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBPdGhlcndpc2UsIHNpbmNlIHRoZXJlIGlzIGFsd2F5cyB0aGUgYWRtaW4gYmFyIGZpeGVkIGF0IHRoZSB0b3AsIGZpeGVkIG5hdmlnYXRpb24gc2hvdWxkIGJlIGFkZGVkIGFmdGVyXG4gICAgICAgICAgICAvLyB0aGUgYWRtaW4gYmFyLlxuICAgICAgICAgICAgZml4ZWRFbFRvcCA9IHRoaXMuZ2V0QWRtaW5CYXJIZWlnaHRJZkZpeGVkKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5maXhlZEVsZW1lbnRzLnB1c2goJGVsZW1lbnQpO1xuICAgICAgICBsZXQgJGNvbnRhaW5lck1ldGFCb3ggPSB0aGlzLnBzdi4kY29udGFpbmVyTWV0YUJveDtcbiAgICAgICAgLy8gR2V0IHRoZSB3aWR0aCBvZiB0aGUgc2V0dGluZ3MgY29udGFpbmVyXG4gICAgICAgIGxldCBtZXRhQm94V2lkdGggPSAkY29udGFpbmVyTWV0YUJveC53aWR0aCgpO1xuICAgICAgICBsZXQgcGFkZGluZ1RvcFZhbHVlID0gKHBhcnNlRmxvYXQoJGNvbnRhaW5lck1ldGFCb3guY3NzKCdwYWRkaW5nLXRvcCcpKSB8fCAwKSArICRlbGVtZW50Lm91dGVySGVpZ2h0KCk7XG4gICAgICAgIGlmIChpc0luVGFiQ29udGVudClcbiAgICAgICAgICAgIHBhZGRpbmdUb3BWYWx1ZSArPSAxMjtcbiAgICAgICAgJGNvbnRhaW5lck1ldGFCb3guY3NzKCdwYWRkaW5nLXRvcCcsIHBhZGRpbmdUb3BWYWx1ZSArICdweCcpO1xuICAgICAgICAkZWxlbWVudFxuICAgICAgICAgICAgLmRhdGEoJ2hlaWdodCcsICRlbGVtZW50Lm91dGVySGVpZ2h0KCkpXG4gICAgICAgICAgICAuY3NzKCd3aWR0aCcsIG1ldGFCb3hXaWR0aCArICdweCcpXG4gICAgICAgICAgICAuYWRkQ2xhc3ModGhpcy5wc3YuY2xhc3NGaXhlZClcbiAgICAgICAgICAgIC5jc3MoJ3RvcCcsIGZpeGVkRWxUb3ApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIEFkbWluIGJhciBoZWlnaHQgaWYgdGhlIGFkbWluIGJhciBpcyBmaXhlZC4gT3RoZXJ3aXNlLCByZXR1cm5zIDAuXG4gICAgICovXG4gICAgZ2V0QWRtaW5CYXJIZWlnaHRJZkZpeGVkKCkge1xuICAgICAgICBpZiAodGhpcy5hZG1pbkJhckhlaWdodCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5hZG1pbkJhckhlaWdodCA9IHRoaXMucHN2LiRhZG1pbkJhci5jc3MoJ3Bvc2l0aW9uJykudG9Mb2NhbGVMb3dlckNhc2UoKSA9PT0gJ2ZpeGVkJyA/IHRoaXMucHN2LiRhZG1pbkJhci5vdXRlckhlaWdodCgpIDogMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5hZG1pbkJhckhlaWdodDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW52YWxpZGF0ZXMgYWRtaW4gYmFyIGhlaWdodCBjYWNoZVxuICAgICAqL1xuICAgIGludmFsaWRhdGVBZG1pbkJhckhlaWdodENhY2hlKCkge1xuICAgICAgICB0aGlzLmFkbWluQmFySGVpZ2h0ID0gbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB3aWR0aCBvZiB0aGUgZG9jdW1lbnRcbiAgICAgKi9cbiAgICBnZXREb2NXaWR0aCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9jV2lkdGggPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jV2lkdGggPSAkKGRvY3VtZW50KS53aWR0aCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmRvY1dpZHRoO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnZhbGlkYXRlcyB0aGUgY2FjaGVkIGRvY3VtZW50IHdpZHRoXG4gICAgICovXG4gICAgaW52YWxpZGF0ZURvY1dpZHRoQ2FjaGUoKSB7XG4gICAgICAgIHRoaXMuZG9jV2lkdGggPSBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVbmZpeGVzIGFuIGVsZW1lbnQgdGhhdCBpcyBmaXhlZCBhdCB0aGUgdG9wIG9mIHRoZSBwYWdlIHVzaW5nIHtAbGluayBzZXRFbGVtZW50Rml4ZWR9LlxuICAgICAqIEBwYXJhbSAkZWxlbWVudCBUaGUgZWxlbWVudCB0byBiZSBmaXhlZC5cbiAgICAgKiBAcGFyYW0gaXNJblRhYkNvbnRlbnQgVHJ1ZSBpZiB0aGUgZWxlbWVudCBpcyBpbiBhIHRhYidzIGNvbnRlbnQgY29udGFpbmVyLlxuICAgICAqL1xuICAgIHNldEVsZW1lbnRVbmZpeGVkKCRlbGVtZW50LCBpc0luVGFiQ29udGVudCA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghJGVsZW1lbnQuaGFzQ2xhc3ModGhpcy5wc3YuY2xhc3NGaXhlZCkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIC8vIEZpbmQgdGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IGluIHRoZSBmaXhlZCBlbGVtZW50cyBhcnJheVxuICAgICAgICBsZXQgaW5kZXggPSAtMTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmZpeGVkRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZpeGVkRWxlbWVudHNbaV0uZ2V0KDApID09ICRlbGVtZW50LmdldCgwKSkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBObyBuZWVkIHRvIGNvbnRpbnVlIGlmIHRoZSBlbGVtZW50IGRvZXMgbm90IGV4aXN0IGluIGZpeGVkIGVsZW1lbnRzIGFycmF5XG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIC8vIFJlbW92ZSB0aGUgZWxlbWVudCBmcm9tIGZpeGVkIGVsZW1lbnRzIGFycmF5XG4gICAgICAgIHRoaXMuZml4ZWRFbGVtZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBsZXQgJGNvbnRhaW5lck1ldGFCb3ggPSB0aGlzLnBzdi4kY29udGFpbmVyTWV0YUJveDtcbiAgICAgICAgbGV0IHBhZGRpbmdUb3BWYWx1ZSA9IE1hdGgubWF4KDAsIChwYXJzZUZsb2F0KCRjb250YWluZXJNZXRhQm94LmNzcygncGFkZGluZy10b3AnKSkgfHwgMCkgLSAkZWxlbWVudC5kYXRhKCdoZWlnaHQnKSk7XG4gICAgICAgIGlmIChpc0luVGFiQ29udGVudClcbiAgICAgICAgICAgIHBhZGRpbmdUb3BWYWx1ZSAtPSAxMjtcbiAgICAgICAgJGNvbnRhaW5lck1ldGFCb3guY3NzKCdwYWRkaW5nLXRvcCcsIHBhZGRpbmdUb3BWYWx1ZSArICdweCcpO1xuICAgICAgICAkZWxlbWVudFxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKHRoaXMucHN2LmNsYXNzRml4ZWQpXG4gICAgICAgICAgICAuY3NzKCd3aWR0aCcsICcnKVxuICAgICAgICAgICAgLmNzcygndG9wJywgJycpXG4gICAgICAgICAgICAucmVtb3ZlRGF0YSgnaGVpZ2h0Jyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0b3RhbCBoZWlnaHQgb2YgdGhlIGVsZW1lbnRzIHRoYXQgYXJlIGZpeGVkIGF0IHRoZSB0b3Agb2YgdGhlIHBhZ2VcbiAgICAgKiBAcmV0dXJuIG51bWJlclxuICAgICAqL1xuICAgIGdldEZpeGVkRWxlbWVudHNUb3RhbEhlaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZml4ZWRFbGVtZW50cy5yZWR1Y2UoKGFjYywgJGN1cnIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhY2MgKyAkY3Vyci5vdXRlckhlaWdodCgpO1xuICAgICAgICB9LCAwKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBjYXRlZ29yeSBzZWxlY3Rpb24gY2hhbmdlcyBpbiB0aGUgY2F0ZWdvcnkgbWFwIG9wdGlvblxuICAgICAqIEBwYXJhbSBlXG4gICAgICovXG4gICAgb25DaGFuZ2VDYXRlZ29yeShlKSB7XG4gICAgICAgIGxldCAkc2VsZiA9ICQoZS50YXJnZXQpO1xuICAgICAgICB0aGlzLnNldENhdGVnb3J5VGF4b25vbXlOYW1lRm9yU2VsZWN0KCRzZWxmKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyBoaWRkZW4gJ3RheG9ub215JyBpbnB1dCdzIHZhbHVlIGZvciBhIGNhdGVnb3J5IHNlbGVjdCBlbGVtZW50LlxuICAgICAqIEBwYXJhbSAkc2VsZWN0RWxcbiAgICAgKi9cbiAgICBzZXRDYXRlZ29yeVRheG9ub215TmFtZUZvclNlbGVjdCgkc2VsZWN0RWwpIHtcbiAgICAgICAgLy8gR2V0IHRoZSBzZWxlY3RlZCBvcHRpb25cbiAgICAgICAgbGV0ICRzZWxlY3RlZE9wdGlvbiA9ICRzZWxlY3RFbC5maW5kKCc6c2VsZWN0ZWQnKSB8fCBudWxsO1xuICAgICAgICBpZiAoJHNlbGVjdGVkT3B0aW9uID09PSBudWxsIHx8ICEkc2VsZWN0ZWRPcHRpb24ubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvLyBHZXQgdGhlIHRheG9ub215XG4gICAgICAgIGxldCB0YXhvbm9teSA9ICRzZWxlY3RlZE9wdGlvbi5kYXRhKCd0YXhvbm9teScpIHx8IG51bGw7XG4gICAgICAgIC8vIEZpbmQgdGhlIGhpZGRlbiB0YXhvbm9teSBpbnB1dCBhbmQgc2V0IGl0cyB2YWx1ZSBhcyB0aGUgc2VsZWN0ZWQgY2F0ZWdvcnkncyB0YXhvbm9teVxuICAgICAgICAkc2VsZWN0RWwuY2xvc2VzdCgnLmlucHV0LWNvbnRhaW5lcicpLmZpbmQoJ2lucHV0LmNhdGVnb3J5LXRheG9ub215JykudmFsKHRheG9ub215KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyB2aXNpYmlsaXR5IG9mIHVubW9kaWZpZWQgcmVzdWx0c1xuICAgICAqIEBwYXJhbSBlXG4gICAgICovXG4gICAgb25DbGlja1NlZVVubW9kaWZpZWRSZXN1bHRzKGUpIHtcbiAgICAgICAgbGV0ICRzZWxmID0gJChlLnRhcmdldCk7XG4gICAgICAgIGxldCAkdW5tb2RpZmllZFJlc3VsdHMgPSAkc2VsZi5wYXJlbnQoKS5maW5kKCd1bCcpLmZpcnN0KCk7XG4gICAgICAgIGlmICgkdW5tb2RpZmllZFJlc3VsdHMuaGFzQ2xhc3MoJ2hpZGRlbicpKSB7XG4gICAgICAgICAgICAkdW5tb2RpZmllZFJlc3VsdHMucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJHVubW9kaWZpZWRSZXN1bHRzLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBY3RpdmF0ZXMgdGhlIHRhYiB0aGF0IHdhcyBhY3RpdmUgYmVmb3JlIHNhdmluZyB0aGUgc2V0dGluZ3NcbiAgICAgKi9cbiAgICBhY3RpdmF0ZVByZXZpb3VzbHlBY3RpdmVUYWIoKSB7XG4gICAgICAgIGxldCAkaW5wdXQgPSAkKHRoaXMucHN2LnNlbGVjdG9ySW5wdXRVUkxIYXNoKTtcbiAgICAgICAgaWYgKCEkaW5wdXQubGVuZ3RoIHx8ICEkaW5wdXQuZmlyc3QoKS52YWwoKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgbGV0IHZhbHVlcyA9ICRpbnB1dC5maXJzdCgpLnZhbCgpLnNwbGl0KFwifFwiKTtcbiAgICAgICAgaWYgKHZhbHVlcy5sZW5ndGggPCAyKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvLyBMYXN0IGluZGV4IHN0b3JlcyB0aGUgc2Nyb2xsIHBvc2l0aW9uXG4gICAgICAgIGxldCBzY3JvbGxQb3MgPSB2YWx1ZXNbdmFsdWVzLmxlbmd0aCAtIDFdO1xuICAgICAgICAvLyBSZW1vdmUgdGhlIHNjcm9sbCBwb3NpdGlvbiBmcm9tIFVSTCBoYXNoXG4gICAgICAgIHZhbHVlcy5zcGxpY2UodmFsdWVzLmxlbmd0aCAtIDEsIDEpO1xuICAgICAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgdmFsdWVzLmpvaW4oXCJ8XCIpKTtcbiAgICAgICAgLy8gQWN0aXZhdGUgdGhlIHRhYiBhbmQgbW92ZSB0aGUgcGFnZSB0byB0aGUgcHJldmlvdXMgc2Nyb2xsIHBvc2l0aW9uXG4gICAgICAgIHRoaXMuaGFuZGxlVVJMSGFzaCgpO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID0gc2Nyb2xsUG9zO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTYXZlcyB0aGUgc2V0dGluZ3MgdmlhIEFKQVhcbiAgICAgKiBAcGFyYW0gZVxuICAgICAqL1xuICAgIHF1aWNrU2F2ZShlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLy8gQ2hlY2sgaWYgaW1wb3J0IG9wdGlvbiBoYXMgdmFsdWVzLiBJZiBzbywgc2F2aW5nIHZpYSBBSkFYIGlzIG5vdCBsb2dpY2FsIHNpbmNlIHRoZSBwYWdlIG5lZWRzIHRvIGJlIHJlZnJlc2hlZFxuICAgICAgICAvLyB0byBzZWUgdXBkYXRlZCBpbnB1dHMuIEluIHRoYXQgY2FzZSwgY2xpY2sgc3VibWl0IGJ1dHRvbi5cbiAgICAgICAgbGV0ICRpbXBvcnRUZXh0QXJlYSA9ICQoJyNfcG9zdF9pbXBvcnRfc2V0dGluZ3MnKSB8fCBudWxsO1xuICAgICAgICBpZiAoJGltcG9ydFRleHRBcmVhICE9PSBudWxsICYmICRpbXBvcnRUZXh0QXJlYS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCB2YWwgPSAkaW1wb3J0VGV4dEFyZWEudmFsKCkgfHwgbnVsbDtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IG51bGwgJiYgdmFsLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMucHN2LiRmb3JtLmZpbmQoJ2lucHV0W3R5cGU9XCJzdWJtaXRcIl0nKS50cmlnZ2VyKFwiY2xpY2tcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCAkYnV0dG9uID0gJCh0aGlzLnBzdi5zZWxlY3RvclF1aWNrU2F2ZUJ1dHRvbik7XG4gICAgICAgIGlmICgkYnV0dG9uLmxlbmd0aCA+IDApXG4gICAgICAgICAgICAkYnV0dG9uID0gJGJ1dHRvbi5maXJzdCgpO1xuICAgICAgICAvLyBTdG9wIGlmIHRoZXJlIGlzIGEgc2F2aW5nIHByb2Nlc3MgZ29pbmcgb24uXG4gICAgICAgIGlmICgkYnV0dG9uLmhhc0NsYXNzKCdsb2FkaW5nJykpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIC8vIEdldCB0aGUgcG9zdCBJRFxuICAgICAgICBsZXQgcG9zdElkID0gJGJ1dHRvbi5kYXRhKCdwb3N0LWlkJykgfHwgbnVsbDtcbiAgICAgICAgLy8gSWYgdGhlIHBvc3QgSUQgZG9lcyBub3QgZXhpc3QsIG5vdGlmeSB0aGUgdXNlciBhbmQgc3RvcC5cbiAgICAgICAgaWYgKHBvc3RJZCA9PT0gbnVsbCB8fCAhcG9zdElkKSB7XG4gICAgICAgICAgICB0aGlzLm5vdGlmaWVyLm5vdGlmeVJlZ3VsYXIoJGJ1dHRvbiwgd2luZG93LndwY2MucG9zdF9pZF9ub3RfZm91bmQsIE5vdGlmaWNhdGlvblR5cGUuRVJST1IsIE5vdGlmaWNhdGlvblBvc2l0aW9uLkxFRlQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIEZpcnN0LCBkbyB0aGUgdGhpbmdzIHRoYXQgc2hvdWxkIGJlIGRvbmUgYmVmb3JlIHRoZSBmb3JtIGlzIHN1Ym1pdHRlZC5cbiAgICAgICAgaWYgKCF0aGlzLmJlZm9yZUZvcm1TdWJtaXQoZSkpIHtcbiAgICAgICAgICAgIC8vIFNjcm9sbCB0byB0b3Agc28gdGhhdCB0aGUgdXNlciBjYW4gc2VlIHRoZSBlcnJvcnNcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLmZpbmQoJ2h0bWwsIGJvZHknKS5zdG9wKCkuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAyMFxuICAgICAgICAgICAgfSwgNTAwLCAnc3dpbmcnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2VyaWFsaXplZEZvcm1WYWx1ZXMgPSB0aGlzLmdldEZvcm1WYWx1ZXNTZXJpYWxpemVkKCk7XG4gICAgICAgIC8vIElmIHNlcmlhbGl6ZWQgdmFsdWVzIGRvIG5vdCBleGlzdCwgbm90aWZ5IHRoZSB1c2VyIGFuZCBzdG9wLlxuICAgICAgICBpZiAoc2VyaWFsaXplZEZvcm1WYWx1ZXMgPT09IG51bGwgfHwgIXNlcmlhbGl6ZWRGb3JtVmFsdWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5ub3RpZmllci5ub3RpZnlSZWd1bGFyKCRidXR0b24sIHdpbmRvdy53cGNjLnNldHRpbmdzX25vdF9yZXRyaWV2ZWQsIE5vdGlmaWNhdGlvblR5cGUuRVJST1IsIE5vdGlmaWNhdGlvblBvc2l0aW9uLkxFRlQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNldCB0aGUgYnV0dG9uIGxvYWRpbmdcbiAgICAgICAgbGV0IHN1Y2Nlc3NDbGFzc2VzID0gJ2ZsaXAnO1xuICAgICAgICBsZXQgZXJyb3JDbGFzc2VzID0gJ3NoYWtlJztcbiAgICAgICAgbGV0IGxvYWRpbmdDbGFzc2VzID0gJ2JvdW5jZSBpbmZpbml0ZSBsb2FkaW5nJztcbiAgICAgICAgJGJ1dHRvblxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKHN1Y2Nlc3NDbGFzc2VzKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKGVycm9yQ2xhc3NlcylcbiAgICAgICAgICAgIC5hZGRDbGFzcyhsb2FkaW5nQ2xhc3Nlcyk7XG4gICAgICAgIC8vIFNhdmUgdGhlIGZvcm1cbiAgICAgICAgJC5wb3N0KHdpbmRvdy5hamF4dXJsLCB7XG4gICAgICAgICAgICB3Y2Nfbm9uY2U6IHRoaXMucHN2LiR3Y2NOb25jZS52YWwoKSxcbiAgICAgICAgICAgIGFjdGlvbjogd2luZG93LnBhZ2VBY3Rpb25LZXksXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgY21kOiBcInNhdmVTaXRlU2V0dGluZ3NcIixcbiAgICAgICAgICAgICAgICBwb3N0SWQ6IHBvc3RJZCxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczogc2VyaWFsaXplZEZvcm1WYWx1ZXMsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuZG9uZSgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGxldCBzdWNjZXNzID0gcmVzcG9uc2Uuc3VjY2VzcztcbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gcmVzcG9uc2UubWVzc2FnZTtcbiAgICAgICAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgJGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MobG9hZGluZ0NsYXNzZXMpXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhzdWNjZXNzQ2xhc3Nlcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZmllci5ub3RpZnlSZWd1bGFyKCRidXR0b24sIHdpbmRvdy53cGNjLnNldHRpbmdzX3NhdmVkLCBOb3RpZmljYXRpb25UeXBlLlNVQ0NFU1MsIE5vdGlmaWNhdGlvblBvc2l0aW9uLkxFRlQpO1xuICAgICAgICAgICAgICAgIC8vIFNldCB0aGUgZXhwb3J0IG9wdGlvbidzIHZhbHVlXG4gICAgICAgICAgICAgICAgbGV0IHNldHRpbmdzRm9yRXhwb3J0ID0gcmVzcG9uc2Uuc2V0dGluZ3NGb3JFeHBvcnQgfHwgbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3NGb3JFeHBvcnQgIT09IG51bGwgJiYgc2V0dGluZ3NGb3JFeHBvcnQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCAkZXhwb3J0VGV4dEFyZWEgPSAkKHRoaXMucHN2LnNlbGVjdG9yRXhwb3J0U2V0dGluZ3NUZXh0QXJlYSkgfHwgbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRleHBvcnRUZXh0QXJlYSAhPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICRleHBvcnRUZXh0QXJlYS52YWwoc2V0dGluZ3NGb3JFeHBvcnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE5vdGlmeSB0aGUgdXNlclxuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpZXIubm90aWZ5UmVndWxhcigkYnV0dG9uLCBtZXNzYWdlLCBOb3RpZmljYXRpb25UeXBlLkVSUk9SLCBOb3RpZmljYXRpb25Qb3NpdGlvbi5MRUZUKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5mYWlsKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgJGJ1dHRvbi5yZW1vdmVDbGFzcyhsb2FkaW5nQ2xhc3NlcykuYWRkQ2xhc3MoZXJyb3JDbGFzc2VzKTtcbiAgICAgICAgICAgIC8vIE5vdGlmeSB0aGUgdXNlclxuICAgICAgICAgICAgdGhpcy5ub3RpZmllci5ub3RpZnlSZWd1bGFyKCRidXR0b24sIHdpbmRvdy53cGNjLmFuX2Vycm9yX29jY3VycmVkLCBOb3RpZmljYXRpb25UeXBlLkVSUk9SLCBOb3RpZmljYXRpb25Qb3NpdGlvbi5MRUZUKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xuICAgICAgICAgICAgJGJ1dHRvbi5yZW1vdmVDbGFzcyhsb2FkaW5nQ2xhc3Nlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIGZvcm0gc3VibWlzc2lvblxuICAgICAqIEBwYXJhbSBlXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgZm9ybSBpcyB2YWxpZCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIG9uU3VibWl0Rm9ybShlKSB7XG4gICAgICAgIHRoaXMuYmVmb3JlRm9ybVN1Ym1pdChlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBzb21lIHRoaW5ncyBiZWZvcmUgdGhlIGZvcm0gaXMgc3VibWl0dGVkXG4gICAgICogQHBhcmFtIGVcbiAgICAgKi9cbiAgICBiZWZvcmVGb3JtU3VibWl0KGUpIHtcbiAgICAgICAgbGV0IGlzVmFsaWQgPSB0aGlzLnZhbGlkYXRlRm9ybShlKTtcbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgYW4gb3B0aW9uQm94LCBtYWtlIHN1cmUgaXQgaXMgY2xvc2VkIHRvIHNhdmUgaXRzIHN0YXRlLlxuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdy5vcHRpb25zQm94ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgd2luZG93Lm9wdGlvbnNCb3guY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBZGQgY3VycmVudCBzY3JvbGwgcG9zaXRpb24gdG8gaGlkZGVuIGFjdGl2ZSB0YWIgaW5wdXQncyB2YWx1ZVxuICAgICAgICBsZXQgJGhpZGRlbkFjdGl2ZVRhYklucHV0ID0gJCh0aGlzLnBzdi5zZWxlY3RvcklucHV0VVJMSGFzaCk7XG4gICAgICAgIGlmICgkaGlkZGVuQWN0aXZlVGFiSW5wdXQubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBTdG9yZSBjdXJyZW50IHdpbmRvdyBoYXNoIGluIGEgaGlkZGVuIGlucHV0LiBXZSB3aWxsIHVzZSB0aGUgaGlkZGVuIGlucHV0IHZhbHVlIHRvIHJlc3RvcmUgcGFnZSdzIHN0YXRlXG4gICAgICAgICAgICAvLyB3aGVuIHRoZSB1c2VyIGNvbWVzIGJhY2sgdG8gdGhlIHBhZ2UgYWZ0ZXIgc2F2aW5nIHRoZSBzZXR0aW5ncy5cbiAgICAgICAgICAgICRoaWRkZW5BY3RpdmVUYWJJbnB1dC52YWwod2luZG93LmxvY2F0aW9uLmhhc2ggKyBcInxcIiArIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3ApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc1ZhbGlkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZSB0aGUgZm9ybVxuICAgICAqIEBwYXJhbSBlIFRoZSBldmVudFxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIGZvcm0gaXMgdmFsaWQuIE90aGVyd2lzZSwgZmFsc2UuXG4gICAgICovXG4gICAgdmFsaWRhdGVGb3JtKGUpIHtcbiAgICAgICAgLy8gSWYgdGhlIGltcG9ydCB0ZXh0YXJlYSBoYXMgYSB2YWx1ZSwgZG8gbm90IHZhbGlkYXRlLlxuICAgICAgICBsZXQgJGltcG9ydElucHV0ID0gJCh0aGlzLnBzdi5zZWxlY3RvcklucHV0SW1wb3J0KTtcbiAgICAgICAgaWYgKCRpbXBvcnRJbnB1dC5sZW5ndGggJiYgJGltcG9ydElucHV0LnZhbCgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRXJyb3JzRnJvbUFsbFRhYnMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgJGNhdGVnb3J5TWFwQ29udGFpbmVyID0gJCh0aGlzLnBzdi5zZWxlY3RvckNhdGVnb3J5TWFwKSwgJGlucHV0TWFpblVybCA9ICQoXCIjX21haW5fcGFnZV91cmxcIiksICRwYXNzd29yZHNDb250YWluZXIgPSAkKHRoaXMucHN2LnNlbGVjdG9ySW5wdXRDb250YWluZXJQYXNzd29yZHMpLCBlcnJvckVsZW1lbnRzID0gW107XG4gICAgICAgIHRoaXMucHN2LiRlcnJvckFsZXJ0LmFkZENsYXNzKFwiaGlkZGVuXCIpO1xuICAgICAgICBsZXQgaGFzRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZW1vdmVFcnJvcnNGcm9tQWxsVGFicygpO1xuICAgICAgICAvLyBWYWxpZGF0ZSBjYXRlZ29yeSBtYXBcbiAgICAgICAgaWYgKCRjYXRlZ29yeU1hcENvbnRhaW5lci5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGFueSBVUkwgaXMgYWRkZWQgbW9yZSB0aGFuIG9uY2VcbiAgICAgICAgICAgIGxldCB1cmxzID0gW107XG4gICAgICAgICAgICBsZXQgZXJyb3JDYXRlZ29yeU1hcCA9IGZhbHNlO1xuICAgICAgICAgICAgJGNhdGVnb3J5TWFwQ29udGFpbmVyLmZpbmQoJy5pbnB1dC1ncm91cCcpLmVhY2goKGksIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgJChlbCkucmVtb3ZlQ2xhc3ModGhpcy5wc3YuY2xzSGFzRXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkY2F0ZWdvcnlNYXBDb250YWluZXIuZmluZChcImlucHV0W3R5cGU9dGV4dF1cIikuZWFjaCgoaSwgZWwpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgJHNlbGYgPSAkKGVsKTtcbiAgICAgICAgICAgICAgICBpZiAodXJscy5pbmRleE9mKCRzZWxmLnZhbCgpKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB1cmxzLnB1c2goJHNlbGYudmFsKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJHNlbGYuY2xvc2VzdChcIi5pbnB1dC1ncm91cFwiKS5hZGRDbGFzcyh0aGlzLnBzdi5jbHNIYXNFcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZXJyb3JDYXRlZ29yeU1hcClcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yQ2F0ZWdvcnlNYXAgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBhbnkgY2F0ZWdvcnkgbWFwIFVSTCBpcyBlbXB0eVxuICAgICAgICAgICAgICAgIGlmICghJHNlbGYudmFsKCkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICRzZWxmLmNsb3Nlc3QoXCIuaW5wdXQtZ3JvdXBcIikuYWRkQ2xhc3ModGhpcy5wc3YuY2xzSGFzRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWVycm9yQ2F0ZWdvcnlNYXApXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvckNhdGVnb3J5TWFwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChlcnJvckNhdGVnb3J5TWFwKSB7XG4gICAgICAgICAgICAgICAgaGFzRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vIEFkZCB0aGlzIGFtb25nIGVycm9yIGVsZW1lbnRzLlxuICAgICAgICAgICAgICAgIGVycm9yRWxlbWVudHMucHVzaCgkY2F0ZWdvcnlNYXBDb250YWluZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFZhbGlkYXRlIG1haW4gdXJsXG4gICAgICAgIGlmICgkaW5wdXRNYWluVXJsLmxlbmd0aCkge1xuICAgICAgICAgICAgJGlucHV0TWFpblVybC5jbG9zZXN0KFwiLmlucHV0LWdyb3VwXCIpLnJlbW92ZUNsYXNzKHRoaXMucHN2LmNsc0hhc0Vycm9yKTtcbiAgICAgICAgICAgIGlmICghJGlucHV0TWFpblVybC52YWwoKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBoYXNFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgJGlucHV0TWFpblVybC5jbG9zZXN0KFwiLmlucHV0LWdyb3VwXCIpLmFkZENsYXNzKHRoaXMucHN2LmNsc0hhc0Vycm9yKTtcbiAgICAgICAgICAgICAgICAvLyBBZGQgdGhpcyBhbW9uZyBlcnJvciBlbGVtZW50cy5cbiAgICAgICAgICAgICAgICBlcnJvckVsZW1lbnRzLnB1c2goJGlucHV0TWFpblVybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gVmFsaWRhdGUgcGFzc3dvcmRzXG4gICAgICAgIGlmICgkcGFzc3dvcmRzQ29udGFpbmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IGNiQ2hhbmdlUGFzc3dvcmQgPSAkKFwiI193cGNjX2NoYW5nZV9wYXNzd29yZFwiKTtcbiAgICAgICAgICAgIC8vIElmIHRoZSBjaGVja2JveCByZXF1aXJlZCBmb3IgY2hhbmdpbmcgdGhlIHBhc3N3b3JkIGlzIGNoZWNrZWQsIHZhbGlkYXRlIHRoZSBwdyBmaWVsZHMuXG4gICAgICAgICAgICBpZiAoY2JDaGFuZ2VQYXNzd29yZCAhPSB1bmRlZmluZWQgJiYgY2JDaGFuZ2VQYXNzd29yZFswXS5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgJHBhc3N3b3Jkc0NvbnRhaW5lci5lYWNoKChpLCBlbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkKGVsKS5jbG9zZXN0KFwiLmlucHV0LWdyb3VwXCIpLnJlbW92ZUNsYXNzKHRoaXMucHN2LmNsc0hhc0Vycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBsZXQgcGFzc3dvcmRPbGQgPSBudWxsLCBwYXNzd29yZDEgPSBudWxsLCBwYXNzd29yZDIgPSBudWxsO1xuICAgICAgICAgICAgICAgICRwYXNzd29yZHNDb250YWluZXIuZmluZChcImlucHV0W3R5cGU9cGFzc3dvcmRdXCIpLmVhY2goKGksIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCAkc2VsZiA9ICQoZWwpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFzc3dvcmRPbGQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmRPbGQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBhc3N3b3JkMSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDEgPSAkc2VsZi52YWwoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChwYXNzd29yZDIgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQyID0gJHNlbGYudmFsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFzc3dvcmQxICE9IHBhc3N3b3JkMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzZWxmLmNsb3Nlc3QoXCIuaW5wdXQtZ3JvdXBcIikuYWRkQ2xhc3ModGhpcy5wc3YuY2xzSGFzRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkMSA9IHBhc3N3b3JkMiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFkZCB0aGlzIGFtb25nIGVycm9yIGVsZW1lbnRzLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yRWxlbWVudHMucHVzaCgkc2VsZik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzRXJyb3IpIHtcbiAgICAgICAgICAgIC8vIFRhYiBlcnJvcnMgYXJlIG5vdCBzaG93biBmb3Igc29tZSByZWFzb24uIEhvd2V2ZXIsIHNldHRpbmcgdGhlbSB3aXRoIDEgbXMgZGVsYXkgd29ya3MgT0suXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBTaG93IHRhYiBlcnJvcnNcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIGVycm9yRWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlcnJvckVsZW1lbnRzLmhhc093blByb3BlcnR5KGkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VGFiRXJyb3IoZXJyb3JFbGVtZW50c1tpXSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgICB0aGlzLnBzdi4kZXJyb3JBbGVydC5yZW1vdmVDbGFzcyhcImhpZGRlblwiKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IGZvcm0gdmFsdWVzIGFzIGEgc2VyaWFsaXplZCBzdHJpbmcuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0Rm9ybVZhbHVlc1NlcmlhbGl6ZWQoKSB7XG4gICAgICAgIC8vIFRpbnlNQ0UgZWRpdG9ycycgdmFsdWVzIGFyZSBub3Qgc2VyaWFsaXplZC4gR2V0IHRoZWlyIHZhbHVlcyBhbmQgcHV0IHRoZW0gaW50byB0aGVpciByZXNwZWN0aXZlIHRleHRhcmVhIGZvcm1cbiAgICAgICAgLy8gaXRlbXMuXG4gICAgICAgIGxldCB0aW55bWNlSW1wbCA9ICgodHlwZW9mIHdpbmRvdy50aW55bWNlID09PSBcImZ1bmN0aW9uXCIpID8gd2luZG93LnRpbnltY2UgOiB3aW5kb3cudGlueU1DRSkgfHwgbnVsbDtcbiAgICAgICAgaWYgKHRpbnltY2VJbXBsICE9PSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgJGVsLCAkZWRpdG9yV3JhcHBlciwgbmFtZSwgY29udGVudCwgZWRpdG9yO1xuICAgICAgICAgICAgJCgndGV4dGFyZWEud3AtZWRpdG9yLWFyZWEnKS5lYWNoKChpLCBlbCkgPT4ge1xuICAgICAgICAgICAgICAgICRlbCA9ICQoZWwpO1xuICAgICAgICAgICAgICAgIC8vIEZpbmQgdGhlIGNsb3Nlc3QgVGlueU1DRSB3cmFwcGVyIHRvIGdldCBpZiB0aGUgVGlueU1DRSBlZGl0b3IgaXMgYWN0aXZlLiBXaGVuIHRoZSBIVE1MIGVkaXRvciBpcyBhY3RpdmUsXG4gICAgICAgICAgICAgICAgLy8gd2hpY2ggaXMgYWN0aXZhdGVkIGJ5IGNsaWNraW5nIFwiVGV4dFwiIGJ1dHRvbiwgdGhlIHVzZXIgZGlyZWN0bHkgZW50ZXJzIHRoZSBjb2RlIHRvIHRoZSB0ZXh0YXJlYS4gSW5cbiAgICAgICAgICAgICAgICAvLyB0aGF0IGNhc2UsIHdlIGRvIG5vdCBuZWVkIHRvIGdldCB0aGUgY29udGVudCBmcm9tIHRoZSBlZGl0b3IuIEluIGZhY3QsIHdoZW4gd2UgZG8gdGhhdCwgdGhlIGVkaXRvcidzXG4gICAgICAgICAgICAgICAgLy8gcHJldmlvdXMgY29udGVudCBpcyByZXRyaWV2ZWQuIEluIG90aGVyIHdvcmRzLCB0aGUgbGFzdCBjaGFuZ2VzIG1hZGUgYnkgdGhlIHVzZXIgdG8gdGhlIHRleHRhcmVhIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAvLyBhcmUgbm90IHRoZXJlLiBTbywgd2hlbiB0aGUgSFRNTCBlZGl0b3IgaXMgYWN0aXZlLCB3ZSBtdXN0IGRvIG5vdGhpbmcuXG4gICAgICAgICAgICAgICAgJGVkaXRvcldyYXBwZXIgPSAkZWwuY2xvc2VzdCgnLndwLWVkaXRvci13cmFwJyk7XG4gICAgICAgICAgICAgICAgLy8gVGhlIGVkaXRvciB3cmFwcGVyIGlzIGFkZGVkIFwiaHRtbC1hY3RpdmVcIiBjbGFzcyB3aGVuIHRoZSBIVE1MIGVkaXRvciBpcyBhY3RpdmUuXG4gICAgICAgICAgICAgICAgaWYgKCRlZGl0b3JXcmFwcGVyLmhhc0NsYXNzKCdodG1sLWFjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIGRvIG5vdCBuZWVkIHRvIGdldCB0aGUgY29udGVudCBmcm9tIHRoZSBlZGl0b3IuIFRoZSBjb250ZW50IGlzIGFscmVhZHkgaW4gdGhlIHRleHRhcmVhLlxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5hbWUgPSAkZWwuYXR0cignbmFtZScpO1xuICAgICAgICAgICAgICAgIGVkaXRvciA9IHRpbnltY2VJbXBsLmdldChuYW1lKSB8fCBudWxsO1xuICAgICAgICAgICAgICAgIGlmIChlZGl0b3IgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gZWRpdG9yLmdldENvbnRlbnQoKTtcbiAgICAgICAgICAgICAgICAkZWwudmFsKGNvbnRlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2VyaWFsaXplIHRoZSBmb3JtXG4gICAgICAgIHJldHVybiB0aGlzLnBzdi4kZm9ybS5zZXJpYWxpemUoKSB8fCBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgZXJyb3IgaW5kaWNhdG9yIGZvciBhIHRhYlxuICAgICAqIEBwYXJhbSAkZWxlbWVudCBUaGUgZWxlbWVudCB3aGljaCBjYXVzZWQgYW4gZXJyb3JcbiAgICAgKiBAcGFyYW0gaGFzRXJyb3IgdHJ1ZSBpZiB0aGUgdGFiIHNob3VsZCBoYXZlIGFuIGVycm9yIG1hcmssIGZhbHNlIG90aGVyd2lzZVxuICAgICAqL1xuICAgIHNldFRhYkVycm9yKCRlbGVtZW50LCBoYXNFcnJvcikge1xuICAgICAgICBsZXQgdGFiSWQgPSAkZWxlbWVudC5jbG9zZXN0KCcudGFiJykuYXR0cihcImlkXCIpO1xuICAgICAgICBsZXQgJHRhYiA9IHRoaXMucHN2LiRjb250YWluZXJUYWJzLmZpbmQoXCJbZGF0YS10YWI9JyNcIiArIHRhYklkICsgXCInXVwiKTtcbiAgICAgICAgaWYgKCFoYXNFcnJvcikge1xuICAgICAgICAgICAgJHRhYi5yZW1vdmVDbGFzcyh0aGlzLnBzdi5jbHNIYXNFcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkdGFiLmFkZENsYXNzKHRoaXMucHN2LmNsc0hhc0Vycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGVycm9yIGNsYXNzZXMgZnJvbSBhbGwgdGFic1xuICAgICAqL1xuICAgIHJlbW92ZUVycm9yc0Zyb21BbGxUYWJzKCkge1xuICAgICAgICB0aGlzLnBzdi4kY29udGFpbmVyVGFicy5maW5kKCcubmF2LXRhYicpLmVhY2goKGksIGVsKSA9PiB7XG4gICAgICAgICAgICAkKGVsKS5yZW1vdmVDbGFzcyh0aGlzLnBzdi5jbHNIYXNFcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIGZvY3VzIGV2ZW50cyBvZiByZWFkLW9ubHkgdGV4dGFyZWFzXG4gICAgICogQHBhcmFtIGVcbiAgICAgKi9cbiAgICBvbkZvY3VzUmVhZG9ubHlUZXh0QXJlYShlKSB7XG4gICAgICAgIGxldCAkc2VsZiA9ICQoZS50YXJnZXQpO1xuICAgICAgICAkc2VsZi5zZWxlY3QoKTtcbiAgICAgICAgLy8gV29yayBhcm91bmQgQ2hyb21lJ3MgbGl0dGxlIHByb2JsZW1cbiAgICAgICAgJHNlbGYubW91c2V1cChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBQcmV2ZW50IGZ1cnRoZXIgbW91c2V1cCBpbnRlcnZlbnRpb25cbiAgICAgICAgICAgICRzZWxmLnVuYmluZChcIm1vdXNldXBcIik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQcmVwYXJlcyBzb3J0YWJsZSBlbGVtZW50cy4gRGlzYWJsZXMgc29ydGluZyAoYmVpbmcgbW92ZWQgYXJvdW5kKSBvZiB0aGUgbWV0YSBib3hlcyBoYXZpbmcgbm90LXNvcnRhYmxlIGNsYXNzLlxuICAgICAqIE1ha2VzIFwibXVsdGlwbGVcIiBpbnB1dHMgc29ydGFibGVcbiAgICAgKiBAc2VlIGh0dHA6Ly93b3JkcHJlc3Muc3RhY2tleGNoYW5nZS5jb20vYS83MzgwNi84NzE3M1xuICAgICAqL1xuICAgIHByZXBhcmVTb3J0YWJsZXMoKSB7XG4gICAgICAgICQoXCIubWV0YS1ib3gtc29ydGFibGVzXCIpXG4gICAgICAgICAgICAvLyBkZWZpbmUgdGhlIGNhbmNlbCBvcHRpb24gb2Ygc29ydGFibGUgdG8gaWdub3JlIHNvcnRhYmxlIGVsZW1lbnRcbiAgICAgICAgICAgIC8vIGZvciBib3hlcyB3aXRoICcubm90LXNvcnRhYmxlJyBjc3MgY2xhc3NcbiAgICAgICAgICAgIC5zb3J0YWJsZSgnb3B0aW9uJywgJ2NhbmNlbCcsICcubm90LXNvcnRhYmxlIC5obmRsZSwgOmlucHV0LCBidXR0b24nKVxuICAgICAgICAgICAgLy8gYW5kIHRoZW4gcmVmcmVzaCB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgIC5zb3J0YWJsZSgncmVmcmVzaCcpO1xuICAgICAgICAvLyBNYWtlIFwibXVsdGlwbGVcIiBpbnB1dHMgc29ydGFibGVcbiAgICAgICAgJChcIi5pbnB1dHNcIikuc29ydGFibGUoe1xuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwic29ydGFibGUtcGxhY2Vob2xkZXJcIixcbiAgICAgICAgICAgIGhhbmRsZTogJy53Y2Mtc29ydCcsXG4gICAgICAgICAgICBpdGVtczogJyA+IC5pbnB1dC1ncm91cCcsXG4gICAgICAgICAgICBheGlzOiBcInlcIixcbiAgICAgICAgICAgIGN1cnNvcjogXCJtb3ZlXCIsXG4gICAgICAgICAgICBzdGFydDogZnVuY3Rpb24gKGUsIHVpKSB7XG4gICAgICAgICAgICAgICAgLy8gTWFrZSBwbGFjZWhvbGRlcidzIGhlaWdodCB0aGUgc2FtZSBhcyB0aGUgY3VycmVudCBpdGVtJ3MgaGVpZ2h0XG4gICAgICAgICAgICAgICAgdWkucGxhY2Vob2xkZXIuaGVpZ2h0KHVpLmhlbHBlci5vdXRlckhlaWdodCgpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChlLCB1aSkge1xuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBkYXRhIGtleXMgb2YgdGhlIGlucHV0cyB3aGVuIGFuIGlucHV0IGdyb3VwJ3MgcG9zaXRpb24gaXMgY2hhbmdlZC4gVGhpcyBpcyByZXF1aXJlZCB0byBrZWVwXG4gICAgICAgICAgICAgICAgLy8gdGhlIG9yZGVyIG9mIHRoZSBpbnB1dCBncm91cHMgYWZ0ZXIgc2F2aW5nIHRoZSBzZXR0aW5ncy5cbiAgICAgICAgICAgICAgICBsZXQgJHNlbGYsICRzZWxmSW5wdXQsIGlkLCBuYW1lO1xuICAgICAgICAgICAgICAgIGxldCByZWdleCA9IG5ldyBSZWdFeHAoXCJcXFxcW1swLTldK1xcXFxdXCIsIFwiZ1wiKTtcbiAgICAgICAgICAgICAgICAvLyBGb3IgZWFjaCBpbnB1dCBncm91cCB0aGF0IGlzIGluIHRoZSBzYW1lIGNvbnRhaW5lciBhcyB0aGUgaXRlbSB0aGF0IGhhcyBqdXN0IGJlZW4gbW92ZWRcbiAgICAgICAgICAgICAgICB1aS5pdGVtLmNsb3Nlc3QoJy5pbnB1dHMnKS5maW5kKCc+IC5pbnB1dC1ncm91cCcpLmVhY2goZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICRzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBpbnB1dCBncm91cCdzIGRhdGEga2V5XG4gICAgICAgICAgICAgICAgICAgICRzZWxmLmRhdGEoXCJrZXlcIiwgaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAkc2VsZi5hdHRyKFwiZGF0YS1rZXlcIiwgaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIG5hbWUgYW5kIElEIG9mIGVhY2ggaW5wdXQgaW4gdGhpcyBpbnB1dCBncm91cFxuICAgICAgICAgICAgICAgICAgICAkc2VsZi5maW5kKCc6aW5wdXRbbmFtZV0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzZWxmSW5wdXQgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQgPSAkc2VsZklucHV0LmF0dHIoJ2lkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lID0gJHNlbGZJbnB1dC5hdHRyKCduYW1lJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmFtZSAhPT0gbnVsbCAmJiBuYW1lICE9PSB1bmRlZmluZWQgJiYgbmFtZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbmFtZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2VsZklucHV0LmF0dHIoJ25hbWUnLCBuYW1lLnJlcGxhY2UocmVnZXgsIFwiW1wiICsgaW5kZXggKyBcIl1cIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkICE9PSBudWxsICYmIGlkICE9PSB1bmRlZmluZWQgJiYgaWQgIT09ICd1bmRlZmluZWQnICYmIGlkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzZWxmSW5wdXQuYXR0cignaWQnLCBpZC5yZXBsYWNlKHJlZ2V4LCBcIltcIiArIGluZGV4ICsgXCJdXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIFwibG9hZC9jbGVhciBnZW5lcmFsIHNldHRpbmdzXCIgYnV0dG9uIGNsaWNrc1xuICAgICAqIEBwYXJhbSBlXG4gICAgICovXG4gICAgaGFuZGxlTG9hZENsZWFyR2VuZXJhbFNldHRpbmdzKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgJHNlbGYgPSAkKGUudGFyZ2V0KSwgaWQgPSAkc2VsZi5hdHRyKFwiaWRcIik7XG4gICAgICAgIC8vIERvIG5vdCBwcm9jZWVkIGlmIHRoaXMgaXMgY3VycmVudGx5IGxvYWRpbmcuXG4gICAgICAgIGlmICgkc2VsZi5oYXNDbGFzcyhcImxvYWRpbmdcIikpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICRzZWxmLmFkZENsYXNzKFwibG9hZGluZ1wiKTtcbiAgICAgICAgJC5wb3N0KHdpbmRvdy5hamF4dXJsLCB7XG4gICAgICAgICAgICB3Y2Nfbm9uY2U6IHRoaXMucHN2LiR3Y2NOb25jZS52YWwoKSxcbiAgICAgICAgICAgIGFjdGlvbjogd2luZG93LnBhZ2VBY3Rpb25LZXksXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgY21kOiAoXCIjXCIgKyBpZCkgPT0gdGhpcy5wc3Yuc2VsZWN0b3JDbGVhckdlbmVyYWxTZXR0aW5nc0J1dHRvbiA/IFwiY2xlYXJHZW5lcmFsU2V0dGluZ3NcIiA6IFwibG9hZEdlbmVyYWxTZXR0aW5nc1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuZG9uZSgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGxldCB2aWV3ID0gcmVzcG9uc2UudmlldztcbiAgICAgICAgICAgIC8vIFJlcGxhY2UgdGhlIGN1cnJlbnQgc2V0dGluZ3Mgd2l0aCB0aGUgb25lcyBpbiB0aGUgcmVzcG9uc2UuXG4gICAgICAgICAgICAvLyBUcmlnZ2VyICdjaGFuZ2UnIG9uIGNoZWNrYm94ZXMgc28gdGhhdCB0aGUgZGVwZW5kYW50cyBjYW4gYmUgc2hvd24gb3IgaGlkZGVuIGFjY29yZGluZ2x5LlxuICAgICAgICAgICAgJCh0aGlzLnBzdi5zZWxlY3RvclRhYkdlbmVyYWxTZXR0aW5ncykuaHRtbCh2aWV3KS5maW5kKFwiW3R5cGU9Y2hlY2tib3hdXCIpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmZhaWwoKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBsb2FkaW5nIGNsYXNzXG4gICAgICAgICAgICAkc2VsZi5yZW1vdmVDbGFzcyhcImxvYWRpbmdcIik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBcImNvcHkgdG8gY2xpcGJvYXJkXCIgaGFuZGxlcnNcbiAgICAgKi9cbiAgICBpbml0Q29weVRvQ2xpcGJvYXJkKCkge1xuICAgICAgICBsZXQgc2VsZWN0b3IgPSAnLmlucHV0LWJ1dHRvbi1jb250YWluZXIgPiBidXR0b24nO1xuICAgICAgICBDb3B5VG9DbGlwYm9hcmRIYW5kbGVyLmdldEluc3RhbmNlKCkuaW5pdEZvclNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBcInRvZ2dsZSBpbmZvIHRleHRzXCIgYnV0dG9uIGNsaWNrc1xuICAgICAqIEBwYXJhbSBlXG4gICAgICovXG4gICAgb25DbGlja1RvZ2dsZUluZm9UZXh0cyhlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLy8gRmluZCBhbGwgaW5mbyB0ZXh0cyBhbmQgc2hvdy9oaWRlXG4gICAgICAgIHRoaXMucHN2LiRjb250YWluZXJNZXRhQm94LmZpbmQoXCIuaW5mby10ZXh0XCIpLmVhY2goKGksIGVsKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wc3YuaW5mb1RleHRzSGlkZGVuKSB7XG4gICAgICAgICAgICAgICAgJChlbCkucmVtb3ZlQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKGVsKS5hZGRDbGFzcyhcImhpZGRlblwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucHN2LmluZm9UZXh0c0hpZGRlbiA9ICF0aGlzLnBzdi5pbmZvVGV4dHNIaWRkZW47XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgaW5mbyBidXR0b24gY2xpY2tzXG4gICAgICogQHBhcmFtIGVcbiAgICAgKi9cbiAgICBvbkNsaWNrSW5mb0J1dHRvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLy8gR2V0IHRoZSBjbG9zZXN0IGluZm8gYnV0dG9uLCBzaW5jZSBhbiBlbGVtZW50IGluc2lkZSB0aGUgaW5mbyBidXR0b24gbWlnaHQgdHJpZ2dlciB0aGlzIGV2ZW50XG4gICAgICAgIGxldCAkc2VsZiA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJy5pbmZvLWJ1dHRvbicpO1xuICAgICAgICAvLyBTaG93IGNsb3Nlc3QgaW5mbyB0ZXh0XG4gICAgICAgIGxldCAkaW5mb1RleHQgPSAkc2VsZi5wYXJlbnQoKS5maW5kKCcuaW5mby10ZXh0JykuZmlyc3QoKTtcbiAgICAgICAgaWYgKCRpbmZvVGV4dC5oYXNDbGFzcygnaGlkZGVuJykpIHtcbiAgICAgICAgICAgICRpbmZvVGV4dC5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkaW5mb1RleHQuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgdGFiIGNsaWNrIGV2ZW50c1xuICAgICAqIEBwYXJhbSBlXG4gICAgICovXG4gICAgb25DbGlja1RhYihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5hY3RpdmF0ZVRhYigkKGUudGFyZ2V0KS5kYXRhKFwidGFiXCIpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBjbGljayBldmVudHMgb2YgXCJsb2FkXCIgb3IgXCJyZWZyZXNoXCIgYnV0dG9uIGZvciB0cmFuc2xhdGlvbiBsYW5ndWFnZXNcbiAgICAgKiBAcGFyYW0gZVxuICAgICAqL1xuICAgIG9uTG9hZFJlZnJlc2hUcmFuc2xhdGlvbkxhbmd1YWdlcyhlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0ICRzZWxmID0gJChlLnRhcmdldCksIGRhdGEgPSAkc2VsZi5kYXRhKFwid2NjXCIpLCBzZXJ2aWNlVHlwZSA9IGRhdGFbXCJzZXJ2aWNlVHlwZVwiXSwgc2VsZWN0b3JzID0gZGF0YVtcInNlbGVjdG9yc1wiXSwgcmVxdWVzdFR5cGUgPSBkYXRhW1wicmVxdWVzdFR5cGVcIl0sIGFqYXhEYXRhID0ge307XG4gICAgICAgIC8vIElmIGl0IGlzIHN0aWxsIGxvYWRpbmcsIGRvIG5vdCB0cnkgdG8gbG9hZCBpdCB0d2ljZS5cbiAgICAgICAgaWYgKCRzZWxmLmhhc0NsYXNzKFwibG9hZGluZ1wiKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHNlbGVjdG9ycykge1xuICAgICAgICAgICAgaWYgKCFzZWxlY3RvcnMuaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGxldCBzZWxlY3RvciA9IHNlbGVjdG9yc1trZXldLCAkdGFyZ2V0RWwgPSAkKHNlbGVjdG9yKSwgdmFsID0gJHRhcmdldEVsLnZhbCgpO1xuICAgICAgICAgICAgLy8gSWYgdmFsdWUgb2YgdGhlIGVsZW1lbnQgZG9lcyBub3QgZXhpc3QsIG5vdGlmeSB0aGUgdXNlciBhbmQgc3RvcC5cbiAgICAgICAgICAgIGlmICghdmFsLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpZXIubm90aWZ5KCR0YXJnZXRFbCwgd2luZG93LndwY2MucmVxdWlyZWQpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFqYXhEYXRhW2tleV0gPSB2YWw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUHJlcGFyZSB0aGUgZGF0YSB0aGF0IHdpbGwgYmUgc2VudCB2aWEgYW4gQUpBWCByZXF1ZXN0XG4gICAgICAgIGxldCBwcmVwYXJlZEFqYXhEYXRhID0ge307XG4gICAgICAgIHByZXBhcmVkQWpheERhdGFbc2VydmljZVR5cGVdID0gYWpheERhdGE7XG4gICAgICAgIHByZXBhcmVkQWpheERhdGFbXCJyZXF1ZXN0VHlwZVwiXSA9IHJlcXVlc3RUeXBlO1xuICAgICAgICBwcmVwYXJlZEFqYXhEYXRhW1wiaXNPcHRpb25cIl0gPSAkKFwiLndjYy1nZW5lcmFsLXNldHRpbmdzXCIpLmxlbmd0aCA/IDEgOiAwO1xuICAgICAgICAvLyBBZGQgbG9hZGluZyBjbGFzcyB0byB0aGUgYnV0dG9uLlxuICAgICAgICAkc2VsZi5hZGRDbGFzcyhcImxvYWRpbmdcIik7XG4gICAgICAgIC8vIE1ha2UgdGhlIHJlcXVlc3RcbiAgICAgICAgJC5wb3N0KHdpbmRvdy5hamF4dXJsLCB7XG4gICAgICAgICAgICB3Y2Nfbm9uY2U6IHRoaXMucHN2LiR3Y2NOb25jZS52YWwoKSxcbiAgICAgICAgICAgIGFjdGlvbjogd2luZG93LnBhZ2VBY3Rpb25LZXksXG4gICAgICAgICAgICBkYXRhOiBwcmVwYXJlZEFqYXhEYXRhXG4gICAgICAgIH0pXG4gICAgICAgICAgICAuZG9uZSgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZSA9PSB1bmRlZmluZWQgfHwgIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnZpZXcgPT0gdW5kZWZpbmVkIHx8IChyZXNwb25zZS5lcnJvcnMgIT0gdW5kZWZpbmVkICYmIHJlc3BvbnNlLmVycm9ycy5sZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZmllci5ub3RpZnkoJHNlbGYsIHdpbmRvdy53cGNjLmFuX2Vycm9yX29jY3VycmVkKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnZpZXcgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNob3cgdGhlIGVycm9yc1xuICAgICAgICAgICAgICAgICAgICBsZXQgJHJlc3VsdENvbnRhaW5lciA9ICRzZWxmLmNsb3Nlc3QoXCJ0ZFwiKS5maW5kKFwiLnRlc3QtcmVzdWx0c1wiKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRjb250ZW50Q29udGFpbmVyID0gJHJlc3VsdENvbnRhaW5lci5maW5kKFwiLmNvbnRlbnRcIik7XG4gICAgICAgICAgICAgICAgICAgICRjb250ZW50Q29udGFpbmVyLmh0bWwocmVzcG9uc2Uudmlldyk7XG4gICAgICAgICAgICAgICAgICAgICRyZXN1bHRDb250YWluZXIucmVtb3ZlQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vbChyZXNwb25zZSk7XG4gICAgICAgICAgICAvLyBTaG93IHRoZSBzZWxlY3QgZWxlbWVudHMgd2l0aCB0aGUgbGFuZ3VhZ2VzXG4gICAgICAgICAgICBsZXQgJHZpZXdGcm9tID0gJChyZXNwb25zZS52aWV3LmZyb20pLCAkdmlld1RvID0gJChyZXNwb25zZS52aWV3LnRvKSwga2V5RnJvbSA9ICR2aWV3RnJvbS5maW5kKFwic2VsZWN0XCIpLmZpcnN0KCkuYXR0cihcIm5hbWVcIiksIGtleVRvID0gJHZpZXdUby5maW5kKFwic2VsZWN0XCIpLmZpcnN0KCkuYXR0cihcIm5hbWVcIik7XG4gICAgICAgICAgICAkKFwibGFiZWxbZm9yPSdcIiArIGtleUZyb20gKyBcIiddXCIpLmNsb3Nlc3QoXCJ0clwiKS5maW5kKFwidGQ6bnRoLWNoaWxkKDIpXCIpLmh0bWwocmVzcG9uc2Uudmlldy5mcm9tKTtcbiAgICAgICAgICAgICQoXCJsYWJlbFtmb3I9J1wiICsga2V5VG8gKyBcIiddXCIpLmNsb3Nlc3QoXCJ0clwiKS5maW5kKFwidGQ6bnRoLWNoaWxkKDIpXCIpLmh0bWwocmVzcG9uc2Uudmlldy50byk7XG4gICAgICAgICAgICAvLyBGbGFzaCB0aGUgYmFja2dyb3VuZHMgb2YgdGhlIHNlbGVjdCBlbGVtZW50cyB0byBpbmZvcm0gdGhlIHVzZXIgdGhhdCB0aGUgcmVxdWVzdCBoYXMgYmVlbiBzdWNjZXNzZnVsLlxuICAgICAgICAgICAgdGhpcy5mbGFzaEJhY2tncm91bmQoJChcIiNcIiArIGtleUZyb20pKTtcbiAgICAgICAgICAgIHRoaXMuZmxhc2hCYWNrZ3JvdW5kKCQoXCIjXCIgKyBrZXlUbykpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmZhaWwoKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAvLyBOb3RpZnkgdGhhdCB0aGUgcmVxdWVzdCBoYXMgZmFpbGVkLlxuICAgICAgICAgICAgdGhpcy5ub3RpZmllci5ub3RpZnkoJHNlbGYsIHdpbmRvdy53cGNjLmFuX2Vycm9yX29jY3VycmVkICsgXCI6IFwiICsgcmVzcG9uc2UucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGxvYWRpbmcgY2xhc3NcbiAgICAgICAgICAgICRzZWxmLnJlbW92ZUNsYXNzKFwibG9hZGluZ1wiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgdGhlIGV2ZW50IG9mIGNsaWNraW5nIFwiaGlkZVwiIGJ1dHRvbiBvZiB0aGUgdGVzdCByZXN1bHRzXG4gICAgICogQHBhcmFtIGVcbiAgICAgKi9cbiAgICBvbkNsaWNrSGlkZVRlc3RSZXN1bHRzKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAvLyBGaW5kIGNsb3Nlc3QgdGVzdCByZXN1bHRzXG4gICAgICAgIGxldCAkc2VsZiA9ICQoZS50YXJnZXQpO1xuICAgICAgICAvLyBIaWRlIGl0XG4gICAgICAgIGxldCAkcmVzdWx0Q29udGFpbmVyID0gJHNlbGYuY2xvc2VzdChcIi50ZXN0LXJlc3VsdHNcIik7XG4gICAgICAgICRyZXN1bHRDb250YWluZXIuYWRkQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICAgIC8vIFJlbW92ZSB0aGUgSFRNTFxuICAgICAgICAkcmVzdWx0Q29udGFpbmVyLmZpbmQoJy5jb250ZW50JykuaHRtbChcIlwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlcyB0aGUgZXZlbnQgb2YgY2xpY2tpbmcgYSBcInRlc3RcIiBidXR0b25cbiAgICAgKiBAcGFyYW0gZVxuICAgICAqL1xuICAgIG9uQ2xpY2tUZXN0KGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgJHNlbGYgPSAkKGUudGFyZ2V0KTtcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnRlc3REYXRhUHJlcGFyZXIucHJlcGFyZVRlc3REYXRhKCRzZWxmKTtcbiAgICAgICAgaWYgKGRhdGEgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgLy8gU2V0IHRoZSBjbG9zZXN0IHRlc3QgcmVzdWx0cyBjb250YWluZXIgbG9hZGluZyBhbmQgY2xlYXIgaXRzIGNvbnRlbnRcbiAgICAgICAgbGV0ICRyZXN1bHRDb250YWluZXIgPSAkc2VsZi5jbG9zZXN0KFwidGRcIikuZmluZChcIi50ZXN0LXJlc3VsdHNcIik7XG4gICAgICAgIGxldCAkY29udGVudENvbnRhaW5lciA9ICRyZXN1bHRDb250YWluZXIuZmluZChcIi5jb250ZW50XCIpO1xuICAgICAgICAkcmVzdWx0Q29udGFpbmVyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoXCJoaWRkZW5cIilcbiAgICAgICAgICAgIC5hZGRDbGFzcyhcImxvYWRpbmdcIik7XG4gICAgICAgICRjb250ZW50Q29udGFpbmVyLmh0bWwoXCJcIik7XG4gICAgICAgIC8vIFNldCB0aGUgYnV0dG9uIGxvYWRpbmdcbiAgICAgICAgJHNlbGYuYWRkQ2xhc3MoXCJsb2FkaW5nXCIpO1xuICAgICAgICAkLnBvc3Qod2luZG93LmFqYXh1cmwsIHtcbiAgICAgICAgICAgIHdjY19ub25jZTogdGhpcy5wc3YuJHdjY05vbmNlLnZhbCgpLFxuICAgICAgICAgICAgYWN0aW9uOiB3aW5kb3cucGFnZUFjdGlvbktleSxcbiAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5kb25lKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlID09IHVuZGVmaW5lZCB8fCAhcmVzcG9uc2UgfHwgcmVzcG9uc2UudmlldyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAkY29udGVudENvbnRhaW5lci5odG1sKHdpbmRvdy53cGNjLmFuX2Vycm9yX29jY3VycmVkKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBHZXQgdGhlIHRlc3QgcmVzdWx0cyBmcm9tIHRoZSByZXNwb25zZSB2aWV3IGFuZCBzdG9yZSB0aGVtIGluIHRoZSB0ZXN0IGJ1dHRvbiBpdHNlbGYuIFdlIG1pZ2h0XG4gICAgICAgICAgICAvLyB1c2UgdGhlIHJlc3VsdHMgYWdhaW4sIGZvciBleGFtcGxlLCBpbiB0aGUgb3B0aW9ucyBib3guXG4gICAgICAgICAgICAvLyBTdXJyb3VuZCB0aGUgdmlldyB3aXRoIGEgXCJkaXZcIiAoZG9lcyBub3QgbWF0dGVyIHRoZSBlbGVtZW50IHRhZyBoZXJlKSBzbyB0aGF0IHdlIGNhbiBxdWVyeSBpdCB3aXRoXG4gICAgICAgICAgICAvLyBDU1Mgc2VsZWN0b3JzLlxuICAgICAgICAgICAgbGV0IHJlc3VsdHMgPSAkKFwiPGRpdj5cIiArIHJlc3BvbnNlLnZpZXcgKyBcIjwvZGl2PlwiKS5maW5kKCd1bCcpLmRhdGEoXCJyZXN1bHRzXCIpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdHMgIT09IG51bGwgJiYgcmVzdWx0cyAhPT0gdW5kZWZpbmVkICYmIHJlc3VsdHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgJHNlbGYuZGF0YShcInJlc3VsdHNcIiwgcmVzdWx0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBTaG93IHRoZSByZXN1bHRzXG4gICAgICAgICAgICAkY29udGVudENvbnRhaW5lci5odG1sKHJlc3BvbnNlLnZpZXcpO1xuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhpcyBpcyBjYXRlZ29yeS1tYXBwaW5nIHN0dWZmXG4gICAgICAgICAgICBpZiAoJHNlbGYuaGFzQ2xhc3MoJ3djYy1jYXRlZ29yeS1tYXAnKSkge1xuICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgY29udGFpbmVyXG4gICAgICAgICAgICAgICAgbGV0ICRpbnB1dEdyb3VwQ29udGFpbmVyID0gJCh0aGlzLnBzdi5zZWxlY3RvckNhdGVnb3J5TWFwKS5maW5kKCcuaW5wdXRzJyk7XG4gICAgICAgICAgICAgICAgLy8gQWRkIHJlc3VsdGFudCBVUkxzIGFzIG5ldyBpbnB1dFxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzcG9uc2UuZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdXJsID0gcmVzcG9uc2UuZGF0YVtpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVybC5tYXRjaChcIl5qYXZhc2NyaXB0XCIpKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIGxldCAkbmV3SW5wdXRHcm91cCA9IHRoaXMuaW5wdXRHcm91cEFkZGVyLmFkZE5ld0lucHV0R3JvdXAoJGlucHV0R3JvdXBDb250YWluZXIpO1xuICAgICAgICAgICAgICAgICAgICAkbmV3SW5wdXRHcm91cC5maW5kKCdpbnB1dCcpLnZhbCh1cmwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5mYWlsKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgJGNvbnRlbnRDb250YWluZXIuaHRtbCh3aW5kb3cud3BjYy5hbl9lcnJvcl9vY2N1cnJlZCArIFwiIDxiciAvPlwiICsgcmVzcG9uc2UucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGxvYWRpbmcgY2xhc3NcbiAgICAgICAgICAgICRyZXN1bHRDb250YWluZXIucmVtb3ZlQ2xhc3MoXCJsb2FkaW5nXCIpO1xuICAgICAgICAgICAgJHNlbGYucmVtb3ZlQ2xhc3MoXCJsb2FkaW5nXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlcyB0aGUgZXZlbnQgb2YgY2xpY2tpbmcgYSBcInJlbW92ZVwiIGJ1dHRvblxuICAgICAqIEBwYXJhbSBlXG4gICAgICovXG4gICAgb25DbGlja1JlbW92ZShlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0ICRzZWxmID0gJChlLnRhcmdldCk7XG4gICAgICAgIC8vIEdldCBjb3VudCBvZiBpbnB1dCBncm91cHNcbiAgICAgICAgbGV0IGNvdW50ID0gJHNlbGYuY2xvc2VzdChcIi5pbnB1dHNcIikuZmluZChcIi5pbnB1dC1ncm91cFwiKS5sZW5ndGg7XG4gICAgICAgIGxldCAkY2xvc2VzdElucHV0R3JvdXAgPSAkc2VsZi5jbG9zZXN0KFwiLmlucHV0LWdyb3VwXCIpO1xuICAgICAgICAvLyBJZiB0aGVyZSBpcyBvbmx5IDEgaW5wdXQgZ3JvdXAsIHRoZW4gZG8gbm90IHJlbW92ZSBpdC4gSnVzdCBjbGVhciB0aGUgdmFsdWVzLlxuICAgICAgICBpZiAoY291bnQgPT0gMSkge1xuICAgICAgICAgICAgJGNsb3Nlc3RJbnB1dEdyb3VwLmZpbmQoXCJpbnB1dFwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnZhbChcIlwiKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGNsb3Nlc3RJbnB1dEdyb3VwLmZpbmQoXCJ0ZXh0YXJlYVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmh0bWwoXCJcIikudmFsKFwiXCIpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkY2xvc2VzdElucHV0R3JvdXAuZmluZChcImlucHV0W3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICQodGhpcykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlcmUgaXMgYW4gb3B0aW9ucyBib3ggYnV0dG9uIGFuZCByZXZlcnQgaXQgdG8gaXRzIGRlZmF1bHRcbiAgICAgICAgICAgICRjbG9zZXN0SW5wdXRHcm91cC5maW5kKCcud2NjLW9wdGlvbnMtYm94JykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0ICRzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAkc2VsZi5yZW1vdmVDbGFzcygnaGFzLWNvbmZpZycpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgJC5mbi50b29sdGlwID09PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgICAgICAgICAkc2VsZi50b29sdGlwKCdkZXN0cm95Jyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgcmVtb3ZlIHRoZSBpbnB1dCBncm91cC5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIENsZWFyIHRoZSB2YWx1ZXMgb2YgdGhlIGlucHV0cyBhbmQgdHJpZ2dlciBhIGNoYW5nZSBldmVudCBzbyB0aGF0IGFueSBjaGFuZ2UgZXZlbnQgbGlzdGVuZXIgY2FuIGdldFxuICAgICAgICAgICAgLy8gbm90aWZpZWQuXG4gICAgICAgICAgICAkY2xvc2VzdElucHV0R3JvdXBcbiAgICAgICAgICAgICAgICAuZmluZCgnLmlucHV0LWNvbnRhaW5lcicpXG4gICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhJylcbiAgICAgICAgICAgICAgICAudmFsKCcnKVxuICAgICAgICAgICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAgICAgICAgICRjbG9zZXN0SW5wdXRHcm91cC5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIHRoZSBldmVudCBvZiBjbGlja2luZyBhbiBcImFkZCBuZXdcIiBidXR0b25cbiAgICAgKiBAcGFyYW0gZVxuICAgICAqL1xuICAgIG9uQ2xpY2tBZGROZXcoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCAkc2VsZiA9ICQoZS50YXJnZXQpO1xuICAgICAgICAvLyBGaW5kIHRoZSBpbnB1dCBjb250YWluZXJcbiAgICAgICAgbGV0ICRpbnB1dEdyb3VwQ29udGFpbmVyID0gJHNlbGYuY2xvc2VzdChcInRkXCIpLmZpbmQoXCIuaW5wdXRzXCIpO1xuICAgICAgICAvLyBHZXQgbWF4IGxpbWl0XG4gICAgICAgIGxldCBtYXggPSAkc2VsZi5kYXRhKFwibWF4XCIpO1xuICAgICAgICBpZiAobWF4ICE9IDAgJiYgJGlucHV0R3JvdXBDb250YWluZXIubGVuZ3RoID49IG1heClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5pbnB1dEdyb3VwQWRkZXIuYWRkTmV3SW5wdXRHcm91cCgkaW5wdXRHcm91cENvbnRhaW5lcik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB3aGF0IGhhcHBlbnMgd2hlbiBcImludmFsaWRhdGUgdGVzdCBVUkwgY2FjaGVcIiBpcyBjbGlja2VkLlxuICAgICAqIEBwYXJhbSBlXG4gICAgICovXG4gICAgb25DbGlja0ludmFsaWRhdGVUZXN0VXJsQ2FjaGUoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCAkc2VsZiA9ICQoZS50YXJnZXQpO1xuICAgICAgICBsZXQgdGVzdFVybCA9ICRzZWxmLmRhdGEoXCJ1cmxcIikgfHwgbnVsbDtcbiAgICAgICAgLy8gSWYgdGhlIHRlc3QgVVJMIGlzIG5vdCB2YWxpZCwgbm90aWZ5IHRoZSB1c2VyIGFuZCByZXR1cm4uXG4gICAgICAgIGlmICh0ZXN0VXJsID09PSBudWxsIHx8ICF0ZXN0VXJsLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5ub3RpZmllci5ub3RpZnkoJHNlbGYsIHdpbmRvdy53cGNjLnVybF9jYW5ub3RfYmVfcmV0cmlldmVkKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBHZXQgdGhlIHRlc3QgcmVzdWx0IGNvbnRhaW5lci5cbiAgICAgICAgbGV0ICR0ZXN0UmVzdWx0c0NvbnRhaW5lciA9ICRzZWxmLmNsb3Nlc3QoJy50ZXN0LXJlc3VsdHMnKTtcbiAgICAgICAgLy8gSWYgaXQgaXMgYWxyZWFkeSBsb2FkaW5nLCBzdG9wLlxuICAgICAgICBpZiAoJHRlc3RSZXN1bHRzQ29udGFpbmVyLmhhc0NsYXNzKCdsb2FkaW5nJykpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIC8vIE1ha2UgdGhlIHRlc3QgcmVzdWx0IGNvbnRhaW5lciBsb2FkaW5nIHRvIGluZGljYXRlIGFuIEFKQVggcmVxdWVzdCBpcyBzZW50LlxuICAgICAgICAkdGVzdFJlc3VsdHNDb250YWluZXIuYWRkQ2xhc3MoJ2xvYWRpbmcnKTtcbiAgICAgICAgJC5wb3N0KHdpbmRvdy5hamF4dXJsLCB7XG4gICAgICAgICAgICB3Y2Nfbm9uY2U6IHRoaXMucHN2LiR3Y2NOb25jZS52YWwoKSxcbiAgICAgICAgICAgIGFjdGlvbjogd2luZG93LnBhZ2VBY3Rpb25LZXksXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgY21kOiBcImludmFsaWRhdGVfdXJsX3Jlc3BvbnNlX2NhY2hlXCIsXG4gICAgICAgICAgICAgICAgdXJsOiB0ZXN0VXJsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuZG9uZSgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGxldCBzdWNjZXNzID0gcmVzcG9uc2UgPT0gXCIxXCI7XG4gICAgICAgICAgICAvLyBDcmVhdGUgdGhlIG1lc3NhZ2VcbiAgICAgICAgICAgIGxldCBtc2cgPSBzdWNjZXNzID8gd2luZG93LndwY2MuY2FjaGVfaW52YWxpZGF0ZWQgOiB3aW5kb3cud3BjYy5jYWNoZV9jb3VsZF9ub3RfYmVfaW52YWxpZGF0ZWQ7XG4gICAgICAgICAgICB0aGlzLm5vdGlmaWVyLm5vdGlmeVJlZ3VsYXIoJHNlbGYsIG1zZywgc3VjY2VzcyA/IE5vdGlmaWNhdGlvblR5cGUuU1VDQ0VTUyA6IE5vdGlmaWNhdGlvblR5cGUuRVJST1IpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmZhaWwoKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAvLyBOb3RpZnkgdGhlIHVzZXIgdGhhdCB0aGUgY2FjaGUgY291bGQgbm90IGJlIGludmFsaWRhdGVkXG4gICAgICAgICAgICB0aGlzLm5vdGlmaWVyLm5vdGlmeSgkc2VsZiwgd2luZG93LndwY2MuY2FjaGVfY291bGRfbm90X2JlX2ludmFsaWRhdGVkKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGxvYWRpbmcgY2xhc3NcbiAgICAgICAgICAgICR0ZXN0UmVzdWx0c0NvbnRhaW5lci5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHdoYXQgaGFwcGVucyB3aGVuIFwiaW52YWxpZGF0ZSB0ZXN0IFVSTCBjYWNoZVwiIGlzIGNsaWNrZWQuXG4gICAgICogQHBhcmFtIGVcbiAgICAgKi9cbiAgICBvbkNsaWNrSW52YWxpZGF0ZUFsbFRlc3RVcmxDYWNoZXMoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCAkc2VsZiA9ICQoZS50YXJnZXQpO1xuICAgICAgICAvLyBHZXQgdGhlIHRlc3QgcmVzdWx0IGNvbnRhaW5lci5cbiAgICAgICAgbGV0ICR0ZXN0UmVzdWx0c0NvbnRhaW5lciA9ICRzZWxmLmNsb3Nlc3QoJy50ZXN0LXJlc3VsdHMnKTtcbiAgICAgICAgLy8gSWYgaXQgaXMgYWxyZWFkeSBsb2FkaW5nLCBzdG9wLlxuICAgICAgICBpZiAoJHRlc3RSZXN1bHRzQ29udGFpbmVyLmhhc0NsYXNzKCdsb2FkaW5nJykpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIC8vIE1ha2UgdGhlIHRlc3QgcmVzdWx0IGNvbnRhaW5lciBsb2FkaW5nIHRvIGluZGljYXRlIGFuIEFKQVggcmVxdWVzdCBpcyBzZW50LlxuICAgICAgICAkdGVzdFJlc3VsdHNDb250YWluZXIuYWRkQ2xhc3MoJ2xvYWRpbmcnKTtcbiAgICAgICAgJC5wb3N0KHdpbmRvdy5hamF4dXJsLCB7XG4gICAgICAgICAgICB3Y2Nfbm9uY2U6IHRoaXMucHN2LiR3Y2NOb25jZS52YWwoKSxcbiAgICAgICAgICAgIGFjdGlvbjogd2luZG93LnBhZ2VBY3Rpb25LZXksXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgY21kOiBcImludmFsaWRhdGVfYWxsX3VybF9yZXNwb25zZV9jYWNoZXNcIixcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5kb25lKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgbGV0IHN1Y2Nlc3MgPSByZXNwb25zZSA9PSBcIjFcIjtcbiAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgbWVzc2FnZVxuICAgICAgICAgICAgbGV0IG1zZyA9IHN1Y2Nlc3MgPyB3aW5kb3cud3BjYy5hbGxfY2FjaGVfaW52YWxpZGF0ZWQgOiB3aW5kb3cud3BjYy5hbGxfY2FjaGVfY291bGRfbm90X2JlX2ludmFsaWRhdGVkO1xuICAgICAgICAgICAgdGhpcy5ub3RpZmllci5ub3RpZnlSZWd1bGFyKCRzZWxmLCBtc2csIHN1Y2Nlc3MgPyBOb3RpZmljYXRpb25UeXBlLlNVQ0NFU1MgOiBOb3RpZmljYXRpb25UeXBlLkVSUk9SKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5mYWlsKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgLy8gTm90aWZ5IHRoZSB1c2VyIHRoYXQgYWxsIGNhY2hlIGNvdWxkIG5vdCBiZSBpbnZhbGlkYXRlZFxuICAgICAgICAgICAgdGhpcy5ub3RpZmllci5ub3RpZnkoJHNlbGYsIHdpbmRvdy53cGNjLmFsbF9jYWNoZV9jb3VsZF9ub3RfYmVfaW52YWxpZGF0ZWQpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgbG9hZGluZyBjbGFzc1xuICAgICAgICAgICAgJHRlc3RSZXN1bHRzQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyB0b29sdGlwIGluc3RhbmNlc1xuICAgICAqL1xuICAgIGluaXRUb29sdGlwKCkge1xuICAgICAgICBVdGlscy5pbml0VG9vbHRpcEZvclNlbGVjdG9yKCcnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBVUkwgaGFzaCBjaGFuZ2VzLiBFLmcuIGFjdGl2YXRlcyB0YWJzLlxuICAgICAqL1xuICAgIGhhbmRsZVVSTEhhc2goKSB7XG4gICAgICAgIGxldCBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XG4gICAgICAgIGlmIChoYXNoICYmIGhhc2guaW5kZXhPZihcIiNfXCIpID09PSAwKSB7XG4gICAgICAgICAgICBsZXQgdGFiSGFzaCA9IGhhc2guc3BsaXQoXCJ8XCIpWzBdO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZVRhYih0YWJIYXNoLnJlcGxhY2UoXCIjX1wiLCBcIiNcIikpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlc3RvcmVzIHRoZSBVUkwgaGFzaCB0byB0aGUgc3RhdGUgYmVmb3JlIHNhdmluZyB0aGUgc2V0dGluZ3NcbiAgICAgKi9cbiAgICByZXN0b3JlVVJMSGFzaCgpIHtcbiAgICAgICAgbGV0ICRpbnB1dCA9ICQodGhpcy5wc3Yuc2VsZWN0b3JJbnB1dFVSTEhhc2gpO1xuICAgICAgICBpZiAoISRpbnB1dC5sZW5ndGggfHwgISRpbnB1dC5maXJzdCgpLnZhbCgpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBsZXQgdmFsdWVzID0gJGlucHV0LmZpcnN0KCkudmFsKCkuc3BsaXQoXCJ8XCIpO1xuICAgICAgICAvLyBUaGVyZSBhcmUgdmFsdWVzIG9mIG1haW4gdGFiIGFuZCBzY3JvbGwgcG9zaXRpb24uIFNvLCB0aGVyZSBzaG91bGQgYmUgYXQgbGVhc3QgdHdvIHZhbHVlcy5cbiAgICAgICAgLy8gV2hlbiB0aGVyZSBpcyBubyBsb2NhdGlvbiBoYXNoIGJ1dCB0aGUgc2Nyb2xsIHBvc2l0aW9uLCB0aGUgdmFsdWUgb2YgdGhlIGlucHV0IGJlY29tZXMgbGlrZSBcInwyMFwiLiBJbiB0aGlzXG4gICAgICAgIC8vIGNhc2UsIHRoZXJlIGlzIG5vIGxvY2F0aW9uIGhhc2ggYW5kIHRoZSB2YWx1ZXNbMF0gaXMgZW1wdHkuIEhlbmNlLCBpbiB0aGF0IGNhc2UsIG5vIGxvY2F0aW9uIGhhc2ggdG8gcmVzdG9yZS5cbiAgICAgICAgLy8gU28sIHN0b3AuXG4gICAgICAgIGlmICh2YWx1ZXMubGVuZ3RoIDwgMiB8fCAodmFsdWVzWzBdID09PSAnJykpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB2YWx1ZXMuam9pbihcInxcIikpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBY3RpdmF0ZSBhIHRhYlxuICAgICAqIEBwYXJhbSB0YWJTZWxlY3RvciBTaG91bGQgYmUgYSB0YWIgSUQgYW5kIHN0YXJ0IHdpdGggXCIjXCJcbiAgICAgKi9cbiAgICBhY3RpdmF0ZVRhYih0YWJTZWxlY3Rvcikge1xuICAgICAgICAvLyBNYWtlIGZpeGFibGVzIGluIHRoZSBwcmV2aW91cyB0YWIgbm90LWZpeGVkXG4gICAgICAgIHRoaXMucmVzZXRGaXhhYmxlRWxlbWVudHMoKTtcbiAgICAgICAgbGV0ICR0YWIgPSB0aGlzLnBzdi4kY29udGFpbmVyVGFicy5maW5kKCdbZGF0YS10YWI9XCInICsgdGFiU2VsZWN0b3IgKyAnXCJdJyk7XG4gICAgICAgIGlmICghJHRhYi5sZW5ndGggfHwgJHRhYi5oYXNDbGFzcyhcImhpZGRlblwiKSB8fCAkdGFiLmhhc0NsYXNzKCduYXYtdGFiLWFjdGl2ZScpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvLyBTdG9yZSB0aGUgdG9wIHBvc2l0aW9uIG9mIHRoZSBwYWdlIHNvIHRoYXQgd2UgY2FuIHJlc3RvcmUgaXQgd2hlbiB0aGlzIHRhYiBpcyBhY3RpdmF0ZWQgYWdhaW4uXG4gICAgICAgIC8vIE1hdGguZmxvb3IgaXMgY3J1Y2lhbCBoZXJlLiBCZWNhdXNlLCB0b3Agb2Zmc2V0IG9mIHRoZSBlbGVtZW50IGlzIGEgZmxvYXQgd2hpbGUgc2Nyb2xsIHRvcCBvZiB0aGUgcGFnZSBpc1xuICAgICAgICAvLyByZXRyaWV2ZWQgYXMgaW50ZWdlci4gSGVuY2UsIHRoZSBzY3JvbGwgdG9wIG9mIHRoZSBwYWdlIGlzIGFjdHVhbGx5IGEgcm91bmRlZCBudW1iZXIuIEluIHRoaXMgY2FzZSwgdG8gYmVcbiAgICAgICAgLy8gYWJsZSB0byBjb21wYXJlIHNjcm9sbCB0b3AgYW5kIHRoZSBvcmlnaW5hbCB0YWIgY29udGFpbmVyIHRvcCBjb3JyZWN0bHksIHdlIGdldCByaWQgb2YgdGhlIGRlY2ltYWwgcGFydCBvZlxuICAgICAgICAvLyB0aGUgb2Zmc2V0IG9mIHRoZSB0YWIgY29udGFpbmVyLiBFLmcuIGxldCdzIHNheSBvcmlnaW5hbCB0b3Agb2Zmc2V0IG9mIHRoZSB0YWIgY29udGFpbmVyIGlzIDE1Ni43MjUuIFdoZW4gd2VcbiAgICAgICAgLy8gbWFrZSB0aGUgcGFnZSBzY3JvbGwgdG8gMTU2LjcyNSBhbmQgcmV0cmlldmUgc2Nyb2xsIHRvcCB2YWx1ZSBvZiB0aGUgcGFnZSwgd2UgZ2V0IDE1Ny4gSGVyZSwgd2Ugc2ltcGx5XG4gICAgICAgIC8vIGVsaW1pbmF0ZSB0aGlzIGludGVyZXN0aW5nIGNhc2UuIE1vcmVvdmVyLCB3ZSBhY3QgYSBsaXR0bGUgYml0IHByZWNhdXRpb3VzIGJ5IHJvdW5kaW5nIHRoZSBudW1iZXIgZG93biBzbyB0aGF0XG4gICAgICAgIC8vIHdoZW4gd2UgY29tcGFyZSB0aGUgdmFsdWVzLCBjdXJyZW50IHNjcm9sbCB0b3Agb2YgdGhlIGVsZW1lbnQgaXMgYWx3YXlzIGdyZWF0ZXIuXG4gICAgICAgIGxldCBvcmlnaW5hbFRhYkNvbnRhaW5lclRvcCA9IE1hdGguZmxvb3IodGhpcy5nZXRUb3BPZmZzZXRPZlRhcmdldEZpeGFibGUodGhpcy5wc3YuJGNvbnRhaW5lclRhYnMpIHx8IDApO1xuICAgICAgICB0aGlzLmdldEFjdGl2ZVRhYigpLmRhdGEoJ3Njcm9sbHRvcCcsIHRoaXMuZ2V0U2Nyb2xsVG9wKCkgPiBvcmlnaW5hbFRhYkNvbnRhaW5lclRvcCA/IHRoaXMuZ2V0U2Nyb2xsVG9wKCkgOiBudWxsKTtcbiAgICAgICAgLy8gRmlyc3QgZGVhY3RpdmF0ZSBhbGwgdGFic1xuICAgICAgICB0aGlzLnBzdi4kY29udGFpbmVyTWV0YUJveC5maW5kKFwiPiAudGFiXCIpLmFkZENsYXNzKFwiaGlkZGVuXCIpO1xuICAgICAgICB0aGlzLnBzdi4kY29udGFpbmVyVGFicy5maW5kKFwiYVwiKS5yZW1vdmVDbGFzcyhcIm5hdi10YWItYWN0aXZlXCIpO1xuICAgICAgICAvLyBOb3cgYWN0aXZhdGUgdGhlIHNlbGVjdGVkIHRhYlxuICAgICAgICBsZXQgZWxlbWVudElkID0gJHRhYi5kYXRhKFwidGFiXCIpO1xuICAgICAgICAkKGVsZW1lbnRJZCkucmVtb3ZlQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICAgICR0YWIuYWRkQ2xhc3MoXCJuYXYtdGFiLWFjdGl2ZVwiKTtcbiAgICAgICAgLy8gRG8gdGhlIHRoaW5ncyB0aGF0IHNob3VsZCBiZSBkb25lIHdoZW4gdGhlIGFjdGl2ZSB0YWIgY2hhbmdlc1xuICAgICAgICB0aGlzLm9uQWN0aXZlVGFiQ2hhbmdlZCgpO1xuICAgICAgICAvLyBDaGFuZ2Ugd2luZG93IGhhc2ggd2l0aG91dCBhZmZlY3RpbmcgYnJvd3NlciBoaXN0b3J5LiBCeSB0aGlzIHdheSwgZ29pbmcgYmFjayB3b24ndCByZXN1bHQgaW4gYSB0YWIgY2hhbmdlLlxuICAgICAgICBsZXQgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNwbGl0KFwifFwiKTtcbiAgICAgICAgaGFzaFswXSA9IGVsZW1lbnRJZC5yZXBsYWNlKFwiI1wiLCBcIiNfXCIpO1xuICAgICAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgaGFzaC5qb2luKFwifFwiKSk7XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgZWRpdG9ycyBpbiB0aGlzIHRhYiBhcmUgaW5pdGlhbGl6ZWQuIFRoZSBoZWlnaHQgb2YgdGhlIGVkaXRvcnMgYXJlIG5vdCBjb3JyZWN0IHdoZW4gdGhleSBhcmVcbiAgICAgICAgLy8gbWFkZSB2aXNpYmxlIGJ5IG1vdmluZyB0byBhIHRhYiB0aGF0IGNvbnRhaW5zIGVkaXRvcnMsIGFsdGhvdWdoIHRoZSBoZWlnaHRzIGFyZSBjb3JyZWN0IHdoZW4gdGhlIGVkaXRvcnNcbiAgICAgICAgLy8gYXJlIHZpc2libGUgcmlnaHQgYWZ0ZXIgdGhlIHBhZ2UgbG9hZHMuIEhvd2V2ZXIsIHRoZSBlZGl0b3JzIGFyZSBub3QgdmlzaWJsZSByaWdodCBhZnRlciB0aGUgcGFnZSBsb2Fkcy5cbiAgICAgICAgdGhpcy5tYXliZUluaXRUaW55TWNlRWRpdG9ycygpO1xuICAgICAgICAvLyBIYW5kbGUgZml4ZWQgbmF2aWdhdGlvbiBlbGVtZW50cyBpbiB0aGUgY3VycmVudGx5IGFjdGl2YXRlZCB0YWJcbiAgICAgICAgdGhpcy5yZXNldEZpeGFibGVFbGVtZW50cygpO1xuICAgICAgICB0aGlzLmhhbmRsZUVsZW1lbnRGaXhpbmcoKTtcbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSBzY3JvbGwgdG9wIGZvciB0aGUgYWN0aXZhdGVkIHRhYiwgcmVzdG9yZSBpdC5cbiAgICAgICAgbGV0IHRhYlNjcm9sbFRvcFN0YXRlID0gJHRhYi5kYXRhKCdzY3JvbGx0b3AnKSB8fCBudWxsO1xuICAgICAgICBsZXQgY3VycmVudFNjcm9sbFRvcCA9IHRoaXMuZ2V0U2Nyb2xsVG9wKCkgKyB0aGlzLmdldEFkbWluQmFySGVpZ2h0SWZGaXhlZCgpO1xuICAgICAgICBsZXQgYWRtaW5CYXJIZWlnaHQgPSB0aGlzLmdldEFkbWluQmFySGVpZ2h0SWZGaXhlZCgpO1xuICAgICAgICBpZiAodGFiU2Nyb2xsVG9wU3RhdGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZVxuICAgICAgICAgICAgdGFiU2Nyb2xsVG9wU3RhdGUgPSBvcmlnaW5hbFRhYkNvbnRhaW5lclRvcCA8IGN1cnJlbnRTY3JvbGxUb3AgPyBvcmlnaW5hbFRhYkNvbnRhaW5lclRvcCAtIGFkbWluQmFySGVpZ2h0IDogbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvLyBTY3JvbGwgdG8gdGhlIHByZXZpb3VzIGxvY2F0aW9uIG9ubHkgaWYgdGhlIHBhZ2UgaXMgc2Nyb2xsZWQgYmV5b25kIHRoZSB0b3AgbG9jYXRpb24gb2YgdGhlIG9yaWdpbmFsIHRhYlxuICAgICAgICAvLyBjb250YWluZXIuXG4gICAgICAgIGlmICh0YWJTY3JvbGxUb3BTdGF0ZSAhPT0gbnVsbCAmJiBjdXJyZW50U2Nyb2xsVG9wID49IG9yaWdpbmFsVGFiQ29udGFpbmVyVG9wKSB7XG4gICAgICAgICAgICAkKGRvY3VtZW50KS5zY3JvbGxUb3AodGFiU2Nyb2xsVG9wU3RhdGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERvZXMgdGhlIHRoaW5ncyB0byBiZSBkb25lIHdoZW4gdGhlIGFjdGl2ZSB0YWIgY2hhbmdlc1xuICAgICAqL1xuICAgIG9uQWN0aXZlVGFiQ2hhbmdlZCgpIHtcbiAgICAgICAgLy8gSW52YWxpZGF0ZSB0aGUgYWN0aXZlIHRhYiBjb250YWluZXIgc2luY2UgdGhlIGFjdGl2ZSB0YWIgaGFzIGNoYW5nZWQuXG4gICAgICAgIHRoaXMuaW52YWxpZGF0ZUFjdGl2ZVRhYkNvbnRhaW5lcigpO1xuICAgICAgICAvLyBJbnZhbGlkYXRlIHRoZSBjYWNoZSBzdG9yaW5nIGZpeGFibGUgZWxlbWVudHMgb2YgdGhlIGFjdGl2ZSB0YWIgc2luY2UgdGhlIGFjdGl2ZSB0YWIgaGFzIGNoYW5nZWQuXG4gICAgICAgIHRoaXMuaW52YWxpZGF0ZUFjdGl2ZVRhYkZpeGFibGVzQ2FjaGUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVzZXRzIHRoZSBkYXRhIHRoYXQgc3RvcmVzIHRoZSBwcmV2aW91cyBzY3JvbGwgdG9wIHBvc2l0aW9uIG9mIHRoZSB0YWIuIFRoZSBjYWNoZSBpcyB0aGVyZSBpbiBvcmRlciB0byByZXN0b3JlXG4gICAgICogdGhlIHNjcm9sbCB0b3AgcG9zaXRpb24gd2hlbiB0aGUgdGFiIGlzIGFjdGl2YXRlZCBsYXRlci4gVGhlIGNhY2hlIGlzIHNldCBpbiB7QGxpbmsgYWN0aXZhdGVUYWJ9LlxuICAgICAqL1xuICAgIHJlc2V0UHJldlNjcm9sbFBvc2l0aW9uQ2FjaGVPZlRhYnMoKSB7XG4gICAgICAgIHRoaXMuZ2V0QWxsVGFicygpLnJlbW92ZURhdGEoJ3Njcm9sbHRvcCcpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBlZGl0b3JzIGlmIHRoZXkgd2VyZSBub3QgaW5pdGlhbGl6ZWQuIFRoaXMgbWV0aG9kIGZpeGVzIHRoZSBwcm9ibGVtIHRoYXQgdGhlIGVkaXRvcnMgZG8gbm90IGhhdmVcbiAgICAgKiB0aGUgcmlnaHQgaGVpZ2h0LlxuICAgICAqL1xuICAgIG1heWJlSW5pdFRpbnlNY2VFZGl0b3JzKCkge1xuICAgICAgICAvLyBGaW5kIHRoZSBlZGl0b3JzIGluIHRoZSBjdXJyZW50IHRhYlxuICAgICAgICBsZXQgJGN1cnJlbnRDb250YWluZXIgPSB0aGlzLmdldEFjdGl2ZVRhYkNvbnRhaW5lcigpO1xuICAgICAgICAvLyBJZiB0aGVyZSBhcmUgbm8gZWRpdG9ycyBpbiB0aGlzIHRhYiBvciB0aGUgZWRpdG9ycyBmb3IgdGhpcyB0YWIgaGF2ZSBhbHJlYWR5IGJlZW4gaW5pdGlhbGl6ZWQsIHN0b3AuXG4gICAgICAgIGlmICgkY3VycmVudENvbnRhaW5lciA9PT0gbnVsbCB8fCAoJGN1cnJlbnRDb250YWluZXIgIT09IG51bGwgJiYgJGN1cnJlbnRDb250YWluZXIuaGFzQ2xhc3MoJ2VkaXRvcnMtaW5pdGlhbGl6ZWQnKSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAkY3VycmVudENvbnRhaW5lci5maW5kKCcud3AtZWRpdG9yLWNvbnRhaW5lcicpLmVhY2goKGksIGVsKSA9PiB7XG4gICAgICAgICAgICBsZXQgJHNlbGYgPSAkKGVsKTtcbiAgICAgICAgICAgIC8vIEZpbmQgdGhlIGhlaWdodCBvZiB0aGUgdGV4dGFyZWEgb2YgdGhlIGVkaXRvclxuICAgICAgICAgICAgbGV0ICR0ZXh0YXJlYSA9ICRzZWxmLmZpbmQoJ3RleHRhcmVhJykuZmlyc3QoKSB8fCBudWxsO1xuICAgICAgICAgICAgaWYgKCR0ZXh0YXJlYSA9PT0gbnVsbCB8fCAhJHRleHRhcmVhLmxlbmd0aCB8fCAkdGV4dGFyZWEuaGFzQ2xhc3MoJ2luaXRpYWxpemVkJykpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgbGV0IGhlaWdodCA9ICR0ZXh0YXJlYS5oZWlnaHQoKTtcbiAgICAgICAgICAgIC8vIENoYW5nZSB0aGUgaGVpZ2h0IG9mIHRoZSBlZGl0b3IgaWZyYW1lIHNvIHRoYXQgaXQgbWF0Y2hlcyB3aXRoIHRoZSBoZWlnaHQgb2YgdGhlIHRleHRhcmVhLiBCeSB0aGlzIHdheSxcbiAgICAgICAgICAgIC8vIHRoZSBlZGl0b3Igd2lsbCBoYXZlIHRoZSBjb3JyZWN0IGhlaWdodC5cbiAgICAgICAgICAgICRzZWxmLmZpbmQoJy5tY2UtY29udGFpbmVyID4gaWZyYW1lJykuY3NzKCdoZWlnaHQnLCBoZWlnaHQgKyAncHgnKTtcbiAgICAgICAgICAgIC8vIE1hcmsgaXQgYXMgaW5pdGlhbGl6ZWRcbiAgICAgICAgICAgICR0ZXh0YXJlYS5hZGRDbGFzcygnaW5pdGlhbGl6ZWQnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIE1hcmsgdGhlIGNvbnRhaW5lciBhcyB0aGF0IHRoZWlyIGVkaXRvcnMgYXJlIGluaXRpYWxpemVkIHNvIHRoYXQgd2Ugd2lsbCBub3QgdHJ5IHRvIGRvIGl0IGFnYWluLlxuICAgICAgICAkY3VycmVudENvbnRhaW5lci5hZGRDbGFzcygnZWRpdG9ycy1pbml0aWFsaXplZCcpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGZpeGFibGUgZWxlbWVudHMgb2YgdGhlIGFjdGl2ZSB0YWJcbiAgICAgKi9cbiAgICBnZXRBY3RpdmVUYWJGaXhhYmxlcygpIHtcbiAgICAgICAgaWYgKHRoaXMuJGFjdGl2ZVRhYkZpeGFibGVzICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kYWN0aXZlVGFiRml4YWJsZXM7XG4gICAgICAgIHRoaXMuJGFjdGl2ZVRhYkZpeGFibGVzID0gdGhpcy5nZXRBY3RpdmVUYWJDb250YWluZXIoKVxuICAgICAgICAgICAgLmZpbmQodGhpcy5wc3Yuc2VsZWN0b3JGaXhhYmxlICsgJy4nICsgU2VjdGlvbk5hdmlnYXRpb24uY2xhc3NJbml0aWFsaXplZCkgfHwgbnVsbDtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGFjdGl2ZVRhYkZpeGFibGVzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnZhbGlkYXRlIHRoZSB2YXJpYWJsZSB0aGF0IGNhY2hlcyB0aGUgZml4YWJsZSBlbGVtZW50cyBvZiB0aGUgYWN0aXZlIHRhYlxuICAgICAqL1xuICAgIGludmFsaWRhdGVBY3RpdmVUYWJGaXhhYmxlc0NhY2hlKCkge1xuICAgICAgICB0aGlzLiRhY3RpdmVUYWJGaXhhYmxlcyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjb250YWluZXIgb2YgdGhlIGFjdGl2ZSB0YWJcbiAgICAgKi9cbiAgICBnZXRBY3RpdmVUYWJDb250YWluZXIoKSB7XG4gICAgICAgIC8vIElmIHRoZSBhY3RpdmUgdGFiIGNvbnRhaW5lciBhbHJlYWR5IGV4aXN0cywgcmV0dXJuIGl0LlxuICAgICAgICBpZiAodGhpcy4kYWN0aXZlVGFiQ29udGFpbmVyICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kYWN0aXZlVGFiQ29udGFpbmVyO1xuICAgICAgICBsZXQgJHRhYiA9IHRoaXMuZ2V0QWN0aXZlVGFiKCk7XG4gICAgICAgIGlmICgkdGFiID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLiRhY3RpdmVUYWJDb250YWluZXIgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGFjdGl2ZVRhYkNvbnRhaW5lcjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY29udGFpbmVyU2VsZWN0b3IgPSAkdGFiLmRhdGEoXCJ0YWJcIik7XG4gICAgICAgIGxldCAkY29udGFpbmVyID0gJChjb250YWluZXJTZWxlY3RvcikuZmlyc3QoKSB8fCBudWxsO1xuICAgICAgICB0aGlzLiRhY3RpdmVUYWJDb250YWluZXIgPSAkY29udGFpbmVyICE9PSBudWxsICYmICRjb250YWluZXIubGVuZ3RoID8gJGNvbnRhaW5lciA6IG51bGw7XG4gICAgICAgIHJldHVybiB0aGlzLiRhY3RpdmVUYWJDb250YWluZXI7XG4gICAgfVxuICAgIGludmFsaWRhdGVBY3RpdmVUYWJDb250YWluZXIoKSB7XG4gICAgICAgIHRoaXMuJGFjdGl2ZVRhYkNvbnRhaW5lciA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgZ2V0QWN0aXZlVGFiKCkge1xuICAgICAgICBsZXQgJHRhYiA9IHRoaXMucHN2LiRjb250YWluZXJUYWJzLmZpbmQoJy5uYXYtdGFiLWFjdGl2ZScpLmZpcnN0KCkgfHwgbnVsbDtcbiAgICAgICAgaWYgKCR0YWIgPT09IG51bGwgfHwgISR0YWIubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiAkdGFiO1xuICAgIH1cbiAgICBnZXRBbGxUYWJzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wc3YuJGNvbnRhaW5lclRhYnMuZmluZCgnLm5hdi10YWInKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybiBUb3AgcG9zaXRpb24gb2YgdGhlIHNjcm9sbFxuICAgICAqL1xuICAgIGdldFNjcm9sbFRvcCgpIHtcbiAgICAgICAgcmV0dXJuICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCkgLSAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFRvcCB8fCAwKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmxhc2ggdGhlIGJhY2tncm91bmQgY29sb3Igb2YgYW4gb2JqZWN0XG4gICAgICogQHBhcmFtIHtvYmplY3R9ICRlbGVtZW50IFRhcmdldCBlbGVtZW50XG4gICAgICovXG4gICAgZmxhc2hCYWNrZ3JvdW5kKCRlbGVtZW50KSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdmbGFzaCBiYWNrZ3JvdW5kJyk7XG4gICAgICAgICRlbGVtZW50LnN0b3AoKS5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2I4ZWE4NFwiKVxuICAgICAgICAgICAgLmFuaW1hdGUoeyBiYWNrZ3JvdW5kQ29sb3I6IFwiI0ZGRkZGRlwiIH0sIDEwMDApO1xuICAgIH1cbn1cblBvc3RTZXR0aW5ncy5JTlNUQU5DRSA9IG51bGw7XG4iLCJleHBvcnQgY2xhc3MgUG9zdFNldHRpbmdzVmFyaWFibGVzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy4kY29udGFpbmVyTWV0YUJveCA9ICQoJy53Y2Mtc2V0dGluZ3MtbWV0YS1ib3gnKTtcbiAgICAgICAgdGhpcy4kY29udGFpbmVyVGFicyA9ICQoJy53Y2Mtc2V0dGluZ3MtbWV0YS1ib3ggPiAubmF2LXRhYi13cmFwcGVyJyk7XG4gICAgICAgIHRoaXMuJGZvcm0gPSAkKFwiI3Bvc3RcIik7XG4gICAgICAgIHRoaXMuJGVycm9yQWxlcnQgPSAkKFwiI3djYy1hbGVydFwiKTtcbiAgICAgICAgdGhpcy4kd2NjTm9uY2UgPSAkKFwiI3djY19ub25jZVwiKTtcbiAgICAgICAgdGhpcy4kYWRtaW5CYXIgPSAkKFwiI3dwYWRtaW5iYXJcIik7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JDYXRlZ29yeU1hcCA9IFwiI2NhdGVnb3J5LW1hcFwiO1xuICAgICAgICB0aGlzLnNlbGVjdG9yVGFiTWFpbiA9IFwiI3RhYi1tYWluXCI7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JUYWJQb3N0ID0gXCIjdGFiLXBvc3RcIjtcbiAgICAgICAgdGhpcy5zZWxlY3RvclRhYkNhdGVnb3J5ID0gXCIjdGFiLWNhdGVnb3J5XCI7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JUYWJHc1Bvc3QgPSBcIiN0YWItZ3MtcG9zdFwiO1xuICAgICAgICB0aGlzLnNlbGVjdG9yVGFiR2VuZXJhbFNldHRpbmdzID0gXCIjdGFiLWdlbmVyYWwtc2V0dGluZ3NcIjtcbiAgICAgICAgdGhpcy5zZWxlY3RvclRlc3RCdXR0b24gPSAnLndjYy10ZXN0JztcbiAgICAgICAgdGhpcy5zZWxlY3RvcklucHV0Q29udGFpbmVyUGFzc3dvcmRzID0gJy5pbnB1dC1jb250YWluZXItcGFzc3dvcmRzJztcbiAgICAgICAgdGhpcy5zZWxlY3RvckxvYWRHZW5lcmFsU2V0dGluZ3NCdXR0b24gPSAnI2J0bi1sb2FkLWdlbmVyYWwtc2V0dGluZ3MnO1xuICAgICAgICB0aGlzLnNlbGVjdG9yQ2xlYXJHZW5lcmFsU2V0dGluZ3NCdXR0b24gPSAnI2J0bi1jbGVhci1nZW5lcmFsLXNldHRpbmdzJztcbiAgICAgICAgdGhpcy5zZWxlY3RvcklucHV0SW1wb3J0ID0gJyNfcG9zdF9pbXBvcnRfc2V0dGluZ3MnO1xuICAgICAgICB0aGlzLnNlbGVjdG9yTG9hZFRyYW5zbGF0aW9uTGFuZ3VhZ2VzID0gJy5sb2FkLWxhbmd1YWdlcyc7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JJbnB1dFVSTEhhc2ggPSBcImlucHV0W25hbWU9J3VybF9oYXNoJ11cIjtcbiAgICAgICAgdGhpcy5pbnB1dE5hbWVDb29raWVzID0gJ19jb29raWVzJztcbiAgICAgICAgdGhpcy5iYXNlSHRtbE1hbmlwdWxhdGlvbklucHV0TmFtZXMgPSBbXG4gICAgICAgICAgICAnZmluZF9yZXBsYWNlX3Jhd19odG1sJyxcbiAgICAgICAgICAgICdmaW5kX3JlcGxhY2VfZmlyc3RfbG9hZCcsXG4gICAgICAgICAgICAnZmluZF9yZXBsYWNlX2VsZW1lbnRfYXR0cmlidXRlcycsXG4gICAgICAgICAgICAnZXhjaGFuZ2VfZWxlbWVudF9hdHRyaWJ1dGVzJyxcbiAgICAgICAgICAgICdyZW1vdmVfZWxlbWVudF9hdHRyaWJ1dGVzJyxcbiAgICAgICAgICAgICdmaW5kX3JlcGxhY2VfZWxlbWVudF9odG1sJyxcbiAgICAgICAgICAgICd1bm5lY2Vzc2FyeV9lbGVtZW50X3NlbGVjdG9ycydcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5zZWxlY3Rvck9yaWdpbmFsVGVzdFJlc3VsdHMgPSAnLm9yaWdpbmFsLXJlc3VsdHMnO1xuICAgICAgICB0aGlzLnNlbGVjdG9yQnV0dG9uU2VlVW5tb2RpZmllZFRlc3RSZXN1bHRzID0gdGhpcy5zZWxlY3Rvck9yaWdpbmFsVGVzdFJlc3VsdHMgKyAnIC5zZWUtdW5tb2RpZmllZC1yZXN1bHRzJztcbiAgICAgICAgdGhpcy5zZWxlY3RvckludmFsaWRhdGVDYWNoZUJ1dHRvbiA9ICcuaW52YWxpZGF0ZS1jYWNoZS1mb3ItdGhpcy11cmwnO1xuICAgICAgICB0aGlzLnNlbGVjdG9ySW52YWxpZGF0ZUFsbENhY2hlc0J1dHRvbiA9ICcuaW52YWxpZGF0ZS1hbGwtdGVzdC11cmwtY2FjaGVzJztcbiAgICAgICAgdGhpcy5zZWxlY3RvclF1aWNrU2F2ZUJ1dHRvbiA9ICcucXVpY2stc2F2ZS1jb250YWluZXIgLnF1aWNrLXNhdmUnO1xuICAgICAgICB0aGlzLnNlbGVjdG9yRXhwb3J0U2V0dGluZ3NUZXh0QXJlYSA9ICcjX3Bvc3RfZXhwb3J0X3NldHRpbmdzJztcbiAgICAgICAgdGhpcy5jbHNIYXNFcnJvciA9ICdoYXMtZXJyb3InO1xuICAgICAgICB0aGlzLiRpbnB1dEFjdGlvbiA9ICQoXCIjaGlkZGVuYWN0aW9uXCIpO1xuICAgICAgICB0aGlzLmluZm9UZXh0c0hpZGRlbiA9IHRydWU7XG4gICAgICAgIHRoaXMuY2xhc3NGaXhlZCA9ICd3cGNjLWZpeGVkJztcbiAgICAgICAgdGhpcy5zZWxlY3RvckZpeGFibGUgPSAnLmZpeGFibGUnO1xuICAgICAgICB0aGlzLnNlbGVjdG9yQ2hlY2tib3hGaXhUYWJzID0gJyNfZml4X3RhYnMnO1xuICAgICAgICB0aGlzLnNlbGVjdG9yQ2hlY2tib3hGaXhDb250ZW50TmF2aWdhdGlvbiA9ICcjX2ZpeF9jb250ZW50X25hdmlnYXRpb24nO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGlzIGNsYXNzIGlzIGEgc2luZ2xldG9uLiBHZXQgdGhlIGluc3RhbmNlIHdpdGggdGhpcyBtZXRob2QuXG4gICAgICovXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgICAgICBpZiAodGhpcy5JTlNUQU5DRSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5JTlNUQU5DRSA9IG5ldyBQb3N0U2V0dGluZ3NWYXJpYWJsZXMoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5JTlNUQU5DRTtcbiAgICB9XG59XG5Qb3N0U2V0dGluZ3NWYXJpYWJsZXMuSU5TVEFOQ0UgPSBudWxsO1xuIiwiaW1wb3J0IHsgTm90aWZpZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uLXRzL05vdGlmaWVyXCI7XG5pbXBvcnQgeyBQb3N0U2V0dGluZ3NWYXJpYWJsZXMgfSBmcm9tIFwiLi9Qb3N0U2V0dGluZ3NWYXJpYWJsZXNcIjtcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi10cy9VdGlsc1wiO1xuZXhwb3J0IGNsYXNzIFRlc3REYXRhUHJlcGFyZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm5vdGlmaWVyID0gTm90aWZpZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgdGhpcy5wc3YgPSBQb3N0U2V0dGluZ3NWYXJpYWJsZXMuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3JlcyB0aGUgbGF0ZXN0IGNsaWNrZWQgb3B0aW9ucyBib3ggYnV0dG9uLiBJZiB0aGlzIGlzIG5vdCBudWxsLCB0aGVuIHRoZSBvcHRpb25zIGJveCBmb3IgdGhpcyBidXR0b24gaXMgY3VycmVudGx5XG4gICAgICAgICAqIG9wZW4uXG4gICAgICAgICAqIEB0eXBlIHtudWxsfE9iamVjdHxqUXVlcnl9XG4gICAgICAgICAqL1xuICAgICAgICB3aW5kb3cuJGxhc3RDbGlja2VkT3B0aW9uc0JveEJ1dHRvbiA9IG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoaXMgY2xhc3MgaXMgYSBzaW5nbGV0b24uIEdldCB0aGUgaW5zdGFuY2Ugd2l0aCB0aGlzIG1ldGhvZC5cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgICAgIGlmICh0aGlzLklOU1RBTkNFID09PSBudWxsKVxuICAgICAgICAgICAgdGhpcy5JTlNUQU5DRSA9IG5ldyBUZXN0RGF0YVByZXBhcmVyKCk7XG4gICAgICAgIHJldHVybiB0aGlzLklOU1RBTkNFO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQcmVwYXJlcyB0aGUgZGF0YSB0aGF0IHdpbGwgYmUgc2VudCB3aXRoIHRoZSBBSkFYIHJlcXVlc3Qgd2hlbiBjb25kdWN0aW5nIHRlc3RzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gJHRlc3RCdXR0b24gVGhlIHRlc3QgYnV0dG9uIHRoYXQgaXMgY2xpY2tlZFxuICAgICAqIEByZXR1cm5zIHtudWxsfG9iamVjdH1cbiAgICAgKi9cbiAgICBwcmVwYXJlVGVzdERhdGEoJHRlc3RCdXR0b24pIHtcbiAgICAgICAgLy8gR2V0IHRoZSByZXF1aXJlZCBkYXRhIGZyb20gdGhlIHRlc3QgYnV0dG9uLlxuICAgICAgICBsZXQgbURhdGEgPSAkdGVzdEJ1dHRvbi5kYXRhKFwid2NjXCIpO1xuICAgICAgICAvLyBEbyBub3QgcHJvY2VlZCBpZiB0aGUgZGF0YSBkb2VzIG5vdCBleGlzdC5cbiAgICAgICAgaWYgKG1EYXRhID09IHVuZGVmaW5lZCB8fCAhbURhdGEpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgLy8gQ2xvbmUgdGhlIG9iamVjdC5cbiAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG1EYXRhKSk7XG4gICAgICAgIGRhdGEgPSB0aGlzLmFkZFNldHRpbmdzVG9BamF4RGF0YShkYXRhKTtcbiAgICAgICAgLy8gR2V0IHRoZSBpbnB1dHMgKHRleHRhcmVhLCBidXR0b24sIHNlbGVjdCwgYW5kIGlucHV0IGVsZW1lbnRzKSB3aXRoIG5hbWVcbiAgICAgICAgbGV0ICRpbnB1dHMgPSAkdGVzdEJ1dHRvbi5jbG9zZXN0KFwiLmlucHV0LWdyb3VwXCIpLmZpbmQoJzppbnB1dFtuYW1lXScpO1xuICAgICAgICBpZiAoISRpbnB1dHMubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIC8qXG4gICAgICAgICAqIFJFUVVJUkVEIEVMRU1FTlRTXG4gICAgICAgICAqL1xuICAgICAgICAvLyBHZXQgdGhlIHJlcXVpcmVkIGVsZW1lbnQgc2VsZWN0b3JzLCBpZiB0aGVyZSBhcmUgYW55XG4gICAgICAgIGxldCBhbGxTZWxlY3RvcnNSZXF1aXJlZCA9IHRydWUsIHJlcXVpcmVkRWxFeHByID0gbURhdGFbXCJyZXF1aXJlZFNlbGVjdG9yc1wiXTtcbiAgICAgICAgaWYgKHJlcXVpcmVkRWxFeHByICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gSWYgcmVxdWlyZWQgZWxlbWVudCBzZWxlY3RvcnMgYXJlIHN1cHBsaWVkLCB0aGF0IG1lYW5zIG5vdCBhbGwgb2YgdGhlIFwiU2VsZWN0b3JcInMgaW4gdGhlIGRhdGEgYXJlIHJlcXVpcmVkLlxuICAgICAgICAgICAgYWxsU2VsZWN0b3JzUmVxdWlyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIElmIHRoZXJlIGFyZSByZXF1aXJlZCBzZWxlY3RvcnMsIGdldCB0aGVpciB2YWx1ZXMgYW5kIG5vdGlmeSB0aGUgdXNlclxuICAgICAgICAgICAgaWYgKHJlcXVpcmVkRWxFeHByLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIC8vIEZpcnN0LCB3ZSBuZWVkIHRvIHByZXBhcmUgdGhlIGV4cHJlc3Npb24gc3RyaW5nLiBIZXJlIGlzIGFuIGV4YW1wbGUgZXhwcmVzc2lvbiBzdHJpbmdcbiAgICAgICAgICAgICAgICAvLyAoLnNlbDEgfCAoIC5zZWwyICYgLnNlbDcgKSApICYgKCAuc2VsMiB8IC5zZWwzKSAmIC5zZWw1ICYjc2VsNFxuICAgICAgICAgICAgICAgIC8vIEFwcGVuZCBhbmQgcHJlcGVuZCBhIHNwYWNlIGFzIHdlbGwuXG4gICAgICAgICAgICAgICAgcmVxdWlyZWRFbEV4cHIgPSBcIiBcIiArIHJlcXVpcmVkRWxFeHByXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oWygpJnxdKS9nLCBcIiAkMSBcIikgLy8gRmlyc3Qgc3Vycm91bmQgZXZlcnkgc3BlY2lhbCBjaGFyLCBzdWNoIGFzICggKSAmLCB3aXRoIHNwYWNlXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHN7Mix9L2csIFwiIFwiKSAvLyBBbmQgZ2V0IHJpZCBvZiBtdWx0aXBsZSBzcGFjZXMuXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXCYvZywgJyYmJykgLy8gUmVwbGFjZSBzaW5nbGUgJiB3aXRoICYmXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHwvZywgJ3x8JykgLy8gUmVwbGFjZSBzaW5nbGUgfCB3aXRoIHx8XG4gICAgICAgICAgICAgICAgICAgIC50cmltKCkgKyBcIiBcIjtcbiAgICAgICAgICAgICAgICAvLyBOb3csIGdldCB0aGUgc2VsZWN0b3JzXG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdG9yTWF0Y2hlcyA9IHJlcXVpcmVkRWxFeHByLm1hdGNoKC8oWyNcXFtcXF09XFxefi5hLXowLTlfXFwtXCInXSspXFxzPy9nKTtcbiAgICAgICAgICAgICAgICBsZXQgZXZhbFN0ciA9IHJlcXVpcmVkRWxFeHByLCBjdXJyZW50U2VsZWN0b3IsICRlbCwgdmFsdWVFeGlzdHMsIHJlcXVpcmVkRWxzID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBzZWxlY3Rvck1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWxlY3Rvck1hdGNoZXMuaGFzT3duUHJvcGVydHkoaSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNlbGVjdG9yID0gc2VsZWN0b3JNYXRjaGVzW2ldLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50U2VsZWN0b3IubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIC8vbChcIkN1cnJlbnQgc2VsZWN0b3JcIik7XG4gICAgICAgICAgICAgICAgICAgIC8vbChjdXJyZW50U2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICAkZWwgPSAkKGN1cnJlbnRTZWxlY3RvcikuZmlyc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgLy9sKFwiRXNjYXBlZCBzZWxlY3RvcjpcIik7XG4gICAgICAgICAgICAgICAgICAgIC8vbChlc2NhcGVSZWdFeHAoY3VycmVudFNlbGVjdG9yKSk7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlRXhpc3RzID0gJGVsLmxlbmd0aCAmJiAkZWwudmFsKCkgIT0gdW5kZWZpbmVkICYmICRlbC52YWwoKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdmFsdWVFeGlzdHMgJiYgJGVsLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkRWxzLnB1c2goJGVsKTtcbiAgICAgICAgICAgICAgICAgICAgZXZhbFN0ciA9IGV2YWxTdHIucmVwbGFjZShuZXcgUmVnRXhwKHRoaXMuZXNjYXBlUmVnRXhwKGN1cnJlbnRTZWxlY3RvcikgKyBcIlxcXFxzXCIsIFwiZ1wiKSwgdmFsdWVFeGlzdHMgPyAndHJ1ZSAnIDogJ2ZhbHNlICcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgZXZhbHVhdGlvbiBpcyBmYWxzZSBhbmQgdGhlcmUgYXJlIHJlcXVpcmVkIGVsZW1lbnRzLCBub3RpZnkgdGhlIHVzZXIgZm9yIGEgcmVxdWlyZWQgZWxlbWVudC5cbiAgICAgICAgICAgICAgICBpZiAoIWV2YWwoZXZhbFN0cikgJiYgcmVxdWlyZWRFbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtYXggPSByZXF1aXJlZEVscy5sZW5ndGggLSAxLCBtaW4gPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWVyLm5vdGlmeShyZXF1aXJlZEVsc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluXSwgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qXG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICAvLyBJZiB0aGVyZSBhcmUgc2VsZWN0b3JzIGluIHRoZSBkYXRhLCBnZXQgdGhlIHZhbHVlcyBmcm9tIHRob3NlIGVsZW1lbnRzIHdob3NlIHNlbGVjdG9ycyBhcmUgZGVmaW5lZCBpbiB0aGUgZGF0YVxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZGF0YSkge1xuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSBrZXkgZW5kcyB3aXRoIFwiU2VsZWN0b3JcIi5cbiAgICAgICAgICAgIGlmICghZGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpIHx8ICEvU2VsZWN0b3IkLy50ZXN0KGtleSkpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAvLyBGaW5kIHRoZSB0YXJnZXQgZWxlbWVudFxuICAgICAgICAgICAgbGV0ICR0YXJnZXRFbCA9ICQoZGF0YVtrZXldKTtcbiAgICAgICAgICAgIC8vIElmIGFsbCBzZWxlY3RvcnMgYXJlIHJlcXVpcmVkIGFuZCB0aGlzIGVsZW1lbnQncyB2YWx1ZSBpcyBlbXB0eSwgbm90aWZ5IHRoZSB1c2VyIGFuZCByZXR1cm4gbnVsbC5cbiAgICAgICAgICAgIGlmIChhbGxTZWxlY3RvcnNSZXF1aXJlZCAmJiAoJHRhcmdldEVsLnZhbCgpID09IHVuZGVmaW5lZCB8fCAhJHRhcmdldEVsLnZhbCgpLmxlbmd0aCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWVyLm5vdGlmeSgkdGFyZ2V0RWwsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIHNlbGVjdG9yIHZhbHVlIGZyb20gdGhlIGRhdGEsIHNpbmNlIHdlIGRvIG5vdCBuZWVkIGl0LlxuICAgICAgICAgICAgZGVsZXRlIGRhdGFba2V5XTtcbiAgICAgICAgICAgIGlmICghJHRhcmdldEVsLmxlbmd0aClcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIC8vIEFkZCB0aGUga2V5IHdpdGggaXRzIHZhbHVlIHRvIHRoZSBkYXRhIHRvIGJlIHNlbnQgYnkgcmVtb3ZpbmcgXCJTZWxlY3RvclwiIGZyb20gdGhlIGtleS5cbiAgICAgICAgICAgIGlmICgkdGFyZ2V0RWwubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgZGF0YVtrZXkucmVwbGFjZShcIlNlbGVjdG9yXCIsIFwiXCIpXSA9ICR0YXJnZXRFbC52YWwoKSB8fCBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIElmIHRoZXJlIGFyZSBleHRyYSBzZWxlY3RvcnMgaW4gdGhlIGRhdGEsIGdldCB0aGUgdmFsdWVzIGZvciB0aG9zZSBhbmQgYWRkIHRoZW0gdG8gdGhlIGRhdGFcbiAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoJ2V4dHJhJykpIHtcbiAgICAgICAgICAgIGxldCBleHRyYSA9IGRhdGEuZXh0cmE7XG4gICAgICAgICAgICBsZXQgZXh0cmFQcmVwYXJlZCA9IHt9O1xuICAgICAgICAgICAgbGV0IGl0ZW0sIHZhbDtcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBleHRyYSkge1xuICAgICAgICAgICAgICAgIGlmICghZXh0cmEuaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgaXRlbSA9IGV4dHJhW2tleV07XG4gICAgICAgICAgICAgICAgLy8gVGhlIGl0ZW0gbXVzdCBoYXZlICdzZWxlY3RvcicgYW5kICdkYXRhJyBrZXlzLCB3aGVyZSB0aGUgc2VsZWN0b3IgaXMgdGhlIHRhcmdldCBlbGVtZW50J3Mgc2VsZWN0b3IgYW5kXG4gICAgICAgICAgICAgICAgLy8gdGhlIGRhdGEgaXMgdGhlIGRhdGEga2V5IHVuZGVyIHdoaWNoIHRoZSBkYXRhIGlzIHN0b3JlZCBpbiB0aGUgZWxlbWVudCB3aG9zZSBzZWxlY3RvciBpcyBnaXZlbi5cbiAgICAgICAgICAgICAgICBpZiAoIWl0ZW0uaGFzT3duUHJvcGVydHkoJ3NlbGVjdG9yJykgfHwgIWl0ZW0uaGFzT3duUHJvcGVydHkoJ2RhdGEnKSlcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgdmFsID0gJChpdGVtLnNlbGVjdG9yKS5kYXRhKGl0ZW0uZGF0YSk7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCAhPT0gbnVsbCAmJiB2YWwgIT09IHVuZGVmaW5lZCAmJiB2YWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4dHJhUHJlcGFyZWRba2V5XSA9IHZhbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBhcmUgZXh0cmEgZGF0YSwgYWRkIHRoZW0gdW5kZXIgJ2V4dHJhJyBrZXkgdG8gdGhlIGRhdGFcbiAgICAgICAgICAgIGlmICghJC5pc0VtcHR5T2JqZWN0KGV4dHJhUHJlcGFyZWQpKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5leHRyYSA9IGV4dHJhUHJlcGFyZWQ7XG4gICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCByZW1vdmUgdGhlICdleHRyYSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBkYXRhWydleHRyYSddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIElmIHRoZSBvcHRpb25zIGJveCBpcyBjdXJyZW50bHkgb3BlbiwgYWRkIHRoZSBvcHRpb25zIHRvIHRoZSByZXF1ZXN0LlxuICAgICAgICBpZiAod2luZG93LiRsYXN0Q2xpY2tlZE9wdGlvbnNCb3hCdXR0b24gIT09IG51bGwpIHtcbiAgICAgICAgICAgIGRhdGFbXCJvcHRpb25zQm94XCJdID0gd2luZG93LiRsYXN0Q2xpY2tlZE9wdGlvbnNCb3hCdXR0b24uZmluZCgnOmlucHV0JykuZmlyc3QoKS52YWwoKTtcbiAgICAgICAgICAgIC8vIFB1dCBhbiBpbmRpY2F0b3IgdGhhdCB0aGUgdGVzdCBpcyBjb25kdWN0ZWQgaW4gdGhlIG9wdGlvbnMgYm94XG4gICAgICAgICAgICBkYXRhW1wiZnJvbU9wdGlvbnNCb3hcIl0gPSAxO1xuICAgICAgICB9XG4gICAgICAgIC8vIEdldCB0aGUgdmFsdWVzIHRoYXQgc2hvdWxkIGJlIHRlc3RlZCBmcm9tIHRoZSBpbnB1dHMgbmV4dCB0byBjdXJyZW50IHRlc3QgYnV0dG9uXG4gICAgICAgIGRhdGFbXCJzZXJpYWxpemVkVmFsdWVzXCJdID0gJGlucHV0cy5zZXJpYWxpemUoKTtcbiAgICAgICAgLy8gQWRkIG5hbWUgb2YgdGhlIGZvcm0gaXRlbSB0aGF0IGlzIGJlaW5nIHRlc3RlZC4gR2V0IHRoZSBjaGFycyB1bnRpbCB0aGUgZmlyc3Qgb3BlbmluZyBicmFja2V0LlxuICAgICAgICBsZXQgcmF3TmFtZSA9ICRpbnB1dHMuZmlyc3QoKS5hdHRyKFwibmFtZVwiKTtcbiAgICAgICAgZGF0YVtcImZvcm1JdGVtTmFtZVwiXSA9IC9eKFteXFxbXSspLy5leGVjKHJhd05hbWUpWzFdIHx8IG51bGw7XG4gICAgICAgIC8vIFNvbWUgZm9ybSBpdGVtcywgc3VjaCBhcyB0aGUgZm9ybSBpdGVtcyBpbiBPcHRpb25zIEJveCwgaGF2ZSBhIG5hbWUgc3VjaCBhcyAnX29wdGlvbnNfYm94W2ZpbmRfcmVwbGFjZV0nXG4gICAgICAgIC8vIGFuZCB0aGUgbmFtZXMgb2YgdGhlIGlucHV0cyB1bmRlciB0aGlzIG5hbWUgYXJlIGxpa2UgJ19vcHRpb25zX2JveFtmaW5kX3JlcGxhY2VdWzBdW2ZpbmRdJyBhbmRcbiAgICAgICAgLy8gJ19vcHRpb25zX2JveFtmaW5kX3JlcGxhY2VdWzBdW3JlcGxhY2VdJy4gSW4gdGhpcyBjYXNlLCB0aGUgc2VudCBkYXRhIGlzIHN0cnVjdHVyZWQgYXM6XG4gICAgICAgIC8vICAgICAge19vcHRpb25zX2JveDoge2ZpbmRfcmVwbGFjZToge2ZpbmQ6ICdmaW5kIHZhbHVlJywgcmVwbGFjZTogJ3JlcGxhY2UgdmFsdWUnfX19XG4gICAgICAgIC8vIEhvd2V2ZXIsIGluIHRoZSBiYWNrZW5kLCBpdCBpcyBjb25zaWRlcmVkIHRoYXQgdGhlcmUgYXJlIG5vIGlubmVyIGFycmF5cy4gU28sIHRoZSBiYWNrZW5kIGV4cGVjdHMgdG8gZmluZDpcbiAgICAgICAgLy8gICAgICBbX29wdGlvbnNfYm94ID0+IFsnZmluZCcgPT4gJ2ZpbmQgdmFsdWUnLCAncmVwbGFjZScgPT4gJ3JlcGxhY2UgdmFsdWUnXV1cbiAgICAgICAgLy8gQnV0LCBpdCBnZXRzOlxuICAgICAgICAvLyAgICAgIFtfb3B0aW9uc19ib3ggPT4gWydmaW5kX3JlcGxhY2UnID0+IFsnZmluZCcgPT4gJ2ZpbmQgdmFsdWUnLCAncmVwbGFjZScgPT4gJ3JlcGxhY2UgdmFsdWUnXV1dXG4gICAgICAgIC8vIHdoaWNoIHJlc3VsdHMgaW4gYW4gZXJyb3IsIHNpbmNlIGl0IHVzZXMgdGhlIHNlbnQgJ2Zvcm1JdGVtTmFtZScgdmFsdWUgdG8gZmluZCB0aGUgdmFsdWVzLiBIZXJlLCB0aGVcbiAgICAgICAgLy8gJ2Zvcm1JdGVtTmFtZScgaXMgJ19vcHRpb25zX2JveCcuIFNvLCB0aGUgYmFja2VuZCBnZXRzOlxuICAgICAgICAvLyAgICAgIFsnZmluZF9yZXBsYWNlJyA9PiBbJ2ZpbmQnID0+ICdmaW5kIHZhbHVlJywgJ3JlcGxhY2UnID0+ICdyZXBsYWNlIHZhbHVlJ11dXG4gICAgICAgIC8vIGFzIHRoZSB0ZXN0IGRhdGEuIEhvd2V2ZXIsIGl0IHNob3VsZCBnZXQ6XG4gICAgICAgIC8vICAgICAgWydmaW5kJyA9PiAnZmluZCB2YWx1ZScsICdyZXBsYWNlJyA9PiAncmVwbGFjZSB2YWx1ZSddXG4gICAgICAgIC8vIFNvLCBoZXJlLCB3ZSBzZW5kIHRoZSBwYXRoIG9mIHRoZSBpbm5lciBhcnJheSB1bmRlciAnZm9ybUl0ZW1Eb3RLZXknLiBJdCBiYXNpY2FsbHkgc2VuZHMsIGZvciB0aGlzIGNhc2UsXG4gICAgICAgIC8vICdmaW5kX3JlcGxhY2UnIGFzIHRoZSBwYXRoLiBTbywgdGhlIGJhY2tlbmQgY2FuIGdldCB3aGF0IGl0IG5lZWRzLiBJZiB0aGUgbmFtZSBvZiB0aGUgZm9ybSBpdGVtIGlzLCBlLmcuOlxuICAgICAgICAvLyAgICAgIF9vcHRpb25zX2JveFtmaW5kX3JlcGxhY2VdW3Rlc3RdW21lc3RdW2Nvb2xdWzBdW3JlcGxhY2VdXG4gICAgICAgIC8vIHRoZSAnZm9ybUl0ZW1Eb3RLZXknIHdpbGwgYmUgJ2ZpbmRfcmVwbGFjZS50ZXN0Lm1lc3QuY29vbCcuIEhlcmUsIHdlIGJhc2ljYWxseSBmaW5kICdbZmluZF9yZXBsYWNlXVt0ZXN0XVttZXN0XVtjb29sXSdcbiAgICAgICAgLy8gcGFydCwgYW5kIHR1cm4gaXQgaW50byBkb3Qgbm90YXRpb24uIFRoZSB1c2VkIHJlZ3VsYXIgZXhwcmVzc2lvbiBhbmQgdGVzdCB2YWx1ZXMgYW5kIHJlc3VsdHMgYXJlIGJlbG93OlxuICAgICAgICAvL1xuICAgICAgICAvLyBSZWdleDogXlteXFxbXSsoW14wLTldKylcbiAgICAgICAgLy9cbiAgICAgICAgLy8gVGVzdCBzdHJpbmc6IF9vcHRpb25zX2JveFtmaW5kX3JlcGxhY2VdW3Rlc3RdW21lc3RdW2Nvb2xdWzBdW3JlcGxhY2VdXG4gICAgICAgIC8vICQxIGlzOiBbZmluZF9yZXBsYWNlXVt0ZXN0XVttZXN0XVtjb29sXVtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gVGVzdCBzdHJpbmc6IF9vcHRpb25zX2JveFswXVtmaW5kXVxuICAgICAgICAvLyAkMSBpczogW1xuICAgICAgICBsZXQgcGFydCA9IC9eW15cXFtdKyhbXjAtOV0rKS8uZXhlYyhyYXdOYW1lKVsxXSB8fCAnJztcbiAgICAgICAgaWYgKHBhcnQubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgLy8gVHVybiBpdCBpbnRvIGRvdCBub3RhdGlvbiBhbmQgZ2V0IHJpZCBvZiB1bm5lY2Vzc2FyeSBicmFja2V0c1xuICAgICAgICAgICAgcGFydCA9IHBhcnQuc3Vic3RyKDEsIHBhcnQubGVuZ3RoIC0gMikucmVwbGFjZSgnXVsnLCAnLicpLnJlcGxhY2UoJ1snLCAnJykucmVwbGFjZSgnXScsICcnKTtcbiAgICAgICAgICAgIC8vIEFkZCBpdCB0byB0aGUgZGF0YVxuICAgICAgICAgICAgZGF0YVtcImZvcm1JdGVtRG90S2V5XCJdID0gcGFydDtcbiAgICAgICAgfVxuICAgICAgICAvLyBBZGQgdGhlIHJlcXVpcmVkIGRhdGEgaWYgdGhpcyBpcyBhIFwiZmluZC1yZXBsYWNlIGluIGN1c3RvbSBtZXRhXCIgdGVzdFxuICAgICAgICBkYXRhID0gdGhpcy5hZGREYXRhRm9yRmluZFJlcGxhY2VJbkN1c3RvbU1ldGFPclNob3J0Q29kZVRlc3QoJHRlc3RCdXR0b24sIGRhdGEpO1xuICAgICAgICAvL2woXCJQcmVwYXJlZDpcIik7XG4gICAgICAgIC8vbChkYXRhKTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgcmVxdWlyZWQgc2V0dGluZ3MgdG8gdGhlIGRhdGEgdGhhdCB3aWxsIGJlIHNlbnQgdmlhIEFKQVguXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBhZGRTZXR0aW5nc1RvQWpheERhdGEoZGF0YSkge1xuICAgICAgICAvLyBGaXJzdCwgYWRkIHJhdyBIVE1MIGZpbmQtYW5kLXJlcGxhY2VzLlxuICAgICAgICBkYXRhID0gdGhpcy5hZGRNYW5pcHVsYXRpb25PcHRpb25zVG9BamF4RGF0YShkYXRhKTtcbiAgICAgICAgLy8gQWRkIGNvb2tpZSBzZXR0aW5nc1xuICAgICAgICBsZXQgJGNvb2tpZXMgPSAkKHRoaXMucHN2LnNlbGVjdG9yVGFiTWFpbikuZmluZCgnbGFiZWxbZm9yPScgKyB0aGlzLnBzdi5pbnB1dE5hbWVDb29raWVzICsgJ10nKS5jbG9zZXN0KCd0cicpLmZpbmQoJy5pbnB1dHMnKSB8fCBudWxsO1xuICAgICAgICBpZiAoJGNvb2tpZXMgIT09IG51bGwgJiYgJGNvb2tpZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBkYXRhWydjb29raWVzJ10gPSAkY29va2llcy5maW5kKCc6aW5wdXQnKS5zZXJpYWxpemUoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBZGQgY2FjaGluZyBzZXR0aW5nXG4gICAgICAgIGxldCAkY2hlY2tib3hDYWNoZSA9ICQodGhpcy5wc3Yuc2VsZWN0b3JUYWJNYWluKS5maW5kKCdpbnB1dFtuYW1lPVwiX2NhY2hlX3Rlc3RfdXJsX3Jlc3BvbnNlc1wiXScpIHx8IG51bGw7XG4gICAgICAgIGlmICgkY2hlY2tib3hDYWNoZSAhPT0gbnVsbCAmJiAkY2hlY2tib3hDYWNoZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRhdGFbJ2NhY2hlVGVzdFVybFJlc3BvbnNlcyddID0gJGNoZWNrYm94Q2FjaGVbMF0uY2hlY2tlZCA/IDEgOiAwO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHRoZXJlIGlzIFwidXNlIGN1c3RvbSBzZXR0aW5nc1wiIGNoZWNrYm94XG4gICAgICAgIGxldCAkdXNlQ3VzdG9tU2V0dGluZ3NDaGVja2JveCA9ICQoXCIjX2RvX25vdF91c2VfZ2VuZXJhbF9zZXR0aW5nc1wiKSB8fCBudWxsO1xuICAgICAgICBsZXQgdXNlQ3VzdG9tR2VuZXJhbFNldHRpbmdzID0gZmFsc2U7XG4gICAgICAgIGlmICgkdXNlQ3VzdG9tU2V0dGluZ3NDaGVja2JveCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIHVzZXIgd2FudHMgdG8gdXNlIGN1c3RvbSBnZW5lcmFsIHNldHRpbmdzXG4gICAgICAgICAgICBpZiAoJHVzZUN1c3RvbVNldHRpbmdzQ2hlY2tib3gubGVuZ3RoICYmICR1c2VDdXN0b21TZXR0aW5nc0NoZWNrYm94WzBdLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBBZGQgYWxsIGdlbmVyYWwgc2V0dGluZ3NcbiAgICAgICAgICAgICAgICBkYXRhW1wiY3VzdG9tR2VuZXJhbFNldHRpbmdzXCJdID0gJCh0aGlzLnBzdi5zZWxlY3RvclRhYkdlbmVyYWxTZXR0aW5ncykuZmluZCgnOmlucHV0Jykuc2VyaWFsaXplKCk7XG4gICAgICAgICAgICAgICAgdXNlQ3VzdG9tR2VuZXJhbFNldHRpbmdzID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhdGFbXCJjdXN0b21HZW5lcmFsU2V0dGluZ3NcIl0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWRkIHdoZXRoZXIgdGhlIHVzZXIgd2FudHMgdG8gdXNlIFVURi04IG9yIG5vdCB0byB0aGUgZGF0YVxuICAgICAgICBsZXQgJHVzZVV0ZjhDaGVja2JveCA9ICQoXCIjX3dwY2NfbWFrZV9zdXJlX2VuY29kaW5nX3V0ZjhcIikgfHwgbnVsbDtcbiAgICAgICAgaWYgKCR1c2VVdGY4Q2hlY2tib3ggIT09IG51bGwgJiYgJHVzZVV0ZjhDaGVja2JveC5sZW5ndGggJiYgdXNlQ3VzdG9tR2VuZXJhbFNldHRpbmdzKSB7XG4gICAgICAgICAgICBkYXRhW1widXNlVXRmOFwiXSA9ICR1c2VVdGY4Q2hlY2tib3guZmlyc3QoKVswXS5jaGVja2VkID8gMSA6IDA7XG4gICAgICAgICAgICBsZXQgJGNvbnZlcnRFbmNvZGluZ0NoZWNrYm94ID0gJChcIiNfd3BjY19jb252ZXJ0X2NoYXJzZXRfdG9fdXRmOFwiKSB8fCBudWxsO1xuICAgICAgICAgICAgZGF0YVtcImNvbnZlcnRFbmNvZGluZ1RvVXRmOFwiXSA9IFV0aWxzLmdldENoZWNrYm94VmFsdWUoJGNvbnZlcnRFbmNvZGluZ0NoZWNrYm94KSA/IDEgOiAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGF0YVtcInVzZVV0ZjhcIl0gPSAtMTtcbiAgICAgICAgICAgIGRhdGFbXCJjb252ZXJ0RW5jb2RpbmdUb1V0ZjhcIl0gPSAtMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBmaW5kLWFuZC1yZXBsYWNlIG9wdGlvbnMgZm9yIHRoZSByYXcgSFRNTCByZXNwb25zZSB0byB0aGUgQUpBWCBkYXRhLlxuICAgICAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIGluIHdoaWNoIGZpbmQtYW5kLXJlcGxhY2VzIHRvIGJlIGFkZGVkXG4gICAgICovXG4gICAgYWRkTWFuaXB1bGF0aW9uT3B0aW9uc1RvQWpheERhdGEoZGF0YSkge1xuICAgICAgICAvLyBGaXJzdCwgd2UgbmVlZCB0byBmaW5kIG91dCB3aGV0aGVyIHRoZSB1c2VyIHRlc3RzIHRoZSBjYXRlZ29yeSBvciB0aGUgcG9zdCBzZXR0aW5ncy5cbiAgICAgICAgLy8gV2UgY2FuIGRvIHRoaXMgYnkgY2hlY2tpbmcgdGhlIGN1cnJlbnQgdGFiLiBJbiB0aGUgY3VycmVudCB0YWIsIHdlIG5lZWQgdG8gZmluZCBmaW5kLWFuZC1yZXBsYWNlIG9wdGlvbnMgZm9yXG4gICAgICAgIC8vIHJhdyBIVE1MLlxuICAgICAgICBsZXQgJGFjdGl2ZVRhYiA9ICQoJ2Rpdi50YWI6bm90KC5oaWRkZW4pJyksIGFjdGl2ZVRhYklkID0gJGFjdGl2ZVRhYi5hdHRyKCdpZCcpLnJlcGxhY2UoJ3RhYi0nLCAnJyk7XG4gICAgICAgIC8vIElmIHRoaXMgaXMgdGhlIHRlbXBsYXRlcyB0YWIsIHVzZSBtYW5pcHVsYXRpb24gb3B0aW9ucyBmcm9tIHRoZSBwb3N0IHRhYi5cbiAgICAgICAgaWYgKGFjdGl2ZVRhYklkLnRvTG93ZXJDYXNlKCkgPT09ICd0ZW1wbGF0ZXMnKSB7XG4gICAgICAgICAgICAkYWN0aXZlVGFiID0gJCh0aGlzLnBzdi5zZWxlY3RvclRhYlBvc3QpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBuYW1lTWF0Y2hSZWdleCA9IC9bXlxcXFxbXSsvO1xuICAgICAgICBsZXQgcmVzdWx0cyA9IHt9O1xuICAgICAgICBsZXQgY3VycmVudElucHV0TmFtZSwgJGlucHV0LCAkaW5wdXRzLCBhY3R1YWxOYW1lO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHN2LmJhc2VIdG1sTWFuaXB1bGF0aW9uSW5wdXROYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY3VycmVudElucHV0TmFtZSA9IHRoaXMucHN2LmJhc2VIdG1sTWFuaXB1bGF0aW9uSW5wdXROYW1lc1tpXTtcbiAgICAgICAgICAgIC8vIEdldCBhIHNpbmdsZSBpbnB1dFxuICAgICAgICAgICAgJGlucHV0ID0gJGFjdGl2ZVRhYi5maW5kKCdpbnB1dFtuYW1lKj1cIicgKyBjdXJyZW50SW5wdXROYW1lICsgJ1wiXScpLmZpcnN0KCk7XG4gICAgICAgICAgICAvLyBHZXQgYWxsIGlucHV0cyBmb3IgdGhlIGlucHV0IG5hbWVcbiAgICAgICAgICAgICRpbnB1dHMgPSAkaW5wdXQuY2xvc2VzdChcIi5pbnB1dHNcIikuZmluZCgnOmlucHV0Jyk7XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBubyBpbnB1dCwgY29udGludWUuXG4gICAgICAgICAgICBpZiAoJGlucHV0cy5sZW5ndGggPCAxKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgLy8gR2V0IGFjdHVhbCBuYW1lIG9mIHRoZSBpbnB1dFxuICAgICAgICAgICAgYWN0dWFsTmFtZSA9ICRpbnB1dC5hdHRyKFwibmFtZVwiKS5tYXRjaChuYW1lTWF0Y2hSZWdleClbMF07XG4gICAgICAgICAgICAvLyBTZXJpYWxpemUgaW5wdXRzIGFuZCBhZGQgdGhlbSB0byB0aGUgZGF0YSB1bmRlciB0aGVpciBhY3R1YWwgbmFtZVxuICAgICAgICAgICAgcmVzdWx0c1thY3R1YWxOYW1lXSA9ICRpbnB1dHMuc2VyaWFsaXplKCk7XG4gICAgICAgIH1cbiAgICAgICAgZGF0YVtcIm1hbmlwdWxhdGlvbl9vcHRpb25zXCJdID0gcmVzdWx0cztcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCBkYXRhIHRvIHRoZSBvcmlnaW5hbCB0ZXN0IGRhdGEgZm9yIGZpbmQtcmVwbGFjZSBpbiBjdXN0b20gbWV0YSBhbmQgY3VzdG9tIHNob3J0IGNvZGUgdGVzdFxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9ICR0ZXN0QnV0dG9uIFRoZSB0ZXN0IGJ1dHRvbiB0aGF0IGlzIGNsaWNrZWQgdG8gcGVyZm9ybSB0aGUgdGVzdFxuICAgICAqIEBwYXJhbSB7YXJyYXl9IGRhdGEgT3JpZ2luYWwgZGF0YSB0byB3aGljaCB0aGUgbmV3IGRhdGEgd2lsbCBiZSBhZGRlZFxuICAgICAqIEByZXR1cm4ge2FycmF5fSBEYXRhIHdpdGggdGhlIGRhdGEgZm9yIGZpbmQgcmVwbGFjZSBpbiBjdXN0b20gbWV0YSB0ZXN0XG4gICAgICovXG4gICAgYWRkRGF0YUZvckZpbmRSZXBsYWNlSW5DdXN0b21NZXRhT3JTaG9ydENvZGVUZXN0KCR0ZXN0QnV0dG9uLCBkYXRhKSB7XG4gICAgICAgIGxldCBjbHNDdXN0b21NZXRhID0gXCJ3Y2MtdGVzdC1maW5kLXJlcGxhY2UtaW4tY3VzdG9tLW1ldGFcIiwgY2xzQ3VzdG9tU2hvcnRDb2RlID0gXCJ3Y2MtdGVzdC1maW5kLXJlcGxhY2UtaW4tY3VzdG9tLXNob3J0LWNvZGVcIjtcbiAgICAgICAgLy8gSWYgdGhlIHRlc3QgYnV0dG9uIGlzIG5vdCB0aGUgdGVzdCBidXR0b24gd2UgYXJlIGxvb2tpbmcgZm9yLCBkbyBub3QgcHJvY2VlZCBhbmQganVzdCByZXR1cm4gdGhlIG9yaWdpbmFsIGRhdGEuXG4gICAgICAgIGlmICghJHRlc3RCdXR0b24uaGFzQ2xhc3MoY2xzQ3VzdG9tTWV0YSkgJiYgISR0ZXN0QnV0dG9uLmhhc0NsYXNzKGNsc0N1c3RvbVNob3J0Q29kZSkpXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgbGV0IGlzQ3VzdG9tTWV0YSA9ICR0ZXN0QnV0dG9uLmhhc0NsYXNzKGNsc0N1c3RvbU1ldGEpLCB0YXJnZXRJbnB1dFNlbGVjdG9yID0gJy4nICsgKGlzQ3VzdG9tTWV0YSA/ICdtZXRhLWtleScgOiAnc2hvcnQtY29kZScpLCB0YXJnZXRJbnB1dEdyb3VwU2VsZWN0b3IgPSAnLicgKyAoaXNDdXN0b21NZXRhID8gJ3NlbGVjdG9yLWN1c3RvbS1wb3N0LW1ldGEnIDogJ3NlbGVjdG9yLWN1c3RvbS1zaG9ydGNvZGUnKTtcbiAgICAgICAgLy8gR2V0IHRoZSBtZXRhIGtleSBmb3Igd2hpY2ggdGhlIHVzZXIgd2FudHMgdG8gcGVyZm9ybSBmaW5kIGFuZCByZXBsYWNlIG9wZXJhdGlvblxuICAgICAgICBsZXQgJGtleUlucHV0ID0gJHRlc3RCdXR0b24uY2xvc2VzdChcIi5pbnB1dC1ncm91cFwiKS5maW5kKCcuaW5wdXQtY29udGFpbmVyJykuZmluZCh0YXJnZXRJbnB1dFNlbGVjdG9yKTtcbiAgICAgICAgLy8gSWYgbWV0YSBrZXkgaW5wdXQgZG9lcyBub3QgZXhpc3QsIG5vIG5lZWQgdG8gZ28gb24uIFJldHVybiB0aGUgb3JpZ2luYWwgZGF0YS5cbiAgICAgICAgaWYgKCEka2V5SW5wdXQubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIC8vIEdldCB0aGUgbWV0YSBrZXlcbiAgICAgICAgbGV0IGtleSA9ICRrZXlJbnB1dC52YWwoKTtcbiAgICAgICAgaWYgKGtleSA9PSB1bmRlZmluZWQgfHwgIWtleS5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgIC8vIFRoZXJlIGFyZSB0d28gcG9zc2libGUgcGxhY2VzIHRoZSB1c2VyIGNhbiBkZWZpbmUgY3VzdG9tIG1ldGEga2V5cy4gT25lIG9mIHRoZW0gY2FuIGJlIGRlZmluZWQgYnkgQ1NTIHNlbGVjdG9yc1xuICAgICAgICAvLyBhbmQgdGhlIG90aGVyIG9uZSBieSBtYW51YWxseS4gV2UnbGwgaGFuZGxlIGJvdGggb2YgdGhlIGNhc2VzIGJlbG93LiBXZSBqdXN0IG5lZWQgb25lIHZhbHVlLiBTbywgaWYgYSB2YWx1ZVxuICAgICAgICAvLyBpcyBmb3VuZCwgdGhhdCdzIGl0LiBXZSdyZSBkb25lLlxuICAgICAgICAvLyBGaW5kIG1ldGEga2V5IGlucHV0cyBkZWZpbmVkIGluIHNlbGVjdG9yIGN1c3RvbSBwb3N0IG1ldGEgb3B0aW9uc1xuICAgICAgICAkKCcuaW5wdXQtZ3JvdXAnICsgdGFyZ2V0SW5wdXRHcm91cFNlbGVjdG9yICsgJyAnICsgdGFyZ2V0SW5wdXRTZWxlY3RvcikuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoZm91bmQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgbGV0ICRzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgICAgIGlmICgkc2VsZi52YWwoKSA9PSBrZXkpIHtcbiAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIHNlbGVjdG9yIGFuZCBpdHMgYXR0cmlidXRlXG4gICAgICAgICAgICAgICAgbGV0ICRjc3NTZWxlY3RvcklucHV0ID0gJHNlbGYuY2xvc2VzdCgnLmlucHV0LWdyb3VwJykuZmluZCgnLmNzcy1zZWxlY3RvcicpLCAkY3NzU2VsZWN0b3JBdHRySW5wdXQgPSAkc2VsZi5jbG9zZXN0KCcuaW5wdXQtZ3JvdXAnKS5maW5kKCcuY3NzLXNlbGVjdG9yLWF0dHInKSwgJG9wdGlvbnNCb3hJbnB1dCA9ICRzZWxmLmNsb3Nlc3QoJy5pbnB1dC1ncm91cCcpLmZpbmQoJ1tuYW1lKj1cIltvcHRpb25zX2JveF1cIl0nKSwgY3NzU2VsZWN0b3IgPSAkY3NzU2VsZWN0b3JJbnB1dC52YWwoKSwgYXR0ciA9ICRjc3NTZWxlY3RvckF0dHJJbnB1dC52YWwoKSwgb3B0aW9uc0JveERhdGEgPSAkb3B0aW9uc0JveElucHV0Lmxlbmd0aCA/ICRvcHRpb25zQm94SW5wdXQudmFsKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSBDU1Mgc2VsZWN0b3IsIHdlJ3ZlIHJlYWNoZWQgb3VyIGdvYWwuXG4gICAgICAgICAgICAgICAgaWYgKGNzc1NlbGVjdG9yICE9IHVuZGVmaW5lZCAmJiBjc3NTZWxlY3Rvci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHRoZSBzZWxlY3RvciB0byB0aGUgZGF0YVxuICAgICAgICAgICAgICAgICAgICBkYXRhW1widmFsdWVTZWxlY3RvclwiXSA9IGNzc1NlbGVjdG9yO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0ciAhPSB1bmRlZmluZWQgJiYgYXR0ci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbXCJ2YWx1ZVNlbGVjdG9yQXR0clwiXSA9IGF0dHI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlcmUgYXJlIG9wdGlvbnMgZm9yIHRoZSB0YXJnZXQgaW5wdXQgZ3JvdXAsIGFkZCB0aGVtIGFzIHdlbGxcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnNCb3hEYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbXCJ2YWx1ZU9wdGlvbnNCb3hEYXRhXCJdID0gb3B0aW9uc0JveERhdGE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gTWFyayBpdCBhcyBmb3VuZFxuICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gSWYgdGhlIHNlbGVjdG9yIGNvdWxkIG5vdCBiZSBmb3VuZCwgdHJ5IGN1c3RvbSBwb3N0IG1ldGEgb3B0aW9ucy5cbiAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgICAgaWYgKGlzQ3VzdG9tTWV0YSkge1xuICAgICAgICAgICAgICAgICQoJy5pbnB1dC1ncm91cC5jdXN0b20tcG9zdC1tZXRhIC5tZXRhLWtleScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZm91bmQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGxldCAkc2VsZiA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkc2VsZi52YWwoKSA9PSBrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkdmFsdWVJbnB1dCA9ICRzZWxmLmNsb3Nlc3QoJy5pbnB1dC1ncm91cCcpLmZpbmQoJ2lucHV0W3R5cGU9dGV4dF06bm90KC5tZXRhLWtleSknKSwgdmFsdWUgPSAkdmFsdWVJbnB1dC52YWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPSB1bmRlZmluZWQgJiYgdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtcInN1YmplY3RcIl0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBNYXJrIGl0IGFzIGZvdW5kXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVzY2FwZXMgc3BlY2lhbCByZWdleCBjaGFyc1xuICAgICAqXG4gICAgICogQHBhcmFtIHN0clxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqIEBzZWUgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTE0NDc4OC8yODgzNDg3XG4gICAgICovXG4gICAgZXNjYXBlUmVnRXhwKHN0cikge1xuICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyhbLiorP149IToke30oKXxcXFtcXF1cXC9cXFxcXSkvZywgXCJcXFxcJDFcIik7XG4gICAgfVxufVxuVGVzdERhdGFQcmVwYXJlci5JTlNUQU5DRSA9IG51bGw7XG4iLCJpbXBvcnQgeyBXb29Db21tZXJjZVNldHRpbmdzVmFyaWFibGVzIH0gZnJvbSBcIi4vV29vQ29tbWVyY2VTZXR0aW5nc1ZhcmlhYmxlc1wiO1xuaW1wb3J0IHsgRGVwZW5kYW50SGFuZGxlciB9IGZyb20gXCIuLi8uLi9jb21tb24tdHMvRGVwZW5kYW50SGFuZGxlclwiO1xuZXhwb3J0IGNsYXNzIFdvb0NvbW1lcmNlU2V0dGluZ3Mge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIHRoZSBXb29Db21tZXJjZSBzZXR0aW5ncyBhcmUgbm90IGF2YWlsYWJsZS5cbiAgICAgICAgaWYgKCFXb29Db21tZXJjZVNldHRpbmdzLmlzV29vQ29tbWVyY2VTZXR0aW5nc0F2YWlsYWJsZSgpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLndjc3YgPSBXb29Db21tZXJjZVNldHRpbmdzVmFyaWFibGVzLmdldEluc3RhbmNlKCk7XG4gICAgICAgIC8vIEhhbmRsZSBVUkwgaGFzaCBhZnRlciB0aGUgZG9jdW1lbnQgaXMgcmVhZHksIGJlY2F1c2UgdGhlIGhhc2ggc2hvdWxkIGhhdmUgYmVlbiBzZXQgYW5kIHJlYWR5LlxuICAgICAgICAkKGRvY3VtZW50KS5yZWFkeSgoZSkgPT4gdGhpcy5oYW5kbGVVUkxIYXNoKCkpO1xuICAgICAgICAvLyBIYW5kbGUgdGFic1xuICAgICAgICB0aGlzLndjc3YuJHNldHRpbmdzQ29udGFpbmVyLm9uKCdjbGljaycsICcudGFiLXdyYXBwZXIgbGkgPiBhJywgKGUpID0+IHRoaXMub25DbGlja1RhYihlKSk7XG4gICAgICAgIC8vIEhhbmRsZSBwcm9kdWN0IHR5cGUgc2VsZWN0aW9uXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCB0aGlzLndjc3Yuc2VsZWN0b3JTZWxlY3RQcm9kdWN0VHlwZSwgKGUpID0+IHRoaXMub25DaGFuZ2VQcm9kdWN0VHlwZVNlbGVjdChlKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoaXMgY2xhc3MgaXMgYSBzaW5nbGV0b24uIEdldCB0aGUgaW5zdGFuY2Ugd2l0aCB0aGlzIG1ldGhvZC5cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgICAgIGlmICh0aGlzLklOU1RBTkNFID09PSBudWxsKVxuICAgICAgICAgICAgdGhpcy5JTlNUQU5DRSA9IG5ldyBXb29Db21tZXJjZVNldHRpbmdzKCk7XG4gICAgICAgIHJldHVybiB0aGlzLklOU1RBTkNFO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYW5hZ2VzIHByb2R1Y3QgdHlwZSBzZWxlY3Rpb24gY2hhbmdlc1xuICAgICAqIEBwYXJhbSBlXG4gICAgICovXG4gICAgb25DaGFuZ2VQcm9kdWN0VHlwZVNlbGVjdChlKSB7XG4gICAgICAgIGxldCAkdGFyZ2V0ID0gJChlLnRhcmdldCk7XG4gICAgICAgIC8vIElmIHRoZSBzZWxlY3RlZCB0eXBlIGlzICdleHRlcm5hbCdcbiAgICAgICAgaWYgKCR0YXJnZXQudmFsKCkgPT0gJ2V4dGVybmFsJykge1xuICAgICAgICAgICAgLy8gVW5jaGVjayAndmlydHVhbCcgYW5kICdkb3dubG9hZGFibGUnIGNoZWNrYm94ZXNcbiAgICAgICAgICAgIGxldCAkY2JWaXJ0dWFsID0gJCh0aGlzLndjc3Yuc2VsZWN0b3JDaGVja2JveFZpcnR1YWwpIHx8IG51bGw7XG4gICAgICAgICAgICBsZXQgJGNiRG93bmxvYWRhYmxlID0gJCh0aGlzLndjc3Yuc2VsZWN0b3JDaGVja2JveERvd25sb2FkYWJsZSkgfHwgbnVsbDtcbiAgICAgICAgICAgIGxldCBjaGVja2JveGVzID0gWyRjYlZpcnR1YWwsICRjYkRvd25sb2FkYWJsZV07XG4gICAgICAgICAgICBmb3IgKGxldCAkY2Igb2YgY2hlY2tib3hlcykge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBjaGVja2JveCBkb2VzIG5vdCBleGlzdCwgY29udGludWUgd2l0aCBhbm90aGVyIG9uZS5cbiAgICAgICAgICAgICAgICBpZiAoJGNiID09PSBudWxsIHx8ICEkY2IubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAvLyBVbmNoZWNrIHRoZSBjaGVja2JveC5cbiAgICAgICAgICAgICAgICAkY2JbMF0uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgY2hhbmdlIGV2ZW50IGZvciB0aGUgY2hlY2tib3hlcyBzbyB0aGF0IHRoZWlyIGRlcGVuZGFudHMgY2FuIGJlIGhhbmRsZWQuXG4gICAgICAgICAgICAgICAgJGNiLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIEhhbmRsZSB0aGUgZGVwZW5kYW50c1xuICAgICAgICBEZXBlbmRhbnRIYW5kbGVyLmdldEluc3RhbmNlKCkuaGFuZGxlU2VsZWN0RGVwZW5kYW50cygkdGFyZ2V0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybiBUcnVlIGlmIFdvb0NvbW1lcmNlIG9wdGlvbnMgYXJlIGF2YWlsYWJsZSBpbiB0aGUgcGFnZS5cbiAgICAgKi9cbiAgICBzdGF0aWMgaXNXb29Db21tZXJjZVNldHRpbmdzQXZhaWxhYmxlKCkge1xuICAgICAgICByZXR1cm4gJChcIiN3b29jb21tZXJjZS1vcHRpb25zLWNvbnRhaW5lclwiKS5sZW5ndGggPiAwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIGNsaWNrcyB0byB0aGUgdGFicyBvZiBXb29Db21tZXJjZSBzZXR0aW5nc1xuICAgICAqIEBwYXJhbSBlXG4gICAgICovXG4gICAgb25DbGlja1RhYihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLy8gR2V0IHRoZSBjbG9zZXN0IGFuY2hvciB0YWcsIGJlY2F1c2UgdGhlIGNsaWNrIGV2ZW50IG1heSBiZSB0cmlnZ2VyZWQgZm9yIGFuIGVsZW1lbnQgaW5zaWRlIHRoZSBhbmNob3IgdGFnXG4gICAgICAgIGxldCAkc2VsZiA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJ2EnKTtcbiAgICAgICAgdGhpcy5hY3RpdmF0ZVRhYigkc2VsZi5kYXRhKFwidGFiXCIpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWN0aXZhdGUgYSB0YWIgb2YgV29vQ29tbWVyY2Ugc2V0dGluZ3MuXG4gICAgICogQHBhcmFtIHRhYlNlbGVjdG9yIFNlbGVjdG9yIG9mIHRoZSB0YWIuXG4gICAgICovXG4gICAgYWN0aXZhdGVUYWIodGFiU2VsZWN0b3IpIHtcbiAgICAgICAgbGV0ICR0YWIgPSB0aGlzLndjc3YuJHRhYkNvbnRhaW5lci5maW5kKCdbZGF0YS10YWI9XCInICsgdGFiU2VsZWN0b3IgKyAnXCJdJyk7XG4gICAgICAgIGlmICghJHRhYi5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIC8vIEZpcnN0IGRlYWN0aXZhdGUgYWxsIHRhYnNcbiAgICAgICAgdGhpcy53Y3N2LiRjb250ZW50Q29udGFpbmVyLmZpbmQoXCIudGFiLWNvbnRlbnRcIikuYWRkQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICAgIHRoaXMud2Nzdi4kdGFiQ29udGFpbmVyLmZpbmQoXCJsaVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICAgLy8gTm93IGFjdGl2YXRlIHRoZSBzZWxlY3RlZCB0YWJcbiAgICAgICAgbGV0IGVsZW1lbnRJZCA9ICR0YWIuZGF0YShcInRhYlwiKTtcbiAgICAgICAgJChlbGVtZW50SWQpLnJlbW92ZUNsYXNzKFwiaGlkZGVuXCIpO1xuICAgICAgICAkdGFiLmNsb3Nlc3QoJ2xpJykuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgIC8vIENoYW5nZSB3aW5kb3cgaGFzaC4gV2Ugc2VwYXJhdGUgdGhlIGhhc2hlcyB3aXRoIHBpcGUgXCJ8XCIuXG4gICAgICAgIGxldCBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2guc3BsaXQoXCJ8XCIpO1xuICAgICAgICAvLyBBY3RpdmUgV29vQ29tbWVyY2UgdGFiIGlzIHN0b3JlZCBpbiAxc3QgaW5kZXguXG4gICAgICAgIGhhc2hbMV0gPSBlbGVtZW50SWQ7XG4gICAgICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBoYXNoLmpvaW4oXCJ8XCIpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBVUkwgaGFzaCBjaGFuZ2VzLiBFLmcuIGFjdGl2YXRlcyB0YWJzLlxuICAgICAqL1xuICAgIGhhbmRsZVVSTEhhc2goKSB7XG4gICAgICAgIGxldCBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XG4gICAgICAgIGlmIChoYXNoICYmIGhhc2guaW5kZXhPZihcIiNfXCIpID09PSAwKSB7XG4gICAgICAgICAgICBsZXQgaGFzaEFyciA9IGhhc2guc3BsaXQoXCJ8XCIpO1xuICAgICAgICAgICAgaWYgKGhhc2hBcnIubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIGxldCB0YWJIYXNoID0gaGFzaEFyclsxXTtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2YXRlVGFiKHRhYkhhc2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuV29vQ29tbWVyY2VTZXR0aW5ncy5JTlNUQU5DRSA9IG51bGw7XG4iLCJleHBvcnQgY2xhc3MgV29vQ29tbWVyY2VTZXR0aW5nc1ZhcmlhYmxlcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JTZXR0aW5nc1dyYXBwZXIgPSAnLndvb2NvbW1lcmNlLXNldHRpbmdzLXdyYXBwZXInO1xuICAgICAgICB0aGlzLnNlbGVjdG9yVGFiQ29udGVudFdyYXBwZXIgPSB0aGlzLnNlbGVjdG9yU2V0dGluZ3NXcmFwcGVyICsgJyA+IC50YWItY29udGVudC13cmFwcGVyJztcbiAgICAgICAgdGhpcy4kc2V0dGluZ3NDb250YWluZXIgPSAkKHRoaXMuc2VsZWN0b3JTZXR0aW5nc1dyYXBwZXIpO1xuICAgICAgICB0aGlzLiR0YWJDb250YWluZXIgPSAkKHRoaXMuc2VsZWN0b3JTZXR0aW5nc1dyYXBwZXIgKyAnID4gLnRhYi13cmFwcGVyJyk7XG4gICAgICAgIHRoaXMuJGNvbnRlbnRDb250YWluZXIgPSAkKHRoaXMuc2VsZWN0b3JUYWJDb250ZW50V3JhcHBlcik7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JTZWxlY3RQcm9kdWN0VHlwZSA9ICcjX3djX3Byb2R1Y3RfdHlwZSc7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JDaGVja2JveFZpcnR1YWwgPSAnI193Y192aXJ0dWFsJztcbiAgICAgICAgdGhpcy5zZWxlY3RvckNoZWNrYm94RG93bmxvYWRhYmxlID0gJyNfd2NfZG93bmxvYWRhYmxlJztcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhpcyBjbGFzcyBpcyBhIHNpbmdsZXRvbi4gR2V0IHRoZSBpbnN0YW5jZSB3aXRoIHRoaXMgbWV0aG9kLlxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuSU5TVEFOQ0UgPT09IG51bGwpXG4gICAgICAgICAgICB0aGlzLklOU1RBTkNFID0gbmV3IFdvb0NvbW1lcmNlU2V0dGluZ3NWYXJpYWJsZXMoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuSU5TVEFOQ0U7XG4gICAgfVxufVxuV29vQ29tbWVyY2VTZXR0aW5nc1ZhcmlhYmxlcy5JTlNUQU5DRSA9IG51bGw7XG4iLCJpbXBvcnQgeyBQb3N0U2V0dGluZ3MgfSBmcm9tIFwiLi9hcHAvUG9zdFNldHRpbmdzXCI7XG5mdW5jdGlvbiBsKHYpIHsgY29uc29sZS5sb2codik7IH1cbmpRdWVyeShmdW5jdGlvbiAoJCkge1xuICAgIFBvc3RTZXR0aW5ncy5nZXRJbnN0YW5jZSgpO1xufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGpRdWVyeTsiXSwic291cmNlUm9vdCI6IiJ9