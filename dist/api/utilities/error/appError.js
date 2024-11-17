"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class appError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.default = appError;
