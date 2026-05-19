import { bagService } from "@/modules/bag/bag.service";
import { useQuery } from "@tanstack/react-query";

/// for accessing id we have to pass id in hook and then add it in queryFn and queryKey
const useBag = (id) => {
  return useQuery({
    queryKey: ["bag", id],
    queryFn: () => bagService.getBagById(id),
  });
};

export default useBag;
