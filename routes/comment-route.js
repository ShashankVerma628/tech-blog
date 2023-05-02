import express from "express";
const router = express.Router();
import authenticateUser from "../middleware/auth.js";

import { getComments, addComment, deleteComment, editComment } from "../controllers/commentController.js";


// get the comments of a blog
router.get("/:blogId", getComments);

// add the comment by a authenticated user
router.post("/", authenticateUser, addComment);

// edit the comment by a authenticated user
router.patch("/:id", authenticateUser, editComment);

// delete the comment by a authenticated user
router.delete("/:id", authenticateUser, deleteComment);

export default router;