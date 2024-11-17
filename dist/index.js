"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const sequelizeOrm_1 = __importDefault(require("./config/db/orm/sequelizeOrm"));
dotenv_1.default.config();
sequelizeOrm_1.default
    .authenticate()
    .then(() => {
    console.log('Connection successful!');
})
    .catch((error) => {
    console.log('Connection failed:', error);
});
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
