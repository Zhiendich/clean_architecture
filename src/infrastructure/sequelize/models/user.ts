import { Model, DataTypes } from 'sequelize';
import { User } from '../../../domain/entities/user.js';
import { PostgresqlDatabase } from '../postgresql.js';

const sequelize = PostgresqlDatabase.getInstance();

class UserModal extends Model<User> {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
}

UserModal.init(
  {
    id: {
      allowNull: false,
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
    isOtpVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isTwoFactorEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    activationLink: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'users',
    // indexes: [
    //   {
    //     unique: true,
    //     fields: ['email'],
    //   },
    // ],
  },
);

export default UserModal;
