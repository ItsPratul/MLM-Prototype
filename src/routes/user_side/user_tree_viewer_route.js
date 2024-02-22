const express = require("express");
const router = express.Router();
const user_auth = require("../../../middleware/user_side/user_auth");

const {
  user_tree_viewer,
} = require("../../controller/user_side/user_tree_viewer_controller");

router.get("/user_tree_viewer", user_auth, user_tree_viewer);

module.exports = router;
