"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var to_ethers_big_number_1 = require("./to-ethers-big-number");
describe('toEthersBigNumber', function () {
    it('should toEthersBigNumber correctly', function () {
        var result = (0, to_ethers_big_number_1.toEthersBigNumber)(new bignumber_js_1.default(1));
        expect(result._isBigNumber).toEqual(true);
    });
});
//# sourceMappingURL=to-ethers-big-number.spec.js.map