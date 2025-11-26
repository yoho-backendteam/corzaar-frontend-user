/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS, FONTS } from "../../Constants/uiconstants";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "../../context/context";
import { LoginWithEmail } from "../../features/userlogin/reducers/service";
import { toast } from "react-toastify";

const SignInPassword: React.FC = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const resultAction: any = await LoginWithEmail(email, password)
      console.log(resultAction, 'loginnnnn')

      if (resultAction?.status) {
        login(resultAction?.data)
        toast.success(resultAction?.message)
      } else {
        toast.error(resultAction?.message)
      }
    } catch (err: unknown) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSignIn();
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
        Email or Phone
      </label>
      <div className="flex items-center border rounded-md px-3 py-2 mb-4 mt-1">
        <Mail className="w-4 h-4 mr-2" style={{ color: COLORS.primary_red }} />
        <input
          type="text"
          placeholder="Enter any email"
          className="flex-1 outline-none text-sm"
          style={FONTS.regular as any}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
      </div>

      <label style={{ ...(FONTS.medium as any), fontSize: "14px", color: COLORS.C_DIV_Title }}>
        Password
      </label>
      <div className="flex items-center border rounded-md px-3 py-2 mt-1 mb-2">
        <Lock className="w-4 h-4 mr-2" style={{ color: COLORS.primary_red }} />
        <input
          type="password"
          placeholder="Enter any password"
          className="flex-1 outline-none text-sm"
          style={FONTS.regular as any}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
      </div>

      <p className="text-right text-sm mb-4 cursor-pointer" style={{ color: COLORS.primary_gray }}>
        Forgot password?
      </p>

      <button
        onClick={handleSignIn}
        disabled={loading}
        className="w-full py-2 rounded-md font-semibold text-sm transition-opacity disabled:opacity-50"
        style={{
          backgroundColor: COLORS.primary_red,
          color: COLORS.primary_white
        }}
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>
    </div>
  );
};

export default SignInPassword;