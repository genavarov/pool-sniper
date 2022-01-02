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
var __1 = require("../..");
var tokens_1 = require("../../common/tokens");
var ethers_provider_1 = require("../../ethers-provider");
var ethereum_address_mock_1 = require("../../mocks/ethereum-address.mock");
var fun_token_mock_1 = require("../../mocks/fun-token.mock");
var rep_token_mock_1 = require("../../mocks/rep-token.mock");
var tokens_factory_1 = require("./tokens.factory");
describe('TokensFactory', function () {
    var ethersProvider = new ethers_provider_1.EthersProvider({ chainId: __1.ChainId.MAINNET });
    var tokensFactory = new tokens_factory_1.TokensFactory(ethersProvider);
    describe('getTokens', function () {
        it('should return correct token info', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tokensFactory.getTokens([
                            tokens_1.ETH.MAINNET().contractAddress,
                            (0, fun_token_mock_1.MOCKFUN)().contractAddress,
                            (0, rep_token_mock_1.MOCKREP)().contractAddress,
                        ])];
                    case 1:
                        result = _a.sent();
                        expect(result[0]).toEqual(tokens_1.ETH.MAINNET());
                        expect(result[1]).toEqual((0, fun_token_mock_1.MOCKFUN)());
                        expect(result[2]).toEqual((0, rep_token_mock_1.MOCKREP)());
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw error if 1 of the contract addresses are invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, expect(tokensFactory.getTokens([
                            '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E722c',
                            (0, rep_token_mock_1.MOCKREP)().contractAddress,
                        ])).rejects.toThrowError(new __1.UniswapError('invalid from or to contract tokens', __1.ErrorCodes.invalidFromOrToContractToken))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('getAllowanceAndBalanceOfForContracts', function () {
        it('should return correct info - formatted', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tokensFactory.getAllowanceAndBalanceOfForContracts((0, ethereum_address_mock_1.MockEthereumAddress)(), [
                            tokens_1.ETH.MAINNET().contractAddress,
                            (0, fun_token_mock_1.MOCKFUN)().contractAddress,
                            (0, rep_token_mock_1.MOCKREP)().contractAddress,
                        ], true)];
                    case 1:
                        result = _a.sent();
                        expect(result[0]).toEqual({
                            token: tokens_1.ETH.MAINNET(),
                            allowanceAndBalanceOf: {
                                allowanceV2: '115792089237316195423570985008687907853269984665640564039457.584007913129639935',
                                allowanceV3: '115792089237316195423570985008687907853269984665640564039457.584007913129639935',
                                balanceOf: '0',
                            },
                        });
                        expect(result[1]).toEqual({
                            token: (0, fun_token_mock_1.MOCKFUN)(),
                            allowanceAndBalanceOf: {
                                allowanceV2: '99997899.4322',
                                allowanceV3: '0',
                                balanceOf: '0',
                            },
                        });
                        expect(result[2]).toEqual({
                            token: (0, rep_token_mock_1.MOCKREP)(),
                            allowanceAndBalanceOf: {
                                allowanceV2: '0',
                                allowanceV3: '0',
                                balanceOf: '0',
                            },
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return correct info - unformatted', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tokensFactory.getAllowanceAndBalanceOfForContracts((0, ethereum_address_mock_1.MockEthereumAddress)(), [
                            tokens_1.ETH.MAINNET().contractAddress,
                            (0, fun_token_mock_1.MOCKFUN)().contractAddress,
                            (0, rep_token_mock_1.MOCKREP)().contractAddress,
                        ], false)];
                    case 1:
                        result = _a.sent();
                        expect(result[0]).toEqual({
                            token: tokens_1.ETH.MAINNET(),
                            allowanceAndBalanceOf: {
                                allowanceV2: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
                                allowanceV3: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
                                balanceOf: '0x00',
                            },
                        });
                        expect(result[1]).toEqual({
                            token: (0, fun_token_mock_1.MOCKFUN)(),
                            allowanceAndBalanceOf: {
                                allowanceV2: '0x2386c18764e720',
                                allowanceV3: '0x00',
                                balanceOf: '0x00',
                            },
                        });
                        expect(result[2]).toEqual({
                            token: (0, rep_token_mock_1.MOCKREP)(),
                            allowanceAndBalanceOf: {
                                allowanceV2: '0x00',
                                allowanceV3: '0x00',
                                balanceOf: '0x00',
                            },
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=tokens.factory.spec.js.map