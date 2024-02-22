const userModel = require("../../model/user_side/user_model");

exports.user_dashboard_get = async (req) => {
  try {
    const user_data = await userModel.findOne({ user_id: req.user.user_id });
    if (user_data) {
      return {
        message: "data fetched successfully",
        user_data: user_data,
        success: true,
      };
    } else {
      return {
        message: "data did not fetch",
        data: [],
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
  }
};
