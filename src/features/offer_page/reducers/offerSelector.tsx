import type { RootState } from "../../../store/store";



export const selectOfferData = (state: RootState) => state.offer.offersData;

export const selectOfferById = (state: RootState) => state.offer.offerbyidData;