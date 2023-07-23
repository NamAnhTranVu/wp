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
/******/ 	return __webpack_require__(__webpack_require__.s = "./scripts/site-tester-ts/site-tester.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./scripts/site-tester-ts/app/SiteTester.ts":
/*!**************************************************!*\
  !*** ./scripts/site-tester-ts/app/SiteTester.ts ***!
  \**************************************************/
/*! exports provided: SiteTester */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SiteTester", function() { return SiteTester; });
class SiteTester {
    constructor() {
        this.$testerForm = null;
        this.$resultsContainer = null;
        this.$testHistory = null;
        this.inputIdSiteId = "#site_id";
        this.inputIdTestType = "#test_type";
        this.inputIdTestUrlPart = "#test_url_part";
        this.selectorToggle = '.toggle';
        this.classToggleable = 'toggleable';
        this.selectorButtonTestThis = 'button.test-this';
        /** Stores IDs of toggleables and their states as boolean. True means they are shown. Otherwise, false. */
        this.toggleCache = {};
        this.isTestHistoryHidden = false;
        this.$testerForm = $("#tester-form");
        this.$resultsContainer = $("#test-results");
        this.$testHistory = $("#test-history");
        this.$testerForm.on('submit', (e) => this.onSubmitTesterForm(e));
        this.$testHistory.on('click', '.kdn-remove', (e) => this.onRemoveTestHistoryItem(e));
        this.$testHistory.on('click', '.delete-all', (e) => this.onRemoveAllTestHistoryItems(e));
        this.$testHistory.on('click', 'h2', () => this.toggleTestHistory());
        this.$testHistory.on('click', '.kdn-test', (e) => this.onClickTestButtonInTestHistory(e));
        this.$resultsContainer.on('click', '.go-to-top', (e) => this.onClickGoToTop(e));
        this.$resultsContainer.on('click', '#go-to-details', (e) => this.onClickGoToDetails(e));
        this.$resultsContainer.on('click', this.selectorButtonTestThis, (e) => this.onClickTestThis(e));
        // Toggle toggleables
        $(document).on('click', this.selectorToggle, (e) => this.toggleToggleable(e));
    }
    /**
     * Toggles a toggleable and stores its state in cache.
     * @param e
     * @see toggleCache
     */
    toggleToggleable(e) {
        e.preventDefault();
        let $self = $(e.target);
        // The next item has to have the toggleable class.
        let $next = $self.next() || null;
        if ($next === null || !$next.length || !$next.hasClass(this.classToggleable))
            return;
        // Get the ID of the toggleable. It has to have an ID so that we can store its state in the cache and find it
        // when we need it.
        let id = $next.attr("id") || null;
        if (id === null || !id.length)
            return;
        // Get if it is hidden currently.
        let isHidden = $next.hasClass('hidden');
        // Toggle its visibility
        // Show
        if (isHidden) {
            $next.removeClass('hidden');
            this.toggleCache[id] = true;
        }
        else {
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
        let $toggleable;
        let isVisible;
        for (let id in this.toggleCache) {
            if (!this.toggleCache.hasOwnProperty(id))
                continue;
            // Get the toggleable element using its ID
            $toggleable = $("#" + id) || null;
            if ($toggleable === null || !$toggleable.length)
                continue;
            // Get its state
            isVisible = this.toggleCache[id];
            // Restore the state
            // Show
            if (isVisible) {
                $toggleable.removeClass('hidden');
            }
            else {
                // Hide
                $toggleable.addClass('hidden');
            }
        }
    }
    /**
     * React to "test this" buttons near the category and page URLs
     */
    onClickTestThis(e) {
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
    onClickGoToDetails(e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: $("#details").offset().top - 40 }, "slow");
    }
    /**
     * Go to top
     */
    onClickGoToTop(e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
    }
    /**
     * When the test button in the history container is clicked, conduct the test.
     */
    onClickTestButtonInTestHistory(e) {
        e.preventDefault();
        let $self = $(e.target);
        let data = this.getTestHistoryData($self);
        if (data === null || !data.exists)
            return;
        let siteId = data.siteId || null;
        let testKey = data.testKey || null;
        let testUrl = data.testUrl || null;
        if (siteId === null || testKey === null || testUrl === null)
            return;
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
    onRemoveAllTestHistoryItems(e) {
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
    onRemoveTestHistoryItem(e) {
        e.preventDefault();
        let $self = $(e.target);
        // Get the data
        let data = this.getTestHistoryData($self);
        if (data === null)
            return;
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
    onSubmitTesterForm(e) {
        e.preventDefault();
        let $self = $(e.target);
        let siteId = $self.find(this.inputIdSiteId + " option:selected").val();
        let testType = $self.find(this.inputIdTestType + " option:selected").val();
        let testUrlPart = $self.find(this.inputIdTestUrlPart).val();
        if (testUrlPart == undefined || !testUrlPart)
            return;
        // Clear the content
        this.$resultsContainer.html("");
        if (this.$resultsContainer.hasClass("hidden"))
            this.$resultsContainer.removeClass("hidden");
        this.$resultsContainer.addClass("loading");
        $.post(window.ajaxurl, {
            kdn_nonce: $("#kdn_nonce").val(),
            action: window.pageActionKey,
            data: {
                "site_id": siteId,
                "test_type": testType,
                "test_url_part": testUrlPart
            }
        })
            .done((response) => {
            // Update the result view
            this.$resultsContainer.html(response.view
                .replace(/\[\u0000/g, '[\\')
                .replace(/\u0000/g, ':'));
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
    getTestHistoryData($elementInHistoryItem) {
        let data = $elementInHistoryItem.closest('.test-history-item').data("test");
        return (data === null || data === 'undefined' || data === undefined) ? null : data;
    }
    /**
     * Shows/hides the test history
     */
    toggleTestHistory() {
        if (this.isTestHistoryHidden) {
            this.showTestHistory();
        }
        else {
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
    setHistoryLoading(isLoading) {
        let $header = this.$testHistory.find('> h2');
        if (isLoading) {
            $header.addClass('loading');
        }
        else {
            $header.removeClass('loading');
        }
    }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./scripts/site-tester-ts/site-tester.ts":
/*!***********************************************!*\
  !*** ./scripts/site-tester-ts/site-tester.ts ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(jQuery) {/* harmony import */ var _app_SiteTester__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/SiteTester */ "./scripts/site-tester-ts/app/SiteTester.ts");

// Initialize when document is ready
jQuery(function ($) {
    // Initialize the site tester
    new _app_SiteTester__WEBPACK_IMPORTED_MODULE_0__["SiteTester"]();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9zaXRlLXRlc3Rlci10cy9hcHAvU2l0ZVRlc3Rlci50cyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL3NpdGUtdGVzdGVyLXRzL3NpdGUtdGVzdGVyLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImpRdWVyeVwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLDZDQUE2QztBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELGVBQWU7QUFDdEU7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGVBQWUsbUJBQW1CO0FBQ2xDLGdCQUFnQixZQUFZO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2xUQTtBQUFBO0FBQThDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBLFFBQVEsMERBQVU7QUFDbEIsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ0xELHdCIiwiZmlsZSI6Ii4vc2l0ZS10ZXN0ZXItZGV2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zY3JpcHRzL3NpdGUtdGVzdGVyLXRzL3NpdGUtdGVzdGVyLnRzXCIpO1xuIiwiZXhwb3J0IGNsYXNzIFNpdGVUZXN0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLiR0ZXN0ZXJGb3JtID0gbnVsbDtcbiAgICAgICAgdGhpcy4kcmVzdWx0c0NvbnRhaW5lciA9IG51bGw7XG4gICAgICAgIHRoaXMuJHRlc3RIaXN0b3J5ID0gbnVsbDtcbiAgICAgICAgdGhpcy5pbnB1dElkU2l0ZUlkID0gXCIjc2l0ZV9pZFwiO1xuICAgICAgICB0aGlzLmlucHV0SWRUZXN0VHlwZSA9IFwiI3Rlc3RfdHlwZVwiO1xuICAgICAgICB0aGlzLmlucHV0SWRUZXN0VXJsUGFydCA9IFwiI3Rlc3RfdXJsX3BhcnRcIjtcbiAgICAgICAgdGhpcy5zZWxlY3RvclRvZ2dsZSA9ICcudG9nZ2xlJztcbiAgICAgICAgdGhpcy5jbGFzc1RvZ2dsZWFibGUgPSAndG9nZ2xlYWJsZSc7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JCdXR0b25UZXN0VGhpcyA9ICdidXR0b24udGVzdC10aGlzJztcbiAgICAgICAgLyoqIFN0b3JlcyBJRHMgb2YgdG9nZ2xlYWJsZXMgYW5kIHRoZWlyIHN0YXRlcyBhcyBib29sZWFuLiBUcnVlIG1lYW5zIHRoZXkgYXJlIHNob3duLiBPdGhlcndpc2UsIGZhbHNlLiAqL1xuICAgICAgICB0aGlzLnRvZ2dsZUNhY2hlID0ge307XG4gICAgICAgIHRoaXMuaXNUZXN0SGlzdG9yeUhpZGRlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLiR0ZXN0ZXJGb3JtID0gJChcIiN0ZXN0ZXItZm9ybVwiKTtcbiAgICAgICAgdGhpcy4kcmVzdWx0c0NvbnRhaW5lciA9ICQoXCIjdGVzdC1yZXN1bHRzXCIpO1xuICAgICAgICB0aGlzLiR0ZXN0SGlzdG9yeSA9ICQoXCIjdGVzdC1oaXN0b3J5XCIpO1xuICAgICAgICB0aGlzLiR0ZXN0ZXJGb3JtLm9uKCdzdWJtaXQnLCAoZSkgPT4gdGhpcy5vblN1Ym1pdFRlc3RlckZvcm0oZSkpO1xuICAgICAgICB0aGlzLiR0ZXN0SGlzdG9yeS5vbignY2xpY2snLCAnLndjYy1yZW1vdmUnLCAoZSkgPT4gdGhpcy5vblJlbW92ZVRlc3RIaXN0b3J5SXRlbShlKSk7XG4gICAgICAgIHRoaXMuJHRlc3RIaXN0b3J5Lm9uKCdjbGljaycsICcuZGVsZXRlLWFsbCcsIChlKSA9PiB0aGlzLm9uUmVtb3ZlQWxsVGVzdEhpc3RvcnlJdGVtcyhlKSk7XG4gICAgICAgIHRoaXMuJHRlc3RIaXN0b3J5Lm9uKCdjbGljaycsICdoMicsICgpID0+IHRoaXMudG9nZ2xlVGVzdEhpc3RvcnkoKSk7XG4gICAgICAgIHRoaXMuJHRlc3RIaXN0b3J5Lm9uKCdjbGljaycsICcud2NjLXRlc3QnLCAoZSkgPT4gdGhpcy5vbkNsaWNrVGVzdEJ1dHRvbkluVGVzdEhpc3RvcnkoZSkpO1xuICAgICAgICB0aGlzLiRyZXN1bHRzQ29udGFpbmVyLm9uKCdjbGljaycsICcuZ28tdG8tdG9wJywgKGUpID0+IHRoaXMub25DbGlja0dvVG9Ub3AoZSkpO1xuICAgICAgICB0aGlzLiRyZXN1bHRzQ29udGFpbmVyLm9uKCdjbGljaycsICcjZ28tdG8tZGV0YWlscycsIChlKSA9PiB0aGlzLm9uQ2xpY2tHb1RvRGV0YWlscyhlKSk7XG4gICAgICAgIHRoaXMuJHJlc3VsdHNDb250YWluZXIub24oJ2NsaWNrJywgdGhpcy5zZWxlY3RvckJ1dHRvblRlc3RUaGlzLCAoZSkgPT4gdGhpcy5vbkNsaWNrVGVzdFRoaXMoZSkpO1xuICAgICAgICAvLyBUb2dnbGUgdG9nZ2xlYWJsZXNcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgdGhpcy5zZWxlY3RvclRvZ2dsZSwgKGUpID0+IHRoaXMudG9nZ2xlVG9nZ2xlYWJsZShlKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRvZ2dsZXMgYSB0b2dnbGVhYmxlIGFuZCBzdG9yZXMgaXRzIHN0YXRlIGluIGNhY2hlLlxuICAgICAqIEBwYXJhbSBlXG4gICAgICogQHNlZSB0b2dnbGVDYWNoZVxuICAgICAqL1xuICAgIHRvZ2dsZVRvZ2dsZWFibGUoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCAkc2VsZiA9ICQoZS50YXJnZXQpO1xuICAgICAgICAvLyBUaGUgbmV4dCBpdGVtIGhhcyB0byBoYXZlIHRoZSB0b2dnbGVhYmxlIGNsYXNzLlxuICAgICAgICBsZXQgJG5leHQgPSAkc2VsZi5uZXh0KCkgfHwgbnVsbDtcbiAgICAgICAgaWYgKCRuZXh0ID09PSBudWxsIHx8ICEkbmV4dC5sZW5ndGggfHwgISRuZXh0Lmhhc0NsYXNzKHRoaXMuY2xhc3NUb2dnbGVhYmxlKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgLy8gR2V0IHRoZSBJRCBvZiB0aGUgdG9nZ2xlYWJsZS4gSXQgaGFzIHRvIGhhdmUgYW4gSUQgc28gdGhhdCB3ZSBjYW4gc3RvcmUgaXRzIHN0YXRlIGluIHRoZSBjYWNoZSBhbmQgZmluZCBpdFxuICAgICAgICAvLyB3aGVuIHdlIG5lZWQgaXQuXG4gICAgICAgIGxldCBpZCA9ICRuZXh0LmF0dHIoXCJpZFwiKSB8fCBudWxsO1xuICAgICAgICBpZiAoaWQgPT09IG51bGwgfHwgIWlkLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgLy8gR2V0IGlmIGl0IGlzIGhpZGRlbiBjdXJyZW50bHkuXG4gICAgICAgIGxldCBpc0hpZGRlbiA9ICRuZXh0Lmhhc0NsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgLy8gVG9nZ2xlIGl0cyB2aXNpYmlsaXR5XG4gICAgICAgIC8vIFNob3dcbiAgICAgICAgaWYgKGlzSGlkZGVuKSB7XG4gICAgICAgICAgICAkbmV4dC5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUNhY2hlW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBIaWRlXG4gICAgICAgICAgICAkbmV4dC5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUNhY2hlW2lkXSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlc3RvcmVzIHRoZSBzdGF0ZXMgb2YgdGhlIHRvZ2dsZWFibGUgZWxlbWVudHMgZnJvbSB0aGUgY2FjaGVcbiAgICAgKiBAc2VlIHRvZ2dsZUNhY2hlXG4gICAgICovXG4gICAgcmVzdG9yZVRvZ2dsZWFibGVTdGF0ZXMoKSB7XG4gICAgICAgIGxldCAkdG9nZ2xlYWJsZTtcbiAgICAgICAgbGV0IGlzVmlzaWJsZTtcbiAgICAgICAgZm9yIChsZXQgaWQgaW4gdGhpcy50b2dnbGVDYWNoZSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnRvZ2dsZUNhY2hlLmhhc093blByb3BlcnR5KGlkKSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIC8vIEdldCB0aGUgdG9nZ2xlYWJsZSBlbGVtZW50IHVzaW5nIGl0cyBJRFxuICAgICAgICAgICAgJHRvZ2dsZWFibGUgPSAkKFwiI1wiICsgaWQpIHx8IG51bGw7XG4gICAgICAgICAgICBpZiAoJHRvZ2dsZWFibGUgPT09IG51bGwgfHwgISR0b2dnbGVhYmxlLmxlbmd0aClcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIC8vIEdldCBpdHMgc3RhdGVcbiAgICAgICAgICAgIGlzVmlzaWJsZSA9IHRoaXMudG9nZ2xlQ2FjaGVbaWRdO1xuICAgICAgICAgICAgLy8gUmVzdG9yZSB0aGUgc3RhdGVcbiAgICAgICAgICAgIC8vIFNob3dcbiAgICAgICAgICAgIGlmIChpc1Zpc2libGUpIHtcbiAgICAgICAgICAgICAgICAkdG9nZ2xlYWJsZS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBIaWRlXG4gICAgICAgICAgICAgICAgJHRvZ2dsZWFibGUuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlYWN0IHRvIFwidGVzdCB0aGlzXCIgYnV0dG9ucyBuZWFyIHRoZSBjYXRlZ29yeSBhbmQgcGFnZSBVUkxzXG4gICAgICovXG4gICAgb25DbGlja1Rlc3RUaGlzKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgJHNlbGYgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KHRoaXMuc2VsZWN0b3JCdXR0b25UZXN0VGhpcyk7XG4gICAgICAgIC8vIENoYW5nZSB0aGUgZm9ybSBpbnB1dHNcbiAgICAgICAgdGhpcy4kdGVzdGVyRm9ybS5maW5kKHRoaXMuaW5wdXRJZFRlc3RVcmxQYXJ0KS52YWwoJHNlbGYuZGF0YShcInVybFwiKSk7XG4gICAgICAgIHRoaXMuJHRlc3RlckZvcm0uZmluZCh0aGlzLmlucHV0SWRUZXN0VHlwZSkudmFsKCRzZWxmLmRhdGEoXCJ0eXBlXCIpKTtcbiAgICAgICAgLy8gU3VibWl0IHRoZSBmb3JtXG4gICAgICAgIHRoaXMuJHRlc3RlckZvcm0uc3VibWl0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdvIHRvIGRldGFpbHNcbiAgICAgKi9cbiAgICBvbkNsaWNrR29Ub0RldGFpbHMoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoeyBzY3JvbGxUb3A6ICQoXCIjZGV0YWlsc1wiKS5vZmZzZXQoKS50b3AgLSA0MCB9LCBcInNsb3dcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdvIHRvIHRvcFxuICAgICAqL1xuICAgIG9uQ2xpY2tHb1RvVG9wKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAwIH0sIFwic2xvd1wiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hlbiB0aGUgdGVzdCBidXR0b24gaW4gdGhlIGhpc3RvcnkgY29udGFpbmVyIGlzIGNsaWNrZWQsIGNvbmR1Y3QgdGhlIHRlc3QuXG4gICAgICovXG4gICAgb25DbGlja1Rlc3RCdXR0b25JblRlc3RIaXN0b3J5KGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgJHNlbGYgPSAkKGUudGFyZ2V0KTtcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmdldFRlc3RIaXN0b3J5RGF0YSgkc2VsZik7XG4gICAgICAgIGlmIChkYXRhID09PSBudWxsIHx8ICFkYXRhLmV4aXN0cylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgbGV0IHNpdGVJZCA9IGRhdGEuc2l0ZUlkIHx8IG51bGw7XG4gICAgICAgIGxldCB0ZXN0S2V5ID0gZGF0YS50ZXN0S2V5IHx8IG51bGw7XG4gICAgICAgIGxldCB0ZXN0VXJsID0gZGF0YS50ZXN0VXJsIHx8IG51bGw7XG4gICAgICAgIGlmIChzaXRlSWQgPT09IG51bGwgfHwgdGVzdEtleSA9PT0gbnVsbCB8fCB0ZXN0VXJsID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvLyBDaGFuZ2UgdGhlIGZvcm0gaW5wdXRzXG4gICAgICAgIHRoaXMuJHRlc3RlckZvcm0uZmluZCh0aGlzLmlucHV0SWRUZXN0VXJsUGFydCkudmFsKHRlc3RVcmwpO1xuICAgICAgICB0aGlzLiR0ZXN0ZXJGb3JtLmZpbmQodGhpcy5pbnB1dElkVGVzdFR5cGUpLnZhbCh0ZXN0S2V5KTtcbiAgICAgICAgdGhpcy4kdGVzdGVyRm9ybS5maW5kKHRoaXMuaW5wdXRJZFNpdGVJZCkudmFsKHNpdGVJZCk7XG4gICAgICAgIC8vIFN1Ym1pdCB0aGUgZm9ybVxuICAgICAgICB0aGlzLiR0ZXN0ZXJGb3JtLnN1Ym1pdCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYWxsIGhpc3RvcnkgZGVsZXRpb25cbiAgICAgKi9cbiAgICBvblJlbW92ZUFsbFRlc3RIaXN0b3J5SXRlbXMoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIC8vIEZpcnN0LCBhc2sgaWYgdGhlIHVzZXIgaXMgc3VyZSBhYm91dCBkZWxldGluZyBhbGwgdGVzdCBoaXN0b3J5LlxuICAgICAgICBpZiAod2luZG93LmNvbmZpcm0od2luZG93LndwY2MuZGVsZXRlX2FsbF90ZXN0X2hpc3RvcnkpKSB7XG4gICAgICAgICAgICAvLyBUaGUgdXNlciB3YW50cyB0byBkZWxldGUgYWxsIHRlc3QgaGlzdG9yeS5cbiAgICAgICAgICAgIHRoaXMuc2V0SGlzdG9yeUxvYWRpbmcodHJ1ZSk7XG4gICAgICAgICAgICAvLyBTZW5kIHRoZSBkZWxldGUgcmVxdWVzdFxuICAgICAgICAgICAgJC5wb3N0KHdpbmRvdy5hamF4dXJsLCB7XG4gICAgICAgICAgICAgICAgd2NjX25vbmNlOiAkKFwiI3djY19ub25jZVwiKS52YWwoKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IHdpbmRvdy5wYWdlQWN0aW9uS2V5LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2NtZCc6ICdkZWxldGVfYWxsX3Rlc3RfaGlzdG9yeScsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZG9uZSgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIHRlc3QgaGlzdG9yeSB2aWV3XG4gICAgICAgICAgICAgICAgbGV0ICRuZXdJbnNpZGUgPSAkKHJlc3BvbnNlLnZpZXcpLmZpbmQoJy5pbnNpZGUnKS5maXJzdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuJHRlc3RIaXN0b3J5LmZpbmQoJy5pbnNpZGUnKS5odG1sKCRuZXdJbnNpZGUuaHRtbCgpKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmZhaWwoKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuJHJlc3VsdHNDb250YWluZXIuaHRtbCh3aW5kb3cud3BjYy5hbl9lcnJvcl9vY2N1cnJlZCArIFwiOiBcIiArIHJlc3BvbnNlLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0SGlzdG9yeUxvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHNpbmdsZSB0ZXN0IGhpc3RvcnkgaXRlbSBkZWxldGlvblxuICAgICAqL1xuICAgIG9uUmVtb3ZlVGVzdEhpc3RvcnlJdGVtKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgJHNlbGYgPSAkKGUudGFyZ2V0KTtcbiAgICAgICAgLy8gR2V0IHRoZSBkYXRhXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5nZXRUZXN0SGlzdG9yeURhdGEoJHNlbGYpO1xuICAgICAgICBpZiAoZGF0YSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5zZXRIaXN0b3J5TG9hZGluZyh0cnVlKTtcbiAgICAgICAgLy8gU2VuZCB0aGUgZGVsZXRlIHJlcXVlc3RcbiAgICAgICAgJC5wb3N0KHdpbmRvdy5hamF4dXJsLCB7XG4gICAgICAgICAgICB3Y2Nfbm9uY2U6ICQoXCIjd2NjX25vbmNlXCIpLnZhbCgpLFxuICAgICAgICAgICAgYWN0aW9uOiB3aW5kb3cucGFnZUFjdGlvbktleSxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAnY21kJzogJ2RlbGV0ZV9oaXN0b3J5X2l0ZW0nLFxuICAgICAgICAgICAgICAgICdpdGVtJzogZGF0YVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAgICAgLmRvbmUoKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIHRlc3QgaGlzdG9yeSB2aWV3XG4gICAgICAgICAgICBsZXQgJG5ld0luc2lkZSA9ICQocmVzcG9uc2UudmlldykuZmluZCgnLmluc2lkZScpLmZpcnN0KCk7XG4gICAgICAgICAgICB0aGlzLiR0ZXN0SGlzdG9yeS5maW5kKCcuaW5zaWRlJykuaHRtbCgkbmV3SW5zaWRlLmh0bWwoKSk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuZmFpbCgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHRoaXMuJHJlc3VsdHNDb250YWluZXIuaHRtbCh3aW5kb3cud3BjYy5hbl9lcnJvcl9vY2N1cnJlZCArIFwiOiBcIiArIHJlc3BvbnNlLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0SGlzdG9yeUxvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGZvcm0gc3VibWlzc2lvbnMuXG4gICAgICovXG4gICAgb25TdWJtaXRUZXN0ZXJGb3JtKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgJHNlbGYgPSAkKGUudGFyZ2V0KTtcbiAgICAgICAgbGV0IHNpdGVJZCA9ICRzZWxmLmZpbmQodGhpcy5pbnB1dElkU2l0ZUlkICsgXCIgb3B0aW9uOnNlbGVjdGVkXCIpLnZhbCgpO1xuICAgICAgICBsZXQgdGVzdFR5cGUgPSAkc2VsZi5maW5kKHRoaXMuaW5wdXRJZFRlc3RUeXBlICsgXCIgb3B0aW9uOnNlbGVjdGVkXCIpLnZhbCgpO1xuICAgICAgICBsZXQgdGVzdFVybFBhcnQgPSAkc2VsZi5maW5kKHRoaXMuaW5wdXRJZFRlc3RVcmxQYXJ0KS52YWwoKTtcbiAgICAgICAgaWYgKHRlc3RVcmxQYXJ0ID09IHVuZGVmaW5lZCB8fCAhdGVzdFVybFBhcnQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIC8vIENsZWFyIHRoZSBjb250ZW50XG4gICAgICAgIHRoaXMuJHJlc3VsdHNDb250YWluZXIuaHRtbChcIlwiKTtcbiAgICAgICAgaWYgKHRoaXMuJHJlc3VsdHNDb250YWluZXIuaGFzQ2xhc3MoXCJoaWRkZW5cIikpXG4gICAgICAgICAgICB0aGlzLiRyZXN1bHRzQ29udGFpbmVyLnJlbW92ZUNsYXNzKFwiaGlkZGVuXCIpO1xuICAgICAgICB0aGlzLiRyZXN1bHRzQ29udGFpbmVyLmFkZENsYXNzKFwibG9hZGluZ1wiKTtcbiAgICAgICAgJC5wb3N0KHdpbmRvdy5hamF4dXJsLCB7XG4gICAgICAgICAgICB3Y2Nfbm9uY2U6ICQoXCIjd2NjX25vbmNlXCIpLnZhbCgpLFxuICAgICAgICAgICAgYWN0aW9uOiB3aW5kb3cucGFnZUFjdGlvbktleSxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBcInNpdGVfaWRcIjogc2l0ZUlkLFxuICAgICAgICAgICAgICAgIFwidGVzdF90eXBlXCI6IHRlc3RUeXBlLFxuICAgICAgICAgICAgICAgIFwidGVzdF91cmxfcGFydFwiOiB0ZXN0VXJsUGFydFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAgICAgLmRvbmUoKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIHJlc3VsdCB2aWV3XG4gICAgICAgICAgICB0aGlzLiRyZXN1bHRzQ29udGFpbmVyLmh0bWwocmVzcG9uc2Uudmlld1xuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFtcXHUwMDAwL2csICdbXFxcXCcpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcdTAwMDAvZywgJzonKSk7XG4gICAgICAgICAgICAvLyBSZXN0b3JlIHRoZSBzdGF0ZXMgb2YgdGhlIHRvZ2dsZWFibGVzXG4gICAgICAgICAgICB0aGlzLnJlc3RvcmVUb2dnbGVhYmxlU3RhdGVzKCk7XG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIHRlc3QgaGlzdG9yeSB2aWV3XG4gICAgICAgICAgICBsZXQgJG5ld0luc2lkZSA9ICQocmVzcG9uc2Uudmlld1Rlc3RIaXN0b3J5KS5maW5kKCcuaW5zaWRlJykuZmlyc3QoKTtcbiAgICAgICAgICAgIHRoaXMuJHRlc3RIaXN0b3J5LmZpbmQoJy5pbnNpZGUnKS5odG1sKCRuZXdJbnNpZGUuaHRtbCgpKTtcbiAgICAgICAgICAgIC8vIE1vdmUgdGhlIHNjcm9sbCB0byB0aGUgdG9wLCBzaW5jZSB0aGUgbmV3IHRlc3QgaXRlbSBpcyBhZGRlZCB0byB0aGUgdG9wIG9mIHRoZSBoaXN0b3J5LlxuICAgICAgICAgICAgdGhpcy4kdGVzdEhpc3RvcnkuZmluZCgnLmluc2lkZScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IDAgfSwgXCJzbG93XCIpO1xuICAgICAgICAgICAgLy8gRmxhc2ggdGhlIGJhY2tncm91bmQgb2YgdGhlIGZpcnN0IGl0ZW1cbiAgICAgICAgICAgIGZsYXNoQmFja2dyb3VuZCh0aGlzLiR0ZXN0SGlzdG9yeS5maW5kKCcudGVzdC1oaXN0b3J5LWl0ZW06Zmlyc3QtY2hpbGQnKSk7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVUb29sdGlwKCk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuZmFpbCgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHRoaXMuJHJlc3VsdHNDb250YWluZXIuaHRtbCh3aW5kb3cud3BjYy5hbl9lcnJvcl9vY2N1cnJlZCArIFwiOiBcIiArIHJlc3BvbnNlLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJHJlc3VsdHNDb250YWluZXIucmVtb3ZlQ2xhc3MoXCJsb2FkaW5nXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRlc3QgaGlzdG9yeSBkYXRhXG4gICAgICogQHBhcmFtIHtqUXVlcnl8SFRNTEVsZW1lbnR9ICRlbGVtZW50SW5IaXN0b3J5SXRlbSBBbiBlbGVtZW50IGluIHRoZSB0ZXN0IGl0ZW1cbiAgICAgKiBAcmV0dXJuIHtudWxsfG9iamVjdH0gSWYgZGF0YSBleGlzdHMsIHRoZSBkYXRhIGFzIG9iamVjdC4gT3RoZXJ3aXNlLCBudWxsLlxuICAgICAqL1xuICAgIGdldFRlc3RIaXN0b3J5RGF0YSgkZWxlbWVudEluSGlzdG9yeUl0ZW0pIHtcbiAgICAgICAgbGV0IGRhdGEgPSAkZWxlbWVudEluSGlzdG9yeUl0ZW0uY2xvc2VzdCgnLnRlc3QtaGlzdG9yeS1pdGVtJykuZGF0YShcInRlc3RcIik7XG4gICAgICAgIHJldHVybiAoZGF0YSA9PT0gbnVsbCB8fCBkYXRhID09PSAndW5kZWZpbmVkJyB8fCBkYXRhID09PSB1bmRlZmluZWQpID8gbnVsbCA6IGRhdGE7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNob3dzL2hpZGVzIHRoZSB0ZXN0IGhpc3RvcnlcbiAgICAgKi9cbiAgICB0b2dnbGVUZXN0SGlzdG9yeSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNUZXN0SGlzdG9yeUhpZGRlbikge1xuICAgICAgICAgICAgdGhpcy5zaG93VGVzdEhpc3RvcnkoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZVRlc3RIaXN0b3J5KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGlkZXMgdGhlIHRlc3QgaGlzdG9yeVxuICAgICAqL1xuICAgIGhpZGVUZXN0SGlzdG9yeSgpIHtcbiAgICAgICAgbGV0ICRpbnNpZGUgPSB0aGlzLiR0ZXN0SGlzdG9yeS5maW5kKCcuaW5zaWRlJykuZmlyc3QoKTtcbiAgICAgICAgbGV0ICR0b2dnbGUgPSB0aGlzLiR0ZXN0SGlzdG9yeS5maW5kKCdoMiAudG9nZ2xlJykuZmlyc3QoKTtcbiAgICAgICAgaWYgKCEkaW5zaWRlLmhhc0NsYXNzKCdoaWRkZW4nKSkge1xuICAgICAgICAgICAgJGluc2lkZS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICAkdG9nZ2xlLnJlbW92ZUNsYXNzKCdkYXNoaWNvbnMtYXJyb3ctdXAnKS5hZGRDbGFzcygnZGFzaGljb25zLWFycm93LWRvd24nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzVGVzdEhpc3RvcnlIaWRkZW4gPSB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaG93cyB0aGUgdGVzdCBoaXN0b3J5XG4gICAgICovXG4gICAgc2hvd1Rlc3RIaXN0b3J5KCkge1xuICAgICAgICBsZXQgJGluc2lkZSA9IHRoaXMuJHRlc3RIaXN0b3J5LmZpbmQoJy5pbnNpZGUnKS5maXJzdCgpO1xuICAgICAgICBsZXQgJHRvZ2dsZSA9IHRoaXMuJHRlc3RIaXN0b3J5LmZpbmQoJ2gyIC50b2dnbGUnKS5maXJzdCgpO1xuICAgICAgICBpZiAoJGluc2lkZS5oYXNDbGFzcygnaGlkZGVuJykpIHtcbiAgICAgICAgICAgICRpbnNpZGUucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgJHRvZ2dsZS5yZW1vdmVDbGFzcygnZGFzaGljb25zLWFycm93LWRvd24nKS5hZGRDbGFzcygnZGFzaGljb25zLWFycm93LXVwJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc1Rlc3RIaXN0b3J5SGlkZGVuID0gZmFsc2U7XG4gICAgfVxuICAgIGluaXRpYWxpemVUb29sdGlwKCkge1xuICAgICAgICAkKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgaGlzdG9yeSBsb2FkaW5nIG9yIG5vdC5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzTG9hZGluZyBUcnVlIGlmIGl0IGlzIHRvIGJlIHNldCBhcyBcImxvYWRpbmdcIi4gT3RoZXJ3aXNlLCBmYWxzZS5cbiAgICAgKi9cbiAgICBzZXRIaXN0b3J5TG9hZGluZyhpc0xvYWRpbmcpIHtcbiAgICAgICAgbGV0ICRoZWFkZXIgPSB0aGlzLiR0ZXN0SGlzdG9yeS5maW5kKCc+IGgyJyk7XG4gICAgICAgIGlmIChpc0xvYWRpbmcpIHtcbiAgICAgICAgICAgICRoZWFkZXIuYWRkQ2xhc3MoJ2xvYWRpbmcnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IFNpdGVUZXN0ZXIgfSBmcm9tIFwiLi9hcHAvU2l0ZVRlc3RlclwiO1xuLy8gSW5pdGlhbGl6ZSB3aGVuIGRvY3VtZW50IGlzIHJlYWR5XG5qUXVlcnkoZnVuY3Rpb24gKCQpIHtcbiAgICAvLyBJbml0aWFsaXplIHRoZSBzaXRlIHRlc3RlclxuICAgIG5ldyBTaXRlVGVzdGVyKCk7XG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0galF1ZXJ5OyJdLCJzb3VyY2VSb290IjoiIn0=