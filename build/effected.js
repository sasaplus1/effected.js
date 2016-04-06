/*!
 * @license effected.js Copyright(c) 2016 sasa+1
 * https://github.com/sasaplus1/effected.js
 * Released under the MIT license.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["effected"] = factory();
	else
		root["effected"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var addEventListener = 'addEventListener',
	    removeEventListener = 'removeEventListener';

	var animationStartEvents = [
	  'animationstart',
	  'webkitAnimationStart',
	  'mozAnimationStart',
	  'msAnimationStart',
	  'oAnimationStart'
	];

	var animationEndEvents = [
	  'animationend',
	  'webkitAnimationEnd',
	  'mozAnimationEnd',
	  'msAnimationEnd',
	  'oAnimationEnd'
	];

	var animationIterationEvents = [
	  'animationiteration',
	  'webkitAnimationIteration',
	  'mozAnimationIteration',
	  'msAnimationIteration',
	  'oAnimationIteration'
	];

	var transitionEndEvents = [
	  'transitionend',
	  'webkitTransitionEnd',
	  'mozTransitionEnd',
	  'msTransitionEnd',
	  'oTransitionEnd'
	];

	var allEndEvents = [].concat(animationEndEvents, transitionEndEvents);

	//------------------------------------------------------------------------------

	/**
	 * for add/remove eventlisteners
	 *
	 * @private
	 * @param {HTMLElement} element
	 * @param {String} functionName
	 * @param {String[]} eventNames
	 * @param {Function} handler
	 */
	function controlEventListeners(element, functionName, eventNames, handler) {
	  var i, len;

	  for (i = 0, len = eventNames.length; i < len; ++i) {
	    element[functionName](eventNames[i], handler, false);
	  }
	}

	//------------------------------------------------------------------------------

	/**
	 * callback when end of animation
	 *
	 * @param {HTMLElement} element
	 * @param {String} [eventType]
	 * @param {Function} [callback]
	 * @return {Promise}
	 */
	function effected(element, eventType, callback) {
	  var callbackType, targetEvents, handler;

	  if (!element || !element.nodeType || element.nodeType !== 1) {
	    throw new TypeError('element must be a HTMLElement');
	  }

	  if (typeof eventType === 'function' && typeof callback === 'undefined') {
	    callback = eventType;
	    eventType = null;
	  }

	  callbackType = typeof callback;

	  if (callbackType !== 'function' && !effected.Promise) {
	    throw new Error('callback function required');
	  }

	  switch (eventType) {
	    case 'animationstart':
	      targetEvents = animationStartEvents;
	      break;
	    case 'animation':
	    case 'animationend':
	      targetEvents = animationEndEvents;
	      break;
	    case 'transition':
	    case 'transitionend':
	      targetEvents = transitionEndEvents;
	      break;
	    default:
	      targetEvents = allEndEvents;
	  }

	  if (callbackType === 'function') {
	    // use callback
	    handler = function(event) {
	      // remove handler
	      controlEventListeners(
	        element, removeEventListener, targetEvents, handler);

	      callback(event);
	    };

	    // add handler
	    controlEventListeners(element, addEventListener, targetEvents, handler);
	  } else {
	    // use Promise
	    return new effected.Promise(function(resolve, reject) {
	      handler = function(event) {
	        // remove handler
	        controlEventListeners(
	          element, removeEventListener, targetEvents, handler);

	        resolve(event);
	      };

	      // add handler
	      controlEventListeners(element, addEventListener, targetEvents, handler);
	    });
	  }
	}

	/**
	 * callback when iterate of animation
	 *
	 * @param {HTMLElement} element
	 * @param {Function} callback
	 */
	function iterated(element, callback) {
	  var handler;

	  if (!element || !element.nodeType || element.nodeType !== 1) {
	    throw new TypeError('element must be a HTMLElement');
	  }

	  handler = function() {
	    // remove handler
	    controlEventListeners(
	      element, removeEventListener, animationIterationEvents, callback);

	    controlEventListeners(
	      element, removeEventListener, animationEndEvents, handler);
	  };

	  controlEventListeners(
	    element, addEventListener, animationEndEvents, handler);

	  // add handler
	  controlEventListeners(
	    element, addEventListener, animationIterationEvents, callback);
	}

	//------------------------------------------------------------------------------

	effected.Promise = (typeof Promise !== 'undefined') ? Promise : null;

	effected.effected = effected;
	effected.iterated = iterated;

	//------------------------------------------------------------------------------

	module.exports = effected;


/***/ }
/******/ ])
});
;