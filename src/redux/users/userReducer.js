import {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
  ADD_USER_DATA_REQUEST,
  ADD_USER_DATA_SUCCESS,
  ADD_USER_DATA_ERROR,
} from './userType'

const initialData = {
  isLoading: false,
  isError: false,
  data: {
    message: '',
    currentPage:1,
    totalPages: 1,
    totalUser: 0,
    users: [],
  },
}

export const allUserReducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case GET_USER_DATA_REQUEST:
    case ADD_USER_DATA_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case GET_USER_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: payload,
      }
    }
    case ADD_USER_DATA_SUCCESS: {
      return {
        ...state,
        data: [...state.data, payload],
      }
    }
    case GET_USER_DATA_ERROR:
    case ADD_USER_DATA_ERROR: {
      return {
        ...state,
        isError: true,
      }
    }
    default:
      return { ...state }
  }
}
