import express from "express";
import { createSchemaHandler } from "../controllers/schemaController.js";

const router = express.Router();

router.get("/createschema", createSchemaHandler);

export default router;
