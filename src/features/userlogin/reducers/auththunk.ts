import { createAsyncThunk } from "@reduxjs/toolkit";
import type { OTPResponse } from "../types/otptypes";
import { userService } from "./service";

export const loginWithEmailThunk = createAsyncThunk<OTPResponse, { email: string; password: string }>(
  "auth/loginWithEmail",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await userService.login(email, password);
      return data; // must conform to OTPResponse
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Login failed";
      return rejectWithValue(errorMessage);
    }
  }
);
