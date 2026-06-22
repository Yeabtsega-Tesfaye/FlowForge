import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { registerUser } from "../services/authService";
import { useAuthStore } from "../store/authStore";

function Signup() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const [form, setForm]       = useState({ name: "", email: "", password: "" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { token, user } = await registerUser(
        form.name,
        form.email,
        form.password
      );
      setAuth(user, token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <Card className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="mt-2 text-zinc-400">
            Start organizing your workflow today.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your name"
            icon={User}
            value={form.name}
            onChange={handleChange("name")}
            required
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            icon={Mail}
            value={form.email}
            onChange={handleChange("email")}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Create a password"
            icon={Lock}
            value={form.password}
            onChange={handleChange("password")}
            required
          />

          {error && (
            <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
              {error}
            </p>
          )}

          <Button className="w-full" loading={loading} type="submit">
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 transition hover:text-blue-300">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default Signup;