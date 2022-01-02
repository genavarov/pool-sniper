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
exports.UniswapPair = void 0;
var coin_gecko_1 = require("../../coin-gecko");
var error_codes_1 = require("../../common/errors/error-codes");
var uniswap_error_1 = require("../../common/errors/uniswap-error");
var get_address_1 = require("../../common/utils/get-address");
var is_address_1 = require("../../common/utils/is-address");
var chain_id_1 = require("../../enums/chain-id");
var ethers_provider_1 = require("../../ethers-provider");
var tokens_factory_1 = require("../token/tokens.factory");
var uniswap_pair_settings_1 = require("./models/uniswap-pair-settings");
var uniswap_pair_factory_1 = require("./uniswap-pair.factory");
var UniswapPair = /** @class */ (function () {
    function UniswapPair(_uniswapPairContext) {
        var _a, _b;
        this._uniswapPairContext = _uniswapPairContext;
        if (!this._uniswapPairContext.fromTokenContractAddress) {
            throw new uniswap_error_1.UniswapError('Must have a `fromTokenContractAddress` on the context', error_codes_1.ErrorCodes.fromTokenContractAddressRequired);
        }
        if (!(0, is_address_1.isAddress)(this._uniswapPairContext.fromTokenContractAddress)) {
            throw new uniswap_error_1.UniswapError('`fromTokenContractAddress` is not a valid contract address', error_codes_1.ErrorCodes.fromTokenContractAddressNotValid);
        }
        this._uniswapPairContext.fromTokenContractAddress = (0, get_address_1.getAddress)(this._uniswapPairContext.fromTokenContractAddress, true);
        if (!this._uniswapPairContext.toTokenContractAddress) {
            throw new uniswap_error_1.UniswapError('Must have a `toTokenContractAddress` on the context', error_codes_1.ErrorCodes.toTokenContractAddressRequired);
        }
        if (!(0, is_address_1.isAddress)(this._uniswapPairContext.toTokenContractAddress)) {
            throw new uniswap_error_1.UniswapError('`toTokenContractAddress` is not a valid contract address', error_codes_1.ErrorCodes.toTokenContractAddressNotValid);
        }
        this._uniswapPairContext.toTokenContractAddress = (0, get_address_1.getAddress)(this._uniswapPairContext.toTokenContractAddress, true);
        if (!this._uniswapPairContext.ethereumAddress) {
            throw new uniswap_error_1.UniswapError('Must have a `ethereumAddress` on the context', error_codes_1.ErrorCodes.ethereumAddressRequired);
        }
        if (!(0, is_address_1.isAddress)(this._uniswapPairContext.ethereumAddress)) {
            throw new uniswap_error_1.UniswapError('`ethereumAddress` is not a valid address', error_codes_1.ErrorCodes.ethereumAddressNotValid);
        }
        this._uniswapPairContext.ethereumAddress = (0, get_address_1.getAddress)(this._uniswapPairContext.ethereumAddress);
        var chainId = this._uniswapPairContext
            .chainId;
        var providerUrl = (this._uniswapPairContext).providerUrl;
        if (providerUrl && chainId) {
            this._ethersProvider = new ethers_provider_1.EthersProvider({
                chainId: chainId,
                providerUrl: providerUrl,
                customNetwork: (_a = this._uniswapPairContext.settings) === null || _a === void 0 ? void 0 : _a.customNetwork,
            });
            return;
        }
        if (chainId) {
            this._ethersProvider = new ethers_provider_1.EthersProvider({ chainId: chainId });
            return;
        }
        var ethereumProvider = (this._uniswapPairContext).ethereumProvider;
        if (ethereumProvider) {
            this._ethersProvider = new ethers_provider_1.EthersProvider({
                ethereumProvider: ethereumProvider,
                customNetwork: (_b = this._uniswapPairContext.settings) === null || _b === void 0 ? void 0 : _b.customNetwork,
            });
            return;
        }
        throw new uniswap_error_1.UniswapError('Your must supply a chainId or a ethereum provider please look at types `UniswapPairContextForEthereumProvider`, `UniswapPairContextForChainId` and `UniswapPairContextForProviderUrl` to make sure your object is correct in what your passing in', error_codes_1.ErrorCodes.invalidPairContext);
    }
    /**
     * Create factory to be able to call methods on the 2 tokens
     */
    UniswapPair.prototype.createFactory = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var chainId, tokensFactory, tokens, uniswapFactoryContext;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (((_a = this._uniswapPairContext.settings) === null || _a === void 0 ? void 0 : _a.customNetwork) === undefined) {
                            chainId = this._ethersProvider.network().chainId;
                            if (chainId !== chain_id_1.ChainId.MAINNET &&
                                chainId !== chain_id_1.ChainId.ROPSTEN &&
                                chainId !== chain_id_1.ChainId.RINKEBY &&
                                chainId !== chain_id_1.ChainId.GÖRLI &&
                                chainId !== chain_id_1.ChainId.KOVAN) {
                                throw new uniswap_error_1.UniswapError("ChainId - " + chainId + " is not supported. This lib only supports mainnet(1), ropsten(4), kovan(42), rinkeby(4), and g\u00F6rli(5)", error_codes_1.ErrorCodes.chainIdNotSupported);
                            }
                        }
                        tokensFactory = new tokens_factory_1.TokensFactory(this._ethersProvider, (_b = this._uniswapPairContext.settings) === null || _b === void 0 ? void 0 : _b.customNetwork);
                        return [4 /*yield*/, tokensFactory.getTokens([
                                this._uniswapPairContext.fromTokenContractAddress,
                                this._uniswapPairContext.toTokenContractAddress,
                            ])];
                    case 1:
                        tokens = _c.sent();
                        uniswapFactoryContext = {
                            fromToken: tokens.find(function (t) {
                                return t.contractAddress.toLowerCase() ===
                                    _this._uniswapPairContext.fromTokenContractAddress.toLowerCase();
                            }),
                            toToken: tokens.find(function (t) {
                                return t.contractAddress.toLowerCase() ===
                                    _this._uniswapPairContext.toTokenContractAddress.toLowerCase();
                            }),
                            ethereumAddress: this._uniswapPairContext.ethereumAddress,
                            settings: this._uniswapPairContext.settings || new uniswap_pair_settings_1.UniswapPairSettings(),
                            ethersProvider: this._ethersProvider,
                        };
                        return [2 /*return*/, new uniswap_pair_factory_1.UniswapPairFactory(new coin_gecko_1.CoinGecko(), uniswapFactoryContext)];
                }
            });
        });
    };
    return UniswapPair;
}());
exports.UniswapPair = UniswapPair;
//# sourceMappingURL=uniswap-pair.js.map