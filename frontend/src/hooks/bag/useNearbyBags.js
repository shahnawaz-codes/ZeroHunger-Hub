import { bagService } from "@/modules/bag/bag.service";
import { useQuery } from "@tanstack/react-query";

const useNearbyBags = ({ lng, lat, radius }) => {
  return useQuery({
    queryKey: ["bags", (lng, lat)],
    queryFn: () => bagService.getAllbags({ lng, lat, radius }),
    enabled: !!lng && !!lat, // Only fetch if lng and lat are available
  });
};

export default useNearbyBags;
