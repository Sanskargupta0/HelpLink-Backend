const express = require("express");
const router = express.Router();
const {
  userData,
  updateUserData,
  updatePassword
} = require("../Controllers/userData-controllers");
const schemaMiddleware = require("../Middlewares/validate-middleware");
const schemas = require("../Validator/updateUserData");

router.route("/get-user-info").get(userData);

router
  .route("/update-user-info")
  .post(schemaMiddleware(schemas.updateUserData), updateUserData);

router
  .route("/update-password")
  .post(schemaMiddleware(schemas.updatePassword), updatePassword);

module.exports = router;
