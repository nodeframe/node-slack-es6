'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slack = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Slack = exports.Slack = function () {
  function Slack() {
    var cf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Slack);

    var globalConfig = {
      webhook_url: '',
      username: '',
      channel: '',
      isDisable: false
    };

    _lodash2.default.merge(globalConfig, cf);
    this.config = globalConfig;
  }

  _createClass(Slack, [{
    key: '_getStringifyData',
    value: function _getStringifyData() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var defaultField = {
        username: this.config.username,
        channel: this.config.channel
      };
      _lodash2.default.merge(defaultField, data);
      return JSON.stringify(defaultField);
    }
  }, {
    key: '_fetch',
    value: function _fetch(url, body) {
      return (0, _nodeFetch2.default)(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: body
      });
    }
  }, {
    key: 'send',
    value: function send() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (this.config.isDisable || this.config.isDisable === 'true') {
        return Promise.resolve({
          "ok": true,
          "note": "mock the send"
        });
      }
      return this._fetch(this.config.webhook_url, data);
    }
  }]);

  return Slack;
}();
//# sourceMappingURL=slack.js.map