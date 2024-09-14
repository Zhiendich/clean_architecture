import { User } from "../../../domain/entities/user.js";
import { PostgresqlDatabase } from "../sequelize/Sequelize.js";
import { DataTypes, Model, ModelStatic } from "sequelize";
import UserModal from "./User.js";

const sequelize = PostgresqlDatabase.getInstance();

const JwtModal: ModelStatic<Model<{ userId: number; refreshToken: string }>> =
  sequelize.define("token", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModal,
        key: "id",
      },
    },
    refreshToken: {
      type: DataTypes.STRING(550),
      allowNull: false,
    },
  });

JwtModal.belongsTo(UserModal, { foreignKey: "userId" });

export default JwtModal;
