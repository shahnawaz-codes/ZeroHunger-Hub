import { orderService } from "@/modules/order/order.service";
import { useQuery } from "@tanstack/react-query";

const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => orderService.myAllOrders(),
  });
};

export default useOrders;
