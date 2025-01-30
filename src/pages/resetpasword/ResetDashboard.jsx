import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import revNweBuilding from "../../assets/image/revNweBuilding.png";
import revCloud1 from "../../assets/image/revCloud1.png";
import revCloud2 from "../../assets/image/revCloud2.png";
import { useDispatch } from "react-redux";
import { checkMailForForgetPass } from "../../redux/auth/authAction";

const ResetDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState("");

  const handleResetPassword = () => {
    dispatch(checkMailForForgetPass(userData, navigate));
  };

  return (
    <div className="w-full relative flex justify-center items-center h-screen bg-[#3b514c]">
      <div className="relative shadow-2xl shadow-green-200 w-[80%]  h-[60%] md:h-[45%] lg:h-[85%] 2xl:h-[70%] bg-[#68cfb4] flex flex-row">
        <div className="w-[10%] h-full hidden lg:block"></div>
        <div className="w-full lg:w-[50%] h-full  bg-white border flex flex-col gap-10 justify-center items-center ">
          <div className="">
            <h1 className="text-3xl text-[#3b514c] font-semibold">
              Reset Password
            </h1>
          </div>
          <div className="w-[70%]">
            {/* Form-section */}
            <form
              onSubmit={handleResetPassword}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  <label className="text-gray-700 text-sm font-bold">
                    Email Address
                  </label>
                  <span className="text-red-500 ml-1 text-xl -mt-1">*</span>
                </div>
                <input
                  className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-gray-500"
                  type="email"
                  placeholder="abc@gmail.com"
                  value={userData}
                  onChange={(e) => setUserData(e.target.value)}
                  required
                />
              </div>

              <div className="mt-4 flex justify-center items-center">
                <div className="flex flex-col gap-4">
                  <button
                    className="bg-[#68cfb4] text-white font-bold py-2 px-6  rounded hover:bg-[#3b514c]"
                    type="submit"
                  >
                    Send OTP
                  </button>
                  <div className="text-center">
                    <Link
                      to="/login"
                      className="text-blue-600 font-medium hover:underline"
                    >
                      ⬅️ Go Back
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="!absolute !right-0 !bottom-0 lg:w-[50%] 2xl:w-[58%] hidden lg:block">
          <img
            src={`${revNweBuilding}`}
            className=" lg:h-[25rem] 2xl:h-[32rem] w-full"
          />
        </div>
        <div className="!absolute !right-32 !top-3 hidden lg:block">
          <div className="flex gap-5">
            <img src={`${revCloud1}`} className="lg:h-[4.5rem]" />
            <img src={`${revCloud2}`} className="lg:h-[3.4rem] lg:mt-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetDashboard;
