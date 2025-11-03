import { configureStore } from "@reduxjs/toolkit";
import  studentHomeReducer from '../Student/redux/studentSlice'

const store = configureStore({
  reducer: {
    studentHome: studentHomeReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
