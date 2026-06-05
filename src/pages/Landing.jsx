import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Button from "../components/ui/Button";

function Landing() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Glow */}
      <div
        className="
          absolute left-1/2 top-0
          h-[500px] w-[500px]
          -translate-x-1/2
          rounded-full bg-blue-500/10
          blur-3xl
        "
      />

      {/* Navbar */}
      <header
        className="
          relative z-10 flex items-center
          justify-between px-6 py-6
          lg:px-12
        "
      >
        <h1 className="text-2xl font-bold">
          FlowForge
        </h1>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost">
              Login
            </Button>
          </Link>

          <Link to="/signup">
            <Button>
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section
        className="
          relative z-10 mx-auto
          flex min-h-[80vh]
          max-w-7xl flex-col
          items-center justify-center
          px-6 text-center
        "
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="
            max-w-4xl text-5xl
            font-bold leading-tight
            tracking-tight
            sm:text-6xl
            lg:text-7xl
          "
        >
          Organize Your Work.
          <br />

          <span
            className="
              bg-gradient-to-r
              from-blue-400 to-purple-400
              bg-clip-text text-transparent
            "
          >
            Accelerate Productivity.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="
            mt-8 max-w-2xl
            text-lg leading-8
            text-zinc-400
          "
        >
          FlowForge helps freelancers and teams
          manage tasks, analyze productivity,
          and leverage AI-powered workflow tools.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="
            mt-10 flex flex-col gap-4
            sm:flex-row
          "
        >
          <Link to="/signup">
            <Button size="lg">
              Start Building
            </Button>
          </Link>

          <Button
            variant="secondary"
            size="lg"
          >
            Explore Features
          </Button>
        </motion.div>
      </section>
    </div>
  );
}

export default Landing;