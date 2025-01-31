import {
  GET_ADMIN_DATA_ERROR,
  GET_ADMIN_DATA_REQUEST,
  GET_ADMIN_DATA_SUCCESS,
} from "./adminType";

const initialData = {
  isLoading: false,
  isError: false,
  data: {
    message: "",
    currentPage: 1,
    totalPages: 1,
    totalCase: 0,
    allList: [],
  },
};

const adminReducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case GET_ADMIN_DATA_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_ADMIN_DATA_SUCCESS: {
      console.log("reducer payload==>", payload);
      return {
        ...state,
        isLoading: false,
        data: { ...state.data, allList: payload.data },
      };
    }
    case GET_ADMIN_DATA_ERROR: {
      return {
        ...state,
        isError: true,
      };
    }
    default:
      return state;
  }
};

export default adminReducer;
