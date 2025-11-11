import { createAsyncThunk } from "@reduxjs/toolkit";
import CourseClient from "../../api/index";


const normalizeResponse = (res: any) => {
  const data = res?.data?.data ?? res?.data ?? [];
  return Array.isArray(data) ? data : [];
};


export const createCourse = createAsyncThunk(
  "course/create",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await CourseClient.createCourse(data);
      return res?.data?.data || res?.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to create course"
      );
    }
  }
);

export const fetchCourses = createAsyncThunk(
  "course/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await CourseClient.getAllCourses();
      return normalizeResponse(res);
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch courses"
      );
    }
  }
);


export const fetchAllDetailedCourses = createAsyncThunk(
  "course/fetchAllDetailed",
  async (_, { rejectWithValue }) => {
    try {
      const res = await CourseClient.getDetailedCourses();
      return normalizeResponse(res);
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch detailed courses"
      );
    }
  }
);


export const fetchCourseById = createAsyncThunk(
  "course/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await CourseClient.getCourseById(id);
      return res?.data?.data || res?.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch course"
      );
    }
  }
);

export const updateCourse = createAsyncThunk(
  "course/update",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const res = await CourseClient.updateCourse(id, data);
      return res?.data?.data || res?.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to update course"
      );
    }
  }
);


export const deleteCourse = createAsyncThunk(
  "course/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await CourseClient.deleteCourse(id);
      return { id, ...res.data };
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to delete course"
      );
    }
  }
);


export const fetchCoursesByBranch = createAsyncThunk(
  "course/fetchByBranch",
  async (branchId: string, { rejectWithValue }) => {
    try {
      const res = await CourseClient.getCoursesByBranch(branchId);
      return normalizeResponse(res);
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch courses by branch"
      );
    }
  }
);


export const fetchCoursesByInstitute = createAsyncThunk(
  "course/fetchByInstitute",
  async (instituteId: string, { rejectWithValue }) => {
    try {
      const res = await CourseClient.getCoursesByInstitute(instituteId);
      return normalizeResponse(res);
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch courses by institute"
      );
    }
  }
);


export const searchCoursesThunk = createAsyncThunk(
  "course/search",
  async (query: string, { rejectWithValue }) => {
    try {
      const res = await CourseClient.searchCourses(query);
      return normalizeResponse(res);
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to search courses"
      );
    }
  }
);


export const fetchCategories = createAsyncThunk(
  "course/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await CourseClient.getCategories();
      return normalizeResponse(res);
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);


export const fetchFeaturedCourses = createAsyncThunk(
  "course/fetchFeatured",
  async (_, { rejectWithValue }) => {
    try {
      const res = await CourseClient.getFeaturedCourses();
      return normalizeResponse(res);
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch featured courses"
      );
    }
  }
);


export const fetchTrendingCourses = createAsyncThunk(
  "course/fetchTrending",
  async (_, { rejectWithValue }) => {
    try {
      const res = await CourseClient.getTrendingCourses();
      return normalizeResponse(res);
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch trending courses"
      );
    }
  }
);


export const addToFavourites = createAsyncThunk(
  "cart/fav/add",
  async (courseId: string, { rejectWithValue }) => {
    try {
      const res = await CourseClient.addToFavourites(courseId);
      return res?.data?.data || res?.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to add course to favourites"
      );
    }
  }
);


export const getFavouriteCourses = createAsyncThunk(
  "cart/fav/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await CourseClient.getFavouriteCourses();
      return normalizeResponse(res);
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch favourite courses"
      );
    }
  }
);


export const moveFavouriteToCart = createAsyncThunk(
  "cart/fav/movetocart",
  async (courseId: string, { rejectWithValue }) => {
    try {
      const res = await CourseClient.moveFavouriteToCart(courseId);
      return res?.data?.data || res?.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to move favourite to cart"
      );
    }
  }
);


export const fetchCourseReviews = createAsyncThunk(
  "reviews/fetchCourseReviews",
  async (courseId: string, { rejectWithValue }) => {
    try {
      const res = await CourseClient.getCourseReviews(courseId);
      return {
        courseId,
        reviews: normalizeResponse(res)
      };
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch course reviews"
      );
    }
  }
);


export const fetchReviewById = createAsyncThunk(
  "reviews/fetchById",
  async (reviewId: string, { rejectWithValue }) => {
    try {
      const res = await CourseClient.getReviewById(reviewId);
      return res?.data?.data || res?.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch review"
      );
    }
  }
);


export const fetchUserReviews = createAsyncThunk(
  "reviews/fetchUserReviews",
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await CourseClient.getUserReviews(userId);
      return normalizeResponse(res);
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch user reviews"
      );
    }
  }
);


export const fetchFeaturedReviews = createAsyncThunk(
  "reviews/fetchFeatured",
  async (_, { rejectWithValue }) => {
    try {
      const res = await CourseClient.getFeaturedReviews();
      return normalizeResponse(res);
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch featured reviews"
      );
    }
  }
);


export const fetchRecentReviews = createAsyncThunk(
  "reviews/fetchRecent",
  async (limit: number = 10, { rejectWithValue }) => {
    try {
      const res = await CourseClient.getRecentReviews(limit);
      return normalizeResponse(res);
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch recent reviews"
      );
    }
  }
);


export const addCourseReview = createAsyncThunk(
  "reviews/add",
  async ({ courseId, reviewData }: { courseId: string; reviewData: any }, { rejectWithValue }) => {
    try {
      const res = await CourseClient.addCourseReview(courseId, reviewData);
      return res?.data?.data || res?.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to add review"
      );
    }
  }
);

export const updateCourseReview = createAsyncThunk(
  "reviews/update",
  async ({ reviewId, reviewData }: { reviewId: string; reviewData: any }, { rejectWithValue }) => {
    try {
      const res = await CourseClient.updateCourseReview(reviewId, reviewData);
      return res?.data?.data || res?.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to update review"
      );
    }
  }
);


export const deleteCourseReview = createAsyncThunk(
  "reviews/delete",
  async (reviewId: string, { rejectWithValue }) => {
    try {
      const res = await CourseClient.deleteCourseReview(reviewId);
      return { reviewId, ...res.data };
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to delete review"
      );
    }
  }
);