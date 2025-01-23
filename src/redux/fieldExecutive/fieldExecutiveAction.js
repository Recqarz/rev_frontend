import axios from "axios";
import { baseURL } from "../../utils/urls/baseURL";
import {
  GET_FIELDEXECUTIVE_DATA_ERROR,
  GET_FIELDEXECUTIVE_DATA_REQUEST,
  GET_FIELDEXECUTIVE_DATA_SUCCESS,
} from "./filedExecutiveType";
import { toastError } from "../../utils/react-toastify/ReactToastiry";

export const getAllFieldExecutiveData = (queryString) => async (dispatch) => {
  dispatch({ type: GET_FIELDEXECUTIVE_DATA_REQUEST });
  const token = localStorage.getItem("accessToken");

  // const queryString = new URLSearchParams(filters).toString(); // Build query string dynamically
  return axios
    .get(`${baseURL}/api/v1/coordinator/fieldExecutive-list?${queryString}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    .then((res) => {
      // console.log("res--->", res);
      dispatch({ type: GET_FIELDEXECUTIVE_DATA_SUCCESS, payload: res?.data });
    })
    .catch((err) => {
      console.error("Error fetching user data:", err?.response?.data?.error);
      dispatch({ type: GET_FIELDEXECUTIVE_DATA_ERROR });
      toastError(err?.response?.data?.error);
    });
};
