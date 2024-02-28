let userModel = require("../../model/user_side/user_model");
let productModel = require("../../model/user_side/products_model");
let Transaction = require("../../model/user_side/transaction_model");
let orderModel = require("../../model/user_side/order_model");

exports.add_product_get = async (req, res) => {
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

exports.add_product_post = async (req, res) => {
  try {
    console.log(req.body);
    let product_name = req.body.product_name;
    let description = req.body.description;
    let price = req.body.amount;

    console.log("Product Name ", product_name);

    let product_check = await productModel.findOne({
      product_name: product_name,
    });

    if (product_check) {
      return {
        success: false,
        message: "Product Already Exixtsed",
      };
    } else {
      let product_data = new productModel({
        product_name: product_name,
        description: description,
        price: price,
      });

      let product_added = await product_data.save();

      if (product_added) {
        return {
          success: true,
          message: "Product Added Successfully",
        };
      } else {
        return {
          message: "Something Went Wrong",
          success: false,
        };
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};

exports.view_products = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const admin_data = await userModel.findOne({ user_id: req.user.user_id });

    let product_data = await productModel.find();

    if (admin_data) {
      return {
        admin_data: admin_data,
        product_data: product_data,
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

exports.buy_now_post = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    let _id = req.body.id;

    let product = await productModel.findOne({ _id: _id });

    let order_data = new orderModel({
      product_id: product._id,
      user_id: user_id,
      amount: product.price,
    });
    let order_placed = await order_data.save();

    const transactionData = {
      user_id: user_id,
      entries: [
        {
          fromUserId: user_id,
          toUserId: user_id,
          amount: product.price,
          oldBalance: req.user.wallet, // Assuming initial balance is 0
          updatedBalance: req.user.wallet - product.price,
          type: "Product Bought",
        },
      ],
    };
    const transaction = new Transaction(transactionData);
    await transaction.save();

    let user_update = await userModel.findOneAndUpdate(
      { user_id: user_id },
      { wallet: req.user.wallet - product.price }
    );
    let updated_user = user_update.save();

    let root_user = await userModel.findOne({ parent_id: null });
    let root_update = await userModel.findOneAndUpdate(
      { parent_id: null },
      { wallet: root_user.wallet + product.price }
    );
    let updated_root = root_update.save();

    const transactionData2 = {
      user_id: root_user.user_id,
      entries: [
        {
          fromUserId: user_id,
          toUserId: root_user.user_id,
          amount: product.price,
          oldBalance: root_user.wallet, // Assuming initial balance is 0
          updatedBalance: root_user.wallet + product.price,
          type: "Product Sold",
        },
      ],
    };
    const transaction2 = new Transaction(transactionData2);
    await transaction2.save();

    if (
      order_placed &&
      transaction &&
      updated_user &&
      updated_root &&
      transaction2
    ) {
      return {
        success: true,
        message: "Product Bought Successfully",
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

exports.update_product_get = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const admin_data = await userModel.findOne({ user_id: req.user.user_id });

    let _id = req.query.id;
    let product_data = await productModel.findOne({ _id: _id });

    if (admin_data && product_data) {
      return {
        admin_data: admin_data,
        product_data: product_data,
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

exports.update_product_post = async (req, res) => {
  try {
    let button = req.body.button;
    let _id = req.body.id;
    console.log(button, _id);

    if (button == "Update") {
      let product_name = req.body.product_name;
      let description = req.body.description;
      let price = req.body.amount;

      console.log("Product Name ", product_name);

      let update_product = await productModel.findOneAndUpdate(
        { _id: _id },
        {
          description: description,
          price: price,
        }
      );
      let updated_product = update_product.save();

      if (updated_product) {
        return {
          success: true,
          message: "Product Updated Successfully",
        };
      } else {
        return {
          message: "Something Went Wrong",
          success: false,
        };
      }
    } else if (button == "Delete") {
      let delete_user = await productModel.findByIdAndDelete({ _id });
      if (delete_user) {
        return {
          success: true,
          message: "Product Deleted Successfully",
        };
      } else {
        return {
          message: "Something Went Wrong",
          success: false,
        };
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};
