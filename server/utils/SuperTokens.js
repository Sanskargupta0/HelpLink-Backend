const supertokens = require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const EmailPassword = require("supertokens-node/recipe/emailpassword");
const EmailVerification = require("supertokens-node/recipe/emailverification");
const ThirdParty = require("supertokens-node/recipe/thirdparty");
const dotenv = require('dotenv');
dotenv.config();


supertokens.init({
    framework: "express",
    supertokens: {
        connectionURI: process.env.SUPERTOKENS_CONNECTION_URL,
        apiKey: process.env.SUPERTOKENS_API_KEY,
    },
    appInfo: {
        appName: process.env.APP_NAME,
        apiDomain: process.env.BACKEND_URL,
        websiteDomain: process.env.FRONTEND_URL,
        apiBasePath: "/auth",
        websiteBasePath: "/auth"
    },
    recipeList: [
        EmailPassword.init(),
        EmailVerification.init({
            mode: "REQUIRED",
          }),
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [{
                    config: {
                        thirdPartyId: "google",
                        clients: [{
                            clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                            clientSecret: "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"
                        }]
                    }
                }],
            }
        }),
        Session.init() // initializes session features
    ]
});


module.exports = supertokens;