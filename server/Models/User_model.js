const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  super_token_Id: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  country: {
    type: String,
  },
  picture: {
    type: String,
  },
  role: {
    type: String,
    default: "Active",
  },
  wallet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wallet",
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
