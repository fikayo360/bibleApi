"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tryCatch_1 = __importDefault(require("../../utilities/tryCatch"));
const index_1 = require("../auth/validations/index");
const uuid_1 = require("uuid");
const index_2 = require("../../utilities/error/index");
const authServices_1 = __importDefault(require("./authServices"));
const auth = authServices_1.default;
class authController {
    constructor() {
        this.signUp = (0, tryCatch_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('hi');
            const userId = (0, uuid_1.v4)();
            const validationResult = index_1.signUpSchema.validate(req.body);
            if (validationResult.error) {
                throw new index_2.BadRequestError(validationResult.error.details[0].message);
            }
            const { email, username, password } = validationResult.value;
            const isExisting = yield auth.findEmail(email);
            if (isExisting) {
                throw new index_2.BadRequestError('User already exists');
            }
            const hashPassword = auth.hashPassword(password, 10);
            const user = { id: userId, email, username, password: hashPassword };
            const tokens = yield auth.createUser(user);
            let accesstoken = tokens;
            return res.status(201).json({ msg: 'user created successfully', accesstoken });
        }));
        this.login = (0, tryCatch_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const validationResult = index_1.loginSchema.validate(req.body);
            if (validationResult.error) {
                throw new index_2.BadRequestError(validationResult.error.details[0].message);
            }
            const { username, password } = validationResult.value;
            const foundUser = yield auth.findUsername(username);
            if (!foundUser) {
                throw new index_2.BadRequestError('that user does not exist');
            }
            const currentPassword = foundUser.password;
            if (!auth.comparePasswords(password, currentPassword)) {
                throw new index_2.BadRequestError('wrong password');
            }
            const { password: foundUserPassword } = foundUser, others = __rest(foundUser, ["password"]);
            const userRest = others;
            const token = auth.getTokens(userRest.username, userRest.email);
            return res.status(200).json(token);
        }));
    }
}
exports.default = new authController();
