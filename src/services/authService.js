import api from "../lib/api.js";

export const registerUser = (name, email, password) =>
  api("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

export const loginUser = (email, password) =>
  api("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const getMe = () => api("/auth/me");

export const updateMe = (data) =>
  api("/auth/me", {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const getPreferences = () => api("/auth/preferences");

export const updatePreferences = (data) =>
  api("/auth/preferences", {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const exportData = () => api("/auth/export");

export const resetWorkspace = () =>
  api("/auth/reset", { method: "DELETE" });

export const deleteAccount = () =>
  api("/auth/account", { method: "DELETE" });