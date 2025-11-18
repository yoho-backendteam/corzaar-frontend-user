import { createSlice } from "@reduxjs/toolkit";
import {
  createCourse,
  fetchCourses,
  fetchAllDetailedCourses,
  fetchCourseById,
  updateCourse,
  deleteCourse,
  fetchCoursesByBranch,
  filterCourses,
} from "./courseThunks";

interface Course {
  _id: string;
  title: string;
  description?: string;
  price?: number;
  rating?: number;
  [key: string]: any;
}

interface CourseState {
  courses: Course[];
  selectedCourse: Course | null;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: CourseState = {
  courses: [],
  selectedCourse: null,
  loading: false,
  error: null,
  success: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    clearCourseState: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Course created successfully";
        const newCourse = action.payload;
        if (newCourse) state.courses.push(newCourse);
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder.addCase(fetchAllDetailedCourses.fulfilled, (state, action) => {
      state.courses = Array.isArray(action.payload) ? action.payload : [];
    });

    builder
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder.addCase(updateCourse.fulfilled, (state, action) => {
      state.success = "Course updated successfully";
      const updated = action.payload;
      if (updated && updated._id) {
        state.courses = state.courses.map((c) =>
          c._id === updated._id ? updated : c
        );
      }
    });

    builder.addCase(deleteCourse.fulfilled, (state, action) => {
      state.success = "Course deleted successfully";
      const deletedId = action.payload?.id;
      state.courses = state.courses.filter((c) => c._id !== deletedId);
    });

    builder.addCase(fetchCoursesByBranch.fulfilled, (state, action) => {
      state.courses = Array.isArray(action.payload) ? action.payload : [];
    });
    builder
      .addCase(filterCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = Array.isArray(action.payload) ? action.payload : [];
        state.success = "Filters applied successfully";
      })
      .addCase(filterCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCourseState } = courseSlice.actions;
export default courseSlice.reducer;
