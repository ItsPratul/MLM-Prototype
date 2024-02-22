let {
  add_product_post,
  view_products,
  buy_now_post,
  update_product_post,
} = require("../../services/user_side/products_manager_service");

exports.add_product_post = async (req, res) => {
  let data = await add_product_post(req, res);
  if (data.success) {
    res.status(200).send(data.message);
    console.log(data.message);
  } else {
    res.status(401).send(data.message);
    console.log(data.message);
  }
};

exports.view_products = async (req, res) => {
  let data = await view_products(req, res);
  if (data.success) {
    res
      .status(200)
      .send({ message: data.message, product_data: data.product_data });
    console.log(data.message);
  } else {
    res.status(401).send(data.message);
    console.log(data.message);
  }
};

exports.buy_now_post = async (req, res) => {
  let data = await buy_now_post(req, res);
  if (data.success) {
    res.status(200).send(data.message);
    console.log(data.message);
  } else {
    res.status(401).send(data.message);
    console.log(data.message);
  }
};

exports.update_product_post = async (req, res) => {
  let data = await update_product_post(req, res);
  if (data.success) {
    res.status(200).send(data.message);
    console.log(data.message);
  } else {
    res.status(401).send(data.message);
    console.log(data.message);
  }
};
