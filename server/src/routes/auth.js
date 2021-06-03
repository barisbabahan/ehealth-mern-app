const express = require("express");
const {
  handleRegister,
  handleLogin,
  handleLogout,
} = require("../controllers/auth");
const { isAuth } = require("../middleware/isAauthenticated");
const router = express.Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.post("/logout", handleLogout);
router.get("/isauth", isAuth);

module.exports = router;
