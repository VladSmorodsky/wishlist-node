import express from "express";
import type { Request, Response } from "express";
import { authRoutes } from "./auth/auth.routes";
import morgan from "morgan";

const app = express();

app.use(morgan("common", { immediate: true }));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response): void => {
  console.log("Received request to /");
  res.send("Hello Client");
});

app.use("/auth", authRoutes);

app.listen(8089, (): void =>
  console.log("Server is listening to http://localhost:8089"),
);
