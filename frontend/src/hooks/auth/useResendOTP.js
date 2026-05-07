import { authService } from "@/modules/auth/auth.service";
import { useMutation } from "@tanstack/react-query";
import { showToast } from "@/components/ui";

const useResendOTP = () => {
  return useMutation({
    mutationFn: (email) => authService.resendOtp(email),
    onSuccess: () => {
      showToast.success("OTP resent successfully.");
    },
  });
};
export default useResendOTP;
