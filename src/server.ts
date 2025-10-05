import { dbConnect } from "./config/database";
import { app } from "./app";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "";

dbConnect(MONGODB_URI)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(8089, (): void =>
      console.log("Server is listening to http://localhost:8089"),
    );
  })
  .catch((error) => {
    console.error(error);
  });
