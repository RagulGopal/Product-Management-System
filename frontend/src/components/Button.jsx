import Spinner from "./Spinner";

export default function Button({
  children,
  variant = "primary",
  loading = false,
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30",
    secondary:
      "bg-navy-700 hover:bg-navy-600 text-navy-200 border border-navy-600",
    danger:
      "bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-600/30 hover:border-red-500/50",
    ghost:
      "bg-transparent hover:bg-navy-800 text-navy-300 hover:text-navy-100",
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium
        transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
        active:scale-[0.98] ${variants[variant]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  );
}
