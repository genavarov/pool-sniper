"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var parser_typescript_1 = __importDefault(require("prettier/parser-typescript"));
var standalone_1 = __importDefault(require("prettier/standalone"));
var abi_properties_1 = require("../../abi-properties");
var abi_item_type_1 = require("../../abi-properties/abi-item-type");
var helpers_1 = __importDefault(require("../../common/helpers"));
var logger_1 = require("../../common/logger");
var helpers_2 = __importDefault(require("./common/helpers"));
var ethers_version_1 = require("./enums/ethers-version");
var provider_1 = require("./enums/provider");
var ethers_factory_1 = require("./ethers-factory");
var web3_factory_1 = require("./web3-factory");
var AbiGenerator = /** @class */ (function () {
    function AbiGenerator(_context) {
        this._context = _context;
        this._web3Factory = new web3_factory_1.Web3Factory();
        this._ethersFactory = new ethers_factory_1.EthersFactory();
        // the contexts
        this._parametersAndReturnTypeInterfaces = [];
        this._events = [];
        this._methodNames = [];
    }
    /**
     * Generates all the typings
     * @returns The location the file was generated to
     */
    AbiGenerator.prototype.generate = function () {
        this.clearAllQuotesFromContextInfo();
        if (!helpers_2.default.isDirectory(this.getOutputPathDirectory())) {
            throw new Error('output path must be a directory');
        }
        var abi = this.getAbiJson();
        var fullTypings = this.buildFullTypings(abi, this.buildAbiInterface(abi));
        var fullTypingsFormatted;
        try {
            fullTypingsFormatted = standalone_1.default.format(fullTypings, this.getPrettierOptions());
        }
        catch (error) {
            // users probably not supplied the correct prettier options
            // fallback to default
            logger_1.Logger.error('Your prettier options were not valid so falling back to default one.');
            logger_1.Logger.log('');
            fullTypingsFormatted = standalone_1.default.format(fullTypings, this.getDefaultPrettierOptions());
        }
        var outputLocation = this.buildOutputLocation();
        fs_extra_1.default.writeFileSync(outputLocation, fullTypingsFormatted, {
            mode: 493,
        });
        this.clearState();
        if (this._context.watch) {
            this.watchForChanges();
        }
        return {
            outputLocation: outputLocation,
            abiJsonFileLocation: this.getAbiFileFullPathLocation(),
        };
    };
    /**
     * Clear all quotes from the context file info
     */
    AbiGenerator.prototype.clearAllQuotesFromContextInfo = function () {
        this._context.abiFileLocation = this._context.abiFileLocation.replace(/\'/g, '');
        if (this._context.outputPathDirectory) {
            this._context.outputPathDirectory = this._context.outputPathDirectory.replace(/\'/g, '');
        }
    };
    /**
     * Clear the state down
     */
    AbiGenerator.prototype.clearState = function () {
        this._parametersAndReturnTypeInterfaces = [];
        this._events = [];
        this._methodNames = [];
    };
    /**
     * Watch for ABI file changes
     */
    AbiGenerator.prototype.watchForChanges = function () {
        var _this = this;
        // dont let anymore watches happen once the first one is registered
        this._context.watch = false;
        var fsWait = false;
        fs_extra_1.default.watch(this.getAbiFileFullPathLocation(), function (event, filename) {
            if (filename) {
                if (fsWait)
                    return;
                setTimeout(function () {
                    fsWait = false;
                }, 100);
                var outputLocation = _this.generate();
                logger_1.Logger.log("successfully updated typings for abi file " + _this.getAbiFileFullPathLocation() + " saved in " + outputLocation);
            }
        });
    };
    /**
     * Get the output path directory
     */
    AbiGenerator.prototype.getOutputPathDirectory = function () {
        if (this._context.outputPathDirectory) {
            return this._context.outputPathDirectory;
        }
        return path_1.default.dirname(this.getAbiFileFullPathLocation());
    };
    /**
     * Build output location
     */
    AbiGenerator.prototype.buildOutputLocation = function () {
        var name = this._context.name || this.getAbiFileLocationRawName();
        var outputPathDirectory = this.getOutputPathDirectory();
        if (outputPathDirectory.substring(outputPathDirectory.length - 1) === '/') {
            return "" + outputPathDirectory + name + ".ts";
        }
        return this.buildExecutingPath(outputPathDirectory + "/" + name + ".ts");
    };
    /**
     * Get prettier options
     */
    AbiGenerator.prototype.getPrettierOptions = function () {
        var usersPrettierrConfig = this.findPrettierrcContent(this.buildExecutingPath(this.getOutputPathDirectory()));
        if (usersPrettierrConfig) {
            usersPrettierrConfig.parser = 'typescript';
            usersPrettierrConfig.plugins = [parser_typescript_1.default];
            return usersPrettierrConfig;
        }
        return this.getDefaultPrettierOptions();
    };
    /**
     * Loop through all the of dir to try to fine the .prettierrc file
     * @param dirPath The path
     */
    AbiGenerator.prototype.findPrettierrcContent = function (dirPath) {
        var files = fs_extra_1.default.readdirSync(dirPath);
        for (var i = 0; i < files.length; i++) {
            if (files[i] === '.prettierrc') {
                try {
                    return JSON.parse(fs_extra_1.default.readFileSync(path_1.default.join(dirPath, '.prettierrc'), 'utf8'));
                }
                catch (error) {
                    // mute it
                }
            }
        }
        var nextPath = path_1.default.join(dirPath, '..');
        if (nextPath !== dirPath) {
            return this.findPrettierrcContent(nextPath);
        }
        return null;
    };
    /**
     * Get default prettier options
     */
    AbiGenerator.prototype.getDefaultPrettierOptions = function () {
        return {
            parser: 'typescript',
            trailingComma: 'es5',
            singleQuote: true,
            bracketSpacing: true,
            printWidth: 80,
            plugins: [parser_typescript_1.default],
        };
    };
    /**
     * Build the full typings
     * @param abi The abi items
     * @param abiTypedInterface The abi typed interface
     */
    AbiGenerator.prototype.buildFullTypings = function (abi, abiTypedInterface) {
        var typings = '';
        switch (this._context.provider) {
            case provider_1.Provider.web3:
                typings += this._web3Factory.buildWeb3Interfaces(this.getAbiName());
                break;
            case provider_1.Provider.ethers:
                typings += this._ethersFactory.buildEthersInterfaces(this.getAbiName(), ethers_version_1.EthersVersion.four_or_below);
                break;
            case provider_1.Provider.ethers_v5:
                typings += this._ethersFactory.buildEthersInterfaces(this.getAbiName(), ethers_version_1.EthersVersion.five);
                break;
            default:
                throw new Error(this._context.provider + " is not a known supported provider");
        }
        return (typings +
            this.buildEventsType() +
            this.buildEventsInterface(abi) +
            this.buildMethodNamesType() +
            this.buildParametersAndReturnTypeInterfaces() +
            abiTypedInterface);
    };
    /**
     * Gets the abi json
     */
    AbiGenerator.prototype.getAbiJson = function () {
        var abiFileFullPath = this.getAbiFileFullPathLocation();
        if (!fs_extra_1.default.existsSync(abiFileFullPath)) {
            throw new Error("can not find abi file " + abiFileFullPath);
        }
        try {
            // tslint:disable-next-line: no-any
            var result = JSON.parse(fs_extra_1.default.readFileSync(abiFileFullPath, 'utf8'));
            if (result.abi) {
                return result.abi;
            }
            return result;
        }
        catch (error) {
            throw new Error("Abi file " + abiFileFullPath + " is not a json file. Abi must be a json file.");
        }
    };
    /**
     * Get the abi file full path location with executing path
     */
    AbiGenerator.prototype.getAbiFileFullPathLocation = function () {
        return this.buildExecutingPath(this._context.abiFileLocation);
    };
    /**
     * Build the executing path
     */
    AbiGenerator.prototype.buildExecutingPath = function (joinPath) {
        return helpers_2.default.buildExecutingPath(joinPath);
    };
    /**
     * Build abi interface
     * @param abi The abi json
     */
    AbiGenerator.prototype.buildAbiInterface = function (abi) {
        var properties = '';
        for (var i = 0; i < abi.length; i++) {
            switch (abi[i].type) {
                case abi_item_type_1.AbiItemType.constructor:
                    properties += this.buildInterfacePropertyDocs(abi[i]);
                    this._methodNames.push('new');
                    properties += "'new'" + this.buildParametersAndReturnTypes(abi[i]) + ";";
                    break;
                case abi_item_type_1.AbiItemType.function:
                    properties += this.buildInterfacePropertyDocs(abi[i]);
                    this._methodNames.push(abi[i].name);
                    properties += "" + abi[i].name + this.buildParametersAndReturnTypes(abi[i]) + ";";
                    break;
                case abi_item_type_1.AbiItemType.event:
                    var eventInputs = abi[i].inputs;
                    if (eventInputs && eventInputs.length > 0) {
                        var eventInterfaceName = helpers_1.default.capitalize(abi[i].name) + "EventEmittedResponse";
                        var eventTypeProperties = '';
                        for (var e = 0; e < eventInputs.length; e++) {
                            var eventTsType = helpers_2.default.getSolidityInputTsType(eventInputs[e], this._context.provider);
                            eventTypeProperties += eventInputs[e].name + ": " + eventTsType + ";";
                        }
                        this.addReturnTypeInterface(eventInterfaceName, eventTypeProperties);
                    }
                    this._events.push(abi[i].name);
                    break;
            }
        }
        return helpers_2.default.buildInterface(this.getAbiName(), properties);
    };
    /**
     * Get abi name
     */
    AbiGenerator.prototype.getAbiName = function () {
        if (this._context.name) {
            return this.formatAbiName(this._context.name);
        }
        return this.formatAbiName(this.getAbiFileLocationRawName());
    };
    /**
     * Formats the abi name
     * @param name The abi name
     */
    AbiGenerator.prototype.formatAbiName = function (name) {
        return name
            .split('-')
            .map(function (value) { return helpers_1.default.capitalize(value); })
            .join('')
            .split('.')
            .map(function (value) { return helpers_1.default.capitalize(value); })
            .join('');
    };
    /**
     * Get abi file location raw name
     */
    AbiGenerator.prototype.getAbiFileLocationRawName = function () {
        var basename = path_1.default.basename(this._context.abiFileLocation);
        return basename.substr(0, basename.lastIndexOf('.'));
    };
    /**
     * Build method names type
     */
    AbiGenerator.prototype.buildMethodNamesType = function () {
        return helpers_2.default.buildType(this.getAbiName() + "MethodNames", this._methodNames);
    };
    /**
     * Build the parameters and return type interface if they accept an object of some form
     */
    AbiGenerator.prototype.buildParametersAndReturnTypeInterfaces = function () {
        var parametersAndReturnTypes = '';
        this._parametersAndReturnTypeInterfaces.map(function (typeInterface) {
            parametersAndReturnTypes += typeInterface;
        });
        return parametersAndReturnTypes;
    };
    /**
     * Build events type
     */
    AbiGenerator.prototype.buildEventsType = function () {
        return helpers_2.default.buildType(this.getAbiName() + "Events", this._events);
    };
    /**
     * Build the event context interface
     * @param abiItems The abi json
     */
    AbiGenerator.prototype.buildEventsInterface = function (abiItems) {
        var eventsInterfaceName = this.getAbiName() + "EventsContext";
        switch (this._context.provider) {
            case provider_1.Provider.web3:
                return helpers_2.default.buildInterface(eventsInterfaceName, this._web3Factory.buildEventInterfaceProperties(abiItems));
            case provider_1.Provider.ethers:
            case provider_1.Provider.ethers_v5:
                return helpers_2.default.buildInterface(eventsInterfaceName, this._ethersFactory.buildEventInterfaceProperties(abiItems));
            default:
                throw new Error(this._context.provider + " is not a known supported provider. Supported providers are ethers or web3");
        }
    };
    /**
     * Build the abi property summaries
     * @param abiItem The abi json
     */
    AbiGenerator.prototype.buildInterfacePropertyDocs = function (abiItem) {
        var paramsDocs = '';
        if (abiItem.inputs) {
            for (var i = 0; i < abiItem.inputs.length; i++) {
                var inputName = abiItem.inputs[i].name;
                // handle mapping inputs
                if (inputName.length === 0) {
                    inputName = "parameter" + i;
                }
                paramsDocs += "\r\n* @param " + inputName + " Type: " + abiItem.inputs[i].type + ", Indexed: " + (abiItem.inputs[i].indexed || 'false');
            }
        }
        return "\n         /**\n            * Payable: " + helpers_1.default.isAcceptsEther(abiItem) + "\n            * Constant: " + helpers_1.default.isNeverModifyBlockchainState(abiItem) + "\n            * StateMutability: " + abiItem.stateMutability + "\n            * Type: " + abiItem.type + " " + paramsDocs + "\n          */\n        ";
    };
    /**
     * Builds the input and output property type
     * @param abiItem The abi json
     */
    AbiGenerator.prototype.buildParametersAndReturnTypes = function (abiItem) {
        var parameters = this.buildParameters(abiItem);
        return "" + parameters + this.buildPropertyReturnTypeInterface(abiItem);
    };
    /**
     * Build parameters for abi interface
     * @param abiItem The abi item
     */
    AbiGenerator.prototype.buildParameters = function (abiItem) {
        var input = '(';
        if (abiItem.inputs) {
            for (var i = 0; i < abiItem.inputs.length; i++) {
                if (input.length > 1) {
                    input += ', ';
                }
                var inputName = abiItem.inputs[i].name;
                // handle mapping inputs
                if (inputName.length === 0) {
                    inputName = "parameter" + i;
                }
                if (abiItem.inputs[i].type.includes(abi_properties_1.SolidityType.tuple)) {
                    input += inputName + ": " + this.buildTupleParametersInterface(abiItem.name, abiItem.inputs[i]);
                }
                else {
                    input += inputName + ": " + helpers_2.default.getSolidityInputTsType(abiItem.inputs[i], this._context.provider);
                }
            }
        }
        // ethers allows you to pass in overrides in methods so add that in here
        if (this._context.provider.includes(provider_1.Provider.ethers)) {
            input = this._ethersFactory.addOverridesToParameters(input, abiItem);
        }
        return (input += ')');
    };
    /**
     * Build the object request parameter interface
     * @param name The abi item name
     * @param abiInput The abi input
     */
    AbiGenerator.prototype.buildTupleParametersInterface = function (name, abiInput) {
        var interfaceName = helpers_1.default.capitalize(name) + "Request";
        var properties = '';
        for (var i = 0; i < abiInput.components.length; i++) {
            var inputTsType = helpers_2.default.getSolidityInputTsType(abiInput.components[i], this._context.provider);
            properties += abiInput.components[i].name + ": " + inputTsType + ";";
            // check for deep tuples in tuple in tuples
            if (abiInput.components[i].components) {
                var deepInterfaceName = helpers_2.default.buildInterfaceName(abiInput.components[i], 'Request');
                var deepProperties = '';
                for (var deep = 0; deep < abiInput.components[i].components.length; deep++) {
                    var deepInputTsType = helpers_2.default.getSolidityInputTsType(abiInput.components[i].components[deep], this._context.provider);
                    var propertyName = abiInput.components[i].components[deep].name;
                    if (propertyName.length === 0) {
                        propertyName = "result" + deep;
                    }
                    deepProperties += propertyName + ': ' + deepInputTsType + ';';
                    if (abiInput.components[i].components[deep].components) {
                        this.buildTupleParametersInterface(deepInterfaceName, abiInput.components[i].components[deep]);
                    }
                }
                this.addReturnTypeInterface(deepInterfaceName, deepProperties);
            }
        }
        this.addReturnTypeInterface(interfaceName, properties);
        if (abiInput.type.includes('[')) {
            return interfaceName + "[]";
        }
        return "" + interfaceName;
    };
    /**
     * Build the object response parameter interface
     * @param name The abi item name
     * @param abiOutput The abi output
     */
    AbiGenerator.prototype.buildTupleResponseInterface = function (abiOutput) {
        var interfaceName = helpers_2.default.buildInterfaceName(abiOutput);
        var properties = '';
        for (var i = 0; i < abiOutput.components.length; i++) {
            var outputTsType = helpers_2.default.getSolidityOutputTsType(abiOutput.components[i], this._context.provider);
            properties += abiOutput.components[i].name + ": " + outputTsType + ";";
            if (this._context.provider.includes(provider_1.Provider.ethers)) {
                properties += i + ": " + outputTsType + ";";
            }
            // check for deep tuples in tuple in tuples
            if (abiOutput.components[i].components) {
                var deepInterfaceName = helpers_2.default.buildInterfaceName(abiOutput.components[i]);
                var deepProperties = '';
                for (var deep = 0; deep < abiOutput.components[i].components.length; deep++) {
                    var deepOutputTsType = helpers_2.default.getSolidityOutputTsType(abiOutput.components[i].components[deep], this._context.provider);
                    var propertyName = abiOutput.components[i].components[deep].name;
                    if (propertyName.length === 0) {
                        propertyName = "result" + deep;
                    }
                    deepProperties += propertyName + ': ' + deepOutputTsType + ';';
                    if (this._context.provider.includes(provider_1.Provider.ethers)) {
                        deepProperties += deep + ': ' + outputTsType + ';';
                    }
                    if (abiOutput.components[i].components[deep].components) {
                        this.buildTupleResponseInterface(abiOutput.components[i].components[deep]);
                    }
                }
                this.addReturnTypeInterface(deepInterfaceName, deepProperties);
            }
        }
        this.addReturnTypeInterface(interfaceName, properties);
        if (abiOutput.type.includes('[')) {
            return interfaceName + "[]";
        }
        return "" + interfaceName;
    };
    /**
     * Build property return type interface and return the return type context
     * @param abiItem The abit json
     */
    AbiGenerator.prototype.buildPropertyReturnTypeInterface = function (abiItem) {
        var output = '';
        if (abiItem.outputs && abiItem.outputs.length > 0) {
            if (abiItem.outputs.length === 1) {
                output += this.buildMethodReturnContext(helpers_2.default.getSolidityOutputTsType(abiItem.outputs[0], this._context.provider), abiItem);
                if (abiItem.outputs[0].type.includes(abi_properties_1.SolidityType.tuple)) {
                    this.buildTupleResponseInterface(abiItem.outputs[0]);
                }
            }
            else {
                if (helpers_1.default.isNeverModifyBlockchainState(abiItem)) {
                    var interfaceName = helpers_2.default.buildInterfaceName(abiItem);
                    var ouputProperties = '';
                    for (var i = 0; i < abiItem.outputs.length; i++) {
                        var abiItemOutput = abiItem.outputs[i];
                        var outputTsType = helpers_2.default.getSolidityOutputTsType(abiItemOutput, this._context.provider);
                        var propertyName = abiItemOutput.name;
                        if (propertyName.length === 0) {
                            propertyName = "result" + i;
                        }
                        ouputProperties += propertyName + ": " + outputTsType + ";";
                        if (this._context.provider.includes(provider_1.Provider.ethers)) {
                            ouputProperties += i + ": " + outputTsType + ";";
                        }
                        if (abiItemOutput.type.includes(abi_properties_1.SolidityType.tuple)) {
                            this.buildTupleResponseInterface(abiItem.outputs[i]);
                        }
                    }
                    if (this._context.provider.includes(provider_1.Provider.ethers)) {
                        ouputProperties += "length: " + abiItem.outputs.length + ";";
                    }
                    this.addReturnTypeInterface(interfaceName, ouputProperties);
                    output += this.buildMethodReturnContext(interfaceName, abiItem);
                }
                else {
                    // if its not a constant you will have no type so dont build any interfaces
                    output += this.buildMethodReturnContext('', abiItem);
                }
            }
        }
        else {
            output += this.buildMethodReturnContext('void', abiItem);
        }
        return output;
    };
    /**
     * add return type interfaces
     * @param interfaceName The interface name
     * @param interfaceContext The interface context
     */
    AbiGenerator.prototype.addReturnTypeInterface = function (interfaceName, interfaceContext) {
        // filter out any repeated interfaces
        if (!this._parametersAndReturnTypeInterfaces.find(function (c) {
            return c.includes("export interface " + interfaceName);
        })) {
            this._parametersAndReturnTypeInterfaces.push(helpers_2.default.buildInterface(interfaceName, interfaceContext));
        }
    };
    /**
     * Build the method return context
     * @param type The type it returns
     * @param abiItem The abi item
     */
    AbiGenerator.prototype.buildMethodReturnContext = function (type, abiItem) {
        switch (this._context.provider) {
            case provider_1.Provider.web3:
                return this._web3Factory.buildMethodReturnContext(type, abiItem);
            case provider_1.Provider.ethers:
            case provider_1.Provider.ethers_v5:
                return this._ethersFactory.buildMethodReturnContext(type, abiItem);
            default:
                throw new Error(this._context.provider + " is not a known supported provider");
        }
    };
    return AbiGenerator;
}());
exports.default = AbiGenerator;
//# sourceMappingURL=abi-generator.js.map