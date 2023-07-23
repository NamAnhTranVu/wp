! function(t) {
    var e = {};

    function s(n) {
        if (e[n]) return e[n].exports;
        var i = e[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return t[n].call(i.exports, i, i.exports, s), i.l = !0, i.exports
    }
    s.m = t, s.c = e, s.d = function(t, e, n) {
        s.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: n
        })
    }, s.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, s.t = function(t, e) {
        if (1 & e && (t = s(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if (s.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var i in t) s.d(n, i, function(e) {
                return t[e]
            }.bind(null, i));
        return n
    }, s.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return s.d(e, "a", e), e
    }, s.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, s.p = "", s(s.s = 32)
}([, function(t, e) {
    t.exports = jQuery
}, function(t, e, s) {
    "use strict";
    var n;
    s.d(e, "a", function() {
            return n
        }),
        function(t) {
            t.WARN = "warn", t.INFO = "info", t.ERROR = "error", t.SUCCESS = "success"
        }(n || (n = {}))
}, function(t, e, s) {
    "use strict";
    (function(t) {
        s.d(e, "a", function() {
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
                let s = t.attr("data-original-title");
                t.attr("data-original-title", e).tooltip("fixTitle").tooltip("show").attr("data-original-title", s).tooltip("fixTitle")
            }
            static initTooltipForSelector(e) {
                "function" == typeof t.fn.tooltip && t(e + '[data-toggle="tooltip"]').tooltip()
            }
            static getCheckboxValue(t) {
                return !(null === (t = t || null) || !t.length) && !!t[0].checked
            }
        }
    }).call(this, s(1))
}, function(t, e, s) {
    "use strict";
    (function(t) {
        s.d(e, "a", function() {
            return a
        });
        var n = s(2),
            i = s(5);
        class a {
            constructor() {}
            static getInstance() {
                return null === this.INSTANCE && (this.INSTANCE = new a), this.INSTANCE
            }
            notify(t, e) {
                if (!this.isNotifyAvailable()) return;
                void 0 != e && e.length || (e = window.kdn.required_for_test);
                let s = t.closest("tr").find("label").first(),
                    n = s.length ? s : t;
                this.scrollToElement(n), n.notify(e, {
                    position: "top"
                })
            }
            notifyRegular(t, e, s = n.a.INFO, a = i.a.TOP) {
                this.isNotifyAvailable() && t.notify(e, {
                    position: a || "top",
                    className: s || "info"
                })
            }
            scrollToElement(e) {
                t(document).find("html, body").stop().animate({
                    scrollTop: e.first().offset().top - t(window).height() / 4
                }, 500, "swing")
            }
            isNotifyAvailable(e = !0) {
                let s = !("function" != typeof t.fn.notify);
                return !s && e && console.error("NotifyJS is not defined."), s
            }
        }
        a.INSTANCE = null
    }).call(this, s(1))
}, function(t, e, s) {
    "use strict";
    var n;
    s.d(e, "a", function() {
            return n
        }),
        function(t) {
            t.TOP = "top", t.RIGHT = "right", t.BOTTOM = "bottom", t.LEFT = "left"
        }(n || (n = {}))
}, function(t, e, s) {
    "use strict";
    (function(t) {
        s.d(e, "a", function() {
            return i
        });
        var n = s(14);
        class i {
            constructor(t, e, s) {
                this._stateKey = t, this._tabId = e, this._color = s
            }
            get stateKey() {
                return this._stateKey
            }
            get tabId() {
                return this._tabId
            }
            get color() {
                return this._color
            }
            setSelectValue(t, e, s) {
                this._setInputValue(t, e, s, t => {
                    t.val(t.find("option").first().val())
                }, (t, e) => {
                    t.val(e)
                })
            }
            setInputValue(t, e, s) {
                this._setInputValue(t, e, s, t => {
                    t.val("")
                }, (t, e) => {
                    t.val(e)
                })
            }
            setCheckboxValue(t, e, s) {
                this._setInputValue(t, e, s, t => {
                    t.prop("checked", !1)
                }, (t, e) => {
                    t.prop("checked", !0)
                })
            }
            _setInputValue(t, e, s, n, i) {
                let a = this.getSettingInputWithPartialName(t, e);
                if (null === a) return;
                let r = s[e] || null;
                null === r ? n(a) : i(a, r)
            }
            getSettingInputWithPartialName(t, e) {
                let s = t.find('[name$="[' + e + ']"]');
                return s.length ? s : null
            }
            clearInputsInContainer(e) {
                e.find(".kdn-remove").each((e, s) => {
                    t(s).click()
                })
            }
            addInputGroupToContainer(t) {
                return t.find(".kdn-add-new").click(), t.find(".inputs > .input-group:last-child")
            }
            getFirstInputGroupInContainer(t) {
                return t.find(".inputs > .input-group:first-child")
            }
            getVariables() {
                return n.a.getInstance()
            }
            getTabContainer() {
                return t("#" + this.tabId)
            }
            getSettingsContainer() {
                return this.getTabContainer().find(".kdn-settings").first()
            }
            getInputValuesAsObject() {
                return (this.getTabContainer().find(":input").serializeObjectNoNull() || {})[this.getVariables().inputName] || {}
            }
            restoreMultipleInputValues(t, e, s, n) {
                let i = t.find('[name^="' + this.getVariables().inputName + "[" + s + ']"]').closest("td") || null;
                if (null === i || !i.length) return;
                this.clearInputsInContainer(i);
                let a = e[s] || null;
                if (null === a || !a.length) return;
                let r, o, l = !0,
                    c = a.length;
                for (let t = 0; t < c; t++) null !== (r = a[t] || null) && (l ? (o = this.getFirstInputGroupInContainer(i), l = !1) : o = this.addInputGroupToContainer(i), n(o, r))
            }
            filterMultipleInputState(t, e, s) {
                return t[e] = (t[e] || []).filter(t => s(t)), t
            }
        }
    }).call(this, s(1))
}, function(module, __webpack_exports__, __webpack_require__) {
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
                let ajax = jQuery(".options-box-container").attr('ajax');
                let mData = $testButton.data("kdn");
                if (void 0 == mData || !mData) return null;
                let data = JSON.parse(JSON.stringify(mData));
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
                    let e = $(data[t]);
                    if (allSelectorsRequired && (void 0 == e.val() || !e.val().length)) return this.notifier.notify(e, void 0), null;
                    delete data[t], e.length && (1 === e.length && (data[t.replace("Selector", "")] = e.val() || null))
                }
                if (data.hasOwnProperty("extra")) {
                    let t = data.extra,
                        e = {},
                        s, n;
                    for (let i in t) t.hasOwnProperty(i) && (s = t[i], s.hasOwnProperty("selector") && s.hasOwnProperty("data") && (n = $(s.selector).data(s.data), null !== n && void 0 !== n && "undefined" !== n && (e[i] = n)));
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
                let s = $(this.psv.selectorTabMain).find('input[name="_cache_test_url_responses"]') || null;
                null !== s && s.length && (t.cacheTestUrlResponses = s[0].checked ? 1 : 0);
                let n = $("#_do_not_use_general_settings") || null,
                    i = !1;
                null !== n && (n.length && n[0].checked ? (t.customGeneralSettings = $(this.psv.selectorTabGeneralSettings).find(":input").serialize(), i = !0) : t.customGeneralSettings = void 0);
                let a = $("#_kdn_make_sure_encoding_utf8") || null;
                if (null !== a && a.length && i) {
                    t.useUtf8 = a.first()[0].checked ? 1 : 0;
                    let e = $("#_kdn_convert_charset_to_utf8") || null;
                    t.convertEncodingToUtf8 = _common_ts_Utils__WEBPACK_IMPORTED_MODULE_2__.a.getCheckboxValue(e) ? 1 : 0
                } else t.useUtf8 = -1, t.convertEncodingToUtf8 = -1;
                return t
            }
            addManipulationOptionsToAjaxData(t, ajax) {
                let e = $("div.tab:not(.hidden)");
                "templates" === e.attr("id").replace("tab-", "").toLowerCase() && (e = $(this.psv.selectorTabPost));
                let s, n, i, a, r = /[^\\[]+/,
                    o = {};
                let ajaxHtmlManipulation = ["find_replace_raw__html", "find_replace_first__load", "find_replace_element__attributes", "exchange_element__attributes", "remove_element__attributes", "find_replace_element__html", "unnecessary_element__selectors"];
                for (let t = 0; t < (ajax ? ajaxHtmlManipulation : this.psv.baseHtmlManipulationInputNames).length; t++) s = (ajax ? ajaxHtmlManipulation : this.psv.baseHtmlManipulationInputNames)[t], (i = (n = e.find('input[name*="' + s + '"]').first()).closest(".inputs").find(":input")).length < 1 || (o[a = n.attr("name").match(r)[0]] = i.serialize());
                if (ajax) {
                    Object.keys(o).forEach(function(key) {
                        var newkey = key.replace(/__/ig, '_');
                        o[newkey] = o[key].replace(/__/ig, '_');
                        delete o[key];
                    });
                }
                return t.manipulation_options = o, t
            }
            addDataForFindReplaceInCustomMetaOrShortCodeTest(t, e) {
                if (!t.hasClass("kdn-test-find-replace-in-custom-meta") && !t.hasClass("kdn-test-find-replace-in-custom-short-code")) return e;
                let s = t.hasClass("kdn-test-find-replace-in-custom-meta"),
                    n = "." + (s ? "meta-key" : "short-code"),
                    i = "." + (s ? "selector-custom-post-meta" : "selector-custom-shortcode"),
                    a = t.closest(".input-group").find(".input-container").find(n);
                if (!a.length) return e;
                let r = a.val();
                if (void 0 == r || !r.length) return e;
                let o = !1;
                return $(".input-group" + i + " " + n).each(function() {
                    if (o) return;
                    let t = $(this);
                    if (t.val() == r) {
                        let s = t.closest(".input-group").find(".css-selector"),
                            n = t.closest(".input-group").find(".css-selector-attr"),
                            i = t.closest(".input-group").find('[name*="[options_box]"]'),
                            a = s.val(),
                            r = n.val(),
                            l = i.length ? i.val() : void 0;
                        void 0 != a && a.length && (e.valueSelector = a, void 0 != r && r.length && (e.valueSelectorAttr = r), void 0 !== l && (e.valueOptionsBoxData = l), o = !0)
                    }
                }), o || s && $(".input-group.custom-post-meta .meta-key").each(function() {
                    if (o) return;
                    let t = $(this);
                    if (t.val() == r) {
                        let s = t.closest(".input-group").find("input[type=text]:not(.meta-key)").val();
                        void 0 != s && s.length && (e.subject = s, o = !0)
                    }
                }), e
            }
            escapeRegExp(t) {
                return t.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
            }
        }
        TestDataPreparer.INSTANCE = null
    }).call(this, __webpack_require__(1))
}, function(t, e, s) {
    "use strict";
    (function(t) {
        s.d(e, "a", function() {
            return n
        });
        class n {
            constructor() {
                this.$containerMetaBox = t(".kdn-settings-meta-box"), this.$containerTabs = t(".kdn-settings-meta-box > .nav-tab-wrapper"), this.$form = t("#post"), this.$errorAlert = t("#kdn-alert"), this.$kdnNonce = t("#kdn_nonce"), this.$adminBar = t("#wpadminbar"), this.selectorCategoryMap = "#category-map", this.selectorTabMain = "#tab-main", this.selectorTabPost = "#tab-post", this.selectorTabCategory = "#tab-category", this.selectorTabGsPost = "#tab-gs-post", this.selectorTabGeneralSettings = "#tab-general-settings", this.selectorTestButton = ".kdn-test", this.selectorInputContainerPasswords = ".input-container-passwords", this.selectorLoadGeneralSettingsButton = "#btn-load-general-settings", this.selectorClearGeneralSettingsButton = "#btn-clear-general-settings", this.selectorInputImport = "#_post_import_settings", this.selectorLoadTranslationLanguages = ".load-languages", this.selectorInputURLHash = "input[name='url_hash']", this.inputNameCookies = "_cookies", this.baseHtmlManipulationInputNames = ["find_replace_raw_html", "find_replace_first_load", "find_replace_element_attributes", "exchange_element_attributes", "remove_element_attributes", "find_replace_element_html", "unnecessary_element_selectors"], this.selectorOriginalTestResults = ".original-results", this.selectorButtonSeeUnmodifiedTestResults = this.selectorOriginalTestResults + " .see-unmodified-results", this.selectorInvalidateCacheButton = ".invalidate-cache-for-this-url", this.selectorInvalidateAllCachesButton = ".invalidate-all-test-url-caches", this.selectorQuickSaveButton = ".quick-save-container .quick-save", this.selectorExportSettingsTextArea = "#_post_export_settings", this.clsHasError = "has-error", this.$inputAction = t("#hiddenaction"), this.infoTextsHidden = !0, this.classFixed = "kdn-fixed", this.selectorFixable = ".fixable", this.selectorCheckboxFixTabs = "#_fix_tabs", this.selectorCheckboxFixContentNavigation = "#_fix_content_navigation"
            }
            static getInstance() {
                return null === this.INSTANCE && (this.INSTANCE = new n), this.INSTANCE
            }
        }
        n.INSTANCE = null
    }).call(this, s(1))
}, function(t, e, s) {
    "use strict";
    s.d(e, "a", function() {
        return n
    });
    class n {}
    n.navigationsInitialized = "kdnNavigationsInitialized", n.optionsBoxTabActivated = "kdnOptionsBoxTabActivated"
}, , function(t, e, s) {
    "use strict";
    (function(t) {
        s.d(e, "a", function() {
            return n
        });
        class n {
            constructor() {
                this.registerFunction()
            }
            static getInstance() {
                return null === this.INSTANCE && (this.INSTANCE = new n), this.INSTANCE
            }
            registerFunction() {
                t.fn.serializeObjectNoNull = function() {
                    let e = t.fn.serializeObject.apply(this, arguments);
                    for (let t in e) e.hasOwnProperty(t) && e[t] instanceof Array && (e[t] = e[t].filter(function(t) {
                        return null !== t
                    }));
                    return e
                }
            }
        }
        n.INSTANCE = null
    }).call(this, s(1))
}, , , function(t, e, s) {
    "use strict";
    s.d(e, "a", function() {
        return a
    });
    var n = s(1),
        i = s.n(n);
    class a {
        constructor() {
            this.optionsBoxButtonSelector = ".kdn-options-box", this.optionsBoxMainContainerClass = "options-box-container", this.optionsBoxMainContainerSelector = "." + this.optionsBoxMainContainerClass, this.optionsBoxSelector = this.optionsBoxMainContainerSelector + " > .options-box", this.optionsBoxSubContainerSelector = this.optionsBoxSelector + " > .box-container", this.noScrollClass = "no-scroll", this.titleSelector = this.optionsBoxSelector + " > .box-title", this.inputDetailsSelector = this.optionsBoxSelector + " > .input-details", this.tabContainerSelector = this.optionsBoxSelector + " .nav-tab-wrapper", this.tabHandleSelector = this.tabContainerSelector + " .nav-tab", this.tabContentsSelector = this.optionsBoxSelector + " .tab-content > .tab", this.selectorTestButton = ".kdn-test", this.inputName = "_options_box", this.selectorExportTextarea = "#_options_box_export_settings", this.selectorImportTextarea = "#_options_box_import_settings", this.selectorImportSettingsButton = ".options-box-import", this.selectorTestDataPresenterContainer = "#test-data-presenter", this.classTestDataPresenterHeader = "header", this.selectorTestDataPresenterHeader = this.selectorTestDataPresenterContainer + " ." + this.classTestDataPresenterHeader, this.classInvalidateTestData = "invalidate", this.selectorInvalidateTestData = this.selectorTestDataPresenterContainer + "." + this.classInvalidateTestData, this.selectorTestDataContainer = this.selectorTestDataPresenterContainer + " .data", this.$kdnNonce = i()("#kdn_nonce")
        }
        static getInstance() {
            return null === this.instance && (this.instance = new a), this.instance
        }
    }
    a.instance = null
}, , , , , , , , , , , , , , , , function(t, e, s) {
    "use strict";
    var n, i = s(1),
        a = s.n(i),
        r = s(7),
        o = s(4),
        l = s(2),
        c = s(14);
    ! function(t) {
        t[t.CALCULATIONS = 0] = "CALCULATIONS", t[t.FIND_REPLACE = 1] = "FIND_REPLACE", t[t.GENERAL = 2] = "GENERAL", t[t.IMPORT_EXPORT = 3] = "IMPORT_EXPORT", t[t.NOTES = 4] = "NOTES", t[t.TEMPLATES = 5] = "TEMPLATES", t[t.FILE_FIND_REPLACE = 6] = "FILE_FIND_REPLACE", t[t.FILE_OPERATIONS = 7] = "FILE_OPERATIONS", t[t.FILE_TEMPLATES = 8] = "FILE_TEMPLATES"
    }(n || (n = {}));
    var u = s(6);
    class h extends u.a {
        constructor() {
            super("calculations", "tab-options-box-calculations", "#FFFF00"), this.keyDecimalSeparatorAfter = "decimal_separator_after", this.keyUseThousandsSeparator = "use_thousands_separator", this.keyRemoveIfNotNumeric = "remove_if_not_numeric", this.keyPrecision = "precision", this.keyFormulas = "formulas"
        }
        restoreState(t, e) {
            let s = this.getSettingsContainer();
            this.setSelectValue(s, this.keyDecimalSeparatorAfter, t), this.setInputValue(s, this.keyPrecision, t), this.setCheckboxValue(s, this.keyUseThousandsSeparator, t), this.setCheckboxValue(s, this.keyRemoveIfNotNumeric, t), this.restoreMultipleInputValues(s, t, this.keyFormulas, (t, e) => {
                t.find('input[name$="[formula]"]').first().val(e.formula || "")
            })
        }
        saveState() {
            let t = this.getInputValuesAsObject();
            return t[this.keyFormulas] = t[this.keyFormulas].filter(t => (t.formula || []).length), t
        }
        getConfiguredOptionCount(t) {
            let e = 0;
            return e += (t[this.keyFormulas] || []).length, t.hasOwnProperty(this.keyRemoveIfNotNumeric) && (e += 1), e
        }
    }
    class p extends u.a {
        restoreState(t, e) {
            let s = this.getSettingsContainer();
            this.restoreMultipleInputValues(s, t, this.getKeyFindReplaces(), (t, e) => this.setInputGroupValues(t, e.find, e.replace, e.hasOwnProperty("regex"), e.hasOwnProperty("callback"), e.hasOwnProperty("spin")))
        }
        saveState() {
            let t = this.getInputValuesAsObject();
            return t = this.filterMultipleInputState(t, this.getKeyFindReplaces(), t => t.find.length || t.replace.length)
        }
        getConfiguredOptionCount(t) {
            return (t[this.getKeyFindReplaces()] || []).length
        }
        setInputGroupValues(t, e, s, n, r, p) {
            t.find('input[name$="[regex]"]').prop("checked", n), t.find('input[name$="[callback]"]').prop("checked", r), t.find('input[name$="[spin]"]').prop("checked", p), t.find('input[name$="[find]"]').val(e), t.find('input[name$="[replace]"],textarea[name$="[replace]"]').val(s)
        }
    }
    class d extends p {
        constructor() {
            super("findReplace", "tab-options-box-find-replace", "#FF0000")
        }
        getKeyFindReplaces() {
            return "find_replace"
        }
    }
    class g extends u.a {
        constructor() {
            super("general", "tab-options-box-general", "#FF7F00"), this.keyTreatAsJson = "treat_as_json", this.keyActiveTranslation = "active_translation"
        }
        restoreState(t, e) {
            let s = this.getSettingsContainer();
            this.setCheckboxValue(s, this.keyTreatAsJson, t);
            this.setCheckboxValue(s, this.keyActiveTranslation, t)
        }
        saveState() {
            return this.getInputValuesAsObject()
        }
        getConfiguredOptionCount(t) {
            let e = 0;
            return (t.hasOwnProperty(this.keyTreatAsJson) || t.hasOwnProperty(this.keyActiveTranslation)) && (e += 1), e
        }
    }
    var f = s(9);
    class b extends u.a {
        constructor() {
            super("importExport", "tab-options-box-import-export", "#2196f3"), a()(document).on(f.a.optionsBoxTabActivated, (t, e) => {
                e === this.tabId && this.updateExportTextArea()
            }), a()(this.getVariables().optionsBoxSelector).on("click", this.getVariables().selectorImportSettingsButton, t => {
                this.importSettings(), this.updateExportTextArea(), flashBackground(a()(this.getVariables().selectorImportTextarea))
            })
        }
        restoreState(t, e) {}
        saveState() {
            return {}
        }
        getConfiguredOptionCount(t) {
            return 0
        }
        importSettings() {
            let t = a()(this.getVariables().selectorImportTextarea),
                e = t.val().toString();
            void 0 !== e && null !== e && "undefined" !== e && e.length && (B.getInstance().getOptionsBoxInput().val(e), B.getInstance().restoreState(), t.val(""))
        }
        updateExportTextArea() {
            B.getInstance().saveState();
            let t = B.getInstance().getOptionsBoxInput().val();
            a()(this.getVariables().selectorExportTextarea).val(t)
        }
    }
    class T extends u.a {
        constructor() {
            super("notes", "tab-options-box-notes", "#0000FF"), this.keyNote = "note"
        }
        restoreState(t, e) {
            this.setNoteValue(t[this.keyNote] || "")
        }
        saveState() {
            let t = this.getInputValuesAsObject();
            return t[this.keyNote] = t[this.keyNote] || "", t
        }
        getConfiguredOptionCount(t) {
            let e = 0;
            return (t[this.keyNote] || []).length && (e += 1), e
        }
        setNoteValue(t) {
            let e = this.getTabContainer().find('textarea[name$="[note]"]').first() || null;
            null !== e && e.length && e.val(t)
        }
    }
    class v extends u.a {
        constructor() {
            super("templates", "tab-options-box-templates", "#00FF00"), this.keyRemoveIfEmpty = "remove_if_empty", this.keyTemplates = "templates"
        }
        restoreState(t, e) {
            let s = this.getSettingsContainer();
            this.setCheckboxValue(s, this.keyRemoveIfEmpty, t), this.restoreMultipleInputValues(s, t, this.keyTemplates, (t, e) => this.setInputGroupValues(t, e)), this.applySettings(e)
        }
        saveState() {
            let t = this.getInputValuesAsObject();
            return t = this.filterMultipleInputState(t, this.keyTemplates, t => (t.template || []).length)
        }
        getConfiguredOptionCount(t) {
            let e = 0;
            return e += (t[this.keyTemplates] || []).length, t.hasOwnProperty(this.keyRemoveIfEmpty) && (e += 1), e
        }
        setInputGroupValues(t, e) {
            t.find('textarea[name$="[template]"]').val(e.template)
        }
        applySettings(t) {
            const e = this.getShortCodeButtons(),
                s = (t || []).allowedShortCodes || null;
            if (null === s) e.removeClass("hidden");
            else {
                e.addClass("hidden");
                const t = s.map(t => '[data-shortcode-name="' + t + '"]').join(", ");
                this.getTabContainer().find(t).removeClass("hidden")
            }
        }
        getShortCodeButtons() {
            return this.getTabContainer().find(".short-code-container button")
        }
    }
    class m extends p {
        constructor() {
            super("fileFindReplace", "tab-options-box-file-find-replace", "#FF0000")
        }
        getKeyFindReplaces() {
            return "file_find_replace"
        }
    }
    class _ extends u.a {
        constructor() {
            super("fileOperations", "tab-options-box-file-operations", "#fffd00"), this.keyMove = "move", this.keyCopy = "copy"
        }
        restoreState(t, e) {
            let s = this.getSettingsContainer(),
                n = (t, e) => {
                    t.find("input").first().val(e.path || "")
                };
            this.restoreMultipleInputValues(s, t, this.keyCopy, n), this.restoreMultipleInputValues(s, t, this.keyMove, n)
        }
        saveState() {
            let t = this.getInputValuesAsObject(),
                e = t => (t.path || []).length;
            return t = this.filterMultipleInputState(t, this.keyCopy, e), t = this.filterMultipleInputState(t, this.keyMove, e)
        }
        getConfiguredOptionCount(t) {
            let e = 0;
            return e += (t[this.keyCopy] || []).length, e += (t[this.keyMove] || []).length
        }
    }
    class C extends u.a {
        constructor() {
            super("fileTemplates", "tab-options-box-file-templates", "#00ff1c"), this.keyName = "templates_file_name", this.keyTitle = "templates_media_title", this.keyDescription = "templates_media_description", this.keyCaption = "templates_media_caption", this.keyAlt = "templates_media_alt_text", this.selectorAllTemplates = "tr.file-template"
        }
        restoreState(t, e) {
            let s = this.getSettingsContainer();
            for (let e of this.getAllKeys()) this.restoreMultipleInputValues(s, t, e, (t, e) => {
                t.find('textarea[name$="[template]"]').val(e.template)
            });
            this.applySettings(e)
        }
        saveState() {
            let t = this.getInputValuesAsObject();
            for (let e of this.getAllKeys()) t = this.filterMultipleInputState(t, e, t => (t.template || []).length);
            return t
        }
        getConfiguredOptionCount(t) {
            return this.getAllKeys().reduce((e, s) => e + (t[s] || []).length, 0)
        }
        applySettings(t) {
            const e = (t || []).allowedTemplateTypes || null;
            let s = this.getTabContainer();
            if (null !== e && e.length) {
                s.find(this.selectorAllTemplates).addClass("hidden");
                for (let t of e) s.find("tr#" + t).removeClass("hidden")
            } else s.find(this.selectorAllTemplates).removeClass("hidden")
        }
        getAllKeys() {
            return null === C.allKeys && (C.allKeys = [this.keyName, this.keyTitle, this.keyDescription, this.keyCaption, this.keyAlt]), C.allKeys
        }
    }
    C.allKeys = null;
    class y {
        static getInstance(t) {
            if (!this.instances.hasOwnProperty(t)) {
                let e;
                switch (t) {
                    case n.CALCULATIONS:
                        e = new h;
                        break;
                    case n.FIND_REPLACE:
                        e = new d;
                        break;
                    case n.GENERAL:
                        e = new g;
                        break;
                    case n.IMPORT_EXPORT:
                        e = new b;
                        break;
                    case n.NOTES:
                        e = new T;
                        break;
                    case n.TEMPLATES:
                        e = new v;
                        break;
                    case n.FILE_FIND_REPLACE:
                        e = new m;
                        break;
                    case n.FILE_OPERATIONS:
                        e = new _;
                        break;
                    case n.FILE_TEMPLATES:
                        e = new C
                }
                this.instances[t] = e
            }
            return this.instances[t]
        }
    }
    y.instances = {};
    var S, x = s(11),
        I = s(3);
    ! function(t) {
        t.DEF = "default", t.FILE = "file"
    }(S || (S = {}));
    class E {
        constructor() {
            this.keyBox = "box", this.keyTabs = "tabs", this.keyType = "type"
        }
        static getInstance() {
            return null === this.instance && (this.instance = new E), this.instance
        }
        prepare(t) {
            this.config = t, this.prepareType()
        }
        get type() {
            return this._type
        }
        getTabSettings(t) {
            return this.objectGet(this.config, this.keyTabs + "." + t)
        }
        prepareType() {
            let t = this.objectGet(this.config, this.keyBox + "." + this.keyType);
            this._type = Object.values(S).includes(t) ? t : S.DEF
        }
        objectGet(t, e) {
            return e.split(".").reduce((t, e) => {
                if (null !== t) return t.hasOwnProperty(e) ? t[e] : null
            }, t) || null
        }
    }
    E.instance = null, s.d(e, "a", function() {
        return B
    });
    class B {
        constructor() {
            this.$currentButton = null, this.$latestTestButtonClickEvent = null, this.contentRetrievalInProgress = !1, this.tabHandlers = [], this.allTabHandlers = [], this.allTabHandlerNames = [], this.config = null, this.scrollPos = null, this.prevBoxType = null, this.boxTypeTabNames = (new Map).set(S.DEF, [n.FIND_REPLACE, n.GENERAL, n.CALCULATIONS, n.TEMPLATES, n.NOTES, n.IMPORT_EXPORT]).set(S.FILE, [n.FILE_FIND_REPLACE, n.FILE_OPERATIONS, n.FILE_TEMPLATES, n.NOTES, n.IMPORT_EXPORT]), this.testDataPreparer = r.a.getInstance(), this.obv = c.a.getInstance(), this.init()
        }
        static getInstance() {
            return null === this.instance && (this.instance = new B), this.instance
        }
        init() {
            x.a.getInstance(), a()(document).on("mouseup", this.obv.optionsBoxMainContainerSelector, t => this.onClickOutside(t)), a()(document).keyup(t => {
                27 === t.keyCode && this.close()
            }), a()(document).on("click", this.obv.optionsBoxButtonSelector, t => this.showBox(t)), a()(document).on("click", this.obv.tabHandleSelector, t => this.onClickTab(t)), a()(this.obv.optionsBoxMainContainerSelector).on("click", this.obv.selectorTestButton, t => this.onClickTestButton(t)), a()(this.obv.selectorTestDataPresenterContainer).on("click", "." + this.obv.classInvalidateTestData, t => this.onClickInvalidateTestData(t)), a()(this.obv.selectorTestDataPresenterContainer).on("click", "." + this.obv.classTestDataPresenterHeader, t => this.onClickTestDataPresenterHeader(t)), this.config = E.getInstance(), this.initAllTabHandlers(), this.initAllOptionsBoxButtonTooltips()
        }
        onClickOutside(t) {
            a()(t.target).hasClass(this.obv.optionsBoxMainContainerClass) && this.close()
        }
        close() {
            let t = a()(this.obv.optionsBoxMainContainerSelector);
            t.hasClass("hidden") || (t.addClass("hidden"), this.saveState(), flashBackground(this.$currentButton), window.$lastClickedOptionsBoxButton = null, window.optionsBox = void 0, a()(window).scrollTop(this.scrollPos))
        }
        showBox(t) {
            var r = jQuery(a()(t.target).closest(this.obv.optionsBoxButtonSelector)).attr('data-settings');
            r = JSON.parse(r);
            // Options box translation
            if (!r.translation) {
                jQuery('#options-box-translation').hide();
                setTimeout(function(){
                    jQuery('#options-box-translation input[id*="active_translation"]').prop('checked', false);
                }, 100);
            } else {
                jQuery('#options-box-translation').show();
            }

            let tab = a()(t.target).closest(".tab").attr('id');
            let u   = jQuery('#'+tab).find('input[name^="_test_url"]').first().val();
            a()(this.obv.optionsBoxMainContainerSelector).attr('data-url', u);
        	let ajax = a()(t.target).closest(".input-group").find('input[name*="[ajax]"]').val();
            this.scrollPos = a()(window).scrollTop(), window.optionsBox = this, this.setTitle(this.getTargetOptionLabel(t)), this.setTargetInputDetails(this.getTargetInputContainer(t)), this.$currentButton = a()(t.target).closest(this.obv.optionsBoxButtonSelector), E.getInstance().prepare(this.$currentButton.data("settings")), this.config = E.getInstance(), this.prepareTheBoxAccordingToType(), this.restoreState(), window.$lastClickedOptionsBoxButton = this.$currentButton, this.triggerTabActivatedEventForCurrentTab(), a()(this.obv.optionsBoxMainContainerSelector).removeClass("hidden");
            if (ajax ){
            	a()(this.obv.optionsBoxMainContainerSelector).attr('ajax', true);
            }
            else {
            	a()(this.obv.optionsBoxMainContainerSelector).removeAttr('ajax');
            } 
        }
        prepareTheBoxAccordingToType() {
            if (this.config.type === this.prevBoxType) return;
            this.prevBoxType = this.config.type, this.tabHandlers = this.boxTypeTabNames.get(this.config.type).map(t => y.getInstance(t)), a()(this.obv.tabContainerSelector + " .nav-tab").addClass("hidden"), a()(this.obv.tabContentsSelector).addClass("hidden"), this.tabHandlers.length && a()("#" + this.tabHandlers[0].tabId).removeClass("hidden");
            let t = [];
            for (let e of this.tabHandlers) t.push(e.tabId);
            if (t.length) {
                let e = t.map(t => this.obv.tabContainerSelector + ' [data-tab="#' + t + '"]').join(", ");
                a()(e).removeClass("hidden"), this.activateTab("#" + t[0])
            }
        }
        initAllTabHandlers() {
            let t, e, s, n = [];
            this.boxTypeTabNames.forEach((t, e) => {
                t.map(t => {
                    n.indexOf(t) > -1 || n.push(t)
                })
            }), this.allTabHandlers = n.map(t => y.getInstance(t));
            let i = this.getBoxContainer(),
                a = [];
            for (let n = 0; n < this.allTabHandlers.length; n++) e = (t = this.allTabHandlers[n]).tabId, s = i.find('[data-tab="#' + e + '"]').text(), a.push(s);
            this.allTabHandlerNames = a
        }
        getTargetOptionLabel(t) {
            return a()(t.target).closest("tr").find("td:first-child label").text()
        }
        getTargetInputContainer(t) {
            return a()(t.target).closest(".input-group").find(".input-container").first()
        }
        setTitle(t) {
            a()(this.obv.titleSelector).text(t)
        }
        setTargetInputDetails(t) {
            let e, s, n, i = [];
            t.find(':input:not([type="hidden"])').each((t, r) => {
                switch (e = a()(r), s = e.attr("type")) {
                    case "checkbox":
                        n = '<span class="dashicons dashicons-' + (e[0].checked ? "yes" : "no") + '"></span>';
                        break;
                    default:
                        n = e.val() || null
                }
                null !== n && n.length && i.push(n)
            });
            let r = i.reduce((t, e) => t + '<div class="val"><span>' + (e.length > 72 ? e.substring(0, 69) + "..." : e) + "</span></div>", "");
            a()(this.obv.inputDetailsSelector).html(r)
        }
        restoreState() {
            this.$latestTestButtonClickEvent = null, this.contentRetrievalInProgress = !1, this.fillTestDataPresenter(this.getMainTestButtonResults()), this.getBoxContainer().find(".test-results > .hide-test-results:first-child").click();
            let t = this.getOptionsBoxInput().val() || null;
            null !== t && t.length || (t = "{}");
            let e = {};
            try {
                e = JSON.parse(t), this.restoreTabStates(e)
            } catch (e) {
                console.error("State could not be parsed.", t)
            }
        }
        restoreTabStates(t) {
            let e;
            for (let s = 0; s < this.tabHandlers.length; s++)(e = this.tabHandlers[s]).restoreState(t[e.stateKey] || {}, this.config.getTabSettings(e.stateKey) || {})
        }
        saveState() {
            let t, e = {};
            for (let s = 0; s < this.tabHandlers.length; s++) e[(t = this.tabHandlers[s]).stateKey] = t.saveState() || {};
            return e.box = {
                type: this.config.type
            }, this.setCurrentOptionsBoxButtonSummary(e), this.getOptionsBoxInput().val(JSON.stringify(e)), e
        }
        activateTab(t) {
            this.deactivateAllTabs(), this.getBoxContainer().find(t).removeClass("hidden"), this.getTabContainer().find('[data-tab="' + t + '"]').addClass("nav-tab-active"), this.currentActiveTabId = t.replace("#", ""), this.triggerTabActivatedEventForCurrentTab()
        }
        deactivateAllTabs() {
            this.getBoxContainer().find(".tab").addClass("hidden"), this.getTabContainer().find("a").removeClass("nav-tab-active")
        }
        onClickTab(t) {
            t.preventDefault(), this.activateTab(a()(t.target).closest(".nav-tab").data("tab"))
        }
        getTabContainer() {
            return a()(this.obv.tabContainerSelector)
        }
        getBoxContainer() {
            return a()(this.obv.optionsBoxMainContainerSelector)
        }
        getOptionsBoxInput() {
            return this.$currentButton.find("input[type=hidden]").first()
        }
        onClickTestButton(t) {
            t.preventDefault(), this.$latestTestButtonClickEvent = t;
            let e = a()(t.target).closest("button");
            e.addClass("loading"), null !== this.getDataToBeTested() ? (this.saveState(), e.removeClass("loading")) : t.stopPropagation()
        }
        getDataToBeTested() {
            let t = this.getMainTestButton(),
                e = this.getMainTestButtonResults();
            if (null !== e && void 0 !== e && "undefined" !== e) return e;
            let s = this.testDataPreparer.prepareTestData(t);
            if (null === s) return o.a.getInstance().notifyRegular(a()(this.$latestTestButtonClickEvent.target), window.kdn.test_data_not_retrieved), console.error("Test data could not be retrieved."), !1;
            if (this.contentRetrievalInProgress) return null;
            this.contentRetrievalInProgress = !0;
            let n = this.getDataPresenterHeader();
            return n.addClass("loading"), a.a.post(window.ajaxurl, {
                kdn_nonce: this.obv.$kdnNonce.val(),
                action: window.pageActionKey,
                data: s
            }).done(e => {
                if (void 0 === e || !e || void 0 === e.view) return o.a.getInstance().notifyRegular(a()(this.$latestTestButtonClickEvent.target), window.kdn.content_retrieval_response_not_valid, l.a.ERROR), void console.error("Response of content retrieval process is not valid.");
                let s = a()("<div>" + e.view + "</div>").find("ul").data("results");
                t.data("results", s), this.fillTestDataPresenter(s), a()(this.$latestTestButtonClickEvent.target).click()
            }).fail(t => {
                o.a.getInstance().notifyRegular(a()(this.$latestTestButtonClickEvent.target), window.kdn.test_data_retrieval_failed, l.a.ERROR), console.error(t)
            }).always(() => {
                this.contentRetrievalInProgress = !1, n.removeClass("loading")
            }), null
        }
        getMainTestButton() {
            return this.$currentButton.closest(".input-group").find(".kdn-test")
        }
        getMainTestButtonResults() {
            return this.getMainTestButton().data("results")
        }
        fillTestDataPresenter(t) {
            let e = this.getTestDataPresenterContainer();
            e.data("results", t);
            let s = e.find(".data").first();
            s.empty();
            let n = e.find(".number").first(),
                i = e.find(".invalidate").first();
            if (void 0 === t || null === t || !t.length) return n.text(0), void i.addClass("hidden");
            let r = a()("<ul />");
            for (let e = 0; e < t.length; e++) a()("<li><code>" + I.a.escapeHtml(t[e]) + "</code></li>").appendTo(r);
            r.appendTo(s), n.text(t.length), i.removeClass("hidden")
        }
        getTestDataPresenterContainer() {
            return a()(this.obv.selectorTestDataPresenterContainer).first()
        }
        onClickInvalidateTestData(t) {
            t.stopPropagation(), this.fillTestDataPresenter([]), this.getMainTestButton().data("results", null)
        }
        getDataPresenterHeader() {
            return a()(this.obv.selectorTestDataPresenterHeader).first()
        }
        onClickTestDataPresenterHeader(t) {
            let e = a()(this.obv.selectorTestDataContainer).first();
            e.hasClass("hidden") ? e.removeClass("hidden") : e.addClass("hidden")
        }
        setCurrentOptionsBoxButtonSummary(t) {
            let e = this.getOptionsBoxButtonSummaryFromState(t);
            this.setOptionsBoxButtonSummary(this.$currentButton, e)
        }
        getOptionsBoxButtonSummaryFromState(t) {
            let e, s, n, i, r, o;
            if (a.a.isEmptyObject(t)) return null;
            let l = "",
                c = [];
            for (r = 0; r < this.allTabHandlers.length; r++) e = this.allTabHandlers[r], n = this.allTabHandlerNames[r], s = e.stateKey, t.hasOwnProperty(s) && (o = t[s], (i = e.getConfiguredOptionCount(o)) > 0 && (l += '<li><span class="name">' + n + '</span>: <span class="value">' + i + "</span></li>", c.push(e.color)));
            return l.length ? {
                title: l = "<ul class='options-box-summary'>" + l + "</ul>",
                colors: c
            } : null
        }
        setOptionsBoxButtonSummary(t, e) {
            if (null === (e = e || null)) t.removeClass("has-config"), "function" == typeof a.a.fn.tooltip && t.tooltip("destroy");
            else {
                t.addClass("has-config"), t.data("toggle", "tooltip"), t.data("html", "true"), t.attr("title", e.title), "function" == typeof a.a.fn.tooltip && t.tooltip("fixTitle");
                let s = e.colors;
                1 === s.length && s.push(s[0]);
                let n = s.join(", ");
                t.find(".summary-colors").css("background-image", "linear-gradient(to right, " + n + ")")
            }
        }
        initAllOptionsBoxButtonTooltips() {
            a()(this.obv.optionsBoxButtonSelector).each((t, e) => {
                let s = a()(e),
                    n = s.find("input[type=hidden]").first().val() || null;
                if (null !== n && n.length) try {
                    let t = JSON.parse(n),
                        e = this.getOptionsBoxButtonSummaryFromState(t);
                    this.setOptionsBoxButtonSummary(s, e)
                } catch (t) {
                    console.error("State could not be parsed.", n, s), o.a.getInstance().notifyRegular(s, window.kdn.state_not_parsed, l.a.ERROR)
                }
            })
        }
        triggerTabActivatedEventForCurrentTab() {
            null !== this.currentActiveTabId && a()(document).trigger(f.a.optionsBoxTabActivated, this.currentActiveTabId)
        }
    }
    B.instance = null
}, , function(t, e, s) {
    "use strict";
    s.r(e),
        function(t) {
            var e = s(30);
            t(function(t) {
                e.a.getInstance()
            })
        }.call(this, s(1))
}]);