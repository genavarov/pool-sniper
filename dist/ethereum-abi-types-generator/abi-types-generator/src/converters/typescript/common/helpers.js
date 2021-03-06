"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var abi_properties_1 = require("../../../abi-properties");
var helpers_1 = __importDefault(require("../../../common/helpers"));
var provider_1 = require("../enums/provider");
var TypeScriptHelpers = /** @class */ (function () {
    function TypeScriptHelpers() {
    }
    TypeScriptHelpers.getSolidityInputTsTypeByTypeName = function (type, provider) {
        // tslint:disable-next-line: no-any
        return this.getSolidityInputTsType({ type: type }, provider);
    };
    /**
     * Get the solidity input type mapped to typescript type
     * @param type The solidity type
     */
    TypeScriptHelpers.getSolidityInputTsType = function (abiInput, provider) {
        switch (provider) {
            case provider_1.Provider.ethers:
            case provider_1.Provider.ethers_v5:
                {
                    if (abiInput.type.includes(abi_properties_1.SolidityType.bytes)) {
                        if (abiInput.type.includes('[')) {
                            return this.buildUpMultidimensionalArrayTypes(abiInput.type, 'Arrayish');
                        }
                        return 'Arrayish';
                    }
                    if (abiInput.type.includes(abi_properties_1.SolidityType.uint) ||
                        abiInput.type.includes(abi_properties_1.SolidityType.int)) {
                        if (abiInput.type.includes('[')) {
                            return this.buildUpMultidimensionalArrayTypes(abiInput.type, 'BigNumberish');
                        }
                        return 'BigNumberish';
                    }
                }
                break;
            case provider_1.Provider.web3:
                {
                    if (abiInput.type.includes(abi_properties_1.SolidityType.bytes)) {
                        if (abiInput.type.includes('[')) {
                            return this.buildUpMultidimensionalArrayTypes(abiInput.type, 'string | number[]');
                        }
                        return 'string | number[]';
                    }
                    if (abiInput.type.includes(abi_properties_1.SolidityType.uint) ||
                        abiInput.type.includes(abi_properties_1.SolidityType.int)) {
                        if (abiInput.type.includes(abi_properties_1.SolidityType.uint)) {
                            var numberType = this.buildWeb3NumberType(abiInput.type, abi_properties_1.SolidityType.uint);
                            if (abiInput.type.includes('[')) {
                                return this.buildUpMultidimensionalArrayTypes(abiInput.type, numberType);
                            }
                            return numberType;
                        }
                        if (abiInput.type.includes(abi_properties_1.SolidityType.int)) {
                            var numberType = this.buildWeb3NumberType(abiInput.type, abi_properties_1.SolidityType.int);
                            if (abiInput.type.includes('[')) {
                                return this.buildUpMultidimensionalArrayTypes(abiInput.type, numberType);
                            }
                            return numberType;
                        }
                    }
                }
                break;
        }
        if (abiInput.type.includes(abi_properties_1.SolidityType.bool)) {
            if (abiInput.type.includes('[')) {
                return this.buildUpMultidimensionalArrayTypes(abiInput.type, 'boolean');
            }
            return 'boolean';
        }
        // always fall back to hex string if something goes nuts in the ABI
        // should not happen but good having some fallback
        if (abiInput.type.includes(abi_properties_1.SolidityType.address) ||
            abiInput.type.includes(abi_properties_1.SolidityType.uint) ||
            abiInput.type.includes(abi_properties_1.SolidityType.bytes) ||
            abiInput.type.includes(abi_properties_1.SolidityType.string) ||
            abiInput.type.includes(abi_properties_1.SolidityType.int)) {
            if (abiInput.type.includes('[')) {
                return this.buildUpMultidimensionalArrayTypes(abiInput.type, 'string');
            }
            return 'string';
        }
        if (abiInput.type.includes(abi_properties_1.SolidityType.tuple)) {
            var interfaceName = this.buildInterfaceName(abiInput, 'Request');
            if (abiInput.type.includes('[')) {
                return interfaceName + "[]";
            }
            return interfaceName;
        }
        throw new Error(abiInput.type + " is not valid solidty type");
    };
    /**
     * Get the solidity type mapped to typescript type
     * @param abiOutput The abi output type
     * @param provider The provider
     */
    TypeScriptHelpers.getSolidityOutputTsType = function (abiOutput, provider) {
        // any bespoke provider output type logic
        switch (provider) {
            case provider_1.Provider.ethers:
            case provider_1.Provider.ethers_v5: {
                if (abiOutput.type.includes(abi_properties_1.SolidityType.uint) ||
                    abiOutput.type.includes(abi_properties_1.SolidityType.int)) {
                    if (abiOutput.type.includes(abi_properties_1.SolidityType.uint)) {
                        var numberType = this.buildEtherjsNumberType(abiOutput.type, abi_properties_1.SolidityType.uint);
                        if (abiOutput.type.includes('[')) {
                            return this.buildUpMultidimensionalArrayTypes(abiOutput.type, numberType);
                        }
                        return numberType;
                    }
                    if (abiOutput.type.includes(abi_properties_1.SolidityType.int)) {
                        var numberType = this.buildEtherjsNumberType(abiOutput.type, abi_properties_1.SolidityType.int);
                        if (abiOutput.type.includes('[')) {
                            return this.buildUpMultidimensionalArrayTypes(abiOutput.type, numberType);
                        }
                        return numberType;
                    }
                }
            }
        }
        if (abiOutput.type.includes(abi_properties_1.SolidityType.tuple)) {
            var interfaceName = this.buildInterfaceName(abiOutput);
            if (abiOutput.type.includes('[')) {
                return interfaceName + "[]";
            }
            return interfaceName;
        }
        if (abiOutput.type.includes(abi_properties_1.SolidityType.bool)) {
            if (abiOutput.type.includes('[')) {
                return this.buildUpMultidimensionalArrayTypes(abiOutput.type, 'boolean');
            }
            return 'boolean';
        }
        if (abiOutput.type.includes(abi_properties_1.SolidityType.address) ||
            abiOutput.type.includes(abi_properties_1.SolidityType.string) ||
            abiOutput.type.includes(abi_properties_1.SolidityType.bytes) ||
            abiOutput.type.includes(abi_properties_1.SolidityType.uint) ||
            abiOutput.type.includes(abi_properties_1.SolidityType.int)) {
            if (abiOutput.type.includes('[')) {
                return this.buildUpMultidimensionalArrayTypes(abiOutput.type, 'string');
            }
            return 'string';
        }
        throw new Error(abiOutput.type + " is not valid solidty type 1");
    };
    /**
     * Build response interface name
     * @param inputOrOutput The input or output
     */
    TypeScriptHelpers.buildInterfaceName = function (inputOrOutput, requestInterfaceType) {
        if (requestInterfaceType === void 0) { requestInterfaceType = 'Response'; }
        if (inputOrOutput.name.length > 0) {
            return "" + helpers_1.default.capitalize(inputOrOutput.name) + requestInterfaceType;
        }
        if (!inputOrOutput.internalType) {
            throw new Error("All tuple types need a name or a internal type else the tool can not generate static naming for the responses please check all your tuple and tuple[] have got a name or a internal type. - " + JSON.stringify(inputOrOutput));
        }
        var internalType = helpers_1.default.deepClone(inputOrOutput.internalType);
        return helpers_1.default.capitalize(internalType
            .substring(internalType.indexOf('.'))
            .toLowerCase()
            .replace('struct', '')
            .replace('.', '')
            .replace('[', '')
            .replace(']', '')
            .replace(/\s/g, '')) + "Response";
    };
    /**
     * Build etherjs number type
     * @param type The ABI type
     * @param solidityType The solidity type
     */
    TypeScriptHelpers.buildEtherjsNumberType = function (type, solidityType) {
        var clonedType = helpers_1.default.deepClone(type);
        var bits = clonedType.replace(solidityType, '').split('[')[0];
        var totalBits = Number(bits);
        if (bits.length > 0 && !isNaN(totalBits)) {
            return totalBits <= 48 ? 'number' : 'BigNumber';
        }
        return 'BigNumber';
    };
    /**
     * Build web3 number type
     * @param type The ABI type
     * @param solidityType The solidity type
     */
    TypeScriptHelpers.buildWeb3NumberType = function (type, solidityType) {
        var clonedType = helpers_1.default.deepClone(type);
        var bits = clonedType.replace(solidityType, '').split('[')[0];
        var totalBits = Number(bits);
        if (bits.length > 0 && !isNaN(totalBits)) {
            return totalBits <= 48 ? 'string | number' : 'string';
        }
        return 'string';
    };
    /**
     * Build up multidimensional array types
     * Typescript does not support syntax `[string, string][string, string]`
     * so we can only strongly type the fixed length of the first array
     * for example `bytes32[4][][2][][9][]` > `[string,string,string,string,string][][][][][]`
     * is you have any other fixed size arrays passed dimension it will have to generate a unbounded
     * array size aka `bytes32[][4] > `string[][]`
     * @param abiType The ABI type in the json
     * @param tsType The typescript type
     */
    TypeScriptHelpers.buildUpMultidimensionalArrayTypes = function (abiType, tsType) {
        var split = abiType.split('[');
        split.shift();
        var buildType = '';
        for (var i = 0; i < split.length; i++) {
            // we can only put fixed sizes on the first fixed length
            // array rest has to be `[]` due to TS limited support
            if (i === 0 && split[i].length > 1) {
                var arrayLength = Number(split[i].split(']')[0]);
                var index = 0;
                buildType = '[';
                while (index <= arrayLength) {
                    if (index === arrayLength) {
                        buildType += "" + tsType;
                        index++;
                    }
                    else {
                        buildType += tsType + ",";
                        index++;
                    }
                }
                buildType += ']';
            }
            else {
                if (i === 0) {
                    buildType += tsType + "[]";
                }
                else {
                    buildType += '[]';
                }
            }
        }
        return buildType;
    };
    /**
     * Generates an interface
     * @param interfaceName The interface name
     * @param interfaceContext The interface context
     */
    TypeScriptHelpers.buildInterface = function (interfaceName, interfaceContext) {
        return "export interface " + interfaceName + " { " + interfaceContext + " }";
    };
    /**
     * Build type
     * @param typeName The type name
     * @param types The types
     */
    TypeScriptHelpers.buildType = function (typeName, types) {
        var result = '';
        types.map(function (type) {
            if (result.length > 0) {
                result += ' | ';
            }
            result += "\"" + type + "\"";
        });
        if (result.length === 0) {
            result += 'undefined';
        }
        return "export type " + typeName + " = " + result + ";";
    };
    /**
     * Check is a path is a directory
     * @param pathValue The path value
     */
    TypeScriptHelpers.isDirectory = function (pathValue) {
        return fs_extra_1.default.existsSync(pathValue) && fs_extra_1.default.lstatSync(pathValue).isDirectory();
    };
    /**
     * Build the executing path
     */
    TypeScriptHelpers.buildExecutingPath = function (joinPath) {
        return path_1.default.resolve(process.cwd(), joinPath);
    };
    return TypeScriptHelpers;
}());
exports.default = TypeScriptHelpers;
//# sourceMappingURL=helpers.js.map