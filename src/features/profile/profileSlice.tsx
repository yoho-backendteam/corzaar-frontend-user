
import { createSlice } from '@reduxjs/toolkit';
import { profileData } from '../dummydata/profiledata';

const profileSlice = createSlice({
  name: 'profile',
  initialState: profileData,
  reducers: {}, 
});

export default profileSlice.reducer;
