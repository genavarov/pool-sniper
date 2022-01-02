"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("../..");
var error_codes_1 = require("./error-codes");
describe('UniswapError', function () {
    var message = 'message_error';
    var code = error_codes_1.ErrorCodes.canNotFindChainId;
    var uniswapError = new __1.UniswapError(message, code);
    it('should have the correct name on error', function () {
        expect(uniswapError.name).toEqual('UniswapError');
    });
    it('should have the correct code on error', function () {
        expect(uniswapError.code).toEqual(code);
    });
    it('should have the correct message on error', function () {
        expect(uniswapError.message).toEqual(message);
    });
});
//# sourceMappingURL=uniswap-error.spec.js.map