import { userService } from "@/modules/user/user.service";
import { useQuery } from "@tanstack/react-query";

const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => userService.getMe(),
  });
};

export default useMe;
