import axios from 'axios'
import {
  ADD_BANK_DATA_ERROR,
  ADD_BANK_DATA_REQUEST,
  ADD_BANK_DATA_SUCCESS,
  GET_BANK_DATA_ERROR,
  GET_BANK_DATA_REQUEST,
  GET_BANK_DATA_SUCCESS,
} from './bankType'

import {
  toastLoading,
  toastUpdate,
} from '../../utils/react-toastify/ReactToastiry'

export const getAllBankData = () => (dispatch) => {
  dispatch({ type: GET_BANK_DATA_REQUEST })

  const token = localStorage.getItem('accessToken')
  return axios
    .get(`http://localhost:8080/api/v1/admin/bank-list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch({ type: GET_BANK_DATA_SUCCESS, payload: res?.data?.data })
    })
    .catch((err) => {
      console.log('err')
      dispatch({ type: GET_BANK_DATA_ERROR })
    })
}


export const addBankData =
  (data, accessToken, navigate) => async (dispatch) => {
    const toastId = toastLoading('Loading...')
    try {
      dispatch({ type: ADD_BANK_DATA_REQUEST })
      const response = await axios.post(
        `http://localhost:8080/api/v1/admin/create-bank`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
      console.log('create user response--->', response.data)
      dispatch({ type: ADD_BANK_DATA_SUCCESS, payload: response?.data })
      toastUpdate(toastId, 200, 'Bank Added Successfully')
    } catch (error) {
      console.error('Error creating bank data:', error?.response?.data?.error)
      toastUpdate(toastId, 400, error?.response?.data?.error)
      dispatch({ type: ADD_BANK_DATA_ERROR })
    }
  }
