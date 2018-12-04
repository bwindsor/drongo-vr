/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app__ = __webpack_require__(3);




__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__app__["a" /* default */], null), document.getElementById("main"));

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_aframe__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_aframe___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_aframe__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_aframe_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_aframe_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_aframe_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_dom__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_gsap__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_gsap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_gsap__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };







class App extends __WEBPACK_IMPORTED_MODULE_2_react___default.a.Component {

  constructor(props) {
    super(props);
    this.t = 0; // Tween variable
    this.n = 25; // Number of DrongOs
    this.resetWaitPeriod = 5000; // Time to wait on completion before reset
    this.initialWaitPeriod = 4000; // Time to wait before the game starts
    this.pMax = 50; // Maximum distance
    this.resetTimeout = null;
    this.timerInterval = null;
    this.cursorRef = null;
    this.numTrees = 0; // Number of trees in the circle
    this.treeRadius = 20; // Radius of tree circle
    this.bounceHeight = 1.5; // Height above the ground for a DrongO to bounce
    this.treeHeightScale = 2;
    this.drongoScale = 0.06;
    this.accelRate = 15;
    this.rotAccelRate = 60;

    let rMax = 300; // Maximum rotation rate
    this.limits = [{
      p: [-this.pMax, this.pMax],
      r: [-rMax, rMax]
    }, {
      p: [this.bounceHeight, this.pMax],
      r: [-rMax, rMax]
    }, {
      p: [-this.pMax, this.pMax],
      r: [-rMax, rMax]
    }];

    this.state = this.getInitialState();
  }

  getInitialState() {
    let drongoStates = Array.apply(null, Array(this.n)).map(x => {
      return {
        visible: true,
        xyz: [0, 0, 0].map((y, i) => {
          return {
            p: i == 1 ? Math.random() * this.pMax + 5 : (Math.random() - 0.5) * this.pMax,
            d2p: 0,
            r: Math.random() * 360,
            d2r: 0
          };
        })
      };
    });
    return {
      t: 0,
      drongoStates: drongoStates,
      startTime: new Date().getTime(),
      isPlaying: false,
      finalTime: null
    };
  }

  stepAccel(x, d2x, rate, limits) {
    d2x = d2x + (Math.random() - 0.5) * rate;
    if (x > limits[1]) {
      d2x = -Math.abs(d2x);
    } else if (x < limits[0]) {
      d2x = Math.abs(d2x);
    }
    x = x + 0.5 * d2x * Math.pow(0.05, 2); //s = ut + 0.5at^2
    return { x, d2x };
  }

  stepDrongoState(state, limits) {
    let { x: p, d2x: d2p } = this.stepAccel(state.p, state.d2p, this.accelRate, limits.p);
    let { x: r, d2x: d2r } = this.stepAccel(state.r, state.d2r, this.rotAccelRate, limits.r);
    return _extends({}, state, {
      p,
      d2p,
      r,
      d2r
    });
  }

  componentDidMount() {
    this.startGame();
  }

  startGame() {
    this.setState({ isPlaying: true });
    __WEBPACK_IMPORTED_MODULE_4_gsap__["TweenMax"].to(this, 3, {
      t: 1, repeat: -1, yoyo: true, onUpdate: () => this.setState(prevState => {
        return {
          t: this.t,
          drongoStates: prevState.drongoStates.map(d => {
            return _extends({}, d, {
              xyz: d.xyz.map((dd, i) => this.stepDrongoState(dd, this.limits[i]))
            });
          })
        };
      })
    });
  }
  stopGame() {
    this.setState({ finalTime: this.getElapsedTime(), isPlaying: false });
  }

  componentWillUnmount() {
    clearTimeout(this.resetTimeout);
  }

  getCount() {
    return this.state.drongoStates.filter(s => s.visible).length;
  }

  handleClick(drongoIndex) {
    if (!this.state.isPlaying || this.getElapsedTime() < 0) {
      return;
    }
    this.setState(prevState => {
      let newStates = prevState.drongoStates;
      newStates[drongoIndex] = _extends({}, prevState.drongoStates[drongoIndex], {
        visible: false
      });
      return {
        drongoStates: newStates
      };
    });
    if (this.getCount() == 0) {
      this.stopGame();
      clearTimeout(this.resetTimeout);
      this.resetTimeout = setTimeout(() => this.resetGame(), this.resetWaitPeriod);
    }
  }

  resetGame() {
    this.setState(this.getInitialState());
    this.startGame();
  }

  // TODO - REPLACE THESE BY PUTTING THEM IN INIT FUNCTION OF A DRONGO OBJECT
  handleCursorRef(node) {
    if (!node) {
      return;
    }
    this.cursorRef = node;
  }

  handleDrongoRef(node) {
    if (!node) {
      return;
    }
    node.addEventListener('model-loaded', () => {
      this.cursorRef.components.raycaster.refreshObjects();
    });
  }

  getElapsedTime() {
    return (new Date().getTime() - this.state.startTime - this.initialWaitPeriod) / 1000;
  }

  render() {
    let elapsedTime = this.state.finalTime || this.getElapsedTime();
    return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_1_aframe_react__["Scene"],
      null,
      __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
        'a-assets',
        null,
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('a-asset-item', { id: 'drongo-obj', src: 'assets/drongo.obj' }),
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('a-asset-item', { id: 'drongo-mtl', src: 'assets/drongo.mtl' }),
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('a-asset-item', { id: 'tree-model', src: 'assets/tree/model.dae' }),
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('img', { id: 'grass-texture', src: 'assets/grass.jpg' }),
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('img', { id: 'sky-texture', src: 'assets/sky.jpg' })
      ),
      __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1_aframe_react__["Entity"],
        { position: '0 0 0' },
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_1_aframe_react__["Entity"],
          { primitive: 'a-camera', 'look-controls-enabled': true, 'wasd-controls-enabled': true },
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_aframe_react__["Entity"], { cursor: 'fuse: true; fuseTimeout: 100',
            raycaster: 'objects: .drongo',
            position: '0 0 -1',
            geometry: 'primitive: ring; radiusInner: 0.02; radiusOuter: 0.03',
            material: 'color: black; shader: flat',
            _ref: node => this.handleCursorRef(node)
          }),
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_aframe_react__["Entity"], { cursor: 'fuse: true; fuseTimeout: 3000',
            raycaster: 'objects: .reset-button'
          }),
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_aframe_react__["Entity"], { text: `value:${this.getCount()};align:center;color:black;font:exo2bold`, position: '0 -0.1 -0.5' }),
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_aframe_react__["Entity"], { text: `value:${elapsedTime.toFixed(elapsedTime >= 0 ? 1 : 0)}s;align:center;color:black;font:exo2bold`, position: '0 -0.2 -0.5' })
        )
      ),
      this.numTrees && Array.apply(null, Array(this.numTrees)).map((d, i) => __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_aframe_react__["Entity"], {
        'collada-model': '#tree-model',
        key: `tree-${i}`,
        position: `${this.treeRadius * Math.cos(i / this.numTrees * 2 * Math.PI)} 0 ${this.treeRadius * Math.sin(i / this.numTrees * 2 * Math.PI) + 10}`,
        scale: `1 ${this.treeHeightScale} 1`
      })),
      __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_aframe_react__["Entity"], { primitive: 'a-plane', position: '0 0 0', rotation: '-90 0 0', material: 'src: #grass-texture; repeat: 400 400', height: '2000', width: '2000' }),
      __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_aframe_react__["Entity"], { primitive: 'a-circle', position: '0 0.01 0', rotation: '-90 0 0', color: 'red', radius: '1',
        className: 'reset-button',
        events: {
          click: () => this.resetGame()
        }
      }),
      __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_aframe_react__["Entity"], { primitive: 'a-sky', material: 'src: #sky-texture' }),
      this.state.drongoStates.map((s, i) => {
        if (!s.visible) {
          return null;
        }
        let p = s.xyz;
        return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_aframe_react__["Entity"], {
          key: `model-${i}`,
          className: 'drongo',
          _ref: node => this.handleDrongoRef(node),
          events: {
            click: () => this.handleClick(i)
          },
          position: `${p[0].p} ${p[1].p} ${p[2].p}`,
          rotation: `${p[0].r} ${p[1].r} ${p[2].r}`,
          'obj-model': 'obj:#drongo-obj; mtl:#drongo-mtl',
          scale: `${this.drongoScale} ${this.drongoScale} ${this.drongoScale}`
        });
      })
    );
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = App;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = AFRAME;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scene = exports.Entity = exports.options = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var nonEntityPropNames = ['children', 'events', 'primitive'];
var filterNonEntityPropNames = function filterNonEntityPropNames(propName) {
  return nonEntityPropNames.indexOf(propName) === -1;
};

var options = {
  // React needs this because React serializes.
  // Preact does not because Preact runs `.setAttribute` on its own.
  runSetAttributeOnUpdates: true
};
exports.options = options;

/**
 * Call `.setAttribute()` on the `ref`, passing prop data directly to A-Frame.
 */

function doSetAttribute(el, props, propName) {
  if (propName === 'className') {
    el.setAttribute('class', props.className);
  } else if (props[propName] && props[propName].constructor === Function) {
    return;
  } else {
    el.setAttribute(propName, props[propName]);
  }
}

/**
 * Handle diffing of previous and current attributes.
 *
 * @param {Element} el
 * @param {Object|null} prevProps - Previous props map.
 * @param {Object} props - Current props map.
 */
function updateAttributes(el, prevProps, props) {
  var propName;

  if (!props || prevProps === props) {
    return;
  }

  // Set attributes.
  for (propName in props) {
    if (!filterNonEntityPropNames(propName)) {
      continue;
    }
    doSetAttribute(el, props, propName);
  }

  // See if attributes were removed.
  if (prevProps) {
    for (propName in prevProps) {
      if (!filterNonEntityPropNames(propName)) {
        continue;
      }
      if (props[propName] === undefined) {
        el.removeAttribute(propName);
      }
    }
  }
}

/**
 * Render <a-entity>.
 * Tell React to use A-Frame's .setAttribute() on the DOM element for all prop initializations
 * and updates.
 */

var Entity = exports.Entity = function (_React$Component) {
  _inherits(Entity, _React$Component);

  function Entity() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Entity);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Entity.__proto__ || Object.getPrototypeOf(Entity)).call.apply(_ref, [this].concat(args))), _this), _this.initEntity = function (el) {
      var props = _this.props;
      var eventName;

      if (!el) {
        return;
      }

      // Store.
      _this.el = el;

      // Attach events.
      if (props.events) {
        for (eventName in props.events) {
          addEventListeners(el, eventName, props.events[eventName]);
        }
      }

      // Update entity.
      updateAttributes(el, null, props);

      // Allow ref.
      if (props._ref) {
        props._ref(el);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  /**
   * In response to initial `ref` callback.
   */


  _createClass(Entity, [{
    key: 'componentDidUpdate',


    /**
     * Handle updates after the initial render.
     */
    value: function componentDidUpdate(prevProps, prevState) {
      var el = this.el;
      var props = this.props;

      // Update events.
      updateEventListeners(el, prevProps.events, props.events);

      // Update entity.
      if (options.runSetAttributeOnUpdates) {
        updateAttributes(el, prevProps, props);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var el = this.el;
      var props = this.props;
      var eventName;

      if (props.events) {
        // Remove events.
        for (eventName in props.events) {
          removeEventListeners(el, eventName, props.events[eventName]);
        }
      }
    }

    /**
     * Render A-Frame DOM with ref: https://facebook.github.io/react/docs/refs-and-the-dom.html
     */

  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var elementName = this.isScene ? 'a-scene' : props.primitive || 'a-entity';
      var propName;

      // Let through props that are OK to render initially.
      var reactProps = {};
      for (propName in props) {
        if (['className', 'id', 'mixin'].indexOf(propName) !== -1 || propName.indexOf('data-') === 0) {
          reactProps[propName] = props[propName];
        }
      }

      return _react2.default.createElement(elementName, _extends({ ref: this.initEntity }, reactProps), props.children);
    }
  }]);

  return Entity;
}(_react2.default.Component);

/**
 * Render <a-scene>.
 * <a-scene> extends from <a-entity> in A-Frame so we reuse <Entity/>.
 */


var Scene = exports.Scene = function (_Entity) {
  _inherits(Scene, _Entity);

  function Scene(props) {
    _classCallCheck(this, Scene);

    var _this2 = _possibleConstructorReturn(this, (Scene.__proto__ || Object.getPrototypeOf(Scene)).call(this, props));

    _this2.isScene = true;
    return _this2;
  }

  return Scene;
}(Entity);

/**
 * Handle diffing of previous and current event maps.
 *
 * @param {Element} el
 * @param {Object} prevEvents - Previous event map.
 * @param {Object} events - Current event map.
 */


function updateEventListeners(el, prevEvents, events) {
  var eventName;

  if (!prevEvents || !events || prevEvents === events) {
    return;
  }

  for (eventName in events) {
    // Didn't change.
    if (prevEvents[eventName] === events[eventName]) {
      continue;
    }

    // If changed, remove old previous event listeners.
    if (prevEvents[eventName]) {
      removeEventListeners(el, eventName, prevEvents[eventName]);
    }

    // Add new event listeners.
    addEventListeners(el, eventName, events[eventName]);
  }

  // See if event handlers were removed.
  for (eventName in prevEvents) {
    if (!events[eventName]) {
      removeEventListeners(el, eventName, prevEvents[eventName]);
    }
  }
}

/**
 * Register event handlers for an event name to ref.
 *
 * @param {Element} el - DOM element.
 * @param {string} eventName
 * @param {array|function} eventHandlers - Handler function or array of handler functions.
 */
function addEventListeners(el, eventName, handlers) {
  var handler;
  var i;

  if (!handlers) {
    return;
  }

  // Convert to array.
  if (handlers.constructor === Function) {
    handlers = [handlers];
  }

  // Register.
  for (i = 0; i < handlers.length; i++) {
    el.addEventListener(eventName, handlers[i]);
  }
}

/**
 * Unregister event handlers for an event name to ref.
 *
 * @param {Element} el - DOM element.
 * @param {string} eventName
 * @param {array|function} eventHandlers - Handler function or array of handler functions.
 */
function removeEventListeners(el, eventName, handlers) {
  var handler;
  var i;

  if (!handlers) {
    return;
  }

  // Convert to array.
  if (handlers.constructor === Function) {
    handlers = [handlers];
  }

  // Unregister.
  for (i = 0; i < handlers.length; i++) {
    el.removeEventListener(eventName, handlers[i]);
  }
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = gsap;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map