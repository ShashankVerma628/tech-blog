import express from "express";
const router = express.Router();
import { getAllBlogs } from "../controllers/homeController.js";

router.get("/home", getAllBlogs);

export default router;