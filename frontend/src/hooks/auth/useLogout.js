import { authService } from "@/modules/auth/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/components/ui";

const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      showToast.success("Logout successful!");
      queryClient.invalidateQueries(["me"]);
    },
  });
};

export default useLogout;
