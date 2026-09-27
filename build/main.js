'use strict';

var obsidian = require('obsidian');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function _isPlaceholder(a) {
  return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
}

/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}

/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;

      case 1:
        return _isPlaceholder(a) ? f2 : _curry1(function (_b) {
          return fn(a, _b);
        });

      default:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function (_a) {
          return fn(_a, b);
        }) : _isPlaceholder(b) ? _curry1(function (_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
}

/**
 * Private `concat` function to merge two array-like objects.
 *
 * @private
 * @param {Array|Arguments} [set1=[]] An array-like object.
 * @param {Array|Arguments} [set2=[]] An array-like object.
 * @return {Array} A new, merged array.
 * @example
 *
 *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 */
function _concat(set1, set2) {
  set1 = set1 || [];
  set2 = set2 || [];
  var idx;
  var len1 = set1.length;
  var len2 = set2.length;
  var result = [];
  idx = 0;

  while (idx < len1) {
    result[result.length] = set1[idx];
    idx += 1;
  }

  idx = 0;

  while (idx < len2) {
    result[result.length] = set2[idx];
    idx += 1;
  }

  return result;
}

function _arity(n, fn) {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0:
      return function () {
        return fn.apply(this, arguments);
      };

    case 1:
      return function (a0) {
        return fn.apply(this, arguments);
      };

    case 2:
      return function (a0, a1) {
        return fn.apply(this, arguments);
      };

    case 3:
      return function (a0, a1, a2) {
        return fn.apply(this, arguments);
      };

    case 4:
      return function (a0, a1, a2, a3) {
        return fn.apply(this, arguments);
      };

    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.apply(this, arguments);
      };

    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.apply(this, arguments);
      };

    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.apply(this, arguments);
      };

    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.apply(this, arguments);
      };

    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.apply(this, arguments);
      };

    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.apply(this, arguments);
      };

    default:
      throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
}

/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @param {Array} received An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curryN(length, received, fn) {
  return function () {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;

    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;

      if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }

      combined[combinedIdx] = result;

      if (!_isPlaceholder(result)) {
        left -= 1;
      }

      combinedIdx += 1;
    }

    return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
  };
}

/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      const sumArgs = (...args) => R.sum(args);
 *
 *      const curriedAddFourNumbers = R.curryN(4, sumArgs);
 *      const f = curriedAddFourNumbers(1, 2);
 *      const g = f(3);
 *      g(4); //=> 10
 */

var curryN =
/*#__PURE__*/
_curry2(function curryN(length, fn) {
  if (length === 1) {
    return _curry1(fn);
  }

  return _arity(length, _curryN(length, [], fn));
});

/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curry3(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;

      case 1:
        return _isPlaceholder(a) ? f3 : _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        });

      case 2:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function (_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) ? _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        }) : _curry1(function (_c) {
          return fn(a, b, _c);
        });

      default:
        return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function (_a, _b) {
          return fn(_a, _b, c);
        }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function (_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        }) : _isPlaceholder(a) ? _curry1(function (_a) {
          return fn(_a, b, c);
        }) : _isPlaceholder(b) ? _curry1(function (_b) {
          return fn(a, _b, c);
        }) : _isPlaceholder(c) ? _curry1(function (_c) {
          return fn(a, b, _c);
        }) : fn(a, b, c);
    }
  };
}

/**
 * Tests whether or not an object is an array.
 *
 * @private
 * @param {*} val The object to test.
 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
 * @example
 *
 *      _isArray([]); //=> true
 *      _isArray(null); //=> false
 *      _isArray({}); //=> false
 */
var _isArray = Array.isArray || function _isArray(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
};

function _isTransformer(obj) {
  return obj != null && typeof obj['@@transducer/step'] === 'function';
}

/**
 * Returns a function that dispatches with different strategies based on the
 * object in list position (last argument). If it is an array, executes [fn].
 * Otherwise, if it has a function with one of the given method names, it will
 * execute that function (functor case). Otherwise, if it is a transformer,
 * uses transducer created by [transducerCreator] to return a new transformer
 * (transducer case).
 * Otherwise, it will default to executing [fn].
 *
 * @private
 * @param {Array} methodNames properties to check for a custom implementation
 * @param {Function} transducerCreator transducer factory if object is transformer
 * @param {Function} fn default ramda implementation
 * @return {Function} A function that dispatches on object in list position
 */

function _dispatchable(methodNames, transducerCreator, fn) {
  return function () {
    if (arguments.length === 0) {
      return fn();
    }

    var obj = arguments[arguments.length - 1];

    if (!_isArray(obj)) {
      var idx = 0;

      while (idx < methodNames.length) {
        if (typeof obj[methodNames[idx]] === 'function') {
          return obj[methodNames[idx]].apply(obj, Array.prototype.slice.call(arguments, 0, -1));
        }

        idx += 1;
      }

      if (_isTransformer(obj)) {
        var transducer = transducerCreator.apply(null, Array.prototype.slice.call(arguments, 0, -1));
        return transducer(obj);
      }
    }

    return fn.apply(this, arguments);
  };
}

var _xfBase = {
  init: function () {
    return this.xf['@@transducer/init']();
  },
  result: function (result) {
    return this.xf['@@transducer/result'](result);
  }
};

function _map(fn, functor) {
  var idx = 0;
  var len = functor.length;
  var result = Array(len);

  while (idx < len) {
    result[idx] = fn(functor[idx]);
    idx += 1;
  }

  return result;
}

function _isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
}

/**
 * Tests whether or not an object is similar to an array.
 *
 * @private
 * @category Type
 * @category List
 * @sig * -> Boolean
 * @param {*} x The object to test.
 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
 * @example
 *
 *      _isArrayLike([]); //=> true
 *      _isArrayLike(true); //=> false
 *      _isArrayLike({}); //=> false
 *      _isArrayLike({length: 10}); //=> false
 *      _isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 *      _isArrayLike({nodeType: 1, length: 1}) // => false
 */

var _isArrayLike =
/*#__PURE__*/
_curry1(function isArrayLike(x) {
  if (_isArray(x)) {
    return true;
  }

  if (!x) {
    return false;
  }

  if (typeof x !== 'object') {
    return false;
  }

  if (_isString(x)) {
    return false;
  }

  if (x.length === 0) {
    return true;
  }

  if (x.length > 0) {
    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
  }

  return false;
});

var XWrap =
/*#__PURE__*/
function () {
  function XWrap(fn) {
    this.f = fn;
  }

  XWrap.prototype['@@transducer/init'] = function () {
    throw new Error('init not implemented on XWrap');
  };

  XWrap.prototype['@@transducer/result'] = function (acc) {
    return acc;
  };

  XWrap.prototype['@@transducer/step'] = function (acc, x) {
    return this.f(acc, x);
  };

  return XWrap;
}();

function _xwrap(fn) {
  return new XWrap(fn);
}

/**
 * Creates a function that is bound to a context.
 * Note: `R.bind` does not provide the additional argument-binding capabilities of
 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @category Object
 * @sig (* -> *) -> {*} -> (* -> *)
 * @param {Function} fn The function to bind to context
 * @param {Object} thisObj The context to bind `fn` to
 * @return {Function} A function that will execute in the context of `thisObj`.
 * @see R.partial
 * @example
 *
 *      const log = R.bind(console.log, console);
 *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
 *      // logs {a: 2}
 * @symb R.bind(f, o)(a, b) = f.call(o, a, b)
 */

var bind =
/*#__PURE__*/
_curry2(function bind(fn, thisObj) {
  return _arity(fn.length, function () {
    return fn.apply(thisObj, arguments);
  });
});

function _arrayReduce(xf, acc, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    acc = xf['@@transducer/step'](acc, list[idx]);

    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }

    idx += 1;
  }

  return xf['@@transducer/result'](acc);
}

function _iterableReduce(xf, acc, iter) {
  var step = iter.next();

  while (!step.done) {
    acc = xf['@@transducer/step'](acc, step.value);

    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }

    step = iter.next();
  }

  return xf['@@transducer/result'](acc);
}

function _methodReduce(xf, acc, obj, methodName) {
  return xf['@@transducer/result'](obj[methodName](bind(xf['@@transducer/step'], xf), acc));
}

var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';
function _reduce(fn, acc, list) {
  if (typeof fn === 'function') {
    fn = _xwrap(fn);
  }

  if (_isArrayLike(list)) {
    return _arrayReduce(fn, acc, list);
  }

  if (typeof list['fantasy-land/reduce'] === 'function') {
    return _methodReduce(fn, acc, list, 'fantasy-land/reduce');
  }

  if (list[symIterator] != null) {
    return _iterableReduce(fn, acc, list[symIterator]());
  }

  if (typeof list.next === 'function') {
    return _iterableReduce(fn, acc, list);
  }

  if (typeof list.reduce === 'function') {
    return _methodReduce(fn, acc, list, 'reduce');
  }

  throw new TypeError('reduce: list must be array or iterable');
}

var XMap =
/*#__PURE__*/
function () {
  function XMap(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XMap.prototype['@@transducer/init'] = _xfBase.init;
  XMap.prototype['@@transducer/result'] = _xfBase.result;

  XMap.prototype['@@transducer/step'] = function (result, input) {
    return this.xf['@@transducer/step'](result, this.f(input));
  };

  return XMap;
}();

var _xmap =
/*#__PURE__*/
_curry2(function _xmap(f, xf) {
  return new XMap(f, xf);
});

function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var toString = Object.prototype.toString;

var _isArguments =
/*#__PURE__*/
function () {
  return toString.call(arguments) === '[object Arguments]' ? function _isArguments(x) {
    return toString.call(x) === '[object Arguments]';
  } : function _isArguments(x) {
    return _has('callee', x);
  };
}();

var hasEnumBug = !
/*#__PURE__*/
{
  toString: null
}.propertyIsEnumerable('toString');
var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString']; // Safari bug

var hasArgsEnumBug =
/*#__PURE__*/
function () {

  return arguments.propertyIsEnumerable('length');
}();

var contains = function contains(list, item) {
  var idx = 0;

  while (idx < list.length) {
    if (list[idx] === item) {
      return true;
    }

    idx += 1;
  }

  return false;
};
/**
 * Returns a list containing the names of all the enumerable own properties of
 * the supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own properties.
 * @see R.keysIn, R.values, R.toPairs
 * @example
 *
 *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
 */


var keys = typeof Object.keys === 'function' && !hasArgsEnumBug ?
/*#__PURE__*/
_curry1(function keys(obj) {
  return Object(obj) !== obj ? [] : Object.keys(obj);
}) :
/*#__PURE__*/
_curry1(function keys(obj) {
  if (Object(obj) !== obj) {
    return [];
  }

  var prop, nIdx;
  var ks = [];

  var checkArgsLength = hasArgsEnumBug && _isArguments(obj);

  for (prop in obj) {
    if (_has(prop, obj) && (!checkArgsLength || prop !== 'length')) {
      ks[ks.length] = prop;
    }
  }

  if (hasEnumBug) {
    nIdx = nonEnumerableProps.length - 1;

    while (nIdx >= 0) {
      prop = nonEnumerableProps[nIdx];

      if (_has(prop, obj) && !contains(ks, prop)) {
        ks[ks.length] = prop;
      }

      nIdx -= 1;
    }
  }

  return ks;
});

/**
 * Takes a function and
 * a [functor](https://github.com/fantasyland/fantasy-land#functor),
 * applies the function to each of the functor's values, and returns
 * a functor of the same shape.
 *
 * Ramda provides suitable `map` implementations for `Array` and `Object`,
 * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
 *
 * Dispatches to the `map` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * Also treats functions as functors and will compose them together.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => (a -> b) -> f a -> f b
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {Array} list The list to be iterated over.
 * @return {Array} The new list.
 * @see R.transduce, R.addIndex, R.pluck, R.project
 * @example
 *
 *      const double = x => x * 2;
 *
 *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
 *
 *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
 * @symb R.map(f, [a, b]) = [f(a), f(b)]
 * @symb R.map(f, { x: a, y: b }) = { x: f(a), y: f(b) }
 * @symb R.map(f, functor_o) = functor_o.map(f)
 */

var map =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_dispatchable(['fantasy-land/map', 'map'], _xmap, function map(fn, functor) {
  switch (Object.prototype.toString.call(functor)) {
    case '[object Function]':
      return curryN(functor.length, function () {
        return fn.call(this, functor.apply(this, arguments));
      });

    case '[object Object]':
      return _reduce(function (acc, key) {
        acc[key] = fn(functor[key]);
        return acc;
      }, {}, keys(functor));

    default:
      return _map(fn, functor);
  }
}));

/**
 * Returns the nth element of the given list or string. If n is negative the
 * element at index length + n is returned.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> a | Undefined
 * @sig Number -> String -> String
 * @param {Number} offset
 * @param {*} list
 * @return {*}
 * @example
 *
 *      const list = ['foo', 'bar', 'baz', 'quux'];
 *      R.nth(1, list); //=> 'bar'
 *      R.nth(-1, list); //=> 'quux'
 *      R.nth(-99, list); //=> undefined
 *
 *      R.nth(2, 'abc'); //=> 'c'
 *      R.nth(3, 'abc'); //=> ''
 * @symb R.nth(-1, [a, b, c]) = c
 * @symb R.nth(0, [a, b, c]) = a
 * @symb R.nth(1, [a, b, c]) = b
 */

var nth =
/*#__PURE__*/
_curry2(function nth(offset, list) {
  var idx = offset < 0 ? list.length + offset : offset;
  return _isString(list) ? list.charAt(idx) : list[idx];
});

/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It may use
 * [`R.reduced`](#reduced) to shortcut the iteration.
 *
 * The arguments' order of [`reduceRight`](#reduceRight)'s iterator function
 * is *(value, acc)*.
 *
 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 *
 * Dispatches to the `reduce` method of the third argument, if present. When
 * doing so, it is up to the user to handle the [`R.reduced`](#reduced)
 * shortcuting, as this is not implemented by `reduce`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduced, R.addIndex, R.reduceRight
 * @example
 *
 *      R.reduce(R.subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
 *      //          -               -10
 *      //         / \              / \
 *      //        -   4           -6   4
 *      //       / \              / \
 *      //      -   3   ==>     -3   3
 *      //     / \              / \
 *      //    -   2           -1   2
 *      //   / \              / \
 *      //  0   1            0   1
 *
 * @symb R.reduce(f, a, [b, c, d]) = f(f(f(a, b), c), d)
 */

var reduce =
/*#__PURE__*/
_curry3(_reduce);

/**
 * Returns a new list containing the contents of the given list, followed by
 * the given element.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} el The element to add to the end of the new list.
 * @param {Array} list The list of elements to add a new item to.
 *        list.
 * @return {Array} A new list containing the elements of the old list followed by `el`.
 * @see R.prepend
 * @example
 *
 *      R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
 *      R.append('tests', []); //=> ['tests']
 *      R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
 */

var append =
/*#__PURE__*/
_curry2(function append(el, list) {
  return _concat(list, [el]);
});

/**
 * Returns a list of all the enumerable own properties of the supplied object.
 * Note that the order of the output array is not guaranteed across different
 * JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [v]
 * @param {Object} obj The object to extract values from
 * @return {Array} An array of the values of the object's own properties.
 * @see R.valuesIn, R.keys, R.toPairs
 * @example
 *
 *      R.values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]
 */

var values =
/*#__PURE__*/
_curry1(function values(obj) {
  var props = keys(obj);
  var len = props.length;
  var vals = [];
  var idx = 0;

  while (idx < len) {
    vals[idx] = obj[props[idx]];
    idx += 1;
  }

  return vals;
});

/**
 * Gives a single-word string description of the (native) type of a value,
 * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
 * attempt to distinguish user Object types any further, reporting them all as
 * 'Object'.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Type
 * @sig (* -> {*}) -> String
 * @param {*} val The value to test
 * @return {String}
 * @example
 *
 *      R.type({}); //=> "Object"
 *      R.type(1); //=> "Number"
 *      R.type(false); //=> "Boolean"
 *      R.type('s'); //=> "String"
 *      R.type(null); //=> "Null"
 *      R.type([]); //=> "Array"
 *      R.type(/[A-z]/); //=> "RegExp"
 *      R.type(() => {}); //=> "Function"
 *      R.type(undefined); //=> "Undefined"
 */

var type =
/*#__PURE__*/
_curry1(function type(val) {
  return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
});

function _pipe(f, g) {
  return function () {
    return g.call(this, f.apply(this, arguments));
  };
}

/**
 * This checks whether a function has a [methodname] function. If it isn't an
 * array it will execute that function otherwise it will default to the ramda
 * implementation.
 *
 * @private
 * @param {Function} fn ramda implementation
 * @param {String} methodname property to check for a custom implementation
 * @return {Object} Whatever the return value of the method is.
 */

function _checkForMethod(methodname, fn) {
  return function () {
    var length = arguments.length;

    if (length === 0) {
      return fn();
    }

    var obj = arguments[length - 1];
    return _isArray(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));
  };
}

/**
 * Returns the elements of the given list or string (or object with a `slice`
 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
 *
 * Dispatches to the `slice` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @sig Number -> Number -> String -> String
 * @param {Number} fromIndex The start index (inclusive).
 * @param {Number} toIndex The end index (exclusive).
 * @param {*} list
 * @return {*}
 * @example
 *
 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
 */

var slice =
/*#__PURE__*/
_curry3(
/*#__PURE__*/
_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
  return Array.prototype.slice.call(list, fromIndex, toIndex);
}));

/**
 * Returns all but the first element of the given list or string (or object
 * with a `tail` method).
 *
 * Dispatches to the `slice` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.head, R.init, R.last
 * @example
 *
 *      R.tail([1, 2, 3]);  //=> [2, 3]
 *      R.tail([1, 2]);     //=> [2]
 *      R.tail([1]);        //=> []
 *      R.tail([]);         //=> []
 *
 *      R.tail('abc');  //=> 'bc'
 *      R.tail('ab');   //=> 'b'
 *      R.tail('a');    //=> ''
 *      R.tail('');     //=> ''
 */

var tail =
/*#__PURE__*/
_curry1(
/*#__PURE__*/
_checkForMethod('tail',
/*#__PURE__*/
slice(1, Infinity)));

/**
 * Performs left-to-right function composition. The first argument may have
 * any arity; the remaining arguments must be unary.
 *
 * In some libraries this function is named `sequence`.
 *
 * **Note:** The result of pipe is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.compose
 * @example
 *
 *      const f = R.pipe(Math.pow, R.negate, R.inc);
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb R.pipe(f, g, h)(a, b) = h(g(f(a, b)))
 * @symb R.pipe(f, g, h)(a)(b) = h(g(f(a)))(b)
 */

function pipe() {
  if (arguments.length === 0) {
    throw new Error('pipe requires at least one argument');
  }

  return _arity(arguments[0].length, reduce(_pipe, arguments[0], tail(arguments)));
}

/**
 * Returns a new list or string with the elements or characters in reverse
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {Array|String} list
 * @return {Array|String}
 * @example
 *
 *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
 *      R.reverse([1, 2]);     //=> [2, 1]
 *      R.reverse([1]);        //=> [1]
 *      R.reverse([]);         //=> []
 *
 *      R.reverse('abc');      //=> 'cba'
 *      R.reverse('ab');       //=> 'ba'
 *      R.reverse('a');        //=> 'a'
 *      R.reverse('');         //=> ''
 */

var reverse =
/*#__PURE__*/
_curry1(function reverse(list) {
  return _isString(list) ? list.split('').reverse().join('') : Array.prototype.slice.call(list, 0).reverse();
});

function _identity(x) {
  return x;
}

/**
 * A function that does nothing but return the parameter supplied to it. Good
 * as a default or placeholder function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig a -> a
 * @param {*} x The value to return.
 * @return {*} The input value, `x`.
 * @example
 *
 *      R.identity(1); //=> 1
 *
 *      const obj = {};
 *      R.identity(obj) === obj; //=> true
 * @symb R.identity(a) = a
 */

var identity =
/*#__PURE__*/
_curry1(_identity);

function _arrayFromIterator(iter) {
  var list = [];
  var next;

  while (!(next = iter.next()).done) {
    list.push(next.value);
  }

  return list;
}

function _includesWith(pred, x, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    if (pred(x, list[idx])) {
      return true;
    }

    idx += 1;
  }

  return false;
}

function _functionName(f) {
  // String(x => x) evaluates to "x => x", so the pattern may not match.
  var match = String(f).match(/^function (\w*)/);
  return match == null ? '' : match[1];
}

// Based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
function _objectIs(a, b) {
  // SameValue algorithm
  if (a === b) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return a !== 0 || 1 / a === 1 / b;
  } else {
    // Step 6.a: NaN == NaN
    return a !== a && b !== b;
  }
}

var _objectIs$1 = typeof Object.is === 'function' ? Object.is : _objectIs;

/**
 * private _uniqContentEquals function.
 * That function is checking equality of 2 iterator contents with 2 assumptions
 * - iterators lengths are the same
 * - iterators values are unique
 *
 * false-positive result will be returned for comparison of, e.g.
 * - [1,2,3] and [1,2,3,4]
 * - [1,1,1] and [1,2,3]
 * */

function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
  var a = _arrayFromIterator(aIterator);

  var b = _arrayFromIterator(bIterator);

  function eq(_a, _b) {
    return _equals(_a, _b, stackA.slice(), stackB.slice());
  } // if *a* array contains any element that is not included in *b*


  return !_includesWith(function (b, aItem) {
    return !_includesWith(eq, aItem, b);
  }, b, a);
}

function _equals(a, b, stackA, stackB) {
  if (_objectIs$1(a, b)) {
    return true;
  }

  var typeA = type(a);

  if (typeA !== type(b)) {
    return false;
  }

  if (typeof a['fantasy-land/equals'] === 'function' || typeof b['fantasy-land/equals'] === 'function') {
    return typeof a['fantasy-land/equals'] === 'function' && a['fantasy-land/equals'](b) && typeof b['fantasy-land/equals'] === 'function' && b['fantasy-land/equals'](a);
  }

  if (typeof a.equals === 'function' || typeof b.equals === 'function') {
    return typeof a.equals === 'function' && a.equals(b) && typeof b.equals === 'function' && b.equals(a);
  }

  switch (typeA) {
    case 'Arguments':
    case 'Array':
    case 'Object':
      if (typeof a.constructor === 'function' && _functionName(a.constructor) === 'Promise') {
        return a === b;
      }

      break;

    case 'Boolean':
    case 'Number':
    case 'String':
      if (!(typeof a === typeof b && _objectIs$1(a.valueOf(), b.valueOf()))) {
        return false;
      }

      break;

    case 'Date':
      if (!_objectIs$1(a.valueOf(), b.valueOf())) {
        return false;
      }

      break;

    case 'Error':
      return a.name === b.name && a.message === b.message;

    case 'RegExp':
      if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
        return false;
      }

      break;
  }

  var idx = stackA.length - 1;

  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b;
    }

    idx -= 1;
  }

  switch (typeA) {
    case 'Map':
      if (a.size !== b.size) {
        return false;
      }

      return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));

    case 'Set':
      if (a.size !== b.size) {
        return false;
      }

      return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));

    case 'Arguments':
    case 'Array':
    case 'Object':
    case 'Boolean':
    case 'Number':
    case 'String':
    case 'Date':
    case 'Error':
    case 'RegExp':
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'ArrayBuffer':
      break;

    default:
      // Values of other types are only equal if identical.
      return false;
  }

  var keysA = keys(a);

  if (keysA.length !== keys(b).length) {
    return false;
  }

  var extendedStackA = stackA.concat([a]);
  var extendedStackB = stackB.concat([b]);
  idx = keysA.length - 1;

  while (idx >= 0) {
    var key = keysA[idx];

    if (!(_has(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {
      return false;
    }

    idx -= 1;
  }

  return true;
}

/**
 * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
 * cyclical data structures.
 *
 * Dispatches symmetrically to the `equals` methods of both arguments, if
 * present.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> b -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      R.equals(1, 1); //=> true
 *      R.equals(1, '1'); //=> false
 *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
 *
 *      const a = {}; a.v = a;
 *      const b = {}; b.v = b;
 *      R.equals(a, b); //=> true
 */

var equals =
/*#__PURE__*/
_curry2(function equals(a, b) {
  return _equals(a, b, [], []);
});

function _indexOf(list, a, idx) {
  var inf, item; // Array.prototype.indexOf doesn't exist below IE9

  if (typeof list.indexOf === 'function') {
    switch (typeof a) {
      case 'number':
        if (a === 0) {
          // manually crawl the list to distinguish between +0 and -0
          inf = 1 / a;

          while (idx < list.length) {
            item = list[idx];

            if (item === 0 && 1 / item === inf) {
              return idx;
            }

            idx += 1;
          }

          return -1;
        } else if (a !== a) {
          // NaN
          while (idx < list.length) {
            item = list[idx];

            if (typeof item === 'number' && item !== item) {
              return idx;
            }

            idx += 1;
          }

          return -1;
        } // non-zero numbers can utilise Set


        return list.indexOf(a, idx);
      // all these types can utilise Set

      case 'string':
      case 'boolean':
      case 'function':
      case 'undefined':
        return list.indexOf(a, idx);

      case 'object':
        if (a === null) {
          // null can utilise Set
          return list.indexOf(a, idx);
        }

    }
  } // anything else not covered above, defer to R.equals


  while (idx < list.length) {
    if (equals(list[idx], a)) {
      return idx;
    }

    idx += 1;
  }

  return -1;
}

function _includes(a, list) {
  return _indexOf(list, a, 0) >= 0;
}

function _complement(f) {
  return function () {
    return !f.apply(this, arguments);
  };
}

function _filter(fn, list) {
  var idx = 0;
  var len = list.length;
  var result = [];

  while (idx < len) {
    if (fn(list[idx])) {
      result[result.length] = list[idx];
    }

    idx += 1;
  }

  return result;
}

function _isObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
}

var XFilter =
/*#__PURE__*/
function () {
  function XFilter(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XFilter.prototype['@@transducer/init'] = _xfBase.init;
  XFilter.prototype['@@transducer/result'] = _xfBase.result;

  XFilter.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
  };

  return XFilter;
}();

var _xfilter =
/*#__PURE__*/
_curry2(function _xfilter(f, xf) {
  return new XFilter(f, xf);
});

/**
 * Takes a predicate and a `Filterable`, and returns a new filterable of the
 * same type containing the members of the given filterable which satisfy the
 * given predicate. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * Dispatches to the `filter` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array} Filterable
 * @see R.reject, R.transduce, R.addIndex
 * @example
 *
 *      const isEven = n => n % 2 === 0;
 *
 *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */

var filter =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_dispatchable(['fantasy-land/filter', 'filter'], _xfilter, function (pred, filterable) {
  return _isObject(filterable) ? _reduce(function (acc, key) {
    if (pred(filterable[key])) {
      acc[key] = filterable[key];
    }

    return acc;
  }, {}, keys(filterable)) : // else
  _filter(pred, filterable);
}));

/**
 * The complement of [`filter`](#filter).
 *
 * Acts as a transducer if a transformer is given in list position. Filterable
 * objects include plain objects or any object that has a filter method such
 * as `Array`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array}
 * @see R.filter, R.transduce, R.addIndex
 * @example
 *
 *      const isOdd = (n) => n % 2 !== 0;
 *
 *      R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.reject(isOdd, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */

var reject =
/*#__PURE__*/
_curry2(function reject(pred, filterable) {
  return filter(_complement(pred), filterable);
});

var XDrop =
/*#__PURE__*/
function () {
  function XDrop(n, xf) {
    this.xf = xf;
    this.n = n;
  }

  XDrop.prototype['@@transducer/init'] = _xfBase.init;
  XDrop.prototype['@@transducer/result'] = _xfBase.result;

  XDrop.prototype['@@transducer/step'] = function (result, input) {
    if (this.n > 0) {
      this.n -= 1;
      return result;
    }

    return this.xf['@@transducer/step'](result, input);
  };

  return XDrop;
}();

var _xdrop =
/*#__PURE__*/
_curry2(function _xdrop(n, xf) {
  return new XDrop(n, xf);
});

/**
 * Returns all but the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `drop` method).
 *
 * Dispatches to the `drop` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n
 * @param {*} list
 * @return {*} A copy of list without the first `n` elements
 * @see R.take, R.transduce, R.dropLast, R.dropWhile
 * @example
 *
 *      R.drop(1, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.drop(2, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.drop(3, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(4, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(3, 'ramda');               //=> 'da'
 */

var drop =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_dispatchable(['drop'], _xdrop, function drop(n, xs) {
  return slice(Math.max(0, n), Infinity, xs);
}));

/**
 * Returns the last element of the given list or string.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.init, R.head, R.tail
 * @example
 *
 *      R.last(['fi', 'fo', 'fum']); //=> 'fum'
 *      R.last([]); //=> undefined
 *
 *      R.last('abc'); //=> 'c'
 *      R.last(''); //=> ''
 */

var last =
/*#__PURE__*/
nth(-1);

/**
 * Returns a new list containing the last `n` elements of the given list.
 * If `n > list.length`, returns a list of `list.length` elements.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n The number of elements to return.
 * @param {Array} xs The collection to consider.
 * @return {Array}
 * @see R.dropLast
 * @example
 *
 *      R.takeLast(1, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.takeLast(2, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.takeLast(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(3, 'ramda');               //=> 'mda'
 */

var takeLast =
/*#__PURE__*/
_curry2(function takeLast(n, xs) {
  return drop(n >= 0 ? xs.length - n : 0, xs);
});

/**
 * Returns a new function much like the supplied one, except that the first two
 * arguments' order is reversed.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((a, b, c, ...) -> z) -> (b -> a -> c -> ... -> z)
 * @param {Function} fn The function to invoke with its first two parameters reversed.
 * @return {*} The result of invoking `fn` with its first two parameters' order reversed.
 * @example
 *
 *      const mergeThree = (a, b, c) => [].concat(a, b, c);
 *
 *      mergeThree(1, 2, 3); //=> [1, 2, 3]
 *
 *      R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
 * @symb R.flip(f)(a, b, c) = f(b, a, c)
 */

var flip =
/*#__PURE__*/
_curry1(function flip(fn) {
  return curryN(fn.length, function (a, b) {
    var args = Array.prototype.slice.call(arguments, 0);
    args[0] = b;
    args[1] = a;
    return fn.apply(this, args);
  });
});

/**
 * Iterate over an input `object`, calling a provided function `fn` for each
 * key and value in the object.
 *
 * `fn` receives three argument: *(value, key, obj)*.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Object
 * @sig ((a, String, StrMap a) -> Any) -> StrMap a -> StrMap a
 * @param {Function} fn The function to invoke. Receives three argument, `value`, `key`, `obj`.
 * @param {Object} obj The object to iterate over.
 * @return {Object} The original object.
 * @example
 *
 *      const printKeyConcatValue = (value, key) => console.log(key + ':' + value);
 *      R.forEachObjIndexed(printKeyConcatValue, {x: 1, y: 2}); //=> {x: 1, y: 2}
 *      // logs x:1
 *      // logs y:2
 * @symb R.forEachObjIndexed(f, {x: a, y: b}) = {x: a, y: b}
 */

var forEachObjIndexed =
/*#__PURE__*/
_curry2(function forEachObjIndexed(fn, obj) {
  var keyList = keys(obj);
  var idx = 0;

  while (idx < keyList.length) {
    var key = keyList[idx];
    fn(obj[key], key, obj);
    idx += 1;
  }

  return obj;
});

/**
 * Returns the position of the first occurrence of an item in an array, or -1
 * if the item is not included in the array. [`R.equals`](#equals) is used to
 * determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Number
 * @param {*} target The item to find.
 * @param {Array} xs The array to search in.
 * @return {Number} the index of the target, or -1 if the target is not found.
 * @see R.lastIndexOf, R.findIndex
 * @example
 *
 *      R.indexOf(3, [1,2,3,4]); //=> 2
 *      R.indexOf(10, [1,2,3,4]); //=> -1
 */

var indexOf =
/*#__PURE__*/
_curry2(function indexOf(target, xs) {
  return typeof xs.indexOf === 'function' && !_isArray(xs) ? xs.indexOf(target) : _indexOf(xs, target, 0);
});

function _objectAssign(target) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var output = Object(target);
  var idx = 1;
  var length = arguments.length;

  while (idx < length) {
    var source = arguments[idx];

    if (source != null) {
      for (var nextKey in source) {
        if (_has(nextKey, source)) {
          output[nextKey] = source[nextKey];
        }
      }
    }

    idx += 1;
  }

  return output;
}

var _objectAssign$1 = typeof Object.assign === 'function' ? Object.assign : _objectAssign;

/**
 * Tests a regular expression against a String. Note that this function will
 * return an empty array when there are no matches. This differs from
 * [`String.prototype.match`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
 * which returns `null` when there are no matches.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category String
 * @sig RegExp -> String -> [String | Undefined]
 * @param {RegExp} rx A regular expression.
 * @param {String} str The string to match against
 * @return {Array} The list of matches or empty array.
 * @see R.test
 * @example
 *
 *      R.match(/([a-z]a)/g, 'bananas'); //=> ['ba', 'na', 'na']
 *      R.match(/a/, 'b'); //=> []
 *      R.match(/a/, null); //=> TypeError: null does not have a method named "match"
 */

var match =
/*#__PURE__*/
_curry2(function match(rx, str) {
  return str.match(rx) || [];
});

/**
 * Create a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects,
 * the value from the first object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Object
 * @sig {k: v} -> {k: v} -> {k: v}
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeRight, R.mergeDeepLeft, R.mergeWith, R.mergeWithKey
 * @example
 *
 *      R.mergeLeft({ 'age': 40 }, { 'name': 'fred', 'age': 10 });
 *      //=> { 'name': 'fred', 'age': 40 }
 *
 *      const resetToDefault = R.mergeLeft({x: 0});
 *      resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}
 * @symb R.mergeLeft(a, b) = {...b, ...a}
 */

var mergeLeft =
/*#__PURE__*/
_curry2(function mergeLeft(l, r) {
  return _objectAssign$1({}, r, l);
});

/**
 * Sorts the list according to the supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord b => (a -> b) -> [a] -> [a]
 * @param {Function} fn
 * @param {Array} list The list to sort.
 * @return {Array} A new list sorted by the keys generated by `fn`.
 * @example
 *
 *      const sortByFirstItem = R.sortBy(R.prop(0));
 *      const pairs = [[-1, 1], [-2, 2], [-3, 3]];
 *      sortByFirstItem(pairs); //=> [[-3, 3], [-2, 2], [-1, 1]]
 *
 *      const sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));
 *      const alice = {
 *        name: 'ALICE',
 *        age: 101
 *      };
 *      const bob = {
 *        name: 'Bob',
 *        age: -10
 *      };
 *      const clara = {
 *        name: 'clara',
 *        age: 314.159
 *      };
 *      const people = [clara, bob, alice];
 *      sortByNameCaseInsensitive(people); //=> [alice, bob, clara]
 */

var sortBy =
/*#__PURE__*/
_curry2(function sortBy(fn, list) {
  return Array.prototype.slice.call(list, 0).sort(function (a, b) {
    var aa = fn(a);
    var bb = fn(b);
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  });
});

/**
 * Returns a new list without values in the first argument.
 * [`R.equals`](#equals) is used to determine equality.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @param {Array} list1 The values to be removed from `list2`.
 * @param {Array} list2 The array to remove values from.
 * @return {Array} The new array without values in `list1`.
 * @see R.transduce, R.difference, R.remove
 * @example
 *
 *      R.without([1, 2], [1, 2, 1, 3, 4]); //=> [3, 4]
 */

var without =
/*#__PURE__*/
_curry2(function (xs, list) {
  return reject(flip(_includes)(xs), list);
});

// Material Design Icons v7.0.96
var mdiChevronDown = "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z";
var mdiChevronUp = "M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z";
var mdiCircleSmall = "M12,10A2,2 0 0,0 10,12C10,13.11 10.9,14 12,14C13.11,14 14,13.11 14,12A2,2 0 0,0 12,10Z";
var mdiCodeTags = "M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z";
var mdiDivision = "M19,13H5V11H19V13M12,5A2,2 0 0,1 14,7A2,2 0 0,1 12,9A2,2 0 0,1 10,7A2,2 0 0,1 12,5M12,15A2,2 0 0,1 14,17A2,2 0 0,1 12,19A2,2 0 0,1 10,17A2,2 0 0,1 12,15Z";
var mdiFileLink = "M14 2H6C4.89 2 4 2.89 4 4V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V8L14 2M11 20H10C8.39 20 6 18.94 6 16C6 13.07 8.39 12 10 12H11V14H10C9.54 14 8 14.17 8 16C8 17.9 9.67 18 10 18H11V20M15 15V17H9V15H15M14 20H13V18H14C14.46 18 16 17.83 16 16C16 14.1 14.33 14 14 14H13V12H14C15.61 12 18 13.07 18 16C18 18.94 15.61 20 14 20M13 9V3.5L18.5 9H13Z";
var mdiFormatBold = "M13.5,15.5H10V12.5H13.5A1.5,1.5 0 0,1 15,14A1.5,1.5 0 0,1 13.5,15.5M10,6.5H13A1.5,1.5 0 0,1 14.5,8A1.5,1.5 0 0,1 13,9.5H10M15.6,10.79C16.57,10.11 17.25,9 17.25,8C17.25,5.74 15.5,4 13.25,4H7V18H14.04C16.14,18 17.75,16.3 17.75,14.21C17.75,12.69 16.89,11.39 15.6,10.79Z";
var mdiFormatHeader1 = "M3,4H5V10H9V4H11V18H9V12H5V18H3V4M14,18V16H16V6.31L13.5,7.75V5.44L16,4H18V16H20V18H14Z";
var mdiFormatHeader2 = "M3,4H5V10H9V4H11V18H9V12H5V18H3V4M21,18H15A2,2 0 0,1 13,16C13,15.47 13.2,15 13.54,14.64L18.41,9.41C18.78,9.05 19,8.55 19,8A2,2 0 0,0 17,6A2,2 0 0,0 15,8H13A4,4 0 0,1 17,4A4,4 0 0,1 21,8C21,9.1 20.55,10.1 19.83,10.83L15,16H21V18Z";
var mdiFormatHeader3 = "M3,4H5V10H9V4H11V18H9V12H5V18H3V4M15,4H19A2,2 0 0,1 21,6V16A2,2 0 0,1 19,18H15A2,2 0 0,1 13,16V15H15V16H19V12H15V10H19V6H15V7H13V6A2,2 0 0,1 15,4Z";
var mdiFormatHeader4 = "M3,4H5V10H9V4H11V18H9V12H5V18H3V4M18,18V13H13V11L18,4H20V11H21V13H20V18H18M18,11V7.42L15.45,11H18Z";
var mdiFormatHeader5 = "M3,4H5V10H9V4H11V18H9V12H5V18H3V4M15,4H20V6H15V10H17A4,4 0 0,1 21,14A4,4 0 0,1 17,18H15A2,2 0 0,1 13,16V15H15V16H17A2,2 0 0,0 19,14A2,2 0 0,0 17,12H15A2,2 0 0,1 13,10V6A2,2 0 0,1 15,4Z";
var mdiFormatHeader6 = "M3,4H5V10H9V4H11V18H9V12H5V18H3V4M15,4H19A2,2 0 0,1 21,6V7H19V6H15V10H19A2,2 0 0,1 21,12V16A2,2 0 0,1 19,18H15A2,2 0 0,1 13,16V6A2,2 0 0,1 15,4M15,12V16H19V12H15Z";
var mdiFormatIndentIncrease = "M11,13H21V11H11M11,9H21V7H11M3,3V5H21V3M11,17H21V15H11M3,8V16L7,12M3,21H21V19H3V21Z";
var mdiFormatItalic = "M10,4V7H12.21L8.79,15H6V18H14V15H11.79L15.21,7H18V4H10Z";
var mdiFormatListBulleted = "M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z";
var mdiFormatListBulletedSquare = "M3,4H7V8H3V4M9,5V7H21V5H9M3,10H7V14H3V10M9,11V13H21V11H9M3,16H7V20H3V16M9,17V19H21V17H9";
var mdiFormatListNumbered = "M7,13V11H21V13H7M7,19V17H21V19H7M7,7V5H21V7H7M3,8V5H2V4H4V8H3M2,17V16H5V20H2V19H4V18.5H3V17.5H4V17H2M4.25,10A0.75,0.75 0 0,1 5,10.75C5,10.95 4.92,11.14 4.79,11.27L3.12,13H5V14H2V13.08L4,11H2V10H4.25Z";
var mdiFormatStrikethroughVariant = "M23,12V14H18.61C19.61,16.14 19.56,22 12.38,22C4.05,22.05 4.37,15.5 4.37,15.5L8.34,15.55C8.37,18.92 11.5,18.92 12.12,18.88C12.76,18.83 15.15,18.84 15.34,16.5C15.42,15.41 14.32,14.58 13.12,14H1V12H23M19.41,7.89L15.43,7.86C15.43,7.86 15.6,5.09 12.15,5.08C8.7,5.06 9,7.28 9,7.56C9.04,7.84 9.34,9.22 12,9.88H5.71C5.71,9.88 2.22,3.15 10.74,2C19.45,0.8 19.43,7.91 19.41,7.89Z";
var mdiFormatUnderline = "M5,21H19V19H5V21M12,17A6,6 0 0,0 18,11V3H15.5V11A3.5,3.5 0 0,1 12,14.5A3.5,3.5 0 0,1 8.5,11V3H6V11A6,6 0 0,0 12,17Z";
var mdiGraph = "M19.5 17C19.37 17 19.24 17 19.11 17.04L17.5 13.79C17.95 13.34 18.25 12.71 18.25 12C18.25 10.62 17.13 9.5 15.75 9.5C15.62 9.5 15.5 9.5 15.36 9.54L13.73 6.29C14.21 5.84 14.5 5.21 14.5 4.5C14.5 3.12 13.38 2 12 2S9.5 3.12 9.5 4.5C9.5 5.21 9.79 5.84 10.26 6.29L8.64 9.54C8.5 9.5 8.38 9.5 8.25 9.5C6.87 9.5 5.75 10.62 5.75 12C5.75 12.71 6.05 13.34 6.5 13.79L4.89 17.04C4.76 17 4.63 17 4.5 17C3.12 17 2 18.12 2 19.5C2 20.88 3.12 22 4.5 22S7 20.88 7 19.5C7 18.8 6.71 18.16 6.24 17.71L7.86 14.46C8 14.5 8.12 14.5 8.25 14.5C8.38 14.5 8.5 14.5 8.64 14.46L10.27 17.71C9.8 18.16 9.5 18.8 9.5 19.5C9.5 20.88 10.62 22 12 22S14.5 20.88 14.5 19.5C14.5 18.12 13.38 17 12 17C11.87 17 11.74 17 11.61 17.04L10 13.79C10.46 13.34 10.75 12.71 10.75 12S10.46 10.66 10 10.21L11.61 6.96C11.74 7 11.87 7 12 7S12.26 7 12.39 6.96L14 10.21C13.55 10.66 13.25 11.3 13.25 12C13.25 13.38 14.37 14.5 15.75 14.5C15.88 14.5 16 14.5 16.14 14.46L17.77 17.71C17.3 18.16 17 18.8 17 19.5C17 20.88 18.12 22 19.5 22S22 20.88 22 19.5C22 18.12 20.88 17 19.5 17Z";
var mdiImage = "M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z";
var mdiLanguageMarkdown = "M20.56 18H3.44C2.65 18 2 17.37 2 16.59V7.41C2 6.63 2.65 6 3.44 6H20.56C21.35 6 22 6.63 22 7.41V16.59C22 17.37 21.35 18 20.56 18M6.81 15.19V11.53L8.73 13.88L10.65 11.53V15.19H12.58V8.81H10.65L8.73 11.16L6.81 8.81H4.89V15.19H6.81M19.69 12H17.77V8.81H15.85V12H13.92L16.81 15.28L19.69 12Z";
var mdiLinkVariant = "M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z";
var mdiMarker = "M18.5,1.15C17.97,1.15 17.46,1.34 17.07,1.73L11.26,7.55L16.91,13.2L22.73,7.39C23.5,6.61 23.5,5.35 22.73,4.56L19.89,1.73C19.5,1.34 19,1.15 18.5,1.15M10.3,8.5L4.34,14.46C3.56,15.24 3.56,16.5 4.36,17.31C3.14,18.54 1.9,19.77 0.67,21H6.33L7.19,20.14C7.97,20.9 9.22,20.89 10,20.12L15.95,14.16";
var mdiMenu = "M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z";
var mdiXml = "M12.89,3L14.85,3.4L11.11,21L9.15,20.6L12.89,3M19.59,12L16,8.41V5.58L22.42,12L16,18.41V15.58L19.59,12M1.58,12L8,5.58V8.41L4.41,12L8,15.58V18.41L1.58,12Z";

var greek = {
    alpha: 'M 14.401734,12.57328 13.755395,9.1800053 Q 13.094368,5.7132827 10.479636,5.6985932 8.5112431,5.6839037 7.6151835,7.3144385 6.4840918,9.3269003 6.4840918,12.015079 q 0,3.231691 1.1017126,4.774088 1.1164022,1.571777 2.8938316,1.571777 1.968394,0 3.026038,-3.128864 z m 1.513018,-4.4949874 1.454261,-4.3040242 h 2.409078 l -3.011348,8.9165276 0.58758,3.217001 q 0.132206,0.719786 0.646339,1.322056 0.602269,0.705096 1.072333,0.705096 h 1.292676 v 2.291562 h -1.615845 q -1.380813,0 -2.614731,-1.233918 -0.60227,-0.616959 -0.851991,-1.909635 -0.646338,1.571776 -2.056531,2.908521 -0.646338,0.616959 -2.746937,0.60227 -3.4373431,-0.02938 -5.1266359,-2.232805 -1.7186718,-2.291562 -1.7186718,-6.345865 0,-4.362782 1.8655668,-6.3458648 2.0712198,-2.2181148 4.9797409,-2.2621833 4.568436,-0.073448 5.435116,4.6712617 z',
    Alpha: "M 12,5.0899277 8.5418087,14.467431 H 15.470813 Z M 10.561191,2.5783215 h 2.89024 L 20.632858,21.421678 H 17.98242 L 16.265945,16.587782 H 7.7719191 L 6.0554443,21.421678 H 3.3671424 Z",
    Beta: 'm 7.8859735,12.420825 v 6.871367 h 4.0700605 q 2.047592,0 3.027421,-0.841648 0.992391,-0.85421 0.992391,-2.600316 0,-1.758668 -0.992391,-2.587755 -0.979829,-0.841648 -3.027421,-0.841648 z m 0,-7.7130155 v 5.6528615 h 3.7560125 q 1.859163,0 2.763621,-0.6909053 0.91702,-0.7034672 0.91702,-2.1355255 0,-1.4194963 -0.91702,-2.1229635 Q 13.501149,4.7078095 11.641986,4.7078095 Z M 5.3484667,2.6225317 h 6.4819483 q 2.901802,0 4.472041,1.2059437 1.570239,1.2059438 1.570239,3.4294027 0,1.7209823 -0.803962,2.7384974 -0.803963,1.0175155 -2.36164,1.2687535 1.871725,0.401981 2.901802,1.683296 1.042639,1.268754 1.042639,3.178165 0,2.512383 -1.70842,3.881631 -1.708421,1.369249 -4.861461,1.369249 H 5.3484667 Z',
    beta: 'm 9.2302992,16.654701 v 4.585227 H 7.5166283 V 6.9840389 q 0,-4.2239673 3.9460747,-4.2239673 4.001653,0 4.020179,3.5662882 0.02779,2.5380856 -1.59325,3.4643942 2.584401,0.833678 2.593664,3.306922 0.01853,4.399966 -4.464808,4.390703 -1.963774,-0.0093 -2.7881888,-0.833678 z m 0,-2.223141 q 1.0282028,1.611777 2.8530308,1.602514 2.667769,0 2.667769,-2.908609 0,-2.61219 -4.298072,-2.408402 V 9.142338 q 3.3625,0.055578 3.3625,-2.9641876 0,-2.0378789 -2.167562,-2.0286159 -2.4176658,0 -2.4176658,2.8900829 z',
    chi: 'M 13.641778,18.976096 11.900675,14.500644 8.3133019,21.044386 H 5.7776018 L 10.849002,11.789665 8.7222858,6.2859105 Q 8.1497084,4.8135685 6.3501792,4.8135685 H 5.7776018 V 2.9672983 l 0.8179678,0.02337 q 3.0147955,0.081797 3.7743374,2.0332342 l 1.729417,4.4754523 3.587373,-6.5437422 h 2.5357 l -5.0714,9.2547209 2.126716,5.503755 q 0.572578,1.472342 2.372107,1.472342 h 0.572577 v 1.84627 l -0.817967,-0.02337 q -3.014796,-0.0818 -3.762652,-2.033235 z',
    Chi: 'm 3.4596471,0.83472184 h 3.2456333 l 5.5489856,8.30104376 5.5789,-8.30104376 h 3.245633 l -7.179281,10.72405116 7.6579,11.606504 h -3.245633 l -6.281871,-9.49759 -6.3267416,9.49759 H 2.4425822 L 10.414576,11.244679 Z',
    delta: 'M 16.356173,5.6275098 Q 15.17758,4.8186714 12.415974,4.8186714 q -2.923373,0 -2.923373,1.3519156 0,1.0630447 3.050476,1.6176768 2.403406,0.4275289 3.755322,1.7216703 1.640786,1.5599029 1.640786,4.7605919 0,3.062031 -1.583012,4.864585 Q 14.77316,20.94922 12,20.94922 q -2.7616053,0 -4.3561725,-1.814109 -1.5830123,-1.802554 -1.5830123,-4.980133 0,-2.357187 1.5830123,-4.2637343 Q 8.2562338,9.1517343 9.1228463,8.7357602 7.3202922,7.8229283 7.3202922,6.1936966 q 0,-3.1429149 5.0956818,-3.1429149 2.553619,0 3.940199,0.8088384 z m -5.63876,3.6859921 q -0.7857282,0.3350902 -1.4212441,1.1785931 -0.9937158,1.305696 -0.9937158,3.662883 0,2.345631 0.9821609,3.662882 0.993716,1.328806 2.715386,1.328806 1.698561,0 2.692277,-1.340361 0.993715,-1.340361 0.993715,-3.535779 0,-2.299412 -1.05149,-3.408676 Q 13.513683,9.6717018 12.057774,9.5445986 11.318265,9.4752696 10.717413,9.3135019 Z',
    Delta: 'M 12,5.4972069 7.1303291,18.870986 H 16.881548 Z M 3.8759636,20.866364 10.645994,3.1336349 h 2.719889 l 6.758153,17.7327291 z',
    epsilon: 'M 9.6932475,11.339868 Q 8.0317921,10.983842 7.1417267,10.019604 6.2516613,9.0702014 6.2516613,7.6906 q 0,-2.0916537 1.6911243,-3.2635732 1.6762898,-1.157085 4.5838364,-1.157085 1.127417,0 2.388343,0.178013 1.260926,0.1780131 2.714699,0.5340393 V 6.4593428 Q 16.190725,6.0291445 15.003971,5.836297 13.802383,5.6434495 12.749139,5.6434495 q -1.765297,0 -2.7888718,0.6823835 -1.0384097,0.6823835 -1.0384097,1.6317866 0,1.0384097 1.0087408,1.7059587 0.9939067,0.6527147 2.7146997,0.6527147 h 2.299335 v 2.254832 h -2.195494 q -2.032316,0 -3.1003947,0.756556 -1.1570851,0.830728 -1.1570851,2.136157 0,1.335098 1.2460916,2.165826 1.2609262,0.830727 3.5009242,0.830727 1.379601,0 2.640527,-0.267019 1.260926,-0.281854 2.31417,-0.830728 v 2.536687 q -1.335098,0.415363 -2.581189,0.623045 -1.260926,0.207682 -2.44768,0.207682 -3.5305931,0 -5.4442338,-1.349932 -1.9136406,-1.349933 -1.9136406,-3.916288 0,-1.602118 1.0235752,-2.685031 1.0235752,-1.082913 2.8630437,-1.438939 z',
    Epsilon: 'M 6.2256278,3.0383187 H 17.558283 V 5.079157 H 8.650624 v 5.30618 h 8.535506 v 2.040838 H 8.650624 v 6.494668 h 9.123748 v 2.040838 H 6.2256278 Z',
    epsilonV2: 'M 18.514318,6.2709902 Q 17.960863,6.076533 17.407408,5.9269504 15.926541,5.5380359 14.340966,5.5380359 q -2.73736,0 -4.263102,1.480867 Q 8.6568302,8.3950621 8.3875817,10.923007 H 18.514318 v 2.153988 H 8.3875817 q 0.2692485,2.527945 1.6902823,3.904104 1.525742,1.480867 4.263102,1.480867 1.914656,0 3.066442,-0.388915 l 1.10691,-0.373956 v 2.498028 l -1.181702,0.269249 q -1.555658,0.329081 -3.156191,0.329081 -4.008811,0 -6.3422987,-2.333487 -2.3484455,-2.333488 -2.3484455,-6.461965 0,-4.1284778 2.3484455,-6.4619651 2.3334877,-2.3334874 6.3422987,-2.3334874 1.510784,0 3.156191,0.3290816 0.598331,0.119666 1.181702,0.299165 z',
    eta: 'M 17.268669,8.4557243 V 20.835414 H 15.201643 V 8.5231273 q 0,-1.7861803 -0.696498,-2.6736535 -0.696498,-0.8874732 -2.089494,-0.8874732 -1.673842,0 -2.6399523,1.0672146 -0.96611,1.0672147 -0.96611,2.9095641 V 16.049799 H 6.7313286 V 3.4679001 H 8.8095887 V 5.422588 Q 9.551022,4.2879703 10.550834,3.7262784 q 1.011045,-0.5616919 2.325404,-0.5616919 2.168131,0 3.280281,1.3368267 1.11215,1.3480606 1.11215,3.9543111 z',
    Eta: 'M 5.1765843,3.0480151 H 7.5989568 V 10.387084 H 16.401043 V 3.0480151 h 2.422373 V 20.951986 H 16.401043 V 12.425715 H 7.5989568 v 8.526271 H 5.1765843 Z',
    gamma: 'M 9.3393684,5.1089069 12.167372,13.096573 16.207376,3.0773617 h 2.25086 L 13.229316,16.005377 V 20.92264 H 11.105428 V 16.005377 L 7.7118237,6.3555369 Q 7.2039374,4.9011352 6.1073647,4.9011352 H 5.541764 V 3.0773617 h 0.8080009 q 2.2739456,0 2.9896035,2.0315452 z',
    Gamma: 'M 6.4626058,20.89917 V 3.1008309 H 17.537393 V 5.1274335 H 8.8706865 V 20.89917 Z',
    iota: 'M 11.406705,3.4808912 V 14.510095 q 0,2.205841 0.517232,2.905625 0.547657,0.730209 2.190628,0.730209 h 1.35393 v 2.373181 h -1.68861 q -2.738285,0 -3.9857258,-1.460419 -1.247441,-1.490844 -1.247441,-4.715935 L 8.5315055,3.4808912 Z',
    Iota: 'M 2.8576269,0.82926106 H 5.2855426 V 18.774202 H 2.8576269 Z',
    kappa: 'm 1.7263958,1.4153005 h 2.9457887 v 7.20943 l 7.4885045,-7.20943 h 3.47293 L 8.7962885,7.958052 16.703405,18.779949 H 13.214971 L 6.7962531,9.8185501 4.6721845,11.818586 v 6.961363 H 1.7263958 Z',
    kappaV2: 'M 10.230844,14.202115 Q 8.7976033,18.158456 5.8116853,20.009725 3.7066132,21.338459 3.6618244,19.173668 3.6468948,18.158456 4.5575998,16.904371 5.9908404,14.933665 8.0212646,13.082396 9.3798573,10.051689 8.7378849,7.5285883 8.3497156,5.975911 6.2297138,5.975911 q -0.8509866,0 -2.2095793,1.6123957 V 4.2440785 Q 5.2443609,3.3333736 7.1254892,3.5871766 10.798168,4.0649235 11.290845,7.648025 q 0.283662,2.0901426 -0.343381,3.762257 l 2.821693,-1.612396 q 1.43324,-3.9563413 4.419158,-5.8076105 2.105072,-1.3287335 2.149861,0.836057 0.01493,1.0152122 -0.895775,2.2692977 -1.433241,1.9707059 -3.463665,3.8219748 -1.358593,3.030707 -0.71662,5.553808 0.388169,1.552677 2.508171,1.552677 0.850986,0 2.209579,-1.612396 v 3.344228 q -1.224226,0.910705 -3.105355,0.656902 -3.672679,-0.477747 -4.165355,-4.060848 -0.283662,-2.090143 0.34338,-3.762257 z',
    Kappa: 'M 5.0808843,3.2824989 H 7.4398065 V 10.651211 L 15.263954,3.2824989 h 3.036237 L 9.6469168,11.41027 18.919116,20.717503 H 15.812812 L 7.4398065,12.321141 v 8.396362 H 5.0808843 Z',
    lambda: 'M 12.314527,5.2264366 18.122042,20.739355 H 15.931587 L 12.404392,11.438344 8.0684131,20.739355 H 5.8779576 L 11.393412,8.675 10.562163,6.4508451 Q 10.034207,5.0354738 8.8322643,5.0354738 H 7.7538862 V 3.2606432 l 1.3142733,0.022466 q 2.5386815,0.033699 3.2463675,1.9433272 z',
    Lambda: 'M 6.3859009,20.89793 H 3.8470408 L 10.641173,3.1020703 h 2.729573 L 20.152959,20.89793 H 17.649858 L 12,5.474057 Z',
    my: 'M 5.6951998,21.033569 V 2.9664295 h 2.1502934 v 8.1337185 q 0,1.694525 0.8063601,2.559317 0.80636,0.864792 2.3840207,0.864792 1.729584,0 2.594376,-0.981656 0.876478,-0.981656 0.876478,-2.944967 V 2.9664295 h 2.150294 V 13.040087 q 0,0.701182 0.198668,1.040087 0.210355,0.327219 0.642751,0.327219 0.105177,0 0.292159,-0.05843 0.186982,-0.07012 0.514201,-0.210355 v 1.729584 q -0.479142,0.268787 -0.911538,0.397337 -0.420709,0.12855 -0.829732,0.12855 -0.80636,0 -1.285502,-0.455769 -0.479141,-0.455769 -0.654437,-1.390679 -0.584319,0.923224 -1.437424,1.390679 -0.84142,0.455769 -1.986684,0.455769 -1.192011,0 -2.0334301,-0.455769 -0.8297328,-0.455769 -1.3205607,-1.367306 v 6.462567 z',
    My: 'm 3.7687495,3.0034731 h 3.627535 L 11.987948,15.24791 16.603715,3.0034731 H 20.23125 V 20.996529 H 17.857083 V 5.1968663 L 13.217213,17.537716 H 10.770736 L 6.1308653,5.1968663 V 20.996529 H 3.7687495 Z',
    ny: 'M 9.7754676,20.591297 4.52864,3.4087037 H 7.566277 L 12,17.829809 Q 13.840992,15.92745 15.375152,13.288695 16.541114,11.309628 16.60248,9.591369 16.633163,8.7782641 16.264965,7.244104 15.8354,5.4184534 14.20919,3.4087037 h 2.853538 v 0 q 1.058571,1.3654025 1.764284,3.267761 0.644348,1.7489426 0.644348,2.9455875 0,3.0069538 -2.086458,5.6917338 -2.715464,3.497885 -4.602481,5.277511 z',
    Ny: 'm 5.3103501,3.161375 h 3.220504 l 7.8381389,14.78827 V 3.161375 H 18.68965 V 20.838627 H 15.469146 L 7.6310074,6.0503566 V 20.838627 H 5.3103501 Z',
    omega: 'm 8.2760531,19.014332 q -5.066931,0 -5.066931,-7.252426 0,-2.8692265 1.8924682,-6.7762576 h 2.4174755 q -1.7459545,3.9070311 -1.7459545,6.8373046 -0.012209,5.286701 2.7105028,5.286701 2.5273609,0 2.4785229,-6.568696 h 2.07561 q -0.04884,6.605325 2.478523,6.568696 2.710503,-0.02442 2.710503,-5.286701 0,-2.9302735 -1.745955,-6.8373046 h 2.417476 q 1.892468,3.9070311 1.892468,6.7762576 0.02442,7.264636 -5.066931,7.252426 -3.308767,-0.01221 -3.723889,-3.650632 -0.500588,3.650632 -3.7238889,3.650632 z',
    Omega: 'm 20.200889,18.722517 v 2.072048 h -6.984433 v -2.072048 q 2.060408,-1.129151 3.212839,-3.061511 1.152432,-1.93236 1.152432,-4.283786 0,-2.7937731 -1.536576,-4.4816779 -1.536575,-1.6879048 -4.050971,-1.6879048 -2.5143964,0 -4.0626126,1.6995455 Q 6.394992,8.5950876 6.394992,11.37722 q 0,2.351426 1.1524316,4.283786 1.1640723,1.93236 3.2361214,3.061511 v 2.072048 H 3.7991108 v -2.072048 h 3.7133906 q -1.8392342,-1.618061 -2.689007,-3.352529 -0.838132,-1.734467 -0.838132,-3.87636 0,-3.7017502 2.2350188,-5.9949726 Q 8.4437593,3.205433 11.99418,3.205433 q 3.527139,0 5.773798,2.2932224 2.235019,2.2815816 2.235019,5.8785646 0,2.258301 -0.826491,3.981128 -0.826492,1.722827 -2.700648,3.364169 z',
    omikron: 'm 12,5.6961742 q -2.1596437,0 -3.4145719,1.6926938 Q 7.3305,9.0669695 7.3305,11.999999 q 0,2.93303 1.240336,4.625724 1.2549281,1.678101 3.429164,1.678101 2.145052,0 3.39998,-1.692694 1.254928,-1.692693 1.254928,-4.611131 0,-2.9038451 -1.254928,-4.5965388 Q 14.145052,5.6961742 12,5.6961742 Z M 12,3.419793 q 3.502125,0 5.501255,2.2763812 1.999129,2.2763813 1.999129,6.3038248 0,4.012852 -1.999129,6.303825 -1.99913,2.276381 -5.501255,2.276381 -3.5167172,0 -5.5158469,-2.276381 -1.9845374,-2.290973 -1.9845374,-6.303825 0,-4.0274435 1.9845374,-6.3038248 Q 8.4832828,3.419793 12,3.419793 Z',
    Omikron: 'm 12.011717,4.8465967 q -2.5778024,0 -4.1010495,1.9216348 -1.5115297,1.9216347 -1.5115297,5.2376265 0,3.304274 1.5115297,5.225909 1.5232471,1.921635 4.1010495,1.921635 2.577803,0 4.077615,-1.921635 1.51153,-1.921635 1.51153,-5.225909 0,-3.3159918 -1.51153,-5.2376265 Q 14.58952,4.8465967 12.011717,4.8465967 Z m 0,-1.9216347 q 3.679228,0 5.882077,2.4723471 2.20285,2.4606299 2.20285,6.6085489 0,4.136201 -2.20285,6.608549 -2.202849,2.460629 -5.882077,2.460629 -3.6909445,0 -5.9055114,-2.460629 -2.2028496,-2.46063 -2.2028496,-6.608549 0,-4.147919 2.2028496,-6.6085489 Q 8.3207725,2.924962 12.011717,2.924962 Z',
    phi: 'm 13.801441,4.860948 q -0.748449,0 -0.748449,1.6696169 V 14.42958 q 1.082372,0 2.187774,-1.197518 0.990255,-1.070858 0.978741,-3.6386136 Q 16.207992,7.1984117 15.229251,5.9087766 14.423229,4.860948 13.801441,4.860948 Z m 0,-1.8077921 q 1.658102,0 3.074398,1.5199271 1.531442,1.6235586 1.5775,5.0203654 0.04606,3.1204566 -1.5775,4.9743066 -1.531442,1.750219 -3.822847,1.750219 v 4.628869 H 10.94582 v -4.617354 q -2.2914051,0 -3.8343614,-1.761734 Q 5.5454731,12.771478 5.5454731,9.604963 5.5339585,6.3117875 7.1114586,4.630656 8.308977,3.3755647 10.197371,3.0531559 V 4.9300356 Q 9.4374077,5.1948714 8.7695609,6.0930102 7.7677908,7.4171891 7.7793054,9.604963 7.79082,11.930912 8.7695609,13.255091 9.6446705,14.441095 10.94582,14.441095 V 6.5305649 q 0,-3.477409 2.855621,-3.477409 z',
    Phi: 'M 10.832526,6.8944823 Q 8.3117132,7.1268153 6.9757984,8.3117136 5.6398837,9.4966119 5.6398837,11.785092 q 0,2.28848 1.3359147,3.473378 1.3359148,1.173282 3.8567276,1.405615 z m 2.35818,9.7696027 q 2.520813,-0.232333 3.845111,-1.405615 1.324298,-1.184898 1.324298,-3.473378 0,-2.2884801 -1.324298,-3.4733784 -1.324298,-1.1848983 -3.845111,-1.4172313 z m -2.35818,1.939981 Q 7.1500482,18.336883 5.1519844,16.606002 3.1655372,14.863504 3.1655372,11.785092 q 0,-3.0784123 1.9864472,-4.8209098 Q 7.1500482,5.210068 10.832526,4.9428851 V 3.3281707 h 2.35818 v 1.6147144 q 3.682478,0.2671829 5.657309,2.0096804 1.986447,1.7308809 1.986447,4.8325265 0,3.078412 -1.986447,4.82091 -1.974831,1.730881 -5.657309,1.998064 v 2.067763 h -2.35818 z',
    pi: 'M 3.7189921,3.2906647 H 19.845165 V 6.0560104 H 17.726069 V 16.395998 q 0,1.082092 0.360697,1.563022 0.375726,0.4659 1.202324,0.4659 0.225436,0 0.556075,-0.03006 0.330639,-0.04509 0.435843,-0.06012 v 1.998864 q -0.526017,0.195378 -1.082092,0.285552 -0.556075,0.09017 -1.11215,0.09017 -1.803486,0 -2.494823,-0.976888 -0.691336,-0.991918 -0.691336,-3.637031 V 6.0560104 H 8.6936084 V 20.123203 H 5.8681466 V 6.0560104 H 3.7189921 Z',
    Pi: 'M 18.608513,3.3299575 V 20.670044 H 16.262432 V 5.3043813 H 7.7375675 V 20.670044 h -2.34608 V 3.3299575 Z',
    psi: 'M 10.935468,16.327933 Q 8.2479614,15.897466 7.0030989,14.768946 5.479015,13.384473 5.479015,10.557355 V 3.0067407 h 2.1639665 v 7.4691753 q 0,2.129063 0.9889095,3.013265 0.8609329,0.767859 2.303577,0.930738 V 3.0067407 h 2.129064 V 14.408285 q 1.524084,-0.162879 2.303577,-0.930738 0.98891,-0.977276 0.98891,-3.013266 V 3.0067407 h 2.163966 v 7.5389803 q 0,2.931826 -1.524084,4.211591 -1.372839,1.151788 -3.932369,1.558986 v 4.67696 h -2.129064 z',
    Psi: 'm 10.801897,20.855284 q 0.01186,-1.589562 0,-3.677345 -2.5385542,0 -4.768686,-2.491105 Q 3.8505289,12.266904 3.7912169,7.9964391 V 3.1447164 h 2.5266918 v 4.8517227 q 0,3.3451979 1.5421124,5.2906319 1.3048643,1.660736 2.9418759,1.82681 V 3.1447164 h 2.396205 V 15.113881 q 1.637012,-0.166074 2.941876,-1.82681 1.542113,-1.945434 1.542113,-5.2906319 V 3.1447164 h 2.526691 v 4.8517227 q -0.05931,4.2704649 -2.241994,6.6903949 -2.230131,2.491105 -4.768686,2.491105 -0.01186,0.854093 0,3.677345 z',
    rho: 'M 7.2721353,5.5638933 Q 7.9738378,4.3905546 9.7108392,3.3552558 10.389535,2.9526396 12.483139,2.9526396 q 2.346678,0 3.807599,1.8635379 1.472425,1.8635378 1.472425,4.9004144 0,3.0368761 -1.472425,4.9004141 -1.460921,1.863538 -3.807599,1.863538 -1.414908,0 -2.438704,-0.552159 Q 9.0321433,15.364722 8.3649507,14.21439 v 6.832972 H 6.2368365 V 9.8316251 q 0,-2.657267 1.0352988,-4.2677318 z m 8.2938937,4.1526986 q 0,-2.335174 -0.966279,-3.6580558 -0.954775,-1.3343852 -2.63426,-1.3343852 -1.679485,0 -2.6457637,1.3343852 -0.9547756,1.3228818 -0.9547756,3.6580558 0,2.3351741 0.9547756,3.6695591 0.9662787,1.322882 2.6457637,1.322882 1.679485,0 2.63426,-1.322882 0.966279,-1.334385 0.966279,-3.6695591 z',
    rhoV2: 'M 6.343175,9.8672262 Q 6.3658039,7.5590777 7.3614758,5.669564 8.0516575,4.5154897 9.76014,3.4971889 10.427693,3.101183 12.486923,3.101183 q 2.308149,0 3.745084,1.8329415 1.44825,1.8329415 1.44825,4.8199572 0,2.9870153 -1.44825,4.8199573 -1.436935,1.832941 -3.745084,1.832941 -1.391677,0 -2.398664,-0.543093 -0.9956718,-0.554409 -1.6519101,-1.685854 0.056572,4.797328 3.3151351,4.797328 h 5.657227 v 1.923457 h -5.476196 q -5.6798556,0 -5.6119689,-8.259551 z m 8.225608,3.4961658 q 0.950414,-1.312476 0.950414,-3.6093103 0,-2.2968341 -0.950414,-3.5979962 -0.9391,-1.3124766 -2.59101,-1.3124766 -1.65191,0 -2.6023244,1.3124766 -0.9390997,1.3011621 -0.9390997,3.5979962 0,2.2968343 0.9390997,3.6093103 0.9504144,1.301163 2.6023244,1.301163 1.65191,0 2.59101,-1.301163 z',
    Rho: 'm 8.7160019,5.1915682 v 6.5797248 h 2.9790551 q 1.653728,0 2.556827,-0.856185 0.9031,-0.856186 0.9031,-2.4395418 0,-1.5716276 -0.9031,-2.4278128 -0.903099,-0.8561852 -2.556827,-0.8561852 z m -2.36917,-1.9469417 h 5.3482251 q 2.94387,0 4.445126,1.3370564 1.512985,1.3253277 1.512985,3.8938833 0,2.5920128 -1.512985,3.9173408 -1.501256,1.325327 -4.445126,1.325327 H 8.7160019 v 7.037139 h -2.36917 z',
    sigma: 'm 11.272533,5.5802928 q -2.2798958,0 -3.5098398,1.6499248 -1.2899411,1.7249214 -1.2899411,4.5747914 0,3.014863 1.2749418,4.754783 1.2899412,1.724922 3.5248391,1.724922 2.2049,0 3.494841,-1.739921 1.289941,-1.739921 1.289941,-4.739784 0,-2.7448748 -1.289941,-4.5747914 -1.184946,-1.6499248 -3.494841,-1.6499248 z m 0,-2.2048994 9.164582,0.014999 v 2.7598741 h -3.089859 q 1.634926,2.3398934 1.634926,5.6547422 0,4.124812 -2.054907,6.464705 -2.054906,2.354893 -5.654742,2.354893 -3.614835,0 -5.654742,-2.354893 -2.0549063,-2.339893 -2.0549063,-6.464705 0,-4.1398112 2.0549063,-6.4797045 1.7099221,-1.9499111 5.654742,-1.9499111 z',
    Sigma: 'm 9.086566,18.74536 h 8.541392 v 1.989091 H 6.3720414 V 18.74536 L 11.976599,11.444225 6.3720414,5.2546408 V 3.2655495 H 17.417348 V 5.2546408 H 9.086566 l 5.604557,6.1427822 z',
    tau: 'm 13.906962,17.409391 q 0.547017,0.729356 2.188069,0.729356 h 1.352348 v 2.370408 h -1.686636 q -2.735086,0 -3.98107,-1.458712 Q 10.53369,17.56134 10.53369,14.340017 V 6.2867085 H 4.1518225 V 3.4908429 H 19.848177 v 2.7958656 h -6.457842 v 8.2204525 q 0,2.203264 0.516627,2.90223 z',
    Tau: 'M 4.5314337,3.1713617 H 19.468567 V 5.1819022 H 13.200411 V 20.828638 H 10.799589 V 5.1819022 H 4.5314337 Z',
    theta: 'M 15.579689,12.72607 H 8.4090535 Q 8.5779067,16.091879 9.3546318,17.521503 10.322724,19.277577 12,19.277577 q 1.688532,0 2.622854,-1.767331 0.821752,-1.55345 0.956835,-4.784176 z M 15.545918,10.8124 Q 15.230726,7.6154443 14.622854,6.4897558 13.654762,4.711168 12,4.711168 q -1.722304,0 -2.6341113,1.756074 Q 8.645448,7.8856095 8.4315672,10.8124 Z M 12,3.0226353 q 2.701652,0 4.243845,2.3864596 1.542193,2.3752027 1.542193,6.5852771 0,4.198818 -1.542193,6.585278 Q 14.701652,20.977367 12,20.977367 q -2.7129095,0 -4.2438459,-2.397717 -1.5421932,-2.38646 -1.5421932,-6.585278 0,-4.2100744 1.5421932,-6.5852771 Q 9.2870905,3.0226353 12,3.0226353 Z',
    thetaV2: 'm 15.469438,10.838572 q 0.06605,-2.7081621 -0.539431,-4.0952695 -0.825659,-1.8714941 -2.36689,-1.8714941 -0.913729,0 -1.618292,0.781624 -0.616492,0.7265801 -0.616492,1.7173711 0,1.6843447 1.332064,2.8622855 0.81465,0.715571 3.809041,0.605483 z m 0.03303,1.871494 q -3.390707,0.09908 -4.832858,-0.715571 -2.3228548,-1.321055 -2.3228548,-4.5686476 0,-1.7614062 1.144914,-2.9723729 1.1449138,-1.2329844 3.0714518,-1.2329844 2.300837,0 3.787024,2.3338632 1.409125,2.2017578 1.310046,6.4401417 -0.09908,4.260401 -1.508205,6.440141 -1.508204,2.344872 -4.150313,2.344872 -2.6090829,0 -4.1503133,-2.344872 -1.6403096,-2.476977 -1.5082041,-7.607073 l 2.1467138,0.01101 q -0.36329,4.205357 0.9247383,6.572247 0.9357473,1.706362 2.5870653,1.706362 1.585266,0 2.565048,-1.717371 1.045835,-1.827459 0.935747,-4.689744 z',
    Theta: 'm 7.9367942,10.451838 h 8.1264118 v 1.956784 H 7.9367942 Z M 12.01151,4.9728405 q -2.532309,0 -4.0171633,1.8877217 -1.4963647,1.8877216 -1.4963647,5.1451928 0,3.24596 1.4848542,5.133682 1.4963648,1.887721 4.0286738,1.887721 2.53231,0 4.017164,-1.887721 1.473344,-1.887722 1.473344,-5.133682 0,-3.2574712 -1.473344,-5.1451928 Q 14.54382,4.9728405 12.01151,4.9728405 Z m 0,-1.8877216 q 3.614297,0 5.77827,2.428715 2.163974,2.4172046 2.163974,6.4919211 0,4.063205 -2.163974,6.48041 -2.163973,2.428715 -5.77827,2.428715 -3.6258063,0 -5.7897799,-2.417204 -2.1754841,-2.417205 -2.1754841,-6.491921 0,-4.0747165 2.1754841,-6.5034316 Q 8.3857037,3.0851189 12.01151,3.0851189 Z',
    xi: 'm 13.455676,15.869969 q 1.171642,0.0089 1.872851,0.674582 0.745591,0.70121 0.745591,1.766338 0,1.020749 -0.65683,1.730835 -0.710086,0.772218 -2.156886,0.772218 0,-0.665705 0,-1.340287 0.612449,0.04438 0.985244,-0.346167 0.284035,-0.310662 0.284035,-0.639077 0,-0.470432 -0.284035,-0.860979 -0.275158,-0.372795 -0.78997,-0.372795 -5.5297944,0 -5.5297944,-3.878845 0,-2.662822 2.9557324,-3.4439165 -2.4853005,-0.3195386 -2.4853005,-2.6273179 0,-1.7485866 1.9527365,-2.4764247 H 8.5028264 V 3.1860592 h 7.0032226 v 1.6420737 q -5.5830508,0 -5.5830508,2.5829376 0,1.6953301 4.6865668,1.7752148 v 1.5089327 q -5.0593619,-0.195274 -5.0416097,2.680574 0.00888,2.405416 3.8877207,2.494177 z',
    Xi: 'm 7.8096655,10.414628 h 8.3806695 v 2.003817 H 7.8096655 Z M 6.5720139,3.2008867 H 17.427987 V 5.2047036 H 6.5720139 Z m 0,15.5944103 H 17.427987 v 2.003817 H 6.5720139 Z',
    ypsilon: 'M 8.0381133,3.5543118 V 14.212449 q 0,1.984619 0.735044,2.925475 0.8085484,1.014361 2.3815427,1.014361 2.205132,0 3.748724,-3.057783 0.867352,-1.734704 1.087865,-4.483768 Q 16.108896,9.1112442 15.66787,7.2295316 15.256245,5.480127 13.697952,3.5543118 h 2.734363 v 0 q 1.029062,1.3230791 1.690602,3.1312873 0.617436,1.6906011 0.617436,3.9545369 0,3.719322 -1.881712,6.468387 -2.293337,3.3518 -6.027361,3.337099 -2.631457,0 -4.1162458,-1.764105 Q 5.274348,16.946813 5.274348,14.05074 L 5.2596471,3.5543118 Z',
    Ypsilon: 'm 4.4662565,3.0660208 h 2.5970173 l 4.9546782,7.3482432 4.918775,-7.3482432 h 2.597017 l -6.31901,9.3588372 v 8.509121 h -2.429468 v -8.509121 z',
    zeta: 'm 13.354145,15.871523 q 1.172112,0.0089 1.873604,0.674853 0.74589,0.701491 0.74589,1.767048 0,1.021158 -0.657094,1.731529 -0.710371,0.772529 -2.157752,0.772529 0,-0.665973 0,-1.340826 0.612695,0.0444 0.98564,-0.346306 0.284148,-0.310787 0.284148,-0.639334 0,-0.470621 -0.284148,-0.861325 -0.275269,-0.372944 -0.790288,-0.372944 -5.3810606,0 -5.3899402,-4.999237 0,-4.3687818 5.0702732,-7.432257 H 8.3105107 V 3.1825199 H 16.035796 V 4.825253 q -6.4288581,3.2321883 -6.4288581,7.432257 0,3.614013 3.7472071,3.614013 z',
    Zeta: 'M 5.1680194,3.3042234 H 18.83198 V 5.0981279 L 7.8355786,18.715494 H 19.099901 v 1.980284 H 4.9000986 V 18.901873 L 15.8965,5.2845076 H 5.1680194 Z',
};
var latex = {};

var iconPaths = /*#__PURE__*/Object.freeze({
    __proto__: null,
    greek: greek,
    latex: latex
});

/**
 * The scrap of markup that button labels carry, split into pieces a caller can
 * build with the DOM API. A leaf module with no imports, so the tests can reach
 * it - see the note in textPlacement.ts.
 *
 * Labels such as 'x<sup>y</sup>' used to reach the page through innerHTML.
 * Obsidian's guidelines rule that out - "Avoid innerHTML, outerHTML and
 * insertAdjacentHTML" - and while today's labels are all plugin constants, a
 * table is only ever one contribution away from holding something else.
 */
/**
 * Splits a label into plain text and its superscript and subscript runs.
 *
 * Only `<sup>` and `<sub>` are recognised, because those are the only tags the
 * tables use. Anything else stays literal text, which is the safe direction to
 * fail in: a caller writing it as a text node shows the user a stray tag rather
 * than executing it.
 */
function splitMarkup(label) {
    var source = label || '';
    var parts = [];
    var tags = /<(sup|sub)>([\s\S]*?)<\/\1>/g;
    var copied = 0;
    for (var match = tags.exec(source); match; match = tags.exec(source)) {
        if (match.index > copied) {
            parts.push({ tag: 'text', value: source.slice(copied, match.index) });
        }
        parts.push({ tag: match[1], value: match[2] });
        copied = match.index + match[0].length;
    }
    if (copied < source.length) {
        parts.push({ tag: 'text', value: source.slice(copied) });
    }
    return parts;
}

function pathToSvg(icon) {
    // The size comes from the stylesheet rather than from a style attribute
    // written here - this was the last place the plugin set a fixed style from
    // JavaScript, which Obsidian's guidelines ask plugins not to do.
    return "\n    <svg class=\"mfa-icon-svg\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\n        <path fill=\"currentColor\" d=\"".concat(icon, "\" />\n    </svg>");
}
function importIconPaths() {
    var res = {};
    forEachObjIndexed(function (value, key, obj) {
        // @ts-ignore
        res = mergeLeft(res, map(pathToSvg, value));
    }, iconPaths);
    return res;
}
var icons = __assign(__assign({}, importIconPaths()), { division: pathToSvg(mdiDivision), multiplication: pathToSvg(mdiCircleSmall), h1: pathToSvg(mdiFormatHeader1), h2: pathToSvg(mdiFormatHeader2), h3: pathToSvg(mdiFormatHeader3), h4: pathToSvg(mdiFormatHeader4), h5: pathToSvg(mdiFormatHeader5), h6: pathToSvg(mdiFormatHeader6), bold: pathToSvg(mdiFormatBold), italic: pathToSvg(mdiFormatItalic), strikethrough: pathToSvg(mdiFormatStrikethroughVariant), codeInline: pathToSvg(mdiCodeTags), codeBlock: pathToSvg(mdiXml), link: pathToSvg(mdiLinkVariant), mermaidBlock: pathToSvg(mdiGraph), fileLink: pathToSvg(mdiFileLink), image: pathToSvg(mdiImage), quote: pathToSvg(mdiFormatIndentIncrease), bulletList: pathToSvg(mdiFormatListBulleted), numberList: pathToSvg(mdiFormatListNumbered), checkList: pathToSvg(mdiFormatListBulletedSquare), viewIcon: pathToSvg(mdiLanguageMarkdown), underline: pathToSvg(mdiFormatUnderline), menu: pathToSvg(mdiMenu), expandArrowDown: pathToSvg(mdiChevronDown), expandArrowUp: pathToSvg(mdiChevronUp), highlight: pathToSvg(mdiMarker) });
var addIcons = function () {
    Object.keys(icons).forEach(function (key) {
        obsidian.addIcon(key, icons[key]);
    });
};
/**
 * addIcon is a module-level function, not a Plugin method, so Component's
 * automatic teardown does not cover it - without this the icons stay in the
 * app's global registry after the plugin is disabled.
 */
var removeIcons = function () {
    Object.keys(icons).forEach(function (key) {
        obsidian.removeIcon(key);
    });
};
/**
 * Convert an svg string into an HTML element.
 *
 * @param svgText svg image as a string
 */
var svgToElement = function (key) {
    if (key.toString().includes('.svg')) {
        var img = document.createElement('img');
        img.src = key.toString();
        img.addClass('mfa-icon-image');
        return img;
    }
    else {
        var parser = new DOMParser();
        return parser.parseFromString(icons[key], 'text/xml').documentElement;
    }
};
/**
 * Writes a button label, honouring the `<sup>` and `<sub>` some of them carry.
 *
 * Built node by node rather than handed to innerHTML: see the note in
 * markup.ts for why that matters even for the plugin's own constants.
 */
var appendLabel = function (parent, label) {
    splitMarkup(label).forEach(function (part) {
        if (part.tag === 'text') {
            parent.appendText(part.value);
        }
        else {
            parent.createEl(part.tag).setText(part.value);
        }
    });
};

/**
 * The editor of the markdown pane the user was last in, or null when there is
 * none to write to.
 *
 * The buttons live in a side panel, so the markdown pane is never the *active*
 * leaf while one is clicked - hence "most recent" rather than "active". Reading
 * mode is excluded because inserting into it would be discarded.
 */
function getTargetEditor(workspace) {
    var _a;
    var view = (_a = workspace.getMostRecentLeaf()) === null || _a === void 0 ? void 0 : _a.view;
    if (!(view instanceof obsidian.MarkdownView))
        return null;
    if (view.getMode() !== 'source')
        return null;
    return view.editor;
}
/**
 * Stamps every entry of a formatter table with its own key as `id`.
 *
 * The key is already a stable identifier, so deriving `id` from it keeps the
 * two from ever drifting apart. This is what lets `des` become a plain display
 * label that translations may replace, while dispatch and lookups keep using
 * `id`.
 */
/**
 * What survives on the line around the range about to be replaced.
 *
 * Needed to decide whether a block insert has to break onto its own line: the
 * whole line is the wrong question, since the selection being replaced may be
 * the entire line, or only part of it.
 */
function surroundingText(editor) {
    var from = editor.getCursor('from');
    var to = editor.getCursor('to');
    return {
        before: editor.getLine(from.line).slice(0, from.ch),
        after: editor.getLine(to.line).slice(to.ch),
    };
}
function withIds(settings) {
    Object.keys(settings).forEach(function (key) {
        // @ts-ignore - the mapped return type is what makes `id` visible
        settings[key].id = key;
    });
    return settings;
}

/**
 * Turning lines into quotes, bullets, numbers and tasks - and back. A leaf
 * module with no imports, so the tests can reach it - see the note in
 * textPlacement.ts.
 *
 * All of this is per line by definition: a list marker means something only at
 * the start of one. The editor's job is to decide which lines are involved;
 * this decides what happens to them.
 */
/**
 * What may sit in front of a marker.
 *
 * For a list that includes any quote markers, because a list inside a quote is
 * written `> - item`. Putting the bullet first would produce `- > item`, which
 * is a list containing a quote - a different thing, and not what the button
 * was asked for.
 *
 * A quote marker has only indentation in front of it; it is the outermost
 * thing on the line by nature.
 */
var lead = function (kind) { return (kind === 'quote' ? '\\s*' : '\\s*(?:>\\s*)*'); };
/** A line with nothing on it takes no marker - an empty bullet helps nobody. */
var isBlank = function (line) { return line.trim() === ''; };
/**
 * Adds the marker to every line, or removes it from every line if they all
 * have it already.
 *
 * Toggling off requires all of them to be marked, so that adding to a
 * half-converted selection finishes the job rather than undoing it. Blank
 * lines are not counted either way: one empty line in the middle of a list
 * would otherwise be enough to make the button stop turning it off.
 */
function toggleLineMarker(lines, symbol, kind) {
    // The symbol goes into a regex, so its own special characters have to be
    // escaped - '1. ' would otherwise let the dot match anything.
    var escaped = symbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    var marker = new RegExp('^(' + lead(kind) + ')' + escaped);
    var prefix = new RegExp('^(' + lead(kind) + ')');
    var has = function (line) { return marker.test(line); };
    var add = function (line) {
        return kind === 'quote'
            ? symbol + line
            : line.replace(prefix, function (_full, before) { return before + symbol; });
    };
    var remove = function (line) { return line.replace(marker, '$1'); };
    var written = lines.filter(function (line) { return !isBlank(line); });
    var allMarked = written.length > 0 && written.every(has);
    return lines.map(function (line) {
        if (isBlank(line))
            return line;
        if (allMarked)
            return remove(line);
        return has(line) ? line : add(line);
    });
}

var formatSettings = withIds({
    h1: {
        des: 'h1',
        icon: 'h1',
        symbol: '# ',
        shift: 2,
        selectionInput: 0,
        newLine: false,
        enclose: false,
        objectType: 'formatterSetting',
    },
    h2: {
        des: 'h2',
        icon: 'h2',
        symbol: '## ',
        shift: 3,
        selectionInput: 0,
        newLine: false,
        enclose: false,
        objectType: 'formatterSetting',
    },
    h3: {
        des: 'h3',
        icon: 'h3',
        symbol: '### ',
        shift: 4,
        selectionInput: 0,
        newLine: false,
        enclose: false,
        objectType: 'formatterSetting',
    },
    h4: {
        des: 'h4',
        icon: 'h4',
        symbol: '#### ',
        shift: 5,
        selectionInput: 0,
        newLine: false,
        enclose: false,
        objectType: 'formatterSetting',
    },
    h5: {
        des: 'h5',
        icon: 'h5',
        symbol: '##### ',
        shift: 6,
        selectionInput: 0,
        newLine: false,
        enclose: false,
        objectType: 'formatterSetting',
    },
    h6: {
        des: 'h6',
        icon: 'h6',
        symbol: '###### ',
        shift: 7,
        selectionInput: 0,
        newLine: false,
        enclose: false,
        objectType: 'formatterSetting',
    },
    bold: {
        des: 'bold',
        icon: 'bold',
        symbol: '****',
        shift: 2,
        selectionInput: 2,
        newLine: false,
        enclose: false,
        objectType: 'formatterSetting',
    },
    italic: {
        des: 'italic',
        icon: 'italic',
        symbol: '**',
        shift: 1,
        selectionInput: 1,
        newLine: false,
        enclose: false,
        objectType: 'formatterSetting',
    },
    underline: {
        des: 'underline',
        icon: 'underline',
        symbol: '<u></u>',
        shift: 3,
        selectionInput: 3,
        newLine: false,
        enclose: false,
        objectType: 'formatterSetting',
    },
    strikethrough: {
        des: 'strikethrough',
        icon: 'strikethrough',
        symbol: '~~~~',
        shift: 2,
        selectionInput: 2,
        newLine: false,
        enclose: false,
        objectType: 'formatterSetting',
    },
    highlight: {
        des: 'highlight',
        icon: 'highlight',
        symbol: '========',
        shift: 4,
        selectionInput: 4,
        newLine: false,
        enclose: false,
        objectType: 'formatterSetting',
    },
    codeBlock: {
        des: 'code_block',
        icon: 'codeBlock',
        symbol: '``` \n```',
        shift: 4,
        selectionInput: 4,
        newLine: true,
        enclose: true,
        objectType: 'formatterSetting',
    },
    mermaidBlock: {
        des: 'mermaid_block',
        icon: 'mermaidBlock',
        symbol: '```mermaid \n```',
        // '```mermaid ' is 11 chars - splitting anywhere else tears the fence apart
        shift: 11,
        selectionInput: 11,
        newLine: true,
        enclose: true,
        objectType: 'formatterSetting',
    },
    codeInline: {
        des: 'code_inline',
        icon: 'codeInline',
        symbol: '``',
        shift: 1,
        selectionInput: 1,
        newLine: false,
        enclose: false,
        objectType: 'formatterSetting',
    },
    link: {
        des: 'link',
        icon: 'link',
        symbol: '[]()',
        shift: 3,
        selectionInput: 1,
        newLine: false,
        enclose: false,
        objectType: 'formatterSetting',
    },
    internalLink: {
        des: 'internal_link',
        icon: 'fileLink',
        symbol: '[[]]',
        shift: 2,
        selectionInput: 2,
        newLine: false,
        enclose: false,
        objectType: 'formatterSetting',
    },
    image: {
        des: 'image',
        icon: 'image',
        symbol: '![]()',
        shift: 4,
        selectionInput: 2,
        newLine: false,
        enclose: false,
        objectType: 'formatterSetting',
    },
    blockquote: {
        des: 'blockquote',
        icon: 'quote',
        symbol: '> ',
        shift: 2,
        selectionInput: 0,
        newLine: true,
        enclose: false,
        objectType: 'formatterSetting',
    },
    bulletList: {
        des: 'bullet_list',
        icon: 'bulletList',
        symbol: '- ',
        shift: 2,
        selectionInput: 0,
        newLine: true,
        enclose: false,
        objectType: 'formatterSetting',
    },
    numberList: {
        des: 'number_list',
        icon: 'numberList',
        symbol: '1. ',
        shift: 3,
        selectionInput: 0,
        newLine: true,
        enclose: false,
        objectType: 'formatterSetting',
    },
    checkList: {
        des: 'check_list',
        icon: 'checkList',
        symbol: '- [ ] ',
        shift: 6,
        selectionInput: 0,
        newLine: true,
        enclose: false,
        objectType: 'formatterSetting',
    },
});
function iconFormatter(editor, item) {
    if (editor) {
        var isSelection = editor.somethingSelected();
        var selection = editor.getSelection();
        var curserStart = editor.getCursor('from');
        var curserEnd = editor.getCursor('to');
        var line = editor.getLine(curserStart.line);
        editor.focus();
        if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(item.id)) {
            var reStringExact = '^\\s*' + item.symbol + '+\\s*';
            var reStringAny = '^\\s*#+\\s*';
            var cleanedLine = line.replace(new RegExp(reStringAny, 'g'), '');
            var replacement = item.symbol + cleanedLine;
            // To delete the headings if the same heading is clicked twice
            if (new RegExp(reStringExact, 'g').test(line)) {
                replacement = cleanedLine;
            }
            // replace the hole line with the updated new line
            editor.replaceRange(replacement, { line: curserStart.line, ch: 0 }, { line: curserStart.line, ch: line.length });
            // Calculate the shift of the course depending on how many # are in the old and new line
            var oldNumberOfHeadings = match(/([#])/g, line).length;
            var newNumberOfHeadings = match(/([#])/g, replacement).length;
            var courserCorrection = newNumberOfHeadings - oldNumberOfHeadings;
            // If the old or the new line doesn't contain any heading than the course correction has to be corrected by the space after the # (### sdfsd)
            if (newNumberOfHeadings === 0)
                courserCorrection -= 1;
            if (oldNumberOfHeadings === 0)
                courserCorrection += 1;
            // finally set the new course position
            editor.setCursor(curserStart.line, curserStart.ch + courserCorrection);
        }
        else if ([
            'bold',
            'italic',
            'strikethrough',
            'codeInline',
            'link',
            'internalLink',
            'image',
            'underline',
            'highlight',
        ].includes(item.id)) {
            if (isSelection) {
                editor.replaceSelection(item.symbol.substring(0, item.selectionInput) +
                    selection +
                    item.symbol.substring(item.selectionInput));
                editor.setCursor(curserStart.line, curserStart.ch + selection.length + item.shift);
            }
            else {
                editor.replaceRange(item.symbol, curserStart);
                editor.setCursor(curserStart.line, curserStart.ch + item.shift);
            }
        }
        else if (item.id === 'codeBlock' ||
            item.id === 'mermaidBlock') {
            if (isSelection) {
                var re = new RegExp('^(```).*(```)$', 'gs');
                var match$1 = selection.trim().match(re);
                var replacment = selection.trim();
                if (match$1) {
                    replacment = editor
                        .getSelection()
                        .trim()
                        .replace(/^(```)/g, '')
                        .replace(/(```)$/g, '');
                    editor.replaceSelection(replacment);
                }
                else {
                    editor.replaceSelection(item.symbol.substring(0, item.selectionInput) +
                        '\n' +
                        replacment +
                        item.symbol.substring(item.selectionInput));
                    editor.setCursor(curserStart.line, curserStart.ch + item.shift);
                }
            }
            else {
                // If the current line already holds text, the block is appended on a
                // fresh line below it, otherwise it replaces the empty line in place.
                var hasContent = line.trim().length > 0;
                var pos = {
                    line: curserStart.line,
                    ch: hasContent ? line.length : 0,
                };
                var replacement = hasContent ? '\n' + item.symbol : item.symbol;
                editor.replaceRange(replacement, pos);
                // The opening fence always ends up on its own line, so the shift is
                // counted from the start of that line - not from the old cursor.
                editor.setCursor(hasContent ? curserStart.line + 1 : curserStart.line, item.shift);
            }
        }
        else if (['blockquote', 'bulletList', 'numberList', 'checkList'].includes(item.id)) {
            // These markers only mean anything at the start of a line, so the whole
            // of every touched line is what gets rewritten - not the selection.
            // Dragging from the middle of one word to the middle of another used to
            // put the bullet wherever the drag began.
            //
            // A selection ending at column zero stops short of that line rather than
            // including it, which is what shift+down and a triple click produce.
            var endsBeforeLastLine = curserEnd.ch === 0 && curserEnd.line > curserStart.line;
            var lastLine = endsBeforeLastLine ? curserEnd.line - 1 : curserEnd.line;
            var from = { line: curserStart.line, ch: 0 };
            var to = { line: lastLine, ch: editor.getLine(lastLine).length };
            var converted = toggleLineMarker(editor.getRange(from, to).split('\n'), item.symbol, item.id === 'blockquote' ? 'quote' : 'list');
            editor.replaceRange(converted.join('\n'), from, to);
        }
    }
}

/**
 * A pair of tags with the caret placed between them.
 *
 * The offset is derived rather than counted: '<div style="text-align: justify">'
 * is not a length anyone should be working out by hand, and a wrong one puts
 * the caret in the middle of an attribute.
 */
var wrapper = function (des, open, close) { return ({
    des: des,
    symbol: open + close,
    shift: open.length,
    selectionInput: open.length,
    objectType: 'htmlFormatterSetting',
}); };
var htmlFormatterSettings = withIds({
    // Obsidian has no page break of its own, so this is the html people were
    // copying by hand - issues #49 and #35.
    pageBreak: wrapper('page break', '<div style="page-break-after: always;">', '</div>'),
    // Issue #44, which listed exactly these.
    alignLeft: wrapper('align left', '<div style="text-align: left">', '</div>'),
    alignCenter: wrapper('align center', '<div style="text-align: center">', '</div>'),
    alignRight: wrapper('align right', '<div style="text-align: right">', '</div>'),
    alignJustify: wrapper('align justify', '<div style="text-align: justify">', '</div>'),
    br: {
        des: '<br/>',
        symbol: '<br/>',
        shift: 5,
        selectionInput: 5,
        objectType: 'htmlFormatterSetting',
    },
    div: {
        des: '<div>',
        symbol: '<div></div>',
        shift: 5,
        selectionInput: 5,
        objectType: 'htmlFormatterSetting',
    },
    span: {
        des: '<span>',
        symbol: '<span></span>',
        shift: 6,
        selectionInput: 6,
        objectType: 'htmlFormatterSetting',
    },
    img: {
        des: '<img>',
        // img is a void element - a closing tag is rendered as literal text
        symbol: '<img src="" alt="" width="" height="">',
        // 10 = length of '<img src="', so both the cursor and a selection land
        // inside the src attribute
        shift: 10,
        selectionInput: 10,
        objectType: 'htmlFormatterSetting',
    },
    a: {
        des: '<a>',
        symbol: '<a></a>',
        shift: 3,
        selectionInput: 3,
        objectType: 'htmlFormatterSetting',
    },
    p: {
        des: '<p>',
        symbol: '<p></p>',
        shift: 3,
        selectionInput: 3,
        objectType: 'htmlFormatterSetting',
    },
    font: {
        des: '<font>',
        symbol: '<span style="font-family:default; font-size:default; color:red"></span>',
        shift: 64,
        selectionInput: 64,
        objectType: 'htmlFormatterSetting',
    },
    table: {
        des: '<table>',
        symbol: '<table></table>',
        shift: 7,
        selectionInput: 7,
        objectType: 'htmlFormatterSetting',
    },
    thead: {
        des: '<thead>',
        symbol: '<thead></thead>',
        shift: 7,
        selectionInput: 7,
        objectType: 'htmlFormatterSetting',
    },
    tbody: {
        des: '<tbody>',
        symbol: '<tbody></tbody>',
        shift: 7,
        selectionInput: 7,
        objectType: 'htmlFormatterSetting',
    },
    tfoot: {
        des: '<tfoot>',
        symbol: '<tfoot></tfoot>',
        shift: 7,
        selectionInput: 7,
        objectType: 'htmlFormatterSetting',
    },
    tr: {
        des: '<tr>',
        symbol: '<tr></tr>',
        shift: 4,
        selectionInput: 4,
        objectType: 'htmlFormatterSetting',
    },
    td: {
        des: '<td>',
        symbol: '<td></td>',
        shift: 4,
        selectionInput: 4,
        objectType: 'htmlFormatterSetting',
    },
    th: {
        des: '<th>',
        symbol: '<th></th>',
        shift: 4,
        selectionInput: 4,
        objectType: 'htmlFormatterSetting',
    },
    details: {
        des: '<details>',
        symbol: '<details></details>',
        shift: 9,
        selectionInput: 9,
        objectType: 'htmlFormatterSetting',
    },
    summary: {
        des: '<summary>',
        symbol: '<summary></summary>',
        shift: 9,
        selectionInput: 9,
        objectType: 'htmlFormatterSetting',
    },
    u: {
        des: '<u>',
        symbol: '<u></u>',
        shift: 3,
        selectionInput: 3,
        objectType: 'htmlFormatterSetting',
    },
    i: {
        des: '<i>',
        symbol: '<i></i>',
        shift: 3,
        selectionInput: 3,
        objectType: 'htmlFormatterSetting',
    },
    b: {
        des: '<b>',
        symbol: '<b></b>',
        shift: 3,
        selectionInput: 3,
        objectType: 'htmlFormatterSetting',
    },
    em: {
        des: '<em>',
        symbol: '<em></em>',
        shift: 4,
        selectionInput: 4,
        objectType: 'htmlFormatterSetting',
    },
    strong: {
        des: '<strong>',
        symbol: '<strong></strong>',
        shift: 8,
        selectionInput: 8,
        objectType: 'htmlFormatterSetting',
    },
    mark: {
        des: '<mark>',
        symbol: '<mark></mark>',
        shift: 6,
        selectionInput: 6,
        objectType: 'htmlFormatterSetting',
    },
    sup: {
        des: '<sup>',
        symbol: '<sup></sup>',
        shift: 5,
        selectionInput: 5,
        objectType: 'htmlFormatterSetting',
    },
    sub: {
        des: '<sub>',
        symbol: '<sub></sub>',
        shift: 5,
        selectionInput: 5,
        objectType: 'htmlFormatterSetting',
    },
    kbd: {
        des: '<kbd>',
        symbol: '<kbd></kbd>',
        shift: 5,
        selectionInput: 5,
        objectType: 'htmlFormatterSetting',
    },
    pre: {
        des: '<pre>',
        symbol: '<pre></pre>',
        shift: 5,
        selectionInput: 5,
        objectType: 'htmlFormatterSetting',
    },
    center: {
        des: '<center>',
        symbol: '<center></center>',
        shift: 8,
        selectionInput: 8,
        objectType: 'htmlFormatterSetting',
    },
    dfn: {
        des: '<dfn>',
        symbol: '<dfn></dfn>',
        shift: 5,
        selectionInput: 5,
        objectType: 'htmlFormatterSetting',
    },
    abbr: {
        des: '<abbr>',
        symbol: '<abbr title=""></abbr>',
        // The cursor goes into the title attribute, while a selection becomes the
        // visible text after the opening tag - hence the two differ here.
        shift: 13,
        selectionInput: 15,
        objectType: 'htmlFormatterSetting',
    },
    hr: {
        des: '<hr/>',
        symbol: '<hr/>',
        shift: 5,
        selectionInput: 5,
        objectType: 'htmlFormatterSetting',
    },
});
function htmlFormatter(editor, item) {
    if (editor) {
        var isSelection = editor.somethingSelected();
        var selection = editor.getSelection();
        var curserStart = editor.getCursor('from');
        editor.getCursor('to');
        editor.getLine(curserStart.line);
        editor.focus();
        if (isSelection) {
            var replacment = selection.trim();
            editor.replaceSelection(item.symbol.substring(0, item.selectionInput) +
                replacment +
                item.symbol.substring(item.selectionInput));
            editor.setCursor(curserStart.line, curserStart.ch + item.shift);
        }
        else {
            editor.replaceRange(item.symbol, curserStart);
            editor.setCursor(curserStart.line, curserStart.ch + item.shift);
        }
    }
}

var greekLowerCaseFormatterSettings = withIds({
    alpha: {
        des: 'alpha',
        icon: 'alpha',
        symbol: '\\alpha',
        shift: 6,
        objectType: 'greekFormatterSetting',
    },
    beta: {
        des: 'beta',
        icon: 'beta',
        symbol: '\\beta',
        shift: 5,
        objectType: 'greekFormatterSetting',
    },
    gamma: {
        des: 'gamma',
        icon: 'gamma',
        symbol: '\\gamma',
        shift: 6,
        objectType: 'greekFormatterSetting',
    },
    delta: {
        des: 'delta',
        icon: 'delta',
        symbol: '\\delta',
        shift: 6,
        objectType: 'greekFormatterSetting',
    },
    epsilon: {
        des: 'epsilon',
        icon: 'epsilon',
        symbol: '\\epsilon',
        shift: 8,
        objectType: 'greekFormatterSetting',
    },
    zeta: {
        des: 'zeta',
        icon: 'zeta',
        symbol: '\\zeta',
        shift: 5,
        objectType: 'greekFormatterSetting',
    },
    eta: {
        des: 'eta',
        icon: 'eta',
        symbol: '\\eta',
        shift: 4,
        objectType: 'greekFormatterSetting',
    },
    theta: {
        des: 'theta',
        icon: 'theta',
        symbol: '\\theta',
        shift: 6,
        objectType: 'greekFormatterSetting',
    },
    iota: {
        des: 'iota',
        icon: 'iota',
        symbol: '\\iota',
        shift: 5,
        objectType: 'greekFormatterSetting',
    },
    kappa: {
        des: 'kappa',
        icon: 'kappa',
        symbol: '\\kappa',
        shift: 6,
        objectType: 'greekFormatterSetting',
    },
    lambda: {
        des: 'lambda',
        icon: 'lambda',
        symbol: '\\lambda',
        shift: 7,
        objectType: 'greekFormatterSetting',
    },
    mu: {
        des: 'mu',
        icon: 'my',
        symbol: '\\mu',
        shift: 3,
        objectType: 'greekFormatterSetting',
    },
    nu: {
        des: 'nu',
        icon: 'ny',
        symbol: '\\nu',
        shift: 3,
        objectType: 'greekFormatterSetting',
    },
    xi: {
        des: 'xi',
        icon: 'xi',
        symbol: '\\xi',
        shift: 3,
        objectType: 'greekFormatterSetting',
    },
    pi: {
        des: 'pi',
        icon: 'pi',
        symbol: '\\pi',
        shift: 3,
        objectType: 'greekFormatterSetting',
    },
    rho: {
        des: 'rho',
        icon: 'rho',
        symbol: '\\rho',
        shift: 4,
        objectType: 'greekFormatterSetting',
    },
    sigma: {
        des: 'sigma',
        icon: 'sigma',
        symbol: '\\sigma',
        shift: 6,
        objectType: 'greekFormatterSetting',
    },
    tau: {
        des: 'tau',
        icon: 'tau',
        symbol: '\\tau',
        shift: 4,
        objectType: 'greekFormatterSetting',
    },
    upsilon: {
        des: 'upsilon',
        icon: 'ypsilon',
        symbol: '\\upsilon',
        shift: 8,
        objectType: 'greekFormatterSetting',
    },
    phi: {
        des: 'phi',
        icon: 'phi',
        symbol: '\\phi',
        shift: 4,
        objectType: 'greekFormatterSetting',
    },
    chi: {
        des: 'chi',
        icon: 'chi',
        symbol: '\\chi',
        shift: 4,
        objectType: 'greekFormatterSetting',
    },
    psi: {
        des: 'psi',
        icon: 'psi',
        symbol: '\\psi',
        shift: 4,
        objectType: 'greekFormatterSetting',
    },
    omega: {
        des: 'omega',
        icon: 'omega',
        symbol: '\\omega',
        shift: 6,
        objectType: 'greekFormatterSetting',
    },
});
var greekUpperCaseFormatterSettings = withIds({
    // Alpha: {
    //   des: 'Alpha',
    //   icon: 'Alpha',
    //   symbol: '\\Alpha',
    //   shift: 6,
    // objectType: 'greekFormatterSetting',},
    // Beta: {
    //   des: 'Beta',
    //   icon: 'Beta',
    //   symbol: '\\Beta',
    //   shift: 5,
    // objectType: 'greekFormatterSetting',},
    Gamma: {
        des: 'Gamma',
        icon: 'Gamma',
        symbol: '\\Gamma',
        shift: 6,
        objectType: 'greekFormatterSetting',
    },
    Delta: {
        des: 'Delta',
        icon: 'Delta',
        symbol: '\\Delta',
        shift: 6,
        objectType: 'greekFormatterSetting',
    },
    // Epsilon: {
    //   des: 'Epsilon',
    //   icon: 'Epsilon',
    //   symbol: '\\Epsilon',
    //   shift: 8,
    // objectType: 'greekFormatterSetting',},
    // Zeta: {
    //   des: 'Zeta',
    //   icon: 'Zeta',
    //   symbol: '\\Zeta',
    //   shift: 5,
    // objectType: 'greekFormatterSetting',},
    // Eta: {
    //   des: 'Eta',
    //   icon: 'Eta',
    //   symbol: '\\Eta',
    //   shift: 4,
    // objectType: 'greekFormatterSetting',},
    Theta: {
        des: 'Theta',
        icon: 'Theta',
        symbol: '\\Theta',
        shift: 6,
        objectType: 'greekFormatterSetting',
    },
    // Iota: {
    //   des: 'Iota',
    //   icon: 'Iota',
    //   symbol: '\\Iota',
    //   shift: 5,
    // objectType: 'greekFormatterSetting',},
    // Kappa: {
    //   des: 'Kappa',
    //   icon: 'Kappa',
    //   symbol: '\\Kappa',
    //   shift: 6,
    // objectType: 'greekFormatterSetting',},
    Lambda: {
        des: 'Lambda',
        icon: 'Lambda',
        symbol: '\\Lambda',
        shift: 7,
        objectType: 'greekFormatterSetting',
    },
    // Mu: {
    //   des: 'Mu',
    //   icon: 'My',
    //   symbol: '\\Mu',
    //   shift: 3,
    // objectType: 'greekFormatterSetting',},
    // Nu: {
    //   des: 'Nu',
    //   icon: 'Ny',
    //   symbol: '\\Nu',
    //   shift: 3,
    // objectType: 'greekFormatterSetting',},
    Xi: {
        des: 'Xi',
        icon: 'Xi',
        symbol: '\\Xi',
        shift: 3,
        objectType: 'greekFormatterSetting',
    },
    // Omikron: {
    //   des: 'Omikron',
    //   icon: 'Omikron',
    //   symbol: '\\Omikron',
    //   shift: 8,
    // objectType: 'greekFormatterSetting',},
    Pi: {
        des: 'Pi',
        icon: 'Pi',
        symbol: '\\Pi',
        shift: 3,
        objectType: 'greekFormatterSetting',
    },
    // Rho: {
    //   des: 'Rho',
    //   icon: 'Rho',
    //   symbol: '\\Rho',
    //   shift: 4,
    // objectType: 'greekFormatterSetting',},
    Sigma: {
        des: 'Sigma',
        icon: 'Sigma',
        symbol: '\\Sigma',
        shift: 6,
        objectType: 'greekFormatterSetting',
    },
    // Tau: {
    //   des: 'Tau',
    //   icon: 'Tau',
    //   symbol: '\\Tau',
    //   shift: 4,
    // objectType: 'greekFormatterSetting',},
    Upsilon: {
        des: 'Upsilon',
        icon: 'Ypsilon',
        symbol: '\\Upsilon',
        shift: 8,
        objectType: 'greekFormatterSetting',
    },
    Phi: {
        des: 'Phi',
        icon: 'Phi',
        symbol: '\\Phi',
        shift: 4,
        objectType: 'greekFormatterSetting',
    },
    // Chi: {
    //   des: 'Chi',
    //   icon: 'Chi',
    //   symbol: '\\Chi',
    //   shift: 4,
    // objectType: 'greekFormatterSetting',},
    Psi: {
        des: 'Psi',
        icon: 'Psi',
        symbol: '\\Psi',
        shift: 4,
        objectType: 'greekFormatterSetting',
    },
    Omega: {
        des: 'Omega',
        icon: 'Omega',
        symbol: '\\Omega',
        shift: 6,
        objectType: 'greekFormatterSetting',
    },
});
function greekFormatter(editor, item) {
    if (editor) {
        var curserStart = editor.getCursor('from');
        editor.focus();
        editor.replaceRange(item.symbol, curserStart);
        editor.setCursor(curserStart.line, curserStart.ch + item.shift);
    }
}

/**
 * An operator inserted whole, with the caret left after it.
 *
 * The offsets are derived rather than counted. Every one of them used to be a
 * hand-written number, which is fine until '\\Leftrightarrow' needs one.
 *
 * Most of these are `suggestOnly`. Issue #21 asked for many more operators
 * "only to the command suggestions to avoid saturating the side panel", which
 * is the right instinct: the useful set is far larger than a panel of buttons
 * can show without becoming a wall of symbols.
 */
var operator = function (des, symbol, text, inPanel) {
    if (inPanel === void 0) { inPanel = false; }
    return ({
        des: des,
        text: text,
        symbol: symbol,
        shift: symbol.length,
        selectionInput: symbol.length,
        type: 'text',
        newLine: false,
        suggestOnly: !inPanel,
        objectType: 'latexFormatterSetting',
    });
};
/** An operator with braces to fill in, with the caret inside the first pair. */
var braced = function (des, before, after, text, inPanel) {
    if (inPanel === void 0) { inPanel = false; }
    return ({
        des: des,
        text: text,
        symbol: before + after,
        shift: before.length,
        selectionInput: before.length,
        type: 'text',
        newLine: false,
        suggestOnly: !inPanel,
        objectType: 'latexFormatterSetting',
    });
};
var latexFormatterSettings = withIds({
    inlineEquation: {
        des: 'inline equation',
        text: '$$x$$',
        symbol: '$$$$',
        shift: 2,
        selectionInput: 2,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    equation: {
        des: 'equation',
        text: '$x$',
        symbol: '$$',
        shift: 1,
        selectionInput: 1,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    division: {
        des: 'frac',
        text: 'division',
        symbol: '\\frac{}{}',
        shift: 6,
        selectionInput: 6,
        type: 'icon',
        newLine: true,
        objectType: 'latexFormatterSetting',
    },
    multiplication: {
        des: 'times cross product',
        text: 'multiplication',
        symbol: '\\times',
        shift: 6,
        selectionInput: 6,
        type: 'icon',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    sup: {
        des: 'superscript',
        text: 'x<sup>y</sup>',
        symbol: '^{}',
        shift: 2,
        selectionInput: 2,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    div: {
        // Raises to the power of -1 - this is the reciprocal, not a division.
        // 'division' is the fraction entry above, whose icon is named that way.
        des: 'inverse',
        text: 'x<sup>-1</sup>',
        symbol: '^{-1}',
        shift: 5,
        selectionInput: 5,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    sub: {
        des: 'subscript',
        text: 'x<sub>y</sub>',
        symbol: '_{}',
        shift: 2,
        selectionInput: 2,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    e: {
        des: 'e',
        text: 'e<sup>x</sup>',
        symbol: 'e^{}',
        shift: 3,
        selectionInput: 3,
        type: 'text',
        newLine: true,
        objectType: 'latexFormatterSetting',
    },
    exp: {
        des: 'exp',
        text: 'exp',
        symbol: '\\exp()',
        shift: 5,
        selectionInput: 5,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    log: {
        des: 'log',
        text: 'log',
        symbol: '\\log()',
        shift: 5,
        selectionInput: 5,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    sin: {
        des: 'sin',
        text: 'sin',
        symbol: '\\sin()',
        shift: 5,
        selectionInput: 5,
        type: 'text',
        newLine: true,
        objectType: 'latexFormatterSetting',
    },
    cos: {
        des: 'cos',
        text: 'cos',
        symbol: '\\cos()',
        shift: 5,
        selectionInput: 5,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    tan: {
        des: 'tan',
        text: 'tan',
        symbol: '\\tan()',
        shift: 5,
        selectionInput: 5,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    cot: {
        des: 'cot',
        text: 'cot',
        symbol: '\\cot()',
        shift: 5,
        selectionInput: 5,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    sin2: {
        des: 'sin^2',
        text: 'sin<sup>2</sup>',
        symbol: '\\sin^2()',
        shift: 7,
        selectionInput: 7,
        type: 'text',
        newLine: true,
        objectType: 'latexFormatterSetting',
    },
    cos2: {
        des: 'cos^2',
        text: 'cos<sup>2</sup>',
        symbol: '\\cos^2()',
        shift: 7,
        selectionInput: 7,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    tan2: {
        des: 'tan^2',
        text: 'tan<sup>2</sup>',
        symbol: '\\tan^2()',
        shift: 7,
        selectionInput: 7,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    cot2: {
        des: 'cot^2',
        text: 'cot<sup>2</sup>',
        symbol: '\\cot^2()',
        shift: 7,
        selectionInput: 7,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    roundBrackets: {
        des: 'round brackets',
        text: '(x)',
        symbol: '\\left(\\right)',
        shift: 6,
        selectionInput: 6,
        type: 'text',
        newLine: true,
        objectType: 'latexFormatterSetting',
    },
    squareBrackets: {
        des: 'square brackets',
        text: '[x]',
        symbol: '\\left[\\right]',
        shift: 6,
        selectionInput: 6,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    curlyBrackets: {
        des: 'curly brackets',
        text: '{x}',
        symbol: '\\left\\{\\right\\}',
        shift: 7,
        selectionInput: 7,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    pipeBrackets: {
        des: 'pipe brackets',
        text: '|x|',
        symbol: '\\left|\\right|',
        shift: 6,
        selectionInput: 6,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    doublePipeBrackets: {
        des: 'double pipe brackets',
        text: '||x||',
        symbol: '\\left\\|\\right\\|',
        shift: 7,
        selectionInput: 7,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    sum: {
        des: 'sum',
        text: '∑',
        symbol: '\\sum_{}^{}',
        shift: 6,
        selectionInput: 6,
        type: 'text',
        newLine: true,
        objectType: 'latexFormatterSetting',
    },
    integral: {
        des: 'integral',
        text: '∫',
        symbol: '\\int_{}^{}',
        shift: 6,
        selectionInput: 6,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    sqrt: {
        des: 'square root',
        text: '√',
        symbol: '\\sqrt{}',
        shift: 6,
        selectionInput: 6,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    cdot: {
        des: 'cdot',
        text: '·',
        symbol: '\\cdot',
        shift: 5,
        selectionInput: 5,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    hat: {
        des: 'hat',
        text: 'hat',
        symbol: '\\hat{}',
        shift: 5,
        selectionInput: 5,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
    // ---- calculus, on the panel ------------------------------------------
    // Named in issues #38 and #21 as the gap that made the section "quite
    // limited". Four is what fits without turning the panel into a wall.
    infinity: braced('infinity', '\\infty', '', '∞', true),
    limit: braced('limit', '\\lim_{', '}', 'lim', true),
    partial: operator('partial derivative', '\\partial', '∂', true),
    product: braced('product', '\\prod_{', '}^{}', '∏', true),
    // ---- everything below is ALT+Q only ----------------------------------
    nabla: operator('nabla del', '\\nabla', '∇'),
    contourIntegral: braced('contour integral', '\\oint_{', '}^{}', '∮'),
    doubleIntegral: braced('double integral', '\\iint_{', '}^{}', '∬'),
    leq: operator('less than or equal', '\\leq', '≤'),
    geq: operator('greater than or equal', '\\geq', '≥'),
    neq: operator('not equal', '\\neq', '≠'),
    approx: operator('approximately equal', '\\approx', '≈'),
    equiv: operator('equivalent', '\\equiv', '≡'),
    propto: operator('proportional to', '\\propto', '∝'),
    simeq: operator('similar to', '\\sim', '∼'),
    elementOf: operator('element of', '\\in', '∈'),
    notElementOf: operator('not element of', '\\notin', '∉'),
    subset: operator('subset', '\\subset', '⊂'),
    subseteq: operator('subset or equal', '\\subseteq', '⊆'),
    union: operator('union', '\\cup', '∪'),
    intersection: operator('intersection', '\\cap', '∩'),
    emptySet: operator('empty set', '\\emptyset', '∅'),
    forAll: operator('for all', '\\forall', '∀'),
    exists: operator('there exists', '\\exists', '∃'),
    negation: operator('not negation', '\\neg', '¬'),
    logicalAnd: operator('logical and', '\\land', '∧'),
    logicalOr: operator('logical or', '\\lor', '∨'),
    arrowTo: operator('arrow to', '\\to', '→'),
    implies: operator('implies', '\\Rightarrow', '⇒'),
    iff: operator('if and only if', '\\Leftrightarrow', '⇔'),
    mapsTo: operator('maps to', '\\mapsto', '↦'),
    plusMinus: operator('plus minus', '\\pm', '±'),
    minusPlus: operator('minus plus', '\\mp', '∓'),
    angle: operator('angle', '\\angle', '∠'),
    degree: operator('degree', '^\\circ', '°'),
    ellipsis: operator('dots ellipsis', '\\dots', '…'),
    binomial: braced('binomial coefficient', '\\binom{', '}{}', 'binom'),
    overline: braced('overline', '\\overline{', '}', 'overline'),
    underline: braced('underline', '\\underline{', '}', 'underline'),
    textMode: braced('text inside maths', '\\text{', '}', 'text'),
    blackboardBold: braced('blackboard bold', '\\mathbb{', '}', 'ℝ'),
    vec: {
        des: 'vector',
        text: 'vec',
        symbol: '\\vec{}',
        shift: 5,
        selectionInput: 5,
        type: 'text',
        newLine: false,
        objectType: 'latexFormatterSetting',
    },
});
function latexFormatter(editor, item) {
    if (editor) {
        var isSelection = editor.somethingSelected();
        var selection = editor.getSelection();
        var curserStart = editor.getCursor('from');
        editor.getCursor('to');
        editor.getLine(curserStart.line);
        editor.focus();
        if (isSelection) {
            var replacment = selection.trim();
            editor.replaceSelection(item.symbol.substring(0, item.selectionInput) +
                replacment +
                item.symbol.substring(item.selectionInput));
            editor.setCursor(curserStart.line, curserStart.ch + item.shift);
        }
        else {
            editor.replaceRange(item.symbol, curserStart);
            editor.setCursor(curserStart.line, curserStart.ch + item.shift);
        }
    }
}

/**
 * Pure text and cursor arithmetic, with no imports of its own.
 *
 * Node runs the test suite by stripping types rather than compiling, and its
 * ESM resolver needs an explicit extension on every relative import - which the
 * build configuration forbids. Keeping the testable logic in a dependency-free
 * leaf module sidesteps that entirely: the tests import this file and nothing
 * else, while the editor-facing wrappers around it stay untested but trivial.
 */
var CURSOR_PLACEHOLDER = '{cursor}';
var SELECTION_PLACEHOLDER = '{selection}';
/**
 * The markers a value has to carry onto its own continuation lines.
 *
 * Only blockquotes qualify, and only when the placeholder sits behind nothing
 * but their markers. A quote is the one construct that must repeat its prefix
 * on every single line: drop a two-paragraph selection into `> {selection}` and
 * everything past the blank line falls straight out of the callout. A fenced
 * block, by contrast, must not be prefixed at all - hence the deliberately
 * narrow test rather than "reuse whatever leads the line".
 */
function continuationPrefix(lineSoFar) {
    return /^[ \t]*>[>\s]*$/.test(lineSoFar) ? lineSoFar : '';
}
/**
 * Resolves the placeholders of an insertion template.
 *
 * `{selection}` becomes the selected text - every occurrence, so a template may
 * mention it twice. `{cursor}` marks where the caret ends up; the first one
 * wins and any further ones are simply dropped. A template without a `{cursor}`
 * leaves the caret at the end, which is what typing would do.
 *
 * Everything happens in one pass over the TEMPLATE, which is what keeps the
 * substituted text inert: the selection is the user's own document text and may
 * well contain the word `{cursor}`, and a second pass would then treat it as
 * markup and mangle their note.
 */
function expandTemplate(template, selection) {
    // Kept in step with the exported placeholder constants above.
    var tokens = /\{(cursor|selection)\}/g;
    var text = '';
    var cursorOffset = -1;
    var copied = 0;
    for (var token = tokens.exec(template); token; token = tokens.exec(template)) {
        text += template.slice(copied, token.index);
        copied = token.index + token[0].length;
        if (token[1] === 'cursor') {
            if (cursorOffset < 0)
                cursorOffset = text.length;
            continue;
        }
        var prefix = continuationPrefix(text.slice(text.lastIndexOf('\n') + 1));
        text += prefix ? selection.split('\n').join('\n' + prefix) : selection;
    }
    text += template.slice(copied);
    return { text: text, cursorOffset: cursorOffset < 0 ? text.length : cursorOffset };
}
/**
 * Turns an offset inside inserted text into an editor position.
 *
 * Inserted text may span several lines, so the offset cannot simply be added to
 * the starting column: once a newline is crossed, the column restarts from the
 * beginning of the last line.
 */
function resolveCursorPosition(text, cursorOffset, start) {
    var before = text.slice(0, cursorOffset);
    var lastBreak = before.lastIndexOf('\n');
    if (lastBreak < 0) {
        return { line: start.line, ch: start.ch + before.length };
    }
    return {
        line: start.line + (before.split('\n').length - 1),
        ch: before.length - lastBreak - 1,
    };
}
/**
 * Gives multi-line inserts a line of their own.
 *
 * A table, a callout or a fenced block only renders when it starts at the
 * beginning of a line and is not followed by stray text, so whatever survives
 * the insertion on either side has to be pushed out of the way. Single-line
 * inserts are left alone - wrapping a word in asterisks must stay inline.
 *
 * `textBefore` and `textAfter` are what remains of the line around the point
 * being replaced, not the whole line: inserting mid-sentence has to break on
 * both sides, and replacing a whole line needs no break at all.
 */
function placeBlock(body, cursorOffset, textBefore, textAfter) {
    if (!body.includes('\n')) {
        return { text: body, cursorOffset: cursorOffset };
    }
    var lead = textBefore.trim() ? '\n' : '';
    var trail = textAfter.trim() ? '\n' : '';
    return {
        text: lead + body + trail,
        cursorOffset: lead.length + cursorOffset,
    };
}
/**
 * Builds the template for a callout block.
 *
 * The keyword inside `[!...]` is what Obsidian matches to pick the icon and the
 * colour, so it always stays English. Anything after it is a free-form title
 * that Obsidian renders in place of the default one - which is exactly how a
 * translated heading gets into the note without breaking the callout.
 *
 * With a title the caret goes straight to the body, since the heading is
 * already written. Without one it stops on the heading so it can be typed.
 */
function buildCalloutTemplate(id, title) {
    var heading = title.trim();
    return heading
        ? "> [!".concat(id, "] ").concat(heading, "\n> ").concat(CURSOR_PLACEHOLDER).concat(SELECTION_PLACEHOLDER)
        : "> [!".concat(id, "] ").concat(CURSOR_PLACEHOLDER, "\n> ").concat(SELECTION_PLACEHOLDER);
}
var TABLE_ALIGNMENTS = [
    'default',
    'left',
    'center',
    'right',
];
/**
 * All four are three characters wide, so the columns of the generated source
 * line up whatever the alignment is.
 */
var DELIMITERS = {
    default: '---',
    left: ':--',
    center: ':-:',
    right: '--:',
};
var CELL_WIDTH = 3;
var MAX_TABLE_ROWS = 6;
var MAX_TABLE_COLUMNS = 6;
function tableRow(cells) {
    return '|' + cells.map(function (cell) { return " ".concat(cell, " "); }).join('|') + '|';
}
/**
 * Builds the source of an empty markdown table.
 *
 * `rows` counts the header, so 1 means a header on its own - valid markdown,
 * and what the top row of the size picker promises. The delimiter row is never
 * counted, it is structural.
 */
function buildTable(rows, columns, alignment) {
    if (alignment === void 0) { alignment = 'default'; }
    var safeRows = Math.max(1, Math.floor(rows));
    var safeColumns = Math.max(1, Math.floor(columns));
    var empty = ' '.repeat(CELL_WIDTH);
    var delimiter = DELIMITERS[alignment] || DELIMITERS.default;
    var lines = [
        tableRow(new Array(safeColumns).fill(empty)),
        tableRow(new Array(safeColumns).fill(delimiter)),
    ];
    for (var line = 2; line < safeRows + 1; line++) {
        lines.push(tableRow(new Array(safeColumns).fill(empty)));
    }
    return {
        text: lines.join('\n'),
        // Right after the leading '| ' of the first header cell.
        cursorOffset: 2,
    };
}

var calloutsFormatterSettings = withIds({
    note: {
        des: 'note',
        text: 'Note',
        icon: 'lucide-pencil',
        color: 'rgb(68,138,255)',
        bgColor: 'rgba(68,138,255,0.1)',
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    info: {
        des: 'info',
        text: 'Info',
        icon: 'lucide-info',
        color: 'rgb(0,184,212)',
        bgColor: 'rgba(0,184,212,0.1)',
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    todo: {
        des: 'todo',
        text: 'Todo',
        icon: 'lucide-check-circle-2',
        color: 'rgb(0,184,212)',
        bgColor: 'rgba(0,184,212,0.1)',
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    abstract: {
        des: 'abstract',
        text: 'Abstract',
        icon: 'lucide-clipboard-list',
        color: 'rgb(0, 176, 255)',
        bgColor: 'rgba(0, 176, 255,0.1)',
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    summary: {
        des: 'summary',
        text: 'Summary',
        icon: 'lucide-clipboard-list',
        color: 'rgb(0, 176, 255)',
        bgColor: 'rgba(0, 176, 255,0.1)',
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    tldr: {
        des: 'tldr',
        text: 'TLDR',
        icon: 'lucide-clipboard-list',
        color: 'rgb(0, 176, 255)',
        bgColor: 'rgba(0, 176, 255,0.1)',
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    //step 2
    tip: {
        des: 'tip',
        text: 'Tip',
        icon: 'lucide-flame',
        color: 'rgb(0, 191, 165)',
        bgColor: 'rgba(0, 191, 165,0.1)',
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    hint: {
        des: 'hint',
        text: 'Hint',
        icon: 'lucide-flame',
        color: 'rgb(0, 191, 165)',
        bgColor: 'rgba(0, 191, 165,0.1)',
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    important: {
        des: 'important',
        text: 'Important',
        icon: 'lucide-flame',
        color: 'rgb(0, 191, 165)',
        bgColor: 'rgba(0, 191, 165,0.1)',
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    success: {
        des: 'success',
        text: 'Success',
        icon: 'lucide-check',
        color: 'rgb(0, 200, 83)',
        bgColor: 'rgba(0, 200, 83,0.1)',
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    check: {
        des: 'check',
        text: 'Check',
        icon: 'lucide-check',
        color: 'rgb(0, 200, 83)',
        bgColor: 'rgba(0, 200, 83,0.1)',
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    done: {
        des: 'done',
        text: 'Done',
        icon: 'lucide-check',
        color: 'rgb(0, 200, 83)',
        bgColor: 'rgba(0, 200, 83,0.1)',
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    question: {
        des: 'question',
        text: 'Question',
        icon: 'help-circle',
        color: 'rgb(100, 221, 23)',
        bgColor: 'rgba(100, 221, 23,0.1)',
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    help: {
        des: 'help',
        text: 'Help',
        icon: 'help-circle',
        color: 'rgb(100, 221, 23)',
        bgColor: 'rgba(100, 221, 23,0.1)',
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    faq: {
        des: 'faq',
        text: 'FAQ',
        icon: 'help-circle',
        color: 'rgb(100, 221, 23)',
        bgColor: 'rgba(100, 221, 23,0.1)',
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    warning: {
        des: 'warning',
        text: 'Warning',
        icon: 'lucide-alert-triangle',
        color: 'rgb(255, 145, 0)',
        bgColor: 'rgba(255, 145, 0,0.1)',
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    caution: {
        des: 'caution',
        text: 'Caution',
        icon: 'lucide-alert-triangle',
        color: 'rgb(255, 145, 0)',
        bgColor: 'rgba(255, 145, 0,0.1)',
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    attention: {
        des: 'attention',
        text: 'Attention',
        icon: 'lucide-alert-triangle',
        color: 'rgb(255, 145, 0)',
        bgColor: 'rgba(255, 145, 0,0.1)',
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    failure: {
        des: 'failure',
        text: 'Failure',
        icon: 'lucide-x',
        color: 'rgb(255, 82, 82)',
        bgColor: 'rgba(255, 82, 82,0.1)',
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    fail: {
        des: 'fail',
        text: 'Fail',
        icon: 'lucide-x',
        color: 'rgb(255, 82, 82)',
        bgColor: 'rgba(255, 82, 82,0.1)',
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    missing: {
        des: 'missing',
        text: 'Missing',
        icon: 'lucide-x',
        color: 'rgb(255, 82, 82)',
        bgColor: 'rgba(255, 82, 82,0.1)',
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    danger: {
        des: 'danger',
        text: 'Danger',
        icon: 'lucide-zap',
        color: 'rgb(255, 23, 68)',
        bgColor: 'rgba(255, 23, 68,0.1)',
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    error: {
        des: 'error',
        text: 'Error',
        icon: 'lucide-zap',
        color: 'rgb(255, 23, 68)',
        bgColor: 'rgba(255, 23, 68,0.1)',
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    bug: {
        des: 'bug',
        text: 'Bug',
        icon: 'lucide-bug',
        color: 'rgb(245, 0, 87)',
        bgColor: 'rgba(245, 0, 87,0.1)',
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    example: {
        des: 'example',
        text: 'Example',
        icon: 'lucide-list',
        color: 'rgb(124, 77, 255)',
        bgColor: 'rgba(124, 77, 255,0.1)',
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
    quote: {
        des: 'quote',
        text: 'Quote',
        icon: 'quote-glyph',
        color: 'rgb(158, 158, 158)',
        bgColor: 'rgba(158, 158, 158,0.1)',
        newLine: false,
        objectType: 'calloutsFormatterSetting',
    },
});
/**
 * Inserts a callout block.
 *
 * `title` is written after the keyword so Obsidian renders it instead of its
 * own English default - that is how a translated heading reaches the note. Pass
 * an empty string to keep the bare syntax and let the caret land on the
 * heading instead.
 */
function calloutsFormatter(editor, item, title) {
    if (title === void 0) { title = ''; }
    if (!editor)
        return;
    var selection = editor.getSelection();
    var start = editor.getCursor('from');
    var _a = surroundingText(editor), before = _a.before, after = _a.after;
    editor.focus();
    var expanded = expandTemplate(buildCalloutTemplate(item.id, title), selection.trim());
    // A callout is a block - it must not be glued into the middle of a sentence.
    var _b = placeBlock(expanded.text, expanded.cursorOffset, before, after), text = _b.text, cursorOffset = _b.cursorOffset;
    editor.replaceSelection(text);
    editor.setCursor(resolveCursorPosition(text, cursorOffset, start));
}

function colorFormatter(editor, color) {
    if (!editor)
        return;
    var curserStart = editor.getCursor('from');
    editor.focus();
    // Both paths land on the same result - replaceSelection inserts at the
    // cursor when nothing is selected.
    editor.replaceSelection(color);
    editor.setCursor(curserStart);
}

/**
 * What clicking a colour writes into the note. A leaf module with no imports,
 * so the tests can reach it - see the note in textPlacement.ts.
 *
 * The four checkboxes in the Colors section describe two quite different
 * jobs, and the old code ran them together. Three of them build a fragment of
 * CSS to be pasted into a tag you are already writing; the fourth wraps text.
 * Splitting them is what lets a selection be coloured rather than destroyed.
 */
function declarations(color, options) {
    if (options.color && options.background) {
        return "color: ".concat(color, "; background-color: ").concat(color);
    }
    if (options.background)
        return "background-color: ".concat(color);
    if (options.color)
        return "color: ".concat(color);
    return color;
}
/**
 * The code to insert when nothing is selected.
 *
 * `<font color>` takes a colour and not a declaration, so it uses the colour
 * as picked. Ticking the style attribute together with the tag used to emit
 * `<font color="style="color: #fff"">`, which is not markup at all.
 */
function colorCode(color, options) {
    if (options.html)
        return "<font color=\"".concat(color, "\"></font>");
    var body = declarations(color, options);
    return options.styleAttribute ? "style=\"".concat(body, "\"") : body;
}
/**
 * How to colour text that is selected.
 *
 * There is only one useful answer to "colour this", so it does not depend on
 * whether the tag checkbox happens to be ticked: a fragment like
 * `color: #ff0000` cannot wrap anything, and writing it over the selection is
 * what used to lose people their text.
 *
 * The background is the one choice that changes the wrapper. `<font color>`
 * can only set the text colour, so asking for a background has to produce a
 * span - otherwise the click would quietly do something else.
 */
function wrapWithColor(color, selection, options) {
    if (options.background) {
        return "<span style=\"".concat(declarations(color, options), "\">").concat(selection, "</span>");
    }
    return "<font color=\"".concat(color, "\">").concat(selection, "</font>");
}

function tableFormatter(editor, rows, columns, alignment) {
    if (!editor)
        return;
    var start = editor.getCursor('from');
    var _a = surroundingText(editor), before = _a.before, after = _a.after;
    editor.focus();
    var table = buildTable(rows, columns, alignment);
    var _b = placeBlock(table.text, table.cursorOffset, before, after), text = _b.text, cursorOffset = _b.cursorOffset;
    editor.replaceSelection(text);
    editor.setCursor(resolveCursorPosition(text, cursorOffset, start));
}

/**
 * Moving one item of a list to another position. A leaf module with no imports,
 * so the tests can reach it - see the note in textPlacement.ts.
 *
 * Its own file because three separate lists are reordered by dragging - the
 * toolbar buttons, the saved colours and the panel's sections - and each used
 * to carry its own copy of the arithmetic. Two of those copies were wrong in
 * the same way.
 */
/**
 * Removes the item at `from` and inserts it at `to`.
 *
 * Deliberately not a swap. A swap is the same thing only for neighbours: drag
 * the first item onto the last and a swap sends the last one to the front,
 * while everything between it stays put. What the gesture asks for is that the
 * dragged item lands there and the rest close up behind it.
 *
 * An index that does not resolve leaves the list alone, because a drop can
 * arrive from anywhere - another application, a file dragged out of the
 * explorer, a stray text selection.
 */
function moveItem(items, from, to) {
    var next = __spreadArray([], items, true);
    if (!Number.isInteger(from) ||
        !Number.isInteger(to) ||
        from < 0 ||
        from >= next.length ||
        to < 0 ||
        to >= next.length ||
        from === to) {
        return next;
    }
    var moved = next.splice(from, 1)[0];
    next.splice(to, 0, moved);
    return next;
}

/**
 * English is the base dictionary: its keys define the translation key type, and
 * every other locale falls back to it for anything it leaves out.
 */
var en = {
    // Product name. Locales normally leave this alone and inherit it.
    'view.displayName': 'Markdown Formatting Assistant',
    // Commands and ribbon
    'command.openPanel': 'Open Markdown Formatting Assistant',
    'command.openCommandSelector': 'Open Command Selector',
    'command.openCalloutsSelector': 'Open Callouts Selector',
    // Section headers
    'section.textEdit': 'Text Edit',
    'section.tables': 'Tables',
    'section.html': 'HTML',
    'section.latex': 'Latex',
    'section.greekLetters': 'Greek Letters',
    'section.colors': 'Colors',
    'section.callouts': 'Callouts',
    // Panel body
    'panel.noLeaf': 'Could not open the panel: the sidebar is unavailable.',
    'tables.pick': 'Pick a size',
    'tables.size': '{rows} x {columns}',
    'tables.align.default': 'Plain',
    'tables.align.left': 'Left',
    'tables.align.center': 'Center',
    'tables.align.right': 'Right',
    'html.reportMissingTag': 'Do you miss a Tag? report it!',
    'latex.introduction': 'Introduction into latex mathematics',
    'latex.reportMissingFunction': 'Do you miss a latex function? report it!',
    'greek.lowerCase': 'Lower Case',
    'greek.upperCase': 'Upper Case',
    'greek.overview': 'Overview of greek letters',
    // Colour picker
    'colors.select': 'Select a Color',
    'colors.save': 'Save Color',
    'colors.optionColor': ' Add "color: {your color}"',
    'colors.optionBackgroundColor': ' Add "background-color: {your color}"',
    'colors.optionStyleTag': ' Add tag: "style={your color}"',
    'colors.optionHtmlTag': ' Add HTML: "<font color={your color}>{selected text}</font>"',
    'colors.lastUsed': 'Last used colors:',
    'colors.saved': 'Saved Colors:',
    'colors.editInSettings': 'Saved colors can be directly edited in the settings.',
    'colors.help': 'Do you need some Help?',
    'colors.copied': 'Copied {color} to clipboard',
    'colors.copyFailed': 'Could not copy the color to clipboard',
    // Settings
    'settings.title': 'Markdown Formatting Assistant Settings',
    'settings.language.name': 'Language',
    'settings.language.desc': 'Language of the plugin interface. (restart required)',
    'settings.language.auto': 'Same as Obsidian',
    'settings.sidePaneSide.name': 'Side Pane Side',
    'settings.sidePaneSide.desc': 'Choose on which side the Side Pane appears.',
    'settings.sidePaneSide.placeholder': 'Enter left or right',
    'settings.toggleSection.name': 'Toggle {section} Section',
    'settings.toggleSection.desc': 'Activate or deactivate the {section} section. (restart required)',
    'settings.calloutTitles.name': 'Write callout headings',
    'settings.calloutTitles.desc': 'Insert the callout name as its heading, so a note shows it in your language. The keyword inside [!note] always stays English - that is what Obsidian matches on.',
    'settings.savedColors.name': 'Saved Colors',
    'settings.savedColors.desc': 'Colours kept for the palette in the side panel. Pick one to add it, click a swatch to remove it.',
    'settings.savedColors.empty': 'No saved colours yet.',
    'settings.savedColors.removeHint': 'click to remove',
    'settings.toolbar.name': 'Toolbar above the note',
    'settings.toolbar.desc': 'A row of buttons at the top of the editor, so the side panel can stay closed. Desktop only - on mobile Obsidian already has a toolbar above the keyboard.',
    'settings.toolbar.empty': 'No buttons yet. Add one below.',
    'settings.toolbar.unavailable': 'Unavailable: {id}',
    'settings.toolbar.remove': 'Remove from the toolbar',
    'settings.toolbar.add': 'Add a button',
    'settings.toolbar.addDesc': 'Any command in the vault can go on the toolbar, including Obsidian’s own and other plugins’. Drag the rows to reorder them. Up to {max} buttons.',
    'settings.toolbar.pick': 'Search every command',
    'settings.toolbar.align.name': 'Button alignment',
    'settings.toolbar.align.desc': 'Where the buttons sit in the row.',
    'settings.toolbar.align.left': 'Left',
    'settings.toolbar.align.center': 'Center',
    'settings.toolbar.align.right': 'Right',
    // Callout button labels. Only the label is translated - the callout type
    // inside '> [!note]' is a keyword Obsidian matches in English.
    'callout.note': 'Note',
    'callout.info': 'Info',
    'callout.todo': 'Todo',
    'callout.abstract': 'Abstract',
    'callout.summary': 'Summary',
    'callout.tldr': 'TLDR',
    'callout.tip': 'Tip',
    'callout.hint': 'Hint',
    'callout.important': 'Important',
    'callout.success': 'Success',
    'callout.check': 'Check',
    'callout.done': 'Done',
    'callout.question': 'Question',
    'callout.help': 'Help',
    'callout.faq': 'FAQ',
    'callout.warning': 'Warning',
    'callout.caution': 'Caution',
    'callout.attention': 'Attention',
    'callout.failure': 'Failure',
    'callout.fail': 'Fail',
    'callout.missing': 'Missing',
    'callout.danger': 'Danger',
    'callout.error': 'Error',
    'callout.bug': 'Bug',
    'callout.example': 'Example',
    'callout.quote': 'Quote',
};

var be = {
    'command.openPanel': 'Адкрыць Markdown Formatting Assistant',
    'command.openCommandSelector': 'Адкрыць выбар каманд',
    'command.openCalloutsSelector': 'Адкрыць выбар выносак',
    'section.textEdit': 'Тэкст',
    'section.tables': 'Табліцы',
    'section.html': 'HTML',
    'section.latex': 'LaTeX',
    'section.greekLetters': 'Грэчаскія літары',
    'section.colors': 'Колеры',
    'section.callouts': 'Выноскі',
    'panel.noLeaf': 'Не ўдалося адкрыць панэль: бакавая панэль недаступная.',
    'tables.pick': 'Выберыце памер',
    'tables.size': '{rows} x {columns}',
    'tables.align.default': 'Без',
    'tables.align.left': 'Злева',
    'tables.align.center': 'Па цэнтры',
    'tables.align.right': 'Справа',
    'html.reportMissingTag': 'Не хапае тэга? Паведаміце!',
    'latex.introduction': 'Уводзіны ў матэматыку LaTeX',
    'latex.reportMissingFunction': 'Не хапае функцыі LaTeX? Паведаміце!',
    'greek.lowerCase': 'Малыя літары',
    'greek.upperCase': 'Вялікія літары',
    'greek.overview': 'Агляд грэчаскага алфавіта',
    'colors.select': 'Выбраць колер',
    'colors.save': 'Захаваць колер',
    'colors.optionColor': ' Дадаць "color: {your color}"',
    'colors.optionBackgroundColor': ' Дадаць "background-color: {your color}"',
    'colors.optionStyleTag': ' Дадаць атрыбут: "style={your color}"',
    'colors.optionHtmlTag': ' Дадаць HTML: "<font color={your color}>{selected text}</font>"',
    'colors.lastUsed': 'Апошнія колеры:',
    'colors.saved': 'Захаваныя колеры:',
    'colors.editInSettings': 'Захаваныя колеры можна рэдагаваць проста ў наладах.',
    'colors.help': 'Патрэбна дапамога?',
    'colors.copied': 'Колер {color} скапіяваны ў буфер абмену',
    'colors.copyFailed': 'Не ўдалося скапіяваць колер у буфер абмену',
    'settings.title': 'Налады Markdown Formatting Assistant',
    'settings.language.name': 'Мова',
    'settings.language.desc': 'Мова інтэрфейсу плагіна. (патрэбны перазапуск)',
    'settings.language.auto': 'Як у Obsidian',
    'settings.sidePaneSide.name': 'Бок панэлі',
    'settings.sidePaneSide.desc': 'З якога боку адкрываецца бакавая панэль.',
    'settings.sidePaneSide.placeholder': 'Увядзіце left або right',
    'settings.toggleSection.name': 'Секцыя «{section}»',
    'settings.toggleSection.desc': 'Уключыць або выключыць секцыю «{section}». (патрэбны перазапуск)',
    'settings.savedColors.name': 'Захаваныя колеры',
    'settings.savedColors.desc': 'Колеры, захаваныя праз палітру. Парадак таксама ўлічваецца. Патрэбны перазапуск Obsidian.',
    'callout.note': 'Нататка',
    'callout.info': 'Інфармацыя',
    'callout.todo': 'Задача',
    'callout.abstract': 'Анатацыя',
    'callout.summary': 'Зводка',
    'callout.tldr': 'Сцісла',
    'callout.tip': 'Парада',
    'callout.hint': 'Падказка',
    'callout.important': 'Важна',
    'callout.success': 'Поспех',
    'callout.check': 'Праверана',
    'callout.done': 'Гатова',
    'callout.question': 'Пытанне',
    'callout.help': 'Дапамога',
    'callout.faq': 'ЧаПы',
    'callout.warning': 'Папярэджанне',
    'callout.caution': 'Асцярожна',
    'callout.attention': 'Увага',
    'callout.failure': 'Няўдача',
    'callout.fail': 'Правал',
    'callout.missing': 'Адсутнічае',
    'callout.danger': 'Небяспека',
    'callout.error': 'Памылка',
    'callout.bug': 'Баг',
    'callout.example': 'Прыклад',
    'callout.quote': 'Цытата',
    'settings.savedColors.empty': 'Захаваных колераў пакуль няма.',
    'settings.savedColors.removeHint': 'націсніце, каб выдаліць',
    'settings.toolbar.name': 'Панэль над нататкай',
    'settings.toolbar.desc': 'Шэраг кнопак уверсе рэдактара, каб бакавую панэль можна было закрыць. Толькі на камп’ютары — на мабільных у Obsidian ужо ёсць свая панэль над клавіятурай.',
    'settings.toolbar.empty': 'Кнопак пакуль няма. Дадайце ніжэй.',
    'settings.toolbar.unavailable': 'Недаступная: {id}',
    'settings.toolbar.remove': 'Прыбраць з панэлі',
    'settings.toolbar.add': 'Дадаць кнопку',
    'settings.toolbar.addDesc': 'На панэль можна пакласці любую каманду сховішча, у тым ліку каманды самога Obsidian і іншых плагінаў. Парадак мяняецца перацягваннем. Да {max} кнопак.',
    'settings.toolbar.pick': 'Пошук па ўсіх камандах',
    'settings.toolbar.align.name': 'Выраўноўванне кнопак',
    'settings.toolbar.align.desc': 'Дзе кнопкі стаяць у радзе.',
    'settings.toolbar.align.left': 'Па левым краі',
    'settings.toolbar.align.center': 'Па цэнтры',
    'settings.toolbar.align.right': 'Па правым краі',
    'settings.calloutTitles.name': 'Пісаць загаловак выноскі',
    'settings.calloutTitles.desc': 'Устаўляць назву выноскі як загаловак, каб у нататцы яна адлюстроўвалася на вашай мове. Ключавое слова ўнутры [!note] заўсёды застаецца англійскім — менавіта па ім Obsidian вызначае тып.',
};

var de = {
    'command.openPanel': 'Markdown Formatting Assistant öffnen',
    'command.openCommandSelector': 'Befehlsauswahl öffnen',
    'command.openCalloutsSelector': 'Callout-Auswahl öffnen',
    'section.textEdit': 'Textbearbeitung',
    'section.tables': 'Tabellen',
    'section.html': 'HTML',
    'section.latex': 'LaTeX',
    'section.greekLetters': 'Griechische Buchstaben',
    'section.colors': 'Farben',
    'section.callouts': 'Callouts',
    'panel.noLeaf': 'Das Panel konnte nicht geöffnet werden: die Seitenleiste ist nicht verfügbar.',
    'tables.pick': 'Größe wählen',
    'tables.size': '{rows} x {columns}',
    'tables.align.default': 'Ohne',
    'tables.align.left': 'Links',
    'tables.align.center': 'Zentriert',
    'tables.align.right': 'Rechts',
    'html.reportMissingTag': 'Fehlt ein Tag? Melde es!',
    'latex.introduction': 'Einführung in die LaTeX-Mathematik',
    'latex.reportMissingFunction': 'Fehlt eine LaTeX-Funktion? Melde es!',
    'greek.lowerCase': 'Kleinbuchstaben',
    'greek.upperCase': 'Großbuchstaben',
    'greek.overview': 'Übersicht der griechischen Buchstaben',
    'colors.select': 'Farbe wählen',
    'colors.save': 'Farbe speichern',
    'colors.optionColor': ' "color: {your color}" hinzufügen',
    'colors.optionBackgroundColor': ' "background-color: {your color}" hinzufügen',
    'colors.optionStyleTag': ' Attribut hinzufügen: "style={your color}"',
    'colors.optionHtmlTag': ' HTML hinzufügen: "<font color={your color}>{selected text}</font>"',
    'colors.lastUsed': 'Zuletzt verwendete Farben:',
    'colors.saved': 'Gespeicherte Farben:',
    'colors.editInSettings': 'Gespeicherte Farben lassen sich direkt in den Einstellungen bearbeiten.',
    'colors.help': 'Brauchst du Hilfe?',
    'colors.copied': '{color} in die Zwischenablage kopiert',
    'colors.copyFailed': 'Farbe konnte nicht in die Zwischenablage kopiert werden',
    'settings.title': 'Markdown Formatting Assistant – Einstellungen',
    'settings.language.name': 'Sprache',
    'settings.language.desc': 'Sprache der Plugin-Oberfläche. (Neustart erforderlich)',
    'settings.language.auto': 'Wie Obsidian',
    'settings.sidePaneSide.name': 'Seite der Seitenleiste',
    'settings.sidePaneSide.desc': 'Lege fest, auf welcher Seite die Seitenleiste erscheint.',
    'settings.sidePaneSide.placeholder': 'left oder right eingeben',
    'settings.toggleSection.name': 'Bereich „{section}“',
    'settings.toggleSection.desc': 'Bereich „{section}“ aktivieren oder deaktivieren. (Neustart erforderlich)',
    'settings.savedColors.name': 'Gespeicherte Farben',
    'settings.savedColors.desc': 'Über die Farbauswahl gespeicherte Farben. Die Reihenfolge wird ebenfalls berücksichtigt. Erfordert einen Neustart von Obsidian.',
    'callout.note': 'Notiz',
    'callout.info': 'Info',
    'callout.todo': 'Aufgabe',
    'callout.abstract': 'Kurzfassung',
    'callout.summary': 'Zusammenfassung',
    'callout.tldr': 'Kurz gesagt',
    'callout.tip': 'Tipp',
    'callout.hint': 'Hinweis',
    'callout.important': 'Wichtig',
    'callout.success': 'Erfolg',
    'callout.check': 'Geprüft',
    'callout.done': 'Erledigt',
    'callout.question': 'Frage',
    'callout.help': 'Hilfe',
    'callout.faq': 'FAQ',
    'callout.warning': 'Warnung',
    'callout.caution': 'Vorsicht',
    'callout.attention': 'Achtung',
    'callout.failure': 'Fehlschlag',
    'callout.fail': 'Nicht bestanden',
    'callout.missing': 'Fehlend',
    'callout.danger': 'Gefahr',
    'callout.error': 'Fehler',
    'callout.bug': 'Bug',
    'callout.example': 'Beispiel',
    'callout.quote': 'Zitat',
    'settings.savedColors.empty': 'Noch keine gespeicherten Farben.',
    'settings.savedColors.removeHint': 'zum Entfernen klicken',
    'settings.toolbar.name': 'Leiste über der Notiz',
    'settings.toolbar.desc': 'Eine Reihe Schaltflächen oben im Editor, damit das Seitenpanel geschlossen bleiben kann. Nur am Desktop – auf Mobilgeräten hat Obsidian bereits eine Leiste über der Tastatur.',
    'settings.toolbar.empty': 'Noch keine Schaltflächen. Füge unten eine hinzu.',
    'settings.toolbar.unavailable': 'Nicht verfügbar: {id}',
    'settings.toolbar.remove': 'Von der Leiste entfernen',
    'settings.toolbar.add': 'Schaltfläche hinzufügen',
    'settings.toolbar.addDesc': 'Jeder Befehl im Vault kann auf die Leiste, auch Obsidians eigene und die anderer Plugins. Die Reihenfolge änderst du per Ziehen. Bis zu {max} Schaltflächen.',
    'settings.toolbar.pick': 'Alle Befehle durchsuchen',
    'settings.toolbar.align.name': 'Ausrichtung der Schaltflächen',
    'settings.toolbar.align.desc': 'Wo die Schaltflächen in der Reihe sitzen.',
    'settings.toolbar.align.left': 'Links',
    'settings.toolbar.align.center': 'Mittig',
    'settings.toolbar.align.right': 'Rechts',
    'settings.calloutTitles.name': 'Callout-Überschrift schreiben',
    'settings.calloutTitles.desc': 'Den Namen des Callouts als Überschrift einfügen, damit die Notiz ihn in deiner Sprache zeigt. Das Schlüsselwort in [!note] bleibt immer englisch - daran erkennt Obsidian den Typ.',
};

var es = {
    'command.openPanel': 'Abrir Markdown Formatting Assistant',
    'command.openCommandSelector': 'Abrir selector de comandos',
    'command.openCalloutsSelector': 'Abrir selector de llamadas',
    'section.textEdit': 'Texto',
    'section.tables': 'Tablas',
    'section.html': 'HTML',
    'section.latex': 'LaTeX',
    'section.greekLetters': 'Letras griegas',
    'section.colors': 'Colores',
    'section.callouts': 'Llamadas',
    'panel.noLeaf': 'No se pudo abrir el panel: la barra lateral no está disponible.',
    'tables.pick': 'Elige un tamaño',
    'tables.size': '{rows} x {columns}',
    'tables.align.default': 'Sin',
    'tables.align.left': 'Izquierda',
    'tables.align.center': 'Centro',
    'tables.align.right': 'Derecha',
    'html.reportMissingTag': '¿Falta una etiqueta? ¡Avísanos!',
    'latex.introduction': 'Introducción a las matemáticas en LaTeX',
    'latex.reportMissingFunction': '¿Falta una función de LaTeX? ¡Avísanos!',
    'greek.lowerCase': 'Minúsculas',
    'greek.upperCase': 'Mayúsculas',
    'greek.overview': 'Resumen del alfabeto griego',
    'colors.select': 'Elegir un color',
    'colors.save': 'Guardar color',
    'colors.optionColor': ' Añadir "color: {your color}"',
    'colors.optionBackgroundColor': ' Añadir "background-color: {your color}"',
    'colors.optionStyleTag': ' Añadir atributo: "style={your color}"',
    'colors.optionHtmlTag': ' Añadir HTML: "<font color={your color}>{selected text}</font>"',
    'colors.lastUsed': 'Colores recientes:',
    'colors.saved': 'Colores guardados:',
    'colors.editInSettings': 'Los colores guardados se pueden editar directamente en los ajustes.',
    'colors.help': '¿Necesitas ayuda?',
    'colors.copied': 'Color {color} copiado al portapapeles',
    'colors.copyFailed': 'No se pudo copiar el color al portapapeles',
    'settings.title': 'Ajustes de Markdown Formatting Assistant',
    'settings.language.name': 'Idioma',
    'settings.language.desc': 'Idioma de la interfaz del plugin. (requiere reiniciar)',
    'settings.language.auto': 'Igual que Obsidian',
    'settings.sidePaneSide.name': 'Lado del panel lateral',
    'settings.sidePaneSide.desc': 'Elige en qué lado aparece el panel lateral.',
    'settings.sidePaneSide.placeholder': 'Introduce left o right',
    'settings.toggleSection.name': 'Sección «{section}»',
    'settings.toggleSection.desc': 'Activar o desactivar la sección «{section}». (requiere reiniciar)',
    'settings.savedColors.name': 'Colores guardados',
    'settings.savedColors.desc': 'Colores guardados mediante el selector de color. También se tiene en cuenta el orden. Requiere reiniciar Obsidian.',
    'callout.note': 'Nota',
    'callout.info': 'Información',
    'callout.todo': 'Tarea',
    'callout.abstract': 'Resumen',
    'callout.summary': 'Síntesis',
    'callout.tldr': 'En resumen',
    'callout.tip': 'Consejo',
    'callout.hint': 'Sugerencia',
    'callout.important': 'Importante',
    'callout.success': 'Éxito',
    'callout.check': 'Comprobado',
    'callout.done': 'Hecho',
    'callout.question': 'Pregunta',
    'callout.help': 'Ayuda',
    'callout.faq': 'Preguntas frecuentes',
    'callout.warning': 'Advertencia',
    'callout.caution': 'Precaución',
    'callout.attention': 'Atención',
    'callout.failure': 'Fallo',
    'callout.fail': 'No superado',
    'callout.missing': 'Ausente',
    'callout.danger': 'Peligro',
    'callout.error': 'Error',
    'callout.bug': 'Error de software',
    'callout.example': 'Ejemplo',
    'callout.quote': 'Cita',
    'settings.savedColors.empty': 'Todavía no hay colores guardados.',
    'settings.savedColors.removeHint': 'pulsa para quitar',
    'settings.toolbar.name': 'Barra sobre la nota',
    'settings.toolbar.desc': 'Una fila de botones en la parte superior del editor, para poder cerrar el panel lateral. Solo en escritorio: en móvil Obsidian ya tiene una barra sobre el teclado.',
    'settings.toolbar.empty': 'Todavía no hay botones. Añade uno abajo.',
    'settings.toolbar.unavailable': 'No disponible: {id}',
    'settings.toolbar.remove': 'Quitar de la barra',
    'settings.toolbar.add': 'Añadir un botón',
    'settings.toolbar.addDesc': 'Cualquier comando del almacén puede ir en la barra, incluidos los de Obsidian y los de otros plugins. Arrastra las filas para reordenarlas. Hasta {max} botones.',
    'settings.toolbar.pick': 'Buscar en todos los comandos',
    'settings.toolbar.align.name': 'Alineación de los botones',
    'settings.toolbar.align.desc': 'Dónde se colocan los botones en la fila.',
    'settings.toolbar.align.left': 'Izquierda',
    'settings.toolbar.align.center': 'Centro',
    'settings.toolbar.align.right': 'Derecha',
    'settings.calloutTitles.name': 'Escribir el título de la llamada',
    'settings.calloutTitles.desc': 'Insertar el nombre de la llamada como título, para que la nota lo muestre en tu idioma. La palabra clave dentro de [!note] siempre queda en inglés: es la que reconoce Obsidian.',
};

var fr = {
    'command.openPanel': 'Ouvrir Markdown Formatting Assistant',
    'command.openCommandSelector': 'Ouvrir le sélecteur de commandes',
    'command.openCalloutsSelector': 'Ouvrir le sélecteur d’encadrés',
    'section.textEdit': 'Texte',
    'section.tables': 'Tableaux',
    'section.html': 'HTML',
    'section.latex': 'LaTeX',
    'section.greekLetters': 'Lettres grecques',
    'section.colors': 'Couleurs',
    'section.callouts': 'Encadrés',
    'panel.noLeaf': 'Impossible d’ouvrir le panneau : la barre latérale n’est pas disponible.',
    'tables.pick': 'Choisir une taille',
    'tables.size': '{rows} x {columns}',
    'tables.align.default': 'Aucun',
    'tables.align.left': 'Gauche',
    'tables.align.center': 'Centre',
    'tables.align.right': 'Droite',
    'html.reportMissingTag': 'Une balise manque ? Signalez-le !',
    'latex.introduction': 'Introduction aux mathématiques en LaTeX',
    'latex.reportMissingFunction': 'Une fonction LaTeX manque ? Signalez-le !',
    'greek.lowerCase': 'Minuscules',
    'greek.upperCase': 'Majuscules',
    'greek.overview': 'Aperçu de l’alphabet grec',
    'colors.select': 'Choisir une couleur',
    'colors.save': 'Enregistrer la couleur',
    'colors.optionColor': ' Ajouter "color: {your color}"',
    'colors.optionBackgroundColor': ' Ajouter "background-color: {your color}"',
    'colors.optionStyleTag': ' Ajouter l’attribut : "style={your color}"',
    'colors.optionHtmlTag': ' Ajouter du HTML : "<font color={your color}>{selected text}</font>"',
    'colors.lastUsed': 'Couleurs récentes :',
    'colors.saved': 'Couleurs enregistrées :',
    'colors.editInSettings': 'Les couleurs enregistrées se modifient directement dans les paramètres.',
    'colors.help': 'Besoin d’aide ?',
    'colors.copied': 'Couleur {color} copiée dans le presse-papiers',
    'colors.copyFailed': 'Impossible de copier la couleur dans le presse-papiers',
    'settings.title': 'Paramètres de Markdown Formatting Assistant',
    'settings.language.name': 'Langue',
    'settings.language.desc': 'Langue de l’interface du plugin. (redémarrage requis)',
    'settings.language.auto': 'Comme Obsidian',
    'settings.sidePaneSide.name': 'Côté du volet latéral',
    'settings.sidePaneSide.desc': 'Choisissez de quel côté apparaît le volet latéral.',
    'settings.sidePaneSide.placeholder': 'Saisissez left ou right',
    'settings.toggleSection.name': 'Section « {section} »',
    'settings.toggleSection.desc': 'Activer ou désactiver la section « {section} ». (redémarrage requis)',
    'settings.savedColors.name': 'Couleurs enregistrées',
    'settings.savedColors.desc': 'Couleurs enregistrées via le sélecteur de couleur. L’ordre est également pris en compte. Nécessite un redémarrage d’Obsidian.',
    'callout.note': 'Note',
    'callout.info': 'Info',
    'callout.todo': 'À faire',
    'callout.abstract': 'Résumé',
    'callout.summary': 'Synthèse',
    'callout.tldr': 'En bref',
    'callout.tip': 'Astuce',
    'callout.hint': 'Indice',
    'callout.important': 'Important',
    'callout.success': 'Succès',
    'callout.check': 'Vérifié',
    'callout.done': 'Terminé',
    'callout.question': 'Question',
    'callout.help': 'Aide',
    'callout.faq': 'FAQ',
    'callout.warning': 'Avertissement',
    'callout.caution': 'Prudence',
    'callout.attention': 'Attention',
    'callout.failure': 'Échec',
    'callout.fail': 'Non validé',
    'callout.missing': 'Manquant',
    'callout.danger': 'Danger',
    'callout.error': 'Erreur',
    'callout.bug': 'Bogue',
    'callout.example': 'Exemple',
    'callout.quote': 'Citation',
    'settings.savedColors.empty': 'Aucune couleur enregistrée pour l’instant.',
    'settings.savedColors.removeHint': 'cliquer pour retirer',
    'settings.toolbar.name': 'Barre au-dessus de la note',
    'settings.toolbar.desc': 'Une rangée de boutons en haut de l’éditeur, pour pouvoir garder le panneau latéral fermé. Bureau uniquement : sur mobile, Obsidian dispose déjà d’une barre au-dessus du clavier.',
    'settings.toolbar.empty': 'Aucun bouton pour l’instant. Ajoutez-en un ci-dessous.',
    'settings.toolbar.unavailable': 'Indisponible : {id}',
    'settings.toolbar.remove': 'Retirer de la barre',
    'settings.toolbar.add': 'Ajouter un bouton',
    'settings.toolbar.addDesc': 'N’importe quelle commande du coffre peut aller sur la barre, y compris celles d’Obsidian et des autres extensions. Glissez les lignes pour les réordonner. Jusqu’à {max} boutons.',
    'settings.toolbar.pick': 'Rechercher parmi toutes les commandes',
    'settings.toolbar.align.name': 'Alignement des boutons',
    'settings.toolbar.align.desc': 'Où les boutons se placent dans la rangée.',
    'settings.toolbar.align.left': 'Gauche',
    'settings.toolbar.align.center': 'Centre',
    'settings.toolbar.align.right': 'Droite',
    'settings.calloutTitles.name': 'Écrire le titre de l’encadré',
    'settings.calloutTitles.desc': 'Insérer le nom de l’encadré comme titre, afin que la note l’affiche dans votre langue. Le mot-clé dans [!note] reste toujours en anglais : c’est lui qu’Obsidian reconnaît.',
};

var it = {
    'command.openPanel': 'Apri Markdown Formatting Assistant',
    'command.openCommandSelector': 'Apri il selettore dei comandi',
    'command.openCalloutsSelector': 'Apri il selettore dei riquadri',
    'section.textEdit': 'Testo',
    'section.tables': 'Tabelle',
    'section.html': 'HTML',
    'section.latex': 'LaTeX',
    'section.greekLetters': 'Lettere greche',
    'section.colors': 'Colori',
    'section.callouts': 'Riquadri',
    'panel.noLeaf': 'Impossibile aprire il pannello: la barra laterale non è disponibile.',
    'tables.pick': 'Scegli una dimensione',
    'tables.size': '{rows} x {columns}',
    'tables.align.default': 'Nessuno',
    'tables.align.left': 'Sinistra',
    'tables.align.center': 'Centro',
    'tables.align.right': 'Destra',
    'html.reportMissingTag': 'Manca un tag? Segnalalo!',
    'latex.introduction': 'Introduzione alla matematica in LaTeX',
    'latex.reportMissingFunction': 'Manca una funzione LaTeX? Segnalalo!',
    'greek.lowerCase': 'Minuscole',
    'greek.upperCase': 'Maiuscole',
    'greek.overview': "Panoramica dell'alfabeto greco",
    'colors.select': 'Scegli un colore',
    'colors.save': 'Salva colore',
    'colors.optionColor': ' Aggiungi "color: {your color}"',
    'colors.optionBackgroundColor': ' Aggiungi "background-color: {your color}"',
    'colors.optionStyleTag': ' Aggiungi attributo: "style={your color}"',
    'colors.optionHtmlTag': ' Aggiungi HTML: "<font color={your color}>{selected text}</font>"',
    'colors.lastUsed': 'Colori recenti:',
    'colors.saved': 'Colori salvati:',
    'colors.editInSettings': 'I colori salvati si possono modificare direttamente nelle impostazioni.',
    'colors.help': 'Ti serve aiuto?',
    'colors.copied': 'Colore {color} copiato negli appunti',
    'colors.copyFailed': 'Impossibile copiare il colore negli appunti',
    'settings.title': 'Impostazioni di Markdown Formatting Assistant',
    'settings.language.name': 'Lingua',
    'settings.language.desc': "Lingua dell'interfaccia del plugin. (riavvio necessario)",
    'settings.language.auto': 'Come Obsidian',
    'settings.sidePaneSide.name': 'Lato del pannello laterale',
    'settings.sidePaneSide.desc': 'Scegli su quale lato compare il pannello laterale.',
    'settings.sidePaneSide.placeholder': 'Inserisci left o right',
    'settings.toggleSection.name': 'Sezione «{section}»',
    'settings.toggleSection.desc': 'Attiva o disattiva la sezione «{section}». (riavvio necessario)',
    'settings.savedColors.name': 'Colori salvati',
    'settings.savedColors.desc': 'Colori salvati tramite il selettore di colore. Viene considerato anche l’ordine. Richiede il riavvio di Obsidian.',
    'callout.note': 'Nota',
    'callout.info': 'Info',
    'callout.todo': 'Da fare',
    'callout.abstract': 'Sintesi',
    'callout.summary': 'Riassunto',
    'callout.tldr': 'In breve',
    'callout.tip': 'Suggerimento',
    'callout.hint': 'Indizio',
    'callout.important': 'Importante',
    'callout.success': 'Successo',
    'callout.check': 'Verificato',
    'callout.done': 'Fatto',
    'callout.question': 'Domanda',
    'callout.help': 'Aiuto',
    'callout.faq': 'FAQ',
    'callout.warning': 'Avviso',
    'callout.caution': 'Cautela',
    'callout.attention': 'Attenzione',
    'callout.failure': 'Fallimento',
    'callout.fail': 'Non superato',
    'callout.missing': 'Mancante',
    'callout.danger': 'Pericolo',
    'callout.error': 'Errore',
    'callout.bug': 'Bug',
    'callout.example': 'Esempio',
    'callout.quote': 'Citazione',
    'settings.savedColors.empty': 'Nessun colore salvato per ora.',
    'settings.savedColors.removeHint': 'tocca per rimuovere',
    'settings.toolbar.name': 'Barra sopra la nota',
    'settings.toolbar.desc': 'Una fila di pulsanti in cima all’editor, così il pannello laterale può restare chiuso. Solo su desktop: su mobile Obsidian ha già una barra sopra la tastiera.',
    'settings.toolbar.empty': 'Nessun pulsante per ora. Aggiungine uno qui sotto.',
    'settings.toolbar.unavailable': 'Non disponibile: {id}',
    'settings.toolbar.remove': 'Togli dalla barra',
    'settings.toolbar.add': 'Aggiungi un pulsante',
    'settings.toolbar.addDesc': 'Sulla barra può finire qualsiasi comando del vault, compresi quelli di Obsidian e di altri plugin. Trascina le righe per riordinarle. Fino a {max} pulsanti.',
    'settings.toolbar.pick': 'Cerca fra tutti i comandi',
    'settings.toolbar.align.name': 'Allineamento dei pulsanti',
    'settings.toolbar.align.desc': 'Dove stanno i pulsanti nella riga.',
    'settings.toolbar.align.left': 'Sinistra',
    'settings.toolbar.align.center': 'Centro',
    'settings.toolbar.align.right': 'Destra',
    'settings.calloutTitles.name': 'Scrivere il titolo del riquadro',
    'settings.calloutTitles.desc': 'Inserire il nome del riquadro come titolo, così la nota lo mostra nella tua lingua. La parola chiave dentro [!note] resta sempre in inglese: è quella che Obsidian riconosce.',
};

var ja = {
    'command.openPanel': 'Markdown Formatting Assistant を開く',
    'command.openCommandSelector': 'コマンド選択を開く',
    'command.openCalloutsSelector': 'コールアウト選択を開く',
    'section.textEdit': 'テキスト編集',
    'section.tables': '表',
    'section.html': 'HTML',
    'section.latex': 'LaTeX',
    'section.greekLetters': 'ギリシャ文字',
    'section.colors': '色',
    'section.callouts': 'コールアウト',
    'panel.noLeaf': 'パネルを開けませんでした：サイドバーが利用できません。',
    'tables.pick': 'サイズを選択',
    'tables.size': '{rows} x {columns}',
    'tables.align.default': 'なし',
    'tables.align.left': '左寄せ',
    'tables.align.center': '中央',
    'tables.align.right': '右寄せ',
    'html.reportMissingTag': '足りないタグがありますか？ご報告ください！',
    'latex.introduction': 'LaTeX 数式入門',
    'latex.reportMissingFunction': '足りない LaTeX 関数がありますか？ご報告ください！',
    'greek.lowerCase': '小文字',
    'greek.upperCase': '大文字',
    'greek.overview': 'ギリシャ文字一覧',
    'colors.select': '色を選択',
    'colors.save': '色を保存',
    'colors.optionColor': ' "color: {your color}" を追加',
    'colors.optionBackgroundColor': ' "background-color: {your color}" を追加',
    'colors.optionStyleTag': ' 属性を追加: "style={your color}"',
    'colors.optionHtmlTag': ' HTML を追加: "<font color={your color}>{selected text}</font>"',
    'colors.lastUsed': '最近使った色:',
    'colors.saved': '保存した色:',
    'colors.editInSettings': '保存した色は設定から直接編集できます。',
    'colors.help': 'ヘルプが必要ですか？',
    'colors.copied': '{color} をクリップボードにコピーしました',
    'colors.copyFailed': '色をクリップボードにコピーできませんでした',
    'settings.title': 'Markdown Formatting Assistant の設定',
    'settings.language.name': '言語',
    'settings.language.desc': 'プラグインの表示言語。（再起動が必要）',
    'settings.language.auto': 'Obsidian に合わせる',
    'settings.sidePaneSide.name': 'サイドパネルの位置',
    'settings.sidePaneSide.desc': 'サイドパネルを表示する側を選びます。',
    'settings.sidePaneSide.placeholder': 'left または right を入力',
    'settings.toggleSection.name': '「{section}」セクション',
    'settings.toggleSection.desc': '「{section}」セクションを有効または無効にします。（再起動が必要）',
    'settings.savedColors.name': '保存した色',
    'settings.savedColors.desc': 'カラーピッカーで保存した色です。並び順も保持されます。Obsidian の再起動が必要です。',
    'callout.note': 'ノート',
    'callout.info': '情報',
    'callout.todo': 'ToDo',
    'callout.abstract': '要約',
    'callout.summary': 'まとめ',
    'callout.tldr': '要点',
    'callout.tip': 'ヒント',
    'callout.hint': '手がかり',
    'callout.important': '重要',
    'callout.success': '成功',
    'callout.check': '確認済み',
    'callout.done': '完了',
    'callout.question': '質問',
    'callout.help': 'ヘルプ',
    'callout.faq': 'よくある質問',
    'callout.warning': '警告',
    'callout.caution': '注意',
    'callout.attention': '留意',
    'callout.failure': '失敗',
    'callout.fail': '不合格',
    'callout.missing': '欠落',
    'callout.danger': '危険',
    'callout.error': 'エラー',
    'callout.bug': 'バグ',
    'callout.example': '例',
    'callout.quote': '引用',
    'settings.savedColors.empty': '保存された色はまだありません。',
    'settings.savedColors.removeHint': 'クリックで削除',
    'settings.toolbar.name': 'ノート上部のツールバー',
    'settings.toolbar.desc': 'エディタの上部にボタンを並べます。サイドパネルを閉じたままにできます。デスクトップ専用です。モバイルの Obsidian にはキーボード上のツールバーがすでにあります。',
    'settings.toolbar.empty': 'ボタンはまだありません。下から追加してください。',
    'settings.toolbar.unavailable': '利用できません: {id}',
    'settings.toolbar.remove': 'ツールバーから外す',
    'settings.toolbar.add': 'ボタンを追加',
    'settings.toolbar.addDesc': 'Obsidian 自身や他プラグインのものも含め、保管庫のどのコマンドでもツールバーに置けます。行をドラッグすると並べ替えられます。最大 {max} 個。',
    'settings.toolbar.pick': 'すべてのコマンドを検索',
    'settings.toolbar.align.name': 'ボタンの配置',
    'settings.toolbar.align.desc': '行の中でボタンを寄せる位置です。',
    'settings.toolbar.align.left': '左寄せ',
    'settings.toolbar.align.center': '中央',
    'settings.toolbar.align.right': '右寄せ',
    'settings.calloutTitles.name': 'コールアウトの見出しを書き込む',
    'settings.calloutTitles.desc': 'コールアウト名を見出しとして挿入し、ノートで選択した言語のまま表示されるようにします。[!note] の中のキーワードは常に英語のままです。Obsidian はそれで種類を判別します。',
};

var ko = {
    'command.openPanel': 'Markdown Formatting Assistant 열기',
    'command.openCommandSelector': '명령 선택기 열기',
    'command.openCalloutsSelector': '콜아웃 선택기 열기',
    'section.textEdit': '텍스트 편집',
    'section.tables': '표',
    'section.html': 'HTML',
    'section.latex': 'LaTeX',
    'section.greekLetters': '그리스 문자',
    'section.colors': '색상',
    'section.callouts': '콜아웃',
    'panel.noLeaf': '패널을 열 수 없습니다: 사이드바를 사용할 수 없습니다.',
    'tables.pick': '크기 선택',
    'tables.size': '{rows} x {columns}',
    'tables.align.default': '없음',
    'tables.align.left': '왼쪽',
    'tables.align.center': '가운데',
    'tables.align.right': '오른쪽',
    'html.reportMissingTag': '없는 태그가 있나요? 알려 주세요!',
    'latex.introduction': 'LaTeX 수식 입문',
    'latex.reportMissingFunction': '없는 LaTeX 함수가 있나요? 알려 주세요!',
    'greek.lowerCase': '소문자',
    'greek.upperCase': '대문자',
    'greek.overview': '그리스 문자 한눈에 보기',
    'colors.select': '색상 선택',
    'colors.save': '색상 저장',
    'colors.optionColor': ' "color: {your color}" 추가',
    'colors.optionBackgroundColor': ' "background-color: {your color}" 추가',
    'colors.optionStyleTag': ' 속성 추가: "style={your color}"',
    'colors.optionHtmlTag': ' HTML 추가: "<font color={your color}>{selected text}</font>"',
    'colors.lastUsed': '최근 사용한 색상:',
    'colors.saved': '저장한 색상:',
    'colors.editInSettings': '저장한 색상은 설정에서 바로 편집할 수 있습니다.',
    'colors.help': '도움이 필요하신가요?',
    'colors.copied': '{color}을(를) 클립보드에 복사했습니다',
    'colors.copyFailed': '색상을 클립보드에 복사하지 못했습니다',
    'settings.title': 'Markdown Formatting Assistant 설정',
    'settings.language.name': '언어',
    'settings.language.desc': '플러그인 인터페이스 언어입니다. (재시작 필요)',
    'settings.language.auto': 'Obsidian과 동일',
    'settings.sidePaneSide.name': '사이드 패널 위치',
    'settings.sidePaneSide.desc': '사이드 패널이 나타날 쪽을 선택하세요.',
    'settings.sidePaneSide.placeholder': 'left 또는 right 입력',
    'settings.toggleSection.name': '「{section}」 섹션',
    'settings.toggleSection.desc': '「{section}」 섹션을 켜거나 끕니다. (재시작 필요)',
    'settings.savedColors.name': '저장한 색상',
    'settings.savedColors.desc': '색상 선택기로 저장한 색상입니다. 순서도 함께 유지됩니다. Obsidian을 다시 시작해야 합니다.',
    'callout.note': '노트',
    'callout.info': '정보',
    'callout.todo': '할 일',
    'callout.abstract': '개요',
    'callout.summary': '요약',
    'callout.tldr': '핵심 요약',
    'callout.tip': '팁',
    'callout.hint': '힌트',
    'callout.important': '중요',
    'callout.success': '성공',
    'callout.check': '확인됨',
    'callout.done': '완료',
    'callout.question': '질문',
    'callout.help': '도움말',
    'callout.faq': '자주 묻는 질문',
    'callout.warning': '경고',
    'callout.caution': '주의',
    'callout.attention': '유의',
    'callout.failure': '실패',
    'callout.fail': '불합격',
    'callout.missing': '누락',
    'callout.danger': '위험',
    'callout.error': '오류',
    'callout.bug': '버그',
    'callout.example': '예시',
    'callout.quote': '인용',
    'settings.savedColors.empty': '저장된 색상이 아직 없습니다.',
    'settings.savedColors.removeHint': '클릭하면 삭제',
    'settings.toolbar.name': '노트 위 도구 모음',
    'settings.toolbar.desc': '편집기 상단에 버튼을 한 줄로 놓아 사이드 패널을 닫아 둘 수 있습니다. 데스크톱 전용입니다. 모바일에서는 Obsidian이 이미 키보드 위에 도구 모음을 제공합니다.',
    'settings.toolbar.empty': '아직 버튼이 없습니다. 아래에서 추가하세요.',
    'settings.toolbar.unavailable': '사용할 수 없음: {id}',
    'settings.toolbar.remove': '도구 모음에서 제거',
    'settings.toolbar.add': '버튼 추가',
    'settings.toolbar.addDesc': 'Obsidian 자체 명령과 다른 플러그인의 명령을 포함해 보관소의 어떤 명령이든 도구 모음에 올릴 수 있습니다. 행을 끌어 순서를 바꾸세요. 최대 {max}개.',
    'settings.toolbar.pick': '모든 명령 검색',
    'settings.toolbar.align.name': '버튼 정렬',
    'settings.toolbar.align.desc': '버튼이 줄에서 놓이는 위치입니다.',
    'settings.toolbar.align.left': '왼쪽',
    'settings.toolbar.align.center': '가운데',
    'settings.toolbar.align.right': '오른쪽',
    'settings.calloutTitles.name': '콜아웃 제목 삽입',
    'settings.calloutTitles.desc': '콜아웃 이름을 제목으로 넣어 노트에 선택한 언어로 표시되게 합니다. [!note] 안의 키워드는 항상 영어로 유지되며, Obsidian 은 그것으로 종류를 판별합니다.',
};

var pt = {
    'command.openPanel': 'Abrir Markdown Formatting Assistant',
    'command.openCommandSelector': 'Abrir seletor de comandos',
    'command.openCalloutsSelector': 'Abrir seletor de destaques',
    'section.textEdit': 'Texto',
    'section.tables': 'Tabelas',
    'section.html': 'HTML',
    'section.latex': 'LaTeX',
    'section.greekLetters': 'Letras gregas',
    'section.colors': 'Cores',
    'section.callouts': 'Destaques',
    'panel.noLeaf': 'Não foi possível abrir o painel: a barra lateral não está disponível.',
    'tables.pick': 'Escolha um tamanho',
    'tables.size': '{rows} x {columns}',
    'tables.align.default': 'Sem',
    'tables.align.left': 'Esquerda',
    'tables.align.center': 'Centro',
    'tables.align.right': 'Direita',
    'html.reportMissingTag': 'Falta alguma tag? Avise!',
    'latex.introduction': 'Introdução à matemática em LaTeX',
    'latex.reportMissingFunction': 'Falta alguma função do LaTeX? Avise!',
    'greek.lowerCase': 'Minúsculas',
    'greek.upperCase': 'Maiúsculas',
    'greek.overview': 'Visão geral do alfabeto grego',
    'colors.select': 'Escolher uma cor',
    'colors.save': 'Salvar cor',
    'colors.optionColor': ' Adicionar "color: {your color}"',
    'colors.optionBackgroundColor': ' Adicionar "background-color: {your color}"',
    'colors.optionStyleTag': ' Adicionar atributo: "style={your color}"',
    'colors.optionHtmlTag': ' Adicionar HTML: "<font color={your color}>{selected text}</font>"',
    'colors.lastUsed': 'Cores recentes:',
    'colors.saved': 'Cores salvas:',
    'colors.editInSettings': 'As cores salvas podem ser editadas diretamente nas configurações.',
    'colors.help': 'Precisa de ajuda?',
    'colors.copied': 'Cor {color} copiada para a área de transferência',
    'colors.copyFailed': 'Não foi possível copiar a cor para a área de transferência',
    'settings.title': 'Configurações do Markdown Formatting Assistant',
    'settings.language.name': 'Idioma',
    'settings.language.desc': 'Idioma da interface do plugin. (requer reinício)',
    'settings.language.auto': 'Igual ao Obsidian',
    'settings.sidePaneSide.name': 'Lado do painel lateral',
    'settings.sidePaneSide.desc': 'Escolha de que lado o painel lateral aparece.',
    'settings.sidePaneSide.placeholder': 'Digite left ou right',
    'settings.toggleSection.name': 'Seção «{section}»',
    'settings.toggleSection.desc': 'Ativar ou desativar a seção «{section}». (requer reinício)',
    'settings.savedColors.name': 'Cores salvas',
    'settings.savedColors.desc': 'Cores salvas por meio do seletor de cores. A ordem também é considerada. Requer reiniciar o Obsidian.',
    'callout.note': 'Nota',
    'callout.info': 'Informação',
    'callout.todo': 'Tarefa',
    'callout.abstract': 'Resumo',
    'callout.summary': 'Síntese',
    'callout.tldr': 'Em resumo',
    'callout.tip': 'Dica',
    'callout.hint': 'Sugestão',
    'callout.important': 'Importante',
    'callout.success': 'Sucesso',
    'callout.check': 'Verificado',
    'callout.done': 'Concluído',
    'callout.question': 'Pergunta',
    'callout.help': 'Ajuda',
    'callout.faq': 'Perguntas frequentes',
    'callout.warning': 'Aviso',
    'callout.caution': 'Cuidado',
    'callout.attention': 'Atenção',
    'callout.failure': 'Falha',
    'callout.fail': 'Não aprovado',
    'callout.missing': 'Ausente',
    'callout.danger': 'Perigo',
    'callout.error': 'Erro',
    'callout.bug': 'Bug',
    'callout.example': 'Exemplo',
    'callout.quote': 'Citação',
    'settings.savedColors.empty': 'Ainda não há cores guardadas.',
    'settings.savedColors.removeHint': 'clique para remover',
    'settings.toolbar.name': 'Barra acima da nota',
    'settings.toolbar.desc': 'Uma linha de botões no topo do editor, para o painel lateral poder ficar fechado. Apenas no computador — no telemóvel o Obsidian já tem uma barra acima do teclado.',
    'settings.toolbar.empty': 'Ainda não há botões. Adicione um abaixo.',
    'settings.toolbar.unavailable': 'Indisponível: {id}',
    'settings.toolbar.remove': 'Remover da barra',
    'settings.toolbar.add': 'Adicionar um botão',
    'settings.toolbar.addDesc': 'Qualquer comando do cofre pode ir para a barra, incluindo os do próprio Obsidian e os de outros plugins. Arraste as linhas para reordenar. Até {max} botões.',
    'settings.toolbar.pick': 'Procurar em todos os comandos',
    'settings.toolbar.align.name': 'Alinhamento dos botões',
    'settings.toolbar.align.desc': 'Onde os botões ficam na linha.',
    'settings.toolbar.align.left': 'Esquerda',
    'settings.toolbar.align.center': 'Centro',
    'settings.toolbar.align.right': 'Direita',
    'settings.calloutTitles.name': 'Escrever o título do destaque',
    'settings.calloutTitles.desc': 'Inserir o nome do destaque como título, para que a nota o mostre no seu idioma. A palavra-chave dentro de [!note] permanece sempre em inglês - é por ela que o Obsidian identifica o tipo.',
};

/** 'view.displayName' is deliberately absent - the product name stays as is. */
var ru = {
    'command.openPanel': 'Открыть Markdown Formatting Assistant',
    'command.openCommandSelector': 'Открыть выбор команд',
    'command.openCalloutsSelector': 'Открыть выбор коллаутов',
    'section.textEdit': 'Текст',
    'section.tables': 'Таблицы',
    'section.html': 'HTML',
    'section.latex': 'LaTeX',
    'section.greekLetters': 'Греческие буквы',
    'section.colors': 'Цвета',
    'section.callouts': 'Коллауты',
    'panel.noLeaf': 'Не удалось открыть панель: боковая панель недоступна.',
    'tables.pick': 'Выберите размер',
    'tables.size': '{rows} x {columns}',
    'tables.align.default': 'Без',
    'tables.align.left': 'Слева',
    'tables.align.center': 'По центру',
    'tables.align.right': 'Справа',
    'html.reportMissingTag': 'Не хватает тега? Сообщите!',
    'latex.introduction': 'Введение в математику LaTeX',
    'latex.reportMissingFunction': 'Не хватает функции LaTeX? Сообщите!',
    'greek.lowerCase': 'Строчные',
    'greek.upperCase': 'Прописные',
    'greek.overview': 'Обзор греческого алфавита',
    'colors.select': 'Выбрать цвет',
    'colors.save': 'Сохранить цвет',
    'colors.optionColor': ' Добавить "color: {your color}"',
    'colors.optionBackgroundColor': ' Добавить "background-color: {your color}"',
    'colors.optionStyleTag': ' Добавить атрибут: "style={your color}"',
    'colors.optionHtmlTag': ' Добавить HTML: "<font color={your color}>{selected text}</font>"',
    'colors.lastUsed': 'Последние цвета:',
    'colors.saved': 'Сохранённые цвета:',
    'colors.editInSettings': 'Сохранённые цвета можно править прямо в настройках.',
    'colors.help': 'Нужна помощь?',
    'colors.copied': 'Цвет {color} скопирован в буфер обмена',
    'colors.copyFailed': 'Не удалось скопировать цвет в буфер обмена',
    'settings.title': 'Настройки Markdown Formatting Assistant',
    'settings.language.name': 'Язык',
    'settings.language.desc': 'Язык интерфейса плагина. (требуется перезапуск)',
    'settings.language.auto': 'Как в Obsidian',
    'settings.sidePaneSide.name': 'Сторона панели',
    'settings.sidePaneSide.desc': 'С какой стороны открывается боковая панель.',
    // 'left' and 'right' are the literal values this field accepts, so they are
    // not translated.
    'settings.sidePaneSide.placeholder': 'Введите left или right',
    'settings.toggleSection.name': 'Секция «{section}»',
    'settings.toggleSection.desc': 'Включить или выключить секцию «{section}». (требуется перезапуск)',
    'settings.savedColors.name': 'Сохранённые цвета',
    'settings.savedColors.desc': 'Цвета, сохранённые через палитру. Порядок тоже учитывается. Требуется перезапуск Obsidian.',
    'callout.note': 'Заметка',
    'callout.info': 'Информация',
    'callout.todo': 'Задача',
    'callout.abstract': 'Аннотация',
    'callout.summary': 'Сводка',
    'callout.tldr': 'Кратко',
    'callout.tip': 'Совет',
    'callout.hint': 'Подсказка',
    'callout.important': 'Важно',
    'callout.success': 'Успех',
    'callout.check': 'Проверено',
    'callout.done': 'Готово',
    'callout.question': 'Вопрос',
    'callout.help': 'Помощь',
    'callout.faq': 'ЧаВо',
    'callout.warning': 'Предупреждение',
    'callout.caution': 'Осторожно',
    'callout.attention': 'Внимание',
    'callout.failure': 'Неудача',
    'callout.fail': 'Провал',
    'callout.missing': 'Отсутствует',
    'callout.danger': 'Опасность',
    'callout.error': 'Ошибка',
    'callout.bug': 'Баг',
    'callout.example': 'Пример',
    'callout.quote': 'Цитата',
    'settings.savedColors.empty': 'Сохранённых цветов пока нет.',
    'settings.savedColors.removeHint': 'нажмите, чтобы удалить',
    'settings.toolbar.name': 'Панель над заметкой',
    'settings.toolbar.desc': 'Ряд кнопок вверху редактора, чтобы боковую панель можно было закрыть. Только на компьютере — на мобильных у Obsidian уже есть своя панель над клавиатурой.',
    'settings.toolbar.empty': 'Кнопок пока нет. Добавьте ниже.',
    'settings.toolbar.unavailable': 'Недоступна: {id}',
    'settings.toolbar.remove': 'Убрать с панели',
    'settings.toolbar.add': 'Добавить кнопку',
    'settings.toolbar.addDesc': 'На панель можно положить любую команду хранилища, включая команды самого Obsidian и других плагинов. Порядок меняется перетаскиванием. До {max} кнопок.',
    'settings.toolbar.pick': 'Поиск по всем командам',
    'settings.toolbar.align.name': 'Выравнивание кнопок',
    'settings.toolbar.align.desc': 'Где кнопки стоят в ряду.',
    'settings.toolbar.align.left': 'По левому краю',
    'settings.toolbar.align.center': 'По центру',
    'settings.toolbar.align.right': 'По правому краю',
    'settings.calloutTitles.name': 'Писать заголовок коллаута',
    'settings.calloutTitles.desc': 'Вставлять название коллаута как заголовок, чтобы в заметке оно отображалось на вашем языке. Ключевое слово внутри [!note] всегда остаётся английским — именно по нему Obsidian опознаёт тип.',
};

var uk = {
    'command.openPanel': 'Відкрити Markdown Formatting Assistant',
    'command.openCommandSelector': 'Відкрити вибір команд',
    'command.openCalloutsSelector': 'Відкрити вибір виносок',
    'section.textEdit': 'Текст',
    'section.tables': 'Таблиці',
    'section.html': 'HTML',
    'section.latex': 'LaTeX',
    'section.greekLetters': 'Грецькі літери',
    'section.colors': 'Кольори',
    'section.callouts': 'Виноски',
    'panel.noLeaf': 'Не вдалося відкрити панель: бічна панель недоступна.',
    'tables.pick': 'Оберіть розмір',
    'tables.size': '{rows} x {columns}',
    'tables.align.default': 'Без',
    'tables.align.left': 'Ліворуч',
    'tables.align.center': 'По центру',
    'tables.align.right': 'Праворуч',
    'html.reportMissingTag': 'Бракує тега? Повідомте!',
    'latex.introduction': 'Вступ до математики LaTeX',
    'latex.reportMissingFunction': 'Бракує функції LaTeX? Повідомте!',
    'greek.lowerCase': 'Малі літери',
    'greek.upperCase': 'Великі літери',
    'greek.overview': 'Огляд грецької абетки',
    'colors.select': 'Вибрати колір',
    'colors.save': 'Зберегти колір',
    'colors.optionColor': ' Додати "color: {your color}"',
    'colors.optionBackgroundColor': ' Додати "background-color: {your color}"',
    'colors.optionStyleTag': ' Додати атрибут: "style={your color}"',
    'colors.optionHtmlTag': ' Додати HTML: "<font color={your color}>{selected text}</font>"',
    'colors.lastUsed': 'Останні кольори:',
    'colors.saved': 'Збережені кольори:',
    'colors.editInSettings': 'Збережені кольори можна редагувати просто в налаштуваннях.',
    'colors.help': 'Потрібна допомога?',
    'colors.copied': 'Колір {color} скопійовано до буфера обміну',
    'colors.copyFailed': 'Не вдалося скопіювати колір до буфера обміну',
    'settings.title': 'Налаштування Markdown Formatting Assistant',
    'settings.language.name': 'Мова',
    'settings.language.desc': 'Мова інтерфейсу плагіна. (потрібен перезапуск)',
    'settings.language.auto': 'Як в Obsidian',
    'settings.sidePaneSide.name': 'Сторона панелі',
    'settings.sidePaneSide.desc': 'З якого боку відкривається бічна панель.',
    'settings.sidePaneSide.placeholder': 'Введіть left або right',
    'settings.toggleSection.name': 'Секція «{section}»',
    'settings.toggleSection.desc': 'Увімкнути або вимкнути секцію «{section}». (потрібен перезапуск)',
    'settings.savedColors.name': 'Збережені кольори',
    'settings.savedColors.desc': 'Кольори, збережені через палітру. Порядок також враховується. Потрібен перезапуск Obsidian.',
    'callout.note': 'Нотатка',
    'callout.info': 'Інформація',
    'callout.todo': 'Завдання',
    'callout.abstract': 'Анотація',
    'callout.summary': 'Підсумок',
    'callout.tldr': 'Стисло',
    'callout.tip': 'Порада',
    'callout.hint': 'Підказка',
    'callout.important': 'Важливо',
    'callout.success': 'Успіх',
    'callout.check': 'Перевірено',
    'callout.done': 'Готово',
    'callout.question': 'Питання',
    'callout.help': 'Довідка',
    'callout.faq': 'ЧаПи',
    'callout.warning': 'Попередження',
    'callout.caution': 'Обережно',
    'callout.attention': 'Увага',
    'callout.failure': 'Невдача',
    'callout.fail': 'Провал',
    'callout.missing': 'Відсутнє',
    'callout.danger': 'Небезпека',
    'callout.error': 'Помилка',
    'callout.bug': 'Баг',
    'callout.example': 'Приклад',
    'callout.quote': 'Цитата',
    'settings.savedColors.empty': 'Збережених кольорів поки немає.',
    'settings.savedColors.removeHint': 'натисніть, щоб видалити',
    'settings.toolbar.name': 'Панель над нотаткою',
    'settings.toolbar.desc': 'Ряд кнопок угорі редактора, щоб бічну панель можна було закрити. Лише на комп’ютері — на мобільних Obsidian уже має власну панель над клавіатурою.',
    'settings.toolbar.empty': 'Кнопок поки немає. Додайте нижче.',
    'settings.toolbar.unavailable': 'Недоступна: {id}',
    'settings.toolbar.remove': 'Прибрати з панелі',
    'settings.toolbar.add': 'Додати кнопку',
    'settings.toolbar.addDesc': 'На панель можна покласти будь-яку команду сховища, зокрема команди самого Obsidian та інших плагінів. Порядок змінюється перетягуванням. До {max} кнопок.',
    'settings.toolbar.pick': 'Пошук за всіма командами',
    'settings.toolbar.align.name': 'Вирівнювання кнопок',
    'settings.toolbar.align.desc': 'Де кнопки стоять у ряду.',
    'settings.toolbar.align.left': 'За лівим краєм',
    'settings.toolbar.align.center': 'По центру',
    'settings.toolbar.align.right': 'За правим краєм',
    'settings.calloutTitles.name': 'Писати заголовок виноски',
    'settings.calloutTitles.desc': 'Вставляти назву виноски як заголовок, щоб у нотатці вона відображалася вашою мовою. Ключове слово всередині [!note] завжди залишається англійським — саме за ним Obsidian розпізнає тип.',
};

/** Simplified Chinese. */
var zh = {
    'command.openPanel': '打开 Markdown Formatting Assistant',
    'command.openCommandSelector': '打开命令选择器',
    'command.openCalloutsSelector': '打开标注选择器',
    'section.textEdit': '文本编辑',
    'section.tables': '表格',
    'section.html': 'HTML',
    'section.latex': 'LaTeX',
    'section.greekLetters': '希腊字母',
    'section.colors': '颜色',
    'section.callouts': '标注',
    'panel.noLeaf': '无法打开面板：侧边栏不可用。',
    'tables.pick': '选择大小',
    'tables.size': '{rows} x {columns}',
    'tables.align.default': '默认',
    'tables.align.left': '左对齐',
    'tables.align.center': '居中',
    'tables.align.right': '右对齐',
    'html.reportMissingTag': '缺少标签？告诉我们！',
    'latex.introduction': 'LaTeX 数学公式入门',
    'latex.reportMissingFunction': '缺少 LaTeX 函数？告诉我们！',
    'greek.lowerCase': '小写',
    'greek.upperCase': '大写',
    'greek.overview': '希腊字母表一览',
    'colors.select': '选择颜色',
    'colors.save': '保存颜色',
    'colors.optionColor': ' 添加 "color: {your color}"',
    'colors.optionBackgroundColor': ' 添加 "background-color: {your color}"',
    'colors.optionStyleTag': ' 添加属性："style={your color}"',
    'colors.optionHtmlTag': ' 添加 HTML："<font color={your color}>{selected text}</font>"',
    'colors.lastUsed': '最近使用的颜色：',
    'colors.saved': '已保存的颜色：',
    'colors.editInSettings': '已保存的颜色可以直接在设置中编辑。',
    'colors.help': '需要帮助吗？',
    'colors.copied': '已将 {color} 复制到剪贴板',
    'colors.copyFailed': '无法将颜色复制到剪贴板',
    'settings.title': 'Markdown Formatting Assistant 设置',
    'settings.language.name': '语言',
    'settings.language.desc': '插件界面语言。（需要重启）',
    'settings.language.auto': '与 Obsidian 一致',
    'settings.sidePaneSide.name': '侧边栏位置',
    'settings.sidePaneSide.desc': '选择侧边栏出现在哪一侧。',
    'settings.sidePaneSide.placeholder': '输入 left 或 right',
    'settings.toggleSection.name': '「{section}」板块',
    'settings.toggleSection.desc': '启用或禁用「{section}」板块。（需要重启）',
    'settings.savedColors.name': '已保存的颜色',
    'settings.savedColors.desc': '通过取色器保存的颜色。顺序同样会被保留。需要重启 Obsidian。',
    'callout.note': '笔记',
    'callout.info': '信息',
    'callout.todo': '待办',
    'callout.abstract': '摘要',
    'callout.summary': '概要',
    'callout.tldr': '太长不看',
    'callout.tip': '提示',
    'callout.hint': '提醒',
    'callout.important': '重要',
    'callout.success': '成功',
    'callout.check': '已检查',
    'callout.done': '完成',
    'callout.question': '问题',
    'callout.help': '帮助',
    'callout.faq': '常见问题',
    'callout.warning': '警告',
    'callout.caution': '注意',
    'callout.attention': '留意',
    'callout.failure': '失败',
    'callout.fail': '未通过',
    'callout.missing': '缺失',
    'callout.danger': '危险',
    'callout.error': '错误',
    'callout.bug': '缺陷',
    'callout.example': '示例',
    'callout.quote': '引用',
    'settings.savedColors.empty': '暂无已保存的颜色。',
    'settings.savedColors.removeHint': '点击删除',
    'settings.toolbar.name': '笔记上方的工具栏',
    'settings.toolbar.desc': '在编辑器顶部显示一排按钮，这样就可以关闭侧边栏。仅限桌面端——移动端 Obsidian 已经在键盘上方提供了工具栏。',
    'settings.toolbar.empty': '暂无按钮，请在下方添加。',
    'settings.toolbar.unavailable': '不可用：{id}',
    'settings.toolbar.remove': '从工具栏移除',
    'settings.toolbar.add': '添加按钮',
    'settings.toolbar.addDesc': '库中的任何命令都可以放到工具栏上，包括 Obsidian 自带的命令和其他插件的命令。拖动行即可调整顺序。最多 {max} 个按钮。',
    'settings.toolbar.pick': '搜索全部命令',
    'settings.toolbar.align.name': '按钮对齐',
    'settings.toolbar.align.desc': '按钮在这一行中的位置。',
    'settings.toolbar.align.left': '左对齐',
    'settings.toolbar.align.center': '居中',
    'settings.toolbar.align.right': '右对齐',
    'settings.calloutTitles.name': '写入标注标题',
    'settings.calloutTitles.desc': '把标注名称作为标题插入，这样笔记中就会显示你所选语言的名称。[!note] 中的关键字始终保持英文，Obsidian 依靠它识别类型。',
};

/**
 * Adding a language means writing one dictionary file and adding it here -
 * `LocaleCode`, the settings dropdown and the detection all derive from this
 * object, so no other code changes.
 */
var LOCALES = {
    en: en,
    be: be,
    de: de,
    es: es,
    fr: fr,
    it: it,
    ja: ja,
    ko: ko,
    pt: pt,
    ru: ru,
    uk: uk,
    zh: zh,
};
/** Language names are shown in their own language, as language pickers do. */
var LOCALE_NAMES = {
    en: 'English',
    be: 'Беларуская',
    de: 'Deutsch',
    es: 'Español',
    fr: 'Français',
    it: 'Italiano',
    ja: '日本語',
    ko: '한국어',
    pt: 'Português',
    ru: 'Русский',
    uk: 'Українська',
    zh: '简体中文',
};

/**
 * Translation layer for everything the user reads.
 *
 * English is the source of truth: its keys define the `TranslationKey` type, so
 * a typo in a `t()` call is a build error rather than a blank label. Other
 * locales are partial - anything they leave out falls back to English, which
 * means a half-finished translation still yields a usable interface.
 *
 * The dictionaries themselves live in ./locales, one file per language.
 */
var AUTO_LOCALE = 'auto';
var SUPPORTED_LOCALES = Object.keys(LOCALES);
/**
 * Region names are persisted in the settings file, so they must never change.
 * This maps them to the label the user sees, for both the panel and settings.
 */
var SECTION_LABEL_KEYS = {
    textEdit: 'section.textEdit',
    tables: 'section.tables',
    html: 'section.html',
    latex: 'section.latex',
    greekLetters: 'section.greekLetters',
    colors: 'section.colors',
    callouts: 'section.callouts',
};
var activeLocale = 'en';
function isSupported(code) {
    return SUPPORTED_LOCALES.indexOf(code) >= 0;
}
/**
 * Obsidian keeps the interface language in local storage under 'language'.
 * The browser locale is the fallback for the rare case where it is unset.
 *
 * Regional variants collapse onto the base language, so 'pt-BR' resolves to
 * 'pt'. The one place that loses information is Traditional Chinese, which
 * lands on the Simplified dictionary.
 */
function detectLocale() {
    var candidate = '';
    try {
        candidate = window.localStorage.getItem('language') || '';
    }
    catch (error) {
        candidate = '';
    }
    if (!candidate)
        candidate = navigator.language || '';
    var normalised = candidate.toLowerCase().split('-')[0];
    return isSupported(normalised) ? normalised : 'en';
}
function setLocale(setting) {
    if (setting === AUTO_LOCALE) {
        activeLocale = detectLocale();
        return;
    }
    activeLocale = isSupported(setting) ? setting : 'en';
}
/**
 * Looks up a key in the active locale and substitutes `{name}` placeholders.
 *
 * Only names present in `vars` are substituted, so literal braces in a label -
 * such as the '{your color}' in the colour options - are left alone.
 */
function t(key, vars) {
    var template = LOCALES[activeLocale][key] || en[key];
    if (!vars)
        return template;
    return Object.keys(vars).reduce(function (text, name) { return text.split('{' + name + '}').join(String(vars[name])); }, template);
}
function sectionLabel(regionName) {
    var key = SECTION_LABEL_KEYS[regionName];
    return key ? t(key) : regionName;
}
/**
 * Callout ids double as the Obsidian keyword in '> [!note]', so they stay
 * English forever. Only the button label goes through here.
 */
function calloutLabel(calloutId) {
    var key = ('callout.' + calloutId);
    return en[key] ? t(key) : calloutId;
}

/**
 * Names for Obsidian's own command palette and hotkey list. A leaf module with
 * no imports, so the tests can reach it - see the note in textPlacement.ts.
 *
 * The panel's labels are terse keys like 'code_block'. They work as search
 * terms in this plugin's own window, but the hotkey list sits next to entries
 * such as "Toggle bold", so they are widened just enough to be readable -
 * without inventing and translating a second name for every button.
 */
/** Turns a panel label into the name shown in Obsidian's command list. */
function commandName(label) {
    var words = (label || '').trim().replace(/_/g, ' ');
    if (!words)
        return '';
    // 'h1' through 'h6' keep their shape on purpose: that is what the panel
    // button says and what people type when they search for it.
    return words.charAt(0).toUpperCase() + words.slice(1);
}
/**
 * What to write on a toolbar button for a command that has no icon.
 *
 * Obsidian prefixes a command's name with the plugin it came from, so the
 * useful part is whatever follows the last colon - and even that is often a
 * sentence. Two characters is what fits a square button; the full name is on
 * the tooltip either way.
 */
function shortLabel(name) {
    var parts = (name || '').split(':');
    var tail = parts[parts.length - 1].trim();
    return tail.slice(0, 2);
}

var SidePanelControlViewType = 'side-panel-control-view';
// The repository the community catalogue installs from, so the one whose
// tracker is open. The fork this was maintained in has issues turned off.
var REPOSITORY_URL = 'https://github.com/Reocin/obsidian-markdown-formatting-assistant-plugin';
var ISSUES_URL = "".concat(REPOSITORY_URL, "/issues");
var SidePanelControlView = /** @class */ (function (_super) {
    __extends(SidePanelControlView, _super);
    function SidePanelControlView(leaf, plugin) {
        var _this = _super.call(this, leaf) || this;
        _this.plugin = plugin;
        return _this;
    }
    SidePanelControlView.prototype.getViewType = function () {
        return SidePanelControlViewType;
    };
    SidePanelControlView.prototype.getDisplayText = function () {
        return t('view.displayName');
    };
    SidePanelControlView.prototype.getIcon = function () {
        return 'viewIcon';
    };
    SidePanelControlView.prototype.load = function () {
        _super.prototype.load.call(this);
        this.draw();
    };
    SidePanelControlView.prototype.draw = function () {
        var container = this.containerEl.children[1];
        var rootEl = document.createElement('div');
        rootEl.id = 'mfa-panel-root';
        this.drawContentOfRootElement(rootEl);
        container.empty();
        container.appendChild(rootEl);
    };
    SidePanelControlView.prototype.drawContentOfRootElement = function (rootEl) {
        var _this = this;
        if (rootEl === void 0) { rootEl = null; }
        if (!rootEl)
            rootEl = document.getElementById('mfa-panel-root');
        rootEl.textContent = '';
        var getRegion = function (name) {
            return _this.plugin.settings.regionSettings.find(function (item) { return item.name === name; });
        };
        // Width is left to the stylesheet - the leaf is user-resizable, so nothing
        // in here may pin a fixed width.
        var mainDiv = rootEl.createDiv({
            cls: 'nav-header markdown-formatting-assistant-panel mfa-scope',
        });
        // --------------
        // Text Edit Section
        // --------------
        var addTextEditSection = function () {
            var content = _this.addSelectableHeader(mainDiv, 'textEdit');
            _this.addTextEditButtons(content);
        };
        // --------------
        // Table Section
        // --------------
        var addTabelsSection = function () {
            var content = _this.addSelectableHeader(mainDiv, 'tables');
            _this.addTableBuilder(content);
        };
        // --------------
        // HTML Section
        // --------------
        var addHtmlSection = function () {
            var content = _this.addSelectableHeader(mainDiv, 'html');
            _this.addHtmlButtons(content);
            _this.addNote(content, t('html.reportMissingTag'), ISSUES_URL);
        };
        // --------------
        // Latex Section
        // --------------
        var addLatexSection = function () {
            var content = _this.addSelectableHeader(mainDiv, 'latex');
            _this.addLatexButtons(content);
            _this.addNote(content, t('latex.introduction'), 'https://en.wikibooks.org/wiki/LaTeX/Mathematics');
            _this.addNote(content, t('latex.reportMissingFunction'), ISSUES_URL);
        };
        // --------------
        // Greek Section
        // --------------
        var addGreekLettersSection = function () {
            var content = _this.addSelectableHeader(mainDiv, 'greekLetters');
            content
                .createEl('h5', { cls: 'mfa-subheading' })
                .setText(t('greek.lowerCase'));
            _this.addGreekLowerCaseLetters(content);
            content
                .createEl('h5', { cls: 'mfa-subheading' })
                .setText(t('greek.upperCase'));
            _this.addGreekUpperCaseLetters(content);
            _this.addNote(content, t('greek.overview'), 'https://en.wikipedia.org/wiki/Greek_alphabet');
        };
        // --------------
        // Colors
        // --------------
        var addColorsSection = function () {
            var content = _this.addSelectableHeader(mainDiv, 'colors');
            _this.addColorBody(content);
        };
        // --------------
        // Callouts
        // --------------
        var addCalloutsSection = function () {
            var content = _this.addSelectableHeader(mainDiv, 'callouts');
            _this.addCalloutsButtons(content);
        };
        var regions = {
            textEdit: addTextEditSection,
            tables: addTabelsSection,
            html: addHtmlSection,
            latex: addLatexSection,
            greekLetters: addGreekLettersSection,
            colors: addColorsSection,
            callouts: addCalloutsSection,
        };
        this.plugin.settings.regionSettings.map(function (item) {
            // @ts-ignore
            var regionFunction = regions[item.name];
            if (regionFunction && getRegion(item.name).active)
                regionFunction();
        });
    };
    /**
     * Turns one of the panel's divs into something a keyboard and a screen
     * reader can use.
     *
     * The panel is built from divs on purpose: they carry Obsidian's own
     * `nav-action-button` styling, which is what makes the buttons follow the
     * user's theme. A real `<button>` would be the better element, but it also
     * arrives with browser chrome that would have to be fought back off, and the
     * hover states are the theme's rather than ours. So the div is given the
     * three things the element type would otherwise have supplied: a role, a
     * place in the tab order, and activation by Enter and Space.
     *
     * The name matters most. Most of these buttons hold nothing but a drawing,
     * so without a label a screen reader has literally nothing to announce - not
     * a mislabelled button, no button at all. It also gives everyone else the
     * hover tooltip the panel never had.
     */
    SidePanelControlView.prototype.asButton = function (element, label, activate) {
        element.setAttribute('role', 'button');
        element.setAttribute('aria-label', label);
        element.tabIndex = 0;
        element.onClickEvent(function () { return activate(); });
        element.addEventListener('keydown', function (event) {
            if (event.key !== 'Enter' && event.key !== ' ')
                return;
            // Space scrolls the panel otherwise, which is the one thing a person
            // pressing it on a button does not want.
            event.preventDefault();
            activate();
        });
    };
    /** The small centred link that closes several of the sections. */
    SidePanelControlView.prototype.addNote = function (parent, text, href) {
        parent
            .createEl('p', { cls: 'mfa-note' })
            .createEl('a', { cls: 'mfa-note-link', href: href })
            .appendText(text);
    };
    /**
     * A size picker for markdown tables: hovering the grid previews the table
     * that a click would insert, which is a lot less fiddly in a narrow pane than
     * two number inputs.
     */
    SidePanelControlView.prototype.addTableBuilder = function (mainDiv) {
        var _this = this;
        var alignment = this.plugin.settings.tableAlignment;
        var label = mainDiv.createEl('p', { cls: 'mfa-table-label' });
        var idleLabel = function () { return t('tables.pick'); };
        label.setText(idleLabel());
        var grid = mainDiv.createDiv({ cls: 'mfa-table-grid' });
        var cells = [];
        var paint = function (rows, columns) {
            cells.forEach(function (cellRow, rowIndex) {
                return cellRow.forEach(function (cell, columnIndex) {
                    cell.toggleClass('is-covered', rowIndex < rows && columnIndex < columns);
                });
            });
        };
        for (var rowIndex = 0; rowIndex < MAX_TABLE_ROWS; rowIndex++) {
            var rowEl = grid.createDiv({ cls: 'mfa-table-grid-row' });
            var rowCells = [];
            var _loop_1 = function (columnIndex) {
                var cell = rowEl.createDiv({ cls: 'mfa-table-cell' });
                var rows = rowIndex + 1;
                var columns = columnIndex + 1;
                cell.addEventListener('mouseenter', function () {
                    paint(rows, columns);
                    label.setText(t('tables.size', { rows: rows, columns: columns }));
                });
                // The grid is a picture of the table, so each cell says the size it
                // would insert - the only way to use it without seeing it.
                this_1.asButton(cell, t('tables.size', { rows: rows, columns: columns }), function () {
                    var editor = getTargetEditor(_this.app.workspace);
                    if (editor)
                        tableFormatter(editor, rows, columns, alignment);
                });
                rowCells.push(cell);
            };
            var this_1 = this;
            for (var columnIndex = 0; columnIndex < MAX_TABLE_COLUMNS; columnIndex++) {
                _loop_1(columnIndex);
            }
            cells.push(rowCells);
        }
        grid.addEventListener('mouseleave', function () {
            paint(0, 0);
            label.setText(idleLabel());
        });
        var alignmentRow = mainDiv.createDiv({
            cls: 'nav-buttons-container mfa-table-alignment',
        });
        var alignmentButtons = [];
        var highlightAlignment = function () {
            alignmentButtons.forEach(function (button, index) {
                button.toggleClass('is-active', TABLE_ALIGNMENTS[index] === alignment);
            });
        };
        TABLE_ALIGNMENTS.forEach(function (option) {
            var label = t("tables.align.".concat(option));
            var button = alignmentRow.createDiv({ cls: 'nav-action-text-button' });
            button.appendText(label);
            _this.asButton(button, label, function () {
                alignment = option;
                _this.plugin.settings.tableAlignment = option;
                highlightAlignment();
                void _this.plugin.saveSettings();
            });
            alignmentButtons.push(button);
        });
        highlightAlignment();
    };
    SidePanelControlView.prototype.addHtmlButtons = function (mainDiv) {
        var _this = this;
        var activate = function (type) {
            // @ts-ignore
            var formatterSetting = htmlFormatterSettings[type];
            var editor = getTargetEditor(_this.app.workspace);
            if (editor)
                htmlFormatter(editor, formatterSetting);
        };
        var numberOfCols = 3;
        var row = null;
        sortBy(identity, keys(htmlFormatterSettings)).forEach(function (key, index) {
            // @ts-ignore
            var item = htmlFormatterSettings[key];
            if (index % numberOfCols === 0) {
                row = mainDiv.createDiv({ cls: 'nav-buttons-container' });
            }
            var button = row.createDiv({ cls: 'nav-action-text-button' });
            button.appendText(item.des);
            _this.asButton(button, item.des, function () { return activate(key); });
        });
    };
    SidePanelControlView.prototype.addCalloutsButtons = function (mainDiv) {
        var _this = this;
        var activate = function (type) {
            // @ts-ignore
            var formatterSetting = calloutsFormatterSettings[type];
            var editor = getTargetEditor(_this.app.workspace);
            if (!editor)
                return;
            // The heading is written into the note so it renders translated; the
            // keyword inside [!...] stays English either way.
            calloutsFormatter(editor, formatterSetting, _this.plugin.settings.calloutTitles
                ? calloutLabel(formatterSetting.id)
                : '');
        };
        var row = null;
        keys(calloutsFormatterSettings).forEach(function (key, index) {
            // @ts-ignore
            var item = calloutsFormatterSettings[key];
            if (index === 0 || item.newLine) {
                row = mainDiv.createDiv({ cls: 'nav-buttons-container' });
            }
            var button = row.createDiv({
                cls: 'nav-action-text-button mfa-centered-button mfa-callout-button',
            });
            // Each callout carries its own colours as data, so the stylesheet takes
            // delivery of them through custom properties.
            button.style.setProperty('--mfa-callout-color', item.color);
            button.style.setProperty('--mfa-callout-background', item.bgColor);
            _this.asButton(button, calloutLabel(item.id), function () { return activate(key); });
            var spanIcon = button.createSpan({ cls: 'mfa-callout-icon' });
            obsidian.setIcon(spanIcon, item.icon);
            button.createSpan().setText(' ' + calloutLabel(item.id));
        });
    };
    SidePanelControlView.prototype.addLatexButtons = function (mainDiv) {
        var _this = this;
        var activate = function (type) {
            // @ts-ignore
            var formatterSetting = latexFormatterSettings[type];
            var editor = getTargetEditor(_this.app.workspace);
            if (editor)
                latexFormatter(editor, formatterSetting);
        };
        var row = null;
        // The panel shows a chosen few; the rest are reachable through ALT+Q,
        // which is what issue #21 asked for. Filtered before the index is taken,
        // or a hidden entry would take its row break with it.
        var shown = keys(latexFormatterSettings).filter(
        // @ts-ignore
        function (key) { return !latexFormatterSettings[key].suggestOnly; });
        shown.forEach(function (key, index) {
            // @ts-ignore
            var item = latexFormatterSettings[key];
            if (index === 0 || item.newLine) {
                row = mainDiv.createDiv({ cls: 'nav-buttons-container' });
            }
            var button = row.createDiv({
                cls: 'nav-action-text-button mfa-centered-button',
            });
            // Half of these are drawn as an svg, so des is the only name they have.
            _this.asButton(button, commandName(item.des), function () { return activate(key); });
            if (item.type === 'icon') {
                var svg = svgToElement(item.text);
                svg.addClass('mfa-inline-svg');
                button.appendChild(svg);
            }
            else if (item.type === 'text') {
                appendLabel(button.createDiv(), item.text);
            }
        });
    };
    SidePanelControlView.prototype.addGreekLowerCaseLetters = function (mainDiv) {
        var _this = this;
        var activate = function (type) {
            // @ts-ignore
            var formatterSetting = greekLowerCaseFormatterSettings[type];
            var editor = getTargetEditor(_this.app.workspace);
            if (editor)
                greekFormatter(editor, formatterSetting);
        };
        var numberOfCols = 5;
        var row = null;
        keys(greekLowerCaseFormatterSettings).forEach(function (key, index) {
            // @ts-ignore
            var item = greekLowerCaseFormatterSettings[key];
            if (index % numberOfCols === 0) {
                row = mainDiv.createDiv({ cls: 'nav-buttons-container' });
            }
            var button = row.createDiv({ cls: 'nav-action-button' });
            // A letter drawn as an svg has no text at all, so 'Alpha' is the only
            // thing there is to announce or to show on hover.
            _this.asButton(button, commandName(item.des), function () { return activate(key); });
            button.appendChild(svgToElement(item.icon));
        });
    };
    SidePanelControlView.prototype.addGreekUpperCaseLetters = function (mainDiv) {
        var _this = this;
        var activate = function (type) {
            // @ts-ignore
            var formatterSetting = greekUpperCaseFormatterSettings[type];
            var editor = getTargetEditor(_this.app.workspace);
            if (editor)
                greekFormatter(editor, formatterSetting);
        };
        var numberOfCols = 5;
        var row = null;
        keys(greekUpperCaseFormatterSettings).forEach(function (key, index) {
            // @ts-ignore
            var item = greekUpperCaseFormatterSettings[key];
            if (index % numberOfCols === 0) {
                row = mainDiv.createDiv({ cls: 'nav-buttons-container' });
            }
            var button = row.createDiv({ cls: 'nav-action-button' });
            // A letter drawn as an svg has no text at all, so 'Alpha' is the only
            // thing there is to announce or to show on hover.
            _this.asButton(button, commandName(item.des), function () { return activate(key); });
            button.appendChild(svgToElement(item.icon));
        });
    };
    SidePanelControlView.prototype.addTextEditButtons = function (mainDiv) {
        var _this = this;
        var activate = function (type) {
            // @ts-ignore
            var formatterSetting = formatSettings[type];
            var editor = getTargetEditor(_this.app.workspace);
            if (editor)
                iconFormatter(editor, formatterSetting);
        };
        var rows = [
            [
                ['h1', 'h1'],
                ['h2', 'h2'],
                ['h3', 'h3'],
                ['h4', 'h4'],
                ['h5', 'h5'],
                ['h6', 'h6'],
            ],
            [
                ['bold', 'bold'],
                ['italic', 'italic'],
                ['strikethrough', 'strikethrough'],
                ['underline', 'underline'],
                ['highlight', 'highlight'],
            ],
            [
                ['codeInline', 'codeInline'],
                ['codeBlock', 'codeBlock'],
                ['mermaidBlock', 'mermaidBlock'],
                ['link', 'link'],
                ['internalLink', 'fileLink'],
                ['blockquote', 'quote'],
                ['image', 'image'],
            ],
            [
                ['bulletList', 'bulletList'],
                ['numberList', 'numberList'],
                ['checkList', 'checkList'],
            ],
        ];
        rows.forEach(function (actions) {
            var row = mainDiv.createDiv({ cls: 'nav-buttons-container' });
            actions.forEach(function (_a) {
                var id = _a[0], icon = _a[1];
                var button = row.createDiv({ cls: 'nav-action-button' });
                // These buttons hold a drawing and nothing else, so the label is the
                // only thing a screen reader has to go on.
                _this.asButton(button, commandName(formatSettings[id].des), function () {
                    return activate(id);
                });
                button.appendChild(svgToElement(icon));
            });
        });
    };
    SidePanelControlView.prototype.addColorBody = function (mainDiv) {
        var _this = this;
        var insertColor = function (color) {
            var editor = getTargetEditor(_this.app.workspace);
            if (!editor)
                return;
            var isChecked = function (id) {
                var box = document.getElementById(id);
                return box ? box.checked : false;
            };
            var options = {
                color: isChecked('mfa-option-color'),
                background: isChecked('mfa-option-background'),
                styleAttribute: isChecked('mfa-option-style'),
                html: isChecked('mfa-option-html'),
            };
            var selection = editor.getSelection();
            // Selected text is coloured, not overwritten. Clicking a colour with a
            // word selected used to replace that word with '#ff0000' - three reports
            // on the tracker are people working around exactly this, two of them
            // with patches of their own.
            colorFormatter(editor, selection
                ? wrapWithColor(color, selection, options)
                : colorCode(color, options));
            editor.focus();
        };
        var drawLastSelectedColorIcons = function (container) {
            if (container === void 0) { container = null; }
            if (!container)
                container = document.getElementById('mfa-recent-colors');
            container.textContent = '';
            reverse(SidePanelControlView.lastColors).forEach(function (color) {
                var colorBox = container.createDiv({ cls: 'mfa-color-icon' });
                colorBox.style.setProperty('--mfa-swatch', color);
                _this.asButton(colorBox, color, function () { return insertColor(color); });
                // onClickEvent binds 'click' and nothing else, so the removal branch
                // this used to share with it could never run: right-clicking a colour
                // simply inserted it. The README promised otherwise.
                colorBox.oncontextmenu = function (event) {
                    event.preventDefault();
                    SidePanelControlView.lastColors = without([color], SidePanelControlView.lastColors);
                    drawLastSelectedColorIcons();
                };
            });
        };
        var drawLastSavedColorIcons = function (container) {
            if (container === void 0) { container = null; }
            if (!container)
                container = document.getElementById('mfa-saved-colors');
            container.textContent = '';
            reverse(_this.plugin.settings.savedColors).forEach(function (color) {
                var colorBox = container.createDiv({ cls: 'mfa-color-icon' });
                colorBox.id = 'mfa-saved-colors' + color;
                colorBox.style.setProperty('--mfa-swatch', color);
                colorBox.draggable = true;
                _this.asButton(colorBox, color, function () { return insertColor(color); });
                // Same dead branch as the last-used swatches above: 'click' was the
                // only event ever bound, so a saved colour could not be removed here.
                colorBox.oncontextmenu = function (event) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                event.preventDefault();
                                this.plugin.settings.savedColors = without([color], this.plugin.settings.savedColors);
                                return [4 /*yield*/, this.plugin.saveSettings()];
                            case 1:
                                _a.sent();
                                drawLastSavedColorIcons();
                                return [2 /*return*/];
                        }
                    });
                }); };
                colorBox.ondragstart = function (event) {
                    // @ts-ignore
                    _this.dragStartColor = event.target.id.replace('mfa-saved-colors', '');
                };
                colorBox.ondrop = function (event) { return __awaiter(_this, void 0, void 0, function () {
                    var target, savedColors, startColor, endColor, startIndex, endIndex;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                target = event.target;
                                if (!target || !target.id)
                                    return [2 /*return*/];
                                savedColors = this.plugin.settings.savedColors;
                                startColor = this.dragStartColor;
                                endColor = target.id.replace('mfa-saved-colors', '');
                                startIndex = indexOf(startColor, savedColors);
                                endIndex = indexOf(endColor, savedColors);
                                // The container carries the id 'mfa-saved-colors' itself, so a drop
                                // into the empty space next to the swatches used to resolve to an
                                // empty colour and index -1 - which then wrote junk into the list.
                                if (startIndex < 0 || endIndex < 0 || startIndex === endIndex)
                                    return [2 /*return*/];
                                this.plugin.settings.savedColors = moveItem(savedColors, startIndex, endIndex);
                                return [4 /*yield*/, this.plugin.saveSettings()];
                            case 1:
                                _a.sent();
                                drawLastSavedColorIcons();
                                return [2 /*return*/];
                        }
                    });
                }); };
                colorBox.ondragover = function (event) {
                    event.preventDefault();
                };
            });
        };
        var colorSection = mainDiv.createDiv();
        var colorSelector = colorSection.createDiv({ cls: 'mfa-color-preview' });
        colorSelector.style.setProperty('--mfa-swatch', last(SidePanelControlView.lastColors));
        var colorInput = colorSelector.createEl('input', {
            cls: 'mfa-color-input',
        });
        colorInput.id = 'mfa-color-input';
        colorInput.type = 'color';
        colorInput.value = last(SidePanelControlView.lastColors);
        colorInput.addEventListener('input', function (ev) {
            // @ts-ignore
            var color = ev.target.value;
            colorSelector.style.setProperty('--mfa-swatch', color);
        });
        colorInput.addEventListener('change', function (ev) {
            // @ts-ignore
            var color = ev.target.value;
            // @ts-ignore
            SidePanelControlView.lastColors = pipe(without([color]), append(color), takeLast(10))(SidePanelControlView.lastColors);
            drawLastSelectedColorIcons();
            insertColor(color);
            colorSelector.style.setProperty('--mfa-swatch', color);
            // Mobile webviews are not a secure context, so navigator.clipboard is
            // undefined there - reading .writeText would throw synchronously,
            // which a rejection handler does not catch.
            if (navigator.clipboard) {
                navigator.clipboard.writeText(color).then(function () { return new obsidian.Notice(t('colors.copied', { color: color })); }, function () { return new obsidian.Notice(t('colors.copyFailed')); });
            }
        }, false);
        var colorButton = colorSection.createEl('label', {
            cls: 'nav-action-text-button mfa-block-button',
        });
        colorButton.appendText(t('colors.select'));
        colorButton.htmlFor = 'mfa-color-input';
        var colorSaveButton = colorSection.createEl('div', {
            cls: 'nav-action-text-button mfa-block-button mfa-color-save',
        });
        colorSaveButton.appendText(t('colors.save'));
        this.asButton(colorSaveButton, t('colors.save'), function () {
            var color = last(SidePanelControlView.lastColors);
            _this.plugin.settings.savedColors = pipe(without([color]), append(color))(_this.plugin.settings.savedColors);
            drawLastSavedColorIcons();
            void _this.plugin.saveSettings();
        });
        var addCheckbox = function (id, text) {
            var div = colorSection.createEl('div');
            var input = div.createEl('input');
            input.id = id;
            input.type = 'checkbox';
            input.name = id;
            // Tied to the input, which is what lets the words be clicked as well as
            // the box - and what a screen reader reads out instead of "checkbox".
            var label = div.createEl('label', { cls: 'mfa-checkbox-label' });
            label.htmlFor = id;
            label.appendText(text);
        };
        addCheckbox('mfa-option-color', t('colors.optionColor'));
        addCheckbox('mfa-option-background', t('colors.optionBackgroundColor'));
        addCheckbox('mfa-option-style', t('colors.optionStyleTag'));
        addCheckbox('mfa-option-html', t('colors.optionHtmlTag'));
        colorSection
            .createEl('p', { cls: 'mfa-swatches-title' })
            .appendText(t('colors.lastUsed'));
        var lastSelectedColors = colorSection.createEl('div', {
            cls: 'mfa-color-swatches',
        });
        lastSelectedColors.id = 'mfa-recent-colors';
        drawLastSelectedColorIcons(lastSelectedColors);
        colorSection
            .createEl('p', { cls: 'mfa-swatches-title' })
            .appendText(t('colors.saved'));
        colorSection
            .createEl('p', { cls: 'mfa-swatches-hint' })
            .appendText(t('colors.editInSettings'));
        var lastSavedColors = colorSection.createEl('div', {
            cls: 'mfa-color-swatches',
        });
        lastSavedColors.id = 'mfa-saved-colors';
        drawLastSavedColorIcons(lastSavedColors);
        this.addNote(colorSection, t('colors.help'), "".concat(REPOSITORY_URL, "#color-picker"));
    };
    SidePanelControlView.prototype.addSelectableHeader = function (mainDiv, regionName) {
        var _this = this;
        var sectionTitle = sectionLabel(regionName);
        var getRegion = function (name) {
            return _this.plugin.settings.regionSettings.find(function (item) { return item.name === name; });
        };
        var header = mainDiv.createEl('div', { cls: 'mfa-section-header' });
        header.id = 'mfa-region-' + regionName;
        mainDiv.createEl('hr', { cls: 'mfa-section-rule' });
        var title = header.createEl('h4', { cls: 'mfa-section-title' });
        var arrowButton = header.createDiv({
            cls: 'nav-action-button mfa-section-arrow',
        });
        var content = mainDiv.createEl('div', { cls: 'mfa-section-content' });
        header.draggable = true;
        header.ondragstart = function (event) {
            // @ts-ignore
            var sectionId = event.target.id.replace('mfa-region-', '');
            event.dataTransfer.setData('sectionHeaderMoveId', sectionId);
        };
        var onDrop = function (event) { return __awaiter(_this, void 0, void 0, function () {
            var getDroppedRegionName, regions, start, end, startIndex, endIndex;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        getDroppedRegionName = function (path) {
                            var header = path.find(function (target) {
                                return target instanceof HTMLElement &&
                                    target.id.startsWith('mfa-region-');
                            });
                            return header
                                ? header.id.replace('mfa-region-', '')
                                : undefined;
                        };
                        event.preventDefault();
                        regions = this.plugin.settings.regionSettings;
                        start = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData('sectionHeaderMoveId');
                        end = getDroppedRegionName(event.composedPath());
                        if (!start || !end || start === end)
                            return [2 /*return*/];
                        startIndex = regions.findIndex(function (region) { return region.name === start; });
                        endIndex = regions.findIndex(function (region) { return region.name === end; });
                        // Headers accept any drag - a note dropped from the file explorer lands
                        // here too, with an empty payload. Both indices must resolve, or the move
                        // below would write undefined into the array and persist it.
                        if (startIndex < 0 || endIndex < 0)
                            return [2 /*return*/];
                        this.plugin.settings.regionSettings = moveItem(regions, startIndex, endIndex);
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _b.sent();
                        this.drawContentOfRootElement();
                        return [2 /*return*/];
                }
            });
        }); };
        header.ondragover = function (event) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                event.preventDefault();
                return [2 /*return*/];
            });
        }); };
        header.ondrop = onDrop;
        title.appendText(sectionTitle);
        var region = getRegion(regionName);
        /**
         * The arrow points the way the click will move the section: down to open
         * it, up to close it again. It used to be drawn as "down" unconditionally,
         * so a section that started open contradicted itself until it was clicked
         * twice.
         */
        var drawArrow = function (expanded) {
            arrowButton.empty();
            arrowButton.appendChild(svgToElement(expanded ? 'expandArrowUp' : 'expandArrowDown'));
        };
        var expanded = Boolean(region && region.active && region.visible);
        content.toggleClass('is-collapsed', !expanded);
        drawArrow(expanded);
        // Announced as expanded or collapsed, and updated on every toggle - the
        // arrow itself is a drawing and says nothing.
        arrowButton.setAttribute('aria-expanded', String(expanded));
        this.asButton(arrowButton, sectionTitle, function () {
            var region = getRegion(regionName);
            if (!region || !region.active)
                return;
            region.visible = !region.visible;
            content.toggleClass('is-collapsed', !region.visible);
            drawArrow(region.visible);
            arrowButton.setAttribute('aria-expanded', String(region.visible));
            void _this.plugin.saveSettings();
        });
        return content;
    };
    SidePanelControlView.lastColors = ['#ff0000'];
    return SidePanelControlView;
}(obsidian.ItemView));

var builtInSuggestions = values(formatSettings).concat(
// @ts-ignore
values(htmlFormatterSettings), values(latexFormatterSettings), values(greekLowerCaseFormatterSettings), values(greekUpperCaseFormatterSettings));
var CodeSuggestionModal = /** @class */ (function (_super) {
    __extends(CodeSuggestionModal, _super);
    function CodeSuggestionModal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.setEditor = function (editor) {
            _this.editor = editor;
        };
        return _this;
    }
    // Returns all available suggestions.
    CodeSuggestionModal.prototype.getSuggestions = function (query) {
        // The tables are heterogeneous - only some entries carry an icon, a text or
        // a type - so they do not structurally satisfy baseFormatterSetting. Every
        // reader below branches on objectType before touching those fields, which
        // is what makes this safe in practice.
        var suggestions = builtInSuggestions;
        // Matching the id as well as the label keeps every command reachable by
        // its English name once the labels get translated.
        var needle = query.toLowerCase();
        return suggestions.filter(function (setting) {
            return setting.des.toLowerCase().includes(needle) ||
                setting.id.toLowerCase().includes(needle);
        });
    };
    // Renders each suggestion item.
    CodeSuggestionModal.prototype.renderSuggestion = function (baseFormatterSetting, el) {
        var row = el.createEl('div');
        row.classList.add('mfa-suggestion-row');
        var iconContainer = row.createDiv();
        iconContainer.classList.add('mfa-suggestion-icon-container');
        var iconDiv = iconContainer.createDiv();
        iconDiv.classList.add('mfa-suggestion-icon');
        var cell2 = row.createDiv();
        cell2.classList.add('mfa-suggestion-text');
        cell2.setText(baseFormatterSetting.des);
        // The label is tinted by which table the entry came from, so the four
        // groups stay apart at a glance. The tints are theme variables now: the
        // fixed hexes they replace were picked against a dark background, and the
        // green in particular was close to unreadable on a light one.
        if (baseFormatterSetting.objectType === 'formatterSetting') {
            iconDiv.appendChild(svgToElement(baseFormatterSetting.icon));
            cell2.addClass('mfa-suggestion-text--markdown');
        }
        else if (baseFormatterSetting.objectType === 'htmlFormatterSetting') {
            iconDiv.appendText('HTML');
            cell2.addClass('mfa-suggestion-text--html');
        }
        else if (baseFormatterSetting.objectType === 'greekFormatterSetting') {
            iconDiv.appendChild(svgToElement(baseFormatterSetting.icon));
            cell2.addClass('mfa-suggestion-text--greek');
        }
        else if (baseFormatterSetting.objectType === 'latexFormatterSetting') {
            var item = baseFormatterSetting;
            if (item.type === 'icon') {
                var svg = svgToElement(item.text);
                svg.addClass('mfa-inline-svg');
                iconDiv.appendChild(svg);
            }
            else if (item.type === 'text') {
                appendLabel(iconDiv.createDiv(), item.text);
            }
            cell2.addClass('mfa-suggestion-text--latex');
        }
        else {
            iconDiv.appendText('HTML');
        }
    };
    // Perform action on the selected suggestion.
    CodeSuggestionModal.prototype.onChooseSuggestion = function (baseFormatterSetting, evt) {
        var item = baseFormatterSetting;
        if (item.objectType === 'formatterSetting') {
            // @ts-ignore
            iconFormatter(this.editor, item);
        }
        else if (item.objectType === 'htmlFormatterSetting') {
            // @ts-ignore
            htmlFormatter(this.editor, item);
        }
        else if (item.objectType === 'latexFormatterSetting') {
            // @ts-ignore
            latexFormatter(this.editor, item);
        }
        else if (item.objectType === 'greekFormatterSetting') {
            // @ts-ignore
            greekFormatter(this.editor, item);
        }
        // new Notice(`Selected ${baseFormatterSetting.des}`);
    };
    CodeSuggestionModal.display = function (app, editor) {
        var modal = new CodeSuggestionModal(app);
        modal.setEditor(editor);
        modal.open();
    };
    return CodeSuggestionModal;
}(obsidian.SuggestModal));

var suggestions = values(calloutsFormatterSettings);
var CalloutsSuggestionModal = /** @class */ (function (_super) {
    __extends(CalloutsSuggestionModal, _super);
    function CalloutsSuggestionModal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** Whether to write the translated heading into the note. */
        _this.useTitles = true;
        _this.setEditor = function (editor) {
            _this.editor = editor;
        };
        return _this;
    }
    // Returns all available suggestions.
    CalloutsSuggestionModal.prototype.getSuggestions = function (query) {
        // Matching the translated label as well as the id keeps callouts findable
        // both by their Russian name and by the English keyword.
        var filterFunction = function (setting) {
            var needle = query.toLowerCase();
            return (calloutLabel(setting.id).toLowerCase().includes(needle) ||
                setting.id.toLowerCase().includes(needle));
        };
        // @ts-ignore
        return values(filter(filterFunction, suggestions));
    };
    // Renders each suggestion item.
    CalloutsSuggestionModal.prototype.renderSuggestion = function (calloutsFormatterSetting, el) {
        var row = el.createEl('div');
        row.classList.add('mfa-suggestion-row');
        var iconContainer = row.createDiv();
        iconContainer.classList.add('mfa-suggestion-icon-container');
        var iconDiv = iconContainer.createDiv();
        iconDiv.classList.add('mfa-suggestion-icon');
        var cell2 = row.createDiv();
        cell2.classList.add('mfa-suggestion-text', 'mfa-suggestion-text--muted');
        cell2.setText(calloutLabel(calloutsFormatterSetting.id));
        var spanIcon = iconDiv.createSpan({ cls: 'mfa-callout-icon' });
        obsidian.setIcon(spanIcon, calloutsFormatterSetting.icon);
        // The colours belong to the callout type, so they arrive as data rather
        // than as anything the stylesheet could know in advance. Custom properties
        // are how a stylesheet takes delivery of that.
        row.addClass('mfa-callout-row');
        row.style.setProperty('--mfa-callout-color', calloutsFormatterSetting.color);
        row.style.setProperty('--mfa-callout-background', calloutsFormatterSetting.bgColor);
    };
    // Perform action on the selected suggestion.
    CalloutsSuggestionModal.prototype.onChooseSuggestion = function (calloutsFormatterSetting, evt) {
        var item = calloutsFormatterSetting;
        calloutsFormatter(this.editor, item, this.useTitles ? calloutLabel(item.id) : '');
        // new Notice(`Selected ${calloutsFormatterSetting.des}`);
    };
    CalloutsSuggestionModal.display = function (app, editor, useTitles) {
        if (useTitles === void 0) { useTitles = true; }
        var modal = new CalloutsSuggestionModal(app);
        modal.setEditor(editor);
        modal.useTitles = useTitles;
        modal.open();
    };
    return CalloutsSuggestionModal;
}(obsidian.SuggestModal));

/**
 * Picks a command to put on the toolbar.
 *
 * Fuzzy search over everything the vault has registered, which is the point of
 * building the toolbar out of command ids: Obsidian's own commands and other
 * plugins' are as eligible as this plugin's, so the row can be assembled around
 * how someone actually writes rather than around what this plugin happens to
 * provide.
 */
var CommandPickerModal = /** @class */ (function (_super) {
    __extends(CommandPickerModal, _super);
    function CommandPickerModal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.choices = [];
        _this.onPick = function () { };
        return _this;
    }
    CommandPickerModal.prototype.getItems = function () {
        return this.choices;
    };
    CommandPickerModal.prototype.getItemText = function (command) {
        return command.name;
    };
    /**
     * With nothing typed, keep the order the list arrived in - this plugin's
     * commands first.
     *
     * The fuzzy matcher scores an empty query the same for everything, so the
     * order it returns rests on the sort being stable, which is not a promise
     * worth relying on for the one view every user sees before typing.
     */
    CommandPickerModal.prototype.getSuggestions = function (query) {
        if (query.trim())
            return _super.prototype.getSuggestions.call(this, query);
        // Nothing was searched for, so there is nothing to highlight.
        var matches = [];
        return this.choices.map(function (item) { return ({ item: item, match: { score: 0, matches: matches } }); });
    };
    CommandPickerModal.prototype.onChooseItem = function (command) {
        this.onPick(command.id);
    };
    CommandPickerModal.open = function (app, available, taken, placeholder, onPick) {
        var modal = new CommandPickerModal(app);
        // Already on the toolbar means nothing to add: a second button would run
        // the same command, and removing one would appear to remove both.
        modal.choices = available.filter(function (command) { return !taken.includes(command.id); });
        modal.onPick = onPick;
        modal.setPlaceholder(placeholder);
        // Well above the default, which is a screenful. This plugin's own commands
        // are at the head of the list and there are fifty of them, so the default
        // would show those and nothing else to browse past.
        modal.limit = 150;
        modal.open();
    };
    return CommandPickerModal;
}(obsidian.FuzzySuggestModal));

/**
 * One Obsidian command per formatting action, so people can bind their own
 * hotkeys. Obsidian owns that interface entirely - this only supplies the list,
 * which is why there is no key binding anywhere in the plugin's own settings.
 *
 * Only Text Edit and the callouts are registered. The HTML, LaTeX and Greek
 * tables hold another 93 entries between them: nobody binds a key to \alpha,
 * and adding them would bury the user's own commands in the palette. They stay
 * reachable through the ALT+Q window, which is what it is for.
 */
function registerFormattingCommands(plugin, writeCalloutTitle) {
    // The table is heterogeneous for the suggestion window's benefit, so it does
    // not structurally satisfy the interface. Every entry in this one does carry
    // the fields iconFormatter reads.
    var textEdit = values(formatSettings);
    textEdit.forEach(function (item) {
        plugin.addCommand({
            // The table key rather than the label, so a binding survives a rename.
            id: item.id,
            name: commandName(item.des),
            // The panel's own icons, registered with addIcon at load. Obsidian shows
            // these on mobile and in the ribbon, and the editor toolbar reads them
            // straight off the command rather than keeping a second table.
            icon: item.icon,
            // editorCallback rather than callback: these all write to a note, and
            // Obsidian then hides them when no editor has focus.
            editorCallback: function (editor) { return iconFormatter(editor, item); },
        });
    });
    var callouts = values(calloutsFormatterSettings);
    callouts.forEach(function (item) {
        plugin.addCommand({
            // Namespaced. The two tables happen not to share a key today, but they
            // are edited independently and both are plain English words - 'quote'
            // and 'image' would each be at home in either. Obsidian keeps one
            // command per id and drops the rest silently, so the day they do collide
            // nothing would say so.
            id: "callout-".concat(item.id),
            name: "".concat(t('section.callouts'), ": ").concat(calloutLabel(item.id)),
            icon: item.icon,
            editorCallback: function (editor) {
                // Read when the command runs rather than when it is registered, so the
                // setting takes effect without a restart.
                return calloutsFormatter(editor, item, writeCalloutTitle() ? calloutLabel(item.id) : '');
            },
        });
    });
}

/**
 * What the toolbar stores and how that list is kept sane. A leaf module with
 * no imports, so the tests can reach it - see the note in textPlacement.ts.
 *
 * The toolbar is a list of Obsidian command ids and nothing else. That is the
 * whole design: anything registered as a command can sit on it, including
 * Obsidian's own and other plugins', not merely this one's buttons.
 */
/**
 * Must match the `id` in manifest.json - Obsidian namespaces every command by
 * it, so the default buttons below would resolve to nothing if the two drifted.
 * There is a test on exactly that.
 */
var PLUGIN_ID = 'obsidian-markdown-formatting-assistant-plugin';
/**
 * A ceiling rather than a design limit. The toolbar wraps, so a long list
 * costs the user their writing space rather than breaking anything - but a
 * settings file that somehow grew unbounded should not take the editor with it.
 */
var MAX_TOOLBAR_COMMANDS = 40;
/** Everyday formatting, in the order a toolbar usually reads. */
var DEFAULT_TOOLBAR_COMMANDS = [
    'h1',
    'h2',
    'h3',
    'bold',
    'italic',
    'strikethrough',
    'highlight',
    'codeInline',
    'blockquote',
    'bulletList',
    'numberList',
    'checkList',
    'link',
].map(function (id) { return "".concat(PLUGIN_ID, ":").concat(id); });
var TOOLBAR_ALIGNMENTS = [
    'left',
    'center',
    'right',
];
var DEFAULT_TOOLBAR = {
    enabled: false,
    commands: DEFAULT_TOOLBAR_COMMANDS,
    // Left, because that is where the text starts.
    alignment: 'left',
};
/** Anything unrecognised falls back to the default rather than to no layout. */
function normaliseToolbarAlignment(value) {
    return TOOLBAR_ALIGNMENTS.includes(value)
        ? value
        : DEFAULT_TOOLBAR.alignment;
}
/**
 * Every registered command, in the order a person would look for one.
 *
 * Takes the whole register on purpose. Obsidian also offers `listCommands()`,
 * which answers a different question - what can run *right now* - and with the
 * settings dialog focused there is no editor, so every command that writes to a
 * note is missing from it. That is all but one of this plugin's and most of
 * Obsidian's, which is exactly what the picker is for.
 *
 * This plugin's own commands come first, and that ordering matters rather than
 * being a courtesy: a suggester renders only its first screenful until a query
 * narrows it. Obsidian prefixes every command name with the plugin it belongs
 * to, so sorting the whole register by name buries this one's under M, behind
 * several hundred of Obsidian's - present, findable by typing, and invisible to
 * anyone who scrolls.
 */
function sortedCommands(commands) {
    var all = Object.values(commands || {});
    var byName = function (a, b) { return (a.name || '').localeCompare(b.name || ''); };
    var isOwn = function (command) { return (command.id || '').startsWith("".concat(PLUGIN_ID, ":")); };
    return __spreadArray(__spreadArray([], all.filter(isOwn).sort(byName), true), all.filter(function (command) { return !isOwn(command); }).sort(byName), true);
}
/**
 * Rebuilds the stored list into something safe to render.
 *
 * Anything at all can be in a settings file - it is hand-editable, it is
 * synced between machines, and it is written by older versions of this plugin.
 * A duplicate id is the interesting case: two buttons would run the same
 * command, and removing one of them would look like it removed both.
 */
function normaliseToolbarCommands(value) {
    if (!Array.isArray(value))
        return __spreadArray([], DEFAULT_TOOLBAR_COMMANDS, true);
    var seen = new Set();
    var commands = [];
    for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
        var entry = value_1[_i];
        if (typeof entry !== 'string')
            continue;
        var id = entry.trim();
        if (!id || seen.has(id))
            continue;
        seen.add(id);
        commands.push(id);
        if (commands.length === MAX_TOOLBAR_COMMANDS)
            break;
    }
    return commands;
}

var TOOLBAR_CLASS = 'mfa-toolbar';
function getCommandRegistry(plugin) {
    // @ts-ignore - see the note above.
    return plugin.app.commands;
}
/** Everything registered, sorted - see sortedCommands for why not listCommands. */
function allCommands(registry) {
    return sortedCommands(registry.commands);
}
/**
 * A row of buttons above the note.
 *
 * Obsidian publishes no place to put one, so the element is inserted into the
 * markdown view's own content container. That is a dependency on the app's
 * layout rather than on its API, which is the price of the feature: it is the
 * first thing to check if a future Obsidian release moves the toolbar or
 * loses it.
 *
 * Everything is torn down again in `detachAll`, called from the plugin's
 * onunload, because an element left behind would outlive the plugin.
 */
var EditorToolbar = /** @class */ (function () {
    function EditorToolbar(plugin, settings) {
        this.plugin = plugin;
        this.settings = settings;
        /**
         * Every bar this instance built.
         *
         * Kept rather than searched for at teardown time. A note moved to its own
         * window gets a bar too - getLeavesOfType covers floating leaves - and that
         * window has its own `document`, which a query from here would never reach.
         * Holding the elements sidesteps the question of which realm each is in.
         */
        this.bars = new Set();
    }
    /** Starts watching for panes to decorate. */
    EditorToolbar.prototype.start = function () {
        var _this = this;
        var workspace = this.plugin.app.workspace;
        // Both are needed: opening a tab is a layout change, moving between
        // existing tabs is not.
        this.plugin.registerEvent(workspace.on('layout-change', function () { return _this.refresh(); }));
        this.plugin.registerEvent(workspace.on('active-leaf-change', function () { return _this.refresh(); }));
        workspace.onLayoutReady(function () { return _this.refresh(); });
    };
    /** Brings every open markdown pane in line with the current settings. */
    EditorToolbar.prototype.refresh = function () {
        var _this = this;
        var _a = this.settings(), enabled = _a.enabled, commands = _a.commands, alignment = _a.alignment;
        this.plugin.app.workspace.getLeavesOfType('markdown').forEach(function (leaf) {
            var view = leaf.view;
            if (!(view instanceof obsidian.MarkdownView))
                return;
            // Reading mode has no editor to write to, and every button here writes.
            var wanted = enabled && commands.length > 0 && view.getMode() === 'source';
            _this.apply(leaf, view, wanted ? commands : [], alignment);
        });
    };
    /** Removes every toolbar this plugin put on the page. */
    EditorToolbar.prototype.detachAll = function () {
        this.bars.forEach(function (bar) { return bar.remove(); });
        this.bars.clear();
    };
    EditorToolbar.prototype.discard = function (bar) {
        if (!bar)
            return;
        this.bars.delete(bar);
        bar.remove();
    };
    EditorToolbar.prototype.apply = function (leaf, view, commands, alignment) {
        var registry = getCommandRegistry(this.plugin);
        var host = view.contentEl;
        var existing = host.querySelector(":scope > .".concat(TOOLBAR_CLASS));
        // What can actually be drawn. A command is missing while the plugin that
        // registered it is disabled, and that has to be part of the comparison
        // below: otherwise re-enabling that plugin leaves the button missing until
        // something else forces a rebuild.
        var drawable = commands.filter(function (id) { return registry.commands[id]; });
        if (drawable.length === 0) {
            this.discard(existing);
            return;
        }
        // Rebuilding on every pane switch would be wasteful and would drop the
        // focus ring mid-click, so what was rendered is stamped on the element and
        // compared first. The alignment is in the stamp too: it is a class on the
        // same element, and a change to it has to reach a pane already on screen.
        var signature = __spreadArray([alignment], drawable, true).join('\n');
        if (existing instanceof HTMLElement) {
            if (existing.dataset.signature === signature)
                return;
        }
        this.discard(existing);
        // Built through the host so it belongs to that pane's document - a popout
        // window has its own, and an element made here would be foreign to it.
        var bar = host.createDiv({
            cls: "".concat(TOOLBAR_CLASS, " is-align-").concat(alignment),
        });
        bar.dataset.signature = signature;
        this.fill(bar, leaf, view, drawable, registry);
        this.bars.add(bar);
        // createDiv appends; the bar belongs above the note, not below it.
        host.prepend(bar);
    };
    EditorToolbar.prototype.fill = function (bar, leaf, view, commands, registry) {
        var _this = this;
        commands.forEach(function (id) {
            var command = registry.commands[id];
            if (!command)
                return;
            var button = bar.createEl('button', {
                cls: 'mfa-toolbar-button clickable-icon',
            });
            button.setAttribute('aria-label', command.name);
            button.type = 'button';
            if (command.icon) {
                obsidian.setIcon(button, command.icon);
            }
            else {
                button.setText(shortLabel(command.name));
            }
            // Focus moves on mousedown, before any click handler runs, so this is
            // the only place it can be stopped. Left alone the caret lands on the
            // button: the note stops receiving what is typed, and the next Space or
            // Enter activates the button again and undoes the command.
            button.addEventListener('mousedown', function (event) { return event.preventDefault(); });
            button.addEventListener('click', function () {
                // Commands run against whatever Obsidian considers active, and with
                // the focus steal suppressed a click no longer makes that this pane.
                // With two notes side by side the button would otherwise write into
                // the other one.
                _this.plugin.app.workspace.setActiveLeaf(leaf, { focus: true });
                view.editor.focus();
                registry.executeCommandById(id);
            });
        });
    };
    return EditorToolbar;
}());

/** The drag payload for reordering toolbar buttons. */
var DRAG_PAYLOAD = 'toolbarButtonIndex';
/** Preselected in the saved-colours picker, so it never opens on black. */
var DEFAULT_PICKER_COLOR = '#448aff';
var DEFAULT_SETTINGS = {
    language: AUTO_LOCALE,
    sidePaneSideLeft: false,
    savedColors: ['#ff0000'],
    regionSettings: [
        { name: 'textEdit', active: true, visible: false },
        { name: 'tables', active: true, visible: false },
        { name: 'html', active: true, visible: false },
        { name: 'latex', active: true, visible: false },
        { name: 'greekLetters', active: true, visible: false },
        { name: 'colors', active: true, visible: false },
        { name: 'callouts', active: true, visible: false },
    ],
    tableAlignment: 'default',
    calloutTitles: true,
    toolbar: DEFAULT_TOOLBAR,
};
/** Order the section toggles appear in the settings tab. */
var SECTION_ORDER = DEFAULT_SETTINGS.regionSettings.map(function (region) { return region.name; });
var MarkdownAutocompletePlugin = /** @class */ (function (_super) {
    __extends(MarkdownAutocompletePlugin, _super);
    function MarkdownAutocompletePlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toggleSidePanelControlView = function () { return __awaiter(_this, void 0, void 0, function () {
            var workspace, leaf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        workspace = this.app.workspace;
                        // Detaching first is what lets the ribbon icon move the panel to the other
                        // side after the setting changes.
                        workspace.detachLeavesOfType(SidePanelControlViewType);
                        leaf = this.settings.sidePaneSideLeft
                            ? workspace.getLeftLeaf(false)
                            : workspace.getRightLeaf(false);
                        if (!leaf) {
                            new obsidian.Notice(t('panel.noLeaf'));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, leaf.setViewState({
                                type: SidePanelControlViewType,
                                active: true,
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, workspace.revealLeaf(leaf)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    MarkdownAutocompletePlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        _a.sent();
                        // Has to happen before anything renders a label.
                        setLocale(this.settings.language);
                        addIcons();
                        this.registerView(SidePanelControlViewType, function (leaf) { return new SidePanelControlView(leaf, _this); });
                        this.addRibbonIcon('viewIcon', t('command.openPanel'), function () {
                            _this.toggleSidePanelControlView();
                        });
                        this.addCommand({
                            id: 'open-command-selector',
                            name: t('command.openCommandSelector'),
                            hotkeys: [{ modifiers: ['Alt'], key: 'q' }],
                            editorCallback: function (editor, view) {
                                CodeSuggestionModal.display(_this.app, editor);
                            },
                        });
                        this.addCommand({
                            id: 'open-callouts-selector',
                            name: t('command.openCalloutsSelector'),
                            hotkeys: [{ modifiers: ['Alt'], key: 'c' }],
                            editorCallback: function (editor, view) {
                                CalloutsSuggestionModal.display(_this.app, editor, _this.settings.calloutTitles);
                            },
                        });
                        // The panel had only the ribbon icon, which is the one thing a keyboard
                        // cannot reach.
                        this.addCommand({
                            id: 'toggle-side-panel',
                            name: t('command.openPanel'),
                            callback: function () {
                                void _this.toggleSidePanelControlView();
                            },
                        });
                        registerFormattingCommands(this, function () { return _this.settings.calloutTitles; });
                        this.toolbar = new EditorToolbar(this, function () { return _this.settings.toolbar; });
                        this.toolbar.start();
                        this.addSettingTab(new SettingsTab(this.app, this));
                        return [2 /*return*/];
                }
            });
        });
    };
    MarkdownAutocompletePlugin.prototype.onunload = function () {
        var _a;
        // Views, commands, the ribbon icon and the settings tab are torn down by
        // Plugin itself. These two are the exception: addIcon is a module-level
        // function outside that lifecycle, and the toolbar lives in the markdown
        // view's own container rather than in anything the plugin owns.
        removeIcons();
        (_a = this.toolbar) === null || _a === void 0 ? void 0 : _a.detachAll();
    };
    MarkdownAutocompletePlugin.prototype.loadSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, storedRegions, known, stored;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        // Merge into a fresh object - assigning onto DEFAULT_SETTINGS would
                        // permanently overwrite the defaults for the rest of the session.
                        _a = this;
                        _c = (_b = Object).assign;
                        _d = [{}, DEFAULT_SETTINGS];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        // Merge into a fresh object - assigning onto DEFAULT_SETTINGS would
                        // permanently overwrite the defaults for the rest of the session.
                        _a.settings = _c.apply(_b, _d.concat([_e.sent()]));
                        storedRegions = Array.isArray(this.settings.regionSettings)
                            ? this.settings.regionSettings
                            : DEFAULT_SETTINGS.regionSettings;
                        this.settings.regionSettings = storedRegions
                            .filter(function (region) { return region && typeof region.name === 'string'; })
                            // A section removed since the file was written has no renderer any more,
                            // so keeping its entry would only leave a dead toggle behind.
                            .filter(function (region) { return SECTION_ORDER.includes(region.name); })
                            .map(function (region) { return ({
                            name: region.name,
                            active: region.active !== false,
                            visible: region.visible === true,
                        }); });
                        known = this.settings.regionSettings.map(function (region) { return region.name; });
                        DEFAULT_SETTINGS.regionSettings
                            .filter(function (region) { return !known.includes(region.name); })
                            .forEach(function (region) { return _this.settings.regionSettings.push(__assign({}, region)); });
                        this.settings.savedColors = (Array.isArray(this.settings.savedColors)
                            ? this.settings.savedColors
                            : DEFAULT_SETTINGS.savedColors).filter(function (color) { return typeof color === 'string'; });
                        stored = this.settings.toolbar;
                        this.settings.toolbar = {
                            enabled: Boolean(stored && stored.enabled),
                            commands: normaliseToolbarCommands(stored && stored.commands),
                            alignment: normaliseToolbarAlignment(stored && stored.alignment),
                        };
                        return [2 /*return*/];
                }
            });
        });
    };
    MarkdownAutocompletePlugin.prototype.saveSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveData(this.settings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return MarkdownAutocompletePlugin;
}(obsidian.Plugin));
var SettingsTab = /** @class */ (function (_super) {
    __extends(SettingsTab, _super);
    function SettingsTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        /**
         * Text fields fire on every keystroke and each save rewrites data.json in
         * full, so a 200-character template meant 200 rewrites - and on a synced
         * vault, 200 chances at a conflict. Coalescing them costs nothing: the
         * in-memory settings are already up to date when the panel reads them.
         */
        _this.saveSoon = obsidian.debounce(function () {
            void _this.plugin.saveSettings();
        }, 400, true);
        _this.plugin = plugin;
        return _this;
    }
    /**
     * Obsidian calls this when the tab goes away. Whatever the debounce is still
     * holding has to be written now: quitting within 400 ms of the last
     * keystroke used to lose the setting that was just typed.
     */
    SettingsTab.prototype.hide = function () {
        this.saveSoon.run();
    };
    // Must stay synchronous: other plugins (e.g. Settings Search) call display()
    // and read containerEl straight after, which sees nothing if this returns a
    // promise instead of a filled container.
    SettingsTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        // Scopes the stylesheet's overrides of Obsidian's own button classes to
        // this tab, so they cannot restyle the rest of the app.
        containerEl.addClass('mfa-scope');
        new obsidian.Setting(containerEl)
            .setName(t('settings.language.name'))
            .setDesc(t('settings.language.desc'))
            .addDropdown(function (dropdown) {
            dropdown.addOption(AUTO_LOCALE, t('settings.language.auto'));
            SUPPORTED_LOCALES.forEach(function (code) {
                return dropdown.addOption(code, LOCALE_NAMES[code]);
            });
            dropdown
                .setValue(_this.plugin.settings.language)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.language = value;
                            setLocale(this.plugin.settings.language);
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            // Redraw so the change is visible without reopening the tab.
                            this.display();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName(t('settings.sidePaneSide.name'))
            .setDesc(t('settings.sidePaneSide.desc'))
            .addText(function (text) {
            return text
                .setPlaceholder(t('settings.sidePaneSide.placeholder'))
                .setValue(_this.plugin.settings.sidePaneSideLeft ? 'left' : 'right')
                .onChange(function (value) {
                _this.plugin.settings.sidePaneSideLeft =
                    value === 'left' ? true : false;
                _this.saveSoon();
            });
        });
        new obsidian.Setting(containerEl)
            .setName(t('settings.calloutTitles.name'))
            .setDesc(t('settings.calloutTitles.desc'))
            .addToggle(function (comp) {
            comp
                .setValue(_this.plugin.settings.calloutTitles)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.calloutTitles = value;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        var getRegion = function (name) {
            return _this.plugin.settings.regionSettings.find(function (item) { return item.name === name; });
        };
        // One templated pair of strings instead of seven hand-written ones - which
        // is also how the old copy-paste mix-ups got fixed, where the Tables toggle
        // described the Greek Letters section.
        SECTION_ORDER.forEach(function (regionName) {
            var region = getRegion(regionName);
            // A settings file written by an older version may not list every region.
            if (!region)
                return;
            var section = sectionLabel(regionName);
            new obsidian.Setting(containerEl)
                .setName(t('settings.toggleSection.name', { section: section }))
                .setDesc(t('settings.toggleSection.desc', { section: section }))
                .addToggle(function (comp) {
                comp.setValue(region.active).onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                region.active = value;
                                return [4 /*yield*/, this.plugin.saveSettings()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        this.addSavedColorSettings(containerEl);
        this.addToolbarSettings(containerEl);
    };
    /**
     * The toolbar above the note: whether to show it, and which buttons.
     *
     * A button is a command id and nothing more, so this list can hold anything
     * the vault has registered - Obsidian's own commands and other plugins' as
     * readily as this one's.
     */
    SettingsTab.prototype.addToolbarSettings = function (containerEl) {
        var _this = this;
        var toolbar = this.plugin.settings.toolbar;
        new obsidian.Setting(containerEl)
            .setName(t('settings.toolbar.name'))
            .setDesc(t('settings.toolbar.desc'))
            .addToggle(function (toggle) {
            return toggle.setValue(toolbar.enabled).onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            toolbar.enabled = value;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            this.plugin.toolbar.refresh();
                            // Redraw so the button list appears or goes away with the toggle.
                            this.display();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        if (!toolbar.enabled)
            return;
        new obsidian.Setting(containerEl)
            .setName(t('settings.toolbar.align.name'))
            .setDesc(t('settings.toolbar.align.desc'))
            .addDropdown(function (dropdown) {
            TOOLBAR_ALIGNMENTS.forEach(function (option) {
                return dropdown.addOption(option, t("settings.toolbar.align.".concat(option)));
            });
            dropdown.setValue(toolbar.alignment).onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            toolbar.alignment = normaliseToolbarAlignment(value);
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            this.plugin.toolbar.refresh();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        var registry = getCommandRegistry(this.plugin);
        // Redraw before the write, never after. Awaiting first leaves the old rows
        // on screen and clickable for the whole of it, and each of them closes over
        // the position it was rendered at - so a second click removes whatever has
        // since moved into that slot. Double-clicking a button's x used to delete
        // its neighbour. The saved-colour swatches already work this way.
        var commit = function (commands) {
            toolbar.commands = commands;
            _this.display();
            _this.plugin.toolbar.refresh();
            void _this.plugin.saveSettings();
        };
        var list = containerEl.createDiv({ cls: 'mfa-toolbar-editor' });
        if (toolbar.commands.length === 0) {
            list
                .createDiv({ cls: 'mfa-toolbar-empty' })
                .setText(t('settings.toolbar.empty'));
        }
        toolbar.commands.forEach(function (id, index) {
            var command = registry.commands[id];
            var row = list.createDiv({ cls: 'mfa-toolbar-item' });
            row.draggable = true;
            var icon = row.createSpan({ cls: 'mfa-toolbar-item-icon' });
            if (command && command.icon) {
                obsidian.setIcon(icon, command.icon);
            }
            // A command vanishes when its plugin is disabled or uninstalled. The
            // entry is kept - it works again when the plugin returns - but saying so
            // beats showing a blank row.
            row
                .createSpan({ cls: 'mfa-toolbar-item-name' })
                .setText(command ? command.name : t('settings.toolbar.unavailable', { id: id }));
            if (!command)
                row.addClass('is-unavailable');
            var remove = row.createSpan({ cls: 'mfa-toolbar-item-remove' });
            obsidian.setIcon(remove, 'x');
            remove.setAttribute('aria-label', t('settings.toolbar.remove'));
            remove.onClickEvent(function () {
                commit(toolbar.commands.filter(function (_, at) { return at !== index; }));
            });
            // Named like the panel's own drag payload rather than with the mfa-
            // prefix, which throughout this project means a CSS class - and there is
            // a test that holds it to that.
            row.ondragstart = function (event) {
                var _a;
                (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData(DRAG_PAYLOAD, String(index));
            };
            row.ondragover = function (event) {
                event.preventDefault();
            };
            row.ondrop = function (event) {
                var _a;
                event.preventDefault();
                // Every row accepts any drag, so the payload has to be checked rather
                // than trusted. getData returns '' for a format that was never set,
                // and Number('') is 0 - a perfectly valid index, which used to send
                // the first button wherever a stray text selection was dropped.
                var payload = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData(DRAG_PAYLOAD);
                if (!payload)
                    return;
                commit(moveItem(toolbar.commands, Number(payload), index));
            };
        });
        new obsidian.Setting(containerEl)
            .setName(t('settings.toolbar.add'))
            .setDesc(t('settings.toolbar.addDesc', { max: String(MAX_TOOLBAR_COMMANDS) }))
            .addButton(function (button) {
            return button
                .setButtonText(t('settings.toolbar.add'))
                .setCta()
                .setDisabled(toolbar.commands.length >= MAX_TOOLBAR_COMMANDS)
                .onClick(function () {
                CommandPickerModal.open(_this.app, allCommands(registry), toolbar.commands, t('settings.toolbar.pick'), function (id) { return void commit(__spreadArray(__spreadArray([], toolbar.commands, true), [id], false)); });
            });
        });
    };
    /**
     * Saved colours as swatches rather than a text field.
     *
     * The old version was a textarea pinned to 400px whatever it held, and it
     * asked people to type hex codes by hand - so it also needed a validator and
     * a warning for malformed lines. Showing the actual colours removes all of
     * that: a swatch cannot be misspelled.
     */
    SettingsTab.prototype.addSavedColorSettings = function (containerEl) {
        var _this = this;
        var colors = this.plugin.settings.savedColors;
        var setting = new obsidian.Setting(containerEl)
            .setName(t('settings.savedColors.name'))
            .setDesc(t('settings.savedColors.desc'));
        // Built into the control area ahead of the picker rather than left loose
        // under the description, where they read as leftover decoration instead of
        // as a control.
        var swatches = setting.controlEl.createDiv({ cls: 'mfa-color-swatches' });
        if (colors.length === 0) {
            swatches.createSpan({ cls: 'mfa-color-empty' }).setText(t('settings.savedColors.empty'));
        }
        colors.forEach(function (color, index) {
            var swatch = swatches.createDiv({
                cls: 'mfa-color-icon mfa-removable',
            });
            swatch.style.setProperty('--mfa-swatch', color);
            swatch.setAttribute('aria-label', color);
            swatch.title = "".concat(color, " - ").concat(t('settings.savedColors.removeHint'));
            // Redraw before awaiting the write: the old DOM stays live during the
            // await, and a second click would still carry its stale index.
            swatch.onClickEvent(function () {
                colors.splice(index, 1);
                _this.display();
                void _this.plugin.saveSettings();
            });
        });
        setting.addColorPicker(function (picker) {
            return picker.setValue(DEFAULT_PICKER_COLOR).onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (colors.includes(value))
                                return [2 /*return*/];
                            colors.push(value);
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            this.display();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    return SettingsTab;
}(obsidian.PluginSettingTab));

module.exports = MarkdownAutocompletePlugin;
