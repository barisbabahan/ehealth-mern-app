const express = require("express");
const {
  getDoctors,
  getPatients,
  getAvailableDoctors,
  searchDoctor,
  activeDoctor,
} = require("../controllers/viewUsers");
const router = express.Router();

router.get("/viewdoctors", getDoctors);
router.get("/viewpatients", getPatients);
router.get("/getavailabledoctors", getAvailableDoctors);
router.post("/searchdoctor", searchDoctor);
router.post("/activedoctor", activeDoctor);

module.exports = router;
