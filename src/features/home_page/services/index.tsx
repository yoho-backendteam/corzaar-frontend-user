import Client from '../../../api/index2';


export const getOfferService = async () => {
    const response = await Client.user_home.getall();
    try {
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("Error in getalloffers:", error);
        return null;
    }

};


export const getCourseService = async () => {
    const response = await Client.user_home.getallcourses();
    try {
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("Error in getallcourse:", error);
        return null;
    }

};


export const getTrendingCourseService = async () => {
    const response = await Client.user_home.gettrendingcourses();
    try {
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("Error in getalltrendingcourse:", error);
        return null;
    }

};


export const getInstituteService = async () => {
    const response = await Client.user_home.getallinstitutes();
    try {
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("Error in getallinstitute:", error);
        return null;
    }

};


export const getCategoriesService = async () => {
    const response = await Client.user_home.getcategories();
    try {
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("Error in get categories:", error);
        return null;
    }

};


export const addtokartService = async () => {
    const response = await Client.user_home.addtokart();
    try {
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("Error in addtokart:", error);
        return null;
    }

};
