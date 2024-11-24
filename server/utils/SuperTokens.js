const supertokens = require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const EmailPassword = require("supertokens-node/recipe/emailpassword");
const EmailVerification = require("supertokens-node/recipe/emailverification");
const ThirdParty = require("supertokens-node/recipe/thirdparty");
const dashboard = require("supertokens-node/recipe/dashboard");
const dotenv = require("dotenv");
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
    websiteBasePath: "/auth",
  },
  recipeList: [
    EmailPassword.init({
      override: {
        functions: (originalImplementation) => {
          return {
            ...originalImplementation,
            signUp: async function (input) {
              let existingUsers = await supertokens.listUsersByAccountInfo(
                input.tenantId,
                {
                  email: input.email,
                }
              );
              if (existingUsers.length === 0) {
                // this means this email is new so we allow sign up
                return originalImplementation.signUp(input);
              }
              return {
                status: "EMAIL_ALREADY_EXISTS_ERROR",
              };
            },
          };
        },
      },
    }),
    EmailVerification.init({
      mode: "REQUIRED",
    }),
    ThirdParty.init({
      signInAndUpFeature: {
        providers: [
          {
            config: {
              thirdPartyId: "google",
              clients: [
                {
                  clientId:
                    "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                  clientSecret: "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",
                },
              ],
            },
          },
        ],
      },
      override: {
        functions: (originalImplementation) => {
          return {
            ...originalImplementation,
            signInUp: async function (input) {
              let existingUsers = await supertokens.listUsersByAccountInfo(
                input.tenantId,
                {
                  email: input.email,
                }
              );
              if (existingUsers.length === 0) {
                // this means this email is new so we allow sign up
                return originalImplementation.signInUp(input);
              }
              if (
                existingUsers.find(
                  (u) =>
                    u.loginMethods.find(
                      (lM) =>
                        lM.hasSameThirdPartyInfoAs({
                          id: input.thirdPartyId,
                          userId: input.thirdPartyUserId,
                        }) && lM.recipeId === "thirdparty"
                    ) !== undefined
                )
              ) {
                // this means we are trying to sign in with the same social login. So we allow it
                return originalImplementation.signInUp(input);
              }
              // this means that the email already exists with another social or email password login method, so we throw an error.
              throw new Error("Cannot sign up as email already exists");
            },
          };
        },
        apis: (originalImplementation) => {
          return {
            ...originalImplementation,
            signInUpPOST: async function (input) {
              try {
                return await originalImplementation.signInUpPOST(input);
              } catch (err) {
                if (err.message === "Cannot sign up as email already exists") {
                  // this error was thrown from our function override above.
                  // so we send a useful message to the user
                  return {
                    status: "GENERAL_ERROR",
                    message:
                      "Seems like you already have an account with another method. Please use that instead.",
                  };
                }
                throw err;
              }
            },
          };
        },
      },
    }),
    Session.init(),
    dashboard.init(),
  ],
});

module.exports = supertokens;
