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
            block text-sm
            font-medium tracking-tight
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
              absolute left-4 top-1/2
              -translate-y-1/2

              text-zinc-500
            "
          />
        )}

        <input
          className={`
            w-full

            rounded-2xl

            border

            bg-white/[0.03]

            px-4 py-3.5

            text-sm text-white

            outline-none

            backdrop-blur-xl

            transition-all duration-300

            placeholder:text-zinc-500

            hover:border-white/10

            ${
              error
                ? `
                  border-red-500/30

                  focus:border-red-500/40
                `
                : `
                  border-white/5

                  focus:border-blue-500/20
                  focus:bg-white/[0.05]
                `
            }

            ${Icon ? "pl-11" : ""}

            ${className}
          `}
          {...props}
        />
      </div>

      {error && (
        <p
          className="
            text-sm tracking-tight
            text-red-400
          "
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;