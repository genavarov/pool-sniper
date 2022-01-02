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
exports.UniswapRouterContractFactoryV3Public = void 0;
var ethers_provider_1 = require("../../../ethers-provider");
var uniswap_router_contract_factory_v3_1 = require("./uniswap-router-contract.factory.v3");
var UniswapRouterContractFactoryV3Public = /** @class */ (function (_super) {
    __extends(UniswapRouterContractFactoryV3Public, _super);
    function UniswapRouterContractFactoryV3Public(providerContext) {
        return _super.call(this, new ethers_provider_1.EthersProvider(providerContext)) || this;
    }
    return UniswapRouterContractFactoryV3Public;
}(uniswap_router_contract_factory_v3_1.UniswapRouterContractFactoryV3));
exports.UniswapRouterContractFactoryV3Public = UniswapRouterContractFactoryV3Public;
//# sourceMappingURL=uniswap-router-contract.factory.public.v3.js.map