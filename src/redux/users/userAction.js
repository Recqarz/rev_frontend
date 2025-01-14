import axios from "axios";
import {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
} from "./userType";

export const getAllUserData = () => (dispatch) => {
  dispatch({ type: GET_USER_DATA_REQUEST });

  const token=localStorage.getItem("accessToken");
  return axios
    .get(`http://localhost:8080/api/v1/admin/user-list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch({ type: GET_USER_DATA_SUCCESS, payload: res?.data?.users });
    })
    .catch((err) => {
      console.log("err");
      dispatch({ type: GET_USER_DATA_ERROR });
    });
};
