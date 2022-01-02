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
var abi_examples_1 = require("../../abi-examples");
var example = function () { return __awaiter(void 0, void 0, void 0, function () {
    var mockEthereumAddress, customHttpProvider, contract, simpleCall, privateKey, wallet, contractWithSigner, tupleExampleRequest, tx, result, filter;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mockEthereumAddress = '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b';
                customHttpProvider = new ethers_1.ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/280bb5b627394709938a7cc0b71a4a58');
                contract = new ethers_1.ethers.Contract(abi_examples_1.AbiExamples.YOUR_CONTRACT_ADDRESS, abi_examples_1.AbiExamples.YOUR_ABI, customHttpProvider);
                return [4 /*yield*/, contract.easyExample(true, mockEthereumAddress, new Date().getTime())];
            case 1:
                simpleCall = _a.sent();
                console.log(simpleCall);
                privateKey = '0x0123456789012345678901234567890123456789012345678901234567890123';
                wallet = new ethers_1.ethers.Wallet(privateKey, customHttpProvider);
                contractWithSigner = contract.connect(wallet);
                tupleExampleRequest = {
                    address: mockEthereumAddress,
                    timestamps: [
                        new Date().getTime(),
                        new Date().getTime(),
                        new Date().getTime(),
                    ],
                };
                return [4 /*yield*/, contractWithSigner.tupleInputOnly(tupleExampleRequest, {
                        // The maximum units of gas for the transaction to use
                        gasLimit: 23000,
                        // The price (in wei) per unit of gas
                        gasPrice: ethers_1.utils.parseUnits('9.0', 'gwei'),
                        // The nonce to use in the transaction
                        nonce: 123,
                        // The amount to send with the transaction (i.e. msg.value)
                        value: ethers_1.utils.parseEther('1.0'),
                        // The chain ID (or network ID) to use
                        chainId: 1,
                    })];
            case 2:
                tx = _a.sent();
                console.log(tx.hash);
                // "0xaf0068dcf728afa5accd02172867627da4e6f946dfb8174a7be31f01b11d5364"
                // The operation is NOT complete yet; we must wait until it is mined
                return [4 /*yield*/, tx.wait()];
            case 3:
                // "0xaf0068dcf728afa5accd02172867627da4e6f946dfb8174a7be31f01b11d5364"
                // The operation is NOT complete yet; we must wait until it is mined
                _a.sent();
                return [4 /*yield*/, contract.tupleNoInputNames(mockEthereumAddress, mockEthereumAddress)];
            case 4:
                result = _a.sent();
                console.log(result);
                // full typings on your events
                contract.on('Event1', function (author, oldValue, newValue, event) {
                    // Called when anyone changes the value
                    console.log(author);
                    // "0x14791697260E4c9A71f18484C9f997B308e59325"
                    console.log(oldValue);
                    // "Hello World"
                    console.log(newValue);
                    // "I like turtles."
                    console.log(event.blockNumber);
                    // 4115004
                });
                filter = contract.filters.Event1(wallet.address);
                // full typings on filter interfaces as well
                contract.filters.Event1(filter, function (author, oldValue, newValue, event) {
                    // Called ONLY when your account changes the value
                    console.log(author);
                    // "0x14791697260E4c9A71f18484C9f997B308e59325"
                    console.log(oldValue);
                    // "Hello World"
                    console.log(newValue);
                    // "I like turtles."
                    console.log(event.blockNumber);
                    // 4115004
                });
                return [2 /*return*/];
        }
    });
}); };
example();
//# sourceMappingURL=fake-contract-strongly-typed.js.map