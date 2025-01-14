import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPrivate = (props) => {
  const { Component } = props;
  let navigate = useNavigate();
  const loginStatus = useSelector((store) => store.authReducer.isLogin);
//   console.log("loginSta", loginStatus);
  let role = useSelector((state) => state.authReducer.role);

  useEffect(() => {
    if (loginStatus) {
      navigate(`/${role}/dashboard`);
    }
  }, [navigate, loginStatus, role]);

  return <Component />;
};

export default LoginPrivate;
