"use client";
import useMe from "@/hooks/user/useMe";
import { redirect, useRouter } from "next/navigation";
import { PageLoader } from "../ui";

export default function RoleGuard({ children, allowedRole }) {
  const { data: userData, isLoading } = useMe();
  const homeRoute = {
    user: "/dashboard",
    restaurant: "/restaurant/dashboard",
  };
  if (isLoading) return <PageLoader />;
  if (!userData) {
    redirect("/login");
    return;
  }
  // if role not same then redirect him to their correct location
  if (allowedRole !== userData?.role) {
    redirect(homeRoute[userData.role] ?? "/login");
    return;
  }

  return children;
}
