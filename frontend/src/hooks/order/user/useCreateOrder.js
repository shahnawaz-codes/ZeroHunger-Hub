import { orderService } from "@/modules/order/order.service";
import { useMutation } from "@tanstack/react-query";

const  useCreateOrder = () => {
  return useMutation({
    mutationFn: (data) => orderService.createOrder(data),
  });
};
 
export default useCreateOrder