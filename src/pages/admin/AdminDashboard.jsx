import React from 'react'
import Navbar from '../../components/Navbar'

const AdminDashboard = ({ isOpen, toggleSidebar }) => {
  return (
    <div className="w-full">
      <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <h1 className="mt-24 ml-24">Welcome To Admin Deshboard</h1>
    </div>
  )
}

export default AdminDashboard
