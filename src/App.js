
import AllRoutes from "./components/AllRoutes";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ResetDashboard from "./pages/resetpasword/ResetDashboard";
import Register from "./pages/Register";
import VerifyOTP from "./pages/resetpasword/VerifyOTP";
import PageNotFound from "./pages/PageNotFound";
import LoginPrivate from "./components/LoginPrivate";
import PrivateRoute from "./components/PrivateRoute";
import ResetPassword from "./pages/resetpasword/ResetPassword";
import VerifyOTPLogin from "./pages/login/VerifyOTPLogin";
import { useSelector } from 'react-redux';

function App() {
  const userReducer = useSelector((store) => store.userReducer)
  const caseReducer = useSelector((store) => store.caseReducer)
  console.log('caseReducer====>', caseReducer, 'userReducer', userReducer)
  return (
    <Routes>
      <Route path="/" element={<LoginPrivate Component={Login}/>} />
      <Route path="/verifyotp" element={<VerifyOTPLogin/>} />

      <Route path="/forget/password" element={<ResetDashboard />} />
      <Route path="/forget/password/verifyotp" element={<VerifyOTP />} />
      <Route path="/forget/password/resetpassword" element={<ResetPassword />} />

      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<PrivateRoute Component={AllRoutes}/>} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
  // );
}

export default App
