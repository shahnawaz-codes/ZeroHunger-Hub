import { orderService } from "@/modules/order/order.service";
import { useQuery } from "@tanstack/react-query";

export default useMyOrder = () => {
  return useQuery({
    queryKey: ["my-order"],
    queryFn: (orderId) => orderService.orderById(orderId),
  });
};
