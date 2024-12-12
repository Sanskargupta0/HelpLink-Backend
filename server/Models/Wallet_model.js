const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
  User_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Balance: {
    type: Number,
    default: 0,
  },
  Transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
  ],
});

const Wallet = mongoose.model("Wallet", WalletSchema);

module.exports = Wallet;