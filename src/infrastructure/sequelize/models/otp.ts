import { Model, DataTypes } from "sequelize";
import { PostgresqlDatabase } from "../postgresql.js";
import UserModal from "./user.js";

const sequelize = PostgresqlDatabase.getInstance();

class OTPModal extends Model<{
  userId: number;
  otpToken: string;
  id?: number;
}> {
  public userId!: number;
  public refreshToken!: string;
}

OTPModal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModal,
        key: "id",
      },
    },
    otpToken: {
      type: DataTypes.STRING(550),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "otps",
  }
);

OTPModal.belongsTo(UserModal, { foreignKey: "userId" });

export default OTPModal;
