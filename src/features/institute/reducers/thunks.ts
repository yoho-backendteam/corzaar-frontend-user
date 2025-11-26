import { createAsyncThunk } from "@reduxjs/toolkit";
import { instituteService } from "../../../features/institute/services/index";
import type { Institute } from "../../../types/institute";


// Fetch all institutes
export const fetchInstitutes = createAsyncThunk<Institute[]>(
  "institute/fetchAll",
  async () => {
    return await instituteService.getAll();
  }
);

// Fetch single institute
// export const fetchInstituteById = createAsyncThunk<Institute, string>(
//   "institute/fetchById",
//   async (id) => {
//     return await instituteService.getById(id);
//   }
// );
type InstituteWithCourses = Institute & { courses: any[] };

export const fetchInstituteById = createAsyncThunk<
  InstituteWithCourses, // return type
  string                // argument type
>(
  "institute/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const institute = await instituteService.getById(id);

      const courses = await instituteService.getCoursesByInstitute(id);

      return {
        ...institute,
        courses: Array.isArray(courses) ? courses : [],
      } as InstituteWithCourses; // cast to fix type
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update institute
export const updateInstitute = createAsyncThunk<
  Institute,
  { id: string; data: Partial<Institute> }
>("institute/update", async ({ id, data }) => {
  return await instituteService.updateById(id, data);
});

// Delete institute
export const deleteInstitute = createAsyncThunk<string, string>(
  "institute/delete",
  async (id) => {
    await instituteService.deleteById(id);
    return id;
  }
);
