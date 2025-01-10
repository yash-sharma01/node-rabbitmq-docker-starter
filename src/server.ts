import "dotenv/config";

import compression from "compression";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";

import { errorHandler } from "./middlewares/error-handler";
import routes from "./routes";
import logger from "./utils/logger";
import rabbitMQHandler from "./jobs/rabbitmqHandler";
import { connectToMongoDB } from "./utils/db";

const app: Express = express();

const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("combined", { stream: logger.stream }));

app.get("/", (req: Request, res: Response) => {
  res.send("Server is up and running 🚀");
});

app.use("/api/v1", routes);

app.use(errorHandler);

app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err);
  res.status(500).send("Something went wrong!");
});

async function startServer() {
  try {
    await connectToMongoDB();

    await rabbitMQHandler.initialize();

    rabbitMQHandler.startConsuming();

    app.listen(PORT, () => {
      console.log(`Server is up on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

startServer();
