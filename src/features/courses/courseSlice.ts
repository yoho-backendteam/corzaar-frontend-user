import { createSlice } from "@reduxjs/toolkit";
import { dummyCourses } from "../../data/courseData";

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    items: dummyCourses,
  },
  reducers: {},
});

export default coursesSlice.reducer;
