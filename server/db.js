import mongoose from "mongoose";
import { MONGO_DB } from "./config.js";

try {
  // mongoose.set("strictQuery", false) // a warning of old version in console
  const conn = await mongoose.connect(MONGO_DB);
  console.log(
    `MongoDB connected on ${conn.connection.name}`
  );
} catch (error) {
  console.error(error);
}
