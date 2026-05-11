import { bagService } from "@/modules/bag/bag.service";
import { useQuery } from "@tanstack/react-query";

const useMybag = () => {
  return useQuery({
    queryKey: ["my-bag"],
    queryFn: () => bagService.getMybag(),
  });
};

export default useMybag;
