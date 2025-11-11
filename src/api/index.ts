import HttpClient from "./httpclients";
import { HTTP_END_POINTS } from "./endpoints";

class CourseClient {
  createCourse(data: any) {
    return HttpClient.post(HTTP_END_POINTS.course.create, data);
  }

  getAllCourses() {
    return HttpClient.get(HTTP_END_POINTS.course.getAll);
  }

  getDetailedCourses() {
    return HttpClient.get(HTTP_END_POINTS.course.getAllDetailed);
  }

  getCourseById(id: string) {
    return HttpClient.get(HTTP_END_POINTS.course.getById(id));
  }

  updateCourse(id: string, data: any) {
    return HttpClient.put(HTTP_END_POINTS.course.update(id), data);
  }

  deleteCourse(id: string) {
    return HttpClient.delete(HTTP_END_POINTS.course.delete(id));
  }

  getCoursesByBranch(branchId: string) {
    return HttpClient.get(HTTP_END_POINTS.course.getByBranch(branchId));
  }

  getCoursesByInstitute(instituteId: string) {
    return HttpClient.get(HTTP_END_POINTS.course.getByInstitute(instituteId));
  }

  searchCourses(query: string) {
    return HttpClient.get(`${HTTP_END_POINTS.course.search}?query=${query}`);
  }

  getCategories() {
    return HttpClient.get(HTTP_END_POINTS.course.categories);
  }

  getFeaturedCourses() {
    return HttpClient.get(HTTP_END_POINTS.course.featured);
  }

  getTrendingCourses() {
    return HttpClient.get(HTTP_END_POINTS.course.trending);
  }

  // COURSE CONTENT METHODS
  addCourseContent(courseId: string, data: any) {
    return HttpClient.post(HTTP_END_POINTS.course.addContent(courseId), data);
  }

  getCourseContent(courseId: string) {
    return HttpClient.get(HTTP_END_POINTS.course.getContent(courseId));
  }

  updateCourseContent(courseId: string, contentId: string, data: any) {
    return HttpClient.put(
      HTTP_END_POINTS.course.updateContent(courseId, contentId),
      data
    );
  }

  deleteCourseContent(courseId: string, contentId: string) {
    return HttpClient.delete(
      HTTP_END_POINTS.course.deleteContent(courseId, contentId)
    );
  }

  // FAVORITE METHODS
  addToFavourites(courseId: string) {
    return HttpClient.post(HTTP_END_POINTS.cart.fav.add, { courseId });
  }

  getFavouriteCourses() {
    return HttpClient.get(HTTP_END_POINTS.cart.fav.get);
  }

  moveFavouriteToCart(courseId: string) {
    return HttpClient.post(HTTP_END_POINTS.cart.fav.movetocart, { courseId });
  }

  /**
   * REVIEW METHODS - GET APIS
   */

  // Get all reviews for a specific course
  getCourseReviews(courseId: string) {
    return HttpClient.get(`/courses/${courseId}/reviews`);
  }

  // Get a specific review by ID
  getReviewById(reviewId: string) {
    return HttpClient.get(`/reviews/${reviewId}`);
  }

  // Get reviews by user
  getUserReviews(userId: string) {
    return HttpClient.get(`/users/${userId}/reviews`);
  }

  // Get featured reviews (top rated)
  getFeaturedReviews() {
    return HttpClient.get('/reviews/featured');
  }

  // Get recent reviews
  getRecentReviews(limit: number = 10) {
    return HttpClient.get(`/reviews/recent?limit=${limit}`);
  }

  // Add a new review to a course
  addCourseReview(courseId: string, reviewData: any) {
    return HttpClient.post(`/courses/${courseId}/reviews`, reviewData);
  }

  // Update a review
  updateCourseReview(reviewId: string, reviewData: any) {
    return HttpClient.put(`/reviews/${reviewId}`, reviewData);
  }

  // Delete a review
  deleteCourseReview(reviewId: string) {
    return HttpClient.delete(`/reviews/${reviewId}`);
  }
}

export default new CourseClient();