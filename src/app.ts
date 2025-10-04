import express from "express";
import type { Request, Response } from "express";
import morgan from "morgan";
import { authRoutes } from "./routes/auth.routes";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(morgan("common", { immediate: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);

app.get("/", (req: Request, res: Response): void => {
  // console.log("Received request to /");
  res.send("Hello Client");
});

export { app };


