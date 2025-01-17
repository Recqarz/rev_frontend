import axios from 'axios'
import {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
  ADD_USER_DATA_REQUEST,
  ADD_USER_DATA_SUCCESS,
  ADD_USER_DATA_ERROR,
  UPDATE_USER_DATA_REQUEST,
  UPDATE_USER_DATA_SUCCESS,
  UPDATE_USER_DATA_ERROR,
} from './userType'
import {
  toastLoading,
  toastUpdate,
} from '../../utils/react-toastify/ReactToastiry'
import { baseURL } from '../../utils/urls/baseURL'

// export const getAllUserData = () => (dispatch) => {
//   dispatch({ type: GET_USER_DATA_REQUEST })
//   const token = localStorage.getItem('accessToken')
//   return axios
//     .get(`${baseURL}/api/v1/admin/user-list`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     .then((res) => {
//       dispatch({ type: GET_USER_DATA_SUCCESS, payload: res?.data?.users })
//     })
//     .catch((err) => {
//       console.log('err')
//       dispatch({ type: GET_USER_DATA_ERROR })
//     })
// }

export const getAllUserData = (queryString) => async (dispatch) => {
  dispatch({ type: GET_USER_DATA_REQUEST })
  const token = localStorage.getItem('accessToken')

  try {
    // const queryString = new URLSearchParams(filters).toString(); // Build query string dynamically
    const response = await axios
      .get(`${baseURL}/api/v1/admin/user-list?${queryString}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res) => {
        console.log('res--->', res)
        dispatch({ type: GET_USER_DATA_SUCCESS, payload: res?.data })
      })
  } catch (error) {
    console.error('Error fetching user data:', error?.response?.data?.message)
    dispatch({ type: GET_USER_DATA_ERROR })
  }
}

export const addUserData =
  (data, accessToken, navigate) => async (dispatch) => {
    const toastId = toastLoading('Loading...')
    try {
      dispatch({ type: ADD_USER_DATA_REQUEST })
      const response = await axios.post(
        `${baseURL}/api/v1/admin/create-user`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
      dispatch({ type: ADD_USER_DATA_SUCCESS, payload: response?.data })
      toastUpdate(toastId, 200, 'User Added Successfully')
    } catch (error) {
      console.error('Error creating user data:', error?.response?.data?.error)
      toastUpdate(toastId, 400, error?.response?.data?.error)
      dispatch({ type: ADD_USER_DATA_ERROR })
    }
  }

export const updateUserData = (data, accessToken, id) => async (dispatch) => {
  const toastId = toastLoading('Loading...')
  dispatch({ type: UPDATE_USER_DATA_REQUEST })
  return axios
    .patch(`${baseURL}/api/v1/admin/user/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      console.log(res)
      dispatch({
        type: UPDATE_USER_DATA_SUCCESS,
        payload: res?.data?.data?.updatedUserDetails,
      })
      toastUpdate(toastId, 200, res?.data?.message)
    })
    .catch((err) => {
      console.log('err', err)
      toastUpdate(toastId, 400, err?.response?.data?.error)
      dispatch({ type: UPDATE_USER_DATA_ERROR })
    })
}
