import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Please provide title"],
        minLength: [4, "Title cannot be less than 4 characters"]
    },
    content: {
        type: String,
        trim: true,
        minLength: [10, "Content of the blog cannot be less than 10 characters"],
        required: [true, "Please provide content of the blog"],
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide a user"]
    },
    username: {
        type: String,
        required: [true, "Please provide username"],
        trim: true,
    }
}, { timestamps: true })


export default mongoose.model("Blog", BlogSchema);