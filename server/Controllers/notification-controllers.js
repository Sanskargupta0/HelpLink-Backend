const User = require("../Models/User_model");
const Gobal_NotificationModel = require("../Models/Gobal_Notification");

const createGlobalNotification = async (req, res) => {
  try {
    const { title, description, type } = req.body;
    const io = req.io;
    let currentUTC = new Date();
    let currentIST = new Date(currentUTC.getTime() + 5.5 * 60 * 60 * 1000);
    const notification = { title, description, date: currentIST, type};
    const globalNotification = new Gobal_NotificationModel({
      title,
      description,
    });
    await globalNotification.save();
    io.emit("newNotification", notification);
    res
      .status(201)
      .json({ msg: "Notification created successfully", notification });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getGlobalNotification = async (req, res) => {
  try {
    const notifications = await Gobal_NotificationModel.find();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getUserSpecificNotification = async (req, res) => {
  try {
    const { id } = req.body;
    const notifications = await User.findById(id).select("notifications");
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const sendNotification = async (req, res) => {
  try {
    const { title, description, userId, type } = req.body;
    const io = req.io;
    let currentUTC = new Date();
    let currentIST = new Date(currentUTC.getTime() + 5.5 * 60 * 60 * 1000);
    const notification = { title, description, date: currentIST, type };
    const UserData = await User.findById(userId);
    UserData.notifications.push(notification);
    await UserData.save();
    io.to(userId).emit("newNotification", notification);
    res
      .status(200)
      .json({ msg: "Notification sent successfully", notification });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createGlobalNotification,
  getGlobalNotification,
  getUserSpecificNotification,
  sendNotification,
};
