  import { createSlice } from "@reduxjs/toolkit";
  import initialState from '../redux/studentData'

 interface Stats {
  students: number;
  courses: number;
  institutes: number;
  ratings: number;
}

 interface Promotion {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  buttonColor: string;
  icon?: string; 
}


 interface Course {
  id: number;
  title: string;
  category: string;
  type: string;
  institute: string;
  price: number;
  oldPrice: number;
  enrolled: boolean;
  image: string;
}

 interface StudentHomeState {
  stats: Stats;
  filters: string[];
  promotions: Promotion[];
  topCourses?: Course[];
  trendingCourses?: Course[];
  popularInstitue?: Institute[];
  expertsinstitute?: Institute[];
  category: Category[];
}

interface Institute {
  id: number;
  name: string;
  courses: number;
  rating: number;
  location: string;
  image: string;
}

interface Category{
  id: number,
  name: string,
  course: number,
}

  const studentHomeSlice = createSlice({
    name: "studentHome",
    initialState,
    reducers: {},
  });

  export default studentHomeSlice.reducer;
