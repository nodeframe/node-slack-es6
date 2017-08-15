'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slack = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
        body: this._getStringifyData(body)
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
  }, {
    key: 'mongooseOnError',
    value: function () {
      var _ref = _asyncToGenerator(_regenerator2.default.mark(function _callee(service, error, callback) {
        var result;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.send({
                  text: '*' + service + '* MongoDB connection error',
                  "attachments": [{
                    "title": '' + error,
                    "color": "danger"
                  }]
                });

              case 3:
                result = _context.sent;

                callback(result);
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](0);

                callback(_context.t0);

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function mongooseOnError(_x4, _x5, _x6) {
        return _ref.apply(this, arguments);
      }

      return mongooseOnError;
    }()
  }]);

  return Slack;
}();
//# sourceMappingURL=slack.js.map