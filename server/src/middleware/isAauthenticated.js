const jwt = require("jsonwebtoken");
const User = require("../Models/User");

exports.isAuth = async (req, res) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    errorHandler(401, "No token found!", false, res);
  }

  try {
    const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedJWT.id);

    if (!user) {
      errorHandler(401, "No user found!", false, res);
    }

    req.user = user;
    res.status(200).send(true);
  } catch (err) {
    console.log(err.message);
    errorHandler(401, "Token expired!", false, res);
  }
};

const errorHandler = (statusCode, message, isAuth, res) => {
  return res
    .status(statusCode)
    .json({ isAuthenticated: isAuth, message: message });
};
