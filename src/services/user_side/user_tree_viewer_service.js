let userModel = require("../../model/user_side/user_model");

exports.user_tree_viewer = async (req, res) => {
  try {
    const admin_data = await userModel.findOne({ user_id: req.user.user_id });

    let user_data;
    user_data = await userModel.find();

    if (admin_data) {
      return {
        user_data: user_data,
        admin_data: admin_data,
        message: "View All Users ",
        success: true,
      };
    } else {
      return {
        message: "Something Went Wrong",
        success: false,
      };
    }
  } catch (error) {
    console.log("error", error);
    return res.render("your_ejs_file", {
      message: "Error occurred",
      success: false,
    });
  }
};
