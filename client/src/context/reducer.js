import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS,
    LOGIN_USER_BEGIN,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    GET_USER_BLOGS_BEGIN,
    GET_USER_BLOGS_SUCCESS,
    GET_BLOGS_BEGIN,
    GET_BLOGS_SUCCESS,
    ADD_BLOG_BEGIN,
    ADD_BLOG_SUCCESS,
    ADD_BLOG_ERROR,
    GET_BLOG_BEGIN,
    GET_BLOG_SUCCESS,
    GET_BLOG_ERROR,
    ADD_COMMENT_BEGIN,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_ERROR,
    EDIT_COMMENT_BEGIN,
    EDIT_COMMENT_SUCCESS,
    EDIT_COMMENT_ERROR,
    EDIT_BLOG_BEGIN,
    EDIT_BLOG_SUCCESS,
    EDIT_BLOG_ERROR,
    DELETE_BLOG_BEGIN,
    DELETE_BLOG_SUCCESS,
    DELETE_BLOG_ERROR
} from "./actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertType: "danger",
            alertText: "Please provide all values!"
        }
    }
    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: "",
            alertText: ""
        }
    }
    if (action.type === REGISTER_USER_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === REGISTER_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            alertType: "success",
            alertText: "Registration Successful",
            showAlert: true,
            user: action.payload.user,
            token: action.payload.token
        }
    }

    if (action.type === REGISTER_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.msg
        }
    }

    if (action.type === LOGIN_USER_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }

    if (action.type === LOGIN_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "success",
            alertText: "Login Successful, Redirecting...",
            user: action.payload.user,
            token: action.payload.token
        }
    }

    if (action.type === LOGIN_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.msg
        }
    }

    if (action.type === LOGOUT_USER) {
        return {
            ...state,
            user: null,
            token: null,
            userBlogs: []
        }
    }

    // to get the blogs of a particular user
    if (action.type === GET_USER_BLOGS_BEGIN) {
        return {
            ...state,
            isLoading: true,
            showAlert: false
        }
    }

    if (action.type === GET_USER_BLOGS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: false,
            userBlogs: action.payload.blogs
        }
    }


    // to get the blogs of every user ( for homepage )
    if (action.type === GET_BLOGS_BEGIN) {
        return {
            ...state,
            isLoading: true,
        }
    }

    if (action.type === GET_BLOGS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            isLoading: false,
            showAlert: false,
            allBlogs: action.payload.blogs
        }
    }


    // to add a blog
    if (action.type === ADD_BLOG_BEGIN) {
        return {
            ...state,
            isLoading: true,
        }
    }

    if (action.type === ADD_BLOG_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "success",
            alertText: "Blog has been Added!",
        }
    }

    if (action.type === ADD_BLOG_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.msg
        }
    }

    if (action.type === GET_BLOG_BEGIN) {
        return {
            ...state,
            isLoading: true,
        }
    }

    if (action.type === GET_BLOG_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            singleBlog: action.payload.blog
        }
    }

    if (action.type === GET_BLOG_ERROR) {
        return {
            ...state,
            isLoading: false,
            showFloatAlert: true,
            floatAlertType: "danger",
            floatAlertText: action.payload.data.msg
        }
    }

    if (action.type === ADD_COMMENT_BEGIN) {
        return {
            ...state,
            isLoading: true,
        }
    }

    if (action.type === ADD_COMMENT_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "success",
            alertText: "Your comment has been Added, Redirecting..."
        }
    }

    if (action.type === ADD_COMMENT_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.msg
        }
    }

    if (action.type === EDIT_BLOG_BEGIN) {
        return {
            ...state,
            isLoading: true,
        }
    }

    if (action.type === EDIT_BLOG_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "success",
            alertText: "Blog Edit is successful!, Redirecting...."
        }
    }

    if (action.type === EDIT_BLOG_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: "Couldn't edit blog, Please try again later!!"
        }
    }

    if (action.type === DELETE_BLOG_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }

    if (action.type === DELETE_BLOG_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showFloatAlert: true,
            floatAlertType: "success",
            floatAlertText: "Blog has been deleted!!"
        }
    }

    if (action.type === DELETE_BLOG_ERROR) {
        return {
            ...state,
            isLoading: false,
            showFloatAlert: true,
            floatAlertType: "danger",
            floatAlertText: action.payload.data.msg
        }
    }
}

export default reducer;