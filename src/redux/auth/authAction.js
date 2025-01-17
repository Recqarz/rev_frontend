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
  USER_FORGET_PASSWORD_REQUEST,
  USER_FORGET_PASSWORD_SUCCESS,
  USER_FORGET_PASSWORD_ERROR,
  USER_VERIFYOTP_REQUEST,
  USER_VERIFYOTP_SUCCESS,
  USER_VERIFYOTP_ERROR,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_ERROR,

} from "./authType";

// check credential and send otp for login
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
      // console.log(res.data.message);
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

// Verify otp for login
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
    navigate(`/${res?.data?.data?.role}/dashboard`);
  } catch (error) {
    console.log(error);
    dispatch({ type: USER_LOGIN_ERROR });
    toastUpdate(toastId, 400, error?.response?.data?.error);
  }
};

// send otp for forget password
export const checkMailForForgetPass = (userData, navigate) => (dispatch) => {
  const toastId = toastLoading("Loading...");
  dispatch({ type: USER_FORGET_PASSWORD_REQUEST });
  return axios
    .post(`${baseURL}/api/v1/user/send-otp`, { userData })
    .then((res) => {
      dispatch({ type: USER_FORGET_PASSWORD_SUCCESS });
      toastUpdate(
        toastId,
        200,
        "OTP has been sent to your email and whatsapp!"
      );
      navigate(`/forget/password/verifyotp`, {
        state: {
          userData,
        },
      });
    })
    .catch((err) => {
      dispatch({ type: USER_FORGET_PASSWORD_ERROR });
      toastUpdate(toastId, 404, err?.response?.data?.error);
    });
};

// verify otp for forget password
export const verifyOTPForForgetPass = (data, navigate) => async(dispatch) => {
  const { userData, eOtp, mOtp } = data;
  const toastId = toastLoading("Loading...");
  dispatch({ type: USER_VERIFYOTP_REQUEST });
  return axios
    .post(`${baseURL}/api/v1/user/verify-otp`, { userData, eOtp, mOtp })
    .then((res) => {
      console.log(res)
      dispatch({ type: USER_VERIFYOTP_SUCCESS });
      toastUpdate(toastId, 200, "OTP has been verified successfully!");
      navigate(`/forget/password/resetpassword`, {
        state: { userData: userData },
      });
    })
    .catch((err) => {
      console.log("err", err.response.data.error);
      dispatch({ type: USER_VERIFYOTP_ERROR });
      toastUpdate(toastId, 400, err?.response?.data?.error);
    });
};

// Reset Password
export const resetPasswordForForgetPass = (data, navigate) => (dispatch) => {
  const { userData, password, confirmPass } = data;
  const toastId = toastLoading("Loading...");
  if (password !== confirmPass) {
    toastUpdate(toastId, 401, "Please check password!");
  } else {
    dispatch({ type: USER_RESET_PASSWORD_REQUEST });
    return axios
      .patch(`${baseURL}/api/v1/user/forgot-password/reset-password`, {
        userData,
        password,
      })
      .then((res) => {
        console.log("res", res.data.message);
        dispatch({ type: USER_RESET_PASSWORD_SUCCESS });
        toastUpdate(toastId, 200, res?.data?.message);
        navigate(`/`);
      })
      .catch((err) => {
        dispatch({ type: USER_RESET_PASSWORD_ERROR });
        toastUpdate(toastId, 400, "Something went wrong");
        console.log("err", err)
      });
  }
};



