import { authService } from "@/modules/auth/auth.service";
import { useMutation } from "@tanstack/react-query";

const useResendOTP = () => {
  return useMutation({
    mutationFn: (email) => authService.resendOtp(email),
    onSuccess: () => {
      toast.success("OTP resent successfully.");
    },
  });
};
export default useResendOTP;
