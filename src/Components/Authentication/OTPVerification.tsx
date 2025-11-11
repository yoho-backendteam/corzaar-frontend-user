import { useState } from "react";
import { COLORS, FONTS } from "../../Constants/uiconstants";
import { useAuth } from "../../context/context";

interface OTPVerificationProps {
  goBack: () => void;
  onSuccess: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ goBack, onSuccess }) => {
  const { login } = useAuth();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Accept any OTP for demo purposes
      // Generate mock user data for OTP login
      const mockEmail = "user@example.com";
      login(mockEmail, "otp-password");
      onSuccess();
    } catch (err : unknown) {
      setError(`Verification failed. Please try again ${err}` );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div 
          className="mb-4 p-2 rounded text-sm text-center"
          style={{ 
            backgroundColor: '#FEE2E2', 
            color: COLORS.primary_red,
            border: `1px solid ${COLORS.primary_red}`
          }}
        >
          {error}
        </div>
      )}

      <label style={{ ...(FONTS.medium as any), fontSize: "14px", color: COLORS.C_DIV_Title }}>
        Enter OTP
      </label>

      <div className="flex flex-wrap justify-center gap-2 my-3 w-full mx-auto">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-10 h-10 border rounded-md text-center text-base outline-none"
            style={{ 
              borderColor: COLORS.primary_gray,
              color: COLORS.primary_black
            }}
            disabled={loading}
          />
        ))}
      </div>

      <p className="text-center text-xs mb-4" style={{ color: COLORS.primary_gray }}>
        OTP Sent to 986754634
      </p>

      <button
        className="w-full py-2 rounded-md font-semibold text-sm mb-3 border transition-opacity disabled:opacity-50"
        style={{
          borderColor: COLORS.primary_gray,
          color: COLORS.primary_black,
          backgroundColor: COLORS.primary_white,
        }}
        onClick={goBack}
        disabled={loading}
      >
        Change Number
      </button>

      <button
        onClick={handleVerifyOTP}
        disabled={loading}
        className="w-full py-2 rounded-md font-semibold text-sm transition-opacity disabled:opacity-50"
        style={{
          backgroundColor: COLORS.primary_red,
          color: COLORS.primary_white,
        }}
      >
        {loading ? "Verifying..." : "Verify & Sign In"}
      </button>
    </div>
  );
};

export default OTPVerification;