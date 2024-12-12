const User = require("../Models/User_model");
const EmailPassword = require("supertokens-node/recipe/emailpassword");
const supertokens = require("supertokens-node");
const UserMetadata = require("supertokens-node/recipe/usermetadata");

const userData = async (req, res) => {
  let super_token_Id = req.session.getUserId();
  let user = await User.findOne({ super_token_Id: super_token_Id }).populate(
    "wallet", { Balance: 1 , _id: 1 }
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
    await User.findByIdAndUpdate(user._id, req.body);
    await UserMetadata.updateUserMetadata(super_token_Id, req.body);
    res.status(200).json({ msg: "User data updated successfully" });
  } else {
    res.status(500).json({ msg: "Failed to update user data" });
  }
};

const updatePassword = async (req, res) => {
  let session = req.session;
  let super_token_Id = req.session.getUserId();
  let oldPassword = req.body.oldPassword;
  let updatedPassword = req.body.newPassword;

  let userInfo = await supertokens.getUser(super_token_Id);

  if (userInfo === undefined) {
    throw new Error("Should never come here");
  }

  let loginMethod = userInfo.loginMethods.find(
    (lM) =>
      lM.recipeUserId.getAsString() ===
        session.getRecipeUserId().getAsString() &&
      lM.recipeId === "emailpassword"
  );
  if (loginMethod === undefined) {
    throw new Error("Should never come here");
  }
  const email = loginMethod.email;

  // call signin to check that input password is correct
  let isPasswordValid = await EmailPassword.verifyCredentials(
    session.getTenantId(),
    email,
    oldPassword
  );

  if (isPasswordValid.status !== "OK") {
    res.status(400).json({ msg: "Incorrect password" });
    return;
  }

  // update the user's password using updateEmailOrPassword
  let response = await EmailPassword.updateEmailOrPassword({
    recipeUserId: session.getRecipeUserId(),
    password: updatedPassword,
    tenantIdForPasswordPolicy: session.getTenantId(),
  });

  if (response.status === "PASSWORD_POLICY_VIOLATED_ERROR") {
    res.status(400).json({ msg: "Password policy violated" });
    return;
  }

  res.status(200).json({ msg: "Password updated successfully" });
};

module.exports = {
  userData,
  updateUserData,
  updatePassword,
};
