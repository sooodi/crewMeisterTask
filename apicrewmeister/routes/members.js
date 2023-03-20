import express from "express";
import { createMember, getMembers } from "../controllers/member.js";

const router = express.Router();

//CREATE
router.post("/", createMember);

//GET ALL
router.get("/", getMembers);

export default router;
