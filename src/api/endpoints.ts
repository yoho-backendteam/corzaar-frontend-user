const BASE_API_URL = import.meta.env.VITE_PUBLIC_API_URL;

const BASE_COURSE_URL = `${BASE_API_URL}/api/courses`;

export const HTTP_END_POINTS = {
  course: {
    create: `${BASE_COURSE_URL}/`,
    getAll: `${BASE_COURSE_URL}/`,
    getAllDetailed: `${BASE_COURSE_URL}/all`,
    getById: (id: string) => `${BASE_COURSE_URL}/getCourseById/${id}`,
    update: (id: string) => `${BASE_COURSE_URL}/${id}`,
    delete: (id: string) => `${BASE_COURSE_URL}/${id}`,

    getByBranch: (branchId: string) =>
      `${BASE_API_URL}/course/api/course/getCourseBybranch/${branchId}`,

    getByInstitute: (instituteId: string) =>
      `${BASE_API_URL}/course/api/course/getCourseBymerchant/${instituteId}`,

    search: `${BASE_COURSE_URL}/search`,

    categories: `${BASE_COURSE_URL}/categories`,

    featured: `${BASE_COURSE_URL}/featured`,

    trending: `${BASE_COURSE_URL}/trending`,

    addContent: (courseId: string) =>
      `${BASE_COURSE_URL}/${courseId}/content/`,
    getContent: (courseId: string) =>
      `${BASE_COURSE_URL}/${courseId}/content/`,
    updateContent: (courseId: string, contentId: string) =>
      `${BASE_COURSE_URL}/${courseId}/content/${contentId}`,
    deleteContent: (courseId: string, contentId: string) =>
      `${BASE_COURSE_URL}/${courseId}/content/${contentId}`,
  },

  cart: {
    fav: {
      add: `${BASE_API_URL}/student/api/cart/fav/add`,
      get: `${BASE_API_URL}/student/api/cart/fav/get`,
      movetocart: `${BASE_API_URL}/student/api/cart/fav/movetocart`,
    },
  },
};
