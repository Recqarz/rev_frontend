import { toastSuccess } from '../../utils/react-toastify/ReactToastiry'
import {
  USER_LOGIN_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
} from './authType'

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
};

const authReducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_REQUEST: {
      return { ...state, isLoading: true, isError: false, isSuccess: false }
    }
    case USER_LOGIN_SUCCESS: {
      // console.log(payload);
      localStorage.setItem("accessToken", payload?.accessToken);
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
      }
    }
    case USER_LOGIN_ERROR: {
      return { ...state, isLoading: false, isSuccess: false, isError: true }
    }
    case USER_LOGOUT_SUCCESS: {
      localStorage.removeItem("accessToken", payload?.accessToken);
      localStorage.removeItem("firstName", payload?.firstName);
      localStorage.removeItem("lastName", payload?.lastName);
      localStorage.removeItem("role", payload?.role);
      localStorage.removeItem("isActive", payload?.isActive);
      toastSuccess("Logged out success!")
      return {
        ...state,
        accessToken: '',
        firstName: '',
        lastName: '',
        role: '',
        isLogin: false,
        isActive:false
        
      }
    }

    default:
      return state
  }
}

export default authReducer
