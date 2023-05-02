import StatusCodes from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";
import Comment from "../models/Comment.js";
import checkPermissions from "../utils/checkPermissions.js";
import NotFoundError from "../errors/not-found.js";

const getComments = async (req, res) => {
    const { blogId } = req.params;
    const comments = await Comment.find({ blogId });

    res.status(StatusCodes.OK).json({ comments, count: comments.length });
}

const addComment = async (req, res) => {
    const user_id = req.user.userId;
    req.body.userId = user_id;
    req.body.username = req.user.username;
    const { commentContent, blogId, userId } = req.body;

    if (!blogId || !userId || !commentContent) {
        throw new BadRequestError("Please provide all values");
    }

    const comment = await Comment.create(req.body);
    res.status(StatusCodes.CREATED).json({ comment });
}

const editComment = async (req, res) => {
    let comment = await Comment.findById(req.params.id);

    if (!comment) {
        throw new NotFoundError(`Could not find comment with id : ${req.params.id}`);
    }

    console.log("userId", comment.userId);

    checkPermissions(req.user, comment.userId);

    comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    res.status(StatusCodes.OK).json({ comment });
}

const deleteComment = async (req, res) => {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
        throw new NotFoundError(`Could not find comment with id : ${req.params.id}`);
    }

    console.log("userId", comment.userId);
    checkPermissions(req.user, comment.userId);

    await Comment.findByIdAndDelete(req.params.id);

    res.status(StatusCodes.OK).json({ msg: "Comment has been deleted" });
}

export { getComments, addComment, editComment, deleteComment };