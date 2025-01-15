import {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
} from "./userType";

const initialData = {
  isLoading: false,
  isError: false,
  data: [],
};

export const allUserReducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case GET_USER_DATA_REQUEST: {
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
    case GET_USER_DATA_ERROR: {
      return {
        ...state,
        isError: true,
      };
    }
    default:
      return { ...state };
  }
};
