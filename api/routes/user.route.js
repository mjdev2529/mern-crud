import express from "express";
import { update, deleteUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/update-user", verifyToken, update);
router.post("/delete-user", verifyToken, deleteUser);

export default router;