import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Sidebar from "./Sidebar";
import CoordinatorDashboard from "../pages/coordinator/CoordinatorDashboard";
import AuditorDashboard from "../pages/auditor/AuditorDashboard";
import SupervisorDashboard from "../pages/supervisor/SupervisorDashboard";
import FieldExecutive from "../pages/field_executive/FieldExecutive";
import CoordinatorDash from "../pages/admin/admin_coordinator/CoordinatorDash";
import FieldExecutiveDash from "../pages/admin/admin_fieldexecutive/FieldExecutiveDash";
import SuperVisorDash from "../pages/admin/admin_supervisor/SuperVisorDash";
import AuditorDash from "../pages/admin/admin_auditor/AuditorDash";
const AllRoutes = () => {
  return (
    <>
      <div className="flex w-full">
        <div className="fixed top-0 left-0 bottom-0 h-[100vh] z-30">
          <Sidebar />
        </div>
        <div className="flex-1 md:ml-[200px]">
          <Routes>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/coordinator/dashboard" element={<CoordinatorDash />} />
            <Route path="/admin/field-executive/dashboard" element={<FieldExecutiveDash />} />
            <Route path="/admin/supervisor/dashboard" element={<SuperVisorDash/>} />
            <Route path="/admin/auditor/dashboard" element={<AuditorDash />} />

            <Route path="/coordinator/dashboard" element={<CoordinatorDashboard />} />
            <Route path="/fieldexecutive/dashboard" element={<FieldExecutive />} />
            <Route path="/supervisor/dashboard" element={<SupervisorDashboard/>} />
            <Route path="/auditor/dashboard" element={<AuditorDashboard />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AllRoutes;
