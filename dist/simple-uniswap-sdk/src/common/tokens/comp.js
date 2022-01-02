"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMP = void 0;
var chain_id_1 = require("../../enums/chain-id");
var error_codes_1 = require("../errors/error-codes");
var uniswap_error_1 = require("../errors/uniswap-error");
/**
 * COMP token context CHANGE CONTRACT ADDRESS INFO ETC
 */
var COMP = /** @class */ (function () {
    function COMP() {
    }
    COMP.MAINNET = function () {
        return {
            chainId: chain_id_1.ChainId.MAINNET,
            contractAddress: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
            decimals: 18,
            symbol: 'COMP',
            name: 'Compound',
        };
    };
    /**
     * Get COMP token info by chain id
     * @param chainId The chain id
     */
    COMP.token = function (chainId) {
        switch (chainId) {
            case chain_id_1.ChainId.MAINNET:
                return this.MAINNET();
            default:
                throw new uniswap_error_1.UniswapError(chainId + " is not allowed", error_codes_1.ErrorCodes.tokenChainIdContractDoesNotExist);
        }
    };
    return COMP;
}());
exports.COMP = COMP;
//# sourceMappingURL=comp.js.map