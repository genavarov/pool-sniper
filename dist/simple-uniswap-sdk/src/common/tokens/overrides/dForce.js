"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DFORCE = void 0;
var chain_id_1 = require("../../../enums/chain-id");
/**
 * DFORCE token contract
 */
var DFORCE = /** @class */ (function () {
    function DFORCE() {
    }
    DFORCE.MAINNET = function () {
        return {
            chainId: chain_id_1.ChainId.MAINNET,
            contractAddress: '0x431ad2ff6a9C365805eBaD47Ee021148d6f7DBe0',
            decimals: 18,
            symbol: 'DF',
            name: 'dForce token',
        };
    };
    return DFORCE;
}());
exports.DFORCE = DFORCE;
//# sourceMappingURL=dForce.js.map