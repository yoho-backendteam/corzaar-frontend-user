// import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import { institutesData, type Institute } from "../../data/data";

// interface InstituteState {
//   error: any;
//   loading: any;
//   selected: any;
//   list: any;
//   institutes: Institute[];
//   search: string;
//   activeCategory: string;
// }

// const initialState: InstituteState = {
//   institutes: institutesData,
//   search: "",
//   activeCategory: "All Categories",
// };

// const instituteSlice = createSlice({
//   name: "institute",
//   initialState,
//   reducers: {
//     setSearch(state, action: PayloadAction<string>) {
//       state.search = action.payload;
//     },
//     setActiveCategory(state, action: PayloadAction<string>) {
//       state.activeCategory = action.payload;
//     },
//   },
// });

// export const { setSearch, setActiveCategory } = instituteSlice.actions;
// export default instituteSlice.reducer;
