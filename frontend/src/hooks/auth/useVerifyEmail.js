import { authService } from "@/modules/auth/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const useVerifyEmail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ otp, email }) => authService.verifyEmail(otp, email),
    onSuccess: () => {
      queryClient.invalidateQueries(["me"]);
    },
  });
};
export default useVerifyEmail;
