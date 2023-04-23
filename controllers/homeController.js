import Blog from "../models/Blog.js";
import StatusCodes from "http-status-codes";

const getAllBlogs = async (req, res) => {
    const blogs = await Blog.find();
    res.status(StatusCodes.OK).json({ blogs });
}

export { getAllBlogs };