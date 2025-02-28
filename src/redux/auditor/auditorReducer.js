import {
  ALL_CASE_DATA_AUDITOR_ERROR,
  ALL_CASE_DATA_AUDITOR_REQUEST,
  ALL_CASE_DATA_AUDITOR_SUCCESS,
  CASE_DATA_ID_AUDITOR_REQUEST,
  CASE_DATA_ID_AUDITOR_SUCCESS,
  CASE_DATA_ID_AUDITOR_ERROR,
  APPROVE_DATA_BY_AUDITOR_REQUEST,
  APPROVE_DATA_BY_AUDITOR_SUCCESS,
  APPROVE_DATA_BY_AUDITOR_ERROR
} from "./auditorType";

const initialData = {
  isLoading: false,
  isError: false,
  data: {
    message: "",
    pagination: { currentPage: 1, totalCases: "", totalPages: "" },
    cases: [],
    indivisualData: {},
    approvedData:{}
  },
};

export const auditorReducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case ALL_CASE_DATA_AUDITOR_REQUEST:
    case CASE_DATA_ID_AUDITOR_REQUEST:
    case APPROVE_DATA_BY_AUDITOR_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case ALL_CASE_DATA_AUDITOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: {
          ...state.data,
          message: payload?.message,
          cases: payload?.cases,
          pagination: payload?.pagination,
        },
      };
    case CASE_DATA_ID_AUDITOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: {
            ...state.data,
            message: payload?.message,
            indivisualData: payload,
        },
      };
    case APPROVE_DATA_BY_AUDITOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: {
            ...state.data,
            message: payload?.message,
            approvedData: payload,
        },
      };

    case ALL_CASE_DATA_AUDITOR_ERROR:
    case CASE_DATA_ID_AUDITOR_ERROR:
    case APPROVE_DATA_BY_AUDITOR_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};
