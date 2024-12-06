const { z } = require("zod");

const updateUserData = z.object({
  first_name: z.union([
    z
      .string()
      .min(3, "First name must be at least 3 characters long")
      .max(20, "First name must be at most 50 characters long"),
    z.undefined(),
  ]),

  last_name: z.union([
    z
      .string()
      .min(3, "Last name must be at least 3 characters long")
      .max(20, "Last name must be at most 50 characters long"),
    z.undefined(),
  ]),

  phone: z.union([
    z
      .string()
      .min(10, "Phone number must be at least 10 digits long")
      .max(15, "Phone number must be at most 15 digits long"),
    z.undefined(),
  ]),

  country: z.union([
    z
      .string()
      .min(3, "Country must be at least 3 characters long")
      .max(20, "Country must be at most 50 characters long"),
    z.undefined(),
  ]),
});

const updatePassword = z.object({
  oldPassword: z.string({ required_error: "Old password is required" }),

  newPassword: z
    .string({ required_error: "New password is required" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must contain at least one lowercase letter, one uppercase letter, and one number"
    )
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password must be at most 50 characters long"),
});

module.exports = {
  updateUserData,
  updatePassword,
};
