import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

const uri = MONGODB_URI;

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log("Already connected to MongoDB Atlas");
    return;
  }

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas", err);
  }
};

export const getConnection = () => {
  if (!isConnected) {
    throw new Error("Database is not connected");
  }
  return mongoose.connection;
};
