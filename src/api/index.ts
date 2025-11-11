import { API_END_POINTS } from "./endpoints";
import httpclients from "./httpclients";

class Client {
  StudentCart = {
    getAll: (params: { userId: string }) => httpclients.get(API_END_POINTS.Cart.getAll, params),
     delete: (courseId: string, userId: string) =>httpclients.delete( API_END_POINTS.Cart.deleteone.replace(':id', courseId),{ data: { userId } }
      ),
  };
}

export default new Client();
