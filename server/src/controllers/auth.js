const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const handleRegister = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const user = await User.create({ username, role, email, password });
    user.save(function (err, doc) {
      if (err) return console.log(err.message);
      sendToken(201, user, res);
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(400).json({ success: false, message: "There is no user" });
    }
    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: "provide email and password" });
    }
    const isMatch = await user.isPasswordsMatch(password);

    if (!isMatch) {
      res
        .status(200)
        .json({ success: false, message: "your credantial is wrong" });
    }

    if (user.role === "doctor") {
      await User.findOneAndUpdate(
        { email },
        { available: true },
        {
          new: true,
        }
      );
    }
    sendToken(201, user, res);
  } catch (err) {
    console.log(err.message);
  }
};

const handleLogout = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    res.status(401).send("No token found!");
  }
  try {
    const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedJWT.id);

    if (!user) {
      res.status(401).send("No user found!");
    }

    req.user = user;
    await User.findByIdAndUpdate(decodedJWT.id, { available: false });
    res.status(200).send("Succesfully logout");
  } catch (err) {
    console.log(err.message);
    res.status(401).send("Token expired");
  }
};
const sendToken = (status, user, res) => {
  const token = user.getToken();
  res.status(status).json({ success: true, token });
};

module.exports = {
  handleRegister,
  handleLogin,
  handleLogout,
};
