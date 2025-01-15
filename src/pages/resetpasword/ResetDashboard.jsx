import { Link, useNavigate } from "react-router-dom";
import buildingImage from "../../assets/image/building.jpg";
import React, { useState } from "react";
import bildinglogo1 from "../../assets/image/buildingdesign.png";
import bildinglogo2 from "../../assets/image/buildingdesigning.png";
import { useDispatch } from "react-redux";
import { checkMailForForgetPass } from "../../redux/auth/authAction";


const ResetDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState("");



  const handleResetPassword = () => {
    dispatch(checkMailForForgetPass(userData, navigate))
  };

  return (
    <div className="mt-16">
      <div className="flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden mx-auto w-full max-w-sm sm:max-w-md lg:max-w-4xl">
          {/* Left Image Section */}
          <div
            className="hidden lg:block lg:w-1/2 bg-cover"
            style={{ backgroundImage: `url(${buildingImage})` }}
          ></div>

          {/* Right Form Section */}
          <div className="w-full p-6 sm:p-8 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-center text-green-600">
              Reset Password
            </h2>

            <div className="mt-4">
              <div className="flex items-center">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <span className="text-red-500 ml-1 text-xl">*</span>
              </div>
              <input
                className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-gray-500"
                type="email"
                placeholder="abc@gmail.com"
                value={userData}
                onChange={(e)=>setUserData(e.target.value)}
              />
            </div>

            <div className="mt-8 flex justify-center">
              {/* <Link to="/verifyotp"> */}
              <button
                onClick={handleResetPassword}
                className="bg-green-700 text-white font-bold py-2 px-4 w-full sm:w-auto rounded hover:bg-green-600"
              >
                Send OTP
              </button>
              {/* </Link> */}
            </div>
            <div className="mt-4 flex items-center justify-center gap-1">
              <Link to="/login">
                <p className="text-blue-900 text-sm font-semibold">
                ⬅️
                  Go Back
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:flex lg:justify-center gap-4 hidden lg:block mb-24">
        <img className="w-[18%] h-24" src={bildinglogo1} alt="build" />
        <img className="w-[18%] h-24" src={bildinglogo2} alt="build2" />
        <img className="w-[18%] h-24" src={bildinglogo1} alt="build" />
        <img className="w-[18%] h-24" src={bildinglogo2} alt="build2" />
      </div>
    </div>
  );
};

export default ResetDashboard;
