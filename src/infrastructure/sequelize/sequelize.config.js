import "ts-node/register";
import dotenv from "dotenv";

dotenv.config();

export default {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST || "localhost",
  dialect: "postgres",
  port: Number(process.env.DB_PORT) || 5432,
};
