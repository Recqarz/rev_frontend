import React from 'react'
import AddUserForm from '../../../components/AddUserForm'
import Navbar from '../../../components/Navbar'

const AddUser = ({ isOpen, toggleSidebar }) => {
  return (
    <div className="w-full">
      <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <AddUserForm />
    </div>
  )
}

export default AddUser
