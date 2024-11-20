"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const sequelizeOrm_1 = __importDefault(require("../config/db/orm/sequelizeOrm"));
const authRoute_1 = __importDefault(require("../api/entities/auth/authRoute"));
const schema_1 = require("../config/db/schema");
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
dotenv_1.default.config();
sequelizeOrm_1.default
    .authenticate()
    .then(() => {
    console.log('Connection successful!');
    console.log({ User: schema_1.User, Quiz: schema_1.Quiz, Chapters: schema_1.Chapters, BriefSum: schema_1.BriefSum });
})
    .catch((error) => {
    console.log('Connection failed:', error);
});
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(errorHandler_1.default);
app.use('/api/v1/auth', authRoute_1.default);
app.get('/ping', (req, res) => {
    res.status(200).json('pong');
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
