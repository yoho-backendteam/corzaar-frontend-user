import { createSlice } from "@reduxjs/toolkit";
import { dummyCourses } from "../DummyData/CourseData";

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    list: dummyCourses,
  },
  reducers: {
    addCourse: (state, action) => {
      state.list.push(action.payload);
    },
    removeCourse: (state, action) => {
      state.list = state.list.filter(course => course.id !== action.payload);
    },
  },
});

export const { addCourse, removeCourse } = courseSlice.actions;
export default courseSlice.reducer;
