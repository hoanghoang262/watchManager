import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import watchRoutes from "./routes/watchRoutes.js";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import { connectDB, getConnection } from "./db.js";

// Create an Express App
const app = express();
const port = PORT;

// Basic Route
app.get("/", (req, res) => {
  res.send("Hello from my Express server!");
});

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
connectDB();

// Basic Route
app.get("/", (req, res) => {
  res.send("Hello from my Express server!");
});

// Routes
app.use("/auth", authRoutes);
app.use("/brands", brandRoutes);
app.use("/members", memberRoutes);
app.use("/watches", watchRoutes);

// Start the Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
