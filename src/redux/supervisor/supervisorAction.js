import axios from "axios";
import { toastError } from "../../utils/react-toastify/ReactToastiry";
import { baseURL } from "../../utils/urls/baseURL";
import * as types from "./supervisorType";

// ✅ Fetch All location // state wise districts
export const getSupervisorData = (accessToken) => async (dispatch) => {
  dispatch({ type: types.GET_SUPERVISOR_DATA_REQUEST });
  return axios
    .get(`${baseURL}/api/v1/supervisor/cases`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((res) => {
      // console.log("all supervisor res==>", res);
      dispatch({
        type: types.GET_SUPERVISOR_DATA_SUCCESS,
        payload: res?.data,
      });
    })
    .catch((err) => {
      console.error("Error fetching states:", err?.response?.data?.error);
      dispatch({ type: types.GET_SUPERVISOR_DATA_ERROR });
      toastError(err?.response?.data?.error);
    });
};

export const getCaseDataBySupervisor = (accessToken, id) => (dispatch) => {
  dispatch({ type: types.GET_CASE_DATA_BY_SUPERVISOR_REQUEST });
  return axios
    .get(`${baseURL}/api/v1/supervisor/case/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((res) => {
      console.log("caseData==>", res?.data);
      dispatch({
        type: types.GET_CASE_DATA_BY_SUPERVISOR_SUCCESS,
        payload: res?.data,
      });
    })
    .catch((err) => {
      console.error("Error fetching states:", err?.response?.data?.error);
      dispatch({ type: types.GET_CASE_DATA_BY_SUPERVISOR_ERROR });
      toastError(err?.response?.data?.error);
    });
};

// localhost:8080/api/v1/supervisor/case/6788e52bed200f7ba82d1a5a
