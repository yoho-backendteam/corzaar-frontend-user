import { createSelector } from "@reduxjs/toolkit";
import { type RootState } from "../../store/store";

export const selectInstitutes = (state: RootState) =>
  state.institute.institutes;
export const selectSearch = (state: RootState) => state.institute.search;
export const selectActiveCategory = (state: RootState) =>
  state.institute.activeCategory;

// ✅ Memoized selector to prevent re-renders
export const selectFilteredInstitutes = createSelector(
  [selectInstitutes, selectSearch, selectActiveCategory],
  (institutes, search, activeCategory) => {
    return institutes.filter((inst) => {
      const matchesCategory =
        activeCategory === "All Categories" ||
        inst.tags.includes(activeCategory);
      const matchesSearch = inst.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }
);
