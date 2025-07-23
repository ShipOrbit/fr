import { z } from "zod";

const resetPasswordSchema = z.object({
  email: z.email(),
});

export const confirmResetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  token: z.uuid(),
});

export default resetPasswordSchema;
