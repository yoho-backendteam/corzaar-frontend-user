export interface OTPResponse {
  status: boolean;
  message: string;
  data?: {
    otp: string;
    token: string;
  };
}

export interface OTPState {
  data?: OTPResponse;
}

export interface SendOTPProps {
  goToOtp: () => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
}

// Add this interface for OTP verification
export interface OTPVerifyResponse {
  status: boolean;
  message: string;
  data?: {
    user: any; // Replace 'any' with your actual user type
    accessToken: string;
  };
}