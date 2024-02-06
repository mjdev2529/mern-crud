import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, deleteCredentials, list, updateCredentials } from "../controllers/credentials.controller.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.post("/list", verifyToken, list);
router.post("/delete-credential", verifyToken, deleteCredentials);
router.post("/update-credential", verifyToken, updateCredentials);

export default router;