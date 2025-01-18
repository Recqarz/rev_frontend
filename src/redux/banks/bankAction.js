import axios from "axios";
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

import {
  toastError,
  toastLoading,
  toastUpdate,
} from "../../utils/react-toastify/ReactToastiry";
import { baseURL } from "../../utils/urls/baseURL";

export const getAllBankData = () => (dispatch) => {
  dispatch({ type: GET_BANK_DATA_REQUEST });

  const token = localStorage.getItem("accessToken");
  return axios
    .get(`${baseURL}/api/v1/admin/bank-list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch({ type: GET_BANK_DATA_SUCCESS, payload: res?.data?.banks });
    })
    .catch((err) => {
      console.log(err?.response?.data?.error);
      dispatch({ type: GET_BANK_DATA_ERROR });
      toastError(err?.response?.data?.error);
    });
};

export const addBankData =
  (data, accessToken, navigate) => async (dispatch) => {
    const toastId = toastLoading("Loading...");
    try {
      dispatch({ type: ADD_BANK_DATA_REQUEST });
      const response = await axios.post(
        `${baseURL}/api/v1/admin/create-bank`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("create user response--->", response.data);
      dispatch({ type: ADD_BANK_DATA_SUCCESS, payload: response?.data });
      toastUpdate(toastId, 200, "Bank Added Successfully");
    } catch (error) {
      console.error("Error creating bank data:", error?.response?.data?.error);
      toastUpdate(toastId, 400, error?.response?.data?.error);
      dispatch({ type: ADD_BANK_DATA_ERROR });
    }
  };

export const bankDataUpdate = (data, accessToken, id) => async (dispatch) => {
  const toastId = toastLoading("Loading...");
  console.log("alldata", data, accessToken, id);
  dispatch({ type: UPDATE_BANK_DATA_REQUEST });
  try {
    const res = await axios.patch(
      `http://localhost:8080/api/v1/admin/bank/update/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("res", res?.data?.data?.bankdetails);
    dispatch({
      type: UPDATE_BANK_DATA_SUCCESS,
      payload: res?.data?.data?.bankdetails,
    });
    toastUpdate(toastId, 200, "Success");
  } catch (err) {
    console.log("err", err?.response?.data?.error);
    toastUpdate(toastId, 400, err?.response?.data?.error);
    dispatch({ type: UPDATE_BANK_DATA_ERROR });
  }
};
