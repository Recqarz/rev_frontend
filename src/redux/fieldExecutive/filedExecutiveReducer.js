import {
  ADD_FIELDEXECUTIVE_DATA_ERROR,
  ADD_FIELDEXECUTIVE_DATA_REQUEST,
  ADD_FIELDEXECUTIVE_DATA_SUCCESS,
  GET_FIELDEXECUTIVE_DATA_ERROR,
  GET_FIELDEXECUTIVE_DATA_REQUEST,
  GET_FIELDEXECUTIVE_DATA_SUCCESS,
  UPDATE_FIELDEXECUTIVE_DATA_ERROR,
  UPDATE_FIELDEXECUTIVE_DATA_REQUEST,
  UPDATE_FIELDEXECUTIVE_DATA_SUCCESS,
} from "./filedExecutiveType";

const initialData = {
  isLoading: false,
  isError: false,
  data: {
    message: "",
    currentPage: 1,
    totalPages: 1,
    totalUser: 0,
    fieldExecutives: [],
  },
};

export const allFieldExecutiveReducer = (
  state = initialData,
  { type, payload }
) => {
  switch (type) {
    case GET_FIELDEXECUTIVE_DATA_REQUEST:
    case ADD_FIELDEXECUTIVE_DATA_REQUEST:
    case UPDATE_FIELDEXECUTIVE_DATA_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_FIELDEXECUTIVE_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          message: payload?.message,
          currentPage: payload?.currentPage,
          totalPages: payload?.totalPages,
          totalUser: payload?.totalUser,
          fieldExecutives: payload?.users,
        },
      };
    }
    case ADD_FIELDEXECUTIVE_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: [...state.data, payload],
      };
    }
    case UPDATE_FIELDEXECUTIVE_DATA_SUCCESS: {
      const updatedData = state?.data?.fieldExecutives.map((item) =>
        item._id === payload._id ? { ...item, ...payload } : item
      );

      return {
        ...state,
        isLoading: false,
        data: { ...state.data, fieldExecutives: updatedData },
      };
    }
    case GET_FIELDEXECUTIVE_DATA_ERROR:
    case ADD_FIELDEXECUTIVE_DATA_ERROR:
    case UPDATE_FIELDEXECUTIVE_DATA_ERROR: {
      return {
        ...state,
        isError: true,
      };
    }
    default:
      return { ...state };
  }
};
