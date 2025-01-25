import {
  ADD_CASE_DATA_ERROR,
  ADD_CASE_DATA_REQUEST,
  ADD_CASE_DATA_SUCCESS,
  GET_CASE_DATA_ERROR,
  GET_CASE_DATA_REQUEST,
  GET_CASE_DATA_SUCCESS,
  UPDATE_CASE_DATA_ERROR,
  UPDATE_CASE_DATA_REQUEST,
  UPDATE_CASE_DATA_SUCCESS,
} from "./caseType";

const initialData = {
  isLoading: false,
  isError: false,
  data: {
    message: "",
    currentPage: 1,
    totalPages: 1,
    totalCase: 0,
    cases: [],
  },
};

// data:{...state?.data, users:payload}

const caseReducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case GET_CASE_DATA_REQUEST:
    case ADD_CASE_DATA_REQUEST:
    case UPDATE_CASE_DATA_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_CASE_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    }
    case ADD_CASE_DATA_SUCCESS: {
      // return {
      //   ...state,
      //   isLoading: false,
      //   data: [...state.data, payload],
      // };

      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          cases: [...(state.data.cases || []), payload], // Append new case to existing cases
        },
      };
    }

    case UPDATE_CASE_DATA_SUCCESS: {
      const updatedCases = state?.data?.cases?.length
        ? state?.data?.cases?.map((caseItem) =>
            caseItem._id === payload._id
              ? { ...caseItem, ...payload }
              : caseItem
          )
        : [payload]; // If no cases exist, initialize with the payload

      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          cases: updatedCases,
        },
      };

      // return {
      //   ...state,
      //   isLoading: false,
      //   // data: { ...state.data, cases: payload },
      // };
    }
    case GET_CASE_DATA_ERROR:
    case ADD_CASE_DATA_ERROR:
    case UPDATE_CASE_DATA_ERROR: {
      return {
        ...state,
        isError: true,
      };
    }
    default:
      return state;
  }
};

export default caseReducer;
