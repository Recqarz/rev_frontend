import * as types from "./sendReportType";

const initialData = {
  isLoading: false,
  isError: false,
  data: {
    message: "",
  },
};

const sendReportReducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case types.WHATSAPP_USERS_REPORT_PDF_REQUEST:
    case types.EMAIL_USERS_REPORT_PDF_REQUEST:
    case types.EMAIL_USERS_REPORT_MSWord_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case types.WHATSAPP_USERS_REPORT_PDF_SUCCESS:
    case types.EMAIL_USERS_REPORT_PDF_SUCCESS:
    case types.EMAIL_USERS_REPORT_MSWord_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: { ...state, message: payload },
      };
    case types.WHATSAPP_USERS_REPORT_PDF_ERROR:
    case types.EMAIL_USERS_REPORT_PDF_ERROR:
    case types.EMAIL_USERS_REPORT_MSWord_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    default:
      return state;
  }
};

export default sendReportReducer;
