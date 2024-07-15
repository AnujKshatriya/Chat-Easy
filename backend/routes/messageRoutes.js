import express from "express"
import { getAuthenticatedUser } from "../middlewares/getAuthenticatedUser.js";
import { getMessage, sendMessage } from "../controllers/messageController.js";

const router = express.Router();

router.post('/send/:id', getAuthenticatedUser, sendMessage)

router.get('/:id', getAuthenticatedUser, getMessage)

export default router