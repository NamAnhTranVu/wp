! function(t) {
    var e = {};

    function s(l) {
        if (e[l]) return e[l].exports;
        var o = e[l] = {
            i: l,
            l: !1,
            exports: {}
        };
        return t[l].call(o.exports, o, o.exports, s), o.l = !0, o.exports
    }
    s.m = t, s.c = e, s.d = function(t, e, l) {
        s.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: l
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
        var l = Object.create(null);
        if (s.r(l), Object.defineProperty(l, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var o in t) s.d(l, o, function(e) {
                return t[e]
            }.bind(null, o));
        return l
    }, s.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return s.d(e, "a", e), e
    }, s.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, s.p = "", s(s.s = 33)
}([, function(t, e) {
    t.exports = jQuery
}, function(t, e, s) {
    "use strict";
    var l;
    s.d(e, "a", function() {
            return l
        }),
        function(t) {
            t.WARN = "warn", t.INFO = "info", t.ERROR = "error", t.SUCCESS = "success"
        }(l || (l = {}))
}, function(t, e, s) {
    "use strict";
    (function(t) {
        s.d(e, "a", function() {
            return l
        });
        class l {
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
            return r
        });
        var l = s(2),
            o = s(5);
        class r {
            constructor() {}
            static getInstance() {
                return null === this.INSTANCE && (this.INSTANCE = new r), this.INSTANCE
            }
            notify(t, e) {
                if (!this.isNotifyAvailable()) return;
                void 0 != e && e.length || (e = window.kdn.required_for_test);
                let s = t.closest("tr").find("label").first(),
                    l = s.length ? s : t;
                this.scrollToElement(l), l.notify(e, {
                    position: "top"
                })
            }
            notifyRegular(t, e, s = l.a.INFO, r = o.a.TOP) {
                this.isNotifyAvailable() && t.notify(e, {
                    position: r || "top",
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
        r.INSTANCE = null
    }).call(this, s(1))
}, function(t, e, s) {
    "use strict";
    var l;
    s.d(e, "a", function() {
            return l
        }),
        function(t) {
            t.TOP = "top", t.RIGHT = "right", t.BOTTOM = "bottom", t.LEFT = "left"
        }(l || (l = {}))
}, , , , , , function(t, e, s) {
    "use strict";
    (function(t) {
        s.d(e, "a", function() {
            return l
        });
        class l {
            constructor() {
                this.registerFunction()
            }
            static getInstance() {
                return null === this.INSTANCE && (this.INSTANCE = new l), this.INSTANCE
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
        l.INSTANCE = null
    }).call(this, s(1))
}, function(t, e, s) {
    "use strict";
    (function(t) {
        s.d(e, "a", function() {
            return l
        });
        class l {
            constructor() {}
            static getInstance() {
                return null === this.INSTANCE && (this.INSTANCE = new l), this.INSTANCE
            }
            addNewInputGroup(e) {
                let s = e.find(".input-group").first().clone(),
                    o = 0;
                e.find(".input-group").each(function() {
                    let e = t(this);
                    void 0 != e.data("key") && e.data("key") > o && (o = e.data("key"))
                });
                let r = s.data("key"),
                    n = o + 1;
                s.attr("data-key", n), s.data("key", n);
                let a = s.html();
                s.html(a.replace(new RegExp("\\[" + r + "\\]", "g"), "[" + n + "]")), s.find("input").each(function() {
                    t(this).val("")
                }), s.find("textarea").each(function() {
                    t(this).html("")
                }), s.find("input[type=checkbox]").each(function() {
                    t(this).prop("checked", !1)
                });
                for (let t of l.modifiers) t(s);
                return e.append(s), "function" == typeof t.fn.tooltip && s.find('[data-toggle="tooltip"]').tooltip(), s.find(".kdn-options-box").each(function() {
                    let e = t(this);
                    e.removeClass("has-config"), "function" == typeof t.fn.tooltip && e.tooltip("destroy")
                }), s
            }
            registerModifier(t) {
                l.modifiers.push(t)
            }
        }
        l.INSTANCE = null, l.modifiers = []
    }).call(this, s(1))
}, , , function(t, e, s) {
    "use strict";
    s.d(e, "a", function() {
        return l
    });
    class l {
        constructor() {
            this.selectorToolsContainer = "#container-tools", this.selectorTabNavigation = this.selectorToolsContainer + " > .nav-tab-wrapper", this.selectorTabs = this.selectorToolsContainer + " > .tab"
        }
        static getInstance() {
            return null === this.INSTANCE && (this.INSTANCE = new l), this.INSTANCE
        }
    }
    l.INSTANCE = null
}, , , , , , , , , , function(t, e, s) {
    "use strict";
    (function(t) {
        s.d(e, "a", function() {
            return a
        });
        var l = s(31),
            o = s(15),
            r = s(12),
            n = s(11);
        class a {
            constructor() {
                this.processing = !1, this.tv = o.a.getInstance(), this.inputGroupAdder = r.a.getInstance(), n.a.getInstance(), l.a.getInstance(), t(".tool-form").on("submit", t => this.handleFormSubmission(t)), t(".details").on("click", ".hide-test-results", t => this.hideTestResults(t)), t(".toggle-info-texts").on("click", t => this.toggleInfoButtons(t)), t(this.tv.selectorTabNavigation).on("click", "a", t => this.activateTab(t))
            }
            activateTab(e) {
                e.preventDefault();
                let s = t(e.target),
                    l = s.data("tab");
                t(this.tv.selectorTabs).addClass("hidden"), t(this.tv.selectorTabNavigation).find("> a").removeClass("nav-tab-active"), s.addClass("nav-tab-active"), t(l).removeClass("hidden")
            }
            hideTestResults(e) {
                e.preventDefault(), t(e.target).closest(".test-results").addClass("hidden")
            }
            toggleInfoButtons(e) {
                e.preventDefault();
                let s = !1,
                    l = !1;
                t(e.target).closest(".details").find(".info-text").each((e, o) => {
                    let r = t(o);
                    s || (l = r.hasClass("hidden"), s = !0), l ? r.removeClass("hidden") : r.addClass("hidden")
                })
            }
            handleFormSubmission(e) {
                if (e.preventDefault(), this.processing) return;
                this.processing = !0;
                let s = t(e.target),
                    l = s.find(".test-results").first(),
                    o = l.find(".content");
                var r = this.getFormData(s);
                var p = r._kdn_tools_recrawl_post_id;

                jQuery(".recrawl-count .count").html("0");
                jQuery(".recrawl-count .processed").html("0");

                jQuery(".recrawl-count .times").html(jQuery(".recrawl-count .times").html() * 1 + 1);

                if (p) {
                    p = p.split(",");
                    jQuery(".recrawl-count .count").html(p.length);
                    r._kdn_tools_recrawl_post_id = p[0];
                }

                l.removeClass("hidden").addClass("loading"), !p ? o.html("") : null, t.post(window.ajaxurl, {
                    kdn_nonce: t("#kdn_nonce").val(),
                    action: window.pageActionKey,
                    data: r
                }).done(function(t) {
                    t ? o.prepend("<div>" + t.view + "</div>") : o.prepend(window.kdn.no_result);
                    if (p) jQuery(".recrawl-count .processed").html(jQuery(".recrawl-count .processed").html() * 1 + 1);
                    if (p) jQuery(".recrawl-count .total").html(jQuery(".recrawl-count .total").html() * 1 + 1);
                }).fail(function(t) {
                    console.log(t), o.prepend(window.kdn.an_error_occurred + ": " + t.responseText);
                }).always(t => {
                    l.removeClass("loading"), this.processing = !1, p ? this.recrawlingNextId(e, r, p) : ''
                });
            }
            recrawlingNextId(e, r, p, n = 1){

                if (n == p.length) return;

                if (e.preventDefault(), this.processing) return;
                this.processing = !0;
                var s = t(e.target),
                    l = s.find(".test-results").first(),
                    o = l.find(".content");

                r._kdn_tools_recrawl_post_id = p[n];

                l.removeClass("hidden").addClass("loading"), t.post(window.ajaxurl, {
                    kdn_nonce: t("#kdn_nonce").val(),
                    action: window.pageActionKey,
                    data: r
                }).done(function(t) {
                    t ? o.prepend("<div>" + t.view + "</div>") : o.prepend(window.kdn.no_result);
                    if (p) jQuery(".recrawl-count .processed").html(jQuery(".recrawl-count .processed").html() * 1 + 1);
                    if (p) jQuery(".recrawl-count .total").html(jQuery(".recrawl-count .total").html() * 1 + 1);
                }).fail(function(t) {
                    console.log(t), o.prepend(window.kdn.an_error_occurred + ": " + t.responseText)
                }).always(t => {
                    n++;
                    l.removeClass("loading"), this.processing = !1, this.recrawlingNextId(e, r, p, n)
                });
            }
            getFormData(e) {
                let s = e.serializeArray(),
                    l = {};
                return t.map(s, (t, e) => {
                    l[t.name] = t.value
                }), l
            }
        }
    }).call(this, s(1))
}, , , , , , function(t, e, s) {
    "use strict";
    var l;
    ! function(t) {
        t[t.CRAWL_NOW = 0] = "CRAWL_NOW", t[t.ADD_TO_DATABASE = 1] = "ADD_TO_DATABASE"
    }(l || (l = {}));
    class o {
        constructor(t, e, s, l, o) {
            this._siteName = (t || "").trim(), this._siteId = e, this._url = (s || "").trim(), this._categoryId = o, this._categoryName = (l || "").trim()
        }
        get siteName() {
            return this._siteName
        }
        get siteId() {
            return this._siteId
        }
        get url() {
            return this._url
        }
        get categoryId() {
            return this._categoryId
        }
        get categoryName() {
            return this._categoryName
        }
        get response() {
            return this._response
        }
        set response(t) {
            this._response = t
        }
    }
    class r extends o {
        constructor(t, e, s, l, o, r) {
            super(t, e, s, l, o), this._imageUrl = r || ""
        }
        get imageUrl() {
            return this._imageUrl
        }
        get postId() {
            return this._postId
        }
        set postId(t) {
            this._postId = t
        }
        get postUrl() {
            return this._postUrl
        }
        set postUrl(t) {
            this._postUrl = t
        }
    }
    var n = s(15),
        a = s(3);
    class i extends o {}
    var u = s(4),
        c = s(1),
        h = s.n(c),
        d = s(2);
    s.d(e, "a", function() {
        return p
    });
    class p {
        constructor() {
            this.selectorContainerUrlQueue = "#container-url-queue-manual-crawl", this.selectorTableContainerUrlQueue = this.selectorContainerUrlQueue + " .table-container", this.selectorTableUrlQueue = "#table-url-queue-manual-crawl", this.selectorToolContainerManualCrawl = "#tool-manual-crawl", this.classForm = "tool-manual-crawl", this.selectorForm = "." + this.classForm, this.classButtonCrawlNow = "crawl-now", this.classButtonAddToDatabase = "add-to-database", this.selectorButtonCrawlNow = ".button." + this.classButtonCrawlNow, this.selectorButtonAddToDatabase = ".button." + this.classButtonAddToDatabase, this.selectorButtonDelete = ".button.delete", this.selectorButtonRepeat = ".button.repeat", this.$urlRowPrototype = null, this.$responseRowPrototype = null, this.classResponse = "response", this.classHasResponse = "has-response", this.classOpen = "open", this.selectorCheckboxClearUrls = "#_manual_crawling_tool_clear_after_submit", this.beingProcessedCategoryUrlData = null, this.categoryUrlQueue = [], this.isPaused = !1, this.runningRequestCount = 0, this.maxParallelCrawling = 1, this.inputNameSiteId = "_kdn_tools_site_id", this.inputNameCategoryId = "_kdn_tools_category_id", this.inputNameCategoryUrls = "_category_urls", this.inputNamePostUrls = "_post_urls", this.tv = n.a.getInstance(), this.selectorUrls = this.selectorTableUrlQueue + " tbody > tr.url:not(.prototype)", this.selectorUrlResponses = this.selectorTableUrlQueue + " tbody > tr.url:not(.prototype) + ." + this.classResponse, this.selectorUrlsToBeCrawled = this.selectorTableUrlQueue + " tbody > tr.url:not(.prototype):not(.loading):not(.done)", this.selectorUrlsDone = this.selectorTableUrlQueue + " tbody > tr.url.done:not(.prototype)", this.selectorUrlsBeingCrawled = this.selectorTableUrlQueue + " tbody > tr.url.loading:not(.prototype)", this.selectorStatus = this.selectorContainerUrlQueue + " #status", this.selectorButtonContinue = this.selectorContainerUrlQueue + " .button.continue", this.selectorButtonPause = this.selectorContainerUrlQueue + " .button.pause", this.selectorClearAllUrls = this.selectorTableUrlQueue + " thead th.controls .remove-all", this.selectorInputMaxPostsToBeCrawled = this.selectorToolContainerManualCrawl + " #_max_posts_to_be_crawled", this.selectorInputMaxParallelCrawlingCount = this.selectorToolContainerManualCrawl + " #_max_parallel_crawling_count", this.selectorShowAllResponses = this.selectorContainerUrlQueue + " .show-all-responses", this.selectorHideAllResponses = this.selectorContainerUrlQueue + " .hide-all-responses", h()(document).on("click", this.selectorButtonAddToDatabase, t => this.onClickSubmit(t, l.ADD_TO_DATABASE)), h()(document).on("click", this.selectorButtonCrawlNow, t => this.onClickSubmit(t, l.CRAWL_NOW)), h()(document).on("click", this.selectorContainerUrlQueue + " " + this.selectorButtonDelete, t => this.onClickDeleteUrl(t)), h()(document).on("click", this.selectorContainerUrlQueue + " " + this.selectorButtonRepeat, t => this.onClickRepeatCrawling(t)), h()(document).on("click", this.selectorTableUrlQueue + " tbody > tr", t => this.onClickUrlRow(t)), h()(document).on("click", this.selectorTableUrlQueue + " tbody > tr a", t => t.stopPropagation()), h()(document).on("click", this.selectorButtonContinue, () => this.continueCrawling()), h()(document).on("click", this.selectorButtonPause, () => this.pauseCrawling()), h()(document).on("click", this.selectorClearAllUrls, () => this.clearAllUrls()), h()(document).on("click", this.selectorShowAllResponses, () => this.showAllResponses()), h()(document).on("click", this.selectorHideAllResponses, () => this.hideAllResponses())
        }
        static getInstance() {
            return null === this.INSTANCE && (this.INSTANCE = new p), this.INSTANCE
        }
        clearAllUrls() {
            let t = this.selectorUrlsDone + ", " + this.selectorUrlsToBeCrawled + ", " + this.selectorUrlsDone + " + tr.response";
            h()(t).remove(), this.onUpdateUrlTable()
        }
        onClickSubmit(t, e) {
            t.preventDefault(), t.stopPropagation();
            let s = h()(t.target);
            "function" == typeof h.a.fn.tooltip && s.tooltip("hide").blur();
            let o = this.getEnteredUrls();
            switch (e) {
                case l.CRAWL_NOW:
                    this.pauseThreshold = this.getMaxPostsToBeCrawled(), this.crawledUrlCountAfterSubmit = 0, this.maxParallelCrawling = this.getMaxParallelCrawlingCount(), this.pauseThreshold > 0 && (this.maxParallelCrawling = Math.min(this.maxParallelCrawling, this.pauseThreshold)), this.continueCrawling(), this.retrievePostUrlsFromCategoryUrls(), this.addUrlsToQueueTable(o), this.crawlNextUrlInQueue(), flashBackground(h()(this.selectorContainerUrlQueue));
                    break;
                case l.ADD_TO_DATABASE:
                    this.handleAddUrlsToDatabase(o), flashBackground(h()(this.selectorContainerUrlQueue))
            }
        }
        retrievePostUrlsFromCategoryUrls() {
            if (null !== this.beingProcessedCategoryUrlData || !this.categoryUrlQueue.length || this.isPaused) return;
            this.beingProcessedCategoryUrlData = this.categoryUrlQueue.shift(), this.onUpdateUrlTable();
            let t = this.beingProcessedCategoryUrlData;
            h.a.post(window.ajaxurl, {
                kdn_nonce: h()("#kdn_nonce").val(),
                action: window.pageActionKey,
                data: {
                    tool_type: "get_post_urls_from_category_url",
                    category_url: t.url,
                    site_id: t.siteId
                }
            }).done(e => {
                let s = e.results || [];
                e.hasInfo && this.showTestResult(e.view);
                let l, o, n, a = s.length,
                    i = [];
                for (let e = 0; e < a; e++) null !== (l = s[e] || null) && (o = l.url || null, n = l.thumbnail || null, null !== o && i.push(new r(t.siteName, t.siteId, o, t.categoryName, t.categoryId, n)));
                if (!i.length) return u.a.getInstance().notifyRegular(h()('label[for="' + this.inputNameCategoryUrls + '"]'), window.kdn.no_urls_found + " " + t.url, d.a.INFO), void this.onUpdateUrlTable();
                this.addUrlsToQueueTable(i), this.crawlNextUrlInQueue()
            }).fail(e => {
                u.a.getInstance().notifyRegular(h()('label[for="' + this.inputNameCategoryUrls + '"]'), window.kdn.an_error_occurred + " (" + t.url + "): " + e.responseText, d.a.ERROR), console.log(e)
            }).always(t => {
                this.beingProcessedCategoryUrlData = null, this.retrievePostUrlsFromCategoryUrls(), this.updateStatus()
            })
        }
        handleAddUrlsToDatabase(t) {
            let e = this.getTestResultContainer();
            if (e.hasClass("loading")) return;
            e.removeClass("hidden").addClass("loading");
            let s = e.find(".content").first();
            s.html("");
            let l = this.categoryUrlQueue;
            this.categoryUrlQueue = [], h.a.post(window.ajaxurl, {
                kdn_nonce: h()("#kdn_nonce").val(),
                action: window.pageActionKey,
                data: {
                    tool_type: "add_urls_to_database",
                    post_urls: JSON.stringify(t),
                    category_urls: JSON.stringify(l)
                }
            }).done(t => {
                t ? s.html(t.view) : s.html(window.kdn.no_result)
            }).fail(t => {
                console.log(t), s.html(window.kdn.an_error_occurred + ": " + t.responseText)
            }).always(t => {
                e.removeClass("loading")
            })
        }
        onClickUrlRow(t) {
            let e = h()(t.target).closest("tr"),
                s = this.getUrlRowResponse(e);
            null !== s && (s.hasClass("hidden") ? (s.removeClass("hidden"), e.addClass(this.classOpen)) : (s.addClass("hidden"), e.removeClass(this.classOpen)))
        }
        crawlNextUrlInQueue() {
            if (!(this.runningRequestCount >= this.maxParallelCrawling))
                for (; this.runningRequestCount < this.maxParallelCrawling;) {
                    if (this.isPaused) return;
                    if (this.pauseThreshold > 0 && this.crawledUrlCountAfterSubmit >= this.pauseThreshold) return this.crawledUrlCountAfterSubmit = 0, this.pauseThreshold = 0, void this.pauseCrawling();
                    let t = h()(this.selectorUrlsToBeCrawled).first() || null;
                    if (null === t || !t.length) return;
                    this.runningRequestCount += 1, this.crawledUrlCountAfterSubmit++, this.crawlUrlRow(t, null, null, t => {
                        this.runningRequestCount -= 1, this.crawlNextUrlInQueue()
                    })
                }
        }
        crawlUrlRow(t, e = null, s = null, l = null, o = !1) {
            let r = t.data("urlData") || null,
                n = this.getNewResponseRowElement();
            if (null === r) return n.html(window.kdn.url_data_not_exist), void this.setUrlRowDone(t);
            this.setUrlRowLoading(t), this.updateStatus(), h.a.post(window.ajaxurl, {
                kdn_nonce: h()("#kdn_nonce").val(),
                action: window.pageActionKey,
                data: {
                    tool_type: "save_post",
                    _kdn_tools_site_id: r.siteId,
                    _kdn_tools_post_url: r.url,
                    _kdn_tools_category_id: r.categoryId,
                    _kdn_tools_featured_image_url: r.imageUrl,
                    _kdn_recrawl_if_duplicate: o ? "1" : "0"
                }
            }).done(t => {
                t ? this.setResponseRowHtml(n, t.view) : this.setResponseRowHtml(n, window.kdn.no_result), null !== e && e(t)
            }).fail(t => {
                console.log(t), this.setResponseRowHtml(n, window.kdn.an_error_occurred + ": " + t.responseText), null !== s && s(t)
            }).always(e => {
                t.after(n), t.addClass(this.classHasResponse).addClass(this.classOpen), this.setUrlRowDone(t), this.updateStatus(), null !== l && l(e)
            })
        }
        setUrlRowLoading(t) {
            t.addClass("loading").removeClass("done"), t.find("td.status").html('<span class="dashicons dashicons-update"></span>'), t.find(".button.delete").addClass("hidden"), t.find(".button.repeat").addClass("hidden")
        }
        setUrlRowDone(t) {
            t.removeClass("loading").addClass("done"), t.find("td.status").html('<span class="dashicons dashicons-yes"></span>'), t.find(".button.delete").removeClass("hidden"), t.find(".button.repeat").removeClass("hidden")
        }
        addUrlsToQueueTable(t) {
            let e = h()(this.selectorTableContainerUrlQueue).first(),
                s = e.find(" tbody").first();
            t = t || [];
            for (let e of t) s.append(this.createUrlRow(e));
            this.onUpdateUrlTable(), t.length && (h()('[data-toggle="tooltip"]').tooltip(), flashBackground(e)), this.updateStatus()
        }
        onUpdateUrlTable() {
            let t = h()(this.selectorTableContainerUrlQueue).first(),
                e = h()(this.selectorContainerUrlQueue).find(".default-message").first(),
                s = h()(this.selectorTableUrlQueue).find("tbody tr:not(.hidden)") || null;
            if ((null === s || !s.length) && null === this.beingProcessedCategoryUrlData) return t.addClass("hidden"), e.removeClass("hidden"), void this.continueCrawling();
            t.removeClass("hidden"), e.addClass("hidden"), this.updateStatus()
        }
        createUrlRow(t) {
            let e = this.getNewUrlRowElement();
            if (e.find(".site").text(t.siteName), e.find(".category").text(t.categoryName), t.imageUrl.length) {
                let s = h()("<img/>").attr("src", t.imageUrl),
                    l = h()("<a/>").attr("href", t.imageUrl).attr("target", "_blank").attr("data-toggle", "tooltip").attr("data-placement", "right").attr("data-html", "true").attr("title", s[0].outerHTML);
                l.append(s), e.find(".image").append(l)
            }
            return e.find(".post-url").html('<a target="_blank" href="' + t.url + '">' + t.url + "</a>"), e.data("urlData", t), e
        }
        setResponseRowHtml(t, e) {
            let s = t.find("." + this.classResponse).first();
            return s.html(e), s
        }
        getNewUrlRowElement() {
            return null === this.$urlRowPrototype && (this.$urlRowPrototype = h()(this.selectorTableUrlQueue).find("tr.prototype.url").first()), this.$urlRowPrototype.clone().removeClass("prototype").removeClass("hidden")
        }
        getNewResponseRowElement() {
            return null === this.$responseRowPrototype && (this.$responseRowPrototype = h()(this.selectorTableUrlQueue).find("tr.prototype.response").first()), this.$responseRowPrototype.clone().removeClass("prototype").removeClass("hidden")
        }
        getEnteredUrls() {
            let t = [],
                e = h()(this.selectorForm).first(),
                s = e.serializeObjectNoNull(),
                l = s._kdn_tools_site_id || null,
                o = s._kdn_tools_category_id || null,
                n = this.selectorForm + ' #_kdn_tools_site_id option[value="' + l + '"]',
                a = h()(n).text() || null,
                c = this.selectorForm + ' #_kdn_tools_category_id option[value="' + o + '"]',
                p = h()(c).text() || null;
            if (null === l || null === o) {
                let e = null === l ? this.inputNameSiteId : this.inputNameCategoryId;
                return u.a.getInstance().notifyRegular(h()('label[for="' + e + '"]'), window.kdn.this_is_not_valid, d.a.WARN), t
            }
            let g = s._post_and_featured_image_urls || null;
            if (null !== g) {
                let e, s, n, i = g.length;
                for (let u = 0; u < i; u++) null !== (e = g[u] || null) && (s = e.postUrl || null, n = e.imageUrl || null, null !== s && this.isValidUrl(s) && (null === n || this.isValidUrl(n) || (n = null), t.push(new r(a, l, s, p, o, n))))
            }
            let f = s[this.inputNamePostUrls] || null;
            if (null !== f) {
                let e, s = f.split("\n").map((t, e) => t.trim()),
                    n = s.length;
                for (let i = 0; i < n; i++) null !== (e = s[i] || null) && this.isValidUrl(e) && t.push(new r(a, l, e, p, o, null))
            }
            let w = s[this.inputNameCategoryUrls] || null;
            if (null !== w) {
                w = w.map((t, e) => t.trim());
                for (let t of w) null !== (t = t || null) && this.categoryUrlQueue.push(new i(a, l, t, p, o))
            }
            let C = h()(this.selectorCheckboxClearUrls) || null;
            return null !== C && C.length && C[0].checked && (e.find(".kdn-remove").each((t, e) => {
                h()(e).click()
            }), e.find("textarea").val("").html("")), t
        }
        isValidUrl(t) {
            return null !== (t = t || null) && !!a.a.startsWith(t.toLowerCase(), "http")
        }
        onClickRepeatCrawling(t) {
            t.preventDefault(), t.stopPropagation();
            let e = h()(t.target).closest("tr"),
                s = e.next() || null;
            if (null === (e.data("urlData") || null)) return u.a.getInstance().notifyRegular(e, window.kdn.url_data_not_exist_for_this, d.a.ERROR), void console.log("URL data does not exist for this row.");
            null !== s && s.length && s.hasClass(this.classResponse) ? (s.remove(), e.removeClass(this.classOpen), this.crawlUrlRow(e, null, null, null, !0)) : u.a.getInstance().notifyRegular(e, window.kdn.this_url_not_crawled_yet, d.a.INFO)
        }
        onClickDeleteUrl(t) {
            t.preventDefault();
            let e = h()(t.target).closest("tr"),
                s = e.next() || null;
            null !== s && s.length && s.hasClass(this.classResponse) && s.remove(), e.remove(), this.onUpdateUrlTable()
        }
        getUrlRowResponse(t) {
            let e = t.next() || null;
            return null !== e && e.length && e.hasClass(this.classResponse) ? e : null
        }
        updateStatus() {
            let t = h()(this.selectorStatus),
                e = t.html(),
                s = '<span class="counts">' + h()(this.selectorUrlsDone).length + "/" + h()(this.selectorUrls).length + "</span>",
                l = h()(this.selectorUrlsBeingCrawled);
            if (l.length) {
                let t;
                s += " " + window.kdn.currently_crawling + ": ", l.each((e, l) => {
                    null !== (t = h()(l).data("urlData") || null) && (s += h()("<a/>").attr("href", t.url).attr("target", "_blank").addClass("post-url").append(t.url).attr("style", "display: block;")[0].outerHTML)
                })
            }
            if (null !== this.beingProcessedCategoryUrlData) {
                let t = h()("<a/>").attr("href", this.beingProcessedCategoryUrlData.url).attr("target", "_blank").addClass("category-url").append(this.beingProcessedCategoryUrlData.url);
                s += '<br><span class="dashicons dashicons-update"></span> ' + window.kdn.retrieving_urls_from.format(t[0].outerHTML)
            }
            s !== e && (flashBackground(t), t.html(s))
        }
        getContinueButton() {
            return h()(this.selectorButtonContinue).first()
        }
        getPauseButton() {
            return h()(this.selectorButtonPause).first()
        }
        getTestResultContainer() {
            return h()(this.selectorToolContainerManualCrawl).find(".test-results").first()
        }
        showTestResult(t) {
            this.getTestResultContainer().removeClass("loading").removeClass("hidden").find(".content").html(t)
        }
        pauseCrawling() {
            this.isPaused = !0, this.getContinueButton().removeClass("hidden"), this.getPauseButton().addClass("hidden")
        }
        continueCrawling() {
            this.isPaused = !1, this.getContinueButton().addClass("hidden"), this.getPauseButton().removeClass("hidden"), this.crawlNextUrlInQueue(), this.retrievePostUrlsFromCategoryUrls()
        }
        getMaxPostsToBeCrawled() {
            let t = h()(this.selectorInputMaxPostsToBeCrawled) || null;
            if (null === t) return 0;
            let e = t.val() || 0;
            return 0 === e ? e : (e = parseInt(e.toString())) < 0 ? 0 : e
        }
        getMaxParallelCrawlingCount() {
            let t = h()(this.selectorInputMaxParallelCrawlingCount) || null;
            if (null === t) return 1;
            let e = t.val() || 1;
            return 1 === e ? e : (e = parseInt(e.toString())) < 1 ? 1 : e
        }
        showAllResponses() {
            h()(this.selectorUrlResponses).removeClass("hidden"), h()(this.selectorUrls + "." + this.classHasResponse).addClass(this.classOpen)
        }
        hideAllResponses() {
            h()(this.selectorUrlResponses).addClass("hidden"), h()(this.selectorUrls + "." + this.classHasResponse).removeClass(this.classOpen)
        }
    }
    p.INSTANCE = null
}, , function(t, e, s) {
    "use strict";
    s.r(e),
        function(t) {
            var e = s(25);
            t(function(t) {
                new e.a
            })
        }.call(this, s(1))
}]);