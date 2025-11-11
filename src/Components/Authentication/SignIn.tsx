import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { COLORS, FONTS } from "../../Constants/uiconstants";
import logocap from "../../assets/images/logocap.png";
import SignInPassword from "../../Components/Authentication/SignInPassword";
import SendOTP from "../../Components/Authentication/SendOTP";
import OTPVerification from "../../Components/Authentication/OTPVerification";
import { resetOTP } from "../../features/userlogin/reducers/otpslice";
import { sendOTPThunk } from "../../features/userlogin/reducers/otpthunks";
import type { AppDispatch } from "../../store/store";
import { Lock, Phone } from "lucide-react";
import type { OTPResponse } from "../../features/userlogin/types/otptypes";



const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // const otpData = useSelector((state: RootState) => state.loginotp.data);

  const [method, setMethod] = useState<"password" | "otp">("password");
  const [otpStep, setOtpStep] = useState<"enter-phone" | "enter-otp">("enter-phone");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSendOTP = async () => {
    if (!phoneNumber) return toast.error("Phone number is required");
    const resultAction = await dispatch(sendOTPThunk({ phoneNumber }));

    if (resultAction.payload && (resultAction.payload as OTPResponse).data?.token) {
      localStorage.setItem('token', (resultAction.payload as OTPResponse).data?.token || '');
    }

    if (sendOTPThunk.fulfilled.match(resultAction)) {
      toast.success((resultAction.payload as OTPResponse).message);
      setOtpStep("enter-otp");
    } else {
      const errorMessage = typeof resultAction.payload === 'string'
        ? resultAction.payload
        : "Failed to send OTP";
      toast.error(errorMessage);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen px-4"
      style={{ backgroundColor: COLORS.primary_yellow }}
    >
      <div
        className="flex flex-col md:flex-row rounded-xl overflow-hidden w-full max-w-6xl"
        style={{ backgroundColor: "#FFFBE1", padding: "2rem" }}
      >
        {/* Left Info Panel */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-4 md:px-8 mb-8 md:mb-0">
          <div className="flex items-center mb-8 justify-center md:justify-start">
            <img src={logocap} alt="Logo" className="w-8 h-8" />
            <h1
              style={{
                ...(FONTS.boldHeading as any),
                color: COLORS.primary_red,
                fontWeight: 600,
              }}
              className="ml-2 text-center md:text-left"
            >
              CORZAAR
            </h1>
          </div>

          <h2
            style={{
              ...(FONTS.boldHeading as any),
              color: COLORS.primary_black,
              lineHeight: "1.2",
              marginBottom: "1rem",
            }}
          >
            Welcome Back to your <br className="hidden md:block" /> Learning Journey
          </h2>

          <p
            style={{
              ...(FONTS.regular as any),
              color: COLORS.primary_gray,
              marginBottom: "2rem",
            }}
          >
            Access thousands of courses and continue your education anytime, anywhere.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {[
              { count: "10K+", label: "Courses" },
              { count: "50K+", label: "Students" },
              { count: "500+", label: "Instructors" }
            ].map((item, i) => (
              <div
                key={i}
                className="border rounded-md p-4 text-center flex flex-col items-center justify-center"
                style={{
                  borderColor: COLORS.primary_red,
                  width: "110px",
                  height: "80px",
                }}
              >
                <h3
                  style={{
                    ...(FONTS.medium as any),
                    color: COLORS.primary_red,
                    fontSize: "18px",
                  }}
                >
                  {item.count}
                </h3>
                <p
                  style={{
                    ...(FONTS.regular as any),
                    color: COLORS.primary_gray,
                    fontSize: "14px",
                  }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Auth Panel */}
        <div
          className="w-full md:w-1/2 rounded-lg shadow-md p-6 md:p-8 flex flex-col justify-between"
          className="w-full md:w-1/2 rounded-lg shadow-md p-6 md:p-8 flex flex-col justify-between"
          style={{
            backgroundColor: COLORS.primary_white,
            minHeight: "520px",
            minHeight: "520px",
          }}
        >
          <div>
            <h2
              style={{
                ...(FONTS.boldHeading as any),
                fontSize: "20px",
                color: COLORS.primary_black,
                marginBottom: "0.5rem",
              }}
            >
              Sign In
            </h2>

            <p
              style={{
                ...(FONTS.regular as any),
                color: COLORS.primary_gray,
                marginBottom: "1.5rem",
                fontSize: "14px",
              }}
            >
              Choose your preferred method to sign in to your account
            </p>

            {/* Method Toggle */}
            <div className="flex mb-6">
              <button
                onClick={() => {
                  setMethod("password");
                  setOtpStep("enter-phone");
                  dispatch(resetOTP());
                }}
                className="flex-1 py-2 rounded-l-md font-semibold text-sm transition-all"
                style={{
                  backgroundColor: method === "password" ? COLORS.primary_red : COLORS.primary_white,
                  color: method === "password" ? COLORS.primary_white : COLORS.primary_red,
                  border: `1px solid ${COLORS.primary_red}`,
                }}
              >
                <Lock className="inline mr-2 w-4 h-4" />
                Password
              </button>

              <button
                onClick={() => {
                  setMethod("otp");
                  setOtpStep("enter-phone");
                }}
                className="flex-1 py-2 rounded-r-md font-semibold text-sm transition-all"
                style={{
                  backgroundColor: method === "otp" ? COLORS.primary_red : COLORS.primary_white,
                  color: method === "otp" ? COLORS.primary_white : COLORS.primary_red,
                  border: `1px solid ${COLORS.primary_red}`,
                }}
              >
                <Phone className="inline mr-2 w-4 h-4" />
                OTP
              </button>
            </div>

            {/* Form Area */}
            <div className="flex flex-col items-center transition-all duration-300 w-full">
              {method === "password" && <SignInPassword />}
              {method === "otp" && otpStep === "enter-phone" && (
                <SendOTP
                  goToOtp={handleSendOTP}
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                />
              )}
              {method === "otp" && otpStep === "enter-otp" && <OTPVerification goBack={() => setOtpStep("enter-phone")} />}
            </div>
          </div>

          <p
            className="text-center mt-4 text-sm"
            style={{ color: COLORS.primary_gray }}
          >
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/student-register")}
              style={{
                color: COLORS.primary_red,
                fontWeight: 600,
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: 0,
                fontSize: "inherit",
              }}
            >
              Sign up now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;