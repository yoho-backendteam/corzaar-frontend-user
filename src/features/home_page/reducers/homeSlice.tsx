

import { createSlice } from '@reduxjs/toolkit';
import type { CourseData } from '../../../Components/StudentCourse/Courseview';

const HomeSlice = createSlice({
    name: 'HomeSlice',
    initialState: {
        offersData: [],
        courseData:[],
        trendingCourseData:[],
        instituteData:[],
         categoryData:[],
          addtokart:[],
        coursebyid: {} as CourseData,
    },
    reducers: {
        getOfferData: (state, action) => {
            state.offersData = action.payload;
        },
         getCourseData: (state, action) => {
            state.courseData = action.payload;
        },
        trendingCourseData: (state, action) => {
            state.trendingCourseData = action.payload;
        },
         getInstituteData: (state, action) => {
            state.instituteData = action.payload;
        },
        getCategoryData: (state, action) => {
            state.categoryData = action.payload;
        },
        postaddtokart: (state, action) => {
            state.addtokart = action.payload;
        },
          getCoursebyid: (state, action) => {
            state.coursebyid = action.payload;
        },
        

       
    },
});

export const { getOfferData,getCourseData,trendingCourseData,getInstituteData ,getCategoryData,postaddtokart,getCoursebyid} = HomeSlice.actions;
export default HomeSlice.reducer;
