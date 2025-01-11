import { LOGIN_SUCCESS, USER_ROLE } from "./userTypes";

const initialData = {
  role: localStorage.getItem("revRole") || "",
  isLogin: localStorage.getItem("revToken") ? true : false,
};

const userReducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS: {
      return { ...state, isLogin: payload };
    }
    case USER_ROLE: {
      return { ...state, role: payload };
    }

    default:
      return state;
  }
};

export default userReducer;
