import {
  GET_FINAL_REPORT_REQUEST,
  GET_FINAL_REPORT_SUCCESS,
  GET_FINAL_REPORT_ERROR,
} from "./reportType";
import axios from "axios";
import { baseURL } from "../../utils/urls/baseURL";

export const getFinalReports = (accessToken, id) => async (dispatch) => {
  dispatch({ type: GET_FINAL_REPORT_REQUEST });
  return axios
    .get(`${baseURL}/api/v1/auditor/cases/${id}/finalreport`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      responseType: "blob",
    })
    .then((response) => {
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a download link and trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = `final_report_case_${id}.docx`; // Set the file name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Cleanup URL to free memory
      window.URL.revokeObjectURL(url);

      dispatch({
        type: GET_FINAL_REPORT_SUCCESS,
        payload: response?.statusText,
      });
    })
    .catch((error) => {
      dispatch({ type: GET_FINAL_REPORT_ERROR });
      console.log(error, "error==>");
    });
};
