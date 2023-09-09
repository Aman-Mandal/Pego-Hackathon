import express from "express";
import {
  postJobHandler,
  getJobHandler,
  getTimeBasedJobByUser,
} from "../controllers/timeBasedJob.js";
import { getAllDetailedJobs } from "../controllers/allJobs.js";
import { postCustomJobHandler } from "../controllers/customJob.js";

const router = express.Router();

router.get("/job/timebased/:id", getJobHandler);
router.post("/job/timebased", postJobHandler);
router.get("/user/job/:userAddress", getAllDetailedJobs);
router.get("/user/timebasedjobs/:userAddress", getTimeBasedJobByUser);
router.post("/job/custom", postCustomJobHandler);

export default router;
