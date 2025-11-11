import Client from "../../../api/index";

export const getStudentCart = async (userId:string) => {
  const response = await Client.StudentCart.getAll({ userId });
  console.log("response:", response);
  return response;
};

export const cartdeleteservices = async (courseId: string, userId: string) => {
  const response = await Client.StudentCart.delete(courseId, userId);
  console.log("cart delete:", response);
  return response;
};

