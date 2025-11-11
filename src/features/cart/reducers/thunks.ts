import type { AppDispatch } from "../../../store/store";
import { cartdeleteservices, getStudentCart } from "../services";
import { getcart } from "./cartslice";


export const getStudentCartThunks = (userId:string) => async (dispatch: AppDispatch) => {
  try {
    const response = await getStudentCart(userId);
    console.log("Thunk Response:", response?.data);
    dispatch(getcart(response?.data?.data));
    return response?.data?.data;
  } catch (error) {
    console.error("Error in getStudentCartThunks:", error);
  }
};

export const cartdeletethunks = (courseId: string, userId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await cartdeleteservices(courseId, userId);
    console.log("Deleted successfully:", response);
    await dispatch(getStudentCartThunks(userId)); 
    return response;
  } catch (error) {
    console.error("Error in cartdeletethunks:", error);
  }
};
