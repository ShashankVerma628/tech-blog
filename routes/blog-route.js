import express from "express";
const router = express.Router();
import { getBlog, blogUser, getAllBlogs } from "../controllers/blogController.js";


router.get("/", getAllBlogs);
router.get("/:id", getBlog);
router.get("/user/:id", blogUser);

export default router;