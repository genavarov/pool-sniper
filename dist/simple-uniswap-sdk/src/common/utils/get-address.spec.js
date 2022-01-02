"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = require("../tokens");
var get_address_1 = require("./get-address");
describe('getAddress', function () {
    it('should format eth address and remove the prefix', function () {
        expect((0, tokens_1.isNativeEth)((0, get_address_1.getAddress)(tokens_1.ETH.MAINNET().contractAddress))).toEqual(false);
    });
    it('should format eth address and keep the prefix', function () {
        expect((0, tokens_1.isNativeEth)((0, get_address_1.getAddress)(tokens_1.ETH.MAINNET().contractAddress, true))).toEqual(true);
    });
    it('should turn addres to checksum', function () {
        expect((0, get_address_1.getAddress)(tokens_1.ETH.MAINNET().contractAddress.toLowerCase())).toEqual('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2');
    });
});
//# sourceMappingURL=get-address.spec.js.map