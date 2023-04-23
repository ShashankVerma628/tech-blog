import express from "express";
const router = express.Router();
import { getAllBlogs, createBlog } from "../controllers/dash-controller.js";

router.route("/").get(getAllBlogs).post(createBlog);

export default router;