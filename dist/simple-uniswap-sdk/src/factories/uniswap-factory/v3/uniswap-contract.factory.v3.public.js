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
exports.UniswapContractFactoryV3Public = void 0;
var ethers_provider_1 = require("../../../ethers-provider");
var uniswap_contract_context_v3_1 = require("../../../uniswap-contract-context/uniswap-contract-context-v3");
var uniswap_contract_factory_v3_1 = require("./uniswap-contract.factory.v3");
var UniswapContractFactoryV3Public = /** @class */ (function (_super) {
    __extends(UniswapContractFactoryV3Public, _super);
    function UniswapContractFactoryV3Public(providerContext, factoryAddress) {
        if (factoryAddress === void 0) { factoryAddress = uniswap_contract_context_v3_1.UniswapContractContextV3.factoryAddress; }
        return _super.call(this, new ethers_provider_1.EthersProvider(providerContext), factoryAddress) || this;
    }
    return UniswapContractFactoryV3Public;
}(uniswap_contract_factory_v3_1.UniswapContractFactoryV3));
exports.UniswapContractFactoryV3Public = UniswapContractFactoryV3Public;
//# sourceMappingURL=uniswap-contract.factory.v3.public.js.map