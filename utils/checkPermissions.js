import { UnauthenticatedError } from "../errors/index.js";

const checkPermissions = (user, resourceUserId) => {
    if (user.userId.toString() === resourceUserId.toString()) {
        return;
    }

    console.log(user);

    throw new UnauthenticatedError("You are not authorized for this action");
}

export default checkPermissions;