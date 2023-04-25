import express from "express";
const router = express.Router();
import authenticateUser from "../middleware/auth.js";

import { getComments, addComment } from "../controllers/commentController.js";



router.post("/add-comment", authenticateUser, addComment);
router.post("/get-comments/:blogId", getComments);

export default router;