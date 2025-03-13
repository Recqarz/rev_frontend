import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import AddCases from "../pages/coordinator/AddCases";
import AllFieldExecutives from "../pages/coordinator/AllFieldExecutives";
import Profile from "./Profile";
import AllCases from "../pages/coordinator/AllCases";
import { getProfileByToken } from "../redux/profile/profileAction";
import AddLocation from "../pages/admin/location/AddLocation";
import PageNotFound from "./PageNotFound";
import CompareDisplay from "../pages/supervisor/CompareDisplay";
import AllReports from "../pages/supervisor/AllReports";
import UpdateFieldExecutive from "../pages/supervisor/UpdateFieldExecutive";
import AllReportsAuditor from "../pages/auditor/AllReportsAuditor";
import CompareDataAuditor from "../pages/auditor/CompareDataAuditor";

const roleBasedRoutes = {
  admin: [
    { path: "/admin/dashboard", element: <AdminDashboard /> },
    { path: "/admin/dashboard/all/users", element: <AllUser /> },
    { path: "/admin/dashboard/all/users/add", element: <AddUser /> },
    { path: "/admin/dashboard/all/banks", element: <AllBank /> },
    { path: "/admin/bank/add", element: <AddBank /> },
    { path: "/admin/bank/update", element: <AddBank /> },
    { path: "/admin/dashboard/cases", element: <AllCases /> },
    { path: "/admin/all/cases/add", element: <AddCases /> },
    { path: "/admin/all/case/update", element: <AddCases /> },
    { path: "/admin/profile", element: <Profile /> },
    { path: "/admin/dashboard/location", element: <AddLocation /> },
  ],
  coordinator: [
    { path: "/coordinator/dashboard", element: <CoordinatorDashboard /> },
    { path: "/coordinator/all/cases/add", element: <AddCases /> },
    { path: "/coordinator/all/case/update", element: <AddCases /> },
    {
      path: "/coordinator/all/fieldexecutives",
      element: <AllFieldExecutives />,
    },
    { path: "/coordinator/all/cases", element: <AllCases /> },
    { path: "/coordinator/profile", element: <Profile /> },
  ],
  fieldExecutive: [
    { path: "/fieldexecutive/dashboard", element: <FieldExecutive /> },
  ],
  supervisor: [
    { path: "/supervisor/dashboard", element: <SupervisorDashboard /> },
    { path: "/supervisor/allReports", element: <AllReports /> },
    { path: "/supervisor/reportDetails", element: <CompareDisplay /> },
    {
      path: "/supervisor/updateFieldExecutive",
      element: <UpdateFieldExecutive />,
    },
    { path: "/supervisor/profile", element: <Profile /> },
  ],
  auditor: [
    { path: "/auditor/dashboard", element: <AuditorDashboard /> },
    { path: "/auditor/allReports", element: <AllReportsAuditor /> },
    { path: "/auditor/reportDetails", element: <CompareDataAuditor /> },
    {
      path: "/auditor/updateFieldExecutive",
      element: <UpdateFieldExecutive />,
    },
    { path: "/auditor/profile", element: <Profile /> },
  ],
};

const AllRoutes = () => {
  const dispatch = useDispatch();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { role } = useSelector((store) => store.authReducer); // Fetch role from Redux
  const { accessToken } = useSelector((store) => store.authReducer); // Fetch role from Redux
  const { data: profileData } = useSelector((state) => state.profileReducer);

  useEffect(() => {
    dispatch(getProfileByToken(accessToken));
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const routes = roleBasedRoutes[role] || [];

  return (
    <Layout
      isSidebarOpen={isSidebarOpen}
      toggleSidebar={toggleSidebar}
      profileData={profileData}
    >
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Layout>
  );
};

export default AllRoutes;
