"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USDT = void 0;
var chain_id_1 = require("../../enums/chain-id");
var error_codes_1 = require("../errors/error-codes");
var uniswap_error_1 = require("../errors/uniswap-error");
/**
 * USDT token context CHANGE CONTRACT ADDRESS INFO ETC
 */
var USDT = /** @class */ (function () {
    function USDT() {
    }
    USDT.MAINNET = function () {
        return {
            chainId: chain_id_1.ChainId.MAINNET,
            contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
            decimals: 18,
            symbol: 'USDT',
            name: 'Tether USD',
        };
    };
    /**
     * Get USDT token info by chain id
     * @param chainId The chain id
     */
    USDT.token = function (chainId) {
        switch (chainId) {
            case chain_id_1.ChainId.MAINNET:
                return this.MAINNET();
            default:
                throw new uniswap_error_1.UniswapError(chainId + " is not allowed", error_codes_1.ErrorCodes.tokenChainIdContractDoesNotExist);
        }
    };
    return USDT;
}());
exports.USDT = USDT;
//# sourceMappingURL=usdt.js.map