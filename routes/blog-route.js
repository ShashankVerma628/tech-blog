import express from "express";
const router = express.Router();
import { getBlog } from "../controllers/blogController.js";


router.post("/:id", getBlog);

export default router;