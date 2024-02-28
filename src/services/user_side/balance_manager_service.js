let userModel = require("../../model/user_side/user_model");
let Transaction = require("../../model/user_side/transaction_model");

exports.add_balance = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const admin_data = await userModel.findOne({ user_id: req.user.user_id });

    if (admin_data) {
      return {
        admin_data: admin_data,
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
  }
};

exports.add_balance_post = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const admin_data = await userModel.findOne({ user_id: req.user.user_id });

    let amount = parseInt(req.body.amount);

    console.log(typeof amount);

    let update_balance = await userModel.findOneAndUpdate(
      { user_id: user_id },
      {
        wallet: admin_data.wallet + amount,
      }
    );

    let updated_balance = update_balance.save();

    const transactionData = {
      user_id: user_id,
      entries: [
        {
          fromUserId: user_id,
          toUserId: user_id,
          amount: amount,
          oldBalance: admin_data.wallet, // Assuming initial balance is 0
          updatedBalance: admin_data.wallet + amount,
          type: "Deposited",
        },
      ],
    };
    const transaction = new Transaction(transactionData);
    await transaction.save();

    if (updated_balance) {
      return {
        success: true,
        message: "Balance Added to Wallet Successfully",
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

exports.withdraw_balance = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const admin_data = await userModel.findOne({ user_id: req.user.user_id });

    if (admin_data) {
      return {
        admin_data: admin_data,
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
  }
};

exports.withdraw_balance_post = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const admin_data = await userModel.findOne({ user_id: req.user.user_id });

    let amount = parseInt(req.body.amount);

    console.log(typeof amount);

    let update_balance = await userModel.findOneAndUpdate(
      { user_id: user_id },
      {
        wallet: admin_data.wallet - amount,
      }
    );

    let updated_balance = update_balance.save();

    const transactionData = {
      user_id: user_id,
      entries: [
        {
          fromUserId: user_id,
          toUserId: user_id,
          amount: amount,
          oldBalance: admin_data.wallet, // Assuming initial balance is 0
          updatedBalance: admin_data.wallet - amount,
          type: "Withdrawal",
        },
      ],
    };
    const transaction = new Transaction(transactionData);
    await transaction.save();

    if (updated_balance) {
      return {
        success: true,
        message: "Balance Withdrawal From Wallet Successfully",
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
