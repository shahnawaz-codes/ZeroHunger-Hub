import { foodService } from "@/modules/food/food.service";
import { useQuery } from "@tanstack/react-query";

const useMyFood = () => {
  return useQuery({
    queryKey: ["my-food"],
    queryFn: () => foodService.getMyFood(),
  });
};

export default useMyFood;
