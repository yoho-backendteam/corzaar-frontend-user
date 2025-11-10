import { configureStore } from "@reduxjs/toolkit";
import dealsSlice from "../features/deals/dealsSlice"
import coursesSlice from "../features/courses/courseSlice"
import courseReducer from "../Components/Redux/CourseSlice";
import contactReducer from "../redux/Queries/queryslice";
import studentHomeReducer from '../Student/redux/studentSlice'
import profileReducer from "../features/profile/profileSlice";
import notificationReducer from "../redux/Notification/notificationSlice";
import instituteReducer from "../features/institute/reducers/instituteslice"
import instituteSearchReducer from "../features/institute/reducers/searchSlice"

const store = configureStore({
  reducer: {
    dealSlice: dealsSlice,
    courseSlice: coursesSlice,
    courses: courseReducer,
    contact: contactReducer,
    studentHome: studentHomeReducer,
    profile: profileReducer,
    notifications: notificationReducer,
    institute: instituteReducer,
    instituteSearch: instituteSearchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
