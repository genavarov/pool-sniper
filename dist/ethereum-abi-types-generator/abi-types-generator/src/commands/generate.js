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
var helpers_1 = __importDefault(require("../common/helpers"));
var logger_1 = require("../common/logger");
var converter_type_1 = require("../converters/enums/converter-type");
var abi_generator_1 = __importDefault(require("../converters/typescript/abi-generator"));
var provider_1 = require("../converters/typescript/enums/provider");
var hardhat_factory_1 = require("../converters/typescript/hardhat-factory");
var command_types_1 = require("./enums/command-types");
var help = helpers_1.default.getHelpMessageByCommandType(command_types_1.CommandTypes.generate);
module.exports = {
    action: function (cmd) {
        return __awaiter(this, void 0, void 0, function () {
            var language, _a, response, generateResponse, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!cmd.command || cmd.command.length === 0) {
                            return [2 /*return*/, logger_1.Logger.log(help)];
                        }
                        language = cmd.options.lang || converter_type_1.ConverterType.ts;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, , 9]);
                        _a = language;
                        switch (_a) {
                            case converter_type_1.ConverterType.ts: return [3 /*break*/, 2];
                        }
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(cmd.command === 'hardhat')) return [3 /*break*/, 4];
                        return [4 /*yield*/, new hardhat_factory_1.HardhatFactory().generate()];
                    case 3:
                        response = _b.sent();
                        if (response) {
                            logger_1.Logger.log("successfully created typings for all contracts for hardhat, these are saved in " + response);
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        generateResponse = new abi_generator_1.default({
                            provider: cmd.options.provider || provider_1.Provider.web3,
                            abiFileLocation: cmd.command,
                            outputPathDirectory: cmd.options.output,
                            name: cmd.options.name,
                            watch: cmd.options.watch !== undefined,
                        }).generate();
                        logger_1.Logger.log("successfully created typings for abi file " + generateResponse.abiJsonFileLocation + " saved in " + generateResponse.outputLocation);
                        _b.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        logger_1.Logger.error("\"" + language + "\" is not supported. Support languages are - 'ts'");
                        return [2 /*return*/];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_1 = _b.sent();
                        logger_1.Logger.error(error_1.message);
                        return [2 /*return*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    },
};
//# sourceMappingURL=generate.js.map