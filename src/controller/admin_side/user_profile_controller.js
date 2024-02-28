let {
  user_profile_get,
  user_profile_update,
} = require("../../services/user_side/user_profile_service");
exports.user_profile_get = async (req, res) => {
  let data = await user_profile_get(req, res);
  if (data.success) {
    res.render("admin_profile", {
      admin_data: data.admin_data,
      message: req.flash(),
    });
  }
};

exports.user_profile_update = async (req, res) => {
  let data = await user_profile_update(req, res);
  if (data.success) {
    req.flash("success", data.message);
    res.redirect("admin_profile");
    console.log(data.message);
  } else {
    req.flash("error", data.message);
    res.redirect("admin_profile");
    console.log(data.message);
  }
};
