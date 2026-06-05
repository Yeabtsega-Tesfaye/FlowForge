import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function Login() {
  return (
    <div
      className="
        flex min-h-screen
        items-center justify-center
        px-6 py-12
      "
    >
      <Card className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            Welcome Back
          </h1>

          <p className="mt-2 text-zinc-400">
            Sign in to continue to FlowForge.
          </p>
        </div>

        <form className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            icon={Mail}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            icon={Lock}
          />

          <Button className="w-full">
            Sign In
          </Button>
        </form>

        <p
          className="
            mt-6 text-center
            text-sm text-zinc-400
          "
        >
          Don&apos;t have an account?{" "}

          <Link
            to="/signup"
            className="
              text-blue-400 transition
              hover:text-blue-300
            "
          >
            Create account
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default Login;