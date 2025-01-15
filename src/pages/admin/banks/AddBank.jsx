import React from 'react'
import AddBankForm from '../../../components/AddBankForm'
import Navbar from '../../../components/Navbar'

const AddBank = ({ isOpen, toggleSidebar }) => {
  return (
    <div className="w-full">
      <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <AddBankForm />
    </div>
  )
}

export default AddBank
