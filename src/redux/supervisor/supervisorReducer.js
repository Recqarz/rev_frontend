import * as types from "./supervisorType";

const initialData = {
  isLoading: false,
  isError: false,
  data: {
    message: "",
    details: [],
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
          details: payload?.data,
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
