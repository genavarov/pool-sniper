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
exports.TokenFactory = void 0;
var ethers_1 = require("ethers");
var contract_context_1 = require("../../common/contract-context");
var eth_1 = require("../../common/tokens/eth");
var overrides_1 = require("../../common/tokens/overrides");
var get_address_1 = require("../../common/utils/get-address");
var custom_multicall_1 = require("../../custom-multicall");
var uniswap_version_1 = require("../../enums/uniswap-version");
var get_uniswap_contracts_1 = require("../../uniswap-contract-context/get-uniswap-contracts");
var TokenFactory = /** @class */ (function () {
    function TokenFactory(_tokenContractAddress, _ethersProvider, _customNetwork, _cloneUniswapContractDetails) {
        var _a;
        this._tokenContractAddress = _tokenContractAddress;
        this._ethersProvider = _ethersProvider;
        this._customNetwork = _customNetwork;
        this._cloneUniswapContractDetails = _cloneUniswapContractDetails;
        this._multicall = new custom_multicall_1.CustomMulticall(this._ethersProvider.provider, (_a = this._customNetwork) === null || _a === void 0 ? void 0 : _a.multicallContractAddress);
        this._erc20TokenContract = this._ethersProvider.getContract(JSON.stringify(contract_context_1.ContractContext.erc20Abi), (0, get_address_1.getAddress)(this._tokenContractAddress));
    }
    /**
     * Get the token details
     */
    TokenFactory.prototype.getToken = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var overridenToken, SYMBOL, DECIMALS, NAME, contractCallContext, contractCallResults, results;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(0, eth_1.isNativeEth)(this._tokenContractAddress)) return [3 /*break*/, 1];
                        return [2 /*return*/, eth_1.ETH.info(this._ethersProvider.network().chainId, (_a = this._customNetwork) === null || _a === void 0 ? void 0 : _a.nativeWrappedTokenInfo)];
                    case 1:
                        overridenToken = (0, overrides_1.isTokenOverrideInfo)(this._tokenContractAddress);
                        if (overridenToken) {
                            return [2 /*return*/, overridenToken];
                        }
                        SYMBOL = 0;
                        DECIMALS = 1;
                        NAME = 2;
                        contractCallContext = {
                            reference: 'token',
                            contractAddress: (0, get_address_1.getAddress)(this._tokenContractAddress),
                            abi: contract_context_1.ContractContext.erc20Abi,
                            calls: [
                                {
                                    reference: "symbol",
                                    methodName: 'symbol',
                                    methodParameters: [],
                                },
                                {
                                    reference: "decimals",
                                    methodName: 'decimals',
                                    methodParameters: [],
                                },
                                {
                                    reference: "name",
                                    methodName: 'name',
                                    methodParameters: [],
                                },
                            ],
                        };
                        return [4 /*yield*/, this._multicall.call(contractCallContext)];
                    case 2:
                        contractCallResults = _b.sent();
                        results = contractCallResults.results[contractCallContext.reference];
                        return [2 /*return*/, {
                                chainId: this._ethersProvider.network().chainId,
                                contractAddress: results.originalContractCallContext.contractAddress,
                                symbol: results.callsReturnContext[SYMBOL].returnValues[0],
                                decimals: results.callsReturnContext[DECIMALS].returnValues[0],
                                name: results.callsReturnContext[NAME].returnValues[0],
                            }];
                }
            });
        });
    };
    /**
     * Get the allowance for the amount which can be moved from the contract
     * for a user
     * @param uniswapVersion The uniswap version
     * @ethereumAddress The users ethereum address
     */
    TokenFactory.prototype.allowance = function (uniswapVersion, ethereumAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var allowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(0, eth_1.isNativeEth)(this._tokenContractAddress)) return [3 /*break*/, 1];
                        return [2 /*return*/, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'];
                    case 1: return [4 /*yield*/, this._erc20TokenContract.allowance(ethereumAddress, uniswapVersion === uniswap_version_1.UniswapVersion.v2
                            ? get_uniswap_contracts_1.uniswapContracts.v2.getRouterAddress(this._cloneUniswapContractDetails)
                            : get_uniswap_contracts_1.uniswapContracts.v3.getRouterAddress(this._cloneUniswapContractDetails))];
                    case 2:
                        allowance = _a.sent();
                        return [2 /*return*/, allowance.toHexString()];
                }
            });
        });
    };
    /**
     * Generate the token approve data allowance to move the tokens.
     * This will return the data for you to send as a transaction
     * @spender The contract address for which you are allowing to move tokens on your behalf
     * @value The amount you want to allow them to do
     */
    TokenFactory.prototype.generateApproveAllowanceData = function (spender, value) {
        if ((0, eth_1.isNativeEth)(this._tokenContractAddress)) {
            throw new Error('ETH does not need any allowance data');
        }
        return this._erc20TokenContract.interface.encodeFunctionData('approve', [
            spender,
            value,
        ]);
    };
    /**
     * Get the balance the user has of this token
     * @ethereumAddress The users ethereum address
     */
    TokenFactory.prototype.balanceOf = function (ethereumAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(0, eth_1.isNativeEth)(this._tokenContractAddress)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._ethersProvider.balanceOf(ethereumAddress)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, this._erc20TokenContract.balanceOf(ethereumAddress)];
                    case 3:
                        balance = _a.sent();
                        return [2 /*return*/, balance.toHexString()];
                }
            });
        });
    };
    /**
     * Get the total supply of tokens which exist
     */
    TokenFactory.prototype.totalSupply = function () {
        return __awaiter(this, void 0, void 0, function () {
            var totalSupply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._erc20TokenContract.totalSupply()];
                    case 1:
                        totalSupply = _a.sent();
                        return [2 /*return*/, totalSupply.toHexString()];
                }
            });
        });
    };
    /**
     * Get allowance and balance
     * @param ethereumAddress The ethereum address
     */
    TokenFactory.prototype.getAllowanceAndBalanceOf = function (ethereumAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var ALLOWANCE, BALANCEOF, contractCallContext, contractCallResults, resultsV2, resultsV3;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(0, eth_1.isNativeEth)(this._tokenContractAddress)) return [3 /*break*/, 2];
                        _a = {
                            allowanceV2: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
                            allowanceV3: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
                        };
                        return [4 /*yield*/, this.balanceOf(ethereumAddress)];
                    case 1: return [2 /*return*/, (_a.balanceOf = _b.sent(),
                            _a)];
                    case 2:
                        ALLOWANCE = 0;
                        BALANCEOF = 1;
                        contractCallContext = [];
                        contractCallContext.push(this.buildAllowanceAndBalanceContractCallContext(ethereumAddress, uniswap_version_1.UniswapVersion.v2));
                        contractCallContext.push(this.buildAllowanceAndBalanceContractCallContext(ethereumAddress, uniswap_version_1.UniswapVersion.v3));
                        return [4 /*yield*/, this._multicall.call(contractCallContext)];
                    case 3:
                        contractCallResults = _b.sent();
                        resultsV2 = contractCallResults.results[uniswap_version_1.UniswapVersion.v2];
                        resultsV3 = contractCallResults.results[uniswap_version_1.UniswapVersion.v3];
                        return [2 /*return*/, {
                                allowanceV2: ethers_1.BigNumber.from(resultsV2.callsReturnContext[ALLOWANCE].returnValues[0]).toHexString(),
                                allowanceV3: ethers_1.BigNumber.from(resultsV3.callsReturnContext[ALLOWANCE].returnValues[0]).toHexString(),
                                balanceOf: ethers_1.BigNumber.from(resultsV2.callsReturnContext[BALANCEOF].returnValues[0]).toHexString(),
                            }];
                }
            });
        });
    };
    TokenFactory.prototype.buildAllowanceAndBalanceContractCallContext = function (ethereumAddress, uniswapVersion) {
        return {
            reference: uniswapVersion,
            contractAddress: (0, get_address_1.getAddress)(this._tokenContractAddress),
            abi: contract_context_1.ContractContext.erc20Abi,
            calls: [
                {
                    reference: 'allowance',
                    methodName: 'allowance',
                    methodParameters: [
                        ethereumAddress,
                        uniswapVersion === uniswap_version_1.UniswapVersion.v2
                            ? get_uniswap_contracts_1.uniswapContracts.v2.getRouterAddress(this._cloneUniswapContractDetails)
                            : get_uniswap_contracts_1.uniswapContracts.v3.getRouterAddress(this._cloneUniswapContractDetails),
                    ],
                },
                {
                    reference: 'balanceOf',
                    methodName: 'balanceOf',
                    methodParameters: [ethereumAddress],
                },
            ],
        };
    };
    return TokenFactory;
}());
exports.TokenFactory = TokenFactory;
//# sourceMappingURL=token.factory.js.map