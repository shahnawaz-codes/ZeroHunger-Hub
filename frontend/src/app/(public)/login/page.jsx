"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations";
import { Button, Input, showToast } from "@/components/ui";
import { AuthCard } from "@/components/auth/AuthCard";
import useLogin from "@/hooks/auth/useLogin";
import { useRouter } from "next/navigation";
/**
 * Render the login page with a validated sign-in form inside an AuthCard.
 *
 * The form validates input using the `loginSchema` resolver, submits credentials
 * to the authentication service via `login(email, password)`, and displays an
 * error toast if authentication fails.
 *
 * @returns {JSX.Element} The login page component containing email and password inputs and a submit button.
 */
export default function LoginPage() {
  const { mutate, isPending } = useLogin();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (values) => {
    let payload = {
      email: values.email,
      password: values.password,
    };
    try {
      mutate(payload, {
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (err) => {
          if (
            err?.code == "EMAIL_NOT_VERIFIED" ||
            ere.response?.data?.message?.includes("verify")
          ) {
            sessionStorage.setItem("pendingVerification", values.email);
            router.push(
              `/verify-email?email=${encodeURIComponent(values.email)}&redirect=/dashboard`,
            );
          }
          showToast.error(
            err?.message || "Login failed. Please check your credentials.",
          );
        },
      });
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
        <Button
          type="submit"
          fullWidth
          isLoading={isPending}
          disabled={!isValid}
        >
          Sign In
        </Button>
      </form>
    </AuthCard>
  );
}
