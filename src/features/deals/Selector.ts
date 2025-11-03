import {type RootState } from "../../store/store";
export const selectDeals = (state: RootState) => state.dealSlice.items;
