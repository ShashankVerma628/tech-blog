import express from "express";
const router = express.Router();
import authenticateUser from "../middleware/auth.js";

import { getComments, addComment, getUserComment } from "../controllers/commentController.js";


// get the comments of a blog
router.get("/:blogId", getComments);

// get the user of a comment
router.get("/get-user/:commentId", getUserComment);

// add the comment by a authenticated user
router.post("/", authenticateUser, addComment);

export default router;