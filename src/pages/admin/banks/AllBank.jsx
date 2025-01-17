import React, { useEffect } from 'react'
import Navbar from '../../../components/Navbar'
import { getAllBankData } from '../../../redux/banks/bankAction'
import { useDispatch, useSelector } from 'react-redux'
import BankTable from '../../../components/BankTable'

const AllBank = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch()
  const allBank = useSelector((state) => state?.allBankReducer?.data)
  useEffect(() => {
    dispatch(getAllBankData())
  }, [dispatch])
  // console.log('all bank---->', allBank)
  return (
    <div className="w-full">
      <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <BankTable allBank={allBank} />
    </div>
  )
}

export default AllBank
