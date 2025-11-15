/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { OTPResponse } from "../types/otptypes";
import { otpService } from "../reducers/service";
import { StoreLocalstorage } from "../../../utils/helper";

export const sendOTPThunk = createAsyncThunk<OTPResponse, { phoneNumber: string }>(
  "auth/sendOTP",
  async ({ phoneNumber }, { rejectWithValue }) => {
    try {
      const data: any = await otpService.sendOTP(phoneNumber);
      StoreLocalstorage("generatedOtp", data?.data?.otp)
      StoreLocalstorage("token", data?.data?.token)
      return data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to send OTP";
      return rejectWithValue(errorMessage);
    }
  }
);