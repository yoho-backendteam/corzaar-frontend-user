import type { AppDispatch } from "../../../store/store";
import type { addtocartTypes } from "../../../userHomeTypes/types";
import { addtokartService, getCategoriesService, getCourseService, getInstituteService, getOfferService, getTrendingCourseService } from "../services";
import { getCategoryData, getCourseData, getInstituteData, getOfferData, postaddtokart, trendingCourseData } from "./homeSlice";

export const getOfferThunk = () => async (dispatch: AppDispatch) => {
  try {
    const response = await getOfferService();
    if (response) {
      dispatch(getOfferData(response?.data?.offers));
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};



export const getCourseThunk = () => async (dispatch: AppDispatch) => {
  try {
    const response = await getCourseService();
    if (response) {
      dispatch(getCourseData(response?.data));
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getTrendingCourseThunk = () => async (dispatch: AppDispatch) => {
  try {
    const response = await getTrendingCourseService();
    if (response) {
      dispatch(trendingCourseData(response?.data?.data));
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};


export const getInstituteThunk = () => async (dispatch: AppDispatch) => {
  try {
    const response = await getInstituteService();
    if (response) {
      dispatch(getInstituteData(response?.data?.data));
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};


export const getCategoriesThunk = () => async (dispatch: AppDispatch) => {
  try {
    const response = await getCategoriesService();
    if (response) {
      dispatch(getCategoryData(response?.data?.data));
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const addtokartThunk = (data:addtocartTypes) => async (dispatch: AppDispatch) => {
  try {
    const response = await addtokartService(data);
    if (response) {
      dispatch(postaddtokart(response?.data));
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};