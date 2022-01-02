"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddress = void 0;
var ethers_1 = require("ethers");
var eth_1 = require("../tokens/eth");
function getAddress(address, keepEthPrefix) {
    if (keepEthPrefix === void 0) { keepEthPrefix = false; }
    var parsedAddress = ethers_1.ethers.utils.getAddress((0, eth_1.removeEthFromContractAddress)(address));
    if (!keepEthPrefix) {
        return parsedAddress;
    }
    if (!(0, eth_1.isNativeEth)(address)) {
        return parsedAddress;
    }
    return (0, eth_1.appendEthToContractAddress)(parsedAddress);
}
exports.getAddress = getAddress;
//# sourceMappingURL=get-address.js.map