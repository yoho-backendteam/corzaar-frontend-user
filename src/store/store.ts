import { configureStore } from "@reduxjs/toolkit";
import instituteReducer from "../redux/Institute/instituteSlice";

const store = configureStore({
  reducer: {
    institute: instituteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
