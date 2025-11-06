import { COLORS, FONTS } from "../../Constants/uiconstants";
import { Phone } from "lucide-react";

interface SendOTPProps {
  goToOtp: () => void;
}

const SendOTP: React.FC<SendOTPProps> = ({ goToOtp }) => {
  return (
    <div className="w-full">
      <label style={{ ...(FONTS.medium as any), fontSize: "14px", color: COLORS.C_DIV_Title }}>
        Phone Number
      </label>
      <div className="flex items-center border rounded-md px-3 py-2 mt-1 mb-2">
        <Phone className="w-4 h-4 mr-2 text-gray-400" />
        <input
          type="text"
          placeholder="+91 9876543210"
          className="flex-1 outline-none text-sm"
          style={FONTS.regular as any}
        />
      </div>

      <p className="text-sm mb-4" style={{ color: COLORS.primary_gray }}>
        We’ll send you a one-time Password to verify your Identity
      </p>

      <button
        className="w-full py-2 rounded-md font-semibold text-sm"
        style={{ backgroundColor: COLORS.primary_red, color: COLORS.primary_white }}
        onClick={goToOtp}
      >
        Send OTP
      </button>
    </div>
  );
};

export default SendOTP;
