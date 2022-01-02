"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbiExamples = void 0;
var AbiExamples = /** @class */ (function () {
    function AbiExamples() {
    }
    /**
     * Mainnet fun token contract address
     */
    AbiExamples.funContractAddress = '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b';
    /**
     * Fun token decimal places
     */
    AbiExamples.funDecimalPlaces = 8;
    /**
     * The token abi (when it compiled it lives in the dist so map it back to root)
     */
    AbiExamples.tokenAbi = require('../../abi-examples/token-abi');
    /**
     * The uniswap factory contract address (mainnet only)
     */
    AbiExamples.uniswapFactoryAddress = '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95';
    /**
     * The uniswap factory abi (when it compiled it lives in the dist so map it back to root)
     */
    AbiExamples.uniswapFactoryAbi = require('../../abi-examples/uniswap-factory-abi');
    /**
     * The uniswap exchange abi (when it compiled it lives in the dist so map it back to root)
     */
    AbiExamples.uniswapExchangeAbi = require('../../abi-examples/uniswap-exchange-abi');
    // used for giffs and fake contract example
    AbiExamples.YOUR_ABI = require('../../abi-examples/YOUR_ABI_JSON_FILE');
    // used for giffs and fake contract example
    AbiExamples.YOUR_CONTRACT_ADDRESS = AbiExamples.funContractAddress;
    return AbiExamples;
}());
exports.AbiExamples = AbiExamples;
//# sourceMappingURL=index.js.map