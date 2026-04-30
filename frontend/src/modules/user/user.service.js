import api from "@/lib/axios";
import { handleResponse } from "@/utils/handleApiRes";

export const userService = {
  async getMe() {
    const res = await api.get("/users/me");
    return handleResponse(res);
  },
};
