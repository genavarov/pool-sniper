"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chain_id_1 = require("../../enums/chain-id");
var trade_path_1 = require("../../enums/trade-path");
var fun_token_mock_1 = require("../../mocks/fun-token.mock");
var rep_token_mock_1 = require("../../mocks/rep-token.mock");
var tokens_1 = require("../tokens");
var trade_path_2 = require("./trade-path");
describe('getTradePath', function () {
    it('should return `TradePath.ethToErc20`', function () {
        var result = (0, trade_path_2.getTradePath)(chain_id_1.ChainId.MAINNET, tokens_1.ETH.MAINNET(), (0, fun_token_mock_1.MOCKFUN)());
        expect(result).toEqual(trade_path_1.TradePath.ethToErc20);
    });
    it('should return `TradePath.erc20ToEth`', function () {
        var result = (0, trade_path_2.getTradePath)(chain_id_1.ChainId.MAINNET, (0, fun_token_mock_1.MOCKFUN)(), tokens_1.ETH.MAINNET());
        expect(result).toEqual(trade_path_1.TradePath.erc20ToEth);
    });
    it('should return `TradePath.erc20ToErc20`', function () {
        var result = (0, trade_path_2.getTradePath)(chain_id_1.ChainId.MAINNET, tokens_1.WETHContract.MAINNET(), (0, fun_token_mock_1.MOCKFUN)());
        expect(result).toEqual(trade_path_1.TradePath.erc20ToErc20);
    });
    it('should return `TradePath.erc20ToErc20`', function () {
        var result = (0, trade_path_2.getTradePath)(chain_id_1.ChainId.MAINNET, (0, fun_token_mock_1.MOCKFUN)(), tokens_1.WETHContract.MAINNET());
        expect(result).toEqual(trade_path_1.TradePath.erc20ToErc20);
    });
    it('should return `TradePath.erc20ToErc20`', function () {
        var result = (0, trade_path_2.getTradePath)(chain_id_1.ChainId.MAINNET, (0, fun_token_mock_1.MOCKFUN)(), (0, rep_token_mock_1.MOCKREP)());
        expect(result).toEqual(trade_path_1.TradePath.erc20ToErc20);
    });
});
//# sourceMappingURL=trade-path.spec.js.map