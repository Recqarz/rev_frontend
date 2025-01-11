import { toastSuccess } from "../utils/react-toastify/ReactToastiry";


const Login = () => {
  const handleToast = () => {
    toastSuccess("toast success!");
  };

  return (
    <div>
      <h1>Login Page.</h1>
      <button onClick={handleToast}>login</button>
    </div>
  );
};

export default Login;
