import { authService } from "@/modules/auth/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => authService.login(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["me"]);
    },
  });
};
export default useLogin;
