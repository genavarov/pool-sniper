"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAddress = void 0;
var ethers_1 = require("ethers");
var eth_1 = require("../tokens/eth");
function isAddress(address) {
    return ethers_1.ethers.utils.isAddress((0, eth_1.removeEthFromContractAddress)(address));
}
exports.isAddress = isAddress;
//# sourceMappingURL=is-address.js.map