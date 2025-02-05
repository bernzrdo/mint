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

/***/ "./src/ts/dashboard.ts":
/*!*****************************!*\
  !*** ./src/ts/dashboard.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var _modal_1 = __importDefault(__webpack_require__(/*! ./_modal */ "./src/ts/_modal.ts"));
var $dndBtn = document.querySelector('.dnd-btn');
$dndBtn.addEventListener('click', function () {
  _modal_1["default"].setTitle('Silenciar notificações');
  _modal_1["default"].clear();
  _modal_1["default"].addText('Obrigado pelo interesse! Infelizmente esta funcionalidade ainda não foi desenvolvida mas, se tiveres interesse, manifesta-o à nossa equipa.');
  _modal_1["default"].addAction('OK', 'submit');
  _modal_1["default"].open();
});

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/ts/dashboard.ts");
/******/ 	
/******/ })()
;