import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../../../components/Navbar'
import { getAllUserData } from '../../../redux/users/userAction'
import UserTable from '../../../components/UserTable'

const AllUser = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch()
  const allUser = useSelector((state) => state.allUserReducer.data)

  useEffect(() => {
    dispatch(getAllUserData())
  }, [dispatch])

  return (
    <div className="w-full">
      <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <UserTable allUser={allUser} />
    </div>
  )
}

export default AllUser
