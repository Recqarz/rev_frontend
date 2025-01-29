import { Link, useNavigate } from "react-router-dom";
import buildingImage from "../../assets/image/building.jpg";
import React, { useState, useRef } from "react";
import bildinglogo1 from "../../assets/image/buildingdesign.png";
import bildinglogo2 from "../../assets/image/buildingdesigning.png";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyOtpAndLogin } from "../../redux/auth/authAction";

const VerifyOTPLogin = () => {
  const [otpEmail, setOtpEmail] = useState(["", "", "", "", "", ""]);
  const [otpSms, setOtpSms] = useState(["", "", "", "", "", ""]);
  const emailRefs = useRef([]);
  const smsRefs = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { userCode } = location.state || {};

  const handleOtpChange = (e, otpType, index, type) => {
    const value = e.target.value;
    if (/\D/.test(value)) return; // Allow only numeric input

    const updatedOtp = [...otpType];
    updatedOtp[index] = value;

    if (value && index < 5) {
      // Move to the next input field if a number is entered
      if (type === "email") emailRefs.current[index + 1]?.focus();
      else smsRefs.current[index + 1]?.focus();
    }

    type === "email" ? setOtpEmail(updatedOtp) : setOtpSms(updatedOtp);
  };

  const handleKeyDown = (e, otpType, index, type) => {
    if (e.key === "Backspace") {
      const updatedOtp = [...otpType];

      if (updatedOtp[index]) {
        // If there's a value, clear it
        updatedOtp[index] = "";
      } else if (index > 0) {
        // Move to the previous input field
        if (type === "email") emailRefs.current[index - 1]?.focus();
        else smsRefs.current[index - 1]?.focus();
      }

      type === "email" ? setOtpEmail(updatedOtp) : setOtpSms(updatedOtp);
    }
  };

  const handleSubmitForLogin = (e) => {
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
  };

  return (
    <div className="mt-0 overflow-hidden">
      <div className="min-h-screen flex items-center justify-center px-1">
        <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden mx-auto w-full max-w-md sm:max-w-lg lg:max-w-3xl">
          {/* Left Image Section */}
          <div
            className="hidden lg:block lg:w-1/2 bg-cover"
            style={{ backgroundImage: `url(${buildingImage})` }}
          ></div>

          {/* Right Form Section */}
          <div className="p-4 sm:p-8 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-center text-green-600">
              Verify OTP
            </h2>

            <form className="mt-6" onSubmit={handleSubmitForLogin}>
              {/* Email OTP */}
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                Enter OTP (Email)
              </h3>
              <div className="flex justify-center gap-3 mb-6">
                {otpEmail.map((_, index) => (
                  <input
                    key={index}
                    ref={(el) => (emailRefs.current[index] = el)}
                    name={`email-${index}`}
                    className="w-8 h-8 md:w-10 md:h-10 text-center border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                    type="text"
                    maxLength="1"
                    pattern="[0-9]"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    required
                    value={otpEmail[index]}
                    onChange={(e) =>
                      handleOtpChange(e, otpEmail, index, "email")
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(e, otpEmail, index, "email")
                    }
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
                    ref={(el) => (smsRefs.current[index] = el)}
                    name={`sms-${index}`}
                    className="w-8 h-8 md:w-10 md:h-10 text-center border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                    type="text"
                    maxLength="1"
                    pattern="[0-9]"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    required
                    value={otpSms[index]}
                    onChange={(e) => handleOtpChange(e, otpSms, index, "sms")}
                    onKeyDown={(e) => handleKeyDown(e, otpSms, index, "sms")}
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

      <div className="lg:flex lg:justify-center gap-4 hidden  -mt-20">
        <img className="w-[18%] h-20" src={bildinglogo1} alt="build" />
        <img className="w-[18%] h-20" src={bildinglogo2} alt="build2" />
        <img className="w-[18%] h-20" src={bildinglogo1} alt="build" />
        <img className="w-[18%] h-20" src={bildinglogo2} alt="build2" />
      </div>
    </div>
  );
};

export default VerifyOTPLogin;
