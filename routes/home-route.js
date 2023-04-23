import express from "express";
const router = express.Router();
import { getAllBlogs } from "../controllers/homeController.js";

router.get("/", getAllBlogs);

export default router;