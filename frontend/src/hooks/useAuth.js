"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authService } from "@/modules/auth/auth.service";

export const useAuth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const redirect = searchParams.get("redirect") || "/dashboard";
  const fetchUser = useCallback(async () => {
    try {
      const { user } = await authService.getMe();
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

  const register = useCallback(
    async (email, name, password) => {
      try {
        await authService.register(email, name, password);
        await fetchUser();
        router.push(redirect);
      } catch (error) {
        toast.error(error.message || "Login failed");
      }
    },
    [fetchUser, router, redirect],
  );
  const login = useCallback(
    async (email, password) => {
      try {
        await authService.login(email, password);
        await fetchUser();
        router.push(redirect);
      } catch (error) {
        toast.error(error.message || "Login failed");
      }
    },
    [fetchUser, router, redirect],
  );
  const logout = useCallback(async () => {
    try {
      await authService.logout();
      setUserData(null);
      router.push("/login");
    } catch (error) {
      toast.error('error.message || "Login failed"');
    }
  }, [router]);
  return {
    userData,
    login,
    logout,
    register,
    isLoading,
    isAuthenticated: !!userData,
  };
};
