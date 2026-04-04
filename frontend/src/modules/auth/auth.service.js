import api from "@/lib/axios";

export const authService = {
  async login(email, password) {
    const { data } = await api.post("/auth/login", { email, password });
    return data.data;
  },

  async register(name, email, password) {
    const { data } = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    return data.data;
  },

  async logout() {
    const { data } = await api.post("/auth/logout");
    return data;
  },
};
