"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("../../../config/db/schema");
class UserDb {
    findUsername(username) {
        return schema_1.User.findOne({ where: { username: username } });
    }
    findEmail(email) {
        return schema_1.User.findOne({ where: { email: email } });
    }
    createUser(payload) {
        const { username, email, password } = payload;
        return schema_1.User.create({
            username, email, password
        });
    }
    updateResetToken(reset, userId) {
        return schema_1.User.update({
            resettoken: reset
        }, {
            where: {
                id: userId
            }
        });
    }
    changePassword(newPassword, id) {
        return schema_1.User.update({
            resettoken: null,
            password: newPassword
        }, {
            where: {
                id: id
            }
        });
    }
    findId(userId) {
        return schema_1.User.findOne({ where: { id: userId } });
    }
    updateRefreshTokenHash(id, hash) {
        return schema_1.User.update({
            hashedRt: hash
        }, {
            where: {
                id: id
            }
        });
    }
    updateRefreshTokenToNull(userId) {
        return schema_1.User.update({
            hashedRt: null
        }, {
            where: {
                id: userId
            }
        });
    }
}
exports.default = new UserDb();
