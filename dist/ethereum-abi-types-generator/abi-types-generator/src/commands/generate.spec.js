"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commands = require(".");
var helpers_1 = __importDefault(require("../common/helpers"));
var logger_1 = require("../common/logger");
var abi_generator_1 = __importDefault(require("../converters/typescript/abi-generator"));
var command_types_1 = require("./enums/command-types");
var programOptions = {
    command: 'abi/abi.json',
    subcommands: [],
    options: {},
};
var MockAbiGenerator = /** @class */ (function (_super) {
    __extends(MockAbiGenerator, _super);
    function MockAbiGenerator() {
        // tslint:disable-next-line: no-any
        return _super.call(this, null) || this;
    }
    MockAbiGenerator.prototype.generate = function () {
        return {
            outputLocation: 'test-output-location',
            abiJsonFileLocation: programOptions.command,
        };
    };
    return MockAbiGenerator;
}(abi_generator_1.default));
describe('Generate', function () {
    var command = commands.generate;
    beforeEach(function () {
        // @ts-ignore
        abi_generator_1.default = MockAbiGenerator;
    });
    it('should have the action object exported', function () {
        expect(command).toHaveProperty('action');
    });
    it('should log a message if no command are passed in', function () { return __awaiter(void 0, void 0, void 0, function () {
        var logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logSpy = spyOn(logger_1.Logger, 'log').and.callThrough();
                    // tslint:disable-next-line: no-any
                    return [4 /*yield*/, command.action({ command: undefined })];
                case 1:
                    // tslint:disable-next-line: no-any
                    _a.sent();
                    expect(logSpy).toHaveBeenCalledTimes(1);
                    expect(logSpy).toHaveBeenCalledWith(helpers_1.default.getHelpMessageByCommandType(command_types_1.CommandTypes.generate));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should log a message if command is an empty string', function () { return __awaiter(void 0, void 0, void 0, function () {
        var logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logSpy = spyOn(logger_1.Logger, 'log').and.callThrough();
                    // tslint:disable-next-line: no-any
                    return [4 /*yield*/, command.action({ command: '' })];
                case 1:
                    // tslint:disable-next-line: no-any
                    _a.sent();
                    expect(logSpy).toHaveBeenCalledTimes(1);
                    expect(logSpy).toHaveBeenCalledWith(helpers_1.default.getHelpMessageByCommandType(command_types_1.CommandTypes.generate));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should call log an error if language is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var logErrorSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logErrorSpy = spyOn(logger_1.Logger, 'error').and.callThrough();
                    return [4 /*yield*/, command.action({
                            command: 'abi/abi.json',
                            subcommands: [],
                            options: { lang: 'blah' },
                        })];
                case 1:
                    _a.sent();
                    expect(logErrorSpy).toHaveBeenCalledTimes(1);
                    expect(logErrorSpy).toHaveBeenCalledWith('"blah" is not supported. Support languages are - \'ts\'');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should on success log success message and nothing else', function () { return __awaiter(void 0, void 0, void 0, function () {
        var logErrorSpy, logSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logErrorSpy = spyOn(logger_1.Logger, 'error').and.callThrough();
                    logSpy = spyOn(logger_1.Logger, 'log').and.callThrough();
                    return [4 /*yield*/, command.action(programOptions)];
                case 1:
                    _a.sent();
                    expect(logErrorSpy).toHaveBeenCalledTimes(0);
                    expect(logSpy).toHaveBeenCalledTimes(1);
                    expect(logSpy).toHaveBeenCalledWith('successfully created typings for abi file abi/abi.json saved in test-output-location');
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=generate.spec.js.map