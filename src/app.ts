import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./web-api/routes/router.js";
import { DatabaseContext } from "./infrastructure/dbContext/index.js";
import cookieParser from "cookie-parser";
import { logger } from "./infrastructure/logger/index.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { swaggerOptions } from "./web-api/swagger.js";
import { DIContainer } from "./infrastructure/DIContainer.js";
import { PostgresqlDatabase } from "./infrastructure/sequelize/postgresql.js";
import helmet from "helmet";
import compression from "compression";
import path from "path";

dotenv.config();

const app: Application = express();
const db = new DatabaseContext(PostgresqlDatabase);

const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: process.env.CLIENT_URL,
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api", router);

const start = async () => {
  try {
    await db.connect().catch((error: Error) => {
      logger.error("Connect to database error", error);
    });
    await DIContainer.getRedisRepository().connect();
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Start application error", error);
  }
};

start();
