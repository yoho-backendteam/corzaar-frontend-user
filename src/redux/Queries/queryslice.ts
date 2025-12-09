/* eslint-disable @typescript-eslint/no-explicit-any */
// src/redux/Queries/queryslice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { QueryState } from "./querytypes";
import { sendQueryThunk } from "./querythunks";

const initialState: QueryState = {
  form: {
    senderId: "",
    senderRole: "",
    fullName: "",
    email: "",
    phone: "",
    category: "",
    subject: "",
    message: "",
    query: ""
  },
  loading: false,
  error: null,
  success: false,
};

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<{ field: string; value: string }>) => {
      (state.form as any)[action.payload.field] = action.payload.value;
    },
    resetForm: (state) => {
      state.form = initialState.form;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendQueryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendQueryThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendQueryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateField, resetForm } = querySlice.actions;
export default querySlice.reducer;
