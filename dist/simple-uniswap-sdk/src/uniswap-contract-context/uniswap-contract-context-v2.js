"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniswapContractContextV2 = void 0;
var UniswapContractContextV2 = /** @class */ (function () {
    function UniswapContractContextV2() {
    }
    /**
     * The uniswap router address
     */
    UniswapContractContextV2.routerAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
    /**
     * The uniswap factory address
     */
    UniswapContractContextV2.factoryAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
    /**
     * The uniswap pair address
     */
    UniswapContractContextV2.pairAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
    /**
     * Uniswap v2 router
     */
    UniswapContractContextV2.routerAbi = require('../ABI/uniswap-router-v2.json');
    /**
     * Uniswap v2 factory
     */
    UniswapContractContextV2.factoryAbi = require('../ABI/uniswap-factory-v2.json');
    /**
     * Uniswap v2 pair
     */
    UniswapContractContextV2.pairAbi = require('../ABI/uniswap-pair-v2.json');
    return UniswapContractContextV2;
}());
exports.UniswapContractContextV2 = UniswapContractContextV2;
//# sourceMappingURL=uniswap-contract-context-v2.js.map