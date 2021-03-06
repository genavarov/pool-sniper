"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var colors = require("colors");
// tslint:disable-next-line: typedef
var consoleErrorNative = console.error, consoleLogNative = console.log;
var Logger = /** @class */ (function () {
    function Logger() {
    }
    /**
     * Render `console.error` in the terminal
     * @param msg The message
     * @param objects Any additional logs
     */
    // tslint:disable-next-line: no-any
    Logger.error = function (msg) {
        var objects = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            objects[_i - 1] = arguments[_i];
        }
        this.consoleError(colors.red(msg), objects);
    };
    /**
     * Render `console.log` in the terminal
     * @param msg The message
     * @param objects Any additional logs
     */
    // tslint:disable-next-line: no-any
    Logger.log = function (msg) {
        var objects = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            objects[_i - 1] = arguments[_i];
        }
        this.consoleLog(msg, objects);
    };
    /**
     * Wrapper around `console.log` to use its native function
     * @param msg The message
     * @param objects Any additional logs
     */
    // tslint:disable-next-line: no-any
    Logger.consoleLog = function (msg) {
        var objects = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            objects[_i - 1] = arguments[_i];
        }
        if (objects.length > 0 && objects[0].length > 0) {
            consoleLogNative.call(console, msg);
        }
        else {
            consoleLogNative.call(console, msg);
        }
    };
    /**
     * Wrapper around `console.error` to use its native function
     * @param msg The message
     * @param objects Any additional logs
     */
    // tslint:disable-next-line: no-any
    Logger.consoleError = function (msg) {
        var objects = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            objects[_i - 1] = arguments[_i];
        }
        if (objects.length > 0 && objects[0].length > 0) {
            consoleErrorNative.call(console, msg, objects);
        }
        else {
            consoleErrorNative.call(console, msg);
        }
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map