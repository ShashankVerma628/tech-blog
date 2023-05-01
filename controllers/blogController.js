import Comment from "../models/Comment.js";
import Blog from "../models/Blog.js";
import StatusCodes from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";

import checkPermissions from "../utils/checkPermissions.js";
import NotFoundError from "../errors/not-found.js";

const getAllBlogs = async (req, res) => {
    const blogs = await Blog.find();
    res.status(StatusCodes.OK).json({ blogs });
}

const getBlog = async (req, res) => {
    const blogId = req.params.id;
    const blog = await Blog.find({ _id: blogId });
    res.status(StatusCodes.OK).json({ blog });
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
    req.body.username = req.user.username;

    const blog = await Blog.create(req.body);

    res.status(StatusCodes.CREATED).json({ blog });
}

const editBlog = async (req, res) => {
    const { id } = req.params;

    let blog = await Blog.findById(id);

    if (!blog) {
        throw new NotFoundError(`Could not find the blog with id :  ${id}`);
    }

    checkPermissions(req.user, blog?.createdBy);

    blog = await Blog.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(StatusCodes.OK).json({ blog });
}

const deleteBlog = async (req, res) => {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
        throw new NotFoundError(`Could not find the blog with id : ${id}`);
    }

    checkPermissions(req.user, blog.createdBy);

    await Blog.findByIdAndDelete(id);

    await Comment.deleteMany({ userId: req.user.userId });

    res.status(StatusCodes.OK).json({ msg: "Blog and its related comments has been deleted" });
}

export { getBlog, getAllBlogs, getBlogs, editBlog, createBlog, deleteBlog };