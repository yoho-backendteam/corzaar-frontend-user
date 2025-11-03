import { configureStore } from "@reduxjs/toolkit";
import dealsSlice from "../features/deals/dealsSlice"
import coursesSlice from "../features/courses/courseSlice"
import courseReducer from "../Components/Redux/CourseSlice";
import contactReducer from "../redux/Queries/queryslice";

const store = configureStore({
  reducer: {
    dealSlice: dealsSlice,
    courseSlice: coursesSlice,
    courses: courseReducer,
    contact: contactReducer,
  }
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
