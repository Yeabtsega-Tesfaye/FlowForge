const BASE_URL = "http://localhost:5000/api";

const getToken = () => localStorage.getItem("flowforge-token");

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