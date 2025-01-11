import React from "react";
import { ToastContainer      } from "react-toastify";

const ToastCont = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      //   newestOnTop={false}
      closeOnClick={true}
      //   rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={true}
      theme="light"
      transition={"Bounce"}
    />
  );
};

export default ToastCont;
