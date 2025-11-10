

import { createSlice } from '@reduxjs/toolkit';

const offerSlice = createSlice({
    name: 'offerSlice',
    initialState: {
        offersData: [],
        offerbyidData: [],
       
    },
    reducers: {
        getOfferData: (state, action) => {
            state.offersData = action.payload;
        },
         getOfferbyid: (state, action) => {
            state.offerbyidData = action.payload;
        },
        

       
    },
});

export const { getOfferData,getOfferbyid} = offerSlice.actions;
export default offerSlice.reducer;
