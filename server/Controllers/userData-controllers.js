const Wallet = require("../Models/Wallet_model");
const supertokens = require("supertokens-node");
const UserMetadata = require("supertokens-node/recipe/usermetadata");

const userData = async (req, res) => {
    let userId = req.session.getUserId();
    let wallet = await Wallet.findOne({ User_ID: userId });
    let userInfo = await supertokens.getUser(userId);
    let userMetadata = await UserMetadata.getUserMetadata(userId);
    res.status(200).json({
        wallet,
        userInfo,
        userMetadata
    });
};


module.exports = {
    userData
};