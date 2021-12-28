const jwt = require("jsonwebtoken");
const config = require("config");

const auth = (req, res, next) => {
  if (req.method === "OPTIONS") return next();
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "No authorization",
      });
    }
    req.user = jwt.verify(token, config.get("jwtSecret"));
    next();
  } catch (e) {
    res.status(401).json({ message: "No authorization" });
  }
};

module.exports = auth;
