import { PostgresqlDatabase } from "./infrastructure/postgresql/sequelize/Sequelize.js";
import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./web-api/routes/router.js";
import { DatabaseContext } from "./infrastructure/dbContext.ts/context.js";

const app: Application = express();
const db = new DatabaseContext(PostgresqlDatabase);
dotenv.config();

// const corsOptions = {
//   origin: process.env.CLIENT_URL,
// };

// app.use(cors(corsOptions));

app.use(express.json());
app.use(cors());
app.use("/api", router);
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await db.connect().catch((error: Error) => {
      console.log("Failed to connect to database", error);
    });
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
