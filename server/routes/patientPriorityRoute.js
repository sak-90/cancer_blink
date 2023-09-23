import express from "express"
import Priority from "../controllers/patientPriority.js";

const router = express.Router();

router.get('/', Priority.getPriority);
router.post('/', Priority.postPriority);

export default router;