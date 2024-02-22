const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let mongoose = require("mongoose");

let userModel = require("../../model/user_side/user_model");

exports.user_manager = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const admin_data = await userModel.findOne({ user_id: req.user.user_id });
    console.log(req.user.parent_id);

    let filter = {};

    // Check if filters are present in the request
    if (req.query.filtername) {
      filter.name = { $regex: new RegExp(req.query.filtername, "i") };
    }

    if (req.query.filtermobile) {
      filter.mobile = req.query.filtermobile;
    }

    if (req.query.filteremail) {
      filter.email = { $regex: new RegExp(req.query.filteremail, "i") };
    }

    let user_data;

    if (req.user.parent_id == null) {
      user_data = await userModel.find(filter);
    } else {
      user_data = await userModel.find({ parent_id: user_id, ...filter });
    }

    if (admin_data) {
      return {
        user_data: user_data,
        admin_data: admin_data,
        message:
          req.user.parent_id == null
            ? "View All Users Because you are a root user"
            : "View All Users Joined By Me",
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
