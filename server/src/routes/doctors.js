const express = require("express");
const { isAdmin } = require("../middleware/isAdmin");
const { addDoctor, deleteUser } = require("../controllers/doctorHandler");
const router = express.Router();

router.post("/adddoctor", isAdmin, addDoctor);
router.post("/deleteuser", isAdmin, deleteUser);

module.exports = router;
