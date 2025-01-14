import React from 'react'
import Navbar from '../../../components/Navbar'
import Table from '../../../components/Table'
import AddCoordinator from '../../../components/AddCoordinator'

const CoordinatorDash = ({ isOpen, toggleSidebar }) => {
  return (
    <div className="w-full ">
      <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <Table />
      <AddCoordinator />
    </div>
  )
}

export default CoordinatorDash
