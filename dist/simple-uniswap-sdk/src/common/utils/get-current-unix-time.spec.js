"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_current_unix_time_1 = require("./get-current-unix-time");
describe('getCurrentUnixTime', function () {
    it('should getCurrentUnixTime correctly', function () {
        var result = (0, get_current_unix_time_1.getCurrentUnixTime)();
        expect(typeof result).toEqual('number');
    });
});
//# sourceMappingURL=get-current-unix-time.spec.js.map