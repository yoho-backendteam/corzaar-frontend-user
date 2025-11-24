import Client from "../../../api/index";

export const getStudentCart = async () => {
  const response = await Client.StudentCart.getAll();
  return response;
};

export const cartdeleteservices = async (courseId: string, userId: string) => {
  const response = await Client.StudentCart.delete(courseId, userId);
  return response;
};

export const AddtoCartService = async (params: string) => {
  const response = await Client.StudentCart.addtocart(params)
  return response.data
}

export const PlaceOrderService = async (cartId: string) => {
  const response = await Client.CourseBuying({ cartId })
  return response?.data
}
