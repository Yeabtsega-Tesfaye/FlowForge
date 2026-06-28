import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    console.log(
  jwt.verify(token, "7f9c3e1a8b4d6f2e9a1c5b7d3e8f0a6c")
);
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};