import {
  ADD_CASE_DATA_ERROR,
  ADD_CASE_DATA_REQUEST,
  ADD_CASE_DATA_SUCCESS,
  GET_CASE_DATA_ERROR,
  GET_CASE_DATA_REQUEST,
  GET_CASE_DATA_SUCCESS,
} from "./caseType";
import {
  toastError,
  toastLoading,
  toastUpdate,
} from "../../utils/react-toastify/ReactToastiry";
import { baseURL } from "../../utils/urls/baseURL";
import axios from "axios";

export const getAllCaseData = (queryString) => async (dispatch) => {
  dispatch({ type: GET_CASE_DATA_REQUEST });
  const token = localStorage.getItem("accessToken");

  // const queryString = new URLSearchParams(filters).toString(); // Build query string dynamically
  return axios
    .get(`${baseURL}/api/v1/coordinator/case-list?${queryString}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    .then((res) => {
      // console.log("res--->", res);
      dispatch({ type: GET_CASE_DATA_SUCCESS, payload: res?.data });
    })
    .catch((err) => {
      console.error("Error fetching case data:", err?.response?.data?.error);
      dispatch({ type: GET_CASE_DATA_ERROR });
      toastError(err?.response?.data?.error);
    });
};

export const getAllCaseById = (queryString) => async (dispatch) => {
  dispatch({ type: GET_CASE_DATA_REQUEST });
  const token = localStorage.getItem("accessToken");

  // const queryString = new URLSearchParams(filters).toString(); // Build query string dynamically
  return axios
    .get(`${baseURL}/api/v1/coordinator/case/${queryString}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    .then((res) => {
      // console.log("res case data individual--->", res);
      dispatch({ type: GET_CASE_DATA_SUCCESS, payload: res?.data?.data });
    })
    .catch((err) => {
      console.error("Error fetching case data:", err?.response?.data?.error);
      dispatch({ type: GET_CASE_DATA_ERROR });
      toastError(err?.response?.data?.error);
    });
};
export const addCaseData =
  (data, accessToken, navigate) => async (dispatch) => {
    const toastId = toastLoading("Loading...");
    try {
      dispatch({ type: ADD_CASE_DATA_REQUEST });
      const response = await axios.post(
        `${baseURL}/api/v1/coordinator/add-case`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      dispatch({ type: ADD_CASE_DATA_SUCCESS, payload: response?.data });
      toastUpdate(toastId, 200, " Case Added Successfully");
    } catch (error) {
      console.error(
        "Error creating case data:",
        error?.response?.data?.message
      );
      toastUpdate(toastId, 400, error?.response?.data?.error);
      dispatch({ type: ADD_CASE_DATA_ERROR });
    }
  };
