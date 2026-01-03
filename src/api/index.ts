/* eslint-disable @typescript-eslint/no-explicit-any */
import httpClient from "./httpClients";
import { API_END_POINTS } from "../api/endpoints";
import type { addtocartTypes } from "../userHomeTypes/types";
import type { Institute } from "../types/institute";
import type { StudentFormType } from "../types/studentForm";
import type { CreateNotificationPayload, UpdateNotificationPayload } from "../features/notification/notificationtype";

class Client {
  instituteManagement = {
    getAll: () =>
      httpClient.get(API_END_POINTS.instituteManagement.getAll),

    getById: (id: string) =>
      httpClient.get(API_END_POINTS.instituteManagement.getById.replace(":id", id)),

    updateById: (id: string, data: Partial<Institute>) =>
      httpClient.put(API_END_POINTS.instituteManagement.updateById.replace(":id", id), data),

    deleteById: (id: string) =>
      httpClient.delete(API_END_POINTS.instituteManagement.deleteById.replace(":id", id)),

    getStudentsByInstitute: (id: string) =>
      httpClient.get(API_END_POINTS.instituteManagement.getStudentsByInstitute.replace(":id", id)),

    getCoursesByInstitute: (id: string) =>
      httpClient.get(API_END_POINTS.instituteManagement.getCoursesByInstitute.replace(":id", id)),

    searchById: (id: string) =>
      httpClient.get(API_END_POINTS.instituteManagement.searchById.replace(":id", id)),

    nearme: (params: { latitude: number; longitude: number }) =>
      httpClient.get(
        `${API_END_POINTS.instituteManagement.nearme}?latitude=${params.latitude}&longitude=${params.longitude}`
      ),

  };

  CourseBuying(data: { cartId: string }) {
    return httpClient.post(API_END_POINTS.payment.create, data)
  }

  loginEndpoint = {
    postotp: (phoneNumber: string) =>
      httpClient.post(API_END_POINTS.login.post, { phoneNumber }),
    rootlogin: (data: { email: string, password: string }) => httpClient.post(API_END_POINTS.login.rootpost, data),
    profile: (data: StudentFormType) => httpClient.post(API_END_POINTS.login.profile, data)
  }
  verifyOtpEndpoint = {
    postverifyotp: (token: string | undefined, otp: string,) =>
      httpClient.post(API_END_POINTS.otpverify.post, { token, otp })
  }
  createCourse(data: any) {
    return httpClient.post(API_END_POINTS.course.create, data);
  }
  getAllCourses() {
    return httpClient.get(API_END_POINTS.course.getAll);
  }

  getDetailedCourses() {
    return httpClient.get(API_END_POINTS.course.getAllDetailed);
  }

  getCourseById(id: string) {
    return httpClient.get(API_END_POINTS.course.getById(id));
  }

  updateCourse(id: string, data: any) {
    return httpClient.put(API_END_POINTS.course.update(id), data);
  }

  deleteCourse(id: string) {
    return httpClient.delete(API_END_POINTS.course.delete(id));
  }

  getCoursesByBranch(branchId: string) {
    return httpClient.get(API_END_POINTS.course.getByBranch(branchId));
  }

  getCoursesByInstitute(instituteId: string) {
    return httpClient.get(API_END_POINTS.course.getByInstitute(instituteId));
  }

  searchCourses(query: string) {
    return httpClient.get(`${API_END_POINTS.course.search}?query=${query}`);
  }

  getFilterCourse(params: any) {
    return httpClient.get(API_END_POINTS.course.filtercourse, { params });
  }

  getCategories() {
    return httpClient.get(API_END_POINTS.course.categories);
  }

  getFeaturedCourses() {
    return httpClient.get(API_END_POINTS.course.featured);
  }

  getTrendingCourses() {
    return httpClient.get(API_END_POINTS.course.trending);
  }

  // COURSE CONTENT METHODS
  addCourseContent(courseId: string, data: any) {
    return httpClient.post(API_END_POINTS.course.addContent(courseId), data);
  }

  getCourseContent(courseId: string) {
    return httpClient.get(API_END_POINTS.course.getContent(courseId));
  }

  updateCourseContent(courseId: string, contentId: string, data: any) {
    return httpClient.put(
      API_END_POINTS.course.updateContent(courseId, contentId),
      data
    );
  }

  deleteCourseContent(courseId: string, contentId: string) {
    return httpClient.delete(
      API_END_POINTS.course.deleteContent(courseId, contentId)
    );
  }

  // FAVORITE METHODS
  addToFavourites(courseId: string) {
    return httpClient.post(API_END_POINTS.cart.fav.add, { courseId });
  }

  getFavouriteCourses() {
    return httpClient.get(API_END_POINTS.cart.fav.get);
  }

  moveFavouriteToCart(courseId: string) {
    return httpClient.post(API_END_POINTS.cart.fav.movetocart, { courseId });
  }

  getCourseReviews(courseId: string) {
    return httpClient.get(`/courses/${courseId}/reviews`);
  }

  // Get a specific review by ID
  getReviewById(reviewId: string) {
    return httpClient.get(`/reviews/${reviewId}`);
  }

  // Get reviews by user
  getUserReviews(userId: string) {
    return httpClient.get(`/users/${userId}/reviews`);
  }

  // Get featured reviews (top rated)
  getFeaturedReviews() {
    return httpClient.get('/reviews/featured');
  }

  // Get recent reviews
  getRecentReviews(limit: number = 10) {
    return httpClient.get(`/reviews/recent?limit=${limit}`);
  }

  // Add a new review to a course
  addCourseReview(courseId: string, reviewData: any) {
    return httpClient.post(`/courses/${courseId}/reviews`, reviewData);
  }

  // Update a review
  updateCourseReview(reviewId: string, reviewData: any) {
    return httpClient.put(`/reviews/${reviewId}`, reviewData);
  }

  // Delete a review
  deleteCourseReview(reviewId: string) {
    return httpClient.delete(`/reviews/${reviewId}`);
  }


  payment = {
    getAll: (params: string) =>
      httpClient.get(API_END_POINTS.student.payment.getAll.replace(":id", params))
  }
  fav = {
    get: (userId: string) =>
      httpClient.get(API_END_POINTS.student.fav.get.replace(":userId", userId))

  }
  profile = {
    get: () =>
      httpClient.get(API_END_POINTS.student.profile.get),

    getById: (params: string) =>
      httpClient.get(API_END_POINTS.student.profile.getById.replace(":id", params))

  }
  portfolio = {
    get: (params: string) =>
      httpClient.get(API_END_POINTS.student.portfolio.get.replace(":id", params))

  }
  activity = {
    get: (params: string) =>
      httpClient.get(API_END_POINTS.student.activity.get.replace(":userid", params))

  }
  attendance = {
    get: (params: string) =>
      httpClient.get(API_END_POINTS.student.attendance.get.replace(":studentId", params))
  }
  courses = {
    getById: (userId: string) =>
      httpClient.get(
        API_END_POINTS.student.courses.getById.replace(":userId", userId)
      )
  };

  StudentCart = {
    getAll: () => httpClient.get(API_END_POINTS.Cart.getAll),
    delete: (courseId: string) => httpClient.delete(API_END_POINTS.Cart.deleteone.replace(':id', courseId),
    ),
    addtocart: (params: string, batchId: string | undefined) => httpClient.post(API_END_POINTS.Cart.addtocart.replace(":id", params).replace(":batchId", batchId || ""))
  };

  user_home = {
    getall: () => httpClient.get(API_END_POINTS.user_home.getalloffers),
    getallcourses: () => httpClient.get(API_END_POINTS.user_home.getallcourses),
    gettrendingcourses: () => httpClient.get(API_END_POINTS.user_home.gettrendingcourses),
    getallinstitutes: () => httpClient.get(API_END_POINTS.user_home.getallinstitutes),
    getcategories: () => httpClient.get(API_END_POINTS.user_home.getcategories),
    addtokart: (data: addtocartTypes) => httpClient.post(API_END_POINTS.user_home.addtokart, data)
  }

  offer = {
    getalloffers: () => httpClient.get(API_END_POINTS.offer.getalloffers),
    getofferbyid: (id: string) => httpClient.get(API_END_POINTS.offer.getofferbyid.replace(":id", id)),

  }

  QueryService = {

    sendQuery: (data: any) => httpClient.post(API_END_POINTS.Query.POST, data),

    getQueries: (params?: any) => httpClient.get(API_END_POINTS.Query.GET, params),

    adminReply: (data: any) => httpClient.post(API_END_POINTS.Query.adminPOST, data),
  }

  batch = {
    getbycourse: (id: string) => httpClient.get(API_END_POINTS.batch.getByCourseId.replace(":courseId", id))
  }
  notifications = {
    create: (data: CreateNotificationPayload) =>
      httpClient.post(API_END_POINTS.notification.create, data),

    getAll: () =>
      httpClient.get(API_END_POINTS.notification.getAll),

    getByType: (type: string) =>
      httpClient.get(API_END_POINTS.notification.getByType.replace(":type", type)),

    getById: (id: string) =>
      httpClient.get(API_END_POINTS.notification.getById.replace(":id", id)),

    update: (id: string, data: UpdateNotificationPayload) =>
      httpClient.put(API_END_POINTS.notification.update.replace(":id", id), data),

    markAsRead: (id: string) =>
      httpClient.patch(API_END_POINTS.notification.markAsRead.replace(":id", id), {}),

    delete: (id: string) =>
      httpClient.delete(API_END_POINTS.notification.delete.replace(":id", id)),

    webShow: (data: any) =>
      httpClient.post(API_END_POINTS.notification.webShow, data),
  };
}

export default new Client();
