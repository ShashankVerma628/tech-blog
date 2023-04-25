import express from "express";
const router = express.Router();
import authenticateUser from "../middleware/auth.js";

import { getComments, addComment, getUserComment } from "../controllers/commentController.js";



router.post("/add-comment", authenticateUser, addComment);
router.post("/get-comments/:blogId", getComments);
router.post("/get-user/:commentId", getUserComment);

export default router;