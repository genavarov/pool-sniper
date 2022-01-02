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
exports.UniswapPairFactory = void 0;
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var rxjs_1 = require("rxjs");
var constants_1 = require("../../common/constants");
var error_codes_1 = require("../../common/errors/error-codes");
var uniswap_error_1 = require("../../common/errors/uniswap-error");
var eth_1 = require("../../common/tokens/eth");
var deep_clone_1 = require("../../common/utils/deep-clone");
var trade_path_1 = require("../../common/utils/trade-path");
var trade_path_2 = require("../../enums/trade-path");
var uniswap_version_1 = require("../../enums/uniswap-version");
var get_uniswap_contracts_1 = require("../../uniswap-contract-context/get-uniswap-contracts");
var uniswap_router_factory_1 = require("../router/uniswap-router.factory");
var token_factory_1 = require("../token/token.factory");
var trade_direction_1 = require("./models/trade-direction");
var UniswapPairFactory = /** @class */ (function () {
    function UniswapPairFactory(_coinGecko, _uniswapPairFactoryContext) {
        this._coinGecko = _coinGecko;
        this._uniswapPairFactoryContext = _uniswapPairFactoryContext;
        this._fromTokenFactory = new token_factory_1.TokenFactory(this._uniswapPairFactoryContext.fromToken.contractAddress, this._uniswapPairFactoryContext.ethersProvider, this._uniswapPairFactoryContext.settings.customNetwork, this._uniswapPairFactoryContext.settings.cloneUniswapContractDetails);
        this._toTokenFactory = new token_factory_1.TokenFactory(this._uniswapPairFactoryContext.toToken.contractAddress, this._uniswapPairFactoryContext.ethersProvider, this._uniswapPairFactoryContext.settings.customNetwork);
        this._uniswapRouterFactory = new uniswap_router_factory_1.UniswapRouterFactory(this._coinGecko, this._uniswapPairFactoryContext.ethereumAddress, this._uniswapPairFactoryContext.fromToken, this._uniswapPairFactoryContext.toToken, this._uniswapPairFactoryContext.settings, this._uniswapPairFactoryContext.ethersProvider);
        this._watchingBlocks = false;
        this._quoteChanged$ = new rxjs_1.Subject();
    }
    Object.defineProperty(UniswapPairFactory.prototype, "toToken", {
        /**
         * The to token
         */
        get: function () {
            return this._uniswapPairFactoryContext.toToken;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniswapPairFactory.prototype, "fromToken", {
        /**
         * The from token
         */
        get: function () {
            return this._uniswapPairFactoryContext.fromToken;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniswapPairFactory.prototype, "providerUrl", {
        /**
         * Get the provider url
         */
        get: function () {
            return this._uniswapPairFactoryContext.ethersProvider.getProviderUrl();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Get the to token balance
     */
    UniswapPairFactory.prototype.getFromTokenBalance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ethBalanceContext, erc20BalanceContext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.tradePath() === trade_path_2.TradePath.ethToErc20)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._uniswapRouterFactory.getEthBalance()];
                    case 1:
                        ethBalanceContext = _a.sent();
                        return [2 /*return*/, ethBalanceContext.toFixed()];
                    case 2: return [4 /*yield*/, this._fromTokenFactory.balanceOf(this._uniswapPairFactoryContext.ethereumAddress)];
                    case 3:
                        erc20BalanceContext = _a.sent();
                        return [2 /*return*/, new bignumber_js_1.default(erc20BalanceContext)
                                .shiftedBy(this.fromToken.decimals * -1)
                                .toFixed()];
                }
            });
        });
    };
    /**
     * Get the to token balance
     */
    UniswapPairFactory.prototype.getToTokenBalance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ethBalanceContext, erc20BalanceContext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.tradePath() === trade_path_2.TradePath.erc20ToEth)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._uniswapRouterFactory.getEthBalance()];
                    case 1:
                        ethBalanceContext = _a.sent();
                        return [2 /*return*/, ethBalanceContext.toFixed()];
                    case 2: return [4 /*yield*/, this._toTokenFactory.balanceOf(this._uniswapPairFactoryContext.ethereumAddress)];
                    case 3:
                        erc20BalanceContext = _a.sent();
                        return [2 /*return*/, new bignumber_js_1.default(erc20BalanceContext)
                                .shiftedBy(this.toToken.decimals * -1)
                                .toFixed()];
                }
            });
        });
    };
    /**
     * Execute the trade path
     * @param amount The amount
     * @param direction The direction you want to get the quote from
     */
    UniswapPairFactory.prototype.executeTradePath = function (amount, direction) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.tradePath();
                        switch (_a) {
                            case trade_path_2.TradePath.erc20ToEth: return [3 /*break*/, 1];
                            case trade_path_2.TradePath.ethToErc20: return [3 /*break*/, 3];
                            case trade_path_2.TradePath.erc20ToErc20: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 1: return [4 /*yield*/, this.findBestPriceAndPathErc20ToEth(amount, direction)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: return [4 /*yield*/, this.findBestPriceAndPathEthToErc20(amount, direction)];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5: return [4 /*yield*/, this.findBestPriceAndPathErc20ToErc20(amount, direction)];
                    case 6: return [2 /*return*/, _b.sent()];
                    case 7: throw new uniswap_error_1.UniswapError(this.tradePath() + " is not defined", error_codes_1.ErrorCodes.tradePathIsNotSupported);
                }
            });
        });
    };
    /**
     * Destroy the trade instance watchers + subscriptions
     */
    UniswapPairFactory.prototype.destroy = function () {
        for (var i = 0; i < this._quoteChanged$.observers.length; i++) {
            this._quoteChanged$.observers[i].complete();
        }
        this.unwatchTradePrice();
    };
    /**
     * Generate trade - this will return amount but you still need to send the transaction
     * if you want it to be executed on the blockchain
     * @param amount The amount you want to swap
     * @param direction The direction you want to get the quote from
     */
    UniswapPairFactory.prototype.trade = function (amount, direction) {
        if (direction === void 0) { direction = trade_direction_1.TradeDirection.input; }
        return __awaiter(this, void 0, void 0, function () {
            var trade;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.destroy();
                        return [4 /*yield*/, this.executeTradePath(new bignumber_js_1.default(amount), direction)];
                    case 1:
                        trade = _a.sent();
                        this._currentTradeContext = this.buildCurrentTradeContext(trade);
                        this.watchTradePrice();
                        return [2 /*return*/, trade];
                }
            });
        });
    };
    /**
     * Find the best route rate out of all the route quotes
     * @param amountToTrade The amount to trade
     * @param direction The direction you want to get the quote from
     */
    UniswapPairFactory.prototype.findBestRoute = function (amountToTrade, direction) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._routes.findBestRoute(new bignumber_js_1.default(amountToTrade), direction)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Find the best route rate out of all the route quotes
     * @param amountToTrade The amount to trade
     * @param direction The direction you want to get the quote from
     */
    UniswapPairFactory.prototype.findAllPossibleRoutesWithQuote = function (amountToTrade, direction) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._routes.getAllPossibleRoutesWithQuotes(new bignumber_js_1.default(amountToTrade), direction)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Find all possible routes
     */
    UniswapPairFactory.prototype.findAllPossibleRoutes = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._routes.getAllPossibleRoutes()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get the allowance and balance for the from token (erc20 > blah) only
     */
    UniswapPairFactory.prototype.getAllowanceAndBalanceOfForFromToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._fromTokenFactory.getAllowanceAndBalanceOf(this._uniswapPairFactoryContext.ethereumAddress)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get the allowance and balance for to from token (eth > erc20) only
     * @param uniswapVersion The uniswap version
     */
    UniswapPairFactory.prototype.getAllowanceAndBalanceOfForToToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._toTokenFactory.getAllowanceAndBalanceOf(this._uniswapPairFactoryContext.ethereumAddress)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get the allowance for the amount which can be moved from the `fromToken`
     * on the users behalf. Only valid when the `fromToken` is a ERC20 token.
     * @param uniswapVersion The uniswap version
     */
    UniswapPairFactory.prototype.allowance = function (uniswapVersion) {
        return __awaiter(this, void 0, void 0, function () {
            var allowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.tradePath() === trade_path_2.TradePath.ethToErc20) {
                            return [2 /*return*/, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'];
                        }
                        return [4 /*yield*/, this._fromTokenFactory.allowance(uniswapVersion, this._uniswapPairFactoryContext.ethereumAddress)];
                    case 1:
                        allowance = _a.sent();
                        return [2 /*return*/, allowance];
                }
            });
        });
    };
    /**
     * Generate the from token approve data max allowance to move the tokens.
     * This will return the data for you to send as a transaction
     * @param uniswapVersion The uniswap version
     */
    UniswapPairFactory.prototype.generateApproveMaxAllowanceData = function (uniswapVersion) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                if (this.tradePath() === trade_path_2.TradePath.ethToErc20) {
                    throw new uniswap_error_1.UniswapError('You do not need to generate approve uniswap allowance when doing eth > erc20', error_codes_1.ErrorCodes.generateApproveMaxAllowanceDataNotAllowed);
                }
                data = this._fromTokenFactory.generateApproveAllowanceData(uniswapVersion === uniswap_version_1.UniswapVersion.v2
                    ? get_uniswap_contracts_1.uniswapContracts.v2.getRouterAddress(this._uniswapPairFactoryContext.settings.cloneUniswapContractDetails)
                    : get_uniswap_contracts_1.uniswapContracts.v3.getRouterAddress(this._uniswapPairFactoryContext.settings.cloneUniswapContractDetails), '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
                return [2 /*return*/, {
                        to: this.fromToken.contractAddress,
                        from: this._uniswapPairFactoryContext.ethereumAddress,
                        data: data,
                        value: constants_1.Constants.EMPTY_HEX_STRING,
                    }];
            });
        });
    };
    Object.defineProperty(UniswapPairFactory.prototype, "_routes", {
        /**
         * Route getter
         */
        get: function () {
            return this._uniswapRouterFactory;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Build the current trade context
     * @param trade The trade context
     */
    UniswapPairFactory.prototype.buildCurrentTradeContext = function (trade) {
        return (0, deep_clone_1.deepClone)({
            baseConvertRequest: trade.baseConvertRequest,
            expectedConvertQuote: trade.expectedConvertQuote,
            quoteDirection: trade.quoteDirection,
            fromToken: trade.fromToken,
            toToken: trade.toToken,
            liquidityProviderFee: trade.liquidityProviderFee,
            transaction: trade.transaction,
            routeText: trade.routeText,
            tradeExpires: trade.tradeExpires,
        });
    };
    /**
     * finds the best price and path for Erc20ToEth
     * @param baseConvertRequest The base convert request can be both input or output direction
     * @param direction The direction you want to get the quote from
     */
    UniswapPairFactory.prototype.findBestPriceAndPathErc20ToEth = function (baseConvertRequest, direction) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var bestRouteQuotes, bestRouteQuote, tradeContext, _c;
            var _d;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this._routes.findBestRoute(baseConvertRequest, direction)];
                    case 1:
                        bestRouteQuotes = _e.sent();
                        bestRouteQuote = bestRouteQuotes.bestRouteQuote;
                        _d = {
                            uniswapVersion: bestRouteQuote.uniswapVersion,
                            quoteDirection: direction,
                            baseConvertRequest: baseConvertRequest.toFixed(),
                            minAmountConvertQuote: direction === trade_direction_1.TradeDirection.input
                                ? bestRouteQuote.expectedConvertQuoteOrTokenAmountInMaxWithSlippage
                                : null,
                            maximumSent: direction === trade_direction_1.TradeDirection.input
                                ? null
                                : bestRouteQuote.expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
                            expectedConvertQuote: bestRouteQuote.expectedConvertQuote,
                            liquidityProviderFee: direction === trade_direction_1.TradeDirection.input
                                ? baseConvertRequest
                                    .times(bestRouteQuote.liquidityProviderFee)
                                    .toFixed(this.fromToken.decimals)
                                : new bignumber_js_1.default(bestRouteQuote.expectedConvertQuote)
                                    .times(bestRouteQuote.liquidityProviderFee)
                                    .toFixed(this.fromToken.decimals),
                            liquidityProviderFeePercent: bestRouteQuote.liquidityProviderFee,
                            tradeExpires: bestRouteQuote.tradeExpires,
                            routePathTokenMap: bestRouteQuote.routePathArrayTokenMap,
                            routeText: bestRouteQuote.routeText,
                            routePath: bestRouteQuote.routePathArray.map(function (r) {
                                return (0, eth_1.removeEthFromContractAddress)(r);
                            }),
                            hasEnoughAllowance: bestRouteQuotes.hasEnoughAllowance
                        };
                        if (!!bestRouteQuotes.hasEnoughAllowance) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.generateApproveMaxAllowanceData(bestRouteQuote.uniswapVersion)];
                    case 2:
                        _c = _e.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _c = undefined;
                        _e.label = 4;
                    case 4:
                        tradeContext = (_d.approvalTransaction = _c,
                            _d.toToken = (0, eth_1.turnTokenIntoEthForResponse)(this.toToken, (_b = (_a = this._uniswapPairFactoryContext.settings) === null || _a === void 0 ? void 0 : _a.customNetwork) === null || _b === void 0 ? void 0 : _b.nativeCurrency),
                            _d.toBalance = new bignumber_js_1.default(bestRouteQuotes.toBalance)
                                .shiftedBy(this.toToken.decimals * -1)
                                .toFixed(),
                            _d.fromToken = this.fromToken,
                            _d.fromBalance = {
                                hasEnough: bestRouteQuotes.hasEnoughBalance,
                                balance: bestRouteQuotes.fromBalance,
                            },
                            _d.transaction = bestRouteQuote.transaction,
                            _d.gasPriceEstimatedBy = bestRouteQuote.gasPriceEstimatedBy,
                            _d.allTriedRoutesQuotes = bestRouteQuotes.triedRoutesQuote,
                            _d.quoteChanged$ = this._quoteChanged$,
                            _d.destroy = function () { return _this.destroy(); },
                            _d);
                        return [2 /*return*/, tradeContext];
                }
            });
        });
    };
    /**
     * finds the best price and path for Erc20ToErc20
     * @param baseConvertRequest The base convert request can be both input or output direction
     * @param direction The direction you want to get the quote from
     */
    UniswapPairFactory.prototype.findBestPriceAndPathErc20ToErc20 = function (baseConvertRequest, direction) {
        return __awaiter(this, void 0, void 0, function () {
            var bestRouteQuotes, bestRouteQuote, tradeContext, _a;
            var _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this._routes.findBestRoute(baseConvertRequest, direction)];
                    case 1:
                        bestRouteQuotes = _c.sent();
                        bestRouteQuote = bestRouteQuotes.bestRouteQuote;
                        _b = {
                            uniswapVersion: bestRouteQuote.uniswapVersion,
                            quoteDirection: direction,
                            baseConvertRequest: baseConvertRequest.toFixed(),
                            minAmountConvertQuote: direction === trade_direction_1.TradeDirection.input
                                ? bestRouteQuote.expectedConvertQuoteOrTokenAmountInMaxWithSlippage
                                : null,
                            maximumSent: direction === trade_direction_1.TradeDirection.input
                                ? null
                                : bestRouteQuote.expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
                            expectedConvertQuote: bestRouteQuote.expectedConvertQuote,
                            liquidityProviderFee: direction === trade_direction_1.TradeDirection.input
                                ? baseConvertRequest
                                    .times(bestRouteQuote.liquidityProviderFee)
                                    .toFixed(this.fromToken.decimals)
                                : new bignumber_js_1.default(bestRouteQuote.expectedConvertQuote)
                                    .times(bestRouteQuote.liquidityProviderFee)
                                    .toFixed(this.fromToken.decimals),
                            liquidityProviderFeePercent: bestRouteQuote.liquidityProviderFee,
                            tradeExpires: bestRouteQuote.tradeExpires,
                            routePathTokenMap: bestRouteQuote.routePathArrayTokenMap,
                            routeText: bestRouteQuote.routeText,
                            routePath: bestRouteQuote.routePathArray,
                            hasEnoughAllowance: bestRouteQuotes.hasEnoughAllowance
                        };
                        if (!!bestRouteQuotes.hasEnoughAllowance) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.generateApproveMaxAllowanceData(bestRouteQuote.uniswapVersion)];
                    case 2:
                        _a = _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = undefined;
                        _c.label = 4;
                    case 4:
                        tradeContext = (_b.approvalTransaction = _a,
                            _b.toToken = this.toToken,
                            _b.toBalance = new bignumber_js_1.default(bestRouteQuotes.toBalance)
                                .shiftedBy(this.toToken.decimals * -1)
                                .toFixed(),
                            _b.fromToken = this.fromToken,
                            _b.fromBalance = {
                                hasEnough: bestRouteQuotes.hasEnoughBalance,
                                balance: bestRouteQuotes.fromBalance,
                            },
                            _b.transaction = bestRouteQuote.transaction,
                            _b.gasPriceEstimatedBy = bestRouteQuote.gasPriceEstimatedBy,
                            _b.allTriedRoutesQuotes = bestRouteQuotes.triedRoutesQuote,
                            _b.quoteChanged$ = this._quoteChanged$,
                            _b.destroy = function () { return _this.destroy(); },
                            _b);
                        return [2 /*return*/, tradeContext];
                }
            });
        });
    };
    /**
     * Find the best price and route path to take (will round down the slippage)
     * @param baseConvertRequest The base convert request can be both input or output direction
     * @param direction The direction you want to get the quote from
     */
    UniswapPairFactory.prototype.findBestPriceAndPathEthToErc20 = function (baseConvertRequest, direction) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var bestRouteQuotes, bestRouteQuote, tradeContext;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this._routes.findBestRoute(baseConvertRequest, direction)];
                    case 1:
                        bestRouteQuotes = _c.sent();
                        bestRouteQuote = bestRouteQuotes.bestRouteQuote;
                        tradeContext = {
                            uniswapVersion: bestRouteQuote.uniswapVersion,
                            quoteDirection: direction,
                            baseConvertRequest: baseConvertRequest.toFixed(),
                            minAmountConvertQuote: direction === trade_direction_1.TradeDirection.input
                                ? bestRouteQuote.expectedConvertQuoteOrTokenAmountInMaxWithSlippage
                                : null,
                            maximumSent: direction === trade_direction_1.TradeDirection.input
                                ? null
                                : bestRouteQuote.expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
                            expectedConvertQuote: bestRouteQuote.expectedConvertQuote,
                            liquidityProviderFee: direction === trade_direction_1.TradeDirection.input
                                ? baseConvertRequest
                                    .times(bestRouteQuote.liquidityProviderFee)
                                    .toFixed(this.fromToken.decimals)
                                : new bignumber_js_1.default(bestRouteQuote.expectedConvertQuote)
                                    .times(bestRouteQuote.liquidityProviderFee)
                                    .toFixed(this.fromToken.decimals),
                            liquidityProviderFeePercent: bestRouteQuote.liquidityProviderFee,
                            tradeExpires: bestRouteQuote.tradeExpires,
                            routePathTokenMap: bestRouteQuote.routePathArrayTokenMap,
                            routeText: bestRouteQuote.routeText,
                            routePath: bestRouteQuote.routePathArray.map(function (r) {
                                return (0, eth_1.removeEthFromContractAddress)(r);
                            }),
                            hasEnoughAllowance: true,
                            toToken: this.toToken,
                            toBalance: new bignumber_js_1.default(bestRouteQuotes.toBalance)
                                .shiftedBy(this.toToken.decimals * -1)
                                .toFixed(),
                            fromToken: (0, eth_1.turnTokenIntoEthForResponse)(this.fromToken, (_b = (_a = this._uniswapPairFactoryContext.settings) === null || _a === void 0 ? void 0 : _a.customNetwork) === null || _b === void 0 ? void 0 : _b.nativeCurrency),
                            fromBalance: {
                                hasEnough: bestRouteQuotes.hasEnoughBalance,
                                balance: bestRouteQuotes.fromBalance,
                            },
                            transaction: bestRouteQuote.transaction,
                            gasPriceEstimatedBy: bestRouteQuote.gasPriceEstimatedBy,
                            allTriedRoutesQuotes: bestRouteQuotes.triedRoutesQuote,
                            quoteChanged$: this._quoteChanged$,
                            destroy: function () { return _this.destroy(); },
                        };
                        return [2 /*return*/, tradeContext];
                }
            });
        });
    };
    /**
     * Get the trade path
     */
    UniswapPairFactory.prototype.tradePath = function () {
        var _a;
        var network = this._uniswapPairFactoryContext.ethersProvider.network();
        return (0, trade_path_1.getTradePath)(network.chainId, this.fromToken, this.toToken, (_a = this._uniswapPairFactoryContext.settings.customNetwork) === null || _a === void 0 ? void 0 : _a.nativeWrappedTokenInfo);
    };
    /**
     * Watch trade price move automatically emitting the stream if it changes
     */
    UniswapPairFactory.prototype.watchTradePrice = function () {
        var _this = this;
        if (!this._watchingBlocks) {
            this._uniswapPairFactoryContext.ethersProvider.provider.on('block', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.handleNewBlock()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            this._watchingBlocks = true;
        }
    };
    /**
     * unwatch any block streams
     */
    UniswapPairFactory.prototype.unwatchTradePrice = function () {
        this._uniswapPairFactoryContext.ethersProvider.provider.removeAllListeners('block');
        this._watchingBlocks = false;
    };
    /**
     * Handle new block for the trade price moving automatically emitting the stream if it changes
     */
    UniswapPairFactory.prototype.handleNewBlock = function () {
        return __awaiter(this, void 0, void 0, function () {
            var trade;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this._quoteChanged$.observers.length > 0 && this._currentTradeContext)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.executeTradePath(new bignumber_js_1.default(this._currentTradeContext.baseConvertRequest), this._currentTradeContext.quoteDirection)];
                    case 1:
                        trade = _a.sent();
                        if (trade.fromToken.contractAddress ===
                            this._currentTradeContext.fromToken.contractAddress &&
                            trade.toToken.contractAddress ===
                                this._currentTradeContext.toToken.contractAddress &&
                            trade.transaction.from ===
                                this._uniswapPairFactoryContext.ethereumAddress) {
                            if (trade.expectedConvertQuote !==
                                this._currentTradeContext.expectedConvertQuote ||
                                trade.routeText !== this._currentTradeContext.routeText ||
                                trade.liquidityProviderFee !==
                                    this._currentTradeContext.liquidityProviderFee ||
                                this._currentTradeContext.tradeExpires >
                                    this._uniswapRouterFactory.generateTradeDeadlineUnixTime()) {
                                this._currentTradeContext = this.buildCurrentTradeContext(trade);
                                this._quoteChanged$.next(trade);
                            }
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return UniswapPairFactory;
}());
exports.UniswapPairFactory = UniswapPairFactory;
//# sourceMappingURL=uniswap-pair.factory.js.map