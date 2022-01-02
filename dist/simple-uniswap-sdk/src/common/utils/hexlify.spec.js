"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var hexlify_1 = require("./hexlify");
describe('hexlify', function () {
    it('should hexlify correctly', function () {
        var result = (0, hexlify_1.hexlify)(new bignumber_js_1.default(2));
        expect(result).toEqual('0x02');
    });
    it('should hexlify correctly', function () {
        var result = (0, hexlify_1.hexlify)(new bignumber_js_1.default(2342312));
        expect(result).toEqual('0x23bda8');
    });
});
//# sourceMappingURL=hexlify.spec.js.map