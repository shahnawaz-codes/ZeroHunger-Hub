import { foodService } from "@/modules/food/food.service";
import { useQuery } from "@tanstack/react-query";

/// for accessing id we have to pass id in hook and then add it in queryFn and queryKey
const useFood = (id) => {
  return useQuery({
    queryKey: ["food", id],
    queryFn: () => foodService.getFoodById(id),
  });
};

export default useFood;
