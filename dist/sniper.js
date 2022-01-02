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
var simple_uniswap_sdk_1 = require("simple-uniswap-sdk"); // Simple Uniswap Trades
var logging_1 = require("./utils/logging"); // Logging
var constants_1 = require("./utils/constants"); // ABIs
var ethers_1 = require("ethers"); // Ethers
var Sniper = /** @class */ (function () {
    /**
     * Updates token and purchase details + sets up RPC
     * @param {string} tokenAddress of token to purchase
     * @param {string} factoryAddress of Uniswap V2 Factory
     * @param {string} rpcEndpoint for network
     * @param {string} privateKey of purchasing wallet
     * @param {string} purchaseAmount to swap with (input)
     * @param {string} gasPrice to pay
     * @param {number} slippage for trade execution
     */
    function Sniper(tokenAddress, factoryAddress, rpcEndpoint, privateKey, purchaseAmount, gasPrice, slippage) {
        // Setup networking + wallet
        this.rpc = new ethers_1.providers.JsonRpcProvider(rpcEndpoint);
        this.wallet = new ethers_1.Wallet(privateKey, this.rpc);
        // Setup token details
        this.tokenAddress = ethers_1.utils.getAddress(tokenAddress); // Normalize address
        this.factory = new ethers_1.Contract(factoryAddress, constants_1.ABI_UniswapV2Factory, this.rpc);
        this.purchaseAmount = purchaseAmount;
        this.gasPrice = ethers_1.utils.parseUnits(gasPrice, "gwei");
        this.slippage = slippage;
    }
    /**
     * Generates and submits purchase transaction for desired token w/ base pair
     * @param {string} token0 address of token0 in pair
     * @param {string} token1 address of token1 in pair
     */
    Sniper.prototype.submitPurchaseTx = function (token0, token1) {
        return __awaiter(this, void 0, void 0, function () {
            var desiredIsFirst, desiredTokenAddress, pair, uniswapPairFactory, trade, tx, tradeTx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        desiredIsFirst = token0 === this.tokenAddress;
                        desiredTokenAddress = desiredIsFirst ? token0 : token1;
                        pair = new simple_uniswap_sdk_1.UniswapPair({
                            // Base chain token to convert from
                            fromTokenContractAddress: simple_uniswap_sdk_1.ETH.POLYGON().contractAddress,
                            // Desired token to purchase
                            toTokenContractAddress: desiredTokenAddress,
                            // Ethereum address of user
                            ethereumAddress: this.wallet.address,
                            ethereumProvider: this.rpc,
                            settings: new simple_uniswap_sdk_1.UniswapPairSettings({
                                slippage: this.slippage,
                                deadlineMinutes: 5,
                                disableMultihops: false,
                                uniswapVersions: [simple_uniswap_sdk_1.UniswapVersion.v2] // Only V2
                            })
                        });
                        return [4 /*yield*/, pair.createFactory()];
                    case 1:
                        uniswapPairFactory = _a.sent();
                        return [4 /*yield*/, uniswapPairFactory.trade(this.purchaseAmount, simple_uniswap_sdk_1.TradeDirection.input)];
                    case 2:
                        trade = _a.sent();
                        tx = trade.transaction;
                        tx.gasPrice = this.gasPrice;
                        return [4 /*yield*/, this.wallet.sendTransaction(tx)];
                    case 3:
                        tradeTx = _a.sent();
                        logging_1.logger.info("Transaction sent: ".concat(tradeTx.hash));
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Listen for pool creation and submit purchase tx
     */
    Sniper.prototype.snipe = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                logging_1.logger.info("Beginning to monitor UniswapV2Factory");
                // Listen for pair creation
                this.factory.on("PairCreated", function (token0, token1) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                // Log new created pairs
                                logging_1.logger.info("New pair: ".concat(token0, ", ").concat(token1));
                                if (![token0, token1].includes(this.tokenAddress)) return [3 /*break*/, 2];
                                // Submit purchase transaction
                                logging_1.logger.info("Desired token found in pair.");
                                return [4 /*yield*/, this.submitPurchaseTx(token0, token1)];
                            case 1:
                                _a.sent();
                                // Exit process after submitting tx (no PGA)
                                process.exit(0);
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    return Sniper;
}());
exports.default = Sniper;
//# sourceMappingURL=sniper.js.map