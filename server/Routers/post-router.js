const express = require("express");
const router = express.Router();
const { createPost, updatePost, deletePost, getLatestPost } = require("../Controllers/post-controllers");


router
    .route("/create-post")
    .post(createPost);

router
    .route("/update-post")
    .post(updatePost);

router
    .route("/delete-post")
    .post(deletePost);


router
    .route("/get-latest-post")
    .get(getLatestPost);


module.exports = router;
