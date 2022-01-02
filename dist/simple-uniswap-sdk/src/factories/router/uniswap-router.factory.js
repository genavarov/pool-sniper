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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniswapRouterFactory = void 0;
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var constants_1 = require("../../common/constants");
var error_codes_1 = require("../../common/errors/error-codes");
var uniswap_error_1 = require("../../common/errors/uniswap-error");
var comp_1 = require("../../common/tokens/comp");
var dai_1 = require("../../common/tokens/dai");
var eth_1 = require("../../common/tokens/eth");
var usdc_1 = require("../../common/tokens/usdc");
var usdt_1 = require("../../common/tokens/usdt");
var wbtc_1 = require("../../common/tokens/wbtc");
var weth_1 = require("../../common/tokens/weth");
var deep_clone_1 = require("../../common/utils/deep-clone");
var format_ether_1 = require("../../common/utils/format-ether");
var hexlify_1 = require("../../common/utils/hexlify");
var only_unique_1 = require("../../common/utils/only-unique");
var parse_ether_1 = require("../../common/utils/parse-ether");
var to_ethers_big_number_1 = require("../../common/utils/to-ethers-big-number");
var trade_path_1 = require("../../common/utils/trade-path");
var custom_multicall_1 = require("../../custom-multicall");
var chain_id_1 = require("../../enums/chain-id");
var trade_path_2 = require("../../enums/trade-path");
var uniswap_version_1 = require("../../enums/uniswap-version");
var get_uniswap_contracts_1 = require("../../uniswap-contract-context/get-uniswap-contracts");
var uniswap_contract_context_v2_1 = require("../../uniswap-contract-context/uniswap-contract-context-v2");
var uniswap_contract_context_v3_1 = require("../../uniswap-contract-context/uniswap-contract-context-v3");
var trade_direction_1 = require("../pair/models/trade-direction");
var tokens_factory_1 = require("../token/tokens.factory");
var router_direction_1 = require("./enums/router-direction");
var uniswap_router_contract_factory_v2_1 = require("./v2/uniswap-router-contract.factory.v2");
var fee_amount_v3_1 = require("./v3/enums/fee-amount-v3");
var uniswap_router_contract_factory_v3_1 = require("./v3/uniswap-router-contract.factory.v3");
var UniswapRouterFactory = /** @class */ (function () {
    function UniswapRouterFactory(_coinGecko, _ethereumAddress, _fromToken, _toToken, _settings, _ethersProvider) {
        var _a, _b;
        this._coinGecko = _coinGecko;
        this._ethereumAddress = _ethereumAddress;
        this._fromToken = _fromToken;
        this._toToken = _toToken;
        this._settings = _settings;
        this._ethersProvider = _ethersProvider;
        this._multicall = new custom_multicall_1.CustomMulticall(this._ethersProvider.provider, (_b = (_a = this._settings) === null || _a === void 0 ? void 0 : _a.customNetwork) === null || _b === void 0 ? void 0 : _b.multicallContractAddress);
        this._uniswapRouterContractFactoryV2 = new uniswap_router_contract_factory_v2_1.UniswapRouterContractFactoryV2(this._ethersProvider, get_uniswap_contracts_1.uniswapContracts.v2.getRouterAddress(this._settings.cloneUniswapContractDetails));
        this._uniswapRouterContractFactoryV3 = new uniswap_router_contract_factory_v3_1.UniswapRouterContractFactoryV3(this._ethersProvider, get_uniswap_contracts_1.uniswapContracts.v3.getRouterAddress(this._settings.cloneUniswapContractDetails));
        this._tokensFactory = new tokens_factory_1.TokensFactory(this._ethersProvider, this._settings.customNetwork, this._settings.cloneUniswapContractDetails);
        this.LIQUIDITY_PROVIDER_FEE_V2 = 0.003;
    }
    /**
     * Get all possible routes will only go up to 4 due to gas increase the more routes
     * you go.
     */
    UniswapRouterFactory.prototype.getAllPossibleRoutes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var findPairs, contractCallContext, pairs, tokenPairs, fromToken, toToken, allPossibleRoutes, contractCallResults, results, availablePairs, fromTokenRoutes, toTokenRoutes, allMainRoutes, i, fromTokenPairs, toTokenPairs, results, i, liquidityProviderFee;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        findPairs = [];
                        if (!this._settings.disableMultihops) {
                            findPairs = [
                                this.mainCurrenciesPairsForFromToken,
                                this.mainCurrenciesPairsForToToken,
                                this.mainCurrenciesPairsForUSDT,
                                this.mainCurrenciesPairsForCOMP,
                                this.mainCurrenciesPairsForDAI,
                                this.mainCurrenciesPairsForUSDC,
                                this.mainCurrenciesPairsForWETH,
                                this.mainCurrenciesPairsForWBTC,
                                [[this._fromToken, this._toToken]],
                            ];
                        }
                        else {
                            // multihops turned off so only go direct
                            findPairs = [[[this._fromToken, this._toToken]]];
                        }
                        contractCallContext = [];
                        if (this._settings.uniswapVersions.includes(uniswap_version_1.UniswapVersion.v2)) {
                            contractCallContext.push({
                                reference: uniswap_version_1.UniswapVersion.v2,
                                contractAddress: get_uniswap_contracts_1.uniswapContracts.v2.getPairAddress(this._settings.cloneUniswapContractDetails),
                                abi: uniswap_contract_context_v2_1.UniswapContractContextV2.pairAbi,
                                calls: [],
                            });
                            for (pairs = 0; pairs < findPairs.length; pairs++) {
                                for (tokenPairs = 0; tokenPairs < findPairs[pairs].length; tokenPairs++) {
                                    fromToken = findPairs[pairs][tokenPairs][0];
                                    toToken = findPairs[pairs][tokenPairs][1];
                                    contractCallContext[0].calls.push({
                                        reference: fromToken.contractAddress + "-" + toToken.contractAddress + "-" + fromToken.symbol + "/" + toToken.symbol,
                                        methodName: 'getPair',
                                        methodParameters: [
                                            (0, eth_1.removeEthFromContractAddress)(fromToken.contractAddress),
                                            (0, eth_1.removeEthFromContractAddress)(toToken.contractAddress),
                                        ],
                                    });
                                }
                            }
                        }
                        // for now v3 quotes will just be direct aka UNI > AAVE etc!
                        if (this._settings.uniswapVersions.includes(uniswap_version_1.UniswapVersion.v3)) {
                            contractCallContext.push({
                                reference: uniswap_version_1.UniswapVersion.v3,
                                contractAddress: get_uniswap_contracts_1.uniswapContracts.v3.getFactoryAddress(this._settings.cloneUniswapContractDetails),
                                abi: uniswap_contract_context_v3_1.UniswapContractContextV3.factoryAbi,
                                calls: [
                                    {
                                        reference: this._fromToken.contractAddress + "-" + this._toToken.contractAddress + "-" + this._fromToken.symbol + "/" + this._toToken.symbol,
                                        methodName: 'getPool',
                                        methodParameters: [
                                            (0, eth_1.removeEthFromContractAddress)(this._fromToken.contractAddress),
                                            (0, eth_1.removeEthFromContractAddress)(this._toToken.contractAddress),
                                            fee_amount_v3_1.FeeAmount.LOW,
                                        ],
                                    },
                                    {
                                        reference: this._fromToken.contractAddress + "-" + this._toToken.contractAddress + "-" + this._fromToken.symbol + "/" + this._toToken.symbol,
                                        methodName: 'getPool',
                                        methodParameters: [
                                            (0, eth_1.removeEthFromContractAddress)(this._fromToken.contractAddress),
                                            (0, eth_1.removeEthFromContractAddress)(this._toToken.contractAddress),
                                            fee_amount_v3_1.FeeAmount.MEDIUM,
                                        ],
                                    },
                                    {
                                        reference: this._fromToken.contractAddress + "-" + this._toToken.contractAddress + "-" + this._fromToken.symbol + "/" + this._toToken.symbol,
                                        methodName: 'getPool',
                                        methodParameters: [
                                            (0, eth_1.removeEthFromContractAddress)(this._fromToken.contractAddress),
                                            (0, eth_1.removeEthFromContractAddress)(this._toToken.contractAddress),
                                            fee_amount_v3_1.FeeAmount.HIGH,
                                        ],
                                    },
                                ],
                            });
                        }
                        allPossibleRoutes = { v2: [], v3: [] };
                        return [4 /*yield*/, this._multicall.call(contractCallContext)];
                    case 1:
                        contractCallResults = _a.sent();
                        if (this._settings.uniswapVersions.includes(uniswap_version_1.UniswapVersion.v2)) {
                            results = contractCallResults.results[uniswap_version_1.UniswapVersion.v2];
                            availablePairs = results.callsReturnContext.filter(function (c) {
                                return c.returnValues[0] !== '0x0000000000000000000000000000000000000000';
                            });
                            fromTokenRoutes = {
                                token: this._fromToken,
                                pairs: {
                                    fromTokenPairs: this.getTokenAvailablePairs(this._fromToken, availablePairs, router_direction_1.RouterDirection.from),
                                },
                            };
                            toTokenRoutes = {
                                token: this._toToken,
                                pairs: {
                                    toTokenPairs: this.getTokenAvailablePairs(this._toToken, availablePairs, router_direction_1.RouterDirection.to),
                                },
                            };
                            allMainRoutes = [];
                            for (i = 0; i < this.allMainTokens.length; i++) {
                                fromTokenPairs = this.getTokenAvailablePairs(this.allMainTokens[i], availablePairs, router_direction_1.RouterDirection.from);
                                toTokenPairs = this.getTokenAvailablePairs(this.allMainTokens[i], availablePairs, router_direction_1.RouterDirection.to);
                                allMainRoutes.push({
                                    token: this.allMainTokens[i],
                                    pairs: { fromTokenPairs: fromTokenPairs, toTokenPairs: toTokenPairs },
                                });
                            }
                            // console.log(JSON.stringify(allMainRoutes, null, 4));
                            allPossibleRoutes.v2 = this.workOutAllPossibleRoutes(fromTokenRoutes, toTokenRoutes, allMainRoutes);
                        }
                        if (this._settings.uniswapVersions.includes(uniswap_version_1.UniswapVersion.v3)) {
                            results = contractCallResults.results[uniswap_version_1.UniswapVersion.v3];
                            for (i = 0; i < results.callsReturnContext.length; i++) {
                                if (results.callsReturnContext[i].returnValues[0] !==
                                    '0x0000000000000000000000000000000000000000') {
                                    liquidityProviderFee = void 0;
                                    switch (i) {
                                        case 0:
                                            liquidityProviderFee = fee_amount_v3_1.FeeAmount.LOW;
                                            break;
                                        case 1:
                                            liquidityProviderFee = fee_amount_v3_1.FeeAmount.MEDIUM;
                                            break;
                                        case 2:
                                            liquidityProviderFee = fee_amount_v3_1.FeeAmount.HIGH;
                                            break;
                                    }
                                    allPossibleRoutes.v3.push({
                                        route: [this._fromToken, this._toToken],
                                        liquidityProviderFee: (0, fee_amount_v3_1.feeToPercent)(liquidityProviderFee),
                                    });
                                }
                            }
                        }
                        // console.log(JSON.stringify(allPossibleRoutes, null, 4));
                        return [2 /*return*/, allPossibleRoutes];
                }
            });
        });
    };
    /**
     * Get all possible routes with the quotes
     * @param amountToTrade The amount to trade
     * @param direction The direction you want to get the quote from
     */
    UniswapRouterFactory.prototype.getAllPossibleRoutesWithQuotes = function (amountToTrade, direction) {
        return __awaiter(this, void 0, void 0, function () {
            var tradeAmount, routes, contractCallContext, i, routeCombo, i, routeCombo, contractCallResults;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tradeAmount = this.formatAmountToTrade(amountToTrade, direction);
                        return [4 /*yield*/, this.getAllPossibleRoutes()];
                    case 1:
                        routes = _a.sent();
                        contractCallContext = [];
                        if (this._settings.uniswapVersions.includes(uniswap_version_1.UniswapVersion.v2)) {
                            contractCallContext.push({
                                reference: uniswap_version_1.UniswapVersion.v2,
                                contractAddress: get_uniswap_contracts_1.uniswapContracts.v2.getRouterAddress(this._settings.cloneUniswapContractDetails),
                                abi: uniswap_contract_context_v2_1.UniswapContractContextV2.routerAbi,
                                calls: [],
                                context: routes.v2,
                            });
                            for (i = 0; i < routes.v2.length; i++) {
                                routeCombo = routes.v2[i].route.map(function (c) {
                                    return (0, eth_1.removeEthFromContractAddress)(c.contractAddress);
                                });
                                contractCallContext[0].calls.push({
                                    reference: "route" + i,
                                    methodName: direction === trade_direction_1.TradeDirection.input
                                        ? 'getAmountsOut'
                                        : 'getAmountsIn',
                                    methodParameters: [tradeAmount, routeCombo],
                                });
                            }
                        }
                        if (this._settings.uniswapVersions.includes(uniswap_version_1.UniswapVersion.v3)) {
                            contractCallContext.push({
                                reference: uniswap_version_1.UniswapVersion.v3,
                                contractAddress: get_uniswap_contracts_1.uniswapContracts.v3.getQuoterAddress(this._settings.cloneUniswapContractDetails),
                                abi: uniswap_contract_context_v3_1.UniswapContractContextV3.quoterAbi,
                                calls: [],
                                context: routes.v3,
                            });
                            for (i = 0; i < routes.v3.length; i++) {
                                routeCombo = routes.v3[i].route.map(function (c) {
                                    return (0, eth_1.removeEthFromContractAddress)(c.contractAddress);
                                });
                                contractCallContext[this._settings.uniswapVersions.includes(uniswap_version_1.UniswapVersion.v2) ? 1 : 0].calls.push({
                                    reference: "route" + i,
                                    methodName: direction === trade_direction_1.TradeDirection.input
                                        ? 'quoteExactInputSingle'
                                        : 'quoteExactOutputSingle',
                                    methodParameters: [
                                        routeCombo[0],
                                        routeCombo[1],
                                        (0, fee_amount_v3_1.percentToFeeAmount)(routes.v3[i].liquidityProviderFee),
                                        tradeAmount,
                                        0,
                                    ],
                                });
                            }
                        }
                        return [4 /*yield*/, this._multicall.call(contractCallContext)];
                    case 2:
                        contractCallResults = _a.sent();
                        return [2 /*return*/, this.buildRouteQuotesFromResults(amountToTrade, contractCallResults, direction)];
                }
            });
        });
    };
    /**
     * Finds the best route
     * @param amountToTrade The amount they want to trade
     * @param direction The direction you want to get the quote from
     */
    UniswapRouterFactory.prototype.findBestRoute = function (amountToTrade, direction) {
        return __awaiter(this, void 0, void 0, function () {
            var allRoutes, allowanceAndBalances;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllPossibleRoutesWithQuotes(amountToTrade, direction)];
                    case 1:
                        allRoutes = _a.sent();
                        if (allRoutes.length === 0) {
                            throw new uniswap_error_1.UniswapError("No routes found for " + this._fromToken.symbol + " > " + this._toToken.symbol, error_codes_1.ErrorCodes.noRoutesFound);
                        }
                        return [4 /*yield*/, this.hasEnoughAllowanceAndBalance(amountToTrade, allRoutes[0], direction)];
                    case 2:
                        allowanceAndBalances = _a.sent();
                        if (!(this._ethersProvider.provider.network.chainId === chain_id_1.ChainId.MAINNET &&
                            this._settings.gasSettings &&
                            allowanceAndBalances.enoughBalance)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.filterWithTransactionFees(allRoutes, allowanceAndBalances.enoughV2Allowance, allowanceAndBalances.enoughV3Allowance)];
                    case 3:
                        allRoutes = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, {
                            bestRouteQuote: allRoutes[0],
                            triedRoutesQuote: allRoutes.map(function (route) {
                                return {
                                    expectedConvertQuote: route.expectedConvertQuote,
                                    expectedConvertQuoteOrTokenAmountInMaxWithSlippage: route.expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
                                    transaction: route.transaction,
                                    tradeExpires: route.tradeExpires,
                                    routePathArrayTokenMap: route.routePathArrayTokenMap,
                                    routeText: route.routeText,
                                    routePathArray: route.routePathArray,
                                    uniswapVersion: route.uniswapVersion,
                                    liquidityProviderFee: route.liquidityProviderFee,
                                    quoteDirection: route.quoteDirection,
                                    gasPriceEstimatedBy: route.gasPriceEstimatedBy,
                                };
                            }),
                            hasEnoughBalance: allowanceAndBalances.enoughBalance,
                            fromBalance: allowanceAndBalances.fromBalance,
                            toBalance: allowanceAndBalances.toBalance,
                            hasEnoughAllowance: allRoutes[0].uniswapVersion === uniswap_version_1.UniswapVersion.v2
                                ? allowanceAndBalances.enoughV2Allowance
                                : allowanceAndBalances.enoughV3Allowance,
                        }];
                }
            });
        });
    };
    /**
     * Generates the trade datetime unix time
     */
    UniswapRouterFactory.prototype.generateTradeDeadlineUnixTime = function () {
        var now = new Date();
        var expiryDate = new Date(now.getTime() + this._settings.deadlineMinutes * 60000);
        return (expiryDate.getTime() / 1e3) | 0;
    };
    /**
     * Get eth balance
     */
    UniswapRouterFactory.prototype.getEthBalance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._ethersProvider.balanceOf(this._ethereumAddress)];
                    case 1:
                        balance = _a.sent();
                        return [2 /*return*/, new bignumber_js_1.default(balance).shiftedBy(constants_1.Constants.ETH_MAX_DECIMALS * -1)];
                }
            });
        });
    };
    /**
     * Generate trade data eth > erc20
     * @param ethAmountIn The eth amount in
     * @param tokenAmount The token amount
     * @param routeQuoteTradeContext The route quote trade context
     * @param deadline The deadline it expiries unix time
     */
    UniswapRouterFactory.prototype.generateTradeDataEthToErc20Input = function (ethAmountIn, tokenAmount, routeQuoteTradeContext, deadline) {
        // uniswap adds extra digits on even if the token is say 8 digits long
        var convertedMinTokens = tokenAmount
            .shiftedBy(this._toToken.decimals)
            .decimalPlaces(0);
        switch (routeQuoteTradeContext.uniswapVersion) {
            case uniswap_version_1.UniswapVersion.v2:
                return this._uniswapRouterContractFactoryV2.swapExactETHForTokens((0, hexlify_1.hexlify)(convertedMinTokens), routeQuoteTradeContext.routePathArray.map(function (r) {
                    return (0, eth_1.removeEthFromContractAddress)(r);
                }), this._ethereumAddress, deadline);
            case uniswap_version_1.UniswapVersion.v3:
                return this.generateTradeDataForV3Input((0, parse_ether_1.parseEther)(ethAmountIn), convertedMinTokens, routeQuoteTradeContext.liquidityProviderFee, deadline);
            default:
                throw new uniswap_error_1.UniswapError('Uniswap version not supported', error_codes_1.ErrorCodes.uniswapVersionNotSupported);
        }
    };
    /**
     * Generate trade data eth > erc20
     * @param tokenAmountInMax The amount in max
     * @param ethAmountOut The amount to receive
     * @param routeQuote The route quote
     * @param deadline The deadline it expiries unix time
     */
    UniswapRouterFactory.prototype.generateTradeDataEthToErc20Output = function (ethAmountInMax, tokenAmountOut, routeQuoteTradeContext, deadline) {
        var amountOut = tokenAmountOut
            .shiftedBy(this._toToken.decimals)
            .decimalPlaces(0);
        switch (routeQuoteTradeContext.uniswapVersion) {
            case uniswap_version_1.UniswapVersion.v2:
                return this._uniswapRouterContractFactoryV2.swapETHForExactTokens((0, hexlify_1.hexlify)(amountOut), routeQuoteTradeContext.routePathArray.map(function (r) {
                    return (0, eth_1.removeEthFromContractAddress)(r);
                }), this._ethereumAddress, deadline);
            case uniswap_version_1.UniswapVersion.v3:
                return this.generateTradeDataForV3Output(amountOut, (0, parse_ether_1.parseEther)(ethAmountInMax), routeQuoteTradeContext.liquidityProviderFee, deadline);
            default:
                throw new uniswap_error_1.UniswapError('Uniswap version not supported', error_codes_1.ErrorCodes.uniswapVersionNotSupported);
        }
    };
    /**
     * Generate trade amount erc20 > eth for input direction
     * @param tokenAmount The amount in
     * @param ethAmountOutMin The min amount to receive
     * @param routeQuoteTradeContext The route quote trade context
     * @param deadline The deadline it expiries unix time
     */
    UniswapRouterFactory.prototype.generateTradeDataErc20ToEthInput = function (tokenAmount, ethAmountOutMin, routeQuoteTradeContext, deadline) {
        // uniswap adds extra digits on even if the token is say 8 digits long
        var amountIn = tokenAmount
            .shiftedBy(this._fromToken.decimals)
            .decimalPlaces(0);
        switch (routeQuoteTradeContext.uniswapVersion) {
            case uniswap_version_1.UniswapVersion.v2:
                return this._uniswapRouterContractFactoryV2.swapExactTokensForETH((0, hexlify_1.hexlify)(amountIn), (0, hexlify_1.hexlify)((0, parse_ether_1.parseEther)(ethAmountOutMin)), routeQuoteTradeContext.routePathArray.map(function (r) {
                    return (0, eth_1.removeEthFromContractAddress)(r);
                }), this._ethereumAddress, deadline);
            case uniswap_version_1.UniswapVersion.v3:
                return this.generateTradeDataForV3Input(amountIn, (0, parse_ether_1.parseEther)(ethAmountOutMin), routeQuoteTradeContext.liquidityProviderFee, deadline);
            default:
                throw new uniswap_error_1.UniswapError('Uniswap version not supported', error_codes_1.ErrorCodes.uniswapVersionNotSupported);
        }
    };
    /**
     * Generate trade amount erc20 > eth for input direction
     * @param tokenAmountInMax The amount in max
     * @param ethAmountOut The amount to receive
     * @param routeQuoteTradeContext The route quote trade context
     * @param deadline The deadline it expiries unix time
     */
    UniswapRouterFactory.prototype.generateTradeDataErc20ToEthOutput = function (tokenAmountInMax, ethAmountOut, routeQuoteTradeContext, deadline) {
        // uniswap adds extra digits on even if the token is say 8 digits long
        var amountInMax = tokenAmountInMax
            .shiftedBy(this._fromToken.decimals)
            .decimalPlaces(0);
        switch (routeQuoteTradeContext.uniswapVersion) {
            case uniswap_version_1.UniswapVersion.v2:
                return this._uniswapRouterContractFactoryV2.swapTokensForExactETH((0, hexlify_1.hexlify)((0, parse_ether_1.parseEther)(ethAmountOut)), (0, hexlify_1.hexlify)(amountInMax), routeQuoteTradeContext.routePathArray.map(function (r) {
                    return (0, eth_1.removeEthFromContractAddress)(r);
                }), this._ethereumAddress, deadline);
            case uniswap_version_1.UniswapVersion.v3:
                return this.generateTradeDataForV3Output((0, parse_ether_1.parseEther)(ethAmountOut), amountInMax, routeQuoteTradeContext.liquidityProviderFee, deadline);
            default:
                throw new uniswap_error_1.UniswapError('Uniswap version not supported', error_codes_1.ErrorCodes.uniswapVersionNotSupported);
        }
    };
    /**
     * Generate trade amount erc20 > erc20 for input
     * @param tokenAmount The token amount
     * @param tokenAmountOut The min token amount out
     * @param routeQuoteTradeContext The route quote trade context
     * @param deadline The deadline it expiries unix time
     */
    UniswapRouterFactory.prototype.generateTradeDataErc20ToErc20Input = function (tokenAmount, tokenAmountMin, routeQuoteTradeContext, deadline) {
        // uniswap adds extra digits on even if the token is say 8 digits long
        var amountIn = tokenAmount
            .shiftedBy(this._fromToken.decimals)
            .decimalPlaces(0);
        var amountMin = tokenAmountMin
            .shiftedBy(this._toToken.decimals)
            .decimalPlaces(0);
        switch (routeQuoteTradeContext.uniswapVersion) {
            case uniswap_version_1.UniswapVersion.v2:
                return this._uniswapRouterContractFactoryV2.swapExactTokensForTokens((0, hexlify_1.hexlify)(amountIn), (0, hexlify_1.hexlify)(amountMin), routeQuoteTradeContext.routePathArray, this._ethereumAddress, deadline);
            case uniswap_version_1.UniswapVersion.v3:
                return this.generateTradeDataForV3Input(amountIn, amountMin, routeQuoteTradeContext.liquidityProviderFee, deadline);
            default:
                throw new uniswap_error_1.UniswapError('Uniswap version not supported', error_codes_1.ErrorCodes.uniswapVersionNotSupported);
        }
    };
    /**
     * Generate trade amount erc20 > erc20 for output
     * @param tokenAmount The token amount
     * @param tokenAmountOut The min token amount out
     * @param routeQuoteTradeContext The route quote trade context
     * @param deadline The deadline it expiries unix time
     */
    UniswapRouterFactory.prototype.generateTradeDataErc20ToErc20Output = function (tokenAmountInMax, tokenAmountOut, routeQuoteTradeContext, deadline) {
        // uniswap adds extra digits on even if the token is say 8 digits long
        var amountInMax = tokenAmountInMax
            .shiftedBy(this._fromToken.decimals)
            .decimalPlaces(0);
        var amountOut = tokenAmountOut
            .shiftedBy(this._toToken.decimals)
            .decimalPlaces(0);
        switch (routeQuoteTradeContext.uniswapVersion) {
            case uniswap_version_1.UniswapVersion.v2:
                return this._uniswapRouterContractFactoryV2.swapTokensForExactTokens((0, hexlify_1.hexlify)(amountOut), (0, hexlify_1.hexlify)(amountInMax), routeQuoteTradeContext.routePathArray, this._ethereumAddress, deadline);
            case uniswap_version_1.UniswapVersion.v3:
                return this.generateTradeDataForV3Output(amountOut, amountInMax, routeQuoteTradeContext.liquidityProviderFee, deadline);
            default:
                throw new uniswap_error_1.UniswapError('Uniswap version not supported', error_codes_1.ErrorCodes.uniswapVersionNotSupported);
        }
    };
    /**
     * Generate trade data for v3
     * @param tokenAmount The token amount
     * @param tokenAmountOut The min token amount out
     * @param liquidityProviderFee The liquidity provider fee
     * @param deadline The deadline it expiries unix time
     */
    UniswapRouterFactory.prototype.generateTradeDataForV3Input = function (tokenAmount, tokenAmountMin, liquidityProviderFee, deadline) {
        var isNativeReceivingNativeEth = (0, eth_1.isNativeEth)(this._toToken.contractAddress);
        var params = {
            tokenIn: (0, eth_1.removeEthFromContractAddress)(this._fromToken.contractAddress),
            tokenOut: (0, eth_1.removeEthFromContractAddress)(this._toToken.contractAddress),
            fee: (0, fee_amount_v3_1.percentToFeeAmount)(liquidityProviderFee),
            recipient: isNativeReceivingNativeEth === true
                ? '0x0000000000000000000000000000000000000000'
                : this._ethereumAddress,
            deadline: deadline,
            amountIn: (0, hexlify_1.hexlify)(tokenAmount),
            amountOutMinimum: (0, hexlify_1.hexlify)(tokenAmountMin),
            sqrtPriceLimitX96: 0,
        };
        var multicallData = [];
        multicallData.push(this._uniswapRouterContractFactoryV3.exactInputSingle(params));
        if ((0, eth_1.isNativeEth)(this._toToken.contractAddress)) {
            multicallData.push(this._uniswapRouterContractFactoryV3.unwrapWETH9((0, hexlify_1.hexlify)(tokenAmountMin), this._ethereumAddress));
        }
        return this._uniswapRouterContractFactoryV3.multicall(multicallData);
    };
    /**
     * Generate trade data for v3
     * @param tokenAmountInMax The amount in max
     * @param ethAmountOut The amount to receive
     * @param liquidityProviderFee The liquidity provider fee
     * @param deadline The deadline it expiries unix time
     */
    UniswapRouterFactory.prototype.generateTradeDataForV3Output = function (amountOut, amountInMaximum, liquidityProviderFee, deadline) {
        var isNativeReceivingNativeEth = (0, eth_1.isNativeEth)(this._toToken.contractAddress);
        var params = {
            tokenIn: (0, eth_1.removeEthFromContractAddress)(this._fromToken.contractAddress),
            tokenOut: (0, eth_1.removeEthFromContractAddress)(this._toToken.contractAddress),
            fee: (0, fee_amount_v3_1.percentToFeeAmount)(liquidityProviderFee),
            recipient: isNativeReceivingNativeEth === true
                ? '0x0000000000000000000000000000000000000000'
                : this._ethereumAddress,
            deadline: deadline,
            amountOut: (0, hexlify_1.hexlify)(amountOut),
            amountInMaximum: (0, hexlify_1.hexlify)(amountInMaximum),
            sqrtPriceLimitX96: 0,
        };
        var multicallData = [];
        multicallData.push(this._uniswapRouterContractFactoryV3.exactOutputSingle(params));
        if ((0, eth_1.isNativeEth)(this._toToken.contractAddress)) {
            multicallData.push(this._uniswapRouterContractFactoryV3.unwrapWETH9((0, hexlify_1.hexlify)(amountOut), this._ethereumAddress));
        }
        return this._uniswapRouterContractFactoryV3.multicall(multicallData);
    };
    /**
     * Build up a transaction for erc20 from
     * @param data The data
     */
    UniswapRouterFactory.prototype.buildUpTransactionErc20 = function (uniswapVersion, data) {
        return {
            to: uniswapVersion === uniswap_version_1.UniswapVersion.v2
                ? get_uniswap_contracts_1.uniswapContracts.v2.getRouterAddress(this._settings.cloneUniswapContractDetails)
                : get_uniswap_contracts_1.uniswapContracts.v3.getRouterAddress(this._settings.cloneUniswapContractDetails),
            from: this._ethereumAddress,
            data: data,
            value: constants_1.Constants.EMPTY_HEX_STRING,
        };
    };
    /**
     * Build up a transaction for eth from
     * @param ethValue The eth value
     * @param data The data
     */
    UniswapRouterFactory.prototype.buildUpTransactionEth = function (uniswapVersion, ethValue, data) {
        return {
            to: uniswapVersion === uniswap_version_1.UniswapVersion.v2
                ? get_uniswap_contracts_1.uniswapContracts.v2.getRouterAddress(this._settings.cloneUniswapContractDetails)
                : get_uniswap_contracts_1.uniswapContracts.v3.getRouterAddress(this._settings.cloneUniswapContractDetails),
            from: this._ethereumAddress,
            data: data,
            value: (0, to_ethers_big_number_1.toEthersBigNumber)((0, parse_ether_1.parseEther)(ethValue)).toHexString(),
        };
    };
    /**
     * Get the allowance and balance for the from and to token (will get balance for eth as well)
     */
    UniswapRouterFactory.prototype.getAllowanceAndBalanceForTokens = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allowanceAndBalanceOfForTokens;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._tokensFactory.getAllowanceAndBalanceOfForContracts(this._ethereumAddress, [this._fromToken.contractAddress, this._toToken.contractAddress], false)];
                    case 1:
                        allowanceAndBalanceOfForTokens = _a.sent();
                        return [2 /*return*/, {
                                fromToken: allowanceAndBalanceOfForTokens.find(function (c) {
                                    return c.token.contractAddress.toLowerCase() ===
                                        _this._fromToken.contractAddress.toLowerCase();
                                }).allowanceAndBalanceOf,
                                toToken: allowanceAndBalanceOfForTokens.find(function (c) {
                                    return c.token.contractAddress.toLowerCase() ===
                                        _this._toToken.contractAddress.toLowerCase();
                                }).allowanceAndBalanceOf,
                            }];
                }
            });
        });
    };
    /**
     * Has got enough allowance to do the trade
     * @param amount The amount you want to swap
     */
    UniswapRouterFactory.prototype.hasGotEnoughAllowance = function (amount, allowance) {
        if (this.tradePath() === trade_path_2.TradePath.ethToErc20) {
            return true;
        }
        var bigNumberAllowance = new bignumber_js_1.default(allowance).shiftedBy(this._fromToken.decimals * -1);
        if (new bignumber_js_1.default(amount).isGreaterThan(bigNumberAllowance)) {
            return false;
        }
        return true;
    };
    UniswapRouterFactory.prototype.hasEnoughAllowanceAndBalance = function (amountToTrade, bestRouteQuote, direction) {
        return __awaiter(this, void 0, void 0, function () {
            var allowanceAndBalancesForTokens, enoughBalance, fromBalance, _a, result, result_1, result_2, enoughV2Allowance, enoughV3Allowance;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getAllowanceAndBalanceForTokens()];
                    case 1:
                        allowanceAndBalancesForTokens = _b.sent();
                        enoughBalance = false;
                        fromBalance = allowanceAndBalancesForTokens.fromToken.balanceOf;
                        _a = this.tradePath();
                        switch (_a) {
                            case trade_path_2.TradePath.ethToErc20: return [3 /*break*/, 2];
                            case trade_path_2.TradePath.erc20ToErc20: return [3 /*break*/, 4];
                            case trade_path_2.TradePath.erc20ToEth: return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 5];
                    case 2: return [4 /*yield*/, this.hasGotEnoughBalanceEth(direction === trade_direction_1.TradeDirection.input
                            ? amountToTrade.toFixed()
                            : bestRouteQuote.expectedConvertQuote)];
                    case 3:
                        result = _b.sent();
                        enoughBalance = result.hasEnough;
                        fromBalance = result.balance;
                        return [3 /*break*/, 5];
                    case 4:
                        if (direction == trade_direction_1.TradeDirection.input) {
                            result_1 = this.hasGotEnoughBalanceErc20(amountToTrade.toFixed(), allowanceAndBalancesForTokens.fromToken.balanceOf);
                            enoughBalance = result_1.hasEnough;
                            fromBalance = result_1.balance;
                        }
                        else {
                            result_2 = this.hasGotEnoughBalanceErc20(bestRouteQuote.expectedConvertQuote, allowanceAndBalancesForTokens.fromToken.balanceOf);
                            enoughBalance = result_2.hasEnough;
                            fromBalance = result_2.balance;
                        }
                        _b.label = 5;
                    case 5:
                        enoughV2Allowance = direction === trade_direction_1.TradeDirection.input
                            ? this.hasGotEnoughAllowance(amountToTrade.toFixed(), allowanceAndBalancesForTokens.fromToken.allowanceV2)
                            : this.hasGotEnoughAllowance(bestRouteQuote.expectedConvertQuote, allowanceAndBalancesForTokens.fromToken.allowanceV2);
                        enoughV3Allowance = direction === trade_direction_1.TradeDirection.input
                            ? this.hasGotEnoughAllowance(amountToTrade.toFixed(), allowanceAndBalancesForTokens.fromToken.allowanceV3)
                            : this.hasGotEnoughAllowance(bestRouteQuote.expectedConvertQuote, allowanceAndBalancesForTokens.fromToken.allowanceV3);
                        return [2 /*return*/, {
                                enoughV2Allowance: enoughV2Allowance,
                                enoughV3Allowance: enoughV3Allowance,
                                enoughBalance: enoughBalance,
                                fromBalance: fromBalance,
                                toBalance: allowanceAndBalancesForTokens.toToken.balanceOf,
                            }];
                }
            });
        });
    };
    /**
     * Has got enough balance to do the trade (eth check only)
     * @param amount The amount you want to swap
     */
    UniswapRouterFactory.prototype.hasGotEnoughBalanceEth = function (amount) {
        return __awaiter(this, void 0, void 0, function () {
            var balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getEthBalance()];
                    case 1:
                        balance = _a.sent();
                        if (new bignumber_js_1.default(amount).isGreaterThan(balance)) {
                            return [2 /*return*/, {
                                    hasEnough: false,
                                    balance: balance.toFixed(),
                                }];
                        }
                        return [2 /*return*/, {
                                hasEnough: true,
                                balance: balance.toFixed(),
                            }];
                }
            });
        });
    };
    /**
     * Has got enough balance to do the trade (erc20 check only)
     * @param amount The amount you want to swap
     */
    UniswapRouterFactory.prototype.hasGotEnoughBalanceErc20 = function (amount, balance) {
        var bigNumberBalance = new bignumber_js_1.default(balance).shiftedBy(this._fromToken.decimals * -1);
        if (new bignumber_js_1.default(amount).isGreaterThan(bigNumberBalance)) {
            return {
                hasEnough: false,
                balance: bigNumberBalance.toFixed(),
            };
        }
        return {
            hasEnough: true,
            balance: bigNumberBalance.toFixed(),
        };
    };
    /**
     * Work out trade fiat cost
     * @param allRoutes All the routes
     * @param enoughAllowanceV2 Has got enough allowance for v2
     * @param enoughAllowanceV3 Has got enough allowance for v3
     */
    UniswapRouterFactory.prototype.filterWithTransactionFees = function (allRoutes, enoughAllowanceV2, enoughAllowanceV3) {
        return __awaiter(this, void 0, void 0, function () {
            var ethContract, fiatPrices, toUsdValue, ethUsdValue, bestRouteQuoteHops, gasPriceGwei, gasPrice, bestRoute_1, i, route, expectedConvertQuoteFiatPrice, txFee, _a, _b, expectedConvertQuoteMinusTxFees, routeIndex;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(this._settings.gasSettings && !this._settings.disableMultihops)) return [3 /*break*/, 7];
                        ethContract = weth_1.WETHContract.MAINNET().contractAddress;
                        return [4 /*yield*/, this._coinGecko.getCoinGeckoFiatPrices([
                                this._toToken.contractAddress,
                                ethContract,
                            ])];
                    case 1:
                        fiatPrices = _c.sent();
                        toUsdValue = fiatPrices[this._toToken.contractAddress];
                        ethUsdValue = fiatPrices[weth_1.WETHContract.MAINNET().contractAddress];
                        if (!(toUsdValue && ethUsdValue)) return [3 /*break*/, 7];
                        bestRouteQuoteHops = this.getBestRouteQuotesHops(allRoutes, enoughAllowanceV2, enoughAllowanceV3);
                        return [4 /*yield*/, this._settings.gasSettings.getGasPrice()];
                    case 2:
                        gasPriceGwei = _c.sent();
                        gasPrice = new bignumber_js_1.default(gasPriceGwei).times(1e9);
                        i = 0;
                        _c.label = 3;
                    case 3:
                        if (!(i < bestRouteQuoteHops.length)) return [3 /*break*/, 6];
                        route = bestRouteQuoteHops[i];
                        expectedConvertQuoteFiatPrice = new bignumber_js_1.default(route.expectedConvertQuote).times(toUsdValue);
                        _a = format_ether_1.formatEther;
                        _b = bignumber_js_1.default.bind;
                        return [4 /*yield*/, this._ethersProvider.provider.estimateGas(route.transaction)];
                    case 4:
                        txFee = _a.apply(void 0, [new (_b.apply(bignumber_js_1.default, [void 0, (_c.sent()).toHexString()]))().times(gasPrice)]).times(ethUsdValue);
                        route.gasPriceEstimatedBy = gasPriceGwei;
                        expectedConvertQuoteMinusTxFees = expectedConvertQuoteFiatPrice.minus(txFee);
                        if (bestRoute_1) {
                            if (expectedConvertQuoteMinusTxFees.isGreaterThan(bestRoute_1.expectedConvertQuoteMinusTxFees)) {
                                bestRoute_1 = {
                                    routeQuote: bestRouteQuoteHops[i],
                                    expectedConvertQuoteMinusTxFees: expectedConvertQuoteMinusTxFees,
                                };
                            }
                        }
                        else {
                            bestRoute_1 = {
                                routeQuote: bestRouteQuoteHops[i],
                                expectedConvertQuoteMinusTxFees: expectedConvertQuoteMinusTxFees,
                            };
                        }
                        _c.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6:
                        if (bestRoute_1) {
                            routeIndex = allRoutes.findIndex(function (r) {
                                return r.expectedConvertQuote ===
                                    bestRoute_1.routeQuote.expectedConvertQuote &&
                                    bestRoute_1.routeQuote.routeText === r.routeText;
                            });
                            allRoutes.splice(routeIndex, 1);
                            allRoutes.unshift(bestRoute_1.routeQuote);
                        }
                        _c.label = 7;
                    case 7: return [2 /*return*/, allRoutes];
                }
            });
        });
    };
    /**
     * Work out the best route quote hops aka the best direct, the best 3 hop and the best 4 hop
     * @param allRoutes All the routes
     * @param enoughAllowanceV2 Has got enough allowance for v2
     * @param enoughAllowanceV3 Has got enough allowance for v3
     */
    UniswapRouterFactory.prototype.getBestRouteQuotesHops = function (allRoutes, enoughAllowanceV2, enoughAllowanceV3) {
        var routes = [];
        for (var i = 0; i < allRoutes.length; i++) {
            if (routes.find(function (r) { return r.routePathArray.length === 2; }) &&
                routes.find(function (r) { return r.routePathArray.length === 3; }) &&
                routes.find(function (r) { return r.routePathArray.length === 4; })) {
                break;
            }
            var route = allRoutes[i];
            if (route.uniswapVersion === uniswap_version_1.UniswapVersion.v2
                ? enoughAllowanceV2
                : enoughAllowanceV3) {
                if (route.routePathArray.length === 2 &&
                    !routes.find(function (r) { return r.routePathArray.length === 2; })) {
                    routes.push(route);
                    continue;
                }
                if (route.routePathArray.length === 3 &&
                    !routes.find(function (r) { return r.routePathArray.length === 3; })) {
                    routes.push(route);
                    continue;
                }
                if (route.routePathArray.length === 4 &&
                    !routes.find(function (r) { return r.routePathArray.length === 4; })) {
                    routes.push(route);
                    continue;
                }
            }
        }
        return routes;
    };
    // /**
    //  * Encode the route path for v3 ( WILL NEED WHEN WE SUPPORT V3 DOING NONE DIRECT ROUTES)
    //  * @param path The path
    //  * @param fees The fees
    //  */
    // public encodeRoutePathV3(path: string[], fees: FeeAmount[]): string {
    //   // to do move
    //   const FEE_SIZE = 3;
    //   if (path.length != fees.length + 1) {
    //     throw new Error('path/fee lengths do not match');
    //   }
    //   let encoded = '0x';
    //   for (let i = 0; i < fees.length; i++) {
    //     // 20 byte encoding of the address
    //     encoded += path[i].slice(2);
    //     // 3 byte encoding of the fee
    //     encoded += fees[i].toString(16).padStart(2 * FEE_SIZE, '0');
    //   }
    //   // encode the final token
    //   encoded += path[path.length - 1].slice(2);
    //   return encoded.toLowerCase();
    // }
    /**
     * Works out every possible route it can take - v2 only
     * @param fromTokenRoutes The from token routes
     * @param toTokenRoutes The to token routes
     * @param allMainRoutes All the main routes
     */
    UniswapRouterFactory.prototype.workOutAllPossibleRoutes = function (fromTokenRoutes, toTokenRoutes, allMainRoutes) {
        var jointCompatibleRoutes = toTokenRoutes.pairs.toTokenPairs.filter(function (t) {
            return fromTokenRoutes.pairs.fromTokenPairs.find(function (f) {
                return f.contractAddress.toLowerCase() === t.contractAddress.toLowerCase();
            });
        });
        var routes = [];
        if (fromTokenRoutes.pairs.fromTokenPairs.find(function (t) {
            return t.contractAddress.toLowerCase() ===
                toTokenRoutes.token.contractAddress.toLowerCase();
        })) {
            routes.push({
                route: [fromTokenRoutes.token, toTokenRoutes.token],
                liquidityProviderFee: this.LIQUIDITY_PROVIDER_FEE_V2,
            });
        }
        var _loop_1 = function (i) {
            var tokenRoute = allMainRoutes[i];
            if (jointCompatibleRoutes.find(function (c) {
                return c.contractAddress.toLowerCase() ===
                    tokenRoute.token.contractAddress.toLowerCase();
            })) {
                routes.push({
                    route: [fromTokenRoutes.token, tokenRoute.token, toTokenRoutes.token],
                    liquidityProviderFee: this_1.LIQUIDITY_PROVIDER_FEE_V2,
                });
                var _loop_2 = function (f) {
                    var fromSupportedToken = fromTokenRoutes.pairs.fromTokenPairs[f];
                    if (tokenRoute.pairs.toTokenPairs.find(function (pair) {
                        return pair.contractAddress.toLowerCase() ===
                            fromSupportedToken.contractAddress.toLowerCase();
                    })) {
                        var workedOutFromRoute = [
                            fromTokenRoutes.token,
                            fromSupportedToken,
                            tokenRoute.token,
                            toTokenRoutes.token,
                        ];
                        if (workedOutFromRoute.filter(only_unique_1.onlyUnique).length ===
                            workedOutFromRoute.length) {
                            routes.push({
                                route: workedOutFromRoute,
                                liquidityProviderFee: this_1.LIQUIDITY_PROVIDER_FEE_V2,
                            });
                        }
                    }
                };
                for (var f = 0; f < fromTokenRoutes.pairs.fromTokenPairs.length; f++) {
                    _loop_2(f);
                }
                var _loop_3 = function (f) {
                    var toSupportedToken = toTokenRoutes.pairs.toTokenPairs[f];
                    if (tokenRoute.pairs.fromTokenPairs.find(function (pair) {
                        return pair.contractAddress.toLowerCase() ===
                            toSupportedToken.contractAddress.toLowerCase();
                    })) {
                        var workedOutToRoute = [
                            fromTokenRoutes.token,
                            tokenRoute.token,
                            toSupportedToken,
                            toTokenRoutes.token,
                        ];
                        if (workedOutToRoute.filter(only_unique_1.onlyUnique).length ===
                            workedOutToRoute.length) {
                            routes.push({
                                route: workedOutToRoute,
                                liquidityProviderFee: this_1.LIQUIDITY_PROVIDER_FEE_V2,
                            });
                        }
                    }
                };
                for (var f = 0; f < toTokenRoutes.pairs.toTokenPairs.length; f++) {
                    _loop_3(f);
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < allMainRoutes.length; i++) {
            _loop_1(i);
        }
        return routes;
    };
    UniswapRouterFactory.prototype.getTokenAvailablePairs = function (token, allAvailablePairs, direction) {
        switch (direction) {
            case router_direction_1.RouterDirection.from:
                return this.getFromRouterDirectionAvailablePairs(token, allAvailablePairs);
            case router_direction_1.RouterDirection.to:
                return this.getToRouterDirectionAvailablePairs(token, allAvailablePairs);
        }
    };
    UniswapRouterFactory.prototype.getFromRouterDirectionAvailablePairs = function (token, allAvailablePairs) {
        var fromRouterDirection = allAvailablePairs.filter(function (c) { return c.reference.split('-')[0] === token.contractAddress; });
        var tokens = [];
        var _loop_4 = function (index) {
            var context = fromRouterDirection[index];
            tokens.push(this_2.allTokens.find(function (t) { return t.contractAddress === context.reference.split('-')[1]; }));
        };
        var this_2 = this;
        for (var index = 0; index < fromRouterDirection.length; index++) {
            _loop_4(index);
        }
        return tokens;
    };
    UniswapRouterFactory.prototype.getToRouterDirectionAvailablePairs = function (token, allAvailablePairs) {
        var toRouterDirection = allAvailablePairs.filter(function (c) { return c.reference.split('-')[1] === token.contractAddress; });
        var tokens = [];
        var _loop_5 = function (index) {
            var context = toRouterDirection[index];
            tokens.push(this_3.allTokens.find(function (t) { return t.contractAddress === context.reference.split('-')[0]; }));
        };
        var this_3 = this;
        for (var index = 0; index < toRouterDirection.length; index++) {
            _loop_5(index);
        }
        return tokens;
    };
    /**
     * Build up route quotes from results
     * @param contractCallResults The contract call results
     * @param direction The direction you want to get the quote from
     */
    UniswapRouterFactory.prototype.buildRouteQuotesFromResults = function (amountToTrade, contractCallResults, direction) {
        var tradePath = this.tradePath();
        var result = [];
        for (var key in contractCallResults.results) {
            var contractCallReturnContext = contractCallResults.results[key];
            if (contractCallReturnContext) {
                for (var i = 0; i < contractCallReturnContext.callsReturnContext.length; i++) {
                    var callReturnContext = contractCallReturnContext.callsReturnContext[i];
                    // console.log(JSON.stringify(callReturnContext, null, 4));
                    if (!callReturnContext.success) {
                        continue;
                    }
                    switch (tradePath) {
                        case trade_path_2.TradePath.ethToErc20:
                            result.push(this.buildRouteQuoteForEthToErc20(amountToTrade, callReturnContext, contractCallReturnContext.originalContractCallContext.context[i], direction, contractCallReturnContext.originalContractCallContext
                                .reference));
                            break;
                        case trade_path_2.TradePath.erc20ToEth:
                            result.push(this.buildRouteQuoteForErc20ToEth(amountToTrade, callReturnContext, contractCallReturnContext.originalContractCallContext.context[i], direction, contractCallReturnContext.originalContractCallContext
                                .reference));
                            break;
                        case trade_path_2.TradePath.erc20ToErc20:
                            result.push(this.buildRouteQuoteForErc20ToErc20(amountToTrade, callReturnContext, contractCallReturnContext.originalContractCallContext.context[i], direction, contractCallReturnContext.originalContractCallContext
                                .reference));
                            break;
                        default:
                            throw new uniswap_error_1.UniswapError(tradePath + " not found", error_codes_1.ErrorCodes.tradePathIsNotSupported);
                    }
                }
            }
        }
        if (direction === trade_direction_1.TradeDirection.input) {
            return result.sort(function (a, b) {
                if (new bignumber_js_1.default(a.expectedConvertQuote).isGreaterThan(b.expectedConvertQuote)) {
                    return -1;
                }
                return new bignumber_js_1.default(a.expectedConvertQuote).isLessThan(b.expectedConvertQuote)
                    ? 1
                    : 0;
            });
        }
        else {
            return result.sort(function (a, b) {
                if (new bignumber_js_1.default(a.expectedConvertQuote).isLessThan(b.expectedConvertQuote)) {
                    return -1;
                }
                return new bignumber_js_1.default(a.expectedConvertQuote).isGreaterThan(b.expectedConvertQuote)
                    ? 1
                    : 0;
            });
        }
    };
    /**
     * Build up the route quote for erc20 > eth (not shared with other method for safety reasons)
     * @param callReturnContext The call return context
     * @param routeContext The route context
     * @param direction The direction you want to get the quote from
     * @param uniswapVersion The uniswap version
     */
    UniswapRouterFactory.prototype.buildRouteQuoteForErc20ToErc20 = function (amountToTrade, callReturnContext, routeContext, direction, uniswapVersion) {
        var _this = this;
        var convertQuoteUnformatted = this.getConvertQuoteUnformatted(callReturnContext, direction, uniswapVersion);
        var expectedConvertQuote = direction === trade_direction_1.TradeDirection.input
            ? convertQuoteUnformatted
                .shiftedBy(this._toToken.decimals * -1)
                .toFixed(this._toToken.decimals)
            : convertQuoteUnformatted
                .shiftedBy(this._fromToken.decimals * -1)
                .toFixed(this._fromToken.decimals);
        var expectedConvertQuoteOrTokenAmountInMaxWithSlippage = this.getExpectedConvertQuoteOrTokenAmountInMaxWithSlippage(expectedConvertQuote, direction, uniswapVersion);
        var tradeExpires = this.generateTradeDeadlineUnixTime();
        var routeQuoteTradeContext = {
            uniswapVersion: uniswapVersion,
            liquidityProviderFee: routeContext.liquidityProviderFee,
            routePathArray: callReturnContext.methodParameters[1],
        };
        var data = direction === trade_direction_1.TradeDirection.input
            ? this.generateTradeDataErc20ToErc20Input(amountToTrade, new bignumber_js_1.default(expectedConvertQuoteOrTokenAmountInMaxWithSlippage), routeQuoteTradeContext, tradeExpires.toString())
            : this.generateTradeDataErc20ToErc20Output(new bignumber_js_1.default(expectedConvertQuoteOrTokenAmountInMaxWithSlippage), amountToTrade, routeQuoteTradeContext, tradeExpires.toString());
        var transaction = this.buildUpTransactionErc20(uniswapVersion, data);
        switch (uniswapVersion) {
            case uniswap_version_1.UniswapVersion.v2:
                return {
                    expectedConvertQuote: expectedConvertQuote,
                    expectedConvertQuoteOrTokenAmountInMaxWithSlippage: expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
                    transaction: transaction,
                    tradeExpires: tradeExpires,
                    routePathArrayTokenMap: callReturnContext.methodParameters[1].map(function (c) {
                        return _this.allTokens.find(function (t) { return t.contractAddress === c; });
                    }),
                    routeText: callReturnContext.methodParameters[1]
                        .map(function (c) {
                        return _this.allTokens.find(function (t) { return t.contractAddress === c; })
                            .symbol;
                    })
                        .join(' > '),
                    // route array is always in the 1 index of the method parameters
                    routePathArray: callReturnContext.methodParameters[1],
                    uniswapVersion: uniswapVersion,
                    liquidityProviderFee: routeContext.liquidityProviderFee,
                    quoteDirection: direction,
                };
            case uniswap_version_1.UniswapVersion.v3:
                return {
                    expectedConvertQuote: expectedConvertQuote,
                    expectedConvertQuoteOrTokenAmountInMaxWithSlippage: expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
                    transaction: transaction,
                    tradeExpires: tradeExpires,
                    routePathArrayTokenMap: [this._fromToken, this._toToken],
                    routeText: this._fromToken.symbol + " > " + this._toToken.symbol,
                    routePathArray: [
                        this._fromToken.contractAddress,
                        this._toToken.contractAddress,
                    ],
                    uniswapVersion: uniswapVersion,
                    liquidityProviderFee: routeContext.liquidityProviderFee,
                    quoteDirection: direction,
                };
            default:
                throw new uniswap_error_1.UniswapError('Invalid uniswap version', uniswapVersion);
        }
    };
    /**
     * Build up the route quote for eth > erc20 (not shared with other method for safety reasons)
     * @param callReturnContext The call return context
     * @param routeContext The route context
     * @param direction The direction you want to get the quote from
     * @param uniswapVersion The uniswap version
     */
    UniswapRouterFactory.prototype.buildRouteQuoteForEthToErc20 = function (amountToTrade, callReturnContext, routeContext, direction, uniswapVersion) {
        var _this = this;
        var _a, _b, _c, _d;
        var convertQuoteUnformatted = this.getConvertQuoteUnformatted(callReturnContext, direction, uniswapVersion);
        var expectedConvertQuote = direction === trade_direction_1.TradeDirection.input
            ? convertQuoteUnformatted
                .shiftedBy(this._toToken.decimals * -1)
                .toFixed(this._toToken.decimals)
            : new bignumber_js_1.default((0, format_ether_1.formatEther)(convertQuoteUnformatted)).toFixed(this._fromToken.decimals);
        var expectedConvertQuoteOrTokenAmountInMaxWithSlippage = this.getExpectedConvertQuoteOrTokenAmountInMaxWithSlippage(expectedConvertQuote, direction, uniswapVersion);
        var tradeExpires = this.generateTradeDeadlineUnixTime();
        var routeQuoteTradeContext = {
            uniswapVersion: uniswapVersion,
            liquidityProviderFee: routeContext.liquidityProviderFee,
            routePathArray: callReturnContext.methodParameters[1],
        };
        var data = direction === trade_direction_1.TradeDirection.input
            ? this.generateTradeDataEthToErc20Input(amountToTrade, new bignumber_js_1.default(expectedConvertQuoteOrTokenAmountInMaxWithSlippage), routeQuoteTradeContext, tradeExpires.toString())
            : this.generateTradeDataEthToErc20Output(new bignumber_js_1.default(expectedConvertQuoteOrTokenAmountInMaxWithSlippage), amountToTrade, routeQuoteTradeContext, tradeExpires.toString());
        var transaction = this.buildUpTransactionEth(uniswapVersion, direction === trade_direction_1.TradeDirection.input
            ? amountToTrade
            : new bignumber_js_1.default(expectedConvertQuote), data);
        switch (uniswapVersion) {
            case uniswap_version_1.UniswapVersion.v2:
                return {
                    expectedConvertQuote: expectedConvertQuote,
                    expectedConvertQuoteOrTokenAmountInMaxWithSlippage: expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
                    transaction: transaction,
                    tradeExpires: tradeExpires,
                    routePathArrayTokenMap: callReturnContext.methodParameters[1].map(function (c, index) {
                        var _a, _b;
                        var token = (0, deep_clone_1.deepClone)(_this.allTokens.find(function (t) { return t.contractAddress === c; }));
                        if (index === 0) {
                            return (0, eth_1.turnTokenIntoEthForResponse)(token, (_b = (_a = _this._settings) === null || _a === void 0 ? void 0 : _a.customNetwork) === null || _b === void 0 ? void 0 : _b.nativeCurrency);
                        }
                        return token;
                    }),
                    routeText: callReturnContext.methodParameters[1]
                        .map(function (c, index) {
                        if (index === 0) {
                            return _this.getNativeTokenSymbol();
                        }
                        return _this.allTokens.find(function (t) { return t.contractAddress === c; })
                            .symbol;
                    })
                        .join(' > '),
                    // route array is always in the 1 index of the method parameters
                    routePathArray: callReturnContext.methodParameters[1],
                    uniswapVersion: uniswapVersion,
                    liquidityProviderFee: routeContext.liquidityProviderFee,
                    quoteDirection: direction,
                };
            case uniswap_version_1.UniswapVersion.v3:
                return {
                    expectedConvertQuote: expectedConvertQuote,
                    expectedConvertQuoteOrTokenAmountInMaxWithSlippage: expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
                    transaction: transaction,
                    tradeExpires: tradeExpires,
                    routePathArrayTokenMap: [
                        (0, eth_1.turnTokenIntoEthForResponse)(this._fromToken, (_b = (_a = this._settings) === null || _a === void 0 ? void 0 : _a.customNetwork) === null || _b === void 0 ? void 0 : _b.nativeCurrency),
                        this._toToken,
                    ],
                    routeText: (0, eth_1.turnTokenIntoEthForResponse)(this._fromToken, (_d = (_c = this._settings) === null || _c === void 0 ? void 0 : _c.customNetwork) === null || _d === void 0 ? void 0 : _d.nativeCurrency).symbol + " > " + this._toToken.symbol,
                    routePathArray: [
                        this._fromToken.contractAddress,
                        this._toToken.contractAddress,
                    ],
                    uniswapVersion: uniswapVersion,
                    liquidityProviderFee: routeContext.liquidityProviderFee,
                    quoteDirection: direction,
                };
            default:
                throw new uniswap_error_1.UniswapError('Invalid uniswap version', uniswapVersion);
        }
    };
    /**
     * Build up the route quote for erc20 > eth (not shared with other method for safety reasons)
     * @param callReturnContext The call return context
     * @param routeContext The route context
     * @param direction The direction you want to get the quote from
     * @param uniswapVersion The uniswap version
     */
    UniswapRouterFactory.prototype.buildRouteQuoteForErc20ToEth = function (amountToTrade, callReturnContext, routeContext, direction, uniswapVersion) {
        var _this = this;
        var _a, _b, _c, _d;
        var convertQuoteUnformatted = this.getConvertQuoteUnformatted(callReturnContext, direction, uniswapVersion);
        var expectedConvertQuote = direction === trade_direction_1.TradeDirection.input
            ? new bignumber_js_1.default((0, format_ether_1.formatEther)(convertQuoteUnformatted)).toFixed(this._toToken.decimals)
            : convertQuoteUnformatted
                .shiftedBy(this._fromToken.decimals * -1)
                .toFixed(this._fromToken.decimals);
        var expectedConvertQuoteOrTokenAmountInMaxWithSlippage = this.getExpectedConvertQuoteOrTokenAmountInMaxWithSlippage(expectedConvertQuote, direction, uniswapVersion);
        var tradeExpires = this.generateTradeDeadlineUnixTime();
        var routeQuoteTradeContext = {
            uniswapVersion: uniswapVersion,
            liquidityProviderFee: routeContext.liquidityProviderFee,
            routePathArray: callReturnContext.methodParameters[1],
        };
        var data = direction === trade_direction_1.TradeDirection.input
            ? this.generateTradeDataErc20ToEthInput(amountToTrade, new bignumber_js_1.default(expectedConvertQuoteOrTokenAmountInMaxWithSlippage), routeQuoteTradeContext, tradeExpires.toString())
            : this.generateTradeDataErc20ToEthOutput(new bignumber_js_1.default(expectedConvertQuoteOrTokenAmountInMaxWithSlippage), amountToTrade, routeQuoteTradeContext, tradeExpires.toString());
        var transaction = this.buildUpTransactionErc20(uniswapVersion, data);
        switch (uniswapVersion) {
            case uniswap_version_1.UniswapVersion.v2:
                return {
                    expectedConvertQuote: expectedConvertQuote,
                    expectedConvertQuoteOrTokenAmountInMaxWithSlippage: expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
                    transaction: transaction,
                    tradeExpires: tradeExpires,
                    routePathArrayTokenMap: callReturnContext.methodParameters[1].map(function (c, index) {
                        var _a, _b;
                        var token = (0, deep_clone_1.deepClone)(_this.allTokens.find(function (t) { return t.contractAddress === c; }));
                        if (index === callReturnContext.methodParameters[1].length - 1) {
                            return (0, eth_1.turnTokenIntoEthForResponse)(token, (_b = (_a = _this._settings) === null || _a === void 0 ? void 0 : _a.customNetwork) === null || _b === void 0 ? void 0 : _b.nativeCurrency);
                        }
                        return token;
                    }),
                    routeText: callReturnContext.methodParameters[1]
                        .map(function (c, index) {
                        if (index === callReturnContext.methodParameters[1].length - 1) {
                            return _this.getNativeTokenSymbol();
                        }
                        return _this.allTokens.find(function (t) { return t.contractAddress === c; })
                            .symbol;
                    })
                        .join(' > '),
                    // route array is always in the 1 index of the method parameters
                    routePathArray: callReturnContext.methodParameters[1],
                    uniswapVersion: uniswapVersion,
                    liquidityProviderFee: routeContext.liquidityProviderFee,
                    quoteDirection: direction,
                };
            case uniswap_version_1.UniswapVersion.v3:
                return {
                    expectedConvertQuote: expectedConvertQuote,
                    expectedConvertQuoteOrTokenAmountInMaxWithSlippage: expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
                    transaction: transaction,
                    tradeExpires: tradeExpires,
                    routePathArrayTokenMap: [
                        this._fromToken,
                        (0, eth_1.turnTokenIntoEthForResponse)(this._toToken, (_b = (_a = this._settings) === null || _a === void 0 ? void 0 : _a.customNetwork) === null || _b === void 0 ? void 0 : _b.nativeCurrency),
                    ],
                    routeText: this._fromToken.symbol + " > " + (0, eth_1.turnTokenIntoEthForResponse)(this._toToken, (_d = (_c = this._settings) === null || _c === void 0 ? void 0 : _c.customNetwork) === null || _d === void 0 ? void 0 : _d.nativeCurrency).symbol,
                    routePathArray: [
                        this._fromToken.contractAddress,
                        this._toToken.contractAddress,
                    ],
                    uniswapVersion: uniswapVersion,
                    liquidityProviderFee: routeContext.liquidityProviderFee,
                    quoteDirection: direction,
                };
            default:
                throw new uniswap_error_1.UniswapError('Invalid uniswap version', uniswapVersion);
        }
    };
    /**
     * Get the convert quote unformatted from the call return context
     * @param callReturnContext The call return context
     * @param direction The direction you want to get the quote from
     * @param uniswapVersion The uniswap version
     */
    UniswapRouterFactory.prototype.getConvertQuoteUnformatted = function (callReturnContext, direction, uniswapVersion) {
        switch (uniswapVersion) {
            case uniswap_version_1.UniswapVersion.v2:
                if (direction === trade_direction_1.TradeDirection.input) {
                    return new bignumber_js_1.default(callReturnContext.returnValues[callReturnContext.returnValues.length - 1].hex);
                }
                else {
                    return new bignumber_js_1.default(callReturnContext.returnValues[0].hex);
                }
            case uniswap_version_1.UniswapVersion.v3:
                return new bignumber_js_1.default(callReturnContext.returnValues[0].hex);
            default:
                throw new uniswap_error_1.UniswapError('Invalid uniswap version', uniswapVersion);
        }
    };
    /**
     * Work out the expected convert quote taking off slippage
     * @param expectedConvertQuote The expected convert quote
     */
    UniswapRouterFactory.prototype.getExpectedConvertQuoteOrTokenAmountInMaxWithSlippage = function (expectedConvertQuote, tradeDirection, uniswapVersion) {
        var decimals = tradeDirection === trade_direction_1.TradeDirection.input
            ? this._toToken.decimals
            : this._fromToken.decimals;
        if (tradeDirection === trade_direction_1.TradeDirection.output &&
            uniswapVersion === uniswap_version_1.UniswapVersion.v3) {
            return new bignumber_js_1.default(expectedConvertQuote)
                .plus(new bignumber_js_1.default(expectedConvertQuote)
                .times(this._settings.slippage)
                .toFixed(decimals))
                .toFixed(decimals);
        }
        return new bignumber_js_1.default(expectedConvertQuote)
            .minus(new bignumber_js_1.default(expectedConvertQuote)
            .times(this._settings.slippage)
            .toFixed(decimals))
            .toFixed(decimals);
    };
    /**
     * Format amount to trade into callable formats
     * @param amountToTrade The amount to trade
     * @param direction The direction you want to get the quote from
     */
    UniswapRouterFactory.prototype.formatAmountToTrade = function (amountToTrade, direction) {
        switch (this.tradePath()) {
            case trade_path_2.TradePath.ethToErc20:
                if (direction == trade_direction_1.TradeDirection.input) {
                    var amountToTradeWei = (0, parse_ether_1.parseEther)(amountToTrade);
                    return (0, hexlify_1.hexlify)(amountToTradeWei);
                }
                else {
                    return (0, hexlify_1.hexlify)(amountToTrade.shiftedBy(this._toToken.decimals));
                }
            case trade_path_2.TradePath.erc20ToEth:
                if (direction == trade_direction_1.TradeDirection.input) {
                    return (0, hexlify_1.hexlify)(amountToTrade.shiftedBy(this._fromToken.decimals));
                }
                else {
                    var amountToTradeWei = (0, parse_ether_1.parseEther)(amountToTrade);
                    return (0, hexlify_1.hexlify)(amountToTradeWei);
                }
            case trade_path_2.TradePath.erc20ToErc20:
                if (direction == trade_direction_1.TradeDirection.input) {
                    return (0, hexlify_1.hexlify)(amountToTrade.shiftedBy(this._fromToken.decimals));
                }
                else {
                    return (0, hexlify_1.hexlify)(amountToTrade.shiftedBy(this._toToken.decimals));
                }
            default:
                throw new uniswap_error_1.UniswapError("Internal trade path " + this.tradePath() + " is not supported", error_codes_1.ErrorCodes.tradePathIsNotSupported);
        }
    };
    /**
     * Get the trade path
     */
    UniswapRouterFactory.prototype.tradePath = function () {
        var _a;
        var network = this._ethersProvider.network();
        return (0, trade_path_1.getTradePath)(network.chainId, this._fromToken, this._toToken, (_a = this._settings.customNetwork) === null || _a === void 0 ? void 0 : _a.nativeWrappedTokenInfo);
    };
    Object.defineProperty(UniswapRouterFactory.prototype, "allTokens", {
        get: function () {
            return __spreadArray([this._fromToken, this._toToken], this.allMainTokens, true);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniswapRouterFactory.prototype, "allMainTokens", {
        get: function () {
            if (this._ethersProvider.provider.network.chainId === chain_id_1.ChainId.MAINNET ||
                this._settings.customNetwork) {
                var tokens = [
                    this.USDTTokenForConnectedNetwork,
                    this.COMPTokenForConnectedNetwork,
                    this.USDCTokenForConnectedNetwork,
                    this.DAITokenForConnectedNetwork,
                    this.WETHTokenForConnectedNetwork,
                    this.WBTCTokenForConnectedNetwork,
                ];
                return tokens.filter(function (t) { return t !== undefined; });
            }
            return [this.WETHTokenForConnectedNetwork];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniswapRouterFactory.prototype, "mainCurrenciesPairsForFromToken", {
        get: function () {
            if (this._ethersProvider.provider.network.chainId === chain_id_1.ChainId.MAINNET ||
                this._settings.customNetwork) {
                var pairs_1 = [
                    [this._fromToken, this.USDTTokenForConnectedNetwork],
                    [this._fromToken, this.COMPTokenForConnectedNetwork],
                    [this._fromToken, this.USDCTokenForConnectedNetwork],
                    [this._fromToken, this.DAITokenForConnectedNetwork],
                    [this._fromToken, this.WBTCTokenForConnectedNetwork],
                ];
                if (!(0, eth_1.isNativeEth)(this._fromToken.contractAddress) &&
                    !(0, eth_1.isNativeEth)(this._toToken.contractAddress)) {
                    pairs_1.push([this._fromToken, this.WETHTokenForConnectedNetwork]);
                }
                return this.filterUndefinedTokens(pairs_1).filter(function (t) { return t[0].contractAddress !== t[1].contractAddress; });
            }
            var pairs = [[this._fromToken, this.WETHTokenForConnectedNetwork]];
            return pairs.filter(function (t) { return t[0].contractAddress !== t[1].contractAddress; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniswapRouterFactory.prototype, "mainCurrenciesPairsForToToken", {
        get: function () {
            if (this._ethersProvider.provider.network.chainId === chain_id_1.ChainId.MAINNET ||
                this._settings.customNetwork) {
                var pairs_2 = [
                    [this.USDTTokenForConnectedNetwork, this._toToken],
                    [this.COMPTokenForConnectedNetwork, this._toToken],
                    [this.USDCTokenForConnectedNetwork, this._toToken],
                    [this.DAITokenForConnectedNetwork, this._toToken],
                    [this.WBTCTokenForConnectedNetwork, this._toToken],
                ];
                if (!(0, eth_1.isNativeEth)(this._toToken.contractAddress) &&
                    !(0, eth_1.isNativeEth)(this._toToken.contractAddress)) {
                    pairs_2.push([this.WETHTokenForConnectedNetwork, this._toToken]);
                }
                return this.filterUndefinedTokens(pairs_2).filter(function (t) { return t[0].contractAddress !== t[1].contractAddress; });
            }
            var pairs = [
                [this.WETHTokenForConnectedNetwork, this._toToken],
            ];
            return pairs.filter(function (t) { return t[0].contractAddress !== t[1].contractAddress; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniswapRouterFactory.prototype, "mainCurrenciesPairsForUSDT", {
        get: function () {
            if (this._ethersProvider.provider.network.chainId === chain_id_1.ChainId.MAINNET ||
                this._settings.customNetwork) {
                var pairs = [
                    [this.USDTTokenForConnectedNetwork, this.COMPTokenForConnectedNetwork],
                    [this.USDTTokenForConnectedNetwork, this.DAITokenForConnectedNetwork],
                    [this.USDTTokenForConnectedNetwork, this.USDCTokenForConnectedNetwork],
                    [this.USDTTokenForConnectedNetwork, this.WBTCTokenForConnectedNetwork],
                ];
                if (!(0, eth_1.isNativeEth)(this._fromToken.contractAddress) &&
                    !(0, eth_1.isNativeEth)(this._toToken.contractAddress)) {
                    pairs.push([
                        this.USDTTokenForConnectedNetwork,
                        this.WETHTokenForConnectedNetwork,
                    ]);
                }
                return this.filterUndefinedTokens(pairs);
            }
            return [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniswapRouterFactory.prototype, "mainCurrenciesPairsForCOMP", {
        get: function () {
            if (this._ethersProvider.provider.network.chainId === chain_id_1.ChainId.MAINNET ||
                this._settings.customNetwork) {
                var pairs = [
                    [this.COMPTokenForConnectedNetwork, this.USDTTokenForConnectedNetwork],
                    [this.COMPTokenForConnectedNetwork, this.DAITokenForConnectedNetwork],
                    [this.COMPTokenForConnectedNetwork, this.USDCTokenForConnectedNetwork],
                ];
                if (!(0, eth_1.isNativeEth)(this._fromToken.contractAddress) &&
                    !(0, eth_1.isNativeEth)(this._toToken.contractAddress)) {
                    pairs.push([
                        this.COMPTokenForConnectedNetwork,
                        this.WETHTokenForConnectedNetwork,
                    ]);
                }
                return this.filterUndefinedTokens(pairs);
            }
            return [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniswapRouterFactory.prototype, "mainCurrenciesPairsForDAI", {
        get: function () {
            if (this._ethersProvider.provider.network.chainId === chain_id_1.ChainId.MAINNET ||
                this._settings.customNetwork) {
                var pairs = [
                    [this.DAITokenForConnectedNetwork, this.COMPTokenForConnectedNetwork],
                    [this.DAITokenForConnectedNetwork, this.WBTCTokenForConnectedNetwork],
                    [this.DAITokenForConnectedNetwork, this.USDTTokenForConnectedNetwork],
                    [this.DAITokenForConnectedNetwork, this.USDCTokenForConnectedNetwork],
                ];
                if (!(0, eth_1.isNativeEth)(this._fromToken.contractAddress) &&
                    !(0, eth_1.isNativeEth)(this._toToken.contractAddress)) {
                    pairs.push([
                        this.DAITokenForConnectedNetwork,
                        this.WETHTokenForConnectedNetwork,
                    ]);
                }
                return this.filterUndefinedTokens(pairs);
            }
            return [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniswapRouterFactory.prototype, "mainCurrenciesPairsForUSDC", {
        get: function () {
            if (this._ethersProvider.provider.network.chainId === chain_id_1.ChainId.MAINNET ||
                this._settings.customNetwork) {
                var pairs = [
                    [this.USDCTokenForConnectedNetwork, this.USDTTokenForConnectedNetwork],
                    [this.USDCTokenForConnectedNetwork, this.COMPTokenForConnectedNetwork],
                    [this.USDCTokenForConnectedNetwork, this.DAITokenForConnectedNetwork],
                    [this.USDCTokenForConnectedNetwork, this.WBTCTokenForConnectedNetwork],
                ];
                if (!(0, eth_1.isNativeEth)(this._fromToken.contractAddress) &&
                    !(0, eth_1.isNativeEth)(this._toToken.contractAddress)) {
                    pairs.push([
                        this.USDCTokenForConnectedNetwork,
                        this.WETHTokenForConnectedNetwork,
                    ]);
                }
                return this.filterUndefinedTokens(pairs);
            }
            return [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniswapRouterFactory.prototype, "mainCurrenciesPairsForWBTC", {
        get: function () {
            if (this._ethersProvider.provider.network.chainId === chain_id_1.ChainId.MAINNET ||
                this._settings.customNetwork) {
                var tokens = [
                    [this.WBTCTokenForConnectedNetwork, this.USDTTokenForConnectedNetwork],
                    [this.WBTCTokenForConnectedNetwork, this.DAITokenForConnectedNetwork],
                    [this.WBTCTokenForConnectedNetwork, this.USDCTokenForConnectedNetwork],
                    [this.WBTCTokenForConnectedNetwork, this.WETHTokenForConnectedNetwork],
                ];
                return this.filterUndefinedTokens(tokens);
            }
            return [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniswapRouterFactory.prototype, "mainCurrenciesPairsForWETH", {
        get: function () {
            if (this._ethersProvider.provider.network.chainId === chain_id_1.ChainId.MAINNET ||
                this._settings.customNetwork) {
                var tokens = [
                    [this.WETHTokenForConnectedNetwork, this.USDTTokenForConnectedNetwork],
                    [this.WETHTokenForConnectedNetwork, this.COMPTokenForConnectedNetwork],
                    [this.WETHTokenForConnectedNetwork, this.DAITokenForConnectedNetwork],
                    [this.WETHTokenForConnectedNetwork, this.USDCTokenForConnectedNetwork],
                    [this.WETHTokenForConnectedNetwork, this.WBTCTokenForConnectedNetwork],
                ];
                return this.filterUndefinedTokens(tokens);
            }
            return [];
        },
        enumerable: false,
        configurable: true
    });
    UniswapRouterFactory.prototype.filterUndefinedTokens = function (tokens) {
        return tokens.filter(function (t) { return t[0] !== undefined && t[1] !== undefined; });
    };
    Object.defineProperty(UniswapRouterFactory.prototype, "USDTTokenForConnectedNetwork", {
        get: function () {
            var _a;
            if (this._settings.customNetwork) {
                return (_a = this._settings.customNetwork.baseTokens) === null || _a === void 0 ? void 0 : _a.usdt;
            }
            return usdt_1.USDT.token(this._ethersProvider.provider.network.chainId);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniswapRouterFactory.prototype, "COMPTokenForConnectedNetwork", {
        get: function () {
            var _a;
            if (this._settings.customNetwork) {
                return (_a = this._settings.customNetwork.baseTokens) === null || _a === void 0 ? void 0 : _a.comp;
            }
            return comp_1.COMP.token(this._ethersProvider.provider.network.chainId);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniswapRouterFactory.prototype, "DAITokenForConnectedNetwork", {
        get: function () {
            var _a;
            if (this._settings.customNetwork) {
                return (_a = this._settings.customNetwork.baseTokens) === null || _a === void 0 ? void 0 : _a.dai;
            }
            return dai_1.DAI.token(this._ethersProvider.provider.network.chainId);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniswapRouterFactory.prototype, "USDCTokenForConnectedNetwork", {
        get: function () {
            var _a;
            if (this._settings.customNetwork) {
                return (_a = this._settings.customNetwork.baseTokens) === null || _a === void 0 ? void 0 : _a.usdc;
            }
            return usdc_1.USDC.token(this._ethersProvider.provider.network.chainId);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniswapRouterFactory.prototype, "WETHTokenForConnectedNetwork", {
        get: function () {
            if (this._settings.customNetwork) {
                return this._settings.customNetwork.nativeWrappedTokenInfo;
            }
            return weth_1.WETHContract.token(this._ethersProvider.provider.network.chainId);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniswapRouterFactory.prototype, "WBTCTokenForConnectedNetwork", {
        get: function () {
            var _a;
            if (this._settings.customNetwork) {
                return (_a = this._settings.customNetwork.baseTokens) === null || _a === void 0 ? void 0 : _a.wbtc;
            }
            return wbtc_1.WBTC.token(this._ethersProvider.provider.network.chainId);
        },
        enumerable: false,
        configurable: true
    });
    UniswapRouterFactory.prototype.getNativeTokenSymbol = function () {
        if (this._settings.customNetwork) {
            return this._settings.customNetwork.nativeCurrency.symbol;
        }
        return eth_1.ETH_SYMBOL;
    };
    return UniswapRouterFactory;
}());
exports.UniswapRouterFactory = UniswapRouterFactory;
//# sourceMappingURL=uniswap-router.factory.js.map