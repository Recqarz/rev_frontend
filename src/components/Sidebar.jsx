import React from 'react'
import { FaTimes, FaUsers } from 'react-icons/fa'
import { RxDashboard } from 'react-icons/rx'
import { IoBriefcase, IoLogOut } from 'react-icons/io5'
import { BsBank2 } from 'react-icons/bs'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MdDashboard } from 'react-icons/md'

const roleBasedMenu = {
  admin: [
    { name: 'Dashboard', icon: <MdDashboard />, path: '/admin/dashboard' },
    { name: 'Users', icon: <FaUsers />, path: '/admin/dashboard/all/users' },
    { name: 'Banks', icon: <BsBank2 />, path: '/admin/dashboard/all/banks' },
    { name: 'Cases', icon: <IoBriefcase />, path: '/admin/dashboard/cases' },
  ],
  coordinator: [
    {
      name: 'Dashboard',
      icon: <MdDashboard />,
      path: '/coordinator/dashboard',
    },
    {
      name: 'Field Executives',
      icon: <FaUsers />,
      path: '/coordinator/fieldexecutives',
    },
    { name: 'Cases', icon: <IoBriefcase />, path: '/coordinator/cases' },
  ],
  fieldExecutive: [
    {
      name: 'Dashboard',
      icon: <MdDashboard />,
      path: '/fieldexecutive/dashboard',
    },
    { name: 'Tasks', icon: <IoBriefcase />, path: '/fieldexecutive/tasks' },
  ],
  supervisor: [
    { name: 'Dashboard', icon: <MdDashboard />, path: '/supervisor/dashboard' },
    { name: 'Reports', icon: <IoBriefcase />, path: '/supervisor/reports' },
  ],
  auditor: [
    { name: 'Dashboard', icon: <MdDashboard />, path: '/auditor/dashboard' },
    { name: 'Audits', icon: <IoBriefcase />, path: '/auditor/audits' },
  ],
}

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const { role } = useSelector((store) => store.authReducer) // Fetch role from Redux
  const menuItems = roleBasedMenu[role] || []
  console.log('role-->', role)
  const isActive = (path) => location.pathname === path

  const handleNavigation = (path) => {
    navigate(path)
  }

  const handleLogout = () => {
    dispatch({ type: 'USER_LOGOUT_SUCCESS' })
  }

  return (
    <aside
      className={`bg-white shadow-lg rounded-sm h-screen lg:sticky lg:h-[100vh] w-48 lg:w-56 p-4 top-0 left-0 fixed z-50 transform transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="text-gray-500 lg:hidden">
            <FaTimes />
          </button>
          <div className=" flex justify-center items-center w-full">
            <h1 className="text-lg font-medium text-[#51677E]">REV</h1>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col justify-between h-full">
          <ul className="mt-6 space-y-1">
            {menuItems.map((item) => (
              <li
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`cursor-pointer flex items-center px-4 py-2 text-[14px] text-gray-500 hover:bg-[#51677E] hover:!text-white rounded-lg transition-colors ${
                  isActive(item.path) ? 'bg-[#51677E] !text-white' : ''
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        {/* Logout */}
        <button
          onClick={handleLogout}
          // className="mt-auto flex items-center px-4 py-2 text-gray-500 hover:[#51677E] hover:text-white rounded-lg"
          className="cursor-pointer flex items-center px-4 py-2 text-[14px] text-gray-500 hover:bg-[#51677E] hover:!text-white rounded-lg transition-colors"
        >
          <IoLogOut className="mr-3 text-[20px]" />
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
