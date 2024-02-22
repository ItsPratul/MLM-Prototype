const express = require("express");
const router = express.Router();
const user_auth = require("../../../middleware/user_side/user_auth");

const {
  user_signup,
  user_logined,
  update_user_post,
  user_logout,
} = require("../../controller/user_side/user_validation_controller");

router.post("/user_login_save", user_logined);

router.post("/user_signup", user_auth, user_signup);

router.post("/user_update_post", user_auth, update_user_post);

router.post("/user_logout", user_auth, user_logout);

module.exports = router;
