

import { createSlice } from '@reduxjs/toolkit';

const querySlice = createSlice({
    name: 'querySlice',
    initialState: {
        queryData: [],
       
       
    },
    reducers: {
        getQueryData: (state, action) => {
            state.queryData = action.payload;
        },
        
        

       
    },
});

export const { getQueryData} = querySlice.actions;
export default querySlice.reducer;
