import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./Layout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CoordinatorDashboard from "../pages/coordinator/CoordinatorDashboard";
import FieldExecutive from "../pages/field_executive/FieldExecutive";
import SupervisorDashboard from "../pages/supervisor/SupervisorDashboard";
import AuditorDashboard from "../pages/auditor/AuditorDashboard";
import AllUser from "../pages/admin/users/AllUser";
import AddUser from "../pages/admin/users/AddUser";
import AllBank from "../pages/admin/banks/AllBank";
import AddBank from "../pages/admin/banks/AddBank";
import AllCases from "../pages/admin/cases/AllCases";
import AllFieldExecutive from "../pages/coordinator/filedexecutive/AllFieldExecutive";
import AllCoordinatorCases from "../pages/coordinator/cases/AllCoordinatorCases";
import AddCases from "../pages/coordinator/AddCases";
import AllFieldExecutives from "../pages/coordinator/AllFieldExecutives";
import Profile from "./Profile";

const roleBasedRoutes = {
  admin: [
    { path: "/admin/dashboard", element: <AdminDashboard /> },
    { path: "/admin/dashboard/all/users", element: <AllUser /> },
    { path: "/admin/dashboard/all/users/add", element: <AddUser /> },
    { path: "/admin/dashboard/all/banks", element: <AllBank /> },
    { path: "/admin/dashboard/all/banks/add", element: <AddBank /> },
    { path: "/admin/dashboard/cases", element: <AllCases /> },
    { path: "/admin/profile", element: <Profile /> },
  ],
  coordinator: [
    { path: "/coordinator/dashboard", element: <CoordinatorDashboard /> },
    { path: "/coordinator/all/cases/add", element: <AddCases /> },
    {
      path: "/coordinator/all/fieldexecutives",
      element: <AllFieldExecutives />,
    },
    { path: "/coordinator/cases", element: <AllCoordinatorCases /> },
    { path: "/coordinator/profile", element: <Profile /> },
  ],
  fieldExecutive: [
    { path: "/fieldexecutive/dashboard", element: <FieldExecutive /> },
  ],
  supervisor: [
    { path: "/supervisor/dashboard", element: <SupervisorDashboard /> },
  ],
  auditor: [{ path: "/auditor/dashboard", element: <AuditorDashboard /> }],
};

const AllRoutes = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const role = useSelector((state) => state.auth.role) // Fetch role from Redux
  const { role } = useSelector((store) => store.authReducer); // Fetch role from Redux

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const routes = roleBasedRoutes[role] || [];

  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={
            <Layout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
              {element}
            </Layout>
          }
        />
      ))}
      {/* <Route path="*" element={<Navigate to={`/${role}/dashboard`} />} /> */}
    </Routes>
  );
};

export default AllRoutes;
