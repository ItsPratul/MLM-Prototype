const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
exports.connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log("MLM Database Connected Successfully");
  } catch (error) {
    console.log("Database not connected", error);
  }
};
