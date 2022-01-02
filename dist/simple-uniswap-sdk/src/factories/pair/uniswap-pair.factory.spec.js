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
var coin_gecko_1 = require("../../coin-gecko");
var uniswap_version_1 = require("../../enums/uniswap-version");
var ethers_provider_1 = require("../../ethers-provider");
var ethereum_address_mock_1 = require("../../mocks/ethereum-address.mock");
var fun_token_mock_1 = require("../../mocks/fun-token.mock");
var provider_url_mock_1 = require("../../mocks/provider-url.mock");
var rep_token_mock_1 = require("../../mocks/rep-token.mock");
var trade_direction_1 = require("./models/trade-direction");
describe('UniswapPairFactory', function () {
    var ethersProvider = new ethers_provider_1.EthersProvider({
        chainId: __1.ChainId.MAINNET,
        providerUrl: (0, provider_url_mock_1.MOCK_PROVIDER_URL)(),
    });
    describe('erc20 > erc20', function () {
        var uniswapPairFactoryContext = {
            fromToken: (0, fun_token_mock_1.MOCKFUN)(),
            toToken: (0, rep_token_mock_1.MOCKREP)(),
            ethereumAddress: (0, ethereum_address_mock_1.MockEthereumAddress)(),
            settings: new __1.UniswapPairSettings(),
            ethersProvider: ethersProvider,
        };
        var uniswapPairFactory = new __1.UniswapPairFactory(new coin_gecko_1.CoinGecko(), uniswapPairFactoryContext);
        it('`toToken` should retun correctly', function () {
            expect(uniswapPairFactory.toToken).toEqual(uniswapPairFactoryContext.toToken);
        });
        it('`fromToken` should retun correctly', function () {
            expect(uniswapPairFactory.fromToken).toEqual(uniswapPairFactoryContext.fromToken);
        });
        describe('trade', function () {
            it('should return trade info', function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, uniswapPairFactory.trade('1')];
                        case 1:
                            result = _a.sent();
                            expect(result).not.toBeUndefined();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('findBestRoute', function () {
            describe(trade_direction_1.TradeDirection.input, function () {
                it('should return the best route', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapPairFactory.findBestRoute('1', trade_direction_1.TradeDirection.input)];
                            case 1:
                                result = _a.sent();
                                expect(result).not.toBeUndefined();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe(trade_direction_1.TradeDirection.output, function () {
                it('should return the best route', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapPairFactory.findBestRoute('1', trade_direction_1.TradeDirection.output)];
                            case 1:
                                result = _a.sent();
                                expect(result).not.toBeUndefined();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        describe('findAllPossibleRoutesWithQuote', function () {
            describe(trade_direction_1.TradeDirection.input, function () {
                it('should return all possible routes with quotes', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapPairFactory.findAllPossibleRoutesWithQuote('1', trade_direction_1.TradeDirection.input)];
                            case 1:
                                result = _a.sent();
                                expect(result).not.toBeUndefined();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe(trade_direction_1.TradeDirection.output, function () {
                it('should return all possible routes with quotes', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapPairFactory.findAllPossibleRoutesWithQuote('1', trade_direction_1.TradeDirection.output)];
                            case 1:
                                result = _a.sent();
                                expect(result).not.toBeUndefined();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        describe('findAllPossibleRoutes', function () {
            it('should return all possible routes', function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, uniswapPairFactory.findAllPossibleRoutes()];
                        case 1:
                            result = _a.sent();
                            expect(result).not.toBeUndefined();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('allowance', function () {
            describe('v2', function () {
                it('should return more then 0', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var factory, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                factory = new __1.UniswapPairFactory(new coin_gecko_1.CoinGecko(), {
                                    fromToken: (0, fun_token_mock_1.MOCKFUN)(),
                                    toToken: (0, rep_token_mock_1.MOCKREP)(),
                                    ethereumAddress: '0x5ab9d116a53ef41063e3eae26a7ebe736720e9ba',
                                    settings: new __1.UniswapPairSettings(),
                                    ethersProvider: ethersProvider,
                                });
                                return [4 /*yield*/, factory.allowance(uniswap_version_1.UniswapVersion.v2)];
                            case 1:
                                result = _a.sent();
                                expect(result).not.toEqual('0x00');
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('should return 0 allowance', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var factory, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                factory = new __1.UniswapPairFactory(new coin_gecko_1.CoinGecko(), {
                                    fromToken: (0, rep_token_mock_1.MOCKREP)(),
                                    toToken: (0, fun_token_mock_1.MOCKFUN)(),
                                    ethereumAddress: (0, ethereum_address_mock_1.MockEthereumAddress)(),
                                    settings: new __1.UniswapPairSettings(),
                                    ethersProvider: ethersProvider,
                                });
                                return [4 /*yield*/, factory.allowance(uniswap_version_1.UniswapVersion.v2)];
                            case 1:
                                result = _a.sent();
                                expect(result).toEqual('0x00');
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe('v3', function () {
                xit('should return more then 0', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var factory, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                factory = new __1.UniswapPairFactory(new coin_gecko_1.CoinGecko(), {
                                    fromToken: (0, fun_token_mock_1.MOCKFUN)(),
                                    toToken: (0, rep_token_mock_1.MOCKREP)(),
                                    ethereumAddress: '0x5ab9d116a53ef41063e3eae26a7ebe736720e9ba',
                                    settings: new __1.UniswapPairSettings(),
                                    ethersProvider: ethersProvider,
                                });
                                return [4 /*yield*/, factory.allowance(uniswap_version_1.UniswapVersion.v3)];
                            case 1:
                                result = _a.sent();
                                expect(result).not.toEqual('0x00');
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('should return 0 allowance', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var factory, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                factory = new __1.UniswapPairFactory(new coin_gecko_1.CoinGecko(), {
                                    fromToken: (0, rep_token_mock_1.MOCKREP)(),
                                    toToken: (0, fun_token_mock_1.MOCKFUN)(),
                                    ethereumAddress: (0, ethereum_address_mock_1.MockEthereumAddress)(),
                                    settings: new __1.UniswapPairSettings(),
                                    ethersProvider: ethersProvider,
                                });
                                return [4 /*yield*/, factory.allowance(uniswap_version_1.UniswapVersion.v3)];
                            case 1:
                                result = _a.sent();
                                expect(result).toEqual('0x00');
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        describe('generateApproveMaxAllowanceData', function () {
            describe('v2', function () {
                it('should generate the approve max allowance data', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapPairFactory.generateApproveMaxAllowanceData(uniswap_version_1.UniswapVersion.v2)];
                            case 1:
                                result = _a.sent();
                                expect(result).toEqual({
                                    data: '0x095ea7b30000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
                                    from: '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9',
                                    to: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
                                    value: '0x00',
                                });
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe('v2', function () {
                it('should generate the approve max allowance data', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapPairFactory.generateApproveMaxAllowanceData(uniswap_version_1.UniswapVersion.v3)];
                            case 1:
                                result = _a.sent();
                                expect(result).toEqual({
                                    data: '0x095ea7b3000000000000000000000000e592427a0aece92de3edee1f18e0157c05861564ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
                                    from: '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9',
                                    to: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
                                    value: '0x00',
                                });
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
    });
    describe('erc20 > eth', function () {
        var uniswapPairFactoryContext = {
            fromToken: (0, fun_token_mock_1.MOCKFUN)(),
            toToken: __1.ETH.MAINNET(),
            ethereumAddress: (0, ethereum_address_mock_1.MockEthereumAddress)(),
            settings: new __1.UniswapPairSettings(),
            ethersProvider: ethersProvider,
        };
        var uniswapPairFactory = new __1.UniswapPairFactory(new coin_gecko_1.CoinGecko(), uniswapPairFactoryContext);
        it('`toToken` should retun correctly', function () {
            expect(uniswapPairFactory.toToken).toEqual(uniswapPairFactoryContext.toToken);
        });
        it('`fromToken` should retun correctly', function () {
            expect(uniswapPairFactory.fromToken).toEqual(uniswapPairFactoryContext.fromToken);
        });
        describe('trade', function () {
            it('should return trade info', function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, uniswapPairFactory.trade('1')];
                        case 1:
                            result = _a.sent();
                            expect(result).not.toBeUndefined();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('findBestRoute', function () {
            describe(trade_direction_1.TradeDirection.input, function () {
                it('should return the best route', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapPairFactory.findBestRoute('1', trade_direction_1.TradeDirection.input)];
                            case 1:
                                result = _a.sent();
                                expect(result).not.toBeUndefined();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe(trade_direction_1.TradeDirection.output, function () {
                it('should return the best route', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapPairFactory.findBestRoute('1', trade_direction_1.TradeDirection.output)];
                            case 1:
                                result = _a.sent();
                                expect(result).not.toBeUndefined();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        describe('findAllPossibleRoutesWithQuote', function () {
            describe(trade_direction_1.TradeDirection.input, function () {
                it('should return all possible routes with quotes', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapPairFactory.findAllPossibleRoutesWithQuote('1', trade_direction_1.TradeDirection.input)];
                            case 1:
                                result = _a.sent();
                                expect(result).not.toBeUndefined();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe(trade_direction_1.TradeDirection.output, function () {
                it('should return all possible routes with quotes', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapPairFactory.findAllPossibleRoutesWithQuote('1', trade_direction_1.TradeDirection.output)];
                            case 1:
                                result = _a.sent();
                                expect(result).not.toBeUndefined();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        describe('findAllPossibleRoutes', function () {
            it('should return all possible routes', function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, uniswapPairFactory.findAllPossibleRoutes()];
                        case 1:
                            result = _a.sent();
                            expect(result).not.toBeUndefined();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('allowance', function () {
            describe('v2', function () {
                it('should return more then 0', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var factory, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                factory = new __1.UniswapPairFactory(new coin_gecko_1.CoinGecko(), {
                                    fromToken: (0, fun_token_mock_1.MOCKFUN)(),
                                    toToken: __1.ETH.MAINNET(),
                                    ethereumAddress: '0x5ab9d116a53ef41063e3eae26a7ebe736720e9ba',
                                    settings: new __1.UniswapPairSettings(),
                                    ethersProvider: ethersProvider,
                                });
                                return [4 /*yield*/, factory.allowance(uniswap_version_1.UniswapVersion.v2)];
                            case 1:
                                result = _a.sent();
                                expect(result).not.toEqual('0x00');
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('should return 0 allowance', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var factory, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                factory = new __1.UniswapPairFactory(new coin_gecko_1.CoinGecko(), {
                                    fromToken: (0, rep_token_mock_1.MOCKREP)(),
                                    toToken: __1.ETH.MAINNET(),
                                    ethereumAddress: (0, ethereum_address_mock_1.MockEthereumAddress)(),
                                    settings: new __1.UniswapPairSettings(),
                                    ethersProvider: ethersProvider,
                                });
                                return [4 /*yield*/, factory.allowance(uniswap_version_1.UniswapVersion.v2)];
                            case 1:
                                result = _a.sent();
                                expect(result).toEqual('0x00');
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe('v3', function () {
                xit('should return more then 0', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var factory, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                factory = new __1.UniswapPairFactory(new coin_gecko_1.CoinGecko(), {
                                    fromToken: (0, fun_token_mock_1.MOCKFUN)(),
                                    toToken: __1.ETH.MAINNET(),
                                    ethereumAddress: '0x5ab9d116a53ef41063e3eae26a7ebe736720e9ba',
                                    settings: new __1.UniswapPairSettings(),
                                    ethersProvider: ethersProvider,
                                });
                                return [4 /*yield*/, factory.allowance(uniswap_version_1.UniswapVersion.v3)];
                            case 1:
                                result = _a.sent();
                                expect(result).not.toEqual('0x00');
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('should return 0 allowance', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var factory, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                factory = new __1.UniswapPairFactory(new coin_gecko_1.CoinGecko(), {
                                    fromToken: (0, rep_token_mock_1.MOCKREP)(),
                                    toToken: __1.ETH.MAINNET(),
                                    ethereumAddress: (0, ethereum_address_mock_1.MockEthereumAddress)(),
                                    settings: new __1.UniswapPairSettings(),
                                    ethersProvider: ethersProvider,
                                });
                                return [4 /*yield*/, factory.allowance(uniswap_version_1.UniswapVersion.v3)];
                            case 1:
                                result = _a.sent();
                                expect(result).toEqual('0x00');
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        describe('generateApproveMaxAllowanceData', function () {
            describe('v2', function () {
                it('should generate the approve max allowance data', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapPairFactory.generateApproveMaxAllowanceData(uniswap_version_1.UniswapVersion.v2)];
                            case 1:
                                result = _a.sent();
                                expect(result).toEqual({
                                    data: '0x095ea7b30000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
                                    from: '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9',
                                    to: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
                                    value: '0x00',
                                });
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe('v3', function () {
                it('should generate the approve max allowance data', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapPairFactory.generateApproveMaxAllowanceData(uniswap_version_1.UniswapVersion.v3)];
                            case 1:
                                result = _a.sent();
                                expect(result).toEqual({
                                    data: '0x095ea7b3000000000000000000000000e592427a0aece92de3edee1f18e0157c05861564ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
                                    from: '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9',
                                    to: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
                                    value: '0x00',
                                });
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
    });
    describe('eth > erc20', function () {
        var uniswapPairFactoryContext = {
            fromToken: __1.ETH.MAINNET(),
            toToken: (0, fun_token_mock_1.MOCKFUN)(),
            ethereumAddress: (0, ethereum_address_mock_1.MockEthereumAddress)(),
            settings: new __1.UniswapPairSettings(),
            ethersProvider: ethersProvider,
        };
        var uniswapPairFactory = new __1.UniswapPairFactory(new coin_gecko_1.CoinGecko(), uniswapPairFactoryContext);
        it('`toToken` should retun correctly', function () {
            expect(uniswapPairFactory.toToken).toEqual(uniswapPairFactoryContext.toToken);
        });
        it('`fromToken` should retun correctly', function () {
            expect(uniswapPairFactory.fromToken).toEqual(uniswapPairFactoryContext.fromToken);
        });
        describe('trade', function () {
            it('should return trade info', function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, uniswapPairFactory.trade('1')];
                        case 1:
                            result = _a.sent();
                            expect(result).not.toBeUndefined();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('findBestRoute', function () {
            describe(trade_direction_1.TradeDirection.input, function () {
                it('should return the best route', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapPairFactory.findBestRoute('1', trade_direction_1.TradeDirection.input)];
                            case 1:
                                result = _a.sent();
                                expect(result).not.toBeUndefined();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe(trade_direction_1.TradeDirection.output, function () {
                it('should return the best route', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapPairFactory.findBestRoute('1', trade_direction_1.TradeDirection.output)];
                            case 1:
                                result = _a.sent();
                                expect(result).not.toBeUndefined();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        describe('findAllPossibleRoutesWithQuote', function () {
            describe(trade_direction_1.TradeDirection.input, function () {
                it('should return all possible routes with quotes', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapPairFactory.findAllPossibleRoutesWithQuote('1', trade_direction_1.TradeDirection.input)];
                            case 1:
                                result = _a.sent();
                                expect(result).not.toBeUndefined();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe(trade_direction_1.TradeDirection.output, function () {
                it('should return all possible routes with quotes', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapPairFactory.findAllPossibleRoutesWithQuote('1', trade_direction_1.TradeDirection.output)];
                            case 1:
                                result = _a.sent();
                                expect(result).not.toBeUndefined();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        describe('findAllPossibleRoutes', function () {
            it('should return all possible routes', function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, uniswapPairFactory.findAllPossibleRoutes()];
                        case 1:
                            result = _a.sent();
                            expect(result).not.toBeUndefined();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('allowance', function () {
            describe('v2', function () {
                it('should always return max hex', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapPairFactory.allowance(uniswap_version_1.UniswapVersion.v2)];
                            case 1:
                                result = _a.sent();
                                expect(result).toEqual('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe('v3', function () {
                it('should always return max hex', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapPairFactory.allowance(uniswap_version_1.UniswapVersion.v3)];
                            case 1:
                                result = _a.sent();
                                expect(result).toEqual('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        describe('generateApproveMaxAllowanceData', function () {
            describe('v2', function () {
                it('should throw when generating the approve max allowance data', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, expect(uniswapPairFactory.generateApproveMaxAllowanceData(uniswap_version_1.UniswapVersion.v2)).rejects.toThrowError(new __1.UniswapError('You do not need to generate approve uniswap allowance when doing eth > erc20', __1.ErrorCodes.generateApproveMaxAllowanceDataNotAllowed))];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe('v3', function () {
                it('should throw when generating the approve max allowance data', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, expect(uniswapPairFactory.generateApproveMaxAllowanceData(uniswap_version_1.UniswapVersion.v3)).rejects.toThrowError(new __1.UniswapError('You do not need to generate approve uniswap allowance when doing eth > erc20', __1.ErrorCodes.generateApproveMaxAllowanceDataNotAllowed))];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
    });
});
//# sourceMappingURL=uniswap-pair.factory.spec.js.map