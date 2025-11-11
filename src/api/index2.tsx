import httpclients from "./httpclients";
import { API_END_POINTS } from "./endpoints2";
import type { addtocartTypes } from "../userHomeTypes/types";



class Client {


    user_home = {
        getall: () => httpclients.get(API_END_POINTS.user_home.getalloffers),
        getallcourses: () => httpclients.get(API_END_POINTS.user_home.getallcourses),
        gettrendingcourses: () => httpclients.get(API_END_POINTS.user_home.gettrendingcourses),
        getallinstitutes: () => httpclients.get(API_END_POINTS.user_home.getallinstitutes),
        getcategories: () => httpclients.get(API_END_POINTS.user_home.getcategories),
        addtokart: (data:addtocartTypes) => httpclients.post(API_END_POINTS.user_home.addtokart, data)


    }

    offer = {
        getalloffers: () => httpclients.get(API_END_POINTS.offer.getalloffers),
        getofferbyid: (id: string) => httpclients.get(API_END_POINTS.offer.getofferbyid.replace(":id", id)),

    }

}

export default new Client();