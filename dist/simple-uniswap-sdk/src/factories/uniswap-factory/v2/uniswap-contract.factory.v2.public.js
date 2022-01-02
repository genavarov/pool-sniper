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
exports.UniswapContractFactoryV2Public = void 0;
var ethers_provider_1 = require("../../../ethers-provider");
var uniswap_contract_context_v2_1 = require("../../../uniswap-contract-context/uniswap-contract-context-v2");
var uniswap_contract_factory_v2_1 = require("./uniswap-contract.factory.v2");
var UniswapContractFactoryV2Public = /** @class */ (function (_super) {
    __extends(UniswapContractFactoryV2Public, _super);
    function UniswapContractFactoryV2Public(providerContext, factoryAddress) {
        if (factoryAddress === void 0) { factoryAddress = uniswap_contract_context_v2_1.UniswapContractContextV2.factoryAddress; }
        return _super.call(this, new ethers_provider_1.EthersProvider(providerContext), factoryAddress) || this;
    }
    return UniswapContractFactoryV2Public;
}(uniswap_contract_factory_v2_1.UniswapContractFactoryV2));
exports.UniswapContractFactoryV2Public = UniswapContractFactoryV2Public;
//# sourceMappingURL=uniswap-contract.factory.v2.public.js.map