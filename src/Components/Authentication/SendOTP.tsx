import { useState } from "react";
import { COLORS, FONTS } from "../../Constants/uiconstants";
import { Phone } from "lucide-react";

interface SendOTPProps {
  goToOtp: () => void;
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
}

const SendOTP: React.FC<SendOTPProps> = ({ goToOtp, phoneNumber, setPhoneNumber }) => {
  const [phone, setPhone] = useState("");
  return (
    <div className="w-full">
      {/* {error && (
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
      )} */}

      <label style={{ ...(FONTS.medium as any), fontSize: "14px", color: COLORS.C_DIV_Title }}>
        Phone Number
      </label>
      <div className="flex items-center border rounded-md px-3 py-2 mt-1 mb-2">
        <Phone className="w-4 h-4 mr-2 " style={{ color: COLORS.primary_red }} />
        <input
          type="text"
          placeholder="+91 9876543210"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="flex-1 outline-none text-sm"
          style={FONTS.regular as any}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        // disabled={loading}
        />
      </div>

      <p className="text-sm mb-4" style={{ color: COLORS.primary_gray }}>
        We'll send you a one-time Password to verify your Identity
      </p>

      <button
        className="w-full py-2 rounded-md font-semibold text-sm transition-opacity disabled:opacity-50"
        style={{
          backgroundColor: COLORS.primary_red,
          color: COLORS.primary_white
        }}
      // onClick={handleSendOTP}
      // disabled={loading}
      >
        Send OTP
        {/* {loading ? "Sending OTP..." : "Send OTP"} */}
      </button>
    </div>
  );
};

export default SendOTP;