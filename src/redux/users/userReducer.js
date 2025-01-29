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
  data: {
    message: "",
    currentPage: 1,
    totalPages: 1,
    totalUser: 0,
    users: [],
  },
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
      // console.log("Reducer state===>", state);
      // console.log("Reducer state?.data===>", state?.data);
      // console.log("user reducer payload==>", payload);
      return {
        ...state,
        isLoading: false,
        data: { ...state.data, users: payload.newUser },
      };
    }
    case UPDATE_USER_DATA_SUCCESS: {
      console.log("Reducer payload===>", payload);
      console.log("Reducer state===>", state);
      console.log("Reducer state?.data===>", state?.data);
      console.log("Reducer state?.data?.users===>", state?.data?.users);

      const updatedData = state?.data?.users.map((user) =>
        user._id === payload._id ? { ...user, ...payload } : user
      );
      console.log("updatedData===>", updatedData);
      return {
        ...state,
        isLoading: false,
        data: { ...state.data, users: updatedData },
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
