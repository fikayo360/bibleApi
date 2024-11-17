"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../utilities/error/index");
const ErrorHandler = (err, req, res, next) => {
    if (err instanceof index_1.BadRequestError) {
        res.status(err.statusCode).json({ msg: err.message });
    }
    else if (err instanceof index_1.ForbidenError) {
        res.status(err.statusCode).json({ msg: err.message });
    }
    else if (err instanceof index_1.InternalServerError) {
        res.status(err.statusCode).json({ msg: err.message });
    }
    else if (err instanceof index_1.unAuthorizedError) {
        res.status(err.statusCode).json({ msg: err.message });
    }
    else {
        res.status(500).send({ msg: "Something went wrong we cant seem to figure it out" });
    }
};
exports.default = ErrorHandler;
