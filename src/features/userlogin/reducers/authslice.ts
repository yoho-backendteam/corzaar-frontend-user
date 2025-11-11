import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { OTPState, OTPResponse } from "../types/otptypes";
import { loginWithEmailThunk } from "./auththunk";

const initialState: OTPState = {
  data: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginWithEmailThunk.fulfilled, (state, action: PayloadAction<OTPResponse>) => {
      state.data = action.payload;
    });
  },
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;
