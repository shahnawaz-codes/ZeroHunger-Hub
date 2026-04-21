import api from "@/lib/axios";
import { handleResponse } from "@/utils/handleAPiRes";

export const restaurantService = {
  async createRestaurant(name, address, cuisine) {
    let res = await api.post("/restaurants", { name, address, cuisine });
    handleResponse(res);
  },
  async myRestaurant() {
    let res = await api.get("/restaurants/me");
    handleResponse(res);
  },
};
