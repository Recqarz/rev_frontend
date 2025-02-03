import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import revNweBuilding from "../../assets/image/revNweBuilding.png";
import revCloud1 from "../../assets/image/revCloud1.png";
import revCloud2 from "../../assets/image/revCloud2.png";
import { resetPasswordForForgetPass } from "../../redux/auth/authAction";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = location.state || {};

  const handleResetPasswordFunc = (e) => {
    e.preventDefault();

    dispatch(
      resetPasswordForForgetPass(
        {
          userData,
          password,
          confirmPass,
        },
        navigate
      )
    );
  };
  return (
    <div className="w-full relative flex justify-center items-center h-screen bg-[#3b514c]">
      <div className="relative shadow-2xl shadow-green-200 w-[80%]  h-[60%] md:h-[45%] lg:h-[85%] 2xl:h-[70%]  bg-[#68cfb4] flex flex-row">
        <div className="w-[10%] h-full hidden lg:block"></div>
        <div className="w-full lg:w-[50%] h-full  bg-white border flex flex-col gap-10 justify-center items-center ">
          <div className="">
            <h1 className="text-3xl text-[#3b514c] font-semibold">
              Reset Password
            </h1>
          </div>
          <div className="w-[70%]">
            <form onSubmit={handleResetPasswordFunc} className="w-full">
              <div className=" flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1">
                    <label className=" text-gray-700 text-sm font-bold">
                      Password
                    </label>
                    <span className="text-red-500 text-xl -mt-1">*</span>
                  </div>

                  <div className="relative">
                    <input
                      className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4  w-full placeholder-gray-500"
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <div
                      className="absolute inset-y-0 right-6 text-gray-500 cursor-pointer flex justify-center items-center p-2 hover:bg-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <span>
                        {showPassword ? (
                          <IoIosEye className="text-[18px]" />
                        ) : (
                          <IoIosEyeOff className="text-[18px]" />
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex gap-1">
                    <label className=" text-gray-700 text-sm font-bold">
                      Confirm Password
                    </label>
                    <span className="text-red-500 text-xl -mt-1">*</span>
                  </div>

                  <div className="relative">
                    <input
                      className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4  w-full placeholder-gray-500"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="********"
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      required
                    />
                    <div
                      className="absolute inset-y-0 right-6 text-gray-500 cursor-pointer flex justify-center items-center p-2 hover:bg-gray-400"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <span>
                        {showConfirmPassword ? (
                          <IoIosEye className="text-[18px]" />
                        ) : (
                          <IoIosEyeOff className="text-[18px]" />
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-center items-center">
                  <div className="flex flex-col gap-4">
                    <button
                      className="bg-[#68cfb4] text-white font-bold py-2 px-6  rounded hover:bg-[#3b514c]"
                      type="submit"
                    >
                      Save
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
              </div>
            </form>
          </div>
        </div>

        <div className="!absolute !right-0  !bottom-0 lg:w-[50%] xl:w-[50%] 2xl:w-[58%] 3xl:w-[50%]  hidden lg:block">
          <img
            src={`${revNweBuilding}`}
            className="lg:h-[25rem] xl:h-[25rem] 2xl:h-[26rem] w-full"
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

export default ResetPassword;
