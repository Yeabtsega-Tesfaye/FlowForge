import { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { getMe, updateMe } from "../../services/authService";
import { useAuthStore } from "../../store/authStore";
import { useNotificationStore } from "../../store/notificationStore";

function ProfileSection() {
  const { user, setUser } = useAuthStore();
  const addNotification   = useNotificationStore((s) => s.addNotification);

  const [form, setForm]         = useState({
    firstName: "",
    lastName:  "",
    email:     "",
    bio:       "",
    role:      "",
  });
  const [original, setOriginal] = useState(null);
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);
  const [fetching, setFetching] = useState(true);

  const loadProfile = () => {
    setFetching(true);
    getMe()
      .then((data) => {
        const parts = (data.name ?? "").split(" ");
        const loaded = {
          firstName: parts[0]               ?? "",
          lastName:  parts.slice(1).join(" ") ?? "",
          email:     data.email             ?? "",
          bio:       data.bio               ?? "",
          role:      data.role              ?? "",
        };
        setForm(loaded);
        setOriginal(loaded);
      })
      .catch(console.error)
      .finally(() => setFetching(false));
  };

  useEffect(() => { loadProfile(); }, []);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear error on change
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // Track if anything actually changed
  const isDirty = original
    ? Object.keys(form).some((k) => form[k] !== original[k])
    : false;

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required";
    if (!form.email.trim())     errs.email     = "Email is required";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Enter a valid email address";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async () => {
    if (!isDirty) return;
    if (!validate()) return;

    setLoading(true);
    try {
      const updated = await updateMe({
        name:  `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        bio:   form.bio,
        role:  form.role,
      });

      // Update auth store with new user data
      setUser({ ...user, name: updated.name, email: updated.email, bio: updated.bio });

      // Update original so dirty state resets
      const parts = (updated.name ?? "").split(" ");
      const refreshed = {
        firstName: parts[0]               ?? "",
        lastName:  parts.slice(1).join(" ") ?? "",
        email:     updated.email          ?? "",
        bio:       updated.bio            ?? "",
        role:      updated.role           ?? "",
      };
      setOriginal(refreshed);
      setForm(refreshed);

      addNotification({
        title:   "Profile updated",
        message: "Your profile changes have been saved.",
        type:    "success",
      });
    } catch (err) {
      addNotification({
        title:   "Error",
        message: err.message,
        type:    "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDiscard = () => {
    if (original) {
      setForm(original);
      setErrors({});
    }
  };

  if (fetching) {
    return <div className="text-sm text-zinc-500">Loading profile...</div>;
  }

  const initials = `${form.firstName?.[0] ?? ""}${form.lastName?.[0] ?? ""}`.toUpperCase() || "Y";

  return (
    <div className="space-y-4">
      {/* Avatar */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-zinc-600">
          Avatar
        </p>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="
              flex h-14 w-14 items-center justify-center rounded-2xl
              bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600
              text-lg font-semibold text-white shadow-lg shadow-blue-500/20
            ">
              {initials}
            </div>
            <button className="
              absolute -bottom-1 -right-1
              flex h-6 w-6 items-center justify-center
              rounded-full border border-white/10
              bg-zinc-900 text-zinc-400 transition hover:text-white
            ">
              <Camera size={11} />
            </button>
          </div>
          <div>
            <p className="text-sm font-medium text-white">
              {form.firstName} {form.lastName}
            </p>
            <p className="mt-0.5 text-xs text-zinc-500">{form.email}</p>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-zinc-600">
          Personal info
        </p>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="First name"
              value={form.firstName}
              onChange={handleChange("firstName")}
              error={errors.firstName}
            />
            <Input
              label="Last name"
              value={form.lastName}
              onChange={handleChange("lastName")}
            />
          </div>
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            error={errors.email}
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium tracking-tight text-zinc-300">
              Bio
            </label>
            <textarea
              rows={3}
              value={form.bio}
              onChange={handleChange("bio")}
              className="
                w-full resize-none rounded-2xl border border-white/5
                bg-white/[0.03] px-4 py-3.5 text-sm text-white
                outline-none backdrop-blur-xl transition-all duration-300
                placeholder:text-zinc-500 hover:border-white/10
                focus:border-blue-500/20 focus:bg-white/[0.05]
              "
            />
          </div>
          <Input
            label="Role"
            value={form.role}
            onChange={handleChange("role")}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          variant="secondary"
          onClick={handleDiscard}
          disabled={!isDirty}
        >
          Discard
        </Button>
        <Button
          variant="primary"
          loading={loading}
          onClick={handleSave}
          disabled={!isDirty || loading}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
}

export default ProfileSection;