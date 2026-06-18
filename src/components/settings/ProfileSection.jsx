import { useState } from "react";
import { Camera } from "lucide-react";
import Input from "../ui/Input";
import Button from "../ui/Button";

function ProfileSection() {
  const [form, setForm] = useState({
    firstName: "Yeabtsega",
    lastName:  "Tesfaye",
    email:     "yeabtsega@flowforge.app",
    bio:       "Software Engineer · Building FlowForge",
    role:      "Software Engineer",
  });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="space-y-4">

      {/* Avatar */}
      <div className="
        rounded-2xl border border-white/[0.06]
        bg-white/[0.03] p-5
      ">
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-zinc-600">
          Avatar
        </p>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="
              flex h-14 w-14 items-center justify-center
              rounded-2xl
              bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600
              text-lg font-semibold text-white
              shadow-lg shadow-blue-500/20
            ">
              Y
            </div>
            <button className="
              absolute -bottom-1 -right-1
              flex h-6 w-6 items-center justify-center
              rounded-full border border-white/10
              bg-zinc-900 text-zinc-400
              transition hover:text-white
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
      <div className="
        rounded-2xl border border-white/[0.06]
        bg-white/[0.03] p-5
      ">
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-zinc-600">
          Personal info
        </p>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="First name"
              value={form.firstName}
              onChange={handleChange("firstName")}
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
                w-full resize-none rounded-2xl
                border border-white/5
                bg-white/[0.03] px-4 py-3.5
                text-sm text-white outline-none
                backdrop-blur-xl
                transition-all duration-300
                placeholder:text-zinc-500
                hover:border-white/10
                focus:border-blue-500/20
                focus:bg-white/[0.05]
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
        <Button variant="secondary">Discard</Button>
        <Button variant="primary">Save changes</Button>
      </div>
    </div>
  );
}

export default ProfileSection;