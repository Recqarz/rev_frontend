import { Link, useNavigate } from "react-router-dom";
import buildingImage from "../../assets/image/building.jpg";
import React, { useState } from "react";
import bildinglogo1 from "../../assets/image/buildingdesign.png";
import bildinglogo2 from "../../assets/image/buildingdesigning.png";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyOtpAndLogin } from "../../redux/auth/authAction";

const VerifyOTP = () => {
  const [otpEmail, setOtpEmail] = useState(["", "", "", "", "", ""]);
  const [otpSms, setOtpSms] = useState(["", "", "", "", "", ""]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const { userCode } = location.state || {};

  const handleOtpChange = (e, otpType, index) => {
    const value = e.target.value;
    if (/\D/.test(value)) return; // Prevent non-numeric input

    const updatedOtp = [...otpType];
    updatedOtp[index] = value;

    if (index < 5 && value) {
      // Move focus to the next input when a number is entered
      const nextInput = document.querySelector(
        `input[name="${otpType === otpEmail ? "email" : "sms"}-${index + 1}"]`
      );
      if (nextInput) {
        nextInput.focus();
      }
    }

    otpType === otpEmail ? setOtpEmail(updatedOtp) : setOtpSms(updatedOtp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      verifyOtpAndLogin(
        {
          userCode,
          eOtp: otpEmail.join(""),
          mOtp: otpSms.join(""),
        },
        navigate
      )
    );
    // console.log("Email OTP: ", otpEmail.join(""));
    // console.log("SMS OTP: ", otpSms.join(""));
  };

  return (
    <div className="mt-5 overflow-hidden">
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden mx-auto w-full max-w-md sm:max-w-lg lg:max-w-4xl">
          {/* Left Image Section */}
          <div
            className="hidden lg:block lg:w-1/2 bg-cover"
            style={{ backgroundImage: `url(${buildingImage})` }}
          ></div>

          {/* Right Form Section */}
          <div className="w-full p-6 sm:p-8 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-center text-green-600">
              Verify OTP
            </h2>

            <form className="mt-6" onSubmit={handleSubmit}>
              {/* Email OTP */}
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                Enter OTP (Email)
              </h3>
              <div className="flex justify-center gap-3 mb-6">
                {otpEmail.map((_, index) => (
                  <input
                    key={index}
                    name={`email-${index}`}
                    className="w-12 h-12 text-center border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                    type="text"
                    maxLength="1"
                    pattern="[0-9]"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    required
                    value={otpEmail[index]}
                    onChange={(e) => handleOtpChange(e, otpEmail, index)}
                  />
                ))}
              </div>

              {/* SMS OTP */}
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                Enter OTP (SMS)
              </h3>
              <div className="flex justify-center gap-3 mb-6">
                {otpSms.map((_, index) => (
                  <input
                    key={index}
                    name={`sms-${index}`}
                    className="w-12 h-12 text-center border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                    type="text"
                    maxLength="1"
                    pattern="[0-9]"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    required
                    value={otpSms[index]}
                    onChange={(e) => handleOtpChange(e, otpSms, index)}
                  />
                ))}
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-center gap-4">
                <button
                  className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Verify
                </button>
              </div>
            </form>

            {/* Go Back Link */}
            <div className="mt-6 text-center">
              <Link
                to="/resetpassword"
                className="text-blue-600 font-medium hover:underline"
              >
                ⬅️ Go Back
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:flex lg:justify-center gap-4 hidden lg:block -mt-16">
        <img className="w-[18%] h-24" src={bildinglogo1} alt="build" />
        <img className="w-[18%] h-24" src={bildinglogo2} alt="build2" />
        <img className="w-[18%] h-24" src={bildinglogo1} alt="build" />
        <img className="w-[18%] h-24" src={bildinglogo2} alt="build2" />
      </div>
    </div>
  );
};

export default VerifyOTP;
