import type { RootState } from "../../../store/store";

export const selectOTPData = (state: RootState) => state.loginotp?.data;
export const selectAuthData = (state: RootState) => state.auth?.data;
