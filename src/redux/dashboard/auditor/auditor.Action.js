import { baseURL } from "../../../utils/urls/baseURL";
import { toastError } from "../../../utils/react-toastify/ReactToastiry";
import axios from "axios";
import {
    GET_AUDITOR_DATA_REQUEST,
    GET_AUDITOR_DATA_SUCCESS,
    GET_AUDITOR_DATA_ERROR,
} from "./auditor.Type";

export const getAuditorCaseData = (accessToken) => async (dispatch) => {
  dispatch({ type: GET_AUDITOR_DATA_REQUEST });
  return axios
    .get(`${baseURL}/api/v1/auditor/dashboard-data`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      dispatch({ type: GET_AUDITOR_DATA_SUCCESS, payload: res?.data });
    })
    .catch((err) => {
      console.error("Error fetching case data:", err?.response?.data?.error);
      dispatch({ type: GET_AUDITOR_DATA_ERROR});
      toastError(err?.response?.data?.error);
    });
};
