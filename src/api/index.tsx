import httpclients from "../api/httpclients";
import { API_END_POINTS } from "./endpoints";



class Client {

   
        user_home = {
            getall: () => httpclients.get(API_END_POINTS.user_home.getalloffers),
            getallcourses: () => httpclients.get(API_END_POINTS.user_home.getallcourses),
            gettrendingcourses: () => httpclients.get(API_END_POINTS.user_home.gettrendingcourses),
            getallinstitutes: () => httpclients.get(API_END_POINTS.user_home.getallinstitutes),
            getcategories:() => httpclients.get(API_END_POINTS.user_home.getcategories),
            addtokart: () => httpclients.post(API_END_POINTS.user_home.addtokart, {})

            
        }

         offer = {
            getalloffers: () => httpclients.get(API_END_POINTS.offer.getalloffers),
            getofferbyid: (id: string) => httpclients.get(API_END_POINTS.offer.getofferbyid.replace(":id",id)),
    
}

}

export default new Client();