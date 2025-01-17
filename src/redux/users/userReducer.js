import {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
  ADD_USER_DATA_REQUEST,
  ADD_USER_DATA_SUCCESS,
  ADD_USER_DATA_ERROR,
  UPDATE_USER_DATA_ERROR,
  UPDATE_USER_DATA_REQUEST,
  UPDATE_USER_DATA_SUCCESS,
} from "./userType";

const initialData = {
  isLoading: false,
  isError: false,
  data: [],
};

export const allUserReducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case GET_USER_DATA_REQUEST:
    case ADD_USER_DATA_REQUEST:
    case UPDATE_USER_DATA_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_USER_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    }
    case ADD_USER_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: [...state.data, payload],
      };
    }
    case UPDATE_USER_DATA_SUCCESS: {
      const updatedData = state.data.map((user) =>
        user._id === payload._id ? { ...user, ...payload } : user
      );

      return {
        ...state,
        data: updatedData,
        isLoading: false,
      };
    }
    case GET_USER_DATA_ERROR:
    case ADD_USER_DATA_ERROR:
    case UPDATE_USER_DATA_ERROR: {
      return {
        ...state,
        isError: true,
      };
    }
    default:
      return { ...state };
  }
};
