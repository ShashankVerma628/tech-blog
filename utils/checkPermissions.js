import { UnauthenticatedError } from "../errors/index.js";

const checkPermissions = (user, resourceUserId) => {
    if (user.userId.toString() === resourceUserId.toString()) {
        return;
    }

    throw new UnauthenticatedError("You are not authorized to edit this post");
}

export default checkPermissions;