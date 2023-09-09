import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cron from "node-cron";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import jobRoutes from "./routes/Jobs.js";
import schemaRoutes from "./routes/Schema.js";
import Job from "./models/Job.js";
import { executeScheduledJobs, executeCustomJobs } from "./helpers/Jobs.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(jobRoutes);
app.use(schemaRoutes);

const connectToDataBase = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("MongoDB Connected!");
      startServer();
    })
    .catch((err) => console.log(err));
};

const closeDatabaseConnection = async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed");
};

const connectToDataBaseCron = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected!");
  } catch (err) {
    console.log(err);
  }
};

cron.schedule("* * * * *", async () => {
  await connectToDataBaseCron();

  const jobIdArray = await Job.find({});
  await executeScheduledJobs(jobIdArray);
  await executeCustomJobs(jobIdArray);

  // closeDatabaseConnection();
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Some error occured!";

  res.status(statusCode).json({ error: error, message: message });
});

const startServer = () => {
  app.listen(8000, console.log("Server started"));
};

connectToDataBase();

///need to create schema again since you just added ABI
