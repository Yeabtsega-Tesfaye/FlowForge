import {
  Bell,
  Menu,
  Search,
} from "lucide-react";

function Topbar({ setSidebarOpen }) {
  return (
    <header
      className="
        sticky top-0 z-30
        flex h-16 items-center gap-4
        border-b border-zinc-800
        bg-zinc-950/80
        px-4 backdrop-blur-xl
        sm:px-6 lg:px-8
      "
    >
      {/* Mobile Menu */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="
          rounded-lg p-2 text-zinc-400
          transition hover:bg-zinc-800
          hover:text-white lg:hidden
        "
      >
        <Menu size={20} />
      </button>

      {/* Search */}
      <div className="relative hidden w-full max-w-md md:block">
        <Search
          size={18}
          className="
            absolute left-3 top-1/2
            -translate-y-1/2 text-zinc-500
          "
        />

        <input
          type="text"
          placeholder="Search..."
          className="
            w-full rounded-xl
            border border-zinc-800
            bg-zinc-900 py-2.5
            pl-10 pr-4 text-sm
            text-white outline-none
            transition

            placeholder:text-zinc-500

            focus:border-blue-500/50
            focus:ring-2
            focus:ring-blue-500/10
          "
        />
      </div>

      {/* Right Side */}
      <div className="ml-auto flex items-center gap-3">
        {/* Notifications */}
        <button
          className="
            relative rounded-xl p-2.5
            text-zinc-400 transition
            hover:bg-zinc-800
            hover:text-white
          "
        >
          <Bell size={18} />

          <span
            className="
              absolute right-2 top-2
              h-2 w-2 rounded-full
              bg-blue-500
            "
          />
        </button>

        {/* Avatar */}
        <div
          className="
            h-10 w-10 rounded-full
            bg-gradient-to-br
            from-blue-500 to-purple-600
          "
        />
      </div>
    </header>
  );
}

export default Topbar;