import type { AppDispatch } from "../../../store/store";
import { cartdeleteservices, getStudentCart } from "../services";
import { deletecart, getcart } from "./cartslice";


export const getStudentCartThunks = () => async (dispatch: AppDispatch) => {
  try {
    const response = await getStudentCart();
    console.log("Thunk Response:", response?.data);
    dispatch(getcart(response?.data?.data));
    return response?.data?.data;
  } catch (error) {
    console.error("Error in getStudentCartThunks:", error);
  }
};

export const cartdeletethunks = (courseId: string, userId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await cartdeleteservices(courseId);
    console.log("Deleted successfully:", response);
    await dispatch(deletecart(userId));
    return response;
  } catch (error) {
    console.error("Error in cartdeletethunks:", error);
  }
};
