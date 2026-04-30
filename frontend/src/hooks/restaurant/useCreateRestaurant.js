import { restaurantService } from "@/modules/restaurant/restaurant.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateRestaurant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => restaurantService.createRestaurant(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["my-restaurant"]);
    },
  });
};

export default useCreateRestaurant;
