import { orderService } from "@/modules/order/order.service";
import { useMutation } from "@tanstack/react-query";

export default useCreateOrder = () => {
  return useMutation({
    mutationFn: (data) => orderService.createOrder(data),
  });
};
