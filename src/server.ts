import compression from "compression";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";

import { errorHandler } from "./middlewares/error-handler.middleware";
import routes from "./routes";
import logger from "./utils/logger";
import publisher from "./jobs/publisher";
import { connectToMongoDB } from "./utils/db";
import APIResponse from "./utils/response";
import { env } from "./config/env";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // Specify your frontend origin
    credentials: true, // Allow credentials
  })
);
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
  APIResponse.genericResponse(res, "Something went wrong!", 500, null);
});

async function startServer() {
  try {
    await connectToMongoDB();

    await publisher.initialize();

    publisher.startConsuming();

    app.listen(env.PORT, () => {
      console.log(`Server is up on port: ${env.PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

startServer();
