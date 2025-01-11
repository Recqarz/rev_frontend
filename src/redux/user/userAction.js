import { LOGIN_SUCCESS, USER_ROLE } from "./userTypes";

export const getLoginRequestSuccess = (payload) => {
  return { type: LOGIN_SUCCESS, payload };
};

export const updateRole = (payload) => {
  return {
    type: USER_ROLE,
    payload,
  };
};
