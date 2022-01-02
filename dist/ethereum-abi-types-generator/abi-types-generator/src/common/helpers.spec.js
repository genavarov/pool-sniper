"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var command_types_1 = require("../commands/enums/command-types");
var help_messages_1 = require("../commands/help-messages");
var helpers_1 = __importDefault(require("./helpers"));
describe('Helpers', function () {
    describe('capitalize', function () {
        it('should return null if null is sent to the value', function () {
            // tslint:disable-next-line: no-any
            expect(helpers_1.default.capitalize(null)).toEqual(null);
        });
        it('should convert `hey` > `Hey`', function () {
            expect(helpers_1.default.capitalize('hey')).toEqual('Hey');
        });
    });
    describe('getProgramArguments', function () {
        it('should return jests cli execution objects running', function () {
            expect(helpers_1.default.getProgramArguments()).toHaveProperty('command');
            expect(helpers_1.default.getProgramArguments()).toHaveProperty('options');
            expect(helpers_1.default.getProgramArguments()).toHaveProperty('subcommands');
        });
    });
    describe('getHelpMessageByCommandType', function () {
        it('should throw a error if command is not a type', function () {
            expect(function () {
                // tslint:disable-next-line: no-any
                helpers_1.default.getHelpMessageByCommandType('incorrect');
            }).toThrow(Error);
        });
        it('should build a help message by calling `buildUpHelpMessage` returning a string', function () {
            var spy = spyOn(helpers_1.default, 'buildUpHelpMessage').and.callThrough();
            var message = helpers_1.default.getHelpMessageByCommandType(command_types_1.CommandTypes.generate);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(message.length).toBeGreaterThan(0);
        });
    });
    describe('buildUpHelpMessage', function () {
        it('should render the correct output message', function () {
            var helperMessageObject = helpers_1.default.deepClone(help_messages_1.generateHelpMessages);
            helperMessageObject.commands.push('test');
            var result = helpers_1.default.buildUpHelpMessage(helperMessageObject);
            expect(result.includes('Usage')).toEqual(true);
            expect(result.includes('Commands')).toEqual(true);
            expect(result.includes('Examples')).toEqual(true);
        });
        it('should render the correct output message with no commands', function () {
            var helperMessageObject = help_messages_1.generateHelpMessages;
            helperMessageObject.commands = [];
            var result = helpers_1.default.buildUpHelpMessage(helperMessageObject);
            expect(result.includes('Usage')).toEqual(true);
            expect(result.includes('Commands')).toEqual(false);
            expect(result.includes('Examples')).toEqual(true);
        });
    });
    describe('removeAllWhiteSpace', function () {
        it('should remove all white spaces from the string', function () {
            expect(helpers_1.default.removeAllWhiteSpace('  test      test   me')).toEqual('testtestme');
        });
    });
    describe('deepClone', function () {
        it('should deep clone a object', function () {
            var foo = { bar: true };
            var clone = helpers_1.default.deepClone(foo);
            clone.bar = false;
            expect(foo).not.toEqual(clone);
        });
    });
});
//# sourceMappingURL=helpers.spec.js.map