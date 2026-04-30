import { foodService } from "@/modules/food/food.service";
import { useQuery } from "@tanstack/react-query";

const useFood = () => {
  return useQuery({
    queryKey: ["food"],
    queryFn: (id) => foodService.getFoodById(id),
  });
};

export default useFood;
