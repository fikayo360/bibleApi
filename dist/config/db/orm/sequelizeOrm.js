"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelizee = new sequelize_1.Sequelize('postgresql://fikayo:Mdz7Q3yjzYhvDIuGBExrswOvuunpVmDe@dpg-cshm5kjtq21c73ei3f7g-a.oregon-postgres.render.com/bible_buddy', {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
        },
    },
    logging: false,
});
exports.default = sequelizee;
