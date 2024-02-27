const express = require("express");
const router = express.Router();
const user_auth = require("../../../middleware/user_side/user_auth");

const {
  make_qrcode,
} = require("../../controller/admin_side/qr_code_testing_controller");

router.get("/qrcode_test", user_auth, make_qrcode);

module.exports = router;
