import React, { useState } from 'react'
import buildingImage from '../assets/image/building.jpg'
import bildinglogo1 from '../assets/image/buildingdesign.png'
import bildinglogo2 from '../assets/image/buildingdesigning.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
// import {toast} from "react-hot-toast";
import { getLoginRequestSuccess, updateRole } from '../redux/user/userAction'
import {
  toastLoading,
  toastUpdate,
} from '../utils/react-toastify/ReactToastiry'
import { baseURL } from '../utils/urls/baseURL'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loginRole, setLoginRole] = useState('')
  const [userCode, setUserCode] = useState('')
  const [password, setPassword] = useState('')

  const obj = { userCode, password }

  const handleForm = (e) => {
    e.preventDefault()
    const toastId = toastLoading('Loading....')
    axios
      .post(`${baseURL}/api/v1/user/login`, obj)
      .then((res) => {
        const { accessToken, role } = res?.data?.data
        console.log(accessToken, role)
        if (role === loginRole) {
          toastUpdate(toastId, 200, 'Login success!')
          localStorage.setItem('revRole', role)
          localStorage.setItem('revToken', accessToken)
          navigate(`/${role}/dashboard`)
          dispatch(getLoginRequestSuccess(accessToken))
          dispatch(updateRole(role))
        } else {
          // alert("Invalid role selected");
          toastUpdate(toastId, 400, 'Oops! Invalid role selected!')
        }
      })
      .catch((err) => {
        toastUpdate(toastId, 401, 'Oops! Login failed!')
        console.log('err', err?.response?.data?.error)
      })
  }
  const handleChangeRoleFunc = (e) => {
    setLoginRole(e.target.value)
  }

  return (
    <div className="py-5 overflow-hidden mt-5">
      <form onSubmit={handleForm}>
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div
            className="hidden lg:block lg:w-1/2 bg-cover"
            style={{ backgroundImage: `url(${buildingImage})` }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <h2 className="text-4xl font-semibold text-center text-green-600">
              Login
            </h2>

            <div className="mt-4">
              <div className="flex mt-10">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Select Role
                </label>
                <span className="text-red-500 ml-1 text-xl">*</span>
              </div>
              <select
                className="w-full text-grey border-2 rounded-lg p-2 pl-2 pr-2 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                onChange={handleChangeRoleFunc}
                required
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="coordinator">Coordinator</option>
                <option value="fieldexecutive">Field-Executive</option>
                <option value="supervisor">Supervisor</option>
                <option value="auditor">Auditor</option>
              </select>
            </div>

            <div className="mt-4">
              <div className="flex">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <span className="text-red-500 ml-1 text-xl">*</span>
              </div>
              <input
                className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-gray-500"
                type="text"
                placeholder="suman.saurav@recqarz.com"
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                required
              />
            </div>

            <div className="mt-4">
              <div className="flex">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <span className="text-red-500 ml-1 text-xl">*</span>
              </div>

              <input
                className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full placeholder-gray-500"
                type="password"
                placeholder="*******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end">
              <Link to="/resetpassword">Forget Password?</Link>
            </div>
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="bg-green-700 text-white font-bold py-2 px-4 w-1/4 rounded hover:bg-green-600"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="lg:flex lg:justify-center gap-4 -mb-8 hidden lg:block">
        <img className="w-[18%] h-24" src={bildinglogo1} alt="build" />
        <img className="w-[18%] h-24" src={bildinglogo2} alt="build2" />
        <img className="w-[18%] h-24" src={bildinglogo1} alt="build" />
        <img className="w-[18%] h-24" src={bildinglogo2} alt="build2" />
      </div>
    </div>
  )
}

export default Login
