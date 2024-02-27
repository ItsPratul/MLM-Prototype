let {
  user_tree_viewer,
} = require("../../services/user_side/user_tree_viewer_service");

const QRCode = require("qrcode");

exports.make_qrcode = async (req, res) => {
  let data = {
    name: "Test Name",
    age: 27,
    department: "Tech",
    id: "0011001",
  };
  let stringdata = JSON.stringify(data);

  if (stringdata) {
    // Print the QR code to terminal
    QRCode.toString(stringdata, { type: "terminal" }, function (err, QRcode) {
      if (err) return console.log("error occurred");

      // Printing the generated code
      console.log(QRcode);
    });

    QRCode.toDataURL(stringdata, function (err, url) {
      if (err) return console.log("error occurred");
      console.log(url);
    });

    req.flash("success", "See Qrcode In Terminal");
    res.redirect("user_dashboard");
  } else {
    req.flash("error", "Error In Generating Qrcode");
    res.redirect("user_dashboard");
  }
};
