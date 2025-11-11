import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"; 

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
  courseId: string;
  price: number;
  discountPrice?: number;
}

export interface CartInfo {
  datas: CourseData[];
  cart: {
    items: CartItem[];
  };
}

// --- Slice State Type ---
interface CartState {
  data: CartInfo | null; // use CartInfo type
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
    getcart: (state, action: PayloadAction<CartInfo>) => {
      state.data = action.payload;
    },
    deletecart: (state, action: PayloadAction<CartInfo>) => {
      state.data = action.payload;
    },
  },
});

// --- Export Actions and Reducer ---
export const { getcart, deletecart } = cartSlice.actions;
export default cartSlice.reducer;
