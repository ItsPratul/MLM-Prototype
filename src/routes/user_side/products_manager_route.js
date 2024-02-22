const express = require("express");
const router = express.Router();
const user_auth = require("../../../middleware/user_side/user_auth");

const {
  add_product_post,
  view_products,
  buy_now_post,
  update_product_post,
} = require("../../controller/user_side/products_manager_controller");

router.post("/add_product_post", user_auth, add_product_post);

router.get("/view_products", user_auth, view_products);
router.post("/buy_now_post", user_auth, buy_now_post);

router.post("/update_product_post", user_auth, update_product_post);

module.exports = router;
