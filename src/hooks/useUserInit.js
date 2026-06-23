import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { getMe } from "../services/authService";

export function useUserInit() {
  const token   = useAuthStore((s) => s.token);
  const user    = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    if (!token || user) return;
    getMe().then(setUser).catch(console.error);
  }, [token, user, setUser]);
}