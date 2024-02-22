let {
  add_balance_post,
  withdraw_balance_post,
} = require("../../services/user_side/balance_manager_service");

exports.add_balance_post = async (req, res) => {
  let data = await add_balance_post(req, res);
  if (data.success) {
    res.status(200).send(data.message);
    console.log(data.message);
  } else {
    res.status(401).send(data.message);
    console.log(data.message);
  }
};

exports.withdraw_balance_post = async (req, res) => {
  let data = await withdraw_balance_post(req, res);
  if (data.success) {
    res.status(200).send(data.message);
    console.log(data.message);
  } else {
    res.status(401).send(data.message);
    console.log(data.message);
  }
};
