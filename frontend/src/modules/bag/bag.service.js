import api from "@/lib/axios";
import { handleResponse } from "@/utils/handleApiRes";

export const bagService = {
  //public
  getAllbags: async ({ lng, lat, radius }) => {
    const res = await api.get("/bags", {
      params: {
        lng,
        lat,
        radius,
      },
    });
    return handleResponse(res);
  },
  getBagById: async (bagId) => {
    const res = await api.get(`/bags/${bagId}`);
    return handleResponse(res);
  },
  // private
  createBag: async (bagData) => {
    const res = await api.post("/restaurants/bags", bagData);
    return handleResponse(res);
  },
  getMyBags: async () => {
    const res = await api.get("/restaurants/bags");
    return handleResponse(res);
  },
};
