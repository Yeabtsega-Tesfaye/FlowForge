import { motion } from "framer-motion";

import { Link } from "react-router-dom";

import { ArrowRight, Sparkles, CheckCircle2, BarChart3 } from "lucide-react";

import Button from "../components/ui/Button";

function Landing() {
  return (
    <div className="relative">
      {/* Navbar */}
      <header
        className="
          mx-auto flex
          max-w-7xl items-center
          justify-between

          px-6 py-6
          lg:px-10
        "
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="12" fill="url(#landingLogoGrad)" />
            <defs>
              <linearGradient
                id="landingLogoGrad"
                x1="0"
                y1="0"
                x2="48"
                y2="48"
              >
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
            <rect x="13" y="12" width="4" height="24" rx="2" fill="white" />
            <rect x="13" y="12" width="16" height="4" rx="2" fill="white" />
            <rect x="13" y="21" width="12" height="4" rx="2" fill="white" />
            <rect
              x="27"
              y="28"
              width="10"
              height="4"
              rx="2"
              fill="white"
              transform="rotate(-38 27 28)"
            />
            <rect
              x="30"
              y="30"
              width="4"
              height="4"
              rx="2"
              fill="white"
              opacity="0.6"
            />
          </svg>

          <div>
            <h1 className="text-lg font-semibold tracking-tight text-gradient">
              FlowForge
            </h1>
            <p className="text-xs text-zinc-500">AI Productivity Platform</p>
          </div>
        </div>
        {/* Nav Actions */}
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>

          <Link to="/signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section
        className="
          mx-auto flex
          min-h-[85vh]
          max-w-7xl
          flex-col items-center
          justify-center

          px-6 pb-20 pt-10

          text-center
        "
      >
        {/* Badge */}
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className="
            inline-flex items-center gap-2

            rounded-full
            border border-white/10

            bg-white/[0.03]

            px-4 py-2

            text-sm text-zinc-300

            backdrop-blur-xl
          "
        >
          <span
            className="
              h-2 w-2 rounded-full
              bg-emerald-400
            "
          />
          Modern workflow management
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.08,
            duration: 0.4,
          }}
          className="
            mt-10

            max-w-5xl

            text-5xl
            font-semibold
            leading-[1.05]
            tracking-tight

            sm:text-6xl
            lg:text-7xl
          "
        >
          Build momentum.
          <br />
          <span
            className="
              bg-gradient-to-r
              from-blue-400
              via-white
              to-purple-400

              bg-clip-text
              text-transparent
            "
          >
            Stay in flow.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.15,
          }}
          className="
            mx-auto mt-8

            max-w-2xl

            text-lg leading-8
            text-zinc-400
          "
        >
          FlowForge helps teams and freelancers manage tasks, track
          productivity, and use AI tools to accelerate modern work.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.22,
          }}
          className="
            mt-10 flex
            flex-col gap-4

            sm:flex-row
          "
        >
          <Link to="/signup">
            <Button size="lg" icon={ArrowRight}>
              Start Building
            </Button>
          </Link>

          <Button variant="secondary" size="lg">
            Explore Features
          </Button>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
          }}
          className="
            relative mt-20

            w-full max-w-6xl

            overflow-hidden

            rounded-[2rem]

            border border-white/10

            bg-white/[0.03]

            p-4

            shadow-2xl
            shadow-black/20

            backdrop-blur-2xl
          "
        >
          {/* Glow */}
          <div
            className="
              absolute inset-0

              bg-gradient-to-br
              from-blue-500/[0.06]
              to-purple-500/[0.06]
            "
          />
{/* Fake Dashboard */}
<div
  className="
    relative rounded-[1.5rem]
    border border-white/5
    bg-zinc-950
    p-8
  "
>
  <div className="grid gap-4 md:grid-cols-3">

    {/* Card 1 — Tasks */}
    <div className="rounded-2xl border border-emerald-500/10 bg-white/[0.03] p-6">
      <div className="flex items-center gap-2">
        <CheckCircle2 size={12} className="text-emerald-400" />
        <div className="h-3 w-16 rounded-full bg-zinc-800" />
      </div>
      <div className="mt-6 h-10 w-28 rounded-xl bg-gradient-to-r from-emerald-500/25 to-emerald-500/5" />
    </div>

    {/* Card 2 — AI */}
    <div className="rounded-2xl border border-blue-500/10 bg-white/[0.03] p-6">
      <div className="flex items-center gap-2">
        <Sparkles size={12} className="text-blue-400" />
        <div className="h-3 w-16 rounded-full bg-zinc-800" />
      </div>
      <div className="mt-6 h-10 w-32 rounded-xl bg-gradient-to-r from-blue-500/30 to-purple-500/30" />
    </div>

    {/* Card 3 — Analytics */}
    <div className="rounded-2xl border border-purple-500/10 bg-white/[0.03] p-6">
      <div className="flex items-center gap-2">
        <BarChart3 size={12} className="text-purple-400" />
        <div className="h-3 w-16 rounded-full bg-zinc-800" />
      </div>
      <div className="mt-6 h-10 w-24 rounded-xl bg-gradient-to-r from-purple-500/30 to-purple-500/5" />
    </div>

  </div>
</div>
        </motion.div>
      </section>
    </div>
  );
}

export default Landing;
