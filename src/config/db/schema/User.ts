import { DataTypes } from "sequelize"
import sequelizee from "../../../config/db/orm/sequelizeOrm";

const User = sequelizee.define('User', {
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
    password: { type: DataTypes.STRING, allowNull: false } 
  });

User.sync().then(() => {
    console.log(`user model synced succesfully`);
})

export default User