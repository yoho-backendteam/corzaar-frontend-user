const BASE_API_URL = import.meta.env.VITE_PUBLIC_API_URL;

const BASE_COURSE_URL = `${BASE_API_URL}/open/course/api/courses`;

export const API_END_POINTS = {
  instituteManagement: {
    base: "/api/",
    getAll: "/open/merchant/api/getall",
    getById: "/open/merchant/api/getbyid/:id",
    updateById: "/api/update/:id",
    deleteById: "/api/delete/:id",
    getStudentsByInstitute: "/api/getall/:id/students",
    getCoursesByInstitute: "/api/getall/:id/courses",
    searchById: "/api/:id/search",
    nearme: "/open/merchant/api/getnearby",

  },

  studentRegister: {
    post: "/student/api/student_management/create"
  },

  login: {
    post: "/api/users/login",
    rootpost: "/auth/api/users/root-login",
    profile: "/student/api/student_management/create"
  },
  otpverify: { post: "/api/share/verify-otp" },
  course: {
    create: `${BASE_COURSE_URL}/`,
    getAll: `${BASE_COURSE_URL}/`,
    filtercourse: `${BASE_COURSE_URL}/filter`,
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

  student: {
    payment: {
      getAll: "/payment/api/student/all/payments"
    },
    fav: {
       get: `/student/api/cart/fav/getinstitute/:userId`,
    },
    profile: {
      get: "users/profile",
      getById: "/student/api/student_management/getbyid/:id"
    },
    portfolio: {
      get: "/student/api/student_management/getBatch/:id"
    },
    activity: {
      get: "/logs/api/activity/:userid"
    },
    attendance: {
      get: "/student/api/attendance/all-student"
    },
   courses: {
  getById: "/api/enrollment/getByUserId/:userId"
}

  },
  Cart: {
    getAll: `/student/api/cart`,
    addtocart: "/student/api/cart/addtocart/:id",
    deleteone: `/student/api/cart/remove/:id`
  },

  user_home: {
    getalloffers: "/open/other/api/offer",
    getallcourses: "/open/course/api/courses/all",
    gettrendingcourses: "/open/course/api/courses/trending",
    getallinstitutes: "/open/merchant/api/getall",
    getcategories: "/open/course/api/courses/categories",
    addtokart: "/student/api/cart/addtocart"
  },

  offer: {
    getalloffers: "/open/other/api/offer",
    getofferbyid: "/open/other/api/offer/:id",
  },

  Query: {
    POST: "reports/api/query/querysend",
    GET: "/api/queryview",
    adminPOST: "/api/adminreplay",
  },

  payment: {
    create: "/payment/api/student/create"
  }
};

