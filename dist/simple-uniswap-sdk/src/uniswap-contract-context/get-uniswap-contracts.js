"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniswapContracts = void 0;
var uniswap_contract_context_v2_1 = require("./uniswap-contract-context-v2");
var uniswap_contract_context_v3_1 = require("./uniswap-contract-context-v3");
exports.uniswapContracts = {
    v2: {
        getRouterAddress: function (cloneUniswapContractDetails) {
            if (cloneUniswapContractDetails &&
                cloneUniswapContractDetails.v2Override) {
                return cloneUniswapContractDetails.v2Override.routerAddress;
            }
            return uniswap_contract_context_v2_1.UniswapContractContextV2.routerAddress;
        },
        getFactoryAddress: function (cloneUniswapContractDetails) {
            if (cloneUniswapContractDetails &&
                cloneUniswapContractDetails.v2Override) {
                return cloneUniswapContractDetails.v2Override.factoryAddress;
            }
            return uniswap_contract_context_v2_1.UniswapContractContextV2.factoryAddress;
        },
        getPairAddress: function (cloneUniswapContractDetails) {
            if (cloneUniswapContractDetails &&
                cloneUniswapContractDetails.v2Override) {
                return cloneUniswapContractDetails.v2Override.pairAddress;
            }
            return uniswap_contract_context_v2_1.UniswapContractContextV2.pairAddress;
        },
    },
    v3: {
        getRouterAddress: function (cloneUniswapContractDetails) {
            if (cloneUniswapContractDetails &&
                cloneUniswapContractDetails.v3Override) {
                return cloneUniswapContractDetails.v3Override.routerAddress;
            }
            return uniswap_contract_context_v3_1.UniswapContractContextV3.routerAddress;
        },
        getFactoryAddress: function (cloneUniswapContractDetails) {
            if (cloneUniswapContractDetails &&
                cloneUniswapContractDetails.v3Override) {
                return cloneUniswapContractDetails.v3Override.factoryAddress;
            }
            return uniswap_contract_context_v3_1.UniswapContractContextV3.factoryAddress;
        },
        getQuoterAddress: function (cloneUniswapContractDetails) {
            if (cloneUniswapContractDetails &&
                cloneUniswapContractDetails.v3Override) {
                return cloneUniswapContractDetails.v3Override.quoterAddress;
            }
            return uniswap_contract_context_v3_1.UniswapContractContextV3.quoterAddress;
        },
    },
};
//# sourceMappingURL=get-uniswap-contracts.js.map