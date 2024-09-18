import { PostgresqlDatabase } from "./infrastructure/postgresql/sequelize/Sequelize.js";
import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./web-api/routes/router.js";
import { DatabaseContext } from "./infrastructure/dbContext.ts/index.js";
import cookieParser from "cookie-parser";
import { logger } from "./infrastructure/logger/index.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { swaggerOptions } from "./web-api/swagger.js";
import { Redis } from "./infrastructure/redis/index.js";

const app: Application = express();
const db = new DatabaseContext(PostgresqlDatabase);
dotenv.config();
const PORT = process.env.PORT || 5000;

// const corsOptions = {
//   origin: process.env.CLIENT_URL,
// };

// app.use(cors(corsOptions));

export const redis = Redis.getInstance();
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use("/api", router);

const start = async () => {
  try {
    await db.connect().catch((error: Error) => {
      logger.error("Connect to database error", error);
    });
    await redis.connect();
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Start application error", error);
  }
};

start();
