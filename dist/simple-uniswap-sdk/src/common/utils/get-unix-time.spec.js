"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_unix_time_1 = require("./get-unix-time");
describe('getUnixTime', function () {
    it('should getUnixTime correctly', function () {
        var result = (0, get_unix_time_1.getUnixTime)(new Date('2015-03-25'));
        expect(result).toEqual(1427241600);
    });
});
//# sourceMappingURL=get-unix-time.spec.js.map