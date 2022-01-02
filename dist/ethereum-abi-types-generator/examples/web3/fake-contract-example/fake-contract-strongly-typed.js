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
var web3_1 = __importDefault(require("web3"));
var abi_examples_1 = require("../../abi-examples");
var example = function () { return __awaiter(void 0, void 0, void 0, function () {
    var mockEthereumAddress, web3, contract, simpleCall, tupleExampleRequest, data, result, event;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mockEthereumAddress = '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b';
                web3 = new web3_1.default('https://mainnet.infura.io/v3/280bb5b627394709938a7cc0b71a4a58');
                contract = new web3.eth.Contract(abi_examples_1.AbiExamples.YOUR_ABI, abi_examples_1.AbiExamples.YOUR_CONTRACT_ADDRESS);
                return [4 /*yield*/, contract.methods
                        .easyExample(true, mockEthereumAddress, new Date().getTime())
                        .call()];
            case 1:
                simpleCall = _a.sent();
                console.log(simpleCall);
                tupleExampleRequest = {
                    address: mockEthereumAddress,
                    timestamps: [
                        new Date().getTime(),
                        new Date().getTime(),
                        new Date().getTime(),
                    ],
                };
                data = contract.methods.tupleInputOnly(tupleExampleRequest).encodeABI();
                console.log(data);
                // any none constant methods will have the correct interface on them as well
                // aka you cant call `.call()` here and the compile will show you this.
                // will also expose the event emitters for your typings to still work with web3
                contract.methods
                    .tupleInputOnly(tupleExampleRequest)
                    .send({ from: mockEthereumAddress })
                    .on('transactionHash', function (hash) {
                    console.log(hash);
                });
                return [4 /*yield*/, contract.methods
                        .tupleNoInputNames(mockEthereumAddress, mockEthereumAddress)
                        .call()];
            case 2:
                result = _a.sent();
                console.log(result);
                // full typings on your events with even the filter indexs which will
                // not compile if supply it incorrectly and only expose the correct ones for you
                contract.events
                    .Event1({ filter: { token: '0x00' } })
                    .on('changed', function (event) {
                    console.log(event);
                });
                return [4 /*yield*/, contract.getPastEvents('Event1', {
                        filter: { token: '0x00' },
                    })];
            case 3:
                event = _a.sent();
                console.log(event);
                return [2 /*return*/];
        }
    });
}); };
example();
//# sourceMappingURL=fake-contract-strongly-typed.js.map