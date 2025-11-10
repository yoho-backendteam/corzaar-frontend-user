import type { RootState } from "../../../store/store";

export const selectOfferData = (state: RootState) => state.home.offersData;
export const selectCourseData = (state: RootState) => state.home.courseData;
export const selectTrendingCourseData = (state: RootState) => state.home.trendingCourseData;
export const selectInstituteData = (state: RootState) => state.home.instituteData;
export const selectCategoryData = (state: RootState) => state.home.categoryData;
export const selectAddtokart = (state: RootState) => state.home.addtokart;