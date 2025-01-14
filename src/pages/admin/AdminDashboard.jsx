import React from 'react'
import Navbar from '../../components/Navbar'

const AdminDashboard = ({ isOpen, toggleSidebar }) => {
  return (
    <div className="w-full">
      <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
    </div>
  )
}

export default AdminDashboard
