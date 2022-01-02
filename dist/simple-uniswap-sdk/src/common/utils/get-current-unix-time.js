"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUnixTime = void 0;
var get_unix_time_1 = require("./get-unix-time");
/**
 * Get the current unit time
 */
function getCurrentUnixTime() {
    return (0, get_unix_time_1.getUnixTime)(new Date());
}
exports.getCurrentUnixTime = getCurrentUnixTime;
//# sourceMappingURL=get-current-unix-time.js.map