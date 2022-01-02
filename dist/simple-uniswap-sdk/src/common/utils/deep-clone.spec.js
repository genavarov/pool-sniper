"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var deep_clone_1 = require("./deep-clone");
describe('deepClone', function () {
    it('should deepClone correctly', function () {
        var fooContext = { foo: true };
        var result = (0, deep_clone_1.deepClone)(fooContext);
        result.foo = false;
        expect(result.foo).not.toEqual(fooContext.foo);
    });
});
//# sourceMappingURL=deep-clone.spec.js.map