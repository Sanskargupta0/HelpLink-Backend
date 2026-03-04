const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  total_amount: {
    type: Number,
    default: 0,
  },
  donation_transactions: {
    type: Array,
  },
  spending_transactions: {
    type: Array,
  }
});


const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;