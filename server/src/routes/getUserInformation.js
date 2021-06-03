const express = require("express");
const { protect } = require("../middleware/auth");
const { getUserInformation } = require("../controllers/getUserInformation");
const router = express.Router();

router.get("/", protect, getUserInformation);

module.exports = router;
