"use strict";
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
var commands_1 = __importDefault(require("../commands"));
var command_types_1 = require("../commands/enums/command-types");
var helpers_1 = __importDefault(require("../common/helpers"));
var logger_1 = require("../common/logger");
var execute_1 = require("./execute");
describe('Generator CLI', function () {
    var version = '1.0.0';
    var actionSpy;
    beforeEach(function () {
        actionSpy = spyOn(commands_1.default.generate, 'action').and.callFake(jest.fn());
    });
    describe('execute', function () {
        it('should get the program args', function () { return __awaiter(void 0, void 0, void 0, function () {
            var getProgramArgumentsSpy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        getProgramArgumentsSpy = spyOn(helpers_1.default, 'getProgramArguments').and.callThrough();
                        return [4 /*yield*/, (0, execute_1.execute)(version)];
                    case 1:
                        _a.sent();
                        expect(getProgramArgumentsSpy).toHaveBeenCalledTimes(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should log the version if --version is supplied', function () { return __awaiter(void 0, void 0, void 0, function () {
            var logSpy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spyOn(helpers_1.default, 'getProgramArguments').and.returnValue({
                            options: {
                                version: true,
                            },
                        });
                        logSpy = spyOn(logger_1.Logger, 'log').and.callThrough();
                        return [4 /*yield*/, (0, execute_1.execute)(version)];
                    case 1:
                        _a.sent();
                        expect(logSpy).toHaveBeenCalledTimes(1);
                        expect(logSpy).toHaveBeenCalledWith(version);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should log the version if -v is supplied', function () { return __awaiter(void 0, void 0, void 0, function () {
            var logSpy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spyOn(helpers_1.default, 'getProgramArguments').and.returnValue({
                            options: {
                                v: true,
                            },
                        });
                        logSpy = spyOn(logger_1.Logger, 'log').and.callThrough();
                        return [4 /*yield*/, (0, execute_1.execute)(version)];
                    case 1:
                        _a.sent();
                        expect(logSpy).toHaveBeenCalledTimes(1);
                        expect(logSpy).toHaveBeenCalledWith(version);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should log the help is --help is supplied', function () { return __awaiter(void 0, void 0, void 0, function () {
            var spy, logSpy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spyOn(helpers_1.default, 'getProgramArguments').and.returnValue({
                            options: {
                                help: true,
                            },
                        });
                        spy = spyOn(helpers_1.default, 'getHelpMessageByCommandType').and.callThrough();
                        logSpy = spyOn(logger_1.Logger, 'log').and.callThrough();
                        return [4 /*yield*/, (0, execute_1.execute)(version)];
                    case 1:
                        _a.sent();
                        expect(logSpy).toHaveBeenCalledTimes(1);
                        expect(spy).toHaveBeenCalledTimes(1);
                        expect(spy).toHaveBeenCalledWith(command_types_1.CommandTypes.generate);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should log the help if help is the command', function () { return __awaiter(void 0, void 0, void 0, function () {
            var spy, logSpy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spyOn(helpers_1.default, 'getProgramArguments').and.returnValue({
                            command: 'help',
                            options: {},
                        });
                        spy = spyOn(helpers_1.default, 'getHelpMessageByCommandType').and.callThrough();
                        logSpy = spyOn(logger_1.Logger, 'log').and.callThrough();
                        return [4 /*yield*/, (0, execute_1.execute)(version)];
                    case 1:
                        _a.sent();
                        expect(logSpy).toHaveBeenCalledTimes(1);
                        expect(spy).toHaveBeenCalledTimes(1);
                        expect(spy).toHaveBeenCalledWith(command_types_1.CommandTypes.generate);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should call `commands.generate.action`', function () { return __awaiter(void 0, void 0, void 0, function () {
            var logSpy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logSpy = spyOn(logger_1.Logger, 'log').and.callThrough();
                        spyOn(helpers_1.default, 'getProgramArguments').and.returnValue({
                            command: 'location',
                            subcommands: [],
                            options: {},
                        });
                        return [4 /*yield*/, (0, execute_1.execute)(version)];
                    case 1:
                        _a.sent();
                        expect(actionSpy).toHaveBeenCalledTimes(1);
                        expect(actionSpy).toHaveBeenCalledWith({
                            command: 'location',
                            subcommands: [],
                            options: {},
                        });
                        expect(logSpy).toHaveBeenCalledTimes(0);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=execute.spec.js.map