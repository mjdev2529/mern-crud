import express from "express";
import { update } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/update-user", update);

export default router;