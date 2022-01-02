"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var ethers_provider_1 = require("./ethers-provider");
var ethereum_address_mock_1 = require("./mocks/ethereum-address.mock");
var provider_url_mock_1 = require("./mocks/provider-url.mock");
var uniswap_contract_context_v2_1 = require("./uniswap-contract-context/uniswap-contract-context-v2");
describe('EthersProvider', function () {
    describe('with chain id', function () {
        var ethersProvider = new ethers_provider_1.EthersProvider({ chainId: _1.ChainId.MAINNET });
        it('getContract', function () {
            var result = ethersProvider.getContract(JSON.stringify(uniswap_contract_context_v2_1.UniswapContractContextV2.pairAbi), uniswap_contract_context_v2_1.UniswapContractContextV2.pairAddress);
            expect(result).not.toBeUndefined();
        });
        it('network', function () {
            var result = ethersProvider.network();
            expect(result.chainId).toEqual(_1.ChainId.MAINNET);
        });
        it('provider', function () {
            var result = ethersProvider.provider;
            expect(result.network.chainId).toEqual(_1.ChainId.MAINNET);
        });
        it('balanceOf', function () {
            var result = ethersProvider.balanceOf((0, ethereum_address_mock_1.MockEthereumAddress)());
            expect(result).not.toBeUndefined();
        });
    });
    describe('with chain id and providerUrl', function () {
        var ethersProvider = new ethers_provider_1.EthersProvider({
            chainId: _1.ChainId.MAINNET,
            providerUrl: (0, provider_url_mock_1.MOCK_PROVIDER_URL)(),
        });
        it('should throw error if chainId not be found', function () {
            expect(function () {
                new ethers_provider_1.EthersProvider({
                    chainId: 10293,
                    providerUrl: (0, provider_url_mock_1.MOCK_PROVIDER_URL)(),
                });
            }).toThrowError(new _1.UniswapError('Can not find chain name for 10293. This lib only supports mainnet(1), ropsten(4), kovan(42), rinkeby(4) and görli(5)', _1.ErrorCodes.canNotFindChainId));
        });
        it('getContract', function () {
            var result = ethersProvider.getContract(JSON.stringify(uniswap_contract_context_v2_1.UniswapContractContextV2.pairAbi), uniswap_contract_context_v2_1.UniswapContractContextV2.pairAddress);
            expect(result).not.toBeUndefined();
        });
        it('network', function () {
            var result = ethersProvider.network();
            expect(result.chainId).toEqual(_1.ChainId.MAINNET);
        });
        it('provider', function () {
            var result = ethersProvider.provider;
            expect(result.network.chainId).toEqual(_1.ChainId.MAINNET);
        });
        it('balanceOf', function () {
            var result = ethersProvider.balanceOf((0, ethereum_address_mock_1.MockEthereumAddress)());
            expect(result).not.toBeUndefined();
        });
    });
});
//# sourceMappingURL=ethers-provider.spec.js.map