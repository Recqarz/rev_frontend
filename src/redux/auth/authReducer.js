import {
  USER_LOGIN_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "./authType";

const initialData = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  role: sessionStorage.getItem("role"),
  firstName: sessionStorage.getItem("firstName"),
  lastName: sessionStorage.getItem("lastName"),
  accessToken: sessionStorage.getItem("accessToken"),
  isLogin: false,
};

const authReducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_REQUEST: {
      return { ...state, isLoading: true, isError: false, isSuccess: false };
    }
    case USER_LOGIN_SUCCESS: {
        // console.log(payload);
      sessionStorage.setItem("accessToken", payload?.accessToken);
      sessionStorage.setItem("firstName", payload?.firstName);
      sessionStorage.setItem("lastName", payload?.lastName);
      sessionStorage.setItem("role", payload?.role);

      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        accessToken: payload?.accessToken,
        firstName: payload?.firstName,
        lastName: payload?.lastName,
        role: payload?.role,
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
