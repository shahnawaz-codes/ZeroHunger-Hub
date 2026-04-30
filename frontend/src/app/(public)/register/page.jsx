"use client";

import { useForm } from "react-hook-form";
// zod resolver for react-hook-form + zod schemas
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import { registerSchema } from "@/lib/validations";
import { Button, Input, showToast } from "@/components/ui";
import { AuthCard } from "@/components/AuthCard";
import toast from "react-hot-toast";
import useRegister from "@/hooks/auth/useRegister";
import { useRouter } from "next/navigation";

/**
 * Render the registration page containing a validated signup form.
 *
 * The form validates input against the `registerSchema`, displays field-level
 * validation errors, shows a loading state while submitting, and disables the
 * submit button until the form is valid. On submit, the component calls the
 * authentication `signup` function with the provided name, email, and password;
 * failures surface an error toast.
 *
 * @returns {JSX.Element} The registration page React element.
 */
export default function RegisterPage() {
  const { mutate: signup, error } = useRegister();
  const router = useRouter();
  const {
    register, // register function to track form inputs like name, email, password, confirmPassword
    handleSubmit, // function to handle form submission
    formState: { errors, isSubmitting, isValid }, // formState to track validation errors and submission state
  } = useForm({
    resolver: zodResolver(registerSchema), // use zod schema for validation
  });

  const onSubmit = (values) => {
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    signup(payload, {
      onSuccess: (data, variables) => {
        sessionStorage.setItem("pendingVerification", variables.email);
        setTimeout(() => {
          router.push(
            `/verify-email?email=${encodeURIComponent(variables.email)}`,
          );
        }, 1000);
        toast.success(
          "Registration successful! Please check your email for verification.",
        );
      },
    });
  };

  return (
    <AuthCard
      title="Create your account"
      subtitle="Get started for free"
      footerText="Already have an account?"
      footerLinkLabel="Sign in"
      footerLinkHref="/login"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <Input
          label="Full Name"
          type="text"
          placeholder="Jane Doe"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
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
          placeholder="Min. 6 characters"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Re-enter your password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <Button
          type="submit"
          fullWidth
          isLoading={isSubmitting}
          disabled={!isValid}
        >
          Create Account
        </Button>
      </form>
    </AuthCard>
  );
}
