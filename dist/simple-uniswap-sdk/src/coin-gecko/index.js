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
exports.CoinGecko = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
var tokens_1 = require("../common/tokens");
var deep_clone_1 = require("../common/utils/deep-clone");
var get_address_1 = require("../common/utils/get-address");
var CoinGecko = /** @class */ (function () {
    function CoinGecko() {
        this._fiatPriceCache = undefined;
        // 90 seconds cache
        this._cacheMilliseconds = 90000;
    }
    /**
     * Get the coin gecko fiat price
     * @param contractAddress The array of contract addresses
     */
    CoinGecko.prototype.getCoinGeckoFiatPrices = function (contractAddresses) {
        return __awaiter(this, void 0, void 0, function () {
            var now, coinGeckoResponse, response, _i, _a, _b, key, value, i, mappedKey, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        contractAddresses = contractAddresses.map(function (address) {
                            return (0, tokens_1.removeEthFromContractAddress)(address);
                        });
                        if (this._fiatPriceCache) {
                            now = Date.now();
                            if ((0, deep_clone_1.deepClone)(this._fiatPriceCache.timestamp) >
                                now - this._cacheMilliseconds) {
                                return [2 /*return*/, this._fiatPriceCache.cachedResponse];
                            }
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, , 5]);
                        coinGeckoResponse = {};
                        return [4 /*yield*/, (0, node_fetch_1.default)("https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=" + contractAddresses.join() + "&vs_currencies=usd")];
                    case 2: return [4 /*yield*/, (_c.sent()).json()];
                    case 3:
                        response = _c.sent();
                        for (_i = 0, _a = Object.entries(response); _i < _a.length; _i++) {
                            _b = _a[_i], key = _b[0], value = _b[1];
                            for (i = 0; i < contractAddresses.length; i++) {
                                mappedKey = (0, get_address_1.getAddress)(key);
                                // @ts-ignore
                                coinGeckoResponse[mappedKey] = Number(value['usd']);
                            }
                        }
                        this._fiatPriceCache = {
                            cachedResponse: coinGeckoResponse,
                            timestamp: Date.now(),
                        };
                        return [2 /*return*/, coinGeckoResponse];
                    case 4:
                        e_1 = _c.sent();
                        // if coin gecko is down for any reason still allow the swapper to work
                        if (this._fiatPriceCache) {
                            return [2 /*return*/, this._fiatPriceCache.cachedResponse];
                        }
                        return [2 /*return*/, {}];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return CoinGecko;
}());
exports.CoinGecko = CoinGecko;
//# sourceMappingURL=index.js.map