"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USDC = void 0;
var chain_id_1 = require("../../enums/chain-id");
var error_codes_1 = require("../errors/error-codes");
var uniswap_error_1 = require("../errors/uniswap-error");
/**
 * USDC token context CHANGE CONTRACT ADDRESS INFO ETC
 */
var USDC = /** @class */ (function () {
    function USDC() {
    }
    USDC.MAINNET = function () {
        return {
            chainId: chain_id_1.ChainId.MAINNET,
            contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
            decimals: 18,
            symbol: 'USDC',
            name: 'USD Coin',
        };
    };
    /**
     * Get USDC token info by chain id
     * @param chainId The chain id
     */
    USDC.token = function (chainId) {
        switch (chainId) {
            case chain_id_1.ChainId.MAINNET:
                return this.MAINNET();
            default:
                throw new uniswap_error_1.UniswapError(chainId + " is not allowed", error_codes_1.ErrorCodes.tokenChainIdContractDoesNotExist);
        }
    };
    return USDC;
}());
exports.USDC = USDC;
//# sourceMappingURL=usdc.js.map