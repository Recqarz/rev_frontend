import React, { useState } from "react";
import buildingImage from "../assets/image/building.jpg";
import bildinglogo1 from "../assets/image/buildingdesign.png";
import bildinglogo2 from "../assets/image/buildingdesigning.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkCredentialAndsendOtp } from "../redux/auth/authAction"


const obj = {
  // role: "",
  userCode: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(obj);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleForm = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(checkCredentialAndsendOtp(formData,navigate));
  };

  const auth = useSelector((store) => store.authReducer);
  console.log(auth);

  return (
    <div className="py-5 overflow-hidden mt-5">
      <form onSubmit={handleForm}>
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div
            className="hidden lg:block lg:w-1/2 bg-cover"
            style={{ backgroundImage: `url(${buildingImage})` }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <h2 className="text-4xl font-semibold text-center text-green-600">
              Login
            </h2>


            <div className="mt-4">
              <div className="flex">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <span className="text-red-500 ml-1 text-xl">*</span>
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

            <div className="mt-4">
              <div className="flex">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <span className="text-red-500 ml-1 text-xl">*</span>
              </div>

              <input
                className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full placeholder-gray-500"
                type="password"
                placeholder="password"
                required
                name="password"
                value={formData?.password}
                onChange={handleInput}
              />
            </div>
            <div className="flex justify-end">
              <Link to="/forget/password">Forget Password?</Link>
            </div>
            <div className="mt-8 flex justify-center">
              <button
                className="bg-green-700 text-white font-bold py-2 px-4 w-1/4 rounded hover:bg-green-600"
                type="submit"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="lg:flex lg:justify-center gap-4 -mb-8 hidden">
        <img className="w-[18%] h-24" src={bildinglogo1} alt="build" />
        <img className="w-[18%] h-24" src={bildinglogo2} alt="build2" />
        <img className="w-[18%] h-24" src={bildinglogo1} alt="build" />
        <img className="w-[18%] h-24" src={bildinglogo2} alt="build2" />
      </div>
    </div>
  );
};

export default Login;
