const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  Transaction_Type: {
    type: String,
    required: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  Description: String,
  Extra_Details: Object,
  Transaction_ID: {
    type: String,
    required: true,
    unique: true,
  },
  Status: {
    type: String,
    default: "Pending",
  },
  Balance: {
    type: Number,
    required: true,
  },
});


const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;