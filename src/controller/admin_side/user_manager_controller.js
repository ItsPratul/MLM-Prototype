let { user_manager } = require("../../services/user_side/user_manager_service");

exports.user_manager = async (req, res) => {
  let data = await user_manager(req, res);
  if (data.success) {
    res.render("view_users", {
      message: req.flash(),
      admin_data: data.admin_data,
      user_data: data.user_data,
    });
    console.log(data.message);
  } else {
    res.redirect("/user_dashboard");
    console.log(data.message);
  }
};
