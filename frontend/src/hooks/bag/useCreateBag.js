import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bagService } from "@/modules/bag/bag.service";

const useCreateBag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => bagService.createbag(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["my-bag"]);
    },
  });
};

export default useCreateBag;
