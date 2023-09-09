import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cron from "node-cron";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(bodyParser.json());

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

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Some error occured!";

  res.status(statusCode).json({ error: error, message: message });
});

const startServer = () => {
  app.listen(8000, console.log("Server started"));
};

connectToDataBase();
