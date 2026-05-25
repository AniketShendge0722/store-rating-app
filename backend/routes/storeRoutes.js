const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

const {
  addStore,
  getStores,
    getSingleStore,
    updateStore,
    deleteStore,
} = require("../controllers/storeController");



// GET STORES
router.get("/", verifyToken, getStores);



// ADD STORE (ADMIN ONLY)
router.post(
  "/add",
  verifyToken,
  authorizeRole("ADMIN"),
  addStore
);



// ADMIN ROUTE
router.get(
  "/admin",
  verifyToken,
  authorizeRole("ADMIN"),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
    });
  }
);
// GET SINGLE STORE
router.get(
  "/:id",
  verifyToken,
  getSingleStore
);



// UPDATE STORE
router.put(
  "/:id",
  verifyToken,
  authorizeRole("ADMIN"),
  updateStore
);



// DELETE STORE
router.delete(
  "/:id",
  verifyToken,
  authorizeRole("ADMIN"),
  deleteStore
);


module.exports = router;