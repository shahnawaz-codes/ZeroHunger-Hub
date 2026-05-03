import { forwardRef } from "react";

export const Input = forwardRef(function Input(
  { label, error, hint, id, className = "", ...props },
  ref,
) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={[
          "w-full rounded-lg border px-3 py-2 text-sm shadow-sm",
          "placeholder-neutral-400 outline-none transition-colors",
          "focus:border-brand-green-500 focus:ring-2 focus:ring-brand-green-500/20",
          error
            ? "border-feedback-error bg-feedback-error/10"
            : "border-neutral-200 bg-white hover:border-neutral-300",
          className,
        ].join(" ")}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-feedback-error">{error}</p>}
      {!error && hint && (
        <p className="mt-1 text-xs text-neutral-500">{hint}</p>
      )}
    </div>
  );
});
