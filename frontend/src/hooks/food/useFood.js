import { bagService } from "@/modules/bag/bag.service";
import { useQuery } from "@tanstack/react-query";

/// for accessing id we have to pass id in hook and then add it in queryFn and queryKey
const usebag = (id) => {
  return useQuery({
    queryKey: ["bag", id],
    queryFn: () => bagService.getbagById(id),
  });
};

export default usebag;
