let {
  user_signup_save,
  user_logined,
  add_user_get,
  update_user_get,
  update_user_post,
  user_logout,
} = require("../../services/user_side/user_validation_service");

exports.user_login = async (req, res) => {
  res.render("user_login", { message: req.flash() });
};

exports.user_logined = async (req, res) => {
  let data = await user_logined(req, res);
  if (data.success) {
    req.flash("success", data.message);
    res.redirect("user_dashboard");
  } else {
    req.flash("error", data.message);
    res.redirect("/");
  }
};

exports.add_user_get = async (req, res) => {
  let data = await add_user_get(req, res);
  if (data.success) {
    res.render("add_user", {
      admin_data: data.admin_data,
      message: req.flash(),
    });
  }
};

exports.user_signup = async (req, res) => {
  let data = await user_signup_save(req, res);
  if (data.success) {
    req.flash("success", data.message);
    res.redirect("view_users");
    console.log(data.message);
  } else {
    req.flash("error", data.message);
    res.redirect("add_user");
    // console.log(data.message);
  }
};

exports.update_user_get = async (req, res) => {
  let data = await update_user_get(req, res);
  if (data.success) {
    res.render("update_user", {
      admin_data: data.admin_data,
      user_data: data.user_data,
    });
  }
};

exports.update_user_post = async (req, res) => {
  let data = await update_user_post(req, res);
  if (data.success) {
    req.flash("success", data.message);
    res.redirect("view_users");
    console.log(data.message);
  } else {
    req.flash("error", data.message);
    res.redirect("view_users");
    console.log(data.message);
  }
};

exports.user_logout = async (req, res) => {
  let data = await user_logout(req, res);
  if (data.success) {
    res.redirect("/");
  } else {
    res.redirect("user_dashboard");
  }
};
