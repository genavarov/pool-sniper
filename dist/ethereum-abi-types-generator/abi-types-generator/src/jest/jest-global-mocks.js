"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("../common/logger");
var logger_mock_1 = require("../common/mocks/logger.mock");
// mock any global stuff in here
logger_1.Logger.error = logger_mock_1.loggerMock.error;
logger_1.Logger.log = logger_mock_1.loggerMock.log;
//# sourceMappingURL=jest-global-mocks.js.map