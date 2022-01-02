"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uniswap_version_1 = require("../../../enums/uniswap-version");
var uniswap_pair_settings_1 = require("./uniswap-pair-settings");
describe('UniswapPairSettings', function () {
    describe('slippage', function () {
        it('should set the correct default if not passed in', function () {
            var uniswapPairSettings = new uniswap_pair_settings_1.UniswapPairSettings();
            expect(uniswapPairSettings.slippage).toEqual(0.005);
        });
        it('should set the slippage', function () {
            var uniswapPairSettings = new uniswap_pair_settings_1.UniswapPairSettings({ slippage: 0.1 });
            expect(uniswapPairSettings.slippage).toEqual(0.1);
        });
    });
    describe('deadlineMinutes', function () {
        it('should set the correct default if not passed in', function () {
            var uniswapPairSettings = new uniswap_pair_settings_1.UniswapPairSettings();
            expect(uniswapPairSettings.deadlineMinutes).toEqual(20);
        });
        it('should set the value', function () {
            var uniswapPairSettings = new uniswap_pair_settings_1.UniswapPairSettings({
                deadlineMinutes: 60,
            });
            expect(uniswapPairSettings.deadlineMinutes).toEqual(60);
        });
    });
    describe('disableMultihops', function () {
        it('should set the correct default if not passed in', function () {
            var uniswapPairSettings = new uniswap_pair_settings_1.UniswapPairSettings();
            expect(uniswapPairSettings.disableMultihops).toEqual(false);
        });
        it('should set the value', function () {
            var uniswapPairSettings = new uniswap_pair_settings_1.UniswapPairSettings({
                disableMultihops: true,
            });
            expect(uniswapPairSettings.disableMultihops).toEqual(true);
        });
    });
    describe('uniswapVersions', function () {
        it('should set the correct default if not passed in', function () {
            var uniswapPairSettings = new uniswap_pair_settings_1.UniswapPairSettings();
            expect(uniswapPairSettings.uniswapVersions).toEqual([
                uniswap_version_1.UniswapVersion.v2,
                uniswap_version_1.UniswapVersion.v3,
            ]);
        });
        it('should set the value', function () {
            var uniswapPairSettings = new uniswap_pair_settings_1.UniswapPairSettings({
                uniswapVersions: [uniswap_version_1.UniswapVersion.v2],
            });
            expect(uniswapPairSettings.uniswapVersions).toEqual([uniswap_version_1.UniswapVersion.v2]);
        });
        it('should ignore it if you pass in a none array', function () {
            var uniswapPairSettings = new uniswap_pair_settings_1.UniswapPairSettings({
                uniswapVersions: '',
            });
            expect(uniswapPairSettings.uniswapVersions).toEqual([
                uniswap_version_1.UniswapVersion.v2,
                uniswap_version_1.UniswapVersion.v3,
            ]);
        });
        it('should throw if empty array is passed in', function () {
            expect(function () {
                new uniswap_pair_settings_1.UniswapPairSettings({
                    uniswapVersions: [],
                });
            }).toThrowError('`uniswapVersions` must not be an empty array');
        });
        it('should throw if empty array is passed in', function () {
            expect(function () {
                new uniswap_pair_settings_1.UniswapPairSettings({
                    uniswapVersions: ['bobob'],
                });
            }).toThrowError('`uniswapVersions` only accepts v2 or v3');
        });
    });
});
//# sourceMappingURL=uniswap-pair-settings.spec.js.map