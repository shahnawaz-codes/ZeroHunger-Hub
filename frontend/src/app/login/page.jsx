"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema } from "@/lib/validations";
import { Button, Input, showToast } from "@/components/ui";
import { AuthCard } from "@/components/AuthCard";
export const dynamic = "force-dynamic";
function LoginContent() {
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values) => {
    try {
      await login(values.email, values.password, redirect);
    } catch (err) {
      showToast.error(err?.message || "Login failed.");
    }
  };

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to your account"
      footerText="Don't have an account?"
      footerLinkLabel="Create one"
      footerLinkHref="/register"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <Button type="submit" fullWidth isLoading={isSubmitting}>
          Sign In
        </Button>
      </form>
    </AuthCard>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
