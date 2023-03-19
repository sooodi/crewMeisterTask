import express from "express";

import {
  createAbsence,
  deleteAbsence,
  getAbsences,
} from "../controllers/absence.js";

const router = express.Router();

router.post("/", createAbsence);
router.get("/", getAbsences);
router.delete("/:startdate", deleteAbsence);
export default router;
