"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthersFactory = void 0;
var abi_properties_1 = require("../../abi-properties");
var helpers_1 = __importDefault(require("../../common/helpers"));
var ethers_version_1 = require("./enums/ethers-version");
var EthersFactory = /** @class */ (function () {
    function EthersFactory() {
    }
    /**
     * Build ethers generic interfaces
     */
    EthersFactory.prototype.buildEthersInterfaces = function (abiName, ethersVersion) {
        return this.getEthersImports(abiName, ethersVersion) + "\n\n      export declare type EventFilter = {\n        address?: string;\n        topics?: Array<string>;\n        fromBlock?: string | number;\n        toBlock?: string | number;\n      };\n\n      export interface ContractTransactionOverrides {\n         /**\n         * The maximum units of gas for the transaction to use\n         */\n         gasLimit?: number;\n        /**\n         * The price (in wei) per unit of gas\n         */\n         gasPrice?: BigNumber | string | number | Promise<any>;\n        /**\n         * The nonce to use in the transaction\n         */\n         nonce?: number;\n        /**\n         * The amount to send with the transaction (i.e. msg.value)\n         */\n         value?: BigNumber | string | number | Promise<any>;\n        /**\n         * The chain ID (or network ID) to use\n         */\n         chainId?: number;\n      }\n\n       export interface ContractCallOverrides {\n         /**\n         * The address to execute the call as\n         */\n         from?: string;\n        /**\n         * The maximum units of gas for the transaction to use\n         */\n         gasLimit?: number;\n      }\n    ";
    };
    /**
     * Get ethers imports by version number
     * @param abiName The abi name
     * @param ethersVersion The ethers version
     */
    EthersFactory.prototype.getEthersImports = function (abiName, ethersVersion) {
        switch (ethersVersion) {
            case ethers_version_1.EthersVersion.four_or_below:
                return "\n          import { ContractTransaction } from \"ethers\";\n          import { Arrayish, BigNumber, BigNumberish, Interface } from \"ethers/utils\";\n          import { EthersContractContext } from \"ethereum-abi-types-generator\";\n\n          export type ContractContext = EthersContractContext<\n            " + abiName + ",\n            " + abiName + "EventsContext,\n            " + abiName + "Events\n          >;\n        ";
            case ethers_version_1.EthersVersion.five:
                return "\n           import { ContractTransaction,\n                    ContractInterface,\n                    BytesLike as Arrayish,\n                    BigNumber,\n                    BigNumberish } from \"ethers\";\n           import { EthersContractContextV5 } from \"ethereum-abi-types-generator\";\n\n           export type ContractContext = EthersContractContextV5<\n            " + abiName + ",\n            " + abiName + "MethodNames,\n            " + abiName + "EventsContext,\n            " + abiName + "Events\n           >;\n        ";
            default:
                throw new Error("Unsupported ethers version " + ethersVersion);
        }
    };
    /**
     * Build event interface properties
     * @param abiItems The abi json
     */
    EthersFactory.prototype.buildEventInterfaceProperties = function (abiItems) {
        var eventPropeties = '';
        for (var i = 0; i < abiItems.length; i++) {
            if (abiItems[i].type === abi_properties_1.AbiItemType.event) {
                // TODO make parameters strongly typed if i can
                eventPropeties += abiItems[i].name + "(...parameters: any): EventFilter;";
            }
        }
        return eventPropeties;
    };
    /**
     * Build the method return context
     * @param type The type it returns
     * @param abiItem The abi item
     */
    EthersFactory.prototype.buildMethodReturnContext = function (type, abiItem) {
        if (helpers_1.default.isNeverModifyBlockchainState(abiItem)) {
            return ": Promise<" + type + ">";
        }
        return ": Promise<ContractTransaction>";
    };
    /**
     * Add overrides to the parameters - https://docs.ethers.io/ethers.js/html/api-contract.html#overrides
     * @param parameters The parameters
     * @param abiItem The abi items
     */
    EthersFactory.prototype.addOverridesToParameters = function (parameters, abiItem) {
        // take into consideration the `(` defined at the start
        if (parameters.length > 1) {
            parameters += ', ';
        }
        if (helpers_1.default.isNeverModifyBlockchainState(abiItem)) {
            return (parameters += 'overrides?: ContractCallOverrides');
        }
        return (parameters += 'overrides?: ContractTransactionOverrides');
    };
    return EthersFactory;
}());
exports.EthersFactory = EthersFactory;
//# sourceMappingURL=ethers-factory.js.map