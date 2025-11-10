import Client from '../../../api/index2';


export const getOfferService = async () => {
    const response = await Client.offer.getalloffers();
    try {
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("Error in getalloffers:", error);
        return null;
    }

};



export const offerByIdService = async (id: string) => {
    const response = await Client.offer.getofferbyid(id);
    try {
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("Error in getalloffersbyid:", error);
        return null;
    }

};

