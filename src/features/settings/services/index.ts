import axios from 'axios';
import Client from '../../../api/index';
import type { 
  PaymentResponse, 
  FavResponse, 
  PortfolioResponse, 
  ProfileResponse, 
  ActivityResponse, 
  AttendanceResponse, 
  CourseResponse
} from '../types/settingTypes';

export const getAllPayment = async(params: string): Promise<PaymentResponse | undefined> => {
  try {
    const response = await Client.payment.getAll(params);
    return response?.data;
  } catch (error) {
    console.log("get All payment error:", error);
    return undefined;
  }
}

export const getFavlist = async(userId: string): Promise<FavResponse | undefined> => {
  try {
    const response = await Client.fav.get(userId);
    console.log("Favorites service response:", response);
    return response.data; // Note: changed from return response to return response.data
  } catch (error) {
    console.log("get favorites error:", error);
    return undefined;
  }
}

export const getProfile = async(): Promise<ProfileResponse | undefined> => {
  try {
    const response = await Client.profile.get();
    console.log("profile service response:", response);
    return response?.data;
  } catch (error) {
    console.log("get profile error:", error);
    return undefined;
  }
}

export const getPortfolio = async(params: string): Promise<PortfolioResponse | undefined> => {
  try {
    const response = await Client.portfolio.get(params);
    return response?.data;
  } catch (error) {
    console.log("get portfolio error:", error);
    return undefined;
  }
}

export const getProfileById = async(params: string): Promise<ProfileResponse | undefined> => {
  try {
    const response = await Client.profile.getById(params);
    return response?.data;
  } catch (error) {
    console.log("get profile by id error:", error);
    return undefined;
  }
}

export const getActivity = async(params: string): Promise<ActivityResponse | undefined> => {
  try {
    const response = await Client.activity.get(params);
    console.log("activity service response:", response);
    return response?.data;
  } catch (error) {
    console.log("get activity error:", error);
    return undefined;
  }
}

export const getStudentAttendance = async (studentId: string): Promise<AttendanceResponse | undefined> => {
  try {
    const response = await Client.attendance.get(studentId); 
    console.log("attendance service response:", response.data);
    return response.data;
  } catch (error) {
    console.log("getStudentAttendance error:", error);
    return undefined;
  }
};

export const getCoursesId = async(params: string): Promise<CourseResponse | undefined> => {
  try {
    const response = await axios.get(`http://localhost:3004/api/courses/getCourseById/${params}`);
    console.log("Courses service response:", response.data);
    return response.data;
  } catch (error) {
    console.log("courses error:", error);
    return undefined;
  }
}