import { restaurantService } from "@/modules/restaurant/restaurant.service";
import { useQuery } from "@tanstack/react-query";

const useMyRestaurant = () => {
  return useQuery({
    queryKey: ["my-restaurant"],
    queryFn: () => restaurantService.myRestaurant(),
  });
};

export default useMyRestaurant;
