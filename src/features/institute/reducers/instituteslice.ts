import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit"
import type { InstituteState } from "../../../types/institute";
import {
  fetchInstitutes,
  fetchInstituteById,
  updateInstitute,
  deleteInstitute,
} from "./thunks";



// Initial state
const initialState: InstituteState = {
  list: [],
  selected: null,
  loading: false,
  error: null,
  search: "",
  activeCategory: "All Categories",
};

//  Slice
const instituteSlice = createSlice({
  name: "institute",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
    },
    clearSelectedInstitute: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //  Fetch All Institutes
      .addCase(fetchInstitutes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstitutes.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchInstitutes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load institutes";
      })

      //  Fetch Institute by ID
      .addCase(fetchInstituteById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selected = null;
      })
      .addCase(fetchInstituteById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchInstituteById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch institute";
      })

      //  Update Institute
      .addCase(updateInstitute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInstitute.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex((i) => i._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
        if (state.selected?._id === action.payload._id) {
          state.selected = action.payload;
        }
      })
      .addCase(updateInstitute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to update institute";
      })

      //  Delete Institute
      .addCase(deleteInstitute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInstitute.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((i) => i._id !== action.payload);
      })
      .addCase(deleteInstitute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to delete institute";
      });
  },
});

//  Export actions
export const { setSearch, setActiveCategory, clearSelectedInstitute } =
  instituteSlice.actions;

//  Export reducer
export default instituteSlice.reducer;
