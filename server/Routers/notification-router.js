const express = require("express");
const router = express.Router();
const checkAdminRights = require("../Middlewares/admin_middleware");
const notificationController = require("../Controllers/notification-controllers");


router
    .route("/create-globalNotification")
    .post(authToken,checkAdminRights, notificationController.createGlobalNotification);

router
    .route("/get-globalNotification")
    .get(authToken, notificationController.getGlobalNotification);

router
    .route("/send-user-notification")
    .post(authToken, checkAdminRights, notificationController.sendNotification);

router
    .route("/get-user-notification")
    .get(authToken, checkAdminRights, notificationController.getUserSpecificNotification);

module.exports = router;