import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.sendStatus(403);
  }

  const token = authHeader.split(" ")[1];
  console.log("Token:", token);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error("JWT verify error:", err);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

export default authenticateJWT;
