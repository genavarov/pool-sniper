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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var web3_1 = __importDefault(require("web3"));
var abi_examples_1 = require("../../abi-examples");
var mockEthereumAddress = '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b';
var web3 = new web3_1.default('https://mainnet.infura.io/v3/280bb5b627394709938a7cc0b71a4a58');
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
                        return [4 /*yield*/, exchangeContract.methods
                                .getEthToTokenInputPrice(web3.utils.toWei(ethAmount.toFixed(), 'ether'))
                                .call()];
                    case 2:
                        price = _a.sent();
                        this.logUniswapOutput("Got the eth to token input price - " + price);
                        tokenAmount = new bignumber_js_1.default(price).shiftedBy(abi_examples_1.AbiExamples.funDecimalPlaces * -1);
                        this.logUniswapOutput("Got the fun token amount - " + tokenAmount);
                        tokenAmountWithSlippage = tokenAmount.minus(tokenAmount.times(this.SLIPPAGE).toFixed());
                        this.logUniswapOutput("Fun token amount with the slippage taken off - " + tokenAmountWithSlippage.toFixed());
                        // Uniswap class - Fun token amount with the slippage taken off - 973.425797813
                        return [2 /*return*/, tokenAmountWithSlippage];
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
                        return [4 /*yield*/, tokenContract.methods
                                .balanceOf(exchangeAddress)
                                .call()];
                    case 2:
                        tokenReserveRaw = _a.sent();
                        this.logUniswapOutput("Got the token reserve raw value - " + tokenReserveRaw);
                        tokenReserve = new bignumber_js_1.default(tokenReserveRaw).shiftedBy(abi_examples_1.AbiExamples.funDecimalPlaces * -1);
                        this.logUniswapOutput("Token reserve raw value formatted to fun decimal places - " + tokenReserve);
                        // Uniswap class - Token reserve raw value formatted to fun decimal places - 18681618.58283796
                        return [2 /*return*/, tokenReserve];
                }
            });
        });
    };
    /**
     * Make the trade encoding the data and sending the transaction
     * @param ethAmount The eth amount
     * @param minTokens The min tokens
     */
    UniswapStronglyTypedExample.prototype.tradeWithBuildingTransactionConfig = function (ethAmount, minTokens) {
        return __awaiter(this, void 0, void 0, function () {
            var exchangeAddress, exchangeContract, data, transactionConfig, signedTransaction, transactionReceipt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getExchangeAddress(abi_examples_1.AbiExamples.funContractAddress)];
                    case 1:
                        exchangeAddress = _a.sent();
                        exchangeContract = this.getExchangeContractForTokenByExchangeAddress(exchangeAddress);
                        data = exchangeContract.methods
                            .ethToTokenSwapInput(web3.utils.toHex(minTokens), this.generateTradeDeadlineUnixTime())
                            .encodeABI();
                        this.logUniswapOutput("Encoded abi and generated data " + data);
                        transactionConfig = {
                            from: mockEthereumAddress,
                            to: exchangeAddress,
                            data: data,
                            value: web3.utils.toWei(ethAmount.toFixed(), 'ether'),
                            gas: web3.utils.numberToHex(21912),
                        };
                        this.logUniswapOutput("Transaction config built up " + JSON.stringify(transactionConfig));
                        return [4 /*yield*/, web3.eth.accounts.signTransaction(transactionConfig, '0x0123456789012345678901234567890123456789012345678901234567890123')];
                    case 2:
                        signedTransaction = _a.sent();
                        return [4 /*yield*/, web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)];
                    case 3:
                        transactionReceipt = (_a.sent());
                        this.logUniswapOutput("Transaction sent " + transactionReceipt.transactionHash);
                        // Uniswap class - Transaction sent 0x972c2155137efecb126dc5f4f72fb451753eab8f5fce45aad73e00861ae27fe1
                        return [2 /*return*/, transactionReceipt.transactionHash];
                }
            });
        });
    };
    /**
     * Make the trade using the promi events way
     * @param ethAmount The eth amount
     * @param minTokens The min tokens
     */
    UniswapStronglyTypedExample.prototype.tradeWithPromiEvents = function (ethAmount, minTokens) {
        return __awaiter(this, void 0, void 0, function () {
            var exchangeAddress, exchangeContract, transactionHash;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getExchangeAddress(abi_examples_1.AbiExamples.funContractAddress)];
                    case 1:
                        exchangeAddress = _a.sent();
                        exchangeContract = this.getExchangeContractForTokenByExchangeAddress(exchangeAddress);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                exchangeContract.methods
                                    .ethToTokenSwapInput(web3.utils.toHex(minTokens), _this.generateTradeDeadlineUnixTime())
                                    .send({
                                    from: mockEthereumAddress,
                                    value: web3.utils.toWei(ethAmount.toFixed(), 'ether'),
                                })
                                    .once('transactionHash', function (hash) {
                                    console.log("Transaction hash - " + hash);
                                    // Uniswap class - Transaction hash 0xcd1067f21622fb55b609c1248011dcb6237dd6c3981a44792d38f016a102e7b1
                                    resolve(hash);
                                })
                                    .on('error', function (error) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        reject(error);
                                        return [2 /*return*/];
                                    });
                                }); })
                                    .catch(function (error) {
                                    reject(error);
                                });
                            })];
                    case 2:
                        transactionHash = _a.sent();
                        this.logUniswapOutput("Transaction sent " + transactionHash);
                        // Uniswap class - Transaction sent 0xcd1067f21622fb55b609c1248011dcb6237dd6c3981a44792d38f016a102e7b1
                        return [2 /*return*/, transactionHash];
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
                    case 0: return [4 /*yield*/, this._factoryContract.methods
                            .getExchange(erc20TokenContract)
                            .call()];
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
        // contract interfaces which conflicts with `web3` typings.
        // This all work great but the compiler gets confused.
        // Casting to unknown first then the `TokenContractContext` solves this.
        return new web3.eth.Contract(abi_examples_1.AbiExamples.tokenAbi, erc20TokenContract);
    };
    /**
     * Get the exchange contract from the exchange address
     * @param exchangeAddress The exchange address
     */
    UniswapStronglyTypedExample.prototype.getExchangeContractForTokenByExchangeAddress = function (exchangeAddress) {
        // Has to cast to unknown as we have made some typings changes to the
        // contract interfaces which conflicts with `web3` typings.
        // This all work great but the compiler gets confused.
        // Casting to unknown first then the `UniswapExchangeContractContext` solves this.
        return new web3.eth.Contract(abi_examples_1.AbiExamples.uniswapExchangeAbi, exchangeAddress);
    };
    /**
     * Build the uniswap factory contract instance
     */
    UniswapStronglyTypedExample.prototype.buildUniswapFactoryContract = function () {
        // Has to cast to unknown as we have made some typings changes to the
        // contract interfaces which conflicts with `web3` typings.
        // This all work great but the compiler gets confused.
        // Casting to unknown first then the `UniswapFactoryContractContext` solves this.
        return new web3.eth.Contract(abi_examples_1.AbiExamples.uniswapFactoryAbi, abi_examples_1.AbiExamples.uniswapFactoryAddress);
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
    var ethAmount, uniswap, maxTokens, getTokenTrade, tradeWithBuildingTransactionConfig, trade;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ethAmount = new bignumber_js_1.default('0.01');
                uniswap = new UniswapStronglyTypedExample();
                return [4 /*yield*/, uniswap.maxAmountOfTokensToBuy()];
            case 1:
                maxTokens = _a.sent();
                console.log(maxTokens.toFixed());
                return [4 /*yield*/, uniswap.getTokenTradeAmountEthToErc20(ethAmount)];
            case 2:
                getTokenTrade = _a.sent();
                console.log(getTokenTrade.toFixed());
                return [4 /*yield*/, uniswap.tradeWithBuildingTransactionConfig(ethAmount, new bignumber_js_1.default('900'))];
            case 3:
                tradeWithBuildingTransactionConfig = _a.sent();
                console.log(tradeWithBuildingTransactionConfig);
                return [4 /*yield*/, uniswap.tradeWithPromiEvents(ethAmount, new bignumber_js_1.default('900'))];
            case 4:
                trade = _a.sent();
                console.log(trade);
                return [2 /*return*/];
        }
    });
}); };
example();
//# sourceMappingURL=uniswap-contract-strongly-typed-example.js.map