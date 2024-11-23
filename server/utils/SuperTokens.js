const supertokens = require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const EmailPassword = require("supertokens-node/recipe/emailpassword");
const EmailVerification = require("supertokens-node/recipe/emailverification");
const ThirdParty = require("supertokens-node/recipe/thirdparty");



supertokens.init({
    framework: "express",
    supertokens: {
        // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
        connectionURI: "https://st-dev-6fed59b0-a9b7-11ef-b66d-edb7437125eb.aws.supertokens.io",
        apiKey: "IF4oADYrhzUlDE2w-kOudNBiSq",
    },
    appInfo: {
        appName: "Delhivery",
        apiDomain: "http://localhost:8080",
        websiteDomain: "http://localhost:5173",
        apiBasePath: "/auth",
        websiteBasePath: "/auth"
    },
    recipeList: [
        EmailPassword.init(),
        EmailVerification.init({
            mode: "REQUIRED", // or "OPTIONAL"
          }),
        ThirdParty.init({
            // We have provided you with development keys which you can use for testing.
            // IMPORTANT: Please replace them with your own OAuth keys for production use.
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