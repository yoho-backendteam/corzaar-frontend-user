import { createAsyncThunk } from "@reduxjs/toolkit";
import type { OTPResponse } from "../types/otptypes";
import { otpService } from "../reducers/service";

export const sendOTPThunk = createAsyncThunk<OTPResponse, { phoneNumber: string }>(
  "auth/sendOTP",
  async ({ phoneNumber }, { rejectWithValue }) => {
    try {
      const data = await otpService.sendOTP(phoneNumber);
      return data; // must conform to OTPResponse
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to send OTP";
      return rejectWithValue(errorMessage);
    }
  }
);
