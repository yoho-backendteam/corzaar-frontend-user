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

export const otpVerify = async (token: string | undefined, otp: string): Promise<OTPVerifyResponse> => {
  try {
    const response = await Client.verifyOtpEndpoint.postverifyotp(token, otp);
    return response.data;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error verifying OTP:", errorMessage);
    throw new Error(errorMessage);
  }
}



export const LoginWithEmail = async (email: string, password: string) => {
  try {
    const response = await Client.loginEndpoint.rootlogin({ email, password });
    return response?.data;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error verifying OTP:", errorMessage);
    throw new Error(errorMessage);
  }
}