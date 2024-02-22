const express = require("express");
const router = express.Router();
const user_auth = require("../../../middleware/user_side/user_auth");

const {
  user_manager,
} = require("../../controller/user_side/user_manager_controller");

router.get("/view_users", user_auth, user_manager);

module.exports = router;
