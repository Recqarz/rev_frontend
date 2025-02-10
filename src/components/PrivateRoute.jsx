import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { USER_LOGOUT_SUCCESS } from "../redux/auth/authType";

const PrivateRoute = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Retrieve the token and expiry from Redux state
  const { accessToken, tokenExpiry } = useSelector((state) => state.authReducer);

  useEffect(() => {
    // Check if the token is expired or missing
    if (!accessToken || Date.now() > tokenExpiry) {
      // Dispatch logout action
      dispatch({ type: USER_LOGOUT_SUCCESS });
      // Redirect to the home page
      navigate("/");
    }
  }, [accessToken, tokenExpiry, dispatch, navigate]);

  // If token is valid, render the protected component
  return accessToken && Date.now() <= tokenExpiry ? <Component /> : null;
};

export default PrivateRoute;
