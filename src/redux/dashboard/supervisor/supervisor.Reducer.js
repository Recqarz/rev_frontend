import {
  GET_SUPERVISOR_DATA_REQUEST,
  GET_SUPERVISOR_DATA_SUCCESS,
  GET_SUPERVISOR_DATA_ERROR,
  } from "./supervisor.Type";


const initialData = {
  isLoading: false,
  isError: false,
  data:[]
};

const supervisorDashReducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case GET_SUPERVISOR_DATA_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_SUPERVISOR_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: { ...state.data, allList: payload.data },
      };
    }

    case GET_SUPERVISOR_DATA_ERROR: {
      return {
        ...state,
        isError: true,
      };
    }
    default:
      return state;
  }
};

export default supervisorDashReducer;

