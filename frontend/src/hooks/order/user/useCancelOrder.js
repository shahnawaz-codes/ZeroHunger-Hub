import { orderService } from "@/modules/order/order.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default useCancelOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (orderId) => orderService.cancelOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries(["my-order"]);
    },
  });
};
