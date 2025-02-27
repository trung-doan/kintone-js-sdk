"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * HTTPHeader model
 */
var HTTPHeader =
/*#__PURE__*/
function () {
  /**
     * @param {String} keyInput
     * @param {String} valueInput
     */
  function HTTPHeader(keyInput, valueInput) {
    _classCallCheck(this, HTTPHeader);

    this.key = keyInput;
    this.value = valueInput;
  }
  /**
     * get header key
     * @return {this}
     */


  _createClass(HTTPHeader, [{
    key: "getKey",
    value: function getKey() {
      return this.key;
    }
    /**
       * get header value
       * @return {this}
       */

  }, {
    key: "getValue",
    value: function getValue() {
      return this.value;
    }
  }]);

  return HTTPHeader;
}();

var _default = HTTPHeader;
exports.default = _default;