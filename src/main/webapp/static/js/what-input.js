!function (e, t) {
    "function" == typeof define && define.amd ? define([], function () {
        return t()
    }) : "object" == typeof exports ? module.exports = t() : e.whatInput = t()
}(this, function () {
    "use strict";

    function e(e) {
        clearTimeout(s), n(e), f = !0, s = setTimeout(function () {
            f = !1
        }, 1e3)
    }

    function t(e) {
        f || n(e)
    }

    function n(e) {
        var t = o(e), n = r(e), d = w[e.type];
        "pointer" === d && (d = i(e)), p !== d && (!y && p && "keyboard" === d && "tab" !== v[t] && m.indexOf(n.nodeName.toLowerCase()) >= 0 || (p = d, a.setAttribute("data-whatinput", p), -1 === h.indexOf(p) && h.push(p))), "keyboard" === d && u(t)
    }

    function o(e) {
        return e.keyCode ? e.keyCode : e.which
    }

    function r(e) {
        return e.target || e.srcElement
    }

    function i(e) {
        return "number" == typeof e.pointerType ? b[e.pointerType] : e.pointerType
    }

    function u(e) {
        -1 === c.indexOf(v[e]) && v[e] && c.push(v[e])
    }

    function d(e) {
        var t = o(e), n = c.indexOf(v[t]);
        -1 !== n && c.splice(n, 1)
    }

    var s, c = [], a = document.body, f = !1, p = null, m = ["input", "select", "textarea"],
        y = a.hasAttribute("data-whatinput-formtyping"), w = {
            keydown: "keyboard",
            mousedown: "mouse",
            mouseenter: "mouse",
            touchstart: "touch",
            pointerdown: "pointer",
            MSPointerDown: "pointer"
        }, h = [],
        v = {9: "tab", 13: "enter", 16: "shift", 27: "esc", 32: "space", 37: "left", 38: "up", 39: "right", 40: "down"},
        b = {2: "touch", 3: "touch", 4: "mouse"};
    return function () {
        var n = "mousedown";
        window.PointerEvent ? n = "pointerdown" : window.MSPointerEvent && (n = "MSPointerDown"), a.addEventListener(n, t), a.addEventListener("mouseenter", t), "ontouchstart" in document.documentElement && a.addEventListener("touchstart", e), a.addEventListener("keydown", t), a.addEventListener("keyup", d)
    }(), {
        ask: function () {
            return p
        }, keys: function () {
            return c
        }, types: function () {
            return h
        }, set: n
    }
});