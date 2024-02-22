const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let answer = new Schema(
  {
    user_id: {
      type: Number,
      default: null,
    },
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    mobile: {
      type: Number,
      default: null,
    },
    password: {
      type: String,
      default: null,
    },
    wallet: {
      type: Number,
      default: null,
    },
    parent_id: {
      type: String,
      default: null,
    },
    auth_key: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      default: null,
    },
    date_of_birth: {
      type: Date,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
    position: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: "",
  }
);
module.exports = mongoose.model("user", answer);
