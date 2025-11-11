import { Activity } from "react";

export const API_END_POINTS = {
    student : {
        payment : {
            getAll : "/api/student/getall/:id"
        },
        fav : {
            get : "api/product/fav/get"
        },
        profile : {
            get : "users/profile",
            getById: "api/student_management/getbyid/:id"
        },
        portfolio : {
            get : "api/student_management/getBatch/:id"
        },
        activity : {
            get: "api/activity/:userid"
        },
        attendance: {
            get: "api/attendance/getStudentAllAttendance/:studentId"
        },
        courses: {
            getById : "api/courses/getCoursesId/:id"
        }
    }
}