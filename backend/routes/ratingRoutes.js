const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const authorizeRole = require("../middleware/roleMiddleware");

const {
  addRating,
  getRatings,
  deleteRating, 
} = require("../controllers/ratingController");



// ADD / UPDATE RATING
router.post(
  "/add",
  verifyToken,
  addRating
);



// GET ALL RATINGS (ADMIN ONLY)
router.get(
  "/",
  verifyToken,
  authorizeRole("ADMIN"),
  getRatings
);

router.delete(
  "/:id",
  verifyToken,
  deleteRating
);
module.exports = router;