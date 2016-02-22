'use strict';

var _createStore = require('./createStore.js');

var _createStore2 = _interopRequireDefault(_createStore);

var _combineReducers = require('./combineReducers.js');

var _combineReducers2 = _interopRequireDefault(_combineReducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  createStore: _createStore2.default,
  combineReducers: _combineReducers2.default
};