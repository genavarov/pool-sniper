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
var ethers_1 = require("ethers");
var __1 = require("../..");
var tokens_1 = require("../../common/tokens");
var ethereum_address_mock_1 = require("../../mocks/ethereum-address.mock");
var fun_token_mock_1 = require("../../mocks/fun-token.mock");
var provider_url_mock_1 = require("../../mocks/provider-url.mock");
var rep_token_mock_1 = require("../../mocks/rep-token.mock");
var uniswap_pair_1 = require("./uniswap-pair");
describe('UniswapPair', function () {
    it('should throw if no fromTokenContractAddress is passed in', function () {
        // @ts-ignore
        var context = {};
        expect(function () { return new uniswap_pair_1.UniswapPair(context); }).toThrowError(new __1.UniswapError('Must have a `fromTokenContractAddress` on the context', __1.ErrorCodes.fromTokenContractAddressRequired));
    });
    it('should throw if fromTokenContractAddress is invalid address', function () {
        // @ts-ignore
        var context = {
            fromTokenContractAddress: '1',
        };
        expect(function () { return new uniswap_pair_1.UniswapPair(context); }).toThrowError(new __1.UniswapError('`fromTokenContractAddress` is not a valid contract address', __1.ErrorCodes.fromTokenContractAddressNotValid));
    });
    it('should throw if no toTokenContractAddress is passed in', function () {
        // @ts-ignore
        var context = {
            fromTokenContractAddress: (0, fun_token_mock_1.MOCKFUN)().contractAddress,
        };
        expect(function () { return new uniswap_pair_1.UniswapPair(context); }).toThrowError(new __1.UniswapError('Must have a `toTokenContractAddress` on the context', __1.ErrorCodes.toTokenContractAddressRequired));
    });
    it('should throw if toTokenContractAddress is invalid address', function () {
        // @ts-ignore
        var context = {
            fromTokenContractAddress: (0, fun_token_mock_1.MOCKFUN)().contractAddress,
            toTokenContractAddress: '1',
        };
        expect(function () { return new uniswap_pair_1.UniswapPair(context); }).toThrowError(new __1.UniswapError('`toTokenContractAddress` is not a valid contract address', __1.ErrorCodes.toTokenContractAddressNotValid));
    });
    it('should throw if no ethereumAddress is passed in', function () {
        // @ts-ignore
        var context = {
            fromTokenContractAddress: (0, fun_token_mock_1.MOCKFUN)().contractAddress,
            toTokenContractAddress: (0, rep_token_mock_1.MOCKREP)().contractAddress,
        };
        expect(function () { return new uniswap_pair_1.UniswapPair(context); }).toThrowError(new __1.UniswapError('Must have a `ethereumAddress` on the context', __1.ErrorCodes.ethereumAddressRequired));
    });
    it('should throw if ethereumAddress is invalid address', function () {
        // @ts-ignore
        var context = {
            fromTokenContractAddress: (0, fun_token_mock_1.MOCKFUN)().contractAddress,
            toTokenContractAddress: (0, rep_token_mock_1.MOCKREP)().contractAddress,
            ethereumAddress: '1',
        };
        expect(function () { return new uniswap_pair_1.UniswapPair(context); }).toThrowError(new __1.UniswapError('`ethereumAddress` is not a valid address', __1.ErrorCodes.ethereumAddressNotValid));
    });
    it('should throw if no chainId or ethereum provider passed in', function () {
        // @ts-ignore
        var context = {
            fromTokenContractAddress: (0, fun_token_mock_1.MOCKFUN)().contractAddress,
            toTokenContractAddress: (0, rep_token_mock_1.MOCKREP)().contractAddress,
            ethereumAddress: (0, ethereum_address_mock_1.MockEthereumAddress)(),
        };
        expect(function () { return new uniswap_pair_1.UniswapPair(context); }).toThrowError(new __1.UniswapError('Your must supply a chainId or a ethereum provider please look at types `UniswapPairContextForEthereumProvider`, `UniswapPairContextForChainId` and `UniswapPairContextForProviderUrl` to make sure your object is correct in what your passing in', __1.ErrorCodes.invalidPairContext));
    });
    it('should create ethers provider', function () {
        var context = {
            fromTokenContractAddress: (0, fun_token_mock_1.MOCKFUN)().contractAddress,
            toTokenContractAddress: (0, rep_token_mock_1.MOCKREP)().contractAddress,
            ethereumAddress: (0, ethereum_address_mock_1.MockEthereumAddress)(),
            chainId: __1.ChainId.MAINNET,
        };
        var uniswapPair = new uniswap_pair_1.UniswapPair(context);
        //@ts-ignore
        expect(typeof uniswapPair._ethersProvider).not.toBeUndefined();
    });
    it('should create ethers provider', function () {
        var context = {
            fromTokenContractAddress: (0, fun_token_mock_1.MOCKFUN)().contractAddress,
            toTokenContractAddress: (0, rep_token_mock_1.MOCKREP)().contractAddress,
            ethereumAddress: (0, ethereum_address_mock_1.MockEthereumAddress)(),
            chainId: __1.ChainId.MAINNET,
            providerUrl: (0, provider_url_mock_1.MOCK_PROVIDER_URL)(),
        };
        var uniswapPair = new uniswap_pair_1.UniswapPair(context);
        //@ts-ignore
        expect(typeof uniswapPair._ethersProvider).not.toBeUndefined();
    });
    it('should create ethers provider', function () {
        var context = {
            fromTokenContractAddress: (0, fun_token_mock_1.MOCKFUN)().contractAddress,
            toTokenContractAddress: (0, rep_token_mock_1.MOCKREP)().contractAddress,
            ethereumAddress: (0, ethereum_address_mock_1.MockEthereumAddress)(),
            ethereumProvider: new ethers_1.providers.JsonRpcProvider((0, provider_url_mock_1.MOCK_PROVIDER_URL)()),
        };
        var uniswapPair = new uniswap_pair_1.UniswapPair(context);
        //@ts-ignore
        expect(typeof uniswapPair._ethersProvider).not.toBeUndefined();
    });
    describe('createFactory', function () {
        it('erc20 > erc20 > should create a uniswap pair factory', function () { return __awaiter(void 0, void 0, void 0, function () {
            var context, uniswapPair, factory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = {
                            fromTokenContractAddress: (0, fun_token_mock_1.MOCKFUN)().contractAddress,
                            toTokenContractAddress: (0, rep_token_mock_1.MOCKREP)().contractAddress,
                            ethereumAddress: (0, ethereum_address_mock_1.MockEthereumAddress)(),
                            chainId: __1.ChainId.MAINNET,
                        };
                        uniswapPair = new uniswap_pair_1.UniswapPair(context);
                        return [4 /*yield*/, uniswapPair.createFactory()];
                    case 1:
                        factory = _a.sent();
                        expect(factory.toToken).toEqual((0, rep_token_mock_1.MOCKREP)());
                        expect(factory.fromToken).toEqual((0, fun_token_mock_1.MOCKFUN)());
                        return [2 /*return*/];
                }
            });
        }); });
        it('eth > erc20 > should create a uniswap pair factory', function () { return __awaiter(void 0, void 0, void 0, function () {
            var context, uniswapPair, factory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = {
                            fromTokenContractAddress: tokens_1.ETH.MAINNET().contractAddress,
                            toTokenContractAddress: (0, rep_token_mock_1.MOCKREP)().contractAddress,
                            ethereumAddress: (0, ethereum_address_mock_1.MockEthereumAddress)(),
                            chainId: __1.ChainId.MAINNET,
                        };
                        uniswapPair = new uniswap_pair_1.UniswapPair(context);
                        return [4 /*yield*/, uniswapPair.createFactory()];
                    case 1:
                        factory = _a.sent();
                        expect(factory.toToken).toEqual((0, rep_token_mock_1.MOCKREP)());
                        expect(factory.fromToken).toEqual(tokens_1.ETH.MAINNET());
                        return [2 /*return*/];
                }
            });
        }); });
        it('erc20 > eth > should create a uniswap pair factory', function () { return __awaiter(void 0, void 0, void 0, function () {
            var context, uniswapPair, factory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = {
                            fromTokenContractAddress: (0, fun_token_mock_1.MOCKFUN)().contractAddress,
                            toTokenContractAddress: tokens_1.ETH.MAINNET().contractAddress,
                            ethereumAddress: (0, ethereum_address_mock_1.MockEthereumAddress)(),
                            chainId: __1.ChainId.MAINNET,
                        };
                        uniswapPair = new uniswap_pair_1.UniswapPair(context);
                        return [4 /*yield*/, uniswapPair.createFactory()];
                    case 1:
                        factory = _a.sent();
                        expect(factory.toToken).toEqual(tokens_1.ETH.MAINNET());
                        expect(factory.fromToken).toEqual((0, fun_token_mock_1.MOCKFUN)());
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=uniswap-pair.spec.js.map