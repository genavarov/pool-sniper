"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var parse_ether_1 = require("./parse-ether");
describe('parseEther', function () {
    it('should parseEther correctly', function () {
        var result = (0, parse_ether_1.parseEther)(new bignumber_js_1.default(1));
        expect(result.toFixed()).toEqual('1000000000000000000');
    });
});
//# sourceMappingURL=parse-ether.spec.js.map