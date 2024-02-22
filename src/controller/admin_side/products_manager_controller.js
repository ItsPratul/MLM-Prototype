let {
  add_product_get,
  add_product_post,
  view_products,
  buy_now_post,
  update_product_post,
} = require("../../services/user_side/products_manager_service");
exports.add_product_get = async (req, res) => {
  let data = await add_product_get(req, res);
  if (data.success) {
    res.render("add_product", { admin_data: data.admin_data });
  }
};

exports.add_product_post = async (req, res) => {
  let data = await add_product_post(req, res);
  if (data.success) {
    res.redirect("user_dashboard");
    console.log(data.message);
  } else {
    res.redirect("add_product");
    console.log(data.message);
  }
};

exports.view_products = async (req, res) => {
  let data = await view_products(req, res);
  if (data.success) {
    res.render("view_products", {
      admin_data: data.admin_data,
      product_data: data.product_data,
    });
  } else {
    res.redirect("user_dashboard");
  }
};

exports.buy_now_post = async (req, res) => {
  let data = await buy_now_post(req, res);
  if (data.success) {
    res.redirect("user_dashboard");
    console.log(data.message);
  } else {
    res.redirect("user_dashboard");
    console.log(data.message);
  }
};

exports.update_product_post = async (req, res) => {
  let data = await update_product_post(req, res);
  if (data.success) {
    res.redirect("user_dashboard");
    console.log(data.message);
  } else {
    res.redirect("user_dashboard");
    console.log(data.message);
  }
};
