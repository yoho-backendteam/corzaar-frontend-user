import Client from '../../../api/index';





export const getQueryService = async () => {
    const response = await Client.QueryService.getQueries();
    try {
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("Error in getallqueries:", error);
        return null;
    }

};