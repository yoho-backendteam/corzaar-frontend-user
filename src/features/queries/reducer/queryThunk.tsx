import type { AppDispatch } from "../../../store/store";
import { getQueryService } from "../services";
import { getQueryData } from "./querySlice";

export const getQueryThunk = () => async (dispatch: AppDispatch) => {
  try {
    const response = await getQueryService();
    if (response) {
      dispatch(getQueryData(response?.data));
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};
