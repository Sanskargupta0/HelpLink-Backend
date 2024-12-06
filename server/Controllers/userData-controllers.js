const User = require("../Models/User_model");
const supertokens = require("supertokens-node");
const UserMetadata = require("supertokens-node/recipe/usermetadata");

const userData = async (req, res) => {
  let super_token_Id = req.session.getUserId();
  let user = await User.findOne({ super_token_Id: super_token_Id }).populate(
    "wallet"
  );
  let userInfo = await supertokens.getUser(super_token_Id);
  let thirdparty = userInfo.thirdParty.length > 0 ? true : false;
  if (user) {
    res.status(200).json({
      ...user._doc,
      thirdparty,
    });
  } else {
    res.status(500).json({ msg: "Failed to fetch user data" });
  }
};
``;
const updateUserData = async (req, res) => {
  let super_token_Id = req.session.getUserId();
   let user = await User.findOne({ super_token_Id: super_token_Id }).populate(
     "wallet"
   );
   if (user) {
     await User.findByIdAndUpdate(
       user._id,
       req.body
     );
     await UserMetadata.updateUserMetadata(super_token_Id, req.body);
     res.status(200).json({ msg: "User data updated successfully" });
   } else {
     res.status(500).json({ msg: "Failed to update user data" });
   }
};

module.exports = {
  userData,
  updateUserData,
};
