require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../../src/model/user_side/user_model");

// Middleware for handling auth
async function user_auth(req, res, next) {
  // Implement user auth logic
  try {
    if (req.cookies.token != undefined && req.cookies.token != "") {
      const token = req.cookies.token;
      const jwtPassword = process.env.SECRET_KEY;
      const decode = jwt.verify(token, jwtPassword);
      let user = await userModel
        .findOne({ _id: decode.id })
        .select("-password -auth_key")
        .exec();
      if (!user) return res.status(403).json({ msg: "User not found" });
      req.user = user;
      next();
    } else {
      res.redirect("/");
      console.log("Please Login First");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
}

module.exports = user_auth;
