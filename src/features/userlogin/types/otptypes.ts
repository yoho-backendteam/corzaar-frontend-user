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
  reg: any;
  status: boolean;
  message: string;
  data?: {
    token: string
  };
}