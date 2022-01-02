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
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("ethers/lib/utils");
var __1 = require("../../..");
var fun_token_mock_1 = require("../../../mocks/fun-token.mock");
var uniswap_contract_factory_v2_public_1 = require("./uniswap-contract.factory.v2.public");
describe('UniswapContractFactoryV2Public', function () {
    var uniswapContractFactoryPublic = new uniswap_contract_factory_v2_public_1.UniswapContractFactoryV2Public({
        chainId: __1.ChainId.MAINNET,
    });
    it('allPairs', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, uniswapContractFactoryPublic.allPairs('0x01')];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual('0x3139Ffc91B99aa94DA8A2dc13f1fC36F9BDc98eE');
                    return [2 /*return*/];
            }
        });
    }); });
    it('allPairsLength', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, uniswapContractFactoryPublic.allPairsLength()];
                case 1:
                    result = _a.sent();
                    expect((0, utils_1.isHexString)(result)).toEqual(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('createPair', function () {
        var result = uniswapContractFactoryPublic.createPair((0, fun_token_mock_1.MOCKFUN)().contractAddress, __1.WETHContract.MAINNET().contractAddress);
        expect(result).toEqual('0xc9c65396000000000000000000000000419d0d8bdd9af5e606ae2232ed285aff190e711b000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2');
    });
    it('feeTo', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, uniswapContractFactoryPublic.feeTo()];
                case 1:
                    result = _a.sent();
                    expect((0, utils_1.isHexString)(result)).toEqual(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('feeToSetter', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, uniswapContractFactoryPublic.feeToSetter()];
                case 1:
                    result = _a.sent();
                    expect((0, utils_1.isHexString)(result)).toEqual(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('getPair', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, uniswapContractFactoryPublic.getPair(__1.WETHContract.MAINNET().contractAddress, (0, fun_token_mock_1.MOCKFUN)().contractAddress)];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual('0x05B0c1D8839eF3a989B33B6b63D3aA96cB7Ec142');
                    return [2 /*return*/];
            }
        });
    }); });
    it('setFeeTo', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, uniswapContractFactoryPublic.setFeeTo('0x05B0c1D8839eF3a989B33B6b63D3aA96cB7Ec142')];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual('0xf46901ed00000000000000000000000005b0c1d8839ef3a989b33b6b63d3aa96cb7ec142');
                    return [2 /*return*/];
            }
        });
    }); });
    it('setFeeToSetter', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, uniswapContractFactoryPublic.setFeeToSetter('0x05B0c1D8839eF3a989B33B6b63D3aA96cB7Ec142')];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual('0xa2e74af600000000000000000000000005b0c1d8839ef3a989b33b6b63d3aa96cb7ec142');
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=uniswap-contract.factory.public.v2.spec.js.map