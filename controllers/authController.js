import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import User from "../models/User.js";
import StatusCodes from "http-status-codes";

const registerUser = async (req, res) => {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
        throw new BadRequestError("Please provide all values");
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
        throw new BadRequestError("User already exists!");
    }

    const usernameAlreadyExists = await User.findOne({ username });
    if (usernameAlreadyExists) {
        throw new BadRequestError("Username already exists");
    }

    const user = await User.create({ email, username, password });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { email: user.email, username: user.username }, token });
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError("Please provide email and password");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new UnauthenticatedError("You are not authorized");
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("Invalid Credentials");
    }
    const token = user.createJWT();
    user.password = undefined;
    res.status(StatusCodes.OK).json({ user, token });
}

export { loginUser, registerUser };