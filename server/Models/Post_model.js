const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: Array,
  },
  upi_Id: {
    type: String,
  },
  upi_qrCode: {
    type: String,
  },
  target_amount: {
    type: Number,
  },
  donation_transactions: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
  }
  ,
  category: {
    type: Number,
    required: true,
  },
  tags: {
    type: Array,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Array,
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
