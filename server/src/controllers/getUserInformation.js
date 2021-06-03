const User = require("../Models/User");
const jwt = require("jsonwebtoken");

const getUserInformation = async (req, res) => {
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
      res.status(404).send("No user found");
    } else {
      res.status(200).send(user);
    }
  } catch (err) {
    console.log(err.message);
    res.status(401).send("Token expired");
  }
};

module.exports = {
  getUserInformation,
};
