import { Link, useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";
import revNweBuilding from "../../assets/image/revNweBuilding.png";
import revCloud1 from "../../assets/image/revCloud1.png";
import revCloud2 from "../../assets/image/revCloud2.png";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyOTPForForgetPass } from "../../redux/auth/authAction";

const VerifyOTP = () => {
  const [otpEmail, setOtpEmail] = useState(["", "", "", "", "", ""]);
  const [otpSms, setOtpSms] = useState(["", "", "", "", "", ""]);
  const emailRefs = useRef([]);
  const smsRefs = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = location.state || {};
  console.log("verifyOTP compo===>", userData);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      verifyOTPForForgetPass(
        {
          userData,
          eOtp: otpEmail.join(""),
          mOtp: otpSms.join(""),
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
              Verify Reset OTP
            </h1>
          </div>
          <div className="w-[70%] flex justify-center items-center">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              {/* Email OTP */}
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-medium text-gray-700">
                  Enter OTP (Email)
                </h3>
                <div className="flex gap-3">
                  {otpEmail?.map((_, index) => (
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
              </div>

              {/* SMS OTP */}
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-medium text-gray-700">
                  Enter OTP (SMS)
                </h3>
                <div className="flex gap-3">
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
              </div>

              {/* Submit Button */}
              <div className="mt-4 flex justify-center items-center">
                <div className="flex flex-col gap-4">
                  <button
                    className="bg-[#68cfb4] text-white font-bold py-2 px-6  rounded hover:bg-[#3b514c]"
                    type="submit"
                  >
                    Verify
                  </button>
                  <div>
                    <Link
                      to="/resetpassword"
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

        <div className="!absolute !right-0  !bottom-0 lg:w-[50%] xl:w-[50%] 2xl:w-[58%] 3xl:w-[50%]  hidden lg:block">
          <img
            src={`${revNweBuilding}`}
            alt="revNweBuilding"
            className="lg:h-[25rem] xl:h-[25rem] 2xl:h-[26rem] w-full"
          />
        </div>
        <div className="!absolute !right-32 !top-3 hidden lg:block">
          <div className="flex gap-5">
            <img
              src={`${revCloud1}`}
              className="lg:h-[4.5rem]"
              alt="revCloud1"
            />
            <img
              src={`${revCloud2}`}
              className="lg:h-[3.4rem] lg:mt-1"
              alt="revCloud2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
