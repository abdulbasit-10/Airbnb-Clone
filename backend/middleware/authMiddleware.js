const jwt = require("jsonwebtoken");
const JWT_SECRET = "your-secret-key"; // move to .env for production
 
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Authorization: Bearer <token>
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // contains user id
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { authMiddleware };