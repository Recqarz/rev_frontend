import { toastSuccess } from "../../utils/react-toastify/ReactToastiry";
import {
  USER_FORGET_PASSWORD_ERROR,
  USER_FORGET_PASSWORD_REQUEST,
  USER_LOGIN_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
} from "./authType";

const initialData = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  role: localStorage.getItem("role") || "",
  firstName: localStorage.getItem("firstName") || "",
  lastName: localStorage.getItem("lastName") || "",
  accessToken: localStorage.getItem("accessToken") || "",
  isLogin: localStorage.getItem("accessToken") ? true : false,
  isActive: localStorage.getItem("isActive") || false,
  tokenExpiry: localStorage.getItem("token_expiry") || null,
};

const authReducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_REQUEST:
    case USER_FORGET_PASSWORD_REQUEST: {
      return { ...state, isLoading: true, isError: false, isSuccess: false };
    }
    case USER_LOGIN_SUCCESS: {
      // console.log(payload);
      localStorage.setItem("accessToken", payload?.accessToken);
      localStorage.setItem("token_expiry", payload?.tokenExpiry); // Convert to milliseconds
      localStorage.setItem("firstName", payload?.firstName);
      localStorage.setItem("lastName", payload?.lastName);
      localStorage.setItem("role", payload?.role);
      localStorage.setItem("isActive", payload?.isActive);

      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        accessToken: payload?.accessToken,
        firstName: payload?.firstName,
        lastName: payload?.lastName,
        role: payload?.role,
        isLogin: true,
        tokenExpiry: payload?.tokenExpiry,
      };
    }
    case USER_LOGOUT_SUCCESS: {
      localStorage.removeItem("accessToken", payload?.accessToken);
      localStorage.removeItem("firstName", payload?.firstName);
      localStorage.removeItem("lastName", payload?.lastName);
      localStorage.removeItem("role", payload?.role);
      localStorage.removeItem("isActive", payload?.isActive);
      localStorage.removeItem("token_expiry");
      toastSuccess("you are Logged out!");
      return {
        ...state,
        accessToken: "",
        firstName: "",
        lastName: "",
        role: "",
        isLogin: false,
        isActive: false,
        tokenExpiry: null,
      };
    }
    case USER_LOGIN_ERROR:
    case USER_FORGET_PASSWORD_ERROR: {
      return { ...state, isLoading: false, isSuccess: false, isError: true };
    }

    default:
      return state;
  }
};

export default authReducer;
