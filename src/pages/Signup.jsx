import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
} from "lucide-react";

import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function Signup() {
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
            Create Account
          </h1>

          <p className="mt-2 text-zinc-400">
            Start organizing your workflow today.
          </p>
        </div>

        <form className="space-y-5">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your name"
            icon={User}
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            icon={Mail}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Create a password"
            icon={Lock}
          />

          <Button className="w-full">
            Create Account
          </Button>
        </form>

        <p
          className="
            mt-6 text-center
            text-sm text-zinc-400
          "
        >
          Already have an account?{" "}

          <Link
            to="/login"
            className="
              text-blue-400 transition
              hover:text-blue-300
            "
          >
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default Signup;