import api from "@/lib/axios";
import { handleResponse } from "@/utils/handleApiRes";

export const restaurantService = {
  async createRestaurant(data) {
    let res = await api.post("/restaurants", data);
    handleResponse(res);
  },
  async myRestaurant() {
    let res = await api.get("/restaurants/me");
    handleResponse(res);
  },
};
