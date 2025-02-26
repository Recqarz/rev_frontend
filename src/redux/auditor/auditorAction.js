import axios from "axios";
import {
  ALL_CASE_DATA_AUDITOR_ERROR,
  ALL_CASE_DATA_AUDITOR_REQUEST,
  ALL_CASE_DATA_AUDITOR_SUCCESS,
} from "./auditorType";

import { baseURL } from "../../utils/urls/baseURL";

export const getAllAssignCaseByAudior = (accessToken, queryString) => (dispatch) => {
  dispatch({ type: ALL_CASE_DATA_AUDITOR_REQUEST });
  return axios
    .get(`${baseURL}/api/v1/auditor/cases?${queryString}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((res) => {
      console.log("res", res?.data);
      dispatch({ type: ALL_CASE_DATA_AUDITOR_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: ALL_CASE_DATA_AUDITOR_ERROR });
      console.log("err", err?.response?.data?.error);
    });
};
