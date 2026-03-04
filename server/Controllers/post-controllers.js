const Post = require("../Models/Post_model");
const User = require("../Models/User_model");
const Transaction = require("../Models/Transaction_model");

const createPost = async (req, res) => {
  try {
    const {
      user_id,
      title,
      description,
      image,
      category,
      tags,
      upi_Id,
      upi_qrCode,
      target_amount,
    } = req.body;

    // Validate required fields
    if (!user_id || !title || !description || !image || !category || !tags) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prepare post data
    const postData = {
      user_id,
      title,
      description,
      image,
      category,
      tags,
    };

    // Additional fields for category 2
    if (category === 2) {
      if (!upi_Id || !upi_qrCode || !target_amount) {
        return res
          .status(400)
          .json({ message: "All fields are required for category 2" });
      }
      const transaction = new Transaction({
        post_id: postData._id,
      });
      await transaction.save();
      postData.donation_transactions = transaction._id;
      Object.assign(postData, { upi_Id, upi_qrCode, target_amount });
    }

    // Create and save post
    const post = new Post(postData);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updatePost = async (req, res) => {
  try {
    const {
      post_id,
      title,
      description,
      image,
      tags,
      upi_Id,
      upi_qrCode,
      target_amount,
      user_id,
    } = req.body;
    const post = await Post.findById(post_id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    } else {
      // Check if user is the owner of the post
      if (user_id !== post.user_id) {
        return res.status(403).json({ message: "Unauthorized" });
      } else {
        if (category === 1) {
          post.title = title;
          post.description = description;
          post.image = image;
          post.tags = tags;
          post.save();
          res.status(200).json(post, { message: "Post updated successfully" });
        } else {
          const transaction = await Transaction.findById(
            post.donation_transactions
          );
          // if total_amount is greater 0 then we can't update the post
          if (transaction.total_amount > 0) {
            return res
              .status(400)
              .json({ message: "Can't update post after donation" });
          } else {
            post.title = title;
            post.description = description;
            post.image = image;
            post.tags = tags;
            post.upi_Id = upi_Id;
            post.upi_qrCode = upi_qrCode;
            post.target_amount = target_amount;
            post.save();
            res
              .status(200)
              .json(post, { message: "Post updated successfully" });
          }
        }
      }
    }
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const { post_id, user_id } = req.body;
    const post = await Post.findById(post_id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    } else {
      // Check if user is the owner of the post
      if (user_id !== post.user_id) {
        return res.status(403).json({ message: "Unauthorized" });
      } else {
        // Check if post has any donations
        if (post.category === 2) {
          const transaction = await Transaction.findById(
            post.donation_transactions
          );
          if (transaction.total_amount > 0) {
            return res
              .status(400)
              .json({ message: "Can't delete post after donation" });
          }
        } else {
          await post.remove();
          res.status(200).json({ message: "Post deleted successfully" });
        }
      }
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getLatestPost = async (req, res) => {
  try {
    const { page } = req.body;
    const posts = await Post.find()
      .sort({ created_at: -1 })
      .skip(page * 10)
      .limit(10);
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error getting latest post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createPost, updatePost, deletePost, getLatestPost };
