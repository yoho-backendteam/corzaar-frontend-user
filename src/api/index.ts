
import { API_END_POINTS } from "./endpoints";
import httpclient from "./httpclient";


class Client {
        payment = {
            getAll : (params :string) => 
                httpclient.get(API_END_POINTS.student.payment.getAll.replace(":id",params))   
        }
        fav = {
            get : (userId : string) => 
                httpclient.post(API_END_POINTS.student.fav.get,{userId})
            
        }
        profile = {
            get : () => 
                httpclient.get(API_END_POINTS.student.profile.get),
            
            getById : (params : string) => 
                httpclient.get(API_END_POINTS.student.profile.getById.replace(":id",params))
            
        }
        portfolio = {
            get : (params : string) => 
                httpclient.get(API_END_POINTS.student.portfolio.get.replace(":id",params))   
            
        }
        activity = {
            get : (params : string) => 
                httpclient.get(API_END_POINTS.student.activity.get.replace(":userid",params))
            
        }
        attendance = {
  get: (params: string) => 
      httpclient.get(API_END_POINTS.student.attendance.get.replace(":studentId",params))
}
        courses = {
            getById: (params : string) => 
                httpclient.get(API_END_POINTS.student.courses.getById.replace(":id",params))
        }

}

export default new Client();
