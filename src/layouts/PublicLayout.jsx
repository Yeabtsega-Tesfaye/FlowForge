import { Outlet } from "react-router-dom";

function PublicLayout() {
  return (
    <div
      className="
        relative min-h-screen
        overflow-hidden

        bg-zinc-950
        text-zinc-100
      "
    >
      {/* Ambient Background */}
      <div
        className="
          pointer-events-none absolute
          inset-0 overflow-hidden
        "
      >
        {/* Blue Orb */}
        <div
          className="
            absolute

            left-[-10%]
            top-[-10%]

            h-[40rem]
            w-[40rem]

            rounded-full

            bg-blue-500/[0.06]

            blur-[140px]
          "
        />

        {/* Purple Orb */}
        <div
          className="
            absolute

            right-[-10%]
            top-[20%]

            h-[36rem]
            w-[36rem]

            rounded-full

            bg-purple-500/[0.06]

            blur-[140px]
          "
        />

        {/* Grid Overlay */}
        <div
          className="
            absolute inset-0

            bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]

            bg-[size:80px_80px]

            [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]
          "
        />
      </div>

      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
}

export default PublicLayout;