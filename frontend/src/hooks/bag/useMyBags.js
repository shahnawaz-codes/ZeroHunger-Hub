import { bagService } from "@/modules/bag/bag.service";
import { useQuery } from "@tanstack/react-query";

const useMybags = () => {
  return useQuery({
    queryKey: ["my-bag"],
    queryFn: () => bagService.getMybags(),
  });
};

export default useMybags;
