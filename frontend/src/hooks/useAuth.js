"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authService } from "@/modules/auth/auth.service";
import { userService } from "@/modules/user/user.service";

export const useAuth = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // Fetch user data on mount to check if authenticated
  const fetchUser = useCallback(async () => {
    try {
      const user = await userService.getMe();
      setUserData(user);
    } catch (error) {
      console.log(error);
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  
  /**
   * Registers a new user and redirects to email verification page on success.
   */
  const register = useCallback(
    async (name, email, password) => {
      try {
        await authService.register(name, email, password);
        toast.success(
          "Registration successful! Check your email for verification code.",
        );
        setTimeout(() => {
          router.push(`/verify-email?email=${encodeURIComponent(email)}`);
        }, 1000);
      } catch (error) {
        toast.error(error.message || "Registration failed");
        throw error;
      }
    },
    [router],
  );

  const login = useCallback(
    async (email, password, redirect = "/dashboard") => {
      try {
        const response = await authService.login(email, password);
        if (!response.success) {
          if (
            response.message &&
            (response.message.includes("verify") ||
              response.message.includes("otp"))
          ) {
            router.push(
              `/verify-email?email=${encodeURIComponent(email)}&redirect=${encodeURIComponent(redirect)}`,
            );
            return;
          }
          throw new Error(response.message);
        }
        await fetchUser();
        router.push(redirect);
      } catch (error) {
        toast.error(error.message || "Login failed");
        throw error;
      }
    },
    [fetchUser, router],
  );

  const verifyEmail = useCallback(
    async (otp, email, redirect = "/dashboard") => {
      try {
        await authService.verifyEmail(otp, email);
        await fetchUser();
        router.push(redirect);
      } catch (error) {
        toast.error(error.message || "Verification failed");
        throw error;
      }
    },
    [fetchUser, router],
  );

  const resendOtp = useCallback(async (email) => {
    try {
      await authService.resendOtp(email);
      toast.success("OTP resent successfully");
    } catch (error) {
      toast.error(error.message || "Failed to resend OTP");
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      setUserData(null);
      router.push("/login");
    } catch (error) {
      toast.error(error.message || "Logout failed");
    }
  }, [router]);
  return {
    userData,
    login,
    logout,
    register,
    verifyEmail,
    resendOtp,
    isLoading,
    isAuthenticated: !!userData,
  };
};
