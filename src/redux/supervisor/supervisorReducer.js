import * as types from "./supervisorType";

const initialData = {
  isLoading: false,
  isError: false,
  data: {
    message: "",
    pagination: { currentPage: 1, totalCases: "", totalPages: "" },
    cases: [],
    individualCompareData: {},
    updateData: {},
    approvedData:{}
  },
};

const supervisorReducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case types.GET_SUPERVISOR_DATA_REQUEST:
    case types.GET_CASE_DATA_BY_SUPERVISOR_REQUEST:
    case types.UPDATE_DATA_BY_SUPERVISOR_REQUEST:
    case types.APPROVE_CASE_BY_SUPERVISOR_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case types.GET_SUPERVISOR_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          message: payload?.message,
          cases: payload?.cases,
          pagination: payload?.pagination,
        },
      };
    case types.GET_CASE_DATA_BY_SUPERVISOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          message: payload?.message,
          individualCompareData: payload,
        },
      };
    case types.UPDATE_DATA_BY_SUPERVISOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          message: payload?.message,
          updateData: payload,
        },
      };
    case types.APPROVE_CASE_BY_SUPERVISOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          message: payload?.message,
          approvedData: payload,
        },
      };

    case types.GET_SUPERVISOR_DATA_ERROR:
    case types.GET_CASE_DATA_BY_SUPERVISOR_ERROR:
    case types.UPDATE_DATA_BY_SUPERVISOR_ERROR:
    case types.APPROVE_CASE_BY_SUPERVISOR_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    default:
      return state;
  }
};

export default supervisorReducer;
