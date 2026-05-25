const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // token missing
    if (!authHeader) {
      return res.status(401).json({
        message: "Access Denied. No Token Provided",
      });
    }

    // Bearer token
    const token = authHeader.split(" ")[1];

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = verifyToken;