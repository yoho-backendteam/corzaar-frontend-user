import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { OTPState, OTPResponse } from "../types/otptypes";
import { sendOTPThunk } from "./otpthunks";

const initialState: OTPState = {
  data: undefined, // just store the OTP response
};


const otpSlice = createSlice({
  name: "loginotp",
  initialState,
  reducers: {
    resetOTP: (state) => {
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendOTPThunk.fulfilled, (state, action: PayloadAction<OTPResponse>) => {
      state.data = action.payload;
    });
  },
});

export const { resetOTP } = otpSlice.actions;
export default otpSlice.reducer;
