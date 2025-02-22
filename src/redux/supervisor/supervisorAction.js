import axios from "axios";
import { toastError, toastUpdate, toastLoading, } from "../../utils/react-toastify/ReactToastiry";
import { baseURL } from "../../utils/urls/baseURL";
import * as types from "./supervisorType";

// ✅ Fetch All location // state wise districts
export const getSupervisorData =
  (accessToken, queryString) => async (dispatch) => {
    dispatch({ type: types.GET_SUPERVISOR_DATA_REQUEST });
    return axios
      .get(`${baseURL}/api/v1/supervisor/cases?${queryString}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log("all supervisor res==>", res?.data);
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

// get data by supervisor of specific id
export const getCaseDataBySupervisor =
  (accessToken, id) => async (dispatch) => {
    dispatch({ type: types.GET_CASE_DATA_BY_SUPERVISOR_REQUEST });
    return axios
      .get(`${baseURL}/api/v1/supervisor/case/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        dispatch({
          type: types.GET_CASE_DATA_BY_SUPERVISOR_SUCCESS,
          payload: res?.data,
        });
      })
      .catch((err) => {
        console.error("Error fetching data of id:", err?.response?.data?.error);
        dispatch({ type: types.GET_CASE_DATA_BY_SUPERVISOR_ERROR });
        toastError(err?.response?.data?.error);
      });
  };

// Update data by supervisor of specific id
export const updateCaseDataBySupervisor =
  (accessToken, id, formData) => async (dispatch) => {
    dispatch({ type: types.UPDATE_DATA_BY_SUPERVISOR_REQUEST });
    const toastId = toastLoading("Loading...");
    return axios
      .patch(
        `${baseURL}/api/v1/field-executive/cases/${id}/property-details/update`,
        formData,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          "Content-Type": "multipart/form-data",
        }
      )
      .then((res) => {

        dispatch({
          type: types.UPDATE_DATA_BY_SUPERVISOR_SUCCESS,
          payload: res?.data,
        });
        toastUpdate(toastId, 200, res?.data?.message);
      })
      .catch((err) => {
        console.error("Error updating data of id:", err?.response?.data?.error);
        dispatch({ type: types.UPDATE_DATA_BY_SUPERVISOR_ERROR });
        toastError(err?.response?.data?.error);
      });
  };
