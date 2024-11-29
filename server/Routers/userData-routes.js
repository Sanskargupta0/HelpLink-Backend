const express = require("express");
const router = express.Router();
const { userData } = require("../Controllers/userData-controllers");


router
    .route("/get-user-info")
    .get(userData);


module.exports = router;