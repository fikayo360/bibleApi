"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class unAuthorizedError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 401;
    }
}
exports.default = unAuthorizedError;
