/******/ (function(modules) { // webpackBootstrap
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	__webpack_require__(1);
	window.onload = function () {};
	console.log('boom');
	/*

	1) baisc logic for the calculator done - functions

	2) need to get the calcualtor returning results - done  

	3) need to get the saved results and add to an object - done

	4) need to display saved maths on the dom - displayed on dom, i need to add a delete button - displayed data as added - done 

	5) i need at function that removes from object - savedAnswers then removes from the dom; - done

	6) i need click event on data display to put maths into the display -done  

	7) css and media queries for desktop , tablet and mobile 

	*/
	var inputs = document.getElementsByTagName("input");
	var display = document.getElementsByClassName("display")[0];
	var firstNum = "";
	var secondNum = "";
	var operator = null;
	var log = "";
	var answer = void 0;
	var itemNum = 0;
	var savedAnswers = {};
	var arrayElements = [];

	console.log(inputs);
	for (var i = 0; i < inputs.length; i++) {
	  inputs[i].addEventListener("click", run);
	}

	function add(firstNum, secondNum) {
	  return parseFloat(firstNum) + parseFloat(secondNum);
	}

	function subtract(firstNum, secondNum) {
	  return parseFloat(firstNum) - parseFloat(secondNum);
	}

	function multiply(firstNum, secondNum) {
	  return parseFloat(firstNum) * parseFloat(secondNum);
	}

	function divide(firstNum, secondNum) {
	  return parseFloat(firstNum) / parseFloat(secondNum);
	}

	function calculate(firstNum, secondNum, operator) {
	  switch (operator) {
	    case "+":
	      return add(firstNum, secondNum);
	    case "-":
	      return subtract(firstNum, secondNum);
	    case "/":
	      return divide(firstNum, secondNum);
	    case "x":
	      return multiply(firstNum, secondNum);
	  }
	}

	function firstNumberEmpty(firstNum) {
	  return firstNum === "";
	}

	function secondNumberEmpty(secondNum) {
	  return secondNum === "";
	}

	function operatorEmpty(operator) {
	  return operator === null;
	}

	function anyOperator(btn) {
	  return btn === "-" || btn === "+" || btn === "/" || btn === "x";
	}

	function operatorExceptMinus(btn) {
	  return btn === "+" || btn === "/" || btn === "x";
	}

	function equals(btn) {
	  return btn === "=";
	}

	function decimal(btn) {
	  return btn === ".";
	}

	function negativeNumber(firstNum, secondNum) {
	  return firstNum === "-" || secondNum === "-";
	}

	function blank(firstNum, secondNum, operator) {
	  return firstNumberEmpty(firstNum) && secondNumberEmpty(secondNum) && operatorEmpty(operator);
	}

	function complete(firstNum, secondNum, operator) {
	  return !firstNumberEmpty(firstNum) && !secondNumberEmpty(secondNum) && !operatorEmpty(operator);
	}

	function clearForm(btn, firstNum, secondNum, operator) {
	  return btn == "c" || equals(btn) && blank(firstNum, secondNum, operator) || equals(btn) && (secondNumberEmpty(secondNum) || operatorEmpty(operator));
	}

	function readyToCalculate(btn, firstNum, secondNum, operator) {
	  return equals(btn) && complete(firstNum, secondNum, operator);
	}

	function operatorAfterMinus(btn, firstNum, secondNum) {
	  return negativeNumber(firstNum, secondNum) && anyOperator(btn);
	}

	function allowChainingOperations(btn, firstNum, secondNum, operator) {
	  return anyOperator(btn) && !firstNumberEmpty(firstNum) && !secondNumberEmpty(secondNum);
	}

	function operatorAfterOperator(btn, firstNum, secondNum, operator) {
	  return operatorExceptMinus(btn) && !secondNumberEmpty(secondNum) && !operatorEmpty(operator);
	}

	function allowNegativeFirstNumber(btn, firstNum) {
	  return btn === "-" && firstNumberEmpty(firstNum);
	}

	function allowNegativeSecondNumber(btn, operator, secondNum) {
	  return btn === "-" && !operatorEmpty(operator) && secondNumberEmpty(secondNum);
	}

	function setFirstNumber(operator) {
	  return operatorEmpty(operator);
	}

	function setSecondNumber(firstNum, operator) {
	  return !firstNumberEmpty(firstNum) && !operatorEmpty(operator);
	}

	// the value doesn't clear after calculation
	function run() {

	  var btn = this.value;
	  console.log(btn);
	  if (clearForm(btn, firstNum, secondNum, operator)) {
	    firstNum = "";
	    secondNum = "";
	    operator = null;
	    answer = undefined;
	    display.value = "";
	  } else if (readyToCalculate(btn, firstNum, secondNum, operator)) {
	    if (answer === undefined) {
	      answer = calculate(firstNum, secondNum, operator);
	    } else {
	      answer = calculate(answer, secondNum, operator);
	    }
	    display.value = answer;
	  } else if (operatorAfterMinus(btn, firstNum, secondNum, operator)) {
	    firstNum = "";
	    secondNum = "";
	    operator = null;
	    answer = undefined;
	    display.value = "ERROR";
	  } else if (allowChainingOperations(btn, firstNum, secondNum, operator)) {
	    firstNum = calculate(firstNum, secondNum, operator);
	    operator = btn;
	    secondNum = "";
	    display.value = firstNum;
	  } else if (operatorAfterOperator(btn, firstNum, secondNum, operator)) {
	    operator = btn;
	  } else if (allowNegativeFirstNumber(btn, firstNum)) {
	    firstNum += btn;
	    display.value = firstNum;
	  } else if (allowNegativeSecondNumber(btn, operator, secondNum)) {
	    secondNum += btn;
	    display.value = secondNum;
	  } else if (anyOperator(btn)) {
	    operator = btn;
	  } else if (setFirstNumber(operator)) {
	    firstNum += btn;
	    display.value = firstNum;
	  } else if (setSecondNumber(firstNum, operator)) {
	    secondNum += btn;
	    display.value = secondNum;
	  }
	}

	$('#saveResults').on('click', function () {
	  //alert('clicked!');
	  saveResult();
	});
	function saveResult() {
	  console.log('result needs to be saved');
	  alert('booom');
	  var savedResult = display.value;
	  // the problem heres is if you add the same name it replaces saveresult it the object - i need to fix this bug 
	  if (display.value) {
	    var nameOfCalculation = prompt("please name the calculation?");
	    //console.log(nameOfCalculation)
	    savedAnswers[nameOfCalculation] = { maths: savedResult, date: new Date() };
	    //console.log(savedAnswers)
	    var NameKeys = Object.keys(savedAnswers);
	    // console.log(NameKeys)
	  }
	  display.value = "";
	  function addToDom(object) {
	    var str = "";
	    for (var p in object) {
	      str += '<div><p>' + p + ':' + " " + object[p].date + '</p></div>';
	    }
	    return str;
	  }
	  $('#savedResults').html(addToDom(savedAnswers));

	  var deleteButton = $('<input type="button" value="delete" class="delete"/>');
	  var displayButton = $('<input type="button" value="display" class="result"/>');
	  $('section div').append(deleteButton);
	  $('section div').append(displayButton);

	  $('section').find('div').each(function (i) {
	    // var key = (key)
	    var num = i;
	    $(this).data('index', num).addClass("class-" + num);
	  });

	  $('.delete').bind('click', function (index) {
	    console.log('clicked!', $(this).parent().data('index'), _typeof($(this).parent().data('index')));
	    var index = $(this).parent().data('index');
	    console.log(index);
	    // console.log(arrayElements.index(this))
	    // var index = arrayElements.index(this);
	    $(this).parent().remove();
	    event.stopPropagation();
	    // i need to link the object.keys to the click event 
	    // because the the new elements are assign in the 
	    deleteResult(savedAnswers, index, NameKeys);

	    console.log(savedAnswers, NameKeys);
	  });

	  // function to display savedAnswer on display.value - i neeed to reference the object -jquery click event - click event on div -then

	  $('.result').bind('click', function (index) {
	    console.log('clicked!', $(this).parent().data('index'), _typeof($(this).parent().data('index')));
	    var index = $(this).parent().data('index');
	    console.log(index);
	    console.log('boom');
	    displayResult(savedAnswers, index, NameKeys);
	  });
	}

	function displayResult(savedAnswers, index, NameKeys) {
	  console.log(NameKeys[index]);

	  var mathKeys = NameKeys[index];
	  console.log(savedAnswers[mathKeys]);

	  console.log(savedAnswers[mathKeys].maths);
	  display.value = savedAnswers[mathKeys].maths;
	}

	function deleteResult(savedAnswers, index, NameKeys) {
	  console.log('stuff deleted from the dom.....not from the ');
	  //console.log(savedAnswers , NameKeys);
	  // problems basically the last prop in the object isn't getting deleted;
	  console.log(NameKeys[index]);

	  var objectKey = NameKeys[index];
	  console.log(NameKeys[index] + "name of the key selected to delete");

	  console.log(savedAnswers + " " + 'savedAnswers object ');
	  delete savedAnswers[objectKey];

	  console.log(savedAnswers + ' object after delete');

	  NameKeys.pop(index);

	  console.log(NameKeys);

	  return savedAnswers;
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./main.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./main.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "body {\n  width: 100%;\n  margin: 0;\n  background-color: white;\n  background-image: linear-gradient(90deg, rgba(200, 0, 0, 0.5) 50%, transparent 50%), linear-gradient(rgba(200, 0, 0, 0.5) 50%, transparent 50%);\n  background-size: 50px 50px; }\n  body h1 {\n    font-family: \"Courier New\", Courier, \"Lucida Sans Typewriter\";\n    text-align: center;\n    margin: 30px; }\n\n.wrapper {\n  width: 500px;\n  margin: 0 auto;\n  border: 1px solid;\n  background: dimgray;\n  border-radius: 3px; }\n  .wrapper h1, .wrapper p {\n    font-family: \"Courier New\", Courier, \"Lucida Sans Typewriter\"; }\n\nul {\n  padding: 10px;\n  margin: 20px auto;\n  padding: 0;\n  text-align: center; }\n\nli {\n  list-style-type: none; }\n\nul.calc {\n  box-shadow: 0 5px 8px 1px #000;\n  background-color: #292929;\n  width: 50%;\n  border: 2px solid #000;\n  border-radius: 4px;\n  /* padding: 20px 0; */\n  margin: 10px;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap; }\n\n.number, .operator, .eq, .clear, .decimal, .save, .result, .delete {\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  border-radius: 3px;\n  background-color: #424242;\n  border: solid 1px #000;\n  box-shadow: 0 0 0 1px #2b2b2b;\n  display: inline-block;\n  cursor: pointer;\n  color: #fff;\n  font-family: arial;\n  font-size: 16px;\n  font-weight: 700;\n  text-decoration: none;\n  text-shadow: 0 0 0 #2b665e;\n  padding: 12px 18px; }\n\n.save, .clear {\n  width: 60px;\n  height: 60px;\n  padding: 0; }\n\n.clear {\n  margin: -0.5px;\n  margin-left: 3px; }\n\n.display {\n  margin-bottom: 20px;\n  color: #fff;\n  background-color: #171717;\n  border-radius: 3px;\n  border: 2px solid #000;\n  font-size: 40px;\n  height: 70px;\n  width: 100%;\n  text-align: right;\n  padding: 10px; }\n\ninput[type=button]:active {\n  position: relative;\n  top: 1px; }\n\ninput[type=button] {\n  text-align: center;\n  padding: 10px 20px;\n  width: 50px;\n  margin: 5px; }\n\ninput[type=button]:hover {\n  color: #95a5a6; }\n\nli.Number_7 {\n  order: 0;\n  flex-grow: 1; }\n\nli.Number_8 {\n  order: 1; }\n\nli.Number_9 {\n  order: 2; }\n\nli.li_plus {\n  order: 3; }\n\nli.Number_4 {\n  order: 4;\n  flex-grow: 1; }\n\nli.Number_5 {\n  order: 5; }\n\nli.Number_6 {\n  order: 6; }\n\nli.li_minus {\n  order: 7; }\n\nli.Number_1 {\n  order: 8;\n  flex-grow: 1; }\n\nli.Number_2 {\n  order: 9; }\n\nli.Number_3 {\n  order: 10; }\n\nli.li_times {\n  order: 11; }\n\nli.Number_0 {\n  order: 12;\n  flex-grow: 1; }\n\nli.li_decimal {\n  order: 20;\n  flex-grow: 1; }\n\nli.func_buttons {\n  order: 22;\n  width: 100%; }\n  li.func_buttons ul {\n    justify-content: center; }\n    li.func_buttons ul li.li_save {\n      flex-grow: 2; }\n      li.func_buttons ul li.li_save button {\n        width: 100%; }\n    li.func_buttons ul li.li_clear {\n      flex-grow: 1; }\n      li.func_buttons ul li.li_clear input {\n        width: 100%;\n        margin: 0; }\n\n.func_buttons ul {\n  display: flex;\n  margin: 0; }\n\nli.li_div {\n  order: 14; }\n\nli.li_eq {\n  order: 20; }\n\n.li_clear input {\n  width: 100px; }\n\n#savedResults {\n  width: 47%;\n  display: inline-block;\n  position: relative;\n  float: right;\n  margin-top: -274px; }\n  #savedResults h1, #savedResults p {\n    text-align: center; }\n\ndiv[class^='class-'] {\n  width: 100%;\n  display: flex; }\n  div[class^='class-'] p {\n    padding-left: 5px;\n    font-size: x-small;\n    color: white; }\n  div[class^='class-'] .result, div[class^='class-'] .delete {\n    flex-grow: 1;\n    font-size: xx-small;\n    padding: 2px; }\n\n@media screen and (min-width: 406px) and (max-width: 527px) {\n  ul li {\n    width: 25px;\n    flex-grow: 1; } }\n\n@media screen and (max-width: 600px) {\n  body {\n    min-width: 500px; }\n  .wrapper {\n    margin: auto 0;\n    width: 100%; }\n  .display {\n    width: 100%;\n    margin-bottom: 10px;\n    height: 15vh; }\n  ul.calc {\n    width: 100%;\n    padding: 0;\n    margin: 0;\n    display: flex;\n    justify-content: space-between; }\n  ul li {\n    width: 25%; }\n  .func_buttons {\n    width: 264px; }\n  .number, .operator, .eq, .clear, .decimal, .save {\n    font-size: 30px; }\n  .save {\n    width: 100px;\n    padding: 12px; }\n  .li_clear input {\n    width: 100px; }\n  li.Number_0 {\n    flex-grow: 1; }\n  #savedResults {\n    margin: 0;\n    width: 100%;\n    margin-top: 10px;\n    margin-bottom: 50px; }\n    #savedResults div[class^='class-'] {\n      margin-top: 1px;\n      margin-left: -5px;\n      height: 50px; }\n      #savedResults div[class^='class-'] p {\n        font-size: 15px;\n        margin: 15px;\n        text-decoration: underline;\n        color: black; } }\n\n@media screen and (max-width: 405px) {\n  body {\n    min-width: 405px; }\n  ul li {\n    width: 33.33%; }\n  .display {\n    width: 100%;\n    margin-bottom: 10px;\n    height: 15vh; }\n  .func_buttons {\n    width: 66.66%; }\n  li.Number_7 {\n    order: 0; }\n  li.Number_8 {\n    order: 1; }\n  li.Number_9 {\n    order: 2; }\n  li.li_plus {\n    order: 10; }\n  li.Number_4 {\n    order: 3; }\n  li.Number_5 {\n    order: 4; }\n  li.Number_6 {\n    order: 5; }\n  li.li_minus {\n    order: 11; }\n  li.Number_1 {\n    order: 6; }\n  li.Number_2 {\n    order: 7; }\n  li.Number_3 {\n    order: 8; }\n  li.li_times {\n    order: 13; }\n  li.Number_0 {\n    order: 9; }\n  li.li_decimal {\n    order: 12; }\n  li.li_div {\n    order: 14; }\n  li.li_eq {\n    order: 22;\n    width: 100%; }\n    li.li_eq input {\n      width: 100%;\n      margin: 0; }\n  li.func_buttons {\n    order: 23;\n    flex-grow: 1; }\n    li.func_buttons ul {\n      justify-content: center; }\n      li.func_buttons ul li.li_save {\n        flex-grow: 2; }\n        li.func_buttons ul li.li_save button {\n          width: 100%; }\n      li.func_buttons ul li.li_clear {\n        flex-grow: 1; }\n        li.func_buttons ul li.li_clear input {\n          width: 100%;\n          margin: 0; }\n  #savedResults {\n    width: 100%;\n    margin-top: 10px;\n    margin: 0;\n    margin-top: 10px;\n    margin-bottom: 50px;\n    padding-left: 10px; }\n  div[class^='class-'] {\n    margin-top: 1px;\n    margin-left: -5px;\n    height: 50px; }\n    div[class^='class-'] P {\n      color: black; } }\n", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);