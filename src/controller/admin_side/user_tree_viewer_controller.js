let {
  user_tree_viewer,
} = require("../../services/user_side/user_tree_viewer_service");

exports.user_tree_viewer = async (req, res) => {
  let data = await user_tree_viewer(req, res);
  if (data.success) {
    res.render("user_tree_viewer", {
      admin_data: data.admin_data,
      user_data: data.user_data,
    });
    // console.log(data);
  } else {
    res.redirect("/user_dashboard");
    console.log(data.message);
  }
};
