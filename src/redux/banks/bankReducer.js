import {
  ADD_BANK_DATA_ERROR,
  ADD_BANK_DATA_REQUEST,
  ADD_BANK_DATA_SUCCESS,
  GET_BANK_DATA_ERROR,
  GET_BANK_DATA_REQUEST,
  GET_BANK_DATA_SUCCESS,
  UPDATE_BANK_DATA_REQUEST,
  UPDATE_BANK_DATA_SUCCESS,
  UPDATE_BANK_DATA_ERROR,
} from "./bankType";

const initialData = {
  isLoading: false,
  isError: false,
  // data: [],
  data: {
    message: "",
    currentPage: 1,
    totalPages: 1,
    totalBank: 0,
    banks: [],
  },
};

export const allBankReducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case GET_BANK_DATA_REQUEST:
    case ADD_BANK_DATA_REQUEST:
    case UPDATE_BANK_DATA_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_BANK_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    }

    case ADD_BANK_DATA_SUCCESS: {
      return {
        ...state,
        data: [...state.data, payload],
      };
    }

    case UPDATE_BANK_DATA_SUCCESS: {
      const updatedData = state?.data?.banks?.map((bank) => {
        // console.log("Checking bank._id and payload._id", bank._id, payload._id);
        return bank._id === payload._id ? {...payload } : bank;
      });
      console.log("updatedData", updatedData);
      return {
        ...state,
        data: {
          ...state?.data,
          banks: updatedData,
        },
        isLoading: false,
      };
    }

    case GET_BANK_DATA_ERROR:
    case ADD_BANK_DATA_ERROR:
    case UPDATE_BANK_DATA_ERROR: {
      return {
        ...state,
        isError: true,
      };
    }
    default:
      return { ...state };
  }
};
