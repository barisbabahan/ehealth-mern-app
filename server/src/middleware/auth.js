const jwt = require("jsonwebtoken");
const User = require("../Models/User");

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    errorHandler(401, "No token found!", res);
  }

  try {
    const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedJWT.id);

    if (!user) {
      errorHandler(401, "No user found!", res);
    }

    req.user = user;

    next();
  } catch (err) {
    console.log(err.message);
    errorHandler(401, "token expired", res);
  }
};

const errorHandler = (statusCode, message, res) => {
  return res.status(statusCode).json({ success: false, message: message });
};
