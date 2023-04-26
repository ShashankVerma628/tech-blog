import Blog from "../models/Blog.js";
import StatusCodes from "http-status-codes";
import User from "../models/User.js";
import BadRequestError from "../errors/bad-request.js";

const getAllBlogs = async (req, res) => {
    const blogs = await Blog.find();
    res.status(StatusCodes.OK).json({ blogs });
}

const getBlog = async (req, res) => {
    const blogId = req.params.id;
    const blog = await Blog.find({ _id: blogId });
    res.status(StatusCodes.OK).json({ blog });
}

const blogUser = async (req, res) => {
    const blogId = req.params.id;
    let blog = await Blog.find({ _id: blogId });

    blog = blog[0];

    const createdBy = blog.createdBy;

    // console.log(typeof createdBy);
    const user = await User.findOne({ _id: createdBy });
    const { username } = user;
    res.status(StatusCodes.OK).json({ username });
}

// get => /dashboard {to get all blogs of a particular user}
const getBlogs = async (req, res) => {
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

export { getBlog, blogUser, getAllBlogs, getBlogs, createBlog };