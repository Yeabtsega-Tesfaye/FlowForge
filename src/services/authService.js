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