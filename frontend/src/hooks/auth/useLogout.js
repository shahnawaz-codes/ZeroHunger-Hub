import { authService } from "@/modules/auth/auth.service";
import { useMutation } from "@tanstack/react-query";

const useLogout = () => {
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      toast.success("Logout successful!");
    },
  });
};

export default useLogout;
