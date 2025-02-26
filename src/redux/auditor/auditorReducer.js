import { ALL_CASE_DATA_AUDITOR_ERROR, ALL_CASE_DATA_AUDITOR_REQUEST, ALL_CASE_DATA_AUDITOR_SUCCESS } from "./auditorType";

const initialData = {
  isLoading: false,
  isError: false,
  data: {
    message: "",
    pagination: { currentPage: 1, totalCases: "", totalPages: "" },
    cases: []
  },
};

export const auditorReducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case ALL_CASE_DATA_AUDITOR_REQUEST:
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

    case ALL_CASE_DATA_AUDITOR_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};
