import { authService } from "@/modules/auth/auth.service";
import { useMutation } from "@tanstack/react-query";

const useRegister = () => {
  return useMutation({
    mutationFn: (data) => authService.register(data),
  });
};
export default useRegister;
