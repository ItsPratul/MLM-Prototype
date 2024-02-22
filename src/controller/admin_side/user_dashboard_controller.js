let {
  user_dashboard_get,
} = require("../../services/user_side/user_dashboard_service");

exports.user_dashboard_get = async (req, res) => {
  let data = await user_dashboard_get(req, res);
  if (data.success) {
    res.render("user_dashboard", { admin_data: data.user_data });
  } else {
    res.redirect("/");
  }
};
