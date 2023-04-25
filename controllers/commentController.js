import StatusCodes from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";
import Comment from "../models/Comment.js";

const getComments = async (req, res) => {
    res.send("get comments");
}

const addComment = async (req, res) => {
    const user_id = req.user.userId;
    req.body.userId = user_id;
    const { commentContent, blogId, userId } = req.body;

    if (!blogId || !userId || !commentContent) {
        throw new BadRequestError("Please provide all values");
    }

    const comment = await Comment.create(req.body);
    res.status(StatusCodes.CREATED).json({ comment });
}

export { getComments, addComment };