"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../utilities/error/index");
const ErrorHandler = (err, req, res, next) => {
    if (err instanceof index_1.BadRequestError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    else if (err instanceof index_1.ForbidenError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    else if (err instanceof index_1.InternalServerError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    else if (err instanceof index_1.unAuthorizedError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    else {
        return res.status(500).send({ msg: "Something went wrong we cant seem to figure it out" });
    }
};
exports.default = ErrorHandler;
