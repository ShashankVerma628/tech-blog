import Blog from "../models/Blog.js";
import StatusCodes from "http-status-codes";

const getBlog = async (req, res) => {
    const blogId = req.params.id;
    const blog = await Blog.find({ _id: blogId });
    res.status(StatusCodes.OK).json({ blog });
}

export { getBlog };