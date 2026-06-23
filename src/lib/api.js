const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";
const getToken = () => {
  const state = JSON.parse(localStorage.getItem("flowforge-auth") ?? "{}");
  return state?.state?.token ?? null;
};

const api = async (endpoint, options = {}) => {
  const token = getToken();

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, config);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error ?? "Something went wrong");
  }

  return data;
};

export default api;