import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../../../components/Navbar'
import { getAllUserData } from '../../../redux/users/userAction'
import UserTable from '../../../components/UserTable'

const AllUser = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch()

  // console.log('allUser-->', allUser)

  useEffect(() => {
    dispatch(getAllUserData())
  }, [dispatch])

  return (
    <div className="">
      <UserTable />
    </div>
  )
}

export default AllUser
