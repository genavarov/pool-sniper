"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var abi_properties_mock_1 = require("../../abi-properties/mocks/abi-properties.mock");
var helpers_1 = __importDefault(require("../../common/helpers"));
var ethers_version_1 = require("./enums/ethers-version");
var ethers_factory_1 = require("./ethers-factory");
describe('EthersFactory', function () {
    var ethersFactory;
    beforeEach(function () {
        ethersFactory = new ethers_factory_1.EthersFactory();
    });
    describe('buildEthersInterfaces', function () {
        it('should return correct interface for ethers version 4 or below', function () {
            expect(helpers_1.default.removeAllWhiteSpace(ethersFactory.buildEthersInterfaces('TestAbi', ethers_version_1.EthersVersion.four_or_below))).toEqual(helpers_1.default.removeAllWhiteSpace("\n          import { ContractTransaction } from \"ethers\";\n          import { Arrayish, BigNumber, BigNumberish, Interface } from \"ethers/utils\";\n          import { EthersContractContext } from \"ethereum-abi-types-generator\";\n\n          export type ContractContext = EthersContractContext<\n            TestAbi,\n            TestAbiEventsContext,\n            TestAbiEvents\n          >;\n\n          export declare type EventFilter = {\n            address?: string;\n            topics?: Array<string>;\n            fromBlock?: string | number;\n            toBlock?: string | number;\n          };\n\n          export interface ContractTransactionOverrides {\n            /**\n             * The maximum units of gas for the transaction to use\n             */\n            gasLimit?: number;\n            /**\n             * The price (in wei) per unit of gas\n             */\n            gasPrice?: BigNumber | string | number | Promise<any>;\n            /**\n             * The nonce to use in the transaction\n             */\n            nonce?: number;\n            /**\n             * The amount to send with the transaction (i.e. msg.value)\n             */\n            value?: BigNumber | string | number | Promise<any>;\n            /**\n             * The chain ID (or network ID) to use\n             */\n            chainId?: number;\n          }\n\n          export interface ContractCallOverrides {\n            /**\n             * The address to execute the call as\n             */\n            from?: string;\n            /**\n             * The maximum units of gas for the transaction to use\n             */\n            gasLimit?: number;\n          }\n        "));
        });
        it('should return correct interface for ethers version 5', function () {
            expect(helpers_1.default.removeAllWhiteSpace(ethersFactory.buildEthersInterfaces('TestAbi', ethers_version_1.EthersVersion.five))).toEqual(helpers_1.default.removeAllWhiteSpace("\n          import { ContractTransaction,\n                    ContractInterface,\n                    BytesLike as Arrayish,\n                    BigNumber,\n                    BigNumberish } from \"ethers\";\n           import { EthersContractContextV5 } from \"ethereum-abi-types-generator\";\n\n          export type ContractContext = EthersContractContextV5<\n            TestAbi,\n            TestAbiMethodNames,\n            TestAbiEventsContext,\n            TestAbiEvents\n          >;\n\n          export declare type EventFilter = {\n            address?: string;\n            topics?: Array<string>;\n            fromBlock?: string | number;\n            toBlock?: string | number;\n          };\n\n          export interface ContractTransactionOverrides {\n            /**\n             * The maximum units of gas for the transaction to use\n             */\n            gasLimit?: number;\n            /**\n             * The price (in wei) per unit of gas\n             */\n            gasPrice?: BigNumber | string | number | Promise<any>;\n            /**\n             * The nonce to use in the transaction\n             */\n            nonce?: number;\n            /**\n             * The amount to send with the transaction (i.e. msg.value)\n             */\n            value?: BigNumber | string | number | Promise<any>;\n            /**\n             * The chain ID (or network ID) to use\n             */\n            chainId?: number;\n          }\n\n          export interface ContractCallOverrides {\n            /**\n             * The address to execute the call as\n             */\n            from?: string;\n            /**\n             * The maximum units of gas for the transaction to use\n             */\n            gasLimit?: number;\n          }\n        "));
        });
    });
    describe('buildEventInterfaceProperties', function () {
        it('should return empty string if 0 length abi items', function () {
            expect(ethersFactory.buildEventInterfaceProperties([])).toEqual('');
        });
        it('should build all events from the ABI', function () {
            expect(ethersFactory.buildEventInterfaceProperties(abi_properties_mock_1.AbiPropertiesMock.AbiItemsMock)).toEqual('NewExchange(...parameters: any): EventFilter;');
        });
    });
    describe('buildMethodReturnContext', function () {
        it('should return `Promise<void>` if abiItem.constant === true', function () {
            expect(ethersFactory.buildMethodReturnContext('void', abi_properties_mock_1.AbiPropertiesMock.AbiItemsMock.find(function (m) { return m.constant; }))).toEqual(': Promise<void>');
        });
        it('should return `Promise<void>` if abiItem.stateMutability === `view`', function () {
            expect(ethersFactory.buildMethodReturnContext('void', abi_properties_mock_1.AbiPropertiesMock.AbiTokenV2Mock.find(function (m) { return m.stateMutability === "view"; }))).toEqual(': Promise<void>');
        });
        it('should return `Promise<void>` if abiItem.stateMutability === `pure`', function () {
            expect(ethersFactory.buildMethodReturnContext('void', abi_properties_mock_1.AbiPropertiesMock.AbiItemsV2Mock.find(function (m) { return m.stateMutability === "pure"; }))).toEqual(': Promise<void>');
        });
        it('should return `Promise<ContractTransaction>` if abiItem.payable === true', function () {
            expect(ethersFactory.buildMethodReturnContext('void', abi_properties_mock_1.AbiPropertiesMock.AbiTokenMock.find(function (m) { return !helpers_1.default.isNeverModifyBlockchainState(m) && m.payable; }))).toEqual(': Promise<ContractTransaction>');
        });
        it('should return `Promise<ContractTransaction>` if abiItem.stateMutability === `payable`', function () {
            expect(ethersFactory.buildMethodReturnContext('void', abi_properties_mock_1.AbiPropertiesMock.AbiItemsV2Mock.find(function (m) { return !m.constant && m.stateMutability === 'payable'; }))).toEqual(': Promise<ContractTransaction>');
        });
        it('should return `Promise<ContractTransaction>` if not accepts ether and cannot modify blockchain state', function () {
            expect(ethersFactory.buildMethodReturnContext('void', abi_properties_mock_1.AbiPropertiesMock.AbiTokenMock.find(function (m) {
                return !helpers_1.default.isNeverModifyBlockchainState(m) &&
                    !helpers_1.default.isAcceptsEther(m);
            }))).toEqual(': Promise<ContractTransaction>');
        });
    });
});
//# sourceMappingURL=ethers-factory.spec.js.map