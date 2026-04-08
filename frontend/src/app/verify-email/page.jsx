"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { Button, Input, showToast } from "@/components/ui";
import { AuthCard } from "@/components/AuthCard";

export const dynamic = "force-dynamic";

const verifySchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must be numeric"),
});

function VerifyContent() {
  const { verifyEmail, resendOtp } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [canResend, setCanResend] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting },
  } = useForm({
    resolver: zodResolver(verifySchema),
  });

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const onSubmit = async (values) => {
    if (!email) {
      showToast.error("Email not found. Please try registering again.");
      return;
    }
    try {
      await verifyEmail(values.otp, email, redirect);
      showToast.success("Email verified successfully!");
    } catch (err) {
      // Error already shown in hook
    }
  };

  const handleResend = async () => {
    if (!email) {
      showToast.error("Email not found.");
      return;
    }
    setIsResending(true);
    try {
      await resendOtp(email);
      setTimer(300);
      setCanResend(false);
    } catch (err) {
      // Error already shown
    } finally {
      setIsResending(false);
    }
  };

  if (!email) {
    return (
      <AuthCard
        title="Error"
        subtitle="No email provided. Please register first."
        footerText="Go to"
        footerLinkLabel="Register"
        footerLinkHref="/register"
      />
    );
  }

  return (
    <AuthCard
      title="Verify Your Email"
      subtitle={`Enter the 6-digit code sent to ${email}`}
      footerText="Wrong email?"
      footerLinkLabel="Register again"
      footerLinkHref="/register"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <Input
          label="Verification Code"
          type="text"
          placeholder="123456"
          maxLength={6}
          error={errors.otp?.message}
          {...register("otp")}
        />
        <Button type="submit" fullWidth isLoading={isSubmitting}>
          Verify Email
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Didn't receive the code?{" "}
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="text-blue-600 hover:text-blue-500 font-medium disabled:opacity-50"
            >
              {isResending ? "Resending..." : "Resend Code"}
            </button>
          ) : (
            <span className="text-gray-500">Resend in {formatTime(timer)}</span>
          )}
        </p>
      </div>
    </AuthCard>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
}
