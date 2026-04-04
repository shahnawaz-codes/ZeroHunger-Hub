import api from "@/lib/axios";

export const userService = {
  async getMe() {
    const { data } = await api.get("/users/me");
    return data.data;
  },
};
