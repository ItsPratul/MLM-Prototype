const userModel = require("../../model/user_side/user_model");
const Transaction = require("../../model/user_side/transaction_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let dotenv = require("dotenv");

//User Register Save
exports.user_signup_save = async (req) => {
  try {
    let name = req.body.name;
    let parent_id = req.user.user_id;
    let email = req.body.email;
    let password = req.body.password;
    let mobile = req.body.mobile;
    let date_of_birth = req.body.dob;
    let gender = req.body.gender;
    let address = req.body.address;
    let city = req.body.city;
    let state = req.body.state;
    let amount = req.body.amount;
    let hashPassword = await bcrypt.hash(password, 10);

    let checkEmail = await userModel.findOne({ email: email });
    let checkMobile = await userModel.findOne({ mobile: mobile });

    if (checkEmail || checkMobile) {
      return {
        success: false,
        message: "User Already Found",
      };
    } else {
      let all_users = await userModel.find();
      let user_count = all_users.length;
      console.log("Total Number of users", user_count);

      if (user_count == 0) {
        const user_id = 1;

        let user_data = new userModel({
          name: name,
          user_id: user_id,
          email: email,
          password: hashPassword,
          parent_id: null,
          wallet: amount,
          mobile: mobile,
          date_of_birth: date_of_birth,
          gender: gender,
          address: address,
          city: city,
          state: state,
        });

        let userData = await user_data.save();

        // Create a transaction for the new user
        const transactionData = {
          user_id: user_id,
          entries: [
            {
              fromUserId: user_id,
              toUserId: user_id,
              amount: amount,
              oldBalance: 0, // Assuming initial balance is 0
              updatedBalance: amount,
              type: "Entry Balance",
            },
          ],
        };
        const transaction = new Transaction(transactionData);
        await transaction.save();
      } else {
        const user_id2 = all_users[user_count - 1].user_id;
        const user_id = user_id2 + 1;
        console.log("New User Id", user_id);

        let position = await userModel.find({ parent_id: parent_id });
        console.log("Length", position.length);
        let position_value;
        if (!position) {
          position_value = 1;
        } else {
          position_value = position.length + 1;
        }
        console.log("Position of New User", position_value);

        let user_data = new userModel({
          name: name,
          user_id: user_id,
          email: email,
          password: hashPassword,
          parent_id: parent_id,
          wallet: amount * (75 / 100),
          mobile: mobile,
          date_of_birth: date_of_birth,
          gender: gender,
          address: address,
          city: city,
          state: state,
          position: position_value,
        });

        let userData = await user_data.save();

        const transactionData = {
          user_id: user_id,
          entries: [
            {
              fromUserId: user_id,
              toUserId: user_id,
              amount: amount * (75 / 100),
              oldBalance: 0, // Assuming initial balance is 0
              updatedBalance: amount * (75 / 100),
              type: "Entry Balance",
            },
          ],
        };
        const transaction = new Transaction(transactionData);
        await transaction.save();

        amount = amount - amount * (75 / 100);

        while (true) {
          let parent = await userModel.findOne({ user_id: parent_id });
          console.log(parent);
          if (!parent) {
            console.log("Loop Break -- No Parent Found");
            break;
          } else {
            if (parent.parent_id == null) {
              console.log("Loop Break--Parent_id null found");

              let update_parent = await userModel.findOneAndUpdate(
                {
                  user_id: parent_id,
                },
                { wallet: parent.wallet + amount }
              );

              // Save transaction for the last root owner
              const transactionData = {
                user_id: parent_id,
                entries: [
                  {
                    fromUserId: userData.user_id,
                    toUserId: parent_id,
                    amount: amount,
                    oldBalance: parent.wallet, // Old balance is the parent's wallet
                    updatedBalance: parent.wallet + amount, // Updated balance is the current wallet value
                    type: "Commission",
                  },
                ],
              };
              const transaction = new Transaction(transactionData);
              await transaction.save();

              break;
            } else {
              console.log("In Parent Update Loop");

              let update_parent = await userModel.findOneAndUpdate(
                {
                  user_id: parent_id,
                },
                { wallet: parent.wallet + amount * (75 / 100) }
              );

              // Save transaction for the current parent
              const transactionData = {
                user_id: parent_id,
                entries: [
                  {
                    fromUserId: userData.user_id,
                    toUserId: parent_id,
                    amount: amount * (75 / 100),
                    oldBalance: parent.wallet, // Old balance is the parent's wallet
                    updatedBalance: parent.wallet + amount * (75 / 100), // Updated balance is the current wallet value
                    type: "Commission",
                  },
                ],
              };
              const transaction = new Transaction(transactionData);
              await transaction.save();

              amount = amount - amount * (75 / 100);
              parent_id = parent.parent_id;
              continue;
            }
          }
        }
      }
      return {
        message: "User Registered Successfully",
        success: true,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

//User Login Service
exports.user_logined = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const existingUser = await userModel.findOne({
      email: email,
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });

    if (!token) {
      throw new Error("Token generation failed");
    }

    const authKeyInsertion = await userModel.findOneAndUpdate(
      { _id: existingUser._id },
      { auth_key: token },
      { new: true }
    );

    if (!authKeyInsertion) {
      throw new Error("Token updation failed");
    }
    return {
      message: "User Logged in successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: error.message || "Internal server error",
      success: false,
    };
  }
};

exports.add_user_get = async (req) => {
  try {
    const admin_data = await userModel.findOne({ user_id: req.user.user_id });
    if (admin_data) {
      return {
        message: "data fetched successfully",
        admin_data: admin_data,
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

exports.update_user_get = async (req) => {
  try {
    const admin_data = await userModel.findOne({ user_id: req.user.user_id });

    let user_id = req.query.user_id;
    const user_data = await userModel.findOne({ user_id: user_id });
    if (admin_data) {
      return {
        message: "data fetched successfully",
        admin_data: admin_data,
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

exports.update_user_post = async (req) => {
  try {
    let user_id = req.body.user_id;

    let name = req.body.name;
    let password = req.body.password;
    let gender = req.body.gender;
    let address = req.body.address;
    let city = req.body.city;
    let state = req.body.state;

    if (password == "" || password == undefined) {
      let updatedata = await userModel.findOneAndUpdate(
        { user_id: user_id },
        {
          name: name,
          gender: gender,
          address: address,
          city: city,
        }
      );
      let update_data = await updatedata.save();
      if (update_data)
        return {
          message: "User Updated Successfully",
          data: updatedata,
          success: true,
        };
      else {
        return {
          message: "Error Happened",
          success: false,
        };
      }
    } else {
      let hashPassword = await bcrypt.hash(password, 10);
      let updatedata = await userModel.findOneAndUpdate(
        { user_id: user_id },
        {
          name: name,
          password: hashPassword,
          gender: gender,
          address: address,
          city: city,
        }
      );
      let update_data = await updatedata.save();
      if (update_data)
        return {
          message: "User Updated Successfully",
          data: updatedata,
          success: true,
        };
      else {
        return {
          message: "Error Happened",
          success: false,
        };
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.user_logout = async (req, res) => {
  try {
    res.clearCookie("token");

    let user_data = await userModel.findOneAndUpdate(
      { user_id: req.user.user_id },
      { auth_key: null }
    );

    let update_user = user_data.save();

    if (update_user) {
      return {
        message: "Logout Successfully",
        success: true,
      };
    } else {
      return {
        message: "Please Try Again Later",
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
  }
};
