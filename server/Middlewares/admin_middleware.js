import UserRoles from "supertokens-node/recipe/userroles";
import { Error as STError } from "supertokens-node/recipe/session";

const checkAdminRights = async (req, res, next) => {
  const roles = await req.session.getClaimValue(UserRoles.UserRoleClaim);
  if (roles === undefined || !roles.includes("admin")) {
    throw new STError({
      type: "INVALID_CLAIMS",
      message: "User is not an admin",
      payload: [
        {
          id: UserRoles.UserRoleClaim.key,
        },
      ],
    });
  } else {
    next();
  }
};

module.exports = checkAdminRights;

