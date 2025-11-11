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
export const fetchInstituteById = createAsyncThunk<Institute, string>(
  "institute/fetchById",
  async (id) => {
    return await instituteService.getById(id);
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
