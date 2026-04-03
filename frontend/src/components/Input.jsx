export default function Input({
  label,
  id,
  type = "text",
  error,
  ...props
}) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-navy-300"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`w-full px-4 py-3 bg-navy-800/60 border rounded-xl text-navy-100 placeholder-navy-500
          transition-all duration-200 outline-none
          ${
            error
              ? "border-danger focus:ring-2 focus:ring-danger/30 focus:border-danger"
              : "border-navy-700 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
          }`}
        {...props}
      />
      {error && (
        <p className="text-sm text-danger flex items-center gap-1 animate-slide-down">
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
