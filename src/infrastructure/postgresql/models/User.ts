import { User } from "../../../domain/entities/user.js";
import { PostgresqlDatabase } from "../sequelize/Sequelize.js";
import { DataTypes, Model, ModelStatic } from "sequelize";

const sequelize = PostgresqlDatabase.getInstance();

const UserModal: ModelStatic<Model<User>> = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default UserModal;
