import axios from "axios";
import {
  GET_ADMIN_DATA_ERROR,
  GET_ADMIN_DATA_REQUEST,
  GET_ADMIN_DATA_SUCCESS,
} from "./adminType";
import { baseURL } from "../../../utils/urls/baseURL";
import { toastError } from "../../../utils/react-toastify/ReactToastiry";

export const getAdminListData = (accessToken) => async (dispatch) => {
  dispatch({ type: GET_ADMIN_DATA_REQUEST });
  return axios
    .get(`${baseURL}/api/v1/admin/dashboard`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    .then((res) => {
      console.log("admin dashboard res===>", res?.data);
      dispatch({ type: GET_ADMIN_DATA_SUCCESS, payload: res?.data });
      console.log("admin dashboard data collected");
    })
    .catch((err) => {
      console.error("Error fetching case data:", err?.response?.data?.error);
      dispatch({ type: GET_ADMIN_DATA_ERROR });
      toastError(err?.response?.data?.error);
    });
};
