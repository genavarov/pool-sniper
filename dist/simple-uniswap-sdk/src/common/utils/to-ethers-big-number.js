"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toEthersBigNumber = void 0;
var ethers_1 = require("ethers");
function toEthersBigNumber(value) {
    return ethers_1.BigNumber.from(value.toFixed());
}
exports.toEthersBigNumber = toEthersBigNumber;
//# sourceMappingURL=to-ethers-big-number.js.map