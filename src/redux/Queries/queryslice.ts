import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ContactState {
  fullName: string;
  email: string;
  phone: string;
  category: string;
  subject: string;
  message: string;
}

const initialState: ContactState = {
  fullName: "Rahul Sharma",
  email: "john@example.com",
  phone: "9876546864",
  category: "",
  subject: "Brisf description of your inquiry",
  message: "Tell us more about your inquiry"
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ field: keyof ContactState; value: string }>
    ) => {
      state[action.payload.field] = action.payload.value;
    }
  }
});

export const { updateField } = contactSlice.actions;
export default contactSlice.reducer;
