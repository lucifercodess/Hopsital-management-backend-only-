import express from "express";
import { getAllMessages, sendMessage } from "../controllers/message.controller.js";
import { isAdminAuthenticated } from '../middleware/protectRoute.middleware.js'
const router = express.Router();

router.post("/send", sendMessage);
router.get("/",isAdminAuthenticated, getAllMessages);

export default router;
