import {
  USER_LOGIN_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "./authType";

const initialData = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  role: localStorage.getItem("role"),
  firstName: localStorage.getItem("firstName"),
  lastName: localStorage.getItem("lastName"),
  accessToken: localStorage.getItem("accessToken"),
  isLogin: localStorage.getItem("accessToken") ? true : false,
};

const authReducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_REQUEST: {
      return { ...state, isLoading: true, isError: false, isSuccess: false };
    }
    case USER_LOGIN_SUCCESS: {
      // console.log(payload);
      localStorage.setItem("accessToken", payload?.accessToken);
      localStorage.setItem("firstName", payload?.firstName);
      localStorage.setItem("lastName", payload?.lastName);
      localStorage.setItem("role", payload?.role);

      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        accessToken: payload?.accessToken,
        firstName: payload?.firstName,
        lastName: payload?.lastName,
        role: payload?.role,
        isLogin:true
      };
    }
    case USER_LOGIN_ERROR: {
      return { ...state, isLoading: false, isSuccess: false, isError: true };
    }
    default:
      return state;
  }
};

export default authReducer;
