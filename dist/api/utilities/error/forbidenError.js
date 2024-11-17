"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ForbidenError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 403;
    }
}
exports.default = ForbidenError;
