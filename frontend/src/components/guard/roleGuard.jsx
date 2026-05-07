"use client";
import { useEffect } from "react";
import useMe from "@/hooks/user/useMe";
import { useRouter } from "next/navigation";
import { PageLoader } from "../ui";

export default function RoleGuard({ children, allowedRole }) {
  const router = useRouter();
  const { data: userData, isLoading } = useMe();
  const homeRoute = {
    user: "/dashboard",
    restaurant: "/restaurant/dashboard",
  };

  useEffect(() => {
    if (!isLoading) {
      if (!userData) {
        router.push("/login");
        return;
      }
      // if role not same then redirect him to their correct location
      if (allowedRole !== userData?.role) {
        router.push(homeRoute[userData.role] ?? "/login");
      }
    }
  }, [userData, isLoading, allowedRole, router, homeRoute]);

  if (isLoading) return <PageLoader />;
  if (!userData) return null;
  if (allowedRole !== userData?.role) return null;

  return children;
}
