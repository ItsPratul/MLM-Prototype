let {
  user_dashboard_get,
} = require("../../services/user_side/user_dashboard_service");

exports.user_dashboard_get = async (req, res) => {
  let data = await user_dashboard_get(req, res);
  if (data.success) {
    res.status(200).send({ user_data: data.user_data });
    console.log(data.message);
  } else {
    res.status(401).send(data.message);
    console.log(data.message);
  }
};
