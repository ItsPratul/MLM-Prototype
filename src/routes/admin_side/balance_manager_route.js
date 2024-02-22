const express = require("express");
const router = express.Router();
const user_auth = require("../../../middleware/user_side/user_auth");

const {
  add_balance_get,
  add_balance_post,
  withdraw_balance_get,
  withdraw_balance_post,
} = require("../../controller/admin_side/balance_manager_controller");

router.get("/add_balance", user_auth, add_balance_get);
router.post("/add_balance_post", user_auth, add_balance_post);

router.get("/withdraw_balance", user_auth, withdraw_balance_get);
router.post("/withdraw_balance_post", user_auth, withdraw_balance_post);

module.exports = router;
