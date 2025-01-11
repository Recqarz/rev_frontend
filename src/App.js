import { useSelector } from 'react-redux'
import AllRoutes from './components/AllRoutes'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import ResetDashboard from './pages/resetpasword/ResetDashboard'
import Register from './pages/Register'
import VerifyOTP from './pages/resetpasword/VerifyOTP'
import PageNotFound from './pages/PageNotFound'

function App() {
  const userReducer = useSelector((store) => store.userReducer)
  const caseReducer = useSelector((store) => store.caseReducer)
  console.log('caseReducer====>', caseReducer, 'userReducer', userReducer)
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<Login />} />
      <Route path="/resetpassword" element={<ResetDashboard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verifyotp" element={<VerifyOTP />} />
      <Route path="/*" element={<AllRoutes />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default App
