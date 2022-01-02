"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ETH = exports.turnTokenIntoEthForResponse = exports.isNativeEth = exports.removeEthFromContractAddress = exports.appendEthToContractAddress = exports.ETH_NAME = exports.ETH_SYMBOL = void 0;
var chain_id_1 = require("../../enums/chain-id");
var error_codes_1 = require("../errors/error-codes");
var uniswap_error_1 = require("../errors/uniswap-error");
var deep_clone_1 = require("../utils/deep-clone");
var ETH_PREFIX = '_ETH';
exports.ETH_SYMBOL = 'ETH';
exports.ETH_NAME = 'Ethers';
var appendEthToContractAddress = function (contractAddress) {
    return "" + contractAddress + ETH_PREFIX;
};
exports.appendEthToContractAddress = appendEthToContractAddress;
var removeEthFromContractAddress = function (contractAddress) {
    return contractAddress
        .replace(ETH_PREFIX, '')
        .replace(ETH_PREFIX.toLowerCase(), '');
};
exports.removeEthFromContractAddress = removeEthFromContractAddress;
var isNativeEth = function (contractAddress) {
    return contractAddress.includes(ETH_PREFIX);
};
exports.isNativeEth = isNativeEth;
var turnTokenIntoEthForResponse = function (token, nativeCurrencyInfo) {
    var clone = (0, deep_clone_1.deepClone)(token);
    // clear down contract address
    clone.contractAddress = 'NO_CONTRACT_ADDRESS';
    if (nativeCurrencyInfo) {
        clone.symbol = nativeCurrencyInfo.symbol;
        clone.name = nativeCurrencyInfo.name;
    }
    else {
        clone.symbol = exports.ETH_SYMBOL;
        clone.name = exports.ETH_NAME;
    }
    return clone;
};
exports.turnTokenIntoEthForResponse = turnTokenIntoEthForResponse;
/**
 * ETH token info
 */
var ETH = /** @class */ (function () {
    function ETH() {
    }
    ETH.MAINNET = function () {
        return {
            chainId: chain_id_1.ChainId.MAINNET,
            contractAddress: (0, exports.appendEthToContractAddress)('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'),
            decimals: 18,
            symbol: exports.ETH_SYMBOL,
            name: exports.ETH_NAME,
        };
    };
    ETH.ROPSTEN = function () {
        return {
            chainId: chain_id_1.ChainId.ROPSTEN,
            contractAddress: (0, exports.appendEthToContractAddress)('0xc778417E063141139Fce010982780140Aa0cD5Ab'),
            decimals: 18,
            symbol: exports.ETH_SYMBOL,
            name: exports.ETH_NAME,
        };
    };
    ETH.RINKEBY = function () {
        return {
            chainId: chain_id_1.ChainId.RINKEBY,
            contractAddress: (0, exports.appendEthToContractAddress)('0xc778417E063141139Fce010982780140Aa0cD5Ab'),
            decimals: 18,
            symbol: exports.ETH_SYMBOL,
            name: exports.ETH_NAME,
        };
    };
    ETH.GORLI = function () {
        return {
            chainId: chain_id_1.ChainId.GÖRLI,
            contractAddress: (0, exports.appendEthToContractAddress)('0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6'),
            decimals: 18,
            symbol: exports.ETH_SYMBOL,
            name: exports.ETH_NAME,
        };
    };
    ETH.KOVAN = function () {
        return {
            chainId: chain_id_1.ChainId.KOVAN,
            contractAddress: (0, exports.appendEthToContractAddress)('0xd0A1E359811322d97991E03f863a0C30C2cF029C'),
            decimals: 18,
            symbol: exports.ETH_SYMBOL,
            name: exports.ETH_NAME,
        };
    };
    /**
     * Get ETH token info by chain id
     * @param chainId The chain id
     */
    ETH.info = function (chainId, customNetworkNativeWrappedTokenInfo) {
        if (customNetworkNativeWrappedTokenInfo === void 0) { customNetworkNativeWrappedTokenInfo = undefined; }
        if (customNetworkNativeWrappedTokenInfo) {
            return __assign(__assign({}, customNetworkNativeWrappedTokenInfo), { contractAddress: (0, exports.appendEthToContractAddress)(customNetworkNativeWrappedTokenInfo.contractAddress) });
        }
        switch (chainId) {
            case chain_id_1.ChainId.MAINNET:
                return this.MAINNET();
            case chain_id_1.ChainId.ROPSTEN:
                return this.ROPSTEN();
            case chain_id_1.ChainId.RINKEBY:
                return this.RINKEBY();
            case chain_id_1.ChainId.GÖRLI:
                return this.GORLI();
            case chain_id_1.ChainId.KOVAN:
                return this.KOVAN();
            default:
                throw new uniswap_error_1.UniswapError(chainId + " is not allowed", error_codes_1.ErrorCodes.tokenChainIdContractDoesNotExist);
        }
    };
    return ETH;
}());
exports.ETH = ETH;
//# sourceMappingURL=eth.js.map