import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/Navbar'
import Table from '../../../components/Table'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserData } from '../../../redux/users/userAction'

const CoordinatorDash = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch()
  const allUser = useSelector((user) => user.allUserReducer.data)
  console.log('user', allUser)

  useEffect(() => {
    dispatch(getAllUserData())
  }, [])

  return (
    <div className="w-full ">
      <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <Table />
      {/* <AddCoordinator /> */}
    </div>
  )
}

export default CoordinatorDash
