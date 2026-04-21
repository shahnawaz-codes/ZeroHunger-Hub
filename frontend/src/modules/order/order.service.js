import api from "@/lib/axios";
import { handleResponse } from "@/utils/handleAPiRes";

export const orderService = {
  // private (user)
  createOrder: async (data) => {
    const res = await api.post("/orders", data);
    return handleResponse(res);
  },
  myAllOrders: async () => {
    const res = await api.get("/orders/my");
    return handleResponse(res);
  },
  orderById: async (orderId) => {
    const res = await api.get(`/orders${orderId}`);
    return handleResponse(res);
  },
  cancelOrder: async (orderId) => {
    const res = await api.patch(`/orders${orderId}/cancel`);
    return handleResponse(res);
  },
  // -----------------private (restaurant)------------------
  myRestuarantOrders: async () => {
    const res = await api.get(`/restaurants/orders`);
    return handleResponse(res);
  },
  cancelOrderByrestaurant: async (orderId) => {
    const res = await api.patch(`/restaurants/orders${orderId}/cancel`);
    return handleResponse(res);
  },
  confirmOrder: async (orderId) => {
    const res = await api.patch(`/restaurants/orders${orderId}/confirm`);
    return handleResponse(res);
  },
  readyOrder: async (orderId) => {
    const res = await api.patch(`/restaurants/orders${orderId}/ready`);
    return handleResponse(res);
  },
  completeOrder: async (orderId) => {
    const res = api.patch(`/restaurants/orders${orderId}/complete`);
    return handleResponse(res);
  },
};
