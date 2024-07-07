"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AutoNavPlugin;
var _handleNav = require("./handleNav");
var _path = require("path");
var _defaultConfig = require("./defaultConfig");
var _handleSider = require("./handleSider");
function AutoNavPlugin(options) {
  var _assignOptions$entry;
  if (!options) options = _defaultConfig.defaultOptions;
  var assignOptions = Object.assign({}, _defaultConfig.defaultOptions, options);
  (0, _defaultConfig.setOptions)(assignOptions);
  var path = (0, _path.resolve)(process.cwd(), (_assignOptions$entry = assignOptions.entry) !== null && _assignOptions$entry !== void 0 ? _assignOptions$entry : 'docs');
  return {
    nav: (0, _handleNav.getNav)(path),
    sidebar: (0, _handleSider.getSidebar)(path)
  };
}