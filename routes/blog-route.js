import express from "express";
const router = express.Router();
import authenticateUser from "../middleware/auth.js";
import { getBlog, blogUser, getAllBlogs, getBlogs, createBlog } from "../controllers/blogController.js";


// to get all blogs (especially for homepage)
router.get("/", getAllBlogs);

// to get a particular blog
router.get("/:id", getBlog);

// to get user of a blog
router.get("/user/:id", blogUser);

// route to get the blogs related to a particular user
router.post("/userBlogs", authenticateUser, getBlogs);

// to create a blog by a authenticated user
router.post("/add-blog", authenticateUser, createBlog);


export default router;