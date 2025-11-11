// src/features/institute/reducers/selectors.ts
import type { RootState } from "../../../store/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectAllInstitutes = (state: RootState) => state.institute.list;
export const selectInstitute = (state: RootState) => state.institute.selected;
export const selectInstituteLoading = (state: RootState) => state.institute.loading;
export const selectInstituteError = (state: RootState) => state.institute.error;
export const selectSearch = (state: RootState) => state.institute.search;
export const selectActiveCategory = (state: RootState) => state.institute.activeCategory;

// Derived selector for filtered institutes
export const selectFilteredInstitutes = createSelector(
  [selectAllInstitutes, selectSearch, selectActiveCategory],
  (institutes, search, category) => {
    return institutes.filter((inst) => {
      const matchesSearch =
        inst.name.toLowerCase().includes(search.toLowerCase()) ||
        inst.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        category === "All Categories" || inst.category === category;

      return matchesSearch && matchesCategory;
    });
  }
);
