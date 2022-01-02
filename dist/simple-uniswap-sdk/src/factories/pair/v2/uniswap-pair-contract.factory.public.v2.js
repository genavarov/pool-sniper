"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniswapPairContractFactoryPublicV2 = void 0;
var ethers_provider_1 = require("../../../ethers-provider");
var uniswap_contract_context_v2_1 = require("../../../uniswap-contract-context/uniswap-contract-context-v2");
var uniswap_pair_contract_factory_v2_1 = require("./uniswap-pair-contract.factory.v2");
var UniswapPairContractFactoryPublicV2 = /** @class */ (function (_super) {
    __extends(UniswapPairContractFactoryPublicV2, _super);
    function UniswapPairContractFactoryPublicV2(providerContext, pairAddress) {
        if (pairAddress === void 0) { pairAddress = uniswap_contract_context_v2_1.UniswapContractContextV2.pairAddress; }
        return _super.call(this, new ethers_provider_1.EthersProvider(providerContext), pairAddress) || this;
    }
    return UniswapPairContractFactoryPublicV2;
}(uniswap_pair_contract_factory_v2_1.UniswapPairContractFactoryV2));
exports.UniswapPairContractFactoryPublicV2 = UniswapPairContractFactoryPublicV2;
//# sourceMappingURL=uniswap-pair-contract.factory.public.v2.js.map