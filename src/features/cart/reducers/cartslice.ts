/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

export interface Review {
  rating: number;
  comment?: string;
}

export interface CourseContent {
  totalDuration: number;
}

export interface CourseData {
  data: any;
  title: string;
  description: string;
  image?: string;
  level?: string;
  content?: CourseContent;
  reviews?: Review[];
}

export interface CartItem {
  _id: string;
  courseId: string;
  price: number;
  discountPrice?: number;
  title?: string;
  category?: string;
  shortDescription?: string;

  instituteId?: {
    logo?: string;
    name?: string;
  };

  pricing?: {
    price?: number;
    discountPrice?: number;
  };
}

// export interface CartInfo {
//   datas: CourseData[];
//   cart: {
//     items: CartItem[];
//   };
// }

// --- Slice State Type ---
interface CartState {
  data: any | null; // use CartInfo type
}

// --- Initial State ---
const initialState: CartState = {
  data: null,
};

// --- Slice ---
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getcart: (state, action) => {
      state.data = action.payload;
    },
    deletecart: (state, action) => {
      state.data = action.payload;
    },
  },
});

// --- Export Actions and Reducer ---
export const { getcart, deletecart } = cartSlice.actions;
export default cartSlice.reducer;
