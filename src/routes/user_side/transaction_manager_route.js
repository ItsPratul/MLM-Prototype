const express = require("express");
const router = express.Router();
const user_auth = require("../../../middleware/user_side/user_auth");

const {
  transaction_manager,
} = require("../../controller/user_side/transaction_manager_controller");

router.get("/view_transactions", user_auth, transaction_manager);

module.exports = router;
