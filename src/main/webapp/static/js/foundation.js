!function (t) {
    "use strict";

    function e(t) {
        if (void 0 === Function.prototype.name) {
            var e = /function\s([^(]{1,})\(/, i = e.exec(t.toString());
            return i && i.length > 1 ? i[1].trim() : ""
        }
        return void 0 === t.prototype ? t.constructor.name : t.prototype.constructor.name
    }

    function i(t) {
        return /true/.test(t) ? !0 : /false/.test(t) ? !1 : isNaN(1 * t) ? t : parseFloat(t)
    }

    function n(t) {
        return t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
    }

    var s = "6.1.1", o = {
        version: s, _plugins: {}, _uuids: [], _activePlugins: {}, rtl: function () {
            return "rtl" === t("html").attr("dir")
        }, plugin: function (t, i) {
            var s = i || e(t), o = n(s);
            this._plugins[o] = this[s] = t
        }, registerPlugin: function (t, i) {
            var s = i ? n(i) : e(t.constructor).toLowerCase();
            t.uuid = this.GetYoDigits(6, s), t.$element.attr("data-" + s) || t.$element.attr("data-" + s, t.uuid), t.$element.data("zfPlugin") || t.$element.data("zfPlugin", t), t.$element.trigger("init.zf." + s), this._uuids.push(t.uuid)
        }, unregisterPlugin: function (t) {
            var i = n(e(t.$element.data("zfPlugin").constructor));
            this._uuids.splice(this._uuids.indexOf(t.uuid), 1), t.$element.removeAttr("data-" + i).removeData("zfPlugin").trigger("destroyed.zf." + i);
            for (var s in t) t[s] = null
        }, reInit: function (e) {
            var i = e instanceof t;
            try {
                if (i) e.each(function () {
                    t(this).data("zfPlugin")._init()
                }); else {
                    var n = typeof e, s = this, o = {
                        object: function (e) {
                            e.forEach(function (e) {
                                t("[data-" + e + "]").foundation("_init")
                            })
                        }, string: function () {
                            t("[data-" + e + "]").foundation("_init")
                        }, undefined: function () {
                            this.object(Object.keys(s._plugins))
                        }
                    };
                    o[n](e)
                }
            } catch (a) {
                console.error(a)
            } finally {
                return e
            }
        }, GetYoDigits: function (t, e) {
            return t = t || 6, Math.round(Math.pow(36, t + 1) - Math.random() * Math.pow(36, t)).toString(36).slice(1) + (e ? "-" + e : "")
        }, reflow: function (e, n) {
            "undefined" == typeof n ? n = Object.keys(this._plugins) : "string" == typeof n && (n = [n]);
            var s = this;
            t.each(n, function (n, o) {
                var a = s._plugins[o], r = t(e).find("[data-" + o + "]").addBack("[data-" + o + "]");
                r.each(function () {
                    var e = t(this), n = {};
                    if (e.data("zfPlugin")) return void console.warn("Tried to initialize " + o + " on an element that already has a Foundation plugin.");
                    if (e.attr("data-options")) {
                        e.attr("data-options").split(";").forEach(function (t, e) {
                            var s = t.split(":").map(function (t) {
                                return t.trim()
                            });
                            s[0] && (n[s[0]] = i(s[1]))
                        })
                    }
                    try {
                        e.data("zfPlugin", new a(t(this), n))
                    } catch (s) {
                        console.error(s)
                    } finally {
                        return
                    }
                })
            })
        }, getFnName: e, transitionend: function (t) {
            var e, i = {
                transition: "transitionend",
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "otransitionend"
            }, n = document.createElement("div");
            for (var s in i) "undefined" != typeof n.style[s] && (e = i[s]);
            return e ? e : (e = setTimeout(function () {
                t.triggerHandler("transitionend", [t])
            }, 1), "transitionend")
        }
    };
    o.util = {
        throttle: function (t, e) {
            var i = null;
            return function () {
                var n = this, s = arguments;
                null === i && (i = setTimeout(function () {
                    t.apply(n, s), i = null
                }, e))
            }
        }
    };
    var a = function (i) {
        var n = typeof i, s = t("meta.foundation-mq"), a = t(".no-js");
        if (s.length || t('<meta class="foundation-mq">').appendTo(document.head), a.length && a.removeClass("no-js"), "undefined" === n) o.MediaQuery._init(), o.reflow(this); else {
            if ("string" !== n) throw new TypeError("We're sorry, '" + n + "' is not a valid parameter. You must use a string representing the method you wish to invoke.");
            var r = Array.prototype.slice.call(arguments, 1), l = this.data("zfPlugin");
            if (void 0 === l || void 0 === l[i]) throw new ReferenceError("We're sorry, '" + i + "' is not an available method for " + (l ? e(l) : "this element") + ".");
            1 === this.length ? l[i].apply(l, r) : this.each(function (e, n) {
                l[i].apply(t(n).data("zfPlugin"), r)
            })
        }
        return this
    };
    window.Foundation = o, t.fn.foundation = a, function () {
        Date.now && window.Date.now || (window.Date.now = Date.now = function () {
            return (new Date).getTime()
        });
        for (var t = ["webkit", "moz"], e = 0; e < t.length && !window.requestAnimationFrame; ++e) {
            var i = t[e];
            window.requestAnimationFrame = window[i + "RequestAnimationFrame"], window.cancelAnimationFrame = window[i + "CancelAnimationFrame"] || window[i + "CancelRequestAnimationFrame"]
        }
        if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
            var n = 0;
            window.requestAnimationFrame = function (t) {
                var e = Date.now(), i = Math.max(n + 16, e);
                return setTimeout(function () {
                    t(n = i)
                }, i - e)
            }, window.cancelAnimationFrame = clearTimeout
        }
        window.performance && window.performance.now || (window.performance = {
            start: Date.now(), now: function () {
                return Date.now() - this.start
            }
        })
    }(), Function.prototype.bind || (Function.prototype.bind = function (t) {
        if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        var e = Array.prototype.slice.call(arguments, 1), i = this, n = function () {
        }, s = function () {
            return i.apply(this instanceof n ? this : t, e.concat(Array.prototype.slice.call(arguments)))
        };
        return this.prototype && (n.prototype = this.prototype), s.prototype = new n, s
    })
}(jQuery), !function (t, e) {
    var i = function (t, e, i, s) {
        var o, a, r, l, d = n(t);
        if (e) {
            var h = n(e);
            a = d.offset.top + d.height <= h.height + h.offset.top, o = d.offset.top >= h.offset.top, r = d.offset.left >= h.offset.left, l = d.offset.left + d.width <= h.width
        } else a = d.offset.top + d.height <= d.windowDims.height + d.windowDims.offset.top, o = d.offset.top >= d.windowDims.offset.top, r = d.offset.left >= d.windowDims.offset.left, l = d.offset.left + d.width <= d.windowDims.width;
        var u = [a, o, r, l];
        return i ? r === l == !0 : s ? o === a == !0 : -1 === u.indexOf(!1)
    }, n = function (t, i) {
        if (t = t.length ? t[0] : t, t === e || t === document) throw new Error("I'm sorry, Dave. I'm afraid I can't do that.");
        var n = t.getBoundingClientRect(), s = t.parentNode.getBoundingClientRect(),
            o = document.body.getBoundingClientRect(), a = e.pageYOffset, r = e.pageXOffset;
        return {
            width: n.width,
            height: n.height,
            offset: {top: n.top + a, left: n.left + r},
            parentDims: {width: s.width, height: s.height, offset: {top: s.top + a, left: s.left + r}},
            windowDims: {width: o.width, height: o.height, offset: {top: a, left: r}}
        }
    }, s = function (t, e, i, s, o, a) {
        var r = n(t), l = e ? n(e) : null;
        switch (i) {
            case"top":
                return {left: l.offset.left, top: l.offset.top - (r.height + s)};
            case"left":
                return {left: l.offset.left - (r.width + o), top: l.offset.top};
            case"right":
                return {left: l.offset.left + l.width + o, top: l.offset.top};
            case"center top":
                return {left: l.offset.left + l.width / 2 - r.width / 2, top: l.offset.top - (r.height + s)};
            case"center bottom":
                return {left: a ? o : l.offset.left + l.width / 2 - r.width / 2, top: l.offset.top + l.height + s};
            case"center left":
                return {left: l.offset.left - (r.width + o), top: l.offset.top + l.height / 2 - r.height / 2};
            case"center right":
                return {left: l.offset.left + l.width + o + 1, top: l.offset.top + l.height / 2 - r.height / 2};
            case"center":
                return {
                    left: r.windowDims.offset.left + r.windowDims.width / 2 - r.width / 2,
                    top: r.windowDims.offset.top + r.windowDims.height / 2 - r.height / 2
                };
            case"reveal":
                return {left: (r.windowDims.width - r.width) / 2, top: r.windowDims.offset.top + s};
            case"reveal full":
                return {left: r.windowDims.offset.left, top: r.windowDims.offset.top};
            default:
                return {left: l.offset.left, top: l.offset.top + l.height + s}
        }
    };
    t.Box = {ImNotTouchingYou: i, GetDimensions: n, GetOffsets: s}
}(window.Foundation, window), !function (t, e) {
    "use strict";
    e.Keyboard = {};
    var i = {
        9: "TAB",
        13: "ENTER",
        27: "ESCAPE",
        32: "SPACE",
        37: "ARROW_LEFT",
        38: "ARROW_UP",
        39: "ARROW_RIGHT",
        40: "ARROW_DOWN"
    }, n = function (t) {
        var e = {};
        for (var i in t) e[t[i]] = t[i];
        return e
    }(i);
    e.Keyboard.keys = n;
    var s = function (t) {
        var e = i[t.which || t.keyCode] || String.fromCharCode(t.which).toUpperCase();
        return t.shiftKey && (e = "SHIFT_" + e), t.ctrlKey && (e = "CTRL_" + e), t.altKey && (e = "ALT_" + e), e
    };
    e.Keyboard.parseKey = s;
    var o = {}, a = function (i, n, a) {
        var r, l, d, h = o[n], u = s(i);
        return h ? (r = "undefined" == typeof h.ltr ? h : e.rtl() ? t.extend({}, h.ltr, h.rtl) : t.extend({}, h.rtl, h.ltr), l = r[u], d = a[l], void(d && "function" == typeof d ? (d.apply(), (a.handled || "function" == typeof a.handled) && a.handled.apply()) : (a.unhandled || "function" == typeof a.unhandled) && a.unhandled.apply())) : console.warn("Component not defined!")
    };
    e.Keyboard.handleKey = a;
    var r = function (e) {
        return e.find("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]").filter(function () {
            return !t(this).is(":visible") || t(this).attr("tabindex") < 0 ? !1 : !0
        })
    };
    e.Keyboard.findFocusable = r;
    var l = function (t, e) {
        o[t] = e
    };
    e.Keyboard.register = l
}(jQuery, window.Foundation), !function (t, e) {
    function i(t) {
        var e = {};
        return "string" != typeof t ? e : (t = t.trim().slice(1, -1)) ? e = t.split("&").reduce(function (t, e) {
            var i = e.replace(/\+/g, " ").split("="), n = i[0], s = i[1];
            return n = decodeURIComponent(n), s = void 0 === s ? null : decodeURIComponent(s), t.hasOwnProperty(n) ? Array.isArray(t[n]) ? t[n].push(s) : t[n] = [t[n], s] : t[n] = s, t
        }, {}) : e
    }

    var n = {
        queries: [], current: "", atLeast: function (t) {
            var e = this.get(t);
            return e ? window.matchMedia(e).matches : !1
        }, get: function (t) {
            for (var e in this.queries) {
                var i = this.queries[e];
                if (t === i.name) return i.value
            }
            return null
        }, _init: function () {
            var e, n = this, s = t(".foundation-mq").css("font-family");
            e = i(s);
            for (var o in e) n.queries.push({name: o, value: "only screen and (min-width: " + e[o] + ")"});
            this.current = this._getCurrentSize(), this._watcher()
        }, _getCurrentSize: function () {
            var t;
            for (var e in this.queries) {
                var i = this.queries[e];
                window.matchMedia(i.value).matches && (t = i)
            }
            return "object" == typeof t ? t.name : t
        }, _watcher: function () {
            var e = this;
            t(window).on("resize.zf.mediaquery", function () {
                var i = e._getCurrentSize();
                i !== e.current && (t(window).trigger("changed.zf.mediaquery", [i, e.current]), e.current = i)
            })
        }
    };
    e.MediaQuery = n, window.matchMedia || (window.matchMedia = function () {
        "use strict";
        var t = window.styleMedia || window.media;
        if (!t) {
            var e = document.createElement("style"), i = document.getElementsByTagName("script")[0], n = null;
            e.type = "text/css", e.id = "matchmediajs-test", i.parentNode.insertBefore(e, i), n = "getComputedStyle" in window && window.getComputedStyle(e, null) || e.currentStyle, t = {
                matchMedium: function (t) {
                    var i = "@media " + t + "{ #matchmediajs-test { width: 1px; } }";
                    return e.styleSheet ? e.styleSheet.cssText = i : e.textContent = i, "1px" === n.width
                }
            }
        }
        return function (e) {
            return {matches: t.matchMedium(e || "all"), media: e || "all"}
        }
    }())
}(jQuery, Foundation), !function (t, e) {
    function i(i, o, a, r) {
        function l() {
            i || o.hide(), d(), r && r.apply(o)
        }

        function d() {
            o[0].style.transitionDuration = 0, o.removeClass(h + " " + u + " " + a)
        }

        if (o = t(o).eq(0), o.length) {
            var h = i ? n[0] : n[1], u = i ? s[0] : s[1];
            d(), o.addClass(a).css("transition", "none"), requestAnimationFrame(function () {
                o.addClass(h), i && o.show()
            }), requestAnimationFrame(function () {
                o[0].offsetWidth, o.css("transition", ""), o.addClass(u)
            }), o.one(e.transitionend(o), l)
        }
    }

    var n = ["mui-enter", "mui-leave"], s = ["mui-enter-active", "mui-leave-active"], o = {
        animateIn: function (t, e, n) {
            i(!0, t, e, n)
        }, animateOut: function (t, e, n) {
            i(!1, t, e, n)
        }
    }, a = function (t, e, i) {
        function n(r) {
            a || (a = window.performance.now()), o = r - a, i.apply(e), t > o ? s = window.requestAnimationFrame(n, e) : (window.cancelAnimationFrame(s), e.trigger("finished.zf.animate", [e]).triggerHandler("finished.zf.animate", [e]))
        }

        var s, o, a = null;
        s = window.requestAnimationFrame(n)
    };
    e.Move = a, e.Motion = o
}(jQuery, Foundation), !function (t, e) {
    "use strict";
    e.Nest = {
        Feather: function (e, i) {
            e.attr("role", "menubar"), i = i || "zf";
            var n = e.find("li").attr({role: "menuitem"}), s = "is-" + i + "-submenu", o = s + "-item",
                a = "is-" + i + "-submenu-parent";
            e.find("a:first").attr("tabindex", 0), n.each(function () {
                var e = t(this), i = e.children("ul");
                i.length && (e.addClass("has-submenu " + a).attr({
                    "aria-haspopup": !0,
                    "aria-selected": !1,
                    "aria-expanded": !1,
                    "aria-label": e.children("a:first").text()
                }), i.addClass("submenu " + s).attr({
                    "data-submenu": "",
                    "aria-hidden": !0,
                    role: "menu"
                })), e.parent("[data-submenu]").length && e.addClass("is-submenu-item " + o)
            })
        }, Burn: function (t, e) {
            var i = (t.find("li").removeAttr("tabindex"), "is-" + e + "-submenu"), n = i + "-item",
                s = "is-" + e + "-submenu-parent";
            t.find("*").removeClass(i + " " + n + " " + s + " has-submenu is-submenu-item submenu is-active").removeAttr("data-submenu").css("display", "")
        }
    }
}(jQuery, window.Foundation), !function (t, e) {
    "use strict";
    var i = function (t, e, i) {
        var n, s, o = this, a = e.duration, r = Object.keys(t.data())[0] || "timer", l = -1;
        this.restart = function () {
            l = -1, clearTimeout(s), this.start()
        }, this.start = function () {
            clearTimeout(s), l = 0 >= l ? a : l, t.data("paused", !1), n = Date.now(), s = setTimeout(function () {
                e.infinite && o.restart(), i()
            }, l), t.trigger("timerstart.zf." + r)
        }, this.pause = function () {
            clearTimeout(s), t.data("paused", !0);
            var e = Date.now();
            l -= e - n, t.trigger("timerpaused.zf." + r)
        }
    }, n = function (e, i) {
        var n = e.length;
        0 === n && i();
        var s = function () {
            n--, 0 === n && i()
        };
        e.each(function () {
            this.complete ? s() : "undefined" != typeof this.naturalWidth && this.naturalWidth > 0 ? s() : t(this).one("load", function () {
                s()
            })
        })
    };
    e.Timer = i, e.onImagesLoaded = n
}(jQuery, window.Foundation), function (t) {
    function e() {
        this.removeEventListener("touchmove", i), this.removeEventListener("touchend", e), d = !1
    }

    function i(i) {
        if (t.spotSwipe.preventDefault && i.preventDefault(), d) {
            var n, s = i.touches[0].pageX, a = (i.touches[0].pageY, o - s);
            l = (new Date).getTime() - r, Math.abs(a) >= t.spotSwipe.moveThreshold && l <= t.spotSwipe.timeThreshold && (n = a > 0 ? "left" : "right"), n && (i.preventDefault(), e.call(this), t(this).trigger("swipe", n).trigger("swipe" + n))
        }
    }

    function n(t) {
        1 == t.touches.length && (o = t.touches[0].pageX, a = t.touches[0].pageY, d = !0, r = (new Date).getTime(), this.addEventListener("touchmove", i, !1), this.addEventListener("touchend", e, !1))
    }

    function s() {
        this.addEventListener && this.addEventListener("touchstart", n, !1)
    }

    t.spotSwipe = {
        version: "1.0.0",
        enabled: "ontouchstart" in document.documentElement,
        preventDefault: !1,
        moveThreshold: 75,
        timeThreshold: 200
    };
    var o, a, r, l, d = !1;
    t.event.special.swipe = {setup: s}, t.each(["left", "up", "down", "right"], function () {
        t.event.special["swipe" + this] = {
            setup: function () {
                t(this).on("swipe", t.noop)
            }
        }
    })
}(jQuery), !function (t) {
    t.fn.addTouch = function () {
        this.each(function (i, n) {
            t(n).bind("touchstart touchmove touchend touchcancel", function () {
                e(event)
            })
        });
        var e = function (t) {
            var e = t.changedTouches, i = e[0],
                n = {touchstart: "mousedown", touchmove: "mousemove", touchend: "mouseup"}, s = n[t.type],
                o = document.createEvent("MouseEvent");
            o.initMouseEvent(s, !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null), i.target.dispatchEvent(o)
        }
    }
}(jQuery), !function (t, e) {
    "use strict";
    e(document).on("click.zf.trigger", "[data-open]", function () {
        var t = e(this).data("open");
        e("#" + t).triggerHandler("open.zf.trigger", [e(this)])
    }), e(document).on("click.zf.trigger", "[data-close]", function () {
        var t = e(this).data("close");
        t ? e("#" + t).triggerHandler("close.zf.trigger", [e(this)]) : e(this).trigger("close.zf.trigger")
    }), e(document).on("click.zf.trigger", "[data-toggle]", function () {
        var t = e(this).data("toggle");
        e("#" + t).triggerHandler("toggle.zf.trigger", [e(this)])
    }), e(document).on("close.zf.trigger", "[data-closable]", function () {
        var i = e(this).data("closable") || "fade-out";
        t.Motion ? t.Motion.animateOut(e(this), i, function () {
            e(this).trigger("closed.zf")
        }) : e(this).fadeOut().trigger("closed.zf")
    });
    var i = function () {
        for (var t = ["WebKit", "Moz", "O", "Ms", ""], e = 0; e < t.length; e++) if (t[e] + "MutationObserver" in window) return window[t[e] + "MutationObserver"];
        return !1
    }(), n = function () {
        r(), o(), a(), s()
    };
    e(window).load(function () {
        n()
    });
    var s = function (t) {
        var i = e("[data-yeti-box]"), n = ["dropdown", "tooltip", "reveal"];
        if (t && ("string" == typeof t ? n.push(t) : "object" == typeof t && "string" == typeof t[0] ? n.concat(t) : console.error("Plugin names must be strings")), i.length) {
            var s = n.map(function (t) {
                return "closeme.zf." + t
            }).join(" ");
            e(window).off(s).on(s, function (t, i) {
                var n = t.namespace.split(".")[0], s = e("[data-" + n + "]").not('[data-yeti-box="' + i + '"]');
                s.each(function () {
                    var t = e(this);
                    t.triggerHandler("close.zf.trigger", [t])
                })
            })
        }
    }, o = function (t) {
        var n, s = e("[data-resize]");
        s.length && e(window).off("resize.zf.trigger").on("resize.zf.trigger", function (o) {
            n && clearTimeout(n), n = setTimeout(function () {
                i || s.each(function () {
                    e(this).triggerHandler("resizeme.zf.trigger")
                }), s.attr("data-events", "resize")
            }, t || 10)
        })
    }, a = function (t) {
        var n, s = e("[data-scroll]");
        s.length && e(window).off("scroll.zf.trigger").on("scroll.zf.trigger", function (o) {
            n && clearTimeout(n), n = setTimeout(function () {
                i || s.each(function () {
                    e(this).triggerHandler("scrollme.zf.trigger")
                }), s.attr("data-events", "scroll")
            }, t || 10)
        })
    }, r = function () {
        if (!i) return !1;
        var t = document.querySelectorAll("[data-resize], [data-scroll], [data-mutate]"), n = function (t) {
            var i = e(t[0].target);
            switch (i.attr("data-events")) {
                case"resize":
                    i.triggerHandler("resizeme.zf.trigger", [i]);
                    break;
                case"scroll":
                    i.triggerHandler("scrollme.zf.trigger", [i, window.pageYOffset]);
                    break;
                default:
                    return !1
            }
        };
        if (t.length) for (var s = 0; s <= t.length - 1; s++) {
            var o = new i(n);
            o.observe(t[s], {
                attributes: !0,
                childList: !1,
                characterData: !1,
                subtree: !1,
                attributeFilter: ["data-events"]
            })
        }
    };
    t.IHearYou = n
}(window.Foundation, window.jQuery), !function (t, e) {
    "use strict";

    function i(n, s) {
        this.$element = n, this.options = e.extend({}, i.defaults, this.$element.data(), s), this._init(), t.registerPlugin(this, "Abide")
    }

    i.defaults = {
        validateOn: "fieldChange",
        labelErrorClass: "is-invalid-label",
        inputErrorClass: "is-invalid-input",
        formErrorSelector: ".form-error",
        formErrorClass: "is-visible",
        liveValidate: !1,
        patterns: {
            alpha: /^[a-zA-Z]+$/,
            alpha_numeric: /^[a-zA-Z0-9]+$/,
            integer: /^[-+]?\d+$/,
            number: /^[-+]?\d*(?:[\.\,]\d+)?$/,
            card: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
            cvv: /^([0-9]){3,4}$/,
            email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
            url: /^(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,
            domain: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,8}$/,
            datetime: /^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,
            date: /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,
            time: /^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,
            dateISO: /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,
            month_day_year: /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,
            day_month_year: /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/,
            color: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
        },
        validators: {
            equalTo: function (t, i, n) {
                return e("#" + t.attr("data-equalto")).val() === t.val()
            }
        }
    }, i.prototype._init = function () {
        this.$inputs = this.$element.find("input, textarea, select").not("[data-abide-ignore]"), this._events()
    }, i.prototype._events = function () {
        var t = this;
        this.$element.off(".abide").on("reset.zf.abide", function (e) {
            t.resetForm()
        }).on("submit.zf.abide", function (e) {
            return t.validateForm()
        }), "fieldChange" === this.options.validateOn && this.$inputs.off("change.zf.abide").on("change.zf.abide", function (i) {
            t.validateInput(e(this))
        }), this.options.liveValidate && this.$inputs.off("input.zf.abide").on("input.zf.abide", function (i) {
            t.validateInput(e(this))
        })
    }, i.prototype._reflow = function () {
        this._init()
    }, i.prototype.requiredCheck = function (t) {
        if (!t.attr("required")) return !0;
        var e = !0;
        switch (t[0].type) {
            case"checkbox":
            case"radio":
                e = t[0].checked;
                break;
            case"select":
            case"select-one":
            case"select-multiple":
                var i = t.find("option:selected");
                i.length && i.val() || (e = !1);
                break;
            default:
                t.val() && t.val().length || (e = !1)
        }
        return e
    }, i.prototype.findFormError = function (t) {
        var e = t.siblings(this.options.formErrorSelector);
        return e.length || (e = t.parent().find(this.options.formErrorSelector)), e
    }, i.prototype.findLabel = function (t) {
        var e = this.$element.find('label[for="' + t[0].id + '"]');
        return e.length ? e : t.closest("label")
    }, i.prototype.addErrorClasses = function (t) {
        var e = this.findLabel(t), i = this.findFormError(t);
        e.length && e.addClass(this.options.labelErrorClass), i.length && i.addClass(this.options.formErrorClass), t.addClass(this.options.inputErrorClass).attr("data-invalid", "")
    }, i.prototype.removeErrorClasses = function (t) {
        var e = this.findLabel(t), i = this.findFormError(t);
        e.length && e.removeClass(this.options.labelErrorClass), i.length && i.removeClass(this.options.formErrorClass), t.removeClass(this.options.inputErrorClass).removeAttr("data-invalid")
    }, i.prototype.validateInput = function (t) {
        var e = this.requiredCheck(t), i = !1, n = !0, s = t.attr("data-validator"), o = !0;
        switch (t[0].type) {
            case"radio":
                i = this.validateRadio(t.attr("name"));
                break;
            case"checkbox":
                i = e;
                break;
            case"select":
            case"select-one":
            case"select-multiple":
                i = e;
                break;
            default:
                i = this.validateText(t)
        }
        s && (n = this.matchValidation(t, s, t.attr("required"))), t.attr("data-equalto") && (o = this.options.validators.equalTo(t));
        var a = -1 === [e, i, n, o].indexOf(!1), r = (a ? "valid" : "invalid") + ".zf.abide";
        return this[a ? "removeErrorClasses" : "addErrorClasses"](t), t.trigger(r, t[0]), a
    }, i.prototype.validateForm = function () {
        var t = [], i = this;
        this.$inputs.each(function () {
            t.push(i.validateInput(e(this)))
        });
        var n = -1 === t.indexOf(!1);
        return this.$element.find("[data-abide-error]").css("display", n ? "none" : "block"), this.$element.trigger((n ? "formvalid" : "forminvalid") + ".zf.abide", [this.$element]), n
    }, i.prototype.validateText = function (t, e) {
        e = e || t.attr("pattern") || t.attr("type");
        var i = t.val();
        return i.length ? this.options.patterns.hasOwnProperty(e) ? this.options.patterns[e].test(i) : e && e !== t.attr("type") ? new RegExp(e).test(i) : !0 : !0
    }, i.prototype.validateRadio = function (t) {
        var i = this.$element.find(':radio[name="' + t + '"]'), n = [], s = this;
        return i.each(function () {
            var t = e(this), i = s.requiredCheck(t);
            n.push(i), i && s.removeErrorClasses(t)
        }), -1 === n.indexOf(!1)
    }, i.prototype.matchValidation = function (t, e, i) {
        var n = this;
        i = i ? !0 : !1;
        var s = e.split(" ").map(function (e) {
            return n.options.validators[e](t, i, t.parent())
        });
        return -1 === s.indexOf(!1)
    }, i.prototype.resetForm = function () {
        var t = this.$element, i = this.options;
        e("." + i.labelErrorClass, t).not("small").removeClass(i.labelErrorClass), e("." + i.inputErrorClass, t).not("small").removeClass(i.inputErrorClass), e(i.formErrorSelector + "." + i.formErrorClass).removeClass(i.formErrorClass), t.find("[data-abide-error]").css("display", "none"), e(":input", t).not(":button, :submit, :reset, :hidden, [data-abide-ignore]").val("").removeAttr("data-invalid"), t.trigger("formreset.zf.abide", [t])
    }, i.prototype.destroy = function () {
        var i = this;
        this.$element.off(".abide").find("[data-abide-error]").css("display", "none"), this.$inputs.off(".abide").each(function () {
            i.removeErrorClasses(e(this))
        }), t.unregisterPlugin(this)
    }, t.plugin(i, "Abide"), "undefined" != typeof module && "undefined" != typeof module.exports && (module.exports = i), "function" == typeof define && define(["foundation"], function () {
        return i
    })
}(Foundation, jQuery), !function (t, e) {
    "use strict";

    function i(n, s) {
        this.$element = n, this.options = t.extend({}, i.defaults, this.$element.data(), s), this._init(), e.registerPlugin(this, "Accordion"), e.Keyboard.register("Accordion", {
            ENTER: "toggle",
            SPACE: "toggle",
            ARROW_DOWN: "next",
            ARROW_UP: "previous"
        })
    }

    i.defaults = {slideSpeed: 250, multiExpand: !1, allowAllClosed: !1}, i.prototype._init = function () {
        this.$element.attr("role", "tablist"), this.$tabs = this.$element.children("li"), 0 == this.$tabs.length && (this.$tabs = this.$element.children("[data-accordion-item]")), this.$tabs.each(function (i, n) {
            var s = t(n), o = s.find("[data-tab-content]"), a = o[0].id || e.GetYoDigits(6, "accordion"),
                r = n.id || a + "-label";
            s.find("a:first").attr({
                "aria-controls": a,
                role: "tab",
                id: r,
                "aria-expanded": !1,
                "aria-selected": !1
            }), o.attr({role: "tabpanel", "aria-labelledby": r, "aria-hidden": !0, id: a})
        });
        var i = this.$element.find(".is-active").children("[data-tab-content]");
        i.length && this.down(i, !0), this._events()
    }, i.prototype._events = function () {
        var i = this;
        this.$tabs.each(function () {
            var n = t(this), s = n.children("[data-tab-content]");
            s.length && n.children("a").off("click.zf.accordion keydown.zf.accordion").on("click.zf.accordion", function (t) {
                t.preventDefault(), n.hasClass("is-active") ? (i.options.allowAllClosed || n.siblings().hasClass("is-active")) && i.up(s) : i.down(s)
            }).on("keydown.zf.accordion", function (t) {
                e.Keyboard.handleKey(t, "Accordion", {
                    toggle: function () {
                        i.toggle(s)
                    }, next: function () {
                        n.next().find("a").focus().trigger("click.zf.accordion")
                    }, previous: function () {
                        n.prev().find("a").focus().trigger("click.zf.accordion")
                    }, handled: function () {
                        t.preventDefault(), t.stopPropagation()
                    }
                })
            })
        })
    }, i.prototype.toggle = function (t) {
        if (t.parent().hasClass("is-active")) {
            if (!this.options.allowAllClosed && !t.parent().siblings().hasClass("is-active")) return;
            this.up(t)
        } else this.down(t)
    }, i.prototype.down = function (e, i) {
        var n = this;
        if (!this.options.multiExpand && !i) {
            var s = this.$element.find(".is-active").children("[data-tab-content]");
            s.length && this.up(s)
        }
        e.attr("aria-hidden", !1).parent("[data-tab-content]").addBack().parent().addClass("is-active"), e.slideDown(n.options.slideSpeed), t("#" + e.attr("aria-labelledby")).attr({
            "aria-expanded": !0,
            "aria-selected": !0
        }), this.$element.trigger("down.zf.accordion", [e])
    }, i.prototype.up = function (e) {
        var i = e.parent().siblings(), n = this,
            s = this.options.multiExpand ? i.hasClass("is-active") : e.parent().hasClass("is-active");
        (this.options.allowAllClosed || s) && (e.slideUp(n.options.slideSpeed), e.attr("aria-hidden", !0).parent().removeClass("is-active"), t("#" + e.attr("aria-labelledby")).attr({
            "aria-expanded": !1,
            "aria-selected": !1
        }), this.$element.trigger("up.zf.accordion", [e]))
    }, i.prototype.destroy = function () {
        this.$element.find("[data-tab-content]").slideUp(0).css("display", ""), this.$element.find("a").off(".zf.accordion"), e.unregisterPlugin(this)
    }, e.plugin(i, "Accordion")
}(jQuery, window.Foundation), !function (t) {
    "use strict";

    function e(i, n) {
        this.$element = i, this.options = t.extend({}, e.defaults, this.$element.data(), n), Foundation.Nest.Feather(this.$element, "accordion"), this._init(), Foundation.registerPlugin(this, "AccordionMenu"), Foundation.Keyboard.register("AccordionMenu", {
            ENTER: "toggle",
            SPACE: "toggle",
            ARROW_RIGHT: "open",
            ARROW_UP: "up",
            ARROW_DOWN: "down",
            ARROW_LEFT: "close",
            ESCAPE: "closeAll",
            TAB: "down",
            SHIFT_TAB: "up"
        })
    }

    e.defaults = {slideSpeed: 250, multiOpen: !0}, e.prototype._init = function () {
        this.$element.find("[data-submenu]").not(".is-active").slideUp(0), this.$element.attr({
            role: "tablist",
            "aria-multiselectable": this.options.multiOpen
        }), this.$menuLinks = this.$element.find(".has-submenu"), this.$menuLinks.each(function () {
            var e = this.id || Foundation.GetYoDigits(6, "acc-menu-link"), i = t(this),
                n = i.children("[data-submenu]"), s = n[0].id || Foundation.GetYoDigits(6, "acc-menu"),
                o = n.hasClass("is-active");
            i.attr({
                "aria-controls": s,
                "aria-expanded": o,
                "aria-selected": !1,
                role: "tab",
                id: e
            }), n.attr({"aria-labelledby": e, "aria-hidden": !o, role: "tabpanel", id: s})
        });
        var e = this.$element.find(".is-active");
        if (e.length) {
            var i = this;
            e.each(function () {
                i.down(t(this))
            })
        }
        this._events()
    }, e.prototype._events = function () {
        var e = this;
        this.$element.find("li").each(function () {
            var i = t(this).children("[data-submenu]");
            i.length && t(this).children("a").off("click.zf.accordionmenu").on("click.zf.accordionmenu", function (t) {
                t.preventDefault(), e.toggle(i)
            })
        }).on("keydown.zf.accordionmenu", function (i) {
            var n, s, o = t(this), a = o.parent("ul").children("li"), r = o.children("[data-submenu]");
            a.each(function (e) {
                return t(this).is(o) ? (n = a.eq(Math.max(0, e - 1)), s = a.eq(Math.min(e + 1, a.length - 1)), t(this).children("[data-submenu]:visible").length && (s = o.find("li:first-child")), t(this).is(":first-child") ? n = o.parents("li").first() : n.children("[data-submenu]:visible").length && (n = n.find("li:last-child")), void(t(this).is(":last-child") && (s = o.parents("li").first().next("li")))) : void 0
            }), Foundation.Keyboard.handleKey(i, "AccordionMenu", {
                open: function () {
                    r.is(":hidden") && (e.down(r), r.find("li").first().focus())
                }, close: function () {
                    r.length && !r.is(":hidden") ? e.up(r) : o.parent("[data-submenu]").length && (e.up(o.parent("[data-submenu]")), o.parents("li").first().focus())
                }, up: function () {
                    n.focus()
                }, down: function () {
                    s.focus()
                }, toggle: function () {
                    o.children("[data-submenu]").length && e.toggle(o.children("[data-submenu]"))
                }, closeAll: function () {
                    e.hideAll()
                }, handled: function () {
                    i.preventDefault(), i.stopImmediatePropagation()
                }
            })
        })
    }, e.prototype.hideAll = function () {
        this.$element.find("[data-submenu]").slideUp(this.options.slideSpeed)
    }, e.prototype.toggle = function (t) {
        t.is(":animated") || (t.is(":hidden") ? this.down(t) : this.up(t))
    }, e.prototype.down = function (t) {
        var e = this;
        this.options.multiOpen || this.up(this.$element.find(".is-active").not(t.parentsUntil(this.$element).add(t))), t.addClass("is-active").attr({"aria-hidden": !1}).parent(".has-submenu").attr({
            "aria-expanded": !0,
            "aria-selected": !0
        }), Foundation.Move(this.options.slideSpeed, t, function () {
            t.slideDown(e.options.slideSpeed)
        }), this.$element.trigger("down.zf.accordionMenu", [t])
    }, e.prototype.up = function (t) {
        var e = this;
        Foundation.Move(this.options.slideSpeed, t, function () {
            t.slideUp(e.options.slideSpeed)
        }), t.attr("aria-hidden", !0).find("[data-submenu]").slideUp(0).attr("aria-hidden", !0).end().parent(".has-submenu").attr({
            "aria-expanded": !1,
            "aria-selected": !1
        }), this.$element.trigger("up.zf.accordionMenu", [t])
    }, e.prototype.destroy = function () {
        this.$element.find("[data-submenu]").slideDown(0).css("display", ""), this.$element.find("a").off("click.zf.accordionMenu"), Foundation.Nest.Burn(this.$element, "accordion"), Foundation.unregisterPlugin(this)
    }, Foundation.plugin(e, "AccordionMenu")
}(jQuery, window.Foundation), !function (t, e) {
    "use strict";

    function i(n, s) {
        this.$element = n, this.options = t.extend({}, i.defaults, this.$element.data(), s), e.Nest.Feather(this.$element, "drilldown"), this._init(), e.registerPlugin(this, "Drilldown"), e.Keyboard.register("Drilldown", {
            ENTER: "open",
            SPACE: "open",
            ARROW_RIGHT: "next",
            ARROW_UP: "up",
            ARROW_DOWN: "down",
            ARROW_LEFT: "previous",
            ESCAPE: "close",
            TAB: "down",
            SHIFT_TAB: "up"
        })
    }

    i.defaults = {
        backButton: '<li class="js-drilldown-back"><a>Back</a></li>',
        wrapper: "<div></div>",
        closeOnClick: !1
    }, i.prototype._init = function () {
        this.$submenuAnchors = this.$element.find("li.has-submenu"), this.$submenus = this.$submenuAnchors.children("[data-submenu]"), this.$menuItems = this.$element.find("li").not(".js-drilldown-back").attr("role", "menuitem"), this._prepareMenu(), this._keyboardEvents()
    }, i.prototype._prepareMenu = function () {
        var e = this;
        this.$submenuAnchors.each(function () {
            var i = t(this), n = i.find("a:first");
            n.data("savedHref", n.attr("href")).removeAttr("href"), i.children("[data-submenu]").attr({
                "aria-hidden": !0,
                tabindex: 0,
                role: "menu"
            }), e._events(i)
        }), this.$submenus.each(function () {
            var i = t(this), n = i.find(".js-drilldown-back");
            n.length || i.prepend(e.options.backButton), e._back(i)
        }), this.$element.parent().hasClass("is-drilldown") || (this.$wrapper = t(this.options.wrapper).addClass("is-drilldown").css(this._getMaxDims()), this.$element.wrap(this.$wrapper))
    }, i.prototype._events = function (e) {
        var i = this;
        e.off("click.zf.drilldown").on("click.zf.drilldown", function (n) {
            if (t(n.target).parentsUntil("ul", "li").hasClass("is-drilldown-submenu-parent") && (n.stopImmediatePropagation(), n.preventDefault()), i._show(e), i.options.closeOnClick) {
                var s = t("body").not(i.$wrapper);
                s.off(".zf.drilldown").on("click.zf.drilldown", function (t) {
                    t.preventDefault(), i._hideAll(), s.off(".zf.drilldown")
                })
            }
        })
    }, i.prototype._keyboardEvents = function () {
        var i = this;
        this.$menuItems.add(this.$element.find(".js-drilldown-back")).on("keydown.zf.drilldown", function (n) {
            var s, o, a = t(this), r = a.parent("ul").children("li");
            r.each(function (e) {
                return t(this).is(a) ? (s = r.eq(Math.max(0, e - 1)), void(o = r.eq(Math.min(e + 1, r.length - 1)))) : void 0
            }), e.Keyboard.handleKey(n, "Drilldown", {
                next: function () {
                    a.is(i.$submenuAnchors) && (i._show(a), a.on(e.transitionend(a), function () {
                        a.find("ul li").filter(i.$menuItems).first().focus()
                    }))
                }, previous: function () {
                    i._hide(a.parent("ul")), a.parent("ul").on(e.transitionend(a), function () {
                        setTimeout(function () {
                            a.parent("ul").parent("li").focus()
                        }, 1)
                    })
                }, up: function () {
                    s.focus()
                }, down: function () {
                    o.focus()
                }, close: function () {
                    i._back()
                }, open: function () {
                    a.is(i.$menuItems) ? a.is(i.$submenuAnchors) && (i._show(a), setTimeout(function () {
                        a.find("ul li").filter(i.$menuItems).first().focus()
                    }, 1)) : (i._hide(a.parent("ul")), setTimeout(function () {
                        a.parent("ul").parent("li").focus()
                    }, 1))
                }, handled: function () {
                    n.preventDefault(), n.stopImmediatePropagation()
                }
            })
        })
    }, i.prototype._hideAll = function () {
        var t = this.$element.find(".is-drilldown-sub.is-active").addClass("is-closing");
        t.one(e.transitionend(t), function (e) {
            t.removeClass("is-active is-closing")
        }), this.$element.trigger("closed.zf.drilldown")
    }, i.prototype._back = function (t) {
        var e = this;
        t.off("click.zf.drilldown"), t.children(".js-drilldown-back").on("click.zf.drilldown", function (i) {
            i.stopImmediatePropagation(), e._hide(t)
        })
    }, i.prototype._menuLinkEvents = function () {
        var t = this;
        this.$menuItems.not(".has-submenu").off("click.zf.drilldown").on("click.zf.drilldown", function (e) {
            setTimeout(function () {
                t._hideAll()
            }, 0)
        })
    }, i.prototype._show = function (t) {
        t.children("[data-submenu]").addClass("is-active"), this.$element.trigger("open.zf.drilldown", [t])
    }, i.prototype._hide = function (t) {
        t.addClass("is-closing").one(e.transitionend(t), function () {
            t.removeClass("is-active is-closing")
        }), t.trigger("hide.zf.drilldown", [t])
    }, i.prototype._getMaxDims = function () {
        var e = 0, i = {};
        return this.$submenus.add(this.$element).each(function () {
            var i = t(this).children("li").length;
            e = i > e ? i : e
        }), i.height = e * this.$menuItems[0].getBoundingClientRect().height + "px", i.width = this.$element[0].getBoundingClientRect().width + "px", i
    }, i.prototype.destroy = function () {
        this._hideAll(), e.Nest.Burn(this.$element, "drilldown"), this.$element.unwrap().find(".js-drilldown-back").remove().end().find(".is-active, .is-closing, .is-drilldown-sub").removeClass("is-active is-closing is-drilldown-sub").end().find("[data-submenu]").removeAttr("aria-hidden tabindex role").off(".zf.drilldown").end().off("zf.drilldown"), this.$element.find("a").each(function () {
            var e = t(this);
            e.data("savedHref") && e.attr("href", e.data("savedHref")).removeData("savedHref")
        }), e.unregisterPlugin(this)
    }, e.plugin(i, "Drilldown")
}(jQuery, window.Foundation), !function (t, e) {
    "use strict";

    function i(n, s) {
        this.$element = n, this.options = t.extend({}, i.defaults, this.$element.data(), s), this._init(), e.registerPlugin(this, "Dropdown"), e.Keyboard.register("Dropdown", {
            ENTER: "open",
            SPACE: "open",
            ESCAPE: "close",
            TAB: "tab_forward",
            SHIFT_TAB: "tab_backward"
        })
    }

    i.defaults = {
        hoverDelay: 250,
        hover: !1,
        hoverPane: !1,
        vOffset: 1,
        hOffset: 1,
        positionClass: "",
        trapFocus: !1,
        autoFocus: !1,
        closeOnClick: !1
    }, i.prototype._init = function () {
        var i = this.$element.attr("id");
        this.$anchor = t('[data-toggle="' + i + '"]') || t('[data-open="' + i + '"]'), this.$anchor.attr({
            "aria-controls": i,
            "data-is-focus": !1,
            "data-yeti-box": i,
            "aria-haspopup": !0,
            "aria-expanded": !1
        }), this.options.positionClass = this.getPositionClass(), this.counter = 4, this.usedPositions = [], this.$element.attr({
            "aria-hidden": "true",
            "data-yeti-box": i,
            "data-resize": i,
            "aria-labelledby": this.$anchor[0].id || e.GetYoDigits(6, "dd-anchor")
        }), this._events()
    }, i.prototype.getPositionClass = function () {
        var t = this.$element[0].className.match(/(top|left|right)/g);
        return t = t ? t[0] : ""
    }, i.prototype._reposition = function (t) {
        this.usedPositions.push(t ? t : "bottom"), !t && this.usedPositions.indexOf("top") < 0 ? this.$element.addClass("top") : "top" === t && this.usedPositions.indexOf("bottom") < 0 ? this.$element.removeClass(t) : "left" === t && this.usedPositions.indexOf("right") < 0 ? this.$element.removeClass(t).addClass("right") : "right" === t && this.usedPositions.indexOf("left") < 0 ? this.$element.removeClass(t).addClass("left") : !t && this.usedPositions.indexOf("top") > -1 && this.usedPositions.indexOf("left") < 0 ? this.$element.addClass("left") : "top" === t && this.usedPositions.indexOf("bottom") > -1 && this.usedPositions.indexOf("left") < 0 ? this.$element.removeClass(t).addClass("left") : "left" === t && this.usedPositions.indexOf("right") > -1 && this.usedPositions.indexOf("bottom") < 0 ? this.$element.removeClass(t) : "right" === t && this.usedPositions.indexOf("left") > -1 && this.usedPositions.indexOf("bottom") < 0 ? this.$element.removeClass(t) : this.$element.removeClass(t), this.classChanged = !0, this.counter--
    }, i.prototype._setPosition = function () {
        if ("false" === this.$anchor.attr("aria-expanded")) return !1;
        var t = this.getPositionClass(), i = e.Box.GetDimensions(this.$element),
            n = (e.Box.GetDimensions(this.$anchor), "left" === t ? "left" : "right" === t ? "left" : "top"),
            s = "top" === n ? "height" : "width";
        "height" === s ? this.options.vOffset : this.options.hOffset;
        if (i.width >= i.windowDims.width || !this.counter && !e.Box.ImNotTouchingYou(this.$element)) return this.$element.offset(e.Box.GetOffsets(this.$element, this.$anchor, "center bottom", this.options.vOffset, this.options.hOffset, !0)).css({
            width: i.windowDims.width - 2 * this.options.hOffset,
            height: "auto"
        }), this.classChanged = !0, !1;
        for (this.$element.offset(e.Box.GetOffsets(this.$element, this.$anchor, t, this.options.vOffset, this.options.hOffset)); !e.Box.ImNotTouchingYou(this.$element) && this.counter;) this._reposition(t), this._setPosition()
    }, i.prototype._events = function () {
        var i = this;
        this.$element.on({
            "open.zf.trigger": this.open.bind(this),
            "close.zf.trigger": this.close.bind(this),
            "toggle.zf.trigger": this.toggle.bind(this),
            "resizeme.zf.trigger": this._setPosition.bind(this)
        }), this.options.hover && (this.$anchor.off("mouseenter.zf.dropdown mouseleave.zf.dropdown").on("mouseenter.zf.dropdown", function () {
            clearTimeout(i.timeout), i.timeout = setTimeout(function () {
                i.open(), i.$anchor.data("hover", !0)
            }, i.options.hoverDelay)
        }).on("mouseleave.zf.dropdown", function () {
            clearTimeout(i.timeout), i.timeout = setTimeout(function () {
                i.close(), i.$anchor.data("hover", !1)
            }, i.options.hoverDelay)
        }), this.options.hoverPane && this.$element.off("mouseenter.zf.dropdown mouseleave.zf.dropdown").on("mouseenter.zf.dropdown", function () {
            clearTimeout(i.timeout)
        }).on("mouseleave.zf.dropdown", function () {
            clearTimeout(i.timeout), i.timeout = setTimeout(function () {
                i.close(), i.$anchor.data("hover", !1)
            }, i.options.hoverDelay)
        })), this.$anchor.add(this.$element).on("keydown.zf.dropdown", function (n) {
            var s = t(this), o = e.Keyboard.findFocusable(i.$element);
            e.Keyboard.handleKey(n, "Dropdown", {
                tab_forward: function () {
                    i.$element.find(":focus").is(o.eq(-1)) && (i.options.trapFocus ? (o.eq(0).focus(), n.preventDefault()) : i.close())
                }, tab_backward: function () {
                    (i.$element.find(":focus").is(o.eq(0)) || i.$element.is(":focus")) && (i.options.trapFocus ? (o.eq(-1).focus(), n.preventDefault()) : i.close())
                }, open: function () {
                    s.is(i.$anchor) && (i.open(), i.$element.attr("tabindex", -1).focus(), n.preventDefault())
                }, close: function () {
                    i.close(), i.$anchor.focus()
                }
            })
        })
    }, i.prototype._addBodyHandler = function () {
        var e = t(document.body).not(this.$element), i = this;
        e.off("click.zf.dropdown").on("click.zf.dropdown", function (t) {
            i.$anchor.is(t.target) || i.$anchor.find(t.target).length || i.$element.find(t.target).length || (i.close(), e.off("click.zf.dropdown"))
        })
    }, i.prototype.open = function () {
        if (this.$element.trigger("closeme.zf.dropdown", this.$element.attr("id")), this.$anchor.addClass("hover").attr({"aria-expanded": !0}), this._setPosition(), this.$element.addClass("is-open").attr({"aria-hidden": !1}), this.options.autoFocus) {
            var t = e.Keyboard.findFocusable(this.$element);
            t.length && t.eq(0).focus()
        }
        this.options.closeOnClick && this._addBodyHandler(), this.$element.trigger("show.zf.dropdown", [this.$element])
    }, i.prototype.close = function () {
        if (!this.$element.hasClass("is-open")) return !1;
        if (this.$element.removeClass("is-open").attr({"aria-hidden": !0}), this.$anchor.removeClass("hover").attr("aria-expanded", !1), this.classChanged) {
            var t = this.getPositionClass();
            t && this.$element.removeClass(t), this.$element.addClass(this.options.positionClass).css({
                height: "",
                width: ""
            }), this.classChanged = !1, this.counter = 4, this.usedPositions.length = 0
        }
        this.$element.trigger("hide.zf.dropdown", [this.$element])
    }, i.prototype.toggle = function () {
        if (this.$element.hasClass("is-open")) {
            if (this.$anchor.data("hover")) return;
            this.close()
        } else this.open()
    }, i.prototype.destroy = function () {
        this.$element.off(".zf.trigger").hide(), this.$anchor.off(".zf.dropdown"), e.unregisterPlugin(this)
    }, e.plugin(i, "Dropdown")
}(jQuery, window.Foundation), !function (t, e) {
    "use strict";

    function i(n, s) {
        this.$element = n, this.options = t.extend({}, i.defaults, this.$element.data(), s), e.Nest.Feather(this.$element, "dropdown"), this._init(), e.registerPlugin(this, "DropdownMenu"), e.Keyboard.register("DropdownMenu", {
            ENTER: "open",
            SPACE: "open",
            ARROW_RIGHT: "next",
            ARROW_UP: "up",
            ARROW_DOWN: "down",
            ARROW_LEFT: "previous",
            ESCAPE: "close"
        })
    }

    i.defaults = {
        disableHover: !1,
        autoclose: !0,
        hoverDelay: 50,
        clickOpen: !1,
        closingTime: 500,
        alignment: "left",
        closeOnClick: !0,
        verticalClass: "vertical",
        rightClass: "align-right",
        forceFollow: !0
    }, i.prototype._init = function () {
        var t = this.$element.find("li.is-dropdown-submenu-parent");
        this.$element.children(".is-dropdown-submenu-parent").children(".is-dropdown-submenu").addClass("first-sub"), this.$menuItems = this.$element.find('[role="menuitem"]'), this.$tabs = this.$element.children('[role="menuitem"]'), this.isVert = this.$element.hasClass(this.options.verticalClass), this.$tabs.find("ul.is-dropdown-submenu").addClass(this.options.verticalClass), this.$element.hasClass(this.options.rightClass) || "right" === this.options.alignment ? (this.options.alignment = "right", t.addClass("is-left-arrow opens-left")) : t.addClass("is-right-arrow opens-right"), this.isVert || this.$tabs.filter(".is-dropdown-submenu-parent").removeClass("is-right-arrow is-left-arrow opens-right opens-left").addClass("is-down-arrow"), this.changed = !1, this._events()
    }, i.prototype._events = function () {
        var i, n = this, s = "ontouchstart" in window || "undefined" != typeof window.ontouchstart,
            o = "is-dropdown-submenu-parent";
        (this.options.clickOpen || s) && this.$menuItems.on("click.zf.dropdownmenu touchstart.zf.dropdownmenu", function (e) {
            var i = t(e.target).parentsUntil("ul", "." + o), a = i.hasClass(o), r = "true" === i.attr("data-is-click");
            i.children(".is-dropdown-submenu");
            if (a) if (r) {
                if (!n.options.closeOnClick || !n.options.clickOpen && !s || n.options.forceFollow && s) return;
                e.stopImmediatePropagation(), e.preventDefault(), n._hide(i)
            } else e.preventDefault(), e.stopImmediatePropagation(), n._show(i.children(".is-dropdown-submenu")), i.add(i.parentsUntil(n.$element, "." + o)).attr("data-is-click", !0)
        }), this.options.disableHover || this.$menuItems.on("mouseenter.zf.dropdownmenu", function (e) {
            e.stopImmediatePropagation();
            var s = t(this), a = s.hasClass(o);
            a && (clearTimeout(i), i = setTimeout(function () {
                n._show(s.children(".is-dropdown-submenu"))
            }, n.options.hoverDelay))
        }).on("mouseleave.zf.dropdownmenu", function (e) {
            var s = t(this), a = s.hasClass(o);
            if (a && n.options.autoclose) {
                if ("true" === s.attr("data-is-click") && n.options.clickOpen) return !1;
                i = setTimeout(function () {
                    n._hide(s)
                }, n.options.closingTime)
            }
        }), this.$menuItems.on("keydown.zf.dropdownmenu", function (i) {
            var s, o, a = t(i.target).parentsUntil("ul", '[role="menuitem"]'), r = n.$tabs.index(a) > -1,
                l = r ? n.$tabs : a.siblings("li").add(a);
            l.each(function (e) {
                return t(this).is(a) ? (s = l.eq(e - 1), void(o = l.eq(e + 1))) : void 0
            });
            var d = function () {
                a.is(":last-child") || o.children("a:first").focus()
            }, h = function () {
                s.children("a:first").focus()
            }, u = function () {
                var t = a.children("ul.is-dropdown-submenu");
                t.length && (n._show(t), a.find("li > a:first").focus())
            }, f = function () {
                var t = a.parent("ul").parent("li");
                t.children("a:first").focus(), n._hide(t)
            }, c = {
                open: u, close: function () {
                    n._hide(n.$element), n.$menuItems.find("a:first").focus()
                }, handled: function () {
                    i.preventDefault(), i.stopImmediatePropagation()
                }
            };
            r ? n.vertical ? "left" === n.options.alignment ? t.extend(c, {
                down: d,
                up: h,
                next: u,
                previous: f
            }) : t.extend(c, {down: d, up: h, next: f, previous: u}) : t.extend(c, {
                next: d,
                previous: h,
                down: u,
                up: f
            }) : "left" === n.options.alignment ? t.extend(c, {
                next: u,
                previous: f,
                down: d,
                up: h
            }) : t.extend(c, {next: f, previous: u, down: d, up: h}), e.Keyboard.handleKey(i, "DropdownMenu", c)
        })
    }, i.prototype._addBodyHandler = function () {
        var e = t(document.body), i = this;
        e.off("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu").on("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu", function (t) {
            var n = i.$element.find(t.target);
            n.length || (i._hide(), e.off("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu"))
        })
    }, i.prototype._show = function (i) {
        var n = this.$tabs.index(this.$tabs.filter(function (e, n) {
            return t(n).find(i).length > 0
        })), s = i.parent("li.is-dropdown-submenu-parent").siblings("li.is-dropdown-submenu-parent");
        this._hide(s, n), i.css("visibility", "hidden").addClass("js-dropdown-active").attr({"aria-hidden": !1}).parent("li.is-dropdown-submenu-parent").addClass("is-active").attr({
            "aria-selected": !0,
            "aria-expanded": !0
        });
        var o = e.Box.ImNotTouchingYou(i, null, !0);
        if (!o) {
            var a = "left" === this.options.alignment ? "-right" : "-left", r = i.parent(".is-dropdown-submenu-parent");
            r.removeClass("opens" + a).addClass("opens-" + this.options.alignment), o = e.Box.ImNotTouchingYou(i, null, !0), o || r.removeClass("opens-" + this.options.alignment).addClass("opens-inner"), this.changed = !0
        }
        i.css("visibility", ""), this.options.closeOnClick && this._addBodyHandler(), this.$element.trigger("show.zf.dropdownmenu", [i])
    }, i.prototype._hide = function (t, e) {
        var i;
        i = t && t.length ? t : void 0 !== e ? this.$tabs.not(function (t, i) {
            return t === e
        }) : this.$element;
        var n = i.hasClass("is-active") || i.find(".is-active").length > 0;
        if (n) {
            if (i.find("li.is-active").add(i).attr({
                "aria-selected": !1,
                "aria-expanded": !1,
                "data-is-click": !1
            }).removeClass("is-active"), i.find("ul.js-dropdown-active").attr({"aria-hidden": !0}).removeClass("js-dropdown-active"), this.changed || i.find("opens-inner").length) {
                var s = "left" === this.options.alignment ? "right" : "left";
                i.find("li.is-dropdown-submenu-parent").add(i).removeClass("opens-inner opens-" + this.options.alignment).addClass("opens-" + s), this.changed = !1
            }
            this.$element.trigger("hide.zf.dropdownmenu", [i])
        }
    }, i.prototype.destroy = function () {
        this.$menuItems.off(".zf.dropdownmenu").removeAttr("data-is-click").removeClass("is-right-arrow is-left-arrow is-down-arrow opens-right opens-left opens-inner"), e.Nest.Burn(this.$element, "dropdown"), e.unregisterPlugin(this)
    }, e.plugin(i, "DropdownMenu")
}(jQuery, window.Foundation), !function (t, e) {
    "use strict";

    function i(n, s) {
        this.$element = n, this.options = e.extend({}, i.defaults, this.$element.data(), s), this._init(), t.registerPlugin(this, "Equalizer")
    }

    i.defaults = {equalizeOnStack: !0, equalizeByRow: !1, equalizeOn: ""}, i.prototype._init = function () {
        var i = this.$element.attr("data-equalizer") || "",
            n = this.$element.find('[data-equalizer-watch="' + i + '"]');
        this.$watched = n.length ? n : this.$element.find("[data-equalizer-watch]"), this.$element.attr("data-resize", i || t.GetYoDigits(6, "eq")), this.hasNested = this.$element.find("[data-equalizer]").length > 0, this.isNested = this.$element.parentsUntil(document.body, "[data-equalizer]").length > 0, this.isOn = !1;
        var s, o = this.$element.find("img");
        this.options.equalizeOn ? (s = this._checkMQ(), e(window).on("changed.zf.mediaquery", this._checkMQ.bind(this))) : this._events(), (void 0 !== s && s === !1 || void 0 === s) && (o.length ? t.onImagesLoaded(o, this._reflow.bind(this)) : this._reflow())
    }, i.prototype._pauseEvents = function () {
        this.isOn = !1, this.$element.off(".zf.equalizer resizeme.zf.trigger")
    }, i.prototype._events = function () {
        var t = this;
        this._pauseEvents(), this.hasNested ? this.$element.on("postequalized.zf.equalizer", function (e) {
            e.target !== t.$element[0] && t._reflow()
        }) : this.$element.on("resizeme.zf.trigger", this._reflow.bind(this)), this.isOn = !0
    }, i.prototype._checkMQ = function () {
        var e = !t.MediaQuery.atLeast(this.options.equalizeOn);
        return e ? this.isOn && (this._pauseEvents(), this.$watched.css("height", "auto")) : this.isOn || this._events(), e
    }, i.prototype._killswitch = function () {
    }, i.prototype._reflow = function () {
        return !this.options.equalizeOnStack && this._isStacked() ? (this.$watched.css("height", "auto"), !1) : void(this.options.equalizeByRow ? this.getHeightsByRow(this.applyHeightByRow.bind(this)) : this.getHeights(this.applyHeight.bind(this)))
    }, i.prototype._isStacked = function () {
        return this.$watched[0].offsetTop !== this.$watched[1].offsetTop
    }, i.prototype.getHeights = function (t) {
        for (var e = [], i = 0, n = this.$watched.length; n > i; i++) this.$watched[i].style.height = "auto", e.push(this.$watched[i].offsetHeight);
        t(e)
    }, i.prototype.getHeightsByRow = function (t) {
        var i = this.$watched.first().offset().top, n = [], s = 0;
        n[s] = [];
        for (var o = 0, a = this.$watched.length; a > o; o++) {
            this.$watched[o].style.height = "auto";
            var r = e(this.$watched[o]).offset().top;
            r != i && (s++, n[s] = [], i = r), n[s].push([this.$watched[o], this.$watched[o].offsetHeight])
        }
        for (var o = 0, a = n.length; a > o; o++) {
            var l = e(n[o]).map(function () {
                return this[1]
            }).get(), d = Math.max.apply(null, l);
            n[o].push(d)
        }
        t(n)
    }, i.prototype.applyHeight = function (t) {
        var e = Math.max.apply(null, t);
        this.$element.trigger("preequalized.zf.equalizer"), this.$watched.css("height", e), this.$element.trigger("postequalized.zf.equalizer")
    }, i.prototype.applyHeightByRow = function (t) {
        this.$element.trigger("preequalized.zf.equalizer");
        for (var i = 0, n = t.length; n > i; i++) {
            var s = t[i].length, o = t[i][s - 1];
            if (2 >= s) e(t[i][0][0]).css({height: "auto"}); else {
                this.$element.trigger("preequalizedrow.zf.equalizer");
                for (var a = 0, r = s - 1; r > a; a++) e(t[i][a][0]).css({height: o});
                this.$element.trigger("postequalizedrow.zf.equalizer")
            }
        }
        this.$element.trigger("postequalized.zf.equalizer")
    }, i.prototype.destroy = function () {
        this._pauseEvents(), this.$watched.css("height", "auto"), t.unregisterPlugin(this)
    }, t.plugin(i, "Equalizer"), "undefined" != typeof module && "undefined" != typeof module.exports && (module.exports = i), "function" == typeof define && define(["foundation"], function () {
        return i
    })
}(Foundation, jQuery), !function (t, e) {
    "use strict";

    function i(n, s) {
        this.$element = n, this.options = e.extend({}, i.defaults, s), this.rules = [], this.currentPath = "", this._init(), this._events(), t.registerPlugin(this, "Interchange")
    }

    i.defaults = {rules: null}, i.SPECIAL_QUERIES = {
        landscape: "screen and (orientation: landscape)",
        portrait: "screen and (orientation: portrait)",
        retina: "only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx)"
    }, i.prototype._init = function () {
        this._addBreakpoints(), this._generateRules(), this._reflow()
    }, i.prototype._events = function () {
        e(window).on("resize.zf.interchange", t.util.throttle(this._reflow.bind(this), 50))
    }, i.prototype._reflow = function () {
        var t;
        for (var e in this.rules) {
            var i = this.rules[e];
            window.matchMedia(i.query).matches && (t = i)
        }
        t && this.replace(t.path)
    }, i.prototype._addBreakpoints = function () {
        for (var e in t.MediaQuery.queries) {
            var n = t.MediaQuery.queries[e];
            i.SPECIAL_QUERIES[n.name] = n.value
        }
    }, i.prototype._generateRules = function () {
        var t, e = [];
        t = this.options.rules ? this.options.rules : this.$element.data("interchange").match(/\[.*?\]/g);
        for (var n in t) {
            var s = t[n].slice(1, -1).split(", "), o = s.slice(0, -1).join(""), a = s[s.length - 1];
            i.SPECIAL_QUERIES[a] && (a = i.SPECIAL_QUERIES[a]), e.push({path: o, query: a})
        }
        this.rules = e
    }, i.prototype.replace = function (t) {
        if (this.currentPath !== t) {
            var i = this;
            "IMG" === this.$element[0].nodeName ? this.$element.attr("src", t).load(function () {
                i.currentPath = t
            }) : t.match(/\.(gif|jpg|jpeg|tiff|png)([?#].*)?/i) ? this.$element.css({"background-image": "url(" + t + ")"}) : e.get(t, function (n) {
                i.$element.html(n), e(n).foundation(), i.currentPath = t
            }), this.$element.trigger("replaced.zf.interchange")
        }
    }, i.prototype.destroy = function () {
    }, t.plugin(i, "Interchange"), "undefined" != typeof module && "undefined" != typeof module.exports && (module.exports = i), "function" == typeof define && define(["foundation"], function () {
        return i
    })
}(Foundation, jQuery), !function (t, e) {
    "use strict";

    function i(n, s) {
        this.$element = n, this.options = e.extend({}, i.defaults, this.$element.data(), s), this._init(), t.registerPlugin(this, "Magellan")
    }

    i.defaults = {
        animationDuration: 500,
        animationEasing: "linear",
        threshold: 50,
        activeClass: "active",
        deepLinking: !1,
        barOffset: 0
    }, i.prototype._init = function () {
        var i = this.$element[0].id || t.GetYoDigits(6, "magellan");
        this.$targets = e("[data-magellan-target]"), this.$links = this.$element.find("a"), this.$element.attr({
            "data-resize": i,
            "data-scroll": i,
            id: i
        }), this.$active = e(), this.scrollPos = parseInt(window.pageYOffset, 10), this._events()
    }, i.prototype.calcPoints = function () {
        var t = this, i = document.body, n = document.documentElement;
        this.points = [], this.winHeight = Math.round(Math.max(window.innerHeight, n.clientHeight)), this.docHeight = Math.round(Math.max(i.scrollHeight, i.offsetHeight, n.clientHeight, n.scrollHeight, n.offsetHeight)), this.$targets.each(function () {
            var i = e(this), n = Math.round(i.offset().top - t.options.threshold);
            i.targetPoint = n, t.points.push(n)
        })
    }, i.prototype._events = function () {
        var t = this, i = e("html, body"),
            n = {duration: t.options.animationDuration, easing: t.options.animationEasing};
        e(window).one("load", function () {
            t.calcPoints(), t._updateActive()
        }), this.$element.on({
            "resizeme.zf.trigger": this.reflow.bind(this),
            "scrollme.zf.trigger": this._updateActive.bind(this)
        }).on("click.zf.magellan", 'a[href^="#"]', function (s) {
            s.preventDefault();
            var o = this.getAttribute("href"), a = e(o).offset().top - t.options.threshold / 2 - t.options.barOffset;
            i.stop(!0).animate({scrollTop: a}, n)
        })
    }, i.prototype.reflow = function () {
        this.calcPoints(), this._updateActive()
    }, i.prototype._updateActive = function () {
        var t, e = parseInt(window.pageYOffset, 10);
        if (e + this.winHeight === this.docHeight) t = this.points.length - 1; else if (e < this.points[0]) t = 0; else {
            var i = this.scrollPos < e, n = this, s = this.points.filter(function (t, s) {
                return i ? e >= t : t - n.options.threshold <= e
            });
            t = s.length ? s.length - 1 : 0
        }
        if (this.$active.removeClass(this.options.activeClass), this.$active = this.$links.eq(t).addClass(this.options.activeClass), this.options.deepLinking) {
            var o = this.$active[0].getAttribute("href");
            window.history.pushState ? window.history.pushState(null, null, o) : window.location.hash = o
        }
        this.scrollPos = e, this.$element.trigger("update.zf.magellan", [this.$active])
    }, i.prototype.destroy = function () {
        if (this.$element.off(".zf.trigger .zf.magellan").find("." + this.options.activeClass).removeClass(this.options.activeClass), this.options.deepLinking) {
            var e = this.$active[0].getAttribute("href");
            window.location.hash.replace(e, "")
        }
        t.unregisterPlugin(this)
    }, t.plugin(i, "Magellan"), "undefined" != typeof module && "undefined" != typeof module.exports && (module.exports = i), "function" == typeof define && define(["foundation"], function () {
        return i
    })
}(Foundation, jQuery), !function (t, e) {
    "use strict";

    function i(n, s) {
        this.$element = n, this.options = t.extend({}, i.defaults, this.$element.data(), s), this.$lastTrigger = t(), this._init(), this._events(), e.registerPlugin(this, "OffCanvas")
    }

    i.defaults = {
        closeOnClick: !0,
        transitionTime: 0,
        position: "left",
        forceTop: !0,
        isRevealed: !1,
        revealOn: null,
        autoFocus: !0,
        revealClass: "reveal-for-",
        trapFocus: !1
    }, i.prototype._init = function () {
        var e = this.$element.attr("id");
        if (this.$element.attr("aria-hidden", "true"), t(document).find('[data-open="' + e + '"], [data-close="' + e + '"], [data-toggle="' + e + '"]').attr("aria-expanded", "false").attr("aria-controls", e), this.options.closeOnClick) if (t(".js-off-canvas-exit").length) this.$exiter = t(".js-off-canvas-exit"); else {
            var i = document.createElement("div");
            i.setAttribute("class", "js-off-canvas-exit"), t("[data-off-canvas-content]").append(i), this.$exiter = t(i)
        }
        this.options.isRevealed = this.options.isRevealed || new RegExp(this.options.revealClass, "g").test(this.$element[0].className), this.options.isRevealed && (this.options.revealOn = this.options.revealOn || this.$element[0].className.match(/(reveal-for-medium|reveal-for-large)/g)[0].split("-")[2], this._setMQChecker()), this.options.transitionTime || (this.options.transitionTime = 1e3 * parseFloat(window.getComputedStyle(t("[data-off-canvas-wrapper]")[0]).transitionDuration))
    }, i.prototype._events = function () {
        if (this.$element.off(".zf.trigger .zf.offcanvas").on({
            "open.zf.trigger": this.open.bind(this),
            "close.zf.trigger": this.close.bind(this),
            "toggle.zf.trigger": this.toggle.bind(this),
            "keydown.zf.offcanvas": this._handleKeyboard.bind(this)
        }), this.$exiter.length) {
            this.$exiter.on({"click.zf.offcanvas": this.close.bind(this)})
        }
    }, i.prototype._setMQChecker = function () {
        var i = this;
        t(window).on("changed.zf.mediaquery", function () {
            e.MediaQuery.atLeast(i.options.revealOn) ? i.reveal(!0) : i.reveal(!1)
        }).one("load.zf.offcanvas", function () {
            e.MediaQuery.atLeast(i.options.revealOn) && i.reveal(!0)
        })
    }, i.prototype.reveal = function (t) {
        var e = this.$element.find("[data-close]");
        t ? (this.close(), this.isRevealed = !0, this.$element.off("open.zf.trigger toggle.zf.trigger"), e.length && e.hide()) : (this.isRevealed = !1, this.$element.on({
            "open.zf.trigger": this.open.bind(this),
            "toggle.zf.trigger": this.toggle.bind(this)
        }), e.length && e.show())
    }, i.prototype.open = function (i, n) {
        if (!this.$element.hasClass("is-open") && !this.isRevealed) {
            var s = this;
            t(document.body);
            t("body").scrollTop(0), e.Move(this.options.transitionTime, this.$element, function () {
                t("[data-off-canvas-wrapper]").addClass("is-off-canvas-open is-open-" + s.options.position), s.$element.addClass("is-open")
            }), this.$element.attr("aria-hidden", "false").trigger("opened.zf.offcanvas"), n && (this.$lastTrigger = n.attr("aria-expanded", "true")), this.options.autoFocus && this.$element.one("finished.zf.animate", function () {
                s.$element.find("a, button").eq(0).focus()
            }), this.options.trapFocus && (t("[data-off-canvas-content]").attr("tabindex", "-1"), this._trapFocus())
        }
    }, i.prototype._trapFocus = function () {
        var t = e.Keyboard.findFocusable(this.$element), i = t.eq(0), n = t.eq(-1);
        t.off(".zf.offcanvas").on("keydown.zf.offcanvas", function (t) {
            (9 === t.which || 9 === t.keycode) && (t.target !== n[0] || t.shiftKey || (t.preventDefault(), i.focus()), t.target === i[0] && t.shiftKey && (t.preventDefault(), n.focus()))
        })
    }, i.prototype.close = function (e) {
        if (this.$element.hasClass("is-open") && !this.isRevealed) {
            var i = this;
            t("[data-off-canvas-wrapper]").removeClass("is-off-canvas-open is-open-" + i.options.position), i.$element.removeClass("is-open"), this.$element.attr("aria-hidden", "true").trigger("closed.zf.offcanvas"), this.$lastTrigger.attr("aria-expanded", "false"), this.options.trapFocus && t("[data-off-canvas-content]").removeAttr("tabindex")
        }
    }, i.prototype.toggle = function (t, e) {
        this.$element.hasClass("is-open") ? this.close(t, e) : this.open(t, e)
    }, i.prototype._handleKeyboard = function (t) {
        27 === t.which && (t.stopPropagation(), t.preventDefault(), this.close(), this.$lastTrigger.focus())
    }, i.prototype.destroy = function () {
        this.close(), this.$element.off(".zf.trigger .zf.offcanvas"), this.$exiter.off(".zf.offcanvas"), e.unregisterPlugin(this)
    }, e.plugin(i, "OffCanvas")
}(jQuery, Foundation), !function (t, e) {
    "use strict";

    function i(n, s) {
        this.$element = n, this.options = t.extend({}, i.defaults, this.$element.data(), s), this._init(), e.registerPlugin(this, "Orbit"), e.Keyboard.register("Orbit", {
            ltr: {
                ARROW_RIGHT: "next",
                ARROW_LEFT: "previous"
            }, rtl: {ARROW_LEFT: "next", ARROW_RIGHT: "previous"}
        })
    }

    i.defaults = {
        bullets: !0,
        navButtons: !0,
        animInFromRight: "slide-in-right",
        animOutToRight: "slide-out-right",
        animInFromLeft: "slide-in-left",
        animOutToLeft: "slide-out-left",
        autoPlay: !0,
        timerDelay: 5e3,
        infiniteWrap: !0,
        swipe: !0,
        pauseOnHover: !0,
        accessible: !0,
        containerClass: "orbit-container",
        slideClass: "orbit-slide",
        boxOfBullets: "orbit-bullets",
        nextClass: "orbit-next",
        prevClass: "orbit-previous",
        useMUI: !0
    }, i.prototype._init = function () {
        this.$wrapper = this.$element.find("." + this.options.containerClass), this.$slides = this.$element.find("." + this.options.slideClass);
        var t = this.$element.find("img"), i = this.$slides.filter(".is-active");
        i.length || this.$slides.eq(0).addClass("is-active"), this.options.useMUI || this.$slides.addClass("no-motionui"), t.length ? e.onImagesLoaded(t, this._prepareForOrbit.bind(this)) : this._prepareForOrbit(), this.options.bullets && this._loadBullets(), this._events(), this.options.autoPlay && this.geoSync(), this.options.accessible && this.$wrapper.attr("tabindex", 0)
    }, i.prototype._loadBullets = function () {
        this.$bullets = this.$element.find("." + this.options.boxOfBullets).find("button")
    }, i.prototype.geoSync = function () {
        var t = this;
        this.timer = new e.Timer(this.$element, {duration: this.options.timerDelay, infinite: !1}, function () {
            t.changeSlide(!0)
        }), this.timer.start()
    }, i.prototype._prepareForOrbit = function () {
        var t = this;
        this._setWrapperHeight(function (e) {
            t._setSlideHeight(e)
        })
    }, i.prototype._setWrapperHeight = function (e) {
        var i, n = 0, s = 0;
        this.$slides.each(function () {
            i = this.getBoundingClientRect().height, t(this).attr("data-slide", s), s && t(this).css({
                position: "relative",
                display: "none"
            }), n = i > n ? i : n, s++
        }), s === this.$slides.length && (this.$wrapper.css({height: n}), e(n))
    }, i.prototype._setSlideHeight = function (e) {
        this.$slides.each(function () {
            t(this).css("max-height", e)
        })
    }, i.prototype._events = function () {
        var i = this;
        if (this.options.swipe && this.$slides.off("swipeleft.zf.orbit swiperight.zf.orbit").on("swipeleft.zf.orbit", function (t) {
            t.preventDefault(), i.changeSlide(!0)
        }).on("swiperight.zf.orbit", function (t) {
            t.preventDefault(), i.changeSlide(!1)
        }), this.options.autoPlay && (this.$slides.on("click.zf.orbit", function () {
            i.$element.data("clickedOn", i.$element.data("clickedOn") ? !1 : !0), i.timer[i.$element.data("clickedOn") ? "pause" : "start"]()
        }), this.options.pauseOnHover && this.$element.on("mouseenter.zf.orbit", function () {
            i.timer.pause()
        }).on("mouseleave.zf.orbit", function () {
            i.$element.data("clickedOn") || i.timer.start()
        })), this.options.navButtons) {
            var n = this.$element.find("." + this.options.nextClass + ", ." + this.options.prevClass);
            n.attr("tabindex", 0).on("click.zf.orbit touchend.zf.orbit", function () {
                i.changeSlide(t(this).hasClass(i.options.nextClass))
            })
        }
        this.options.bullets && this.$bullets.on("click.zf.orbit touchend.zf.orbit", function () {
            if (/is-active/g.test(this.className)) return !1;
            var e = t(this).data("slide"), n = e > i.$slides.filter(".is-active").data("slide"), s = i.$slides.eq(e);
            i.changeSlide(n, s, e)
        }), this.$wrapper.add(this.$bullets).on("keydown.zf.orbit", function (n) {
            e.Keyboard.handleKey(n, "Orbit", {
                next: function () {
                    i.changeSlide(!0)
                }, previous: function () {
                    i.changeSlide(!1)
                }, handled: function () {
                    t(n.target).is(i.$bullets) && i.$bullets.filter(".is-active").focus()
                }
            })
        })
    }, i.prototype.changeSlide = function (t, i, n) {
        var s = this.$slides.filter(".is-active").eq(0);
        if (/mui/g.test(s[0].className)) return !1;
        var o, a = this.$slides.first(), r = this.$slides.last(), l = t ? "Right" : "Left", d = t ? "Left" : "Right",
            h = this;
        o = i ? i : t ? this.options.infiniteWrap ? s.next("." + this.options.slideClass).length ? s.next("." + this.options.slideClass) : a : s.next("." + this.options.slideClass) : this.options.infiniteWrap ? s.prev("." + this.options.slideClass).length ? s.prev("." + this.options.slideClass) : r : s.prev("." + this.options.slideClass), o.length && (this.options.bullets && (n = n || this.$slides.index(o), this._updateBullets(n)), this.options.useMUI ? (e.Motion.animateIn(o.addClass("is-active").css({
            position: "absolute",
            top: 0
        }), this.options["animInFrom" + l], function () {
            o.css({position: "relative", display: "block"}).attr("aria-live", "polite")
        }), e.Motion.animateOut(s.removeClass("is-active"), this.options["animOutTo" + d], function () {
            s.removeAttr("aria-live"), h.options.autoPlay && h.timer.restart()
        })) : (s.removeClass("is-active is-in").removeAttr("aria-live").hide(), o.addClass("is-active is-in").attr("aria-live", "polite").show(), this.options.autoPlay && this.timer.restart()), this.$element.trigger("slidechange.zf.orbit", [o]))
    }, i.prototype._updateBullets = function (t) {
        var e = this.$element.find("." + this.options.boxOfBullets).find(".is-active").removeClass("is-active").blur(),
            i = e.find("span:last").detach();
        this.$bullets.eq(t).addClass("is-active").append(i)
    }, i.prototype.destroy = function () {
        delete this.timer, this.$element.off(".zf.orbit").find("*").off(".zf.orbit").end().hide(), e.unregisterPlugin(this)
    }, e.plugin(i, "Orbit")
}(jQuery, window.Foundation), !function (t, e) {
    "use strict";

    function i(i) {
        this.$element = e(i), this.rules = this.$element.data("responsive-menu"), this.currentMq = null, this.currentPlugin = null, this._init(), this._events(), t.registerPlugin(this, "ResponsiveMenu")
    }

    var n = {
        dropdown: {cssClass: "dropdown", plugin: t._plugins["dropdown-menu"] || null},
        drilldown: {cssClass: "drilldown", plugin: t._plugins.drilldown || null},
        accordion: {cssClass: "accordion-menu", plugin: t._plugins["accordion-menu"] || null}
    };
    i.defaults = {}, i.prototype._init = function () {
        for (var t = {}, i = this.rules.split(" "), s = 0; s < i.length; s++) {
            var o = i[s].split("-"), a = o.length > 1 ? o[0] : "small", r = o.length > 1 ? o[1] : o[0];
            null !== n[r] && (t[a] = n[r])
        }
        this.rules = t, e.isEmptyObject(t) || this._checkMediaQueries()
    }, i.prototype._events = function () {
        var t = this;
        e(window).on("changed.zf.mediaquery", function () {
            t._checkMediaQueries()
        })
    }, i.prototype._checkMediaQueries = function () {
        var i, s = this;
        e.each(this.rules, function (e) {
            t.MediaQuery.atLeast(e) && (i = e)
        }), i && (this.currentPlugin instanceof this.rules[i].plugin || (e.each(n, function (t, e) {
            s.$element.removeClass(e.cssClass)
        }), this.$element.addClass(this.rules[i].cssClass), this.currentPlugin && this.currentPlugin.destroy(), this.currentPlugin = new this.rules[i].plugin(this.$element, {})))
    }, i.prototype.destroy = function () {
        this.currentPlugin.destroy(), e(window).off(".zf.ResponsiveMenu"), t.unregisterPlugin(this)
    }, t.plugin(i, "ResponsiveMenu")
}(Foundation, jQuery), !function (t, e) {
    "use strict";

    function i(n, s) {
        this.$element = t(n), this.options = t.extend({}, i.defaults, this.$element.data(), s), this._init(), this._events(), e.registerPlugin(this, "ResponsiveToggle")
    }

    i.defaults = {hideFor: "medium"}, i.prototype._init = function () {
        var e = this.$element.data("responsive-toggle");
        e || console.error("Your tab bar needs an ID of a Menu as the value of data-tab-bar."), this.$targetMenu = t("#" + e), this.$toggler = this.$element.find("[data-toggle]"), this._update()
    }, i.prototype._events = function () {
        t(window).on("changed.zf.mediaquery", this._update.bind(this)), this.$toggler.on("click.zf.responsiveToggle", this.toggleMenu.bind(this))
    }, i.prototype._update = function () {
        e.MediaQuery.atLeast(this.options.hideFor) ? (this.$element.hide(), this.$targetMenu.show()) : (this.$element.show(), this.$targetMenu.hide())
    }, i.prototype.toggleMenu = function () {
        e.MediaQuery.atLeast(this.options.hideFor) || (this.$targetMenu.toggle(0), this.$element.trigger("toggled.zf.responsiveToggle"))
    }, i.prototype.destroy = function () {
    }, e.plugin(i, "ResponsiveToggle")
}(jQuery, Foundation), !function (t, e) {
    "use strict";

    function i(n, s) {
        this.$element = n, this.options = e.extend({}, i.defaults, this.$element.data(), s), this._init(), t.registerPlugin(this, "Reveal"), t.Keyboard.register("Reveal", {
            ENTER: "open",
            SPACE: "open",
            ESCAPE: "close",
            TAB: "tab_forward",
            SHIFT_TAB: "tab_backward"
        })
    }

    i.defaults = {
        animationIn: "",
        animationOut: "",
        showDelay: 0,
        hideDelay: 0,
        closeOnClick: !0,
        closeOnEsc: !0,
        multipleOpened: !1,
        vOffset: 100,
        hOffset: 0,
        fullScreen: !1,
        btmOffsetPct: 10,
        overlay: !0,
        resetOnClose: !1
    }, i.prototype._init = function () {
        if (this.id = this.$element.attr("id"), this.isActive = !1, this.$anchor = e(e('[data-open="' + this.id + '"]').length ? '[data-open="' + this.id + '"]' : '[data-toggle="' + this.id + '"]'), this.$anchor.length) {
            var i = this.$anchor[0].id || t.GetYoDigits(6, "reveal");
            this.$anchor.attr({
                "aria-controls": this.id,
                id: i,
                "aria-haspopup": !0,
                tabindex: 0
            }), this.$element.attr({"aria-labelledby": i})
        }
        (this.options.fullScreen || this.$element.hasClass("full")) && (this.options.fullScreen = !0, this.options.overlay = !1), this.options.overlay && !this.$overlay && (this.$overlay = this._makeOverlay(this.id)), this.$element.attr({
            role: "dialog",
            "aria-hidden": !0,
            "data-yeti-box": this.id,
            "data-resize": this.id
        }), this._events()
    }, i.prototype._makeOverlay = function (t) {
        var i = e("<div></div>").addClass("reveal-overlay").attr({tabindex: -1, "aria-hidden": !0}).appendTo("body");
        return this.options.closeOnClick && i.attr({"data-close": t}), i
    }, i.prototype._events = function () {
        var t = this;
        this.$element.on({
            "open.zf.trigger": this.open.bind(this),
            "close.zf.trigger": this.close.bind(this),
            "toggle.zf.trigger": this.toggle.bind(this),
            "resizeme.zf.trigger": function () {
                t.$element.is(":visible") && t._setPosition(function () {
                })
            }
        }), this.$anchor.length && this.$anchor.on("keydown.zf.reveal", function (e) {
            (13 === e.which || 32 === e.which) && (e.stopPropagation(), e.preventDefault(), t.open())
        }), this.options.closeOnClick && this.options.overlay && this.$overlay.off(".zf.reveal").on("click.zf.reveal", this.close.bind(this))
    }, i.prototype._setPosition = function (e) {
        var i = t.Box.GetDimensions(this.$element),
            n = this.options.fullScreen ? "reveal full" : i.height >= .5 * i.windowDims.height ? "reveal" : "center";
        "reveal full" === n ? this.$element.offset(t.Box.GetOffsets(this.$element, null, n, this.options.vOffset)).css({
            height: i.windowDims.height,
            width: i.windowDims.width
        }) : t.MediaQuery.atLeast("medium") && t.Box.ImNotTouchingYou(this.$element, null, !0, !1) ? this.$element.css({
            "max-height": i.windowDims.height - this.options.vOffset * (this.options.btmOffsetPct / 100 + 1),
            width: ""
        }).offset(t.Box.GetOffsets(this.$element, null, n, this.options.vOffset)) : (this.$element.css({width: i.windowDims.width - 2 * this.options.hOffset}).offset(t.Box.GetOffsets(this.$element, null, "center", this.options.vOffset, this.options.hOffset)), this.changedSize = !0), e()
    }, i.prototype.open = function () {
        var i = this;
        this.isActive = !0, this.$element.css({visibility: "hidden"}).show().scrollTop(0), this._setPosition(function () {
            i.$element.hide().css({visibility: ""}), i.options.multipleOpened || i.$element.trigger("closeme.zf.reveal", i.id), i.options.animationIn ? i.options.overlay ? t.Motion.animateIn(i.$overlay, "fade-in", function () {
                t.Motion.animateIn(i.$element, i.options.animationIn, function () {
                    i.focusableElements = t.Keyboard.findFocusable(i.$element)
                })
            }) : t.Motion.animateIn(i.$element, i.options.animationIn, function () {
                i.focusableElements = t.Keyboard.findFocusable(i.$element)
            }) : i.options.overlay ? i.$overlay.show(0, function () {
                i.$element.show(i.options.showDelay, function () {
                })
            }) : i.$element.show(i.options.showDelay, function () {
            })
        }), this.$element.attr({"aria-hidden": !1}).attr("tabindex", -1).focus().trigger("open.zf.reveal"), e("body").addClass("is-reveal-open").attr({"aria-hidden": this.options.overlay || this.options.fullScreen ? !0 : !1}), setTimeout(function () {
            i._extraHandlers()
        }, 0)
    }, i.prototype._extraHandlers = function () {
        var i = this;
        this.focusableElements = t.Keyboard.findFocusable(this.$element), this.options.overlay || !this.options.closeOnClick || this.options.fullScreen || e("body").on("click.zf.reveal", function (t) {
            i.close()
        }), this.options.closeOnEsc && e(window).on("keydown.zf.reveal", function (e) {
            t.Keyboard.handleKey(e, "Reveal", {
                close: function () {
                    i.options.closeOnEsc && (i.close(), i.$anchor.focus())
                }
            }), 0 === i.focusableElements.length && e.preventDefault()
        }), this.$element.on("keydown.zf.reveal", function (n) {
            var s = e(this);
            t.Keyboard.handleKey(n, "Reveal", {
                tab_forward: function () {
                    i.$element.find(":focus").is(i.focusableElements.eq(-1)) && (i.focusableElements.eq(0).focus(), n.preventDefault())
                }, tab_backward: function () {
                    (i.$element.find(":focus").is(i.focusableElements.eq(0)) || i.$element.is(":focus")) && (i.focusableElements.eq(-1).focus(), n.preventDefault())
                }, open: function () {
                    i.$element.find(":focus").is(i.$element.find("[data-close]")) ? setTimeout(function () {
                        i.$anchor.focus()
                    }, 1) : s.is(i.focusableElements) && i.open()
                }, close: function () {
                    i.options.closeOnEsc && (i.close(), i.$anchor.focus())
                }
            })
        })
    }, i.prototype.close = function () {
        if (!this.isActive || !this.$element.is(":visible")) return !1;
        var i = this;
        this.options.animationOut ? t.Motion.animateOut(this.$element, this.options.animationOut, function () {
            i.options.overlay && t.Motion.animateOut(i.$overlay, "fade-out", function () {
            })
        }) : this.$element.hide(i.options.hideDelay, function () {
            i.options.overlay && i.$overlay.hide(0, function () {
            })
        }), this.options.closeOnEsc && e(window).off("keydown.zf.reveal"), !this.options.overlay && this.options.closeOnClick && e("body").off("click.zf.reveal"), this.$element.off("keydown.zf.reveal"), this.changedSize && this.$element.css({
            height: "",
            width: ""
        }), e("body").removeClass("is-reveal-open").attr({
            "aria-hidden": !1,
            tabindex: ""
        }), this.options.resetOnClose && this.$element.html(this.$element.html()), this.isActive = !1, this.$element.attr({"aria-hidden": !0}).trigger("closed.zf.reveal")
    }, i.prototype.toggle = function () {
        this.isActive ? this.close() : this.open()
    }, i.prototype.destroy = function () {
        this.options.overlay && this.$overlay.hide().off().remove(), this.$element.hide(), this.$anchor.off(), t.unregisterPlugin(this)
    }, t.plugin(i, "Reveal"), "undefined" != typeof module && "undefined" != typeof module.exports && (module.exports = i), "function" == typeof define && define(["foundation"], function () {
        return i
    })
}(Foundation, jQuery), !function (t, e) {
    "use strict";

    function i(n, s) {
        this.$element = n, this.options = t.extend({}, i.defaults, this.$element.data(), s), this._init(), e.registerPlugin(this, "Slider"), e.Keyboard.register("Slider", {
            ltr: {
                ARROW_RIGHT: "increase",
                ARROW_UP: "increase",
                ARROW_DOWN: "decrease",
                ARROW_LEFT: "decrease",
                SHIFT_ARROW_RIGHT: "increase_fast",
                SHIFT_ARROW_UP: "increase_fast",
                SHIFT_ARROW_DOWN: "decrease_fast",
                SHIFT_ARROW_LEFT: "decrease_fast"
            },
            rtl: {
                ARROW_LEFT: "increase",
                ARROW_RIGHT: "decrease",
                SHIFT_ARROW_LEFT: "increase_fast",
                SHIFT_ARROW_RIGHT: "decrease_fast"
            }
        })
    }

    function n(t, e) {
        return t / e
    }

    function s(t, e, i, n) {
        return Math.abs(t.position()[e] + t[n]() / 2 - i)
    }

    i.defaults = {
        start: 0,
        end: 100,
        step: 1,
        initialStart: 0,
        initialEnd: 100,
        binding: !1,
        clickSelect: !0,
        vertical: !1,
        draggable: !0,
        disabled: !1,
        doubleSided: !1,
        decimal: 2,
        moveTime: 200,
        disabledClass: "disabled"
    }, i.prototype._init = function () {
        this.inputs = this.$element.find("input"), this.handles = this.$element.find("[data-slider-handle]"), this.$handle = this.handles.eq(0), this.$input = this.inputs.length ? this.inputs.eq(0) : t("#" + this.$handle.attr("aria-controls")), this.$fill = this.$element.find("[data-slider-fill]").css(this.options.vertical ? "height" : "width", 0);
        var e = !1, i = this;
        (this.options.disabled || this.$element.hasClass(this.options.disabledClass)) && (this.options.disabled = !0, this.$element.addClass(this.options.disabledClass)), this.inputs.length || (this.inputs = t().add(this.$input), this.options.binding = !0), this._setInitAttr(0), this._events(this.$handle), this.handles[1] && (this.options.doubleSided = !0, this.$handle2 = this.handles.eq(1), this.$input2 = this.inputs.length > 1 ? this.inputs.eq(1) : t("#" + this.$handle2.attr("aria-controls")), this.inputs[1] || (this.inputs = this.inputs.add(this.$input2)), e = !0, this._setHandlePos(this.$handle, this.options.initialStart, !0, function () {
            i._setHandlePos(i.$handle2, i.options.initialEnd)
        }), this._setInitAttr(1), this._events(this.$handle2)), e || this._setHandlePos(this.$handle, this.options.initialStart, !0)
    }, i.prototype._setHandlePos = function (t, i, s, o) {
        i = parseFloat(i), i < this.options.start ? i = this.options.start : i > this.options.end && (i = this.options.end);
        var a = this.options.doubleSided;
        if (a) if (0 === this.handles.index(t)) {
            var r = parseFloat(this.$handle2.attr("aria-valuenow"));
            i = i >= r ? r - this.options.step : i
        } else {
            var l = parseFloat(this.$handle.attr("aria-valuenow"));
            i = l >= i ? l + this.options.step : i
        }
        this.options.vertical && !s && (i = this.options.end - i);
        var d = this, h = this.options.vertical, u = h ? "height" : "width", f = h ? "top" : "left",
            c = t[0].getBoundingClientRect()[u] / 2, p = this.$element[0].getBoundingClientRect()[u],
            m = n(i, this.options.end).toFixed(2), g = (p - c) * m, v = (100 * n(g, p)).toFixed(this.options.decimal),
            i = i > 0 ? parseFloat(i.toFixed(this.options.decimal)) : 0, w = {};
        if (this._setValues(t, i), this.options.doubleSided) {
            var y, $ = 0 === this.handles.index(t);
            this.handles.index(t);
            if ($) w[f] = (m > 0 ? 100 * m : 0) + "%", y = (100 * (n(this.$handle2.position()[f] + c, p) - parseFloat(m))).toFixed(this.options.decimal) + "%", w["min-" + u] = y, o && "function" == typeof o && o(); else {
                var b = parseFloat(this.$handle[0].style.left);
                i = (100 > i ? i : 100) - (isNaN(b) ? this.options.end - i : b), w["min-" + u] = i + "%"
            }
        }
        this.$element.one("finished.zf.animate", function () {
            d.animComplete = !0, d.$element.trigger("moved.zf.slider", [t])
        });
        var C = d.$element.data("dragging") ? 1e3 / 60 : d.options.moveTime;
        e.Move(C, t, function () {
            t.css(f, v + "%"), d.options.doubleSided ? d.$fill.css(w) : d.$fill.css(u, 100 * m + "%")
        })
    }, i.prototype._setInitAttr = function (t) {
        var i = this.inputs.eq(t).attr("id") || e.GetYoDigits(6, "slider");
        this.inputs.eq(t).attr({
            id: i,
            max: this.options.end,
            min: this.options.start
        }), this.handles.eq(t).attr({
            role: "slider",
            "aria-controls": i,
            "aria-valuemax": this.options.end,
            "aria-valuemin": this.options.start,
            "aria-valuenow": 0 === t ? this.options.initialStart : this.options.initialEnd,
            "aria-orientation": this.options.vertical ? "vertical" : "horizontal",
            tabindex: 0
        })
    }, i.prototype._setValues = function (t, e) {
        var i = this.options.doubleSided ? this.handles.index(t) : 0;
        this.inputs.eq(i).val(e), t.attr("aria-valuenow", e)
    }, i.prototype._handleEvent = function (t, e, i) {
        var o, a;
        if (i) o = i, a = !0; else {
            t.preventDefault();
            var r = this.options.vertical, l = r ? "height" : "width", d = r ? "top" : "left",
                h = r ? t.pageY : t.pageX, u = this.$handle[0].getBoundingClientRect()[l] / 2,
                f = this.$element[0].getBoundingClientRect()[l], c = this.$element.offset()[d] - h,
                p = c > 0 ? -u : -f > c - u ? f : Math.abs(c), m = n(p, f);
            if (o = (this.options.end - this.options.start) * m, a = !1, !e) {
                var g = s(this.$handle, d, p, l), v = s(this.$handle2, d, p, l);
                e = v >= g ? this.$handle : this.$handle2
            }
        }
        this._setHandlePos(e, o, a)
    }, i.prototype._events = function (i) {
        if (this.options.disabled) return !1;
        var n, s = this;
        if (this.inputs.off("change.zf.slider").on("change.zf.slider", function (e) {
            var i = s.inputs.index(t(this));
            s._handleEvent(e, s.handles.eq(i), t(this).val())
        }), this.options.clickSelect && this.$element.off("click.zf.slider").on("click.zf.slider", function (t) {
            return s.$element.data("dragging") ? !1 : (s.animComplete = !1, void(s.options.doubleSided ? s._handleEvent(t) : s._handleEvent(t, s.$handle)))
        }), this.options.draggable) {
            this.handles.addTouch();
            var o = t("body");
            i.off("mousedown.zf.slider").on("mousedown.zf.slider", function (e) {
                i.addClass("is-dragging"), s.$fill.addClass("is-dragging"), s.$element.data("dragging", !0), s.animComplete = !1, n = t(e.currentTarget), o.on("mousemove.zf.slider", function (t) {
                    t.preventDefault(), s._handleEvent(t, n)
                }).on("mouseup.zf.slider", function (t) {
                    s.animComplete = !0, s._handleEvent(t, n), i.removeClass("is-dragging"), s.$fill.removeClass("is-dragging"), s.$element.data("dragging", !1), o.off("mousemove.zf.slider mouseup.zf.slider")
                })
            })
        }
        i.off("keydown.zf.slider").on("keydown.zf.slider", function (i) {
            var n, o = s.options.doubleSided ? s.handles.index(t(this)) : 0, a = parseFloat(s.inputs.eq(o).val()),
                r = t(this);
            e.Keyboard.handleKey(i, "Slider", {
                decrease: function () {
                    n = a - s.options.step
                }, increase: function () {
                    n = a + s.options.step
                }, decrease_fast: function () {
                    n = a - 10 * s.options.step
                }, increase_fast: function () {
                    n = a + 10 * s.options.step
                }, handled: function () {
                    i.preventDefault(), s._setHandlePos(r, n, !0)
                }
            })
        })
    }, i.prototype.destroy = function () {
        this.handles.off(".zf.slider"), this.inputs.off(".zf.slider"), this.$element.off(".zf.slider"), e.unregisterPlugin(this)
    }, e.plugin(i, "Slider")
}(jQuery, window.Foundation), !function (t, e) {
    "use strict";

    function i(n, s) {
        this.$element = n, this.options = t.extend({}, i.defaults, this.$element.data(), s), this._init(), e.registerPlugin(this, "Sticky")
    }

    function n(t) {
        return parseInt(window.getComputedStyle(document.body, null).fontSize, 10) * t
    }

    i.defaults = {
        container: "<div data-sticky-container></div>",
        stickTo: "top",
        anchor: "",
        topAnchor: "",
        btmAnchor: "",
        marginTop: 1,
        marginBottom: 1,
        stickyOn: "medium",
        stickyClass: "sticky",
        containerClass: "sticky-container",
        checkEvery: -1
    }, i.prototype._init = function () {
        var i = this.$element.parent("[data-sticky-container]"), n = this.$element[0].id || e.GetYoDigits(6, "sticky"),
            s = this;
        i.length || (this.wasWrapped = !0), this.$container = i.length ? i : t(this.options.container).wrapInner(this.$element), this.$container.addClass(this.options.containerClass), this.$element.addClass(this.options.stickyClass).attr({"data-resize": n}), this.scrollCount = this.options.checkEvery, this.isStuck = !1, "" !== this.options.anchor ? this.$anchor = t("#" + this.options.anchor) : this._parsePoints(), this._setSizes(function () {
            s._calc(!1)
        }), this._events(n.split("-").reverse().join("-"))
    }, i.prototype._parsePoints = function () {
        var e = this.options.topAnchor, i = this.options.btmAnchor, n = [e, i], s = {};
        if (e && i) for (var o = 0, a = n.length; a > o && n[o]; o++) {
            var r;
            if ("number" == typeof n[o]) r = n[o]; else {
                var l = n[o].split(":"), d = t("#" + l[0]);
                r = d.offset().top, l[1] && "bottom" === l[1].toLowerCase() && (r += d[0].getBoundingClientRect().height)
            }
            s[o] = r
        } else s = {0: 1, 1: document.documentElement.scrollHeight};
        this.points = s
    }, i.prototype._events = function (e) {
        var i = this, n = this.scrollListener = "scroll.zf." + e;
        this.isOn || (this.canStick && (this.isOn = !0, t(window).off(n).on(n, function (t) {
            0 === i.scrollCount ? (i.scrollCount = i.options.checkEvery, i._setSizes(function () {
                i._calc(!1, window.pageYOffset)
            })) : (i.scrollCount--, i._calc(!1, window.pageYOffset))
        })), this.$element.off("resizeme.zf.trigger").on("resizeme.zf.trigger", function (t, s) {
            i._setSizes(function () {
                i._calc(!1), i.canStick ? i.isOn || i._events(e) : i.isOn && i._pauseListeners(n)
            })
        }))
    }, i.prototype._pauseListeners = function (e) {
        this.isOn = !1, t(window).off(e), this.$element.trigger("pause.zf.sticky")
    }, i.prototype._calc = function (t, e) {
        return t && this._setSizes(), this.canStick ? (e || (e = window.pageYOffset), void(e >= this.topPoint ? e <= this.bottomPoint ? this.isStuck || this._setSticky() : this.isStuck && this._removeSticky(!1) : this.isStuck && this._removeSticky(!0))) : (this.isStuck && this._removeSticky(!0), !1)
    }, i.prototype._setSticky = function () {
        var t = this.options.stickTo, e = "top" === t ? "marginTop" : "marginBottom",
            i = "top" === t ? "bottom" : "top", n = {};
        n[e] = this.options[e] + "em", n[t] = 0, n[i] = "auto", n.left = this.$container.offset().left + parseInt(window.getComputedStyle(this.$container[0])["padding-left"], 10), this.isStuck = !0, this.$element.removeClass("is-anchored is-at-" + i).addClass("is-stuck is-at-" + t).css(n).trigger("sticky.zf.stuckto:" + t)
    }, i.prototype._removeSticky = function (t) {
        var e = this.options.stickTo, i = "top" === e, n = {},
            s = (this.points ? this.points[1] - this.points[0] : this.anchorHeight) - this.elemHeight,
            o = i ? "marginTop" : "marginBottom", a = i ? "bottom" : "top", r = t ? "top" : "bottom";
        n[o] = 0, t && !i || i && !t ? (n[e] = s, n[a] = 0) : (n[e] = 0, n[a] = s), n.left = "", this.isStuck = !1, this.$element.removeClass("is-stuck is-at-" + e).addClass("is-anchored is-at-" + r).css(n).trigger("sticky.zf.unstuckfrom:" + r)
    }, i.prototype._setSizes = function (t) {
        this.canStick = e.MediaQuery.atLeast(this.options.stickyOn), this.canStick || t();
        var i = this.$container[0].getBoundingClientRect().width, n = window.getComputedStyle(this.$container[0]),
            s = parseInt(n["padding-right"], 10);
        this.$anchor && this.$anchor.length ? this.anchorHeight = this.$anchor[0].getBoundingClientRect().height : this._parsePoints(), this.$element.css({"max-width": i - s + "px"});
        var o = this.$element[0].getBoundingClientRect().height || this.containerHeight;
        this.containerHeight = o, this.$container.css({height: o}), this.elemHeight = o, this.isStuck && this.$element.css({left: this.$container.offset().left + parseInt(n["padding-left"], 10)}), this._setBreakPoints(o, function () {
            t && t()
        })
    }, i.prototype._setBreakPoints = function (t, e) {
        if (!this.canStick) {
            if (!e) return !1;
            e()
        }
        var i = n(this.options.marginTop), s = n(this.options.marginBottom),
            o = this.points ? this.points[0] : this.$anchor.offset().top,
            a = this.points ? this.points[1] : o + this.anchorHeight, r = window.innerHeight;
        "top" === this.options.stickTo ? (o -= i, a -= t + i) : "bottom" === this.options.stickTo && (o -= r - (t + s), a -= r - s), this.topPoint = o, this.bottomPoint = a, e && e()
    }, i.prototype.destroy = function () {
        this._removeSticky(!0), this.$element.removeClass(this.options.stickyClass + " is-anchored is-at-top").css({
            height: "",
            top: "",
            bottom: "",
            "max-width": ""
        }).off("resizeme.zf.trigger"), this.$anchor.off("change.zf.sticky"), t(window).off(this.scrollListener), this.wasWrapped ? this.$element.unwrap() : this.$container.removeClass(this.options.containerClass).css({height: ""}), e.unregisterPlugin(this)
    }, e.plugin(i, "Sticky")
}(jQuery, window.Foundation), !function (t, e) {
    "use strict";

    function i(n, s) {
        this.$element = n, this.options = t.extend({}, i.defaults, this.$element.data(), s), this._init(), e.registerPlugin(this, "Tabs"), e.Keyboard.register("Tabs", {
            ENTER: "open",
            SPACE: "open",
            ARROW_RIGHT: "next",
            ARROW_UP: "previous",
            ARROW_DOWN: "next",
            ARROW_LEFT: "previous"
        })
    }

    i.defaults = {
        autoFocus: !1,
        wrapOnKeys: !0,
        matchHeight: !1,
        linkClass: "tabs-title",
        panelClass: "tabs-panel"
    }, i.prototype._init = function () {
        var i = this;
        if (this.$tabTitles = this.$element.find("." + this.options.linkClass), this.$tabContent = t('[data-tabs-content="' + this.$element[0].id + '"]'), this.$tabTitles.each(function () {
            var e = t(this), n = e.find("a"), s = e.hasClass("is-active"), o = n.attr("href").slice(1),
                a = o + "-label", r = t(o);
            e.attr({role: "presentation"}), n.attr({
                role: "tab",
                "aria-controls": o,
                "aria-selected": s,
                id: a
            }), r.attr({
                role: "tabpanel",
                "aria-hidden": !s,
                "aria-labelledby": a
            }), s && i.options.autoFocus && n.focus()
        }), this.options.matchHeight) {
            var n = this.$tabContent.find("img");
            n.length ? e.onImagesLoaded(n, this._setHeight.bind(this)) : this._setHeight()
        }
        this._events()
    }, i.prototype._events = function () {
        this._addKeyHandler(), this._addClickHandler(), this.options.matchHeight && t(window).on("changed.zf.mediaquery", this._setHeight.bind(this))
    }, i.prototype._addClickHandler = function () {
        var e = this;
        this.$element.off("click.zf.tabs").on("click.zf.tabs", "." + this.options.linkClass, function (i) {
            i.preventDefault(), i.stopPropagation(), t(this).hasClass("is-active") || e._handleTabChange(t(this))
        })
    }, i.prototype._addKeyHandler = function () {
        var i = this;
        i.$element.find("li:first-of-type"), i.$element.find("li:last-of-type");
        this.$tabTitles.off("keydown.zf.tabs").on("keydown.zf.tabs", function (n) {
            if (9 !== n.which) {
                n.stopPropagation(), n.preventDefault();
                var s, o, a = t(this), r = a.parent("ul").children("li");
                r.each(function (e) {
                    return t(this).is(a) ? void(i.options.wrapOnKeys ? (s = 0 === e ? r.last() : r.eq(e - 1), o = e === r.length - 1 ? r.first() : r.eq(e + 1)) : (s = r.eq(Math.max(0, e - 1)), o = r.eq(Math.min(e + 1, r.length - 1)))) : void 0
                }), e.Keyboard.handleKey(n, "Tabs", {
                    open: function () {
                        a.find('[role="tab"]').focus(), i._handleTabChange(a)
                    }, previous: function () {
                        s.find('[role="tab"]').focus(), i._handleTabChange(s)
                    }, next: function () {
                        o.find('[role="tab"]').focus(), i._handleTabChange(o)
                    }
                })
            }
        })
    }, i.prototype._handleTabChange = function (e) {
        var i = e.find('[role="tab"]'), n = i.attr("href"), s = t(n),
            o = this.$element.find("." + this.options.linkClass + ".is-active").removeClass("is-active").find('[role="tab"]').attr({"aria-selected": "false"}).attr("href");
        t(o).removeClass("is-active").attr({"aria-hidden": "true"}), e.addClass("is-active"), i.attr({"aria-selected": "true"}), s.addClass("is-active").attr({"aria-hidden": "false"}), this.$element.trigger("change.zf.tabs", [e])
    }, i.prototype.selectTab = function (t) {
        var e;
        e = "object" == typeof t ? t[0].id : t, e.indexOf("#") < 0 && (e = "#" + e);
        var i = this.$tabTitles.find('[href="' + e + '"]').parent("." + this.options.linkClass);
        this._handleTabChange(i)
    }, i.prototype._setHeight = function () {
        var e = 0;
        this.$tabContent.find("." + this.options.panelClass).css("height", "").each(function () {
            var i = t(this), n = i.hasClass("is-active");
            n || i.css({visibility: "hidden", display: "block"});
            var s = this.getBoundingClientRect().height;
            n || i.css({visibility: "", display: ""}), e = s > e ? s : e
        }).css("height", e + "px")
    }, i.prototype.destroy = function () {
        this.$element.find("." + this.options.linkClass).off(".zf.tabs").hide().end().find("." + this.options.panelClass).hide(), this.options.matchHeight && t(window).off("changed.zf.mediaquery"), e.unregisterPlugin(this)
    }, e.plugin(i, "Tabs")
}(jQuery, window.Foundation), !function (t, e) {
    "use strict";

    function i(n, s) {
        this.$element = n, this.options = e.extend({}, i.defaults, n.data(), s), this.className = "", this._init(), this._events(), t.registerPlugin(this, "Toggler")
    }

    i.defaults = {animate: !1}, i.prototype._init = function () {
        var t;
        this.options.animate ? (t = this.options.animate.split(" "), this.animationIn = t[0], this.animationOut = t[1] || null) : (t = this.$element.data("toggler"), this.className = "." === t[0] ? t.slice(1) : t);
        var i = this.$element[0].id;
        e('[data-open="' + i + '"], [data-close="' + i + '"], [data-toggle="' + i + '"]').attr("aria-controls", i), this.$element.attr("aria-expanded", this.$element.is(":hidden") ? !1 : !0)
    }, i.prototype._events = function () {
        this.$element.off("toggle.zf.trigger").on("toggle.zf.trigger", this.toggle.bind(this))
    }, i.prototype.toggle = function () {
        this[this.options.animate ? "_toggleAnimate" : "_toggleClass"]()
    }, i.prototype._toggleClass = function () {
        this.$element.toggleClass(this.className);
        var t = this.$element.hasClass(this.className);
        t ? this.$element.trigger("on.zf.toggler") : this.$element.trigger("off.zf.toggler"), this._updateARIA(t)
    }, i.prototype._toggleAnimate = function () {
        var e = this;
        this.$element.is(":hidden") ? t.Motion.animateIn(this.$element, this.animationIn, function () {
            this.trigger("on.zf.toggler"), e._updateARIA(!0)
        }) : t.Motion.animateOut(this.$element, this.animationOut, function () {
            this.trigger("off.zf.toggler"), e._updateARIA(!1)
        })
    }, i.prototype._updateARIA = function (t) {
        this.$element.attr("aria-expanded", t ? !0 : !1)
    }, i.prototype.destroy = function () {
        this.$element.off(".zf.toggler"), t.unregisterPlugin(this)
    }, t.plugin(i, "Toggler"), "undefined" != typeof module && "undefined" != typeof module.exports && (module.exports = i), "function" == typeof define && define(["foundation"], function () {
        return i
    })
}(Foundation, jQuery), !function (t, e, i) {
    "use strict";

    function n(e, s) {
        this.$element = e, this.options = t.extend({}, n.defaults, this.$element.data(), s), this.isActive = !1, this.isClick = !1, this._init(), i.registerPlugin(this, "Tooltip")
    }

    n.defaults = {
        disableForTouch: !1,
        hoverDelay: 200,
        fadeInDuration: 150,
        fadeOutDuration: 150,
        disableHover: !1,
        templateClasses: "",
        tooltipClass: "tooltip",
        triggerClass: "has-tip",
        showOn: "small",
        template: "",
        tipText: "",
        touchCloseText: "Tap to close.",
        clickOpen: !0,
        positionClass: "",
        vOffset: 10,
        hOffset: 12
    }, n.prototype._init = function () {
        var n = this.$element.attr("aria-describedby") || i.GetYoDigits(6, "tooltip");
        this.options.positionClass = this._getPositionClass(this.$element), this.options.tipText = this.options.tipText || this.$element.attr("title"), this.template = this.options.template ? t(this.options.template) : this._buildTemplate(n), this.template.appendTo(e.body).text(this.options.tipText).hide(), this.$element.attr({
            title: "",
            "aria-describedby": n,
            "data-yeti-box": n,
            "data-toggle": n,
            "data-resize": n
        }).addClass(this.triggerClass), this.usedPositions = [], this.counter = 4, this.classChanged = !1, this._events()
    }, n.prototype._getPositionClass = function (t) {
        if (!t) return "";
        var e = t[0].className.match(/(top|left|right)/g);
        return e = e ? e[0] : ""
    }, n.prototype._buildTemplate = function (e) {
        var i = (this.options.tooltipClass + " " + this.options.positionClass).trim(),
            n = t("<div></div>").addClass(i).attr({
                role: "tooltip",
                "aria-hidden": !0,
                "data-is-active": !1,
                "data-is-focus": !1,
                id: e
            });
        return n
    }, n.prototype._reposition = function (t) {
        this.usedPositions.push(t ? t : "bottom"), !t && this.usedPositions.indexOf("top") < 0 ? this.template.addClass("top") : "top" === t && this.usedPositions.indexOf("bottom") < 0 ? this.template.removeClass(t) : "left" === t && this.usedPositions.indexOf("right") < 0 ? this.template.removeClass(t).addClass("right") : "right" === t && this.usedPositions.indexOf("left") < 0 ? this.template.removeClass(t).addClass("left") : !t && this.usedPositions.indexOf("top") > -1 && this.usedPositions.indexOf("left") < 0 ? this.template.addClass("left") : "top" === t && this.usedPositions.indexOf("bottom") > -1 && this.usedPositions.indexOf("left") < 0 ? this.template.removeClass(t).addClass("left") : "left" === t && this.usedPositions.indexOf("right") > -1 && this.usedPositions.indexOf("bottom") < 0 ? this.template.removeClass(t) : "right" === t && this.usedPositions.indexOf("left") > -1 && this.usedPositions.indexOf("bottom") < 0 ? this.template.removeClass(t) : this.template.removeClass(t), this.classChanged = !0, this.counter--
    }, n.prototype._setPosition = function () {
        var t = this._getPositionClass(this.template), e = i.Box.GetDimensions(this.template),
            n = i.Box.GetDimensions(this.$element), s = "left" === t ? "left" : "right" === t ? "left" : "top",
            o = "top" === s ? "height" : "width";
        "height" === o ? this.options.vOffset : this.options.hOffset;
        if (e.width >= e.windowDims.width || !this.counter && !i.Box.ImNotTouchingYou(this.template)) return this.template.offset(i.Box.GetOffsets(this.template, this.$element, "center bottom", this.options.vOffset, this.options.hOffset, !0)).css({
            width: n.windowDims.width - 2 * this.options.hOffset,
            height: "auto"
        }), !1;
        for (this.template.offset(i.Box.GetOffsets(this.template, this.$element, "center " + (t || "bottom"), this.options.vOffset, this.options.hOffset)); !i.Box.ImNotTouchingYou(this.template) && this.counter;) this._reposition(t), this._setPosition()
    }, n.prototype.show = function () {
        if ("all" !== this.options.showOn && !i.MediaQuery.atLeast(this.options.showOn)) return !1;
        var t = this;
        this.template.css("visibility", "hidden").show(), this._setPosition(), this.$element.trigger("closeme.zf.tooltip", this.template.attr("id")), this.template.attr({
            "data-is-active": !0,
            "aria-hidden": !1
        }), t.isActive = !0, this.template.stop().hide().css("visibility", "").fadeIn(this.options.fadeInDuration, function () {
        }), this.$element.trigger("show.zf.tooltip")
    }, n.prototype.hide = function () {
        var t = this;
        this.template.stop().attr({
            "aria-hidden": !0,
            "data-is-active": !1
        }).fadeOut(this.options.fadeOutDuration, function () {
            t.isActive = !1, t.isClick = !1, t.classChanged && (t.template.removeClass(t._getPositionClass(t.template)).addClass(t.options.positionClass), t.usedPositions = [], t.counter = 4, t.classChanged = !1)
        }), this.$element.trigger("hide.zf.tooltip")
    }, n.prototype._events = function () {
        var t = this, e = (this.template, !1);
        this.options.disableHover || this.$element.on("mouseenter.zf.tooltip", function (e) {
            t.isActive || (t.timeout = setTimeout(function () {
                t.show()
            }, t.options.hoverDelay))
        }).on("mouseleave.zf.tooltip", function (i) {
            clearTimeout(t.timeout), (!e || !t.isClick && t.options.clickOpen) && t.hide()
        }), this.options.clickOpen && this.$element.on("mousedown.zf.tooltip", function (e) {
            e.stopImmediatePropagation(), t.isClick ? t.hide() : (t.isClick = !0, !t.options.disableHover && t.$element.attr("tabindex") || t.isActive || t.show())
        }), this.options.disableForTouch || this.$element.on("tap.zf.tooltip touchend.zf.tooltip", function (e) {
            t.isActive ? t.hide() : t.show()
        }), this.$element.on({"close.zf.trigger": this.hide.bind(this)}), this.$element.on("focus.zf.tooltip", function (i) {
            return e = !0, t.isClick ? !1 : void t.show()
        }).on("focusout.zf.tooltip", function (i) {
            e = !1, t.isClick = !1, t.hide()
        }).on("resizeme.zf.trigger", function () {
            t.isActive && t._setPosition()
        })
    }, n.prototype.toggle = function () {
        this.isActive ? this.hide() : this.show()
    }, n.prototype.destroy = function () {
        this.$element.attr("title", this.template.text()).off(".zf.trigger .zf.tootip").removeAttr("aria-describedby").removeAttr("data-yeti-box").removeAttr("data-toggle").removeAttr("data-resize"), this.template.remove(), i.unregisterPlugin(this)
    }, i.plugin(n, "Tooltip")
}(jQuery, window.document, window.Foundation);