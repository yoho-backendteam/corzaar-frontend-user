import type { AppDispatch } from "../../../store/store";
import { getOfferService, offerByIdService } from "../services";
import { getOfferbyid, getOfferData } from "./offerSlice";


export const getOfferThunk = () => async (dispatch: AppDispatch) => {
  try {
    const response = await getOfferService();
    if (response) {
      dispatch(getOfferData(response?.data?.offers));
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};


export const OfferByIdThunk = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await offerByIdService(id);
    if (response) {
      dispatch(getOfferbyid(response?.data));
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};
