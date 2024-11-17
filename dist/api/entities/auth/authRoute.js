"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = __importDefault(require("./authControllers"));
const router = express_1.default.Router();
const user = authControllers_1.default;
router.route("/signup").post(user.signUp);
router.route("/signin").post(user.login);
exports.default = router;
