import type { AppDispatch } from "../../../store/store";
import { 
  getActivity, 
  getAllPayment, 
  getCoursesId, 
  getFavlist, 
  getPortfolio, 
  getProfileById, 
  getStudentAttendance 
} from "../services";
import type { 
  ProfileResponse, 
  PaymentResponse, 
  FavResponse, 
  PortfolioResponse, 
  ActivityResponse, 
  AttendanceResponse,
  CourseResponse,
  CoursesIdResponse, 
} from "../types/settingTypes";
import { 
  getFav, 
  getPayment, 
  getProfile, 
  setActivity, 
  setAttendance, 
  setCoursesId, 
  setPortfolio, 
  setProfile 
} from "./SettingSlice";

export const getAllPaymentData = (params: string) => async(dispatch: AppDispatch): Promise<PaymentResponse | undefined> => {
  try {
    const response = await getAllPayment(params);
    console.log("payment response", response);
    if (response) {
      dispatch(getPayment(response));
    }
    return response;
  } catch (error) {
    console.log("Payment fetch error:", error);
    return undefined;
  }
} 

export const getAllFavData = (userId: string) => async(dispatch: AppDispatch): Promise<FavResponse | undefined> => {
  try {
    const response = await getFavlist(userId);
    console.log("Favorites thunk response:", response);
    if (response) {
      dispatch(getFav(response));
    }
    return response;
  } catch (error) {
    console.log("Favorites fetch error:", error);
    return undefined;
  }
}  

export const getProfileData = (userId: string) => async(dispatch: AppDispatch): Promise<ProfileResponse | undefined> => {
  try {
    const response = await getProfileById(userId);
    console.log("profile response", response);
    if (response) {
      dispatch(getProfile(response.data));
    }
    return response;
  } catch (error) {
    console.log("Profile fetch error:", error);
    return undefined;
  }
} 

export const getPortfolioData = (params: string) => async(dispatch: AppDispatch): Promise<PortfolioResponse | undefined> => {
  try {
    const response = await getPortfolio(params);
    console.log("portfolio response", response);
    if (response) {
      dispatch(setPortfolio(response));
    }
    return response;
  } catch (error) {
    console.log("Portfolio fetch error:", error);
    return undefined;
  }
} 

export const setProfileData = (params: string) => async (dispatch: AppDispatch): Promise<ProfileResponse | undefined> => {
  try {
    const response = await getProfileById(params);
    console.log("profile by id response", response);
    if (response) {
      dispatch(setProfile(response));
    }
    return response;
  } catch (error) {
    console.log("Profile by ID fetch error:", error);
    return undefined;
  }
}

export const setActivityData = (params: string) => async(dispatch: AppDispatch): Promise<ActivityResponse | undefined> => {
  try {
    const response = await getActivity(params);
    console.log("activity thunk response:", response);
    if (response) {
      dispatch(setActivity(response));
    }
    return response;
  } catch (error) {
    console.log("setActivityData error:", error);
    return undefined;
  }
}

export const setAttendanceData = (params: string) => async(dispatch: AppDispatch): Promise<AttendanceResponse | undefined> => {
  try {
    const response = await getStudentAttendance(params);
    console.log("attendance response", response);
    if (response) {
      dispatch(setAttendance(response));
    }
    return response;
  } catch (error) {
    console.log("Attendance fetch error:", error);
    return undefined;
  }
} 

export const setCoursesById = (params: string) => async(dispatch: AppDispatch): Promise<CourseResponse | undefined> => {
  try {
    const response: CourseResponse | undefined = await getCoursesId(params);
    console.log("Courses thunk response:", response);
    
    if (response) {
      // Use type assertion to fix the type mismatch
      dispatch(setCoursesId(response as unknown as CoursesIdResponse));
      return response; // Return directly
    }
    
    return undefined;
  } catch (error) {
    console.log("setCourseById error:", error);
    return undefined;
  }
}