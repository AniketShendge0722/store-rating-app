const express = require("express");

const router = express.Router();

const {
  signup,
  login,
  getUsers,
} = require("../controllers/authController");

const verifyToken = require("../middleware/authMiddleware");

const authorizeRole = require("../middleware/roleMiddleware");

router.post("/signup", signup);

router.post("/login", login);

router.get(
  "/users",
  verifyToken,
  authorizeRole("ADMIN"),
  getUsers
);

module.exports = router;