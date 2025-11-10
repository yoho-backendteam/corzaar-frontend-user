export const API_END_POINTS = {
  instituteManagement: {
    base: "/api/",
    getAll: "/api/getall",
    getById: "/api/getbyid/:id",
    updateById: "/api/update/:id",
    deleteById: "/api/delete/:id",
    getStudentsByInstitute: "/api/getall/:id/students",
    getCoursesByInstitute: "/api/getall/:id/courses",
    searchById: "/api/:id/search",
  },
};
