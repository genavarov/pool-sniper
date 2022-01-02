"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAI = void 0;
var chain_id_1 = require("../../enums/chain-id");
var error_codes_1 = require("../errors/error-codes");
var uniswap_error_1 = require("../errors/uniswap-error");
/**
 * DAI token context CHANGE CONTRACT ADDRESS INFO ETC
 */
var DAI = /** @class */ (function () {
    function DAI() {
    }
    DAI.MAINNET = function () {
        return {
            chainId: chain_id_1.ChainId.MAINNET,
            contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
            decimals: 18,
            symbol: 'DAI',
            name: 'Dai Stablecoin',
        };
    };
    /**
     * Get DAI token info by chain id
     * @param chainId The chain id
     */
    DAI.token = function (chainId) {
        switch (chainId) {
            case chain_id_1.ChainId.MAINNET:
                return this.MAINNET();
            default:
                throw new uniswap_error_1.UniswapError(chainId + " is not allowed", error_codes_1.ErrorCodes.tokenChainIdContractDoesNotExist);
        }
    };
    return DAI;
}());
exports.DAI = DAI;
//# sourceMappingURL=dai.js.map