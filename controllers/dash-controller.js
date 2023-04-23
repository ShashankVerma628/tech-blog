import Blog from "../models/Blog.js";
import { BadRequestError } from "../errors/index.js";
import StatusCodes from "http-status-codes";

// get => /dashboard {to get all blogs of a particular user}
const getAllBlogs = async (req, res) => {
    const blogs = await Blog.find({ createdBy: req.user.userId });
    res.status(StatusCodes.OK).json({ count: blogs?.length, blogs });
}

//  post => /dashboard {to create a blog by a userF}
const createBlog = async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        throw new BadRequestError("Please provide all values");
    }

    req.body.createdBy = req.user.userId;

    const blog = await Blog.create(req.body);

    res.status(StatusCodes.CREATED).json({ blog });
}

export { getAllBlogs, createBlog };