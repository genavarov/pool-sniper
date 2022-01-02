"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ABI_UniswapV2Factory = void 0;
// Uniswap V2 Factory (event: PairCreated)
exports.ABI_UniswapV2Factory = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "token0",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "token1",
                type: "address"
            },
            {
                indexed: false,
                internalType: "address",
                name: "pair",
                type: "address"
            },
            { indexed: false, internalType: "uint256", name: "", type: "uint256" }
        ],
        name: "PairCreated",
        type: "event"
    }
];
//# sourceMappingURL=constants.js.map