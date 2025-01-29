import React, { useState } from "react";
import buildingImage from "../assets/image/building.jpg";
import revNweBuilding from "../assets/image/revNweBuilding.png";
import revCloud1 from "../assets/image/revCloud1.png";
import revCloud2 from "../assets/image/revCloud2.png";
import bildinglogo1 from "../assets/image/buildingdesign.png";
import bildinglogo2 from "../assets/image/buildingdesigning.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkCredentialAndsendOtp } from "../redux/auth/authAction";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

const obj = {
  userCode: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(obj);
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleForm = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(checkCredentialAndsendOtp(formData, navigate));
  };

  const auth = useSelector((store) => store.authReducer);
  console.log(auth);

  return (
    <div className="w-full relative flex justify-center items-center h-screen bg-[#3b514c]">
      <div className="relative shadow-2xl shadow-green-200 w-[80%]  h-[60%] md:h-[45%] lg:h-[85%] bg-[#68cfb4] flex flex-row">
        <div className="w-[10%] h-full hidden lg:block"></div>
        <div className="w-full lg:w-[50%] h-full  bg-white border flex flex-col gap-10 justify-center items-center ">
          <div className="">
            <h1 className="text-lg text-[#3b514c] font-semibold">
              Welcome To REV
            </h1>
          </div>
          <div className="w-[70%]">
            <form onSubmit={handleForm} className="w-full">
              <div className=" flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1">
                    <label className="block text-gray-700 text-sm font-bold">
                      Email
                    </label>
                    <span className="text-red-500 text-xl -mt-1">*</span>
                  </div>
                  <input
                    className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-gray-500"
                    type="text"
                    required
                    name="userCode"
                    value={formData?.userCode}
                    placeholder="Email or User-Code"
                    onChange={handleInput}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex gap-1">
                    <label className="block text-gray-700 text-sm font-bold">
                      Password
                    </label>
                    <span className="text-red-500 text-xl -mt-1">*</span>
                  </div>

                  <div className="relative">
                    <input
                      className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full placeholder-gray-500"
                      type={showPassword ? "text" : "password"} // Toggle input type
                      placeholder="Password"
                      required
                      name="password"
                      value={formData?.password}
                      onChange={handleInput}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                      onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                    >
                      {showPassword ? (
                        <IoIosEye style={{ fontSize: "18px" }} />
                      ) : (
                        <IoIosEyeOff style={{ fontSize: "18px" }} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Link to="/forget/password">
                    <h1 className="hover:text-blue-400 font-normal">
                      Forget Password?
                    </h1>
                  </Link>
                </div>

                <div className="mt-4 flex justify-center">
                  <button
                    className="bg-[#68cfb4] text-white font-bold py-2 px-6  rounded hover:bg-[#3b514c]"
                    type="submit"
                  >
                    Login
                  </button>
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

export default Login;


