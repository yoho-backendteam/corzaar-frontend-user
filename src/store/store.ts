import { configureStore } from "@reduxjs/toolkit";
import dealsSlice from "../features/deals/dealsSlice"
import coursesSlice from "../features/courses/courseSlice"
// import coursesSlice from "../features/courses/courseSlice"
import courseSlice from "../Components/Redux/CourseSlices";
import courseReducer from "../Components/Redux/CourseSlice";
import contactReducer from "../redux/Queries/queryslice";
import studentHomeReducer from '../Student/redux/studentSlice'
import profileReducer from "../features/profile/profileSlice";
// import notificationReducer from "../redux/Notification/notificationSlice";
import notificationReducer from "../features/notification/reducers/slice";

import homeReducer from "../features/home_page/reducers/homeSlice"
import offerReducer from "../features/offer_page/reducers/offerSlice"
import instituteReducer from "../features/institute/reducers/instituteslice"
import instituteSearchReducer from "../features/institute/reducers/searchSlice"
// import instituteReducer from "../redux/Institute/instituteSlice";
import loginotpReducer from "../features/userlogin/reducers/otpslice";
// import instituteReducer from "../redux/Institute/instituteSlice";
import querySlice from "../redux/Queries/queryslice";
import SettingSlice from '../features/settings/reducers/SettingSlice'
import cartreducer from "../features/cart/reducers/cartslice"

const store = configureStore({
  reducer: {
    dealSlice: dealsSlice,
    courseSlice: coursesSlice,
    course: courseSlice,
    contact: contactReducer,
    studentHome: studentHomeReducer,
    profile: profileReducer,
    notifications: notificationReducer,
    institute: instituteReducer,
    home: homeReducer,
    offer: offerReducer,
    instituteSearch: instituteSearchReducer,
    loginotp: loginotpReducer,
    query: querySlice,
    SettingSlice: SettingSlice,
    cartreducer: cartreducer,
  },

})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
