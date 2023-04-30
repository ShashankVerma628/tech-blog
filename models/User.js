import validator from "validator";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        minLength: [4, "Username length cannot be less than 5 characters"],
        maxLength: [255, "Username length cannot exceed than 255 characters"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide user email"],
        minLength: [8, "Email length cannot be less than 5 characters"],
        maxLength: [255, "Email length cannot exceed than 255 characters"],
        validate: {
            validator: validator.isEmail,
            message: "Please provide a valid email"
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide user Password"],
        minLength: [5, "Password length cannot be less than 5 characters"],
        select: false,
    },
});

UserSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

export default mongoose.model("User", UserSchema);