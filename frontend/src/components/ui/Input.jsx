import { forwardRef } from 'react';

export const Input = forwardRef(function Input(
  { label, error, hint, id, className = '', ...props },
  ref
) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

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
          'w-full rounded-lg border px-3 py-2 text-sm shadow-sm',
          'placeholder-gray-400 outline-none transition-colors',
          'focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
          error
            ? 'border-red-400 bg-red-50'
            : 'border-gray-300 bg-white hover:border-gray-400',
          className,
        ].join(' ')}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {!error && hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  );
});
