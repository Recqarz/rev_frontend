import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children, isSidebarOpen, toggleSidebar, profileData }) => {
  return (
    <div className="flex w-full ">
      {/* Sidebar */}
      <div>
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          profileData={profileData}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col w-full">
        <Navbar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          profileData={profileData}
        />
        <div className="p-6 mt-12">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
