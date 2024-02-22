let userModel = require("../../model/user_side/user_model");
let transactionModel = require("../../model/user_side/transaction_model");

exports.transaction_manager = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const admin_data = await userModel.findOne({ user_id: req.user.user_id });
    console.log(req.user.parent_id);

    let filter = {};

    // Check if filters are provided
    if (req.query.filtername) {
      filter["userName"] = { $regex: req.query.filtername, $options: "i" };
    }
    if (req.query.filteruser_id) {
      filter["user_id"] = parseInt(req.query.filteruser_id);
    }
    if (req.query.filteramount) {
      filter["entries.amount"] = parseInt(req.query.filteramount);
    }

    const transaction_data = await transactionModel.aggregate([
      {
        $lookup: {
          from: "users", // Assuming the collection name is "users"
          localField: "entries.fromUserId",
          foreignField: "user_id",
          as: "fromUser",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "entries.toUserId",
          foreignField: "user_id",
          as: "toUser",
        },
      },
      {
        $unwind: "$fromUser",
      },
      {
        $unwind: "$toUser",
      },
      {
        $project: {
          _id: 0,
          user_id: 1,
          userName: "$toUser.name",
          entries: {
            $map: {
              input: "$entries",
              as: "commission",
              in: {
                fromUserName: "$fromUser.name",
                toUserName: "$toUser.name",
                type: "$$commission.type",
                oldBalance: "$$commission.oldBalance",
                amount: "$$commission.amount",
                updatedBalance: "$$commission.updatedBalance",
              },
            },
          },
          createdAt: 1,
        },
      },
      {
        $match: filter, // Apply the filters
      },
    ]);

    if (admin_data) {
      return {
        admin_data: admin_data,
        transaction_data: transaction_data,
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
