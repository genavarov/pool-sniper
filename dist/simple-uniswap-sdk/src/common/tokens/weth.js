"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WETHContract = exports.WETH_NAME = exports.WETH_SYMBOL = void 0;
var chain_id_1 = require("../../enums/chain-id");
var error_codes_1 = require("../errors/error-codes");
var uniswap_error_1 = require("../errors/uniswap-error");
exports.WETH_SYMBOL = 'WETH';
exports.WETH_NAME = 'Wrapped Ether';
/**
 * WETH token context (called `WETHContract` so people get a breaking changes if they use the old name of `WETH`)
 */
var WETHContract = /** @class */ (function () {
    function WETHContract() {
    }
    WETHContract.MAINNET = function () {
        return {
            chainId: chain_id_1.ChainId.MAINNET,
            contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
            decimals: 18,
            symbol: exports.WETH_SYMBOL,
            name: exports.WETH_NAME,
        };
    };
    WETHContract.ROPSTEN = function () {
        return {
            chainId: chain_id_1.ChainId.ROPSTEN,
            contractAddress: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
            decimals: 18,
            symbol: exports.WETH_SYMBOL,
            name: exports.WETH_NAME,
        };
    };
    WETHContract.RINKEBY = function () {
        return {
            chainId: chain_id_1.ChainId.RINKEBY,
            contractAddress: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
            decimals: 18,
            symbol: exports.WETH_SYMBOL,
            name: exports.WETH_NAME,
        };
    };
    WETHContract.GORLI = function () {
        return {
            chainId: chain_id_1.ChainId.GÖRLI,
            contractAddress: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
            decimals: 18,
            symbol: exports.WETH_SYMBOL,
            name: exports.WETH_NAME,
        };
    };
    WETHContract.KOVAN = function () {
        return {
            chainId: chain_id_1.ChainId.KOVAN,
            contractAddress: '0xd0A1E359811322d97991E03f863a0C30C2cF029C',
            decimals: 18,
            symbol: exports.WETH_SYMBOL,
            name: exports.WETH_NAME,
        };
    };
    /**
     * Get WETH token info by chain id
     * @param chainId The chain id
     */
    WETHContract.token = function (chainId) {
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
    return WETHContract;
}());
exports.WETHContract = WETHContract;
//# sourceMappingURL=weth.js.map