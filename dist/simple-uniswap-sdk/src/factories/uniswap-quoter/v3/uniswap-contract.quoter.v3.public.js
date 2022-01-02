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
exports.UniswapContractQuoterV3Public = void 0;
var ethers_provider_1 = require("../../../ethers-provider");
var uniswap_contract_context_v3_1 = require("../../../uniswap-contract-context/uniswap-contract-context-v3");
var uniswap_contract_quoter_v3_1 = require("./uniswap-contract.quoter.v3");
var UniswapContractQuoterV3Public = /** @class */ (function (_super) {
    __extends(UniswapContractQuoterV3Public, _super);
    function UniswapContractQuoterV3Public(providerContext, quoterAddress) {
        if (quoterAddress === void 0) { quoterAddress = uniswap_contract_context_v3_1.UniswapContractContextV3.quoterAddress; }
        return _super.call(this, new ethers_provider_1.EthersProvider(providerContext), quoterAddress) || this;
    }
    return UniswapContractQuoterV3Public;
}(uniswap_contract_quoter_v3_1.UniswapContractQuoterV3));
exports.UniswapContractQuoterV3Public = UniswapContractQuoterV3Public;
//# sourceMappingURL=uniswap-contract.quoter.v3.public.js.map