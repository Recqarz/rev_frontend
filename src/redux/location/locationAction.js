import axios from "axios";
import {
  toastError,
  toastLoading,
  toastUpdate,
} from "../../utils/react-toastify/ReactToastiry";
import { baseURL } from "../../utils/urls/baseURL";
import * as types from "./locationType";

// ✅ Fetch All location // state wise districts
export const getLocationAll = (accessToken) => async (dispatch) => {
  dispatch({ type: types.GET_LOCATIONALL_DATA_REQUEST });
  return axios
    .get(`${baseURL}/api/v1/location/all`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((res) => {
      console.log("all location res==>", res);
      dispatch({
        type: types.GET_LOCATIONALL_DATA_SUCCESS,
        payload: res?.data,
      });
    })
    .catch((err) => {
      console.error("Error fetching states:", err?.response?.data?.error);
      dispatch({ type: types.GET_LOCATIONALL_DATA_ERROR });
      toastError(err?.response?.data?.error);
    });
};

// ✅ Fetch All States
export const getAllStates = (accessToken) => async (dispatch) => {
  dispatch({ type: types.GET_STATE_DATA_REQUEST });
  return axios
    .get(`${baseURL}/api/v1/location/state-list`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((res) => {
      // console.log("all state res==>", res);
      dispatch({ type: types.GET_STATE_DATA_SUCCESS, payload: res?.data });
    })
    .catch((err) => {
      console.error("Error fetching states:", err?.response?.data?.error);
      dispatch({ type: types.GET_STATE_DATA_ERROR });
      toastError(err?.response?.data?.error);
    });
};

// Add State
export const addState = (stateData, accessToken) => async (dispatch) => {
  const toastId = toastLoading("Loading...");
  dispatch({ type: types.ADD_STATE_DATA_REQUEST });
  return axios
    .post(`${baseURL}/api/v1/location/state`, stateData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((res) => {
      // console.log("add state res-->", res);
      dispatch({
        type: types.ADD_STATE_DATA_SUCCESS,
        payload: res?.data?.data,
      });
      toastUpdate(toastId, 200, res?.data?.message);
    })
    .catch((err) => {
      console.error("Error adding state:", err?.response?.data?.error);
      dispatch({ type: types.ADD_STATE_DATA_ERROR });
      toastError(err?.response?.data?.error);
    });
};

// Add District
export const addDistrict = (districtData, accessToken) => async (dispatch) => {
  const toastId = toastLoading("Loading...");
  dispatch({ type: types.ADD_DISTRICT_DATA_REQUEST });
  return axios
    .post(`${baseURL}/api/v1/location/district`, districtData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((res) => {
      // console.log("add dist res==>", res);
      dispatch({
        type: types.ADD_DISTRICT_DATA_SUCCESS,
        payload: res?.data?.data,
      });
      toastUpdate(toastId, 200, res?.data?.message);
    })
    .catch((err) => {
      console.error("Error adding district:", err?.response?.data?.error);
      dispatch({ type: types.ADD_DISTRICT_DATA_ERROR });
      toastError(err?.response?.data?.error);
    });
};

// Fetch Districts by State ID
export const getAllDistricts = (stateId, accessToken) => async (dispatch) => {
  console.log("stateId action==>", stateId);
  dispatch({ type: types.GET_DISTRICT_DATA_REQUEST });
  return axios
    .get(`${baseURL}/api/v1/location/district-list/${stateId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((res) => {
      // console.log("get dist res==>", res);
      dispatch({ type: types.GET_DISTRICT_DATA_SUCCESS, payload: res?.data });
    })
    .catch((err) => {
      console.error("Error fetching districts:", err);
      console.error("Response data:", err?.response?.data); // Add this to debug further
      dispatch({ type: types.GET_DISTRICT_DATA_ERROR });
      toastError(err?.response?.data?.error || "An unexpected error occurred");
    });
};

// ✅ Add Zone
export const addZone = (zoneData, accessToken) => async (dispatch) => {
  const toastId = toastLoading("Loading...");
  dispatch({ type: types.ADD_ZONE_DATA_REQUEST });
  return axios
    .post(`${baseURL}/api/v1/location/zone`, zoneData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((res) => {
      // console.log("res zone==>", res);
      dispatch({ type: types.ADD_ZONE_DATA_SUCCESS, payload: res?.data?.data });
      toastUpdate(toastId, 200, res?.data?.message);
    })
    .catch((err) => {
      console.error("Error adding zone:", err?.response?.data?.error);
      dispatch({ type: types.ADD_ZONE_DATA_ERROR });
      toastUpdate(toastId, 400, err?.response?.data?.error);
    });
};

// Fetch Zones by District ID
export const getAllZones = (districtId, accessToken) => async (dispatch) => {
  dispatch({ type: types.GET_ZONE_DATA_REQUEST });
  return axios
    .get(`${baseURL}/api/v1/location/zone-list/${districtId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((res) => {
      // console.log("get zone res==>", res);
      dispatch({ type: types.GET_ZONE_DATA_SUCCESS, payload: res?.data });
    })
    .catch((err) => {
      console.error("Error fetching zones:", err?.response?.data?.error);
      dispatch({ type: types.GET_ZONE_DATA_ERROR });
      toastError(err?.response?.data?.error);
    });
};
