let {
  transaction_manager,
} = require("../../services/user_side/transaction_manager_service");

exports.transaction_manager = async (req, res) => {
  try {
    let data = await transaction_manager(req, res);
    if (data.success) {
      res.render("view_transactions", {
        admin_data: data.admin_data,
        transaction_data: data.transaction_data,
      });
      console.log(data.message);
    } else {
      res.redirect("/user_dashboard");
      console.log(data.message);
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal Server Error");
  }
};
