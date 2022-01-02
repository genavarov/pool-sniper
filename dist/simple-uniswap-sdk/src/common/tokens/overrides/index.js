"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenOverrideInfo = void 0;
var dForce_1 = require("./dForce");
var mkr_1 = require("./mkr");
var _tokenOverrideInfo = [dForce_1.DFORCE.MAINNET(), mkr_1.MAI.MAINNET()];
var isTokenOverrideInfo = function (contractAddress) {
    return _tokenOverrideInfo.find(function (info) {
        return info.contractAddress.toLowerCase() === contractAddress.toLowerCase();
    });
};
exports.isTokenOverrideInfo = isTokenOverrideInfo;
//# sourceMappingURL=index.js.map