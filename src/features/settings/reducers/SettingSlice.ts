import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { 
  SettingState, 
  PaymentResponse, 
  FavResponse, 
  ProfileData, 
  PortfolioResponse, 
  ActivityResponse,
  ProfileResponse, 
  AttendanceResponse,
  CoursesIdResponse
} from "../types/settingTypes";

const initialState: SettingState = {
  paymentData: null,
  favData: null,
  profileData: null,
  port: null,
  setData: null,
  activityData: null,
  attendanceData: null,
  coursesIdData: null, 

};

const SettingSlice = createSlice({
  name: "SettingSlice",
  initialState,
  reducers: {
    getPayment: (state, action: PayloadAction<PaymentResponse>) => {
      state.paymentData = action.payload;
    },
    getFav: (state, action: PayloadAction<FavResponse>) => {
      state.favData = action.payload;
    },
    getProfile: (state, action: PayloadAction<ProfileData>) => {
      state.profileData = action.payload;
    },
    setPortfolio: (state, action: PayloadAction<PortfolioResponse>) => {
      state.port = action.payload;
    },
    setProfile: (state, action: PayloadAction<ProfileResponse>) => {
      state.setData = action.payload;
    },
    setActivity: (state, action: PayloadAction<ActivityResponse>) => {
      state.activityData = action.payload;
    },
    setAttendance: (state, action: PayloadAction<AttendanceResponse>) => {
      state.attendanceData = action.payload;
    },
 setCoursesId: (state, action: PayloadAction<CoursesIdResponse>) => {
  state.coursesIdData = action.payload;
},

  }
});

export const { 
  getPayment, 
  getFav, 
  setPortfolio, 
  getProfile, 
  setProfile, 
  setActivity, 
  setAttendance, 
  setCoursesId 
} = SettingSlice.actions;

export default SettingSlice.reducer;