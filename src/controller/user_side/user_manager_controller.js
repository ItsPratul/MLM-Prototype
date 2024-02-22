let { user_manager } = require("../../services/user_side/user_manager_service");

exports.user_manager = async (req, res) => {
  let data = await user_manager(req, res);

  if (data.success) {
    res.status(200).send({ message: data.message, user_data: data.user_data });
    console.log(data.message);
  } else {
    res.status(401).send(data.message);
    console.log(data.message);
  }
};