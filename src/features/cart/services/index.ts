import Client from "../../../api/index";

export const getStudentCart = async () => {
  const response = await Client.StudentCart.getAll();
  return response;
};

export const cartdeleteservices = async (courseId: string) => {
  const response = await Client.StudentCart.delete(courseId);
  return response;
};

export const AddtoCartService = async (params: string, batchId?: string) => {
  const response = await Client.StudentCart.addtocart(params, batchId)
  return response.data
}

export const PlaceOrderService = async (cartId: string) => {
  const response = await Client.CourseBuying({ cartId })
  return response?.data
}
