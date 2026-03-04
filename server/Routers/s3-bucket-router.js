const express = require("express");
const router = express.Router();
const s3BucketController = require("../Controllers/aws-s3-bucket-controllers");

router
    .route("/upload")
    .post(s3BucketController.createUploadURL);

router
    .route("/view")
    .post(s3BucketController.getViewURL);


module.exports = router;