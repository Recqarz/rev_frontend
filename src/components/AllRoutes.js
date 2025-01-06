import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";
import Login from "../pages/Login";
const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
