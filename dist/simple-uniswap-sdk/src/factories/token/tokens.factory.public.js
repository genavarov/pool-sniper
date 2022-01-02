"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensFactoryPublic = void 0;
var ethers_provider_1 = require("../../ethers-provider");
var tokens_factory_1 = require("./tokens.factory");
var TokensFactoryPublic = /** @class */ (function (_super) {
    __extends(TokensFactoryPublic, _super);
    function TokensFactoryPublic(providerContext) {
        return _super.call(this, new ethers_provider_1.EthersProvider(providerContext)) || this;
    }
    return TokensFactoryPublic;
}(tokens_factory_1.TokensFactory));
exports.TokensFactoryPublic = TokensFactoryPublic;
//# sourceMappingURL=tokens.factory.public.js.map