"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var abi_properties_mock_1 = require("../../abi-properties/mocks/abi-properties.mock");
var helpers_1 = __importDefault(require("../../common/helpers"));
var web3_factory_1 = require("./web3-factory");
describe('Web3Factory', function () {
    var web3Factory;
    beforeEach(function () {
        web3Factory = new web3_factory_1.Web3Factory();
    });
    describe('buildWeb3Interfaces', function () {
        it('should round correct interface', function () {
            expect(helpers_1.default.removeAllWhiteSpace(web3Factory.buildWeb3Interfaces('TestAbi'))).toEqual(helpers_1.default.removeAllWhiteSpace("\n         import BN from \"bn.js\";\n         import BigNumber from'bignumber.js';\n         import { PromiEvent, TransactionReceipt, EventResponse, EventData, Web3ContractContext } from \"ethereum-abi-types-generator\";\n\n         export interface CallOptions {\n          from?: string;\n          gasPrice?: string;\n          gas?: number;\n        }\n\n        export interface SendOptions {\n          from: string;\n          value?: number | string | BN | BigNumber;\n          gasPrice?: string;\n          gas?: number;\n        }\n\n        export interface EstimateGasOptions {\n          from?: string;\n          value?: number | string | BN | BigNumber;\n          gas?: number;\n        }\n\n        export interface MethodPayableReturnContext {\n          send(options: SendOptions):PromiEvent<TransactionReceipt>;\n          send(\n              options: SendOptions,\n              callback: (error: Error, result: any) => void\n          ): PromiEvent<TransactionReceipt>;\n          estimateGas(options: EstimateGasOptions): Promise<number>;\n          estimateGas(\n              options: EstimateGasOptions,\n              callback: (error: Error, result: any) => void\n          ): Promise<number>;\n          encodeABI(): string;\n        }\n\n        export interface MethodConstantReturnContext<TCallReturn> {\n          call(): Promise<TCallReturn>;\n          call(options: CallOptions): Promise<TCallReturn>;\n          call(\n          options: CallOptions,\n          callback: (error: Error, result: TCallReturn) => void\n          ): Promise<TCallReturn>;\n          encodeABI():string;\n        }\n\n        export interface MethodReturnContext extends MethodPayableReturnContext {}\n\n        export type ContractContext = Web3ContractContext<\n          TestAbi,\n          TestAbiMethodNames,\n          TestAbiEventsContext,\n          TestAbiEvents\n        >;\n        "));
        });
    });
    describe('buildEventInterfaceProperties', function () {
        it('should return empty string if 0 length abi items', function () {
            expect(web3Factory.buildEventInterfaceProperties([])).toEqual('');
        });
        it('should build all events from the ABI', function () {
            expect(helpers_1.default.removeAllWhiteSpace(web3Factory.buildEventInterfaceProperties(abi_properties_mock_1.AbiPropertiesMock.AbiItemsMock))).toEqual(helpers_1.default.removeAllWhiteSpace("\n          NewExchange(parameters:\n          {\n              filter?: {token?: string | string[],exchange?: string | string[],};\n              fromBlock?: number;\n              toBlock?: 'latest' | number;\n              topics?: string[]\n          },\n          callback?: (error: Error, event: EventData) => void): EventResponse;\n      "));
        });
    });
    describe('buildMethodReturnContext', function () {
        it('should return `MethodConstantReturnContext<void>` if abiItem.constant === true', function () {
            expect(web3Factory.buildMethodReturnContext('void', abi_properties_mock_1.AbiPropertiesMock.AbiItemsMock.find(function (m) { return m.constant; }))).toEqual(': MethodConstantReturnContext<void>');
        });
        it('should return `MethodConstantReturnContext<void>` if abiItem.stateMutability === `view`', function () {
            expect(web3Factory.buildMethodReturnContext('void', abi_properties_mock_1.AbiPropertiesMock.AbiTokenV2Mock.find(function (m) { return m.stateMutability === 'view'; }))).toEqual(': MethodConstantReturnContext<void>');
        });
        it('should return `MethodConstantReturnContext<void>` if abiItem.stateMutability === `pure`', function () {
            expect(web3Factory.buildMethodReturnContext('void', abi_properties_mock_1.AbiPropertiesMock.AbiItemsV2Mock.find(function (m) { return m.stateMutability === 'pure'; }))).toEqual(': MethodConstantReturnContext<void>');
        });
        it('should return `MethodPayableReturnContext` abiItem.payable === true', function () {
            expect(web3Factory.buildMethodReturnContext('void', abi_properties_mock_1.AbiPropertiesMock.AbiTokenMock.find(function (m) { return !helpers_1.default.isNeverModifyBlockchainState(m) && m.payable; }))).toEqual(': MethodPayableReturnContext');
        });
        it('should return `MethodPayableReturnContext` abiItem.stateMutability === `payable`', function () {
            expect(web3Factory.buildMethodReturnContext('void', abi_properties_mock_1.AbiPropertiesMock.AbiItemsV2Mock.find(function (m) { return !m.constant && m.stateMutability === 'payable'; }))).toEqual(': MethodPayableReturnContext');
        });
        it('should return `MethodReturnContext` if not accepts ether and cannot modify blockchain state', function () {
            expect(web3Factory.buildMethodReturnContext('void', abi_properties_mock_1.AbiPropertiesMock.AbiTokenMock.find(function (m) {
                return !helpers_1.default.isNeverModifyBlockchainState(m) &&
                    !helpers_1.default.isAcceptsEther(m);
            }))).toEqual(': MethodReturnContext');
        });
    });
});
//# sourceMappingURL=web3-factory.spec.js.map