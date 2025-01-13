import axios from "axios";
import { baseURL } from "../../utils/urls/baseURL";
import {
  toastLoading,
  toastUpdate,
} from "../../utils/react-toastify/ReactToastiry";
import {
  USER_LOGIN_ERROR,
  USER_LOGIN_OTP_ERROR,
  USER_LOGIN_OTP_REQUEST,
  USER_LOGIN_OTP_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "./authType";

// check credential and send otp
export const checkCredentialAndsendOtp =
  (data, navigate) => async (dispatch) => {
    const toastId = toastLoading("Loading...");
    dispatch({ type: USER_LOGIN_OTP_REQUEST });
    try {
      const res = await axios.post(
        `${baseURL}/api/v1/user/login-and-send-otp`,
        {
          userCode: data?.userCode,
          password: data?.password,
        }
      );

      // console.log(res);
      // if (data?.role !== res?.data?.data?.role) {
      //   console.log("you have selected wrong role!");
      //   toastUpdate(toastId, 400, "Please select correct role!");
      //   return;
      // }
      console.log(res);
      dispatch({ type: USER_LOGIN_OTP_SUCCESS });
      toastUpdate(
        toastId,
        200,
        "OTP has been sent to your email and whatsapp!"
      );
      navigate(`/verifyotp`, { state: { userCode: data?.userCode } });
    } catch (error) {
      console.log(error);
      dispatch({ type: USER_LOGIN_OTP_ERROR });
      toastUpdate(toastId, 400, error?.response?.data?.error);
    }
  };

export const verifyOtpAndLogin = (data, navigate) => async (dispatch) => {
  const { userCode, eOtp, mOtp } = data;
  const toastId = toastLoading("Loading...");
  dispatch({ type: USER_LOGIN_REQUEST });
  try {
    const res = await axios.post(
      `${baseURL}/api/v1/user/verify-otp-and-generate-token`,
      {
        userCode,
        eOtp,
        mOtp,
      }
    );
    // console.log(res.data);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: res?.data?.data });

    toastUpdate(toastId, 200, "Login success!");
    navigate(`${res?.data?.data?.role}/dashboard`);
  } catch (error) {
    console.log(error);
    dispatch({ type: USER_LOGIN_ERROR });
    toastUpdate(toastId, 400, error?.response?.data?.error);
  }
};
