import api from "@/lib/axios";
import { handleResponse } from "@/utils/handleApiRes";

export const authService = {
  async login(payload) {
    const res = await api.post("/auth/login", payload);
    return handleResponse(res);
  },

  async register(payload) {
    const res = await api.post("/auth/register", payload);
    return handleResponse(res);
  },

  async logout() {
    const res = await api.post("/auth/logout");
    return handleResponse(res);
  },

  async verifyEmail(otp, email) {
    const res = await api.post("/auth/verify-email", { otp, email });
    return handleResponse(res);
  },

  async resendOtp(email) {
    const res = await api.post("/auth/resend-otp", { email });
    return handleResponse(res);
  },
};
