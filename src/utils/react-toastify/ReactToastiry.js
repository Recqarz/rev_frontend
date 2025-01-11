import React from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReactToastify = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="light"
      transition={Bounce}
    />
  );
};

export default ReactToastify;

// functions for toast success
export let toastSuccess = (message) => {
  return toast.success(message);
};

// functions for toast error
export let toastError = (message) => {
  return toast.error(message);
};

// function for promise
export let toastLoading = (message) => {
  return toast.loading(message);
};

// function for promise update to success or error
export let toastUpdate = (toastId, status, message) => {
  return toast.update(toastId, {
    render: message,
    type: status,
    isLoading: false,
    autoClose: 2000,
  });
};
