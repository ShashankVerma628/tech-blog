import mongoose from "mongoose"

const CommentSchema = new mongoose.Schema({
    commentContent: {
        type: String,
        trim: true,
        required: [true, "Please enter a comment"],
        minLength: [4, "Comment cannot be less than 4 characters"]
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide a user id"]
    },
    blogId: {
        type: mongoose.Types.ObjectId,
        ref: "Blog",
        required: [true, "Please provide a blog id"]
    }
}, { timestamps: true });

export default mongoose.model("Comment", CommentSchema);