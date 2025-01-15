import React from 'react'
import { FaBars } from 'react-icons/fa'
import { IoIosNotifications } from 'react-icons/io'
import { RiArrowDropDownLine } from 'react-icons/ri'

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-gray-50  p-4 flex justify-between lg:justify-end items-center shadow-sm fixed top-0 left-0 right-0 z-30">
      {/* Toggle Button for Mobile/Tablet */}
      <button
        className="block lg:hidden text-xl  text-[#073c4e]"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <FaBars />
      </button>
      <div className="flex justify-center items-center gap-2 relative">
        <div>
          <IoIosNotifications className="text-[#073c4e] h-6 w-6" />
        </div>
        <div>
          <img
            className="rounded-full h-12 w-12 border-2 p-0.5 border-[#73d1ba]"
            src="https://cdn.pixabay.com/photo/2014/03/25/16/54/user-297566_640.png"
            alt=""
          />
        </div>
        <div className="relative group">
          {/* Dropdown Button */}
          <div className="cursor-pointer flex items-center">
            <RiArrowDropDownLine className="text-[#073c4e] h-8 w-7" />
          </div>

          {/* Dropdown Menu */}
          <div className="absolute top-11 right-2 bg-white border border-gray-300 shadow-lg rounded-md w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
            <ul className="flex flex-col">
              <li
                className="px-4 py-2 hover:bg-[#073c4e] hover:text-white cursor-pointer"
                onClick={() => console.log('Profile')}
              >
                Profile
              </li>
              <li className="px-4 py-2 hover:bg-[#073c4e] hover:text-white cursor-pointer">
                Accounts
              </li>
              <li className="px-4 py-2 hover:bg-[#073c4e] hover:text-white cursor-pointer">
                Signout
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
