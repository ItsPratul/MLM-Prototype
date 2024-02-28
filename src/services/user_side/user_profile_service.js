let userModel = require("../../model/user_side/user_model");

exports.user_profile_get = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const admin_data = await userModel.findOne({ user_id: user_id });

    if (admin_data) {
      return {
        admin_data: admin_data,
        success: true,
        message: "View Your Profile",
      };
    } else {
      return {
        message: "Something Went Wrong",
        success: false,
      };
    }
  } catch (error) {
    console.log("error", error);
  }
};

exports.user_profile_update = async (req, res) => {
  try {
    let user_id = req.user.user_id;
    let name = req.body.name;
    let mobile = req.body.mobile;
    let gender = req.body.gender;
    let city = req.body.city;
    let state = req.body.state;
    let address = req.body.address;

    let update_user = await userModel.findOneAndUpdate(
      { user_id: user_id },
      {
        name: name,
        mobile: mobile,
        gender: gender,
        city: city,
        state: state,
        address: address,
      }
    );
    let updated_user = update_user.save();

    if (updated_user) {
      return {
        success: true,
        message: "Your Profile Updated Successfully",
      };
    } else {
      return {
        message: "Something Went Wrong",
        success: false,
      };
    }
  } catch (error) {
    console.log("error", error);
  }
};
