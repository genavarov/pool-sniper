"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniswapPairSettings = void 0;
var error_codes_1 = require("../../../common/errors/error-codes");
var uniswap_error_1 = require("../../../common/errors/uniswap-error");
var uniswap_version_1 = require("../../../enums/uniswap-version");
var UniswapPairSettings = /** @class */ (function () {
    function UniswapPairSettings(settings) {
        this.uniswapVersions = [uniswap_version_1.UniswapVersion.v2, uniswap_version_1.UniswapVersion.v3];
        this.gasSettings = undefined;
        this.cloneUniswapContractDetails = undefined;
        this.customNetwork = undefined;
        this.slippage = (settings === null || settings === void 0 ? void 0 : settings.slippage) || 0.005;
        this.deadlineMinutes = (settings === null || settings === void 0 ? void 0 : settings.deadlineMinutes) || 20;
        this.disableMultihops = (settings === null || settings === void 0 ? void 0 : settings.disableMultihops) || false;
        this.gasSettings = settings === null || settings === void 0 ? void 0 : settings.gasSettings;
        this.cloneUniswapContractDetails = settings === null || settings === void 0 ? void 0 : settings.cloneUniswapContractDetails;
        this.customNetwork = settings === null || settings === void 0 ? void 0 : settings.customNetwork;
        if (Array.isArray(settings === null || settings === void 0 ? void 0 : settings.uniswapVersions) &&
            (settings === null || settings === void 0 ? void 0 : settings.uniswapVersions.length) === 0) {
            throw new uniswap_error_1.UniswapError('`uniswapVersions` must not be an empty array', error_codes_1.ErrorCodes.uniswapVersionsMustNotBeAnEmptyArray);
        }
        if (settings &&
            Array.isArray(settings.uniswapVersions) &&
            settings.uniswapVersions.length > 0) {
            if (settings.uniswapVersions.find(function (u) { return u !== uniswap_version_1.UniswapVersion.v2 && u !== uniswap_version_1.UniswapVersion.v3; })) {
                throw new uniswap_error_1.UniswapError('`uniswapVersions` only accepts v2 or v3', error_codes_1.ErrorCodes.uniswapVersionsUnsupported);
            }
            this.uniswapVersions = settings === null || settings === void 0 ? void 0 : settings.uniswapVersions;
        }
    }
    return UniswapPairSettings;
}());
exports.UniswapPairSettings = UniswapPairSettings;
//# sourceMappingURL=uniswap-pair-settings.js.map