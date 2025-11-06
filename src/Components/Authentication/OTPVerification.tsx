import { COLORS, FONTS } from "../../Constants/uiconstants";

interface OTPVerificationProps {
  goBack: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ goBack }) => {
  return (
    <div className="w-full">
      <label style={{ ...(FONTS.medium as any), fontSize: "14px", color: COLORS.C_DIV_Title }}>
        Enter OTP
      </label>

<div className="flex flex-wrap justify-center gap-4 my-3 w-full mx-auto">
  {[...Array(6)].map((_, i) => (
    <input
      key={i}
      type="text"
      maxLength={1}
      className="flex-1 min-w-9 max-w-10 h-10 border rounded-md text-center text-base sm:text-lg outline-none"
    />
  ))}
</div>

      <p className="text-center text-xs mb-4" style={{ color: COLORS.primary_gray }}>
        OTP Sent to 986754634
      </p>

      <button
        className="w-full py-2 rounded-md font-semibold text-sm mb-3 border"
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
        className="w-full py-2 rounded-md font-semibold text-sm"
        style={{ backgroundColor: COLORS.primary_red, color: COLORS.primary_white }}
      >
        Verify & Sign In
      </button>
    </div>
  );
};

export default OTPVerification;
