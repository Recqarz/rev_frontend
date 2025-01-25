import React, { useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProfileByToken } from "../redux/profile/profileAction";

const Navbar = ({ toggleSidebar, profileData }) => {
  const dispatch = useDispatch();
  // console.log("profileData==>", profileData);
  // useEffect(() => {
  //   dispatch(getProfileByToken(accessToken));
  // }, [dispatch]);

  return (
    <nav className="bg-green-50 p-2 flex justify-between lg:justify-end items-center shadow-sm fixed top-0 left-0 right-0 z-30">
      {/* Toggle Button for Mobile/Tablet */}
      <button
        className="block lg:hidden text-xl  text-[#073c4e] hover:bg-gray-300 rounded-full p-2"
        onClick={toggleSidebar}
        // aria-label="Toggle Sidebar"
      >
        <FaBars />
      </button>
      <div className="flex justify-center items-center gap-2 relative">
        {/* <div>
          <IoIosNotifications className="text-[#073c4e] h-6 w-6" />
        </div> */}
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
                className="px-4 py-2 uppercase text-sm border-b"
                // onClick={() => console.log("Profile")}
              >
                {profileData?.firstName} ({profileData?.role})
              </li>
              <Link to={`/${profileData?.role}/profile`}>
                <li className="px-4 py-2 hover:bg-[#073c4e] hover:text-white cursor-pointer text-sm">
                  Profile
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
