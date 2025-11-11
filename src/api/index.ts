import httpClient from "../api/httpclient";
import { API_END_POINTS } from "../api/endpoints";
import type { Institute } from "../types/institute";

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
  };

  loginEndpoint = {
    postotp: (phoneNumber: string) =>
      httpClient.post(API_END_POINTS.login.post, { phoneNumber })
  }
  verifyOtpEndpoint = {
    postverifyotp: (token: string, otp: string,) =>
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
      httpClient.post(API_END_POINTS.student.fav.get, { userId })

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
    getById: (params: string) =>
      httpClient.get(API_END_POINTS.student.courses.getById.replace(":id", params))
  }

}

export default new Client();
