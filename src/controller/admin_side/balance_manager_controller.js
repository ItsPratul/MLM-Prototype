let {
  add_balance,
  add_balance_post,
  withdraw_balance,
  withdraw_balance_post,
} = require("../../services/user_side/balance_manager_service");
exports.add_balance_get = async (req, res) => {
  let data = await add_balance(req, res);
  if (data.success) {
    res.render("add_balance", {
      admin_data: data.admin_data,
      message: req.flash(),
    });
  }
};

exports.add_balance_post = async (req, res) => {
  let data = await add_balance_post(req, res);
  if (data.success) {
    req.flash("success", data.message);
    res.redirect("user_dashboard");
    console.log(data.message);
  } else {
    req.flash("error", data.message);
    res.redirect("add_balance");
    console.log(data.message);
  }
};

exports.withdraw_balance_get = async (req, res) => {
  let data = await withdraw_balance(req, res);
  if (data.success) {
    res.render("withdraw_balance", {
      admin_data: data.admin_data,
      message: req.flash(),
    });
  }
};

exports.withdraw_balance_post = async (req, res) => {
  let data = await withdraw_balance_post(req, res);
  if (data.success) {
    req.flash("success", data.message);
    res.redirect("user_dashboard");
    console.log(data.message);
  } else {
    req.flash("error", data.message);
    res.redirect("withdraw_balance");
    console.log(data.message);
  }
};
