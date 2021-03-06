"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var command_types_1 = require("../commands/enums/command-types");
var help_messages_1 = require("../commands/help-messages");
var yargs = require("yargs");
var Helpers = /** @class */ (function () {
    function Helpers() {
    }
    /**
     * Capitalize a string `hey` > `Hey`
     * @param str The value
     */
    Helpers.capitalize = function (str) {
        if (str == null) {
            return str;
        }
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    };
    /**
     * This will get all the program arguments
     */
    Helpers.getProgramArguments = function () {
        // tslint:disable-next-line: typedef
        var _a = yargs.argv, _b = _a._, command = _b[0], subcommands = _b.slice(1), options = __rest(_a, ["_"]);
        return {
            command: command,
            options: Object.keys(options).reduce(function (r, v) {
                // @ts-ignore
                r[v] = options[v];
                return r;
            }, {}),
            subcommands: subcommands,
        };
    };
    /**
     * Gets the help message by the command type
     * @param commandType The command type
     */
    Helpers.getHelpMessageByCommandType = function (commandType) {
        switch (commandType) {
            case command_types_1.CommandTypes.generate:
                return this.buildUpHelpMessage(help_messages_1.generateHelpMessages);
            default:
                throw new Error('No help message for this command');
        }
    };
    /**
     * Builds the help message up
     * @param helpMessage The help message object
     */
    Helpers.buildUpHelpMessage = function (helpMessage) {
        var message = "Usage: " + helpMessage.usage;
        if (helpMessage.commands.length > 0) {
            message += '\n\nCommands:\n';
            for (var i = 0; i < helpMessage.commands.length; i++) {
                message += "    " + helpMessage.commands[i] + "\n";
            }
        }
        else {
            message += '\n';
        }
        message += '\nExamples:\n';
        for (var i = 0; i < helpMessage.examples.length; i++) {
            message += "    $ " + helpMessage.examples[i] + "\n";
        }
        return message;
    };
    /**
     * Remove all white spaces
     * @param value The value
     */
    Helpers.removeAllWhiteSpace = function (value) {
        return value.replace(/\s+/g, '');
    };
    /**
     * Deep clone a object
     * @param object The object
     */
    Helpers.deepClone = function (object) {
        return JSON.parse(JSON.stringify(object));
    };
    /**
     * Return true if function described by abiItem never modify blockchain state
     * @param abiItem The AbiItem
     */
    Helpers.isNeverModifyBlockchainState = function (abiItem) {
        return (abiItem.constant ||
            abiItem.stateMutability === 'view' ||
            abiItem.stateMutability === 'pure');
    };
    /**
     * Return true if method described by abiItem accepts ether
     * @param abiItem The AbiItem
     */
    Helpers.isAcceptsEther = function (abiItem) {
        return (!this.isNeverModifyBlockchainState(abiItem) &&
            (abiItem.payable || abiItem.stateMutability === 'payable'));
    };
    return Helpers;
}());
exports.default = Helpers;
//# sourceMappingURL=helpers.js.map