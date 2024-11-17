"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authDB_1 = __importDefault(require("../auth/authDB"));
const auth = authDB_1.default;
class authService {
    userExists(username, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield auth.findUsername(username);
            const emailExists = yield auth.findEmail(email);
            if (userExists && emailExists) {
                return true;
            }
            return false;
        });
    }
    hashPassword(password, salt) {
        const hashedPassword = bcrypt.hashSync(password, salt);
        return hashedPassword;
    }
    createUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            auth.createUser(payload);
            return this.getTokens(payload.email, payload.username);
        });
    }
    getTokens(username, email) {
        const jwtPayload = {
            username,
            email
        };
        const at = jsonwebtoken_1.default.sign(jwtPayload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFETIME
        });
        return at;
    }
    findUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return auth.findUsername(username);
        });
    }
    findEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return auth.findEmail(email);
        });
    }
    comparePasswords(current, old) {
        return bcrypt.compareSync(current, old);
    }
    compareRt(current, old) {
        return current === old;
    }
    updateToken(reset, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return auth.updateResetToken(reset, userId);
        });
    }
    changePassword(newPassword, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return auth.changePassword(newPassword, id);
        });
    }
    findId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return auth.findId(id);
        });
    }
}
exports.default = new authService();
