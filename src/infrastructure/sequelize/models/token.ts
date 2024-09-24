import { Model, DataTypes } from "sequelize";
import { PostgresqlDatabase } from "../postgresql.js";
import UserModal from "./user.js";

const sequelize = PostgresqlDatabase.getInstance();

class JwtModal extends Model<{
  userId: number;
  refreshToken: string;
  id?: number;
}> {
  public userId!: number;
  public refreshToken!: string;
}

JwtModal.init(
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
    refreshToken: {
      type: DataTypes.STRING(550),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "tokens",
  }
);

JwtModal.belongsTo(UserModal, { foreignKey: "userId" });

export default JwtModal;
