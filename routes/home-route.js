import express from "express";
const router = express.Router();
import { getAllBlogs } from "../controllers/homeController.js";


router.post("/get-blogs", getAllBlogs);


router.post("/post-blogs", async (req, res) => {
    res.send("post request from home router");
})

export default router;