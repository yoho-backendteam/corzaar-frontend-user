import { useState } from "react";
import { COLORS, FONTS } from "../../Constants/uiconstants";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { otpVerify } from "../../features/userlogin/reducers/service";
import { useAuth } from "../../context/context";
import { GetLocalstorage, RemoveLocalstorage } from "../../utils/helper";

interface OTPVerificationProps {
  goBack: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ goBack }) => {
  const navigate = useNavigate();
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
  const { login } = useAuth()

  const storedOtp = GetLocalstorage("generatedOtp");
  const token = GetLocalstorage("token")?.toString()

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otpValues.join("");

    if (enteredOtp.length < 6) {
      toast.error("Please enter the complete 6-digit OTP.");
      return;
    }

    if (!storedOtp) {
      toast.error("OTP expired or missing. Please resend.");
      goBack();
      return;
    }

    const response = await otpVerify(token, enteredOtp)

    if (response?.status) {
      const token = response?.data?.token || ""
      console.log("token",token)
      login(token)
      if (!response?.reg) {
        navigate("/student-register")
      } else {
        navigate('/')
      }
      RemoveLocalstorage("generatedOtp")
      RemoveLocalstorage("token")
    } else {
      console.log(response)
    }
  };

  return (
    <div className="w-full">
      <label
        style={{
          ...FONTS.medium,
          fontSize: "14px",
          color: COLORS.C_DIV_Title,
        } as any}
      >
        Enter OTP
      </label>
      <p
        style={{
          ...FONTS.regular,
          fontSize: "14px",
          color: COLORS.C_DIV_Title,
        } as any}
      >
        OTP for Demo {storedOtp}
      </p>

      <div className="flex flex-wrap justify-center gap-4 my-3 w-full mx-auto">
        {otpValues.map((val, i) => (
          <input
            key={i}
            id={`otp-${i}`}
            type="text"
            maxLength={1}
            value={val}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="flex-1 min-w-9 max-w-10 h-10 border rounded-md text-center text-base sm:text-lg outline-none"
            style={{ borderColor: COLORS.primary_gray }}
          />
        ))}
      </div>

      <button
        className="w-full py-2 rounded-md font-semibold text-sm mb-3 border cursor-pointer"
        style={{
          borderColor: COLORS.primary_gray,
          color: COLORS.primary_black,
          backgroundColor: COLORS.primary_white,
        }}
        onClick={goBack}
      >
        Change Number
      </button>

      <button
        onClick={handleVerify}
        className="w-full py-2 rounded-md font-semibold text-sm"
        style={{ backgroundColor: COLORS.primary_red, color: COLORS.primary_white }}
      >
        Verify & Sign In
      </button>
    </div>
  );
};

export default OTPVerification;