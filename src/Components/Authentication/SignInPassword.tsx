import { COLORS, FONTS } from "../../Constants/uiconstants";
import { Mail, Lock } from "lucide-react";

interface SignInPasswordProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleEmailLogin: () => Promise<void>;
}

const SignInPassword: React.FC<SignInPasswordProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  handleEmailLogin,
}) => {
  return (
    <div className="w-full">
      <label
        style={{ ...(FONTS.medium as any), fontSize: "14px", color: COLORS.C_DIV_Title }}
      >
        Email or Phone
      </label>
      <div className="flex items-center border rounded-md px-3 py-2 mb-4 mt-1">
        <Mail className="w-4 h-4 mr-2" style={{ color: COLORS.primary_red }} />
        <input
          type="text"
          placeholder="Enter Email or Phone"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 outline-none text-sm"
          style={FONTS.regular as any}
        />
      </div>

      <label
        style={{ ...(FONTS.medium as any), fontSize: "14px", color: COLORS.C_DIV_Title }}
      >
        Password
      </label>
      <div className="flex items-center border rounded-md px-3 py-2 mt-1 mb-2">
        <Lock className="w-4 h-4 mr-2" style={{ color: COLORS.primary_red }} />
        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="flex-1 outline-none text-sm"
          style={FONTS.regular as any}
        />
      </div>

      <p
        className="text-right text-sm mb-4 cursor-pointer"
        style={{ color: COLORS.primary_gray }}
      >
        Forgot password?
      </p>

      <button
        onClick={handleEmailLogin}
        className="w-full py-2 rounded-md font-semibold text-sm"
        style={{ backgroundColor: COLORS.primary_red, color: COLORS.primary_white }}
      >
        Sign In
      </button>
    </div>
  );
};

export default SignInPassword;
