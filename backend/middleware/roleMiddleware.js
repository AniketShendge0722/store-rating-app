const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user.role;

      // role check
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          message: "Access Forbidden",
        });
      }

      next();
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  };
};

module.exports = authorizeRole;