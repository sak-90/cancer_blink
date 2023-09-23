import mongoose from "mongoose";
const patientPrioritySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cancerPercentage: {
    type: Number,
    required: true,
  },
});
const patientPriorityModel = mongoose.model(
  "patientPriorityModel",
  patientPrioritySchema
);
export default patientPriorityModel;
