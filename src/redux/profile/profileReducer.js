import {
  ADD_PROFILE_DATA_ERROR,
  ADD_PROFILE_DATA_REQUEST,
  ADD_PROFILE_DATA_SUCCESS,
  GET_PROFILE_DATA_ERROR,
  GET_PROFILE_DATA_REQUEST,
  GET_PROFILE_DATA_SUCCESS,
  UPDATE_PROFILE_DATA_ERROR,
  UPDATE_PROFILE_DATA_REQUEST,
  UPDATE_PROFILE_DATA_SUCCESS,
} from "./profileType";

const initialData = {
  isLoading: false,
  isError: false,
  data: {
    message: "",
    users: {},
  },
};

export const profileReducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case GET_PROFILE_DATA_REQUEST:
    case ADD_PROFILE_DATA_REQUEST:
    case UPDATE_PROFILE_DATA_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_PROFILE_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    }
    case ADD_PROFILE_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: [...state.data, payload],
      };
    }
    case UPDATE_PROFILE_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: { ...state.data, ...payload },
      };
    }
    case GET_PROFILE_DATA_ERROR:
    case ADD_PROFILE_DATA_ERROR:
    case UPDATE_PROFILE_DATA_ERROR: {
      return {
        ...state,
        isError: true,
      };
    }
    default:
      return { ...state };
  }
};
