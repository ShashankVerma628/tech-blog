import { useContext, createContext, useReducer } from "react";
import axios from "axios";
import reducer from "./reducer";

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
    EDIT_BLOG_BEGIN,
    EDIT_BLOG_SUCCESS,
    EDIT_BLOG_ERROR,
    EDIT_COMMENT_BEGIN,
    EDIT_COMMENT_SUCCESS,
    EDIT_COMMENT_ERROR,
    DELETE_BLOG_BEGIN,
    DELETE_BLOG_SUCCESS,
    DELETE_BLOG_ERROR,
    DELETE_COMMENT_BEGIN,
    DELETE_COMMENT_ERROR,
    DELETE_COMMENT_SUCCESS
} from "./actions";

const user = JSON.parse(localStorage.getItem("user")) || null;
const token = localStorage.getItem("token") || null;

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: "",
    alertType: "",
    user,
    token,
    userBlogs: [],
    allBlogs: [],
    singleBlog: null,
    showFloatAlert: false,
    floatAlertType: "",
    floatAlertText: "",
}

const appContext = createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const authDashFetch = axios.create({
        baseURL: `/api/v1`
    });


    // request interceptor to set authorization header automatically
    authDashFetch.interceptors.request.use((config) => {
        config.headers["Authorization"] = `Bearer ${state.token}`;
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    // response interceptor
    authDashFetch.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        if (error.response.status === 401) {
            logOutUser();
        }
        return Promise.reject(error);
    });

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT });
        clearAlert();
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT });
        }, 4000);
    }

    const displayFloatAlert = () => {
        console.log("Display float alert");
    }

    const clearFloatAlert = () => {
        console.log("clear float alert");
    }

    const addUserToLocalStorage = ({ user, token }) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    const registerUser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN })
        try {
            const response = await axios.post(`/api/v1/auth/register`, currentUser);

            const { user, token } = response.data;
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: { user, token }
            });

            // add user and token to localStorage
            addUserToLocalStorage({ user, token });

            // navigate to dashboard
        } catch (error) {
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: { msg: error.response.data.msg }
            });
        }
        clearAlert();
    }

    const loginUser = async (currentUser) => {
        dispatch({ type: LOGIN_USER_BEGIN });
        try {
            const response = await axios.post(`/api/v1/auth/login`, currentUser);

            const { user, token } = response.data;

            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: { user, token }
            });
            // add user to local storage
            addUserToLocalStorage({ user, token });
        } catch (error) {
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: { msg: error.response.data.msg }
            })
        }
        clearAlert();
    }

    const logOutUser = async () => {
        dispatch({ type: LOGOUT_USER });
        removeUserFromLocalStorage();
    }


    // get all blogs related to particular user (for dashboard)
    const getAllBlogs = async () => {
        dispatch({ type: GET_USER_BLOGS_BEGIN });
        try {
            const { data: { count, blogs } } = await authDashFetch.post("/blogs/userBlogs");
            dispatch({ type: GET_USER_BLOGS_SUCCESS, payload: { count, blogs } })

        } catch (error) {
            logOutUser();
        }
    }

    // get all blogs of each user(for homepage)
    const getBlogs = async () => {
        dispatch({ type: GET_BLOGS_BEGIN });
        try {
            const response = await axios.get(`/api/v1/blogs`);
            const { blogs } = response.data;
            dispatch({ type: GET_BLOGS_SUCCESS, payload: { blogs } });
        } catch (error) {
            displayFloatAlert();
        }
    }

    // to add/create blog by a user
    const addBlog = async (blog) => {
        dispatch({ type: ADD_BLOG_BEGIN });
        try {
            const { data } = await authDashFetch.post("/blogs/add-blog", blog);
            dispatch({ type: ADD_BLOG_SUCCESS });
            getAllBlogs();
        } catch (error) {
            if (error.response.status === 401) {
                return;
            }
            dispatch({ type: ADD_BLOG_ERROR, payload: { msg: error.response.data.msg } });
        }
        clearAlert();
    }

    // to get a single blog
    const getSingleBlog = async (id) => {
        dispatch({ type: GET_BLOG_BEGIN });
        try {
            let { data: { blog } } = await axios.get(`/api/v1/blogs/${id}`);
            blog = blog[0];
            dispatch({ type: GET_BLOG_SUCCESS, payload: { blog } })
        } catch (error) {
            dispatch({ type: GET_BLOG_ERROR });
        }
        clearFloatAlert();
    };


    // add a comment 
    const addComment = async (comment) => {
        dispatch({ type: ADD_COMMENT_BEGIN });
        try {
            const { data } = await authDashFetch.post("/comments", comment);
            dispatch({ type: ADD_COMMENT_SUCCESS });
        } catch (error) {
            if (error.response.status === 401) {
                return;
            }
            dispatch({ type: ADD_COMMENT_ERROR, payload: error.response.data.msg });
        }
        clearAlert();
    }

    // get comments related to a blog
    const getComments = async (blogId) => {
        try {
            const { data } = await axios.get(`/api/v1/comments/${blogId}`);
            return data.comments;
        } catch (error) {
            console.log(error);
        }
    }

    // edit blog
    const editBlog = async (blogId, blog) => {
        dispatch({ type: EDIT_BLOG_BEGIN });
        try {

            const { data } = await authDashFetch.patch(`/blogs/${blogId}`, blog);

            dispatch({ type: EDIT_BLOG_SUCCESS });
        } catch (error) {
            if (error.response.status === 401) {
                return;
            }
            dispatch({ type: ADD_BLOG_ERROR, payload: { msg: error.response.data.msg } });
        }
        clearAlert();
    }

    const deleteBlog = async (blogId) => {
        dispatch({ type: DELETE_BLOG_BEGIN });
        try {
            const { data } = await authDashFetch.delete(`/blogs/${blogId}`);

            dispatch({ type: DELETE_BLOG_SUCCESS })

        } catch (error) {
            if (error.response.status === 401) {
                return;
            }
            dispatch({ type: DELETE_BLOG_ERROR, payload: { msg: error.response.data.msg } })
        }
    }

    // edit comment
    const editComment = async (commentId, commentContent) => {
        dispatch({ type: EDIT_COMMENT_BEGIN });
        try {
            const { data } = await authDashFetch.patch(`/comments/${commentId}`, commentContent);
            dispatch({ type: EDIT_COMMENT_SUCCESS });
        } catch (error) {
            dispatch({ type: EDIT_COMMENT_ERROR, payload: { msg: error.response.data.msg } });

        }
        clearAlert();
    }

    // delete comment
    const deleteComment = async (commentId) => {
        dispatch({ type: DELETE_COMMENT_BEGIN });
        try {
            const { data } = await authDashFetch.delete(`/comments/${commentId}`);
            dispatch({ type: DELETE_COMMENT_SUCCESS });
        } catch (error) {
            dispatch({ type: DELETE_COMMENT_ERROR, payload: { msg: error.response.data.msg } });
        }
        clearFloatAlert();
    }

    return <appContext.Provider value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        logOutUser,
        getBlogs,
        getAllBlogs, // for dashboard
        addBlog,
        getSingleBlog,
        addComment,
        getComments,
        editBlog,
        editComment,
        deleteBlog,
        deleteComment
    }}>
        {children}
    </appContext.Provider>
}

const useAppContext = () => {
    return useContext(appContext);
}

export { useAppContext, initialState, AppProvider };
