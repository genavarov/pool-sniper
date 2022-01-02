"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniswapContractContextV3 = void 0;
var UniswapContractContextV3 = /** @class */ (function () {
    function UniswapContractContextV3() {
    }
    /**
     * The uniswap router address
     */
    UniswapContractContextV3.routerAddress = '0xE592427A0AEce92De3Edee1F18E0157C05861564';
    /**
     * The uniswap factory address
     */
    UniswapContractContextV3.factoryAddress = '0x1F98431c8aD98523631AE4a59f267346ea31F984';
    /**
     * The uniswap quoter address
     */
    UniswapContractContextV3.quoterAddress = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6';
    /**
     * Uniswap router
     */
    UniswapContractContextV3.routerAbi = require('../ABI/uniswap-router-v3.json');
    /**
     * Uniswap factory
     */
    UniswapContractContextV3.factoryAbi = require('../ABI/uniswap-factory-v3.json');
    /**
     * Uniswap quoter
     */
    UniswapContractContextV3.quoterAbi = require('../ABI/uniswap-quoter-v3.json');
    return UniswapContractContextV3;
}());
exports.UniswapContractContextV3 = UniswapContractContextV3;
//# sourceMappingURL=uniswap-contract-context-v3.js.map