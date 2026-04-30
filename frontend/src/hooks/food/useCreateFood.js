import { useMutation, useQueryClient } from "@tanstack/react-query";
import { foodService } from "@/modules/food/food.service";

const useCreateFood = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => foodService.createFood(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["my-food"]);
    },
  });
};

export default useCreateFood;
