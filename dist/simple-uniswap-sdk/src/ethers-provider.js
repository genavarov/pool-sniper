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
exports.EthersProvider = void 0;
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var ethers_1 = require("ethers");
var error_codes_1 = require("./common/errors/error-codes");
var uniswap_error_1 = require("./common/errors/uniswap-error");
var chain_id_1 = require("./enums/chain-id");
var EthersProvider = /** @class */ (function () {
    function EthersProvider(_providerContext) {
        this._providerContext = _providerContext;
        var chainId = this._providerContext.chainId;
        if (chainId) {
            var chainName = this.getChainName(chainId);
            var providerUrl = this._providerContext
                .providerUrl;
            if (providerUrl) {
                this._ethersProvider = new ethers_1.providers.StaticJsonRpcProvider(providerUrl, {
                    name: chainName,
                    chainId: chainId,
                });
            }
            else {
                this._ethersProvider = new ethers_1.providers.InfuraProvider(chainId, this._getApiKey);
            }
        }
        else {
            var ethereumProvider = this._providerContext
                .ethereumProvider;
            if (!ethereumProvider) {
                throw new uniswap_error_1.UniswapError('Wrong ethers provider context', error_codes_1.ErrorCodes.wrongEthersProviderContext);
            }
            if (ethereumProvider._isProvider) {
                this._ethersProvider = ethereumProvider;
            }
            else {
                this._ethersProvider = new ethers_1.providers.Web3Provider(ethereumProvider);
            }
        }
    }
    /**
     * Get the chain name
     * @param chainId The chain id
     * @returns
     */
    EthersProvider.prototype.getChainName = function (chainId) {
        if (this._providerContext.customNetwork) {
            return this._providerContext.customNetwork.nameNetwork;
        }
        var chainName = chain_id_1.ChainNames.get(chainId);
        if (!chainName) {
            throw new uniswap_error_1.UniswapError("Can not find chain name for " + chainId + ". This lib only supports mainnet(1), ropsten(4), kovan(42), rinkeby(4) and g\u00F6rli(5)", error_codes_1.ErrorCodes.canNotFindChainId);
        }
        return chainName;
    };
    /**
     * Creates a contract instance
     * @param abi The ABI
     * @param contractAddress The contract address
     */
    EthersProvider.prototype.getContract = function (abi, contractAddress) {
        var contract = new ethers_1.Contract(contractAddress, abi, this._ethersProvider);
        return contract;
    };
    /**
     * Get the network
     */
    EthersProvider.prototype.network = function () {
        if (this._ethersProvider.network) {
            return this._ethersProvider.network;
        }
        // @ts-ignore
        if (this._ethersProvider.provider) {
            // @ts-ignore
            var chainId = this._ethersProvider.provider.chainId;
            if (chainId) {
                var chainIdNumber = new bignumber_js_1.default(chainId).toNumber();
                var chainName = chain_id_1.ChainNames.get(chainIdNumber);
                if (chainName) {
                    return {
                        chainId: chainIdNumber,
                        name: chainName,
                    };
                }
            }
        }
        throw new uniswap_error_1.UniswapError('chainId can not be found on the provider', error_codes_1.ErrorCodes.chainIdCanNotBeFound);
    };
    Object.defineProperty(EthersProvider.prototype, "provider", {
        /**
         * Get the ethers provider
         */
        get: function () {
            return this._ethersProvider;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Get eth amount
     * @param ethereumAddress The ethereum address
     */
    EthersProvider.prototype.balanceOf = function (ethereumAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._ethersProvider.getBalance(ethereumAddress)];
                    case 1: return [2 /*return*/, (_a.sent()).toHexString()];
                }
            });
        });
    };
    /**
     * Get provider url
     */
    EthersProvider.prototype.getProviderUrl = function () {
        var ethereumProvider = this._providerContext
            .ethereumProvider;
        if (ethereumProvider) {
            return undefined;
        }
        var providerUrl = this._providerContext.providerUrl;
        if (providerUrl) {
            return providerUrl;
        }
        var chainId = this._providerContext.chainId;
        switch (chainId) {
            case chain_id_1.ChainId.MAINNET:
                return "https://mainnet.infura.io/v3/" + this._getApiKey;
            case chain_id_1.ChainId.ROPSTEN:
                return "https://ropsten.infura.io/v3/" + this._getApiKey;
            case chain_id_1.ChainId.RINKEBY:
                return "https://rinkeby.infura.io/v3/" + this._getApiKey;
            case chain_id_1.ChainId.GÖRLI:
                return "https://goerli.infura.io/v3/" + this._getApiKey;
            case chain_id_1.ChainId.KOVAN:
                return "https://kovan.infura.io/v3/" + this._getApiKey;
            default:
                return undefined;
        }
    };
    Object.defineProperty(EthersProvider.prototype, "_getApiKey", {
        /**
         * Get the api key
         */
        get: function () {
            return '9aa3d95b3bc440fa88ea12eaa4456161';
        },
        enumerable: false,
        configurable: true
    });
    return EthersProvider;
}());
exports.EthersProvider = EthersProvider;
//# sourceMappingURL=ethers-provider.js.map