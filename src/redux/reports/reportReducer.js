import {
  GET_FINAL_REPORT_REQUEST,
  GET_FINAL_REPORT_SUCCESS,
  GET_FINAL_REPORT_ERROR,
  GET_FINAL_REPORT_PDF_REQUEST,
  GET_FINAL_REPORT_PDF_SUCCESS,
  GET_FINAL_REPORT_PDF_ERROR,
} from "./reportType";

const initialState = {
  loadingPDF: false,
  loadingMS: false,
  error: false,
  report: "",
  reportpdf: "",
};

export const reportReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_FINAL_REPORT_REQUEST:
      return {
        ...state,
        loadingMS: true,
        error: false,
      };
    case GET_FINAL_REPORT_PDF_REQUEST:
      return {
        ...state,
        loadingPDF: true,
        error: false,
      };
    case GET_FINAL_REPORT_SUCCESS:
      return {
        ...state,
        loadingMS: false,
        report: payload,
      };
    case GET_FINAL_REPORT_PDF_SUCCESS:
      return {
        ...state,
        loadingPDF: false,
        reportpdf: payload,
      };
    case GET_FINAL_REPORT_ERROR:
      return {
        ...state,
        loadingMS: false,
        error: true,
      };
    case GET_FINAL_REPORT_PDF_ERROR:
      return {
        ...state,
        loadingPDF: false,
        error: true,
      };
    default:
      return state;
  }
};
