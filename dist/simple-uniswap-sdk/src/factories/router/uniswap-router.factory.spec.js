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
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var __1 = require("../..");
var coin_gecko_1 = require("../../coin-gecko");
var uniswap_version_1 = require("../../enums/uniswap-version");
var ethers_provider_1 = require("../../ethers-provider");
var aave_token_mock_1 = require("../../mocks/aave-token.mock");
var ethereum_address_mock_1 = require("../../mocks/ethereum-address.mock");
var fun_token_mock_1 = require("../../mocks/fun-token.mock");
var rep_token_mock_1 = require("../../mocks/rep-token.mock");
var uni_token_mock_1 = require("../../mocks/uni-token.mock");
var trade_direction_1 = require("../pair/models/trade-direction");
var uniswap_router_factory_1 = require("./uniswap-router.factory");
describe('UniswapRouterFactory', function () {
    var ethersProvider = new ethers_provider_1.EthersProvider({ chainId: __1.ChainId.MAINNET });
    describe('erc20 > erc20', function () {
        var fromToken = (0, aave_token_mock_1.MOCKAAVE)();
        var toToken = (0, uni_token_mock_1.MOCKUNI)();
        var uniswapRouterFactory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), fromToken, toToken, new __1.UniswapPairSettings(), ethersProvider);
        describe('getAllPossibleRoutes', function () {
            describe('v2', function () {
                it('should get all possible routes', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapRouterFactory.getAllPossibleRoutes()];
                            case 1:
                                result = _a.sent();
                                expect(result.v2.length > 0).toEqual(true);
                                expect(result.v2.filter(function (c) { return c.route.length > 2; }).length > 0).toEqual(true);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('should only return direct routes (in this case return nothing as there is no direct route)', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var factory, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                factory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), fromToken, toToken, new __1.UniswapPairSettings({ disableMultihops: true }), ethersProvider);
                                return [4 /*yield*/, factory.getAllPossibleRoutes()];
                            case 1:
                                result = _a.sent();
                                expect(result.v2.filter(function (c) { return c.route.length > 2; }).length === 0).toEqual(true);
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe('v3', function () {
                it('should get all possible routes', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapRouterFactory.getAllPossibleRoutes()];
                            case 1:
                                result = _a.sent();
                                expect(result.v3.length > 0).toEqual(true);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('should only return direct routes (in this case return nothing as there is no direct route)', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var factory, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                factory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), fromToken, toToken, new __1.UniswapPairSettings({ disableMultihops: true }), ethersProvider);
                                return [4 /*yield*/, factory.getAllPossibleRoutes()];
                            case 1:
                                result = _a.sent();
                                expect(result.v3.filter(function (c) { return c.route.length > 2; }).length === 0).toEqual(true);
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        describe('getAllPossibleRoutesWithQuotes', function () {
            describe(trade_direction_1.TradeDirection.input, function () {
                it('should get all possible routes with quote', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapRouterFactory.getAllPossibleRoutesWithQuotes(new bignumber_js_1.default(1), trade_direction_1.TradeDirection.input)];
                            case 1:
                                result = _a.sent();
                                expect(result.length > 0).toEqual(true);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('should only return direct routes (in this case return nothing as there is no direct route)', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var factory, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                factory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), fromToken, toToken, new __1.UniswapPairSettings({ disableMultihops: true }), ethersProvider);
                                return [4 /*yield*/, factory.getAllPossibleRoutesWithQuotes(new bignumber_js_1.default(1), trade_direction_1.TradeDirection.input)];
                            case 1:
                                result = _a.sent();
                                expect(result.filter(function (c) { return c.routePathArray.length > 2; }).length === 0).toEqual(true);
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe(trade_direction_1.TradeDirection.output, function () {
                it('should get all possible routes with quote', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapRouterFactory.getAllPossibleRoutesWithQuotes(new bignumber_js_1.default(1), trade_direction_1.TradeDirection.output)];
                            case 1:
                                result = _a.sent();
                                expect(result.length > 0).toEqual(true);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('should only return direct routes (in this case return nothing as there is no direct route)', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var factory, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                factory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), fromToken, toToken, new __1.UniswapPairSettings({ disableMultihops: true }), ethersProvider);
                                return [4 /*yield*/, factory.getAllPossibleRoutesWithQuotes(new bignumber_js_1.default(1), trade_direction_1.TradeDirection.output)];
                            case 1:
                                result = _a.sent();
                                expect(result.filter(function (c) { return c.routePathArray.length > 2; }).length === 0).toEqual(true);
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        describe('findBestRoute', function () {
            describe('v2', function () {
                describe(trade_direction_1.TradeDirection.input, function () {
                    it('should find best route', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var factory, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    factory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), (0, fun_token_mock_1.MOCKFUN)(), (0, rep_token_mock_1.MOCKREP)(), new __1.UniswapPairSettings({ uniswapVersions: [uniswap_version_1.UniswapVersion.v2] }), ethersProvider);
                                    return [4 /*yield*/, factory.findBestRoute(new bignumber_js_1.default(10000), trade_direction_1.TradeDirection.input)];
                                case 1:
                                    result = _a.sent();
                                    expect(result.bestRouteQuote.routeText).toEqual('FUN > WETH > REP');
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
                describe(trade_direction_1.TradeDirection.output, function () {
                    it('should find best route', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var factory, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    factory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), (0, fun_token_mock_1.MOCKFUN)(), (0, rep_token_mock_1.MOCKREP)(), new __1.UniswapPairSettings({ uniswapVersions: [uniswap_version_1.UniswapVersion.v2] }), ethersProvider);
                                    return [4 /*yield*/, factory.findBestRoute(new bignumber_js_1.default(50), trade_direction_1.TradeDirection.output)];
                                case 1:
                                    result = _a.sent();
                                    expect(result.bestRouteQuote.routeText).toEqual('FUN > WETH > REP');
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
            });
            describe('v3', function () {
                describe(trade_direction_1.TradeDirection.input, function () {
                    it('should find best route', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var factory, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    factory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), fromToken, toToken, new __1.UniswapPairSettings({ uniswapVersions: [uniswap_version_1.UniswapVersion.v3] }), ethersProvider);
                                    return [4 /*yield*/, factory.findBestRoute(new bignumber_js_1.default(100), trade_direction_1.TradeDirection.input)];
                                case 1:
                                    result = _a.sent();
                                    expect(result.bestRouteQuote.routeText).toEqual('AAVE > UNI');
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
                describe(trade_direction_1.TradeDirection.output, function () {
                    it('should find best route', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var factory, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    factory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), fromToken, toToken, new __1.UniswapPairSettings({ uniswapVersions: [uniswap_version_1.UniswapVersion.v3] }), ethersProvider);
                                    return [4 /*yield*/, factory.findBestRoute(new bignumber_js_1.default(100), trade_direction_1.TradeDirection.output)];
                                case 1:
                                    result = _a.sent();
                                    expect(result.bestRouteQuote.routeText).toEqual('AAVE > UNI');
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
            });
            describe(trade_direction_1.TradeDirection.input, function () {
                it('should find best route', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapRouterFactory.findBestRoute(new bignumber_js_1.default(10000), trade_direction_1.TradeDirection.input)];
                            case 1:
                                result = _a.sent();
                                if (result.bestRouteQuote.uniswapVersion === uniswap_version_1.UniswapVersion.v2) {
                                    expect(result.bestRouteQuote.routeText).toEqual('AAVE > WETH > UNI');
                                }
                                else {
                                    expect(result.bestRouteQuote.routeText).toEqual('AAVE > UNI');
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('should throw an error as there is no best route with disableMultihops turned on', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var factory;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                factory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), (0, fun_token_mock_1.MOCKFUN)(), (0, rep_token_mock_1.MOCKREP)(), new __1.UniswapPairSettings({
                                    uniswapVersions: [uniswap_version_1.UniswapVersion.v2],
                                    disableMultihops: true,
                                }), ethersProvider);
                                return [4 /*yield*/, expect(factory.findBestRoute(new bignumber_js_1.default(100), trade_direction_1.TradeDirection.input)).rejects.toThrowError(new __1.UniswapError("No routes found for " + (0, fun_token_mock_1.MOCKFUN)().symbol + " > " + (0, rep_token_mock_1.MOCKREP)().symbol, __1.ErrorCodes.noRoutesFound))];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe(trade_direction_1.TradeDirection.output, function () {
                it('should find best route', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapRouterFactory.findBestRoute(new bignumber_js_1.default(1000), trade_direction_1.TradeDirection.output)];
                            case 1:
                                result = _a.sent();
                                if (result.bestRouteQuote.uniswapVersion === uniswap_version_1.UniswapVersion.v2) {
                                    expect(result.bestRouteQuote.routeText).toEqual('AAVE > WETH > UNI');
                                }
                                else {
                                    expect(result.bestRouteQuote.routeText).toEqual('AAVE > UNI');
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('should throw an error as there is no best route with disableMultihops turned on', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var factory;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                factory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), (0, fun_token_mock_1.MOCKFUN)(), (0, rep_token_mock_1.MOCKREP)(), new __1.UniswapPairSettings({
                                    uniswapVersions: [uniswap_version_1.UniswapVersion.v2],
                                    disableMultihops: true,
                                }), ethersProvider);
                                return [4 /*yield*/, expect(factory.findBestRoute(new bignumber_js_1.default(100), trade_direction_1.TradeDirection.output)).rejects.toThrowError(new __1.UniswapError("No routes found for " + (0, fun_token_mock_1.MOCKFUN)().symbol + " > " + (0, rep_token_mock_1.MOCKREP)().symbol, __1.ErrorCodes.noRoutesFound))];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
    });
    describe('erc20 > eth', function () {
        var fromToken = (0, aave_token_mock_1.MOCKAAVE)();
        var toToken = __1.ETH.MAINNET();
        var uniswapRouterFactory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), fromToken, toToken, new __1.UniswapPairSettings(), ethersProvider);
        describe('getAllPossibleRoutes', function () {
            describe('v2', function () {
                it('should get all possible routes', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapRouterFactory.getAllPossibleRoutes()];
                            case 1:
                                result = _a.sent();
                                expect(result.v2.length > 0).toEqual(true);
                                expect(result.v2.filter(function (c) { return c.route.length > 2; }).length > 0).toEqual(true);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('should only return direct routes', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var factory, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                factory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), fromToken, toToken, new __1.UniswapPairSettings({
                                    uniswapVersions: [uniswap_version_1.UniswapVersion.v2],
                                    disableMultihops: true,
                                }), ethersProvider);
                                return [4 /*yield*/, factory.getAllPossibleRoutes()];
                            case 1:
                                result = _a.sent();
                                expect(result.v2.length === 1).toEqual(true);
                                expect(result.v2[0].route[0]).toEqual(fromToken);
                                expect(result.v2[0].route[1]).toEqual(toToken);
                                expect(result.v2.filter(function (c) { return c.route.length > 2; }).length > 0).toEqual(false);
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe('v3', function () {
                it('should get all possible routes', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapRouterFactory.getAllPossibleRoutes()];
                            case 1:
                                result = _a.sent();
                                expect(result.v3.length > 0).toEqual(true);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('should only return direct routes', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var factory, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                factory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), fromToken, toToken, new __1.UniswapPairSettings({
                                    uniswapVersions: [uniswap_version_1.UniswapVersion.v3],
                                    disableMultihops: true,
                                }), ethersProvider);
                                return [4 /*yield*/, factory.getAllPossibleRoutes()];
                            case 1:
                                result = _a.sent();
                                expect(result.v3[0].route[0]).toEqual(fromToken);
                                expect(result.v3[0].route[1]).toEqual(toToken);
                                expect(result.v3.filter(function (c) { return c.route.length > 2; }).length > 0).toEqual(false);
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        describe('getAllPossibleRoutesWithQuotes', function () {
            describe(trade_direction_1.TradeDirection.output, function () {
                it('should get all possible routes with quote', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapRouterFactory.getAllPossibleRoutesWithQuotes(new bignumber_js_1.default(1), trade_direction_1.TradeDirection.output)];
                            case 1:
                                result = _a.sent();
                                expect(result.length > 0).toEqual(true);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('should only return direct routes', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var factory, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                factory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), fromToken, toToken, new __1.UniswapPairSettings({ disableMultihops: true }), ethersProvider);
                                return [4 /*yield*/, factory.getAllPossibleRoutesWithQuotes(new bignumber_js_1.default(1), trade_direction_1.TradeDirection.output)];
                            case 1:
                                result = _a.sent();
                                expect(result.filter(function (c) { return c.routePathArray.length > 2; }).length > 0).toEqual(false);
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe(trade_direction_1.TradeDirection.input, function () {
                it('should get all possible routes with quote', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapRouterFactory.getAllPossibleRoutesWithQuotes(new bignumber_js_1.default(1), trade_direction_1.TradeDirection.input)];
                            case 1:
                                result = _a.sent();
                                expect(result.length > 0).toEqual(true);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('should only return direct routes', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var factory, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                factory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), fromToken, toToken, new __1.UniswapPairSettings({ disableMultihops: true }), ethersProvider);
                                return [4 /*yield*/, factory.getAllPossibleRoutesWithQuotes(new bignumber_js_1.default(1), trade_direction_1.TradeDirection.input)];
                            case 1:
                                result = _a.sent();
                                expect(result.filter(function (c) { return c.routePathArray.length > 2; }).length > 0).toEqual(false);
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        describe('findBestRoute', function () {
            describe('v2', function () {
                describe(trade_direction_1.TradeDirection.input, function () {
                    it('should find best route', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var factory, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    factory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), (0, fun_token_mock_1.MOCKFUN)(), toToken, new __1.UniswapPairSettings({ uniswapVersions: [uniswap_version_1.UniswapVersion.v2] }), ethersProvider);
                                    return [4 /*yield*/, factory.findBestRoute(new bignumber_js_1.default(10000000), trade_direction_1.TradeDirection.input)];
                                case 1:
                                    result = _a.sent();
                                    expect(result.bestRouteQuote.routeText).not.toBeUndefined();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
                describe(trade_direction_1.TradeDirection.output, function () {
                    it('should find best route', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var factory, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    factory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), (0, fun_token_mock_1.MOCKFUN)(), toToken, new __1.UniswapPairSettings({ uniswapVersions: [uniswap_version_1.UniswapVersion.v2] }), ethersProvider);
                                    return [4 /*yield*/, factory.findBestRoute(new bignumber_js_1.default(1), trade_direction_1.TradeDirection.output)];
                                case 1:
                                    result = _a.sent();
                                    expect(result.bestRouteQuote.routeText).toEqual('FUN > ETH');
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
            });
            describe('v3', function () {
                describe(trade_direction_1.TradeDirection.input, function () {
                    it('should find best route', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var factory, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    factory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), (0, aave_token_mock_1.MOCKAAVE)(), toToken, new __1.UniswapPairSettings({ uniswapVersions: [uniswap_version_1.UniswapVersion.v3] }), ethersProvider);
                                    return [4 /*yield*/, factory.findBestRoute(new bignumber_js_1.default(10000), trade_direction_1.TradeDirection.input)];
                                case 1:
                                    result = _a.sent();
                                    expect(result.bestRouteQuote.routeText).toEqual('AAVE > ETH');
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
                describe(trade_direction_1.TradeDirection.output, function () {
                    it('should find best route', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var factory, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    factory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), (0, aave_token_mock_1.MOCKAAVE)(), toToken, new __1.UniswapPairSettings({ uniswapVersions: [uniswap_version_1.UniswapVersion.v3] }), ethersProvider);
                                    return [4 /*yield*/, factory.findBestRoute(new bignumber_js_1.default(1), trade_direction_1.TradeDirection.output)];
                                case 1:
                                    result = _a.sent();
                                    expect(result.bestRouteQuote.routeText).toEqual('AAVE > ETH');
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
            });
            describe(trade_direction_1.TradeDirection.input, function () {
                it('should find best route', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapRouterFactory.findBestRoute(new bignumber_js_1.default(100), trade_direction_1.TradeDirection.input)];
                            case 1:
                                result = _a.sent();
                                expect(result.bestRouteQuote.routeText).not.toBeUndefined();
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('should return best route', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var factory, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                factory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), fromToken, toToken, new __1.UniswapPairSettings({
                                    uniswapVersions: [uniswap_version_1.UniswapVersion.v2, uniswap_version_1.UniswapVersion.v3],
                                }), ethersProvider);
                                return [4 /*yield*/, factory.findBestRoute(new bignumber_js_1.default(100), trade_direction_1.TradeDirection.input)];
                            case 1:
                                result = _a.sent();
                                expect(result.bestRouteQuote.routeText).toEqual('AAVE > ETH');
                                expect(result.triedRoutesQuote.filter(function (c) { return c.routePathArray.length > 2; })
                                    .length > 0).toEqual(true);
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe(trade_direction_1.TradeDirection.output, function () {
                it('should find best route', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapRouterFactory.findBestRoute(new bignumber_js_1.default(100), trade_direction_1.TradeDirection.output)];
                            case 1:
                                result = _a.sent();
                                expect(result.bestRouteQuote.routeText).toEqual('AAVE > ETH');
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('should return best route', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var factory, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                factory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), fromToken, toToken, new __1.UniswapPairSettings({
                                    uniswapVersions: [uniswap_version_1.UniswapVersion.v2, uniswap_version_1.UniswapVersion.v3],
                                }), ethersProvider);
                                return [4 /*yield*/, factory.findBestRoute(new bignumber_js_1.default(100), trade_direction_1.TradeDirection.output)];
                            case 1:
                                result = _a.sent();
                                expect(result.bestRouteQuote.routeText).toEqual('AAVE > ETH');
                                expect(result.triedRoutesQuote.filter(function (c) { return c.routePathArray.length > 2; })
                                    .length > 0).toEqual(false);
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
    });
    describe('eth > erc20', function () {
        var fromToken = __1.ETH.MAINNET();
        var toToken = (0, aave_token_mock_1.MOCKAAVE)();
        var uniswapRouterFactory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), fromToken, toToken, new __1.UniswapPairSettings({
            uniswapVersions: [uniswap_version_1.UniswapVersion.v2, uniswap_version_1.UniswapVersion.v3],
        }), ethersProvider);
        describe('getAllPossibleRoutes', function () {
            describe('v2', function () {
                it('should get all possible routes', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapRouterFactory.getAllPossibleRoutes()];
                            case 1:
                                result = _a.sent();
                                expect(result.v2.length > 0).toEqual(true);
                                expect(result.v2.filter(function (c) { return c.route.length > 2; }).length > 0).toEqual(true);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('should only return direct routes', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var factory, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                factory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), fromToken, toToken, new __1.UniswapPairSettings({
                                    uniswapVersions: [uniswap_version_1.UniswapVersion.v2],
                                    disableMultihops: true,
                                }), ethersProvider);
                                return [4 /*yield*/, factory.getAllPossibleRoutes()];
                            case 1:
                                result = _a.sent();
                                expect(result.v2.length === 1).toEqual(true);
                                expect(result.v2[0].route[0]).toEqual(fromToken);
                                expect(result.v2[0].route[1]).toEqual(toToken);
                                expect(result.v2.filter(function (c) { return c.route.length > 2; }).length === 0).toEqual(true);
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe('v3', function () {
                it('should get all possible routes', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapRouterFactory.getAllPossibleRoutes()];
                            case 1:
                                result = _a.sent();
                                expect(result.v3.length > 0).toEqual(true);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('should only return direct routes', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var factory, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                factory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), fromToken, toToken, new __1.UniswapPairSettings({
                                    uniswapVersions: [uniswap_version_1.UniswapVersion.v3],
                                    disableMultihops: true,
                                }), ethersProvider);
                                return [4 /*yield*/, factory.getAllPossibleRoutes()];
                            case 1:
                                result = _a.sent();
                                expect(result.v3[0].route[0]).toEqual(fromToken);
                                expect(result.v3[0].route[1]).toEqual(toToken);
                                expect(result.v3.filter(function (c) { return c.route.length > 2; }).length === 0).toEqual(true);
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        describe('getAllPossibleRoutesWithQuotes', function () {
            describe(trade_direction_1.TradeDirection.input, function () {
                it('should get all possible routes with quote', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapRouterFactory.getAllPossibleRoutesWithQuotes(new bignumber_js_1.default(1), trade_direction_1.TradeDirection.input)];
                            case 1:
                                result = _a.sent();
                                expect(result.length > 0).toEqual(true);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('should only return direct routes', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var factory, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                factory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), fromToken, toToken, new __1.UniswapPairSettings({
                                    uniswapVersions: [uniswap_version_1.UniswapVersion.v2, uniswap_version_1.UniswapVersion.v3],
                                    disableMultihops: true,
                                }), ethersProvider);
                                return [4 /*yield*/, factory.getAllPossibleRoutesWithQuotes(new bignumber_js_1.default(1), trade_direction_1.TradeDirection.input)];
                            case 1:
                                result = _a.sent();
                                expect(result.filter(function (c) { return c.routePathArray.length > 2; }).length > 0).toEqual(false);
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe(trade_direction_1.TradeDirection.output, function () {
                it('should get all possible routes with quote', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapRouterFactory.getAllPossibleRoutesWithQuotes(new bignumber_js_1.default(1), trade_direction_1.TradeDirection.output)];
                            case 1:
                                result = _a.sent();
                                expect(result.length > 0).toEqual(true);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('should only return direct routes', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var factory, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                factory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), fromToken, toToken, new __1.UniswapPairSettings({
                                    uniswapVersions: [uniswap_version_1.UniswapVersion.v2, uniswap_version_1.UniswapVersion.v3],
                                    disableMultihops: true,
                                }), ethersProvider);
                                return [4 /*yield*/, factory.getAllPossibleRoutesWithQuotes(new bignumber_js_1.default(1), trade_direction_1.TradeDirection.output)];
                            case 1:
                                result = _a.sent();
                                expect(result.filter(function (c) { return c.routePathArray.length > 2; }).length > 0).toEqual(false);
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        describe('findBestRoute', function () {
            describe('v2', function () {
                describe(trade_direction_1.TradeDirection.input, function () {
                    it('should find best route', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var factory, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    factory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), fromToken, (0, fun_token_mock_1.MOCKFUN)(), new __1.UniswapPairSettings({
                                        uniswapVersions: [uniswap_version_1.UniswapVersion.v2],
                                    }), ethersProvider);
                                    return [4 /*yield*/, factory.findBestRoute(new bignumber_js_1.default(10000), trade_direction_1.TradeDirection.input)];
                                case 1:
                                    result = _a.sent();
                                    expect(result.bestRouteQuote.routeText).not.toBeUndefined();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
                describe(trade_direction_1.TradeDirection.output, function () {
                    it('should find best route', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var factory, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    factory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), fromToken, (0, fun_token_mock_1.MOCKFUN)(), new __1.UniswapPairSettings({
                                        uniswapVersions: [uniswap_version_1.UniswapVersion.v2],
                                    }), ethersProvider);
                                    return [4 /*yield*/, factory.findBestRoute(new bignumber_js_1.default(10000), trade_direction_1.TradeDirection.output)];
                                case 1:
                                    result = _a.sent();
                                    expect(result.bestRouteQuote.routeText).toEqual('ETH > FUN');
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
            });
            describe('v3', function () {
                describe(trade_direction_1.TradeDirection.input, function () {
                    it('should find best route', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var factory, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    factory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), fromToken, toToken, new __1.UniswapPairSettings({
                                        uniswapVersions: [uniswap_version_1.UniswapVersion.v3],
                                    }), ethersProvider);
                                    return [4 /*yield*/, factory.findBestRoute(new bignumber_js_1.default(100), trade_direction_1.TradeDirection.input)];
                                case 1:
                                    result = _a.sent();
                                    expect(result.bestRouteQuote.routeText).toEqual('ETH > AAVE');
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
                describe(trade_direction_1.TradeDirection.output, function () {
                    it('should find best route', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var factory, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    factory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), fromToken, toToken, new __1.UniswapPairSettings({
                                        uniswapVersions: [uniswap_version_1.UniswapVersion.v3],
                                    }), ethersProvider);
                                    return [4 /*yield*/, factory.findBestRoute(new bignumber_js_1.default(100), trade_direction_1.TradeDirection.output)];
                                case 1:
                                    result = _a.sent();
                                    expect(result.bestRouteQuote.routeText).toEqual('ETH > AAVE');
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
            });
            describe(trade_direction_1.TradeDirection.input, function () {
                it('should find best route', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapRouterFactory.findBestRoute(new bignumber_js_1.default(100), trade_direction_1.TradeDirection.input)];
                            case 1:
                                result = _a.sent();
                                expect(result.bestRouteQuote.routeText).not.toBeUndefined();
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('should return best route', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var factory, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                factory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), fromToken, toToken, new __1.UniswapPairSettings({
                                    uniswapVersions: [uniswap_version_1.UniswapVersion.v2, uniswap_version_1.UniswapVersion.v3],
                                }), ethersProvider);
                                return [4 /*yield*/, factory.findBestRoute(new bignumber_js_1.default(100), trade_direction_1.TradeDirection.input)];
                            case 1:
                                result = _a.sent();
                                expect(result.bestRouteQuote.routeText).toEqual('ETH > AAVE');
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe(trade_direction_1.TradeDirection.output, function () {
                it('should find best route', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, uniswapRouterFactory.findBestRoute(new bignumber_js_1.default(100), trade_direction_1.TradeDirection.output)];
                            case 1:
                                result = _a.sent();
                                expect(result.bestRouteQuote.routeText).toEqual('ETH > AAVE');
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('should return best route', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var factory, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                factory = new uniswap_router_factory_1.UniswapRouterFactory(new coin_gecko_1.CoinGecko(), (0, ethereum_address_mock_1.MockEthereumAddress)(), fromToken, toToken, new __1.UniswapPairSettings({
                                    uniswapVersions: [uniswap_version_1.UniswapVersion.v2, uniswap_version_1.UniswapVersion.v3],
                                }), ethersProvider);
                                return [4 /*yield*/, factory.findBestRoute(new bignumber_js_1.default(100), trade_direction_1.TradeDirection.output)];
                            case 1:
                                result = _a.sent();
                                expect(result.bestRouteQuote.routeText).toEqual('ETH > AAVE');
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
    });
});
//# sourceMappingURL=uniswap-router.factory.spec.js.map