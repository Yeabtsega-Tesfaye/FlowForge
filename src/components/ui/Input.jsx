function Input({
  label,
  icon: Icon,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label
          className="
            block text-sm font-medium
            text-zinc-300
          "
        >
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className="
              absolute left-3 top-1/2
              -translate-y-1/2
              text-zinc-500
            "
          />
        )}

        <input
          className={`
            w-full rounded-xl
            border bg-zinc-900
            px-4 py-3 text-sm
            text-white outline-none
            transition-all duration-200

            placeholder:text-zinc-500

            ${
              error
                ? "border-red-500/50"
                : "border-zinc-800 focus:border-blue-500/50"
            }

            ${Icon ? "pl-10" : ""}

            ${className}
          `}
          {...props}
        />
      </div>

      {error && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;