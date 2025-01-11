import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import buildingLogo from '../assets/image/buildingdesign.png'
import { RxDashboard } from 'react-icons/rx'
import { FaUsers } from 'react-icons/fa'
import { IoBriefcase, IoLogOut } from 'react-icons/io5'

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isUsersOpen, setIsUsersOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const closeMenu = () => {
    setIsSidebarOpen(false)
    setIsUsersOpen(false)
  }

  const isActive = (path) => location.pathname === path
  const isParentActive = (paths) =>
    paths.some((path) => location.pathname === path)

  const userPaths = [
    '/admin/coordinator/dashboard',
    '/admin/field-executive/dashboard',
    '/admin/supervisor/dashboard',
    '/admin/auditor/dashboard',
  ]

  const handleNavigation = (path) => {
    if (!userPaths.includes(path)) {
      // Collapse Users section if navigating outside its routes
      setIsUsersOpen(false)
    }
    navigate(path)
  }

  return (
    <>
      {/* Hamburger Menu for mobile */}
      <button
        className="z-50 fixed top-5 left-3 p-2 rounded-lg bg-blue-50 shadow-lg md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle Menu"
      >
        {isSidebarOpen ? (
          <FaTimes className="text-xl" />
        ) : (
          <FaBars className="text-xl" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 w-[200px] shadow-lg bg-gray-400 flex flex-col justify-between h-full rounded-sm z-40 transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col gap-2">
          {/*<--------------------------------- Dashboard Logo----------------------------> */}
          <Link to="/admin/dashboard">
            <div
              className=" ml-7 md:ml-0 text-center md:text-left"
              onClick={closeMenu}
            >
              <img className="h-[70%] w-[70%]" src={buildingLogo} alt="Logo" />
            </div>
          </Link>

          {/* <------------------------------------Menu Section------------------------------> */}
          <ul className=" px-4 space-y-1">
            {/* Dashboard */}
            <li
              onClick={() => handleNavigation('/admin/dashboard')}
              className={`cursor-pointer flex items-center px-4 py-2 text-black text-[14px] hover:bg-[#51677E] hover:text-white rounded-lg transition-colors ${
                isActive('/admin/dashboard') ? 'bg-[#51677E] text-white' : ''
              }`}
            >
              <span className="mr-3">
                <RxDashboard className="text-[20px]" />
              </span>
              Dashboard
            </li>

            {/* Users */}
            <li
              onClick={() => setIsUsersOpen(!isUsersOpen)}
              className={`flex items-center justify-between px-4 py-2 text-black text-[14px] hover:bg-[#51677E] hover:text-white rounded-lg cursor-pointer transition-colors ${
                isParentActive(userPaths) ? 'bg-[#51677E] text-white' : ''
              }`}
            >
              <div className="flex items-center">
                <span className="mr-3">
                  <FaUsers className="text-[20px]" />
                </span>
                Users
              </div>
            </li>

            {isUsersOpen && (
              <div className="ml-8 space-y-1">
                <li
                  onClick={() =>
                    handleNavigation('/admin/coordinator/dashboard')
                  }
                  className={`flex items-center px-4 py-2 cursor-pointer text-sm text-black text-[14px] hover:bg-[#51677E] hover:text-white rounded-lg transition-colors ${
                    isActive('/admin/coordinator/dashboard')
                      ? 'bg-[#51677E] text-white'
                      : ''
                  }`}
                >
                  Co-ordinator
                </li>
                <li
                  onClick={() =>
                    handleNavigation('/admin/field-executive/dashboard')
                  }
                  className={`flex items-center px-4 py-2 cursor-pointer text-sm text-black text-[14px] hover:bg-[#51677E] hover:text-white rounded-lg transition-colors ${
                    isActive('/admin/field-executive/dashboard')
                      ? 'bg-[#51677E] text-white'
                      : ''
                  }`}
                >
                  Field Executive
                </li>
                <li
                  onClick={() =>
                    handleNavigation('/admin/supervisor/dashboard')
                  }
                  className={`flex items-center px-4 py-2 cursor-pointer text-sm text-black text-[14px] hover:bg-[#51677E] hover:text-white rounded-lg transition-colors ${
                    isActive('/admin/supervisor/dashboard')
                      ? 'bg-[#51677E] text-white'
                      : ''
                  }`}
                >
                  Supervisor
                </li>
                <li
                  onClick={() => handleNavigation('/admin/auditor/dashboard')}
                  className={`flex items-center px-4 py-2 cursor-pointer text-sm text-black text-[14px] hover:bg-[#51677E] hover:text-white rounded-lg transition-colors ${
                    isActive('/admin/auditor/dashboard')
                      ? 'bg-[#51677E] text-white'
                      : ''
                  }`}
                >
                  Auditor
                </li>
              </div>
            )}

            {/* Cases */}
            <li
              onClick={() => handleNavigation('/admin/dashboard/cases')}
              className={`cursor-pointer flex items-center px-4 py-2 text-black text-[14px] hover:bg-[#51677E] hover:text-white rounded-lg transition-colors ${
                isActive('/admin/dashboard/cases')
                  ? 'bg-[#51677E] text-white'
                  : ''
              }`}
            >
              <span className="mr-3">
                <IoBriefcase className="text-[20px]" />
              </span>
              Cases
            </li>
          </ul>
        </div>

        {/* <-----------------------------------Logout------------------------------------> */}
        <div className="px-4 py-2 border-t border-blue-100">
          <ul className="space-y-2">
            <li
              onClick={() => navigate('/')}
              className="cursor-pointer flex items-center px-4 py-2 text-black text-[14px] hover:bg-[#51677E] hover:text-white rounded-lg transition-colors"
            >
              <span className="mr-3">
                <IoLogOut className="text-[22px]" />
              </span>
              Log out
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
