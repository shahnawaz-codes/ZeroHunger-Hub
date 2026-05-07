import { forwardRef } from "react";
import { Loader2 } from "./Loader";

const variantClasses = {
  primary:
    "bg-brand-green-500 text-white hover:bg-brand-green-600 focus:ring-brand-green-500 disabled:opacity-50",

  secondary:
    "bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50 focus:ring-neutral-300 disabled:opacity-50",

  ghost:
    "text-neutral-600 hover:bg-neutral-100 focus:ring-neutral-300 disabled:opacity-50",

  danger:
    "bg-feedback-error text-white hover:opacity-90 focus:ring-feedback-error disabled:opacity-50",
};
const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export const Button = forwardRef(function Button(
  {
    variant = "primary",
    size = "md",
    isLoading = false,
    fullWidth = false,
    disabled,
    children,
    className = "",
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium",
        "transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        variantClasses[variant] || variantClasses.primary,
        sizeClasses[size] || sizeClasses.md,
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
});
