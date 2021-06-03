const User = require("../Models/User");

const getDoctors = async (req, res) => {
  try {
    const doctors = await User.find(
      { role: "doctor" },
      function (err, doctors) {
        if (err) return err;
        return doctors;
      }
    );
    res.send(doctors);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const getPatients = async (req, res) => {
  try {
    const doctors = await User.find(
      { role: "patient" },
      function (err, doctors) {
        if (err) return err;
        return doctors;
      }
    );
    res.send(doctors);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const getAvailableDoctors = async (req, res) => {
  try {
    const availableDoctors = await User.find(
      { available: true, role: "doctor" },
      function (err, doctors) {
        if (err) return err;
        return doctors;
      }
    );
    res.status(200).send(availableDoctors);
  } catch (err) {
    console.log(err.message);
    res.send(err);
  }
};

const searchDoctor = async (req, res) => {
  const { searchInput } = req.body;

  const foundDoctor = await User.find(
    { username: searchInput },
    function (err, foundDoctor) {
      if (err) return err;
      return foundDoctor;
    }
  );

  if (foundDoctor) {
    res.status(200).send(foundDoctor);
  } else {
    res.status(400).send({ message: "There is no doctor with this name" });
  }
};

const activeDoctor = async (req, res) => {
  const { email, callId } = req.body;

  try {
    await User.findOneAndUpdate(
      { email: email },
      { callid: callId },
      { new: true }
    );
    res.status(200).send({ message: "updated succesfully" });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports = {
  getDoctors,
  getPatients,
  getAvailableDoctors,
  searchDoctor,
  activeDoctor,
};
