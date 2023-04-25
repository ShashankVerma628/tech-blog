import StatusCodes from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";

const getComments = async (req, res) => {
    const { blogId } = req.params;
    const comments = await Comment.find({ blogId });

    res.status(StatusCodes.OK).json({ comments, count: comments.length });
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

const getUserComment = async (req, res) => {
    const { commentId } = req.params;
    let comment = await Comment.findOne({ _id: commentId });

    const userId = comment.userId;

    const { username } = await User.findOne({ _id: userId });
    res.status(StatusCodes.OK).json({ username });
}

export { getComments, addComment, getUserComment };