const User = require("../Models/User");

const addDoctor = async (req, res) => {
  const {
    username,
    email,
    password,
    role,
    qualifications,
    expertise,
    mobileno,
  } = req.body;

  try {
    const doctor = await User.create({
      username,
      email,
      password,
      role,
      qualifications,
      expertise,
      mobileno,
    });
    doctor.save(function (err, doc) {
      if (err) return console.log(err.message);
      sendToken(201, doctor, res);
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.body;
  await User.findByIdAndDelete(id, function (err) {
    if (err) {
      res.status(401).send(err.message);
    }
    res.status(200).send("User succesfully deleted");
  });
};

const sendToken = (status, user, res) => {
  res.status(status).json({ success: true });
};

module.exports = {
  addDoctor,
  deleteUser,
};
