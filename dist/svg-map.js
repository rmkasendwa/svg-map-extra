(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SVGMap"] = factory();
	else
		root["SVGMap"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ src_SVGMap; });

// CONCATENATED MODULE: ./src/svg-map/default-options.js
// Default options, pass a custom options object to overwrite specific
/* harmony default export */ var default_options = ({
  // The id of the element to render the map in
  targetElementID: '',
  // The element to render the map in
  targetElement: null,
  // Minimum and maximum zoom
  minZoom: 1,
  maxZoom: 25,
  // Initial zoom
  initialZoom: 1.06,
  // Zoom sensitivity
  zoomScaleSensitivity: 0.2,
  // Zoom with mousewheel
  mouseWheelZoomEnabled: true,
  // Data colors
  colorMax: '#CC0033',
  colorMin: '#FFE5D9',
  colorNoData: '#E2E2E2',
  // The flag type can be 'image' or 'emoji'
  flagType: 'image',
  // The URL to the flags when using flag type 'image', {0} will get replaced with the lowercase country id
  flagURL: 'https://cdn.jsdelivr.net/gh/hjnilsson/country-flags@latest/svg/{0}.svg',
  // Decide whether to show the flag option or not
  hideFlag: false,
  // The default text to be shown when no data is present
  noDataText: 'No data available',
  // Country specific options
  countries: {
    // Western Sahara: Set to false to combine Morocco (MA) and Western Sahara (EH)
    EH: true
  }
});
// CONCATENATED MODULE: ./src/svg-map/countries.js
/* harmony default export */ var countries = ({
  AF: 'Afghanistan',
  AX: 'Åland Islands',
  AL: 'Albania',
  DZ: 'Algeria',
  AS: 'American Samoa',
  AD: 'Andorra',
  AO: 'Angola',
  AI: 'Anguilla',
  AQ: 'Antarctica',
  AG: 'Antigua and Barbuda',
  AR: 'Argentina',
  AM: 'Armenia',
  AW: 'Aruba',
  AU: 'Australia',
  AT: 'Austria',
  AZ: 'Azerbaijan',
  BS: 'Bahamas',
  BH: 'Bahrain',
  BD: 'Bangladesh',
  BB: 'Barbados',
  BY: 'Belarus',
  BE: 'Belgium',
  BZ: 'Belize',
  BJ: 'Benin',
  BM: 'Bermuda',
  BT: 'Bhutan',
  BO: 'Bolivia',
  BA: 'Bosnia and Herzegovina',
  BW: 'Botswana',
  BR: 'Brazil',
  IO: 'British Indian Ocean Territory',
  VG: 'British Virgin Islands',
  BN: 'Brunei Darussalam',
  BG: 'Bulgaria',
  BF: 'Burkina Faso',
  BI: 'Burundi',
  KH: 'Cambodia',
  CM: 'Cameroon',
  CA: 'Canada',
  CV: 'Cape Verde',
  BQ: 'Caribbean Netherlands',
  KY: 'Cayman Islands',
  CF: 'Central African Republic',
  TD: 'Chad',
  CL: 'Chile',
  CN: 'China',
  CX: 'Christmas Island',
  CC: 'Cocos Islands',
  CO: 'Colombia',
  KM: 'Comoros',
  CG: 'Congo',
  CK: 'Cook Islands',
  CR: 'Costa Rica',
  HR: 'Croatia',
  CU: 'Cuba',
  CW: 'Curaçao',
  CY: 'Cyprus',
  CZ: 'Czech Republic',
  CD: 'Democratic Republic of the Congo',
  DK: 'Denmark',
  DJ: 'Djibouti',
  DM: 'Dominica',
  DO: 'Dominican Republic',
  EC: 'Ecuador',
  EG: 'Egypt',
  SV: 'El Salvador',
  GQ: 'Equatorial Guinea',
  ER: 'Eritrea',
  EE: 'Estonia',
  ET: 'Ethiopia',
  FK: 'Falkland Islands',
  FO: 'Faroe Islands',
  FM: 'Federated States of Micronesia',
  FJ: 'Fiji',
  FI: 'Finland',
  FR: 'France',
  GF: 'French Guiana',
  PF: 'French Polynesia',
  TF: 'French Southern Territories',
  GA: 'Gabon',
  GM: 'Gambia',
  GE: 'Georgia',
  DE: 'Germany',
  GH: 'Ghana',
  GI: 'Gibraltar',
  GR: 'Greece',
  GL: 'Greenland',
  GD: 'Grenada',
  GP: 'Guadeloupe',
  GU: 'Guam',
  GT: 'Guatemala',
  GN: 'Guinea',
  GW: 'Guinea-Bissau',
  GY: 'Guyana',
  HT: 'Haiti',
  HN: 'Honduras',
  HK: 'Hong Kong',
  HU: 'Hungary',
  IS: 'Iceland',
  IN: 'India',
  ID: 'Indonesia',
  IR: 'Iran',
  IQ: 'Iraq',
  IE: 'Ireland',
  IM: 'Isle of Man',
  IL: 'Israel',
  IT: 'Italy',
  CI: 'Ivory Coast',
  JM: 'Jamaica',
  JP: 'Japan',
  JE: 'Jersey',
  JO: 'Jordan',
  KZ: 'Kazakhstan',
  KE: 'Kenya',
  KI: 'Kiribati',
  XK: 'Kosovo',
  KW: 'Kuwait',
  KG: 'Kyrgyzstan',
  LA: 'Laos',
  LV: 'Latvia',
  LB: 'Lebanon',
  LS: 'Lesotho',
  LR: 'Liberia',
  LY: 'Libya',
  LI: 'Liechtenstein',
  LT: 'Lithuania',
  LU: 'Luxembourg',
  MO: 'Macau',
  MK: 'Macedonia',
  MG: 'Madagascar',
  MW: 'Malawi',
  MY: 'Malaysia',
  MV: 'Maldives',
  ML: 'Mali',
  MT: 'Malta',
  MH: 'Marshall Islands',
  MQ: 'Martinique',
  MR: 'Mauritania',
  MU: 'Mauritius',
  YT: 'Mayotte',
  MX: 'Mexico',
  MD: 'Moldova',
  MC: 'Monaco',
  MN: 'Mongolia',
  ME: 'Montenegro',
  MS: 'Montserrat',
  MA: 'Morocco',
  MZ: 'Mozambique',
  MM: 'Myanmar',
  NA: 'Namibia',
  NR: 'Nauru',
  NP: 'Nepal',
  NL: 'Netherlands',
  NC: 'New Caledonia',
  NZ: 'New Zealand',
  NI: 'Nicaragua',
  NE: 'Niger',
  NG: 'Nigeria',
  NU: 'Niue',
  NF: 'Norfolk Island',
  KP: 'North Korea',
  MP: 'Northern Mariana Islands',
  NO: 'Norway',
  OM: 'Oman',
  PK: 'Pakistan',
  PW: 'Palau',
  PS: 'Palestine',
  PA: 'Panama',
  PG: 'Papua New Guinea',
  PY: 'Paraguay',
  PE: 'Peru',
  PH: 'Philippines',
  PN: 'Pitcairn Islands',
  PL: 'Poland',
  PT: 'Portugal',
  PR: 'Puerto Rico',
  QA: 'Qatar',
  RE: 'Reunion',
  RO: 'Romania',
  RU: 'Russia',
  RW: 'Rwanda',
  SH: 'Saint Helena',
  KN: 'Saint Kitts and Nevis',
  LC: 'Saint Lucia',
  PM: 'Saint Pierre and Miquelon',
  VC: 'Saint Vincent and the Grenadines',
  WS: 'Samoa',
  SM: 'San Marino',
  ST: 'São Tomé and Príncipe',
  SA: 'Saudi Arabia',
  SN: 'Senegal',
  RS: 'Serbia',
  SC: 'Seychelles',
  SL: 'Sierra Leone',
  SG: 'Singapore',
  SX: 'Sint Maarten',
  SK: 'Slovakia',
  SI: 'Slovenia',
  SB: 'Solomon Islands',
  SO: 'Somalia',
  ZA: 'South Africa',
  GS: 'South Georgia and the South Sandwich Islands',
  KR: 'South Korea',
  SS: 'South Sudan',
  ES: 'Spain',
  LK: 'Sri Lanka',
  SD: 'Sudan',
  SR: 'Suriname',
  SJ: 'Svalbard and Jan Mayen',
  SZ: 'Eswatini',
  SE: 'Sweden',
  CH: 'Switzerland',
  SY: 'Syria',
  TW: 'Taiwan',
  TJ: 'Tajikistan',
  TZ: 'Tanzania',
  TH: 'Thailand',
  TL: 'Timor-Leste',
  TG: 'Togo',
  TK: 'Tokelau',
  TO: 'Tonga',
  TT: 'Trinidad and Tobago',
  TN: 'Tunisia',
  TR: 'Turkey',
  TM: 'Turkmenistan',
  TC: 'Turks and Caicos Islands',
  TV: 'Tuvalu',
  UG: 'Uganda',
  UA: 'Ukraine',
  AE: 'United Arab Emirates',
  GB: 'United Kingdom',
  US: 'United States',
  UM: 'United States Minor Outlying Islands',
  VI: 'United States Virgin Islands',
  UY: 'Uruguay',
  UZ: 'Uzbekistan',
  VU: 'Vanuatu',
  VA: 'Vatican City',
  VE: 'Venezuela',
  VN: 'Vietnam',
  WF: 'Wallis and Futuna',
  EH: 'Western Sahara',
  YE: 'Yemen',
  ZM: 'Zambia',
  ZW: 'Zimbabwe'
});
// CONCATENATED MODULE: ./src/svg-map/utils.js
var utils_this = undefined;

// Helper to create an element with a class name
var createElement = function createElement(type, className, appendTo, innerhtml) {
  var element = document.createElement(type);

  if (className) {
    className = className.split(' ');
    className.forEach(function (item) {
      return element.classList.add(item);
    });
  }

  innerhtml && (element.innerHTML = innerhtml);
  appendTo && appendTo.appendChild(element);
  return element;
}; // Print numbers with commas

var numberWithCommas = function numberWithCommas(number) {
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';
  return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}; // Get a color between two other colors

var getColor = function getColor(color1, color2, ratio) {
  color1 = color1.slice(-6);
  color2 = color2.slice(-6);
  var r = Math.ceil(parseInt(color1.substring(0, 2), 16) * ratio + parseInt(color2.substring(0, 2), 16) * (1 - ratio));
  var g = Math.ceil(parseInt(color1.substring(2, 4), 16) * ratio + parseInt(color2.substring(2, 4), 16) * (1 - ratio));
  var b = Math.ceil(parseInt(color1.substring(4, 6), 16) * ratio + parseInt(color2.substring(4, 6), 16) * (1 - ratio));
  return '#' + utils_this.getHex(r) + utils_this.getHex(g) + utils_this.getHex(b);
}; // Get a hex value

var getHex = function getHex(value) {
  value = value.toString(16);
  return ('0' + value).slice(-2);
};
// CONCATENATED MODULE: ./src/index.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var src_SVGMap = /*#__PURE__*/function () {
  function SVGMap() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, SVGMap);

    if (!options.targetElementID || !document.getElementById(options.targetElementID)) {
      if (!options.targetElement) throw new TypeError('Target element not found');
    }

    this.options = _objectSpread(_objectSpread({}, default_options), options); // Global id

    this.id = this.options.targetElementID || btoa(Math.random()); // Cache wrapper element

    this.wrapper = this.options.targetElementID ? document.getElementById(this.options.targetElementID) : this.options.targetElement; // Create the map

    this.createMap(); // Apply map data

    this.applyData(this.options.data);
  }

  _createClass(SVGMap, [{
    key: "applyData",
    value: function applyData(data) {
      var _this = this;

      this.options.data = data;
      var min, max; // Get highest and lowest value

      Object.keys(data.values).forEach(function (countryCode) {
        var value = parseInt(data.values[countryCode][data.applyData], 10);
        max === null && (max = value);
        min === null && (min = value);
        value > max && (max = value);
        value < min && (min = value);
      });
      data.data[data.applyData].thresholdMax && (max = Math.min(max, data.data[data.applyData].thresholdMax));
      data.data[data.applyData].thresholdMin && (min = Math.max(min, data.data[data.applyData].thresholdMin)); // Loop through countries and set colors

      Object.keys(countries).forEach(function (countryCode) {
        var element = document.getElementById(_this.id + '-map-country-' + countryCode);
        if (!element) return;

        if (!data.values[countryCode]) {
          element.setAttribute('fill', _this.options.colorNoData);
          return;
        }

        var value = Math.max(min, parseInt(data.values[countryCode][data.applyData], 10));
        var ratio = max === min ? 1 : Math.max(0, Math.min(1, (value - min) / (max - min)));
        var color = getColor(_this.options.colorMax, _this.options.colorMin, ratio);
        element.setAttribute('fill', color);
      });

      if (this.options.fitToData) {
        var _this$mapWrapper = this.mapWrapper,
            mapWidth = _this$mapWrapper.offsetWidth,
            mapHeight = _this$mapWrapper.offsetHeight;
        var scaleFactor = mapWidth / (mapWidth > mapHeight ? 2000 : 1001);
        var mapCenterPoint = [mapWidth / 2, mapHeight / 2];
        var points = Object.keys(data.values).map(function (countryCode) {
          return _this.mapImage.querySelector("[data-id=\"".concat(countryCode, "\"]"));
        }).filter(function (path) {
          return path != null;
        }).reduce(function (accumulator, path) {
          var pathDefinition = (path.attributes.d.value.match(/[A-Za-z][\d.,-]+/g) || []).map(function (string) {
            var command = string.charAt(0);
            var coordinates = string.substring(1).split(string.match(',') ? ',' : /(?<=\d)(?=-)/g).map(function (coordinate) {
              return parseFloat(coordinate.trim());
            });
            command.match(/^[Hh]$/g) && coordinates.push(0);
            command.match(/^[Vv]$/g) && coordinates.unshift(0);
            return {
              command: command,
              coordinates: coordinates
            };
          });

          var currentPoint = _toConsumableArray(pathDefinition[0].coordinates);

          pathDefinition.forEach(function (definition) {
            if (definition.command.match(/^[A-Z]$/g)) {
              currentPoint = _toConsumableArray(definition.coordinates);
            } else {
              var _currentPoint = currentPoint,
                  _currentPoint2 = _slicedToArray(_currentPoint, 2),
                  x = _currentPoint2[0],
                  y = _currentPoint2[1];

              currentPoint = [x + definition.coordinates[0], y + definition.coordinates[1]];
            }

            definition.absoluteCoordinates = currentPoint;
          });
          pathDefinition.forEach(function (definition) {
            definition.absoluteCoordinates = [definition.absoluteCoordinates[0] * scaleFactor, definition.absoluteCoordinates[1] * scaleFactor];
          });
          return [].concat(_toConsumableArray(accumulator), _toConsumableArray(pathDefinition.map(function (a) {
            return a.absoluteCoordinates;
          })));
        }, []);
        this.resetMapZoom();

        if (points.length > 0) {
          var minX = Math.min.apply(Math, _toConsumableArray(points.map(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 1),
                x = _ref2[0];

            return x;
          })));
          var minY = Math.min.apply(Math, _toConsumableArray(points.map(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                y = _ref4[1];

            return y;
          })));
          var maxX = Math.max.apply(Math, _toConsumableArray(points.map(function (_ref5) {
            var _ref6 = _slicedToArray(_ref5, 1),
                x = _ref6[0];

            return x;
          })));
          var maxY = Math.max.apply(Math, _toConsumableArray(points.map(function (_ref7) {
            var _ref8 = _slicedToArray(_ref7, 2),
                y = _ref8[1];

            return y;
          })));
          var boundingBoxWidth = maxX - minX;
          var boundingBoxHeight = maxY - minY;
          var xZoomFactor = 2000 * scaleFactor / boundingBoxWidth;
          var yZoomFactor = 1001 * scaleFactor / boundingBoxHeight;
          this.mapPanZoom.pan({
            x: mapCenterPoint[0] - (minX + boundingBoxWidth / 2),
            y: mapCenterPoint[1] - (minY + boundingBoxHeight / 2)
          });
          this.mapPanZoom.zoom(Math.round(Math.min(xZoomFactor, yZoomFactor) * .8));
        }
      }
    }
  }, {
    key: "getCountryName",
    value: function getCountryName(countryCode) {
      return this.options.countryNames && this.options.countryNames[countryCode] ? this.options.countryNames[countryCode] : countries[countryCode];
    }
  }]);

  return SVGMap;
}();


;

/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=svg-map.js.map