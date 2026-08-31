const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getMyProfile , updateMyProfile, getPublicProfile } = require("../controllers/userController");

router.get("/me", protect ,getMyProfile);
router.put("/me",protect, updateMyProfile);
router.get("/:id", getPublicProfile);

module.exports = router;