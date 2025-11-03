import {type RootState } from "../../store/store";
export const selectCourses = (state: RootState) => state.courseSlice.items;
