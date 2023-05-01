import express from "express";
const router = express.Router();
import authenticateUser from "../middleware/auth.js";

import { getComments, addComment } from "../controllers/commentController.js";


// get the comments of a blog
router.get("/:blogId", getComments);

// add the comment by a authenticated user
router.post("/", authenticateUser, addComment);

export default router;