let {
  user_tree_viewer,
} = require("../../services/user_side/user_tree_viewer_service");

exports.user_tree_viewer = async (req, res) => {
  let data = await user_tree_viewer(req, res);
  if (data.success) {
    res.status(200).send({ message: data.message, user_data: data.user_data });
    console.log(data.message);
  } else {
    res.status(401).send(data.message);
    console.log(data.message);
  }
};
