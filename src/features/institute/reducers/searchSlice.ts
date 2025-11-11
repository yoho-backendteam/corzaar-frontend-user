import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Institute } from "../../../types/institute";

interface InstituteSearchState {
  filteredInstitutes: Institute[];
}

const initialState: InstituteSearchState = {
  filteredInstitutes: [],
};

const instituteSearchSlice = createSlice({
  name: "instituteSearch",
  initialState,
  reducers: {
    setFilteredInstitutes: (state, action: PayloadAction<Institute[]>) => {
      state.filteredInstitutes = action.payload;
    },
    clearFilteredInstitutes: (state) => {
      state.filteredInstitutes = [];
    },
  },
});

export const { setFilteredInstitutes, clearFilteredInstitutes } = instituteSearchSlice.actions;
export default instituteSearchSlice.reducer;
