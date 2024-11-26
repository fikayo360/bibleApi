"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelizeOrm_1 = __importDefault(require("../../../config/db/orm/sequelizeOrm"));
const User = sequelizeOrm_1.default.define('User', {
    username: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    email: { type: sequelize_1.DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
    password: { type: sequelize_1.DataTypes.STRING, allowNull: false }
});
User.sync().then(() => {
    console.log(`user model synced succesfully`);
});
exports.default = User;
