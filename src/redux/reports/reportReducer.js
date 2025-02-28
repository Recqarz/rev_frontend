
import {
  GET_FINAL_REPORT_REQUEST,
  GET_FINAL_REPORT_SUCCESS,
  GET_FINAL_REPORT_ERROR,
} from "./reportType";

const initialState = {
  loading: false,
  error: false,
  report: "",
};

export const reportReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_FINAL_REPORT_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_FINAL_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        report: payload,
      };
    case GET_FINAL_REPORT_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
