import {
  GET_AUDITOR_DATA_REQUEST,
  GET_AUDITOR_DATA_SUCCESS,
  GET_AUDITOR_DATA_ERROR,
  } from "./auditor.Type";


const initialData = {
  isLoading: false,
  isError: false,
  data:[]
};

const auditorDashReducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case GET_AUDITOR_DATA_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_AUDITOR_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: { ...state.data, allList: payload.data },
      };
    }

    case GET_AUDITOR_DATA_ERROR: {
      return {
        ...state,
        isError: true,
      };
    }
    default:
      return state;
  }
};

export default auditorDashReducer;

