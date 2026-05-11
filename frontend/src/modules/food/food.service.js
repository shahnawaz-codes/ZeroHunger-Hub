import api from "@/lib/axios";
import { handleResponse } from "@/utils/handleApiRes";

export const bagService = {
  //public
  getAllbags: async () => {
    const res = await api.get("/bags");
    return handleResponse(res);
  },
  getbagById: async (bagId) => {
    const res = await api.get(`/bags/${bagId}`);
    return handleResponse(res);
  },
  // private
  createbag: async (bagData) => {
    const res = await api.post("/restaurants/bags", bagData);
    return handleResponse(res);
  },
  getMybag: async () => {
    const res = await api.get("/restaurants/bags");
    return handleResponse(res);
  },
};
