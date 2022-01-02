"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WBTC = void 0;
var chain_id_1 = require("../../enums/chain-id");
var error_codes_1 = require("../errors/error-codes");
var uniswap_error_1 = require("../errors/uniswap-error");
/**
 * WBTC token context
 */
var WBTC = /** @class */ (function () {
    function WBTC() {
    }
    WBTC.MAINNET = function () {
        return {
            chainId: chain_id_1.ChainId.MAINNET,
            contractAddress: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
            decimals: 8,
            symbol: 'WBTC',
            name: 'Wrapped BTC',
        };
    };
    /**
     * Get WBTC token info by chain id
     * @param chainId The chain id
     */
    WBTC.token = function (chainId) {
        switch (chainId) {
            case chain_id_1.ChainId.MAINNET:
                return this.MAINNET();
            default:
                throw new uniswap_error_1.UniswapError(chainId + " is not allowed", error_codes_1.ErrorCodes.tokenChainIdContractDoesNotExist);
        }
    };
    return WBTC;
}());
exports.WBTC = WBTC;
//# sourceMappingURL=wbtc.js.map