import axios from "axios";
import {
  toastError,
  toastUpdate,
  toastLoading,
} from "../../utils/react-toastify/ReactToastiry";
import {
  ALL_CASE_DATA_AUDITOR_ERROR,
  ALL_CASE_DATA_AUDITOR_REQUEST,
  ALL_CASE_DATA_AUDITOR_SUCCESS,
  CASE_DATA_ID_AUDITOR_REQUEST,
  CASE_DATA_ID_AUDITOR_SUCCESS,
  CASE_DATA_ID_AUDITOR_ERROR,
  APPROVE_DATA_BY_AUDITOR_REQUEST,
  APPROVE_DATA_BY_AUDITOR_SUCCESS,
  APPROVE_DATA_BY_AUDITOR_ERROR,
} from "./auditorType";
import { baseURL } from "../../utils/urls/baseURL";

// get all the case data
export const getAllAssignCaseByAudior =
  (accessToken, queryString) => async (dispatch) => {
    dispatch({ type: ALL_CASE_DATA_AUDITOR_REQUEST });
    return axios
      .get(`${baseURL}/api/v1/auditor/cases?${queryString}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        // console.log("res", res?.data);
        dispatch({ type: ALL_CASE_DATA_AUDITOR_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: ALL_CASE_DATA_AUDITOR_ERROR });
        console.log("err", err?.response?.data?.error);
      });
  };

// get case data of id
export const caseDataIdByAuditor = (accessToken, id) => (dispatch) => {
  dispatch({ type: CASE_DATA_ID_AUDITOR_REQUEST });
  return axios
    .get(`${baseURL}/api/v1/auditor/cases/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((res) => {
      dispatch({ type: CASE_DATA_ID_AUDITOR_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.log("err", err?.response?.data?.error);
      dispatch({ type: CASE_DATA_ID_AUDITOR_ERROR });
    });
};

//approve by auditor
export const approveDataByAuditor = (accessToken, id) => (dispatch) => {
  dispatch({ type: APPROVE_DATA_BY_AUDITOR_REQUEST });
  const toastId = toastLoading("Loading...");
  return axios
    .patch(
      `${baseURL}/api/v1/auditor//cases/${id}/verify`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )
    .then((res) => {
      //   console.log("res", res?.data);
      dispatch({ type: APPROVE_DATA_BY_AUDITOR_SUCCESS, payload: res.data });
      toastUpdate(toastId, 200, "Case Approved Successfully!");
    })
    .catch((err) => {
      console.log("err", err?.response?.data?.error);
      dispatch({ type: APPROVE_DATA_BY_AUDITOR_ERROR });
      toastError(err?.response?.data?.error);
    });
};
