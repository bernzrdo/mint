/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/_modal.ts":
/*!**************************!*\
  !*** ./src/ts/_modal.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {



function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var $modalContainer = document.querySelector('.modal-container');
var $modal = $modalContainer.querySelector('.modal');
var $title = $modal.querySelector('.title');
var $closeBtn = $modal.querySelector('.close-btn');
var $body = $modal.querySelector('.body');
var $footer = $modal.querySelector('.footer');
var resolve = null;
var inputChecks = {};
var modal = {
  $: $modal,
  setTitle: function setTitle(title) {
    $title.innerText = title;
  },
  clear: function clear() {
    inputChecks = {};
    $modal.style.width = '500px';
    $body.innerHTML = '';
    $footer.innerHTML = '';
  },
  width: function width(size) {
    $modal.style.width = "".concat(size, "px");
  },
  addText: function addText(text) {
    var $text = document.createElement('p');
    $text.innerText = text;
    $body.appendChild($text);
  },
  addInput: function addInput(name, label, options) {
    var $group = document.createElement('div');
    $group.className = 'input-group';
    var $label = document.createElement('label');
    $label.htmlFor = name;
    $label.innerText = label;
    $group.appendChild($label);
    var $input = document.createElement('input');
    if (options === null || options === void 0 ? void 0 : options.className) $input.className = options.className;
    $input.id = name;
    $input.name = name;
    $input.addEventListener('input', function () {
      if (options === null || options === void 0 ? void 0 : options.fix) $input.value = options.fix($input.value);
      $group.classList.remove('has-error');
    });
    if (options === null || options === void 0 ? void 0 : options.placeholder) $input.placeholder = options.placeholder;
    if (options === null || options === void 0 ? void 0 : options["default"]) $input.value = options["default"];
    $group.appendChild($input);
    var $error = document.createElement('div');
    $error.className = 'error';
    $group.appendChild($error);
    $body.appendChild($group);
    if (options === null || options === void 0 ? void 0 : options.check) inputChecks[name] = options.check;
  },
  addSelect: function addSelect(name, label, options, defaultOption) {
    var $group = document.createElement('div');
    $group.className = 'input-group';
    var $label = document.createElement('label');
    $label.htmlFor = name;
    $label.innerText = label;
    $group.appendChild($label);
    var $select = document.createElement('select');
    $select.id = name;
    $select.name = name;
    for (var _i = 0, _Object$entries = Object.entries(options); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        value = _Object$entries$_i[0],
        text = _Object$entries$_i[1];
      var $option = document.createElement('option');
      $option.value = value;
      $option.innerText = text;
      $select.appendChild($option);
    }
    $group.appendChild($select);
    if (defaultOption) {
      var i = Object.keys(options).findIndex(function (o) {
        return o == defaultOption;
      });
      if (i != -1) $select.selectedIndex = i;
    }
    var $error = document.createElement('div');
    $error.className = 'error';
    $group.appendChild($error);
    $body.appendChild($group);
  },
  addAction: function addAction(text, action, options) {
    var _a;
    var $btn = document.createElement('button');
    $btn.className = "btn ".concat((_a = options === null || options === void 0 ? void 0 : options.className) !== null && _a !== void 0 ? _a : '').trim();
    if (options === null || options === void 0 ? void 0 : options.disabled) $btn.disabled = true;
    if (options === null || options === void 0 ? void 0 : options.hidden) $btn.style.display = 'none';
    $btn.innerText = text;
    if (action != null) {
      $btn.addEventListener('click', typeof action === 'string' ? function () {
        return modal[action]();
      } : function () {
        return action();
      });
    }
    $footer.appendChild($btn);
  },
  cancel: function cancel() {
    if (!resolve) return;
    resolve({
      success: false,
      data: {}
    });
    resolve = null;
    modal.close();
  },
  getData: function getData() {
    var check = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var success = true;
    var data = {};
    var _iterator = _createForOfIteratorHelper($body.querySelectorAll('input')),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var $input = _step.value;
        var value = $input.value;
        if (check && inputChecks[$input.name]) {
          var error = inputChecks[$input.name](value);
          if (error) {
            var $container = $input.parentElement;
            var $error = $container.querySelector('.error');
            $container.classList.add('has-error');
            $error.innerText = error;
            success = false;
          }
        }
        data[$input.name] = value;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    var _iterator2 = _createForOfIteratorHelper($body.querySelectorAll('select')),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var $select = _step2.value;
        data[$select.name] = $select.value;
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return {
      success: success,
      data: data
    };
  },
  submit: function submit() {
    if (!resolve) return;
    var res = modal.getData();
    if (!res.success) return;
    resolve(res);
    resolve = null;
    modal.close();
  },
  open: function open() {
    $modalContainer.classList.remove('off');
    return new Promise(function (r) {
      return resolve = r;
    });
  },
  close: function close() {
    $modalContainer.classList.add('off');
  }
};
$modalContainer.addEventListener('click', function (e) {
  return e.target == $modalContainer && modal.cancel();
});
$closeBtn.addEventListener('click', function () {
  return modal.cancel();
});
exports["default"] = modal;

/***/ }),

/***/ "./src/ts/devices.ts":
/*!***************************!*\
  !*** ./src/ts/devices.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
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
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var _modal_1 = __importDefault(__webpack_require__(/*! ./_modal */ "./src/ts/_modal.ts"));
var $addBtn = document.querySelector('.add-btn');
var $cards = document.querySelector('.cards');
$addBtn.addEventListener('click', function () {
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var _yield$_modal_1$defau, success, data;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _modal_1["default"].setTitle('Adicionar dispositivo');
          _modal_1["default"].clear();
          _modal_1["default"].addText('Concede acesso ao painel de controlo a um novo dispositivo.');
          _modal_1["default"].addInput('deviceId', 'Código', {
            placeholder: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
            check: function check(value) {
              if (!value) return 'O código do dispositivo é obrigatório.';
              if (/[^0-9a-f-]/.test(value)) return 'Verifica se o código está correto.';
            },
            className: 'monospace'
          });
          _modal_1["default"].addInput('name', 'Nome', {
            placeholder: 'iPhone, Portátil, MacBook...',
            check: function check(value) {
              return !value && 'Um nome para o dispositivo é obrigatório.';
            }
          });
          _modal_1["default"].addAction('Cancelar', 'cancel', {
            className: 'secondary'
          });
          _modal_1["default"].addAction('Adicionar', 'submit');
          _context.next = 9;
          return _modal_1["default"].open();
        case 9:
          _yield$_modal_1$defau = _context.sent;
          success = _yield$_modal_1$defau.success;
          data = _yield$_modal_1$defau.data;
          if (success) {
            _context.next = 14;
            break;
          }
          return _context.abrupt("return");
        case 14:
          _context.next = 16;
          return fetch('/api/add-device', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
        case 16:
          location.reload();
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
});
var _iterator = _createForOfIteratorHelper($cards.querySelectorAll('.card')),
  _step;
try {
  var _loop = function _loop() {
    var $card = _step.value;
    var deviceId = $card.dataset.id;
    var $title = $card.querySelector('.title');
    var $editBtn = $card.querySelector('.edit-btn');
    var $revokeBtn = $card.querySelector('.revoke-btn');
    $editBtn.addEventListener('click', function () {
      return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var _yield$_modal_1$defau2, success, data;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _modal_1["default"].setTitle('Editar nome');
              _modal_1["default"].clear();
              _modal_1["default"].addInput('name', 'Nome', {
                placeholder: 'iPhone, Portátil, MacBook...',
                check: function check(value) {
                  return !value && 'Um nome para o dispositivo é obrigatório.';
                },
                "default": $title.innerText.trim()
              });
              _modal_1["default"].addAction('Cancelar', 'cancel', {
                className: 'secondary'
              });
              _modal_1["default"].addAction('Editar', 'submit');
              _context2.next = 7;
              return _modal_1["default"].open();
            case 7:
              _yield$_modal_1$defau2 = _context2.sent;
              success = _yield$_modal_1$defau2.success;
              data = _yield$_modal_1$defau2.data;
              if (success) {
                _context2.next = 12;
                break;
              }
              return _context2.abrupt("return");
            case 12:
              _context2.next = 14;
              return fetch('/api/change-device-name', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  deviceId: deviceId,
                  name: data.name
                })
              });
            case 14:
              location.reload();
            case 15:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
    });
    $revokeBtn.addEventListener('click', function () {
      return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var _yield$_modal_1$defau3, success;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _modal_1["default"].setTitle('Revogar acesso');
              _modal_1["default"].clear();
              _modal_1["default"].addText("O dispositivo \"".concat($title.innerText.trim(), "\" ir\xE1 deixar de ter acesso a este painel de controlo."));
              _modal_1["default"].addAction('Cancelar', 'cancel');
              _modal_1["default"].addAction('Revogar', 'submit', {
                className: 'danger'
              });
              _context3.next = 7;
              return _modal_1["default"].open();
            case 7:
              _yield$_modal_1$defau3 = _context3.sent;
              success = _yield$_modal_1$defau3.success;
              if (success) {
                _context3.next = 11;
                break;
              }
              return _context3.abrupt("return");
            case 11:
              _context3.next = 13;
              return fetch('/api/revoke-device', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  deviceId: deviceId
                })
              });
            case 13:
              location.reload();
            case 14:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
    });
  };
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    _loop();
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}

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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/ts/devices.ts");
/******/ 	
/******/ })()
;