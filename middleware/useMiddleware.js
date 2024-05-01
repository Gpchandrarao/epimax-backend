const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Token missing" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Error verifying token: ", error);
    res.status(401).json({ error: "Unauthorized - Invalid Token" });
  }
};

module.exports = authMiddleware;
