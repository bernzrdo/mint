/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./lib/util.ts":
/*!*********************!*\
  !*** ./lib/util.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {



function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.LogType = exports.INTERRUPTION_LEVEL = exports.SOUNDS = void 0;
exports.change = change;
exports.wait = wait;
exports.time = time;
exports.SOUNDS = {
  "default": 'Predefinido',
  none: 'Silêncio',
  alarm: '⏰ Alarme',
  anticipate: '😯 Anticipar',
  bell: '🔔 Sino',
  bloom: '🌼 Florescer',
  calypso: '☝️ Calipso',
  chime: '✨ Sininhos',
  choo: '🚂 Chuu',
  descent: '📉 Descida',
  electronic: '🤖 Eletrónico',
  fanfare: '🎺 Fanfarra',
  glass: '🥃 Vidro',
  go_to_sleep: '😴 Hora de Dormir',
  health_notification: '💧 Gotinhas',
  horn: '📣 Buzina',
  ladder: '🪜 Escadote',
  minuet: '🐤 Minueto',
  multiway_invitation: '✅ Sucesso',
  new_mail: '📨 E-mail',
  news_flash: '📰 Notícias',
  noir: '🎷 Noir',
  payment_sucess: '💸 Pagamento',
  sent_mail: '📤 Enviado',
  sent_sms: '✉️ Mensagem',
  shake: '🫨 Agitar',
  sherwood_forest: '📯 Chamamento',
  spell: '🪄 Feitiço',
  suspense: '😨 Suspense',
  telegraph: '📠 Telégrafo',
  tiptoes: '🩰 Pontas dos Pés',
  typewriters: '⌨️ Máquina de Escrever',
  update: '‼️ Última Hora'
};
exports.INTERRUPTION_LEVEL = {
  'active': 'Normal',
  'passive': 'Silencioso - Não acende o telemóvel',
  'time-sensitive': 'Urgente - Entregue imediatamente'
};
var LogType;
(function (LogType) {
  LogType[LogType["info"] = 0] = "info";
  LogType[LogType["warn"] = 1] = "warn";
  LogType[LogType["error"] = 2] = "error";
})(LogType || (exports.LogType = LogType = {}));
function change($from, $to) {
  if (Array.isArray($from)) {
    var _iterator = _createForOfIteratorHelper($from),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var $el = _step.value;
        $el.style.display = 'none';
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } else $from.style.display = 'none';
  if (Array.isArray($to)) {
    var _iterator2 = _createForOfIteratorHelper($to),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _$el = _step2.value;
        _$el.style.removeProperty('display');
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  } else $to.style.removeProperty('display');
}
function wait(seconds) {
  return new Promise(function (res) {
    return setTimeout(res, seconds * 1e3);
  });
}
function time(date) {
  if (!date) date = new Date();
  return "".concat(date.getHours().toString().padStart(2, '0'), ":").concat(date.getMinutes().toString().padStart(2, '0'), ":").concat(date.getSeconds().toString().padStart(2, '0'));
}

/***/ }),

/***/ "./src/ts/_infinite.ts":
/*!*****************************!*\
  !*** ./src/ts/_infinite.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __classPrivateFieldSet = this && this.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet = this && this.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Infinite_instances, _Infinite_path, _Infinite_addItem, _Infinite_page, _Infinite_isBusy, _Infinite_ended, _Infinite_load, _Infinite_detectEnd;
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Infinite = void 0;
var util_1 = __webpack_require__(/*! ../../lib/util */ "./lib/util.ts");
var $main = document.querySelector('main');
var $content = $main.querySelector('.content');
var $loading = $content.querySelector('.loading');
var $error = $content.querySelector('.error');
var Infinite = /*#__PURE__*/_createClass(function Infinite(path, addItem) {
  var _this = this;
  _classCallCheck(this, Infinite);
  _Infinite_instances.add(this);
  _Infinite_path.set(this, void 0);
  _Infinite_addItem.set(this, void 0);
  _Infinite_page.set(this, 0);
  _Infinite_isBusy.set(this, false);
  _Infinite_ended.set(this, false);
  __classPrivateFieldSet(this, _Infinite_path, path, "f");
  __classPrivateFieldSet(this, _Infinite_addItem, addItem, "f");
  __classPrivateFieldGet(this, _Infinite_instances, "m", _Infinite_detectEnd).call(this);
  $main.addEventListener('scroll', function () {
    return __classPrivateFieldGet(_this, _Infinite_instances, "m", _Infinite_detectEnd).call(_this);
  });
});
exports.Infinite = Infinite;
_Infinite_path = new WeakMap(), _Infinite_addItem = new WeakMap(), _Infinite_page = new WeakMap(), _Infinite_isBusy = new WeakMap(), _Infinite_ended = new WeakMap(), _Infinite_instances = new WeakSet(), _Infinite_load = function _Infinite_load() {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var _a, req, res, _iterator, _step, item;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(__classPrivateFieldGet(this, _Infinite_ended, "f") || __classPrivateFieldGet(this, _Infinite_isBusy, "f"))) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return");
        case 2:
          __classPrivateFieldSet(this, _Infinite_isBusy, true, "f");
          (0, util_1.change)($error, $loading);
          _context.prev = 4;
          _context.next = 7;
          return fetch("".concat(__classPrivateFieldGet(this, _Infinite_path, "f"), "?page=").concat(__classPrivateFieldGet(this, _Infinite_page, "f") + 1));
        case 7:
          req = _context.sent;
          _context.next = 10;
          return req.json();
        case 10:
          res = _context.sent;
          if (res.success) {
            _context.next = 13;
            break;
          }
          throw new Error(res.error);
        case 13:
          __classPrivateFieldSet(this, _Infinite_page, (_a = __classPrivateFieldGet(this, _Infinite_page, "f"), _a++, _a), "f");
          _iterator = _createForOfIteratorHelper(res.items);
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              item = _step.value;
              __classPrivateFieldGet(this, _Infinite_addItem, "f").call(this, item);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          if (res.ended) {
            (0, util_1.change)($loading, []);
            __classPrivateFieldSet(this, _Infinite_ended, true, "f");
          } else {
            __classPrivateFieldSet(this, _Infinite_isBusy, false, "f");
            __classPrivateFieldGet(this, _Infinite_instances, "m", _Infinite_detectEnd).call(this);
          }
          _context.next = 23;
          break;
        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](4);
          (0, util_1.change)($loading, $error);
          console.log(_context.t0);
        case 23:
          __classPrivateFieldSet(this, _Infinite_isBusy, false, "f");
        case 24:
        case "end":
          return _context.stop();
      }
    }, _callee, this, [[4, 19]]);
  }));
}, _Infinite_detectEnd = function _Infinite_detectEnd() {
  if (!__classPrivateFieldGet(this, _Infinite_ended, "f") && !__classPrivateFieldGet(this, _Infinite_isBusy, "f") && $loading.getBoundingClientRect().y - 250 < innerHeight) __classPrivateFieldGet(this, _Infinite_instances, "m", _Infinite_load).call(this);
};

/***/ }),

/***/ "./src/ts/alerts.ts":
/*!**************************!*\
  !*** ./src/ts/alerts.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var _infinite_1 = __webpack_require__(/*! ./_infinite */ "./src/ts/_infinite.ts");
var $main = document.querySelector('main');
var $content = $main.querySelector('.content');
var $loading = $content.querySelector('.loading');
var $icons = $main.querySelector('.icons');
var ICONS = {
  infoCircle: $icons.querySelector('.icon-tabler-info-circle').outerHTML,
  bell: $icons.querySelector('.icon-tabler-bell').outerHTML,
  clock: $icons.querySelector('.icon-tabler-clock').outerHTML,
  alertTriangle: $icons.querySelector('.icon-tabler-alert-triangle').outerHTML
};
new _infinite_1.Infinite('/api/list-alerts', function (alert) {
  var $alert = document.createElement('div');
  $alert.className = 'card';
  var $title = document.createElement('div');
  $title.className = 'title';
  $title.innerText = alert.title;
  $alert.appendChild($title);
  var $text = document.createElement('div');
  $text.className = 'text';
  $text.innerText = alert.text;
  $alert.appendChild($text);
  var $id = document.createElement('div');
  $id.className = 'subtitle';
  $id.innerText = alert.id;
  $alert.appendChild($id);
  var $source = document.createElement('div');
  $source.className = 'info';
  $source.innerText = alert.source;
  $source.innerHTML = ICONS.infoCircle + $source.innerHTML;
  $alert.appendChild($source);
  var $interruptionLevel = document.createElement('div');
  $interruptionLevel.className = 'info';
  $interruptionLevel.innerText = alert.interruptionLevel;
  $interruptionLevel.innerHTML = ICONS.bell + $interruptionLevel.innerHTML;
  $alert.appendChild($interruptionLevel);
  var $sentAt = document.createElement('div');
  $sentAt.className = 'info';
  $sentAt.innerText = 'Enviado ' + alert.sentAt;
  $sentAt.innerHTML = ICONS.clock + $sentAt.innerHTML;
  $alert.appendChild($sentAt);
  if (alert.hasError) {
    var $warn = document.createElement('div');
    $warn.className = 'warn';
    $warn.innerText = 'Ocorreu um erro ao tentar entregar este alerta.';
    $warn.innerHTML = ICONS.alertTriangle + $warn.innerHTML;
    $alert.appendChild($warn);
  }
  $content.insertBefore($alert, $loading);
});

/***/ }),

/***/ "./src/scss/infinite.scss":
/*!********************************!*\
  !*** ./src/scss/infinite.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/locked.scss":
/*!******************************!*\
  !*** ./src/scss/locked.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/logs.scss":
/*!****************************!*\
  !*** ./src/scss/logs.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/searches.scss":
/*!********************************!*\
  !*** ./src/scss/searches.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/alerts.scss":
/*!******************************!*\
  !*** ./src/scss/alerts.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/dashboard.scss":
/*!*********************************!*\
  !*** ./src/scss/dashboard.scss ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/devices.scss":
/*!*******************************!*\
  !*** ./src/scss/devices.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/error.scss":
/*!*****************************!*\
  !*** ./src/scss/error.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/public/js/alerts": 0,
/******/ 			"public/css/error": 0,
/******/ 			"public/css/devices": 0,
/******/ 			"public/css/dashboard": 0,
/******/ 			"public/css/alerts": 0,
/******/ 			"public/css/style": 0,
/******/ 			"public/css/searches": 0,
/******/ 			"public/css/logs": 0,
/******/ 			"public/css/locked": 0,
/******/ 			"public/css/infinite": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["public/css/error","public/css/devices","public/css/dashboard","public/css/alerts","public/css/style","public/css/searches","public/css/logs","public/css/locked","public/css/infinite"], () => (__webpack_require__("./src/ts/alerts.ts")))
/******/ 	__webpack_require__.O(undefined, ["public/css/error","public/css/devices","public/css/dashboard","public/css/alerts","public/css/style","public/css/searches","public/css/logs","public/css/locked","public/css/infinite"], () => (__webpack_require__("./src/scss/alerts.scss")))
/******/ 	__webpack_require__.O(undefined, ["public/css/error","public/css/devices","public/css/dashboard","public/css/alerts","public/css/style","public/css/searches","public/css/logs","public/css/locked","public/css/infinite"], () => (__webpack_require__("./src/scss/dashboard.scss")))
/******/ 	__webpack_require__.O(undefined, ["public/css/error","public/css/devices","public/css/dashboard","public/css/alerts","public/css/style","public/css/searches","public/css/logs","public/css/locked","public/css/infinite"], () => (__webpack_require__("./src/scss/devices.scss")))
/******/ 	__webpack_require__.O(undefined, ["public/css/error","public/css/devices","public/css/dashboard","public/css/alerts","public/css/style","public/css/searches","public/css/logs","public/css/locked","public/css/infinite"], () => (__webpack_require__("./src/scss/error.scss")))
/******/ 	__webpack_require__.O(undefined, ["public/css/error","public/css/devices","public/css/dashboard","public/css/alerts","public/css/style","public/css/searches","public/css/logs","public/css/locked","public/css/infinite"], () => (__webpack_require__("./src/scss/infinite.scss")))
/******/ 	__webpack_require__.O(undefined, ["public/css/error","public/css/devices","public/css/dashboard","public/css/alerts","public/css/style","public/css/searches","public/css/logs","public/css/locked","public/css/infinite"], () => (__webpack_require__("./src/scss/locked.scss")))
/******/ 	__webpack_require__.O(undefined, ["public/css/error","public/css/devices","public/css/dashboard","public/css/alerts","public/css/style","public/css/searches","public/css/logs","public/css/locked","public/css/infinite"], () => (__webpack_require__("./src/scss/logs.scss")))
/******/ 	__webpack_require__.O(undefined, ["public/css/error","public/css/devices","public/css/dashboard","public/css/alerts","public/css/style","public/css/searches","public/css/logs","public/css/locked","public/css/infinite"], () => (__webpack_require__("./src/scss/searches.scss")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["public/css/error","public/css/devices","public/css/dashboard","public/css/alerts","public/css/style","public/css/searches","public/css/logs","public/css/locked","public/css/infinite"], () => (__webpack_require__("./src/scss/style.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;