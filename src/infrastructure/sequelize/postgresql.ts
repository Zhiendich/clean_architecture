import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();
export class PostgresqlDatabase {
  private static instance: Sequelize;
  private constructor() {}

  public static getInstance(): Sequelize {
    if (!PostgresqlDatabase.instance) {
      PostgresqlDatabase.instance = new Sequelize({
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 5432,
        dialect: "postgres",
        define: {
          timestamps: false,
        },
      });
    }

    return PostgresqlDatabase.instance;
  }

  public static async authenticate(): Promise<void> {
    try {
      await PostgresqlDatabase.getInstance().authenticate();
      await PostgresqlDatabase.getInstance().sync();
      console.log(
        "Connection to the database has been established successfully."
      );
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      throw error;
    }
  }
}
