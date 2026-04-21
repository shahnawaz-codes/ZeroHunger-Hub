import api from "@/lib/axios";

export const foodService = {
  getAllFoods: async () => {
    const { data } = await api.get("/foods");
    return data.data;
  },
  getFoodById: async (id) => {
    const { data } = await api.get(`/foods/${id}`);
    return data.data;
  },
  createFood: async (foodData) => {
    const { data } = await api.post("/foods", foodData);
    return data.data;
  },
};
