const express = require("express");
const router = express.Router();
const user_auth = require("../../../middleware/user_side/user_auth");

const {
  user_profile_get,
  user_profile_update,
} = require("../../controller/admin_side/user_profile_controller");

router.get("/admin_profile", user_auth, user_profile_get);
router.post("/user_profile_update", user_auth, user_profile_update);

module.exports = router;
