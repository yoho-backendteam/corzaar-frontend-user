
export interface OTPState {
  data?: OTPResponse;
}

export interface SendOTPProps {
  goToOtp: () => void;
  phoneNumber: string;
  phone:string;
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

// Define the response types
export interface OTPData {
  token?: string;
}

export interface OTPResponse {
  data?: OTPData;
  generatedOtp?: string;
  message: string;
  status: boolean;
}

// Redux action types
export interface PendingAction {
  type: string;
  meta: {
    arg: {
      phoneNumber: string;
    };
    requestId: string;
    requestStatus: 'pending';
  };
}

export interface FulfilledAction {
  type: string;
  payload: OTPResponse;
  meta: {
    arg: {
      phoneNumber: string;
    };
    requestId: string;
    requestStatus: 'fulfilled';
  };
}

export interface RejectedAction {
  type: string;
  payload: string | undefined;
  error: { message: string };
  meta: {
    arg: {
      phoneNumber: string;
    };
    requestId: string;
    requestStatus: 'rejected';
  };
}

export type OTPThunkResult = FulfilledAction | RejectedAction;
export interface LoginResponse {
  message: string;
  status: boolean;
  token: string;
  // Note: In your response, token is at the root level, not inside data
}

export interface LoginThunkAction {
  payload: LoginResponse | string; // Can be success response or error string
  meta: {
    arg: {
      email: string;
      password: string;
    };
    requestId: string;
    requestStatus: 'fulfilled' | 'rejected';
  };
  type: string;
}