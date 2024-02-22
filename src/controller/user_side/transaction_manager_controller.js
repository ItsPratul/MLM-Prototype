let {
  transaction_manager,
} = require("../../services/user_side/transaction_manager_service");

exports.transaction_manager = async (req, res) => {
  let data = await transaction_manager(req, res);

  if (data.success) {
    res
      .status(200)
      .send({ message: data.message, transaction_data: data.transaction_data });
    console.log("cds", data.message);
  } else {
    res.status(401).send(data.message);
    console.log(data.message);
  }
};
