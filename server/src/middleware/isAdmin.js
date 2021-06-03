const jwt = require("jsonwebtoken");
const User = require("../Models/User");

exports.isAdmin = async (req, res, next) => {
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
    if (decodedJWT.role === "admin") {
      next();
    } else {
      errorHandler(401, "The user is not admin", false, res);
    }
  } catch (err) {
    console.log(err.message);
    errorHandler(401, "Token expired!", false, res);
  }
};

const errorHandler = (statusCode, message, isUserAdmin, res) => {
  return res
    .status(statusCode)
    .json({ isUserAdmin: isUserAdmin, message: message });
};
