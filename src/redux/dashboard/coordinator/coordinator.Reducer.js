import {
  GET_COORDINAOR_DATA_REQUEST,
  GET_COORDINAOR_DATA_SUCCESS,
  GET_COORDINAOR_DATA_ERROR,
  } from "./coordinator.Type";


const initialData = {
  isLoading: false,
  isError: false,
  data:[]
};

const coordinatorReducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case GET_COORDINAOR_DATA_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_COORDINAOR_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: { ...state.data, allList: payload.data },
      };
    }

    case GET_COORDINAOR_DATA_ERROR: {
      return {
        ...state,
        isError: true,
      };
    }
    default:
      return state;
  }
};

export default coordinatorReducer;

