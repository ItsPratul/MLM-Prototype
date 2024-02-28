const cookiparser = require("cookie-parser");
const express = require("express");
let dotenv = require("dotenv");

dotenv.config();
const app = express();
const session = require("express-session");

app.use(express.json());

app.use(cookiparser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

const flash = require("connect-flash");
app.use(flash());

// You can choose any port you prefer
const path = require("path");
let { connectDB } = require("./db/dbconnection");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

// Define a route for the root URL ("/")
// Admin Side
app.use("/", require("./src/routes/admin_side/user_validation_route"));
app.use("/", require("./src/routes/admin_side/user_dashboard_route"));
app.use("/", require("./src/routes/admin_side/user_manager_route"));
app.use("/", require("./src/routes/admin_side/transaction_manager_route"));
app.use("/", require("./src/routes/admin_side/balance_manager_route"));
app.use("/", require("./src/routes/admin_side/products_manager_route"));
app.use("/", require("./src/routes/admin_side/user_tree_viewer_route"));
app.use("/", require("./src/routes/admin_side/user_profile_route"));

app.use("/", require("./src/routes/admin_side/qr_code_testing_route"));

// User Side
app.use("/user_api", require("./src/routes/user_side/user_validation_route"));
app.use("/user_api", require("./src/routes/user_side/user_dashboard_route"));
app.use("/user_api", require("./src/routes/user_side/user_manager_route"));
app.use(
  "/user_api",
  require("./src/routes/user_side/transaction_manager_route")
);
app.use("/user_api", require("./src/routes/user_side/balance_manager_route"));
app.use("/user_api", require("./src/routes/user_side/products_manager_route"));
app.use("/user_api", require("./src/routes/user_side/user_tree_viewer_route"));

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

connectDB();
app.listen(process.env.port, () => {
  console.log("Server is listening at ", process.env.port);
});
