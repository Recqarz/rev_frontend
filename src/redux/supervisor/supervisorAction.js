import axios from "axios";
import { toastError } from "../../utils/react-toastify/ReactToastiry";
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
        console.log("all supervisor res==>", res);
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
