import axios from "axios";
import {
  toastError,
  toastLoading,
  toastUpdate,
} from "../../utils/react-toastify/ReactToastiry";
import { baseURL } from "../../utils/urls/baseURL";
import {
  GET_PROFILE_DATA_ERROR,
  GET_PROFILE_DATA_REQUEST,
  GET_PROFILE_DATA_SUCCESS,
  UPDATE_PROFILE_DATA_ERROR,
  UPDATE_PROFILE_DATA_REQUEST,
  UPDATE_PROFILE_DATA_SUCCESS,
} from "./profileType";

export const getProfileByToken = (token) => async (dispatch) => {
  dispatch({ type: GET_PROFILE_DATA_REQUEST });

  return axios
    .get(`${baseURL}/api/v1/user/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    .then((res) => {
      dispatch({ type: GET_PROFILE_DATA_SUCCESS, payload: res?.data?.data });
    })
    .catch((err) => {
      console.error("Error fetching case data:", err?.response?.data?.error);
      dispatch({ type: GET_PROFILE_DATA_ERROR });
      toastError(err?.response?.data?.error);
    });
};

export const updateProfileByToken = (data, accessToken) => async (dispatch) => {
  const toastId = toastLoading("Loading...");
  dispatch({ type: UPDATE_PROFILE_DATA_REQUEST });
  return axios
    .patch(`${baseURL}/api/v1/user/update/`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(" profileAction===>", res);
      dispatch({
        type: UPDATE_PROFILE_DATA_SUCCESS,
        payload: res?.data?.data?.updatedUserDetails,
      });
      toastUpdate(toastId, 200, res?.data?.message);
    })
    .catch((err) => {
      console.log("err", err);
      toastUpdate(toastId, 400, err?.response?.data?.error);
      dispatch({ type: UPDATE_PROFILE_DATA_ERROR });
    });
};
