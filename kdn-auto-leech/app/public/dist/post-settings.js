! function(t) {
    var e = {};

    function i(n) {
        if (e[n]) return e[n].exports;
        var a = e[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return t[n].call(a.exports, a, a.exports, i), a.l = !0, a.exports
    }
    i.m = t, i.c = e, i.d = function(t, e, n) {
        i.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: n
        })
    }, i.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, i.t = function(t, e) {
        if (1 & e && (t = i(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if (i.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var a in t) i.d(n, a, function(e) {
                return t[e]
            }.bind(null, a));
        return n
    }, i.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return i.d(e, "a", e), e
    }, i.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, i.p = "", i(i.s = 34)
}([, function(t, e) {
    t.exports = jQuery
}, function(t, e, i) {
    "use strict";
    var n;
    i.d(e, "a", function() {
            return n
        }),
        function(t) {
            t.WARN = "warn", t.INFO = "info", t.ERROR = "error", t.SUCCESS = "success"
        }(n || (n = {}))
}, function(t, e, i) {
    "use strict";
    (function(t) {
        i.d(e, "a", function() {
            return n
        });
        class n {
            static startsWith(t, e) {
                return 0 === t.lastIndexOf(e, 0)
            }
            static escapeHtml(t) {
                return void 0 === t || "undefined" === t || null === t ? "" : t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
            }
            static flashTooltip(t, e) {
                let i = t.attr("data-original-title");
                t.attr("data-original-title", e).tooltip("fixTitle").tooltip("show").attr("data-original-title", i).tooltip("fixTitle")
            }
            static initTooltipForSelector(e) {
                "function" == typeof t.fn.tooltip && t(e + '[data-toggle="tooltip"]').tooltip()
            }
            static getCheckboxValue(t) {
                return !(null === (t = t || null) || !t.length) && !!t[0].checked
            }
        }
    }).call(this, i(1))
}, function(t, e, i) {
    "use strict";
    (function(t) {
        i.d(e, "a", function() {
            return s
        });
        var n = i(2),
            a = i(5);
        class s {
            constructor() {}
            static getInstance() {
                return null === this.INSTANCE && (this.INSTANCE = new s), this.INSTANCE
            }
            notify(t, e) {
                if (!this.isNotifyAvailable()) return;
                void 0 != e && e.length || (e = window.kdn.required_for_test);
                let i = t.closest("tr").find("label").first(),
                    n = i.length ? i : t;
                this.scrollToElement(n), n.notify(e, {
                    position: "top"
                })
            }
            notifyRegular(t, e, i = n.a.INFO, s = a.a.TOP) {
                this.isNotifyAvailable() && t.notify(e, {
                    position: s || "top",
                    className: i || "info"
                })
            }
            scrollToElement(e) {
                t(document).find("html, body").stop().animate({
                    scrollTop: e.first().offset().top - t(window).height() / 4
                }, 500, "swing")
            }
            isNotifyAvailable(e = !0) {
                let i = !("function" != typeof t.fn.notify);
                return !i && e && console.error("NotifyJS is not defined."), i
            }
        }
        s.INSTANCE = null
    }).call(this, i(1))
}, function(t, e, i) {
    "use strict";
    var n;
    i.d(e, "a", function() {
            return n
        }),
        function(t) {
            t.TOP = "top", t.RIGHT = "right", t.BOTTOM = "bottom", t.LEFT = "left"
        }(n || (n = {}))
}, , function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function($) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return TestDataPreparer
        });
        var _common_ts_Notifier__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4),
            _PostSettingsVariables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8),
            _common_ts_Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
        class TestDataPreparer {
            constructor() {
                this.notifier = _common_ts_Notifier__WEBPACK_IMPORTED_MODULE_0__.a.getInstance(), this.psv = _PostSettingsVariables__WEBPACK_IMPORTED_MODULE_1__.a.getInstance(), window.$lastClickedOptionsBoxButton = null
            }
            static getInstance() {
                return null === this.INSTANCE && (this.INSTANCE = new TestDataPreparer), this.INSTANCE
            }
            prepareTestData($testButton) {

                // Parse data from the Test button
                let mData = $testButton.data("kdn");
                if (void 0 == mData || !mData) return null;
                let data = JSON.parse(JSON.stringify(mData));

                // Whether to custom HEADERs checked or not
                let customHeadersActive = jQuery(this.psv.selectorTabMain).find('#_custom_headers').prop('checked');

                /**
                 * GET AJAX NUMBER
                 */

                // Check ajax is activated or not
                var ajaxActive = jQuery('#' + $testButton.closest(".tab").attr("id")).find('input[name$="_post_ajax"]').prop('checked');
                if (ajaxActive) data.ajaxActive = 1;

                // Get ajax url by number if exists
                var ajax = $testButton.closest(".input-group").find('input[name*="[ajax]"]').val();

                /**
                 * CUSTOM HEADERS
                 */

                // Prepare the "customHeaders" data
                if (customHeadersActive == true) {
                    var customHeaders = jQuery('#' + $testButton.closest(".tab").attr("id")).find('tr[id*="post-custom-headers"]').find(".input-group").find("input[name]");
                    // If we are test in tab category
                    if ($testButton.closest(".tab").attr("id") == 'tab-category') {
                        var customHeaders = jQuery('#' + $testButton.closest(".tab").attr("id")).find('tr[id*="category-custom-headers"]').find(".input-group").find("input[name]");
                    }
                }

                // Add "customHeaders" into the data
                if (customHeaders) data.customHeaders = customHeaders.serialize();

                /**
                 * TEST IN AJAX MANIPULATIONS
                 */

                // When test in ajax manipulations, get the original url and make ajax is true
                if (data.urlSelector && data.urlSelector.match(/(_post_ajax)/i)) {
                    ajax = 1;
                    data.inAjax = 1;

                    var url_original = jQuery('#' + $testButton.closest(".tab").attr("id")).find('input[id*="_test_url"]').val();
                    if (url_original) data.urlOriginal = url_original;
                    
                    // Get custom method and custom method original
                    var customMethod            = jQuery('#' + $testButton.closest(".tab").attr("id")).find('input[name*="_ajax_method"]').val();
                    var parseArray              = jQuery('#' + $testButton.closest(".tab").attr("id")).find('input[name*="_ajax_parse"]').val();
                    var customMethodOriginal    = jQuery('#' + $testButton.closest(".tab").attr("id")).find('tr[id*="custom-method"]').find(".input-group").find(":input[name]");
                    customMethodOriginal        = customMethodOriginal.serialize();
                }

                /**
                 * TEST IN FIND AND REPLACE FOR CUSTOM SHORTCODE OR CUSTOM POST META
                 */

                // When test in find and replace for custom shortcode or custom post meta
                if (data.testType && data.testType.match(/(find_replace_in_custom_meta|find_replace_in_custom_short_code)/i)) {
                    var i = $testButton.hasClass("kdn-test-find-replace-in-custom-meta"),
                        n = "." + (i ? "meta-key" : "short-code"),
                        a = "." + (i ? "selector-custom-post-meta" : "selector-custom-shortcode"),
                        s = $testButton.closest(".input-group").find(".input-container").find(n),
                        o = s.val();
                    jQuery(".input-group" + a + " " + n).each(function() {
                        var t = $(this);
                        if (t.val() == o) {
                            var j = t.closest(".input-group").find(".ajax-selector").val(); // Get ajax number from shortcode or meta selectors
                            if (j && ajaxActive) {
                                ajax = 1;
                                var url_original = jQuery('#' + $testButton.closest(".tab").attr("id")).find('input[id*="_test_url"]').val();
                                if (url_original) data.urlOriginal = url_original;
                            }
                        }
                    });
                }

                /**
                 * CUSTOM METHOD
                 */

                // Prepare the "customMethod" data
                if (ajax && ajaxActive) {
                    var customMethod            = jQuery('#' + $testButton.closest(".tab").attr("id")).find('input[name*="_ajax_method"]').val();
                    var parseArray              = jQuery('#' + $testButton.closest(".tab").attr("id")).find('input[name*="_ajax_parse"]').val();
                    var customMethodOriginal    = jQuery('#' + $testButton.closest(".tab").attr("id")).find('tr[id*="custom-method"]').find(".input-group").find(":input[name]");
                    customMethodOriginal        = customMethodOriginal.serialize();
                } else {
                    var customMethod            = jQuery('#' + $testButton.closest(".tab").attr("id")).find('tr[id*="custom-method"]').find(".input-group").find(":input[name]");
                    customMethod                = customMethod.serialize();
                }

                // Add custom method and custom method original into the data
                if (customMethod) data.customMethod                     = customMethod;
                if (parseArray) data.parseArray                         = parseArray;
                if (customMethodOriginal) data.customMethodOriginal     = customMethodOriginal;

                /**
                 * CUSTOM AJAX HEADERS
                 */

                // Prepare the "customAjaxHeaders" data
                if (customHeadersActive == true) {
                    if (ajax && ajaxActive) {
                        var customAjaxHeaders = jQuery('#' + $testButton.closest(".tab").attr("id")).find('tr[id*="ajax-headers-selectors"]').find(".input-group").find(":input[name]");
                        var ajaxHeaders = jQuery('#' + $testButton.closest(".tab").attr("id")).find('tr[id*="ajax-custom-headers"]').find(".input-group").find("input[name]");
                    }
                }

                // Add custom ajax headers into the data
                if (customAjaxHeaders || ajaxHeaders) {
                    data.customAjaxHeaders = customAjaxHeaders.serialize() + (ajaxHeaders && customAjaxHeaders ? '&' : '') + ajaxHeaders.serialize();
                }

                /**
                 * JSON PARSE
                 */

                // Check JSON Parse is activated or not
                let json = $testButton.closest(".input-group").find('input[name*="[json]"]').prop('checked');
                if (json) data.json = 1;

                /**
                 * TEST IN OPTION BOXS
                 */

                // If not have data[url], that means this is a optionsbox test
                if (!data.url) {
                    data.url = $testButton.closest(".options-box-container").attr("data-url");
                    if (!data.url) {
                        var tab     = $testButton.closest(".tab").attr('id');
                        if (tab.match(/(templates)/ig)) {
                            tab = tab.replace('post-templates', '').replace('templates', '') + 'post';
                        }
                        data.url    = jQuery('#'+tab).find('input[name^="_test_url"]').first().val();
                    }
                }

                /**
                 * PREPARE THE FINAL DATA
                 */

                data = this.addSettingsToAjaxData(data, ajax);
                let $inputs = $testButton.closest(".input-group").find(":input[name]");
                if (!$inputs.length) return null;
                let allSelectorsRequired = !0,
                    requiredElExpr = mData.requiredSelectors;
                if (void 0 != requiredElExpr && (allSelectorsRequired = !1, requiredElExpr.length)) {
                    requiredElExpr = " " + requiredElExpr.replace(/([()&|])/g, " $1 ").replace(/\s{2,}/g, " ").replace(/\&/g, "&&").replace(/\|/g, "||").trim() + " ";
                    let selectorMatches = requiredElExpr.match(/([#\[\]=\^~.a-z0-9_\-"']+)\s?/g),
                        evalStr = requiredElExpr,
                        currentSelector, $el, valueExists, requiredEls = [];
                    for (let t in selectorMatches) selectorMatches.hasOwnProperty(t) && (currentSelector = selectorMatches[t].trim(), currentSelector.length && ($el = $(currentSelector).first(), valueExists = $el.length && void 0 != $el.val() && $el.val().length, !valueExists && $el.length && requiredEls.push($el), evalStr = evalStr.replace(new RegExp(this.escapeRegExp(currentSelector) + "\\s", "g"), valueExists ? "true " : "false ")));
                    if (!eval(evalStr) && requiredEls.length) {
                        let t = requiredEls.length - 1,
                            e = 0;
                        return this.notifier.notify(requiredEls[Math.floor(Math.random() * (t - e + 1)) + e], void 0), null
                    }
                }
                for (let t in data) {
                    if (!data.hasOwnProperty(t) || !/Selector$/.test(t)) continue;
                    let e = $(data[t]); let k = e.find(".input-group").find(":input[name]");
                    if (allSelectorsRequired && (void 0 == e.val() || !e.val().length)) return this.notifier.notify(e, void 0), null;
                    delete data[t], e.length && (1 === e.length && (data[t.replace("Selector", "")] = k.length ? k.serialize() : e.val() || null))
                }
                if (data.hasOwnProperty("extra")) {
                    let t = data.extra,
                        e = {},
                        i, n;
                    for (let a in t) t.hasOwnProperty(a) && (i = t[a], i.hasOwnProperty("selector") && i.hasOwnProperty("data") && (n = $(i.selector).data(i.data), null !== n && void 0 !== n && "undefined" !== n && (e[a] = n)));
                    $.isEmptyObject(e) ? delete data.extra : data.extra = e
                }
                null !== window.$lastClickedOptionsBoxButton && (data.optionsBox = window.$lastClickedOptionsBoxButton.find(":input").first().val(), data.fromOptionsBox = 1), data.serializedValues = $inputs.serialize();
                let rawName = $inputs.first().attr("name");
                data.formItemName = /^([^\[]+)/.exec(rawName)[1] || null;
                let part = /^[^\[]+([^0-9]+)/.exec(rawName)[1] || "";
                return part.length > 1 && (part = part.substr(1, part.length - 2).replace("][", ".").replace("[", "").replace("]", ""), data.formItemDotKey = part), data = this.addDataForFindReplaceInCustomMetaOrShortCodeTest($testButton, data), data
            }
            addSettingsToAjaxData(t, ajax) {
                t = this.addManipulationOptionsToAjaxData(t, ajax);
                let e = $(this.psv.selectorTabMain).find("label[for=" + this.psv.inputNameCookies + "]").closest("tr").find(".inputs") || null;
                null !== e && e.length && (t.cookies = e.find(":input").serialize());
                let i = $(this.psv.selectorTabMain).find('input[name="_cache_test_url_responses"]') || null;
                null !== i && i.length && (t.cacheTestUrlResponses = i[0].checked ? 1 : 0);
                let n = $("#_do_not_use_general_settings") || null,
                    a = !1;
                null !== n && (n.length && n[0].checked ? (t.customGeneralSettings = $(this.psv.selectorTabGeneralSettings).find(":input").serialize(), a = !0) : t.customGeneralSettings = void 0);
                let s = $("#_kdn_make_sure_encoding_utf8") || null;
                if (null !== s && s.length && a) {
                    t.useUtf8 = s.first()[0].checked ? 1 : 0;
                    let e = $("#_kdn_convert_charset_to_utf8") || null;
                    t.convertEncodingToUtf8 = _common_ts_Utils__WEBPACK_IMPORTED_MODULE_2__.a.getCheckboxValue(e) ? 1 : 0
                } else t.useUtf8 = -1, t.convertEncodingToUtf8 = -1;
                return t
            }
            addManipulationOptionsToAjaxData(t, ajax) {
                let e = $("div.tab:not(.hidden)");
                "templates" === e.attr("id").replace("tab-", "").toLowerCase() && (e = $(this.psv.selectorTabPost));
                let i, n, a, s, o = /[^\\[]+/,
                    l = {}, r = {};
                let ajaxHtmlManipulation = ["find_replace_raw__html", "find_replace_first__load", "find_replace_element__attributes", "exchange_element__attributes", "remove_element__attributes", "find_replace_element__html", "unnecessary_element__selectors"];
                for (let t = 0; t < (ajax ? ajaxHtmlManipulation : this.psv.baseHtmlManipulationInputNames).length; t++) i = (ajax ? ajaxHtmlManipulation : this.psv.baseHtmlManipulationInputNames)[t], (a = (n = e.find('input[name*="' + i + '"]').first()).closest(".inputs").find(":input")).length < 1 || (l[s = n.attr("name").match(o)[0]] = a.serialize());
                if (ajax) {
                    for (let t = 0; t < (this.psv.baseHtmlManipulationInputNames).length; t++) i = (this.psv.baseHtmlManipulationInputNames)[t], (a = (n = e.find('input[name*="' + i + '"]').first()).closest(".inputs").find(":input")).length < 1 || (r[s = n.attr("name").match(o)[0]] = a.serialize());
                    t.manipulation_options_original = r;
                    Object.keys(l).forEach(function(key) {
                        var newkey = key.replace(/__/ig, '_');
                        l[newkey] = l[key].replace(/__/ig, '_');
                        delete l[key];
                    });
                }
                return t.manipulation_options = l, t
            }
            addDataForFindReplaceInCustomMetaOrShortCodeTest(t, e) {
                if (!t.hasClass("kdn-test-find-replace-in-custom-meta") && !t.hasClass("kdn-test-find-replace-in-custom-short-code")) return e;
                let i = t.hasClass("kdn-test-find-replace-in-custom-meta"),
                    n = "." + (i ? "meta-key" : "short-code"),
                    a = "." + (i ? "selector-custom-post-meta" : "selector-custom-shortcode"),
                    s = t.closest(".input-group").find(".input-container").find(n);
                if (!s.length) return e;
                let o = s.val();
                if (void 0 == o || !o.length) return e;
                let l = !1;
                return $(".input-group" + a + " " + n).each(function() {
                    if (l) return;
                    let t = $(this);
                    if (t.val() == o) {
                        let i = t.closest(".input-group").find(".css-selector"),
                            n = t.closest(".input-group").find(".css-selector-attr"),
                            j = t.closest(".input-group").find(".ajax-selector").val(), // Get ajax number from shortcode or meta selectors
                            a = t.closest(".input-group").find('[name*="[options_box]"]'),
                            s = i.val(),
                            o = n.val(),
                            r = a.length ? a.val() : void 0;
                        void 0 != s && s.length && (e.valueSelector = s, void 0 != o && o.length && (e.valueSelectorAttr = o), void 0 !== r && (e.valueOptionsBoxData = r), j.length && (e.valueAjax = j), l = !0)
                    }
                }), l || i && $(".input-group.custom-post-meta .meta-key").each(function() {
                    if (l) return;
                    let t = $(this);
                    if (t.val() == o) {
                        let i = t.closest(".input-group").find("input[type=text]:not(.meta-key)").val();
                        void 0 != i && i.length && (e.subject = i, l = !0)
                    }
                }), e
            }
            escapeRegExp(t) {
                return t.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
            }
        }
        TestDataPreparer.INSTANCE = null
    }).call(this, __webpack_require__(1))
}, function(t, e, i) {
    "use strict";
    (function(t) {
        i.d(e, "a", function() {
            return n
        });
        class n {
            constructor() {
                this.$containerMetaBox = t(".kdn-settings-meta-box").first(), this.$containerTabs = t(".kdn-settings-meta-box > .nav-tab-wrapper"), this.$form = t("#post"), this.$errorAlert = t("#kdn-alert"), this.$kdnNonce = t("#kdn_nonce"), this.$adminBar = t("#wpadminbar"), this.selectorCategoryMap = "#category-map", this.selectorTabMain = "#tab-main", this.selectorTabPost = "#tab-post", this.selectorTabCategory = "#tab-category", this.selectorTabGsPost = "#tab-gs-post", this.selectorTabGeneralSettings = "#tab-general-settings", this.selectorTestButton = ".kdn-test", this.selectorInputContainerPasswords = ".input-container-passwords", this.selectorLoadGeneralSettingsButton = "#btn-load-general-settings", this.selectorClearGeneralSettingsButton = "#btn-clear-general-settings", this.selectorInputImport = "#_post_import_settings", this.selectorLoadTranslationLanguages = ".load-languages", this.selectorInputURLHash = "input[name='url_hash']", this.inputNameCookies = "_cookies", this.baseHtmlManipulationInputNames = ["find_replace_raw_html", "find_replace_first_load", "find_replace_element_attributes", "exchange_element_attributes", "remove_element_attributes", "find_replace_element_html", "unnecessary_element_selectors"], this.selectorOriginalTestResults = ".original-results", this.selectorButtonSeeUnmodifiedTestResults = this.selectorOriginalTestResults + " .see-unmodified-results", this.selectorInvalidateCacheButton = ".invalidate-cache-for-this-url", this.selectorInvalidateAllCachesButton = ".invalidate-all-test-url-caches", this.selectorQuickSaveButton = ".quick-save-container .quick-save", this.selectorExportSettingsTextArea = "#_post_export_settings", this.clsHasError = "has-error", this.$inputAction = t("#hiddenaction"), this.infoTextsHidden = !0, this.classFixed = "kdn-fixed", this.selectorFixable = ".fixable", this.selectorCheckboxFixTabs = "#_fix_tabs", this.selectorCheckboxFixContentNavigation = "#_fix_content_navigation"
            }
            static getInstance() {
                return null === this.INSTANCE && (this.INSTANCE = new n), this.INSTANCE
            }
        }
        n.INSTANCE = null
    }).call(this, i(1))
}, function(t, e, i) {
    "use strict";
    i.d(e, "a", function() {
        return n
    });
    class n {}
    n.navigationsInitialized = "kdnNavigationsInitialized", n.optionsBoxTabActivated = "kdnOptionsBoxTabActivated"
}, function(t, e, i) {
    "use strict";
    (function(t) {
        i.d(e, "a", function() {
            return n
        });
        class n {
            constructor() {}
            static getInstance() {
                return null === this.instance && (this.instance = new n), this.instance
            }
            handleCheckboxDependants(t) {
                let e = t.is(":checked");
                this.handleDependants(t, e)
            }
            handleSelectDependants(t) {
                let e = t.data("prev") || null,
                    i = t.val(),
                    n = t.find('option[value="' + i + '"]').first(),
                    a = null !== e && e.length ? t.find('option[value="' + e + '"]').first() : null;
                null !== a && this.handleDependants(a, !1), this.handleDependants(n, !0), t.data("prev", i)
            }
            handleDependants(e, i) {
                let n, a, s, o, l = e.data("dependants") || null;
                if (null !== l && l)
                    for (o = 0; o < l.length; o++) a = this.startsWith(l[o], "!"), s = l[o], a && (s = s.substring(1)), n = t(s), i ? a ? n.addClass("hidden") : n.removeClass("hidden") : a ? n.removeClass("hidden") : n.addClass("hidden")
            }
            startsWith(t, e) {
                return 0 === t.lastIndexOf(e, 0)
            }
        }
        n.instance = null
    }).call(this, i(1))
}, , function(t, e, i) {
    "use strict";
    (function(t) {
        i.d(e, "a", function() {
            return n
        });
        class n {
            constructor() {}
            static getInstance() {
                return null === this.INSTANCE && (this.INSTANCE = new n), this.INSTANCE
            }
            addNewInputGroup(e) {
                let i = e.find(".input-group").first().clone(),
                    a = 0;
                e.find(".input-group").each(function() {
                    let e = t(this);
                    void 0 != e.data("key") && e.data("key") > a && (a = e.data("key"))
                });
                let s = i.data("key"),
                    o = a + 1;
                i.attr("data-key", o), i.data("key", o);
                let l = i.html();
                i.html(l.replace(new RegExp("\\[" + s + "\\]", "g"), "[" + o + "]")), i.find("input").each(function() {
                    t(this).val("")
                }), i.find("textarea").each(function() {
                    t(this).html("")
                }), i.find("input[type=checkbox]").each(function() {
                    t(this).prop("checked", !1)
                });
                for (let t of n.modifiers) t(i);
                return e.append(i), "function" == typeof t.fn.tooltip && i.find('[data-toggle="tooltip"]').tooltip(), i.find(".kdn-options-box").each(function() {
                    let e = t(this);
                    e.removeClass("has-config"), "function" == typeof t.fn.tooltip && e.tooltip("destroy")
                }), i
            }
            registerModifier(t) {
                n.modifiers.push(t)
            }
        }
        n.INSTANCE = null, n.modifiers = []
    }).call(this, i(1))
}, function(t, e, i) {
    "use strict";
    (function(t) {
        i.d(e, "a", function() {
            return v
        });
        var n = i(4),
            a = i(7),
            s = i(12),
            o = i(8),
            l = i(26),
            r = i(2),
            c = i(17),
            d = i(3),
            h = i(16),
            u = i(28),
            p = i(10),
            f = i(5),
            g = i(9);
        class v {
            constructor() {
                this.fixedElements = [], this.$activeTabContainer = void 0, this.$activeTabFixables = void 0, this.docWidth = null, this.adminBarHeight = null, this.notifier = n.a.getInstance(), this.testDataPreparer = a.a.getInstance(), this.inputGroupAdder = s.a.getInstance(), this.psv = o.a.getInstance(), this.getAdminBarHeightIfFixed(), this.initSettingsPageOptions(), this.maybeInitTinyMceEditors(), this.initTooltip(), c.a.getInstance().initNavigations(), u.a.getInstance(), this.restoreURLHash(), this.handleURLHash(), t(window).on("hashchange", t => this.handleURLHash()), this.psv.$containerMetaBox.on("click", ".kdn-add-new", t => this.onClickAddNew(t)), this.psv.$containerMetaBox.on("click", ".kdn-remove", t => this.onClickRemove(t)), this.psv.$containerMetaBox.on("click", this.psv.selectorTestButton, t => this.onClickTest(t)), t(document).on("click", ".hide-test-results", t => this.onClickHideTestResults(t)), this.psv.$containerMetaBox.on("click", this.psv.selectorLoadTranslationLanguages, t => this.onLoadRefreshTranslationLanguages(t)), this.psv.$containerTabs.on("click", "a", t => this.onClickTab(t)), this.psv.$containerMetaBox.on("click", ".info-button", t => this.onClickInfoButton(t)), this.psv.$containerMetaBox.on("change", "input[type=checkbox]", e => {
                    p.a.getInstance().handleCheckboxDependants(t(e.target))
                }), this.psv.$containerMetaBox.find("input[type=checkbox], select").each((e, i) => {
                    p.a.getInstance().handleCheckboxDependants(t(i))
                }), this.psv.$containerMetaBox.find("select").each((e, i) => {
                    p.a.getInstance().handleSelectDependants(t(i))
                }), this.psv.$containerMetaBox.on("click", ".toggle-info-texts", t => this.onClickToggleInfoTexts(t)), "function" == typeof window.Clipboard && t(document).ready(() => this.initCopyToClipboard()), this.psv.$containerMetaBox.on("click", ".input-button-container > button", t => t.preventDefault()), t(document).on("click", this.psv.selectorLoadGeneralSettingsButton, t => this.handleLoadClearGeneralSettings(t)), t(document).on("click", this.psv.selectorClearGeneralSettingsButton, t => this.handleLoadClearGeneralSettings(t)), void 0 !== window.jQuery.ui && "function" == typeof t.fn.sortable && t(document).ready(() => this.prepareSortables()), t('textarea[readonly="readonly"]').focus(t => this.onFocusReadonlyTextArea(t)), this.psv.$form.on("submit", t => this.onSubmitForm(t)), t(document).ready(() => this.activatePreviouslyActiveTab()), t(document).on("click", this.psv.selectorButtonSeeUnmodifiedTestResults, t => this.onClickSeeUnmodifiedResults(t)), t(document).on("click", this.psv.selectorInvalidateCacheButton, t => this.onClickInvalidateTestUrlCache(t)), t(document).on("click", this.psv.selectorInvalidateAllCachesButton, t => this.onClickInvalidateAllTestUrlCaches(t)), t(document).on("change", this.psv.selectorCategoryMap + " select", t => this.onChangeCategory(t)), t(document).on("click", this.psv.selectorQuickSaveButton, t => this.quickSave(t)), this.psv.$containerMetaBox.on("keydown", "input, select", t => {
                    13 === (t.which || t.keyCode) && jQuery('#kdn-auto-leech-settings').length >= 1 && this.quickSave(t)
                }), t(document).on("scroll", t => this.handleElementFixing()), t(window).on("resize", t => this.onResize(t)), t(document).on("postbox-toggled postboxes-columnchange", t => this.onResize(t)), this.inputGroupAdder.registerModifier(t => {
                    t.hasClass("category-map") && this.setCategoryTaxonomyNameForSelect(t.find("select"))
                }), t(document).on(g.a.navigationsInitialized, () => this.invalidateActiveTabFixablesCache()), l.a.getInstance()
            }
            static getInstance() {
                return this.INSTANCE || (this.INSTANCE = new v), this.INSTANCE
            }
            initSettingsPageOptions() {
                this.isFixTabs = d.a.getCheckboxValue(t(this.psv.selectorCheckboxFixTabs)), this.isFixContentNavigation = d.a.getCheckboxValue(t(this.psv.selectorCheckboxFixContentNavigation)), t(document).on("change", this.psv.selectorCheckboxFixTabs, e => {
                    this.isFixTabs = d.a.getCheckboxValue(t(e.target)), this.resetFixableElements()
                }), t(document).on("change", this.psv.selectorCheckboxFixContentNavigation, e => {
                    this.isFixContentNavigation = d.a.getCheckboxValue(t(e.target)), this.resetFixableElements()
                })
            }
            onResize(t) {
                this.resetFixableElements(), this.resetPrevScrollPositionCacheOfTabs(), this.invalidateDocWidthCache(), this.invalidateAdminBarHeightCache()
            }
            resetFixableElements() {
                let e;
                t(this.psv.selectorFixable).each((i, n) => {
                    e = t(n), this.resetOffsetOfFixable(e), this.setElementUnfixed(e)
                }), this.psv.$containerMetaBox.css("padding-top", "0"), this.handleElementFixing()
            }
            handleElementFixing() {
                if (!this.isFixTabs && !this.isFixContentNavigation) return;
                if (this.getDocWidth() <= 600) return;
                let e = this.getScrollTop() + this.getAdminBarHeightIfFixed(),
                    i = 0;
                if (this.isFixTabs) {
                    (i = e + 8) >= this.getTopOffsetOfTargetFixable(this.psv.$containerTabs) ? this.setElementFixed(this.psv.$containerTabs) : this.setElementUnfixed(this.psv.$containerTabs)
                }
                if (this.isFixContentNavigation) {
                    let n, a, s = this.getActiveTabFixables();
                    if (null === s || !s.length) return;
                    let o = this.isFixTabs ? this.psv.$containerTabs.height() : 0,
                        l = (this.isFixTabs ? i + o : e) - 11;
                    s.each((e, i) => {
                        n = t(i), a = this.getTopOffsetOfTargetFixable(n), l >= a ? this.setElementFixed(n, !0) : this.setElementUnfixed(n, !0)
                    })
                }
            }
            getTopOffsetOfTargetFixable(t) {
                let e = t.data("offsetTop") || null;
                return null === e && (t.data("offsetTop", t.offset().top), e = t.data("offsetTop")), e
            }
            resetOffsetOfFixable(t) {
                t.removeData("offsetTop")
            }
            setElementFixed(t, e = !1) {
                if (t.hasClass(this.psv.classFixed)) return;
                if (-1 !== this.fixedElements.indexOf(t)) return;
                let i = null;
                if (this.fixedElements.length > 0) {
                    let t = this.fixedElements[this.fixedElements.length - 1];
                    i = (parseFloat(t.css("top")) || 0) + t.outerHeight()
                } else i = this.getAdminBarHeightIfFixed();
                this.fixedElements.push(t);
                let n = this.psv.$containerMetaBox,
                    a = n.width(),
                    s = (parseFloat(n.css("padding-top")) || 0) + t.outerHeight();
                e && (s += 12), n.css("padding-top", s + "px"), t.data("height", t.outerHeight()).css("width", a + "px").addClass(this.psv.classFixed).css("top", i)
            }
            getAdminBarHeightIfFixed() {
                return null === this.adminBarHeight && (this.adminBarHeight = "fixed" === this.psv.$adminBar.css("position").toLocaleLowerCase() ? this.psv.$adminBar.outerHeight() : 0), this.adminBarHeight
            }
            invalidateAdminBarHeightCache() {
                this.adminBarHeight = null
            }
            getDocWidth() {
                return null === this.docWidth && (this.docWidth = t(document).width()), this.docWidth
            }
            invalidateDocWidthCache() {
                this.docWidth = null
            }
            setElementUnfixed(t, e = !1) {
                if (!t.hasClass(this.psv.classFixed)) return;
                let i = -1;
                for (let e = 0; e < this.fixedElements.length; e++)
                    if (this.fixedElements[e].get(0) == t.get(0)) {
                        i = e;
                        break
                    }
                if (-1 === i) return;
                this.fixedElements.splice(i, 1);
                let n = this.psv.$containerMetaBox,
                    a = Math.max(0, (parseFloat(n.css("padding-top")) || 0) - t.data("height"));
                e && (a -= 12), n.css("padding-top", a + "px"), t.removeClass(this.psv.classFixed).css("width", "").css("top", "").removeData("height")
            }
            getFixedElementsTotalHeight() {
                return this.fixedElements.reduce((t, e) => t + e.outerHeight(), 0)
            }
            onChangeCategory(e) {
                let i = t(e.target);
                this.setCategoryTaxonomyNameForSelect(i)
            }
            setCategoryTaxonomyNameForSelect(t) {
                let e = t.find(":selected") || null;
                if (null === e || !e.length) return;
                let i = e.data("taxonomy") || null;
                t.closest(".input-container").find("input.category-taxonomy").val(i)
            }
            onClickSeeUnmodifiedResults(e) {
                let i = t(e.target).parent().find("ul").first();
                i.hasClass("hidden") ? i.removeClass("hidden") : i.addClass("hidden")
            }
            activatePreviouslyActiveTab() {
                let e = t(this.psv.selectorInputURLHash);
                if (!e.length || !e.first().val()) return;
                let i = e.first().val().split("|");
                if (i.length < 2) return;
                let n = i[i.length - 1];
                i.splice(i.length - 1, 1), history.replaceState(void 0, void 0, i.join("|")), this.handleURLHash(), document.documentElement.scrollTop = n
            }
            quickSave(e) {
                e.preventDefault();
                let i = t("#_post_import_settings") || null;
                if (null !== i && i.length) {
                    let t = i.val() || null;
                    if (null !== t && t.length) return void this.psv.$form.find('input[type="submit"]').trigger("click")
                }
                let n = t(this.psv.selectorQuickSaveButton);
                if (n.length > 0 && (n = n.first()), n.hasClass("loading")) return;
                let a = n.data("post-id") || null;
                if (null === a || !a) return void this.notifier.notifyRegular(n, window.kdn.post_id_not_found, r.a.ERROR, f.a.LEFT);
                if (!this.beforeFormSubmit(e)) return void t(document).find("html, body").stop().animate({
                    scrollTop: 20
                }, 500, "swing");
                let s = this.getFormValuesSerialized();
                if (null === s || !s.length) return void this.notifier.notifyRegular(n, window.kdn.settings_not_retrieved, r.a.ERROR, f.a.LEFT);
                let o = "bounce infinite loading";
                n.removeClass("flip").removeClass("shake").addClass(o), t.post(window.ajaxurl, {
                    kdn_nonce: this.psv.$kdnNonce.val(),
                    action: window.pageActionKey,
                    data: {
                        cmd: "saveSiteSettings",
                        postId: a,
                        settings: s
                    }
                }).done(e => {
                    let i = e.success,
                        a = e.message;
                    if (i) {
                        n.removeClass(o).addClass("flip"), this.notifier.notifyRegular(n, window.kdn.settings_saved, r.a.SUCCESS, f.a.LEFT);
                        let i = e.settingsForExport || null;
                        if (null !== i && i.length) {
                            let e = t(this.psv.selectorExportSettingsTextArea) || null;
                            null !== e && e.val(i)
                        }
                    } else this.notifier.notifyRegular(n, a, r.a.ERROR, f.a.LEFT)
                }).fail(t => {
                    n.removeClass(o).addClass("shake"), this.notifier.notifyRegular(n, window.kdn.an_error_occurred, r.a.ERROR, f.a.LEFT)
                }).always(() => {
                    n.removeClass(o)
                })
            }
            onSubmitForm(t) {
                this.beforeFormSubmit(t)
            }
            beforeFormSubmit(e) {
                let i = this.validateForm(e);
                void 0 !== window.optionsBox && window.optionsBox.close();
                let n = t(this.psv.selectorInputURLHash);
                return n.length && n.val(window.location.hash + "|" + document.documentElement.scrollTop), i
            }
            validateForm(e) {
                let i = t(this.psv.selectorInputImport);
                if (i.length && i.val().length > 0) return void this.removeErrorsFromAllTabs();
                let n = t(this.psv.selectorCategoryMap),
                    a = t("#_main_page_url"),
                    s = t(this.psv.selectorInputContainerPasswords),
                    o = [];
                this.psv.$errorAlert.addClass("hidden");
                let l = !1;
                if (this.removeErrorsFromAllTabs(), n.length) {
                    let e = [],
                        i = !1;
                    n.find(".input-group").each((e, i) => {
                        t(i).removeClass(this.psv.clsHasError)
                    }), n.find("input[type=text]").each((n, a) => {
                        let s = t(a); - 1 == e.indexOf(s.val()) ? e.push(s.val()) : (s.closest(".input-group").addClass(this.psv.clsHasError), i || (i = !0)), s.val().length || (s.closest(".input-group").addClass(this.psv.clsHasError), i || (i = !0))
                    }), i && (l = !0, o.push(n))
                }
                if (a.length && (a.closest(".input-group").removeClass(this.psv.clsHasError), a.val().length || (l = !0, a.closest(".input-group").addClass(this.psv.clsHasError), o.push(a))), s.length) {
                    let e = t("#_kdn_change_password");
                    if (void 0 != e && e[0].checked) {
                        s.each((e, i) => {
                            t(i).closest(".input-group").removeClass(this.psv.clsHasError)
                        });
                        let e = null,
                            i = null,
                            n = null;
                        s.find("input[type=password]").each((a, s) => {
                            let r = t(s);
                            null == e ? e = !0 : null == i ? i = r.val() : null == n && (n = r.val(), i != n && (r.closest(".input-group").addClass(this.psv.clsHasError), i = n = null, l = !0, o.push(r)))
                        })
                    }
                }
                return !l || (setTimeout(() => {
                    for (let t in o) o.hasOwnProperty(t) && this.setTabError(o[t], !0)
                }, 1), this.psv.$errorAlert.removeClass("hidden"), e.preventDefault(), !1)
            }
            getFormValuesSerialized() {
                let e = ("function" == typeof window.tinymce ? window.tinymce : window.tinyMCE) || null;
                if (null !== e) {
                    let i, n, a, s, o;
                    t("textarea.wp-editor-area").each((l, r) => {
                        i = t(r), (n = i.closest(".wp-editor-wrap")).hasClass("html-active") || (a = i.attr("name"), null !== (o = e.get(a) || null) && (s = o.getContent(), i.val(s)))
                    })
                }
                return this.psv.$form.serialize() || null
            }
            setTabError(t, e) {
                let i = t.closest(".tab").attr("id"),
                    n = this.psv.$containerTabs.find("[data-tab='#" + i + "']");
                e ? n.addClass(this.psv.clsHasError) : n.removeClass(this.psv.clsHasError)
            }
            removeErrorsFromAllTabs() {
                this.psv.$containerTabs.find(".nav-tab").each((e, i) => {
                    t(i).removeClass(this.psv.clsHasError)
                })
            }
            onFocusReadonlyTextArea(e) {
                let i = t(e.target);
                i.select(), i.mouseup(function() {
                    return i.unbind("mouseup"), !1
                })
            }
            prepareSortables() {
                t(".meta-box-sortables").sortable("option", "cancel", ".not-sortable .hndle, :input, button").sortable("refresh"), t(".inputs").sortable({
                    placeholder: "sortable-placeholder",
                    handle: ".kdn-sort",
                    items: " > .input-group",
                    axis: "y",
                    cursor: "move",
                    start: function(t, e) {
                        e.placeholder.height(e.helper.outerHeight())
                    },
                    update: function(e, i) {
                        let n, a, s, o, l = new RegExp("\\[[0-9]+\\]", "g");
                        i.item.closest(".inputs").find("> .input-group").each(function(e) {
                            (n = t(this)).data("key", e), n.attr("data-key", e), n.find(":input[name]").each(function() {
                                a = t(this), s = a.attr("id"), null !== (o = a.attr("name")) && void 0 !== o && "undefined" !== o && o.length && a.attr("name", o.replace(l, "[" + e + "]")), null !== s && void 0 !== s && "undefined" !== s && s.length && a.attr("id", s.replace(l, "[" + e + "]"))
                            })
                        })
                    }
                })
            }
            handleLoadClearGeneralSettings(e) {
                e.preventDefault();
                let i = t(e.target),
                    n = i.attr("id");
                i.hasClass("loading") || (i.addClass("loading"), t.post(window.ajaxurl, {
                    kdn_nonce: this.psv.$kdnNonce.val(),
                    action: window.pageActionKey,
                    data: {
                        cmd: "#" + n == this.psv.selectorClearGeneralSettingsButton ? "clearGeneralSettings" : "loadGeneralSettings"
                    }
                }).done(e => {
                    let i = e.view;
                    t(this.psv.selectorTabGeneralSettings).html(i).find("[type=checkbox]").trigger("change")
                }).fail(t => {
                    console.log(t)
                }).always(() => {
                    i.removeClass("loading")
                }))
            }
            initCopyToClipboard() {
                h.a.getInstance().initForSelector(".input-button-container > button")
            }
            onClickToggleInfoTexts(e) {
                e.preventDefault(), this.psv.$containerMetaBox.find(".info-text").each((e, i) => {
                    this.psv.infoTextsHidden ? t(i).removeClass("hidden") : t(i).addClass("hidden")
                }), this.psv.infoTextsHidden = !this.psv.infoTextsHidden
            }
            onClickInfoButton(e) {
                e.preventDefault();
                let i = t(e.target).closest(".info-button").parent().find(".info-text").first();
                i.hasClass("hidden") ? i.removeClass("hidden") : i.addClass("hidden")
            }
            onClickTab(e) {
                e.preventDefault(), this.activateTab(t(e.target).data("tab"))
            }
            onLoadRefreshTranslationLanguages(e) {
                e.preventDefault();
                let i = t(e.target),
                    n = i.data("kdn"),
                    a = n.serviceType,
                    s = n.selectors,
                    o = n.requestType,
                    l = {};
                if (i.hasClass("loading")) return;
                for (let e in s) {
                    if (!s.hasOwnProperty(e)) continue;
                    let i = s[e],
                        n = t(i),
                        a = n.val();
                    if (!a.length) return void this.notifier.notify(n, window.kdn.required);
                    l[e] = a
                }
                let r = {};
                r[a] = l, r.requestType = o, r.isOption = t(".kdn-general-settings").length ? 1 : 0, i.addClass("loading"), t.post(window.ajaxurl, {
                    kdn_nonce: this.psv.$kdnNonce.val(),
                    action: window.pageActionKey,
                    data: r
                }).done(e => {
                    if (void 0 == e || !e || void 0 == e.view || void 0 != e.errors && e.errors.length) {
                        if (this.notifier.notify(i, window.kdn.an_error_occurred), console.log(e), void 0 != e.view) {
                            let t = i.closest("td").find(".test-results");
                            t.find(".content").html(e.view), t.removeClass("hidden")
                        }
                        return
                    }
                    let n = t(e.view.from),
                        a = t(e.view.to),
                        s = n.find("select").first().attr("name"),
                        o = a.find("select").first().attr("name");
                    t("label[for='" + s + "']").closest("tr").find("td:nth-child(2)").html(e.view.from), t("label[for='" + o + "']").closest("tr").find("td:nth-child(2)").html(e.view.to), this.flashBackground(t("#" + s)), this.flashBackground(t("#" + o))
                }).fail(t => {
                    this.notifier.notify(i, window.kdn.an_error_occurred + ": " + t.responseText), console.log(t)
                }).always(() => {
                    i.removeClass("loading")
                })
            }
            onClickHideTestResults(e) {
                e.preventDefault();
                let i = t(e.target).closest(".test-results");
                i.addClass("hidden"), i.find(".content").html("")
            }
            onClickTest(e) {
                e.preventDefault();
                let i = t(e.target),
                    n = this.testDataPreparer.prepareTestData(i);
                if (null == n) return;
                let a = i.closest("td").find(".test-results"),
                    s = a.find(".content");
                a.removeClass("hidden").addClass("loading"), s.html(""), i.addClass("loading"), t.post(window.ajaxurl, {
                    kdn_nonce: this.psv.$kdnNonce.val(),
                    action: window.pageActionKey,
                    data: n
                }).done(e => {
                    if (void 0 == e || !e || void 0 == e.view) return void s.html(window.kdn.an_error_occurred);
                    let n = t("<div>" + e.view + "</div>").find("ul").data("results");
                    if (null !== n && void 0 !== n && "undefined" !== n && i.data("results", n), s.html(e.view), i.hasClass("kdn-category-map")) {
                        let i = t(this.psv.selectorCategoryMap).find(".inputs");
                        for (let t = 0; t < e.data.length; t++) {
                            let n = e.data[t];
                            n.match("^javascript") || this.inputGroupAdder.addNewInputGroup(i).find("input").val(n)
                        }
                    }
                }).fail(t => {
                    s.html(window.kdn.an_error_occurred + " <br />" + t.responseText), console.log(t)
                }).always(() => {
                    a.removeClass("loading"), i.removeClass("loading")
                })
            }
            onClickRemove(e) {
                e.preventDefault();
                let i = t(e.target),
                    n = i.closest(".inputs").find(".input-group").length,
                    a = i.closest(".input-group");
                1 == n ? (a.find("input").each(function() {
                    t(this).val("").trigger("change")
                }), a.find("textarea").each(function() {
                    t(this).html("").val("").trigger("change")
                }), a.find("input[type=checkbox]").each(function() {
                    t(this).prop("checked", !1).trigger("change")
                }), a.find(".kdn-options-box").each(function() {
                    let e = t(this);
                    e.removeClass("has-config"), "function" == typeof t.fn.tooltip && e.tooltip("destroy")
                })) : (a.find(".input-container").find("input, select, textarea").val("").trigger("change"), a.remove())
            }
            onClickAddNew(e) {
                e.preventDefault();
                let i = t(e.target),
                    n = i.closest("td").find(".inputs"),
                    a = i.data("max");
                0 != a && n.length >= a || this.inputGroupAdder.addNewInputGroup(n)
            }
            onClickInvalidateTestUrlCache(e) {
                e.preventDefault();
                let i = t(e.target),
                    n = i.data("url") || null;
                if (null === n || !n.length) return void this.notifier.notify(i, window.kdn.url_cannot_be_retrieved);
                let a = i.closest(".test-results");
                a.hasClass("loading") || (a.addClass("loading"), t.post(window.ajaxurl, {
                    kdn_nonce: this.psv.$kdnNonce.val(),
                    action: window.pageActionKey,
                    data: {
                        cmd: "invalidate_url_response_cache",
                        url: n
                    }
                }).done(t => {
                    let e = "1" == t,
                        n = e ? window.kdn.cache_invalidated : window.kdn.cache_could_not_be_invalidated;
                    this.notifier.notifyRegular(i, n, e ? r.a.SUCCESS : r.a.ERROR)
                }).fail(t => {
                    console.log(t), this.notifier.notify(i, window.kdn.cache_could_not_be_invalidated)
                }).always(() => {
                    a.removeClass("loading")
                }))
            }
            onClickInvalidateAllTestUrlCaches(e) {
                e.preventDefault();
                let i = t(e.target),
                    n = i.closest(".test-results");
                n.hasClass("loading") || (n.addClass("loading"), t.post(window.ajaxurl, {
                    kdn_nonce: this.psv.$kdnNonce.val(),
                    action: window.pageActionKey,
                    data: {
                        cmd: "invalidate_all_url_response_caches"
                    }
                }).done(t => {
                    let e = "1" == t,
                        n = e ? window.kdn.all_cache_invalidated : window.kdn.all_cache_could_not_be_invalidated;
                    this.notifier.notifyRegular(i, n, e ? r.a.SUCCESS : r.a.ERROR)
                }).fail(t => {
                    console.log(t), this.notifier.notify(i, window.kdn.all_cache_could_not_be_invalidated)
                }).always(() => {
                    n.removeClass("loading")
                }))
            }
            initTooltip() {
                d.a.initTooltipForSelector("")
            }
            handleURLHash() {
                let t = window.location.hash;
                if (t && 0 === t.indexOf("#_")) {
                    let e = t.split("|")[0];
                    this.activateTab(e.replace("#_", "#"))
                }
            }
            restoreURLHash() {
                let e = t(this.psv.selectorInputURLHash);
                if (!e.length || !e.first().val()) return;
                let i = e.first().val().split("|");
                i.length < 2 || "" === i[0] || history.replaceState(void 0, void 0, i.join("|"))
            }
            activateTab(e) {
                this.resetFixableElements();
                let i = this.psv.$containerTabs.find('[data-tab="' + e + '"]');
                if (!i.length || i.hasClass("hidden") || i.hasClass("nav-tab-active")) return;
                let n = Math.floor(this.getTopOffsetOfTargetFixable(this.psv.$containerTabs) || 0);
                this.getActiveTab().data("scrolltop", this.getScrollTop() > n ? this.getScrollTop() : null), this.psv.$containerMetaBox.find("> .tab").addClass("hidden"), this.psv.$containerTabs.find("a").removeClass("nav-tab-active");
                let a = i.data("tab");
                t(a).removeClass("hidden"), i.addClass("nav-tab-active"), this.onActiveTabChanged();
                let s = window.location.hash.split("|");
                s[0] = a.replace("#", "#_"), history.replaceState(void 0, void 0, s.join("|")), this.maybeInitTinyMceEditors(), this.resetFixableElements(), this.handleElementFixing();
                let o = i.data("scrolltop") || null,
                    l = this.getScrollTop() + this.getAdminBarHeightIfFixed(),
                    r = this.getAdminBarHeightIfFixed();
                null === o && (o = n < l ? n - r : null), null !== o && l >= n && t(document).scrollTop(o)
            }
            onActiveTabChanged() {
                this.invalidateActiveTabContainer(), this.invalidateActiveTabFixablesCache()
            }
            resetPrevScrollPositionCacheOfTabs() {
                this.getAllTabs().removeData("scrolltop")
            }
            maybeInitTinyMceEditors() {
                let e = this.getActiveTabContainer();
                null === e || null !== e && e.hasClass("editors-initialized") || (e.find(".wp-editor-container").each((e, i) => {
                    let n = t(i),
                        a = n.find("textarea").first() || null;
                    if (null === a || !a.length || a.hasClass("initialized")) return;
                    let s = a.height();
                    n.find(".mce-container > iframe").css("height", s + "px"), a.addClass("initialized")
                }), e.addClass("editors-initialized"))
            }
            getActiveTabFixables() {
                return void 0 !== this.$activeTabFixables ? this.$activeTabFixables : (this.$activeTabFixables = this.getActiveTabContainer().find(this.psv.selectorFixable + "." + c.a.classInitialized) || null, this.$activeTabFixables)
            }
            invalidateActiveTabFixablesCache() {
                this.$activeTabFixables = void 0
            }
            getActiveTabContainer() {
                if (void 0 !== this.$activeTabContainer) return this.$activeTabContainer;
                let e = this.getActiveTab();
                if (null === e) return this.$activeTabContainer = null, this.$activeTabContainer;
                let i = e.data("tab"),
                    n = t(i).first() || null;
                return this.$activeTabContainer = null !== n && n.length ? n : null, this.$activeTabContainer
            }
            invalidateActiveTabContainer() {
                this.$activeTabContainer = void 0
            }
            getActiveTab() {
                let t = this.psv.$containerTabs.find(".nav-tab-active").first() || null;
                return null !== t && t.length ? t : null
            }
            getAllTabs() {
                return this.psv.$containerTabs.find(".nav-tab")
            }
            getScrollTop() {
                return (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0)
            }
            flashBackground(t) {
                t.stop().css("background-color", "#b8ea84").animate({
                    backgroundColor: "#FFFFFF"
                }, 1e3)
            }
        }
        v.INSTANCE = null
    }).call(this, i(1))
}, , , function(t, e, i) {
    "use strict";
    (function(t) {
        i.d(e, "a", function() {
            return a
        });
        var n = i(3);
        class a {
            constructor() {}
            static getInstance() {
                return null === this.instance && (this.instance = new a), this.instance
            }
            initForSelector(e) {
                if (!t(e).length) return;
                let i = new window.Clipboard(e);
                i.on("success", e => {
                    n.a.flashTooltip(t(e.trigger), window.kdn.copied), e.clearSelection()
                }), i.on("error", e => {
                    let i = -1 != navigator.platform.indexOf("Mac") ? "⌘-C" : "Ctrl + C";
                    n.a.flashTooltip(t(e.trigger), window.kdn.press_to_copy.format(i))
                })
            }
        }
        a.instance = null
    }).call(this, i(1))
}, function(t, e, i) {
    "use strict";
    (function(t) {
        i.d(e, "a", function() {
            return s
        });
        var n = i(13),
            a = i(9);
        class s {
            constructor() {
                this._selectorNavContainer = ".tab-section-nav", this.selectorTabContainer = ".tab", this.selectorNavigationRow = "tr[data-id^=section-]", t(document).on("click", this._selectorNavContainer + " [data-id]", t => this.onClickNavItem(t))
            }
            static getInstance() {
                return null === this.instance && (this.instance = new s), this.instance
            }
            onClickNavItem(e) {
                let i = t(e.target),
                    a = i.data("id"),
                    s = null,
                    o = 0 === a.indexOf("tab");
                if (o) s = t("#" + a);
                else {
                    let t = 'tr[data-id="' + a + '"]';
                    s = i.closest(this.selectorTabContainer).find(t) || null
                }
                if (null === s || !s.length) return;
                let l = t(document).find("html, body"),
                    r = n.a.getInstance().getFixedElementsTotalHeight();
                l.stop().animate({
                    scrollTop: s.offset().top - r - .02 * t(window).height()
                }, 500, "swing", () => {
                    if (o) return;
                    let e = n.a.getInstance().getFixedElementsTotalHeight();
                    e !== r && l.stop().animate({
                        scrollTop: s.offset().top - e - .02 * t(window).height()
                    }, 250, "swing")
                })
            }
            initNavigations() {
                let e;
                t(this._selectorNavContainer).each((i, n) => {
                    (e = t(n)).html(""), e.append(this.createNavigationElement(this.getNavigationItems(e.closest(this.selectorTabContainer)))), e.parent().addClass(s.classInitialized)
                }), t(document).trigger(a.a.navigationsInitialized)
            }
            getNavigationItems(e) {
                let i, n = [];
                return n[e.attr("id")] = window.kdn.top, e.find(this.selectorNavigationRow).each((e, a) => {
                    i = t(a), n[i.attr("data-id")] = i.text()
                }), n
            }
            createNavigationElement(e) {
                let i = t("<ul/>");
                for (let n in e) e.hasOwnProperty(n) && i.append(t("<li/>").append(t("<a/>").attr("data-id", n).attr("role", "button").html(e[n])));
                return i
            }
        }
        s.instance = null, s.classInitialized = "initialized"
    }).call(this, i(1))
}, , , , , , , , , function(t, e, i) {
    "use strict";
    (function(t) {
        i.d(e, "a", function() {
            return s
        });
        var n = i(27),
            a = i(10);
        class s {
            constructor() {
                s.isWooCommerceSettingsAvailable() && (this.wcsv = n.a.getInstance(), t(document).ready(t => this.handleURLHash()), this.wcsv.$settingsContainer.on("click", ".tab-wrapper li > a", t => this.onClickTab(t)), t(document).on("change", this.wcsv.selectorSelectProductType, t => this.onChangeProductTypeSelect(t)))
            }
            static getInstance() {
                return null === this.INSTANCE && (this.INSTANCE = new s), this.INSTANCE
            }
            onChangeProductTypeSelect(e) {
                let i = t(e.target);
                if ("external" == i.val()) {
                    let e = [t(this.wcsv.selectorCheckboxVirtual) || null, t(this.wcsv.selectorCheckboxDownloadable) || null];
                    for (let t of e) null !== t && t.length && (t[0].checked = !1, t.trigger("change"))
                }
                a.a.getInstance().handleSelectDependants(i)
            }
            static isWooCommerceSettingsAvailable() {
                return t("#woocommerce-options-container").length > 0
            }
            onClickTab(e) {
                e.preventDefault();
                let i = t(e.target).closest("a");
                let k = jQuery('#' + t(e.target).closest(".tab").attr("id"));
                this.activateTab(i.data("tab"), k)
            }
            activateTab(e, k) {
                let i = this.wcsv.$tabContainer.find('[data-tab="' + e + '"]');
                if (!i.length) return;
                k.find(this.wcsv.$contentContainer).find(".tab-content").addClass("hidden"), k.find(this.wcsv.$tabContainer).find("li").removeClass("active");
                let n = i.data("tab");
                t(n).removeClass("hidden"), i.closest("li").addClass("active");
                let a = window.location.hash.split("|");
                a[1] = n, history.replaceState(void 0, void 0, a.join("|"))
            }
            handleURLHash() {
                let t = window.location.hash;
                if (t && 0 === t.indexOf("#_")) {
                    let e = t.split("|");
                    if (e.length > 1) {
                        var o = e[1];
                        let k = jQuery(e[0].replace("#_", "#"));
                        if (e[0].match(/(child-post)/i) && !e[1].match(/(child-post)/i)) {
                            o = o.replace("#", "#child-post-");
                        } else if (!e[0].match(/(child-post)/i) && e[1].match(/(child-post)/i)) {
                            o = o.replace("child-post-", "");
                        }
                        this.activateTab(o, k)
                    }
                }
            }
        }
        s.INSTANCE = null
    }).call(this, i(1))
}, function(t, e, i) {
    "use strict";
    (function(t) {
        i.d(e, "a", function() {
            return n
        });
        class n {
            constructor() {
                this.selectorSettingsWrapper = ".woocommerce-settings-wrapper", this.selectorTabContentWrapper = this.selectorSettingsWrapper + " > .tab-content-wrapper", this.$settingsContainer = t(this.selectorSettingsWrapper), this.$tabContainer = t(this.selectorSettingsWrapper + " > .tab-wrapper"), this.$contentContainer = t(this.selectorTabContentWrapper), this.selectorSelectProductType = "#_wc_product_type, #_child_post_wc_product_type", this.selectorCheckboxVirtual = "#_wc_virtual", this.selectorCheckboxDownloadable = "#_wc_downloadable"
            }
            static getInstance() {
                return null === this.INSTANCE && (this.INSTANCE = new n), this.INSTANCE
            }
        }
        n.INSTANCE = null
    }).call(this, i(1))
}, function(t, e, i) {
    "use strict";
    (function(t) {
        i.d(e, "a", function() {
            return s
        });
        var n = i(3),
            a = i(16);
        class s {
            constructor() {
                this.inputNameCustomShortCodes = "_post_custom_content_shortcode_selectors", this.customShortCodeButtonContainerSelector = "#tab-templates .custom-short-code-container", this.updateCustomShortCodeButtonContainers();
                let t = this.getCustomShortCodeInputContainer();
                null !== t && t.on("change", 'input[name$="[short_code]"]', () => this.updateCustomShortCodeButtonContainers())
            }
            static getInstance() {
                return null === this.instance && (this.instance = new s), this.instance
            }
            updateCustomShortCodeButtonContainers() {
                let e = t(this.customShortCodeButtonContainerSelector) || null;
                if (null === e || !e.length) return;
                const i = this.getCustomShortCodeButtons() || null,
                    s = null !== i && i.length;
                let o;
                e.each((e, n) => {
                    (o = t(n)).html(""), s && o.append(i.clone())
                });
                let l = this.customShortCodeButtonContainerSelector + " button";
                n.a.initTooltipForSelector(l), a.a.getInstance().initForSelector(l)
            }
            getCustomShortCodeButtons() {
                let e = this.getCustomShortCodeInputContainer();
                if (null === e) return null;
                let i, n = [];
                e.find('input[name*="[short_code]"]').each((e, a) => {
                    null !== (i = t(a).val() || null) && i.length && n.push(i)
                });
                let a, s, o = t("<div/>");
                for (let e of n) a = "[" + e + "]", s = t("<button/>").addClass("button").attr("type", "button").attr("data-shortcode-name", e).attr("data-clipboard-text", a).attr("data-toggle", "tooltip").attr("data-placement", "top").attr("title", window.kdn.custom_short_code + ": " + e).html(a), o.append(s);
                return o
            }
            getCustomShortCodeInputContainer() {
                let e = t('input[name^="' + this.inputNameCustomShortCodes + '"]').first() || null;
                if (null === e || !e.length) return null;
                let i = e.closest(".inputs") || null;
                return null !== i && i.length ? i : null
            }
        }
        s.instance = null
    }).call(this, i(1))
}, , , , , , function(t, e, i) {
    "use strict";
    i.r(e),
        function(t) {
            var e = i(13);
            t(function(t) {
                e.a.getInstance()
            })
        }.call(this, i(1))
}]);