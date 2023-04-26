import Blog from "../models/Blog.js";
import StatusCodes from "http-status-codes";
import User from "../models/User.js";

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

export { getBlog, blogUser, getAllBlogs };