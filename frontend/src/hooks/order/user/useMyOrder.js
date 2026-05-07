import { orderService } from "@/modules/order/order.service";
import { useQuery } from "@tanstack/react-query";

const useMyOrder = (orderId) => {
  return useQuery({
    queryKey: ["my-order", orderId],
    queryFn: () => orderService.orderById(orderId),
  });
};

export default useMyOrder;
