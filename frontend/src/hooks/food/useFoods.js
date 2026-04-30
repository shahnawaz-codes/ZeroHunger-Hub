import { foodService } from "@/modules/food/food.service";
import { useQuery } from "@tanstack/react-query";

const useFoods = () => {
  return useQuery({
    queryKey: ["foods"],
    queryFn: () => foodService.getFoods(),
  });
};

export default useFoods;
