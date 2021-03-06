"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3Factory = void 0;
var abi_properties_1 = require("../../abi-properties");
var helpers_1 = __importDefault(require("../../common/helpers"));
var helpers_2 = __importDefault(require("./common/helpers"));
var provider_1 = require("./enums/provider");
var Web3Factory = /** @class */ (function () {
    function Web3Factory() {
    }
    /**
     * Build web3 genertic interfaces
     */
    Web3Factory.prototype.buildWeb3Interfaces = function (abiName) {
        return "import BN from \"bn.js\";\n    import BigNumber from 'bignumber.js';\n    import { PromiEvent, TransactionReceipt, EventResponse, EventData, Web3ContractContext } from \"ethereum-abi-types-generator\";\n\n    export interface CallOptions {\n        from?: string;\n        gasPrice?: string;\n        gas?: number;\n    }\n\n    export interface SendOptions {\n        from: string;\n        value?: number | string | BN | BigNumber;\n        gasPrice?: string;\n        gas?: number;\n    }\n\n    export interface EstimateGasOptions {\n        from?: string;\n        value?: number | string | BN | BigNumber;\n        gas?: number;\n    }\n\n    export interface MethodPayableReturnContext {\n        send(options: SendOptions):PromiEvent<TransactionReceipt>;\n        send(\n            options: SendOptions,\n            callback: (error: Error, result: any) => void\n        ): PromiEvent<TransactionReceipt>;\n        estimateGas(options: EstimateGasOptions): Promise<number>;\n        estimateGas(\n            options: EstimateGasOptions,\n            callback: (error: Error, result: any) => void\n        ): Promise<number>;\n        encodeABI(): string;\n    }\n\n    export interface MethodConstantReturnContext<TCallReturn> {\n        call(): Promise<TCallReturn>;\n        call(options: CallOptions): Promise<TCallReturn>;\n        call(\n        options: CallOptions,\n        callback: (error: Error, result: TCallReturn) => void\n        ): Promise<TCallReturn>;\n        encodeABI(): string;\n    }\n\n    export interface MethodReturnContext extends MethodPayableReturnContext {}\n\n    export type ContractContext = Web3ContractContext<\n      " + abiName + ",\n      " + abiName + "MethodNames,\n      " + abiName + "EventsContext,\n      " + abiName + "Events\n    >;\n    ";
    };
    /**
     * Build event interface properties
     * @param abiItems The abi json
     */
    Web3Factory.prototype.buildEventInterfaceProperties = function (abiItems) {
        var eventPropeties = '';
        for (var i = 0; i < abiItems.length; i++) {
            if (abiItems[i].type === abi_properties_1.AbiItemType.event) {
                var filtersProperties = '{';
                for (var a = 0; a < abiItems[i].inputs.length; a++) {
                    if (abiItems[i].inputs[a].indexed === true) {
                        var paramterType = helpers_2.default.getSolidityInputTsType(abiItems[i].inputs[a], provider_1.Provider.web3);
                        filtersProperties += abiItems[i].inputs[a].name + "?: " + paramterType + " | " + paramterType + "[],";
                    }
                }
                filtersProperties += '}';
                var parameters = "\n         {\n             filter?: " + filtersProperties + ";\n             fromBlock?: number;\n             toBlock?: 'latest' | number;\n             topics?: string[]\n         }\n         ";
                eventPropeties += abiItems[i].name + "(parameters: " + parameters + ", callback?: (error: Error, event: EventData) => void): EventResponse;";
            }
        }
        return eventPropeties;
    };
    /**
     * Build the method return context
     * @param type The type it returns
     * @param abiItem The abi item
     */
    Web3Factory.prototype.buildMethodReturnContext = function (type, abiItem) {
        if (helpers_1.default.isNeverModifyBlockchainState(abiItem)) {
            return ": MethodConstantReturnContext<" + type + ">";
        }
        if (helpers_1.default.isAcceptsEther(abiItem)) {
            return ": MethodPayableReturnContext";
        }
        return ": MethodReturnContext";
    };
    return Web3Factory;
}());
exports.Web3Factory = Web3Factory;
//# sourceMappingURL=web3-factory.js.map