import express from "express";
const router = express.Router();
import { getBlog, blogUser } from "../controllers/blogController.js";


router.post("/:id", getBlog);
router.post("/user/:id", blogUser);

export default router;