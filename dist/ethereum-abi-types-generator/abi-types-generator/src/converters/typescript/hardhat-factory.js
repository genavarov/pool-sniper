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
exports.HardhatFactory = void 0;
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var logger_1 = require("../../common/logger");
var abi_generator_1 = __importDefault(require("./abi-generator"));
var helpers_1 = __importDefault(require("./common/helpers"));
var provider_1 = require("./enums/provider");
var HardhatFactory = /** @class */ (function () {
    function HardhatFactory() {
    }
    /**
     * Generate all hardhat contract typings
     */
    HardhatFactory.prototype.generate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var contracts, abiFilesPaths, saveTypingsFolder, i, generateResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contracts = helpers_1.default.buildExecutingPath('./artifacts/contracts');
                        if (!helpers_1.default.isDirectory(contracts)) {
                            throw new Error('can not find the artifacts > contracts directory please make sure you run this command on the route of the project and have compiled your smart contracts');
                        }
                        return [4 /*yield*/, this.buildAbiFilesPathContext(contracts)];
                    case 1:
                        abiFilesPaths = _a.sent();
                        if (abiFilesPaths.length === 0) {
                            logger_1.Logger.log('No contracts found in artifacts > contracts please make sure you have compiled your smart contracts');
                            return [2 /*return*/, undefined];
                        }
                        saveTypingsFolder = helpers_1.default.buildExecutingPath('./ethereum-abi-types');
                        if (!fs_extra_1.default.existsSync(saveTypingsFolder)) {
                            fs_extra_1.default.mkdirSync(saveTypingsFolder);
                        }
                        for (i = 0; i < abiFilesPaths.length; i++) {
                            generateResponse = new abi_generator_1.default({
                                provider: provider_1.Provider.ethers_v5,
                                abiFileLocation: abiFilesPaths[i].path,
                                outputPathDirectory: saveTypingsFolder,
                                name: abiFilesPaths[i].contractName,
                            }).generate();
                            logger_1.Logger.log("successfully created typings for abi file " + generateResponse.abiJsonFileLocation + " saved in " + generateResponse.outputLocation);
                        }
                        return [2 /*return*/, saveTypingsFolder];
                }
            });
        });
    };
    /**
     * Build abi files path context
     * @param directoryPath The directory path
     * @param abiFiles The abi files
     */
    HardhatFactory.prototype.buildAbiFilesPathContext = function (directoryPath, abiFiles) {
        if (abiFiles === void 0) { abiFiles = []; }
        return __awaiter(this, void 0, void 0, function () {
            var folder, i, item, itemPath, metadata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs_extra_1.default.promises.readdir(directoryPath)];
                    case 1:
                        folder = _a.sent();
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < folder.length)) return [3 /*break*/, 6];
                        item = folder[i];
                        itemPath = path_1.default.join(directoryPath, item);
                        if (!helpers_1.default.isDirectory(itemPath)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.buildAbiFilesPathContext(itemPath, abiFiles)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        if (item.includes('.json')) {
                            try {
                                metadata = JSON.parse(fs_extra_1.default.readFileSync(itemPath, 'utf8'));
                                if (metadata.abi && Array.isArray(metadata.abi)) {
                                    abiFiles.push({
                                        path: itemPath,
                                        contractName: metadata.contractName,
                                    });
                                }
                            }
                            catch (error) {
                                // mute it
                            }
                        }
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 2];
                    case 6: return [2 /*return*/, abiFiles];
                }
            });
        });
    };
    return HardhatFactory;
}());
exports.HardhatFactory = HardhatFactory;
//# sourceMappingURL=hardhat-factory.js.map