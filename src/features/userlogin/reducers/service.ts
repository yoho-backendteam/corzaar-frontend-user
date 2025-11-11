import type { OTPResponse, OTPVerifyResponse } from "../types/otptypes";
import Client from "../../../api/index";

export const otpService = {
  sendOTP: async (phoneNumber: string): Promise<OTPResponse> => {
    try {
      const response = await Client.loginEndpoint.postotp(phoneNumber);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Error sending OTP:", errorMessage);
      throw new Error(errorMessage);
    }
  },
};
export const userService = {
  login: async (email: string, password:string): Promise<OTPResponse> => {
    try {
      const response = await Client.loginEndpoint.userlogin(email,password);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Error:", errorMessage);
      throw new Error(errorMessage);
    }
  },
};

export const forgotService = {
  sendOTP: async (email: string): Promise<OTPResponse> => {
    try {
      const response = await Client.forgotEndpoint.postforgot(email);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Error:", errorMessage);
      throw new Error(errorMessage);
    }
  },
};

export const otpVerify = {
  verifyOTP: async (token: string, otp: string): Promise<OTPVerifyResponse> => {
    try {
      const response = await Client.verifyOtpEndpoint.postverifyotp(token, otp);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Error verifying OTP:", errorMessage);
      throw new Error(errorMessage);
    }
  },
};