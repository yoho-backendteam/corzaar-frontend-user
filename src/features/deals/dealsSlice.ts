import { createSlice } from "@reduxjs/toolkit";
import { dummyDeals } from "../../data/dealData";

const dealsSlice = createSlice({
  name: "deals",
  initialState: {
    items: dummyDeals,
  },
  reducers: {},
});

export default dealsSlice.reducer;
