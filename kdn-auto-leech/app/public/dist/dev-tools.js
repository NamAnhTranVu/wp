! function(t) {
    var e = {};

    function o(s) {
        if (e[s]) return e[s].exports;
        var r = e[s] = {
            i: s,
            l: !1,
            exports: {}
        };
        return t[s].call(r.exports, r, r.exports, o), r.l = !0, r.exports
    }
    o.m = t, o.c = e, o.d = function(t, e, s) {
        o.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: s
        })
    }, o.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, o.t = function(t, e) {
        if (1 & e && (t = o(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var s = Object.create(null);
        if (o.r(s), Object.defineProperty(s, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var r in t) o.d(s, r, function(e) {
                return t[e]
            }.bind(null, r));
        return s
    }, o.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return o.d(e, "a", e), e
    }, o.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, o.p = "", o(o.s = 0)
}([function(t, e, o) {
    "use strict";
    o.r(e),
        function(t) {
            o.d(e, "dtv", function() {
                return d
            }), o.d(e, "devTools", function() {
                return h
            }), o.d(e, "iframeHandler", function() {
                return u
            }), o.d(e, "addressBar", function() {
                return p
            }), o.d(e, "cssSelectorToolbar", function() {
                return g
            }), o.d(e, "optionsToolbar", function() {
                return v
            }), o.d(e, "sidebarHandler", function() {
                return f
            });
            var s = o(18),
                r = o(19),
                l = o(20),
                i = o(21),
                n = o(22),
                a = o(23),
                c = o(24);
            let d, h, u, p, g, v, f;
            t(function(t) {
                d = new s.a, h = new i.a, u = new n.a, p = new r.a, g = new l.a, v = new a.a, f = new c.a, t(document).on("click", d.devToolsButtonSelector, function(e) {
                    e.preventDefault();
                    let o = t(e.target),
                        s = o.data("kdn"),
                        r = null,
                        l = t(d.devToolsContentContainerSelector);
                    d.postId = l.data("kdn").postId, d.$currentDevToolsButton = o, void 0 != s.urlSelector && (r = s.urlSelector);
                    let i = t(r).val();
                    h.showLightboxWithContent(null, i)
                }), t(document).on("click", d.lightboxTitleSelector, t => h.closeLightbox()), t(document).on("click", d.backButtonSelector, t => p.onClickBack(t)), t(document).on("click", d.forwardButtonSelector, t => p.onClickForward(t)), t(document).on("click", d.refreshButtonSelector, t => p.onClickRefresh(t)), t(document).on("click", d.goButtonSelector, t => p.onClickGo(t)), t(document).on("click", d.cssTestSelector, t => g.onClickTest(t)), t(document).on("click", d.cssUseButtonSelector, t => g.onClickUseCssSelector()), t(document).on("click", d.cssClearHighlightsSelector, t => g.onClearHighlights(t)), t(document).on("click", d.cssRemoveElementsSelector, t => g.onRemoveElements(t)), t(document).on("click", d.cssShowAlternativesSelector, t => g.onShowAlternatives(t, void 0)), t(document).on("click", d.sidebarCloseSelector, t => f.onCloseSidebar(t)), t(document).on("click", d.lightboxContainerSelector + " " + d.sidebarOpenSelector, t => f.onOpenSidebar(t)), t(document).on("click", d.sidebarSectionToggleExpandSelector, t => f.onToggleExpand(t)), t(document).on("click", d.btnClearHistorySelector, t => p.onClickClearHistory(t)), t(document).on("click", d.sidebarSectionTitleSelector, function() {
                    t(this).closest("." + d.sidebarSectionClass).find("." + d.toggleExpandClass).first().click()
                }), t(document).on("click", d.sidebarSelector + " ." + d.classUrl, t => f.onClickHistoryUrl(t)), t(document).on("click", d.sidebarSelector + " ." + d.classCssSelector, t => f.onClickCssSelector(t)), t(document).on("hover", d.sidebarSelector + " ." + d.classCssSelector, t => f.onHoverCssSelector(t)), t(document).on("click", d.optHoverSelectSelector, t => v.onClickToggleHoverSelect(t)), t(document).on("change", d.optApplyManipulationOptionsSelector, t => p.onClickRefresh(t)), t(document).on("change", d.optRemoveScriptsSelector, t => p.onClickRefresh(t)), t(document).on("change", d.optRemoveStylesSelector, t => p.onClickRefresh(t)), t(document).on("keyup change", d.cssInputSelector, e => {
                    let o = t(e.target).val();
                    void 0 != o && o.length ? (u.clearHighlights(), u.highlight(o, void 0)) : u.clearHighlights()
                }), t(document).on("keyup change", d.optTargetHTMLTagSelector, t => v.onChangeTargetHTMLTagInput(t)), t(document).on("keydown", d.devToolsContentSelector, e => {
                    if (t(e.target).is(":input")) {
                        let o = t(e.target);
                        13 == e.which && (o.attr("id") == d.cssInputId && t(d.cssTestSelector).click(), o.attr("id") == d.urlInputId && t(d.goButtonSelector).click())
                    } else f.handleKeyPress(e)
                }), t(window).resize(() => {
                    u.setIframeHeight()
                })
            })
        }.call(this, o(1))
}, function(t, e) {
    t.exports = jQuery
}, function(t, e, o) {
    "use strict";
    var s;
    o.d(e, "a", function() {
            return s
        }),
        function(t) {
            t.WARN = "warn", t.INFO = "info", t.ERROR = "error", t.SUCCESS = "success"
        }(s || (s = {}))
}, function(t, e, o) {
    "use strict";
    (function(t) {
        o.d(e, "a", function() {
            return s
        });
        class s {
            static startsWith(t, e) {
                return 0 === t.lastIndexOf(e, 0)
            }
            static escapeHtml(t) {
                return void 0 === t || "undefined" === t || null === t ? "" : t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
            }
            static flashTooltip(t, e) {
                let o = t.attr("data-original-title");
                t.attr("data-original-title", e).tooltip("fixTitle").tooltip("show").attr("data-original-title", o).tooltip("fixTitle")
            }
            static initTooltipForSelector(e) {
                "function" == typeof t.fn.tooltip && t(e + '[data-toggle="tooltip"]').tooltip()
            }
            static getCheckboxValue(t) {
                return !(null === (t = t || null) || !t.length) && !!t[0].checked
            }
        }
    }).call(this, o(1))
}, function(t, e, o) {
    "use strict";
    (function(t) {
        o.d(e, "a", function() {
            return l
        });
        var s = o(2),
            r = o(5);
        class l {
            constructor() {}
            static getInstance() {
                return null === this.INSTANCE && (this.INSTANCE = new l), this.INSTANCE
            }
            notify(t, e) {
                if (!this.isNotifyAvailable()) return;
                void 0 != e && e.length || (e = window.kdn.required_for_test);
                let o = t.closest("tr").find("label").first(),
                    s = o.length ? o : t;
                this.scrollToElement(s), s.notify(e, {
                    position: "top"
                })
            }
            notifyRegular(t, e, o = s.a.INFO, l = r.a.TOP) {
                this.isNotifyAvailable() && t.notify(e, {
                    position: l || "top",
                    className: o || "info"
                })
            }
            scrollToElement(e) {
                t(document).find("html, body").stop().animate({
                    scrollTop: e.first().offset().top - t(window).height() / 4
                }, 500, "swing")
            }
            isNotifyAvailable(e = !0) {
                let o = !("function" != typeof t.fn.notify);
                return !o && e && console.error("NotifyJS is not defined."), o
            }
        }
        l.INSTANCE = null
    }).call(this, o(1))
}, function(t, e, o) {
    "use strict";
    var s;
    o.d(e, "a", function() {
            return s
        }),
        function(t) {
            t.TOP = "top", t.RIGHT = "right", t.BOTTOM = "bottom", t.LEFT = "left"
        }(s || (s = {}))
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
                let ajax = $testButton.closest(".input-group").find('input[name*="[ajax]"]').val();
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
                        o, s;
                    for (let r in t) t.hasOwnProperty(r) && (o = t[r], o.hasOwnProperty("selector") && o.hasOwnProperty("data") && (s = $(o.selector).data(o.data), null !== s && void 0 !== s && "undefined" !== s && (e[r] = s)));
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
                let o = $(this.psv.selectorTabMain).find('input[name="_cache_test_url_responses"]') || null;
                null !== o && o.length && (t.cacheTestUrlResponses = o[0].checked ? 1 : 0);
                let s = $("#_do_not_use_general_settings") || null,
                    r = !1;
                null !== s && (s.length && s[0].checked ? (t.customGeneralSettings = $(this.psv.selectorTabGeneralSettings).find(":input").serialize(), r = !0) : t.customGeneralSettings = void 0);
                let l = $("#_kdn_make_sure_encoding_utf8") || null;
                if (null !== l && l.length && r) {
                    t.useUtf8 = l.first()[0].checked ? 1 : 0;
                    let e = $("#_kdn_convert_charset_to_utf8") || null;
                    t.convertEncodingToUtf8 = _common_ts_Utils__WEBPACK_IMPORTED_MODULE_2__.a.getCheckboxValue(e) ? 1 : 0
                } else t.useUtf8 = -1, t.convertEncodingToUtf8 = -1;
                return t
            }
            addManipulationOptionsToAjaxData(t, ajax) {
                let e = $("div.tab:not(.hidden)");
                "templates" === e.attr("id").replace("tab-", "").toLowerCase() && (e = $(this.psv.selectorTabPost));
                let o, s, r, l, i = /[^\\[]+/,
                    n = {}, k = {};
                let ajaxHtmlManipulation = ["find_replace_raw__html", "find_replace_first__load", "find_replace_element__attributes", "exchange_element__attributes", "remove_element__attributes", "find_replace_element__html", "unnecessary_element__selectors"];
                for (let t = 0; t < (ajax ? ajaxHtmlManipulation : this.psv.baseHtmlManipulationInputNames).length; t++) o = (ajax ? ajaxHtmlManipulation : this.psv.baseHtmlManipulationInputNames)[t], (r = (s = e.find('input[name*="' + o + '"]').first()).closest(".inputs").find(":input")).length < 1 || (n[l = s.attr("name").match(i)[0]] = r.serialize());
                if (ajax) {
                    for (let t = 0; t < (this.psv.baseHtmlManipulationInputNames).length; t++) o = (this.psv.baseHtmlManipulationInputNames)[t], (r = (s = e.find('input[name*="' + o + '"]').first()).closest(".inputs").find(":input")).length < 1 || (k[l = s.attr("name").match(i)[0]] = r.serialize());
                    t.manipulation_options_original = k;
                    Object.keys(n).forEach(function(key) {
                        var newkey = key.replace(/__/ig, '_');
                        n[newkey] = n[key].replace(/__/ig, '_');
                        delete n[key];
                    });
                }
                return t.manipulation_options = n, t
            }
            addDataForFindReplaceInCustomMetaOrShortCodeTest(t, e) {
                if (!t.hasClass("kdn-test-find-replace-in-custom-meta") && !t.hasClass("kdn-test-find-replace-in-custom-short-code")) return e;
                let o = t.hasClass("kdn-test-find-replace-in-custom-meta"),
                    s = "." + (o ? "meta-key" : "short-code"),
                    r = "." + (o ? "selector-custom-post-meta" : "selector-custom-shortcode"),
                    l = t.closest(".input-group").find(".input-container").find(s);
                if (!l.length) return e;
                let i = l.val();
                if (void 0 == i || !i.length) return e;
                let n = !1;
                return $(".input-group" + r + " " + s).each(function() {
                    if (n) return;
                    let t = $(this);
                    if (t.val() == i) {
                        let o = t.closest(".input-group").find(".css-selector"),
                            s = t.closest(".input-group").find(".css-selector-attr"),
                            r = t.closest(".input-group").find('[name*="[options_box]"]'),
                            l = o.val(),
                            i = s.val(),
                            a = r.length ? r.val() : void 0;
                        void 0 != l && l.length && (e.valueSelector = l, void 0 != i && i.length && (e.valueSelectorAttr = i), void 0 !== a && (e.valueOptionsBoxData = a), n = !0)
                    }
                }), n || o && $(".input-group.custom-post-meta .meta-key").each(function() {
                    if (n) return;
                    let t = $(this);
                    if (t.val() == i) {
                        let o = t.closest(".input-group").find("input[type=text]:not(.meta-key)").val();
                        void 0 != o && o.length && (e.subject = o, n = !0)
                    }
                }), e
            }
            escapeRegExp(t) {
                return t.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
            }
        }
        TestDataPreparer.INSTANCE = null
    }).call(this, __webpack_require__(1))
}, function(t, e, o) {
    "use strict";
    (function(t) {
        o.d(e, "a", function() {
            return s
        });
        class s {
            constructor() {
                this.$containerMetaBox = t(".kdn-settings-meta-box"), this.$containerTabs = t(".kdn-settings-meta-box > .nav-tab-wrapper"), this.$form = t("#post"), this.$errorAlert = t("#kdn-alert"), this.$kdnNonce = t("#kdn_nonce"), this.$adminBar = t("#wpadminbar"), this.selectorCategoryMap = "#category-map", this.selectorTabMain = "#tab-main", this.selectorTabPost = "#tab-post", this.selectorTabCategory = "#tab-category", this.selectorTabGsPost = "#tab-gs-post", this.selectorTabGeneralSettings = "#tab-general-settings", this.selectorTestButton = ".kdn-test", this.selectorInputContainerPasswords = ".input-container-passwords", this.selectorLoadGeneralSettingsButton = "#btn-load-general-settings", this.selectorClearGeneralSettingsButton = "#btn-clear-general-settings", this.selectorInputImport = "#_post_import_settings", this.selectorLoadTranslationLanguages = ".load-languages", this.selectorInputURLHash = "input[name='url_hash']", this.inputNameCookies = "_cookies", this.baseHtmlManipulationInputNames = ["find_replace_raw_html", "find_replace_first_load", "find_replace_element_attributes", "exchange_element_attributes", "remove_element_attributes", "find_replace_element_html", "unnecessary_element_selectors"], this.selectorOriginalTestResults = ".original-results", this.selectorButtonSeeUnmodifiedTestResults = this.selectorOriginalTestResults + " .see-unmodified-results", this.selectorInvalidateCacheButton = ".invalidate-cache-for-this-url", this.selectorInvalidateAllCachesButton = ".invalidate-all-test-url-caches", this.selectorQuickSaveButton = ".quick-save-container .quick-save", this.selectorExportSettingsTextArea = "#_post_export_settings", this.clsHasError = "has-error", this.$inputAction = t("#hiddenaction"), this.infoTextsHidden = !0, this.classFixed = "kdn-fixed", this.selectorFixable = ".fixable", this.selectorCheckboxFixTabs = "#_fix_tabs", this.selectorCheckboxFixContentNavigation = "#_fix_content_navigation"
            }
            static getInstance() {
                return null === this.INSTANCE && (this.INSTANCE = new s), this.INSTANCE
            }
        }
        s.INSTANCE = null
    }).call(this, o(1))
}, , , , , , , , , , function(t, e, o) {
    "use strict";
    (function(t) {
        o.d(e, "a", function() {
            return s
        });
        class s {
            constructor() {
                this.postId = null, this.$inputDevToolsState = t("input[name=_dev_tools_state]").first(), this.$currentDevToolsButton = null, this.lightboxTitleSelector = ".lightbox-title", this.devToolsButtonSelector = ".kdn-dev-tools", this.devToolsContentContainerSelector = ".dev-tools-content-container", this.devToolsContentSelector = ".dev-tools-content", this.lightboxSelector = ".featherlight", this.lightboxContainerSelector = ".featherlight-content", this.toolbarSelector = this.lightboxContainerSelector + " " + this.devToolsContentSelector + " .toolbar", this.iframeSelector = this.lightboxContainerSelector + " " + this.devToolsContentSelector + " iframe.source", this.$kdnNonce = t("#kdn_nonce"), this.hoverClass = "kdn-element-hovered", this.hoverStyleSelector = "#iframe-style", this.urlCache = [], this.$lightboxInstance = null, this.addressBarSelector = this.toolbarSelector + " .address-bar", this.backButtonSelector = this.addressBarSelector + " .back", this.forwardButtonSelector = this.addressBarSelector + " .forward", this.refreshButtonSelector = this.addressBarSelector + " .refresh", this.goButtonSelector = this.addressBarSelector + " .go", this.urlInputSelector = this.addressBarSelector + " input", this.urlInputId = "_dt_toolbar_url", this.cssSelectorToolsContainerSelector = this.lightboxContainerSelector + " .css-selector-tools", this.cssInputSelector = this.lightboxContainerSelector + " .css-selector-input input", this.cssInputId = "_dt_toolbar_css_selector", this.cssTestSelector = this.lightboxContainerSelector + " .css-selector-test", this.cssClearHighlightsSelector = this.lightboxContainerSelector + " .css-selector-clear-highlights", this.cssRemoveElementsSelector = this.lightboxContainerSelector + " .css-selector-remove-elements", this.cssShowAlternativesSelector = this.lightboxContainerSelector + " .css-selector-show-alternatives", this.cssUseButtonSelector = this.lightboxContainerSelector + " .css-selector-use", this.toolbarTestResultsContainerSelector = this.lightboxContainerSelector + " .test-results", this.toolbarTestResultsContentContainerSelector = this.toolbarTestResultsContainerSelector + " .content", this.iframeStatusSelector = this.lightboxContainerSelector + " .iframe-status", this.sidebarSelector = this.lightboxContainerSelector + " .sidebar", this.sidebarCloseSelector = this.sidebarSelector + " .sidebar-close", this.sidebarOpenSelector = ".sidebar-open", this.sidebarOpenedClass = "opened", this.sidebarSectionClass = "sidebar-section", this.sidebarSectionContentClass = "section-content", this.sidebarSectionHistoryClass = "history", this.sidebarSectionUsedSelectorsClass = "used-selectors", this.sidebarSectionAlternativeSelectorsClass = "alternative-selectors", this.sidebarSectionSelector = this.sidebarSelector + " ." + this.sidebarSectionClass, this.sidebarSectionTitleContainerSelector = this.sidebarSectionSelector + " .section-title", this.sidebarSectionTitleSelector = this.sidebarSectionTitleContainerSelector + " > span", this.sidebarSectionContentSelector = this.sidebarSectionSelector + " ." + this.sidebarSectionContentClass, this.btnClearHistorySelector = this.lightboxSelector + " .clear-history", this.toggleExpandClass = "toggleExpand", this.sidebarSectionToggleExpandSelector = this.sidebarSelector + " ." + this.toggleExpandClass, this.sidebarSectionExpandedClass = "expanded", this.settingsMetaBoxSelector = ".kdn-settings-meta-box", this.classCssSelector = "selector", this.classUrl = "url", this.classOptionsToolbar = "options", this.optionsToolbarSelector = this.lightboxSelector + " ." + this.classOptionsToolbar, this.optHoverSelectSelector = this.optionsToolbarSelector + " .toggle-hover-select", this.optTargetHTMLTagClass = "target-html-tag", this.optTargetHTMLTagSelector = this.optionsToolbarSelector + " ." + this.optTargetHTMLTagClass, this.optUseTestButtonBehaviorSelector = this.optionsToolbarSelector + " .test-button-behavior", this.optApplyManipulationOptionsSelector = this.optionsToolbarSelector + " .apply-manipulation-options", this.optUseImmediatelySelector = this.optionsToolbarSelector + " .use-immediately", this.optRemoveScriptsSelector = this.optionsToolbarSelector + " .remove-scripts", this.optRemoveStylesSelector = this.optionsToolbarSelector + " .remove-styles", this.$lastHighlighted = null, this.multipleSpaceRegex = new RegExp("\\s{2,}", "g"), this.regexClassNameStartingWithDash = new RegExp("\\.(-[^\\s.#\\[]+)", "g"), this.bracketClassNameRegex = new RegExp('\\[class="([^"]+)"\\]', "g"), this.lastUnfinishedSourceCodeXHR = null, this.isAborted = !1
            }
        }
    }).call(this, o(1))
}, function(t, e, o) {
    "use strict";
    (function(t) {
        o.d(e, "a", function() {
            return r
        });
        var s = o(0);
        class r {
            constructor() {
                this.history = [], this.currentHistoryIndex = null
            }
            onClickBack(t) {
                this.handleBackAndForward(!0)
            }
            onClickForward(t) {
                this.handleBackAndForward(!1)
            }
            handleBackAndForward(e) {
                let o = e ? -1 : 1;
                if (!this.history.length) return;
                let r = null;
                if (null !== this.currentHistoryIndex) {
                    if (void 0 === this.history[this.currentHistoryIndex + o]) return void this.disableButton(t(e ? s.dtv.backButtonSelector : s.dtv.forwardButtonSelector));
                    r = this.history[this.currentHistoryIndex + o], this.currentHistoryIndex += o
                } else this.history.length > 1 && e && (r = this.history[this.history.length + 2 * o], this.currentHistoryIndex = this.history.length + 2 * o);
                r && (this.enableButton(t(e ? s.dtv.forwardButtonSelector : s.dtv.backButtonSelector)), s.iframeHandler.loadUrl(r), void 0 == this.history[this.currentHistoryIndex + o] && this.disableButton(t(e ? s.dtv.backButtonSelector : s.dtv.forwardButtonSelector)))
            }
            onClickRefresh(t) {
                this.refresh()
            }
            refresh() {
                if (!this.history.length) return;
                let e = s.iframeHandler.getCurrentUrl();
                t(s.dtv.urlInputSelector).val(e), s.devTools.invalidateUrlCache(e), s.iframeHandler.loadUrl(e)
            }
            onClickGo(e) {
                let o = t(s.dtv.urlInputSelector).val();
                void 0 != o && o.length && (null !== this.currentHistoryIndex && this.currentHistoryIndex > 0 && (this.history = this.history.splice(0, this.currentHistoryIndex - 1)), this.go(o))
            }
            go(t) {
                if (void 0 != t && t.length) {
                    if (console.log("Go: " + t), 0 == t.indexOf("/")) {
                        let e = s.iframeHandler.getIframeContents().find("base");
                        if (!e.length || void 0 == e.attr("href") || !e.attr("href").length) return;
                        t = e.attr("href") + t
                    }
                    0 === t.indexOf("http") && (this.history.length && this.history[this.history.length - 1] == t || this.history.push(t), s.iframeHandler.loadUrl(t), this.historyUpdated())
                }
            }
            travelInTime(e) {
                void 0 == e || e < 0 || void 0 == this.history[e] || (e = parseInt(e), s.iframeHandler.loadUrl(this.history[e]), void 0 !== this.history[e - 1] ? this.enableButton(t(s.dtv.backButtonSelector)) : this.disableButton(t(s.dtv.backButtonSelector)), void 0 !== this.history[e + 1] ? this.enableButton(t(s.dtv.forwardButtonSelector)) : this.disableButton(t(s.dtv.forwardButtonSelector)), this.currentHistoryIndex = e, this.historyUpdated())
            }
            onClickClearHistory(t) {
                this.clearHistory()
            }
            clearHistory() {
                this.history = [], this.currentHistoryIndex = null, this.disableButton(t(s.dtv.backButtonSelector)), this.disableButton(t(s.dtv.forwardButtonSelector)), this.disableButton(t(s.dtv.refreshButtonSelector)), this.historyUpdated()
            }
            historyUpdated() {
                let t = "",
                    e = null == this.currentHistoryIndex ? this.history.length - 1 : this.currentHistoryIndex;
                for (let o in this.history) this.history.hasOwnProperty(o) && (t += "<li" + (o == e ? ' class="active" ' : "") + '><span class="url">' + this.history[o] + "</span></li>");
                s.sidebarHandler.updateSectionContent("<ul>" + t + "</ul>", s.dtv.sidebarSectionHistoryClass), s.devTools.saveState()
            }
            setAddressBarUrl(e) {
                t(s.dtv.urlInputSelector).val(e)
            }
            disableButton(t) {
                t.addClass("disabled")
            }
            enableButton(t) {
                t.removeClass("disabled")
            }
        }
    }).call(this, o(1))
}, function(t, e, o) {
    "use strict";
    (function(t) {
        o.d(e, "a", function() {
            return l
        });
        var s = o(0),
            r = o(7);
        class l {
            constructor() {
                this.testDataPreparer = r.a.getInstance()
            }
            updateInput(t) {
                let e = this.getCssSelectorInput();
                e.val(t), s.devTools.flashBackground(e)
            }
            onClickTest(e) {
                let ajax = t(s.dtv.lightboxSelector).attr('ajax');
                let o = t(e.target),
                    r = this.getCssSelectorInput().val();
                if (void 0 == r || !r.length) return;
                let l = t(s.dtv.optUseTestButtonBehaviorSelector).first().val(),
                    i = "php" != l;
                if ("js" != l) {
                    let e = o.data("kdn"),
                        l = s.iframeHandler.getIframeContents();
                    s.iframeHandler.clearHighlights(), e.content = l.find("html").html(), e.selector = r, e.url = s.iframeHandler.getCurrentUrl(), e.formItemName = s.dtv.cssInputId, e.serializedValues = t("<input/>").attr("name", s.dtv.cssInputId + "[0][selector]").val(r).serialize(), e = this.testDataPreparer.addSettingsToAjaxData(e, ajax);
                    let i = t(s.dtv.toolbarTestResultsContainerSelector).first(),
                        n = t(s.dtv.toolbarTestResultsContentContainerSelector).first();
                    i.removeClass("hidden").addClass("loading"), n.html(""), t.post(window.ajaxurl, {
                        kdn_nonce: s.dtv.$kdnNonce.val(),
                        action: window.pageActionKey,
                        data: e
                    }).done(t => {
                        n.html(t.view)
                    }).fail(t => {
                        n.html(window.kdn.an_error_occurred + " <br />" + t.responseText), console.log(t)
                    }).always(() => {
                        i.removeClass("loading"), s.iframeHandler.setIframeHeight()
                    })
                }
                i && (s.iframeHandler.clearHighlights(), s.iframeHandler.highlight(r, !0))
            }
            onClearHighlights(t) {
                s.iframeHandler.clearHighlights()
            }
            onRemoveElements(t) {
                let e = this.getCssSelectorInput().val();
                void 0 != e && e.length && s.iframeHandler.getIframeContents().find(e).remove()
            }
            onShowAlternatives(e, o) {
                let r = this.getCssSelectorInput().val();
                if (void 0 == r || !r.length) return;
                let l = t(s.dtv.sidebarSelector + " ." + s.dtv.sidebarSectionAlternativeSelectorsClass);
                if (l.data("currentselector") != r) {
                    let t = s.devTools.getAlternativeSelectors(r);
                    s.sidebarHandler.updateAlternativeSelectors(t), l.data("currentselector", r)
                }(void 0 == o || o) && s.sidebarHandler.onOpenSidebar(e)
            }
            getCssSelectorInput() {
                return t(s.dtv.cssInputSelector)
            }
            onClickUseCssSelector() {
                this.useSelector()
            }
            useSelector() {
                if (void 0 == s.dtv.$currentDevToolsButton || null == s.dtv.$currentDevToolsButton) return;
                let t = this.getCssSelectorInput().val();
                if (void 0 == t || !t.length) return;
                let e = s.dtv.$currentDevToolsButton.closest(".input-group").find("input.css-selector");
                e.val(t), s.devTools.closeLightbox(), s.devTools.flashBackground(e)
            }
        }
    }).call(this, o(1))
}, function(t, e, o) {
    "use strict";
    o.d(e, "a", function() {
        return n
    });
    var s = o(0),
        r = o(7),
        l = o(1),
        i = o.n(l);
    class n {
        constructor() {
            this.saveTimeout = null, this.scrollPos = null, this.testDataPreparer = r.a.getInstance()
        }
        showLightboxWithContent(t, e) {
            let ajax = s.dtv.$currentDevToolsButton.closest(".input-group").find('input[name*="[ajax]"]').val();
            let o = i()(s.dtv.devToolsContentSelector);
            i.a.featherlight(o, {
                afterOpen: () => {
                    this.onLightBoxAfterOpen(t, e, ajax)
                },
                beforeClose: () => (this.onLightBoxBeforeClose(), !1),
                beforeOpen: () => {
                    if (s.dtv.$lightboxInstance) return s.dtv.$lightboxInstance.css("display", "block"), this.onLightBoxAfterOpen(null, null, ajax), !1
                }
            })
        }
        onLightBoxBeforeClose() {
            jQuery(s.dtv.lightboxSelector).removeAttr('ajax');
            s.dtv.$lightboxInstance || (s.dtv.$lightboxInstance = i()(s.dtv.lightboxSelector), s.dtv.$lightboxInstance.addClass("instance")), s.dtv.$lightboxInstance.css("display", "none"), i()("textarea, input, button, select").attr("tabindex", 0), i()(window).scrollTop(this.scrollPos)
        }
        onLightBoxAfterOpen(t, e, ajax) {
            if (ajax) {
                jQuery(s.dtv.lightboxSelector).attr('ajax', true);
            }
        	let ajaxUrl = ajax ? jQuery(s.dtv.$currentDevToolsButton.data("kdn").urlAjaxSelector).val() : '';
            this.scrollPos = i()(window).scrollTop(), s.dtv.$lightboxInstance || this.restoreState();
            let o = i()(s.dtv.lightboxSelector),
                r = o.find(s.dtv.devToolsContentSelector + " > " + s.dtv.lightboxTitleSelector);
            r.length && !o.find("> " + s.dtv.lightboxTitleSelector).length && o.append(r), this.updateTitle(s.dtv.$currentDevToolsButton.closest("tr").find("label").first().html());
            let l = s.dtv.$currentDevToolsButton.closest(".input-group").find("input.css-selector").first(),
                n = "";
            l.length && void 0 != l.val() && (n = l.val()), i()(s.dtv.cssInputSelector).first().val(n).trigger("change");
            let a = i()(s.dtv.urlInputSelector).val();
            null != t || void 0 != a && a.length ? null != t ? s.iframeHandler.setIframeContent(t, e) : s.iframeHandler.initCssSelectors() : (s.addressBar.setAddressBarUrl(e), s.addressBar.go(ajaxUrl ? ajaxUrl : e)), s.sidebarHandler.loadSidebar();
            let c = s.dtv.$currentDevToolsButton.data("kdn");
            void 0 != c && i()(s.dtv.optTargetHTMLTagSelector).first().val(void 0 != c.targetTag ? c.targetTag : "").trigger("change"), s.dtv.$lightboxInstance || (i()(s.dtv.toolbarSelector).resize(s.iframeHandler.setIframeHeight), i()(s.dtv.optionsToolbarSelector).find(":input").on("change", t => {
                i()(t.target).hasClass(s.dtv.optTargetHTMLTagClass) || this.saveState()
            }))
        }
        getSourceCode(t, e, o, r, l) {
            var ajax = jQuery(s.dtv.lightboxSelector).attr('ajax');

            // Whether to custom HEADERs checked or not
            let customHeadersActive = jQuery('#tab-main').find('#_custom_headers').prop('checked');

            // Check ajax is activated or not
            var ajaxActive = jQuery('#' + s.dtv.$currentDevToolsButton.closest(".tab").attr("id")).find('input[name$="_post_ajax"]').prop('checked');
            if (ajaxActive) e.ajaxActive = 1;

            /**
             * CUSTOM HEADERS
             */

            // Prepare the "customHeaders" data
            if (customHeadersActive == true) {
                var customHeaders = jQuery('#' + s.dtv.$currentDevToolsButton.closest(".tab").attr("id")).find('tr[id*="post-custom-headers"]').find(".input-group").find("input[name]");
                // If we are test in tab category
                if (s.dtv.$currentDevToolsButton.closest(".tab").attr("id") == 'tab-category') {
                    var customHeaders = jQuery('#' + s.dtv.$currentDevToolsButton.closest(".tab").attr("id")).find('tr[id*="category-custom-headers"]').find(".input-group").find("input[name]");
                }
            }

            // Add "customHeaders" into the data
            if (customHeaders) e.customHeaders = customHeaders.serialize();

            /**
             * CUSTOM METHOD
             */

            var customMethod            = 'GET';
            var parseArray              = '';
            var customMethodOriginal    = 'GET';

            var processed               = jQuery(s.dtv.addressBarSelector).find('#_dt_toolbar_url').attr('processed');

            if (processed) {

                if (ajax && ajaxActive) {
                    e.inAjax = 1;
                } else {
                    e.inAjax = 0;
                }

                e.inDevTool = 1;
                customMethod            = jQuery(s.dtv.toolbarSelector).find('.dev-tool-method').val();
                parseArray              = jQuery(s.dtv.toolbarSelector).find('.dev-tool-parse').val();
                customMethodOriginal    = jQuery('#' + s.dtv.$currentDevToolsButton.closest(".tab").attr("id")).find('tr[id*="custom-method"]').find(".input-group").find(":input[name]");
                customMethodOriginal    = customMethodOriginal.serialize();

            } else {

                // Prepare the "customMethod" data
                if (ajax && ajaxActive) {
                    e.inAjax = 1;
                    customMethod            = jQuery('#' + s.dtv.$currentDevToolsButton.closest(".tab").attr("id")).find('input[name*="_ajax_method"]').val();
                    parseArray              = jQuery('#' + s.dtv.$currentDevToolsButton.closest(".tab").attr("id")).find('input[name*="_ajax_parse"]').val();
                    customMethodOriginal    = jQuery('#' + s.dtv.$currentDevToolsButton.closest(".tab").attr("id")).find('tr[id*="custom-method"]').find(".input-group").find(":input[name]");
                    customMethodOriginal    = customMethodOriginal.serialize();
                } else {
                    e.inAjax = 0;
                    customMethod            = jQuery('#' + s.dtv.$currentDevToolsButton.closest(".tab").attr("id")).find('tr[id*="custom-method"]').find(".input-group").find(":input[name]");
                    customMethod            = customMethod.serialize();
                }

            }

            // Add custom method and custom method original into the data
            e.customMethod              = customMethod;
            e.parseArray                = parseArray;
            e.customMethodOriginal      = customMethodOriginal;

            /**
             * CUSTOM AJAX HEADERS
             */

            // Prepare the "customAjaxHeaders" data
            if (customHeadersActive == true) {
                if (ajax && ajaxActive) {
                    var customAjaxHeaders = jQuery('#' + s.dtv.$currentDevToolsButton.closest(".tab").attr("id")).find('tr[id*="ajax-headers-selectors"]').find(".input-group").find(":input[name]");
                    var ajaxHeaders = jQuery('#' + s.dtv.$currentDevToolsButton.closest(".tab").attr("id")).find('tr[id*="ajax-custom-headers"]').find(".input-group").find("input[name]");
                }
            }

            // Add custom ajax headers into the data
            if (customAjaxHeaders || ajaxHeaders) {
                e.customAjaxHeaders = customAjaxHeaders.serialize() + (ajaxHeaders && customAjaxHeaders ? '&' : '') + ajaxHeaders.serialize();
            }

            /*
             *
             */
             
            // Add url original into data
            var url_original = jQuery('#' + s.dtv.$currentDevToolsButton.closest(".tab").attr("id")).find('input[id*="_test_url"]').val();
            if (url_original) e.urlOriginal = url_original;

            /*
             *
             */

            if (s.dtv.urlCache.hasOwnProperty(t) && null !== s.dtv.urlCache[t]) return o(s.dtv.urlCache[t]), void l();
            s.dtv.lastUnfinishedSourceCodeXHR && (s.dtv.isAborted = !0, s.dtv.lastUnfinishedSourceCodeXHR.abort()), e.url = t, e.removeScripts = s.optionsToolbar.isRemoveScripts() ? 1 : 0, e.removeStyles = s.optionsToolbar.isRemoveStyles() ? 1 : 0, e.applyManipulationOptions = s.optionsToolbar.isApplyManipulationOptions() ? 1 : 0, e.cookies = i()("input[name^=_cookies]").serialize(), e = this.testDataPreparer.addSettingsToAjaxData(e, ajax), s.dtv.lastUnfinishedSourceCodeXHR = i.a.post(window.ajaxurl, {
                kdn_nonce: s.dtv.$kdnNonce.val(),
                action: window.pageActionKey,
                data: e
            }).done(function(e) {
                
                jQuery(s.dtv.addressBarSelector).find('#_dt_toolbar_url').attr('processed', true);
                let returnMethod    = e['html'].split('<!--Method:')[1].split('-->')[0];
                var returnParse     = e['html'].split('<!--Parse:')[1].split('-->')[0];
                jQuery(s.dtv.toolbarSelector).find('.dev-tool-method').val(returnMethod);
                jQuery(s.dtv.toolbarSelector).find('.dev-tool-parse').val(returnParse);

                s.dtv.isAborted ? s.dtv.isAborted = !1 : (s.dtv.urlCache[t] = e, o(e))
            }).fail(r).always(function() {
                s.dtv.lastUnfinishedSourceCodeXHR = null, l()
            })
        }
        getAlternativeSelectors(t) {
            if (void 0 == t || !t || !t.length) return;
            let e, o, r = (t = t.replace(s.dtv.multipleSpaceRegex, " ")).split(" "),
                l = s.iframeHandler.getIframeContents(),
                n = l.find(t),
                a = ["body", "html"],
                c = [],
                d = (r = i.a.map(r, function(t, e) {
                    return 0 === t.indexOf("#") && e < r.length - 1 && c.push(t), -1 !== i.a.inArray(t, a) ? null : t
                })).length,
                h = r[d - 1],
                u = n.length ? n.first().prop("tagName").toLowerCase() : null,
                p = null,
                g = [];
            null == u || /^\w/.test(h) || (p = u + h, g.push(p)), g.push(h), i.a.map(c, function(t, e) {
                g.push(t + " " + (p || h))
            });
            let v, f, S, m = "",
                b = /:nth-child[^)]+\)/g,
                C = /nth-child[^)]+\)/g,
                T = new RegExp("nth-child\\([0-9]+\\)(?:[^\\s]+|)", "g"),
                x = /:first-child/,
                y = /:last-child/,
                _ = new RegExp('\\[id="[^"]+"\\]|#[^$\\s.]+', "g");
            for (o = d - 2; o >= 0; o--)
                if (r.hasOwnProperty(o)) {
                    if (m = (e = r[o]) + " " + m, ">" == e) {
                        if (--o < 0) break;
                        m = (e = r[o]) + " " + m
                    }
                    v = m + " " + h, f = p ? m + " " + p : null, g.push(v), f && g.push(f)
                }
            return g = i.a.map(g, t => (S = this.matchRegExWithIndex(T, t)) ? (i.a.map(S, function(e) {
                let o = parseInt(e[1]) + parseInt(e[0].length),
                    s = t,
                    r = t.substring(0, o),
                    i = l.find(r).first();
                i.length && i.is(":last-child") && (s = t.substring(0, e[1]) + e[0].replace(C, "last-child") + t.substring(o), g.push(s))
            }), void 0 !== t && "undefined" !== t && null !== t && t.length ? t.replace(s.dtv.multipleSpaceRegex, " ") : null) : t), i.a.map(g, function(t) {
                let e = t.split(" ");
                if (e.length > 1) {
                    let t = e[e.length - 1]; - 1 === t.indexOf("#") && -1 === t.indexOf("id=") || ((t = t.replace(_, "")).length || null == u || (t = u), e.pop(), e.push(t), g.push(e.join(" ")))
                }
            }), i.a.map(g, function(t) {
                g.push(t.replace(b, "")), g.push(t.replace(x, "")), g.push(t.replace(y, "")), g.push(t.replace(b, "").replace(x, "").replace(y, ""))
            }), g = this.unique(g).sort(function(t, e) {
                return t.length - e.length
            })
        }
        getBestAlternativeSelector() {
            let t = s.sidebarHandler.getSectionElement(s.dtv.sidebarSectionAlternativeSelectorsClass).find("ul").first().data("alternatives"),
                e = null;
            return void 0 == t ? e : (i.a.map(t, function(t) {
                if (1 == t.count)
                    if (null == e) e = t.selector;
                    else if ((-1 !== t.selector.indexOf("#") || -1 !== t.selector.indexOf("id=")) && -1 === e.indexOf("#") && -1 === e.indexOf("id=")) return t.selector
            }), e)
        }
        matchRegExWithIndex(t, e) {
            let o = [],
                s = 0;
            if (void 0 === e || "undefined" === e || null === e || !e.length) return o;
            let r = e.match(t);
            return r ? (i.a.map(r, function(t) {
                s = e.indexOf(t, s), o.push([t, s])
            }), o) : null
        }
        invalidateUrlCache(t) {
            s.dtv.urlCache[t] = null, s.iframeHandler.getIframe().data("currenturl", "")
        }
        invalidateAllUrlCaches() {
            s.dtv.urlCache = []
        }
        flashBackground(t) {
            t.stop().css("background-color", "#b8ea84").animate({
                backgroundColor: "#FFFFFF"
            }, 1e3)
        }
        closeLightbox() {
            i.a.featherlight.current().close()
        }
        updateTitle(t) {
            i()(s.dtv.lightboxTitleSelector).html(t || "")
        }
        saveState() {
            null != this.saveTimeout && clearTimeout(this.saveTimeout), this.saveTimeout = setTimeout(function() {
                let t, e, o = i()(s.dtv.optionsToolbarSelector).find(":input"),
                    r = {
                        options: {},
                        history: s.addressBar.history,
                        isHoverSelectActive: s.optionsToolbar.isHoverSelectActive() ? 1 : 0
                    };
                o.each((o, l) => {
                    (t = i()(l)).hasClass(s.dtv.optTargetHTMLTagClass) || (e = "checkbox" == t.attr("type") ? t[0].checked ? 1 : 0 : t.val(), r.options[t.attr("name")] = e)
                }), s.dtv.$inputDevToolsState.val() != JSON.stringify(r) && i.a.post(window.ajaxurl, {
                    kdn_nonce: s.dtv.$kdnNonce.val(),
                    action: window.pageActionKey,
                    data: {
                        cmd: "saveDevToolsState",
                        postId: s.dtv.postId,
                        state: r
                    }
                }).done(function(t) {
                    s.dtv.$inputDevToolsState.val(JSON.stringify(r))
                }).fail(function(t) {})
            }, 1500)
        }
        restoreState() {
            let t = s.dtv.$inputDevToolsState.val();
            if (void 0 == t || !t) return;
            let e, o, r = JSON.parse(t);
            1 == r.isHoverSelectActive ? i()(s.dtv.optHoverSelectSelector).removeClass("active").click() : i()(s.dtv.optHoverSelectSelector).addClass("active").click(), s.addressBar.history = r.history || [], s.addressBar.historyUpdated();
            for (let t in r.options) r.options.hasOwnProperty(t) && (o = r.options[t], "checkbox" == (e = i()("[name=" + t + "]")).attr("type") ? e.prop("checked", 1 == o) : e.val(o))
        }
        removeImproperClassNames(t) {
            return t.replace(s.dtv.regexClassNameStartingWithDash, "")
        }
        unbracketClassNames(t) {
            return t.replace(new RegExp('\\[class="([^"]+)"\\]', "g"), (t, e) => "." + e.trim().replace(" ", "."))
        }
        unique(t) {
            let e = [];
            return i.a.each(t, function(t, o) {
                -1 == i.a.inArray(o, e) && e.push(o)
            }), e
        }
    }
}, function(t, e, o) {
    "use strict";
    (function(t) {
        o.d(e, "a", function() {
            return n
        });
        var s = o(0),
            r = o(2),
            l = o(4),
            i = o(5);
        class n {
            constructor() {
                this.hoverSelectActive = !0, this.currentUrl = null
            }
            updateStatus(e) {
                let o = t(s.dtv.iframeStatusSelector).first();
                o.html(e || ""), e && e.length ? o.removeClass("hidden") : o.addClass("hidden"), s.devTools.flashBackground(o)
            }
            highlight(e, o) {
                let r = this.getIframeContents();
                r.find("." + s.dtv.hoverClass).removeClass(s.dtv.hoverClass);
                let l = 0;
                try {
                    let i = r.find(e);
                    if (i.addClass(s.dtv.hoverClass), void 0 != o && o && i.length > 0) {
                        let e = s.optionsToolbar.isHoverSelectActive();
                        this.activateHoverSelect(!1), r.find("body").stop().animate({
                            scrollTop: i.first().offset().top - t(window).height() / 4
                        }, 500, "swing", () => {
                            e && setTimeout(() => {
                                this.activateHoverSelect(!0)
                            }, 100)
                        })
                    }
                    l = i.length, s.dtv.$lastHighlighted = i.last()
                } catch (t) {
                    l = 0
                }
                return this.updateStatus(window.kdn.found + ": " + l), l
            }
            clearHighlights() {
                this.getIframeContents().find("." + s.dtv.hoverClass).removeClass(s.dtv.hoverClass), this.updateStatus(null), s.dtv.$lastHighlighted = null
            }
            listenToCursor() {
                let t = () => {
                    this.onIframeReady()
                };
                this.getIframe().ready(t).load(t)
            }
            onIframeReady() {
                let e = this.getIframeContents(),
                    o = e => {
                        e.preventDefault(), e.stopPropagation();
                        let o = e.target,
                            r = t(o),
                            l = ["html", "body"],
                            i = ["src", "alt", "target", "href", "title", "width", "height", "method", "dir"];
                        r.removeClass(s.dtv.hoverClass);
                        let n = {
                            priority: ["id", "class", "tag"],
                            ignore: {
                                class: function(t) {
                                    return -1 !== t.indexOf("!")
                                },
                                attribute: function(e, o, s) {
                                    return -1 !== t.inArray(e, i) || -1 !== e.indexOf("/") || -1 !== o.indexOf("/") || -1 !== e.indexOf("\\") || -1 !== o.indexOf("\\") || /data-*/.test(e) || /aria-*/.test(e) || s(e, o)
                                },
                                tag: function(e) {
                                    return -1 !== t.inArray(e, l)
                                }
                            }
                        };
                        if (void 0 === r || "undefined" === r || null === r || !r.length) return;
                        let a = window.OptimalSelect.select(r[0], n);
                        if (a.startsWith("strong")) {
                            let t = r.closest("strong").parent();
                            a = window.OptimalSelect.select(t[0], n) + " " + a
                        }
                        a = a.replace(s.dtv.multipleSpaceRegex, " ").replace(/\\:/g, ":").replace("nth-child(1)", "first-child").replace(".kdn-element-hovered", ""), a = s.devTools.unbracketClassNames(a);
                        let c = (a = s.devTools.removeImproperClassNames(a)).split(" ");
                        a = (c = t.map(c, function(t, e) {
                            return /^\.\\/g.test(t) || -1 !== t.indexOf("!") ? null : t
                        })).join(" "), s.cssSelectorToolbar.updateInput(a), s.cssSelectorToolbar.onShowAlternatives(e, !1);
                        let d = s.devTools.getBestAlternativeSelector();
                        return null !== d && s.cssSelectorToolbar.updateInput(d), t(s.dtv.cssInputSelector).keyup(), s.optionsToolbar.isUseImmediately() && t(s.dtv.cssUseButtonSelector).click(), a
                    };
                e.find(s.dtv.hoverStyleSelector).length || e.find("head").append(t(s.dtv.hoverStyleSelector)[0].outerHTML), s.dtv.$lastHighlighted = null, e.find("*").off("click").off("hover").on("click", e => {
                    if (e.preventDefault(), e.stopPropagation(), null != s.dtv.$lastHighlighted && e.target != s.dtv.$lastHighlighted[0]) return e.target = s.dtv.$lastHighlighted[0], void o(e);
                    if (!s.optionsToolbar.isHoverSelectActive()) {
                        let o = t(e.target);
                        s.addressBar.go(o.closest("a").attr("href"))
                    }
                }).hover(e => {
                    let r = t(e.target);
                    if (null != s.optionsToolbar.targetHTMLTagSelector && r.prop("tagName").toLowerCase() != s.optionsToolbar.targetHTMLTagSelector) {
                        let t = r.find(s.optionsToolbar.targetHTMLTagSelector).first(),
                            e = r.closest(s.optionsToolbar.targetHTMLTagSelector),
                            o = r.parents().length;
                        if (t.length && e.length) r = t.parents().length - o < o - e.parents().length ? t : e;
                        else if (t.length) r = t;
                        else {
                            if (!e.length) return;
                            r = e
                        }
                    }
                    this.hoverSelectActive ? (s.dtv.$lastHighlighted && s.dtv.$lastHighlighted.removeClass(s.dtv.hoverClass).off("click"), r.addClass(s.dtv.hoverClass).click(t => o(t)), s.dtv.$lastHighlighted = r) : null != s.dtv.$lastHighlighted && (s.dtv.$lastHighlighted.off("click"), s.dtv.$lastHighlighted = null)
                })
            }
            listenToKeyboard() {
                let e = this,
                    o = function() {
                        let o = e.getIframe()[0].contentWindow.document;
                        t(o).on("keydown", function(t) {
                            s.sidebarHandler.handleKeyPress(t)
                        })
                    };
                e.getIframe().ready(o).load(o)
            }
            initCssSelectors() {
                let t = () => {
                    let t = s.cssSelectorToolbar.getCssSelectorInput().val(),
                        e = 0;
                    if (void 0 != t && t.length) e = this.highlight(t, !0);
                    else {
                        let t = s.dtv.$currentDevToolsButton.data("kdn");
                        if (void 0 == t) return;
                        let o = t.targetCssSelectors;
                        if (void 0 == o || !o.length) return;
                        for (let t in o) {
                            if (!o.hasOwnProperty(t)) continue;
                            let n = o[t];
                            if ((e = this.highlight(n, !0)) > 0) return s.cssSelectorToolbar.updateInput(n), void l.a.getInstance().notifyRegular(s.cssSelectorToolbar.getCssSelectorInput(), window.kdn.css_selector_found, r.a.SUCCESS, i.a.BOTTOM)
                        }
                    }
                };
                this.getIframe().ready(t).load(t)
            }
            getIframe() {
                return t(s.dtv.iframeSelector)
            }
            getIframeContents() {
                return this.getIframe().contents()
            }
            getCurrentUrl() {
                return this.currentUrl
            }
            loadUrl(e) {
                if (void 0 == e || !e || !e.length || 0 !== e.indexOf("http")) return;
                console.log("Load URL: " + e), this.currentUrl = e, s.addressBar.setAddressBarUrl(e), s.addressBar.enableButton(t(s.dtv.refreshButtonSelector)), s.addressBar.historyUpdated(), 0 == s.addressBar.currentHistoryIndex ? s.addressBar.disableButton(t(s.dtv.backButtonSelector)) : s.addressBar.history.length > 1 && s.addressBar.enableButton(t(s.dtv.backButtonSelector));
                let o = t(s.dtv.urlInputSelector);
                o.addClass("loading");
                let r = t(s.dtv.devToolsButtonSelector).data("kdn");
                s.devTools.getSourceCode(e, r, t => {
                    if (void 0 != t && null != t && void 0 != t.html && t.html.length) this.setIframeContent(t.html, e);
                    else if (console.log("Request succeeded. Getting source code was not successful. Response:"), console.log(t), void 0 !== t.infoView && null !== t.infoView && "undefined" !== t.infoView) {
                        let o = t.infoStyleUrl || null,
                            s = "";
                        s = null !== o ? '<html><head><link rel="stylesheet" href="' + o + '" type="text/css"></head><body>' + t.infoView + "</body></html>" : t.infoView, this.setIframeContent(s, e)
                    }
                }, function(t) {
                    "abort" != t.statusText && (console.log("Request failed. Getting source code was not successful. Response:"), console.log(t))
                }, function() {
                    o.removeClass("loading")
                })
            }
            setIframeContent(e, o) {
                let r = t(s.dtv.iframeSelector).first(),
                    l = r[0],
                    i = l.contentDocument || l.contentWindow.document,
                    n = r.data("currenturl");
                void 0 != n && n == o || (i.open(), i.write(e), i.close(), this.setIframeHeight(), r.data("currenturl", o), this.listenToCursor(), this.listenToKeyboard(), this.initCssSelectors())
            }
            setIframeHeight() {
                let e = t(s.dtv.toolbarSelector).first().innerHeight();
                t(s.dtv.iframeSelector).first().css("height", "calc(100% - " + e + "px)")
            }
            activateHoverSelect(t) {
                this.hoverSelectActive = t
            }
        }
    }).call(this, o(1))
}, function(t, e, o) {
    "use strict";
    (function(t) {
        o.d(e, "a", function() {
            return r
        });
        var s = o(0);
        class r {
            constructor() {
                this.targetHTMLTagSelector = null
            }
            onChangeTargetHTMLTagInput(e) {
                let o = t(s.dtv.optTargetHTMLTagSelector).val();
                void 0 != o && o.length ? this.targetHTMLTagSelector = t.trim(o.split(" ")[0]) : this.targetHTMLTagSelector = null
            }
            onClickToggleHoverSelect(e) {
                let o = t(s.dtv.optHoverSelectSelector).first();
                o.toggleClass("active"), s.iframeHandler.activateHoverSelect(o.hasClass("active")), s.devTools.saveState()
            }
            isHoverSelectActive() {
                return t(s.dtv.optHoverSelectSelector).first().hasClass("active")
            }
            isApplyManipulationOptions() {
                return t(s.dtv.optApplyManipulationOptionsSelector)[0].checked
            }
            isUseImmediately() {
                return t(s.dtv.optUseImmediatelySelector)[0].checked
            }
            isRemoveScripts() {
                return t(s.dtv.optRemoveScriptsSelector)[0].checked
            }
            isRemoveStyles() {
                return t(s.dtv.optRemoveStylesSelector)[0].checked
            }
        }
    }).call(this, o(1))
}, function(t, e, o) {
    "use strict";
    (function(t) {
        o.d(e, "a", function() {
            return r
        });
        var s = o(0);
        class r {
            constructor() {
                this.preventHoverEvent = !1
            }
            loadSidebar() {
                this.onUpdateAllUsedSelectors(null)
            }
            updateAlternativeSelectors(t) {
                let e, o, r = "",
                    l = s.iframeHandler.getIframeContents(),
                    i = [];
                for (let s in t) t.hasOwnProperty(s) && ((o = l.find(t[s]).length) < 1 || (e = {
                    selector: t[s],
                    count: o
                }, i.push(e), r += this.getCssSelectorListItemHtml(e)));
                return this.updateSectionContent("<ul data-alternatives='" + JSON.stringify(i) + "'>" + r + "</ul>", s.dtv.sidebarSectionAlternativeSelectorsClass), i
            }
            onUpdateAllUsedSelectors(e) {
                let o, r, l, i = [],
                    n = [];
                t(s.dtv.settingsMetaBoxSelector).find("input.css-selector").each((e, s) => {
                    o = t(s), -1 !== (r = o.attr("name")).indexOf("selector") && void 0 != (l = o.val()) && l.length && (n.hasOwnProperty(l) ? n[l] += 1 : (i.push(l), n[l] = 1))
                });
                let a, c = [],
                    d = "";
                for (let t in i) i.hasOwnProperty(t) && (l = i[t], a = {
                    count: n[l],
                    selector: l
                }, c.push(a), d += this.getCssSelectorListItemHtml(a));
                this.updateSectionContent("<ul>" + d + "</ul>", s.dtv.sidebarSectionUsedSelectorsClass)
            }
            updateSectionContent(t, e) {
                let o = this.getSectionElement(e),
                    r = o.find("." + s.dtv.sidebarSectionContentClass).first();
                s.devTools.flashBackground(o), r.html(t)
            }
            getSectionElement(e) {
                return t(s.dtv.sidebarSelector + " ." + e)
            }
            getCssSelectorListItemHtml(t) {
                let e = t.count ? "<i class='count'>(" + t.count + ")</i>" : "";
                return "<li><span class='selector' data-selector='" + JSON.stringify(t) + "'>" + t.selector + e + "</span></li>"
            }
            onClickCssSelector(e) {
                let o = t(e.target),
                    r = this.getCssSelectorData(o);
                r && (s.cssSelectorToolbar.updateInput(r.selector), t(s.dtv.cssTestSelector).click(), t(s.dtv.sidebarCloseSelector).click(), this.preventHoverEvent = !0)
            }
            onClickHistoryUrl(e) {
                let o = t(e.target),
                    r = o.text();
                if (void 0 == r || !r.length) return;
                let l = o.closest("ul").find("li").index(o.closest("li"));
                null != l && l > -1 && s.addressBar.travelInTime(l)
            }
            onHoverCssSelector(e) {
                if (this.preventHoverEvent) return void(this.preventHoverEvent = !1);
                let o = t(e.target),
                    r = this.getCssSelectorData(o);
                r && (s.iframeHandler.clearHighlights(), s.iframeHandler.highlight(r.selector, !0))
            }
            getCssSelectorData(t) {
                let e = t.data("selector");
                return void 0 != e && e.hasOwnProperty("selector") ? e : null
            }
            onCloseSidebar(e) {
                this.getSidebar().removeClass(s.dtv.sidebarOpenedClass), t(s.dtv.sidebarOpenSelector).removeClass("hidden")
            }
            onOpenSidebar(e) {
                this.getSidebar().addClass(s.dtv.sidebarOpenedClass), t(s.dtv.sidebarOpenSelector).addClass("hidden")
            }
            onToggleExpand(e) {
                let o = t(e.target),
                    r = (o.hasClass(s.dtv.sidebarSectionExpandedClass), o.closest(s.dtv.sidebarSectionSelector));
                o.closest(s.dtv.sidebarSectionContentSelector);
                r.toggleClass(s.dtv.sidebarSectionExpandedClass), o.toggleClass(s.dtv.sidebarSectionExpandedClass).toggleClass("dashicons-arrow-down").toggleClass("dashicons-arrow-up")
            }
            getSidebar() {
                return t(s.dtv.sidebarSelector)
            }
            handleKeyPress(t) {
                37 == t.which && this.onOpenSidebar(t), 39 == t.which && this.onCloseSidebar(t)
            }
        }
    }).call(this, o(1))
}]);