"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hexlify = void 0;
var ethers_1 = require("ethers");
var utils_1 = require("ethers/lib/utils");
/**
 * Convert to hex
 * @param value The value
 */
function hexlify(value) {
    return (0, utils_1.hexlify)(ethers_1.BigNumber.from(value.toFixed()));
}
exports.hexlify = hexlify;
//# sourceMappingURL=hexlify.js.map