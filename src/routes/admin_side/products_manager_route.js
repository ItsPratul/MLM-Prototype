const express = require("express");
const router = express.Router();
const user_auth = require("../../../middleware/user_side/user_auth");

const {
  add_product_get,
  add_product_post,
  view_products,
  buy_now_post,
  update_product_get,
  update_product_post,
} = require("../../controller/admin_side/products_manager_controller");

router.get("/add_product", user_auth, add_product_get);
router.post("/add_product_post", user_auth, add_product_post);

router.get("/view_products", user_auth, view_products);
router.post("/buy_now_post", user_auth, buy_now_post);

router.get("/update_product", user_auth, update_product_get);
router.post("/update_product_post", user_auth, update_product_post);

module.exports = router;
