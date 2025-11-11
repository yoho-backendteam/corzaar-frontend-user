import type { RootState } from "../../../store/store";

export const paymentSelect = (state: RootState) => state.SettingSlice.paymentData
export const favSelect = (state: RootState) => state.SettingSlice.favData
export const portSelect = (state: RootState) => state.SettingSlice.port
export const profileSelect = (state: RootState) => state.SettingSlice.setData
export const activitySelect = (state: RootState) => state.SettingSlice.activityData
export const attendanceSelect = (state: RootState) => state.SettingSlice.attendanceData
export const courseIdSelect = (state: RootState) => state.SettingSlice.coursesIdData