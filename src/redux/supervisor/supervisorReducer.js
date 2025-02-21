import * as types from "./supervisorType";

const initialData = {
  isLoading: false,
  isError: false,
  data: {
    message: "",
    pagination: { currentPage: 1, totalCases: "", totalPages: "" },
    cases: [],
  },
};

const supervisorReducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case types.GET_SUPERVISOR_DATA_REQUEST:
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

    case types.GET_SUPERVISOR_DATA_ERROR:
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
