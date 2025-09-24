import express from "express";
import type { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response): void => {
  res.send("Hello Client");
});

app.listen(8080, (): void =>
  console.log("Server is listening to http://localhost:8080"),
);
