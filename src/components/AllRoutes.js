import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from '../pages/admin/AdminDashboard'
import Sidebar from './Sidebar'
import CoordinatorDashboard from '../pages/coordinator/CoordinatorDashboard'
import AuditorDashboard from '../pages/auditor/AuditorDashboard'
import SupervisorDashboard from '../pages/supervisor/SupervisorDashboard'
import FieldExecutive from '../pages/field_executive/FieldExecutive'
import CoordinatorDash from '../pages/admin/admin_coordinator/CoordinatorDash'
import FieldExecutiveDash from '../pages/admin/admin_fieldexecutive/FieldExecutiveDash'
import SuperVisorDash from '../pages/admin/admin_supervisor/SuperVisorDash'
import AuditorDash from '../pages/admin/admin_auditor/AuditorDash'
import AllUser from '../pages/admin/users/AllUser'
import AddUser from '../pages/admin/users/AddUser'
import AllBank from '../pages/admin/banks/AllBank'
import AddBankForm from './AddBankForm'
import AddBank from '../pages/admin/banks/AddBank'
const AllRoutes = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <>
      <div className="flex w-full">
        <div>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
        <div className="w-full">
          <Routes>
            <Route
              path="/admin/dashboard"
              element={<AdminDashboard toggleSidebar={toggleSidebar} />}
            />

            <Route
              path="/admin/dashboard/all/users"
              element={<AllUser toggleSidebar={toggleSidebar} />}
            />

            <Route
              path="/admin/dashboard/all/users/add"
              element={<AddUser toggleSidebar={toggleSidebar} />}
            />
            <Route
              path="/admin/dashboard/all/banks"
              element={<AllBank toggleSidebar={toggleSidebar} />}
            />
            <Route
              path="/admin/dashboard/all/banks/add"
              element={<AddBank toggleSidebar={toggleSidebar} />}
            />
            <Route
              path="/admin/coordinator/dashboard"
              element={<CoordinatorDash toggleSidebar={toggleSidebar} />}
            />
            <Route
              path="/admin/field-executive/dashboard"
              element={<FieldExecutiveDash toggleSidebar={toggleSidebar} />}
            />
            <Route
              path="/admin/supervisor/dashboard"
              element={<SuperVisorDash />}
            />
            <Route
              path="/admin/auditor/dashboard"
              element={<AuditorDash toggleSidebar={toggleSidebar} />}
            />

            <Route
              path="/coordinator/dashboard"
              element={<CoordinatorDashboard toggleSidebar={toggleSidebar} />}
            />
            <Route
              path="/fieldexecutive/dashboard"
              element={<FieldExecutive toggleSidebar={toggleSidebar} />}
            />
            <Route
              path="/supervisor/dashboard"
              element={<SupervisorDashboard toggleSidebar={toggleSidebar} />}
            />
            <Route path="/auditor/dashboard" element={<AuditorDashboard />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default AllRoutes
