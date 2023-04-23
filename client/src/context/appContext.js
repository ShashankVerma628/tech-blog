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
    ADD_BLOG_ERROR
} from "./actions";

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: "",
    alertType: "",
    user,
    token,
    userBlogs: [],
    allBlogs: [],
}

const appContext = createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const authDashFetch = axios.create({
        baseURL: "/dashboard"
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
            const response = await axios.post("/api/v1/auth/register", currentUser);

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
            const response = await axios.post("/api/v1/auth/login", currentUser);

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
            const { data: { count, blogs } } = await authDashFetch.get("/");

            dispatch({ type: GET_USER_BLOGS_SUCCESS, payload: { blogs } })

        } catch (error) {
            logOutUser();
        }
    }

    // get all blogs of each user(for homepage)
    const getBlogs = async () => {
        dispatch({ type: GET_BLOGS_BEGIN });
        try {
            const response = await axios.get("/home");
            const { blogs } = response.data;
            dispatch({ type: GET_BLOGS_SUCCESS, payload: { blogs } });
        } catch (error) {
            console.log(error);
        }
    }

    const addBlog = async (blog) => {
        dispatch({ type: ADD_BLOG_BEGIN });
        try {
            const { data } = await authDashFetch.post("/", blog);
            dispatch({ type: ADD_BLOG_SUCCESS });
            getAllBlogs();
        } catch (error) {
            if (error.response.status === 401) {
                return;
            }
            dispatch({ type: ADD_BLOG_ERROR, payload: error.response.data.msg });
        }
        clearAlert();
    }

    return <appContext.Provider value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        logOutUser,
        getBlogs,
        getAllBlogs, // for dashboard
        addBlog
    }}>
        {children}
    </appContext.Provider>
}

const useAppContext = () => {
    return useContext(appContext);
}

export { useAppContext, initialState, AppProvider };
