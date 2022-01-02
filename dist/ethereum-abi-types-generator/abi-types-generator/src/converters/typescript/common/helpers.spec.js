"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var provider_1 = require("../enums/provider");
var helpers_1 = __importDefault(require("./helpers"));
describe('TypeScriptHelpers', function () {
    describe('getSolidityInputTsType', function () {
        describe('ethers', function () {
            describe('address', function () {
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('address', provider_1.Provider.ethers)).toEqual('string');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('address[4]', provider_1.Provider.ethers)).toEqual('[string,string,string,string,string]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('address[4][]', provider_1.Provider.ethers)).toEqual('[string,string,string,string,string][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('address[][][]', provider_1.Provider.ethers)).toEqual('string[][][]');
                });
            });
            describe('uint', function () {
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('uint', provider_1.Provider.ethers)).toEqual('BigNumberish');
                });
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('uint32', provider_1.Provider.ethers)).toEqual('BigNumberish');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('uint[4]', provider_1.Provider.ethers)).toEqual('[BigNumberish,BigNumberish,BigNumberish,BigNumberish,BigNumberish]');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('uint32[4]', provider_1.Provider.ethers)).toEqual('[BigNumberish,BigNumberish,BigNumberish,BigNumberish,BigNumberish]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('uint[4][]', provider_1.Provider.ethers)).toEqual('[BigNumberish,BigNumberish,BigNumberish,BigNumberish,BigNumberish][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('uint32[4][]', provider_1.Provider.ethers)).toEqual('[BigNumberish,BigNumberish,BigNumberish,BigNumberish,BigNumberish][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('uint[][][]', provider_1.Provider.ethers)).toEqual('BigNumberish[][][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('uint32[][][]', provider_1.Provider.ethers)).toEqual('BigNumberish[][][]');
                });
            });
            describe('bytes', function () {
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('bytes', provider_1.Provider.ethers)).toEqual('Arrayish');
                });
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('bytes32', provider_1.Provider.ethers)).toEqual('Arrayish');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('bytes[4]', provider_1.Provider.ethers)).toEqual('[Arrayish,Arrayish,Arrayish,Arrayish,Arrayish]');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('bytes32[4]', provider_1.Provider.ethers)).toEqual('[Arrayish,Arrayish,Arrayish,Arrayish,Arrayish]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('bytes[4][]', provider_1.Provider.ethers)).toEqual('[Arrayish,Arrayish,Arrayish,Arrayish,Arrayish][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('bytes32[4][]', provider_1.Provider.ethers)).toEqual('[Arrayish,Arrayish,Arrayish,Arrayish,Arrayish][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('bytes[][][]', provider_1.Provider.ethers)).toEqual('Arrayish[][][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('bytes32[][][]', provider_1.Provider.ethers)).toEqual('Arrayish[][][]');
                });
            });
            describe('string', function () {
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('string', provider_1.Provider.ethers)).toEqual('string');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('string[4]', provider_1.Provider.ethers)).toEqual('[string,string,string,string,string]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('string[4][]', provider_1.Provider.ethers)).toEqual('[string,string,string,string,string][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('string[][][]', provider_1.Provider.ethers)).toEqual('string[][][]');
                });
            });
            describe('int', function () {
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('int', provider_1.Provider.ethers)).toEqual('BigNumberish');
                });
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('int32', provider_1.Provider.ethers)).toEqual('BigNumberish');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('int[4]', provider_1.Provider.ethers)).toEqual('[BigNumberish,BigNumberish,BigNumberish,BigNumberish,BigNumberish]');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('int32[4]', provider_1.Provider.ethers)).toEqual('[BigNumberish,BigNumberish,BigNumberish,BigNumberish,BigNumberish]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('int[4][]', provider_1.Provider.ethers)).toEqual('[BigNumberish,BigNumberish,BigNumberish,BigNumberish,BigNumberish][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('int32[4][]', provider_1.Provider.ethers)).toEqual('[BigNumberish,BigNumberish,BigNumberish,BigNumberish,BigNumberish][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('int[][][]', provider_1.Provider.ethers)).toEqual('BigNumberish[][][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('int32[][][]', provider_1.Provider.ethers)).toEqual('BigNumberish[][][]');
                });
            });
            describe('bool', function () {
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('bool', provider_1.Provider.ethers)).toEqual('boolean');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('bool[4]', provider_1.Provider.ethers)).toEqual('[boolean,boolean,boolean,boolean,boolean]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('bool[4][]', provider_1.Provider.ethers)).toEqual('[boolean,boolean,boolean,boolean,boolean][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('bool[][][]', provider_1.Provider.ethers)).toEqual('boolean[][][]');
                });
            });
            it('should throw an error if solidity type can not be found', function () {
                expect(function () {
                    helpers_1.default.getSolidityInputTsTypeByTypeName(
                    // tslint:disable-next-line: no-any
                    'blah', provider_1.Provider.ethers);
                }).toThrowError('blah is not valid solidty type');
            });
        });
        describe('web3', function () {
            describe('address', function () {
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('address', provider_1.Provider.web3)).toEqual('string');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('address[4]', provider_1.Provider.web3)).toEqual('[string,string,string,string,string]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('address[4][]', provider_1.Provider.web3)).toEqual('[string,string,string,string,string][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('address[][][]', provider_1.Provider.web3)).toEqual('string[][][]');
                });
            });
            describe('uint', function () {
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('uint', provider_1.Provider.web3)).toEqual('string');
                });
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('uint32', provider_1.Provider.web3)).toEqual('string | number');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('uint[4]', provider_1.Provider.web3)).toEqual('[string,string,string,string,string]');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('uint32[4]', provider_1.Provider.web3)).toEqual('[string | number,string | number,string | number,string | number,string | number]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('uint[4][]', provider_1.Provider.web3)).toEqual('[string,string,string,string,string][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('uint32[4][]', provider_1.Provider.web3)).toEqual('[string | number,string | number,string | number,string | number,string | number][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('uint[][][]', provider_1.Provider.web3)).toEqual('string[][][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('uint32[][][]', provider_1.Provider.web3)).toEqual('string | number[][][]');
                });
            });
            describe('bytes', function () {
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('bytes', provider_1.Provider.web3)).toEqual('string | number[]');
                });
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('bytes32', provider_1.Provider.web3)).toEqual('string | number[]');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('bytes[4]', provider_1.Provider.web3)).toEqual('[string | number[],string | number[],string | number[],string | number[],string | number[]]');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('bytes32[4]', provider_1.Provider.web3)).toEqual('[string | number[],string | number[],string | number[],string | number[],string | number[]]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('bytes[4][]', provider_1.Provider.web3)).toEqual('[string | number[],string | number[],string | number[],string | number[],string | number[]][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('bytes32[4][]', provider_1.Provider.web3)).toEqual('[string | number[],string | number[],string | number[],string | number[],string | number[]][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('bytes[][][]', provider_1.Provider.web3)).toEqual('string | number[][][][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('bytes32[][][]', provider_1.Provider.web3)).toEqual('string | number[][][][]');
                });
            });
            describe('string', function () {
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('string', provider_1.Provider.web3)).toEqual('string');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('string[4]', provider_1.Provider.web3)).toEqual('[string,string,string,string,string]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('string[4][]', provider_1.Provider.web3)).toEqual('[string,string,string,string,string][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('string[][][]', provider_1.Provider.web3)).toEqual('string[][][]');
                });
            });
            describe('int', function () {
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('int', provider_1.Provider.web3)).toEqual('string');
                });
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('int32', provider_1.Provider.web3)).toEqual('string | number');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('int[4]', provider_1.Provider.web3)).toEqual('[string,string,string,string,string]');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('int32[4]', provider_1.Provider.web3)).toEqual('[string | number,string | number,string | number,string | number,string | number]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('int[4][]', provider_1.Provider.web3)).toEqual('[string,string,string,string,string][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('int32[4][]', provider_1.Provider.web3)).toEqual('[string | number,string | number,string | number,string | number,string | number][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('int[][][]', provider_1.Provider.web3)).toEqual('string[][][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('int32[][][]', provider_1.Provider.web3)).toEqual('string | number[][][]');
                });
            });
            describe('bool', function () {
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('bool', provider_1.Provider.web3)).toEqual('boolean');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('bool[4]', provider_1.Provider.web3)).toEqual('[boolean,boolean,boolean,boolean,boolean]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('bool[4][]', provider_1.Provider.web3)).toEqual('[boolean,boolean,boolean,boolean,boolean][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityInputTsTypeByTypeName('bool[][][]', provider_1.Provider.web3)).toEqual('boolean[][][]');
                });
            });
            it('should throw an error if solidity type can not be found', function () {
                expect(function () {
                    helpers_1.default.getSolidityInputTsTypeByTypeName(
                    // tslint:disable-next-line: no-any
                    'blah', provider_1.Provider.web3);
                }).toThrowError('blah is not valid solidty type');
            });
        });
    });
    describe('getSolidityOutputTsType', function () {
        describe('ethers', function () {
            describe('address', function () {
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'address' }, provider_1.Provider.ethers)).toEqual('string');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'address[4]' }, provider_1.Provider.ethers)).toEqual('[string,string,string,string,string]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'address[4][]' }, provider_1.Provider.ethers)).toEqual('[string,string,string,string,string][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'address[][][]' }, provider_1.Provider.ethers)).toEqual('string[][][]');
                });
            });
            describe('uint', function () {
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'uint' }, provider_1.Provider.ethers)).toEqual('BigNumber');
                });
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'uint32' }, provider_1.Provider.ethers)).toEqual('number');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'uint[4]' }, provider_1.Provider.ethers)).toEqual('[BigNumber,BigNumber,BigNumber,BigNumber,BigNumber]');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'uint32[4]' }, provider_1.Provider.ethers)).toEqual('[number,number,number,number,number]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'uint[4][]' }, provider_1.Provider.ethers)).toEqual('[BigNumber,BigNumber,BigNumber,BigNumber,BigNumber][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'uint32[4][]' }, provider_1.Provider.ethers)).toEqual('[number,number,number,number,number][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'uint[][][]' }, provider_1.Provider.ethers)).toEqual('BigNumber[][][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'uint32[][][]' }, provider_1.Provider.ethers)).toEqual('number[][][]');
                });
            });
            describe('bytes', function () {
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'bytes' }, provider_1.Provider.ethers)).toEqual('string');
                });
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'bytes32' }, provider_1.Provider.ethers)).toEqual('string');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'bytes[4]' }, provider_1.Provider.ethers)).toEqual('[string,string,string,string,string]');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'bytes32[4]' }, provider_1.Provider.ethers)).toEqual('[string,string,string,string,string]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'bytes[4][]' }, provider_1.Provider.ethers)).toEqual('[string,string,string,string,string][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'bytes32[4][]' }, provider_1.Provider.ethers)).toEqual('[string,string,string,string,string][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'bytes[][][]' }, provider_1.Provider.ethers)).toEqual('string[][][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'bytes32[][][]' }, provider_1.Provider.ethers)).toEqual('string[][][]');
                });
            });
            describe('string', function () {
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'string' }, provider_1.Provider.ethers)).toEqual('string');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'string[4]' }, provider_1.Provider.ethers)).toEqual('[string,string,string,string,string]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'string[4][]' }, provider_1.Provider.ethers)).toEqual('[string,string,string,string,string][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'string[][][]' }, provider_1.Provider.ethers)).toEqual('string[][][]');
                });
            });
            describe('int', function () {
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'int' }, provider_1.Provider.ethers)).toEqual('BigNumber');
                });
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'int32' }, provider_1.Provider.ethers)).toEqual('number');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'int[4]' }, provider_1.Provider.ethers)).toEqual('[BigNumber,BigNumber,BigNumber,BigNumber,BigNumber]');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'int32[4]' }, provider_1.Provider.ethers)).toEqual('[number,number,number,number,number]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'int[4][]' }, provider_1.Provider.ethers)).toEqual('[BigNumber,BigNumber,BigNumber,BigNumber,BigNumber][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'int32[4][]' }, provider_1.Provider.ethers)).toEqual('[number,number,number,number,number][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'int[][][]' }, provider_1.Provider.ethers)).toEqual('BigNumber[][][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'int32[][][]' }, provider_1.Provider.ethers)).toEqual('number[][][]');
                });
            });
            describe('bool', function () {
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'bool' }, provider_1.Provider.ethers)).toEqual('boolean');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'bool[4]' }, provider_1.Provider.ethers)).toEqual('[boolean,boolean,boolean,boolean,boolean]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'bool[4][]' }, provider_1.Provider.ethers)).toEqual('[boolean,boolean,boolean,boolean,boolean][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'bool[][][]' }, provider_1.Provider.ethers)).toEqual('boolean[][][]');
                });
            });
            describe('tuple', function () {
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'tuple', name: 'hey' }, provider_1.Provider.ethers)).toEqual('HeyResponse');
                });
                it('should return correct result with array', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'tuple[]', name: 'hey' }, provider_1.Provider.ethers)).toEqual('HeyResponse[]');
                });
            });
            it('should throw an error if solidity type can not be found', function () {
                expect(function () {
                    helpers_1.default.getSolidityOutputTsType({ type: 'blah' }, provider_1.Provider.ethers);
                }).toThrowError('blah is not valid solidty type');
            });
        });
        describe('web3', function () {
            describe('address', function () {
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'address' }, provider_1.Provider.web3)).toEqual('string');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'address[4]' }, provider_1.Provider.web3)).toEqual('[string,string,string,string,string]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'address[4][]' }, provider_1.Provider.web3)).toEqual('[string,string,string,string,string][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'address[][][]' }, provider_1.Provider.web3)).toEqual('string[][][]');
                });
            });
            describe('uint', function () {
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'uint' }, provider_1.Provider.web3)).toEqual('string');
                });
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'uint32' }, provider_1.Provider.web3)).toEqual('string');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'uint[4]' }, provider_1.Provider.web3)).toEqual('[string,string,string,string,string]');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'uint32[4]' }, provider_1.Provider.web3)).toEqual('[string,string,string,string,string]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'uint[4][]' }, provider_1.Provider.web3)).toEqual('[string,string,string,string,string][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'uint32[4][]' }, provider_1.Provider.web3)).toEqual('[string,string,string,string,string][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'uint[][][]' }, provider_1.Provider.web3)).toEqual('string[][][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'uint32[][][]' }, provider_1.Provider.web3)).toEqual('string[][][]');
                });
            });
            describe('bytes', function () {
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'bytes' }, provider_1.Provider.web3)).toEqual('string');
                });
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'bytes32' }, provider_1.Provider.web3)).toEqual('string');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'bytes[4]' }, provider_1.Provider.web3)).toEqual('[string,string,string,string,string]');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'bytes32[4]' }, provider_1.Provider.web3)).toEqual('[string,string,string,string,string]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'bytes[4][]' }, provider_1.Provider.web3)).toEqual('[string,string,string,string,string][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'bytes32[4][]' }, provider_1.Provider.web3)).toEqual('[string,string,string,string,string][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'bytes[][][]' }, provider_1.Provider.web3)).toEqual('string[][][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'bytes32[][][]' }, provider_1.Provider.web3)).toEqual('string[][][]');
                });
            });
            describe('string', function () {
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'string' }, provider_1.Provider.web3)).toEqual('string');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'string[4]' }, provider_1.Provider.web3)).toEqual('[string,string,string,string,string]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'string[4][]' }, provider_1.Provider.web3)).toEqual('[string,string,string,string,string][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'string[][][]' }, provider_1.Provider.web3)).toEqual('string[][][]');
                });
            });
            describe('int', function () {
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'int' }, provider_1.Provider.web3)).toEqual('string');
                });
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'int32' }, provider_1.Provider.web3)).toEqual('string');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'int[4]' }, provider_1.Provider.web3)).toEqual('[string,string,string,string,string]');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'int32[4]' }, provider_1.Provider.web3)).toEqual('[string,string,string,string,string]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'int[4][]' }, provider_1.Provider.web3)).toEqual('[string,string,string,string,string][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'int32[4][]' }, provider_1.Provider.web3)).toEqual('[string,string,string,string,string][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'int[][][]' }, provider_1.Provider.web3)).toEqual('string[][][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'int32[][][]' }, provider_1.Provider.web3)).toEqual('string[][][]');
                });
            });
            describe('bool', function () {
                it('should return correct result with no arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'bool' }, provider_1.Provider.web3)).toEqual('boolean');
                });
                it('should return correct result with fixed array', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'bool[4]' }, provider_1.Provider.web3)).toEqual('[boolean,boolean,boolean,boolean,boolean]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'bool[4][]' }, provider_1.Provider.web3)).toEqual('[boolean,boolean,boolean,boolean,boolean][]');
                });
                it('should return correct result with fixed multidimensional arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'bool[][][]' }, provider_1.Provider.web3)).toEqual('boolean[][][]');
                });
            });
            describe('tuple', function () {
                it('should return correct response with no arrays', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'tuple', name: 'hey' }, provider_1.Provider.web3)).toEqual('HeyResponse');
                });
                it('should return response as an array', function () {
                    expect(helpers_1.default.getSolidityOutputTsType({ type: 'tuple[]', name: 'hey' }, provider_1.Provider.web3)).toEqual('HeyResponse[]');
                });
            });
            it('should throw an error if solidity type can not be found', function () {
                expect(function () {
                    helpers_1.default.getSolidityOutputTsType({ type: 'blah' }, provider_1.Provider.web3);
                }).toThrowError('blah is not valid solidty type');
            });
        });
    });
    describe('buildUpMultidimensionalArrayTypes', function () {
        it('should take a fixed size multidimensional array and convert it to an type', function () {
            expect(helpers_1.default.buildUpMultidimensionalArrayTypes('bytes32[4][][2][][9][]', 'string')).toEqual('[string,string,string,string,string][][][][][]');
        });
        it('should take a unbounded size multidimensional array and convert it to an type', function () {
            expect(helpers_1.default.buildUpMultidimensionalArrayTypes('bytes32[][]', 'string')).toEqual('string[][]');
        });
    });
    describe('buildInterface', function () {
        it('should build interface', function () {
            expect(helpers_1.default.buildInterface('TestInterface', 'testProperty: string;')).toEqual('export interface TestInterface { testProperty: string; }');
        });
    });
    describe('buildType', function () {
        it('should build type', function () {
            expect(helpers_1.default.buildType('TestEvents', ['test', 'test2'])).toEqual('export type TestEvents = "test" | "test2";');
        });
        it('should return correct build tupe if no events exist', function () {
            expect(helpers_1.default.buildType('TestEvents', [])).toEqual('export type TestEvents = undefined;');
        });
    });
});
//# sourceMappingURL=helpers.spec.js.map