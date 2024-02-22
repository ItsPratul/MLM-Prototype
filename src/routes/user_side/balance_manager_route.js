const express = require("express");
const router = express.Router();
const user_auth = require("../../../middleware/user_side/user_auth");

const {
  add_balance_post,
  withdraw_balance_post,
} = require("../../controller/user_side/balance_manager_controller");

router.post("/add_balance_post", user_auth, add_balance_post);

router.post("/withdraw_balance_post", user_auth, withdraw_balance_post);

module.exports = router;
