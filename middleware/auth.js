import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        throw new UnauthenticatedError("Invalid Token");
    }

    const token = authHeader.split(" ")[1];
    try {

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.userId, username: payload.username };
        next();
    } catch (error) {
        throw new UnauthenticatedError("You are not authorized");
    }
}

export default auth;