const express = require("express");
const router = express.Router();
const user_auth = require("../../../middleware/user_side/user_auth");

const {
  user_login,
  user_signup,
  user_logined,
  add_user_get,
  update_user_get,
  update_user_post,
  user_logout,
} = require("../../controller/admin_side/user_validation_controller");

router.get("/", user_login);
router.post("/user_login_save", user_logined);

router.get("/add_user", user_auth, add_user_get);
router.post("/user_signup", user_auth, user_signup);

router.get("/update_user", user_auth, update_user_get);
router.post("/user_update_post", user_auth, update_user_post);

router.post("/user_logout", user_auth, user_logout);

module.exports = router;
