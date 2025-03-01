const mongoose = require("mongoose");

let Gobal_Notification = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: function() {
      let currentUTC = new Date();
      let currentIST = new Date(currentUTC.getTime() + (5.5 * 60 * 60 * 1000)); 
      return currentIST;
    },
  },
  type: {
    type: String,
    default: "info"
  },
});

const Gobal_NotificationModel =  mongoose.model("Gobal_Notification", Gobal_Notification);

module.exports = Gobal_NotificationModel;
