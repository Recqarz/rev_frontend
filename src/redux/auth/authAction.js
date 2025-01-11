import axios from "axios";
import { baseURL } from "../../utils/urls/baseURL";
import {
  toastLoading,
  toastUpdate,
} from "../../utils/react-toastify/ReactToastiry";
import {
  USER_LOGIN_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "./authType";

export const userLogin = (data, navigate) => async (dispatch) => {
  const toastId = toastLoading("Loading...");
  dispatch({ type: USER_LOGIN_REQUEST });
  try {
    const res = await axios.post(`${baseURL}/api/v1/user/login`, {
      userCode: data?.userCode,
      password: data?.password,
    });
    if (data?.role !== res?.data?.data?.role) {
      console.log("you have selected wrong role!");
      toastUpdate(toastId, 400, "Please select correct role!");
      return;
    }
    console.log(res.data);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: res?.data?.data });

    toastUpdate(toastId, 200, "Login success!");
    navigate(`${res?.data?.data?.role}/dashboard`);
  } catch (error) {
    console.log(error);
    dispatch({ type: USER_LOGIN_ERROR });
    toastUpdate(toastId, 400, error?.response?.data?.error);
  }
};
