let {
  user_signup_save,
  user_logined,
  update_user_post,
  user_logout,
} = require("../../services/user_side/user_validation_service");

exports.user_signup = async (req, res) => {
  let data = await user_signup_save(req, res);
  if (data.success) {
    res.status(200).send(data.message);
    console.log(data.message);
  } else {
    res.status(401).send(data.message);
    console.log(data.message);
  }
};

exports.user_logined = async (req, res) => {
  let data = await user_logined(req, res);
  if (data.success) {
    res.status(200).send(data.message);
    console.log(data.message);
  } else {
    res.status(401).send(data.message);
    console.log(data.message);
  }
};

exports.update_user_post = async (req, res) => {
  let data = await update_user_post(req, res);
  if (data.success) {
    res.status(200).send(data.message);
    console.log(data.message);
  } else {
    res.status(401).send(data.message);
    console.log(data.message);
  }
};

exports.user_logout = async (req, res) => {
  let data = await user_logout(req, res);
  if (data.success) {
    res.status(401).send(data.message);
    console.log(data.message);
  } else {
    res.status(200).send(data.message);
    console.log(data.message);
  }
};
