const express = require("express");
const router = express.Router();
const user_auth = require("../../../middleware/user_side/user_auth");

const {
  user_dashboard_get,
} = require("../../controller/user_side/user_dashboard_controller");

router.get("/user_dashboard", user_auth, user_dashboard_get);

module.exports = router;
