"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_js_1 = require("bignumber.js");
var ethersv5_1 = require("ethersv5");
var abi_examples_1 = require("../../abi-examples");
var mockEthereumAddress = '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b';
// Connect to the network
var customHttpProvider = new ethersv5_1.ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/280bb5b627394709938a7cc0b71a4a58');
var UniswapStronglyTypedExample = /** @class */ (function () {
    function UniswapStronglyTypedExample() {
        // 0.5%
        this.SLIPPAGE = 0.05;
        // trade lasts for 15 minutes before it expiries
        this.TRADE_DEADLINE_SECONDS = 15 * 60;
        this._factoryContract = this.buildUniswapFactoryContract();
    }
    /**
     * Gets how much token they will get for their trade minus all fees
     * @param ethAmount The eth amount
     */
    UniswapStronglyTypedExample.prototype.getTokenTradeAmountEthToErc20 = function (ethAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var exchangeContract, price, tokenAmount, tokenAmountWithSlippage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getExchangeContractForToken(abi_examples_1.AbiExamples.funContractAddress)];
                    case 1:
                        exchangeContract = _a.sent();
                        return [4 /*yield*/, exchangeContract.getEthToTokenInputPrice(ethAmount)];
                    case 2:
                        price = _a.sent();
                        this.logUniswapOutput("Got the eth to token input price - " + price);
                        tokenAmount = new bignumber_js_1.BigNumber(price.toString()).shiftedBy(abi_examples_1.AbiExamples.funDecimalPlaces * -1);
                        this.logUniswapOutput("Got the fun token amount - " + tokenAmount.toString());
                        tokenAmountWithSlippage = tokenAmount.minus(tokenAmount.times(this.SLIPPAGE).toFixed());
                        this.logUniswapOutput("Fun token amount with the slippage taken off - " + tokenAmountWithSlippage.toString());
                        // Uniswap class - Fun token amount with the slippage taken off - 973.425797813
                        return [2 /*return*/, tokenAmountWithSlippage.toString()];
                }
            });
        });
    };
    /**
     * Get max amount of fun tokens you can buy
     */
    UniswapStronglyTypedExample.prototype.maxAmountOfTokensToBuy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var exchangeAddress, tokenContract, tokenReserveRaw, tokenReserve;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getExchangeAddress(abi_examples_1.AbiExamples.funContractAddress)];
                    case 1:
                        exchangeAddress = _a.sent();
                        tokenContract = this.getTokenContract(abi_examples_1.AbiExamples.funContractAddress);
                        return [4 /*yield*/, tokenContract.balanceOf(exchangeAddress)];
                    case 2:
                        tokenReserveRaw = _a.sent();
                        this.logUniswapOutput("Got the token reserve raw value - " + tokenReserveRaw.toString());
                        tokenReserve = new bignumber_js_1.BigNumber(tokenReserveRaw.toString()).shiftedBy(abi_examples_1.AbiExamples.funDecimalPlaces * -1);
                        this.logUniswapOutput("Token reserve raw value formatted to fun decimal places - " + tokenReserve);
                        // Uniswap class - Token reserve raw value formatted to fun decimal places - 18681618.58283796
                        return [2 /*return*/, tokenReserve.toString()];
                }
            });
        });
    };
    /**
     * Make the trade encoding the data and sending the transaction
     * @param ethAmount The eth amount
     * @param minTokens The min tokens
     */
    UniswapStronglyTypedExample.prototype.trade = function (ethAmount, minTokens) {
        return __awaiter(this, void 0, void 0, function () {
            var exchangeAddress, exchangeContract, privateKey, wallet, contractWithSigner, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getExchangeAddress(abi_examples_1.AbiExamples.funContractAddress)];
                    case 1:
                        exchangeAddress = _a.sent();
                        exchangeContract = this.getExchangeContractForTokenByExchangeAddress(exchangeAddress);
                        privateKey = '0x0123456789012345678901234567890123456789012345678901234567890123';
                        wallet = new ethersv5_1.ethers.Wallet(privateKey, customHttpProvider);
                        contractWithSigner = exchangeContract.connect(wallet);
                        return [4 /*yield*/, contractWithSigner.ethToTokenSwapInput(minTokens, this.generateTradeDeadlineUnixTime(), { value: ethersv5_1.utils.parseEther(ethAmount.toString()) })];
                    case 2:
                        tx = _a.sent();
                        this.logUniswapOutput("Contract transaction " + tx.hash);
                        // Uniswap class - Contract transaction 0xaf0068dcf728afa5accd02172867627da4e6f946dfb8174a7be31f01b11d5364
                        // The operation is NOT complete yet; we must wait until it is mined
                        return [4 /*yield*/, tx.wait()];
                    case 3:
                        // Uniswap class - Contract transaction 0xaf0068dcf728afa5accd02172867627da4e6f946dfb8174a7be31f01b11d5364
                        // The operation is NOT complete yet; we must wait until it is mined
                        _a.sent();
                        return [2 /*return*/, tx.hash];
                }
            });
        });
    };
    /**
     * Generates the trade dateline unix time
     */
    UniswapStronglyTypedExample.prototype.generateTradeDeadlineUnixTime = function () {
        var timestamp = ((new Date().getTime() / 1e3) | 0) + this.TRADE_DEADLINE_SECONDS;
        return timestamp.toString();
    };
    /**
     * Get the exchange contract for the token
     * @param erc20TokenContract The erc20 token contract
     */
    UniswapStronglyTypedExample.prototype.getExchangeContractForToken = function (erc20TokenContract) {
        return __awaiter(this, void 0, void 0, function () {
            var exchangeAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getExchangeAddress(erc20TokenContract)];
                    case 1:
                        exchangeAddress = _a.sent();
                        return [2 /*return*/, this.getExchangeContractForTokenByExchangeAddress(exchangeAddress)];
                }
            });
        });
    };
    /**
     * Gets the exchange address for the erc20 token contract
     * @param erc20TokenContract The erc20 token contract
     */
    UniswapStronglyTypedExample.prototype.getExchangeAddress = function (erc20TokenContract) {
        return __awaiter(this, void 0, void 0, function () {
            var exchangeAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._factoryContract.getExchange(erc20TokenContract)];
                    case 1:
                        exchangeAddress = _a.sent();
                        this.logUniswapOutput("Got the exchange address - " + exchangeAddress);
                        // Uniswap class - Got the exchange address - 0x60a87cC7Fca7E53867facB79DA73181B1bB4238B
                        return [2 /*return*/, exchangeAddress];
                }
            });
        });
    };
    /**
     * Get the token contract for the erc20 token
     * @param erc20TokenContract The erc20 token contract
     */
    UniswapStronglyTypedExample.prototype.getTokenContract = function (erc20TokenContract) {
        // Has to cast to unknown as we have made some typings changes to the
        // contract interfaces which conflicts with `ethers` typings.
        // This all work great but the compiler gets confused.
        // Casting to unknown first then the `TokenContractContext` solves this.
        return new ethersv5_1.ethers.Contract(erc20TokenContract, abi_examples_1.AbiExamples.tokenAbi, customHttpProvider);
    };
    /**
     * Get the exchange contract from the exchange address
     * @param exchangeAddress The exchange address
     */
    UniswapStronglyTypedExample.prototype.getExchangeContractForTokenByExchangeAddress = function (exchangeAddress) {
        // Has to cast to unknown as we have made some typings changes to the
        // contract interfaces which conflicts with `ethers` typings.
        // This all work great but the compiler gets confused.
        // Casting to unknown first then the `UniswapExchangeContractContext` solves this.
        return new ethersv5_1.ethers.Contract(exchangeAddress, abi_examples_1.AbiExamples.uniswapExchangeAbi, customHttpProvider);
    };
    /**
     * Build the uniswap factory contract instance
     */
    UniswapStronglyTypedExample.prototype.buildUniswapFactoryContract = function () {
        // Has to cast to unknown as we have made some typings changes to the
        // contract interfaces which conflicts with `ethers` typings.
        // This all work great but the compiler gets confused.
        // Casting to unknown first then the `UniswapFactoryContractContext` solves this.
        return new ethersv5_1.ethers.Contract(abi_examples_1.AbiExamples.uniswapFactoryAddress, abi_examples_1.AbiExamples.uniswapFactoryAbi, customHttpProvider);
    };
    /**
     * So you can tell what is the internal log or the example log when you run it
     * @param message The message
     */
    UniswapStronglyTypedExample.prototype.logUniswapOutput = function (message) {
        console.log("Uniswap class - " + message);
    };
    return UniswapStronglyTypedExample;
}());
var example = function () { return __awaiter(void 0, void 0, void 0, function () {
    var ethAmount, uniswap, maxTokens, getTokenTrade, transactionHash;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ethAmount = ethersv5_1.ethers.utils.parseEther('0.01');
                uniswap = new UniswapStronglyTypedExample();
                return [4 /*yield*/, uniswap.maxAmountOfTokensToBuy()];
            case 1:
                maxTokens = _a.sent();
                console.log(maxTokens);
                return [4 /*yield*/, uniswap.getTokenTradeAmountEthToErc20(ethAmount)];
            case 2:
                getTokenTrade = _a.sent();
                console.log(getTokenTrade);
                return [4 /*yield*/, uniswap.trade(ethAmount, ethersv5_1.BigNumber.from('900'))];
            case 3:
                transactionHash = _a.sent();
                console.log(transactionHash);
                return [2 /*return*/];
        }
    });
}); };
example();
//# sourceMappingURL=uniswap-contract-strongly-typed-example.js.map