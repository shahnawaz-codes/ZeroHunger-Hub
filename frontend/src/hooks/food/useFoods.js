import { bagService } from "@/modules/bag/bag.service";
import { useQuery } from "@tanstack/react-query";

const usebags = () => {
  return useQuery({
    queryKey: ["bags"],
    queryFn: () => bagService.getAllbags(),
  });
};

export default usebags;
