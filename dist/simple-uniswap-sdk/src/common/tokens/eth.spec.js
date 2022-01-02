"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fun_token_mock_1 = require("../../mocks/fun-token.mock");
var eth_1 = require("./eth");
var weth_1 = require("./weth");
describe('eth', function () {
    it('should append eth prefix to contract address', function () {
        expect((0, eth_1.appendEthToContractAddress)(weth_1.WETHContract.MAINNET().contractAddress)).toEqual(eth_1.ETH.MAINNET().contractAddress);
    });
    it('should remove eth prefix to contract address', function () {
        expect((0, eth_1.removeEthFromContractAddress)(eth_1.ETH.MAINNET().contractAddress)).toEqual(weth_1.WETHContract.MAINNET().contractAddress);
    });
    it('should mark eth as native if it has a _eth prefix', function () {
        expect((0, eth_1.isNativeEth)(eth_1.ETH.MAINNET().contractAddress)).toEqual(true);
    });
    it('should not mark eth as native if it has a _eth prefix doesnt exist', function () {
        expect((0, eth_1.isNativeEth)((0, fun_token_mock_1.MOCKFUN)().contractAddress)).toEqual(false);
    });
    it('should turn token into ethereum', function () {
        expect((0, eth_1.turnTokenIntoEthForResponse)(weth_1.WETHContract.MAINNET())).toEqual({
            chainId: 1,
            contractAddress: 'NO_CONTRACT_ADDRESS',
            decimals: 18,
            name: 'Ethers',
            symbol: 'ETH',
        });
    });
});
//# sourceMappingURL=eth.spec.js.map