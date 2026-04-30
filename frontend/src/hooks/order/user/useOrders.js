import { orderService } from "@/modules/order/order.service";
import { useQuery } from "@tanstack/react-query";

export default useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => orderService.myAllOrders(),
  });
};
