import axios from "axios";
import { baseURL } from "../../utils/urls/baseURL";
import * as types from "./sendReportType";
import {
  toastError,
  toastLoading,
  toastUpdate,
} from "../../utils/react-toastify/ReactToastiry";
export const whatsappPdfReportSender =
  (caseId, accessToken, whatsAppNumbers) => async (dispatch) => {
    const toastId = toastLoading("Loading...");
    dispatch({ type: types.WHATSAPP_USERS_REPORT_PDF_REQUEST });
    return axios
      .post(
        `${baseURL}/api/v1/auditor/cases/${caseId}/finalreport/pdf/send/whatsapp`,
        whatsAppNumbers,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((res) => {
        dispatch({
          type: types.WHATSAPP_USERS_REPORT_PDF_SUCCESS,
          payload: res?.data?.message,
        });
        toastUpdate(toastId, 200, res?.data?.message);
      })
      .catch((err) => {
        console.error(
          "Error WHATSAPP_USERS_REPORT_PDF_REQUEST:",
          err?.response?.data?.error
        );
        dispatch({ type: types.WHATSAPP_USERS_REPORT_PDF_ERROR });
        toastError(err?.response?.data?.error);
      });
  };
export const emailPdfReportSender =
  (caseId, accessToken, whatsAppNumbers) => async (dispatch) => {
    const toastId = toastLoading("Loading...");
    dispatch({ type: types.EMAIL_USERS_REPORT_PDF_REQUEST });
    return axios
      .post(
        `${baseURL}/api/v1/auditor/cases/${caseId}/finalreport/pdf/send/email`,
        whatsAppNumbers,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((res) => {
        console.log("email dispatch res-->", res);
        dispatch({
          type: types.EMAIL_USERS_REPORT_PDF_SUCCESS,
          payload: res?.data?.message,
        });
        toastUpdate(toastId, 200, res?.data?.message);
      })
      .catch((err) => {
        console.error(
          "Error EMAIL_USERS_REPORT_PDF_REQUEST:",
          err?.response?.data?.error
        );
        dispatch({ type: types.EMAIL_USERS_REPORT_PDF_ERROR });
        toastError(err?.response?.data?.error);
      });
  };
export const emailMSWordReportSender =
  (caseId, accessToken, whatsAppNumbers) => async (dispatch) => {
    const toastId = toastLoading("Loading...");
    dispatch({ type: types.EMAIL_USERS_REPORT_MSWord_REQUEST });
    return axios
      .post(
        `${baseURL}/api/v1/auditor/cases/${caseId}/finalreport/word/send/email`,
        whatsAppNumbers,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((res) => {
        console.log("email word dispatch res-->", res);
        dispatch({
          type: types.EMAIL_USERS_REPORT_MSWord_SUCCESS,
          payload: res?.data?.message,
        });
        toastUpdate(toastId, 200, res?.data?.message);
      })
      .catch((err) => {
        console.error(
          "Error EMAIL_USERS_REPORT_MSWord_REQUEST:",
          err?.response?.data?.error
        );
        dispatch({ type: types.EMAIL_USERS_REPORT_MSWord_ERROR });
        toastError(err?.response?.data?.error);
      });
  };
