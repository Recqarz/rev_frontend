import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children, isSidebarOpen, toggleSidebar, profileData }) => {
  return (
    <div className="flex !h-screen lg:!h-[100vh] w-[100%]">
      {/* Sidebar Section   md:transform-none lg:translate-x-0 lg:static */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        profileData={profileData}
      />

      {/* Main Content Section */}
      <div
        className={`!w-[85%] md:!w-[78%] lg:!w-[72%] flex-1 flex flex-col bg-gray-100 transition-all duration-300 ${
          isSidebarOpen ? "!ml-[0%] md:!-ml-[22%] lg:!-ml-[18%]" : "ml-0 "
        }`}
      >
        {/* Navbar */}
        <Navbar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          profileData={profileData}
        />
        <div className="flex-1 p-6 overflow-y-auto overflow-x-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
