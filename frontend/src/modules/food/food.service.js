import api from "@/lib/axios";
import { handleResponse } from "@/utils/handleAPiRes";

export const foodService = {
  //public
  getAllFoods: async () => {
    const res = await api.get("/foods");
    return handleResponse(res);
  },
  getFoodById: async (foodId) => {
    const res = await api.get(`/foods/${foodId}`);
    return handleResponse(res);
  },
  // private
  createFood: async (foodData) => {
    const res = await api.post("/restaurants/foods", foodData);
    return handleResponse(res);
  },
  getMyFood: async () => {
    const res = await api.get("/restaurants/foods");
    return handleResponse(res);
  },
};
