"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var format_ether_1 = require("./format-ether");
describe('formatEther', function () {
    it('should formatEther correctly', function () {
        var result = (0, format_ether_1.formatEther)('1000000000');
        expect(result.toFixed()).toEqual('0.000000001');
    });
});
//# sourceMappingURL=format-ether.spec.js.map