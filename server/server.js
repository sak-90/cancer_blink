import express from "express";
import cors from "cors";
import dotenv from "dotenv";
const app = express();
const PORT = 5002 || process.env.PORT;
import patientPriorityRoute from "./routes/patientPriorityRoute.js";
import connect from "./config/database.js";

dotenv.config();
await connect();

app.use(express.json());
app.use(cors());

app.use("/patient-priority", patientPriorityRoute);

app.listen(PORT, () => {
  console.log(`Server working on port ${PORT}`);
});
