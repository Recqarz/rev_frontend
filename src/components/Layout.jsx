import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const Layout = ({ children, isSidebarOpen, toggleSidebar }) => {
  return (
    <div className="flex w-full h-screen">
      {/* Sidebar */}
      <div>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col w-full">
        {/* Navbar */}
        <Navbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        {/* Main Content */}
        <div className="p-6 mt-24">{children}</div>
      </div>
    </div>
  )
}

export default Layout
