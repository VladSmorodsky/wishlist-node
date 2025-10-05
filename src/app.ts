import express from "express";
import type { Request, Response } from "express";
import morgan from "morgan";
import { authRoutes } from "./routes/auth.routes";
import dotenv from "dotenv";
import { RequestBodyValidationError } from "./errors/request.body.validation.error";
dotenv.config();

const app = express();

app.use(morgan("common", { immediate: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);

app.use((err: Error, _req: Request, res: Response, _next: express.NextFunction) => {
  const statusCode = (typeof (err as any).statusCode === "number") ? (err as any).statusCode : 500;
  if (err instanceof RequestBodyValidationError) {
    console.log(err instanceof RequestBodyValidationError, statusCode);
    return res.status(statusCode).json({ error: err.message, field: err.bodyFieldName });
  }
  res.status(statusCode).json({ message: err.message });
});

export { app };
