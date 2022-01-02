"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var parser_typescript_1 = __importDefault(require("prettier/parser-typescript"));
var standalone_1 = __importDefault(require("prettier/standalone"));
var helpers_1 = __importDefault(require("../../common/helpers"));
var abi_generator_1 = __importDefault(require("./abi-generator"));
var ethers_version_1 = require("./enums/ethers-version");
var provider_1 = require("./enums/provider");
// tslint:disable-next-line: no-var-requires
var abiJson = require('./mocks/fake-contract-abi.json');
var generatorContext = {
    provider: provider_1.Provider.web3,
    // tslint:disable-next-line: quotemark
    abiFileLocation: "'abi.json'",
    // tslint:disable-next-line: quotemark
    outputPathDirectory: "'here'",
};
var abiGenertorOptions = {
    existsSync: true,
    lstatSync: true,
    callGenerate: true,
};
var existsSyncSpy;
var lstatSyncSpy;
var readFileSyncSpy;
var writeFileSyncSpy;
var watchSpy;
var pathDirnameSpy;
var pathResolveSpy;
var preitterFormatSpy;
var callSuccessAbiGeneratorInstance = function (options, context) {
    if (options === void 0) { options = abiGenertorOptions; }
    if (context === void 0) { context = generatorContext; }
    var instance = new abi_generator_1.default(context);
    existsSyncSpy = spyOn(fs_extra_1.default, 'existsSync').and.returnValue(options.existsSync);
    if (options.lstatSync) {
        lstatSyncSpy = spyOn(fs_extra_1.default, 'lstatSync').and.returnValue({
            isDirectory: function () {
                return true;
            },
        });
    }
    readFileSyncSpy = spyOn(fs_extra_1.default, 'readFileSync').and.returnValue(JSON.stringify(abiJson));
    writeFileSyncSpy = spyOn(fs_extra_1.default, 'writeFileSync').and.returnValue(true);
    watchSpy = spyOn(fs_extra_1.default, 'watch').and.returnValue(true);
    pathDirnameSpy = spyOn(path_1.default, 'dirname').and.returnValue(generatorContext.outputPathDirectory);
    pathResolveSpy = spyOn(path_1.default, 'resolve').and.callThrough();
    preitterFormatSpy = spyOn(standalone_1.default, 'format').and.callThrough();
    if (options.callGenerate) {
        instance.generate();
    }
    return instance;
};
var prettierFormat = function (value) {
    return standalone_1.default.format(value, {
        parser: 'typescript',
        trailingComma: 'es5',
        singleQuote: true,
        bracketSpacing: true,
        printWidth: 80,
        plugins: [parser_typescript_1.default],
    });
};
describe('AbiGenerator', function () {
    it('should clear all quotes from generatorContext.abiFileLocation', function () {
        callSuccessAbiGeneratorInstance();
        expect(generatorContext.abiFileLocation).toEqual('abi.json');
    });
    it('should clear all quotes from generatorContext.outputPathDirectory', function () {
        callSuccessAbiGeneratorInstance();
        expect(generatorContext.outputPathDirectory).toEqual('here');
    });
    it('should throw an error if output path does not exist', function () {
        var abiGenertorOptionsClone = helpers_1.default.deepClone(abiGenertorOptions);
        abiGenertorOptionsClone.existsSync = false;
        expect(function () {
            callSuccessAbiGeneratorInstance(abiGenertorOptionsClone);
        }).toThrowError('output path must be a directory');
    });
    it('should throw an error if output path is not a dirctory', function () {
        var abiGenertorOptionsClone = helpers_1.default.deepClone(abiGenertorOptions);
        abiGenertorOptionsClone.lstatSync = false;
        abiGenertorOptionsClone.callGenerate = false;
        spyOn(fs_extra_1.default, 'lstatSync').and.returnValue({
            isDirectory: function () {
                return false;
            },
        });
        var instance = callSuccessAbiGeneratorInstance(abiGenertorOptionsClone);
        expect(function () {
            instance.generate();
        }).toThrowError('output path must be a directory');
    });
    it('should not call path.dirname if `this._context.outputPathDirectory` is defined', function () {
        callSuccessAbiGeneratorInstance();
        expect(pathDirnameSpy).toHaveBeenCalledTimes(0);
    });
    it('should call path.dirname 3 times if `this._context.outputPathDirectory` is not defined', function () {
        var generatorContextClone = helpers_1.default.deepClone(generatorContext);
        generatorContextClone.outputPathDirectory = undefined;
        callSuccessAbiGeneratorInstance(abiGenertorOptions, generatorContextClone);
        expect(pathDirnameSpy).toHaveBeenCalledTimes(3);
    });
    it('should call path.resolve 5 time if `this._context.outputPathDirectory` is defined', function () {
        callSuccessAbiGeneratorInstance();
        expect(pathResolveSpy).toHaveBeenCalled();
    });
    it('should call path.resolve if `this._context.outputPathDirectory` is not defined', function () {
        var generatorContextClone = helpers_1.default.deepClone(generatorContext);
        generatorContextClone.outputPathDirectory = undefined;
        callSuccessAbiGeneratorInstance(abiGenertorOptions, generatorContextClone);
        expect(pathResolveSpy).toHaveBeenCalled();
    });
    it('should call fs.existsSync 2 time', function () {
        callSuccessAbiGeneratorInstance();
        expect(existsSyncSpy).toHaveBeenCalledTimes(2);
    });
    it('should call fs.readFileSync 1 time', function () {
        callSuccessAbiGeneratorInstance();
        expect(readFileSyncSpy).toHaveBeenCalledTimes(1);
    });
    it('should call fs.writeFileSyncSpy 1 time', function () {
        callSuccessAbiGeneratorInstance();
        expect(writeFileSyncSpy).toHaveBeenCalledTimes(1);
    });
    it('should throw an error if provider passed in is not valid', function () {
        var generatorContextClone = helpers_1.default.deepClone(generatorContext);
        // tslint:disable-next-line: no-any
        generatorContextClone.provider = 'blah';
        expect(function () {
            callSuccessAbiGeneratorInstance(abiGenertorOptions, generatorContextClone);
        }).toThrowError('blah is not a known supported provider');
    });
    it('should not call `fs.watch` if watch is not defined', function () {
        callSuccessAbiGeneratorInstance();
        expect(watchSpy).toHaveBeenCalledTimes(0);
    });
    it('should call `fs.watch` once if watch is set to true', function () {
        var generatorContextClone = helpers_1.default.deepClone(generatorContext);
        generatorContextClone.watch = true;
        callSuccessAbiGeneratorInstance(abiGenertorOptions, generatorContextClone);
        expect(watchSpy).toHaveBeenCalledTimes(1);
    });
    it('should call prettier once with the default options', function () {
        callSuccessAbiGeneratorInstance();
        expect(preitterFormatSpy).toHaveBeenCalledTimes(1);
        expect(JSON.stringify(preitterFormatSpy.calls.mostRecent().args[1])).toEqual('{"parser":"typescript","trailingComma":"es5","singleQuote":true,"bracketSpacing":true,"printWidth":80,"plugins":[{"parsers":{"typescript":{"astFormat":"estree"}}}]}');
    });
    describe('Web3', function () {
        it('round trip', function () {
            callSuccessAbiGeneratorInstance();
            expect(writeFileSyncSpy.calls.mostRecent().args[0]).not.toBeUndefined();
            expect(helpers_1.default.removeAllWhiteSpace(writeFileSyncSpy.calls.mostRecent().args[1])).toEqual(helpers_1.default.removeAllWhiteSpace(prettierFormat("import BN from 'bn.js';import BigNumber from'bignumber.js';\n    import {\n      PromiEvent,\n      TransactionReceipt,\n      EventResponse,\n      EventData,\n      Web3ContractContext,\n    } from 'ethereum-abi-types-generator';\n    export interface CallOptions {\n      from?: string;\n      gasPrice?: string;\n      gas?: number;\n    }\n    export interface SendOptions {\n      from: string;\n      value?: number | string | BN |BigNumber;\n      gasPrice?: string;\n      gas?: number;\n    }\n    export interface EstimateGasOptions {\n      from?: string;\n      value?: number | string | BN |BigNumber;\n      gas?: number;\n    }\n    export interface MethodPayableReturnContext {\n      send(options: SendOptions): PromiEvent<TransactionReceipt>;\n      send(\n        options: SendOptions,\n        callback: (error: Error, result: any) => void\n      ): PromiEvent<TransactionReceipt>;\n      estimateGas(options: EstimateGasOptions): Promise<number>;\n      estimateGas(\n        options: EstimateGasOptions,\n        callback: (error: Error, result: any) => void\n      ): Promise<number>;\n      encodeABI(): string;\n    }\n    export interface MethodConstantReturnContext<TCallReturn> {\n      call(): Promise<TCallReturn>;\n      call(options: CallOptions): Promise<TCallReturn>;\n      call(\n        options: CallOptions,\n        callback: (error: Error, result: TCallReturn) => void\n      ): Promise<TCallReturn>;\n      encodeABI():string;\n    }\n    export interface MethodReturnContext extends MethodPayableReturnContext {}\n    export type ContractContext = Web3ContractContext<\n      Abi,\n      AbiMethodNames,\n      AbiEventsContext,\n      AbiEvents\n    >;\n    export type AbiEvents = 'Event1' | 'Event2';\n    export interface AbiEventsContext {\n      Event1(\n        parameters: {\n          filter?: {\n            token?: string | string[];\n            exchange?: string | string[];\n            _value?: string | string[];\n          };\n          fromBlock?: number;\n          toBlock?: 'latest' | number;\n          topics?: string[];\n        },\n        callback?: (error: Error, event: EventData) => void\n      ): EventResponse;\n      Event2(\n        parameters: {\n          filter?: { _owner?: string | string[]; _spender?: string | string[] };\n          fromBlock?: number;\n          toBlock?: 'latest' | number;\n          topics?: string[];\n        },\n        callback?: (error: Error, event: EventData) => void\n      ): EventResponse;\n    }\n    export type AbiMethodNames =\n      | 'tupleInputOnly'\n      | 'tupleInputAndOutput'\n      | 'tupleNoInputNames'\n      | 'tupleWithParametersNames'\n      | 'byteArrayInputExample'\n      | 'int8ReturnExample'\n      | 'int256ReturnExample'\n      | 'easyExample'\n      | 'new'\n      | 'getCars';\n    export interface Event1EventEmittedResponse {\n      token:string;\n      exchange:string;\n      user:string;\n      _value:string;\n    }\n    export interface Event2EventEmittedResponse {\n     _owner:string;\n     _spender:string;\n     _value:string\n    }\n    export interface TupleInputOnlyRequest {\n      address: string;\n      timestamps: [string | number, string | number, string | number];\n    }\n    export interface TupleInputAndOutputResponse {\n      affiliate: string;\n      offerID: string;\n      creationTime: string;\n      timestamp: string;\n      timestamps: [string, string, string, string, string, string];\n    }\n    export interface TupleNoInputNamesResponse {\n      affiliate: string;\n      offerID: string;\n      creationTime: string;\n      timestamp: string;\n      timestamps: [string, string, string, string, string, string];\n    }\n    export interface TupleWithParametersNamesResponse {\n      affiliate: string;\n      offerID: string;\n      creationTime: string;\n      timestamp: string;\n      timestamps: [string, string, string, string, string, string];\n    }\n\n    export interface OwnedCarsResponse {\n      tokenId:string;\n      attachedComponents:[string,string,string,string];\n      detachedComponents:[string,string,string,string,string,string,string,string,string,string,string];\n      owner:string;\n      detachedComponentsCount:string;\n    }\n    \n    export interface Abi {\n      /**\n       * Payable: false\n       * Constant: false\n       * StateMutability: nonpayable\n       * Type: function\n       * @param o Type: tuple, Indexed: false\n       */\n      tupleInputOnly(o: TupleInputOnlyRequest): MethodReturnContext;\n      /**\n       * Payable: false\n       * Constant: true\n       * StateMutability: view\n       * Type: function\n       * @param exchangeAddress Type: address, Indexed: false\n       * @param internalAddress Type: address, Indexed: false\n       */\n      tupleInputAndOutput(\n        exchangeAddress: string,\n        internalAddress: string\n      ): MethodConstantReturnContext<TupleInputAndOutputResponse>;\n      /**\n       * Payable: false\n       * Constant: true\n       * StateMutability: view\n       * Type: function\n       * @param parameter0 Type: address, Indexed: false\n       * @param parameter1 Type: address, Indexed: false\n       */\n      tupleNoInputNames(\n        parameter0: string,\n        parameter1: string\n      ): MethodConstantReturnContext<TupleNoInputNamesResponse>;\n      /**\n       * Payable: false\n       * Constant: true\n       * StateMutability: view\n       * Type: function\n       * @param address1 Type: address, Indexed: false\n       * @param address2 Type: address, Indexed: false\n       */\n      tupleWithParametersNames(\n        address1: string,\n        address2: string\n      ): MethodConstantReturnContext<TupleWithParametersNamesResponse>;\n      /**\n       * Payable: true\n       * Constant: false\n       * StateMutability: payable\n       * Type: function\n       * @param inputData Type: bytes32[2], Indexed: false\n       */\n      byteArrayInputExample(\n        inputData: [string | number[], string | number[], string | number[]]\n      ): MethodPayableReturnContext;\n      /**\n       * Payable: false\n       * Constant: true\n       * StateMutability: undefined\n       * Type: function\n       */\n      int8ReturnExample(): MethodConstantReturnContext<string>;\n      /**\n       * Payable: false\n       * Constant: true\n       * StateMutability: undefined\n       * Type: function\n       */\n      int256ReturnExample(): MethodConstantReturnContext<string>;\n      /**\n       * Payable: false\n       * Constant: true\n       * StateMutability: undefined\n       * Type: function\n       * @param valid Type: boolean, Indexed: false\n       * @param exchangeAddress Type: address, Indexed: false\n       * @param timestamp Type: uint8, Indexed: false\n       */\n      easyExample(\n        valid: boolean,\n        exchangeAddress: string,\n        timestamp: string | number\n      ): MethodConstantReturnContext<string>;\n      /**\n       * Payable: false\n       * Constant: false\n       * StateMutability: undefined\n       * Type: constructor\n       * @param _name Type: bytes32, Indexed: false\n       * @param _symbol Type: bytes32, Indexed: false\n       * @param _decimals Type: uint256, Indexed: false\n       * @param _supply Type: uint256, Indexed: false\n       */\n      'new'(\n        _name: string | number[],\n        _symbol: string | number[],\n        _decimals: string,\n        _supply: string\n      ): MethodReturnContext;\n\n      /**\n       *Payable:false\n       *Constant:true\n       *StateMutability:view\n       *Type:function\n       *@param ownerType:address, Indexed:false \n       */\n       getCars(owner:string): MethodConstantReturnContext<OwnedCarsResponse[]>;\n      }\n    ")));
            expect(writeFileSyncSpy.calls.mostRecent().args[2]).toEqual({
                mode: 493,
            });
        });
        it('should call _web3Factory.buildWeb3Interfaces once', function () {
            var abiGenertorOptionsClone = helpers_1.default.deepClone(abiGenertorOptions);
            abiGenertorOptionsClone.callGenerate = false;
            var instance = callSuccessAbiGeneratorInstance(abiGenertorOptionsClone);
            var buildWeb3InterfacesSpy = spyOn(
            // @ts-ignore
            instance._web3Factory, 'buildWeb3Interfaces').and.callThrough();
            var buildEthersInterfacesSpy = spyOn(
            // @ts-ignore
            instance._ethersFactory, 'buildEthersInterfaces').and.callThrough();
            instance.generate();
            expect(buildWeb3InterfacesSpy).toHaveBeenCalledTimes(1);
            expect(buildWeb3InterfacesSpy).toHaveBeenCalledWith('Abi');
            expect(buildEthersInterfacesSpy).toHaveBeenCalledTimes(0);
        });
        it('should call _web3Factory.buildEventInterfaceProperties once', function () {
            var abiGenertorOptionsClone = helpers_1.default.deepClone(abiGenertorOptions);
            abiGenertorOptionsClone.callGenerate = false;
            var instance = callSuccessAbiGeneratorInstance(abiGenertorOptionsClone);
            var web3BuildEventInterfacePropertiesSpy = spyOn(
            // @ts-ignore
            instance._web3Factory, 'buildEventInterfaceProperties').and.callThrough();
            var ethersBuildEventInterfacePropertiesSpy = spyOn(
            // @ts-ignore
            instance._ethersFactory, 'buildEventInterfaceProperties').and.callThrough();
            instance.generate();
            expect(web3BuildEventInterfacePropertiesSpy).toHaveBeenCalledTimes(1);
            expect(web3BuildEventInterfacePropertiesSpy).toHaveBeenCalledWith([
                {
                    anonymous: false,
                    inputs: [
                        { indexed: true, name: 'token', type: 'address' },
                        { indexed: true, name: 'exchange', type: 'address' },
                        { indexed: false, name: 'user', type: 'address' },
                        { indexed: true, name: '_value', type: 'uint256' },
                    ],
                    name: 'Event1',
                    type: 'event',
                },
                {
                    anonymous: false,
                    inputs: [
                        { indexed: true, name: '_owner', type: 'address' },
                        { indexed: true, name: '_spender', type: 'address' },
                        { indexed: false, name: '_value', type: 'uint256' },
                    ],
                    name: 'Event2',
                    type: 'event',
                },
                {
                    constant: false,
                    inputs: [
                        {
                            components: [
                                { name: 'address', type: 'address' },
                                { name: 'timestamps', type: 'uint8[2]' },
                            ],
                            name: 'o',
                            type: 'tuple',
                        },
                    ],
                    name: 'tupleInputOnly',
                    outputs: [],
                    payable: false,
                    stateMutability: 'nonpayable',
                    type: 'function',
                },
                {
                    constant: true,
                    inputs: [
                        { name: 'exchangeAddress', type: 'address' },
                        { name: 'internalAddress', type: 'address' },
                    ],
                    name: 'tupleInputAndOutput',
                    outputs: [
                        { name: 'affiliate', type: 'address' },
                        { name: 'offerID', type: 'bytes32' },
                        { name: 'creationTime', type: 'uint256' },
                        { name: 'timestamp', type: 'uint8' },
                        { name: 'timestamps', type: 'uint8[5]' },
                    ],
                    payable: false,
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    constant: true,
                    inputs: [
                        { name: '', type: 'address' },
                        { name: '', type: 'address' },
                    ],
                    name: 'tupleNoInputNames',
                    outputs: [
                        { name: 'affiliate', type: 'address' },
                        { name: 'offerID', type: 'bytes32' },
                        { name: 'creationTime', type: 'uint256' },
                        { name: 'timestamp', type: 'uint8' },
                        { name: 'timestamps', type: 'uint8[5]' },
                    ],
                    payable: false,
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    constant: true,
                    inputs: [
                        { name: 'address1', type: 'address' },
                        { name: 'address2', type: 'address' },
                    ],
                    name: 'tupleWithParametersNames',
                    outputs: [
                        { name: 'affiliate', type: 'address' },
                        { name: 'offerID', type: 'bytes32' },
                        { name: 'creationTime', type: 'uint256' },
                        { name: 'timestamp', type: 'uint8' },
                        { name: 'timestamps', type: 'uint8[5]' },
                    ],
                    payable: false,
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    constant: false,
                    inputs: [{ name: 'inputData', type: 'bytes32[2]' }],
                    name: 'byteArrayInputExample',
                    outputs: [],
                    payable: true,
                    stateMutability: 'payable',
                    type: 'function',
                },
                {
                    constant: true,
                    gas: 783,
                    inputs: [],
                    name: 'int8ReturnExample',
                    outputs: [{ name: 'out', type: 'uint8' }],
                    payable: false,
                    type: 'function',
                },
                {
                    constant: true,
                    gas: 783,
                    inputs: [],
                    name: 'int256ReturnExample',
                    outputs: [{ name: 'out', type: 'uint256' }],
                    payable: false,
                    type: 'function',
                },
                {
                    constant: true,
                    gas: 783,
                    inputs: [
                        { name: 'valid', type: 'boolean' },
                        { name: 'exchangeAddress', type: 'address' },
                        { name: 'timestamp', type: 'uint8' },
                    ],
                    name: 'easyExample',
                    outputs: [{ name: 'out', type: 'uint256' }],
                    payable: false,
                    type: 'function',
                },
                {
                    name: '__init__',
                    outputs: [],
                    inputs: [
                        { type: 'bytes32', name: '_name' },
                        { type: 'bytes32', name: '_symbol' },
                        { type: 'uint256', name: '_decimals' },
                        { type: 'uint256', name: '_supply' },
                    ],
                    constant: false,
                    payable: false,
                    type: 'constructor',
                },
                {
                    inputs: [
                        {
                            internalType: 'address',
                            name: 'owner',
                            type: 'address',
                        },
                    ],
                    name: 'getCars',
                    outputs: [
                        {
                            components: [
                                {
                                    internalType: 'uint256',
                                    name: 'tokenId',
                                    type: 'uint256',
                                },
                                {
                                    internalType: 'uint256[3]',
                                    name: 'attachedComponents',
                                    type: 'uint256[3]',
                                },
                                {
                                    internalType: 'uint256[10]',
                                    name: 'detachedComponents',
                                    type: 'uint256[10]',
                                },
                                {
                                    internalType: 'address',
                                    name: 'owner',
                                    type: 'address',
                                },
                                {
                                    internalType: 'uint256',
                                    name: 'detachedComponentsCount',
                                    type: 'uint256',
                                },
                            ],
                            internalType: 'struct Car.CarInstance[]',
                            name: 'ownedCars',
                            type: 'tuple[]',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
            ]);
            expect(ethersBuildEventInterfacePropertiesSpy).toHaveBeenCalledTimes(0);
        });
        it('should call _web3Factory.buildMethodReturnContext 10 times', function () {
            var abiGenertorOptionsClone = helpers_1.default.deepClone(abiGenertorOptions);
            abiGenertorOptionsClone.callGenerate = false;
            var instance = callSuccessAbiGeneratorInstance(abiGenertorOptionsClone);
            var web3BuildMethodReturnContextSpy = spyOn(
            // @ts-ignore
            instance._web3Factory, 'buildMethodReturnContext').and.callThrough();
            var ethersBuildMethodReturnContextSpy = spyOn(
            // @ts-ignore
            instance._ethersFactory, 'buildMethodReturnContext').and.callThrough();
            instance.generate();
            expect(web3BuildMethodReturnContextSpy).toHaveBeenCalledTimes(10);
            expect(ethersBuildMethodReturnContextSpy).toHaveBeenCalledTimes(0);
        });
    });
    describe('Ethers v4 or below', function () {
        it('round trip', function () {
            var generatorContextClone = helpers_1.default.deepClone(generatorContext);
            generatorContextClone.provider = provider_1.Provider.ethers;
            callSuccessAbiGeneratorInstance(abiGenertorOptions, generatorContextClone);
            expect(writeFileSyncSpy.calls.mostRecent().args[0]).not.toBeUndefined();
            expect(helpers_1.default.removeAllWhiteSpace(writeFileSyncSpy.calls.mostRecent().args[1])).toEqual(helpers_1.default.removeAllWhiteSpace(prettierFormat("import { ContractTransaction } from 'ethers';\n            import { Arrayish, BigNumber, BigNumberish, Interface } from 'ethers/utils';\n            import { EthersContractContext } from 'ethereum-abi-types-generator';\n            export type ContractContext = EthersContractContext<\n              Abi,\n              AbiEventsContext,\n              AbiEvents\n            >;\n            export declare type EventFilter = {\n              address?: string;\n              topics?: Array<string>;\n              fromBlock?: string | number;\n              toBlock?: string | number;\n            };\n            export interface ContractTransactionOverrides {\n              /**\n               * The maximum units of gas for the transaction to use\n               */\n              gasLimit?: number;\n              /**\n               * The price (in wei) per unit of gas\n               */\n              gasPrice?: BigNumber | string | number | Promise<any>;\n              /**\n               * The nonce to use in the transaction\n               */\n              nonce?: number;\n              /**\n               * The amount to send with the transaction (i.e. msg.value)\n               */\n              value?: BigNumber | string | number | Promise<any>;\n              /**\n               * The chain ID (or network ID) to use\n               */\n              chainId?: number;\n            }\n            export interface ContractCallOverrides {\n              /**\n               * The address to execute the call as\n               */\n              from?: string;\n              /**\n               * The maximum units of gas for the transaction to use\n               */\n              gasLimit?: number;\n            }\n            export type AbiEvents = 'Event1' | 'Event2';\n            export interface AbiEventsContext {\n              Event1(...parameters: any): EventFilter;\n              Event2(...parameters: any): EventFilter;\n            }\n            export type AbiMethodNames =\n              | 'tupleInputOnly'\n              | 'tupleInputAndOutput'\n              | 'tupleNoInputNames'\n              | 'tupleWithParametersNames'\n              | 'byteArrayInputExample'\n              | 'int8ReturnExample'\n              | 'int256ReturnExample'\n              | 'easyExample'\n              | 'new'\n              | 'getCars';\n            export interface Event1EventEmittedResponse {\n                token:string;\n                exchange:string;\n                user:string;\n                _value:BigNumberish;\n            }\n            export interface Event2EventEmittedResponse {\n              _owner:string;\n              _spender:string;\n              _value:BigNumberish;\n            }\n            export interface TupleInputOnlyRequest {\n              address: string;\n              timestamps: [BigNumberish, BigNumberish, BigNumberish];\n            }\n            export interface TupleInputAndOutputResponse {\n              affiliate: string;\n              0: string;\n              offerID: string;\n              1: string;\n              creationTime: BigNumber;\n              2: BigNumber;\n              timestamp: number;\n              3: number;\n              timestamps: [number, number, number, number, number, number];\n              4: [number, number, number, number, number, number];\n              length: 5;\n            }\n            export interface TupleNoInputNamesResponse {\n              affiliate: string;\n              0: string;\n              offerID: string;\n              1: string;\n              creationTime: BigNumber;\n              2: BigNumber;\n              timestamp: number;\n              3: number;\n              timestamps: [number, number, number, number, number, number];\n              4: [number, number, number, number, number, number];\n              length: 5;\n            }\n            export interface TupleWithParametersNamesResponse {\n              affiliate: string;\n              0: string;\n              offerID: string;\n              1: string;\n              creationTime: BigNumber;\n              2: BigNumber;\n              timestamp: number;\n              3: number;\n              timestamps: [number, number, number, number, number, number];\n              4: [number, number, number, number, number, number];\n              length: 5;\n            }\n\n            export interface OwnedCarsResponse { \n              tokenId:BigNumber;\n              0:BigNumber;\n              attachedComponents:[BigNumber,BigNumber,BigNumber,BigNumber];\n              1:[BigNumber,BigNumber,BigNumber,BigNumber];\n              detachedComponents:[BigNumber,BigNumber,BigNumber,BigNumber,BigNumber,BigNumber,BigNumber,BigNumber,BigNumber,BigNumber,BigNumber];\n              2:[BigNumber,BigNumber,BigNumber,BigNumber,BigNumber,BigNumber,BigNumber,BigNumber,BigNumber,BigNumber,BigNumber];\n              owner:string;\n              3:string;\n              detachedComponentsCount:BigNumber;\n              4:BigNumber;\n            }\n\n            export interface Abi {\n              /**\n               * Payable: false\n               * Constant: false\n               * StateMutability: nonpayable\n               * Type: function\n               * @param o Type: tuple, Indexed: false\n               */\n              tupleInputOnly(\n                o: TupleInputOnlyRequest,\n                overrides?: ContractTransactionOverrides\n              ): Promise<ContractTransaction>;\n              /**\n               * Payable: false\n               * Constant: true\n               * StateMutability: view\n               * Type: function\n               * @param exchangeAddress Type: address, Indexed: false\n               * @param internalAddress Type: address, Indexed: false\n               */\n              tupleInputAndOutput(\n                exchangeAddress: string,\n                internalAddress: string,\n                overrides?: ContractCallOverrides\n              ): Promise<TupleInputAndOutputResponse>;\n              /**\n               * Payable: false\n               * Constant: true\n               * StateMutability: view\n               * Type: function\n               * @param parameter0 Type: address, Indexed: false\n               * @param parameter1 Type: address, Indexed: false\n               */\n              tupleNoInputNames(\n                parameter0: string,\n                parameter1: string,\n                overrides?: ContractCallOverrides\n              ): Promise<TupleNoInputNamesResponse>;\n              /**\n               * Payable: false\n               * Constant: true\n               * StateMutability: view\n               * Type: function\n               * @param address1 Type: address, Indexed: false\n               * @param address2 Type: address, Indexed: false\n               */\n              tupleWithParametersNames(\n                address1: string,\n                address2: string,\n                overrides?: ContractCallOverrides\n              ): Promise<TupleWithParametersNamesResponse>;\n              /**\n               * Payable: true\n               * Constant: false\n               * StateMutability: payable\n               * Type: function\n               * @param inputData Type: bytes32[2], Indexed: false\n               */\n              byteArrayInputExample(\n                inputData: [Arrayish, Arrayish, Arrayish],\n                overrides?: ContractTransactionOverrides\n              ): Promise<ContractTransaction>;\n              /**\n               * Payable: false\n               * Constant: true\n               * StateMutability: undefined\n               * Type: function\n               */\n              int8ReturnExample(overrides?: ContractCallOverrides): Promise<number>;\n              /**\n               * Payable: false\n               * Constant: true\n               * StateMutability: undefined\n               * Type: function\n               */\n              int256ReturnExample(overrides?: ContractCallOverrides): Promise<BigNumber>;\n              /**\n               * Payable: false\n               * Constant: true\n               * StateMutability: undefined\n               * Type: function\n               * @param valid Type: boolean, Indexed: false\n               * @param exchangeAddress Type: address, Indexed: false\n               * @param timestamp Type: uint8, Indexed: false\n               */\n              easyExample(\n                valid: boolean,\n                exchangeAddress: string,\n                timestamp: BigNumberish,\n                overrides?: ContractCallOverrides\n              ): Promise<BigNumber>;\n              /**\n               * Payable: false\n               * Constant: false\n               * StateMutability: undefined\n               * Type: constructor\n               * @param _name Type: bytes32, Indexed: false\n               * @param _symbol Type: bytes32, Indexed: false\n               * @param _decimals Type: uint256, Indexed: false\n               * @param _supply Type: uint256, Indexed: false\n               */\n              'new'(\n                _name: Arrayish,\n                _symbol: Arrayish,\n                _decimals: BigNumberish,\n                _supply: BigNumberish,\n                overrides?: ContractTransactionOverrides\n              ): Promise<ContractTransaction>;\n\n              /**\n               *Payable:false\n               *Constant:true\n               *StateMutability:view\n               *Type:function\n               * @param ownerType:address,Indexed:false\n               */\n               getCars(owner:string, overrides?:ContractCallOverrides):Promise<OwnedCarsResponse[]>;\n            }\n    ")));
            expect(writeFileSyncSpy.calls.mostRecent().args[2]).toEqual({
                mode: 493,
            });
        });
        it('should call _ethersFactory.buildEthersInterfaces once', function () {
            var abiGenertorOptionsClone = helpers_1.default.deepClone(abiGenertorOptions);
            abiGenertorOptionsClone.callGenerate = false;
            var generatorContextClone = helpers_1.default.deepClone(generatorContext);
            generatorContextClone.provider = provider_1.Provider.ethers;
            var instance = callSuccessAbiGeneratorInstance(abiGenertorOptionsClone, generatorContextClone);
            var buildEthersInterfacesSpy = spyOn(
            // @ts-ignore
            instance._ethersFactory, 'buildEthersInterfaces').and.callThrough();
            var buildWeb3InterfacesSpy = spyOn(
            // @ts-ignore
            instance._web3Factory, 'buildWeb3Interfaces').and.callThrough();
            instance.generate();
            expect(buildEthersInterfacesSpy).toHaveBeenCalledTimes(1);
            expect(buildEthersInterfacesSpy).toHaveBeenCalledWith('Abi', ethers_version_1.EthersVersion.four_or_below);
            expect(buildWeb3InterfacesSpy).toHaveBeenCalledTimes(0);
        });
        it('should call _ethersFactory.buildEventInterfaceProperties once', function () {
            var abiGenertorOptionsClone = helpers_1.default.deepClone(abiGenertorOptions);
            abiGenertorOptionsClone.callGenerate = false;
            var generatorContextClone = helpers_1.default.deepClone(generatorContext);
            generatorContextClone.provider = provider_1.Provider.ethers;
            var instance = callSuccessAbiGeneratorInstance(abiGenertorOptionsClone, generatorContextClone);
            var ethersBuildEventInterfacePropertiesSpy = spyOn(
            // @ts-ignore
            instance._ethersFactory, 'buildEventInterfaceProperties').and.callThrough();
            var web3BuildEventInterfacePropertiesSpy = spyOn(
            // @ts-ignore
            instance._web3Factory, 'buildEventInterfaceProperties').and.callThrough();
            instance.generate();
            expect(ethersBuildEventInterfacePropertiesSpy).toHaveBeenCalledTimes(1);
            expect(ethersBuildEventInterfacePropertiesSpy).toHaveBeenCalledWith([
                {
                    anonymous: false,
                    inputs: [
                        { indexed: true, name: 'token', type: 'address' },
                        { indexed: true, name: 'exchange', type: 'address' },
                        { indexed: false, name: 'user', type: 'address' },
                        { indexed: true, name: '_value', type: 'uint256' },
                    ],
                    name: 'Event1',
                    type: 'event',
                },
                {
                    anonymous: false,
                    inputs: [
                        { indexed: true, name: '_owner', type: 'address' },
                        { indexed: true, name: '_spender', type: 'address' },
                        { indexed: false, name: '_value', type: 'uint256' },
                    ],
                    name: 'Event2',
                    type: 'event',
                },
                {
                    constant: false,
                    inputs: [
                        {
                            components: [
                                { name: 'address', type: 'address' },
                                { name: 'timestamps', type: 'uint8[2]' },
                            ],
                            name: 'o',
                            type: 'tuple',
                        },
                    ],
                    name: 'tupleInputOnly',
                    outputs: [],
                    payable: false,
                    stateMutability: 'nonpayable',
                    type: 'function',
                },
                {
                    constant: true,
                    inputs: [
                        { name: 'exchangeAddress', type: 'address' },
                        { name: 'internalAddress', type: 'address' },
                    ],
                    name: 'tupleInputAndOutput',
                    outputs: [
                        { name: 'affiliate', type: 'address' },
                        { name: 'offerID', type: 'bytes32' },
                        { name: 'creationTime', type: 'uint256' },
                        { name: 'timestamp', type: 'uint8' },
                        { name: 'timestamps', type: 'uint8[5]' },
                    ],
                    payable: false,
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    constant: true,
                    inputs: [
                        { name: '', type: 'address' },
                        { name: '', type: 'address' },
                    ],
                    name: 'tupleNoInputNames',
                    outputs: [
                        { name: 'affiliate', type: 'address' },
                        { name: 'offerID', type: 'bytes32' },
                        { name: 'creationTime', type: 'uint256' },
                        { name: 'timestamp', type: 'uint8' },
                        { name: 'timestamps', type: 'uint8[5]' },
                    ],
                    payable: false,
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    constant: true,
                    inputs: [
                        { name: 'address1', type: 'address' },
                        { name: 'address2', type: 'address' },
                    ],
                    name: 'tupleWithParametersNames',
                    outputs: [
                        { name: 'affiliate', type: 'address' },
                        { name: 'offerID', type: 'bytes32' },
                        { name: 'creationTime', type: 'uint256' },
                        { name: 'timestamp', type: 'uint8' },
                        { name: 'timestamps', type: 'uint8[5]' },
                    ],
                    payable: false,
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    constant: false,
                    inputs: [{ name: 'inputData', type: 'bytes32[2]' }],
                    name: 'byteArrayInputExample',
                    outputs: [],
                    payable: true,
                    stateMutability: 'payable',
                    type: 'function',
                },
                {
                    constant: true,
                    gas: 783,
                    inputs: [],
                    name: 'int8ReturnExample',
                    outputs: [{ name: 'out', type: 'uint8' }],
                    payable: false,
                    type: 'function',
                },
                {
                    constant: true,
                    gas: 783,
                    inputs: [],
                    name: 'int256ReturnExample',
                    outputs: [{ name: 'out', type: 'uint256' }],
                    payable: false,
                    type: 'function',
                },
                {
                    constant: true,
                    gas: 783,
                    inputs: [
                        { name: 'valid', type: 'boolean' },
                        { name: 'exchangeAddress', type: 'address' },
                        { name: 'timestamp', type: 'uint8' },
                    ],
                    name: 'easyExample',
                    outputs: [{ name: 'out', type: 'uint256' }],
                    payable: false,
                    type: 'function',
                },
                {
                    name: '__init__',
                    outputs: [],
                    inputs: [
                        { type: 'bytes32', name: '_name' },
                        { type: 'bytes32', name: '_symbol' },
                        { type: 'uint256', name: '_decimals' },
                        { type: 'uint256', name: '_supply' },
                    ],
                    constant: false,
                    payable: false,
                    type: 'constructor',
                },
                {
                    inputs: [
                        {
                            internalType: 'address',
                            name: 'owner',
                            type: 'address',
                        },
                    ],
                    name: 'getCars',
                    outputs: [
                        {
                            components: [
                                {
                                    internalType: 'uint256',
                                    name: 'tokenId',
                                    type: 'uint256',
                                },
                                {
                                    internalType: 'uint256[3]',
                                    name: 'attachedComponents',
                                    type: 'uint256[3]',
                                },
                                {
                                    internalType: 'uint256[10]',
                                    name: 'detachedComponents',
                                    type: 'uint256[10]',
                                },
                                {
                                    internalType: 'address',
                                    name: 'owner',
                                    type: 'address',
                                },
                                {
                                    internalType: 'uint256',
                                    name: 'detachedComponentsCount',
                                    type: 'uint256',
                                },
                            ],
                            internalType: 'struct Car.CarInstance[]',
                            name: 'ownedCars',
                            type: 'tuple[]',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
            ]);
            expect(web3BuildEventInterfacePropertiesSpy).toHaveBeenCalledTimes(0);
        });
        it('should call _ethersFactory.buildMethodReturnContext 10 times', function () {
            var abiGenertorOptionsClone = helpers_1.default.deepClone(abiGenertorOptions);
            abiGenertorOptionsClone.callGenerate = false;
            var generatorContextClone = helpers_1.default.deepClone(generatorContext);
            generatorContextClone.provider = provider_1.Provider.ethers;
            var instance = callSuccessAbiGeneratorInstance(abiGenertorOptionsClone, generatorContextClone);
            var ethersBuildMethodReturnContextSpy = spyOn(
            // @ts-ignore
            instance._ethersFactory, 'buildMethodReturnContext').and.callThrough();
            var web3BuildMethodReturnContextSpy = spyOn(
            // @ts-ignore
            instance._web3Factory, 'buildMethodReturnContext').and.callThrough();
            instance.generate();
            expect(ethersBuildMethodReturnContextSpy).toHaveBeenCalledTimes(10);
            expect(web3BuildMethodReturnContextSpy).toHaveBeenCalledTimes(0);
        });
    });
    describe('Ethers v5', function () {
        it('round trip', function () {
            var generatorContextClone = helpers_1.default.deepClone(generatorContext);
            generatorContextClone.provider = provider_1.Provider.ethers_v5;
            callSuccessAbiGeneratorInstance(abiGenertorOptions, generatorContextClone);
            expect(writeFileSyncSpy.calls.mostRecent().args[0]).not.toBeUndefined();
            expect(helpers_1.default.removeAllWhiteSpace(writeFileSyncSpy.calls.mostRecent().args[1])).toEqual(helpers_1.default.removeAllWhiteSpace(prettierFormat("import { ContractTransaction,\n                    ContractInterface,\n                    BytesLike as Arrayish,\n                    BigNumber,\n                    BigNumberish } from \"ethers\"\n            import { EthersContractContextV5 } from \"ethereum-abi-types-generator\";\n            export type ContractContext = EthersContractContextV5<\n              Abi,\n              AbiMethodNames,\n              AbiEventsContext,\n              AbiEvents\n            >;\n            export declare type EventFilter = {\n              address?: string;\n              topics?: Array<string>;\n              fromBlock?: string | number;\n              toBlock?: string | number;\n            };\n            export interface ContractTransactionOverrides {\n              /**\n               * The maximum units of gas for the transaction to use\n               */\n              gasLimit?: number;\n              /**\n               * The price (in wei) per unit of gas\n               */\n              gasPrice?: BigNumber | string | number | Promise<any>;\n              /**\n               * The nonce to use in the transaction\n               */\n              nonce?: number;\n              /**\n               * The amount to send with the transaction (i.e. msg.value)\n               */\n              value?: BigNumber | string | number | Promise<any>;\n              /**\n               * The chain ID (or network ID) to use\n               */\n              chainId?: number;\n            }\n            export interface ContractCallOverrides {\n              /**\n               * The address to execute the call as\n               */\n              from?: string;\n              /**\n               * The maximum units of gas for the transaction to use\n               */\n              gasLimit?: number;\n            }\n            export type AbiEvents = 'Event1' | 'Event2';\n            export interface AbiEventsContext {\n              Event1(...parameters: any): EventFilter;\n              Event2(...parameters: any): EventFilter;\n            }\n            export type AbiMethodNames =\n              | 'tupleInputOnly'\n              | 'tupleInputAndOutput'\n              | 'tupleNoInputNames'\n              | 'tupleWithParametersNames'\n              | 'byteArrayInputExample'\n              | 'int8ReturnExample'\n              | 'int256ReturnExample'\n              | 'easyExample'\n              | 'new'\n              | 'getCars';\n            export interface Event1EventEmittedResponse {\n                token:string;\n                exchange:string;\n                user:string;\n                _value:BigNumberish;\n            }\n            export interface Event2EventEmittedResponse {\n              _owner:string;\n              _spender:string;\n              _value:BigNumberish;\n            }\n            export interface TupleInputOnlyRequest {\n              address: string;\n              timestamps: [BigNumberish, BigNumberish, BigNumberish];\n            }\n            export interface TupleInputAndOutputResponse {\n              affiliate: string;\n              0: string;\n              offerID: string;\n              1: string;\n              creationTime: BigNumber;\n              2: BigNumber;\n              timestamp: number;\n              3: number;\n              timestamps: [number, number, number, number, number, number];\n              4: [number, number, number, number, number, number];\n              length: 5;\n            }\n            export interface TupleNoInputNamesResponse {\n              affiliate: string;\n              0: string;\n              offerID: string;\n              1: string;\n              creationTime: BigNumber;\n              2: BigNumber;\n              timestamp: number;\n              3: number;\n              timestamps: [number, number, number, number, number, number];\n              4: [number, number, number, number, number, number];\n              length: 5;\n            }\n            export interface TupleWithParametersNamesResponse {\n              affiliate: string;\n              0: string;\n              offerID: string;\n              1: string;\n              creationTime: BigNumber;\n              2: BigNumber;\n              timestamp: number;\n              3: number;\n              timestamps: [number, number, number, number, number, number];\n              4: [number, number, number, number, number, number];\n              length: 5;\n            }\n\n             export interface OwnedCarsResponse { \n              tokenId:BigNumber;\n              0:BigNumber;\n              attachedComponents:[BigNumber,BigNumber,BigNumber,BigNumber];\n              1:[BigNumber,BigNumber,BigNumber,BigNumber];\n              detachedComponents:[BigNumber,BigNumber,BigNumber,BigNumber,BigNumber,BigNumber,BigNumber,BigNumber,BigNumber,BigNumber,BigNumber];\n              2:[BigNumber,BigNumber,BigNumber,BigNumber,BigNumber,BigNumber,BigNumber,BigNumber,BigNumber,BigNumber,BigNumber];\n              owner:string;\n              3:string;\n              detachedComponentsCount:BigNumber;\n              4:BigNumber;\n            }\n            \n            export interface Abi {\n              /**\n               * Payable: false\n               * Constant: false\n               * StateMutability: nonpayable\n               * Type: function\n               * @param o Type: tuple, Indexed: false\n               */\n              tupleInputOnly(\n                o: TupleInputOnlyRequest,\n                overrides?: ContractTransactionOverrides\n              ): Promise<ContractTransaction>;\n              /**\n               * Payable: false\n               * Constant: true\n               * StateMutability: view\n               * Type: function\n               * @param exchangeAddress Type: address, Indexed: false\n               * @param internalAddress Type: address, Indexed: false\n               */\n              tupleInputAndOutput(\n                exchangeAddress: string,\n                internalAddress: string,\n                overrides?: ContractCallOverrides\n              ): Promise<TupleInputAndOutputResponse>;\n              /**\n               * Payable: false\n               * Constant: true\n               * StateMutability: view\n               * Type: function\n               * @param parameter0 Type: address, Indexed: false\n               * @param parameter1 Type: address, Indexed: false\n               */\n              tupleNoInputNames(\n                parameter0: string,\n                parameter1: string,\n                overrides?: ContractCallOverrides\n              ): Promise<TupleNoInputNamesResponse>;\n              /**\n               * Payable: false\n               * Constant: true\n               * StateMutability: view\n               * Type: function\n               * @param address1 Type: address, Indexed: false\n               * @param address2 Type: address, Indexed: false\n               */\n              tupleWithParametersNames(\n                address1: string,\n                address2: string,\n                overrides?: ContractCallOverrides\n              ): Promise<TupleWithParametersNamesResponse>;\n              /**\n               * Payable: true\n               * Constant: false\n               * StateMutability: payable\n               * Type: function\n               * @param inputData Type: bytes32[2], Indexed: false\n               */\n              byteArrayInputExample(\n                inputData: [Arrayish, Arrayish, Arrayish],\n                overrides?: ContractTransactionOverrides\n              ): Promise<ContractTransaction>;\n              /**\n               * Payable: false\n               * Constant: true\n               * StateMutability: undefined\n               * Type: function\n               */\n              int8ReturnExample(overrides?: ContractCallOverrides): Promise<number>;\n              /**\n               * Payable: false\n               * Constant: true\n               * StateMutability: undefined\n               * Type: function\n               */\n              int256ReturnExample(overrides?: ContractCallOverrides): Promise<BigNumber>;\n              /**\n               * Payable: false\n               * Constant: true\n               * StateMutability: undefined\n               * Type: function\n               * @param valid Type: boolean, Indexed: false\n               * @param exchangeAddress Type: address, Indexed: false\n               * @param timestamp Type: uint8, Indexed: false\n               */\n              easyExample(\n                valid: boolean,\n                exchangeAddress: string,\n                timestamp: BigNumberish,\n                overrides?: ContractCallOverrides\n              ): Promise<BigNumber>;\n              /**\n               * Payable: false\n               * Constant: false\n               * StateMutability: undefined\n               * Type: constructor\n               * @param _name Type: bytes32, Indexed: false\n               * @param _symbol Type: bytes32, Indexed: false\n               * @param _decimals Type: uint256, Indexed: false\n               * @param _supply Type: uint256, Indexed: false\n               */\n              'new'(\n                _name: Arrayish,\n                _symbol: Arrayish,\n                _decimals: BigNumberish,\n                _supply: BigNumberish,\n                overrides?: ContractTransactionOverrides\n              ): Promise<ContractTransaction>;\n\n              /**\n               *Payable:false\n               *Constant:true\n               *StateMutability:view\n               *Type:function\n               * @param ownerType:address,Indexed:false\n               */\n               getCars(owner:string, overrides?:ContractCallOverrides):Promise<OwnedCarsResponse[]>;\n            }\n    ")));
            expect(writeFileSyncSpy.calls.mostRecent().args[2]).toEqual({
                mode: 493,
            });
        });
        it('should call _ethersFactory.buildEthersInterfaces once', function () {
            var abiGenertorOptionsClone = helpers_1.default.deepClone(abiGenertorOptions);
            abiGenertorOptionsClone.callGenerate = false;
            var generatorContextClone = helpers_1.default.deepClone(generatorContext);
            generatorContextClone.provider = provider_1.Provider.ethers_v5;
            var instance = callSuccessAbiGeneratorInstance(abiGenertorOptionsClone, generatorContextClone);
            var buildEthersInterfacesSpy = spyOn(
            // @ts-ignore
            instance._ethersFactory, 'buildEthersInterfaces').and.callThrough();
            var buildWeb3InterfacesSpy = spyOn(
            // @ts-ignore
            instance._web3Factory, 'buildWeb3Interfaces').and.callThrough();
            instance.generate();
            expect(buildEthersInterfacesSpy).toHaveBeenCalledTimes(1);
            expect(buildEthersInterfacesSpy).toHaveBeenCalledWith('Abi', ethers_version_1.EthersVersion.five);
            expect(buildWeb3InterfacesSpy).toHaveBeenCalledTimes(0);
        });
        it('should call _ethersFactory.buildEventInterfaceProperties once', function () {
            var abiGenertorOptionsClone = helpers_1.default.deepClone(abiGenertorOptions);
            abiGenertorOptionsClone.callGenerate = false;
            var generatorContextClone = helpers_1.default.deepClone(generatorContext);
            generatorContextClone.provider = provider_1.Provider.ethers_v5;
            var instance = callSuccessAbiGeneratorInstance(abiGenertorOptionsClone, generatorContextClone);
            var ethersBuildEventInterfacePropertiesSpy = spyOn(
            // @ts-ignore
            instance._ethersFactory, 'buildEventInterfaceProperties').and.callThrough();
            var web3BuildEventInterfacePropertiesSpy = spyOn(
            // @ts-ignore
            instance._web3Factory, 'buildEventInterfaceProperties').and.callThrough();
            instance.generate();
            expect(ethersBuildEventInterfacePropertiesSpy).toHaveBeenCalledTimes(1);
            expect(ethersBuildEventInterfacePropertiesSpy).toHaveBeenCalledWith([
                {
                    anonymous: false,
                    inputs: [
                        { indexed: true, name: 'token', type: 'address' },
                        { indexed: true, name: 'exchange', type: 'address' },
                        { indexed: false, name: 'user', type: 'address' },
                        { indexed: true, name: '_value', type: 'uint256' },
                    ],
                    name: 'Event1',
                    type: 'event',
                },
                {
                    anonymous: false,
                    inputs: [
                        { indexed: true, name: '_owner', type: 'address' },
                        { indexed: true, name: '_spender', type: 'address' },
                        { indexed: false, name: '_value', type: 'uint256' },
                    ],
                    name: 'Event2',
                    type: 'event',
                },
                {
                    constant: false,
                    inputs: [
                        {
                            components: [
                                { name: 'address', type: 'address' },
                                { name: 'timestamps', type: 'uint8[2]' },
                            ],
                            name: 'o',
                            type: 'tuple',
                        },
                    ],
                    name: 'tupleInputOnly',
                    outputs: [],
                    payable: false,
                    stateMutability: 'nonpayable',
                    type: 'function',
                },
                {
                    constant: true,
                    inputs: [
                        { name: 'exchangeAddress', type: 'address' },
                        { name: 'internalAddress', type: 'address' },
                    ],
                    name: 'tupleInputAndOutput',
                    outputs: [
                        { name: 'affiliate', type: 'address' },
                        { name: 'offerID', type: 'bytes32' },
                        { name: 'creationTime', type: 'uint256' },
                        { name: 'timestamp', type: 'uint8' },
                        { name: 'timestamps', type: 'uint8[5]' },
                    ],
                    payable: false,
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    constant: true,
                    inputs: [
                        { name: '', type: 'address' },
                        { name: '', type: 'address' },
                    ],
                    name: 'tupleNoInputNames',
                    outputs: [
                        { name: 'affiliate', type: 'address' },
                        { name: 'offerID', type: 'bytes32' },
                        { name: 'creationTime', type: 'uint256' },
                        { name: 'timestamp', type: 'uint8' },
                        { name: 'timestamps', type: 'uint8[5]' },
                    ],
                    payable: false,
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    constant: true,
                    inputs: [
                        { name: 'address1', type: 'address' },
                        { name: 'address2', type: 'address' },
                    ],
                    name: 'tupleWithParametersNames',
                    outputs: [
                        { name: 'affiliate', type: 'address' },
                        { name: 'offerID', type: 'bytes32' },
                        { name: 'creationTime', type: 'uint256' },
                        { name: 'timestamp', type: 'uint8' },
                        { name: 'timestamps', type: 'uint8[5]' },
                    ],
                    payable: false,
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    constant: false,
                    inputs: [{ name: 'inputData', type: 'bytes32[2]' }],
                    name: 'byteArrayInputExample',
                    outputs: [],
                    payable: true,
                    stateMutability: 'payable',
                    type: 'function',
                },
                {
                    constant: true,
                    gas: 783,
                    inputs: [],
                    name: 'int8ReturnExample',
                    outputs: [{ name: 'out', type: 'uint8' }],
                    payable: false,
                    type: 'function',
                },
                {
                    constant: true,
                    gas: 783,
                    inputs: [],
                    name: 'int256ReturnExample',
                    outputs: [{ name: 'out', type: 'uint256' }],
                    payable: false,
                    type: 'function',
                },
                {
                    constant: true,
                    gas: 783,
                    inputs: [
                        { name: 'valid', type: 'boolean' },
                        { name: 'exchangeAddress', type: 'address' },
                        { name: 'timestamp', type: 'uint8' },
                    ],
                    name: 'easyExample',
                    outputs: [{ name: 'out', type: 'uint256' }],
                    payable: false,
                    type: 'function',
                },
                {
                    name: '__init__',
                    outputs: [],
                    inputs: [
                        { type: 'bytes32', name: '_name' },
                        { type: 'bytes32', name: '_symbol' },
                        { type: 'uint256', name: '_decimals' },
                        { type: 'uint256', name: '_supply' },
                    ],
                    constant: false,
                    payable: false,
                    type: 'constructor',
                },
                {
                    inputs: [
                        {
                            internalType: 'address',
                            name: 'owner',
                            type: 'address',
                        },
                    ],
                    name: 'getCars',
                    outputs: [
                        {
                            components: [
                                {
                                    internalType: 'uint256',
                                    name: 'tokenId',
                                    type: 'uint256',
                                },
                                {
                                    internalType: 'uint256[3]',
                                    name: 'attachedComponents',
                                    type: 'uint256[3]',
                                },
                                {
                                    internalType: 'uint256[10]',
                                    name: 'detachedComponents',
                                    type: 'uint256[10]',
                                },
                                {
                                    internalType: 'address',
                                    name: 'owner',
                                    type: 'address',
                                },
                                {
                                    internalType: 'uint256',
                                    name: 'detachedComponentsCount',
                                    type: 'uint256',
                                },
                            ],
                            internalType: 'struct Car.CarInstance[]',
                            name: 'ownedCars',
                            type: 'tuple[]',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
            ]);
            expect(web3BuildEventInterfacePropertiesSpy).toHaveBeenCalledTimes(0);
        });
        it('should call _ethersFactory.buildMethodReturnContext 10 times', function () {
            var abiGenertorOptionsClone = helpers_1.default.deepClone(abiGenertorOptions);
            abiGenertorOptionsClone.callGenerate = false;
            var generatorContextClone = helpers_1.default.deepClone(generatorContext);
            generatorContextClone.provider = provider_1.Provider.ethers_v5;
            var instance = callSuccessAbiGeneratorInstance(abiGenertorOptionsClone, generatorContextClone);
            var ethersBuildMethodReturnContextSpy = spyOn(
            // @ts-ignore
            instance._ethersFactory, 'buildMethodReturnContext').and.callThrough();
            var web3BuildMethodReturnContextSpy = spyOn(
            // @ts-ignore
            instance._web3Factory, 'buildMethodReturnContext').and.callThrough();
            instance.generate();
            expect(ethersBuildMethodReturnContextSpy).toHaveBeenCalledTimes(10);
            expect(web3BuildMethodReturnContextSpy).toHaveBeenCalledTimes(0);
        });
    });
});
//# sourceMappingURL=abi-generator.spec.js.map