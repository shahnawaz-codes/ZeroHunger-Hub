import { authService } from "@/modules/auth/auth.service";
import { useMutation } from "@tanstack/react-query";
import { showToast } from "@/components/ui";

const useLogout = () => {
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      showToast.success("Logout successful!");
    },
  });
};

export default useLogout;
