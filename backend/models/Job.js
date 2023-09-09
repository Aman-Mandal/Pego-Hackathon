import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema({
  jobType: {
    type: String,
    required: true,
  },
  polybaseId: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Job", jobSchema);
