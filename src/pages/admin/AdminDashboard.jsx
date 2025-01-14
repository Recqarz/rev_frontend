import React from 'react'
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
      const loginStatus=useSelector((store)=>store
    );
      console.log("Store", loginStatus);
  return (
    <div>Welcome to Admin Dashboard</div>
  )
}

export default AdminDashboard