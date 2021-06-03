const express = require("express");
const { getUserRole } = require("../controllers/getUserRole");

const { protect } = require("../middleware/auth");
const router = express.Router();

router.get("/", protect, getUserRole);

module.exports = router;
