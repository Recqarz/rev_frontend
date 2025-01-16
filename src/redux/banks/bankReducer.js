import {
  ADD_BANK_DATA_ERROR,
  ADD_BANK_DATA_REQUEST,
  ADD_BANK_DATA_SUCCESS,
  GET_BANK_DATA_ERROR,
  GET_BANK_DATA_REQUEST,
  GET_BANK_DATA_SUCCESS,
} from './bankType'

const initialData = {
  isLoading: false,
  isError: false,
  data: [],
}

export const allBankReducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case GET_BANK_DATA_REQUEST:
    case ADD_BANK_DATA_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case GET_BANK_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: payload,
      }
    }

    case ADD_BANK_DATA_SUCCESS: {
      return {
        ...state,
        data: [...state.data, payload],
      }
    }
    case GET_BANK_DATA_ERROR:
    case ADD_BANK_DATA_ERROR: {
      return {
        ...state,
        isError: true,
      }
    }
    default:
      return { ...state }
  }
}
